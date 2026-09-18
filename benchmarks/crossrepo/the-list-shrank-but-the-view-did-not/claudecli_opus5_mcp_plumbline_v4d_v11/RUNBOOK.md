# v11 — run this in a FRESH session

One session per run, so /session-analysis gives this run's cost alone.
Everything is on disk; nothing to prepare.

## Paste line

    ./run.sh

run.sh prints the spill gate result, then `exit=<rc> wall_seconds=<n>` when done.
Expect roughly 12-20 minutes. Do NOT launch it from a session that has already
attempted this case.

## Then finalize (same or any session)

    cd /Users/sauravverma/programs/benchmarks/react-ecosystem && \
      ./finalize_xrepo_arm.py cross-repo/medium-the-list-shrank-but-the-view-did-not claudecli_opus5_mcp_plumbline_v4d_v11

`v4d_v11` is already registered in finalize_xrepo_arm.py (added 2026-09-17), so
this runs as-is. It will refuse until raw_response.json exists, which is correct.

## Before trusting the envelope

subtype reads "success" even on a truncated run. Check instead:
is_error · api_error_status · terminal_reason · stop_reason
A 429 leaves a well-formed envelope with prose where the JSON array belongs.

## What to read, beyond recall

Recall alone will not say whether the prompt worked. The mechanism checks are:

1. rap_sheet called once, before the first search?
2. How many stakeout calls carry knowledgeId SET, and into how many DISTINCT
   repositories? This is the central floor. v8/v9/v10 went org-wide and reached
   2 of 3 gold repos every time.
3. Was xyflow scoped into at all? Scoped, the "keyed pass" phrase puts the gold
   at rank 3; org-wide it never surfaces.
4. Was any family name swept with manhunt and knowledgeId OMITTED, and were ALL
   returned siblings treated as candidates?
5. Does the STEP 5.1 ledger show OB-3 closed on a real file, or OPEN? OPEN and
   declared is a correct outcome; silently dropped is the failure this replaces.

## CONTAMINATION — the reason this run is a fixture, not a measurement

This prompt was written after its author saw this case's gold (4 files / 3 repos).
A good score HERE proves the mechanism fires. It proves nothing about whether the
prompt generalises. For a real number, run v11 on a case that has not been
inspected, with 3+ replicates — a single case has scored 0.545 / 0.636 / 0.909 on
one unchanged prompt, so one run is never a result.
