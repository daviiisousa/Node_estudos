const express = require("express");
const app = express();
app.use(express.json());

const usuarioRoutes = require("./src/routes/usuariosRoutes");
const enderecosRoutes = require("./src/routes/enderecoRouter");

// Rotas
app.use("/usuarios", usuarioRoutes);
app.use("/enderecos", enderecosRoutes);

// Inicialização do servidor
app.listen(3000, () => {
  console.log("API rodando na porta 3000");
});
