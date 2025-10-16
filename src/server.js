// src/server.js 

import Fastify from "fastify";
import cors from "@fastify/cors";
// Importações corrigidas para usar as exportações nomeadas
import { userRoutes } from "./routes/userRoutes.js";
import { urlRoutes } from "./routes/urlRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = Fastify({ logger: true });
await app.register(cors, { origin: "*" });

app.register(userRoutes, { prefix: "/users" });
app.register(urlRoutes, { prefix: "/urls" });

const start = async () => {
  try {
    await app.listen({ port: process.env.PORT || 3000 });
    console.log(`Servidor rodando em http://localhost:${process.env.PORT || 3000}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
