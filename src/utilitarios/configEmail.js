const handle = require('handlebars')
const fs = require('fs/promises')
const correio = require('nodemailer')

const transportador = correio.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
})

const compilarHTML = async (file, context) => {

    raw_HTML = await fs.readFile(file)
    const compilador = handle.compile(raw_HTML.toString())

    const HTML = compilador(context)

    return HTML

}

const enviarEmail = async (html, email, numPedido) => {
    transportador.sendMail({
        from: `${process.env.MAIL_NAME} <${process.env.MAIL_FROM}>`,
        to: email,
        subject: `Pedido #${numPedido} realizado!`,
        html: html
    })
}

module.exports = {
    compilarHTML,
    enviarEmail
}
