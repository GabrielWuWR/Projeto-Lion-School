const rotaBase = 'https://lion-school-phbo.onrender.com';

export const getAllAlunos = async function (idCurso) {
    let url = `${rotaBase}/alunos?curso_id=${idCurso}`;

    try {
        let response = await fetch(url);

        if (response.ok) {
            let responstaAPI = await response.json();

            if (responstaAPI.length > 0) {
                return responstaAPI;
            } else {
                console.warn('A API não retornou nada 😯');
                return false;
            }
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const getAlunoByIdCurso = async function (idCurso, status) {
    let url = `${rotaBase}/alunos?curso_id=${idCurso}&status=${status}`;

    try {
        let response = await fetch(url);
        if (response.ok) {
            let responstaAPI = await response.json();

            if (responstaAPI.length > 0) {
                return responstaAPI;
            } else {
                console.warn('A API não retornou nada 😯');
                return false;
            }
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}