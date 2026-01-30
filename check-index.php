<?php
/**
 * Check index.html content
 */

$indexFile = dirname(__FILE__) . '/index.html';

echo "<h1>📄 Checking index.html</h1>";
echo "<hr>";

if (file_exists($indexFile)) {
    echo "<h2>✅ index.html EXISTS</h2>";
    echo "<p><strong>File size:</strong> " . filesize($indexFile) . " bytes</p>";
    echo "<p><strong>File path:</strong> " . htmlspecialchars($indexFile) . "</p>";
    echo "<hr>";
    
    echo "<h2>📋 File Content:</h2>";
    echo "<pre>";
    echo htmlspecialchars(file_get_contents($indexFile));
    echo "</pre>";
    
    echo "<hr>";
    
    // Check if it references correct assets
    $content = file_get_contents($indexFile);
    
    if (strpos($content, 'index-B9yFfzFC.js') !== false) {
        echo "✅ References CORRECT JavaScript file (index-B9yFfzFC.js)<br>";
    } elseif (strpos($content, 'index-Bae-AoHF.css') !== false) {
        echo "❌ References OLD CSS file (index-Bae-AoHF.css)<br>";
    } else {
        echo "⚠️ Cannot determine which assets are referenced<br>";
    }
    
} else {
    echo "<h2>❌ index.html NOT FOUND</h2>";
    echo "<p>File path: " . htmlspecialchars($indexFile) . "</p>";
}

echo "<hr>";
echo "<p><a href='https://mwendomojawelfare.co.ke'>Back to home</a></p>";
?>

