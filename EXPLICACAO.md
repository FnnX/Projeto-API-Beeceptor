# 1. Qual é a diferença entre a estrutura principal da resposta da JSONPlaceholder e a resposta da Beeceptor?
Além dos atributos já existentes em cada 'cartão' do JSONPlaceholder(UserId, id, title, body), com o Beeceptor temos mais dois atributos adicionais: link e comment_count.

# 2. Por que não utilizamos dados.posts neste projeto?
Uma vez que já temos a resposta do Beeceptor como um array, após converter em json podemos trabalhar diretamente com a lista de publicações sem a necessidade de usar o posts.

# 3. O que o primeiro await aguarda?
O primeiro await (utilizado na linha `await fetch(...)) aguarda que o processo de rede se inicie e receba uma resolução pelo servidor, ou seja, aguarda o retorno dos cabeçalhos HTTP e do status da requisição inicial, antes mesmo de baixar por inteiro o corpo dos dados.

# 4. O que o segundo await aguarda?
O segundo await (utilizado na linha await resposta.json()) instrui o navegador a aguardar a extração e decodificação completas do corpo da resposta, fazendo com que o conteúdo textual em formato JSON seja traduzido para uma estrutura real de dados do JavaScript (arrays e objetos) antes de seguir para a próxima linha.

# 5. Onde existe uma callback no projeto?
Há o emprego extensivo de funções callback repassadas aos escutadores de eventos. Por exemplo, na instrução botaoCarregar.addEventListener("click", carregarPublicacoes), a função carregarPublicacoes atua como a callback que será disparada somente em caso de clique. criarCartao dentro do map() é outro caso prático de callback.

# 6. Como map() participa da criação dos cartões?
A função map() é executada iterando cada elemento presente no array de publicações. Para cada item encontrado, ele roda a função criarCartao, que recebe o objeto com os dados da publicação e devolve o HTML formatado com todos os identificadores interpolados, reconstruindo o array original como um array de "textos HTML".

# 7. Como filter() participa da pesquisa?
Ao realizar a pesquisa, o filter() examina cada uma das 10 publicações originais armazenadas. Para cada item, ele condensa o título, corpo e o ID do usuário em minúsculo e avalia o bloco usando o método includes() baseando-se na palavra digitada. Se a condição for verdadeira, o objeto é mantido para o array de resultado.

# 8. Qual é a finalidade da verificação Array.isArray(publicacoes)?
Como a manipulação posterior utilizará funções nativas de arrays (como o método .slice(), .map(), .filter()), a ausência do uso delas resultaria em falha grave. A verificação resguarda a aplicação comprovando matematicamente que a resposta recebida é, de fato, um array, evitando erros caso o provedor da API modifique a estrutura futuramente.

# 9. O que acontece quando a requisição falha?
Caso aconteça alguma falha de conexão na rede ou o status seja recusado (!resposta.ok), a instrução desvia o sistema da execução no bloco try em direção ao bloco catch. Aqui, relatamos amigavelmente na interface a ocorrência com uma formatação avermelhada em HTML, apresentamos as razões no console e prosseguimos usando o finally para desbloquear os botões previamente restritos da aplicação.

# 10. Qual personalização foi implementada e qual foi a maior dificuldade encontrada?
