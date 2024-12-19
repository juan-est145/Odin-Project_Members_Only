require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const path = require("path");
const indexRouter = require("./routes/indexRouter");
const msgRouter = require("./routes/messagesRouter");
const { sessionConf } = require("./db/pool");
const { passportConf } = require("./db/passport");


const app = express();
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(sessionConf);
app.use(passportConf);
app.use(flash());
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

app.use("/", indexRouter);
app.use("/messages", msgRouter);

app.use((req, res, next) => {
	res.status(404).send("404: Page not found");
});
app.use((error,req, res, next) => {
	console.error(error.stack);
	res.status(500).send("Something went wrong, please, try at another time");
});
app.listen(process.env.PORT || 3000, () => console.log("App listening on port 3000!"));