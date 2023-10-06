const knex = require("../infra/conexao");

const listarCategorias = async () => {
  return await knex("categorias");
};

module.exports = listarCategorias;
