const requisicoes = require('../dados/produto-dados');
const mensagens = require('../utilitarios/mensagens');
const knex = require('../infra/conexao')

const excluirProduto = async (req, res) => {
    const { id } = req.params;
    try {
        produtoExistente = await requisicoes.buscarProduto(id);
        if (!produtoExistente) {
            return res.status(400).json({ mensagem: mensagens.produtoInexistente });
        }

        await requisicoes.excluirProduto(id);

        return res.status(200).json()
    } catch (error) {
        console.log(error);
        return res.status(500).json({ erro: mensagens.erroInterno });
    }
}

module.exports = {
    excluirProduto
}