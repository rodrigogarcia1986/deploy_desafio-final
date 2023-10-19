const knex = require('../infra/conexao')


const verificarCategoria = async (id) => {
    const resultado = await knex("categorias")
        .where('id',id)
        return resultado;
  };

  module.exports= {
    verificarCategoria

  }