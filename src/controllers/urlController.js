// src/controllers/urlController.js

import { prisma } from "../utils/prismaClient.js";
import crypto from "crypto";

// Criar URL encurtada
export async function createUrl(request, reply) {
  const { originalUrl } = request.body;

  if (!originalUrl) {
    return reply.code(400).send({ error: "URL original é obrigatória." });
  }

  const shortUrl = crypto.randomBytes(3).toString("hex"); // gera um código aleatório, tipo "a3f9c1"

  const newUrl = await prisma.url.create({
    data: { originalUrl, shortUrl },
  });

  return reply.code(201).send(newUrl);
}

// Listar todas as URLs
export async function getAllUrls(request, reply) {
  const urls = await prisma.url.findMany();
  return reply.send(urls);
}

// Redirecionar código curto para a URL original
export async function redirectUrl(request, reply) {
  const { shortUrl } = request.params;
  const url = await prisma.url.findUnique({ where: { shortUrl } });

  if (!url) {
    return reply.code(404).send({ error: "URL não encontrada" });
  }

  // redireciona
  reply.redirect(url.originalUrl);
}

// Deletar uma URL
export async function deleteUrl(request, reply) {
  const { id } = request.params;

  await prisma.url.delete({
    where: { id: Number(id) },
  });

  return reply.send({ message: "URL excluída com sucesso" });
}
