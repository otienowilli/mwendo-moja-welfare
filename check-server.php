<?php
/**
 * Server Diagnostic Script
 * Upload this to public_html to check what files are there
 */

$baseDir = dirname(__FILE__);

echo "<h1>📊 Server Diagnostic</h1>";
echo "<p><strong>Base Directory:</strong> " . htmlspecialchars($baseDir) . "</p>";
echo "<hr>";

echo "<h2>📁 Files in public_html/</h2>";
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
            echo "📄 $file (" . formatBytes($size) . ")\n";
        }
    }
}

echo "</pre>";

echo "<h2>🔍 Checking for Frontend Files</h2>";

$checks = [
    'index.html' => "$baseDir/index.html",
    'dist/index.html' => "$baseDir/dist/index.html",
    'assets/' => "$baseDir/assets",
    'dist/assets/' => "$baseDir/dist/assets",
    'mwendo-frontend.zip' => "$baseDir/mwendo-frontend.zip",
];

foreach ($checks as $name => $path) {
    if (file_exists($path)) {
        echo "✅ $name exists<br>";
    } else {
        echo "❌ $name NOT found<br>";
    }
}

echo "<hr>";
echo "<h2>📋 Summary</h2>";

if (file_exists("$baseDir/index.html")) {
    echo "✅ Frontend is organized and ready!<br>";
    echo "🌐 Visit: <a href='https://mwendomojawelfare.co.ke'>https://mwendomojawelfare.co.ke</a>";
} elseif (file_exists("$baseDir/dist/index.html")) {
    echo "⚠️ Frontend files are in dist/ folder<br>";
    echo "📝 Need to run organize-frontend.php to move them<br>";
} else {
    echo "❌ Frontend files not found!<br>";
    echo "📝 Need to upload mwendo-frontend.zip and extract it<br>";
}

function formatBytes($bytes) {
    $units = ['B', 'KB', 'MB', 'GB'];
    $bytes = max($bytes, 0);
    $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
    $pow = min($pow, count($units) - 1);
    $bytes /= (1 << (10 * $pow));
    return round($bytes, 2) . ' ' . $units[$pow];
}
?>

