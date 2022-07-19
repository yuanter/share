// [rule: 扭一扭]

function main() {
    var url = "http://api.qemao.com/api/douyin/"
    red = request({
        url: url,
        dataType: "location",
    })
    if (red.indexOf("./") != -1) {
        url = url + red.replace("./", "")
        sendVideo(url)
    }
}

main()