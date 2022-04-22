# Car Shop API!

Neste projeto foi feita uma API que para armazenar informações sobre os carros e motos presentes na loja de automóveis, nela você pode cria novos veículos, buscar veículos pelo id, buscar todos os veículos, atualizar veículos e apagar veículos.

Apresenta testes de integração e unitários desenvolvidos com Mocha, Chai e Sinon.

Neste projeto foi utilizado o [Express](https://expressjs.com/) como framework para o back-end e o [Mongoose](https://mongoosejs.com) como ODM para o banco de dados. Ademais, foi utilizado Zod para validação de dados e TSLint para o linting de código.

# Como rodar a aplicação?

Basta na pasta geral do projeto dar um `npm install` e em seguida um `npm run dev` para rodar a aplicação na porta 3000.

# Endpoints

## GET - /cars
Retorna um array com os carros e seus ID's com status 200, exemplo:
```json
[
  {
    "_id": "4edd40c86762e0fb12000003",
    "model": "Ferrari Maranello",
    "year": 1967,
    "color": "red",
    "buyValue": 3500000,
    "seatsQty": 2,
    "doorsQty": 2
  },
  {
    "_id": "4edd40c86762e0fb12000004",
    "model": "Ferrari Testarossa",
    "year": 1984,
    "color": "red",
    "buyValue": 4000000,
    "seatsQty": 2,
    "doorsQty": 2
  }
  ...
]
```

## GET - /cars/:id
Retorna o carro correspondente ao ID determinado com status 200, exemplo:

```json
{
  {
    "_id": "4edd40c86762e0fb12000003",
    "model": "Ferrari Maranello",
    "year": 1967,
    "color": "red",
    "buyValue": 3500000,
    "seatsQty": 2,
    "doorsQty": 2
  }
}
```

## POST - /cars
Adiciona um carro ao banco de dados com status 201, exemplo:

Body :
 ```json
  {
    "model": "Ferrari Maranello",
    "year": 1967,
    "color": "red",
    "buyValue": 3500000,
    "seatsQty": 2,
    "doorsQty": 2
  }
```

Resposta :
  ```json
  {
    "_id": "4edd40c86762e0fb12000003",
    "model": "Ferrari Maranello",
    "year": 1967,
    "color": "red",
    "buyValue": 3500000,
    "seatsQty": 2,
    "doorsQty": 2
  }
  ```

## PUT - /cars/:id
Atualiza o carro pelo id com status 200, exemplo:

Body :
```json
{
  "model": "Uno Amarelo",
  "year": 1987,
  "color": "red",
  "buyValue": 3500,
  "seatsQty": 5,
  "doorsQty": 4
}
```
Response:
```json
{
  "_id": "4edd40c86762e0fb12000003",
  "model": "Uno Amarelo",
  "year": 1987,
  "color": "red",
  "buyValue": 3500,
  "seatsQty": 5,
  "doorsQty": 4
}
```

## DELETE - /cars/:id
Apaga o carro pelo id com status 204.

## GET - /motorcycles
Retorna um array com as motos e seus ID's com status 200, exemplo:
```json
[
  {
    "_id": "4edd40c86762e0fb12000003",
    "model": "Honda CG Titan 125",
    "year": 2003,
    "color": "red",
    "buyValue": 3500,
    "category": "Street",
    "engineCapacity": 125
  },
  {
    "_id": "4edd40c86762e0fb12000003",
    "model": "Kawazaki ZX-6",
    "year": 2022,
    "color": "red",
    "buyValue": 36000,
    "category": "Street",
    "engineCapacity": 2000,
  },
  ...
]
```

## GET - /motorcycles/:id
Retorna a moto correspondente ao ID determinado com status 200, exemplo:

```json
{
  {
    "_id": "4edd40c86762e0fb12000003",
    "model": "Honda CG Titan 125",
    "year": 2003,
    "color": "red",
    "buyValue": 3500,
    "category": "Street",
    "engineCapacity": 125
  }
}
```

## POST - /motorcycles
Adiciona uma moto ao banco de dados com status 201, exemplo:

Body :
 ```json
  {
    "model": "Honda CG Titan 125",
    "year": 2003,
    "color": "red",
    "buyValue": 3500,
    "category": "Street",
    "engineCapacity": 125
  },
```

Resposta :
  ```json
  {
    "_id": "4edd40c86762e0fb12000003",
    "model": "Honda CG Titan 125",
    "year": 2003,
    "color": "red",
    "buyValue": 3500,
    "category": "Street",
    "engineCapacity": 125
  }
  ```

## PUT - /motorcycles/:id
Atualiza a moto pelo id com status 200, exemplo:

Body :
```json
  {
    "model": "Honda CG Titan 250",
    "year": 2010,
    "color": "blue",
    "buyValue": 5000,
    "category": "Street",
    "engineCapacity": 250
  }
```
Response:
```json
{
  "_id": "4edd40c86762e0fb12000003",
  "model": "Honda CG Titan 250",
  "year": 2010,
  "color": "blue",
  "buyValue": 5000,
  "category": "Street",
  "engineCapacity": 250
}
```

## DELETE - /motorcycles/:id
Apaga a moto pelo id com status 204.
***
###### README.md feito por @pabloassuncao