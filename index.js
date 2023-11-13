const puppeteer = require('puppeteer');

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://www.google.com/search?tbm=isch&q=7290014666337');


  const selector = '[jsname="sTFXNd"]'

  await page.waitForSelector(selector);
  const element = await page.$(selector);
  await page.click(selector);

  const t = await element.evaluate((el) => el.href);

  console.log({
    t: decodeURIComponent(t?.split("imgurl=")[1]?.split("&tbnid")[0])
  })

})();
