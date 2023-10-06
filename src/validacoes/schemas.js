const Joi = require('joi');

const schemaUsuario = Joi.object({
    nome: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            'any.required': 'É necessário informar o nome.',
            'string.min': 'O nome não pode ter menos que 3 caracteres.',
            'strin.max': 'O nome não pode ter mais que 100 caracteres.'
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Por favor, insira um e-mail válido!',
            'any.required': 'É necessário informar um e-mail'
        }),

    senha: Joi.string()
        // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')), //seria um plus, mas não sei se as próximas sprints vão pedir algo do tipo...
        .min(3)
        .required()
        .messages({
            'any.required': 'É necessário informar uma senha.',
            'string.min': 'A senha informada deve ter mais que 3 caracteres.'
        }),

})

const schemaLogin = Joi.object({

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Por favor, insira um e-mail válido!',
            'any.required': 'É necessário informar um e-mail'
        }),

    senha: Joi.string()
        // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')), //seria um plus, mas não sei se as próximas sprints vão pedir algo do tipo...
        .min(3)
        .required()
        .messages({
            'any.required': 'É necessário informar uma senha.',
            'string.min': 'A senha informada deve ter mais que 3 caracteres.'
        }),

})

module.exports = {
    schemaUsuario,
    schemaLogin
}