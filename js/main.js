'use strict';

import { tela } from "./telas/manager.js";
import { renderizarTelaInicial } from "./telas/inicial.js";
import { renderizarTelaPrincipal } from "./telas/principal.js";

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

tela.CRIAR("inicial", renderizarTelaInicial);
tela.CRIAR("principal", renderizarTelaPrincipal);

tela.MUDAR("inicial");