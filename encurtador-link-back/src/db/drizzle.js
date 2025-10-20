// encurtador-link-back/src/db/drizzle.js

import dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL não encontrada");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 10,
});

export const db = drizzle(pool);
export { pool };