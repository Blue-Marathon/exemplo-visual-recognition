// chamando e executando o módulo dotenv para ele pegar o conteúdo do arquivo `.emv` e criar as variáveis de ambiente necessárias para a aplicação.
// Esse módulo é apenas necessário para o desenvolvimento do app, mas não há problemas em deixar a chamada aqui quando o mesmo for para 'produção'.
require('dotenv').config();

const express = require('express');
const path = require('path');
// chamando o módulo local 'image-recognition'. Módulos/arquivos locais precisam ser referenciados de modo relativo (./image-recognition).
const imageRecognition = require('./image-recognition');
// criando um aplicativo express
const app = express();
// armazenando o valor da porta, onde o app ficará escutando as requisições.
const port = process.env.PORT || 3000;

// configuração do endpoint '/api', passando uma função para ser executada quando houver uma requisição para /api
app.use('/api', function (request, response) {
  const imageUrl = request.query.url;

  if (!imageUrl) {
    response.status(400).json({ error: 'Erro: url de uma imagem não foi enviado.' });
  }

  // chamada o módulo nativo 'image-recognition' que faz a chamada para a API do Visual Recognition
  imageRecognition(imageUrl)
  .then(({ result }) => response.status(200).json(result))
  .catch(error => response.status(502).json(error));
});

// servindo o frontend
app.use('/', express.static(path.resolve(__dirname, '..', 'public')));

// vinculando o app a porta aonde ele será executado
app.listen(port, function () {
  console.log(`Servidor rodando na porta ${port}`);
});
