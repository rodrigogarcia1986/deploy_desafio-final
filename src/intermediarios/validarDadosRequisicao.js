const validarDadosRequisicao = joiSchema => async (req, res, next) => {

    try {

        await joiSchema.validateAsync(req.body)
        next()

    } catch (erro) {
        return res.status(400).json({ erro: erro.message })
    }

}

module.exports = validarDadosRequisicao