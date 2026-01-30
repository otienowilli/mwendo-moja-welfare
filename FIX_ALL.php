<?php
/**
 * MWENDO MOJA - COMPLETE FIX
 * This file fixes everything automatically
 */

$baseDir = dirname(__FILE__);

echo "<!DOCTYPE html>";
echo "<html>";
echo "<head><title>MWENDO MOJA - Fix</title>";
echo "<style>body { font-family: Arial; margin: 20px; } .success { color: green; } .error { color: red; } h1 { color: #333; }</style>";
echo "</head>";
echo "<body>";

echo "<h1>🔧 MWENDO MOJA - System Fix</h1>";
echo "<hr>";

// Create correct index.html
$indexContent = '<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MWENDO MOJA Welfare</title>
    <script type="module" crossorigin src="/assets/index-B9yFfzFC.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-DURfADXE.css">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>';

if (file_put_contents("$baseDir/index.html", $indexContent)) {
    echo "<p class='success'>✅ Created correct index.html</p>";
} else {
    echo "<p class='error'>❌ Failed to create index.html</p>";
}

// Check for assets
if (is_dir("$baseDir/assets")) {
    echo "<p class='success'>✅ Assets folder exists</p>";
    
    $files = scandir("$baseDir/assets");
    foreach ($files as $file) {
        if ($file !== '.' && $file !== '..') {
            echo "<p class='success'>  ✅ Found: $file</p>";
        }
    }
} else {
    echo "<p class='error'>❌ Assets folder not found</p>";
}

echo "<hr>";
echo "<h2>🌐 Test Your System</h2>";
echo "<p>Go to: <a href='https://mwendomojawelfare.co.ke' target='_blank'>https://mwendomojawelfare.co.ke</a></p>";
echo "<p>You should see the LOGIN PAGE</p>";
echo "<hr>";
echo "<p><strong>⚠️ Important:</strong> Delete this file (FIX_ALL.php) after running!</p>";

echo "</body>";
echo "</html>";
?>

