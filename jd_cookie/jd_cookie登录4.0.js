// [rule: 登录 ]
// [rule: 登陆 ]
// [disable: false] 是否禁用
//作者：院长，MaiARK转jd_cookie版，下列为原作者信息
//作者QQ1483081359 转载请保留版权  github仓库：zhacha222/sillyGirljs
//4.0更新 适配QQ，微信，TG，微信公众号 全平台登录



var addr = "http://101.35.190.155:1170"
//这修改成自己jd_cookie的ip地址和端口
//最后面不要带“/” ，不然会出错！
//只要修改上面这里即可，其他不懂请不要改！！！


var user = GetUserID()
var num = ""

function main() {


    sendText("院长为您服务，请输入11位手机号：(输入“q”随时退出会话。)");
    num = input(60000);


    if(!num || num == "q" || num == "Q"){
        sendText("已退出")
        return;

    }else{
        sendText("正在获取登录验证码,请耐心等待...");
    }


    var result = request({
        url: addr +"/jd/smsCode?mobile=" + num,
        "dataType": "json"
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
        url: addr + "/jd/login?mobile=" + num + "&code=" + code,
        "dataType": "json"
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
        var ck = result.data.cookie
		
        var ckpin = rule.exec(ck)
        //var pin = ckpin[1]
        var jj = ckpin[1]
        var pin = encodeURI(jj)

        try {
            sillyGirl.session(ck)
        } catch (e) {
            sillyGirl.Session(ck)
        }


        if (ImType() == "qq") {
            bucketSet('pinQQ', pin, user)
            sendText("上车成功。")
            return;
        }

        if (ImType() == "wx") {
            bucketSet('pinWX', pin, user)
            sendText("上车成功。")
            return;
        }
        if (ImType() == "wxmp") {
            bucketSet('pinWXMP', pin, user)
            sendText("上车成功。")
            return;
        } else if (ImType() == "tg") {
            bucketSet('pinTG', pin, user)
            sendText("上车成功。")
            return;
        }
    }else {
        sendText(result.msg + "，请重新登录！");
        return;
    }

}
main()





