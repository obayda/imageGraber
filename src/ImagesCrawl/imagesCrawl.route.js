const express = require('express');
const { getImage } = require('./imagesCrawl.service');
const router = express.Router();

router.route('/').post(imagesCrawl);

async function imagesCrawl(req, res) {
    try {
        console.time("time");
        console.log(`getting image for ${JSON.stringify(req.body)}`);
        const response = await getImage(req);
        console.log(`getting image success`);
        console.timeEnd("time");
        return res.json(response)
    } catch (error) {
        console.log(error);
    }
}

module.exports = router;