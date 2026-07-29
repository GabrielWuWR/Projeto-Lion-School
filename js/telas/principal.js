import { criar } from "../utils/geradores.js";
import { getAllAlunos, getAlunoByIdCurso } from "../rotas/telaPrincipal.js";
import { tela } from "./manager.js";

`
<h1 class="nomeCurso" id="nomeCurso">Desenvolvimento de sistemas</h1>

        <div class="containerAlunos">
            <div class="containerItens">
                <div class="itemAluno cursando">
                    <img src="./img/fotoTeste.png" alt="">
                    <p class="nomeUsuario">HÉLIDA BENTO DE OLIVEIRA LINS</p>
                </div>
                <div class="itemAluno finalizado">
                    <img src="./img/fotoTeste.png" alt="">
                    <p class="nomeUsuario">HÉLIDA BENTO DE OLIVEIRA LINS</p>
                </div>
            </div>
        </div>

`

async function criarHeaderAuxiliar(idCurso) {
    let header = criar.ELEMENTO('header', ['headerAuxiliar']);
    let statusContainer = criar.ELEMENTO('div', ['statusContainer']);

    let botaoStatus = criar.ELEMENTO('h3', [], 'botaoStatus');
    botaoStatus.textContent = 'Status';

    let containerStatus = criar.ELEMENTO('div', ['menuStatus'], 'containerStatus');

    let iconeCheck = criar.ELEMENTO('i', ['fa-solid', 'fa-check']);

    let itemTodos = criar.ELEMENTO('div', ['menuStatusItem', 'selecionado']);
    let textoTodos = criar.ELEMENTO('p');
    textoTodos.textContent = 'Todos';
    textoTodos.setAttribute('acao', 'todos');
    itemTodos.append(textoTodos, iconeCheck);

    let itemFinalizado = criar.ELEMENTO('div', ['menuStatusItem']);
    let textoFinalizado = criar.ELEMENTO('p');
    textoFinalizado.textContent = 'Finalizado';
    textoFinalizado.setAttribute('acao', 'finalizado');
    itemFinalizado.append(textoFinalizado);

    let itemCursando = criar.ELEMENTO('div', ['menuStatusItem']);
    let textoCursando = criar.ELEMENTO('p');
    textoCursando.setAttribute('acao', 'cursando');
    textoCursando.textContent = 'Cursando';
    itemCursando.append(textoCursando);

    containerStatus.append(itemTodos, itemFinalizado, itemCursando);
    statusContainer.append(botaoStatus, containerStatus);

    botaoStatus.addEventListener('click', () => {
        containerStatus.classList.toggle('visivel');
    });

    document.addEventListener('click', (clique) => {
        if (botaoStatus.contains(clique.target) || containerStatus.contains(clique.target)) {
            return;
        }
        containerStatus.classList.remove('visivel');
    });

    const opcoesMenu = [itemTodos, itemFinalizado, itemCursando];

    opcoesMenu.forEach(opcao => {
        opcao.addEventListener('click', async () => {
            opcoesMenu.forEach(item => item.classList.remove('selecionado'));
            opcao.classList.add('selecionado');
            opcao.append(iconeCheck);

            containerStatus.classList.remove('visivel');

            let acao = opcao.querySelector('p').getAttribute('acao');
            let alunos;

            if (acao === 'todos') {
                alunos = await getAllAlunos(idCurso);
            } else {
                alunos = await getAlunoByIdCurso(idCurso, acao);
            }

            let containerItens = document.querySelector('.containerItens');

            if (containerItens) {
                containerItens.innerHTML = "";

                if (alunos && alunos.length > 0) {
                    alunos.forEach((aluno, index) => {
                        let itemAluno = criarItemAluno(aluno, index, idCurso);
                        containerItens.append(itemAluno);
                    });
                } else {
                    let textoErroStatus = criar.ELEMENTO('h1');
                    textoErroStatus.textContent = 'Nenhum aluno encontrado com este status';
                    containerItens.append(textoErroStatus);
                }
            }
        });
    });

    let legendaContainer = criar.ELEMENTO('div', ['legendaContainer']);

    let tituloLegenda = criar.ELEMENTO('h3');
    tituloLegenda.textContent = 'LEGENDA';

    let itemLegendaCursando = criar.ELEMENTO('div', ['itemLegenda']);
    let corRoxo = criar.ELEMENTO('div', ['amostraCor', 'roxo']);
    let textoLegendaCursando = criar.ELEMENTO('p');
    textoLegendaCursando.textContent = 'Cursando';
    itemLegendaCursando.append(corRoxo, textoLegendaCursando);

    let itemLegendaFinalizado = criar.ELEMENTO('div', ['itemLegenda']);
    let corAmarelo = criar.ELEMENTO('div', ['amostraCor', 'amarelo']);
    let textoLegendaFinalizado = criar.ELEMENTO('p');
    textoLegendaFinalizado.textContent = 'Finalizado';
    itemLegendaFinalizado.append(corAmarelo, textoLegendaFinalizado);

    legendaContainer.append(tituloLegenda, itemLegendaCursando, itemLegendaFinalizado);

    let legendaDinamica = criar.ELEMENTO('div', ['legendaDinamica']);
    
    let botaoLegenda = criar.ELEMENTO('h3', [], 'botaoLegenda');
    botaoLegenda.textContent = 'LEGENDA';
    
    let containerLegenda = criar.ELEMENTO('div', ['legenda'], 'containerLegenda');
    
    let textoCursandoDinamico = criar.ELEMENTO('p', ['cursando']);
    textoCursandoDinamico.textContent = 'Cursando';
    
    let textoFinalizadoDinamico = criar.ELEMENTO('p', ['finalizado']);
    textoFinalizadoDinamico.textContent = 'Finalizado';
    
    containerLegenda.append(textoCursandoDinamico, textoFinalizadoDinamico);
    legendaDinamica.append(botaoLegenda, containerLegenda);

    botaoLegenda.addEventListener('click', () => {
        containerLegenda.classList.toggle('visivel');
    });

    document.addEventListener('click', (clique) => {
        if (botaoLegenda.contains(clique.target) || containerLegenda.contains(clique.target)) {
            return;
        }
        containerLegenda.classList.remove('visivel');
    });

    header.append(statusContainer, legendaContainer, legendaDinamica);

    return header;
}

