#!/bin/bash
# Local development server with auto-rebuild
# Usage: ./serve.sh

cd "$(dirname "$0")"

# Initialize rbenv
eval "$(rbenv init - zsh)"

SERVER_PID=""

cleanup() {
    echo ""
    echo "Shutting down..."
    if [ -n "$SERVER_PID" ]; then
        kill $SERVER_PID 2>/dev/null
        wait $SERVER_PID 2>/dev/null
    fi
    # Kill any remaining python http servers on port 4000
    lsof -ti:4000 2>/dev/null | xargs kill 2>/dev/null || true
    echo "Done."
    exit 0
}

trap cleanup INT TERM EXIT

# Build the site first
echo "Building site..."
bundle exec jekyll build

# Start Python server in background
echo "Starting server at http://127.0.0.1:4000"
python3 -m http.server 4000 --directory _site &
SERVER_PID=$!

# Watch for changes and rebuild
echo "Watching for changes... (Ctrl+C to stop)"
while true; do
    # Use fswatch if available, otherwise fall back to polling
    if command -v fswatch &> /dev/null; then
        fswatch -1 -r --exclude '_site' --exclude '.git' --include '.*\.(md|html|scss|css|js|yml|bib|json)$' . 2>/dev/null || sleep 2
    else
        sleep 2
    fi
    
    echo "Change detected, rebuilding..."
    bundle exec jekyll build 2>&1 | grep -v "DEPRECATION WARNING" | grep -v "More info" || true
    echo "Done. Refresh your browser."
done
