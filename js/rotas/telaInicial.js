const rotaBase = 'https://lion-school-phbo.onrender.com';

export const getAllCursos = async function () {
    let url = `${rotaBase}/cursos`;

    try {
        let response = await fetch(url);
        if (response.ok) {
            let respostaApi = await response.json();

            if (respostaApi.length > 0) {
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