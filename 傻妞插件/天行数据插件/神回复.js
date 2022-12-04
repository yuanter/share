// [rule: 神回复]
// [rule: 神评]
// [rule: raw ([\s\S]*)神回复([\s\S]*)]

var key = get("txdata")
if(!key || key == "" || key == null){
	//自行替换key
	key = "e74140d49da96aa20021e8661bff3e83"
}
var api = "http://apis.tianapi.com/godreply/index";

function main() {
    var url = api + "?key="+key
    red = request({
        url: url,
		dataType: "json",
    })
	if(red.code == 200){
		sendText(red.result.title + "\n\n神评：" +red.result.content)
	}
}

main()
