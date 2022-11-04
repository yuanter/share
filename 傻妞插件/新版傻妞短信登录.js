/**
 * 作者
 * @author https://t.me/yuanter_res
 * @create_at 2022-11-03 19:40:26
 * @version v1.0.0
 * @title jd_cookie短信登录by新版傻妞
 * 脚本描述。
 * @description jd_cookie短信登录by新版傻妞
 * @rule raw ^(登陆|登录)$
 * 脚本优先级，大的优先处理消息。
 * @priority 99999999999999999999999999999999999999999999999
 * 脚本支持的平台，默认支持所有。
 * @platform qq wx tg pgm web
 * 脚本设置为公开，订阅者可以获取该脚本。
 * @public false
 * 启用脚本
 * @disable false
 * 
 * 
 */

 
 
 
 
 
// 使用口令和修改脚本内容，二选一的方式（选择口令，就不用修改脚本，若改了脚本就不用回复口令）
 
 
// 设置短信地址，傻妞口令用法，对傻妞回复命令  
// set yuanter jd_cookieAddr 这段文字修改为你的短信登录地址http://xxx.xxx.xxx.xxx:1170后面不带斜杆
// 设置自定义机器人回复，如“傻妞为您服务”
// set yuanter jd_cookieTip 这段文字修改为你的短信登录的提示文字，如傻妞为您服务
 

 

//---------------------------------------------若使用上面的口令后，请不要修改下面圈起来注释部分，其他不懂的请不要修改！！！-------------------------------------

// Bucket 存储器
const yuanter = new Bucket("yuanter")
var addr = yuanter.get("jd_cookieAddr")
if(!addr || addr == "" || addr == null){
	//自行替换,如果未设置信息，请手动在这修改成自己jd_cookie的ip地址和端口，最后面不要带“/” ，不然会出错！
	addr = "http://xxx.xxx.xxx.xxx:1170"
}
var tip = yuanter.get("jd_cookieTip")
if(!tip || tip == "" || tip == null){
	//自行替换,如果未设置信息，请手动在这修改替换文字
	tip = "院长为您服务。"
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------






const sillyGirl = new SillyGirl()
const s = sender
const user = s.getUserId()
const userName = s.getUserName()
var num = ""

function main() {

    s.reply(tip + "\n请输入11位手机号：(输入“q”随时退出会话。)")
    num = s.listen(60000).getContent();


    if(!num || num == "q" || num == "Q"){
        s.reply("已退出")
        return;

    }else{
        s.reply("正在获取登录验证码,请耐心等待...");
    }


    var result = request({
        url: addr +"/jd/smsCode?mobile=" + num,
        "dataType": "json",
        method:"get",
        allowredirects: true, //禁止重定向
    }).body


    if (!result) {
        s.reply("无法获取验证码，请更换账号，或通过其他方式登录。");
        return;
    }

    if (result.code == 0) {
        LoginJD();
    } else {
        s.reply(result.msg)
        return;
    }
}

function LoginJD() {
    s.reply("获取验证码成功！请输入短信验证码：")
    var code = s.listen(60000).getContent();
    if (!code || code == "q" || code == "Q") {
        s.reply("已退出");
        return;
    }

    // request 网络请求
    // var {body, headers, status} = request({
    //     url:"https://vps.gamehook.top/api/face/my",
    //     method:"get",
    //     allowredirects: false, //不禁止重定向
    // })
    var result = request({
        url: addr + "/jd/login?mobile=" + num + "&code=" + code,
        "dataType": "json",
        method:"get",
        allowredirects: true, //禁止重定向
    }).body

    if (!result) {
        s.reply("无法获取CK,请重新申请登录");
        return;
    }

    if (result.code == -1) {
        s.reply("程序获取CK出错,请重新申请登录");
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

        try {
            sillyGirl.session(ck)
            var func = sillyGirl.session(ck)
            var { message, hasNext } = func()
            console.log(`会话返回消息：%s，是否还有消息：%t`, message, hasNext)
        } catch (e) {
            sillyGirl.Session(ck)
        }


        // yuanter.set(s.getPlatform(), pin, user)
        // sillyGirl.push({
    	// 		platform: s.getPlatform(),
    	// 		userId: s.getUserId(),
    	// 		content: userName+"上车成功。",
		// 	})
        // return;
        let bind=new Bucket("pin"+s.getPlatform().toUpperCase())
		bind.set(pin,s.getUserId())
        s.reply(userName+"上车成功。")
        return;

        

        // if (s.getPlatform() == "qq") {
        //     //bucketSet('pinQQ', pin, user)
        //     // Bucket set 设置值
        //     yuanter.set("pinQQ", pin, user)
        //     s.reply(userName+"上车成功。")
        //     return;
        // }

        // if (s.getPlatform() == "wx") {
        //     //bucketSet('pinWX', pin, user)
        //     yuanter.set("pinWX", pin, user)
        //     s.reply(userName+"上车成功。")
        //     return;
        // }
        // if (s.getPlatform() == "wxmp") {
        //     //bucketSet('pinWXMP', pin, user)
        //     yuanter.set("pinWXMP", pin, user)
        //     s.reply(userName+"上车成功。")
        //     return;
        // } else if (s.getPlatform() == "tg") {
        //     //bucketSet('pinTG', pin, user)
        //     yuanter.set("pinTG", pin, user)
        //     s.reply(userName+"上车成功。")
        //     return;
        // }
    }else {
        s.reply(result.msg + "，请重新登录！");
        return;
    }

}
main()