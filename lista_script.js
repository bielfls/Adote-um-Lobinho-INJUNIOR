// funcao que "desenha" os lobos na tela
function renderizarLobos(listadelobos) {
    const container = document.getElementById('perfis');

    container.innerHTML = '';

    listadelobos.forEach((lobo, index) => {
        const tipoLayout = index % 2 === 0 ? 'perfil_lobo_tipo1' : 'perfil_lobo_tipo2';
        const divlobo = document.createElement('div');
        divlobo.classList.add(tipoLayout);

        if (tipoLayout === 'perfil_lobo_tipo1') {
            divlobo.innerHTML = `
                <div class="imagens">
                    <img src="${lobo.imagem}" alt="${lobo.nome}">
                </div>
                <div class="textos">
                    <div class="texto_link">
                        <div class="nome_idade">
                            <h2>${lobo.nome}</h2>
                            <p>Idade: ${lobo.idade} anos</p>
                        </div>
                        <a href="show.html?id=${lobo.id}">Adotar</a>
                    </div>
                    <p>${lobo.descricao}</p>
                    ${lobo.adotado ? '<p><strong>(Adotado)</strong></p>' : ''}
                </div>
            `;
        } else {
            divlobo.innerHTML = `
                <div class="textos">
                    <div class="texto_link">
                        <a href="show.html?id=${lobo.id}">Adotar</a>
                        <div class="nome_idade">
                            <h2>${lobo.nome}</h2>
                            <p>Idade: ${lobo.idade} anos</p>
                        </div>
                    </div>
                    <p>${lobo.descricao}</p>
                    ${lobo.adotado ? '<p><strong>(Adotado)</strong></p>' : ''}
                </div>
                <div class="imagens">
                    <img src="${lobo.imagem}" alt="${lobo.nome}">
                </div>
            `;
        }
        container.appendChild(divlobo);
    });
}

//funcao principal que inicia tudo
async function carregarHome() {
    try {
        const resultado = await buscarLobinhosPaginados(1, 4);
        renderizarLobos(resultado.dados);
        console.log("Lobos carregados!");
    } catch (erro) {
        console.error("Erro ao carregar a home:", erro);
    }
}



let paginaatual = 1;

// funcao principal para chamar a nova paginacao
async function carregarDados(pagina) {
    try {
        const resultado = await buscarLobinhosPaginados(pagina, 4);

        paginaatual = resultado.pagina;

        renderizarLobos(resultado.dados);
        renderizarPaginacao(resultado.totalPaginas);
    } catch (erro) {
        console.error("Erro:", erro);
    }
}

//funcao para fazer os botoes de passar pagina funcionarem
function renderizarPaginacao(totalPaginas) {
    const container = document.getElementById('paginas');
    container.innerHTML = '';

    //pro botao <<
    const btnvoltar = document.createElement('button');
    btnvoltar.innerText = '<<';
    btnvoltar.disabled = paginaatual === 1; 
    btnvoltar.onclick = () => carregarDados(paginaatual - 1); //botei o ()=> porque se nao a funcao roda sozinha
    container.appendChild(btnvoltar);

    //Logica que o chatgpt me ensinou muito boa para mostrar no maximo 5 botoes, botando, quando possivel, a pagina atual no meio dos numeros
    let maxbotoes = 5;
    let inicio = paginaatual - 2;
    let fim = paginaatual + 2;

    if (inicio < 1) { //ve se o inicio fica negativo, se ficar, obviamente está na 1 pagina ou na segunda
        inicio = 1;
        fim = maxbotoes;
    }

    if (fim > totalPaginas) { //ve se o fim fica maior doq o numero de paginas, se ficar, obviamente está na penultima ou ultima pagina
        fim = totalPaginas;
        inicio = totalPaginas - (maxbotoes - 1); //inicio vai ficar quatro numeros antes do ultimo
    }
    //cria os botoes de numero
    for (let i = inicio; i <= fim; i++) {
        const btnnumero = document.createElement('button');
        btnnumero.innerText = i;
        
        if (i === paginaatual) {
            btnnumero.disabled = true; //desliga o botao se ele eh a pagina atual
        }

        btnnumero.onclick = () => carregarDados(i);
        container.appendChild(btnnumero);
    }

    //so adicionando os tres pontinho que nao fazem nada kkkk
    const trespontos = document.createElement('p');
    trespontos.innerText = '...';
    container.appendChild(trespontos)

    //pro botao >>
    const btnpassar = document.createElement('button');
    btnpassar.innerText = '>>';
    btnpassar.disabled = paginaatual === totalPaginas; 
    btnpassar.onclick = () => carregarDados(paginaatual + 1);
    container.appendChild(btnpassar);
}

carregarHome();
carregarDados(1);