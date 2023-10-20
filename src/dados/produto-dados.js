const knex = require('../infra/conexao');

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

module.exports = {
    buscarProduto,
    excluirProduto,
    atualizarProduto
}