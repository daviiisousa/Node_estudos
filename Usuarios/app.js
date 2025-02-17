const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

// Configuração do CORS
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"], 
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
};

app.use(cors(corsOptions));

// Rotas
const usuarioRoutes = require("./src/routes/usuariosRoutes");

app.use("/usuarios", usuarioRoutes);

// Inicialização do servidor
app.listen(3000, () => {
  console.log("API rodando na porta 3000");
});
