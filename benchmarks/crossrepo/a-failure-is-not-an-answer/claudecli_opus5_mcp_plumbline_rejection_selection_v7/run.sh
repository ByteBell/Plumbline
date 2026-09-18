#!/bin/bash
# xrepo-v6-22-a-failure-is-not-an-answer-medium :: arm claudecli_opus5_mcp_plumbline_rejection_selection_v7
# Fresh isolated `claude -p` under sandbox-exec. Surface = plumbline MCP + Bash only.
set -uo pipefail

ARM="/Users/sauravverma/programs/benchmarks/react-ecosystem/cross-repo/medium-a-failure-is-not-an-answer/claudecli_opus5_mcp_plumbline_rejection_selection_v7"
MCP="/Users/sauravverma/programs/benchmarks/react-ecosystem/mcp_plumbline.json"

# --- per-run cwd, so this run can read its own spilled tool results -----------
# Why not just `cd /tmp`: the CLI derives its project dir from cwd, so every arm that
# ran from /tmp shared ONE project dir. Allowing tool-results there would have exposed
# every other run's spills. A per-run cwd makes the allow exact. See arm_run_env.sh.
. "/Users/sauravverma/programs/benchmarks/react-ecosystem/arm_run_env.sh"
arm_run_env_init "medium-a-failure-is-not-an-answer_claudecli_opus5_mcp_plumbline_rejection_selection_v7"
arm_run_env_probe "$ARM/sandbox.sb" || exit 1
cd "$RUNCWD"

PL=$(printf 'mcp__plumbline__%s,' blueprint case_file case_notes cold_case collateral_damage \
  cross_repo_lookup dragnet evidence_locker file_a_complaint interrogation kingpin manhunt \
  mugshot paper_trail pull_the_evidence rap_sheet read_the_fine_print roll_call shakedown stakeout the_receipts)
TOOLS="Bash,ToolSearch,${PL%,}"

START=$(date +%s)
sandbox-exec -D RUN_PROJDIR="$RUN_PROJDIR" -f "$ARM/sandbox.sb" \
  claude -p "$(cat "$ARM/run_prompt.txt")" \
    --model claude-opus-5 \
    --output-format json \
    --setting-sources '' \
    --disable-slash-commands \
    --strict-mcp-config --mcp-config "$MCP" \
    --allowedTools "$TOOLS" \
    --disallowedTools "Read,Write,Edit,MultiEdit,NotebookEdit,Grep,Glob,WebFetch,WebSearch,Task,Agent,TodoWrite" \
    --max-turns 120 \
    > "$ARM/raw_response.json" 2> "$ARM/stderr.log"
RC=$?
echo "wall_seconds=$(( $(date +%s) - START ))" > "$ARM/wall.txt"
arm_run_env_assert
echo "exit=$RC $(cat "$ARM/wall.txt")"
