// feito com express

const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(3000, () => {
    console.log(' rodando na porta 3000')
})

//feito com node puro

// const {createServer} = require('http')

//  const server = createServer((_req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('Hello World!\n');
//  })

//  server.listen(3000, '127.0.0.1', () => {
//     console.log('Listening on 127.0.0.1:3000');
// });

