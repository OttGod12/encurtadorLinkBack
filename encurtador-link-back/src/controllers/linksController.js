// src/controllers/linksController.js
// Controller que usa os validators para endurecer entradas e evitar erros

import * as linksService from "../services/linksService.js";
import {
  isValidId,
  sanitizeString,
  validateCreatePayload,
  validateUpdatePayload,
  validateRedirectCode
} from "../utils/validators.js";

export const linksController = {
  // CRIA um novo link
  async create(request, reply) {
    try {
      const { valid, errors } = validateCreatePayload(request.body);
      if (!valid) return reply.status(400).send({ errors });

      const legenda = sanitizeString(request.body.legenda || "");
      const url_original = sanitizeString(request.body.url_original);

      const newLink = await linksService.createLink({ legenda, url_original });
      return reply.status(201).send(newLink);
    } catch (err) {
      request.log.error(err);
      return reply.status(500).send({ error: "Erro ao criar link", detail: err.message });
    }
  },

  // LISTA todos os links
  async list(request, reply) {
    try {
      const result = await linksService.getAllLinks();
      return reply.send(result);
    } catch (err) {
      request.log.error(err);
      return reply.status(500).send({ error: "Erro ao listar links" });
    }
  },

  // ATUALIZA um link
  async update(request, reply) {
    try {
      const { id } = request.params;
      if (!isValidId(id)) return reply.status(400).send({ error: "ID inválido" });

      const { valid, errors } = validateUpdatePayload(request.body);
      if (!valid) return reply.status(400).send({ errors });

      const legenda = request.body.legenda !== undefined ? sanitizeString(request.body.legenda) : undefined;
      const url_original = request.body.url_original !== undefined ? sanitizeString(request.body.url_original) : undefined;

      await linksService.updateLink(id, { legenda, url_original });
      return reply.send({ message: "Link atualizado com sucesso!" });
    } catch (err) {
      request.log.error(err);
      return reply.status(500).send({ error: "Erro ao atualizar link" });
    }
  },

  // REMOVE um link
  async remove(request, reply) {
    try {
      const { id } = request.params;
      if (!isValidId(id)) return reply.status(400).send({ error: "ID inválido" });

      await linksService.deleteLink(id);
      return reply.send({ message: "Link removido com sucesso!" });
    } catch (err) {
      request.log.error(err);
      return reply.status(500).send({ error: "Erro ao remover link" });
    }
  },

  // REDIRECIONA e incrementa contador
  async redirect(request, reply) {
    try {
      const { code } = request.params;
      const check = validateRedirectCode(code);
      if (!check.valid) return reply.status(400).send({ error: check.error });

      const link = await linksService.getLinkByCode(code);
      if (!link) return reply.status(404).send({ error: "Link não encontrado" });

      await linksService.aumentarClicks(link.id);
      return reply.redirect(302, link.url_original);
    } catch (err) {
      request.log.error(err);
      return reply.status(500).send({ error: "Erro no redirecionamento" });
    }
  }
};
