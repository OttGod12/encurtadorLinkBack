import { userModel } from "../models/userModel.js";

const userController = {
  async create(req, reply) {
    const { email, password } = req.body;
    const { data, error } = await userModel.create(email, password);

    if (error) return reply.status(400).send({ error: error.message });
    return reply.send({ message: "Usuário criado com sucesso!", data });
  },

  async list(req, reply) {
    const { data, error } = await userModel.findAll();
    if (error) return reply.status(400).send({ error: error.message });
    return reply.send(data);
  },
};

export default userController;