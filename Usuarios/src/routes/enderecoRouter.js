const express = require("express");
const router = express.Router();
const {validarEndereco} = require('../validators/enderecosValidator')

const {
  criarEndereco,
  enderecos,
  enderecoUsuario
} = require("../controller/enderecoController");

router.get("/", enderecos);
router.get("/:id", enderecoUsuario );
router.post("/", validarEndereco, criarEndereco);

module.exports = router;
