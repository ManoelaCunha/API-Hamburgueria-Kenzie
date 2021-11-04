# api-hamburgueria-kenzie

Esse é o repositório com a base de JSON-Server + JSON-Server-Auth já configurado, usado no desenvolvimento da API da Entrega - Hamburgueria 2.0 - com TypeScript e JSON Server.

## Endpoints

A API tem um total de 4 endpoints, o usuário que pode se cadastrar, fazer login adicionar e excluir produtos no carrinho.

O url base da API é https://api-hamburgueria-kenzie.herokuapp.com

### Cadastro

**POST /users - FORMATO DA REQUISIÇÃO**

```javascript
{
"name": "Kenzinha",
"email": "kenzinha@mail.com",
"password": "123456"
}
```

**POST /users - FORMATO DA RESPOSTA - STATUS 201**

```javascript
"user": {
"email": "kenzinha@mail.com",
"name": "Kenzinha",
"id": 4
}
```

### Login

**POST /login - FORMATO DA REQUISIÇÃO**

```javascript
{
"email": "kenzinha@mail.com",
"password": "123456"
}
```

**POST /login - FORMATO DA RESPOSTA - STATUS 200**

```javascript
"user": {
"email": "kenzinha@mail.com",
"name": "Kenzinha",
"id": 4
}
```

### Products

**Listando Produtos** - _Não Precisa de Autenticação_

**GET /products - FORMATO DA RESPOSTA - STATUS 200**

```javascript
[
  {
    image: "",
    name: "Big Kenzie",
    category: "Sanduíches",
    price: 18.99,
    id: 1,
  },
  {
    image: "",
    name: "X-Burguer",
    category: "Sanduíches",
    price: 16.99,
    id: 2,
  },
  {
    image: "",
    name: "X-Chicken",
    category: "Sanduíches",
    price: 14.99,
    id: 3,
  },
  {
    image: "",
    name: "Combo Kenzie",
    category: "Sanduíches",
    price: 26.99,
    id: 4,
  },
  {
    image: "",
    name: "Fanta Guaraná",
    category: "Bebidas",
    price: 5.99,
    id: 5,
  },
  {
    image: "",
    name: "Coca Cola",
    category: "Bebidas",
    price: 7.99,
    id: 6,
  },
  {
    image: "",
    name: "McShake Ovomaltine",
    category: "Sobremesas",
    price: 10.99,
    id: 7,
  },
  {
    image: "",
    name: "Sundae Chocolate",
    category: "Sobremesas",
    price: 10.99,
    id: 8,
  },
];
```

### Cart

**Adicionando produtos no carrinho** - _Precisa de Autenticação_

**POST /cart - FORMATO DA REQUISIÇÃO**

```javascript
{
"image": "",
"name": "Big Kenzie",
"category": "Sanduíches",
"price": 18.99,
"userId": 1,
"id": 1
}
```

**POST /cart - FORMATO DA RESPOSTA - STATUS 201**

```javascript
{
"image": "",
"name": "Big Kenzie",
"category": "Sanduíches",
"price": 18.99,
"userId": 1,
"id": 1
}
```

**Listando Produtos no Carrinho** - _Precisa de Autenticação_

**GET /cart - FORMATO DA RESPOSTA - STATUS 200**

```javascript
[
  {
    image: "",
    name: "Big Kenzie",
    category: "Sanduíches",
    price: 18.99,
    id: 1,
    userId: 1,
  },
];
```
