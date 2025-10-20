// src/routes/linksRoutes.js
// Define os endpoints relacionados aos links

import { linksController } from "../controllers/linksController.js";

export async function linksRoutes(app) {
  // Cria um novo link encurtado
  app.post("/links", linksController.create);

  // Lista todos os links encurtados
  app.get("/links", linksController.list);

  // Atualiza legenda e/ou URL original de um link
  app.put("/links/:id", linksController.update);

  // Deleta um link pelo ID
  app.delete("/links/:id", linksController.remove);

  // Redireciona para a URL original com base no código curto 
  app.get("/:code", linksController.redirect);
}
