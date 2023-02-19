// [rule: 舔狗日记]

function main() {
    var url = "https://api.ixiaowai.cn/tgrj/index.php"
    var red = request({
      url: url,
    })
    sendText(red)
}

main()