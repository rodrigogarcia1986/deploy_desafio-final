const { join } = require("path");
const { verificarCategoria } = require("../dados/produto-dados");


const cadastrarProduto = async(req,res)=>{
    const {descricao, quantidade_estoque, valor, categoria_id} = req.body
    try {       
    const categoriaExiste = verificarCategoria(categoria_id)

        res.status(201).json({categoriaExiste});     
    } catch (error) {
        return res.status(500).json({mensagem: error.message})   
    }
}

module.exports = {
cadastrarProduto,
}