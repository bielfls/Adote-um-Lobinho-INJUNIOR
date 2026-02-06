let filtroAdotados = false; //filtro de adotados

// funcao que "desenha" os lobos na tela
function renderizarLobos(listadelobos) {
    const container = document.getElementById('perfis');

    container.innerHTML = '';

    listadelobos.forEach((lobo, index) => {
        const tipoLayout = index % 2 === 0 ? 'perfil_lobo_tipo1' : 'perfil_lobo_tipo2';
        const divlobo = document.createElement('div');
        divlobo.classList.add(tipoLayout);

        if (tipoLayout === 'perfil_lobo_tipo1' && !(lobo.adotado)) {
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
        } else if ((tipoLayout === 'perfil_lobo_tipo1' && lobo.adotado)){
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
                        <button class="botao_adotado">Adotado</button>
                    </div>
                    <p>${lobo.descricao}</p>
                    ${lobo.adotado ? '<p><strong>(Adotado)</strong></p>' : ''}
                </div>
            `;
        
        } else if (!(lobo.adotado)){
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
        } else {
            divlobo.innerHTML = `
                <div class="textos">
                    <div class="texto_link">
                        <button class="botao_adotado">Adotado</button>
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

let nome_buscado = "";
let paginaatual = 1;

// funcao para carregar os dados da main, com paginacao e pesquisa
async function carregarDados(pagina) {
    try {
        let resultado;
        //se tiver algo na pesquisa ele filtra por nome
        if(nome_buscado){
            resultado = await buscarLobinhosNome(nome_buscado, pagina, 4, filtroAdotados);
        }
        else{
            resultado = await buscarLobinhosPaginados(pagina, 4, filtroAdotados);
        }

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

    if (inicio < 1) { //pra arrumar quando as paginas forem menos de 5 e nao ficar negativo
        inicio = 1;
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

//funcao para tornar a pesquisa funcional
async function pesquisar() {
    const input = document.getElementById('input_pesquisa');
    nome_buscado = input.value.trim(); //esse .trim é um metodo que tira os espaços do começo e do fim para nao dar ruim na pesquisa
    paginaatual = 1;
    carregarDados(1);
}


const checkbox_adotados = document.querySelector('#check_adotados input');


checkbox_adotados.addEventListener('change', function() {
    filtroAdotados = this.checked; // change entra na funcao quando muda o estado da checkbox e o this.checked muda o valor da variavel pra o valor booleano da checkbox (inclusive o funtion eh pra fazer o .this funcionar)
    paginaatual = 1;
    carregarDados(1);
});

//fazendo o botao de pesquisa e o enter no input funcionarem
const botao_procurar = document.getElementById('botao_procurar');
botao_procurar.addEventListener('click', pesquisar);

const barra_input = document.getElementById('input_pesquisa');
barra_input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        pesquisar();
    }
});


carregarDados(1);