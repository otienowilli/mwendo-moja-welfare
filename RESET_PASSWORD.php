<?php
/**
 * Reset Admin Password
 * This script resets the admin password to a known value
 */

// Database connection
$dbPath = dirname(__FILE__) . '/mwendo_moja.db';

if (!file_exists($dbPath)) {
    echo "❌ Database file not found at: " . htmlspecialchars($dbPath);
    exit;
}

try {
    $db = new PDO('sqlite:' . $dbPath);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "<!DOCTYPE html>";
    echo "<html>";
    echo "<head><title>Reset Password</title>";
    echo "<style>body { font-family: Arial; margin: 20px; } .success { color: green; font-weight: bold; } .error { color: red; font-weight: bold; }</style>";
    echo "</head>";
    echo "<body>";
    
    echo "<h1>🔐 Reset Admin Password</h1>";
    echo "<hr>";
    
    // New password
    $newPassword = "Admin@2024Mwendo";
    $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);
    
    // Update password
    $stmt = $db->prepare("UPDATE users SET password_hash = ? WHERE username = ?");
    $result = $stmt->execute([$hashedPassword, 'williamodwori']);
    
    if ($result) {
        echo "<p class='success'>✅ Password reset successfully!</p>";
        echo "<p><strong>Username:</strong> williamodwori</p>";
        echo "<p><strong>New Password:</strong> Admin@2024Mwendo</p>";
        echo "<hr>";
        echo "<p>Try logging in now at: <a href='https://mwendomojawelfare.co.ke' target='_blank'>https://mwendomojawelfare.co.ke</a></p>";
    } else {
        echo "<p class='error'>❌ Failed to reset password</p>";
    }
    
    echo "</body>";
    echo "</html>";
    
} catch (Exception $e) {
    echo "❌ Error: " . htmlspecialchars($e->getMessage());
}
?>

