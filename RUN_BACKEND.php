<?php
/**
 * Run Backend Startup Script
 * Executes the start-backend.sh script
 */

echo "<!DOCTYPE html>";
echo "<html>";
echo "<head><title>Backend Startup</title>";
echo "<style>body { font-family: Arial; margin: 20px; background: #f5f5f5; } .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; } .success { color: green; font-weight: bold; } .error { color: red; font-weight: bold; } .info { color: blue; } .step { margin: 15px 0; padding: 10px; background: #f9f9f9; border-left: 4px solid #007bff; } code { background: #f0f0f0; padding: 2px 6px; border-radius: 3px; font-family: monospace; }</style>";
echo "</head>";
echo "<body>";
echo "<div class='container'>";
echo "<h1>🚀 Starting Backend Server</h1>";
echo "<hr>";

$scriptPath = dirname(__FILE__) . '/start-backend.sh';

if (!file_exists($scriptPath)) {
    echo "<div class='step'><span class='error'>❌ Error: start-backend.sh not found</span></div>";
    echo "<div class='step'>Make sure you uploaded <code>start-backend.sh</code> to public_html</div>";
} else {
    echo "<div class='step'><span class='info'>📝 Found start-backend.sh</span></div>";
    echo "<div class='step'><span class='info'>Attempting to execute...</span></div>";
    
    // Make script executable
    @chmod($scriptPath, 0755);
    
    // Try to execute the script
    $output = shell_exec('bash ' . escapeshellarg($scriptPath) . ' 2>&1');
    
    echo "<div class='step'>";
    echo "<span class='info'>📋 Output:</span><br>";
    echo "<pre style='background: #f0f0f0; padding: 10px; border-radius: 3px; overflow-x: auto;'>";
    echo htmlspecialchars($output);
    echo "</pre>";
    echo "</div>";
    
    // Check if backend is running
    sleep(2);
    $ch = curl_init('http://localhost:8000/api/health');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 2);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200) {
        echo "<div class='step'><span class='success'>✅ Backend is now RUNNING!</span></div>";
        echo "<div class='step'>Response: " . htmlspecialchars($response) . "</div>";
    } else {
        echo "<div class='step'><span class='error'>⚠️ Backend may still be starting...</span></div>";
        echo "<div class='step'>Wait 10 seconds and then visit: <code>https://mwendomojawelfare.co.ke/api/health</code></div>";
    }
}

echo "<hr>";
echo "<div class='step'>";
echo "<strong>Next Steps:</strong><br>";
echo "1. Wait 10 seconds<br>";
echo "2. Visit: <code>https://mwendomojawelfare.co.ke/api/health</code><br>";
echo "3. If you see <code>{\"status\":\"Server is running\"}</code>, backend is working!<br>";
echo "4. Then go to: <code>https://mwendomojawelfare.co.ke</code> and login";
echo "</div>";

echo "</div>";
echo "</body>";
echo "</html>";
?>

