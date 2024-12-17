const { pool } = require("./pool");


async function getUser(user) {
	if (!user)
		return (null);
	try {
		const { rows } = await pool.query("SELECT username FROM users where username == $1;", [user]);
		return (rows);
	} catch (error) {
		console.error(error);
	}
}

async function getUserById(id) {
	try {
		const { rows } = await pool.query("SELECT * FROM users where id == $1;", [id]);
		return (rows);
	} catch (error) {
		console.error(error);
	}
}

async function signUser(user, password) {
	try {
		await pool.query("INSERT INTO users(username, password) values($1, $2);", [user, password]);
	} catch (error) {
		console.error(error);
	}
}

/*INSERT INTO public.users
(id, username, "password", "role")
VALUES(0, '', '', 'user'::role);*/

module.exports = {
	getUser,
	getUserById,
	signUser,
};