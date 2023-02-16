// 作者 院长
// @author https://t.me/yuanter_res
// @create_at 2022-12-01 01:16:25
// @version v1.0.0
// @title jd_cookie_通用CK登录
// @description jd_cookie 通用CK登录，配合jd_cookie接口
// [rule: raw ^(通用CK登陆|通用CK登录|通用CK提交)$]
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
    //获取通用CK的列表，不在列表名单禁止提交
    var configUrl = "/jd/config"
    var configData = request({
        url: addr + configUrl,
        method: "GET",
    })

    let config = JSON.parse(configData)
    if(config.code != 0){
        sendText("上车服务器错误，已退出")
        return;
    }

    var list = Array.from(config.data.nameList);
    console.log("list.length",`${list.length}`)
    var replyStr = "请回复需要提交的通用CK类型(输入“q”随时退出会话。)\n";
    var numList = [];
    for(var i = 0; i < `${list.length}`;i++){
        replyStr += (i+1)+"、"+list[i]+"\n";
        //存数组下标
        numList.push(i+1+"");
    }
    console.log("numList",numList)
    sendText(replyStr);

    var num = input(60000).replace(/\s+/g,"");
    if(!num || num == "q" || num == "Q"){
        sendText("已退出")
        return;
    }
    let index = numList.indexOf(num);
    console.log("index",index)
    if(index < 0 || index == -1){
        sendText("选择不正确，已退出会话");
        return;
    }

    let choosevalue = numList.find(item => {
        return item == num;
    });
    console.log("choosevalue",choosevalue)


    sendText("请提交CK(输入“q”随时退出会话。)");
    var ck = input(60000).replace(/\s+/g,"");
    if(!ck || ck == "q" || ck == "Q"){
        sendText("已退出")
        return;
    }

    sendText("请输入备注（必填，后台用于筛选账号）：");
    var remarks = input(60000);

    if(remarks == "" || remarks ==null || !remarks){
        sendText("当前未输入备注，请再次输入备注")
        remarks = input(60000);
        if(remarks == "" || remarks ==null || !remarks){
            sendText("未填入备注，退出本次会话")
            return;
        }
    }

    sendText("正在提交，请稍后......")
    // 提交CK到jd_cookie
    var ckPutUrl = "/ty/putCK"
    var ckPutBody = {
        name: list[choosevalue-1],
        key: key,
        remarks: remarks,
        value:ck
    }
    console.log(ckPutBody)
    var ckPutResult = request({
        url: addr + ckPutUrl,
        method: "POST",
        dataType: "json",
        body: ckPutBody
    })
    console.log(ckPutResult)
    sendText(ckPutResult.msg)
    sendText("本次会话会话结束")


    return;
}
main()