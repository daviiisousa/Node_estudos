import path from 'path'
import fs from 'fs'
import env from 'dotenv'
env.config()

console.log(process.env.API_KEY)

const filePath = path.join(process.cwd(), 'texte.txt')
const fileOutPath = path.join(process.cwd(), 'texte2.txt')

fs.readFile(filePath, {}, (erro, res) => {
    if(erro){
        console.error('deu pau', erro)
        return
    }

    const texto = res.toString()
    console.log(texto)
    const linhas = texto.split('\r')
    console.log(linhas)

    // console.log(linha)

    const linhasEditadas = linhas.map((linha, index) => {
        return (` ${index} - ${linha} `)
    })
    console.log(linhasEditadas)

    fs.writeFile(fileOutPath, linhasEditadas.join('\n'), (erro) => {
        if(erro){
            console.error('deu pau', erro)
            return
        }
    })

})
