require("dotenv").config();
const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const pool = new Pool({
	host: process.env.HOST,
	user: process.env.USER,
	database: process.env.DATABASE,
	password: process.env.PASSWORD,
	port: process.env.DBPORT,
});

const app = express();
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
			const user = rows[0];

			if (!user)
				return done(null, false, { message: "Incorrect username" });
			if (user.password !== password)
				return done(null, false, { message: "Incorrect password" });
			return done(null, user);
		} catch (error) {
			return done(error);
		}
	})
);
passport.serializeUser((user, done) => {
	done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
	try {
		const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
		const user = rows[0];
		done(null, user);
	} catch (error) {
		done(error);
	}
});

app.get("/", (req, res) => res.render("index", { user: req.user }));
app.get("/sign-up", (req, res) => res.render("signUpForm"));
app.get("/log-in", (req, res) => res.render("logInForm"));
app.get("/log-out", (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
});

app.post("/sign-up", async (req, res, next) => {
	try {
		await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
			req.body.username,
			req.body.password,
		]);
		res.redirect("/");
	} catch (err) {
		return next(err);
	}
});
app.post("/log-in", passport.authenticate("local", { successRedirect: "/", failureRedirect: "/" }));

app.listen(3000, () => console.log("App listening on port 3000!"));