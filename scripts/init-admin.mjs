import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

async function initializeAdmin() {
  try {
    // Parse the database URL
    const url = new URL(DATABASE_URL);
    const connection = await mysql.createConnection({
      host: url.hostname,
      user: url.username,
      password: url.password,
      database: url.pathname.substring(1),
      port: url.port || 3306,
      ssl: {},
    });

    const email = 'weseily@solupedia.com';
    const password = 'Zuna9sK_4SoQ!sx#G';

    // Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Check if admin already exists
    const [existing] = await connection.execute(
      'SELECT * FROM adminCredentials WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      console.log('✓ Admin credentials already exist for', email);
      await connection.end();
      process.exit(0);
    }

    // Insert admin credentials
    await connection.execute(
      'INSERT INTO adminCredentials (email, passwordHash, isActive, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())',
      [email, passwordHash, 1]
    );

    console.log('✓ Admin credentials initialized successfully');
    console.log('Email:', email);
    console.log('Password: (hashed and stored securely)');

    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('Failed to initialize admin credentials:', error);
    process.exit(1);
  }
}

initializeAdmin();
