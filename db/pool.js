const { Pool } = require("pg");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

const timeCalc = {
	msToSeconds : 1000,
	secndsToMinutes : 60,
	minToHours : 60,
	hoursToDays: 24,
};

const maxAge = Object.values(timeCalc).reduce((prev, curr) => {
	return prev * curr;
}) * 12;

const pool = new Pool({
	database: process.env.DATABASE,
	port: process.env.DBPORT,
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD
});

const sessionConf = session({
	store: new pgSession({
		pool: pool,
		createTableIfMissing: true,
		tableName: "membersSession",
	}),
	resave: false,
	saveUninitialized: false,
	secret: process.env.SECRET,
	cookie: { maxAge: maxAge },
});

module.exports = {
	sessionConf,
	pool,
};