<?php
/**
 * Find Database Location
 * This script searches for the mwendo_moja.db file
 */

echo "<!DOCTYPE html>";
echo "<html>";
echo "<head><title>Find Database</title>";
echo "<style>body { font-family: Arial; margin: 20px; } .path { background: #f0f0f0; padding: 10px; margin: 10px 0; border-left: 4px solid #007bff; } .found { color: green; font-weight: bold; } .notfound { color: red; }</style>";
echo "</head>";
echo "<body>";

echo "<h1>🔍 Searching for Database File</h1>";
echo "<hr>";

$searchPaths = [
    '/home/gmooutas/public_html/mwendo_moja.db',
    '/home/gmooutas/mwendo_moja.db',
    '/home/gmooutas/mwendo-moja/mwendo_moja.db',
    '/home/gmooutas/nodevenv/mwendo_moja.db',
    dirname(__FILE__) . '/mwendo_moja.db',
    dirname(__FILE__) . '/../mwendo_moja.db',
    dirname(__FILE__) . '/../../mwendo_moja.db',
];

echo "<h3>Checking common locations:</h3>";

foreach ($searchPaths as $path) {
    if (file_exists($path)) {
        echo "<div class='path'><span class='found'>✅ FOUND:</span> " . htmlspecialchars($path) . "</div>";
    } else {
        echo "<div class='path'><span class='notfound'>❌ Not found:</span> " . htmlspecialchars($path) . "</div>";
    }
}

echo "<hr>";
echo "<h3>Current Directory Info:</h3>";
echo "<div class='path'><strong>Current Script:</strong> " . htmlspecialchars(__FILE__) . "</div>";
echo "<div class='path'><strong>Current Dir:</strong> " . htmlspecialchars(dirname(__FILE__)) . "</div>";

echo "<h3>Files in current directory:</h3>";
$files = scandir(dirname(__FILE__));
echo "<pre>";
foreach ($files as $file) {
    if (strpos($file, '.db') !== false || strpos($file, 'mwendo') !== false) {
        echo "📄 " . htmlspecialchars($file) . "\n";
    }
}
echo "</pre>";

echo "</body>";
echo "</html>";
?>

