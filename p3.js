
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://twitter.com/elonmusk');
    await page.setViewport({
        width: 1200,
        height: 800
    });
    await page.waitFor(2000);
    let resText=[]
  
    
    // resText.push()
    let res=[];
    for( i =0;i<5;i++)
    {
        let r= await autoScroll(page);
        console.log(r);
    }
    //console.log(res);
    //[(text,1)]
    /*
    res['results'].array.forEach((element,a) => {
        
        });*/
          //  console.log(res['results']);
            //const results = page.$$eval('article div[lang]', (tweets) => tweets.map((tweet) => tweet.textContent));
           //onsole.log(results);
        
    
    await browser.close();
})();

async function autoScroll(page)
{
   let results = await page.$$eval('article div[lang]', (tweets) => tweets.map((tweet) => tweet.textContent));
   let time =  await page.$$eval('article  time', (tweets) => tweets.map((tweet) => tweet.getAttribute('datetime').substring(0,5) ) );
   let timeText =  await page.$$eval('article  time[datetime]', (tweets) => tweets.map((tweet) => tweet.textContent ));

    await page.evaluate(async () => {
        await new Promise((resolve, reject, page) => {
            var totalHeight = 0;
            var distance = 200;
            var array = [];

            var timer = setInterval((page) => {

                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                console.log("th ",totalHeight);
                if(totalHeight%5000==0){
                    window.scrollBy(0,-2500);
                }
                if ((totalHeight > 3000)) {
                    //|| totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve(page);
                }
            },200);
        })
    });
    resJ={}
    results.forEach(element => {
        console.log(" whateva ", element);
    });
    for( i=0;i<results.length;i++)
    {
       a={
            "tweet":results[i],
            "date" :time[i],
            "timeText":timeText[i]
        }
        resJ[`tweet_${i}`]=a
        
    }
    //console.log(resJ);
    return {"results":results,"time":time,"timeText":timeText};
    //return resJ;
}