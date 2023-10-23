
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

 const buscarProduto = async (id) => {
    return await knex('produtos').where("id", id).first();
}

const excluirProduto = async (id) => {
    return await knex('produtos').where("id", id).del();
}

const atualizarProduto = async (produto) => {
  const resultado = await knex("produtos")
    .where("id", produto.id)
    .update(produto)
    .returning(["id", "descricao", "quantidade_estoque", "valor", "categoria_id"]);
  return resultado[0];
};

const verificarProdutosPorDescricao = async(descricao)=>{
  return await knex("produtos")
  .where('descricao', descricao)
  .first()
}

module.exports = {
    buscarProduto,
    excluirProduto,
    atualizarProduto,
    verificarCategoriaQuery,
    listarProdutoQuery,
    cadastrarProdutoQuery,
    verificarProdutosPorDescricao
}
