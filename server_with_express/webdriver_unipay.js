const { Builder, By, Key, until } = require('selenium-webdriver')
const { new_generatorUnipayweb, sleep } = require('./server/ifsp_unipayweb')
const getMsgCode = require('./utils/getMessage')
const fs = require('fs');

;(async function example() {
    const url = await new_generatorUnipayweb()
    console.log(url)
    const driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.manage().window().setRect({ width: 320, height: 720 });
        const page = await driver.get(url)
        console.log(await driver.getCurrentUrl())
        // 等待页面初始化   
        await sleep(500)
        // Captures the element screenshot
        const body = await driver.findElement(By.xpath('//*[@id="app"]/div/div[1]/button'))
        let encodedString = await driver.takeScreenshot(true)
        await fs.writeFileSync('./image.png', encodedString, 'base64');
        // const userName = await driver.findElement(By.css('.name-input')).sendKeys('000835')
        await sleep(500)
        // await sleep(10000)
        const i = await (await driver.findElement(By.xpath('//*[@id="app"]/div/div[1]/div[3]/p/i'))).click()        
        const login = await (await driver.findElement(By.xpath('//*[@id="app"]/div/div[1]/button'))).click()
        await sleep(2000)
        try {
            // 验证码逻辑
            await driver.findElement(By.css('.msg_input'))
            encodedString = await driver.takeScreenshot(true)
            await fs.writeFileSync('./image2.png', encodedString, 'base64');   
            const code = await getMsgCode('15224150689')
            console.log('code', code)
            // 模拟用户输入短信
            for(let x of code) {
                await driver.findElement(By.css('.msg_input')).sendKeys(x)
                await sleep(0)
            }
            encodedString = await driver.takeScreenshot(true)
            await fs.writeFileSync('./image3.png', encodedString, 'base64');   
            await (await driver.findElement(By.xpath('//*[@id="app"]/div/div[4]/div/button'))).click()
            await sleep(1000)
        } catch (error) {
            console.log('无需输入验证码，继续执行')
        }
        try {
            // 密码逻辑
            await driver.findElement(By.css('.skb_Row'));
            const one = await (await driver.findElement(By.xpath('//*[@id="skbContent"]/div/div[1]/div[1]/div/a'))).click();
            await sleep(2000);
                  await (await driver.findElement(By.xpath('//*[@id="skbContent"]/div/div[1]/div[1]/div/a'))).click();
            await sleep(1000);
            const two = await (await driver.findElement(By.xpath('//*[@id="skbContent"]/div/div[1]/div[2]/div/a'))).click();
            await sleep(500);
                  await (await driver.findElement(By.xpath('//*[@id="skbContent"]/div/div[1]/div[2]/div/a'))).click();
            await sleep(200);
            const three = await (await driver.findElement(By.xpath('//*[@id="skbContent"]/div/div[1]/div[3]/div/a'))).click();
            await sleep(100);
                  await (await driver.findElement(By.xpath('//*[@id="skbContent"]/div/div[1]/div[3]/div/a'))).click();
            await sleep(2000)
            encodedString = await driver.takeScreenshot(true)
            await fs.writeFileSync('./image3.png', encodedString, 'base64');   
            driver.close()
        } catch (error) {
            console.log(error)
            driver.close()
        }
        encodedString = await driver.takeScreenshot(true)
        await fs.writeFileSync('./image4.png', encodedString, 'base64');    
        await sleep(60000)
        // driver.close()
    } catch (error) {
        console.log(error)
        driver.close()
    }
})()