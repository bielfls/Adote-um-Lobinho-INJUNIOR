const nome = document.getElementById("nome");
const idade = document.getElementById("idade");
const email = document.getElementById("emailDono");
const adotar = document.getElementById("adotar");
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const ID = document.getElementById("IDlobo");


/* Pegar o nome do lobinho */
const nomeLobo = document.getElementById('nomeLobo');
 async function pegarNomeLobo(id){
    try{
        const response = await fetch(`http://localhost:3000/lobinhos/${id}`);

        if(!response.ok){
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const lobinho = await response.json();
        nomeLobo.innerText = lobinho.nome
        console.log('Lobinho Encontrado:', lobinho.nome);

    }catch(error){
        console.error('Erro ao buscar lobinho:', error);
        throw error;
    }
}


/* Atualizar JSON */
async function atualizarLobinhoParcial(id, nome, idade, email){
    const dadosParciais = {
        adotado: true,
        nomeDono: nome.value,
        idadeDono: idade.value,
        emailDono: email.value
    };

    try{
        const response = await fetch(`http://localhost:3000/lobinhos/${id}`, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dadosParciais)
            });

        if(!response.ok){
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const atualizado = await response.json();
        console.log('Lobinho atualizado: (PATCH)', atualizado);
        return atualizado;

    } catch(error){
        console.error('Erro ao atualizar lobinho (PATCH):', error);
        throw error;
    }
}

ID.innerText = `ID: ${id}`;
pegarNomeLobo(id);



adotar.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("clicado")
    atualizarLobinhoParcial(id,nome,idade,email);
    window.location.href = 'lista.html';
});