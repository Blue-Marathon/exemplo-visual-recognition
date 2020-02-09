/**
 * Armazenando as referências de cada elemento HTML da página que vamos manipular
 */
const input = document.querySelector('#url-input');
const preview = document.querySelector('#preview');
const resultContainer = document.querySelector('#resultados-lista');
const btnAnalisar = document.querySelector('#btn-analise');

/**
 * Adicionando uma escuta ao botão 'btn-analise'.
 * Quando o mesmo for clicado, a função passada como segundo parâmetro será executada
 */
btnAnalisar.addEventListener('click', function (event) {
  const urlDaImagem = input.value;

  if (!urlDaImagem) {
    return alert('preencha o campo url');
  }

  // "limpando" a container de resultados para começarmos a montar o novo resultado
  resultContainer.innerHTML = "";

  // chama a função para carregar a imagem na tela
  showPreview(urlDaImagem);

  // realizar a chamada ao backend, enviando a url da imagem para processamento
  fetch(`/api?url=${urlDaImagem}`)
  .then(response => response.json())
  .then(loadResult)
  .catch(alert);
});

/**
 * Carrega a 'prévia' da imagem inserida pelo usuário.
 * @param {string} url url da imagem
 */
function showPreview (url) {
  preview.style.display = 'block';
  preview.src = url;
}

/**
 * Recebe a resposta do backend, transforma e exibe as classificações
 * @param {resposta} resposta retornada do backend
 */
function loadResult (resposta) {
  const imagens = resposta.images;

  if (imagens && imagens.length) {
    // armazenando a lista de classificações
    const classes = imagens[0].classifiers[0].classes;
    // organizando a lista de classificações baseada no score (pontuação) de cada classificação
    classes.sort((a, b) => b.score - a.score);
    // transformando as classificações em tags LI com informações as mesmas
    const listaDeClassificacoes = classes.map(createClassificationItem);
    // inserindo a lista na página
    resultContainer.innerHTML = listaDeClassificacoes.join('');
  }
}

/**
 * Formata 1 classificação, vinda do Visual Recognition, e monta uma string para ser inserida na página
 * @param {object} classificacao object 'class' do array de classes, retornado pela API do Visual Recognition
 * @return {string} string no formato '<li class=""> texto </li>' para ser inserido na página
 */
function createClassificationItem (classificacao) {
  const score = (classificacao.score * 100).toFixed(1);
  let text = `${classificacao.class} (${score}%)`;
  let typeHierarchy = '';

  if (classificacao.type_hierarchy) {
    typeHierarchy = ` - ${classificacao.type_hierarchy}`;
  }

  return `<li ${createClassString(classificacao.score)}>${text}${typeHierarchy}</li>`;
}

/**
 * Cria uma string no formato: 'class="nome_da_classe"'. Onde 'nome_da_classe' é green, yellow ou red, baseado no grau de confiabilidade
 * @param {number} score grau de confiabilidade de uma classe (nesse caso, de uma categoria que o Visual Recognition nos forneceu)
 * @returns {string}
 */
function createClassString (score) {
  let className = "";

  if (score >= 0.8) {
    className = 'green';
  } else if (score >= 0.5 && score < 0.8) {
    className = 'yellow';
  } else {
    className = 'red';
  }

  return `class="${className}"`;
}
