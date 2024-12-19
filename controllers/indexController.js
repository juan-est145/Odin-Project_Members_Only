const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { signUser } = require("../db/queries");
const { passportAuth } = require("../db/passport");

function getIndex(req, res) {
	res.render("index");
}

function getSignIn(req, res) {
	res.render("./signIn");
}

function getLogIn(req, res) {
	if (req.isAuthenticated())
		return res.redirect("/");
	res.render("./logIn");
}

function getLogOut(req, res, err) {
	req.logout((err) => {
		if (err)
			return next(err);
		res.redirect("/");
	});
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
];

const postLogIn = [
	[
		body("username").trim()
			.notEmpty().withMessage("Invalid username or password"),
		body("password").trim()
			.isLength({ min: 8}).withMessage("Invalid username or password")
	],
	function logIn(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				console.log("Invalid input");
				//This is temporal for now
				return res.status(400).render("logIn");
			}
			passportAuth(req, res, next);
		} catch (error) {
			console.error(error)
			//This is temporal too for now
		}
	}
];

module.exports = {
	getIndex,
	getSignIn,
	getLogIn,
	getLogOut,
	postSignIn,
	postLogIn,
};