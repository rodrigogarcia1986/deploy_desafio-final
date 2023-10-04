const rotas = require('express').Router()
const usuario = require('./controladores/usuario')
const schemas = require('./validacoes/schemas')
const validarDadosRequisicao = require('./intermediarios/validarDadosRequisicao')
const { autenticar } = require('./intermediarios/autenticador')

//rota pra teste do servidor
rotas.get('/', (req, res) => res.json({ mensagem: "OK" }))

rotas.post('/usuario', validarDadosRequisicao(schemas.schemaUsuario), usuario.cadastrarUsuario)
rotas.post('/login', validarDadosRequisicao(schemas.schemaLogin), usuario.login)

rotas.use(autenticar)

//rota pra testar autenticador
rotas.get('/autenticar', (req, res) => res.json({ mensagem: "OK", usuario: req.usuario }))


module.exports = rotas;