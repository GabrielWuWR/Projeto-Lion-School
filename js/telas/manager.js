/**
 * Objeto responsável pelas telas do sistema.
 */
export const tela = {
    _telasRegistradas: {},

    /**
     * Registra uma nova tela no sistema.
     * 
     * @param {string} nome - O nome da tela.
     * @param {function} funcaoRenderizar - A função que cria e retorna o elemento HTML da tela.
     * @returns {void}
     */
    CRIAR: function(nome, funcaoRenderizar) {
        this._telasRegistradas[nome] = funcaoRenderizar;
    },

    /**
     * Muda a tela atual por uma nova.
     * 
     * @param {string} nome - O nome da tela que você deseja.
     * @returns {Promise<boolean>} Retorna true se a tela carregou ou false caso de erro.
     */
    MUDAR: async function(nome) {
        const container = document.getElementById('containerGeral');

        if(!this._telasRegistradas[nome]) {
            console.error('Não encontrei a sua tela 😯');
            return false;
        }

        container.innerHTML = "";
        container.className = "";

        const conteudo = await this._telasRegistradas[nome]();

        if(conteudo) {
            container.append(conteudo);
            return true;
        } else {
            console.warn("Não foi possivel carregar sua tela 😕");
            return false;
        }
    }
};