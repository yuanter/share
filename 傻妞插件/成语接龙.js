//成语接龙
// [rule: 成语接龙]
// 作者：院长(yuanter)

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
	var flag = true
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
				var rule = /([\s\S]*)本妞略胜一筹，我赢了哦！$/
				var isExist = rule.exec(str)
				var rule1 = /([\s\S]*)难倒我了，好吧，你赢了！$/
				var isExist1 = rule1.exec(str)
				//存在则已结束
				if(isExist || isExist1){
					sendText(str)
					flag = false
					sendText("是否继续？按1继续，其他退出")
					str = input(300000)
					if(str == "1" ){
						main()
					}else{
						return sendText("已退出游戏")
					}
				}else{
					sendText(str)
				}
		}
	}
}
main()
