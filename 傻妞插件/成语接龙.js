//成语接龙
// [rule: 成语接龙]


function start() {
	var red = request({
		url: "http://xiaoapi.cn/API/cyjl.php?id=182&msg=开始成语接龙"
	})
	return red
}

function addIdiom(msg) {
	var red = request({
		url: "http://xiaoapi.cn/API/cyjl.php?id=182&msg=我接"+msg
	})
	return red
}

function main () {
	//开始
	var startStr = start();
	sendText(startStr + "\n(输入“q”随时退出会话。)")
	boolean flag = true;
	while(flag){
		str = input(300000)
		if(!str || str == "q" || str == "Q"){
			sendText("已退出")
			flag = false
			return;
		}
		//接龙
		str = addIdiom(str)
		switch(str) {
			case '抱歉，不对哦！':
				sendText("回答不正确,\n请继续成语接龙\n退出，请回复【q】")
				flag = false
				main()
				break
			case 'q':
				flag = false
				return sendText("已退出游戏")
				break
			default:
				//匹配是否已经胜利，胜利则退出
				var rule = /^.*本妞略胜一筹，我赢了哦！$/
				var isExist = rule.exec(str)
				//存在则已结束
				if(isExist){
					flag = false
					return sendText(str)
				}else{
					sendText(str)
				}
		}
	}
}
main()