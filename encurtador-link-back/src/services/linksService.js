// src/services/linksService.js
// Lógica de negócio: gera código, garante unicidade, persiste no DB e retorna dados formatados

import { db } from "../db/drizzle.js";
import { links } from "../db/schema.js";
import { generateCode } from "../utils/generateCode.js";
import { eq, sql } from "drizzle-orm";


const BASE_URL = process.env.BASE_URL || "http://localhost:3333";


// Cria um link garantindo que o código seja único
export const createLink = async ({ legenda, url_original }) => {
// Gera um código e verifica se já existe no banco; repete até achar um livre
let codigo;
let attempts = 0;
while (true) {
attempts++;
if (attempts > 10) throw new Error("Não foi possível gerar um código único");


codigo = generateCode();


const [found] = await db.select().from(links).where(eq(links.codigo, codigo));
if (!found) break; // código livre
}


const [newLink] = await db
.insert(links)
.values({ legenda, url_original, codigo })
.returning();


newLink.link_curto = `${BASE_URL}/${newLink.codigo}`;
return newLink;
};


// Retorna todos os links com campo link_curto
export const getAllLinks = async () => {
const result = await db.select().from(links).orderBy(links.id);
return result.map(link => ({
...link,
link_curto: `${BASE_URL}/${link.codigo}`,
}));
};


// Atualiza legenda e/ou url_original
export const updateLink = async (id, { legenda, url_original }) => {
const toSet = {};
if (legenda !== null && legenda !== undefined) toSet.legenda = legenda;
if (url_original !== null && url_original !== undefined) toSet.url_original = url_original;


if (Object.keys(toSet).length === 0) return; // nada a atualizar


await db.update(links).set(toSet).where(eq(links.id, Number(id)));
};


// Deleta link permanentemente
export const deleteLink = async (id) => {
await db.delete(links).where(eq(links.id, Number(id)));
};


// Busca link pelo código curto
export const getLinkByCode = async (code) => {
const [link] = await db.select().from(links).where(eq(links.codigo, code));
return link;
};


// Incrementa contador de cliques de forma segura usando SQL
export const aumentarClicks = async (id) => {
// usando sql para somar 1 ao campo cliques
await db.execute(sql`UPDATE links SET cliques = cliques + 1 WHERE id = ${id}`);
};