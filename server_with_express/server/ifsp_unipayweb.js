const axios = require('axios');
const parseString = require('xml2js').parseString
const randomKey = (length) => {
    let str = ''
    for (let i = 0; i < length; i++) {
      if (i % 2) {
        str += String.fromCharCode(65 + Math.floor((26 * Math.random())))
      } else {
        str += String.fromCharCode(49 + Math.floor((9 * Math.random())))
      }
    }
    return str
}
const randomAmt = (amt) => {
   return Math.floor(Math.random() * amt)
}
const orderId = randomKey(16);


const config = {
    headers: { 'Content-Type' : 'text/xml' }
}

async function getQrcode() {
    try {
        const xmlParams = `00001026<?xml version="1.0" encoding="utf-8" ?>
        <SERVICE>
            <SYS_HEAD>
                <SOURCE_TYPE>L09</SOURCE_TYPE>
                <ESB_SEQ_NO>50010120210421010000027789</ESB_SEQ_NO>
                <PROVIDER_ID>114010</PROVIDER_ID>
                <TRAN_TIMESTAMP>023437933</TRAN_TIMESTAMP>
                <CONSUMER_SEQ_NO>22902020210421023437116219</CONSUMER_SEQ_NO>
                <SERVICE_SCENE>01</SERVICE_SCENE>
                <SERVICE_CODE>03002000083</SERVICE_CODE>
                <CONSUMER_ID>246010</CONSUMER_ID>
                <TRAN_DATE>20210422</TRAN_DATE>
            </SYS_HEAD>
            <APP_HEAD>
                <BUSS_SEQ_NO>24601020210421024114149106</BUSS_SEQ_NO>
            </APP_HEAD>
            <LOCAL_HEAD></LOCAL_HEAD>
            <BODY>
                <INET_NO>${randomKey(16)}</INET_NO>
                <MERCH_CODE>4817220210421024114172277</MERCH_CODE>
                <CHANNEL_CODE>CNTL020401</CHANNEL_CODE>
                <URL_TP>01</URL_TP>
                <CASH_PYMNT_AMT>16000</CASH_PYMNT_AMT>
                <SND_TM>20210421024114</SND_TM>
                <CCY>156</CCY>
                <PAY_TYPE>12</PAY_TYPE>
                <BUYER_CLNT_NO>1634704163</BUYER_CLNT_NO>
                <PNT_OCCR_CNT>3990</PNT_OCCR_CNT>
                <PRDCT_MSG>ABS爱彼此家务系列可拎式垃圾袋10卷</PRDCT_MSG>
                <MECH_NO>8201911040041411</MECH_NO>
                <PAY_AMOUNT>199900</PAY_AMOUNT>
                <PYMT_ACCT_NO>6214808801008734341</PYMT_ACCT_NO>
                <PYMNT_ACCT_TP>0</PYMNT_ACCT_TP>
            </BODY>
        </SERVICE>`
        const { data } = await axios.post('http://10.4.168.88:7502/ifsp-industry/esbWindFire', xmlParams, config)
        const index1 = data.indexOf('<QUICK_RSP_STRING>')
        const index2 = data.indexOf('</QUICK_RSP_STRING>')
        const QUICK_RSP_STRING = data.substring(index1 + '<QUICK_RSP_STRING>'.length, index2)
        console.log('预订单创建成功:',QUICK_RSP_STRING)
        return QUICK_RSP_STRING
    } catch (error) {
        console.log(error)
    }
}
async function redirectToUnipay(QUICK_RSP_STRING) {
    try {
        const xml = `<?xml version="1.0" encoding="utf-8" ?>
<SERVICE>
    <SYS_HEAD>
        <SOURCE_TYPE>L09</SOURCE_TYPE>
        <ESB_SEQ_NO>50010120210421010000027789</ESB_SEQ_NO>
        <PROVIDER_ID>114010</PROVIDER_ID>
        <TRAN_TIMESTAMP>023437933</TRAN_TIMESTAMP>
        <CONSUMER_SEQ_NO>22902020210421023437116219</CONSUMER_SEQ_NO>
        <SERVICE_SCENE>07</SERVICE_SCENE>
        <SERVICE_CODE>03003000119</SERVICE_CODE>
        <CONSUMER_ID>246010</CONSUMER_ID>
        <TRAN_DATE>20210422</TRAN_DATE>
    </SYS_HEAD>
    <APP_HEAD>
        <BUSS_SEQ_NO>24601020210421024114149106</BUSS_SEQ_NO>
    </APP_HEAD>
    <LOCAL_HEAD></LOCAL_HEAD>
    <BODY>
        <QUICK_RSP_STRING>${QUICK_RSP_STRING}</QUICK_RSP_STRING>
    </BODY>
</SERVICE>`
        const {data} = await axios.post('http://10.4.168.88:7502/ifsp-industry/esbWindFire', xml, config)
        console.log('交易成功：\n', data)
        return data
    } catch (error) {
        
    }
}

