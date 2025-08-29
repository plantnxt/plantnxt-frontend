#!/bin/bash

# PlantNxt Frontend Auto-Start Script
set -euo pipefail

# Always run from this script's directory (project root)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

echo "🚀 Starting PlantNxt Frontend..."

# Check if port 5173 is already in use
if lsof -i:5173 >/dev/null 2>&1; then
  echo "⚠️  Port 5173 is already in use. Stopping existing processes..."
  pkill -f "vite" || true
  sleep 2

  # Force kill if still running
  if pgrep -f "vite" > /dev/null; then
    echo "⚠️  Force killing remaining Vite processes..."
    pkill -9 -f "vite" || true
    sleep 1
  fi

  # Kill any process still using port 5173
  sudo lsof -ti:5173 | xargs sudo kill -9 2>/dev/null || true
  sleep 2
else
  echo "✅ Port 5173 is available"
fi

# Start the development server in the background
npm run dev -- --host 0.0.0.0 &
SERVER_PID=$!

# Targets to probe
TARGETS=(
  "http://app.plantnxt.com:5173/"
  "http://localhost:5173/"
)

# Wait up to 60s for server to be ready
TIMEOUT=60
INTERVAL=1
ELAPSED=0
READY_URL=""

echo "⏳ Waiting for server to start (timeout ${TIMEOUT}s)..."
while [ $ELAPSED -lt $TIMEOUT ]; do
  for url in "${TARGETS[@]}"; do
    if curl -s --max-time 1 "$url" > /dev/null; then
      READY_URL="$url"
      break 2
    fi
  done
  sleep $INTERVAL
  ELAPSED=$((ELAPSED + INTERVAL))
 done

if [ -n "$READY_URL" ]; then
  echo "✅ Server is running at $READY_URL"
  echo "🌐 Opening browser..."
  open "$READY_URL"
  echo "🎉 PlantNxt is now running! (PID: $SERVER_PID)"
  echo "📝 Press Ctrl+C to stop the server"
  wait $SERVER_PID
else
  echo "❌ Server failed to become ready within ${TIMEOUT}s"
  kill $SERVER_PID 2>/dev/null || true
  exit 1
fi
