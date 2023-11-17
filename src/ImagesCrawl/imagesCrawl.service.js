const puppeteer = require('puppeteer');

async function getImage(req) {
    try {
        const { barcode: query } = req?.body;

        const browser = await puppeteer.launch({ headless: "new" });

        const page = await browser.newPage();

        const url = `https://www.google.co.il/search?tbm=isch&q=${query}`;

        await page.goto(url);

        const acceptCookiesSelector = '[jsname="b3VHJd"]';
        const imageSelector = '[jsname="sTFXNd"]';
        const imageTitleSelector = '.h11UTe';

        try {
            await page.waitForSelector(acceptCookiesSelector, { timeout: 3000 });
            await page.click(acceptCookiesSelector);
            await page.waitForNavigation();
        } catch (error) {
            console.log({
                acceptCookiesError: error
            })
        }

        await page.waitForSelector(imageSelector, { timeout: 3000 });
        const selectImage = await page.$(imageSelector);
        await page.click(imageSelector);

        await page.waitForSelector(imageTitleSelector);
        const title = await page.$(imageTitleSelector);

        let text = await title.evaluate((el) => el.textContent);

        const link = await selectImage.evaluate((el) => el.href);
        const decoded = decodeURIComponent(link?.split("imgurl=")[1]?.split("&tbnid")[0]);

        if (text.includes("למקור")) text = text?.split("למקור")[0]

        await browser.close();

        return {
            url: decoded,
            text: text?.slice(0, 30)
        };
    } catch (error) {
        console.log({
            getImageError: error
        })
    }
}

module.exports = {
    getImage
}