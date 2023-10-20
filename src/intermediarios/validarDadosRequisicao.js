const validarDadosRequisicao = joiSchema => async (req, res, next) => {

    try {

        await joiSchema.validateAsync(req.body)
        next()

    } catch (erro) {
        console.log(erro);
        return res.status(400).json({ erro: erro.message })
    }

}

const validarDadosParametro = joiSchema => async (req, res, next) => {

    try {

        await joiSchema.validateAsync(req.params)
        next()

    } catch (erro) {
        return res.status(400).json({ erro: erro.message })
    }

}
module.exports = {
    validarDadosRequisicao,
    validarDadosParametro
}