const express = require("express");
const { createUserSignUp, createUserSignIn } = require("../Controllers/user");
const router = express.Router();

router.post("/user",createUserSignUp);
router.post("/login",createUserSignIn);

module.exports = router ; 