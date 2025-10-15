// src/server.js

import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = Fastify();

app.register(cors, { origin: true });

app.get("/", async (req, reply) => {
  reply.send({ message: "API Encurtador de URL rodando " });
});

// Exemplo de rota simples
app.get("/urls", async (req, reply) => {
  const urls = await prisma.uRL.findMany();
  reply.send(urls);
});

const start = async () => {
  try {
    await app.listen({ port: process.env.PORT || 3333, host: "0.0.0.0" });
    console.log("Servidor rodando em http://localhost:3333");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
