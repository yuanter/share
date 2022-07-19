//[rule: 买家秀]
// 作者：院长(yuanter)

function main() {
	var url = "http://api.uomg.com/api/rand.img3";
	var red = request({ 
		url: url,
		dataType: "location",
	})
	sendImage(red)
}

main();