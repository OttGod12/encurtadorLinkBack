import * as linksService from "../services/linksService.js";

export const linksController = {
  // criar link
  async create(request, reply) {
    const { legenda, url_original } = request.body;

    if (!url_original || !/^https?:\/\//.test(url_original)) {
      return reply.status(400).send({ error: "URL inválida" });
    }

    const newLink = await linksService.createLink({ legenda, url_original });
    return reply.status(201).send(newLink);
  },

  // listar todos
  async list(request, reply) {
    const result = await linksService.getAllLinks();
    return reply.send(result);
  },

  // atualizar
  async update(request, reply) {
    const { id } = request.params;
    const { legenda, url_original } = request.body;

    await linksService.updateLink(id, { legenda, url_original });
    return reply.send({ message: "Link atualizado com sucesso!" });
  },

  // deletar
  async remove(request, reply) {
    const { id } = request.params;
    await linksService.deleteLink(id);
    return reply.send({ message: "Link removido com sucesso!" });
  },


async redirect(request, reply) {
  const { code } = request.params;
  const link = await linksService.getLinkByCode(code);

  if (!link) return reply.status(404).send({ error: "Link não encontrado" });

  await linksService.aumentarClicks(link.id);

  reply.redirect(link.url_original);
}



};
