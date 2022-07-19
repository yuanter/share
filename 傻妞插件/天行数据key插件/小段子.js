// [rule: 段子]
// [rule: 讲段子]
// [rule: raw ([\s\S]*)段子([\s\S]*)]
// [rule: raw ([\s\S]*)讲段子([\s\S]*)]

//自行替换key
var key = "e74140d49da96aa20021e8661bff3e83"
var api = "http://api.tianapi.com/mnpara/index";

function main() {
    var url = api + "?key="+key
    red = request({
        url: url,
		dataType: "json",
    })
	if(red.code == 200){
		sendText(red.newslist[0].content)
	}
}

main()
