// src/routes/urlRoutes.js

import { createUrl, getAllUrls, redirectUrl, deleteUrl } from "../controllers/urlController.js";

export async function urlRoutes(app) {
  app.post("/urls", createUrl);        // criar encurtamento
  app.get("/urls", getAllUrls);        // listar todas
  app.get("/:shortUrl", redirectUrl);  // redirecionar
  app.delete("/urls/:id", deleteUrl);  // deletar
}
