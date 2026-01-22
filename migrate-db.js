/**
 * Database Migration Script
 * Adds password reset columns to users table
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'mwendo_moja.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database error:', err);
    process.exit(1);
  }

  console.log('🔄 Starting database migration...\n');

  // Check if columns exist
  db.all("PRAGMA table_info(users)", (err, columns) => {
    if (err) {
      console.error('Error checking table:', err);
      db.close();
      process.exit(1);
    }

    const hasResetToken = columns.some(col => col.name === 'password_reset_token');
    const hasResetExpires = columns.some(col => col.name === 'password_reset_expires');

    if (hasResetToken && hasResetExpires) {
      console.log('✅ Columns already exist. No migration needed.');
      db.close();
      process.exit(0);
    }

    // Add missing columns
    const migrations = [];

    if (!hasResetToken) {
      migrations.push(
        new Promise((resolve, reject) => {
          db.run('ALTER TABLE users ADD COLUMN password_reset_token VARCHAR(255)', (err) => {
            if (err) {
              console.error('Error adding password_reset_token:', err);
              reject(err);
            } else {
              console.log('✅ Added password_reset_token column');
              resolve();
            }
          });
        })
      );
    }

    if (!hasResetExpires) {
      migrations.push(
        new Promise((resolve, reject) => {
          db.run('ALTER TABLE users ADD COLUMN password_reset_expires DATETIME', (err) => {
            if (err) {
              console.error('Error adding password_reset_expires:', err);
              reject(err);
            } else {
              console.log('✅ Added password_reset_expires column');
              resolve();
            }
          });
        })
      );
    }

    Promise.all(migrations)
      .then(() => {
        console.log('\n✅ Migration completed successfully!');
        db.close();
        process.exit(0);
      })
      .catch((err) => {
        console.error('\n❌ Migration failed:', err);
        db.close();
        process.exit(1);
      });
  });
});

