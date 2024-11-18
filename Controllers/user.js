const {v4: uuidv4} = require("uuid");
const User = require('../Model/user'); 
const { setUser } = require("../service/auth");


async function createUserSignUp(req, res){
    const { name, email, password} = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("login");
}

async function createUserSignIn(req, res){
    const {  email, password } = req.body;
    const user = await User.findOne({ email, password });
    if(!user)
         return res.render("signup",{
        error: "Invalid email or password",
    })

    const token = setUser(user);
    res.cookie("uid", token);
    // console.log("user", User);
    return res.redirect("/");
}

module.exports = {
    createUserSignUp,
    createUserSignIn,
}