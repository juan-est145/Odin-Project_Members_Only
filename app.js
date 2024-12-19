require("dotenv").config();
const express = require("express");
const path = require("path");
const indexRouter = require("./routes/indexRouter");
const { sessionConf } = require("./db/pool");
const { passportConf } = require("./db/passport");


const app = express();
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(sessionConf);
app.use(passportConf);
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

//Need to add an error and a invalid path catcher

app.use("/", indexRouter);
app.listen(process.env.PORT || 3000, () => console.log("App listening on port 3000!"));