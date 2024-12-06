const express = require("express");
const app = express();
app.use(express.json());

const usuarioRoutes = require("./src/routes/usuariosRoutes");

// Rotas
app.use("/usuarios", usuarioRoutes);

// Inicialização do servidor
app.listen(3000, () => {
  console.log("API rodando na porta 3000");
});
