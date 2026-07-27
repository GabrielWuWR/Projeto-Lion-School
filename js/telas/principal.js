
import { getAllCursos } from "./rotas/telaInicial.js";
import { criar } from "../utils/geradores.js";

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
            alert(`indo para o curso ${curso.nome}`);
        });

        return containerCard;
    } catch (error) {
        console.error(error);
        return false;
    }

}

async function renderizarCardsCursos() {
    let containerCursos = document.getElementById('containerCursos');
    let cursos = await getAllCursos();

    if (cursos != false) {
        containerCursos.innerHTML = '';

        cursos.forEach((curso) => {
            let htmlCurso = criarCardCurso(curso);

            if (htmlCurso != false) {
                containerCursos.append(htmlCurso);
            }
        });
    }
}

async function renderizarTela() {
    let main = document.getElementById('containerGeral');
    main.className = 'telaInicial';

    let conteudoInicial = criar.ELEMENTO('div', ['conteudoInicial']);

    let colunaUm = criar.ELEMENTO('div', ['colunaInicial', 'textoComeco']);
    let divSolta = criar.ELEMENTO('div');
}