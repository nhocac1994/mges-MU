#!/bin/bash

# Clear Next.js cache and restart development server
echo "🧹 Clearing Next.js cache..."

# Remove .next directory
rm -rf .next

# Remove node_modules/.cache if exists
rm -rf node_modules/.cache

# Clear browser cache instructions
echo "📱 Please also clear your browser cache:"
echo "   - Chrome: Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)"
echo "   - Safari: Develop > Empty Caches"
echo "   - Firefox: Ctrl+Shift+Delete"

# Kill any existing Next.js processes
echo "🔄 Stopping existing Next.js processes..."
pkill -f "next dev" || true

# Wait a moment
sleep 2

# Start development server on port 3001
echo "🚀 Starting development server on port 3001..."
PORT=3001 npm run dev
