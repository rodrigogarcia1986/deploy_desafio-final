const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const requisicoes = require('../dados/usuario-dados')
const mensagens = require('../utilitarios/mensagens');


const cadastrarUsuario = async (req, res) => {

    const { nome, email, senha } = req.body

    try {
        usuarioExistente = await requisicoes.buscarUsuarioPorEmail(email)

        if (usuarioExistente) {
            return res.status(400).json({ mensagem: mensagens.emailJaCadastrado })
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const usuarioCadastrado = await requisicoes.cadastrarUsuario({ nome, email, senha: senhaCriptografada })

        return res.status(201).json(usuarioCadastrado)

    } catch (erro) {
        console.log(erro)
        return res.status(500).json({ mensagem: mensagens.erroInterno })
    }
}

const login = async (req, res) => {

    const { email, senha } = req.body

    try {

        usuarioExistente = await requisicoes.buscarUsuarioPorEmail(email)

        if (!usuarioExistente) {
            return res.status(400).json({ mensagem: mensagens.dadosInvalidos })
        }

        if (!(await bcrypt.compare(senha, usuarioExistente.senha))) {
            return res.status(400).json({ mensagem: mensagens.dadosInvalidos })
        }

        const token = jwt.sign({ id: usuarioExistente.id }, process.env.SENHA_HASH, { expiresIn: '7d' })

        return res.json({ token: token })


    } catch (erro) {
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
    usuario = req.usuario;

    try {
        if (email !== usuario.email) {
            usuarioExistente = await requisicoes.buscarUsuarioPorEmail(email)

            if (usuarioExistente) {
                return res.status(400).json({ mensagem: mensagens.emailJaCadastrado });
            }
        }

        const senhaCrypt = await bcrypt.hash(senha, 10);

        await requisicoes.atualizarUsuario({ id: usuario.id, nome, email, senha: senhaCrypt });

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