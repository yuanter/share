
// 扭一扭
// [rule: 视频]
// [rule: 扭一扭]
// [rule: 扭]


function main() {
    var url = "https://v.nrzj.vip/video.php?t=" + Date.now();
    data = request({
		url: url,
		dataType: "location",
	});
    sendVideo(data)
}

main()