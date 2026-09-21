// Elementos do formulário
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputNota = document.getElementById("nota");
const btn = document.getElementById("btn");
const Tabela = document.getElementById("tabela");
const quantidade = document.getElementById("quantidade");

btn.addEventListener("click", cadastro);

// Permite cadastrar também com Enter
[inputNome, inputIdade, inputNota].forEach(function (campo) {
    campo.addEventListener("keydown", function (evento) {
        if (evento.key === "Enter") {
            cadastro();
        }
    });
});

function cadastro() {
    const nome = inputNome.value.trim();
    const idade = Number(inputIdade.value);
    const nota = Number(inputNota.value);

    if (
        nome === "" ||
        inputIdade.value === "" ||
        inputNota.value === "" ||
        Number.isNaN(idade) ||
        idade < 1 ||
        Number.isNaN(nota) ||
        nota < 0 ||
        nota > 10
    ) {
        alert("Preencha todos os campos corretamente!\nIdade deve ser maior que 0.\nNota deve ser entre 0 e 10.");
        return;
    }

    let situacao;
    let classe;

    if (nota >= 7) {
        situacao = "Aprovado";
        classe = "aprovado";
    } else if (nota >= 5) {
        situacao = "Recuperação";
        classe = "recuperacao";
    } else {
        situacao = "Reprovado";
        classe = "reprovado";
    }

    const linha = document.createElement("tr");

    const colunaNome = document.createElement("td");
    colunaNome.textContent = nome;

    const colunaIdade = document.createElement("td");
    colunaIdade.textContent = idade;

    const colunaNota = document.createElement("td");
    colunaNota.textContent = nota.toFixed(1);

    const colunaSituacao = document.createElement("td");
    colunaSituacao.textContent = situacao;
    colunaSituacao.classList.add(classe);

    const colunaAcao = document.createElement("td");
    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.type = "button";
    btnExcluir.classList.add("btnExcluir");
    btnExcluir.addEventListener("click", function () {
        linha.remove();
        atualizarQuantidade();
    });

    colunaAcao.appendChild(btnExcluir);

    linha.appendChild(colunaNome);
    linha.appendChild(colunaIdade);
    linha.appendChild(colunaNota);
    linha.appendChild(colunaSituacao);
    linha.appendChild(colunaAcao);

    Tabela.appendChild(linha);

    inputNome.value = "";
    inputIdade.value = "";
    inputNota.value = "";
    inputNome.focus();

    atualizarQuantidade();
}

function atualizarQuantidade() {
    
    const alunos = Tabela.querySelectorAll("tr");
    quantidade.textContent = " " - 1 + alunos.length;
}
