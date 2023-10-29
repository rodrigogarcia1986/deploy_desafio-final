const knex = require('../infra/conexao')

const verificarCategoria = async (id) => {
  return await knex("categorias")
    .where('id', id)
    .first()
};

const listarProduto = async () => {
  return await knex("produtos");
};

const cadastrarProduto = async (descricao, quantidade_estoque, valor, categoria_id, produto_imagem) => {
  return await knex("produtos")
    .insert({ descricao, quantidade_estoque, valor, categoria_id, produto_imagem })
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
    .returning('*');
  return resultado[0];
};

module.exports = {
  buscarProduto,
  excluirProduto,
  atualizarProduto,
  verificarCategoria,
  listarProduto,
  cadastrarProduto
}
