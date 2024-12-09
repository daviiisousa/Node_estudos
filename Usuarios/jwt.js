let listaNegra = [];

const logoutUsuario = (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(400).json({ mensagem: 'Nenhum token fornecido' });
  }

  listaNegra.push(token); // Adiciona o token à lista negra
  res.status(200).json({ mensagem: 'Logout realizado com sucesso' });
};

// Middleware atualizado para verificar a lista negra
const autenticarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ mensagem: 'Token não fornecido' });
  if (listaNegra.includes(token)) return res.status(403).json({ mensagem: 'Token revogado' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ mensagem: 'Token inválido ou expirado' });

    req.user = user;
    next();
  });
};
