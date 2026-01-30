<?php
/**
 * DIAGNOSE SERVER ISSUES
 */

$baseDir = dirname(__FILE__);

echo "<!DOCTYPE html>";
echo "<html>";
echo "<head><title>Diagnose</title>";
echo "<style>body { font-family: Arial; margin: 20px; background: #f5f5f5; } .box { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; } .success { color: green; font-weight: bold; } .error { color: red; font-weight: bold; } h1 { color: #333; } pre { background: #f0f0f0; padding: 10px; overflow-x: auto; }</style>";
echo "</head>";
echo "<body>";

echo "<h1>🔍 Server Diagnostic Report</h1>";

echo "<div class='box'>";
echo "<h2>📁 Current Directory</h2>";
echo "<p><strong>Base Dir:</strong> " . htmlspecialchars($baseDir) . "</p>";
echo "</div>";

echo "<div class='box'>";
echo "<h2>📋 Files in public_html/</h2>";
echo "<pre>";
$files = scandir($baseDir);
sort($files);
foreach ($files as $file) {
    if ($file !== '.' && $file !== '..') {
        $path = "$baseDir/$file";
        if (is_dir($path)) {
            echo "📁 $file/\n";
        } else {
            $size = filesize($path);
            echo "📄 $file (" . round($size/1024, 2) . " KB)\n";
        }
    }
}
echo "</pre>";
echo "</div>";

echo "<div class='box'>";
echo "<h2>🔍 Check index.html</h2>";
if (file_exists("$baseDir/index.html")) {
    echo "<p class='success'>✅ index.html EXISTS</p>";
    $content = file_get_contents("$baseDir/index.html");
    echo "<p><strong>File size:</strong> " . strlen($content) . " bytes</p>";
    echo "<p><strong>Content:</strong></p>";
    echo "<pre>" . htmlspecialchars($content) . "</pre>";
} else {
    echo "<p class='error'>❌ index.html NOT FOUND</p>";
}
echo "</div>";

echo "<div class='box'>";
echo "<h2>🔍 Check assets folder</h2>";
if (is_dir("$baseDir/assets")) {
    echo "<p class='success'>✅ assets/ folder EXISTS</p>";
    $assets = scandir("$baseDir/assets");
    echo "<p><strong>Contents:</strong></p>";
    echo "<pre>";
    foreach ($assets as $file) {
        if ($file !== '.' && $file !== '..') {
            $path = "$baseDir/assets/$file";
            $size = filesize($path);
            echo "  📄 $file (" . round($size/1024, 2) . " KB)\n";
        }
    }
    echo "</pre>";
} else {
    echo "<p class='error'>❌ assets/ folder NOT FOUND</p>";
}
echo "</div>";

echo "<div class='box'>";
echo "<h2>🔍 Check for loose JS/CSS files</h2>";
if (file_exists("$baseDir/index-B9yFfzFC.js")) {
    echo "<p class='error'>⚠️ index-B9yFfzFC.js is in ROOT (should be in assets/)</p>";
}
if (file_exists("$baseDir/index-DURfADXE.css")) {
    echo "<p class='error'>⚠️ index-DURfADXE.css is in ROOT (should be in assets/)</p>";
}
echo "</div>";

echo "<div class='box'>";
echo "<h2>✅ What to do next</h2>";
echo "<p>If you see loose JS/CSS files above, run: <strong>ORGANIZE_FILES.php</strong></p>";
echo "<p>Then visit: <a href='https://mwendomojawelfare.co.ke' target='_blank'>https://mwendomojawelfare.co.ke</a></p>";
echo "</div>";

echo "</body>";
echo "</html>";
?>

