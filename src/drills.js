require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

function searchItem(searchTerm) {
  knexInstance
    .select('*')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .first()
    .then(res => {
      console.log(res);
      console.log('SEARCH TERM:', {searchTerm});
    });
}

searchItem('kale');