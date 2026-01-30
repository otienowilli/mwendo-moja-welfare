<?php
/**
 * List all files in public_html
 */

echo "<!DOCTYPE html>";
echo "<html>";
echo "<head><title>File List</title>";
echo "<style>body { font-family: monospace; margin: 20px; background: #f5f5f5; } .container { max-width: 1000px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; } .file { padding: 5px; border-bottom: 1px solid #ddd; } .dir { color: blue; font-weight: bold; } .size { color: gray; }</style>";
echo "</head>";
echo "<body>";
echo "<div class='container'>";
echo "<h1>📁 Files in public_html</h1>";
echo "<hr>";

$dir = dirname(__FILE__);
echo "<div>Current Directory: <strong>" . htmlspecialchars($dir) . "</strong></div>";
echo "<hr>";

function listFiles($path, $prefix = '') {
    $items = scandir($path);
    foreach ($items as $item) {
        if ($item === '.' || $item === '..') continue;
        
        $fullPath = $path . '/' . $item;
        $isDir = is_dir($fullPath);
        
        if ($isDir) {
            echo "<div class='file'><span class='dir'>📁 " . htmlspecialchars($prefix . $item) . "/</span></div>";
            if (strlen($prefix) < 20) { // Limit depth
                listFiles($fullPath, $prefix . $item . '/');
            }
        } else {
            $size = filesize($fullPath);
            echo "<div class='file'>📄 " . htmlspecialchars($prefix . $item) . " <span class='size'>(" . number_format($size) . " bytes)</span></div>";
        }
    }
}

listFiles($dir);

echo "<hr>";
echo "<div>";
echo "<strong>⚠️ If you don't see 'src' folder, the backend code is NOT uploaded!</strong><br>";
echo "You need to upload the entire backend source code to the server.";
echo "</div>";

echo "</div>";
echo "</body>";
echo "</html>";
?>

