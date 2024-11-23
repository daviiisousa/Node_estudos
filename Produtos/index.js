const express = require("express");
const { Pool } = require("pg");

const app = express();

app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "produtos",
  password: "2710",
  port: 5432,
});

//pega todos os produtos
app.get("/produtos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM produtos_tecnologicos");
    res.json(result.rows);
  } catch (error) {
    console.error("erro ao buscar o usuario", error);
    res.status(500).send("erro no servidor");
  }
});

//pega o produto por id 
app.get("/produtos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const resultById = await pool.query(
      `SELECT * FROM produtos_tecnologicos WHERE id = $1`,
      [id]
    );

    // Verifica se o produto foi encontrado
    if (resultById.rows.length === 0) {
      return res.status(404).send("Produto não encontrado");
    }

    res.json(resultById.rows[0]); // Retorna o produto encontrado
  } catch (error) {
    console.error("erro ao buscar o usuario por id", error);
    res.status(500).send("erro no servidor");
  }
});

// cria um produto
app.post("/cadastrar", async (req, res) => {
    try {
      const { nome, descricao, preco, estoque, categoria } = req.body;

      if (!nome || !descricao || !preco || !estoque || !categoria) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
      }      
  
      // Query SQL para inserir os dados
      const result = await pool.query(
        `INSERT INTO produtos_tecnologicos (nome, descricao, preco, estoque, categoria) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [nome, descricao, preco, estoque, categoria]
      );
  
      // Retorna o produto criado como resposta
      res.status(201).json({ mensagem: "Produto criado", produto: result.rows[0] });
    } catch (error) {
      console.error("Erro ao cadastrar o produto:", error);
      res.status(500).send("Erro no servidor");
    }
  });

app.put("/produtos/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { descricao } = req.body
  
    if(!descricao){
      return res.status(400).json({mensagem: 'pfv prencha o campo'})
    }

    const result = await pool.query(
      "UPDATE produtos_tecnologicos SET descricao = $1 WHERE id = $2 RETURNING *",
      [descricao, id]
    );
    
    res.status(201).json({messagem: 'produto atualizado', produto: result.rows[0]})
  } catch (error) {
    console.error("Erro ao cadastrar o produto:", error);
    res.status(500).send("Erro no servidor");
  }

})
  

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
