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

module.exports = {
	getUser,
};