const resposta = document.querySelector('#res');

async function getProduct() {
  try {
    const responce = await fetch('http://localhost:3000/users/');
    const data = await responce.json(); 

    console.log(data);

    data.forEach((produto) => {
      const ProdutoDiv = document.createElement('div');
      ProdutoDiv.innerHTML = `
        <div class="card">
            <img class="fotoProduto" src="${produto.imagem}" alt="Foto de ${produto.nome}">
            <h1 class="tituloProduto">  ${produto.nome}</h1>
            <h3 class="categoriaProduto" >${produto.categoria}</h3>
        </div>
      `;

      resposta.appendChild(ProdutoDiv); 
    });

  } catch (error) {
    console.log(error);
  }
}

getProduct();
