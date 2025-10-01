LINK: https://utfpr-cm.notion.site/encurtador-url



# Objetivo

O objetivo deste trabalho é desenvolver uma aplicação web completa de um "Encurtador de Links". O foco principal será no desenvolvimento de uma API RESTful utilizando **Node.js** com o framework **Fastify** e um banco de dados **PostgreSQL**. Vocês também criarão um front-end em **React JS** ou **Next.js** para interagir com a API, permitindo cadastrar, editar e apagar os links encurtados. O projeto visa avaliar as habilidades na criação de APIs, modelagem de dados, integração entre front-end e back-end e boas práticas de desenvolvimento.

# Descrição

O "Encurtador de Links" é uma ferramenta que transforma URLs longas em links curtos e fáceis de compartilhar. A aplicação web será dividida em duas partes principais:

1. **API Back-end:** O serviço responsável por receber uma URL longa, gerar um código único, salvar a associação no banco de dados e redirecionar os usuários do link curto para a URL original.
2. **Painel de Gerenciamento (Front-end):** Uma interface simples onde o usuário pode criar novos links curtos, visualizar todos os links já criados, editar o destino de um link existente e removê-los.

A aplicação não exigirá autenticação de usuário.

# Tecnologias

- **Back-end:** Node.js, Fastify
- **Banco de Dados:** Supabase (PostgreSQL).
- **Front-end:** React JS ou Next.js
- **Estilização:** Fica a critério do aluno (CSS puro, CSS Modules, Tailwind CSS, etc.). Você também pode usar uma biblioteca de componentes para acelerar o desenvolvimento.

# Requisitos Funcionais

A aplicação é dividida em Front-end (Painel) e Back-end (API).

## API Back-end (Node.js + Fastify)

- [ ]  **RF-01 (Criação - Create):** Deve haver um endpoint `POST /links` que recebe uma **legenda** e uma **URL original** no corpo da requisição.
    - [ ]  A API deve validar se a URL recebida é um formato válido.
    - [ ]  Deve gerar um código alfanumérico único e curto (ex: `z2482j`).
    - [ ]  Deve salvar a legenda, a URL original e o código gerado no banco de dados.
    - [ ]  Deve retornar o link recém-criado como resposta.

- [ ]  **RF-02 (Leitura - Read):** Deve haver um endpoint `GET /links` que retorna uma lista de todos os links salvos, incluindo todas as suas informações (id, legenda, código, URL original, contagem de cliques, etc.).
- [ ]  **RF-03 (Edição - Update):** Deve haver um endpoint `PUT /links/:id` que permite atualizar a **legenda** e/ou a **URL original** de um link existente.
- [ ]  **RF-04 (Exclusão - Delete):** Deve haver um endpoint `DELETE /links/:id` que remove permanentemente um link do banco de dados.
- [ ]  **RF-05 (Redirecionamento e Contagem):** Deve haver um endpoint `GET /:code` que recebe o código do link encurtado na URL.
    - [ ]  Ao ser acessado, este endpoint deve primeiro **incrementar o contador de cliques** do link no banco de dados.
    - [ ]  Em seguida, deve buscar a URL original e **redirecionar o usuário** para ela, utilizando o status code `302 (Found)`.
    - [ ]  Se o código não for encontrado, deve retornar um erro `404 (Not Found)`.

# Requisitos Técnicos e de Implementação

- [ ]  **RT-01 (Estrutura da API):** O projeto back-end deve ser bem estruturado, separando as responsabilidades em camadas (ex: rotas, controladores, casos de uso/serviços e repositórios), conforme a arquitetura trabalhada em aula.
- [ ]  **RT-02 (Conexão com Banco de Dados):** Utilizar o ORM **Drizzle** com PostgreSQL para todas as interações com o banco de dados.
- [ ]  **RT-03 (Estrutura do Front-end):** O projeto front-end deve ser bem estruturado, com uma divisão clara de componentes reutilizáveis.
- [ ]  **RT-04 (Consumo de API):** O front-end deve utilizar `fetch` ou uma biblioteca como `axios` para se comunicar com a API back-end.
- [ ]  **RT-05 (Variáveis de Ambiente):** As credenciais do banco de dados e outras informações sensíveis devem ser armazenadas de forma segura em variáveis de ambiente (arquivo `.env`).



# Critérios de Avaliação

A nota final será composta pela soma dos seguintes critérios:

- **Funcionalidade (40% - 4,0 pontos):** Avalia se todos os requisitos funcionais foram implementados corretamente.
- **Qualidade do Código, Estrutura e Documentação (20% - 2,0 pontos):** Avalia a organização dos projetos, a clareza do código, o uso de boas práticas **e a qualidade do arquivo README.md, que deve ser claro e completo.**
- **Processo de Desenvolvimento e Commits (20% - 2,0 ponto):** Avalia a frequência e consistência dos commits e a qualidade das mensagens descritivas.
- **Interface e Experiência do Usuário (10% - 1,0 ponto):** Avalia a clareza e a usabilidade da interface.
- **Inovação e Funcionalidade Extra (10% - 1,0 ponto):** Avalia a implementação de uma funcionalidade relevante que não faz parte do escopo mínimo.

# Entregáveis

- **Repositório do Back-end no GitHub:** O link para um repositório público contendo todo o código-fonte da API Node.js.
- **Repositório do Front-end no GitHub:** O link para um repositório público contendo todo o código-fonte da aplicação React/Next.js.
- **Arquivo `README.md` (em ambos os repositórios):** Um `README.md` bem documentado, explicando:
    - **O link da aplicação funcionando.**
        - Back-end hospedado no [Render](https://render.com/)
        - Front-end hospedado na [Vercel](https://vercel.com/) ou [Netlify](https://www.netlify.com/)
    - O que é o projeto.
    - Como executá-lo localmente (incluindo configuração de banco de dados e variáveis de ambiente).
    - **Uma seção dedicada à "Funcionalidade Extra", descrevendo o que foi implementado e por quê.**