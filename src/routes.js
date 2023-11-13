const express = require('express');
const router = express.Router();
const imagesCrawlRoute = require('./ImagesCrawl/imagesCrawl.route')

const routes = () => {
    router.use('/getImage', imagesCrawlRoute);
    router.use('/', (req, res) =>  res.send("Welcome Home!"));
    return router;
}

module.exports = routes;
