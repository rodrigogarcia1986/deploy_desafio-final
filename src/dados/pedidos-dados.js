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

const cadastrarPedido = async (cliente_id, observacao, valorTotal) => {
  const resultado = await knex("pedidos")
    .insert({
      cliente_id: cliente_id,
      observacao: observacao,
      valor_total: valorTotal,
    })
    .returning("*");
  return resultado[0];
};

const cadastrarProdutoEmPedido = async (pedido, item, valorProduto) => {
  const resultado = await knex("pedido_produtos")
    .insert({
      pedido_id: pedido.id,
      produto_id: item.produto_id,
      quantidade_produto: item.quantidade_produto,
      valor_produto: valorProduto,
    })
    .returning("*");
  return resultado[0];
};

module.exports = {
  listarPedidos,
  listarPedidoCliente,
  buscarCliente,
  cadastrarPedido,
  cadastrarProdutoEmPedido,
};
