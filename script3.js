let carrinho = [];


// ELEMENTOS

const carrinhoElemento = document.getElementById("carrinho");
const fundoCarrinho = document.getElementById("fundoCarrinho");

const abrirCarrinho = document.getElementById("abrirCarrinho");
const fecharCarrinho = document.getElementById("fecharCarrinho");

const listaCarrinho = document.getElementById("listaCarrinho");

const totalElemento = document.getElementById("total");
const contadorElemento = document.getElementById("contador");


// ABRIR CARRINHO

abrirCarrinho.addEventListener("click", () => {

    carrinhoElemento.classList.remove("fechado");
    fundoCarrinho.classList.remove("fechado");

});


// FECHAR CARRINHO

fecharCarrinho.addEventListener("click", fechar);

fundoCarrinho.addEventListener("click", fechar);


function fechar() {

    carrinhoElemento.classList.add("fechado");
    fundoCarrinho.classList.add("fechado");

}


// ADICIONAR PRODUTO

function adicionarProduto(nome, preco) {

    const produtoExistente = carrinho.find(
        produto => produto.nome === nome
    );


    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        carrinho.push({

            nome: nome,
            preco: preco,
            quantidade: 1

        });

    }


    atualizarCarrinho();

}


// ATUALIZAR CARRINHO

function atualizarCarrinho() {

    listaCarrinho.innerHTML = "";


    let total = 0;
    let quantidadeTotal = 0;


    carrinho.forEach((produto, index) => {

        total += produto.preco * produto.quantidade;

        quantidadeTotal += produto.quantidade;


        const item = document.createElement("div");

        item.classList.add("itemCarrinho");


        item.innerHTML = `

            <div class="itemTopo">

                <h3>${produto.nome}</h3>

                <button
                    class="remover"
                    onclick="removerProduto(${index})">
                    Remover
                </button>

            </div>


            <p>
                R$ ${produto.preco.toFixed(2).replace(".", ",")}
            </p>


            <div class="quantidade">

                <button
                    onclick="diminuirQuantidade(${index})">
                    −
                </button>

                <span>
                    ${produto.quantidade}
                </span>

                <button
                    onclick="aumentarQuantidade(${index})">
                    +
                </button>

            </div>

        `;


        listaCarrinho.appendChild(item);

    });


    totalElemento.textContent =
        `R$ ${total.toFixed(2).replace(".", ",")}`;


    contadorElemento.textContent = quantidadeTotal;

}


// AUMENTAR

function aumentarQuantidade(index) {

    carrinho[index].quantidade++;

    atualizarCarrinho();

}


// DIMINUIR

function diminuirQuantidade(index) {

    carrinho[index].quantidade--;


    if (carrinho[index].quantidade <= 0) {

        carrinho.splice(index, 1);

    }


    atualizarCarrinho();

}


// REMOVER

function removerProduto(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();

}