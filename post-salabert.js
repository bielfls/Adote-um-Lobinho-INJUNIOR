/*Fazendo com que o código rode ao apertar o botão*/
document.getElementById('button').addEventListener('click', criarLobinho)

/*Função para adicionar o lobinho*/
async function criarLobinho() {

    /*Pegando as informações do html*/
    const nome = document.getElementById('input-nome')
    const idade = document.getElementById('input-anos')
    const foto = document.getElementById('input-foto')
    const descricao = document.getElementById('input-desc')

    /*Conferindo se os campos estão preenchidos*/
    if (!nome.value || !idade.value || !foto.value || !descricao.value) {
        alert('Por favor, preencha todos os campos.');
    } else{

        /*Montando o objeto*/
        const novoLobinho = {
            nome: nome.value,
            idade: Number(idade.value),
            descrição: descricao.value,
            imagem: foto.value,
            adotado: false,
            nomeDono: null,
            idadeDono: null,
            emailDono: null
        };
    }

    /*Testando se o objeto foi montado*/
    console.log('Objeto montado:', novoLobinho)

    /*Postando o novo lobinho*/
    try{
        const response = await fetch('http://localhost:3000/lobinhos', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(novoLobinho)
        });

        if (!response.ok){
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const criado = await response.json();
        console.log('Lobinho criado:', criado);

        /*Limpar as informações após o salvamento*/
        document.getElementById('input-nome').value = '';
        document.getElementById('input-anos').value = '';
        document.getElementById('input-foto').value = '';
        document.getElementById('input-desc').value = '';

        alert('Lobinho criado com sucesso.')
        return criado;

    } catch (error){
        console.error('Erro ao criar lobinho:', error);
        alert('Erro ao criar lobinho.')
        throw error;
    }
}