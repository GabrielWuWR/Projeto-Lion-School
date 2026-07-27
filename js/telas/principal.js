import { criar } from "../utils/geradores.js";
import { getAllAlunos } from "../rotas/telaPrincipal.js";

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

export async function renderizarTelaPrincipal(curso) {
    let main = document.getElementById('containerGeral');
    main.className = 'telaPrincipal';

    curso = curso[0];
    let container = document.createDocumentFragment();

    let nomeCurso = criar.ELEMENTO('h1', ['nomeCurso'], "nome");
    nomeCurso.textContent = curso.nome;

    let containerAlunos = criar.ELEMENTO('div', ['containerAlunos']);
    let containerItens = criar.ELEMENTO('div', ['containerItens']);
    let alunos = await getAllAlunos(curso.id);
    
    if(alunos != false) {
        alunos.forEach((aluno)=>{
            let itemAluno = criar.ELEMENTO('div', ['itemAluno'], aluno.id);

            if(aluno.status = "cursando") {
               itemAluno.classList.add('cursando');
            } else if(aluno.status == 'finalizado') {
                itemAluno.classList.add('finalizado')
            }
            
            let imagemAluno = criar.ELEMENTO('img');
            imagemAluno.src = aluno.foto;
            itemAluno.append(imagemAluno);

            let nomeAluno = criar.ELEMENTO('p', ['nomeUsuario']);
            nomeAluno.textContent = aluno.nome;
            itemAluno.append(nomeAluno);

            itemAluno.addEventListener('click', ()=>{
                alert(`abrindo informações de ${aluno.nome}`)
            })

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