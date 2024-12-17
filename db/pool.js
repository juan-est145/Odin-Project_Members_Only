const { Pool } = require("pg");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

const pool = new Pool({
	database: process.env.DATABSE,
	port: process.env.DBPORT,
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD
});

const sessionConf = {
	store: new pgSession({
		pool: pool,
		createTableIfMissing: true,
		tableName: "membersSession",
	}),
	resave: false,
	saveUninitialized: false,
	secret: process.env.SECRET,
};

module.exports = sessionConf;