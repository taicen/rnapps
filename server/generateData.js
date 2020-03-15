var faker = require('faker');
var Chance = require('chance');
var chance = new Chance();
var db = require('./database.json');

var database = {
  ...db,
};

const UNSPLASH_IMG = 'https://source.unsplash.com/1600x900/?product';

faker.locale = 'ru'; //default en

for (var i = 1; i <= 20; i++) {
  database.products.push({
    id: faker.random.number(),
    name: faker.commerce.productName(),
    description: faker.lorem.sentences(),
    price: faker.commerce.price(),
    imageUrl: UNSPLASH_IMG,
    quantity: faker.random.number(),
  });

  database.users.push({
    id: faker.random.number(),
    avatar: faker.internet.avatar(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phone: chance.phone({ formatted: false }),
    username: faker.internet.userName(),
    birthday: chance.birthday(),
    address: chance.address(),
    state: chance.state(),
    register: chance.date(),
    profession: chance.profession(),
    company: chance.company(),
    about: chance.paragraph(),
    gender: chance.gender(),
  });

  //Karaganda
  //latitude = [49.66000, 49.92600]
  //longitude = [72.96000, 73.37000]

  var latitude = chance.latitude({ min: 49.6, max: 49.9 });
  var longitude = chance.longitude({ min: 72.3, max: 73.9 });

  database.locations.push({
    id: faker.random.number(),
    name: faker.random.words(),
    latitude,
    longitude,
    coordinates: [latitude, longitude],
    description: chance.paragraph(),
  });
}

console.log(JSON.stringify(database));
