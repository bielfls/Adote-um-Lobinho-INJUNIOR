// funcao assincrona para buscar lobinhos com paginação
async function buscarLobinhosPaginados(pagina = 1, limite = 4) {
    try {
        const response = await fetch(`http://localhost:3000/lobinhos?_page=${pagina}&_limit=${limite}`);

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const lobinhos = await response.json();

        // visto no vídeo de explicação do projeto, esse pega o total de itens no header pelo JSON Server
        const totalItens = response.headers.get('X-Total-Count');

        console.log(`Página ${pagina} (${limite} por página):`, lobinhos);
        console.log(`Total de lobinhos: ${totalItens}`);

        return {
            dados: lobinhos,
            pagina,
            limite,
            total: parseInt(totalItens),
            totalPaginas: Math.ceil(parseInt(totalItens) / limite)
        };
    } catch (error) {
        console.error('Erro ao buscar lobinhos paginados:', error);
        throw error;
    }
}

//funcao assincrona pra buscar lobinho pelo nome
async function buscarLobinhoNome(nome, pagina = 1, limite = 4) {
    try {
        const response = await fetch(`http://localhost:3000/lobinhos?_page=${pagina}&_limit=${limite}&nome_like=${nome}`);

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const lobinhos = await response.json();

        // Visto no vídeo de explicação do projeto, esse pega o total de itens no header pelo JSON Server
        const totalItens = response.headers.get('X-Total-Count');

        console.log(`Página ${pagina} (${limite} por página):`, lobinhos);
        console.log(`Total de lobinhos: ${totalItens}`);

        return {
            dados: lobinhos,
            pagina,
            limite,
            total: parseInt(totalItens),
            totalPaginas: Math.ceil(parseInt(totalItens) / limite)
        };
    } catch (error) {
        console.error('Erro ao buscar lobinhos paginados:', error);
        throw error;
    }
}

async function buscarLobinhoId(id, pagina = 1, limite = 1) {
    try {
        const response = await fetch(`http://localhost:3000/lobinhos?_page=${pagina}&_limit=${limite}&id=${id}`);

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const lobinhos = await response.json();

        // Visto no vídeo de explicação do projeto, esse pega o total de itens no header pelo JSON Server
        const totalItens = response.headers.get('X-Total-Count');

        console.log(`Página ${pagina} (${limite} por página):`, lobinhos);
        console.log(`Total de lobinhos: ${totalItens}`);

        return {
            dados: lobinhos,
            pagina,
            limite,
            total: parseInt(totalItens),
            totalPaginas: Math.ceil(parseInt(totalItens) / limite)
        };
    } catch (error) {
        console.error('Erro ao buscar lobinhos paginados:', error);
        throw error;
    }
}

//testando funcoes
//buscarLobinhosPaginados(1, 4);
//buscarLobinhoNome("donavon", 1, 4)