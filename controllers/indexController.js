const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { signUser } = require("../db/queries");

function getSignIn(req, res) {
	res.render("./partials/signInForm");
}

const postSignIn = [
	[
		body("username").trim()
			.notEmpty().withMessage("Invalid username"),
		body("password").trim()
			.isLength({ min: 8}).withMessage("Password must be at least of length eight")
	],
	async function signIn(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				console.log("Invalid input");
				//This is temporal for now
				return ;
			}
			const hashPromise = await bcrypt.hash(req.body.password, 10);
			await signUser(req.body.username, hashPromise);
			res.redirect("/");
		} catch (error) {
			console.error(error)
			//This is temporal too for now
		}
	}
]

module.exports = {
	getSignIn,
	postSignIn,
};