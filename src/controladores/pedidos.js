const requisicao = require('../dados/pedidos-dados');
const mensagem = require('../utilitarios/mensagens');

const listarPedidos = async (req, res) => {
    const { cliente_id } = req.query;

    try {
        if (cliente_id) {
            validarCliente = await requisicao.buscarCliente(cliente_id);

            if (!validarCliente) {
                return res.status(400).json({ mensagem: mensagem.clienteNaoEncontrado });
            }

            const pedido = await requisicao.listarPedidoCliente(cliente_id);

            return res.status(200).json(pedido);
        }

        const pedidos = await requisicao.listarPedidos();

        return res.status(200).json(pedidos);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: mensagem.erroInterno });
    }

}

const cadastrarPedido = async (req, res) => {
    const { observacao, pedido_produtos, cliente_id } = req.body;
  
    try {
      const cliente = await requisicao.buscarCliente(cliente_id);
  
      if (!cliente) {
        return res.status(404).json({ mensagem: mensagem.clienteNaoEncontrado });
      }
  
      const erros = [];
      let valorTotal = 0;
  
      for (const item of pedido_produtos) {
        const produto = await produtoDados.buscarProduto(item.produto_id);
        if (!produto) {
          erros.push({
            mensagem: mensagem.produtoInexistente,
          });
          continue;
        }
  
        if (item.quantidade_produto > produto.quantidade_estoque) {
          erros.push({
            mensagem: mensagem.produtoInsuficiente,
          });
          continue;
        }
  
        valorTotal += produto.valor * item.quantidade_produto;
      }
  
      if (erros.length > 0) {
        return res.status(400).json({ erros });
      }
  
      const pedido = await requisicao.cadastrarPedido(
        cliente_id,
        observacao,
        valorTotal
      );
  
      for (const item of pedido_produtos) {
        const produto = await produtoDados.buscarProduto(item.produto_id);
  
        await requisicao.cadastrarProdutoEmPedido(pedido, item, produto.valor);
  
        produto.quantidade_estoque -= item.quantidade_produto;
        await produtoDados.atualizarProduto(produto);
      }
  
      return res.status(201).json({ mensagem: mensagem.pedidoGerado });
    } catch (error) {
      return res.status(400).json({ mensagem: mensagem.erroInterno });
    }
  };
  
  module.exports = {
    listarPedidos,
    cadastrarPedido,
  };