export function deletarHeaderAuxiliar() {
    let header = document.querySelector('.headerAuxiliar');

    if (header) {
        header.remove();
    }
}

function criarItemAluno(aluno, index = 0, curso) {
    let itemAluno = criar.ELEMENTO('div', ['itemAluno'], aluno.id);

    if (aluno.status == "cursando") {
        itemAluno.classList.add('cursando');
    } else if (aluno.status == 'finalizado') {
        itemAluno.classList.add('finalizado')
    }

    let imagemAluno = criar.ELEMENTO('img');
    imagemAluno.src = aluno.foto;
    itemAluno.append(imagemAluno);

    let nomeAluno = criar.ELEMENTO('p', ['nomeUsuario']);
    nomeAluno.textContent = aluno.nome;
    itemAluno.append(nomeAluno);

    itemAluno.addEventListener('click', () => {
        tela.MUDAR("aluno", [aluno.id, curso]);
    })

    setTimeout(() => {
        itemAluno.classList.add('mostrar');
    }, 10 + (index * 100));

    return itemAluno;
}

export async function renderizarTelaPrincipal(curso) {
    curso = curso[0];
    let main = document.getElementById('containerGeral');
    main.className = 'telaPrincipal';
    let headerAuxiliar = await criarHeaderAuxiliar(curso.id);

    let headerExistente = document.querySelector('.headerAuxiliar');
    if (headerExistente) {
        headerExistente.remove();
    }

    let botaoVoltar = document.getElementById('acaoHeader');
    let novoBotao = botaoVoltar.cloneNode(true);
    botaoVoltar.replaceWith(novoBotao);
    botaoVoltar = novoBotao;

    let textoBotaoVoltar = botaoVoltar.querySelector('#headerTexto');
    textoBotaoVoltar.textContent = "Voltar";
    botaoVoltar.addEventListener('click', () => {
        tela.MUDAR('inicial');
    });


    main.before(headerAuxiliar);

    let container = document.createDocumentFragment();

    let nomeCurso = criar.ELEMENTO('h1', ['nomeCurso'], "nome");
    nomeCurso.textContent = curso.nome;

    let containerAlunos = criar.ELEMENTO('div', ['containerAlunos']);
    let containerItens = criar.ELEMENTO('div', ['containerItens']);
    let alunos = await getAllAlunos(curso.id);

    if (alunos != false) {
        containerItens.innerHTML = "";
        alunos.forEach((aluno, index) => {
            let itemAluno = criarItemAluno(aluno, index, curso);
            containerItens.append(itemAluno);
        });

        containerAlunos.append(containerItens);
    } else {
        let textoErroAlunos = criar.ELEMENTO('h1');
        textoErroAlunos.textContent = 'Não consegui carregar os alunos desse curso.'
        containerAlunos.append(textoErroAlunos);
    }

    container.append(nomeCurso, containerItens);

    return container;
};