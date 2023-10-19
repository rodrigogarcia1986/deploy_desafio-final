const Joi = require('joi');

const schemaUsuario = Joi.object({
    nome: Joi.string()
        .min(3)
        .max(100)
        .required()
        .empty('')
        .messages({
            'any.required': 'É necessário informar o nome.',
            'string.min': 'O nome não pode ter menos que 3 caracteres.',
            'string.max': 'O nome não pode ter mais que 100 caracteres.',
            'any.empty': 'O nome não pode ser um campo vazio'
        }),

    email: Joi.string()
        .email()
        .required()
        .empty('')
        .messages({
            'string.email': 'Por favor, insira um e-mail válido!',
            'any.required': 'É necessário informar um e-mail',
            'any.empty': 'O e-mail não pode ser um campo vazio'

        }),

    senha: Joi.string()
        // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')), //seria um plus, mas não sei se as próximas sprints vão pedir algo do tipo...
        .min(3)
        .required()
        .empty('')
        .messages({
            'any.required': 'É necessário informar uma senha.',
            'string.min': 'A senha informada deve ter mais que 3 caracteres.',
            'any.empty': 'A senha não pode ser um campo vazio'
        }),

})

const schemaLogin = Joi.object({

    email: Joi.string()
        .email()
        .required()
        .empty('')
        .messages({
            'string.email': 'Por favor, insira um e-mail válido!',
            'any.required': 'É necessário informar um e-mail',
            'any.empty': 'O e-mail não pode ser um campo vazio'
        }),

    senha: Joi.string()
        // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')), //seria um plus, mas não sei se as próximas sprints vão pedir algo do tipo...
        .min(3)
        .required()
        .empty('')
        .messages({
            'any.required': 'É necessário informar uma senha.',
            'string.min': 'A senha informada deve ter mais que 3 caracteres.',
            'any.empty': 'A senha não pode ser um campo vazio'
        }),

})

const schemaProduto = Joi.object({

    descricao:Joi.string()
        .min(3)
        .max(100)
        .required()
        .empty('')
        .messages({
            'any.required': 'É necessário informar a descrição do produto.',
            'string.min': 'A descrição do produto não pode ter menos que 3 caracteres.',
            'string.max': 'A descrição do produto não pode ter mais que 100 caracteres.',
            'any.empty': 'A descrição do produto não pode ser um campo vazio'
        }),
    
    quantidade_estoque:Joi.number()// precisa de máximo? string?
        .min(1)
        .required()
        .positive()
        .empty('')
        .messages({
            'any.required': 'É necessário informar a quantidade do produto.',
            'string.min': 'A quantidade informada deve ter mais que 1 caracteres.',
            'number.positive': 'A quantidade de estoque precisa ser um número positivo',
            'number.base': 'O campo quantidade_estoque precisa ser um número',
            'any.empty': 'A quantidade não pode ser um campo vazio'
    }),
    
    
    valor:Joi.number() 
        .min(1)
        .required()
        .positive()
        .empty('')
        .messages({
            'any.required': 'É necessário informar o valor do produto.',
            'number.min': 'O valor deve ser maior ou igual a 1.',
            'number.positive': 'O valor precisa ser um número positivo',
            'number.base': 'O valor precisa ser um número',
            'any.empty': 'O valor não pode ser um campo vazio'
    }),


    categoria_id:Joi.number() 
        .integer() 
        .positive()
        .required()
        .empty('')
        .messages({
            'any.required': 'É necessário informar o ID da categoria do produto.',
            'number.integer': 'O ID da categoria deve ser um número inteiro.',
            'number.positive': 'O ID da categoria precisa ser um número positivo',
            'number.base': 'O ID da categoria precisa ser um número',
            'any.empty': 'O ID da categoria não pode ser um campo vazio'
    }),
  

});


module.exports = {
    schemaUsuario,
    schemaLogin,
    schemaProduto
}