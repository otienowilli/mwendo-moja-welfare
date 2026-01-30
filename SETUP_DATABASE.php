<?php
/**
 * Setup Database on Server
 * Creates database with admin user if it doesn't exist
 */

echo "<!DOCTYPE html>";
echo "<html>";
echo "<head><title>Database Setup</title>";
echo "<style>body { font-family: Arial; margin: 20px; background: #f5f5f5; } .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; } .success { color: green; font-weight: bold; } .error { color: red; font-weight: bold; } .info { color: blue; } .step { margin: 15px 0; padding: 10px; background: #f9f9f9; border-left: 4px solid #007bff; }</style>";
echo "</head>";
echo "<body>";
echo "<div class='container'>";
echo "<h1>🗄️ Database Setup</h1>";
echo "<hr>";

$dbPath = dirname(__FILE__) . '/mwendo_moja.db';

// Check if database exists
if (file_exists($dbPath)) {
    echo "<div class='step'><span class='success'>✅ Database found at:</span> " . htmlspecialchars($dbPath) . "</div>";
} else {
    echo "<div class='step'><span class='info'>📝 Creating new database...</span></div>";
    
    try {
        // Create SQLite database
        $db = new PDO('sqlite:' . $dbPath);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Create users table
        $db->exec("CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE,
            password_hash TEXT NOT NULL,
            role TEXT DEFAULT 'member',
            status TEXT DEFAULT 'active',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )");
        
        // Create admin user
        $password = 'Admin@2024Mwendo';
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        
        $stmt = $db->prepare("INSERT OR IGNORE INTO users (username, email, password_hash, role, status) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute(['williamodwori', 'williamodwori2021@gmail.com', $hashedPassword, 'admin', 'active']);
        
        echo "<div class='step'><span class='success'>✅ Database created successfully!</span></div>";
        echo "<div class='step'><span class='info'>📝 Admin user created:</span><br>";
        echo "Username: <strong>williamodwori</strong><br>";
        echo "Password: <strong>Admin@2024Mwendo</strong><br>";
        echo "Role: <strong>admin</strong></div>";
        
    } catch (Exception $e) {
        echo "<div class='step'><span class='error'>❌ Error creating database:</span> " . htmlspecialchars($e->getMessage()) . "</div>";
    }
}

echo "<hr>";
echo "<div class='step'><span class='success'>✅ Setup Complete!</span><br>";
echo "You can now login with:<br>";
echo "<strong>Username:</strong> williamodwori<br>";
echo "<strong>Password:</strong> Admin@2024Mwendo</div>";

echo "</div>";
echo "</body>";
echo "</html>";
?>

