/**
* @author 烟雨
 * @origin 烟雨阁
* @create_at 2022-09-07 18:50:37
* @title 扭一扭
* @platform qq wx tg pgm web
* @rule 扭一扭
* @priority 100
 * @public false
* @description 随机抖音视频
* @version v1.0.1
* @icon https://www.yanyuwangluo.cn/yanyu.ico
*/

//烟雨阁
//https://www.yanyuwangluo.cn



//sender
const s = sender
const sillyGirl = new SillyGirl()

var { body } = request({
    url: "https://api.aipipi.net/api/xiaojiejie.php",
    method: "get",
    dataType: "json", //指定数据类型
})

console.info(body.url)
s.reply(video(body.url))