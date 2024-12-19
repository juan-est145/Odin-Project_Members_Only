const { Router } = require("express");
const msgController = require("../controllers/messagesController");

const msgRouter = Router();

msgRouter.get("/", msgController.getDashBoard);

module.exports = msgRouter;