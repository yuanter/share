// [rule: 脑筋急转弯]
// [rule: 急转弯]
// [rule: raw ([\s\S]*)脑筋急转弯([\s\S]*)]

var key = get("txdata")
if(!key || key == "" || key == null){
	//自行替换key
	key = "e74140d49da96aa20021e8661bff3e83"
}
var api = "http://api.tianapi.com/naowan/index";

function main() {
    var url = api + "?key="+key+"&num=1"
    red = request({
        url: url,
		dataType: "json",
    })
	if(red.code == 200){
		sendText(red.newslist[0].quest+"\n"+red.newslist[0].result)
	}
}

main()