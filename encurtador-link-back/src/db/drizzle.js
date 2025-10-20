// src/db/drizzle.js
// Conexão com o Postgres usando pg.Pool e Drizzle ORM


import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
import dotenv from "dotenv";


dotenv.config();


const { Pool } = pkg;


// Permite usar DATABASE_URL ou campos separados (DB_HOST etc.)
const connectionString = process.env.DATABASE_URL || null;


const poolConfig = connectionString
? { connectionString }
: {
host: process.env.DB_HOST || "localhost",
port: Number(process.env.DB_PORT) || 5432,
user: process.env.DB_USER || "postgres",
password: process.env.DB_PASSWORD || "",
database: process.env.DB_NAME || "encurtador_links",
};


const pool = new Pool(poolConfig);


// Testa conexão e registra logs úteis
(async () => {
try {
const client = await pool.connect();
client.release();
console.log("Conexão com o banco bem-sucedida");
} catch (err) {
console.error("Erro ao conectar no banco de dados:", err.message || err);
// não encerra o processo aqui — caller pode decidir como tratar
}
})();


export const db = drizzle(pool);