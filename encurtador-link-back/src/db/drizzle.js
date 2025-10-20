// src/db/drizzle.js
import 'dotenv/config';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

// 🔹 Verifica se a variável está definida
if (!process.env.DATABASE_URL) {
  throw new Error(' DATABASE_URL não encontrada no arquivo .env');
}

// 🔹 Cria o cliente postgres-js
const client = postgres(process.env.DATABASE_URL, {
  ssl: 'require', // Necessário para Supabase
  max: 10,        // Limite de conexões
  onnotice: () => {}, // Evita warnings no console
});

//  Cria a instância do drizzle
export const db = drizzle(client);

//  (Opcional) Exporta o client se quiser usar queries diretas
export { client };
