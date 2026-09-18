import { randomUUID } from "node:crypto";
import type { Request, Response } from "express";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import type { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";

interface SessionEntry {
  transport: StreamableHTTPServerTransport;
  server: McpServer;
  /** When this session was last used. Only the sweep below reads it. */
  lastSeen: number;
}

const sessions = new Map<string, SessionEntry>();

/**
 * How long a session may sit unused before it is closed.
 *
 * `onclose` is the only other thing that prunes this map, and it fires when the CLIENT hangs up. A
 * client that vanishes — killed process, dropped network, a crash before DELETE — never hangs up, so
 * without this its entry and the McpServer it holds live as long as the process does.
 */
const SESSION_IDLE_MS = 60 * 60 * 1000;
/** How often idle sessions are swept. */
const SWEEP_INTERVAL_MS = 5 * 60 * 1000;

async function reapIdleSessions(): Promise<void> {
  const cutoff = Date.now() - SESSION_IDLE_MS;
  const idle = Array.from(sessions).filter(([, entry]) => entry.lastSeen <= cutoff);
  for (const [sessionId] of idle) {
    sessions.delete(sessionId);
  }
  await Promise.allSettled(
    idle.map(async ([, entry]) => {
      await entry.transport.close();
      await entry.server.close();
    }),
  );
}

const sweep = setInterval(() => void reapIdleSessions(), SWEEP_INTERVAL_MS);
// Never hold the process open for a sweep.
sweep.unref();

export async function handleStreamableHttp(req: Request, res: Response, buildServer: () => McpServer): Promise<void> {
  const transport = await resolveTransport(req, buildServer);
  if (transport === undefined) {
    res.status(400).json({
      jsonrpc: "2.0",
      error: { code: -32000, message: "Bad Request: no valid session and not an initialize call" },
      id: null,
    });
    return;
  }
  await transport.handleRequest(req, res, req.body);
}

export async function closeAllStreamableHttpTransports(): Promise<void> {
  const all = Array.from(sessions.values());
  sessions.clear();
  await Promise.allSettled(
    all.map(async (entry) => {
      await entry.transport.close();
      await entry.server.close();
    }),
  );
}

async function resolveTransport(
  req: Request,
  buildServer: () => McpServer,
): Promise<StreamableHTTPServerTransport | undefined> {
  const headerValue = req.headers["mcp-session-id"];
  const sessionId = typeof headerValue === "string" ? headerValue : undefined;

  if (sessionId !== undefined) {
    const entry = sessions.get(sessionId);
    if (entry === undefined) {
      return undefined;
    }
    // A session in use is not idle, however long it has been open.
    entry.lastSeen = Date.now();
    return entry.transport;
  }
  if (req.method === "POST" && isInitializeRequest(req.body)) {
    return createSession(buildServer());
  }
  return undefined;
}

async function createSession(server: McpServer): Promise<StreamableHTTPServerTransport> {
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => randomUUID(),
    onsessioninitialized: (newSessionId: string) => {
      sessions.set(newSessionId, { transport, server, lastSeen: Date.now() });
    },
  });
  transport.onclose = (): void => {
    const closingId = transport.sessionId;
    if (typeof closingId === "string") {
      sessions.delete(closingId);
    }
    void server.close().catch(() => undefined);
  };
  // SDK declares Transport.onclose as `?: () => void` but the implementing class types it as
  // `(() => void) | undefined`; the two are incompatible under exactOptionalPropertyTypes.
  await server.connect(transport as unknown as Transport);
  return transport;
}
