const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

// armazenando os valores necessários para a authenticação na API do Visual Recognition
const apiKey = process.env.RECOGNITION_API_KEY;
const apiUrl = process.env.RECOGNITION_API_URL;
const apiVersion = '2018-03-19';

if (!apiKey || !apiUrl) {
  throw new Error('API KEY ou API URL não encontrados. Acesse a sua instância do visual recognition para ter acesso a esses dados.');
}

/**
 * instânciando um objeto VisualRecognitionV3 para trabalhar com a API do Visual Recognition
 */
const recognition = new VisualRecognitionV3({
  authenticator: new IamAuthenticator({ apikey: apiKey }),
  url: apiUrl,
  version: apiVersion,
});

module.exports = function analizarImagem (imageUrl) {
  return new Promise(function (resolve, reject) {
    // parâmetros passados para a API do Visual Recognition
    const params = {
      url: imageUrl,
      headers: {
        'Accept-Language': 'pt-br'
      },
      classifierIds: 'food'
    };

    // Chamada a API do Visual Recognition
    recognition.classify(params, function (error, response) {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};
