#!/bin/bash

# Check if file argument is provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <markdown-file>"
    exit 1
fi

# Check if file exists
if [ ! -f "$1" ]; then
    echo "Error: File '$1' not found"
    exit 1
fi

# Convert markdown to single line with \n for linebreaks and escape double-quotes
awk '{gsub(/"/, "\\\""); printf "%s\\n", $0}' "$1" | sed 's/\\n$//'
