const { Client } = require('pg')

const client = new Client({
    host: 'localhost',
    database: 'erp',
    password: '2710',
    user: 'postgres',
    port: 5432
})

client.connect()

function selecionarProdutos(){
    client.query('SELECT * FROM produtos', (erro, res) => {
        if (erro) {
            console.error('deu erro: ', erro)
        } else {
            console.log('sucesso: ', res.rows)  
        }
    })
}

// function atualizarProdutos(){
//     client.query(`UPDATE produtos WHERE produto_id = ${id}`, [id], (erro, res) => {
//         if (erro) {
//             console.error('deu erro: ', erro)
//         } else {
//             console.log('sucesso: ', res.rows)  
//         }
//     })
// }

selecionarProdutos()

