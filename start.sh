#!/bin/bash

# PlantNxt Frontend Start Script

echo "🚀 Starting PlantNxt Frontend Development Server..."

# Kill any process using port 5173
echo "🔧 Checking for processes on port 5173..."
if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 5173 is in use. Killing existing process..."
    lsof -ti:5173 | xargs kill -9
    sleep 2
fi

# Start the development server
echo "🌐 Starting Vite development server..."
echo "🌐 Opening browser automatically..."
npm run dev-open
