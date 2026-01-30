<?php
/**
 * ORGANIZE FILES CORRECTLY
 * Moves JS and CSS files into assets folder
 */

$baseDir = dirname(__FILE__);

echo "<!DOCTYPE html>";
echo "<html>";
echo "<head><title>Organize Files</title>";
echo "<style>body { font-family: Arial; margin: 20px; } .success { color: green; font-weight: bold; } .error { color: red; font-weight: bold; } h1 { color: #333; }</style>";
echo "</head>";
echo "<body>";

echo "<h1>🔧 Organizing Files</h1>";
echo "<hr>";

// Create assets folder if it doesn't exist
if (!is_dir("$baseDir/assets")) {
    mkdir("$baseDir/assets", 0755);
    echo "<p class='success'>✅ Created assets folder</p>";
} else {
    echo "<p class='success'>✅ Assets folder exists</p>";
}

// Move JS file
$jsSource = "$baseDir/index-B9yFfzFC.js";
$jsDest = "$baseDir/assets/index-B9yFfzFC.js";

if (file_exists($jsSource)) {
    if (rename($jsSource, $jsDest)) {
        echo "<p class='success'>✅ Moved index-B9yFfzFC.js to assets/</p>";
    } else {
        echo "<p class='error'>❌ Failed to move JS file</p>";
    }
}

// Move CSS file
$cssSource = "$baseDir/index-DURfADXE.css";
$cssDest = "$baseDir/assets/index-DURfADXE.css";

if (file_exists($cssSource)) {
    if (rename($cssSource, $cssDest)) {
        echo "<p class='success'>✅ Moved index-DURfADXE.css to assets/</p>";
    } else {
        echo "<p class='error'>❌ Failed to move CSS file</p>";
    }
}

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

echo "<hr>";
echo "<h2>✨ Files Organized!</h2>";
echo "<p>Your system should now work at:</p>";
echo "<p><a href='https://mwendomojawelfare.co.ke' target='_blank' style='font-size: 18px; color: blue;'>https://mwendomojawelfare.co.ke</a></p>";
echo "<hr>";
echo "<p><strong>⚠️ Next Step:</strong> Delete this file (ORGANIZE_FILES.php) from public_html</p>";

echo "</body>";
echo "</html>";
?>

