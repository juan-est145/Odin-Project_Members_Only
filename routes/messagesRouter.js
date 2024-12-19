const { Router } = require("express");

const msgRouter = Router();

msgRouter.get("/", (req, res) => {
	res.send("Path works");
});

module.exports = msgRouter;