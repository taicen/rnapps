"use strict";
const chalk = require('chalk');
const load = require('./node_modules/json-server/lib/cli/utils/load');

function prettyPrint(argv, object) {
  const root = `http://${argv.host}:${argv.port}`;
  console.log();
  console.log(chalk.bold('  Resources'));

  for (let prop in object) {
    console.log(`  ${root}/${prop}`);
  }

  console.log();
  console.log(chalk.bold('  Home'));
  console.log(`  ${root}`);
  console.log();
}

module.exports = function (argv) {  
  const source = argv.db;

  function start(cb) {
    console.log();
    console.log(chalk.gray('  Loading', source));
    return load(source).then(db => {   
      prettyPrint(argv, db.getState())
    })
  }

  start();
}