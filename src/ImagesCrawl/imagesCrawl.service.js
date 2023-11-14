const puppeteer = require('puppeteer');

async function getImage(req) {
    try {
        const { barcode: query } = req?.body;

        const browser = await puppeteer.launch({ headless: "new" });

        const page = await browser.newPage();

        const url = `https://www.google.co.il/search?tbm=isch&q=${query}`;

        await page.goto(url, { waitUntil: "networkidle0" });

        const acceptCookiesSelector = '[jsname="b3VHJd"]';
        const imageSelector = '[jsname="sTFXNd"]';

        try {
            await page.click(acceptCookiesSelector);
            await page.waitForNavigation({waitUntil: "networkidle0"})
        } catch (error) {
            console.log({
                acceptCookiesError: error
            })
        }

        await page.waitForSelector(imageSelector);
        const selectImage = await page.$(imageSelector);
        await page.click(imageSelector);

        const link = await selectImage.evaluate((el) => el.href);
        const decoded = decodeURIComponent(link?.split("imgurl=")[1]?.split("&tbnid")[0]);

        return decoded;
    } catch (error) {
        console.log({
            getImageError: error
        })
    }
}

// (async () => {
//     await getImage({
//         body: {
//             barcode: "7290006651730"
//         }
//     })
// })();

module.exports = {
    getImage
}