# run 1 — DEGRADED (kept, not scored as clean)

2026-09-16, wall 921s, $23.86, 41 turns, recall@50 0.25, MRR 0.5, retrieved 3.

7 of 40 tool results (18%) failed in one contiguous burst with
"Unable to connect. Is the computer able to access the url?" — plumbline flapped
while v4d_v7 and v4d_v8 ran concurrently. The arm recovered and finished with a
real answer, so this is degraded rather than void, but it is not a clean
measurement of the v8 prompt.

Note: the first outage gate MISSED this. It matched only the string
'is not connected'; the live server emits 'Unable to connect...' for the same
condition. Always check BOTH strings.
