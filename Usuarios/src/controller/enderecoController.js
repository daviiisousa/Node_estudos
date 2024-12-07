const db = require("../config/db");
const { validationResult } = require("express-validator")

const enderecos = async (_req, res) => {
  try {
    const enderecos = await db.query("SELECT * FROM enderecos");
    if(enderecos.rows.length === 0){
        res.status(404).send('endereco nao existe ou nao encontrado')
    }
    res.status(200).json({ endereco: enderecos.rows });
  } catch (error) {
    console.error("erro ao criar o usuario", error);
    res.status(500).send("error no servidor");
  }
};

const criarEndereco = async (req, res) => {
  try {
    const {
      usuario_id,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      cep,
    } = req.body;

    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    const enderecoCriado = await db.query(
      "INSERT INTO enderecos (usuario_id, rua, numero, complemento, bairro, cidade, estado, cep) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [usuario_id, rua, numero, complemento, bairro, cidade, estado, cep]
    );
    if (enderecoCriado.rows.length === 0) {
      return res.status(404).send("endereco nao encontrado");
    }
    res
      .status(201)
      .json({ menssagem: "endereco criado", endereco: enderecoCriado.rows[0] });
  } catch (error) {
    console.error("erro ao criar endereco", error);
    res.status(500).send("erro no servidor");
  }
};

const enderecoUsuario = async (req, res) => {
  try {
    const { id } = req.params;
  const enderecoUsuario = await db.query(
    "SELECT * FROM enderecos WHERE usuario_id = $1",
    [id]
  );

  if (enderecoUsuario.rows.length === 0) {
    return res.status(404).json({ mensagem: "Nenhum endereço encontrado" });
  }
  res.status(200).send(enderecoUsuario.rows)
  } catch (error) {
    console.error("Erro ao buscar endereços:", error);
    res.status(500).send("Erro no servidor");
  }
};

module.exports = { criarEndereco, enderecos, enderecoUsuario };
