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
    const { observacao, pedido_produtos, cliente_id } = req.body
    const usuario_id = req.usuario_id

    try {

    let erros = [];
    let valorTotal = 0;

    const cliente = await requisicao.buscarCliente(cliente_id);

        if (!cliente) {
            return res.status(404).json({ mensagem: mensagem.clienteNaoEncontrado })
        }

    for(const item of pedido_produtos){
        if(!requisicao.verificarPedido){
            erros.push({
                mensagem: mensagem.produtoInexistente
            })
            continue
        }
    }
    return res.status(201).json({ mensagem: mensagem.pedidoGerado })
   } catch (error) {
    return res.status(400).json({mensagem:mensagem.erroInterno  })
   }
}

module.exports = {
    listarPedidos
}