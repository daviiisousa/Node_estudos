const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

// Configuração do CORS
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173"], 
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
};

app.use(cors(corsOptions));

// Rotas
const usuarioRoutes = require("./src/routes/usuariosRoutes");
const enderecosRoutes = require("./src/routes/enderecoRouter");

app.use("/usuarios", usuarioRoutes);
app.use("/enderecos", enderecosRoutes);

// Inicialização do servidor
app.listen(3000, () => {
  console.log("API rodando na porta 3000");
});
