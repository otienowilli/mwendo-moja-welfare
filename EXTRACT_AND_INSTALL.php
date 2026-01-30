<?php
/**
 * Extract Backend ZIP and Install Dependencies
 */

echo "<!DOCTYPE html>";
echo "<html>";
echo "<head><title>Backend Setup</title>";
echo "<style>body { font-family: Arial; margin: 20px; background: #f5f5f5; } .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; } .success { color: green; font-weight: bold; } .error { color: red; font-weight: bold; } .info { color: blue; } .step { margin: 15px 0; padding: 10px; background: #f9f9f9; border-left: 4px solid #007bff; }</style>";
echo "</head>";
echo "<body>";
echo "<div class='container'>";
echo "<h1>🚀 Backend Setup</h1>";
echo "<hr>";

$zipPath = dirname(__FILE__) . '/backend-deploy.zip';
$publicHtmlPath = dirname(__FILE__);

// Step 1: Check if ZIP exists
echo "<div class='step'><strong>Step 1: Check ZIP file</strong></div>";
if (file_exists($zipPath)) {
    echo "<div class='step'><span class='success'>✅ ZIP file found: backend-deploy.zip</span></div>";
} else {
    echo "<div class='step'><span class='error'>❌ ZIP file not found!</span></div>";
    echo "<div class='step'>Make sure you uploaded <strong>backend-deploy.zip</strong> to public_html</div>";
    exit;
}

// Step 2: Extract ZIP
echo "<div class='step'><strong>Step 2: Extract ZIP file</strong></div>";
$zip = new ZipArchive();
if ($zip->open($zipPath) === TRUE) {
    $zip->extractTo($publicHtmlPath);
    $zip->close();
    echo "<div class='step'><span class='success'>✅ ZIP extracted successfully!</span></div>";
} else {
    echo "<div class='step'><span class='error'>❌ Failed to extract ZIP</span></div>";
    exit;
}

// Step 3: Check if src folder exists
echo "<div class='step'><strong>Step 3: Verify extraction</strong></div>";
if (is_dir($publicHtmlPath . '/src')) {
    echo "<div class='step'><span class='success'>✅ src/ folder found!</span></div>";
} else {
    echo "<div class='step'><span class='error'>❌ src/ folder not found after extraction</span></div>";
    exit;
}

// Step 4: Install npm dependencies
echo "<div class='step'><strong>Step 4: Install npm dependencies</strong></div>";
echo "<div class='step'><span class='info'>Running: npm install --production</span></div>";

$cmd = "cd " . escapeshellarg($publicHtmlPath) . " && npm install --production 2>&1";
$output = shell_exec($cmd);

if (strpos($output, 'added') !== false || strpos($output, 'up to date') !== false) {
    echo "<div class='step'><span class='success'>✅ npm dependencies installed!</span></div>";
} else {
    echo "<div class='step'><span class='info'>⚠️ npm install output:</span></div>";
    echo "<div class='step'><pre style='background: #f0f0f0; padding: 10px; overflow-x: auto;'>" . htmlspecialchars(substr($output, 0, 500)) . "</pre></div>";
}

// Step 5: Start backend
echo "<div class='step'><strong>Step 5: Start backend server</strong></div>";
$startCmd = "cd " . escapeshellarg($publicHtmlPath) . " && nohup node src/server.js > /tmp/mwendo-backend.log 2>&1 &";
shell_exec($startCmd);

sleep(2);

$ch = curl_init('http://localhost:8000/api/health');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 2);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
    echo "<div class='step'><span class='success'>✅ Backend is RUNNING!</span></div>";
    echo "<div class='step'>Response: " . htmlspecialchars($response) . "</div>";
} else {
    echo "<div class='step'><span class='info'>⏳ Backend is starting...</span></div>";
    echo "<div class='step'>Wait 10 seconds and then visit: <a href='https://mwendomojawelfare.co.ke/CHECK_BACKEND_STATUS.php'>CHECK_BACKEND_STATUS.php</a></div>";
}

echo "<hr>";
echo "<div class='step'>";
echo "<strong>✅ Setup Complete!</strong><br>";
echo "Next: <a href='https://mwendomojawelfare.co.ke'>Login to your system</a>";
echo "</div>";

echo "</div>";
echo "</body>";
echo "</html>";
?>

