const { Router } = require("express");
const indexControllers = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.use((req, res, next) => {
	res.locals.valErrors = req.flash("valErrors");
	next();
});

indexRouter.get("/", indexControllers.getIndex);
indexRouter.get("/sign-in", indexControllers.getSignIn);
indexRouter.get("/log-in", indexControllers.getLogIn);
indexRouter.get("/log-out", indexControllers.getLogOut);
indexRouter.post("/sign-in", indexControllers.postSignIn);
indexRouter.post("/log-in", indexControllers.postLogIn);

module.exports = indexRouter;