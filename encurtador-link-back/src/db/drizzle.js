// src/db/drizzle.js
import dotenv from 'dotenv';
dotenv.config();

import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL não encontrada no .env');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Supabase/Render/etc: SSL costuma ser necessário
  ssl: { rejectUnauthorized: false },
  max: 10,
});

// Teste rápido de conexão (não bloqueante)
(async () => {
  try {
    const client = await pool.connect();
    client.release();
    console.log('Conexão com o banco bem-sucedida');
  } catch (err) {
    console.error('Erro ao conectar no banco de dados:', err?.message || err);
  }
})();

export const db = drizzle(pool);
export { pool };
