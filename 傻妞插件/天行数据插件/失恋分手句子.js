// [rule: 失恋]
// [rule: 分手]
// [rule: raw ([\s\S]*)分手([\s\S]*)]
// [rule: raw ([\s\S]*)失恋([\s\S]*)]

var key = get("txdata")
if(!key || key == "" || key == null){
	//自行替换key
	key = "e74140d49da96aa20021e8661bff3e83"
}
var api = "http://api.tianapi.com/hsjz/index";

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