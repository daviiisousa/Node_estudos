class Produto {

    constructor(nome, descricao, preco){
        this.nome = nome
        this.descricao = descricao
        this.preco = preco
    }

    atualizarNome(novoNome){
        this.nome = novoNome
    }

    getNome(){
        return this.nome
    }
    atualizarPreco(){

    }

    atualizarDescricao(){

    }
}

class Pagamento {
    constructor(dinheiro){
        this.dinheiro = dinheiro
    }
}

class Usuario {
    constructor(nome){
        this.nome = nome
    }
}
class Compra {
    constructor(usuario, pagamento, produtos){
        this.usuario = usuario
        this.pagamento = pagamento
        this.produtos = produtos
    }
}

const computador = new Produto('computador', 'um computador para estudos', 1800)
const camisa = new Produto('camisa', 'camisa vermelha', 50)
const mesa = new Produto('mesa', 'mesa de madeira', 500)

const usuario1 = new Usuario('davi')
const pagamentoUsuario1 = new Pagamento('dineiro real')
const produtosUsuario1 = [computador, camisa, mesa ]

const compra1 = new Compra(usuario1, pagamentoUsuario1, produtosUsuario1)
console.log(compra1)



class Pessoa{
    constructor(nome, cpf){
        this.nome = nome
        this.cpf = cpf
    }
}

class Aluno extends Pessoa {
    constructor(matricula){
        super()
        this.matricula = matricula
    }
}

class Professor extends Pessoa{
    constructor(materia){
        this.materia = materia
    }
}

const professor1 = new Professor('alberto', '8888888', 'ingles')
const aluno1 = new Aluno('joao','5555555', 12)
const pessoa1 = new Pessoa('davi', '62471768300')

// console.log(computador.getNome())
// computador.atualizarNome('teste')
// console.log(computador.nome)

