// [rule: 故事]
// [rule: 讲故事]
// [rule: 故事大全]

//自行替换key
var key = "e74140d49da96aa20021e8661bff3e83"
var api = "http://api.tianapi.com/story/index";

function main() {
	var url = api + "?key="+key
	
	/*
	sendText( "请选择故事类型，1成语、2睡前、3童话、4寓言\n(输入“q”随时退出会话。)")
	//故事类型，成语1、睡前2、童话3、寓言4
	type = input(30000)
	if(!type || type == "q" || type == "Q"){
			return sendText("已退出")
	}
	switch(type) {
			case '1':
				type = "1"
				break
			case '2':
				type = "2"
				break
			case '3':
				type = "3"
				break
			case '4':
				type = "4"
				break
			default:
				sendText("默认选择寓言故事")
				type = "4"
	}
    url = api + "?key="+key+"&type="+type
	*/
	
	
	
    red = request({
        url: url,
		dataType: "json",
    })
	if(red.code == 200){
		sendText("　　《"+red.newslist[0].title+"》\n"+red.newslist[0].content)
	}
}

main()