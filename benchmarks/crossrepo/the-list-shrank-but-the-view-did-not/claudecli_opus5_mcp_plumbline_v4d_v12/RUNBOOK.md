# v12 — run this in a FRESH session

One session per run, so /session-analysis gives this run's cost alone.
Everything is on disk; nothing to prepare.

## Paste line

    cd /Users/sauravverma/programs/benchmarks/react-ecosystem/cross-repo/medium-the-list-shrank-but-the-view-did-not/claudecli_opus5_mcp_plumbline_v4d_v12 && ./run.sh

Prints the spill gate result, then `exit=<rc> wall_seconds=<n>`. Expect 15-25
minutes — longer than v11, because STEP 3 sweeps to completion rather than to
first hit. Do NOT launch from a session that has already attempted this case.

## Then finalize

    cd /Users/sauravverma/programs/benchmarks/react-ecosystem && \
      ./finalize_xrepo_arm.py cross-repo/medium-the-list-shrank-but-the-view-did-not claudecli_opus5_mcp_plumbline_v4d_v12

`v4d_v12` was registered in finalize_xrepo_arm.py on 2026-09-17.

## KNOWN HARNESS BUG — expect a false `comparable: false`

finalize_xrepo_arm.py will report
`disallowed tools used: {'mcp__plumbline__rap_sheet': 1, 'Bash': N}`
Both are granted by this arm's own run.sh `--allowedTools`. The SURFACES table
hardcodes a 20-tool set omitting rap_sheet, and HOUSEKEEPING omits Bash, despite
the code comment claiming the check reads each arm's own --allowedTools. Bash is
sandboxed to the run's own tool-results spills and provably cannot reach a
checkout. Confirm via `out_of_arena_attempts` == {} and
`reads_refused_by_kernel` == 0, then disregard.

## Before trusting the envelope

subtype reads "success" even on a truncated run. Check instead:
is_error · api_error_status · terminal_reason · stop_reason

## What to read, beyond recall

v12 makes its own failures countable. In the STEP 6.1 output:

1. SWEEP MATRIX — is every row as long as that obligation's repos[]? A short
   row means STEP 3.5 did not hold and the sweep was truncated.
2. Does any obligation's repos[] have fewer than 4 entries? That is the
   obvious-owner trap (v11 lost xyflow exactly here).
3. Did xyflow receive the OB-3 phrase specifically, not just any phrase? v11
   scoped xyflow twice and still missed, because both calls carried OB-1's words.
4. Does any closers[] hold more than one file? v11's could not — that is the
   defect-1 fix firing.
5. ASSERT 6.3 — is every file named in the ledger prose also in `files`?
   `containers.svelte.ts` is the canonical case.

## CONTAMINATION

See DELTA.md. v12 is doubly fitted to this case: v11's author saw the gold, and
v12's defect-2 fixes were derived from v11's misses here. A good score on
xrepo-v6-21 proves the mechanism fires and nothing else. For a real number, run
v12 on uninspected cases with 3+ replicates.
