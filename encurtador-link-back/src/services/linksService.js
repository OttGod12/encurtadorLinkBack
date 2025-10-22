import { db } from "../db/drizzle.js";
import { links } from "../db/schema.js";
import { generateCode } from "../utils/generateCode.js";
import { eq, sql } from "drizzle-orm";

const BASE_URL = (process.env.BASE_URL || "http://localhost:3333").replace(/\/+$/, ""); 

export const createLink = async ({ legenda, url_original }) => {
  let codigo;
  let attempts = 0;
  while (true) {
    attempts++;
    if (attempts > 20) throw new Error("Não foi possível gerar um código único depois de várias tentativas");

    codigo = generateCode();

    const found = await db.select().from(links).where(eq(links.codigo, codigo));
    if (!found || found.length === 0) break;
  }

  const inserted = await db.insert(links).values({ legenda, url_original, codigo }).returning();
  const newLink = Array.isArray(inserted) && inserted.length > 0 ? inserted[0] : inserted;

  // Adiciona campo link_curto para conveniência na resposta
  newLink.link_curto = `${BASE_URL}/${newLink.codigo}`;
  return newLink;
};

export const getAllLinks = async () => {
  const result = await db.select().from(links).orderBy(links.id);
  return result.map(link => ({
    ...link,
    link_curto: `${BASE_URL}/${link.codigo}`,
  }));
};

export const updateLink = async (id, { legenda, url_original }) => {
  const toSet = {};
  if (legenda !== null && legenda !== undefined) toSet.legenda = legenda;
  if (url_original !== null && url_original !== undefined) toSet.url_original = url_original;

  if (Object.keys(toSet).length === 0) return;

  await db.update(links).set(toSet).where(eq(links.id, Number(id)));
};

export const deleteLink = async (id) => {
  await db.delete(links).where(eq(links.id, Number(id)));
};

export const getLinkByCode = async (code) => {
  const [link] = await db.select().from(links).where(eq(links.codigo, code));
  return link;
};

export const aumentarClicks = async (id) => {
  // operação segura para incrementar contador (usa sql para atualizar em 1 operação)
  await db.execute(sql`UPDATE links SET cliques = cliques + 1 WHERE id = ${Number(id)}`);
};
