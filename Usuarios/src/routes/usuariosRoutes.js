const express = require("express");
const router = express.Router();

const {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  deleteUsuario,
  updateUsuario,
  loginUsuario,
  usuariosInativos
} = require("../controller/userController");

const { validarUsuario, validarLogin } = require("../validators/usuariosValidator");

// Rotas publicas
router.post("/", validarUsuario, createUsuario);
router.post("/login", validarLogin, loginUsuario)

//Rotas privadas
router.get("/", getUsuarios);
router.get("/adm", usuariosInativos)
router.get("/:id", getUsuarioById);
router.delete("/:id", deleteUsuario);
router.put("/:id", validarUsuario, updateUsuario);

module.exports = router;
