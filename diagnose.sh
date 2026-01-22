#!/bin/bash

# MWENDO MOJA - Diagnostic Script
# Run this to diagnose frontend issues on Truehost

echo "🔍 MWENDO MOJA Diagnostic Report"
echo "=================================="
echo ""

# Check Node.js
echo "1️⃣  Checking Node.js..."
if command -v node &> /dev/null; then
    echo "✅ Node.js installed: $(node --version)"
else
    echo "❌ Node.js NOT installed"
fi

# Check npm
echo ""
echo "2️⃣  Checking npm..."
if command -v npm &> /dev/null; then
    echo "✅ npm installed: $(npm --version)"
else
    echo "❌ npm NOT installed"
fi

# Check if in project directory
echo ""
echo "3️⃣  Checking project structure..."
if [ -f "package.json" ]; then
    echo "✅ package.json found"
else
    echo "❌ package.json NOT found - not in project root"
fi

if [ -d "client" ]; then
    echo "✅ client directory found"
else
    echo "❌ client directory NOT found"
fi

# Check if frontend is built
echo ""
echo "4️⃣  Checking frontend build..."
if [ -d "client/dist" ]; then
    echo "✅ Frontend built (dist folder exists)"
    echo "   Files: $(ls -1 client/dist | wc -l)"
else
    echo "❌ Frontend NOT built (dist folder missing)"
    echo "   Run: cd client && npm run build"
fi

# Check if node_modules exist
echo ""
echo "5️⃣  Checking dependencies..."
if [ -d "node_modules" ]; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Backend dependencies NOT installed"
    echo "   Run: npm install"
fi

if [ -d "client/node_modules" ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Frontend dependencies NOT installed"
    echo "   Run: cd client && npm install"
fi

# Check ports
echo ""
echo "6️⃣  Checking ports..."
if command -v lsof &> /dev/null; then
    if lsof -i :3000 &> /dev/null; then
        echo "✅ Port 3000 (Frontend) is in use"
    else
        echo "⚠️  Port 3000 (Frontend) is NOT in use"
    fi
    
    if lsof -i :8000 &> /dev/null; then
        echo "✅ Port 8000 (Backend) is in use"
    else
        echo "⚠️  Port 8000 (Backend) is NOT in use"
    fi
else
    echo "⚠️  lsof not available - cannot check ports"
fi

# Check PM2
echo ""
echo "7️⃣  Checking PM2..."
if command -v pm2 &> /dev/null; then
    echo "✅ PM2 installed"
    echo "   Running processes:"
    pm2 list 2>/dev/null || echo "   (No processes running)"
else
    echo "⚠️  PM2 NOT installed"
    echo "   Install: npm install -g pm2"
fi

# Check .env files
echo ""
echo "8️⃣  Checking environment files..."
if [ -f ".env" ]; then
    echo "✅ .env file exists"
else
    echo "⚠️  .env file NOT found"
fi

if [ -f "client/.env" ]; then
    echo "✅ client/.env file exists"
else
    echo "⚠️  client/.env file NOT found"
fi

# Check Nginx
echo ""
echo "9️⃣  Checking Nginx..."
if command -v nginx &> /dev/null; then
    echo "✅ Nginx installed"
    if systemctl is-active --quiet nginx; then
        echo "✅ Nginx is running"
    else
        echo "⚠️  Nginx is NOT running"
    fi
else
    echo "⚠️  Nginx NOT installed"
fi

# Summary
echo ""
echo "=================================="
echo "📋 SUMMARY"
echo "=================================="
echo ""
echo "If frontend is not working:"
echo ""
echo "1. Build frontend:"
echo "   cd client && npm install && npm run build && cd .."
echo ""
echo "2. Start servers:"
echo "   npm install -g pm2"
echo "   pm2 start ecosystem.config.js"
echo ""
echo "3. Check logs:"
echo "   pm2 logs"
echo ""
echo "4. Test:"
echo "   curl http://localhost:3000"
echo "   curl http://localhost:8000/api/health"
echo ""
echo "=================================="

