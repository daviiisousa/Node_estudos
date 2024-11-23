const express = require("express");
const produtosRoutes = require("./routes/productsRouter");

const app = express();

// Middleware para JSON
app.use(express.json());

// Rotas
app.use("/produtos", produtosRoutes);

module.exports = app;
