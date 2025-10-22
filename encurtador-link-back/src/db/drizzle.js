// src/db/drizzle.js

import dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL não encontrada nas variáveis de ambiente");
}

const max = Number(process.env.DB_POOL_MAX || 10);

// configurar SSL apenas quando for necessário (e.g. production / supabase)
const useSsl = !/localhost|127\.0\.0\.1/.test(process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max,
  ssl: useSsl ? { rejectUnauthorized: false } : undefined,
});

export const db = drizzle(pool);
export { pool };
