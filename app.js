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

app.get("/", (req, res) => res.render("index"));
app.get("/sign-up", (req, res) => res.render("signUpForm"));

app.post("/sign-up", async (req, res, next) => {
	try {
	  await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
		req.body.username,
		req.body.password,
	  ]);
	  res.redirect("/");
	} catch(err) {
	  return next(err);
	}
  });

app.listen(3000, () => console.log("App listening on port 3000!"));