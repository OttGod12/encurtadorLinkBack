// src/db/drizzle.js
import dotenv from "dotenv";
dotenv.config();

import dns from "dns";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const { lookup } = dns.promises;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL não encontrada no .env");
}

const connectionString = process.env.DATABASE_URL;

async function createPool() {
  try {
    const url = new URL(connectionString);
    const host = url.hostname;
    const port = url.port ? Number(url.port) : 5432;
    const user = decodeURIComponent(url.username || "");
    const password = decodeURIComponent(url.password || "");
    const database = url.pathname ? url.pathname.replace(/^\//, "") : undefined;

    // Tenta resolver IPv4 para forçar conexão via IPv4 (evita ENETUNREACH em ambientes sem IPv6)
    try {
      const addr = await lookup(host, { family: 4 });
      const ipv4 = addr.address;
      console.log(`Resolved IPv4 for ${host}: ${ipv4}`);

      const pool = new Pool({
        host: ipv4,
        port,
        user,
        password,
        database,
        ssl: { rejectUnauthorized: false }, // necessário em muitos hosts gerenciados (ex: Supabase)
        max: 10,
      });

      return pool;
    } catch (errLookup) {
      // Se não conseguir IPv4 (ou lookup falhar), fallback para usar connectionString
      console.warn(`IPv4 lookup failed for ${host}, falling back to connectionString. Lookup error: ${errLookup.message}`);
      const pool = new Pool({
        connectionString,
        ssl: { rejectUnauthorized: false },
        max: 10,
      });
      return pool;
    }
  } catch (err) {
    // Se parsing da URL falhar, tenta criar Pool direto com connectionString
    console.warn("Erro ao parsear DATABASE_URL, tentando criar pool direto:", err.message);
    const pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 10,
    });
    return pool;
  }
}

let pool;
(async () => {
  pool = await createPool();

  // Teste de conexão rápido
  try {
    const client = await pool.connect();
    client.release();
    console.log("Conexão com o DB estabelecida com sucesso");
  } catch (err) {
    console.error("Erro ao conectar ao DB:", err.message || err);
    // não throwar aqui para não derrubar o processo caso queira lidar externamente;
    // porém em produção você pode escolher process.exit(1)
  }
})();

export const db = drizzle(() => pool); // drizzle aceita função que retorna pool ou pool diretamente
export { pool };
