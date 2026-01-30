<?php
/**
 * Check if Backend is Running
 */

echo "<!DOCTYPE html>";
echo "<html>";
echo "<head><title>Backend Status</title>";
echo "<style>body { font-family: Arial; margin: 20px; } .container { max-width: 600px; margin: 0 auto; } .success { color: green; font-size: 20px; font-weight: bold; } .error { color: red; font-size: 20px; font-weight: bold; } .info { color: blue; font-size: 16px; }</style>";
echo "</head>";
echo "<body>";
echo "<div class='container'>";

// Check if backend is running
$ch = curl_init('http://localhost:8000/api/health');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 3);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

echo "<h1>Backend Status Check</h1>";
echo "<hr>";

if ($httpCode === 200) {
    echo "<div class='success'>✅ BACKEND IS RUNNING!</div>";
    echo "<div class='info'>Response: " . htmlspecialchars($response) . "</div>";
    echo "<hr>";
    echo "<div class='info'><strong>You can now login at:</strong><br>";
    echo "<a href='https://mwendomojawelfare.co.ke'>https://mwendomojawelfare.co.ke</a></div>";
} else {
    echo "<div class='error'>❌ BACKEND IS NOT RUNNING</div>";
    echo "<div class='info'>HTTP Code: " . htmlspecialchars($httpCode) . "</div>";
    if ($error) {
        echo "<div class='info'>Error: " . htmlspecialchars($error) . "</div>";
    }
    echo "<hr>";
    echo "<div class='info'><strong>The start-backend.sh script may still be running.</strong><br>";
    echo "Wait 30 seconds and then refresh this page.</div>";
}

echo "</div>";
echo "</body>";
echo "</html>";
?>

