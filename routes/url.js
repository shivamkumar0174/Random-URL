const express = require("express");
const {GenerateNewShortUrl,
       getAnalytics
      } = require('../Controllers/url');
const router = express.Router();

router.post("/",GenerateNewShortUrl);

router.get("/analytics/:shortId",getAnalytics);

module.exports = router;