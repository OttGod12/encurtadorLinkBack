// src/server.js

import Fastify from "fastify";
import cors from "@fastify/cors";
import { linksRoutes } from "./routes/linksRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.PORT) || 3333;
const HOST = process.env.HOST || "0.0.0.0";

const app = Fastify({ logger: true });

// CORS (dev + produção). Ajuste origin conforme necessidade (ex: seu frontend).
await app.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

// Registrar rotas — linksRoutes é uma função compatível com fastify.register
await app.register(linksRoutes, { prefix: "" });

// Start
try {
  await app.listen({ port: PORT, host: HOST });
  app.log.info(`Servidor rodando em http://${HOST}:${PORT}`);
} catch (err) {
  app.log.error("Erro ao iniciar o servidor:", err);
  process.exit(1);
}

