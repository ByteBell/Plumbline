# v9 = v8 + THE ELIMINATION LAW. One variable, nothing else.

Deliberately tool-for-tool identical to v8: the SAME 20-tool surface, no rap_sheet
anywhere — not in the allowlist, not in the prompt. Same case, same roster, same
PROBLEM text (md5 f49deedd, roster md5 2fee25e4, both verified against v8). STEP 1-4
discovery is untouched. Any score movement v8 -> v9 is attributable to the
elimination law alone. (rap_sheet is tested separately, in v10.)

v8's sweep was never the problem: it RETRIEVED both svelte candidates 4x each. The
run lost them at the elimination step, so that is the only thing this version moves.

## 1. STEP 3.2a — THE ELIMINATION LAW

A candidate may be eliminated ONLY after the_receipts has returned that file's own
update path and the arm has READ it. The checkpoint must cite the line range.

Explicitly NOT grounds to eliminate — each is a statement about the query, not the file:

- a bulk_search noMatch for a guessed string
- the absence of any expected token, operator or call
- purpose / summary / businessContext / logicSteps (model-written leads, per RULE 1)
- signature, symbol list, token count, path, or any other metadata
- the file's package / framework / language looking unlikely
- a sibling in the same package having been confirmed or eliminated

"bulk_search is a LOCATOR, not a classifier" is stated outright, with the v8 failure
as the worked example: sweeping "] = " and "push(" across sibling adapters, reading
noMatch as "replaces wholesale", writing the files off unopened.

## 2. STEP 3.2b — UNDECIDED IS NOT ELIMINATED

Three terminal states per candidate: CONFIRMED / ELIMINATED / UNDECIDED, and
UNDECIDED IS REPORTED, ranked below every confirmed file. Running out of calls is not
a verdict. This is the asymmetry that matters: without it the law alone would convert
"wrongly eliminated" into "silently dropped for lack of budget", which scores the same.
New band 4 in STEP 5.1 carries it into the ranking; 5.3 says band 4 is not padding.

## 3. STEP 6 — the ledger

Every checkpoint lists `<path> CONFIRMED|ELIMINATED|UNDECIDED <line range or "not
read">`. An ELIMINATED line with no range read is a violation and must be rewritten as
UNDECIDED. STEP 6.2 no longer ends the run on a stall — it redirects the remaining
budget to reading UNDECIDED update paths. 6.3 is a final ledger re-audit before emit.

## 4. STEP 3.2c — budget, so the law is affordable

Names the ration explicitly: manhunt/shakedown allowances GROW with run length, a cap
refusal is a price and not a server failure, and the_receipts must not be burned on
guessed-string sweeps because it is the call needed to read an update path. v8 spent 4
of its 5 the_receipts calls on bulk_search sweeps and only 1 on reading source.

## 5. STEP 7.6 — final message is the array alone

v8 emitted "**CHECKPOINT 4** ..." before its JSON. The extractor coped, but that shape
has scored retrieved:0 before, so it is now spelled out.

## What to read in the result

recall alone will not say whether the law worked. Check the ledger in the transcript:

- did any candidate get ELIMINATED without a line range? -> law not followed
- did the svelte candidates end CONFIRMED, ELIMINATED-with-receipts, or UNDECIDED?
  UNDECIDED-and-reported is a SUCCESS for this version even if it costs precision.
