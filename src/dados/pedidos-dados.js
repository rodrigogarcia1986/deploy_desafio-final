const knex = require('../infra/conexao');

const listarPedidos = async () => {
    const pedidos = await knex('pedidos');
    const pedido_produto = await knex('pedido_produtos');

    return { pedidos, pedido_produto };
}

const listarPedidoCliente = async (cliente_id) => {
    const pedido = await knex('pedidos').where({ cliente_id }).returning('*');
    const pedido_produto = await knex('pedido_produtos').where({ pedido_id: pedido[0].id })

    return { pedido, pedido_produto };
}

const buscarCliente = async (cliente_id) => {
    return await knex('clientes').where({ id: cliente_id }).first();
}

const verificarPedido = async (item) => {
    return await knex("produtos")
      .where("id", "=", item.produto_id).first();
  }

module.exports = {
    listarPedidos,
    listarPedidoCliente,
    buscarCliente, 
    verificarPedido
}