<?php
/**
 * Frontend File Organizer
 * Upload this file to public_html/ and access it via browser
 * Then delete it after running
 */

$baseDir = dirname(__FILE__);

echo "<h2>📁 Frontend File Organizer</h2>";
echo "<p>Base directory: " . htmlspecialchars($baseDir) . "</p>";
echo "<hr>";

$success = true;

// Move index.html
if (file_exists("$baseDir/dist/index.html")) {
    if (rename("$baseDir/dist/index.html", "$baseDir/index.html")) {
        echo "✓ Moved index.html<br>";
    } else {
        echo "✗ Failed to move index.html<br>";
        $success = false;
    }
} else {
    echo "✗ dist/index.html not found<br>";
    $success = false;
}

// Move vite.svg
if (file_exists("$baseDir/dist/vite.svg")) {
    if (rename("$baseDir/dist/vite.svg", "$baseDir/vite.svg")) {
        echo "✓ Moved vite.svg<br>";
    } else {
        echo "✗ Failed to move vite.svg<br>";
        $success = false;
    }
} else {
    echo "✗ dist/vite.svg not found<br>";
}

// Move assets folder
if (file_exists("$baseDir/dist/assets")) {
    if (rename("$baseDir/dist/assets", "$baseDir/assets")) {
        echo "✓ Moved assets folder<br>";
    } else {
        echo "✗ Failed to move assets folder<br>";
        $success = false;
    }
} else {
    echo "✗ dist/assets not found<br>";
    $success = false;
}

// Remove dist folder
if (is_dir("$baseDir/dist")) {
    if (rmdir("$baseDir/dist")) {
        echo "✓ Removed dist folder<br>";
    } else {
        echo "✗ Failed to remove dist folder<br>";
    }
}

// Remove zip file
if (file_exists("$baseDir/mwendo-frontend.zip")) {
    if (unlink("$baseDir/mwendo-frontend.zip")) {
        echo "✓ Removed mwendo-frontend.zip<br>";
    } else {
        echo "✗ Failed to remove zip file<br>";
    }
}

echo "<hr>";

if ($success) {
    echo "<h3 style='color: green;'>✅ Organization Complete!</h3>";
} else {
    echo "<h3 style='color: red;'>⚠️ Some operations failed</h3>";
}

echo "<h4>📋 New structure in public_html/:</h4>";
echo "<pre>";
$files = scandir($baseDir);
sort($files);
foreach ($files as $file) {
    if ($file !== '.' && $file !== '..') {
        if (is_dir("$baseDir/$file")) {
            echo "📁 $file/\n";
        } else {
            echo "📄 $file\n";
        }
    }
}
echo "</pre>";

echo "<h4>📋 Assets folder contents:</h4>";
echo "<pre>";
if (is_dir("$baseDir/assets")) {
    $assets = scandir("$baseDir/assets");
    sort($assets);
    foreach ($assets as $file) {
        if ($file !== '.' && $file !== '..') {
            echo "  📄 $file\n";
        }
    }
} else {
    echo "Assets folder not found!";
}
echo "</pre>";

echo "<hr>";
echo "<p><strong>🌐 Frontend is ready at:</strong> <a href='https://mwendomojawelfare.co.ke' target='_blank'>https://mwendomojawelfare.co.ke</a></p>";
echo "<p><strong>⚠️ Important:</strong> Delete this file (organize-frontend.php) from public_html after running!</p>";
?>

