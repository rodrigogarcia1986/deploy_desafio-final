const knex = require("../infra/conexao");

const cadastrarUsuario = async (usuario) => {
  const resultado = await knex("usuarios")
    .insert(usuario)
    .returning(["id", "nome", "email"]);
  return resultado[0];
};

const buscarUsuarioPorEmail = async (email) => {
  return await knex("usuarios").where("email", email).first();
};

const atualizarUsuario = async (usuario) => {
  const resultado = await knex("usuarios")
    .where("id", usuario.id)
    .update(usuario)
    .returning(["id", "nome", "email"]);
  return resultado[0];
};

const buscarUsuarioPorId = async (id) => {
  return await knex("usuarios").where("id", id).first();
};

module.exports = {
  cadastrarUsuario,
  buscarUsuarioPorEmail,
  buscarUsuarioPorId,
  atualizarUsuario,
};
