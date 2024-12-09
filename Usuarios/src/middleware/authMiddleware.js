const jwt = require("jsonwebtoken");
require('dotenv').config()

// Simulando uma blacklist
const blacklist = [];

const autenticarToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ mensagem: "Token não fornecido" });
  }

  // Verificar se o token está na blacklist
  if (blacklist.includes(token)) {
    return res.status(403).json({ mensagem: "Token inválido ou expirado" });
  }

  try {
    const usuario = jwt.verify(token, process.env.SECRET_KEY);
    req.usuario = usuario; // Adiciona os dados do usuário no request
    next();
  } catch (error) {
    res.status(403).json({ mensagem: "Token inválido", error: error });
  }
};

// Rota para adicionar token à blacklist
const registrarNaBlacklist = (token) => {
  blacklist.push(token);
};

module.exports = { autenticarToken, registrarNaBlacklist };
