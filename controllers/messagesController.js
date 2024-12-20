const { getAllMsgs } = require("../db/queries");
const { body, validationResult } = require("express-validator");

async function getDashBoard(req, res, next) {
	try {
		const msgs = await getAllMsgs();
		res.render("messages", { messages: msgs});
	} catch (error) {
		console.error(error);
		next(error);
	}
}

function postMessage(req, res, next) {
	console.log("Form received");
	return res.redirect("/messages");
}

module.exports = {
	getDashBoard,
	postMessage,
}