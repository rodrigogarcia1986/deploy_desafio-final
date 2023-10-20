const requisicoes = require('../dados/produto-dados');
const mensagens = require('../utilitarios/mensagens');
const categoriaDados = require('../dados/categoria-dados');

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

const atualizarProduto = async (req, res) => {
    const { id } = req.params;
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  
    try {
      produtoExistente = await requisicoes.buscarProduto(id);
      if (!produtoExistente) {
        return res.status(404).json({ mensagem: mensagens.produtoInexistente });
      }
  
      categoriaExistente = await categoriaDados.buscarCategoriaPorId(categoria_id);
      if (!categoriaExistente) {
        return res.status(404).json({ mensagem: mensagens.categoriaInexistente });
      }
  
      await requisicoes.atualizarProduto({
        id,
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      });
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ erro: mensagens.erroInterno }); 
    }
};

const detalharProduto = async (req, res) => {
  const { id } = req.params;

  try {
    produtoExistente = await requisicoes.buscarProduto(id);
    if (!produtoExistente) {
        return res.status(404).json({ mensagem: mensagens.produtoInexistente });
    }
    return res.status(200).json(produtoExistente);
  } catch (error) {
    return res.status(500).json({ erro: mensagens.erroInterno }); 
  }
};

module.exports = {
    excluirProduto,
    atualizarProduto,
    detalharProduto
}