'use strict';

// Creating a base name for the MongoDB
const mongooseBaseName = 'courseExam'

// Create the MongoDB URI for Development and Test
const database = {
  // mongodb://localhost/${mongooseBaseName
  development: `mongodb://localhost/${mongooseBaseName}`,
  test: `mongodb+srv://Safwan:Ss123456@project4-sblue.gcp.mongodb.net/test?retryWrites=true&w=majority`
}
 
// Identify if development environment is Test or Development
// select DB based on whether a test file was executed before `server.js`
const localDB = process.env.TESTENV ? database.test : database.development

// Environment variable MONGODB_URI will be available in
// Heroku production environment otherwise use Test or Development DB
const currentDB = process.env.MONGODB_URI || localDB

// Export the appropriate database based on the current environment
module.exports = currentDB;