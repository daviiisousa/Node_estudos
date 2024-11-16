const express = require('express');
const app = express();
const { Pool } = require('pg');

app.use(express.json());

const pool = new Pool({ 
    user: 'postgres',
    host: 'localhost',
    database: 'produtos',
    password: '2710',
    port: 5432,
});

const produtos = [
    { id: 1, nome: "Notebook Gamer", preco: 5000 },
    { id: 2, nome: "Smartphone", preco: 2000 },
    { id: 3, nome: "Tablet", preco: 1500 },
    { id: 4, nome: "Monitor", preco: 800 },
    { id: 5, nome: "Teclado Mecânico", preco: 300 }
];  // mock do banco

app.get('/produtos', (req, res) => {
    res.status(200).json(produtos)
})

app.get('/produtos/:id', (req, res) => {
    const { id } = req.params;

    res.status(200).json(produtos[id-1])
})

app.post('/cadastro', (req, res) => {
    const {nome, preco} = req.body

    const produtoNovo = {
        nome: nome,
        preco: preco
    }

    res.send(produtoNovo)
})



app.listen(3000, () => {
    console.log('Server running on port 3000');
});