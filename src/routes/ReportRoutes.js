const express = require("express");
const reportRoute = express.Router();

const reportController = require("./../controller/Report");
const auth = require("./../middlewares/Auth");


reportRoute.post("/reports/add",auth.authenticateUser,reportController.addReport);
reportRoute.get("/reports/:check_id",auth.authenticateUser,reportController.getReportsByCheckId);
reportRoute.get("/reports/",auth.authenticateUser,reportController.getAll);

module.exports = reportRoute;