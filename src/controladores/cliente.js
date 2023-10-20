//GET /cliente/:id
const knex = require("../infra/conexao");
const mensagens = require('../utilitarios/mensagens');
const requisicoes = require('../dados/cliente-dados')

const cadastrarCliente = async (req, res) => {

    const { nome, email, rua, bairro, cidade, estado, cpf, cep, numero } = req.body

    if (isNaN(Number(cpf))) {
        return res.status(400).json({ mensagem: mensagens.cpfInvalido })
    }

    if (cep && isNaN(Number(cep))) {
        return res.status(400).json({ mensagem: "O cep informado deve conter apenas números." })
    }

    try {
        const clienteEmailExistente = await requisicoes.buscarClientePorEmail(email)

        if (clienteEmailExistente) {
            return res.status(400).json({ mensagem: mensagens.emailJaCadastrado })
        }

        const clienteCpfExistente = await requisicoes.buscarClientePorCPF(cpf)

        if (clienteCpfExistente) {
            return res.status(400).json({ mensagem: mensagens.cpfJaCadastrado })
        }

        const resultado = await requisicoes.cadastrarCliente({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })

        return res.status(201).json(resultado)

    } catch (erro) {
        console.log(erro)
        return res.status(500).json({ mensagem: mensagens.erroInterno })
    }
}

const detalharCliente = async (req, res) => {
    const { id } = req.params;

    try {
        const cliente = await requisicoes.buscarClientePorId(id) //knex("clientes").where("id", id).first();

        if (!cliente) {
            return res.status(404).json({ mensagem: mensagens.clienteNaoEncontrado })
        }

        return res.status(200).json(cliente)

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: mensagens.erroInterno })
    }
}

const atualizarCliente = async (req, res) => {
    const { id } = req.params;
    let { cpf, cep, email } = req.body

    if (isNaN(Number(cpf))) {
        return res.status(400).json({ mensagem: mensagens.cpfInvalido })
    }

    if (cep && isNaN(Number(cep))) {
        return res.status(400).json({ mensagem: "O cep informado deve conter apenas números." })
    }

    try {
        const cliente = await requisicoes.buscarClientePorId(id);

        if (!cliente) {
            return res.status(404).json({ mensagem: mensagens.clienteNaoEncontrado })
        }

        const clienteEmailExistente = await requisicoes.buscarClientePorEmail(email)

        if (clienteEmailExistente) {
            return res.status(400).json({ mensagem: mensagens.emailJaCadastrado })
        }

        const clienteCpfExistente = await requisicoes.buscarClientePorCPF(cpf);

        if (clienteCpfExistente) {
            return res.status(400).json({ mensagem: mensagens.cpfJaCadastrado })
        }

        const clienteAtualizado = await requisicoes.atualizarCliente(req.body, id);

        return res.status(200).json(clienteAtualizado)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: mensagens.erroInterno })
    }
}

module.exports = { detalharCliente, atualizarCliente, cadastrarCliente }