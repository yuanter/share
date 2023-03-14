// 作者 院长
// @author https://t.me/yuanter_res
// @create_at 2023-03-15 1:56:25
// @version v1.0.0
// @title jd_cookie|flycloud上车教程
// @description jd_cookie或者flycloud(飞云)上车教程文档
// [rule: raw ^(教程|上车教程|通用教程|京东教程|使用教程|jd_cookie教程|flycloud教程)$]
// [priority:99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999]
// [disable: false] 是否禁用
// [admin: false] 是否只允许管理员使用

//当前版本适合配合jd_cookie v16.2以上版本使用
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
    addr = "XXX"
}

var key = get("jd_cookieKey")
if (!key || key == "" || key == null) {
    //自行替换,默认使用第一个容器，从0开始顺序往下数
    key = "0"
}
var tip = get("jd_cookieTip")
if (!tip || tip == "" || tip == null) {
    //自行替换,如果未设置信息，请手动在这修改替换文字
    tip = "通用CK上车咯~"
}



const user = GetUserID()
const userName = GetUsername()
console.log(addr)

function main() {
    var configUrl = "/jd/config"
    var configData = request({
        url: addr + configUrl,
        method: "GET",
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

    var notice = config.data.notice;
    var tip = config.data.tip;

    if(notice != ""){
        sendText(notice)
    }
    if(tip != ""){
        sendText(tip)
    }
    return;
}
main()