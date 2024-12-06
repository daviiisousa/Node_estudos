const express = require("express");
const router = express.Router();

const {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  deleteUsuario,
  updateUsuario,
} = require("../controller/userController");

const { validarUsuario } = require("../validators/usuariosValidator");

// Rotas de usuários
router.get("/", getUsuarios);
router.get("/:id", getUsuarioById);
router.post("/", validarUsuario, createUsuario);
router.delete("/:id", deleteUsuario);
router.put("/:id", validarUsuario, updateUsuario);

module.exports = router;
