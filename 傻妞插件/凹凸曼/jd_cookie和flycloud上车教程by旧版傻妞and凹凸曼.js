// 作者 院长
// @author https://t.me/yuanter_res
// @create_at 2023-03-15 1:56:25
// @version v1.0.0
// @title jd_cookie|flycloud上车教程
// @description jd_cookie或者flycloud(飞云)上车教程文档
// [rule: raw ^(文档教程|上车教程|通用教程|京东教程|使用教程|jd_cookie教程|flycloud教程)$]
// [priority:99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999]
// [disable: false] 是否禁用
// [admin: false] 是否只允许管理员使用


// 设置jd_cookie或者flycloud地址，傻妞口令用法，对傻妞回复命令
// set otto jd_cookieAddr http://xxx.xxx.xxx.xxx:1170   记得地址后面不带斜杆


var addr = get("jd_cookieAddr")
if (!addr || addr == "" || addr == null) {
    //自行替换,如果未设置信息，请手动在这修改成自己jd_cookie的ip地址和端口，最后面不要带“/” ，不然会出错！
    addr = "XXX"
}
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
        //去除那些标签
        notice = notice.replace(/<br><br>+/g,"\n").replace(/<br>+/g,"\n").replace(/<br\/>+/g,"\n").replace(/<.*?>/g,"")
        sendText("京东CK上车教程\n"+notice)
    }
    if(tip != ""){
        tip = tip.replace(/<br><br>+/g,"\n").replace(/<br>+/g,"\n").replace(/<br\/>+/g,"\n").replace(/<.*?>/g,"")
        sendText("通用CK上车教程\n"+tip)
    }
    return;
}
main()