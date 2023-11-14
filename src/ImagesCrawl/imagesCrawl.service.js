const puppeteer = require('puppeteer');

async function getImage(req) {
    const { barcode: query } = req?.body;

    const browser = await puppeteer.launch({ headless: "new" });

    const page = await browser.newPage();

    await page.goto(`https://www.google.com/search?tbm=isch&q=${query}`);

    const data = await page.content()

    return data;

    // const selector = '[tabindex="0"]'

    // await page.waitForSelector(selector, { timeout: 3000 });
    // const elements = await page.$$(selector);

    // let link;

    // for (const [index, element] of elements.entries()) {
    //     if (index === 17) {
    //         await element.click();
    //         link = await element?.evaluate((el) => el.href);
    //     }
    // }

    // const decoded = decodeURIComponent(link?.split("imgurl=")[1]?.split("&tbnid")[0]);
    // return decoded;
}

// (async()=>{
//     await getImage({
//         body: {
//             barcode: "7290006651730"
//         }
//     })
// })();

module.exports = {
    getImage
}