const { getAllMsgs } = require("../db/queries");

async function getDashBoard(req, res, next) {
	try {
		const msgs = await getAllMsgs();
		res.render("messages", { messages: msgs});
	} catch (error) {
		console.error(error);
		next(error);
	}
}

module.exports = {
	getDashBoard,
}