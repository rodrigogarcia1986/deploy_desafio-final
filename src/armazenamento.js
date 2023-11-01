const aws = require('aws-sdk')

const endpoint = new aws.Endpoint(process.env.S3_ENDPOINT)

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.S3_KEY_ID,
        secretAccessKey: process.env.S3_APP_KEY
    }
})

const armazenarImagem = async (id, path, buffer, mimetype) => {

    const file = await s3.upload({
        Bucket: process.env.S3_BUCKET,
        Key: `produtos/${id}/${path}`,
        Body: buffer,
        ContentType: mimetype
    }).promise()

    return file
}

// Verificar onde estão sendo salvas as imagens para excluir
const excluirImagem = async (path) => {
    await s3.deleteObject({
        Bucket: process.env.S3_BUCKET,
        Key: path
    }).promise()
}

module.exports = {
    armazenarImagem,
    excluirImagem
}