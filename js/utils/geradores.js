/**
 * Objeto responsável por agrupar métodos de criação e manipulação do DOM.
 */
export const criar = {
    /**
     * Cria um novo elemento HTML.
     * * @param {string} tipo - O nome da tag HTML a ser criada.
     * @param {Array<string>} [classes] - Um array contendo as classes css, passe um array vazio se não houver classes.
     * @param {string} [id] - O ID do elemento.
     * @returns {HTMLElement} Retorna o elemento HTML.
     * * @example
     * // Cria uma div com as classes 'container' e 'ativo', e com o ID 'painel'
     * const painel = criar.ELEMENTO('div', ['container', 'ativo'], 'painel');
     */
    ELEMENTO: function(tipo, classes, id) {
        const elemento = document.createElement(tipo);

        if (classes) {
            for (let i = 0; i < classes.length; i++) {
                if (classes[i]) {
                    elemento.classList.add(classes[i]);
                }
            }
        }

        if (id) {
            elemento.id = id;
        }

        return elemento;
    }
};