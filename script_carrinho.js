// ===============================
// CARRINHO - MEGALOODON OUTFITS
// ===============================

function adicionarCarrinho(botao) {
    const produto = botao.closest(".container");

    if (!produto) return;

    const imagem = produto.querySelector("img")?.getAttribute("src") || "";
    const nome = produto.querySelector("h3")?.textContent.trim() || "Produto";
    const paragrafos = produto.querySelectorAll("p");

    const descricao = paragrafos[0]?.textContent.trim() || "";
    const precoTexto = paragrafos[1]?.textContent.trim() || "R$ 0,00";

    const preco = parseFloat(
        precoTexto
            .replace("R$", "")
            .replace(/\./g, "")
            .replace(",", ".")
            .trim()
    ) || 0;

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    // Se o produto já estiver no carrinho, aumenta a quantidade.
    const produtoExistente = carrinho.find(item => item.nome === nome);

    if (produtoExistente) {
        produtoExistente.quantidade += 1;
    } else {
        carrinho.push({
            imagem,
            nome,
            descricao,
            preco,
            quantidade: 1
        });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    alert(`${nome} foi adicionado ao carrinho!`);
}


// ===============================
// CARREGAR CARRINHO
// ===============================

function carregarCarrinho() {
    const corpo = document.getElementById("corpoCarrinho");
    const totalElemento = document.getElementById("totalCarrinho");
    const contador = document.getElementById("contadorCarrinho");

    if (!corpo) return;

    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    corpo.innerHTML = "";

    let totalCompra = 0;
    let quantidadeTotal = 0;

    if (carrinho.length === 0) {
        corpo.innerHTML = `
            <tr>
                <td colspan="7" class="carrinho-vazio">
                    Seu carrinho está vazio.
                </td>
            </tr>
        `;

        if (totalElemento) {
            totalElemento.textContent = formatarPreco(0);
        }

        if (contador) {
            contador.textContent = "0";
        }

        return;
    }

    carrinho.forEach((produto, index) => {
        const totalProduto = produto.preco * produto.quantidade;

        totalCompra += totalProduto;
        quantidadeTotal += produto.quantidade;

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td class="produto-imagem">
                <img src="${produto.imagem}" alt="${produto.nome}">
            </td>

            <td class="produto-nome">
                ${produto.nome}
            </td>

            <td class="produto-descricao">
                ${produto.descricao}
            </td>

            <td>
                ${formatarPreco(produto.preco)}
            </td>

            <td>
                <div class="quantidade">
                    <button onclick="alterarQuantidade(${index}, -1)">−</button>

                    <span>${produto.quantidade}</span>

                    <button onclick="alterarQuantidade(${index}, 1)">+</button>
                </div>
            </td>

            <td>
                <strong>${formatarPreco(totalProduto)}</strong>
            </td>

            <td>
                <button class="btn-remover" onclick="removerProduto(${index})">
                    Remover
                </button>
            </td>
        `;

        corpo.appendChild(linha);
    });

    if (totalElemento) {
        totalElemento.textContent = formatarPreco(totalCompra);
    }

    if (contador) {
        contador.textContent = quantidadeTotal;
    }
}


// ===============================
// ALTERAR QUANTIDADE
// ===============================

function alterarQuantidade(index, valor) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    if (!carrinho[index]) return;

    carrinho[index].quantidade += valor;

    if (carrinho[index].quantidade <= 0) {
        carrinho.splice(index, 1);
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    carregarCarrinho();
}


// ===============================
// REMOVER PRODUTO
// ===============================

function removerProduto(index) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    if (!carrinho[index]) return;

    carrinho.splice(index, 1);

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    carregarCarrinho();
}


// ===============================
// LIMPAR CARRINHO
// ===============================

function limparCarrinho() {
    localStorage.removeItem("carrinho");
    carregarCarrinho();
}


// ===============================
// FORMATAR PREÇO
// ===============================

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


// ===============================
// INICIALIZAÇÃO
// ===============================

document.addEventListener("DOMContentLoaded", function () {
    carregarCarrinho();

    // Adiciona o comportamento aos botões da loja.
    const botoes = document.querySelectorAll(".container .btn");

    botoes.forEach(botao => {
        botao.removeAttribute("href");

        botao.addEventListener("click", function (event) {
            event.preventDefault();
            adicionarCarrinho(this);
        });
    });
});
