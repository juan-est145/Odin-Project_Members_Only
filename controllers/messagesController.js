const { getAllMsgs } = require("../db/queries");

//Test error later
async function getDashBoard(req, res, next) {
	try {
		const msgs = await getAllMsgs();
		let string = "";
		msgs.forEach((element) => {
			string += element.text
		});
		res.send(string);
	} catch (error) {
		next(error);
	}
}

module.exports = {
	getDashBoard,
}