const express = require("express");
const { createUserSignUp, createUserSignIn } = require("../Controllers/user");
const router = express.Router();

router.post("/",createUserSignUp);
router.post("/login",createUserSignIn);

module.exports = router ; 