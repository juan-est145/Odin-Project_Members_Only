const { Router } = require("express");
const msgController = require("../controllers/messagesController");

const msgRouter = Router();

//Later add a proper response
msgRouter.use((req, res, next) => {
	if (!req.isAuthenticated())
		return res.send("Va a ser que no");
	next();
});

msgRouter.get("/", msgController.getDashBoard);
msgRouter.post("/new-message", msgController.postMessage);
msgRouter.get("/upgrade", msgController.getUpgradeForm);
msgRouter.post("/upgrade", msgController.postUpgradeForm);

module.exports = msgRouter;