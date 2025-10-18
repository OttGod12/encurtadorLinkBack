// src/infra/db/schema.ts

import { pgTable, text, timestamp, integer, uuid } from " não sei ";

export const links = pgTable("links", {
  id: uuid("id").primaryKey().defaultRandom(),
  legenda: text("legenda"),
  url: text("url").notNull(),
  codigo: text("codigo").notNull().unique(),
  clicks: integer("clicks").notNull().default(0),
  created_at: timestamp("created_at").defaultNow()
});

export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;
