const express = require("express");
const userRoute = express.Router();

const userController = require("./../controller/User");
const auth = require("./../middlewares/Auth");


userRoute.post("/users/signup",userController.addUser);
userRoute.get("/users/verify/:email/:code",userController.verify);
userRoute.post("/users/login",userController.login);
userRoute.delete("/users/delete/:email",userController.remove);

module.exports = userRoute;