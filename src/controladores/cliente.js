//GET /cliente/:id
const knex = require("../infra/conexao");

const detalharCliente = async (req, res) => {
    const { id } = req.params;

    const cliente = await knex("clientes").where("id", id).first();
    return res.status(200).json(cliente)
}

const atualizarCliente = async (req, res) => {
    const { id } = req.params;


}

module.exports = { detalharCliente, atualizarCliente }