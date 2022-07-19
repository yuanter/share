//[rule: 菜单]
function main() {
    var menu = [];
    menu.push({ "菜单": "菜单" });
	menu.push({ "刷步数": "刷步数" });
    menu.push({ "新闻": "早报" });
	menu.push({ "夸人": "夸人" });
	menu.push({ "夸我": "夸我 " });
    menu.push({ "骂人": "骂人" });
	menu.push({ "热搜": "热搜" });
	menu.push({ "小说": "小说 遮天" });
    menu.push({ "壁纸": "小姐姐" });
	menu.push({ "壁纸": "二次元" });
	menu.push({ "菜谱": "菜谱 麻辣清江鱼" });
	menu.push({ "猜成语": "猜成语" });
	menu.push({ "抖音去水印": "发抖音链接" });
	menu.push({ "颜值鉴定": "颜值" });
    menu.push({ "随机音乐": "随机音乐" });
    menu.push({ "摸鱼日记": "摸鱼" });
	menu.push({ "成语接龙": "成语接龙" });
    menu.push({ "限免游戏": "限免游戏" });
    menu.push({ "京东比价": "发京东商品链接" });
    menu.push({ "抓绿钻ck": "抓绿钻ck" });
	menu.push({ "QQ图片转链接": "传图" });
	menu.push({ "QQ查手机号": "QQ查手机 35641144" });
	menu.push({ "百度搜索": "百度 需要搜索的内容" });
	menu.push({ "历史上的今天": "历史上的今天" });
	menu.push({ "小爱同学": "小爱同学 我帅吗？ 或者 小爱 我帅吗？" });
	menu.push({ "赞助": "打赏" });
	
    var menuStr = "";
    var max = 6;
    //排序菜单多在下少在上
    var len = menu.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            // 相邻元素两两对比，元素交换，大的元素交换到后面
            var key1;
            var key2;
            for (key1 in menu[j]) {  
            }
            for (key2 in  menu[j + 1]) {  
            }
            if (key1.length > key2.length) {
                var temp = menu[j];
                menu[j] = menu[j + 1];
                menu[j + 1] = temp;
            }
        }
    }
    //获取最大长度
    for (const key in menu[menu.length - 1]) {
        if (key.length >= max) {
            max = key.length + 1;
        }
    }
    for (let index = 0; index < max; index++) {
        if (index == Math.floor(max / 2)) {
            menuStr += "—机器人菜单—";
        } else {
            menuStr += "—";
        }
    }
    menuStr += "\n";
    for (let index = 0; index < max; index++) {
        if (index == Math.floor(max / 2)) {
            menuStr += "右面为用法示例";
        } else {
            menuStr += "—";
        }
    }
    menuStr += "\n";
    menu.forEach(item => {
        for (const key in item) {
            var left = key;
            var right = item[key];
            if (key.length < max) {
                for (let index = 0; index < max - key.length; index++) {
                    left += "—";
                }
            }
            menuStr += left + right + "\n"
        }
    });
    sendText(menuStr);
}
main();
