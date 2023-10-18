const requisicoes = require('../dados/cliente-dados')
const mensagens = require('../utilitarios/mensagens');

const cadastrarCliente = async (req, res) => {

    const { nome, email, rua, bairro, cidade, estado } = req.body
    let { cpf, cep, numero } = req.body

    if (typeof (cpf) === 'number' && cpf.toString().length !== 11) {
        return res.status(400).json({ mensagem: mensagens.dadosInválidos })
    } else {
        cpf = cpf.toString()
    }

    //limpar caso a string tenha e pontos em locais incomuns (por exemplo: 1.2345-98229-1)
    while (cpf.includes('.')) {
        cpf = cpf.replace('.', '')
    }
    cpf = cpf.replace('-', '')

    //OPCIONAL = formatar cpf para inclusão no BD
    // cpf = `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9,)}`

    if (cep && typeof (cep) === 'number' && cep.toString().length !== 8) {
        return res.status(400).json({ mensagem: mensagens.dadosInválidos })
    } else if (cep && typeof (cep) === 'number') {
        cep = cep.toString()
    }

    if (cep) {
        //limpar caso a string tenha e pontos em locais incomuns (por exemplo: 1.2345-98229-1)
        while (cep.includes('.') || cep.includes('-')) {
            cep = cep.replace('.', '')
            cep = cep.replace('-', '')
        }

        //OPCIONAL = formatar cep para inclusão no BD
        // cep = `${cep.slice(0, 5)}-${cep.slice(5,)}`
    }

    if (numero) {
        numero = numero.toString()
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

const listarCliente = async (req, res) => {

    try {
        return res.json(await requisicoes.buscarTodosClientes())

    } catch (erro) {
        //console.log(erro)
        return res.status(500).json({ mensagem: mensagens.erroInterno })
    }
}

module.exports = {
    cadastrarCliente,
    listarCliente
}