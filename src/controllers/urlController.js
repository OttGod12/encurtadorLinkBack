import urlModel from "../models/urlModel.js";
import crypto from "crypto";

const urlController = {
  async create(req, reply) {
    const { originalUrl, userId } = req.body;
    // O modelo deve gerar o shortUrl. O controller não precisa mais do crypto.
    const { data, error } = await urlModel.create(originalUrl, userId);
    if (error) return reply.status(400).send({ error: error.message });

    // O retorno deve usar os dados do modelo, que já inclui o shortUrl.
    return reply.send({ message: "URL encurtada com sucesso!", shortUrl: data.short_url, data });
  },

  async redirect(req, reply) {
    const { shortUrl } = req.params;
    const { data, error } = await urlModel.findByShortUrl(shortUrl);

    if (error || !data) return reply.status(404).send({ message: "URL não encontrada" });
    reply.redirect(data.original_url);
  },
};

export default urlController;