require("dotenv").config();
const express = require("express");

const app = express();
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => res.render("index", { user: req.user }));
app.listen(process.env.PORT || 3000, () => console.log("App listening on port 3000!"));