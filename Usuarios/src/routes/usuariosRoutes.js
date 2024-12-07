const express = require("express");
const router = express.Router();

const {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  deleteUsuario,
  updateUsuario,
  loginUsuario
} = require("../controller/userController");

const { validarUsuario, validarLogin } = require("../validators/usuariosValidator");

// Rotas de usuários
router.get("/", getUsuarios);
router.get("/:id", getUsuarioById);
router.post("/", validarUsuario, createUsuario);
router.post("/login", validarLogin, loginUsuario)
router.delete("/:id", deleteUsuario);
router.put("/:id", validarUsuario, updateUsuario);

module.exports = router;
