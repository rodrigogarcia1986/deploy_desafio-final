const knex = require('../infra/conexao')


const verificarCategoriaQuery = async (id) => {
    return await knex("categorias")
        .where('id',id)
        .first()
  };

  const listarProdutoQuery = async () => {
    return await knex("produtos");
  };

  const cadastrarProdutoQuery = async(descricao,quantidade_estoque,valor,categoria_id)=>{
      return await knex("produtos")
      .insert({descricao,quantidade_estoque,valor,categoria_id})
      .returning('*');

  }

  module.exports= {
    verificarCategoriaQuery,
    listarProdutoQuery,
    cadastrarProdutoQuery

  }