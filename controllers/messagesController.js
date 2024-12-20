const query = require("../db/queries");
const { body, validationResult } = require("express-validator");

async function getDashBoard(req, res, next) {
	try {
		const msgs = await query.getAllMsgs();
		res.render("messages", { messages: msgs });
	} catch (error) {
		console.error(error);
		next(error);
	}
}

function getUpgradeForm(req, res) {
	if (req.user.role === "admin")
		return res.redirect("/messages");
	return res.render("upgrade");
}

const postMessage = [
	[
		body("title").trim()
			.isLength({ min: 1, max: 255 }).withMessage("Title must have between 1 and 255 characters"),
		body("content").trim()
			.isLength({ min: 1, max: 1600 }).withMessage("Message must have between 1 and 1600 characters"),
	],
	async function postMessage(req, res, next) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			req.flash("valErrors", errors.array());
			return res.status(400).redirect("/messages");
		}
		try {
			const date = new Date().toISOString();
			await query.insertMsg(req.body.title, req.body.content, date, req.user.id);
			return res.redirect("/messages");
		} catch (error) {
			console.error(error);
			next(error);
		}
	},
];

const postUpgradeForm = [
	[
		body("passcode").trim()
			.isLength({ min: 1, max: 255 })
			.custom((value) => {
				if (value === process.env.MEMBER_PASS || value === process.env.ADMIN_PASS)
					return (true);
				throw new Error("Incorrect passcode");
			}),
	],
	async function postUpgradeForm(req, res, next) {
		if (req.user.role === "admin")
			return res.redirect("/messages");
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				req.flash("valErrors", errors.array());
				return res.redirect("/messages/upgrade");
			}
			let newRole = req.body.passcode === process.env.ADMIN_PASS ? "admin" : "member";
			await query.upgradeMember(req.user, newRole);
			return res.redirect("/messages");
		} catch (error) {
			console.error(error);
			next(error);
		}
	}
];

const deleteMsg = [
	[
		body("id").trim()
			.isNumeric().withMessage("Invalid id"),
	],
	async function deleteMsg(req, res, next) {
		try {
			const user = await query.getUserById(req.user.id);
			if (user[0].role !== "admin")
				return res.status(401).redirect('/messages');
			const errors = validationResult(req);
			if (!errors.isEmpty())
				return res.status(400).json({ message: "Error, invalid message id"});
			await query.deleteMsg(req.body.id);
			return res.json({ message: "Message deleted successfully" });
		} catch (error) {
			console.error(error);
			next(error);
		}
	}
];

module.exports = {
	getDashBoard,
	getUpgradeForm,
	postMessage,
	postUpgradeForm,
	deleteMsg,
}