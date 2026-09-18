# v11 — rewritten from scratch. Discovery-first, no budget language.

Not a delta on v8/v9/v10: the algorithm body is new. Only the case header
(CASE / SURFACE / ROSTER / PROBLEM / GOAL) is carried over, byte-identical
(md5 c23cbb16). Surface is 21 tools — rap_sheet included, because STEP 0.2
requires it.

## Why rewrite rather than patch

v8, v9 and v10 scored identically (recall 0.25, 1/4, repos 2/3) while v9 and v10
each fixed a real defect. The defects were real and not binding. Measured causes of
the 3/4 miss:

- org-wide search never reached xyflow in any run; scoped to xyflow the same
  behaviour phrase puts the gold at rank 3
- all three arms read the PROBLEM's "collection" as the queries array by
  CHECKPOINT 1 and never re-read it; the collection was the mutation cache
- the org-wide exact-name sweep (already in every prompt) was never run on the
  family name that mattered; `manhunt name="useMutationState"` returns all six
  sibling adapters in one call
- case_file called 0 / 0 / 1 times across the three arms

## What v11 carries, and what each clause is paying for

STEP 1 OBLIGATION LEDGER. The PROBLEM's owner clauses become separate
obligations that stay OPEN until a file is read. v8/v9/v10 all closed the
"keyed pass" clause with react's ReactChildFiber and stopped searching.
The "write three readings of the ambiguous noun" clause was CUT: it
produced an output that nothing downstream consumed, which is the
definition of a dead instruction. Its job moved into STEP 2.1, where
breadth across repositories settles the ambiguity as a side effect.
STEP 2 SCOPED SEARCH IS THE RUN. One stakeout per plausible repository per open
obligation, knowledgeId SET, searchIn='both'. rap_sheet is what ranks
which repositories are plausible — its only job here.
Verified against the server: mcp-server/src/core/budget/store.ts exempts
the FIRST scoped call into a repository a run has not queried
("FIRST TOUCH IS NEVER OVER-SPEND"), so this floor cannot be rationed
away however wide it goes. The exemption exists BECAUSE this failed
before: its comment records three stakeout calls refused on
xrepo-v7-6 that were first touches into jotai, reselect and
redux-toolkit — the three repos holding the gold that run then missed.
STEP 3 ORG-WIDE EXACT-NAME SWEEP + every sibling is a candidate.
STEP 4 case_file before the_receipts; declared unit ranges, never guessed
windows. The elimination law, compressed to three lines.
STEP 5 Ledger restated in plain text, then the JSON array alone.

## What was deleted, deliberately

- ALL budget / weight / allowance / call-share language, EXCEPT STEP 3.4, which
  now states the real refusal mechanics read off the server source: the
  allowance is budget x 5 x totalCalls and grows with the run, a first scoped
  touch is exempt, and refusals vary between identical runs. That is navigation,
  not accounting.
- The rest of the The server already
  rations and announces it; a second imaginary budget in the prompt made the
  model plan against numbers it cannot observe. v9 reasoned about caps at every
  checkpoint and still spent $24.42 with 11 the_receipts and 0 case_file. The
  only survivor is STEP 3.4: a cap refusal means switch tool, not stop.
- The every-4-calls CHECKPOINT ceremony (one ledger restatement at the end).
- The four-band ranking scheme and the "do not pad" warnings — precision was
  never the problem.
- The 3.2a list of six things that are not grounds to eliminate, compressed to
  two sentences. The law was obeyed perfectly in v9 and bought nothing.

## Guidance is floors, not ceilings

Every count in v11 is a minimum keyed to enumerable work (obligations x plausible
repositories, one manhunt per harvested family name, one case_file per file judged).
No maximum appears anywhere. The measured failure was under-coverage; a ceiling is
the wrong instrument for it, and a fixed per-tool count would have capped the
scoped sweeps that find xyflow.

## CONTAMINATION — read before trusting any score from this arm

This prompt was written AFTER its author saw this case's gold. A good score here
proves the mechanism fires, NOT that the prompt generalises. Use m09 as a
route-validation fixture only; measure the real effect on an uninspected case with
3+ replicates.
