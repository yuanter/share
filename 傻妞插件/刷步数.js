// [rule: 步数 ]
// [rule: 刷步数 ]


function main() {
    var userID = GetUserID()//发送人用户id
	var userName = GetUsername()
	var user = "[CQ:at,qq=" + userID + ",text=@" + userName + "]\n" ;
	
    sendText(user +"请输入小米运动账号(按q退出)：")
    var nu = input(60000)
    if (nu == "") {
        return sendText(user +"操作超时，已退出会话。")
        
    }
    if (nu == "q") {
        return sendText(user +"已退出会话。")
    }
    sendText(user +"请在60s内输入密码：")
    var com = input(60000)
    if (com == "") {
        return sendText(user +"操作超时，已退出会话。")
    }
    if (com == "q") {
        return sendText(user +"已退出会话。")
    }
    sendText(user +"请在60s内输入步数：")
    var cn = input(60000)
    if (cn == "") {
        return sendText(user +"操作超时，已退出会话。")
    }
    if (cn == "q") {
        return sendText(user +"已退出会话。")
    }
    var data = request({
        url: "http://101.35.190.155:8080/mi?phoneNumber="  + nu + "&password=" + com + "&steps=" + cn+"&mode=noSave&minSteps=&maxSteps=&isSave=false",
        "dataType": "json"
    })
    
	
     if (data.code == 0) {
        return sendText(user + data.data )
}
    
    else if (data.code != 0){
        return sendText(user +data.msg)
}
    
}    
   
    
 main()