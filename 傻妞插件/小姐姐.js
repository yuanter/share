//[rule: 小姐姐]
//[rule: 小妹妹]
//[rule: 姐姐]
//[rule: 妹妹]
// 作者：院长(yuanter)

function main() {
	var url = "http://api.btstu.cn/sjbz/zsy.php";
	var red = request({ 
		url: url,
		dataType: "location",
	})
	sendImage(red)
}

main();