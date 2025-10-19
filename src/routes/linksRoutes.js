import { linksController } from "../controllers/linksController.js";

export async function linksRoutes(app) {
  app.post("/links", linksController.create);
  app.get("/links", linksController.list);
  app.put("/links/:id", linksController.update);
  app.delete("/links/:id", linksController.remove);
  app.get("/:code", linksController.redirect);
}
