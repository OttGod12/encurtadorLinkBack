// src/server.ts

import Fastify from "fastify";
import cors from "@fastify/cors";
import urlRoutes from "./routes/urlRoutes.js";

const app = Fastify();

app.register(cors, { origin: true });
app.register(urlRoutes);

const start = async () => {
  try {
    await app.listen({ port: process.env.PORT ? Number(process.env.PORT) : 3333, host: "0.0.0.0" });
    console.log(" Servidor rodando!");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
