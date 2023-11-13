const express = require('express');
const { getImage } = require('./imagesCrawl.service');
const router = express.Router();

router.route('/').post(imagesCrawl);

async function imagesCrawl(req, res) {
    try {
        const response = await getImage(req);
        return res.json({ ok: 1, data: response })
    } catch (error) {
        console.log(error);
    }
}

module.exports = router;