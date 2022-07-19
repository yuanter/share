// [rule: 灯谜]
// [rule: 谜语]
// [rule: 猜灯谜]
// [rule: 猜谜语]
// [rule: raw ([\s\S]*)猜谜语([\s\S]*)]
// [rule: raw ([\s\S]*)猜灯谜([\s\S]*)]

//自行替换key
var key = "e74140d49da96aa20021e8661bff3e83"
var api = "http://api.tianapi.com/caizimi/index";


function listen() {
	var url = api + "?key="+key
    red = request({
        url: url,
		dataType: "json",
    })
	if(red.code == 200){
		var json = red.newslist[0]
		return [json.riddle,json.type,json.disturb,json.answer,json.description]
	}
}

function main() {
    answer = listen()
	sendText("谜面："+answer[0]+"\n"+answer[1])
	str = input()
	if(!str || str == "q" || str == "Q"){
        sendText("已退出")
        return;

    }
	switch(str) {
		case answer[3]:
			sendText("恭喜你回答正确,答案正是"+answer[3]+"\n解谜面思路："+answer[4])
			sendText("请继续猜谜语\n退出，请回复【q】")
			main()
			return
			break
		case 'q':
			return sendText("已退出游戏")
			break
		default:
			sendText("回答错误，提示:"+answer[2])
			for(var i = 0; i < 6; i++){
				a = input()
				switch(a) {
					case answer[3]:
						sendText("恭喜你回答正确,答案正是"+answer[3]+"\n解谜面思路："+answer[4])
						sendText("请继续猜谜语\n退出，请回复【q】")
						break
					case 'q':
						return sendText("已退出游戏") 
					default:
						sendText("回答错误，提示:\n"+answer[2])
				}
			}
			return sendText("回答错误次数太多，已结束游戏，正确答案为：" + answer[3]+"\n解谜面思路："+answer[4])
	}
}

main()