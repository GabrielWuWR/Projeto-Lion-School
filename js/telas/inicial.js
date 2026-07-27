
import { getAllCursos } from "../rotas/telaInicial.js";
import { criar } from "../utils/geradores.js";
import { tela } from "./manager.js";

`
<div class="conteudoInicial">
            <div class="colunaInicial textoComeco">
                <div>
                    <h1>Escolha um <span>curso</span></h1>
                    <h1>para gerenciar</h1>
                </div>
                <img src="./img/devices.svg" alt="">
            </div>

            <div class="colunaInicial">
                <img class="studentImg" src="./img/studant.svg" alt="">
            </div>

            <div class="colunaInicial containerItensCurso" id="containerCursos">
                <div class="itemCurso">
                    <i class="fa-solid fa-code"></i>
                    <p>DS</p>
                </div>
                <div class="itemCurso">
                    <i class="fa-solid fa-network-wired"></i>
                    <p>REDE</p>
                </div>
            </div>
        </div>
        </div>

`

function criarCardCurso(curso) {
    try {
        let containerCard = criar.ELEMENTO('div', ['itemCurso'], curso.id);

        let icone = criar.ELEMENTO('img', ['imagemCurso']);
        icone.src = curso.icon;
        containerCard.append(icone);

        let nome = criar.ELEMENTO('p');
        nome.textContent = curso.sigla;
        containerCard.append(nome);

        containerCard.addEventListener('click', () => {
            tela.MUDAR("principal", [curso]);
        });

        return containerCard;
    } catch (error) {
        console.error(error);
        return false;
    }

}

export async function renderizarTelaInicial() {
    let main = document.getElementById('containerGeral');
    main.className = 'telaInicial';

    let conteudoInicial = criar.ELEMENTO('div', ['conteudoInicial']);

    let colunaUm = criar.ELEMENTO('div', ['colunaInicial', 'textoComeco']);
    let divSolta = criar.ELEMENTO('div');

    let textoComecoParteUm = criar.ELEMENTO('h1');
    textoComecoParteUm.textContent = 'Escolha um ';

    let spanComeco = criar.ELEMENTO('span');
    spanComeco.textContent = 'curso';
    textoComecoParteUm.append(spanComeco);
    divSolta.append(textoComecoParteUm);

    let textoComecoParteDois = criar.ELEMENTO('h1');
    textoComecoParteDois.textContent = 'para gerenciar';
    divSolta.append(textoComecoParteDois);
    colunaUm.append(divSolta);

    let imagemDevice = criar.ELEMENTO('img');
    imagemDevice.src = './img/devices.svg';
    colunaUm.append(imagemDevice);

    conteudoInicial.append(colunaUm);

    let colunaDois = criar.ELEMENTO('div', ['colunaInicial']);

    let imagemStudante = criar.ELEMENTO('img', ['studentImg']);
    imagemStudante.src = './img/studant.svg';
    colunaDois.append(imagemStudante);

    conteudoInicial.append(colunaDois);


    let colunaTres = criar.ELEMENTO('div', ['colunaInicial', 'containerItensCurso'], 'containerCursos');
    let cursos = await getAllCursos();
    
    if (cursos != false) {
        cursos.forEach((curso) => {
            let htmlCurso = criarCardCurso(curso);

            if (htmlCurso != false) {
                colunaTres.append(htmlCurso);
            }
        });
    } else {
        let nadaEncontrado = criar.ELEMENTO('h1');
        nadaEncontrado.textContent = 'Nenhum curso encontrado...';
        colunaTres.append(nadaEncontrado);
    }

    conteudoInicial.append(colunaTres);

    return conteudoInicial;
}