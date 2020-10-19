'use strict';

const axios = require('axios');

main().catch(err => console.log(err) );

async function main() {

  const url = 'https://swapi.dev/api/people/1/'
  const url2 = 'http://localhost:3000/api/agentes';

  const response = await axios.get(url2);

  console.log(response.data);

}