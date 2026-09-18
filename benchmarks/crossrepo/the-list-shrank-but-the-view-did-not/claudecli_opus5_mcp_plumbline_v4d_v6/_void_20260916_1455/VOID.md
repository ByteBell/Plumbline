# VOID RUN — do not score, do not report

Launched 2026-09-16 14:55, exit 0, wall 337s, $7.14.

The plumbline MCP server died mid-run. Gate passed at launch (roll_call returned
all 16 repos, every lastIndexedCommit matching its roster pin), then the server
went away after 8 calls and never came back.

Transcript: ~/.claude/projects/-private-tmp/a4cd6325-704e-4b89-baa2-96a91a5e29cb.jsonl
landed: roll_call x1, stakeout x6, the_receipts x1 (8 plumbline calls)
then: "MCP server \"plumbline\" is not connected" x2
ToolSearch x7 (the model trying and failing to re-reach the tools)
server still refusing on port 80 after the run ended.

L2 (per-repo breadth ledger) was never spent; no candidate file was ever opened.
The answer in raw_response.json is partial-evidence guesswork by the model's own
account and must not be compared against v4d_v5's 0.25.

RELAUNCH with `bash run.sh` once plumbline is back up. Delete this file then.
