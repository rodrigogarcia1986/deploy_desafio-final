const knex = require('../infra/conexao');

const buscarProduto = async (id) => {
    return await knex('produtos').where({ id }).first();
}

const excluirProduto = async (id) => {
    return await knex('produtos').where({ id }).del();
}

module.exports = {
    buscarProduto,
    excluirProduto
}