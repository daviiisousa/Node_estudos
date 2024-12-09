const jwt = require("jsonwebtoken");

const SECRET_KEY = "minha_chave_super_secreta";

// Simulação de um banco de dados de usuários
const usuarios = [
  { id: 1, nome: "João", email: "joao@example.com" },
  { id: 2, nome: "Maria", email: "maria@example.com" },
];

// Gerar um token com tempo de expiração personalizado
const gerarToken = (usuario, tempoExpiracao = "1h") => {
  const token = jwt.sign(usuario, SECRET_KEY, { expiresIn: tempoExpiracao });
  console.log(`\nToken Gerado (expira em ${tempoExpiracao}):`);
  console.log(token);
  return token;
};

// Middleware de autenticação (simulado)
const autenticarUsuario = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("\nUsuário autenticado com sucesso:");
    console.log(decoded);
    return decoded;
  } catch (error) {
    console.error("\nFalha na autenticação:");
    console.error(error.message);
  }
};

// Simular um fluxo completo
const fluxoSimulado = () => {
  console.log("\n=== Início do Fluxo Simulado ===");

  // 1. Criar token para o usuário João
  const usuario = usuarios[0];
  const token = gerarToken({ id: usuario.id, nome: usuario.nome });

  // 2. Simular envio e verificação do token
  console.log("\nSimulando verificação do token:");
  autenticarUsuario(token);

  // 3. Testar com um token expirado
  console.log("\nSimulando token com expiração curta:");
  const tokenCurto = gerarToken({ id: usuario.id, nome: usuario.nome }, "5s");

  setTimeout(() => {
    console.log("\nVerificando token expirado:");
    autenticarUsuario(tokenCurto);
  }, 6000); // Espera 6 segundos para expirar o token
};

// Executar o fluxo simulado
fluxoSimulado();
