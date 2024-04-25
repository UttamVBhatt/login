const express = require("express");
const userController = require("./../controllers/userController");

const router = express.Router();

router.route("/signup").post(userController.signUp);

router.route("/login").post(userController.logIn);

router.route("/logout").get(userController.logOut);

router.route("/").get(userController.getAllUsers);

module.exports = router;
