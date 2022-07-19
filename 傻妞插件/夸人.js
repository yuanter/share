// 作者QQ1483081359
// [rule: 夸我 ]
// [rule: 夸人 ]
main()



function main() {
    var data1 = request({ 
        "url": "https://api.shadiao.app/chp" , 
        "method": "get", 
        "dataType": "json" 
    })
   var data2 = request({ 
        "url": "https://api.shadiao.app/chp" , 
        "method": "get", 
        "dataType": "json" 
    })
    var data3 = request({ 
        "url": "https://api.shadiao.app/chp" , 
        "method": "get", 
        "dataType": "json" 
    })
 
        
    sendText(data1.data.text)
    sendText(data2.data.text)
    sendText(data3.data.text)
    
}

  
main()

