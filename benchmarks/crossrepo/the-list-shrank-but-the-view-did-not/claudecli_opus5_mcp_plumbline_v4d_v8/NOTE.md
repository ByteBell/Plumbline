# run 3 — VALID, scored. recall 0.25 / MRR 0.20

2026-09-17, wall 814s, $11.80, 30 turns, session e6bca807.

Envelope is a genuine completion, not a truncation:
is_error false
api_error_status null
terminal_reason completed
stop_reason end_turn
surface_pure true, comparable true, reads_refused_by_kernel 0, cache cold.

## Metrics

recall@10..@100 0.25 (1/4) · MRR 0.20 · first_hit_rank 5 · precision@5 0.20
repo_recall 0.667 (2/3 gold repos) · 3 repos named · 6 files retrieved · invalid_path_rate 0.0

Seventh variant at exactly 0.25.

## The answer extractor did NOT misfire

The reply is prose ("**CHECKPOINT 4** ...") followed by the JSON array, the shape
that has previously scored retrieved:0. finalize_xrepo_arm.py captured all 6 files
across all 3 repos. No re-finalize needed.

## Surface was clean; the four `Error:` results are plumbline BUDGET refusals

Zero connection failures, zero session-expired, zero EPERM, stderr empty.
manhunt capped at 3 of 8 earned calls
shakedown capped at 2 of 12 earned calls
The v8 name-sweep mechanism is throttled by the server's own budget allowance:
run 2 reached 7 manhunt calls, run 3 hit the ceiling at 3 and had to buy more by
spending cross_repo_lookup / collateral_damage first. It did, and finished with 5.

## THE FINDING: 0.25 here is NOT a reachability ceiling

Both svelte candidates were retrieved, repeatedly, long before the answer:
packages/svelte-query/src/createQueries.svelte.ts surfaced 4x
packages/svelte-db/src/useLiveQuery.svelte.ts surfaced 4x
via dragnet, stakeout, cross_repo_lookup and collateral_damage. Discovery worked.

They were then ELIMINATED on negative `the_receipts bulk_search` hits for a
hand-guessed literal, with the file never read:
call 2 bulk_search "] = " over 6 db adapters -> svelte-db noMatch -> ruled out
call 4 bulk_search "push(" over 5 query adapters -> svelte-query noMatch -> ruled out
call 6 bulk_search over 5 query adapters -> svelte-query MATCHED 3x @ ~230
but the verdict was already fixed; the answer still says
"vue/svelte/angular/react/preact all replace wholesale - ruled out".

bulk_search was used as a behavioural CLASSIFIER with a guessed token as the proxy
for "writes slot by slot". A file that does the same thing in different syntax
returns noMatch, and noMatch was read as evidence about behaviour. That is RULE 1
run backwards: absence of a guessed literal treated as a finding, with no read of
the candidate's update path.

Confirming reads were 3 files total, all of them files it already believed in.

## Budget shape, against the cross-repo lane

stakeout 5 · manhunt 5 · the_receipts 5 · cross_repo_lookup 5 · shakedown 4
collateral_damage 2 · dragnet 1 · roll_call 1 · ToolSearch 1
collateral_damage is the heaviest weight in the cross-repo lane (0.24) and got 2 of
29 calls. The run searched; it never really folded.

## Scaffolding defect to fix before v9

One stakeout result overflowed (65,727 chars / 1,780 lines) and the CLI spilled it to
~/.claude/projects/-private-tmp/<session>/tool-results/mcp-plumbline-stakeout-\*.txt
which sandbox.sb blanket-denies. The deny exists to blind the arm to EARLIER
transcripts; it also blinds the run to its own overflow, so that sweep was lost.
FIXED 2026-09-17, same session, before any further run:

- arm_run_env.sh (new, bench root) gives every run its OWN cwd, so the CLI derives a
  project dir unique to that run; exports RUN_PROJDIR; ships a fail-closed pre-flight
  probe and a post-run assertion against slug drift.
- all 152 sandbox.sb carrying the projects deny now re-open, per run,
  (allow file-read\* (require-all (subpath (param "RUN_PROJDIR"))
  (regex #"/tool-results(/|$)")))
  so a run reads its own spills and nothing else - no sibling run's, and no .jsonl.
- all 10 per-arm run.sh plus run_plumbline_arm.sh and run_retrieval_arm.sh pass
  -D RUN_PROJDIR and run the probe before spending anything.
- sandbox-exec REFUSES a profile whose param is unset, so a launcher that drops -D
  dies at load instead of running unsandboxed. Fails closed by construction.
- fix_spill_allow.py --check re-audits the whole tree and exits 1 on drift.
  Verified: 152/152 profiles enforce (own spill readable, own transcript denied,
  sibling run's spill denied, run 2's real transcript denied), gold still blind, MCP
  config still readable, and a live claude -p confirmed the predicted project dir.
  The 8 cal.com arms never carried the projects deny and are untouched.

## v9 hypothesis

Do not change the sweep - it already works. Change the ELIMINATION rule:
a candidate may only be dropped after the_receipts returns its actual update-path
line range and that source shows a whole-value replacement. A negative bulk_search
is not grounds to rule anything out.
