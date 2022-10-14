let secaoProdutos = document.querySelector(".produtos")
let secaoCarrinho = document.querySelector(".secao-carrinho ul")

function listarProdutos(listaProdutos, secao){


    secao.innerHTML = ""
    
    for(let i = 0; i<listaProdutos.length; i++){
        
        let produto = listaProdutos[i]

        let cardProduto    = criarCardProduto(produto)
        secao.appendChild(cardProduto)

    }
   
}

listarProdutos(data, secaoProdutos)



function criarCardProduto(produto){

    let id = produto.id
    let tagLi       = document.createElement("li")
    let tagImge     = document.createElement("img")
    let imgWrapper = document.createElement("div")
    let contentWrapper = document.createElement("main")
    let produtoTag     = document.createElement("span")
    let tagNome     = document.createElement("h3")
    let tagDescricao    = document.createElement("p")
    let tagPreco    = document.createElement("strong")
    let btnAdicionar  = document.createElement("button")
   
    if(id != undefined){

        btnAdicionar.id =  id
    }

    imgWrapper.classList.add("img-wrapper")
    contentWrapper.classList.add("produto-conteudo")
    tagNome.classList.add("title")
    tagDescricao.classList.add("description")
    tagPreco.classList.add("price")

    tagImge.src = `${produto.img}`
    tagImge.alt = produto.nameItem
    produtoTag.innerText = produto.tag[0]
    tagNome.innerText = produto.nameItem
    tagDescricao.innerText = produto.description
    tagPreco.innerText = `R$ ${produto.value.toFixed(2)}`.replace(".",",")
    btnAdicionar.innerText = produto.addCart

    imgWrapper.appendChild(tagImge)
    contentWrapper.appendChild(produtoTag)
    contentWrapper.appendChild(tagNome)
    contentWrapper.appendChild(tagDescricao)
    contentWrapper.appendChild(tagPreco)
    contentWrapper.appendChild(btnAdicionar)
  
    tagLi.appendChild(imgWrapper)
    tagLi.appendChild(contentWrapper)

    return tagLi
}

secaoProdutos.addEventListener("click", interceptandoProduto)

let carrinhoCompras = []


function interceptandoProduto(event){

    console.log("entrando em interceptando")

    let classeSecaoClicada = this.getAttribute('class')

    let btnComprar  = event.target
    
    if(btnComprar.tagName == "BUTTON"){

        let idProduto = btnComprar.id

        let produto = data.find(function(data){

            if(data.id == idProduto){
                return data
            }
            
        });

        if(classeSecaoClicada == 'produtos') {
            adicionarCarrinho(produto)
        } else{
            removerProdutoCarrinho(produto)
        }
    }

}


function adicionarCarrinho(produto){

    if(produto !== undefined){
        carrinhoCompras.push(produto)

        atualizarSoma(produto.value)
        atualizarQuantidade(1)

        listarProdutos(carrinhoCompras,secaoCarrinho)
    }
 
}


secaoCarrinho.addEventListener("click", interceptandoProduto)

function removerProdutoCarrinho(produto){

    let posicaoDoProduto = carrinhoCompras.indexOf(produto)
    carrinhoCompras.splice(posicaoDoProduto, 1)

    atualizarSoma(produto.value * -1)
    let quantidade = atualizarQuantidade(-1)

    listarProdutos(carrinhoCompras,secaoCarrinho)

    if (quantidade == 0){
        let tagLi = document.createElement("li")
        tagLi.classList.add("carrinho-vazio")
        let tagH3 = document.createElement("h3")
        let tagH5 = document.createElement("h5")

        tagH3.innerText = "Carrinho vazio"
        tagH5.innerText = "Adicione itens"

        tagLi.appendChild(tagH3)
        tagLi.appendChild(tagH5)

        secaoCarrinho.appendChild(tagLi)
    }

}

//SOMA E QUANTIDADE
let quantidadeSoma = document.querySelectorAll('.div-carrinho p span') // seleciono no HTML os dois elementos com o total e a quantidade
let quantidade = parseFloat(quantidadeSoma[0].textContent) // este pega o valor da quantidade e passa pra float
let soma = parseFloat(quantidadeSoma[1].textContent) // este pega o valor da soma e passa pra float

function atualizarSoma(preco){
    soma += preco // soma com o preco do produto passado
    quantidadeSoma[1].textContent = String(soma.toFixed(2)).replace(".", ",") // atualiza no site a nova quantidade
}

function atualizarQuantidade(qtd){
    quantidade += qtd // soma com a nova quantidade passada 
    quantidadeSoma[0].textContent = quantidade // atualiza no site a nova quantidade

    return quantidade
}

// ÁREA DE PESQUISA 
function pesquisarNaPagina() {

    let input = document.getElementById("inputBusca");
    let paraMaiusculo = input.value.toUpperCase();
    let ul = document.getElementsByClassName("produtos")[0];
    let li = ul.getElementsByTagName("li");
    let h3, valorH3


    for (i = 0; i < li.length; i++) {
        h3 = li[i].getElementsByTagName("h3")[0];

        valorH3 = h3.textContent;

        if (valorH3.toUpperCase().indexOf(paraMaiusculo) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}












