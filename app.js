require("dotenv").config();
const express = require("express");
const indexRouter = require("./routes/indexRouter");
const session = require("express-session");
const { sessionConf } = require("./db/pool");
const { passportConf } = require("./db/passport");


const app = express();
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(session(sessionConf));
app.use(passportConf);
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

app.use("/", indexRouter);
app.listen(process.env.PORT || 3000, () => console.log("App listening on port 3000!"));