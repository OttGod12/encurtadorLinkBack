import Fastify from "fastify";
import cors from "@fastify/cors";
import { linksRoutes } from "./routes/linksRoutes.js";
import "dotenv/config";

const app = Fastify();

app.register(cors, { origin: "*" });
app.register(linksRoutes);

app.listen({ port: process.env.PORT || 3333 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor em ${address}`);
});
