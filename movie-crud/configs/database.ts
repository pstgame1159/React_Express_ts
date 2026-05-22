import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

export const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     Number(process.env.DB_PORT) || 3306,
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'movie_db',
  waitForConnections: true,
  connectionLimit: 10,
});

export const initializeDatabase = async (): Promise<void> => {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id         INT AUTO_INCREMENT PRIMARY KEY,
      username   VARCHAR(100) NOT NULL UNIQUE,
      password   VARCHAR(255) NOT NULL,
      role       ENUM('MANAGER', 'TEAMLEADER', 'FLOORSTAFF') NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS movies (
      id            INT AUTO_INCREMENT PRIMARY KEY,
      title         VARCHAR(255) NOT NULL,
      year_released INT NOT NULL CHECK(year_released >= 1888 AND year_released <= 2200),
      rating        ENUM('G', 'PG', 'M', 'MA', 'R') NOT NULL,
      created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await seedDefaultUsers();
};

const seedDefaultUsers = async (): Promise<void> => {
  const defaults = [
    { username: 'manager1',    password: 'yODoSX5pNKULtu', role: 'MANAGER' },
    { username: 'teamleader1', password: '1NGms2lVvSZTpQ', role: 'TEAMLEADER' },
    { username: 'staff1',      password: 'mZJg3DGL3z8P03', role: 'FLOORSTAFF' },
  ];

  for (const u of defaults) {
    await pool.execute(
      'INSERT IGNORE INTO users (username, password, role) VALUES (?, ?, ?)',
      [u.username, await bcrypt.hash(u.password, 12), u.role]
    );
  }
};

export default pool;
