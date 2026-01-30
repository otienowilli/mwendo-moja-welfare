<?php
/**
 * Check Server Log for Errors
 */

echo "<!DOCTYPE html>";
echo "<html>";
echo "<head><title>Server Log</title>";
echo "<style>body { font-family: monospace; margin: 20px; background: #1e1e1e; color: #d4d4d4; } .container { max-width: 1000px; margin: 0 auto; } .log { background: #252526; padding: 15px; border-radius: 5px; border: 1px solid #3e3e42; margin: 10px 0; white-space: pre-wrap; word-wrap: break-word; max-height: 600px; overflow-y: auto; } .header { color: #4ec9b0; font-weight: bold; margin: 10px 0; }</style>";
echo "</head>";
echo "<body>";
echo "<div class='container'>";
echo "<h1>📋 Server Log Check</h1>";
echo "<hr>";

// Check various log locations
$logPaths = [
    '/tmp/mwendo-backend.log',
    '/home/gmooutas/public_html/error_log',
    '/home/gmooutas/error_log',
];

foreach ($logPaths as $logPath) {
    echo "<div class='header'>📄 " . htmlspecialchars($logPath) . "</div>";
    
    if (file_exists($logPath)) {
        $content = file_get_contents($logPath);
        $lines = explode("\n", $content);
        $lastLines = array_slice($lines, -50); // Last 50 lines
        
        echo "<div class='log'>";
        echo htmlspecialchars(implode("\n", $lastLines));
        echo "</div>";
    } else {
        echo "<div class='log'>❌ File not found</div>";
    }
    
    echo "<hr>";
}

// Check if node is installed
echo "<div class='header'>🔍 Checking Node.js Installation</div>";
$nodeVersion = shell_exec('node --version 2>&1');
$npmVersion = shell_exec('npm --version 2>&1');

echo "<div class='log'>";
echo "Node version: " . htmlspecialchars($nodeVersion) . "\n";
echo "NPM version: " . htmlspecialchars($npmVersion) . "\n";
echo "</div>";

echo "<hr>";
echo "<div class='header'>🔍 Checking if Node Process is Running</div>";
$processes = shell_exec('ps aux | grep node 2>&1');
echo "<div class='log'>";
echo htmlspecialchars($processes);
echo "</div>";

echo "</div>";
echo "</body>";
echo "</html>";
?>

