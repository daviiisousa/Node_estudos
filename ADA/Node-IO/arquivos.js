import path from 'path'
import fs from 'fs'

const filePath = path.join(process.cwd(), 'texte.txt')
const fileOutPath = path.join(process.cwd(), 'texte2.txt')

fs.readFile(filePath, {}, (erro, res) => {
    if(erro){
        console.error('deu pau', erro)
        return
    }

    const texto = res.toString()
    const linhas = texto.split('\n')

    // console.log(linha)

    const linhasEditadas = linhas.map((linha, index) => {
        return (` ${index} - ${linha} `)
    })

    fs.writeFile(fileOutPath, linhasEditadas.join('\n'), (erro) => {
        if(erro){
            console.error('deu pau', erro)
            return
        }
    })

})
