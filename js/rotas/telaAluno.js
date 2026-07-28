const rotaBase = 'https://lion-school-phbo.onrender.com';

export const getAlunoInformacoes = async function (alunoId) {
    let url = `${rotaBase}/alunos/${alunoId}`;
    
    try {
        let response = await fetch(url);
        if (response.ok) {
            let respostaApi = await response.json();

            if (respostaApi) {
                return respostaApi;
            } else {
                console.warn("A api não retornou nada 😯");
                return false;
            }
        }
    } catch (error) {
        console.error(error);
        return false;
    }
};