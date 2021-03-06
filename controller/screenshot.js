const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const request = require('request');
exports.screenshot = async (req, res, next) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: { width: 500, height: 900 },
      args: ["--start-fullscreen"],
    })
    const page = await browser.newPage()
    // 跳转到指定的页面
    await page.goto(req.query.url, {
      waitUntil: "networkidle0",
    })

    // 延迟一段时间后截图
    // await page.waitForNavigation()
    const baseData = await page.screenshot({
      type: 'png',
      encoding: 'base64',
      fullPage: true, //边滚动边截图
    })
    await browser.close()
    res.send({
      code: 200,
      data: `data:image/png;base64,${baseData}`
    })
  } catch (err) {
    next(err)
  }
}


exports.getDataList = async (req, res, next) => {
  try {
    request(req.query.url, function (error, response, body) {
      const $ = cheerio.load(body);

      console.log($, '$'.red)
      res.send({
        code: 200,
        data: [1, 2, 3, 4, 5]
      })
    })

  } catch (err) {
    next(err)
  }
}
