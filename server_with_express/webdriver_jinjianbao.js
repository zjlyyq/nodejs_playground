const { Builder, By, Key, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const { new_generatorUnipayweb, sleep } = require('./server/ifsp_unipayweb')
const getMsgCode = require('./utils/getMessage')
const path = require('path')

;(async function example() {
    // const url = await new_generatorUnipayweb()
    const opt = new chrome.Options().setMobileEmulation(
        {deviceName: 'Nexus 5'});
    /**
     * 设置模拟器模式
     * 具体参考 https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/chrome_exports_Options.html#setMobileEmulation
     * 具体参考 https://stackoverflow.com/questions/44564707/selenium-mobileemulation-not-working-after-chromedriver-version-updation-to-2
    */
    const driver = await new Builder().forBrowser('chrome').setChromeOptions(opt).build();
    // 获取进件配置文件
    const configpath = process.argv[3]
    console.log(configpath)
    const config = require(path.resolve(__dirname, `./${configpath}`))
    // console.log(config)
    try {
        await driver.get('http://tppdev.zjtlcb.com/jinjianbao')
        // await driver.manage().window().setRect({ width: 320, height: 1280 });
        await driver.actions().keyDown(Key.F12).sendKeys('').perform()
        console.log(await driver.getCurrentUrl())
        console.log('当前窗口句柄', await driver.getWindowHandle())
        // 登录
        const userName = await driver.findElement(By.css('.name-input')).sendKeys('000835')
        console.log(userName)
        const passwd = await driver.findElement(By.xpath('//*[@id="psd"]/input')).sendKeys('1')
        const login = await (await driver.findElement(By.xpath('//*[@id="register"]/form/button'))).click()
        await sleep(3000)
        // 去进件
        const shanghujinjian = await (await driver.findElement(By.xpath('//*[@id="commercialTenantInfor"]/li[1]'))).click()
        await sleep(2000)
        // 泰惠收渠道
        const ths = await (await driver.findElement(By.xpath('//*[@id="app"]/div/ul[1]/li'))).click()
        await sleep(1000)
        if (config.mchtBase.mchtLicnType) {
            console.log('选择营业执照')
            try {
                await zhizhao(driver, config)
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log('不选择营业执照')
            await no_zhizhao(driver, config)
        }
    } catch (error) {
        console.log(error)
        driver.close()
    }
})()

async function no_zhizhao() {
    await driver.findElement(By.xpath('/html/body/div[3]/div/div[3]/button[2]')).click()
}

async function zhizhao(driver, config) {
    await (await driver.findElement(By.xpath('/html/body/div[3]/div/div[3]/button[1]'))).click()
    await sleep(1000)
    if (config.mchtBase.mchtType === '04') { // 个体
        await driver.findElement(By.xpath('//*[@id="shopSelect"]/div[2]/div[1]/div[1]')).click()
        await sleep(2000)
        // 上传身份证张反面
        await driver.findElement(By.xpath('//*[@id="fileHead-1"]')).sendKeys(path.resolve(__dirname, './image.png'))
        await sleep(3000)
        await driver.findElement(By.xpath('//*[@id="fileHead-2"]')).sendKeys(path.resolve(__dirname, './image3.png'))
        await sleep(2000)
        // 填写身份证信息
        await driver.findElement(By.xpath('//*[@id="identifyAuthenticationInfo2"]/div[1]/form[1]/ul/li[2]/input')).sendKeys('禾拾二')
        await driver.findElement(By.xpath('//*[@id="identifyAuthenticationInfo2"]/div[1]/form[1]/ul/li[3]/input')).sendKeys('33010219800828218X')
        // 身份证有效期点击
        await driver.findElement(By.xpath('//*[@id="identifyAuthenticationInfo2"]/div[1]/form[1]/ul/li[4]/input')).click()
        await sleep(200)
        // 选择长期有效
        await driver.findElement(By.xpath('//*[@id="identifyAuthenticationInfo2"]/div[1]/div[7]/div/div[1]')).click()
        // 查询结算账号
        await driver.findElement(By.xpath('//*[@id="identifyAuthenticationInfo2"]/div[1]/form[1]/ul/li[5]/span')).click()
        await sleep(1500)  // 查询结算账号，等待1500毫秒
        // 发起四要素认证接口完成
        await driver.findElement(By.xpath('//*[@id="identifyAuthenticationInfo2"]/div[1]/div[9]/button')).click()
        await sleep(12000) // 四要素认证接口完成，唤起人脸识别页面
        // 上传人脸图片
        await driver.findElement(By.xpath('//*[@id="upload"]')).sendKeys(path.resolve(__dirname, './image.png'))
        await sleep(30000) // 等待人脸识别
        // 点击人工审核
        await driver.findElement(By.xpath('/html/body/div[3]/div/div[3]/button[1]')).click() // 人工审核
        await sleep(2000)
        // 进入商户基本信息页面
        // 填写总店执照信息
        await headQuarters(driver)
        // 填写商户基本信息
        await mchtInfo(driver)
        await sleep(60000000)
    } else {
        // 企业
        await driver.findElement(By.xpath('//*[@id="shopSelect"]/div[2]/div[2]/div[1]')).click()
    }
}

async function headQuarters(driver) {
    // 总店执照号码
    await driver.findElement(By.xpath('//*[@id="BusinessBasicInfoLegal"]/div[3]/form[1]/ul/li[3]/input')).sendKeys('34578934583475')
    // 执照成立日期点击
    await driver.findElement(By.xpath('//*[@id="BusinessBasicInfoLegal"]/div[3]/form[1]/ul/li[4]/input')).click()
    await sleep(500)
    // 确认执照成立日期
    await driver.findElement(By.xpath('//*[@id="BusinessBasicInfoLegal"]/div[3]/div[2]/div/div[1]/span[2]')).click()
    await sleep(300)
    // 执照有效期点击
    await driver.findElement(By.xpath('//*[@id="BusinessBasicInfoLegal"]/div[3]/form[1]/ul/li[5]/span/input')).click()
    await sleep(500)
    // 点击长期有效
    await driver.findElement(By.xpath('//*[@id="BusinessBasicInfoLegal"]/div[3]/div[3]/div/div[1]')).click()
    await sleep(500)
}

async function mchtInfo(driver) {
    // 商户名称
    await driver.findElement(By.xpath('//*[@id="BusinessBasicInfoLegal"]/div[3]/form[2]/ul/li[2]/input')).sendKeys('你大爷的打铁铺')
    // 商户简称
    await driver.findElement(By.xpath('//*[@id="BusinessBasicInfoLegal"]/div[3]/form[2]/ul/li[4]/input')).sendKeys('打铁')
    // 省市区联动框唤起
    await driver.findElement(By.xpath('//*[@id="BusinessBasicInfoLegal"]/div[3]/form[2]/ul/li[5]/span/input')).click()
    await sleep(1000)
    // 省市区确认
    await driver.findElement(By.xpath('//*[@id="MyPicker"]/div/div[1]/span[2]')).click()
    // 详细地址
    await driver.findElement(By.xpath('//*[@id="BusinessBasicInfoLegal"]/div[3]/form[2]/ul/li[6]/textarea')).sendKeys('前门胡同口第二个拐角')
    // 联系人信命
    await driver.findElement(By.xpath('//*[@id="BusinessBasicInfoLegal"]/div[3]/form[2]/ul/li[7]/input')).sendKeys('谢步东')
    // 登录手机号
    await driver.findElement(By.xpath('//*[@id="BusinessBasicInfoLegal"]/div[3]/form[2]/ul/li[8]/input')).sendKeys('18876541234')
    // 发送验证码
    await driver.findElement(By.xpath('//*[@id="BusinessBasicInfoLegal"]/div[3]/form[2]/ul/li[9]/span')).click()
    await sleep(400)
    const code = getMsgCode('18876541234')
}