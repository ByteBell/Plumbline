# v12 — v11 restructured as a procedure over explicit state

Written 2026-09-17, from the v11 run on this case (recall 0.500, 2/4, $18.19).
The header block — SURFACE, ROSTER, PROBLEM, GOAL, lines 1-34 — is carried from
v11 byte-for-byte. Only the ALGORITHM section changed.

## What v11 got right, and is preserved

All four measured mechanisms fired. Keep them:

- `rap_sheet` before the first search (v12 STEP 0.2)
- every `stakeout` scoped with `knowledgeId` — 11/11, zero org-wide, 9 distinct
  repositories, against v8/v9/v10 which went org-wide and reached 2 of 3 gold
  repos (v12 STEP 3.2, 3.a)
- `manhunt` with `knowledgeId` omitted for sibling packages (v12 STEP 4)
- `case_file` then `the_receipts` on the DECLARED range (v12 STEP 5.1)

v11 did not fail at sweeping. It failed at _reporting_ and at _terminating_.

## Defect 1 — the ledger was a sufficiency structure; the task is exhaustive

v11 line 32 asks for "every file that must change". v11 line 63 defines closure
as "READ **a file** that satisfies it" — singular. Nothing in v11 STEP 5 bridged
them, so the only routes into the JSON were "closed an obligation" or
"UNDECIDED".

`query::packages/svelte-query/src/containers.svelte.ts` was neither. It was
retrieved (twice), read, and cited in the run's own ledger prose as _"the in-repo
proof this is an omission, not a style"_ — then never named, because OB-1 was
already closed by `useMutationState.svelte.ts` and the ledger had no second slot.
The file did not lose on ranking. It was never eligible.

Fix — three structural changes, not exhortations:

- `CONFIRMED` is an explicit state set with role VIOLATOR | OWNER | **EVIDENCE**
  (STEP 5.3). Evidence is a full role.
- INVARIANT-1 + STEP 6.2: `files := every path in CONFIRMED`. Mechanical. The
  JSON is computed from state, not re-decided at emit time.
- STEP 5.4 `closers[]` is a LIST, appended never replaced: "CLOSING IS NOT
  CHOOSING". Re-closing a CLOSED obligation with a second file is expected.
- STEP 6.3 ASSERT: every path named in the ledger prose must appear in `files`.
  This one is directly diagnostic of what v11 did.

Worth 0.750 on the v11 transcript with no change to retrieval at all.

## Defect 2 — closure terminated the sweep, and an obvious owner skipped it

v11 STEP 2.1's breadth rule was advisory ("be generous", "four or more is
normal") and lost to a famous owner. The v11 transcript says it outright:
**"OB-3 points at React's child reconciler."** No repository list was ever built
for OB-3. One `stakeout` went to `react`, returned `ReactChildFiber.js` — a
genuine true positive for the behaviour, wrong file for the case — OB-3 closed,
and the line of enquiry ended.

`xyflow` WAS scoped into, twice, but only ever with OB-1's shrink phrase and a
`shakedown`. The discriminating words — "keyed pass / drops elements whose keys
are gone" — never reached it. Per the RUNBOOK those words put
`xyflow::packages/react/src/container/NodeRenderer/index.tsx` at rank 3.

Fix — three structural changes:

- STEP 2.2 ASSERT `|ob.repos| >= 4`, one of which does not obviously fit. STEP
  2.3 names the obvious-owner trap: "A list of one entry is not a short list. It
  is a skipped step."
- STEP 3 is an explicit double FOR EACH with 3.4 DO NOT BREAK and INVARIANT-2:
  CLOSED never exits a loop. STEP 3.5 ASSERTs the sweep ran to completion per
  obligation.
- STEP 3.b PHRASE DISCIPLINE + the `SWEPT` set keyed on `(ob_id, repo)`: a repo
  swept with OB-1's words is NOT in SWEPT for OB-3. This is exactly the xyflow
  hole, and it is now countable.
- STEP 6.1(b) prints the sweep matrix, so the hole is visible in the artifact
  without transcript archaeology.

## Cost

Defect-2 fixes trade cost for coverage: sweeps run to completion rather than to
first success. 3 obligations x 4-repo floor = 12+ scoped stakeouts against v11's
11, plus the case_file/the_receipts reads each new hit drags in. Budget 1.3-1.6x
of v11's $18.19. The defect-1 fixes are free — they change reporting, not
retrieval.

## CONTAMINATION — read this before believing any number

v11 was already written by an author who had seen this case's gold. v12's
defect-2 fixes were then derived from watching v11 miss _these two specific
files_. v12 is therefore DOUBLY fitted to xrepo-v6-21 and its score here is
worth nothing.

Defect-1 fixes generalise on their face: they repair a contradiction between v11
line 32 and line 63 that is visible without knowing any gold. Defect-2 fixes are
the ones at risk of encoding "remember xyflow".

The only honest test is v12 vs v11 on cases that have NOT been inspected, 3+
replicates each — one case has scored 0.545 / 0.636 / 0.909 on one unchanged
prompt, so a single run is below the noise floor.
