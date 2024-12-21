const { Router } = require("express");
const msgController = require("../controllers/messagesController");

const msgRouter = Router();

msgRouter.use((req, res, next) => {
	if (!req.isAuthenticated())
		return res.status(401).render("notAuth");
	next();
});

msgRouter.get("/", msgController.getDashBoard);
msgRouter.post("/new-message", msgController.postMessage);
msgRouter.get("/upgrade", msgController.getUpgradeForm);
msgRouter.post("/upgrade", msgController.postUpgradeForm);
msgRouter.delete("/delete", msgController.deleteMsg);

module.exports = msgRouter;