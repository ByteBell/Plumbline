# run 2 — VOID (rate limit), do not score

2026-09-17, wall 1020s, $12.33, 35 turns.

The SURFACE was clean: 34 tool results, ZERO connection failures on either error
string. Plumbline behaved perfectly.

The run died on the ACCOUNT limit, not the server:
is_error true
api_error_status 429
terminal_reason api_error
stop_reason stop_sequence
result "You've hit your session limit · resets 4am (Asia/Calcutta)"

No ranked answer was ever emitted, so there is nothing to score. Not finalized.

Note the envelope shape: subtype is "success" and exit was 1 — trust is_error and
api_error_status, not subtype. A 429 truncation leaves a well-formed envelope with
prose where the JSON array should be.
