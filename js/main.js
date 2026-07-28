'use strict';

import { tela } from "./telas/manager.js";
import { renderizarTelaInicial } from "./telas/inicial.js";
import { renderizarTelaPrincipal } from "./telas/principal.js";
import { renderizarTelaAluno } from "./telas/aluno.js";


tela.CRIAR("inicial", renderizarTelaInicial);
tela.CRIAR("principal", renderizarTelaPrincipal);
tela.CRIAR("aluno", renderizarTelaAluno);

tela.MUDAR("inicial");