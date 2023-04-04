// 作者 HermanWu by院长修改
// @author https://t.me/yuanter_res
// @create_at 2022-11-28 14:56:25
// @version v1.0.0
// @title jd_cookie_WSK_CK登录
// @description 凹凸曼和旧版傻妞 wskey | ck 登录，配合jd_cookie接口，并生成wpusher关注二维码
// [rule: raw ^(wsk登陆|wsk登录|ck登陆|ck登录|WSK登陆|WSK登录|CK登陆|CK登录)$]
// [priority:99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999]
// [disable: false] 是否禁用
// [admin: false] 是否只允许管理员使用



// 使用口令和修改脚本内容，二选一的方式（选择口令，就不用修改脚本，若改了脚本就不用回复口令）


// 设置使用对应的容器，在网页处可看顺序，默认使用第一个容器，从0开始顺序往下数。傻妞口令用法，对傻妞回复命令
// set otto jd_cookieKey 此处填容器的对应的key
// 设置短信地址，傻妞口令用法，对傻妞回复命令
// set otto jd_cookieAddr 这段文字修改为你的短信登录地址http://xxx.xxx.xxx.xxx:1170后面不带斜杆
// 设置自定义机器人回复，如“傻妞为您服务”
// set otto jd_cookieTip 这段文字修改为你的短信登录的提示文字，如傻妞为您服务


var addr = get("jd_cookieAddr")
if (!addr || addr == "" || addr == null) {
    //自行替换,如果未设置信息，请手动在这修改成自己jd_cookie的ip地址和端口，最后面不要带“/” ，不然会出错！
    addr = "http://xxx.xxx.xxx.xxx:1170"
}

var key = get("jd_cookieKey")
if (!key || key == "" || key == null) {
    //自行替换,默认使用第一个容器，从0开始顺序往下数
    key = "0"
}
var tip = get("jd_cookieTip")
if (!tip || tip == "" || tip == null) {
    //自行替换,如果未设置信息，请手动在这修改替换文字
    tip = "来吧，上车吧~"
}


const user = GetUserID()
const userName = GetUsername()

console.log(addr)

function main() {

    //获取配置列表，如果需要卡密则弹窗
    var configUrl = "/jd/config"
    var configData = request({
        url: addr + configUrl,
        method: "GET",
        timeout:60000
    })
    let config = {}
    try {
        config = JSON.parse(configData)
        if(config.code == undefined || config.code != 0){
            sendText("上车服务器错误，已退出")
            return;
        }
    }catch (e) {
        sendText("上车服务器错误，已退出")
        return;
    }
    //手动提交京东CK是否需要卡密
    var token = "";
    var currencyToken = config.data.currencyToken;
    if(currencyToken != undefined){
        if(currencyToken || currencyToken == "true"){
            sendText("当前已启用卡密功能。请输入卡密,输入“q”随时退出会话")
            token = input(60000).replace(/\s+/g,"");
        }
    }

    sendText("请输入CK或WSK(输入“q”随时退出会话。)");
    var ck = input(60000).replace(/\s+/g,"");

    if(!ck || ck == "q" || ck == "Q"){
        sendText("已退出")
        return;
    }
    //var rule = /[^;]+;[ ]pin=(.*);$/
    //var rule1 = /[^;]+;pin=(.*);$/
    const wskrule = /pin=([^;]+);.*?wskey=[^;]+;$/;
    const wskrule1 = /wskey=[^;]+;.*?pin=([^;]+);$/;
    let pinMatch = wskrule.exec(ck) || wskrule1.exec(ck)
    const isWSK = !!pinMatch
    if (!isWSK) {
        // 非WSK，检测是不是CK
        const ckrule = /pt_pin=([^;]+);.*?pt_key=[^;]+;$/;
        const ckrule1 = /pt_key=([^;]+);.*?pt_pin=([^;]+);$/;
        pinMatch = ckrule.exec(ck) || ckrule1.exec(ck)
        if (!pinMatch) {
            sendText("校验失败，格式不对！会话结束~")
            return
        }
    }
    const jj = pinMatch[1]
    const pin = encodeURI(jj)
    console.log(isWSK, pin);

    var mobileBean = ""
    sendText("是否需要绑定您的手机号作为网页查询依据？(输入“q”随时退出会话。)\n1、是\n2、否");
    const isMobileBean = input(60000);
    if(!isMobileBean || isMobileBean == "q" || isMobileBean == "Q"){
        sendText("已退出")
        return;
    }
    if(isMobileBean == "1" || isMobileBean == 1){
        sendText("请输入需要绑定的手机号(输入“q”随时退出会话。)");
        mobileBean = input(60000);
        if(!mobileBean || mobileBean == "q" || mobileBean == "Q"){
            sendText("已退出")
            return;
        }
    }



    sendText("请输入备注：");
    const remarks = input(60000);

    sendText("正在提交，请稍后......")
    const ckPutResult = isWSK ? putWskey(ck, remarks,token,mobileBean) : putCK(ck, remarks,token,mobileBean)
    if (ckPutResult.code != "0" || ckPutResult.code != 0 || ckPutResult.data.hasSubscribed) {
        sendText(userName+"上车成功，已关注公众号，结束会话~")
        return;
    }
    sendText("正在生成关注二维码，请耐心等待...")

    const cookieType = isWSK ? "wskey" : "cookie"
    // 生成wxpusher qrcode
    const qrcodeUrl = "/api/qrcode?id="+ckPutResult.data.id+"&ptPin="+pin+"&key="+key+"&cookieType="+cookieType
    console.log(qrcodeUrl)
    const qrcodeResult = request({
        url: addr + qrcodeUrl,
        method: "GET",
        dataType: "json",
        timeout:60000
    })
    console.log(qrcodeResult)
    if (qrcodeResult.code != "0" || qrcodeResult.code != 0) {
        return;
    }
    sendImage(qrcodeResult.data.url)
    sendText("关注WxPusher公众号，每天获取资产详情，首次关注需要二次扫码！！！\n\n 会话结束~")
}

function putWskey(ck, remarks,token,mobileBean) {
    const ckPutUrl = "/jd/putWskey"
    const ckPutBody = {
        token: token,
        wskey: ck,
        key: key,
        remarks: remarks,
        mobileBean: mobileBean
    }
    console.log(ckPutBody)

    const ckPutResult = request({
        url: addr + ckPutUrl,
        method: "POST",
        dataType: "json",
        body: ckPutBody,
        timeout:60000
    })
    console.log(ckPutResult)

    return ckPutResult
}

function putCK(ck, remarks,token,mobileBean) {
    const ckPutUrl = "/jd/putCK"
    const ckPutBody = {
        token: token,
        cookie: ck,
        key: key,
        remarks: remarks,
        mobileBean: mobileBean
    }
    console.log(ckPutBody)

    const ckPutResult = request({
        url: addr + ckPutUrl,
        method: "POST",
        dataType: "json",
        body: ckPutBody,
        timeout:60000
    })
    console.log(ckPutResult)

    return ckPutResult
}
main()