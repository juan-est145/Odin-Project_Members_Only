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
		return res.redirect("/messages");
	res.render("./logIn");
}

function getLogOut(req, res) {
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
			.isLength({ min: 8 }).withMessage("Password must be at least a length of 8"),
		body("passwordRepeat").trim()
			.custom((value, { req }) => {
				if (value !== req.body.password)
					throw new Error("Passwords do not match");
				return true;
			})
	],
	async function signIn(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				req.flash("valErrors", errors.array());
				return res.status(400).redirect("sign-in");
			}
			const hashPromise = await bcrypt.hash(req.body.password, 10);
			await signUser(req.body.username, hashPromise);
			res.redirect("/");
		} catch (error) {
			console.error(error)
			if (error.constraint && error.constraint === 'users_unique') {
				req.flash("valErrors", [{msg: "Invalid username"}]);
				res.status(400).redirect("sign-in");
			}
		}
	}
];

const postLogIn = [
	[
		body("username").trim()
			.notEmpty().withMessage("Invalid username or password"),
		body("password").trim()
			.isLength({ min: 8 }).withMessage("Invalid username or password"),
	],
	function logIn(req, res, next) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const errorMsg = [errors.array()[0]];
			req.flash("valErrors", errorMsg);
			return res.status(400).redirect("/log-in");
		}
		passportAuth(req, res, next);
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