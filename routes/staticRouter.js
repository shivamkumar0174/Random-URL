const express = require("express");
const URL = require("../Model/url");
const router = express.Router();

router.get("/",async(req, res) =>{
    if(!req.user) return res.redirect('/login');
    const allurls = await URL.find({ createdBy: req.user._id});
    return res.render('home',{
        urls: allurls,
    });
    
});

router.get("/signup", (req, res) =>{
    return res.render("signup");
});

router.get('/logout', (req, res) => {
    req.cookies.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      } else {
        res.redirect('/login');   
      }
    });
  });

router.get("/login", (req, res) =>{
    return res.render("login");
});

module.exports = router;

