// [rule: 语音 ?]
// [rule: 快说?]
// [rule: 说 ?]
// [rule: 说?]
// [rule: 。?]
// [rule: -?]
//[priority: -116]优先级	
//[imType:qq] 白名单
//院长(yuanter)

//------------------------------------ 按照注释，可自行修改下面的接口 ------------------
//开始
//当type为baidu和xunfei时该值有效，
//其中为百度时，id值为1~8，分别为度逍遥-磁性男声、度博文-情感男声、度小贤-情感男声、度小鹿-甜美女声、度灵儿-清澈女声、度小乔-情感女声、度小雯-成熟女声、度米朵-可爱女童；
//当为讯飞时，id值为1~20，分别为讯飞-七哥（男声）、讯飞-子晴（女声）、讯飞-一菲（女声）、讯飞-小露（女声）、讯飞-小鹏（男声）、讯飞-萌小新（男声）、讯飞-小雪（女声）、讯飞-超哥（男声）、讯飞-小媛（女声）、讯飞-叶子（女声）、讯飞-千雪（女声）、讯飞-小忠（男声）、讯飞-万叔（男声）、讯飞-虫虫（女声）、讯飞-楠楠（儿童-男）、讯飞-晓璇（女声）、讯飞-芳芳（儿童-女）、讯飞-嘉嘉（女声）、讯飞-小倩（女声）、讯飞-Catherine（女声-英文专用）

//百度(需要使用请关闭下面的注释)
var type = "baidu"
//讯飞(默认使用，不需要请注释掉)
//var type = "xunfei"
//按上面的注释填写对应的声音
var id = "5"

//结束
//------------------------------------ 按照注释，可自行修改上面的接口 ------------------


function main() {
    var qqID = GetUserID()
    var text = param(1)
    var username = GetUsername() //获取用户
	var url = "http://xiaoapi.cn/API/zs_tts.php?type="+type+"&msg="+text+"&id="+id
	var durl = request({
            url: url,
            "dataType": "json",
        })
	var mcurl = durl.tts
    //var url = "http://tts.youdao.com/fanyivoice?word="+text+"&le=zh&keyfrom=speaker-target"
    //var burl = encodeURI(url)
    //var durl = request({
    //        url: "http://xiaoapi.cn/API/dwz.php?url=" + burl.replace(/&/g, "%26")
    //    })
   //var mcurl = durl
   //用户头像
    var userimg = "https://q1.qlogo.cn/g?b=qq&s=100&nk=" + qqID;
    var txurl = encodeURI(userimg)
    var tdurl = request({
            url: "http://xiaoapi.cn/API/dwz.php?url=" + txurl.replace(/&/g, "%26")
        })
   var useimg = tdurl
   var a = "[CQ:xml,data=<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\" ?><msg serviceID=\"2\" templateID=\"12345\" action=\"web\" brief=\"&#91;新消息&#93;"
   var b = "\" sourceMsgId=\"0\" url=\""
   var c = "\" flag=\"0\" adverSign=\"0\" multiMsgFlag=\"0\"><item layout=\"2\"><audio cover=\""
   var d = "\" src=\""
   var e = "\" /><title>你有一条新消息请查收！</title><summary>"
   var f = text + "\n    --"+username +" \n你可以点击卡片收听！</summary></item><source name=\"院长修改\" icon=\"https://m.360buyimg.com/babel/jfs/t1/69731/23/21067/11864/62d63571E4830b8c4/1d0d9cb855c7ef1e.jpg\" action=\"app\" appid=\"1101079856\" /></msg>,type=normal]"
sendText(a+ text +b+mcurl +c+useimg+d+mcurl +e+f)
}
main() 