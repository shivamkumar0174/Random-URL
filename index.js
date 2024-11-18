const express = require("express");
const path = require("path");  //  the provided code to handle file paths related to the EJS templates.
const cookieParser = require("cookie-parser");
const { ConnectToMongoDb } = require("./connection");

const { restrictToLoggedInUserOnly, checkAuth} = require("./CookieMiddleware/auth");
const URL = require("./Model/url");

const urlRoute = require("./routes/url"); //CRUD operations
const staticRoute = require("./routes/staticRouter"); // used for ejs server-side rendering
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

ConnectToMongoDb("mongodb://localhost:27017/short-url")
.then( ()=> console.log("MongoDb Connected"));

app.set("view engine","ejs");    
app.set('views',path.resolve('./views'));
//Middleware

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

  
app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/user",userRoute);
app.use("/",checkAuth, staticRoute);

app.get("/:shortId", async(req, res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    }, {
        $push: {
        visitHistory: {
            timestamp: Date.now(),
        },
    },
});

if (!entry) { // Handle case where entry is not found
    return res.status(404).json({ message: "Short URL not found" });
  }
  res.redirect(entry.redirectUrl);
});

app.listen(PORT,()=> console.log(`Server Started at the port: ${PORT}`));