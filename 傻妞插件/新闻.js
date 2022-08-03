// [rule: ^新闻$]
// [rule: ^早报$]
// [cron: 0 7 * * *]


//qq群组在此修改
var groupCodeQQ = 202228934;//此处修改成你的qq群组ID
var imTypeQQ =  "qq";
//wx群组在此修改
var groupCodeWX = 18358776568;//此处修改成你的wx群组ID
var imTypeWX =  "wx";
//tg群组在此修改
var groupCodeTG = "-10457576672";//此处修改成你的tg群组ID
var imTypeTG =  "tg";

var data = request({ url: "https://api.2xb.cn/zaob", dataType: "json" }).imageUrl;
//图文消息
var content = image(data) ;
var imType = ImType();
if (imType == "fake") {
    var groups = [{
        imType: imTypeTG,
        groupCode: groupCodeTG,
    },{
        imType: imTypeQQ,
        groupCode: groupCodeQQ,
    },{
        imType: imTypeWX,
        groupCode: groupCodeWX,
    }
]
    for (var i = 0; i < groups.length; i++) {
        groups[i]["content"] = content
        push(groups[i])
    }
} else {
    sendImage(request({ url: "https://api.2xb.cn/zaob", dataType: "json" }).imageUrl)
}
