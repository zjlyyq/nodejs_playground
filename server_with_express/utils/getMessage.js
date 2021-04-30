const { Builder, By, Key, until } = require('selenium-webdriver')
const { sleep } = require('../server/ifsp_unipayweb')
const fs = require('fs');
const recognize = require('tesseractocr');

async function example(number) {
    const url = 'http://10.4.170.15:8080/login.html'
    const driver = await new Builder().forBrowser('chrome').build();
    try {
        // await driver.manage().window().setRect({ width: 320, height: 720 });
        const page = await driver.get(url)
        console.log(await driver.getCurrentUrl())
        // 等待页面初始化   
        await sleep(500)
        // Captures the element screenshot
        await driver.findElement(By.id('username')).sendKeys('600000')
        await driver.findElement(By.id('password')).sendKeys('zjtlcb@zjl0805')
        try {
            const codeImg = driver.findElement(By.id('codeImg'))
            let encodedString = await codeImg.takeScreenshot(true)
            await fs.writeFileSync('./codeImg.png', encodedString, 'base64');
            // const text = await recognize(`./codeImg.png`)
            // console.log('Yay! Text recognized:', text)
            await sleep(5000)
            ;(await driver.findElement(By.xpath('//*[@id="loginBody"]/div/div[1]/form/div[2]/input'))).click()
            await sleep(4000)
            const openMenu = (await driver.findElement(By.xpath('//*[@id="menuSel"]/ul/li[2]'))).click()
            await sleep(1000)
            const clickmsg = await (await driver.findElement(By.xpath('//*[@id="menu_10000000"]/li[2]'))).click()
            await sleep(1000)
            // //*[@id="tab"]/li[2]
            const clickNum = await (await driver.findElement(By.xpath('//*[@id="tab"]/li[2]'))).click()
            await sleep(1000)
            // //*[@id="phone"]
            const inputPhone = await (await driver.findElement(By.xpath('//*[@id="phone"]'))).sendKeys(number)
            // //*[@id="tab2"]/div[1]/form/div[7]/button
            // //*[@id="tab2"]/div[1]/form/div[7]/button
            // //*[@id="tab2"]/div[1]/form/div[7]/button
            await sleep(1000)
            const query = await (await driver.findElement(By.xpath('//*[@id="tab2"]/div[1]/form/div[7]/button'))).click()
            // //*[@id="main_page"]/div[2]/div/div[3]/div/div[2]/div/div[2]/table/tbody/tr[1]/td[3]/a
            await sleep(1000)
            const select = await (await driver.findElement(By.xpath('//*[@id="main_page"]/div[2]/div/div[3]/div/div[2]/div/div[2]/table/tbody/tr[1]/td[3]/a'))).getText()
            console.log(select)
            const index = select.indexOf(':')
            const msgcode = select.substring(index+1, index + 7)
            console.log(msgcode)
            await(300)
            driver.close()
            return msgcode
        } catch (error) {
            console.log('无需图形验证码，继续执行', error)
        }
        await sleep(60000)
        driver.close()
    } catch (error) {
        console.log(error)
        driver.close()
    }
}

module.exports = example