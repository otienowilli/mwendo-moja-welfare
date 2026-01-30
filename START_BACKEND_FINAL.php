<?php
/**
 * Start Backend Server - Final Attempt
 */

echo "<!DOCTYPE html>";
echo "<html>";
echo "<head><title>Start Backend</title>";
echo "<style>body { font-family: Arial; margin: 20px; } .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; } .success { color: green; font-size: 18px; font-weight: bold; } .error { color: red; font-size: 18px; font-weight: bold; } .info { color: blue; font-size: 16px; } .step { margin: 15px 0; padding: 10px; background: #f9f9f9; border-left: 4px solid #007bff; } code { background: #f0f0f0; padding: 2px 6px; border-radius: 3px; font-family: monospace; }</style>";
echo "</head>";
echo "<body>";
echo "<div class='container'>";
echo "<h1>🚀 Starting Backend Server</h1>";
echo "<hr>";

$publicHtmlPath = dirname(__FILE__);
$serverPath = $publicHtmlPath . '/src/server.js';

echo "<div class='step'>";
echo "<strong>Checking server file:</strong><br>";
echo "Path: <code>" . htmlspecialchars($serverPath) . "</code><br>";
echo "Exists: " . (file_exists($serverPath) ? "<span class='success'>✅ Yes</span>" : "<span class='error'>❌ No</span>");
echo "</div>";

if (!file_exists($serverPath)) {
    echo "<div class='step'><span class='error'>❌ src/server.js not found!</span></div>";
    exit;
}

// Kill any existing node processes
echo "<div class='step'><span class='info'>Stopping any existing processes...</span></div>";
shell_exec("pkill -f 'node src/server.js' 2>/dev/null");
sleep(1);

// Start server with nohup
echo "<div class='step'><span class='info'>Starting Node.js server...</span></div>";
$cmd = "cd " . escapeshellarg($publicHtmlPath) . " && nohup node src/server.js > /tmp/mwendo-backend.log 2>&1 &";
$output = shell_exec($cmd);

echo "<div class='step'>";
echo "Command executed: <code>" . htmlspecialchars($cmd) . "</code>";
echo "</div>";

// Wait for server to start
echo "<div class='step'><span class='info'>⏳ Waiting for server to start (5 seconds)...</span></div>";
sleep(5);

// Check if server is running
echo "<div class='step'><span class='info'>Checking if server is running...</span></div>";

$ch = curl_init('http://localhost:8000/api/health');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 3);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

echo "<div class='step'>";
echo "HTTP Code: <strong>" . htmlspecialchars($httpCode) . "</strong><br>";
if ($response) {
    echo "Response: <strong>" . htmlspecialchars($response) . "</strong>";
}
if ($error) {
    echo "Error: <strong>" . htmlspecialchars($error) . "</strong>";
}
echo "</div>";

if ($httpCode === 200) {
    echo "<div class='step'><span class='success'>✅ BACKEND IS RUNNING!</span></div>";
    echo "<div class='step'>";
    echo "<strong>You can now login at:</strong><br>";
    echo "<a href='https://mwendomojawelfare.co.ke' style='font-size: 18px; color: green;'>https://mwendomojawelfare.co.ke</a>";
    echo "</div>";
} else {
    echo "<div class='step'><span class='error'>❌ Backend is not responding</span></div>";
    echo "<div class='step'>";
    echo "<strong>Check the server log:</strong><br>";
    echo "<code>tail -f /tmp/mwendo-backend.log</code>";
    echo "</div>";
    echo "<div class='step'>";
    echo "<strong>Try again in 10 seconds:</strong><br>";
    echo "<a href='https://mwendomojawelfare.co.ke/START_BACKEND_FINAL.php'>Refresh this page</a>";
    echo "</div>";
}

echo "</div>";
echo "</body>";
echo "</html>";
?>

