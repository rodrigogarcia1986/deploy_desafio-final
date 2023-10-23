const knex = require("../infra/conexao");

const cadastrarCliente = async (cliente) => {
    const resultado = await knex('clientes')
        .insert(cliente)
        .returning('*');
    return resultado[0];
};

const buscarClientePorEmail = async (email) => {
    const resultado = await knex('clientes')
        .where({ email })
        .first()
    return resultado
}

const buscarClientePorCPF = async (cpf) => {
    const resultado = await knex('clientes')
        .where({ cpf })
        .first()
    return resultado
}

const buscarTodosClientes = async () => {
    const resultado = await knex('clientes')
    return resultado
}

const buscarClientePorId = async (id) => {
    return knex("clientes").where({ id }).first()
};

const atualizarCliente = async (cliente, id) => {
    return knex("clientes")
        .update(cliente)
        .where({ id })
        .returning("*");
}

module.exports = {
    cadastrarCliente,
    buscarClientePorEmail,
    buscarClientePorCPF,
    buscarTodosClientes,
    buscarClientePorId,
    atualizarCliente,
}