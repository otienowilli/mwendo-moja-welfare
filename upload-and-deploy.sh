#!/bin/bash

# Upload and Deploy Script
# This script uploads the frontend-dist.zip to the server and deploys it

echo "🚀 Starting upload and deployment..."
echo ""

# Step 1: Upload the file
echo "📤 Uploading frontend-dist.zip to server..."
scp "/Users/blessedwilliams/MWENDO MOJA WELFARE/frontend-dist.zip" gmooutas@sbg106.ovh.net:~/public_html/

if [ $? -ne 0 ]; then
    echo "❌ Upload failed. Please check your connection."
    exit 1
fi

echo "✅ Upload complete!"
echo ""

# Step 2: Connect and deploy
echo "🔧 Deploying on server..."
ssh gmooutas@sbg106.ovh.net << 'EOF'
cd ~/public_html && \
unzip -o frontend-dist.zip && \
cp -r client/dist/* . && \
rm -rf client && \
rm -f frontend-dist.zip && \
echo "✅ Files deployed!" && \
echo "" && \
echo "📋 Verifying files..." && \
ls -la index.html assets/ vite.svg && \
echo "" && \
echo "🔍 Checking backend..." && \
curl http://localhost:8000/api/health
EOF

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Test your site:"
echo "   https://mwendomojawelfare.co.ke"
echo ""
echo "📝 Login with:"
echo "   Email: gregorykundu@gmail.com"
echo "   Password: kundu@mwendo2024"

