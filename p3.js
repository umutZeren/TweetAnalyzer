
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://twitter.com/SpaceX/status/1388750333262761988');
    await page.setViewport({
        width: 1200,
        height: 800
    });
    await page.waitFor(2000);
    await autoScroll(page);
    for (i = 0; i < 5; i++)
    {

        await autoScroll(page)
            console.log("inside");
            //const results = page.$$eval('article div[lang]', (tweets) => tweets.map((tweet) => tweet.textContent));
           //onsole.log(results);
        
    }

    //let results = await page.$$eval('article div[lang]', (tweets) => tweets.map((tweet) => tweet.textContent));
    //array.push(result);
    //console.log(results);

    await browser.close();
})();

async function autoScroll(page)
{
    let results = page.$$eval('article div[lang]', (tweets) => tweets.map((tweet) => tweet.textContent));
    await page.evaluate(async () => {
        await new Promise((resolve, reject, page) => {
            var totalHeight = 0;
            var distance = 1200;
            var array = [];

            var timer = setInterval(() => {

                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                array.push("0");
                if ((totalHeight > 1000)) {
                    console.log("insied");
                    //|| totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve(page);
                }
            }, 200);
        })
    });
    console.log(results);


}