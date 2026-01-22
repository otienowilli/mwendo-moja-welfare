const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'mwendo_moja.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database error:', err);
    process.exit(1);
  }

  console.log('🔄 MIGRATING MEMBERS TABLE\n');
  console.log('Adding new columns: first_name, middle_name, last_name, email\n');

  // Check if columns already exist
  db.all("PRAGMA table_info(members)", (err, columns) => {
    if (err) {
      console.error('Error checking table:', err);
      db.close();
      process.exit(1);
    }

    const columnNames = columns.map(col => col.name);
    const needsMigration = !columnNames.includes('first_name');

    if (!needsMigration) {
      console.log('✅ Members table already has the new columns');
      db.close();
      process.exit(0);
    }

    // Add columns
    const migrations = [
      "ALTER TABLE members ADD COLUMN first_name VARCHAR(50)",
      "ALTER TABLE members ADD COLUMN middle_name VARCHAR(50)",
      "ALTER TABLE members ADD COLUMN last_name VARCHAR(50)",
      "ALTER TABLE members ADD COLUMN email VARCHAR(100) UNIQUE"
    ];

    let completed = 0;

    migrations.forEach((migration, index) => {
      db.run(migration, (err) => {
        if (err) {
          console.error(`❌ Error in migration ${index + 1}:`, err.message);
        } else {
          console.log(`✅ Migration ${index + 1} completed`);
        }
        completed++;

        if (completed === migrations.length) {
          console.log('\n✅ ALL MIGRATIONS COMPLETED\n');
          console.log('New columns added to members table:');
          console.log('  • first_name (VARCHAR 50)');
          console.log('  • middle_name (VARCHAR 50)');
          console.log('  • last_name (VARCHAR 50)');
          console.log('  • email (VARCHAR 100, UNIQUE)\n');
          db.close();
          process.exit(0);
        }
      });
    });
  });
});

