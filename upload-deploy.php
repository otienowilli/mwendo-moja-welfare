<?php
/**
 * MWENDO MOJA WELFARE - AUTOMATED DEPLOYMENT SCRIPT
 * Upload this file to public_html and access it via browser
 * Then delete it after deployment
 */

error_reporting(E_ALL);
ini_set('display_errors', 1);

$baseDir = dirname(__FILE__);
$deployDir = $baseDir . '/mwendo-deployment';

?>
<!DOCTYPE html>
<html>
<head>
    <title>MWENDO MOJA - Deployment</title>
    <style>
        body { font-family: Arial; margin: 20px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 5px; }
        h1 { color: #333; }
        .status { padding: 10px; margin: 10px 0; border-radius: 3px; }
        .success { background: #d4edda; color: #155724; }
        .error { background: #f8d7da; color: #721c24; }
        .info { background: #d1ecf1; color: #0c5460; }
        .step { margin: 20px 0; padding: 15px; background: #f9f9f9; border-left: 4px solid #007bff; }
        code { background: #f4f4f4; padding: 2px 5px; border-radius: 3px; }
        button { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 3px; cursor: pointer; }
        button:hover { background: #0056b3; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 MWENDO MOJA WELFARE - DEPLOYMENT</h1>
        
        <div class="step">
            <h2>📋 Deployment Status</h2>
            
            <?php
            // Check if deployment directory exists
            if (is_dir($deployDir)) {
                echo '<div class="status success">✅ Deployment files already extracted!</div>';
                echo '<p>Files are in: <code>' . $deployDir . '</code></p>';
                echo '<p><strong>Next Step:</strong> Run installation commands in Terminal</p>';
            } else {
                echo '<div class="status info">⏳ Waiting for deployment files...</div>';
                echo '<p>Upload <code>mwendo-deployment.zip</code> to <code>public_html</code> and extract it.</p>';
            }
            ?>
        </div>

        <div class="step">
            <h2>⚙️ Installation Commands</h2>
            <p>After uploading and extracting, run these commands in cPanel Terminal:</p>
            <pre><code>cd ~/public_html
npm install --production
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
pm2 startup</code></pre>
        </div>

        <div class="step">
            <h2>✅ Verification</h2>
            <pre><code>pm2 list
pm2 logs</code></pre>
        </div>

        <div class="step">
            <h2>🌐 Test Your System</h2>
            <p>Open: <code>https://mwendomojawelfare.co.ke</code></p>
            <p>Login with:</p>
            <ul>
                <li>Username: <code>williamodwori</code></li>
                <li>Password: <code>Admin@2024Mwendo</code></li>
            </ul>
        </div>

        <div class="step">
            <h2>🗑️ Cleanup</h2>
            <p>After deployment is complete, delete this file (<code>upload-deploy.php</code>) from public_html</p>
        </div>
    </div>
</body>
</html>

