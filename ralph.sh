#!/bin/bash
set -e

MAX_ITERATIONS=$1

if [ -z "$MAX_ITERATIONS" ]; then
    echo "Usage: $0 <max-iterations>"
    exit 1
fi

for ((i=1; i<=$MAX_ITERATIONS; i++)); do
    echo "Iteration $i of $MAX_ITERATIONS"

    output=$(opencode run --model zai-coding-plan/glm-4.7 " @prd.json @progress.txt \
1. Find the highest-priority feature to work on and work only on that feature. This should be the one YOU decide has the highest priority - not necessarily the first in the list. \
2. Check that the types check via npm typecheck and that the tests pass via npm test. \
3. Update the PRD with the work that was done. You may only update the progress field, nothing else. \
4. Append your progress to the progress.txt file. Use this to leave a note for the next person working in the codebase. \
5. Make a git commit of that feature. \
ONLY WORK ON A SINGLE FEATURE. \
If, while implementing the feature, you notice the PRD is complete, meaning all tasks have progress set to true, output <promise>COMPLETE</promise>.")

    if echo "$output" | grep -q "<promise>COMPLETE</promise>"; then
        echo "Detected <promise>COMPLETE</promise> - stopping"
        exit 0
    fi
done

echo "Reached maximum iterations ($MAX_ITERATIONS)"
