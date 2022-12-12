// get the client
const mysql = require('mysql2/promise');

let connection;

// create the connection to database
async function initDB () {
	connection = await mysql.createConnection({
		host: 'localhost',
		port: 3306,
		user: 'root',
		password: '07040223',
		database: 'bookstore'
	});
}

function getConnection () {
	return connection;
}

module.exports = {
	initDB,
	getConnection
};