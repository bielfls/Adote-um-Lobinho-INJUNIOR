async function carregarLobinhos() {
  try {
    const response = await fetch('http://localhost:3000/lobinhos');

    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }
  const todosLobinhos = await response.json();
  const lobinhosEmbaralhados= todosLobinhos.sort(()=>Math.random()-0.5);
  const selecionados=lobinhosEmbaralhados.slice(0,2);
  renderizarLobos(selecionados);
  } catch (error) {
        console.error('Erro ao buscar lobinhos:', error);
    }
}

function renderizarLobos(lobos) {
    const container = document.getElementById('container-lobos');
    let htmlContent = '<h2>Lobos Exemplo</h2>';
    lobos.forEach((lobo, index) => {
        const classeReverse = index === 1 ? 'reverse' : '';
        const card = `
            <div class="lobo-card ${classeReverse}">
                ${index === 0 ? renderFoto(lobo) : renderInfo(lobo)}
                ${index === 0 ? renderInfo(lobo) : renderFoto(lobo)}
            </div>
        `;
        htmlContent += card;
    });

    container.innerHTML = htmlContent;
}
function renderFoto(lobo) {
    return `
        <div class="quadradobckg">
            <img src="${lobo.imagem}" alt="imagem de ${lobo.nome}">
        </div>`;
}
function renderInfo(lobo) {
    return `
        <div class="lobo-info">
            <h3>${lobo.nome}</h3>
            <span>Idade: ${lobo.idade} anos</span>
            <p>${lobo.descricao}</p>
        </div>`;
}
carregarLobinhos();