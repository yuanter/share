//[rule: ai ?] 匹配规则，多个规则时向下依次写多个
//[admin: false] 是否为管理员指令
//[disable: false] 禁用开关，true表示禁用，false表示可用
//[priority: 2147483646] 优先级，数字越大表示优先级越高，不超过2147483647
//[show: openAI人工智障，需设置token] 自定义插件说明
//原作者author https://t.me/sillyGirl_Plugin


//请在openAI官网登陆完成后，点击右上角头像-View API keys创建token，并使用命令'set otto openAI_token ?'设置token


function main(){
    let token=get("openAI_token")
    if(!token){
        sendText("请使用命令'set otto openAI_token ?'设置openAI的token")
        return
    }
    let text=param(1)
    if(text.match(/(\u753b|\u6765)(\u5f20|\u4e2a)\S+\u56fe?/)){
        let data=ImageGenerations(token,{
            "prompt": text,
            "n": 1,
            "size": "512x512"
        })
        try{
            image(data.data[0].url)
        }
        catch(err){
            sendText("未知错误:\n"+JSON.stringify(data))
        }
    }
    else
        Talk(token,text)
}




function Talk(token,text){
    let limit=50
    while(limit-->0){
        let tipid=sendText("请稍后，正在加载中...")
        let data=Completions(token,{
            "model": "text-davinci-003", 
            "prompt": text,
            "temperature": 0, 
            "max_tokens": 1024
        })
        //sendText("到这了，数据："+JSON.stringify(data))
        RecallMessage(tipid)
        //console.log(JSON.stringify(data))
        if(!data){
            sendText("网络错误")
            break
        }
        else{
            if(data.error){
                sendText(data.error.message)
                break
            }
            else{
                try{
                    sendText(data.choices[0].text)
                }
                catch(err){
                    sendText("未知错误\n"+JSON.stringify(data))
                }
            }
        }
      let next=input(60000)
      if(!next || next=="q"){
        sendText("退出对话")
        break
      }
      text = next
      //sendText("新输入的词语："+text)
    }
}

/*************
 {
  "prompt": string（描述提示）,
  "n": 图片生成数量,
  "size": 图片尺寸('256x256', '512x512', '1024x1024')
}
 *************/
function ImageGenerations(token,body){
	try{
		let data=request({
			url:"https://api.openai.com/v1/images/generations",
			method:"post",
			headers:{
				accept: "application/json",
				Authorization:"Bearer "+token
			},
          body:body
		})
		return JSON.parse(data)
	}
	catch(err){
		return null
	}
}



/**
 * body={
 *      model:使用模型,
 *      prompt:ai提示，无此项则开启新会话
 *      ...
 * }
 */

function Completions(token,body){
	try{
		let data=request({
          url:"https://api.openai.com/v1/completions",
          method:"post",
          headers:{
				accept: "application/json",
				Authorization:"Bearer "+token
          },
          body:body
		})
		return JSON.parse(data)
	}
	catch(err){
		return null
	}
}

function GetModels(token){
	try{
		let data=request({
			url:"https://api.openai.com/v1/models",
			method:"get",
			headers:{
				accept: "application/json",
				Authorization:"Bearer "+token
			}
		})
		return JSON.parse(data)
	}
	catch(err){
		return null
	}
}

main()