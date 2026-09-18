# v10 = v9 + rap_sheet. One variable on top of v9.

Prompt is byte-identical to v9 except for STEP 0.4/0.5, and the surface is v9's plus
one tool (21, was 20). So:
v8 -> v9 isolates the ELIMINATION LAW
v9 -> v10 isolates RAP_SHEET
Compare v10 against v9, never against v8 — a v8 comparison confounds the two.

## The only delta: STEP 0.4 / 0.5

0.4 Call rap_sheet ONCE, no arguments. It and roll_call are the server's two
UNBUDGETED calls — they cost nothing that could have gone to retrieval. It
returns ~150 tokens per repo saying what that repo is FOR, and it is read
BEFORE the first search.
0.5 RANK, NEVER EXCLUDE — the brief orders where you look; it never drops a repo
from the roster. A repo whose brief reads wrong can still hold the other side
of a contract.

## Why this is worth its own arm

rap_sheet was missing from the allowlist of EVERY plumbline arm ever run — all 10
per-arm run.sh and the shared run_plumbline_arm.sh (T=(...) had 20 entries, not 21).
So the Stage-0 brief has 0 calls across the entire benchmark history, and seven
v5-family prompts INSTRUCTED the arm to call a tool the whitelist withheld. A
`rap_sheet: 0` in any pre-v10 result.json means "could not", never "chose not to".

The expected effect is on RANKING, not retrieval: the sweep vocabulary for this case
(store, state, cache, sync, update, projection) is common to nearly every roster repo,
so an unbriefed run ranks word-sharing repos above the one the question is about. v8
named 3 repos and found 2 of 3 gold repos — a ranking loss is a plausible part of that.

## What to read in the result

- was rap_sheet actually called, once, before the first search?
- did repo_recall / repos_named move relative to v9, with the ledger behaviour held
  constant? That is the isolated rap_sheet effect.
- if the ledger discipline degrades relative to v9, the extra step cost attention
  rather than buying ranking — say so rather than reading the recall number alone.
