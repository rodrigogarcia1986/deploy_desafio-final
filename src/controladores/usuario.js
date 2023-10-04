const knex = require('../infra/conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const cadastrarUsuario = async (req, res) => {

    const { nome, email, senha } = req.body

    try {
        usuarioExistente = await knex('usuarios').where({ email }).first()

        if (usuarioExistente) {
            return res.status(400).json({ mensagem: "E-mail já cadastrado! Tente novamente com outro e-mail ou faça login." })
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const usuarioCadastrado = await knex('usuarios').insert({ nome, email, senha: senhaCriptografada }).returning('*')

        const { senha: _, ...usuarioRetornado } = usuarioCadastrado[0]

        return res.status(201).json(usuarioRetornado)

    } catch (erro) {
        //console.log(erro)
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

const login = async (req, res) => {

    const { email, senha } = req.body

    try {

        usuarioExistente = await knex('usuarios').where({ email }).first()
        console.log(usuarioExistente)

        if (!usuarioExistente) {
            return res.status(400).json({ mensagem: "Dados inválidos!" })
        }

        if (!(await bcrypt.compare(senha, usuarioExistente.senha))) {
            return res.status(400).json({ mensagem: "Dados inválidos!" })
        }

        const token = jwt.sign({ id: usuarioExistente.id }, process.env.SENHA_HASH, { expiresIn: '7d' })

        return res.json(token)


    } catch (erro) {
        console.log(erro)
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }

}

module.exports = {
    cadastrarUsuario,
    login
}