<?php
/**
 * Upload Correct Frontend Files
 * This script will help organize the correct frontend files
 */

$baseDir = dirname(__FILE__);

echo "<h1>🔄 Frontend File Organizer</h1>";
echo "<p>This will organize frontend files correctly</p>";
echo "<hr>";

$success = true;

// Step 1: Check if dist folder exists
if (!is_dir("$baseDir/dist")) {
    echo "❌ dist/ folder not found!<br>";
    echo "Please upload the correct frontend files first.<br>";
    exit;
}

echo "✅ dist/ folder found<br>";

// Step 2: Move files from dist to root
$filesToMove = ['index.html', 'vite.svg'];
foreach ($filesToMove as $file) {
    $source = "$baseDir/dist/$file";
    $dest = "$baseDir/$file";
    
    if (file_exists($source)) {
        if (file_exists($dest)) {
            unlink($dest); // Delete old file
        }
        if (rename($source, $dest)) {
            echo "✅ Moved $file<br>";
        } else {
            echo "❌ Failed to move $file<br>";
            $success = false;
        }
    }
}

// Step 3: Move assets folder
if (is_dir("$baseDir/dist/assets")) {
    $source = "$baseDir/dist/assets";
    $dest = "$baseDir/assets";
    
    if (is_dir($dest)) {
        // Remove old assets folder
        $files = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($dest, RecursiveDirectoryIterator::SKIP_DOTS),
            RecursiveIteratorIterator::CHILD_FIRST
        );
        foreach ($files as $fileinfo) {
            $todo = ($fileinfo->isDir() ? 'rmdir' : 'unlink');
            $todo($fileinfo->getRealPath());
        }
        rmdir($dest);
    }
    
    if (rename($source, $dest)) {
        echo "✅ Moved assets/ folder<br>";
    } else {
        echo "❌ Failed to move assets/ folder<br>";
        $success = false;
    }
}

// Step 4: Remove dist folder
if (is_dir("$baseDir/dist")) {
    if (rmdir("$baseDir/dist")) {
        echo "✅ Removed dist/ folder<br>";
    }
}

echo "<hr>";

if ($success) {
    echo "<h2 style='color: green;'>✅ Frontend Organized Successfully!</h2>";
    echo "<p>Your system should now be accessible at:</p>";
    echo "<p><a href='https://mwendomojawelfare.co.ke' target='_blank'>https://mwendomojawelfare.co.ke</a></p>";
} else {
    echo "<h2 style='color: red;'>⚠️ Some operations failed</h2>";
}

echo "<hr>";
echo "<p><strong>Next:</strong> Delete this file (upload-correct-frontend.php) from public_html</p>";
?>

