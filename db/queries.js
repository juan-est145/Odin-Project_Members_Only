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
	if (!id)
		return (null);
	try {
		const { rows } = await pool.query("SELECT * FROM users where id = $1;", [id]);
		return (rows);
	} catch (error) {
		throw error;
	}
}

async function signUser(user, password) {
	if (!user || !password)
		return (null);
	try {
		await pool.query("INSERT INTO users(username, password) values($1, $2);", [user, password]);
	} catch (error) {
		throw error;
	}
}

async function getAllMsgs() {
	try {
		const { rows } = await pool.query("SELECT message.*, users.username FROM message \
											INNER JOIN users on message.users_id=users.id;");
		return (rows);
	} catch (error) {
		throw error;
	}
}

async function insertMsg(title, text, date, users_id) {
	if (!title || !text || !date || !users_id)
		return (null);
	try {
		await pool.query("INSERT INTO message (title, text, date, users_id) \
											VALUES($1, $2, $3, $4);", [title, text, date, users_id]);
	} catch (error) {
		throw error;
	}
}

async function upgradeMember(user, newRole) {
	if (!user || !newRole)
		return (null);
	try {
		await pool.query(`UPDATE users SET "role"=$2::role WHERE id=$1;`, [user.id, newRole]);
	} catch (error) {
		throw error;
	}
}

async function deleteMsg(id) {
	if (!id)
		return (null);
	try {
		await pool.query("DELETE FROM message WHERE id=$1;", [id]);
	} catch (error) {
		throw error;
	}
}

module.exports = {
	getUser,
	getUserById,
	signUser,
	getAllMsgs,
	insertMsg,
	upgradeMember,
	deleteMsg,
};