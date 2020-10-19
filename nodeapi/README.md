<h1 align="center">Welcome to nodeapi 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/nodeapi" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/nodeapi.svg">
  </a>
</p>

## Install

```sh
npm install
```

## Configure environment variables

Copy .env.example to .env and review the settings.

```sh
cp .env.example .env
```

## Load initial data

You can load the database with initial data with:

```sh
npm run init-db
```

**Warning! this script delete database contents before the load.**

Use in production only in the first deployment.

## Usage

```sh
npm start
```

## Cluster

You can start the service in cluster mode:

```sh
npm run cluster
```

## Development start

```sh
npm run dev
```

You can create a tunnel with ngrok (HTTPS)

```sh
ngrok http -region=eu 3000
```

## API Methods

### List of agents

GET /api/agentes

[
  {
    "_id": "5f4eb975aa3627d2ed928f72",
    "name": "Smith",
    "age": 48
  }
]

Example filters:

* http://localhost:3000/api/agentes?name=Smith
* http://localhost:3000/api/agentes?age=36
* http://localhost:3000/api/agentes?limit=2
* http://localhost:3000/api/agentes?skip=20&limit=10
* http://localhost:3000/api/agentes?sort=age
* http://localhost:3000/api/agentes?sort=age name
* http://localhost:3000/api/agentes?fields=age%20-_id (solo el campo age y excluyendo el _id)

### Retrieves one agent

GET /api/agentes/_id

{
  "result": {
    "_id": "5f5008f851bfe2b1cfc6de66",
    "name": "Brown",
    "age": 19,
    "__v": 0
  }
}

### Create agent

POST /api/agentes body: { name: 'aasd', age: 33 }

{
  "result": {
    "_id": "5f5011f0350ff2b5e1a722c9",
    "name": "Jones",
    "age": 52,
    "__v": 0
  }
}

### Update agent

PUT /api/agentes/<_id> body: { name: 'aasd', age: 33 }

{
  "result": {
    "_id": "5f5011f0350ff2b5e1a722c9",
    "name": "Jones",
    "age": 43,
    "__v": 0
  }
}

### Delete agent

DELETE /api/agentes/<_id>

Returns: HTTPCode 200

## How to start a local mongodb instance for development

```sh
./bin/mongod --dbpath ./data/db --directoryperdb
```

## Author

👤 **Javier**

* Website: javiermiguel.com
* Github: [@jamg44](https://github.com/jamg44)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_