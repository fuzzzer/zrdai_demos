#!/bin/bash

OUTPUT_FILE="merged_ui_code.txt"
> "$OUTPUT_FILE"

TARGET_PATHS=("src" "server" "package.json" "vite.config.ts" "server.js" ".env")

for path in "${TARGET_PATHS[@]}"; do
    if [ -d "$path" ]; then
        find "$path" -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" \) -not -path "*/node_modules/*" -not -path "*/dist/*" | while read -r file; do
            echo "\"\"\"" >> "$OUTPUT_FILE"
            echo "-----Content from: $file-----" >> "$OUTPUT_FILE"
            echo "" >> "$OUTPUT_FILE"
            cat "$file" >> "$OUTPUT_FILE"
            echo "" >> "$OUTPUT_FILE"
            echo "\"\"\"" >> "$OUTPUT_FILE"
            echo "" >> "$OUTPUT_FILE"
        done
    elif [ -f "$path" ]; then
        echo "\"\"\"" >> "$OUTPUT_FILE"
        echo "-----Content from: $path-----" >> "$OUTPUT_FILE"
        echo "" >> "$OUTPUT_FILE"
        cat "$path" >> "$OUTPUT_FILE"
        echo "" >> "$OUTPUT_FILE"
        echo "\"\"\"" >> "$OUTPUT_FILE"
        echo "" >> "$OUTPUT_FILE"
    fi
done

echo "Successfully merged code into $OUTPUT_FILE"