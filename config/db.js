import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno desde .env

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'unah',
  password: process.env.DB_PASSWORD || 'unah1234',
  database: process.env.DB_NAME || 'tienda',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