async function neworder() {
    const payAmt = randomAmt(0)
    const pointAmt = randomAmt(1000)
    const orderAmt = payAmt + pointAmt
    console.log(payAmt, pointAmt, orderAmt)
    const xml = `00001026<?xml version="1.0" encoding="utf-8" ?>
    <SERVICE>
        <SYS_HEAD>
            <SOURCE_TYPE>L09</SOURCE_TYPE>
            <ESB_SEQ_NO>50010120210421010000027789</ESB_SEQ_NO>
            <PROVIDER_ID>114010</PROVIDER_ID>
            <TRAN_TIMESTAMP>023437933</TRAN_TIMESTAMP>
            <CONSUMER_SEQ_NO>22902020210421023437116219</CONSUMER_SEQ_NO>
            <SERVICE_SCENE>09</SERVICE_SCENE>
            <SERVICE_CODE>03001000070</SERVICE_CODE>
            <CONSUMER_ID>246010</CONSUMER_ID>
            <TRAN_DATE>20210426</TRAN_DATE>
        </SYS_HEAD>
        <APP_HEAD>
            <BUSS_SEQ_NO>24601020210421024114149106</BUSS_SEQ_NO>
        </APP_HEAD>
        <LOCAL_HEAD></LOCAL_HEAD>
        <BODY>
            <INET_NO>${randomKey(32)}</INET_NO>
            <MERCH_CODE>4817220210421024114172277</MERCH_CODE>
            <CHANNEL_CODE>CNTL020401</CHANNEL_CODE>
            <URL_TP>01</URL_TP>
            <CASH_PYMNT_AMT>${payAmt}</CASH_PYMNT_AMT>
            <SND_TM>20210426024114</SND_TM>
            <CCY>156</CCY>
            <PAY_TYPE>12</PAY_TYPE>
            <BUYER_CLNT_NO>1040008791</BUYER_CLNT_NO>
            <PNT_OCCR_CNT>${pointAmt}</PNT_OCCR_CNT>
            <PRDCT_MSG>ABS爱彼此家务系列可拎式垃圾袋10卷</PRDCT_MSG>
            <MECH_NO>8201911040041411</MECH_NO>
            <PAY_AMOUNT>${orderAmt}</PAY_AMOUNT>
            <PYMT_ACCT_NO>6214808801008734341</PYMT_ACCT_NO>
            <PYMNT_ACCT_TP>0</PYMNT_ACCT_TP>
            <MOBILE>15224150689</MOBILE>
            <CHG_CARD_FLG>0</CHG_CARD_FLG>
        </BODY>
    </SERVICE>`
    const { data } = await axios.post('http://10.4.168.88:7502/ifsp-industry/esbWindFire', xml, config) 
    /*
    <URL_ADDRESS>
        http://10.4.168.88:7402/ifsp-unipayweb/tlPrePayReceive?qrCode=https://qr.95516.com/04730000/AEE0064895294AA596302D11E3B1E373
    </URL_ADDRESS>
    */
    // console.log('预订单2成功', data)
    const index1 = data.indexOf('<URL_ADDRESS>')
    const index2 = data.indexOf('</URL_ADDRESS>')
    const QUICK_RSP_STRING = data.substring(index1 + '<URL_ADDRESS>'.length, index2)
    // console.log('QUICK_RSP_STRING', QUICK_RSP_STRING)
    return QUICK_RSP_STRING
}
async function generatorUnipayweb() {
    const QUICK_RSP_STRING = await getQrcode()
    await redirectToUnipay(QUICK_RSP_STRING)
    const baseUrl2 = `http://10.4.168.88:7402/ifsp-unipayweb/tlPrePayReceive?qrCode=${QUICK_RSP_STRING}`
    const baseUrl = `http://10.4.168.88:7402/ifsp-unipayweb/merUnionPayReceive?qrCode=${QUICK_RSP_STRING}&payUserTag=1640668142&phone=15224150689&mchtChlNo=CNTLSC020401`
    // try {
    //     const {data} = await axios.get(baseUrl) 
    //     console.log('重定向成功：', data)
    // } catch (error) {
    //     console.log('重定向error：', error)
    // }
    return baseUrl2
}
async function new_generatorUnipayweb() {
    const QUICK_RSP_STRING = await neworder()
    return QUICK_RSP_STRING
}
const sleep = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time)
    })
}
module.exports = { generatorUnipayweb, new_generatorUnipayweb , sleep}

