var faker = require('faker');
var db = require('./database.json');
var database = {
  ...db
};
var item = database.products.pop();
var id = item.id;

const UNSPLASH_IMG = "https://source.unsplash.com/1600x900/?product";

faker.locale = "ru";
//faker.setLocale("ru"); //default en

for (var i = 1; i <= 20; i++) {
  id += 1;
  database.products.push({
    id: id,
    name: faker.commerce.productName(),
    description: faker.lorem.sentences(),
    price: faker.commerce.price(),
    imageUrl: UNSPLASH_IMG,
    quantity: faker.random.number()
  });
}

console.log(JSON.stringify(database));