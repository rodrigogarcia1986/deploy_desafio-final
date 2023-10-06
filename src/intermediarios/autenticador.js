const jwt = require('jsonwebtoken')
const knex = require('../infra/conexao')

const autenticar = async (req, res, next) => {

    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ mensagem: "Não autorizado: faça login para acessar!" })
    }

    const token = authorization.split(" ")[1]

    try {

        const tokenDecodificado = jwt.decode(token, process.env.SENHA_HASH)

        if (!tokenDecodificado) {
            return res.status(401).json({ mensagem: "Token inválido! Por favor, faça login novamente." })
        }

        console.log(tokenDecodificado.id)

        const usuarioExistente = await knex('usuarios').where({ id: tokenDecodificado.id }).first()

        if (!usuarioExistente) {
            return res.status(403).json({ mensagem: "Cadastro não encontrado!" })
        }

        const { senha: _, ...usuario } = usuarioExistente

        req.usuario = usuario

        next()
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}

module.exports = {
    autenticar
}