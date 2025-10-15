// src/server.js

import Fastify from "fastify";
import { urlRoutes } from "./routes/urlRoutes.js";

const app = Fastify({ logger: true });

app.register(urlRoutes);

const start = async () => {
  try {
    await app.listen({ port: 3333 });
    console.log("🚀 Servidor rodando em http://localhost:3333");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
