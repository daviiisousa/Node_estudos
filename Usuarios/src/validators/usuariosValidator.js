const { body } = require("express-validator");

const validarUsuario = [
  body("nome").notEmpty().withMessage("O nome é obrigatório").trim().escape(),
  body("email").isEmail().withMessage("O email deve ser válido").normalizeEmail(),
  body("senha").isLength({ min: 6 }).withMessage("A senha deve ter pelo menos 6 caracteres"),
];

const validarLogin = [
  body("email").isEmail().withMessage("O email deve ser válido").normalizeEmail(),
  body("senha").isLength({ min: 6 }).withMessage("A senha deve ter pelo menos 6 caracteres"),
]

module.exports = { validarUsuario, validarLogin };
