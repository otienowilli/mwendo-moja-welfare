<?php
/**
 * Debug API Response
 * Shows exactly what the backend is returning
 */

echo "<!DOCTYPE html>";
echo "<html>";
echo "<head><title>API Debug</title>";
echo "<style>body { font-family: monospace; margin: 20px; background: #1e1e1e; color: #d4d4d4; } .container { max-width: 1000px; margin: 0 auto; } .response { background: #252526; padding: 15px; border-radius: 5px; border: 1px solid #3e3e42; margin: 10px 0; white-space: pre-wrap; word-wrap: break-word; } .header { color: #4ec9b0; font-weight: bold; } .error { color: #f48771; } .success { color: #6a9955; }</style>";
echo "</head>";
echo "<body>";
echo "<div class='container'>";
echo "<h1>🔍 API Response Debug</h1>";
echo "<hr>";

// Test /api/health endpoint
echo "<div class='header'>Testing: /api/health</div>";
$ch = curl_init('http://localhost:8000/api/health');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 3);
curl_setopt($ch, CURLOPT_VERBOSE, true);
$verbose = fopen('php://temp', 'w+');
curl_setopt($ch, CURLOPT_STDERR, $verbose);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

echo "<div class='response'>";
echo "<span class='header'>HTTP Status Code:</span> " . htmlspecialchars($httpCode) . "\n\n";
echo "<span class='header'>Raw Response (first 500 chars):</span>\n";
echo htmlspecialchars(substr($response, 0, 500)) . "\n\n";
echo "<span class='header'>Response Length:</span> " . strlen($response) . " bytes\n\n";
echo "<span class='header'>First Character Code:</span> " . ord($response[0]) . " ('" . htmlspecialchars($response[0]) . "')\n\n";

if ($error) {
    echo "<span class='error'>cURL Error:</span> " . htmlspecialchars($error) . "\n";
} else {
    echo "<span class='success'>✅ No cURL errors</span>\n";
}
echo "</div>";

// Test /api/auth/login endpoint
echo "<div class='header'>Testing: /api/auth/login (POST)</div>";
$ch = curl_init('http://localhost:8000/api/auth/login');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 3);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'username' => 'williamodwori',
    'password' => 'Admin@2024Mwendo'
]));

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

echo "<div class='response'>";
echo "<span class='header'>HTTP Status Code:</span> " . htmlspecialchars($httpCode) . "\n\n";
echo "<span class='header'>Raw Response (first 500 chars):</span>\n";
echo htmlspecialchars(substr($response, 0, 500)) . "\n\n";
echo "<span class='header'>Response Length:</span> " . strlen($response) . " bytes\n\n";

if ($response) {
    echo "<span class='header'>First Character Code:</span> " . ord($response[0]) . " ('" . htmlspecialchars($response[0]) . "')\n\n";
}

if ($error) {
    echo "<span class='error'>cURL Error:</span> " . htmlspecialchars($error) . "\n";
} else {
    echo "<span class='success'>✅ No cURL errors</span>\n";
}
echo "</div>";

echo "</div>";
echo "</body>";
echo "</html>";
?>

