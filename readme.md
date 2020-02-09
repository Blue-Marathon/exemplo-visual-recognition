# App exemplo: Qual a comida, Watson?

App exemplificando a utilização do Visual Recognition para o projeto bluehack

## Estrutura

As principais partes do app são os seguintes diretórios:

- public -> nesse diretório se encontra os arquivos do frontend (index.html, style.css, app.js). Essa pasta é servida pelo backend.
- server -> nesse diretório fica o iniciação e configuração do servidor (`server.js`) e um módulo com a lógica para a chamada do Visual Recognition (`image-recognition.js`).

Os outros arquivos compõem o suporte ao app:

- .env.template -> um exemplo para compor o arquivo `.env`, necessário para a execução do backend.
- package.json -> arquivo de metadados do app, é possível criar scripts para automatizar algumas tarefas.

## Como rodar localmente

### Pré-requisitos

- Instale o nodejs na sua máquina
- Tenha um editor de código instalado (como o vscode ou o sublime)
- Crie uma instância do serviço [Visual Recognition](https://cloud.ibm.com/catalog/services/visual-recognition) na [cloud.ibm.com](cloud.ibm.com)

### Rodando o app na sua máquina

1) Crie e preencha o arquivo `.env` com seu token de identificação e url do Visual Recognition, conforme informado no arquivo `.env.template`
2) Rode o comando `npm install`, para instalar as dependências do projeto
3) Rode o comando `npm run dev`, para o app rodar na sua máquina. Por padrão, ele rodará na porta 3000 da sua máquina, se outra não for especificada no arquivo `.env`
