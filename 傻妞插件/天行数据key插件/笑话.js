// [rule: 笑话]
// [rule: 冷笑话]
// [rule: 讲笑话]
// [rule: raw ([\s\S]*)笑话([\s\S]*)]
// [rule: raw ([\s\S]*)讲笑话([\s\S]*)]
// [rule: raw ([\s\S]*)冷笑话([\s\S]*)]

//自行替换key
var key = "e74140d49da96aa20021e8661bff3e83"
var api = "http://api.tianapi.com/joke/index";

function main() {
    var url = api + "?key="+key+"&num=1"
    red = request({
        url: url,
		dataType: "json",
    })
	if(red.code == 200){
		sendText(red.newslist[0].title+"\n"+red.newslist[0].content)
	}
}

main()