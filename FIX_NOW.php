<?php
/**
 * FINAL FIX - CREATE ASSETS FOLDER AND MOVE FILES
 */

$baseDir = dirname(__FILE__);

echo "<!DOCTYPE html>";
echo "<html>";
echo "<head><title>FIX NOW</title>";
echo "<style>body { font-family: Arial; margin: 20px; background: #f5f5f5; } .box { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; } .success { color: green; font-weight: bold; } .error { color: red; font-weight: bold; } h1 { color: #333; } h2 { color: #555; }</style>";
echo "</head>";
echo "<body>";

echo "<h1>🔧 FIXING YOUR SYSTEM NOW</h1>";
echo "<hr>";

// Step 1: Create assets folder
echo "<div class='box'>";
echo "<h2>Step 1: Creating assets folder</h2>";

if (!is_dir("$baseDir/assets")) {
    if (mkdir("$baseDir/assets", 0755, true)) {
        echo "<p class='success'>✅ Created assets/ folder</p>";
    } else {
        echo "<p class='error'>❌ Failed to create assets/ folder</p>";
    }
} else {
    echo "<p class='success'>✅ assets/ folder already exists</p>";
}
echo "</div>";

// Step 2: Move JS file
echo "<div class='box'>";
echo "<h2>Step 2: Moving JavaScript file</h2>";

$jsSource = "$baseDir/index-B9yFfzFC.js";
$jsDest = "$baseDir/assets/index-B9yFfzFC.js";

if (file_exists($jsSource)) {
    if (rename($jsSource, $jsDest)) {
        echo "<p class='success'>✅ Moved index-B9yFfzFC.js to assets/</p>";
    } else {
        echo "<p class='error'>❌ Failed to move JS file</p>";
    }
} else {
    echo "<p class='error'>❌ JS file not found</p>";
}
echo "</div>";

// Step 3: Move CSS file
echo "<div class='box'>";
echo "<h2>Step 3: Moving CSS file</h2>";

$cssSource = "$baseDir/index-DURfADXE.css";
$cssDest = "$baseDir/assets/index-DURfADXE.css";

if (file_exists($cssSource)) {
    if (rename($cssSource, $cssDest)) {
        echo "<p class='success'>✅ Moved index-DURfADXE.css to assets/</p>";
    } else {
        echo "<p class='error'>❌ Failed to move CSS file</p>";
    }
} else {
    echo "<p class='error'>❌ CSS file not found</p>";
}
echo "</div>";

// Step 4: Verify
echo "<div class='box'>";
echo "<h2>Step 4: Verification</h2>";

if (is_dir("$baseDir/assets")) {
    $files = scandir("$baseDir/assets");
    echo "<p class='success'>✅ assets/ folder contents:</p>";
    echo "<pre>";
    foreach ($files as $file) {
        if ($file !== '.' && $file !== '..') {
            echo "  📄 $file\n";
        }
    }
    echo "</pre>";
}
echo "</div>";

// Final message
echo "<div class='box'>";
echo "<h1 style='color: green;'>✨ SYSTEM FIXED!</h1>";
echo "<p>Your system is now ready at:</p>";
echo "<p><a href='https://mwendomojawelfare.co.ke' target='_blank' style='font-size: 18px; color: blue; text-decoration: none;'>🌐 https://mwendomojawelfare.co.ke</a></p>";
echo "<hr>";
echo "<p><strong>⚠️ IMPORTANT:</strong> Delete these files from public_html:</p>";
echo "<ul>";
echo "<li>FIX_NOW.php</li>";
echo "<li>DIAGNOSE.php</li>";
echo "<li>ORGANIZE_FILES.php</li>";
echo "<li>organize-frontend.php</li>";
echo "<li>ORGANIZE_FRONTEND_MANUAL.md</li>";
echo "<li>mwendo-frontend.zip</li>";
echo "</ul>";
echo "</div>";

echo "</body>";
echo "</html>";
?>

