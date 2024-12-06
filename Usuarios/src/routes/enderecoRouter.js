const express = require("express");
const router = express.Router();

const {
  criarEndereco,
  enderecos,
  enderecoUsuario
} = require("../controller/enderecoController");

router.get("/", enderecos);
router.get("/:id", enderecoUsuario );
router.post("/", criarEndereco);

module.exports = router;
