import 'ts-node/register'
const environment = process.env.NODE_ENV || "development"
const knex = require('knex');
const knexConfig = require('../../knex.js');
const environmentConfig=knexConfig[environment]
const connection = knex(environmentConfig)

module.exports = connection;