const requisicoes = require('../dados/categoria-dados')
const mensagens = require('../utilitarios/mensagens');

const listarCategorias = async (req, res) => {
    const categorias = await requisicoes();

    return res.status(200).json(categorias)
}

module.exports = { listarCategorias }