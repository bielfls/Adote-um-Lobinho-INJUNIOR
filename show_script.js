const params = new URLSearchParams(window.location.search);
const id = params.get('id');

async function renderizarLobo(id){
    const container = document.getElementById('perfil');
    const lobo_info = await buscarLobinhoId(id, 1, 1);

    const lobo = lobo_info.dados[0];

    const titulo = document.getElementById('nome_lobo');
    titulo.innerText = `${lobo.nome}`;

    container.innerHTML = '';
    container.innerHTML = `
            <div id="imagem_botoes">
                <div id="imagem">
                    <img src="${lobo.imagem}" alt="lobo">
                </div>
                <div id="botoes">
                    <a href="adotar.html?id=${lobo.id}"><button id="botao1">ADOTAR</button></a>
                    <button id="botao2">EXCLUIR</button>
                </div>
            </div>
            <p>${lobo.descricao}</p>
        `;
    
    //tornando o botao de excluir funcional
    const botaoExcluir = document.getElementById('botao2');
    botaoExcluir.addEventListener('click', async () => {
        const confirmacao = confirm(`Tem certeza que deseja excluir o ${lobo.nome}?`);
        if (confirmacao) {
            await deletarLobinho(id);
        }
    });

}




renderizarLobo(id);