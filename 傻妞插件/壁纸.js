//[rule: 壁纸]
//[rule: 二次元]
// 作者：院长(yuanter)

function main() {
	var url = "https://acg.toubiec.cn/random.php";
	var red = request({ 
		url: url,
		dataType: "location",
	})
	sendImage(red)
}

main();