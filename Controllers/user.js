const {v4: uuidv4} = require("uuid");
const User = require('../Model/user'); 
const { request } = require("express");
const { setUser } = require("../service/auth");
async function createUserSignUp(req, res){
    const { name, email, password} = req.body;
    await User.create({
        name,
        email,
        password,
    });
    console.log(User);
    return res.redirect("login");
}

async function createUserSignIn(req, res){
    const {  email, password } = req.body;
    const user = await User.findOne({ email, password });
    if(!user) return res.render("login",{
        error: "Invalid email or password",
    })

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    return res.redirect("/");
}

module.exports = {
    createUserSignUp,
    createUserSignIn,
}