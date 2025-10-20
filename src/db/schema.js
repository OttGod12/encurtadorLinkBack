// src/db/schema.js
// Definição da tabela `links` usando Drizzle (Postgres)

import { pgTable, serial, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";

export const links = pgTable("links", {
  id: serial("id").primaryKey(),
  legenda: varchar("legenda", { length: 255 }).notNull(),
  url_original: text("url_original").notNull(),
  codigo: varchar("codigo", { length: 10 }).notNull().unique(),
  cliques: integer("cliques").default(0).notNull(),
  criado_em: timestamp("criado_em").defaultNow().notNull(),
});
