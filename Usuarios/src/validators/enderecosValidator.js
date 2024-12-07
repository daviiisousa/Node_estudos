const { body } = require("express-validator");

const validarEndereco = [
  body("usuario_id")
    .isInt({ gt: 0 })
    .withMessage("O usuário é obrigatório e deve ser um número inteiro válido"),
  body("rua")
    .notEmpty()
    .trim()
    .withMessage("A rua é obrigatória")
    .escape(),
  body("numero")
    .notEmpty()
    .withMessage("O número é obrigatório")
    .isNumeric()
    .withMessage("O número deve conter apenas valores numéricos"),
  body("complemento")
    .optional()
    .isString()
    .withMessage("O complemento deve ser uma string")
    .trim()
    .escape(),
  body("bairro")
    .notEmpty()
    .withMessage("O bairro é obrigatório")
    .trim()
    .escape(),
  body("cidade")
    .notEmpty()
    .withMessage("A cidade é obrigatória")
    .trim()
    .escape(),
  body("estado")
    .isLength({ min: 2, max: 2 })
    .withMessage("O estado deve ter exatamente 2 caracteres")
    .isAlpha()
    .withMessage("O estado deve conter apenas letras")
    .trim()
    .toUpperCase(),
  body("cep")
    .notEmpty()
    .withMessage("O CEP é obrigatório")
    .matches(/^\d{5}-?\d{3}$/)
    .withMessage("O CEP deve estar no formato XXXXX-XXX ou XXXXXXXX"),
];

module.exports = { validarEndereco };
