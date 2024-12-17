const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/", indexRouter.render("index"));