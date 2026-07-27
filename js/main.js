'use strict';

import { tela } from "./telas/manager.js";
import { criar } from "./utils/geradores.js";

const botaoStatus = document.getElementById('botaoStatus');
const containerStatus = document.getElementById('containerStatus');

botaoStatus.addEventListener('click', () => {
    containerStatus.classList.toggle('visivel');
});

document.addEventListener('click', (clique) => {
    if (botaoStatus.contains(clique.target) || containerStatus.contains(clique.target)) {
        return;
    }
    containerStatus.classList.remove('visivel');
});

tela.CRIAR("teste", async ()=>{
    let divTeste = criar.ELEMENTO('div');

    divTeste.innerHTML = "<h1>Testando as coisas....</h1>";
    return divTeste;
})

tela.MUDAR("teste");