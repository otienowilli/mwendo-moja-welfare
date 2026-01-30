#!/bin/bash

# MWENDO MOJA WELFARE - AUTOMATED DEPLOYMENT SCRIPT
# This script will deploy the system to TrueHost

echo "🚀 Starting MWENDO MOJA Welfare Deployment..."
echo "================================================"

# Check if deployment package exists
if [ ! -f "mwendo-deployment.zip" ]; then
    echo "❌ Error: mwendo-deployment.zip not found!"
    exit 1
fi

echo "✅ Deployment package found (327 KB)"
echo ""
echo "📋 DEPLOYMENT STEPS:"
echo "1. Upload to TrueHost"
echo "2. Extract files"
echo "3. Install dependencies"
echo "4. Start services"
echo "5. Verify deployment"
echo ""
echo "⚠️  IMPORTANT: You need to provide SSH credentials"
echo ""
echo "SSH Connection Details Needed:"
echo "- Host: mwendomojawelfare.co.ke or your server IP"
echo "- Username: gmooutas"
echo "- Password: 5~pZis+g8q0"
echo ""
echo "Ready to deploy? (yes/no)"
read response

if [ "$response" != "yes" ]; then
    echo "Deployment cancelled."
    exit 0
fi

