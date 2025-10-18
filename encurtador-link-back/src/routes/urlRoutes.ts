// src/routes/urlRoutes.ts

import { FastifyInstance } from "fastify";
import { createShortUrl, getOriginalUrl } from "../controllers/urlController.js";

export default async function urlRoutes(app: FastifyInstance) {
  app.post("/encurtar", createShortUrl);
  app.get("/:shortCode", getOriginalUrl);
}
