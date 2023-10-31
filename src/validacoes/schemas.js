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

const schemaId = Joi.object({
    id: Joi.number()
        .messages({
            'number.base': 'Informe um ID válido'
        })
})



const schemaCliente = Joi.object({
    nome: Joi.string()
        .min(3)
        .max(100)
        .required()
        .trim()
        .empty('')
        .messages({
            'any.required': 'É necessário informar o nome.',
            'string.min': 'O nome não pode ter menos que 3 caracteres.',
            'string.max': 'O nome não pode ter mais que 100 caracteres.',
            'any.empty': 'O nome não pode ser um campo vazio'
        }),

    email: Joi.string()
        .email()
        .max(100)
        .required()
        .empty('')
        .trim()
        .messages({
            'string.email': 'Por favor, insira um e-mail válido!',
            'any.required': 'É necessário informar um e-mail',
            'any.empty': 'O e-mail não pode ser um campo vazio',
            'string.max': 'O e-mail não pode ter mais que 100 caracteres.',
        }),

    cpf: Joi.string()
        .required()
        .length(11)
        .empty('')
        .alphanum()
        .trim()
        .messages({
            'string.length': 'O cpf informado deve ter 11 caracteres.',
            'any.empty': 'O cpf não pode ser um campo vazio.',
            'string.alphanum': 'O cpf informado deve conter apenas números.',
        }),

    cep: Joi.string()
        .length(8)
        .empty('')
        .alphanum()
        .trim()
        .messages({
            'string.length': 'O cep informado deve ter 8 caracteres.',
            'any.empty': 'O cep não pode ser um campo vazio',
            'string.alphanum': 'O cep informado deve conter apenas números.',

        }),

    rua: Joi.string()
        .min(1)
        .max(200)
        .empty('')
        .trim()
        .messages({
            'string.min': 'O nome da rua deve ter no mínimo 1 caractere.',
            'any.empty': 'O nome da rua não pode ser um campo vazio',
            'string.max': 'O nome não pode ter mais que 200 caracteres.',

        }),

    numero: Joi.string()
        .min(1)
        .max(7)
        .empty('')
        .trim()
        .messages({
            'string.min': 'O número informado deve ter no mínimo 1 caractere.',
            'any.empty': 'O número não pode ser um campo vazio (informe "sem número" caso não haja número!)',
            'string.max': 'O número não pode ter mais que 7 caracteres.',

        })
        || Joi.number()
            .min(0)
            .max(7)
            .empty('')
            .messages({
                'string.min': 'O número informado deve ter no mínimo 1 dígito (informe zero caso seja rua sem número!).',
                'any.empty': 'O número não pode ser um campo vazio (informe "sem número" caso não haja número!)',
                'string.max': 'O número não pode ter mais que 7 dígitos.',
            }),


    bairro: Joi.string()
        .min(1)
        .max(100)
        .empty('')
        .trim()
        .messages({
            'string.min': 'O nome do bairro deve ter no mínimo 1 caractere.',
            'any.empty': 'O nome do bairro não pode ser um campo vazio',
            'string.max': 'O nome do bairro não pode ter mais que 100 caracteres.',
        }),

    cidade: Joi.string()
        .min(3)
        .max(100)
        .empty('')
        .trim()
        .messages({
            'string.min': 'O nome da cidade deve ter no mínimo 3 caracteres.',
            'any.empty': 'O nome da cidade não pode ser um campo vazio',
            'string.max': 'O nome da cidade não pode ter mais que 100 caracteres.',
        }),

    estado: Joi.string()
        .min(2)
        .max(100)
        .empty('')
        .trim()
        .messages({
            'string.min': 'O estado deve ter no mínimo 2 caracteres.',
            'any.empty': 'O estado não pode ser um campo vazio',
            'string.max': 'O estado não pode ter mais que 100 caracteres.',
        }),

})

const schemaProduto = Joi.object({

    descricao: Joi.string()
        .min(3)
        .max(100)
        .required()
        .empty("")
        .trim()
        .messages({
            "string.min": "A descrição deve ter no mínimo 3 caracteres.",
            "string.max": "A descrição não pode ter mais que 100 dígitos.",
            "any.required": "É necessário informar a descrição do produto.",
            "any.empty": "A descrição não pode ser um campo vazio",
        }),

    quantidade_estoque: Joi.number()
        .positive()
        .required()
        .empty("")
        .messages({
            "number.positive":
                "O campo quantidade_estoque precisa ser um número positivo",
            "any.required": "É necessário informar a quantidade que há em estoque.",
            "any.empty": "A quantidade_estoque não pode ser um campo vazio",
        }),

    valor: Joi.number()
        .positive()
        .required()
        .empty("")
        .messages({
            "number.positive": "O campo valor precisa ser um número positivo",
            "any.required": "É necessário informar o valor do produto.",
            "any.empty": "O valor não pode ser um campo vazio",
        }),

    categoria_id: Joi.number()
        .integer()
        .positive()
        .required()
        .empty("")
        .messages({
            "number.integer": "O campo categoria_id precisa ser um número inteiro",
            "number.positive": "O campo categoria_id precisa ser um número positivo",
            "any.required": "É necessário informar a categoria_id",
            "any.empty": "A categoria_id não pode ser um campo vazio",
        }),
    produto_imagem: Joi.string().base64()
});

module.exports = {
    schemaUsuario,
    schemaLogin,
    schemaId,
    schemaCliente,
    schemaProduto,
}