'use strict';

// Creating a base name for the MongoDB
const mongooseBaseName = 'courseExam'

// Create the MongoDB URI for Development and Test
const database = {
  development: `mongodb://localhost/${mongooseBaseName}`,
  test: `mongodb://safwanheroku:Ss0560054277@ds041623.mlab.com:41623/heroku_drs167t3`
}
 
// Identify if development environment is Test or Development
// select DB based on whether a test file was executed before `server.js`
const localDB = process.env.TESTENV ? database.test : database.development

// Environment variable MONGODB_URI will be available in
// Heroku production environment otherwise use Test or Development DB
const currentDB = process.env.MONGODB_URI || localDB

// Export the appropriate database based on the current environment
module.exports = currentDB;