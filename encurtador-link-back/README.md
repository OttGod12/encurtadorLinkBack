# Encurtador de Links

Este projeto é um *encurtador de links* desenvolvido em *Node.js, com banco de dados **PostgreSQL* hospedado no *Supabase*.  
A aplicação permite criar, listar, atualizar, excluir e redirecionar links curtos de forma simples e eficiente.

---

## Funcionalidades

- *Criar link encurtado*: o usurio envia uma URL original e recebe um link curto.  
- *Listar todos os links*: mostra todos os links cadastrados, incluindo a URL curta e o número de cliques.  
- *Atualizar link*: permite editar a legenda e/ou a URL original.  
- *Excluir link*: remove permanentemente um link do banco de dados.  
- *Redirecionar*: ao acessar o link curto, o usuário é redirecionado para a URL original, e o contador de cliques é incrementado automaticamente.

---

## Tecnologias Utilizadas

- *Node.js* + *Fastify*
- *Drizzle ORM*
- *PostgreSQL (Supabase)*
- *dotenv*
- *Render* (hospedagem do back-end)

---

## Estrutura de Pastas


src/
 ├── controllers/      → Lida com as requisições HTTP
 ├── services/         → Regras de negócio e comunicação com o banco
 ├── db/               → Conexão e configuração do Drizzle
 ├── utils/            → Funções auxiliares (validações e geração de código)
 ├── routes.js         → Define as rotas da API
server.js              → Ponto de entrada do servidor


---

## Como Executar Localmente

### Instalar dependências

bash
npm install


### Configurar variáveis de ambiente

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

env
DATABASE_URL=postgresql://postgres.lvpkoqdvsqiezlbyniov:encurtadorSenha@aws-1-sa-east-1.pooler.supabase.com:5432/postgres

DB_POOL_MAX=6

DB_CONN_TIMEOUT_MS=5000

PORT=3333

BASE_URL=https://encurtadorlinkback-pvvz.onrender.com/

### Executar o servidor

npm run dev


O servidor iniciará em:  
[http://localhost:3333]

---

## Rotas da API

| *POST* - /links | Cria um novo link curto |

| *GET* - /links | Lista todos os links |

| *PUT* - /links/:id | Atualiza a legenda ou URL original |

| *DELETE* - /links/:id | Remove um link |

| *GET* - /:codigo | Redireciona para a URL original |

---

## Deploy

O back-end está hospedado no *Render*:

🔗 *Link da aplicação:* (https://encurtadorlinkback-pvvz.onrender.com/)

---

## Observações

- O código do link é gerado automaticamente e é único.  
- Cada clique em um link curto aumenta o contador de acessos no banco.  
- O projeto usa variáveis de ambiente para garantir segurança e portabilidade.

---

## Autores

Desenvolvido por *Otávio Paulino Julia Stela e Bárbara Lauber*.  
Projeto criado com fins acadêmicos e de aprendizado sobre back-end, APIs REST e integração com banco de dados para a matéria de DW.