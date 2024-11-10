const HTTTP = require('http')
const porta = 3000

const server = HTTTP.createServer((req, res) => {
    const {url} = req

    const api = ['casaco', 'calca', 'blusa']

    if(url === '/'){
        res.write('<h1> Hello World </h1>')
        res.end()
        return
    }

    if(url === '/lojinha'){
        res.write(JSON.stringify(api))
        res.end()
        return
    }

    res.statusCode = 404
    res.write('<h1>Pagina nao encontrada</h1>')
    res.end()
})

server.listen(porta, 'localhost', () => {
    console.log(`rodando ma porta http://localhost:${porta} `)
})