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

//searchItem('kale');

function paginateShoppingItems(page) {
  const itemsPerPage = 6;
  const offset = itemsPerPage * (page -1);
  knexInstance
      .select('*')
      .from('shopping_list')
      .limit(itemsPerPage)
      .offset(offset)
      .then(res => {
        console.log(res);
        console.log('Page number:', {page});
      })
}

paginateShoppingItems(2);