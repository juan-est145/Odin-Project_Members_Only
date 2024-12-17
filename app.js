require("dotenv").config();
const express = require("express");
const indexRouter = require("./routes/indexRouter");
const { session } = require("passport");
const { sessionConf } = require("./db/pool");
const passport = require("passport");

const app = express();
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(session(sessionConf));
app.use(passport.session());


app.get("/", indexRouter);
app.listen(process.env.PORT || 3000, () => console.log("App listening on port 3000!"));