import { criar } from "../utils/geradores.js";
import { getAlunoInformacoes } from "../rotas/telaAluno.js";
import { deletarHeaderAuxiliar } from "./principal.js";
import { tela } from "./manager.js";

`
<div class="containerAlunoInformacao">
            <img src="./img/fotoTeste.png" alt="">
            <h1>NOME USUARIO</h1>
        </div>

        <div class="containerAlunoNotas">
            <div class="barraContainer">
                <p class="numero">90</p>
                <div class="barra">
                    <div class="barraPreenchimento positivo"></div>
                </div>
                <p class="materia">SOP</p>
            </div>
        </div>
`

function criarItemDesempenho(desempenho, index = 0) {
    let barraContainer = criar.ELEMENTO('div', ['barraContainer']);

    let nota = criar.ELEMENTO('p', ['numero']);
    nota.textContent = desempenho.valor;
    barraContainer.append(nota);

    let barra = criar.ELEMENTO('div', ['barra']);
    let barraPreenchimento = criar.ELEMENTO('div', ['barraPreenchimento']);

    if (desempenho.valor <= 30) {
        barraPreenchimento.classList.add('negativo');
    } else if (desempenho.valor < 75) {
        barraPreenchimento.classList.add('medio');
    } else {
        barraPreenchimento.classList.add('positivo');
    }

    barra.append(barraPreenchimento);
    barraContainer.append(barra);

    let materiaNome = criar.ELEMENTO('p', ['materia']);
    materiaNome.textContent = desempenho.categoria;
    barraContainer.append(materiaNome);

    setTimeout(() => {
        barraPreenchimento.style.height = `${desempenho.valor}%`;
    }, (index * 300) + 50);

    return barraContainer;
}

export async function renderizarTelaAluno(parametros) {
    let alunoId = parametros[0];
    let curso = parametros[1];

    deletarHeaderAuxiliar();
    let main = document.getElementById('containerGeral');
    main.className = 'telaInformacoes';

    let aluno = await getAlunoInformacoes(alunoId);

    let botaoVoltar = document.getElementById('acaoHeader');
    let novoBotao = botaoVoltar.cloneNode(true);
    botaoVoltar.replaceWith(novoBotao);
    botaoVoltar = novoBotao;

    let textoBotaoVoltar = botaoVoltar.querySelector('#headerTexto');
    textoBotaoVoltar.textContent = "Voltar";
    botaoVoltar.addEventListener('click', () => {
        tela.MUDAR('principal', [curso]);
    });

    if (aluno != false) {
        let container = document.createDocumentFragment();

        let containerAlunoInformacao = criar.ELEMENTO('div', ['containerAlunoInformacao']);

        let imagemAluno = criar.ELEMENTO('img');
        imagemAluno.src = aluno.foto;
        containerAlunoInformacao.append(imagemAluno);

        let nomeAluno = criar.ELEMENTO('h1');
        nomeAluno.textContent = aluno.nome;
        containerAlunoInformacao.append(nomeAluno);

        container.append(containerAlunoInformacao);

        let containerAlunoNotas = criar.ELEMENTO('div', ['containerAlunoNotas']);

        aluno.desempenho.forEach((desempenho) => {
            let desempenhoHtml = criarItemDesempenho(desempenho);

            if (desempenhoHtml) {
                containerAlunoNotas.append(desempenhoHtml);
            }
        });

        container.append(containerAlunoNotas);

        return container;
    } else {

    }
}