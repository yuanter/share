//音乐搜索
//[priority: 1]优先级
// [rule: 听 ?]
// [rule: 点歌 ?]
// [rule: 听歌 ?]
// [rule: raw ^点歌([\s\S]*)]
//[imType:qq] 白名单
function main() {
    var chatID = GetChatID()
	var userID = GetUserID()//发送人用户id
	var userName = GetUsername()
	var user = "[CQ:at,qq=" + userID + ",text=@" + userName + "]\n" ;
    var keyword = encodeURI(param(1))
	var data = request({
					   url: "http://muvip.cn/api/qqyy1.php?msg=" + keyword + "&n=1",
					   "method": "get",
					   "dataType": "json",
				})
	var ID = data.id
	if (ImType() == "qq") {
		sendText(user)
		sendText("[CQ:music,type=qq,id=" + ID + "]")
	} else {
		var content =data.wx
		sendText(content)
	}
}
main()