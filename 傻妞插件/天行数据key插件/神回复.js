// [rule: 神回复]
// [rule: raw ([\s\S]*)神回复([\s\S]*)]

//自行替换key
var key = "e74140d49da96aa20021e8661bff3e83"
var api = "http://api.tianapi.com/godreply/index";

function main() {
    var url = api + "?key="+key
    red = request({
        url: url,
		dataType: "json",
    })
	if(red.code == 200){
		sendText(red.newslist[0].title + "\n" +red.newslist[0].content)
	}
}

main()