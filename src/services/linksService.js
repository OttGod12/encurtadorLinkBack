import { db } from "../db/drizzle.js";
import { links } from "../db/schema.js";
import { generateCode } from "../utils/generateCode.js";
import { eq, sql } from "drizzle-orm";

// criar link
export const createLink = async ({ legenda, url_original }) => {
  const codigo = generateCode();

  const [newLink] = await db
    .insert(links)
    .values({ legenda, url_original, codigo })
    .returning();

  newLink.link_curto = `http://localhost:3333/${newLink.codigo}`;
  return newLink;
};

// listar todos os links
export const getAllLinks = async () => {
  const result = await db.select().from(links).orderBy(links.id);
  return result.map(link => ({
    ...link,
    link_curto: `http://localhost:3333/${link.codigo}`,
  }));
};

// att link
export const updateLink = async (id, { legenda, url_original }) => {
  await db
    .update(links)
    .set({ legenda, url_original })
    .where(eq(links.id, Number(id)));
};

// deletar link
export const deleteLink = async (id) => {
  await db.delete(links).where(eq(links.id, Number(id)));
};

// link pelo codigo
export const getLinkByCode = async (code) => {
  const [link] = await db.select().from(links).where(eq(links.codigo, code));
  return link;
};

//aumentar clik
export const aumentarClicks = async (id) => {
  await db.execute(sql`UPDATE links SET cliques = cliques + 1 WHERE id = ${id}`);
};



