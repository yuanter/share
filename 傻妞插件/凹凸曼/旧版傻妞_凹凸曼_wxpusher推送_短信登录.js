// [rule: raw ^(登陆|登录|短信登陆|短信登录)$]
// [priority:99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999]
// [disable: false] 是否禁用
// [admin: false] 是否只允许管理员使用

// 使用口令和修改脚本内容，二选一的方式（选择口令，就不用修改脚本，若改了脚本就不用回复口令）

// 设置使用对应的容器，在网页处可看顺序，默认使用第一个容器，从0开始顺序往下数。傻妞口令用法，对傻妞回复命令
// set otto jd_cookieKey 此处填容器的对应的key
// 设置短信地址，傻妞口令用法，对傻妞回复命令
// set otto yuanter_jd_cookieAddr 这段文字修改为你的短信登录地址http://xxx.xxx.xxx.xxx:1170后面不带斜杆
// 设置自定义机器人回复，如“傻妞为您服务”
// set otto yuanter_jd_cookieTip 这段文字修改为你的短信登录的提示文字，如傻妞为您服务

//---------------------------------------------若使用上面的口令后，请不要修改下面圈起来注释部分，其他不懂的请不要修改！！！-------------------------------------

var addr = get("yuanter_jd_cookieAddr")

if(!addr || addr == "" || addr == null){
    //自行替换,如果未设置信息，请手动在这修改成自己jd_cookie的ip地址和端口，最后面不要带“/” ，不然会出错！
    addr = "http://xxx.xxx.xxx.xxx:1170"
}
var key = get("jd_cookieKey")
if (!key || key == "" || key == null) {
    //自行替换,默认使用第一个容器，从0开始顺序往下数
    key = "0"
}
var tip = get("yuanter_jd_cookieTip")
if(!tip || tip == "" || tip == null){
    //自行替换,如果未设置信息，请手动在这修改替换文字
    tip = "院长为您服务。"
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------

var user = GetUserID()
var userName = GetUsername()
var num = "";
var token = "";

function main() {

    //获取配置
    var configUrl = "/jd/config";
    var configData = request({
        url: addr + configUrl,
        method: "GET",
        timeout:60000
    });
    let config = {};
    try {
        config = JSON.parse(configData)
        if(config.code == undefined || config.code != 0){
            sendText("上车服务器错误，已退出");
            return;
        }
    }catch (e) {
        sendText("上车服务器错误，已退出");
        return;
    }

    //获取京东CK是否需要卡密
    var ckToken = config.data.ckToken;
    if(ckToken != undefined){
        if(ckToken || ckToken == "true"){
            sendText("当前已启用卡密功能。请输入卡密,输入“q”随时退出会话")
            token = input(60000).replace(/\s+/g,"");
        }
    }

    sendText(tip + "\n请输入11位手机号：(输入“q”随时退出会话。)");
    num = input(60000);


    if(!num || num == "q" || num == "Q"){
        sendText("已退出")
        return;

    }else{
        sendText("正在获取登录验证码,请耐心等待...");
    }

    var result = request({
        url: addr + "/jd/smsCode?mobile=" + num,
        dataType: "json",
        timeout:60000
    })

    if (!result) {
        sendText("无法获取验证码，请更换账号，或通过其他方式登录。");
        return;
    }

    if (result.code == 0) {
        LoginJD();
    } else {
        sendText(result.msg)
        return;
    }
}

function LoginJD() {
    sendText("获取验证码成功！请输入短信验证码：")
    code = input(60000);
    if (!code || code == "q" || code == "Q") {
        sendText("已退出");
        return;
    }

    var result = request({
        url: addr + "/jd/login?mobile=" + num + "&code=" + code + "&token=" + token,
        "dataType": "json",
        timeout:60000
    })

    if (!result) {
        sendText("无法获取CK,请重新申请登录");
        return;
    }

    if (result.code == -1) {
        sendText("程序获取CK出错,请重新申请登录");
        return;
    }

    if (result.data.cookie != undefined) {
        var rule = /[^;]+;[ ]pt_pin=(.*);$/
        var rule1 = /[^;]+;pt_pin=(.*);$/
        var ck = result.data.cookie

        var ckpin = rule.exec(ck) || rule1.exec(ck)
        //var pin = ckpin[1]
        var jj = ckpin[1]
        var pin = encodeURI(jj)

        //开始提交CK
        //模拟提交CK给机器人
        // try {
        //     autMan.session(ck)
        // } catch (e) {
        //     try {
        //         autMan.Session(ck)
        //     }catch (e) {
        //         try {
        //             sillyGirl.session(ck)
        //         } catch (e) {
        //             sillyGirl.Session(ck)
        //         }
        //     }
        //
        // }
        //直接提交给项目接口
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

        const remarks = pin;

        sendText("正在提交，请稍后......")
        const ckPutResult = putCK(ck, remarks,token,mobileBean)
        if (ckPutResult.code != "0" || ckPutResult.code != 0 || ckPutResult.data.hasSubscribed) {
            sendText(userName+"上车失败，结束会话~")
            return;
        }
        sendText("正在生成关注二维码，请耐心等待...")

        const cookieType = "cookie"
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
        sendText("关注WxPusher公众号，每天获取资产详情，首次关注需要二次扫码！！！")

        if (ImType() == "qq") {
            bucketSet('pinQQ', pin, user)
            sendText(userName+"上车成功。")
            return;
        }

        if (ImType() == "wx") {
            bucketSet('pinWX', pin, user)
            sendText(userName+"上车成功。")
            return;
        }
        if (ImType() == "wxmp") {
            bucketSet('pinWXMP', pin, user)
            sendText(userName+"上车成功。")
            return;
        } else if (ImType() == "tg") {
            bucketSet('pinTG', pin, user)
            sendText(userName+"上车成功。")
            return;
        }
    }else {
        sendText(result.msg + "，请重新登录！");
        return;
    }
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
