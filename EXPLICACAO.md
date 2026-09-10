# 1. Qual é a diferença entre a estrutura principal da resposta da JSONPlaceholder e a resposta da Beeceptor?
Além dos atributos já existentes em cada cartão do JSONPlaceholder(UserId, id, title, body), com o Beeceptor temos mais dois atributos adicionais: link e comment_count.

# 2. Por que não utilizamos dados.posts neste projeto?
Uma vez que já temos a resposta do Beeceptor como um array, após converter em json podemos trabalhar diretamente com a lista de publicações sem a necessidade de usar o posts.

# 3. O que o primeiro await aguarda?
A resposta da API à requisição do fetch

# 4. O que o segundo await aguarda?
A conversão do conteúdo da resposta da API para dados javascript

# 5. Onde existe uma callback no projeto?
Nos addEventListener: botaoCarregar.addEventListener("click", carregarPublicacoes) e campodePesquisa.addEventListener("input", filtrarPublicacoes)

# 6. Como map() participa da criação dos cartões?
A função map() percorre um array. Isso ajuda a criar os cartões, que são formados pelos dados contidos em publicacoes.

# 7. Como filter() participa da pesquisa?
A função filter() filtra dados de um array de acordo com um parâmetro. No código, o filter() é usado para filtrar o conteúdo de publicacoes de acordo com o que é pesquisado.

# 8. Qual é a finalidade da verificação Array.isArray(publicacoes)?
Seu objetivo é verificar se publicacoes é realmente um array para garantir que ele esteja no formato esperado.

# 9. O que acontece quando a requisição falha?


# 10. Qual personalização foi implementada e qual foi a maior dificuldade encontrada?