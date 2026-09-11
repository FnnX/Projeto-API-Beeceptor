// Localizar os elementos da página
const botaoCarregar = document.querySelector("#botao-carregar");
const campodePesquisa = document.querySelector("#campo-pesquisa");
const mensagem = document.querySelector("#mensagem");
const listaPublicacoes = document.querySelector("#lista-publicacoes");
const areaResultado = document.querySelector(".area-resultado");
const qtdComentarios = document.querySelector("#qtdComentarios")

let publicacoesCarregadas = []; 

function alterarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = `mensagem mensagem--${tipo}`;
}

function criarCartao(publicacao) {
    return `
        <article class="cartao">
            <span class="cartao__numero">
                Publicação ${publicacao.id} | Usuário ${publicacao.userId}
            </span>
            <h3>${publicacao.title}</h3>
            <p>${publicacao.body}</p>
            <p style="margin-top: 12px; font-size: 0.9em;">
                <strong>Comentários:</strong> ${publicacao.comment_count}
            </p>
            <a href="${publicacao.link}" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin-top: 8px; color: var(--verde-700); font-weight: 700; text-decoration: none;">
                Ler artigo completo ↗
            </a>
        </article>
    `;
}

function exibirPublicacoes(publicacoes) {
    //ordenando as publicações de acordo com sua quantidade de comentários (dos maior número ao menor)
    const publicacoesOrdenadas = [...publicacoes]; //[...array] é usado para copiar o array indicado
    publicacoesOrdenadas.sort((a, b) => b.comment_count - a.comment_count); //sort ordena 'publicacoes' de forma decrescente
    //contabilizando em uma variável a quantidade total de comentáios nos cartões exibidos 
    let totalComments = 0;
    for (const publicacao of publicacoesOrdenadas) {
        //percorre publicacoesOrdenadas e soma a qtd de comentários
        totalComments += publicacao.comment_count;
    }
    qtdComentarios.textContent = `Total de comentários: ${totalComments}`; //exibe totalComments na tela
    
    listaPublicacoes.innerHTML = publicacoesOrdenadas.map(criarCartao).join(""); //uso de publicacoesOrdenadas
}

async function carregarPublicacoes() {
    alterarMensagem("Carregando publicações...", "carregando");
    listaPublicacoes.innerHTML = "";
    botaoCarregar.disabled = true;
    campodePesquisa.disabled = true;
    qtdComentarios.textContent = ``; //reseta o contador de comentários antes de realizar o novo cálculo
    areaResultado.setAttribute("aria-busy", "true");

    try {
        const resposta = await fetch("https://json-placeholder.mock.beeceptor.com/posts"); 
        
        if (!resposta.ok) {
            throw new Error(`A API respondeu com o status: ${resposta.status}`);
        }

        const publicacoes = await resposta.json();

        // Validação da estrutura de array direto recebida da Beeceptor
        if (!Array.isArray(publicacoes)) {
            throw new Error("Formato de resposta inesperado.");
        }

        publicacoesCarregadas = publicacoes.slice(0, 10);
        exibirPublicacoes(publicacoesCarregadas);
        
        // Personalização: Tratamento de singular e plural
        const textoPublicacao = publicacoesCarregadas.length === 1 ? "publicação carregada" : "publicações carregadas";
        alterarMensagem(`${publicacoesCarregadas.length} ${textoPublicacao}.`, "sucesso");
        
        campodePesquisa.disabled = false;
    } catch (erro) {
        alterarMensagem("Não foi possível carregar os dados. Tente novamente.", "erro");
        console.error("Detalhes do erro:", erro);
    } finally {
        botaoCarregar.disabled = false;
        areaResultado.setAttribute("aria-busy", "false");
    } 
}

function filtrarPublicacoes() {
    const termo = campodePesquisa.value.trim().toLowerCase();
    const resultado = publicacoesCarregadas.filter((publicacao) => {
        const texto = `${publicacao.title} ${publicacao.body} ${publicacao.userId}`.toLowerCase();
        return texto.includes(termo);
    });

    exibirPublicacoes(resultado);

    if (resultado.length === 0) {
        alterarMensagem("Nenhuma publicação corresponde à pesquisa.", "inicial");
        qtdComentarios.textContent = ``;
    } else {
        // Personalização: Tratamento de singular e plural
        const textoPublicacao = resultado.length === 1 ? "publicação encontrada" : "publicações encontradas";
        alterarMensagem(`${resultado.length} ${textoPublicacao}.`, "sucesso");
    }
}

botaoCarregar.addEventListener("click", carregarPublicacoes);
campodePesquisa.addEventListener("input", filtrarPublicacoes);