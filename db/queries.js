const { pool } = require("./pool");


async function getUser(user) {
	if (!user)
		return (null);
	try {
		const { rows } = await pool.query("SELECT * FROM users where username = $1;", [user]);
		return (rows);
	} catch (error) {
		throw error;
	}
}

async function getUserById(id) {
	try {
		const { rows } = await pool.query("SELECT * FROM users where id = $1;", [id]);
		return (rows);
	} catch (error) {
		throw error;
	}
}

async function signUser(user, password) {
	try {
		await pool.query("INSERT INTO users(username, password) values($1, $2);", [user, password]);
	} catch (error) {
		throw error;
	}
}

async function getAllMsgs() {
	try {
		const { rows } = await pool.query("SELECT * FROM message");
		return (rows);
	} catch (error) {
		throw error;
	}
}

module.exports = {
	getUser,
	getUserById,
	signUser,
	getAllMsgs,
};