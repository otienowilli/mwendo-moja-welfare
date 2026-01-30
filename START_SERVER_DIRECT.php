<?php
/**
 * Start Node.js Server Directly
 * Uses nohup to run server in background
 */

echo "<!DOCTYPE html>";
echo "<html>";
echo "<head><title>Start Server</title>";
echo "<style>body { font-family: Arial; margin: 20px; } .container { max-width: 600px; margin: 0 auto; } .success { color: green; font-size: 18px; font-weight: bold; } .info { color: blue; font-size: 16px; } .step { margin: 15px 0; padding: 10px; background: #f0f0f0; border-left: 4px solid #007bff; }</style>";
echo "</head>";
echo "<body>";
echo "<div class='container'>";
echo "<h1>🚀 Starting Node.js Server</h1>";
echo "<hr>";

$publicHtmlPath = dirname(__FILE__);
$serverPath = $publicHtmlPath . '/src/server.js';

echo "<div class='step'>";
echo "<strong>Server Path:</strong> " . htmlspecialchars($serverPath) . "<br>";
echo "<strong>Exists:</strong> " . (file_exists($serverPath) ? "✅ Yes" : "❌ No") . "<br>";
echo "</div>";

if (!file_exists($serverPath)) {
    echo "<div class='step'><span class='error'>❌ Error: src/server.js not found!</span></div>";
} else {
    echo "<div class='step'><span class='info'>📝 Starting server...</span></div>";
    
    // Start server in background using nohup
    $cmd = "cd " . escapeshellarg($publicHtmlPath) . " && nohup node src/server.js > /tmp/mwendo-backend.log 2>&1 &";
    
    $output = shell_exec($cmd);
    
    echo "<div class='step'>";
    echo "<span class='success'>✅ Server start command executed!</span><br>";
    echo "Command: <code>" . htmlspecialchars($cmd) . "</code>";
    echo "</div>";
    
    echo "<div class='step'>";
    echo "<strong>⏳ Waiting for server to start...</strong><br>";
    echo "Please wait 5-10 seconds for the server to fully start.";
    echo "</div>";
    
    // Wait a bit and check
    sleep(3);
    
    $ch = curl_init('http://localhost:8000/api/health');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 2);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200) {
        echo "<div class='step'>";
        echo "<span class='success'>✅ SERVER IS NOW RUNNING!</span><br>";
        echo "Response: " . htmlspecialchars($response);
        echo "</div>";
    } else {
        echo "<div class='step'>";
        echo "<span class='info'>⏳ Server is starting...</span><br>";
        echo "Refresh this page in 10 seconds to check again.";
        echo "</div>";
    }
}

echo "<hr>";
echo "<div class='step'>";
echo "<strong>Next:</strong><br>";
echo "1. Wait 10 seconds<br>";
echo "2. Visit: <a href='https://mwendomojawelfare.co.ke/CHECK_BACKEND_STATUS.php'>CHECK_BACKEND_STATUS.php</a><br>";
echo "3. If it shows ✅ BACKEND IS RUNNING, then login at: <a href='https://mwendomojawelfare.co.ke'>https://mwendomojawelfare.co.ke</a>";
echo "</div>";

echo "</div>";
echo "</body>";
echo "</html>";
?>

