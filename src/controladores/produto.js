const { join } = require("path");
const knex = require("../infra/conexao");
const requisicoes = require("../dados/produto-dados");


const cadastrarProduto = async(req,res)=>{
    const {descricao, quantidade_estoque, valor, categoria_id} = req.body
    try {       
    const categoriaExiste = await requisicoes.verificarCategoriaQuery(categoria_id)

    if(!categoriaExiste){
        return res.status(400).json({messagem:"Essa categoria não existe"})
    }
        await requisicoes.cadastrarProdutoQuery(descricao, quantidade_estoque, valor, categoria_id);

        res.status(201).json({mensagem: "Produto criado com sucesso"});

    } catch (error) {
        return res.status(500).json({mensagem: error.message})   
    }
}


const listarProdutos = async (req,res)=>{
    const produtos = await requisicoes.listarProduto()
    return res.status(200).json(produtos)

}



module.exports = {
cadastrarProduto,
listarProdutos
}