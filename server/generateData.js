var faker = require('faker');
var db = require('./database.json');
var database = {
  ...db
};
var item = database.products.pop();
var id = item.id;

faker.locale = "ru";
//faker.setLocale("ru"); //default en

for (var i = 1; i <= 20; i++) {
  id += 1;
  database.products.push({
    id: id,
    name: faker.commerce.productName(),
    description: faker.lorem.sentences(),
    price: faker.commerce.price(),
    imageUrl: "https://source.unsplash.com/1600x900/?product",
    quantity: faker.random.number()
  });
}

console.log(JSON.stringify(database));