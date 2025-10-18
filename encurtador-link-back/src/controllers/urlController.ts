// src/controllers/urlController.ts

import { PrismaClient } from "@prisma/client";
import { randomBytes } from "crypto";

const prisma = new PrismaClient();

export const createShortUrl = async (request: any, reply: any) => {
  const { originalUrl } = request.body;
  const shortCode = randomBytes(4).toString("hex").slice(0, 6);

  const url = await prisma.url.create({
    data: { originalUrl, shortCode },
  });

  return reply.send(url);
};

export const getOriginalUrl = async (request: any, reply: any) => {
  const { shortCode } = request.params;
  const url = await prisma.url.findUnique({
    where: { shortCode },
  });

  if (!url) return reply.status(404).send({ error: "URL não encontrada" });
  return reply.redirect(url.originalUrl);
};
