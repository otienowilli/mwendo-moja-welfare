#!/bin/bash

# MWENDO MOJA - Backend Health Check & Monitoring Script
# This script checks if the backend is running and restarts it if needed

BACKEND_PORT=8000
BACKEND_URL="http://localhost:$BACKEND_PORT/api/health"
LOG_FILE="/tmp/mwendo-health-check.log"
BACKEND_LOG="/tmp/mwendo-backend.log"
BACKEND_DIR="/home/gmooutas/public_html"

# Function to log messages
log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

# Function to check if backend is running
check_backend() {
    response=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL" 2>/dev/null)
    if [ "$response" = "200" ]; then
        return 0  # Backend is running
    else
        return 1  # Backend is not running
    fi
}

# Function to restart backend
restart_backend() {
    log_message "⚠️  Backend is down! Attempting restart..."
    
    # Kill any existing processes
    pkill -f "node src/server.js" 2>/dev/null
    sleep 2
    
    # Start the backend
    cd "$BACKEND_DIR"
    nohup node src/server.js > "$BACKEND_LOG" 2>&1 &
    sleep 3
    
    # Check if it started successfully
    if check_backend; then
        log_message "✅ Backend restarted successfully!"
        return 0
    else
        log_message "❌ Failed to restart backend. Check logs at $BACKEND_LOG"
        return 1
    fi
}

# Main monitoring loop
log_message "🔍 Starting health check..."

if check_backend; then
    log_message "✅ Backend is running and healthy"
else
    log_message "❌ Backend is not responding"
    restart_backend
fi

# Show last 10 lines of log
echo ""
echo "=== Recent Health Check Log ==="
tail -10 "$LOG_FILE"

