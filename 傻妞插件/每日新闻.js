// [rule: 新闻]
// [cron: 30 8 * * *]

//修改这里的群组
//qq群组在此修改
var groupCodeQQ = 202228934;//此处修改成你的qq群组ID
var imTypeQQ =  "qq";
//wx群组在此修改
var groupCodeWX = 18358776568;//此处修改成你的wx群组ID
var imTypeWX =  "wx";
//tg群组在此修改
var groupCodeTG = -10457576672;//此处修改成你的tg群组ID
var imTypeTG =  "tg";


var content = image("https://api.qqsuu.cn/api/60s") + "\n每日新闻来咯！！！" 
var groups = [
     {
         imType: imTypeQQ,
         groupCode: groupCodeQQ ,//qq群号
     }
	 //后续在此新增即可
]

for (var i = 0; i < groups.length; i++) {
    groups[i]["content"] = content
    push(groups[i])
}