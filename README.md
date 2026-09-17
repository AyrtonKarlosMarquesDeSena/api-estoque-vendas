# API de Estoque e Vendas

API RESTful desenvolvida com **Node.js**, **Express** e **MongoDB** (via Mongoose) para controle de estoque de produtos e registro de vendas, com abatimento automático de estoque.

## 🚀 Tecnologias

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Dotenv
- Nodemon (desenvolvimento)

## 📁 Estrutura do projeto

```
api-estoque-vendas/
├── config/
│   └── db.js
├── controllers/
│   ├── produtoController.js
│   └── vendaController.js
├── middlewares/
│   └── errorHandler.js
├── models/
│   ├── Produto.js
│   └── Venda.js
├── routes/
│   ├── produtoRoutes.js
│   └── vendaRoutes.js
├── index.js
└── .env
```

## ⚙️ Instalação e configuração

1. Clone o repositório:
```bash
git clone https://github.com/AyrtonKarlosMarquesDeSena/api-estoque-vendas.git

cd api-estoque-vendas
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env` na raiz com sua string de conexão do MongoDB:
```
MONGO_URI=sua_connection_string_do_mongodb_atlas
```

4. Rode o projeto:
```bash
npm run dev
```

O servidor sobe por padrão em `http://localhost:3000`.

## 📌 Endpoints

### Produtos

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/produtos` | Cria um novo produto |
| GET | `/produtos` | Lista todos os produtos |
| GET | `/produtos/:id` | Busca um produto por ID |
| PUT | `/produtos/:id` | Atualiza um produto |
| DELETE | `/produtos/:id` | Remove um produto |

**Criar produto** — `POST /produtos`
```json
{
  "nome": "Arroz 5kg",
  "quantidade": 50,
  "preco": 25.90
}
```

**Resposta (201)**
```json
{
  "_id": "6aa9cf5722f3fbacff517beb",
  "nome": "Arroz 5kg",
  "quantidade": 50,
  "preco": 25.9,
  "createdAt": "2026-09-15T23:06:00.027Z",
  "updatedAt": "2026-09-15T23:06:00.027Z"
}
```

**Atualizar produto** — `PUT /produtos/:id`
```json
{
  "preco": 27.50
}
```

### Vendas

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/vendas` | Registra uma venda e abate o estoque |
| GET | `/vendas` | Lista todas as vendas (com dados do produto) |
| DELETE | `/vendas/:id` | Cancela uma venda e devolve o estoque |

**Criar venda** — `POST /vendas`
```json
{
  "produtoId": "6aa9cf5722f3fbacff517beb",
  "quantidade": 5
}
```

**Resposta (201)**
```json
{
  "produto": "6aa9cf5722f3fbacff517beb",
  "quantidade": 5,
  "valorTotal": 129.5,
  "_id": "6aa9d090d8c28c396a4140b5",
  "createdAt": "2026-09-15T23:11:12.266Z",
  "updatedAt": "2026-09-15T23:11:12.266Z"
}
```

**Listar vendas** — `GET /vendas`
```json
[
  {
    "_id": "6aa9d090d8c28c396a4140b5",
    "produto": {
      "_id": "6aa9cf5722f3fbacff517beb",
      "nome": "Arroz 5kg",
      "quantidade": 45,
      "preco": 25.9
    },
    "quantidade": 5,
    "valorTotal": 129.5
  }
]
```

## 🌐 API em produção

🔗 https://api-estoque-vendas.onrender.com

> ⚠️ Hospedado no plano gratuito do Render: se ficar muito tempo sem uso, a primeira requisição pode demorar até ~50 segundos pra responder (o serviço "acorda").

## ⚠️ Tratamento de erros

Todos os erros passam por um middleware central e retornam no formato:
```json
{
  "erro": "Mensagem descritiva do erro"
}
```

## 👤 Autor

Ayrton