const express = require("express");
const checkRoute = express.Router();

const checkController = require("./../controller/check");
const auth = require("./../middlewares/Auth");


checkRoute.post("/checks/add",auth.authenticateUser,checkController.add);
checkRoute.get("/checks/",auth.authenticateUser,checkController.getAll);
checkRoute.get("/checks/:email",auth.authenticateUser,checkController.getByEmail);
checkRoute.put("/checks/update",auth.authenticateUser,checkController.update);
checkRoute.delete("/checks/delete/:check_id",auth.authenticateUser,checkController.delete);

module.exports = checkRoute;