<?php
/**
 * Upload and Extract Frontend Build
 */

echo "<!DOCTYPE html>";
echo "<html><head><title>Upload Frontend</title>";
echo "<style>body { font-family: Arial; margin: 20px; } .success { color: green; } .error { color: red; } .step { margin: 10px 0; padding: 10px; background: #f0f0f0; }</style>";
echo "</head><body>";
echo "<h1>📦 Upload Frontend Build</h1>";

$zipFile = '/home/gmooutas/public_html/frontend-dist.zip';
$extractPath = '/home/gmooutas/public_html/';

if (file_exists($zipFile)) {
    echo "<div class='step'><span class='success'>✅ ZIP file found</span></div>";
    
    // Extract ZIP
    $zip = new ZipArchive();
    if ($zip->open($zipFile) === TRUE) {
        $zip->extractTo($extractPath);
        $zip->close();
        echo "<div class='step'><span class='success'>✅ ZIP extracted successfully</span></div>";
        
        // Verify extraction
        if (is_dir($extractPath . 'dist')) {
            echo "<div class='step'><span class='success'>✅ dist/ folder created</span></div>";
            
            // List files
            $files = scandir($extractPath . 'dist');
            echo "<div class='step'>Files in dist/:<br>";
            foreach ($files as $file) {
                if ($file !== '.' && $file !== '..') {
                    echo "  - $file<br>";
                }
            }
            echo "</div>";
            
            echo "<div class='step'><span class='success'>✅ FRONTEND UPLOAD COMPLETE!</span></div>";
            echo "<div class='step'>Now visit: <a href='https://mwendomojawelfare.co.ke'>https://mwendomojawelfare.co.ke</a></div>";
        } else {
            echo "<div class='step'><span class='error'>❌ dist/ folder not found after extraction</span></div>";
        }
    } else {
        echo "<div class='step'><span class='error'>❌ Failed to extract ZIP</span></div>";
    }
} else {
    echo "<div class='step'><span class='error'>❌ ZIP file not found at: $zipFile</span></div>";
    echo "<div class='step'>You need to upload frontend-dist.zip first</div>";
}

echo "</body></html>";
?>

