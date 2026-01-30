<?php
/**
 * Backend Status Checker
 * Shows if backend is running and provides instructions
 */

echo "<!DOCTYPE html>";
echo "<html>";
echo "<head><title>Backend Status</title>";
echo "<style>body { font-family: Arial; margin: 20px; background: #f5f5f5; } .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; } .success { color: green; font-weight: bold; } .error { color: red; font-weight: bold; } .warning { color: orange; font-weight: bold; } .step { margin: 15px 0; padding: 10px; background: #f9f9f9; border-left: 4px solid #007bff; } code { background: #f0f0f0; padding: 2px 6px; border-radius: 3px; font-family: monospace; }</style>";
echo "</head>";
echo "<body>";
echo "<div class='container'>";
echo "<h1>🚀 Backend Status Check</h1>";
echo "<hr>";

// Try to connect to backend
$backendUrl = 'http://localhost:8000/api/health';
$ch = curl_init($backendUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 2);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 2);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
    echo "<div class='step'><span class='success'>✅ Backend is RUNNING!</span></div>";
    echo "<div class='step'>Response: " . htmlspecialchars($response) . "</div>";
} else {
    echo "<div class='step'><span class='error'>❌ Backend is NOT running</span></div>";
    echo "<div class='step'><span class='warning'>⚠️ You need to start the backend server</span></div>";
    
    echo "<h2>How to Start Backend:</h2>";
    echo "<div class='step'>";
    echo "<strong>1. Open cPanel Terminal</strong><br>";
    echo "URL: <code>https://mwendomojawelfare.co.ke:2083</code><br>";
    echo "Login with your cPanel credentials<br>";
    echo "Click <strong>Terminal</strong>";
    echo "</div>";
    
    echo "<div class='step'>";
    echo "<strong>2. Run these commands:</strong><br>";
    echo "<code>cd ~/public_html</code><br>";
    echo "<code>npm install --production</code><br>";
    echo "<code>npm install -g pm2</code><br>";
    echo "<code>pm2 start src/server.js --name 'mwendo-backend'</code><br>";
    echo "<code>pm2 save</code><br>";
    echo "<code>pm2 startup</code>";
    echo "</div>";
    
    echo "<div class='step'>";
    echo "<strong>3. Verify it's running:</strong><br>";
    echo "<code>pm2 list</code><br>";
    echo "You should see <strong>mwendo-backend</strong> with status <strong>online</strong>";
    echo "</div>";
    
    echo "<div class='step'>";
    echo "<strong>4. Refresh this page</strong> to check if backend is running";
    echo "</div>";
}

echo "<hr>";
echo "<div class='step'>";
echo "<strong>Once backend is running:</strong><br>";
echo "1. Go to: <code>https://mwendomojawelfare.co.ke</code><br>";
echo "2. Login with:<br>";
echo "   Username: <strong>williamodwori</strong><br>";
echo "   Password: <strong>Admin@2024Mwendo</strong>";
echo "</div>";

echo "</div>";
echo "</body>";
echo "</html>";
?>

