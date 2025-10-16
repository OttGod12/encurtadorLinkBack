// src/routes/userRoutes.js

import userController from "../controllers/userController.js";

export async function userRoutes(fastify) {
  fastify.post("/", userController.create);
  fastify.get("/", userController.list);
}
