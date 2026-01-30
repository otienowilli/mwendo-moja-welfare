<?php
$baseDir = dirname(__FILE__);

// Create assets directory
@mkdir("$baseDir/assets", 0755);

// Copy JS file to assets
if (file_exists("$baseDir/index-B9yFfzFC.js")) {
    copy("$baseDir/index-B9yFfzFC.js", "$baseDir/assets/index-B9yFfzFC.js");
}

// Copy CSS file to assets
if (file_exists("$baseDir/index-DURfADXE.css")) {
    copy("$baseDir/index-DURfADXE.css", "$baseDir/assets/index-DURfADXE.css");
}

echo "✅ Assets folder created and files copied!";
echo "<br><a href='https://mwendomojawelfare.co.ke'>Test your system</a>";
?>

