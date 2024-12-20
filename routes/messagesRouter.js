const { Router } = require("express");
const msgController = require("../controllers/messagesController");

const msgRouter = Router();

msgRouter.use((req, res, next) => {
	if (!req.isAuthenticated())
		return res.send("Va a ser que no");
	next();
});

msgRouter.get("/", msgController.getDashBoard);
msgRouter.post("/new-message", msgController.postMessage);

module.exports = msgRouter;