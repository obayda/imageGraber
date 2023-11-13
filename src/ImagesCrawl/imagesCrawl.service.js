const puppeteer = require('puppeteer');

async function getImage(req) {
    const { barcode: query } = req?.body;

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.goto(`https://www.google.com/search?tbm=isch&q=${query}`);

    const selector = '[jsname="sTFXNd"]'

    await page.waitForSelector(selector);
    const element = await page.$(selector);
    await page.click(selector);

    const t = await element.evaluate((el) => el.href);
    const w = decodeURIComponent(t?.split("imgurl=")[1]?.split("&tbnid")[0]);

    return w;

}

module.exports = {
    getImage
}