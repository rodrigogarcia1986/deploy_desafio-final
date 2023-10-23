const requisicoes = require('../dados/produto-dados');
const mensagens = require('../utilitarios/mensagens');
const categoriaDados = require('../dados/categoria-dados');



const cadastrarProduto = async(req,res)=>{
    const {descricao, quantidade_estoque, valor, categoria_id} = req.body
    try { 
      
    const produtoJaCadastrado = await requisicoes.verificarProdutosPorDescricao(descricao)
    if(produtoJaCadastrado){
      return res.status(400).json({mensagem:mensagens.produtoJaCadastrado});
    }
    
    const categoriaExiste = await requisicoes.verificarCategoriaQuery(categoria_id)

    if (!categoriaExiste) {
      return res.status(400).json({ messagem: mensagens.categoriaInexistente })
    }
    await requisicoes.cadastrarProduto(descricao, quantidade_estoque, valor, categoria_id);

    res.status(201).json({ mensagem: mensagens.produtoCriado });

  } catch (error) {
    return res.status(500).json({ mensagem: mensagens.erroInterno })
  }
}


const listarProdutos = async (req, res) => {
  const produtos = await requisicoes.listarProduto()
  return res.status(200).json(produtos)

}

const excluirProduto = async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ mensagem: mensagens.produtoInexistente })
  }

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

  if (isNaN(Number(id))) {
    return res.status(400).json({ mensagem: mensagens.produtoInexistente })
  }

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

  if (isNaN(Number(id))) {
    return res.status(400).json({ mensagem: mensagens.produtoInexistente })
  }

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
cadastrarProduto,
listarProdutos,
excluirProduto,
atualizarProduto,
detalharProduto

}