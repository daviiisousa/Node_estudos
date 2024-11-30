const express = require("express");
const ProductRouter = require("./routes/productRouter");
const FruitRouter = require('./routes/fruitsRoter')


const app = express();

// Middleware para JSON
app.use(express.json());

// Rotas
app.use("/produtos", ProductRouter);
app.use('/frutas', FruitRouter)

module.exports = app;
