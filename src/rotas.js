const rotas = require('express').Router()
const usuario = require('./controladores/usuario')
const cliente = require('./controladores/cliente')
const categoria = require('./controladores/categoria')
const schemas = require('./validacoes/schemas')
const validarDadosRequisicao = require('./intermediarios/validarDadosRequisicao')
const { autenticar } = require('./intermediarios/autenticador')
const produto = require('./controladores/produtos');

//rota pra teste do servidor
rotas.get('/', (req, res) => res.json({ mensagem: "OK" }))

rotas.post('/usuario', validarDadosRequisicao(schemas.schemaUsuario), usuario.cadastrarUsuario)
rotas.post('/login', validarDadosRequisicao(schemas.schemaLogin), usuario.login)
rotas.get('/categoria', categoria.listarCategorias)

//daqui para baixo, rotas protegidas
rotas.use(autenticar)

rotas.get('/usuario', usuario.detalharPerfil);
rotas.put('/usuario', validarDadosRequisicao(schemas.schemaUsuario), usuario.atualizarPerfil)

rotas.post('/cliente', validarDadosRequisicao(schemas.schemaCliente), cliente.cadastrarCliente)
rotas.get('/cliente', cliente.listarCliente)


//rota pra testar autenticador
rotas.get('/autenticar', (req, res) => res.json({ mensagem: "OK", usuario: req.usuario }))

rotas.delete('/produto/:id', produto.excluirProduto);


module.exports = rotas
