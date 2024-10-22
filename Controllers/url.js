const shortid = require("shortid");  // it is a module
const URL = require('../Model/url'); // Schema/Structure

async function GenerateNewShortUrl(req, res){
    const body = req.body;
    if(!body.url) return res.status(404).json({error: "url is required"});

    const shortId = shortid();

    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitedHistory: [ ],
        // createdBy: req.user._id,
    });
    return res.render("home",{ id: shortId});
}

async function getAnalytics(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({ 
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}
module.exports = {
    GenerateNewShortUrl,
    getAnalytics,
}