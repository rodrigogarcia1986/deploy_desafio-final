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

module.exports = {
    listarPedidos
}