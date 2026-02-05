const params = new URLSearchParams(window.location.search);
const id = params.get('id');

async function renderizarLobo(id){
    const container = document.getElementById('perfil');
    const lobo_info = await buscarLobinhoId(id, 1, 1);

    const lobo = lobo_info.dados[0];
    const divperfil = document.createElement("div");
    divperfil.classList.add('perfil');

    const titulo = document.getElementById('nome_lobo');
    titulo.innerText = `${lobo.nome}`;

    divperfil.innerHTML = '';
    divperfil.innerHTML = `
            <div id="imagem_botoes">
                <div id="imagem">
                    <img src="${lobo.imagem}" alt="lobo">
                </div>
                <div id="botoes">
                    <a href=""><button id="botao1">ADOTAR</button></a>
                    <button id="botao2">EXCLUIR</button>
                </div>
            </div>
            <p>${lobo.descricao}</p>
        `;

    container.appendChild(divperfil);
}

renderizarLobo(id);