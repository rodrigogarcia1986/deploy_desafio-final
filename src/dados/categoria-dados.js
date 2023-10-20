const knex = require("../infra/conexao");

const listarCategorias = async () => {
  return await knex("categorias");
};

const buscarCategoriaPorId = async (id) => {
  return await knex("categorias").where("id", id).first();
};

module.exports = {
  listarCategorias,
  buscarCategoriaPorId
};
