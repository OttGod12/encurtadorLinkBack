// src/server.js


// Inicialização do servidor Fastify, carregamento de .env e registro de rotas
 

import Fastify from "fastify";
import cors from "@fastify/cors";
import { linksRoutes } from "./routes/linksRoutes.js";
import "dotenv/config";

const PORT = Number(process.env.PORT) || 3333;
const HOST = process.env.HOST || "0.0.0.0";

const app = Fastify({ logger: true,});

// Habilita CORS para desenvolvimento (localhost e Render)
app.register(cors, { origin: "*" });

// Registra as rotas do módulo de links
app.register(linksRoutes);

// Start do servidor com host/port configuráveis via .env
app.listen({
  port: PORT,
  host: HOST // <- garante compatibilidade com o Render
 }, (err, address) => {
  if (err) {
    console.error("Erro ao iniciar o servidor:",err);
    process.exit(1);
  }
  console.log(`Servidor rodando em ${address}`);
});
