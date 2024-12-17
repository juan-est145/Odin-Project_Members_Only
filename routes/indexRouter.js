const { Router } = require("express");
const indexControllers = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", (req, res) => res.render("index"));
indexRouter.get("/sign-in", indexControllers.getSignIn);
indexRouter.post("/sign-in", indexControllers.postSignIn);

module.exports = indexRouter;