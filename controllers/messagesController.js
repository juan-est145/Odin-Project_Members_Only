const { getAllMsgs } = require("../db/queries");

async function getDashBoard(req, res, next) {
	if (!req.isAuthenticated())
		return res.send("Una mierda para ti");
	try {
		const msgs = await getAllMsgs();
		let string = "";
		msgs.forEach((element) => {
			string += element.text
		});
		res.send(string);
	} catch (error) {
		console.error(error);
		next(error);
	}
}

module.exports = {
	getDashBoard,
}