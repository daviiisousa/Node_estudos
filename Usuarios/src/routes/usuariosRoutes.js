const express = require("express");
const router = express.Router();

const {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  deleteUsuario,
  updateUsuario,
  loginUsuario,
  usuariosInativos,
  logoutUsuario
} = require("../controller/userController");

const {autenticarToken} = require('../middleware/authMiddleware')

const { validarUsuario, validarLogin } = require("../validators/usuariosValidator");

// Rotas publicas
router.post("/", validarUsuario, createUsuario);
router.post("/login", validarLogin, loginUsuario)

//Rotas privadas
router.get("/",autenticarToken, getUsuarios);
router.get("/adm", autenticarToken, usuariosInativos)
router.get("/:id",autenticarToken, getUsuarioById);
router.delete("/:id",autenticarToken, deleteUsuario);
router.put("/:id", autenticarToken, validarUsuario, updateUsuario);
router.post('/logout', autenticarToken, logoutUsuario )

module.exports = router;
