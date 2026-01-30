<?php
/**
 * Check if backend is running
 */

echo "<!DOCTYPE html>";
echo "<html>";
echo "<head><title>Backend Check</title>";
echo "<style>body { font-family: Arial; margin: 20px; } .success { color: green; font-weight: bold; } .error { color: red; font-weight: bold; }</style>";
echo "</head>";
echo "<body>";

echo "<h1>🔍 Backend Status Check</h1>";
echo "<hr>";

// Check if backend is running on port 8000
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "http://localhost:8000/api/health");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 5);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

echo "<h2>Backend on localhost:8000</h2>";

if ($httpCode == 200) {
    echo "<p class='success'>✅ Backend is RUNNING!</p>";
    echo "<p><strong>Response:</strong> " . htmlspecialchars($response) . "</p>";
} else {
    echo "<p class='error'>❌ Backend is NOT running</p>";
    echo "<p><strong>Error:</strong> " . htmlspecialchars($error) . "</p>";
    echo "<p><strong>HTTP Code:</strong> " . $httpCode . "</p>";
}

echo "<hr>";
echo "<h2>📋 What to do:</h2>";

if ($httpCode != 200) {
    echo "<p><strong>The backend Node.js server is not running!</strong></p>";
    echo "<p>You need to start it using cPanel Terminal:</p>";
    echo "<pre>";
    echo "cd ~/public_html\n";
    echo "npm install --production\n";
    echo "npm install -g pm2\n";
    echo "pm2 start src/server.js --name 'mwendo-backend'\n";
    echo "pm2 save\n";
    echo "</pre>";
}

echo "</body>";
echo "</html>";
?>

