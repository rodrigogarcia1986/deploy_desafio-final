const knex = require('../infra/conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const mensagens = {
    erroInterno: 'Erro interno do servidor',
    emailJaCadastrado: 'E-mail já cadastrado! Tente novamente com outro e-mail ou faça login.',
    dadosInválidos: 'Dados inválidos!'
}

const cadastrarUsuario = async (req, res) => {

    const { nome, email, senha } = req.body

    try {
        usuarioExistente = await knex('usuarios').where({ email }).first()

        if (usuarioExistente) {
            return res.status(400).json({ mensagem: mensagens.emailJaCadastrado })
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const usuarioCadastrado = await knex('usuarios').insert({ nome, email, senha: senhaCriptografada }).returning('*')

        const { senha: _, ...usuarioRetornado } = usuarioCadastrado[0]

        return res.status(201).json(usuarioRetornado)

    } catch (erro) {
        //console.log(erro)
        return res.status(500).json({ mensagem: mensagens.erroInterno })
    }
}

const login = async (req, res) => {

    const { email, senha } = req.body

    try {

        usuarioExistente = await knex('usuarios').where({ email }).first()
        console.log(usuarioExistente)

        if (!usuarioExistente) {
            return res.status(400).json({ mensagem: mensagens.dadosInválidos })
        }

        if (!(await bcrypt.compare(senha, usuarioExistente.senha))) {
            return res.status(400).json({ mensagem: mensagens.dadosInválidos })
        }

        const token = jwt.sign({ id: usuarioExistente.id }, process.env.SENHA_HASH, { expiresIn: '7d' })

        return res.json(token)


    } catch (erro) {
        console.log(erro)
        return res.status(500).json({ mensagem: mensagens.erroInterno })
    }

}

const detalharPerfil = async (req, res) => {
    usuario = req.usuario;

    const { senha: _, ...usuarioLogado } = usuario;

    return res.json(usuarioLogado);
}

const atualizarPerfil = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        usuarioExistente = await knex('usuarios').where({ email }).first();

        if (usuarioExistente) {
            return res.status(400).json({ mensagem: mensagens.emailJaCadastrado });
        }

        const senhaCrypt = await bcrypt.hash(senha, 10);

        atualizarUsuario = await knex('usuarios').where('id', req.usuario.id).update({ nome, email, senha: senhaCrypt });

        return res.status(201).json();
    } catch (error) {
        return res.status(500).json({ mensagem: mensagens.erroInterno });
    }
}

module.exports = {
    cadastrarUsuario,
    login,
    detalharPerfil,
    atualizarPerfil
}