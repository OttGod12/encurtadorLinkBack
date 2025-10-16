import urlController from "../controllers/urlController.js";

export async function urlRoutes(fastify) {
  fastify.post("/", urlController.create);
  fastify.get("/:shortUrl", urlController.redirect);
}
