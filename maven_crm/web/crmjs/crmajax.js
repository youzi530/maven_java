var crmajax = {

     ajax:function(obj){
    // 做网络请求的时候,参数以"对象"的形式传递进来
    // 规定: obj是一个json对象，里面包含属性:

    //获取到ajax对象
    var ajaxObj = null;
    if (window.XMLHttpRequest) {
        ajaxObj = new XMLHttpRequest();
    } else {
        ajaxObj = new ActiveObject("Microsoft.XMLHTTP");
    }
    // 检测状态的变化
    ajaxObj.onreadystatechange = function() {
        if (ajaxObj.readyState == 4) {
            if (ajaxObj.status >= 200 && ajaxObj.status < 300
                || ajaxObj.status == 304) {
                //成功获取到后台传输过来的数据并且绑定到success中
                if (obj.success) {
                    //如果是普通的消息，请在数据上加一个msg标识符
                    if(ajaxObj.responseText.indexOf("msg")>=0){
                        obj.success(ajaxObj.responseText);
                        //如果是json的消息，不需要任何操作
                    }else{
                        //调用success回调函数，并且把后台发送来的数据进行json解析
                        obj.success(JSON.parse(ajaxObj.responseText));
                    }
                } else {
                    alert("您忘记了 success 函数");
                }
            } else {
                if (obj.error) {
                    obj.error(ajaxObj.status);
                } else {
                    alert("您忘记了 error 函数");
                }
            }
        }
    }
    //如果没写type，默认为get
    var type = obj.type || "get";
    // type 转化为小写
    type = type.toLowerCase();
    // 判断是否传递了参数
    //定义一个params变量
    var params = "";
    //按照我们定义的格式来解析你传输的参数，解析完成之后再进行字符串的拼接
    if (obj.data) {
        for ( var key in obj.data) {
            params += (key + "=" + obj.data[key] + "&");
        }
        //处理字符串最后的&符号
        params = params.slice(0, params.length - 1);
    }
    //判断请求如果是get的话，发送ajax的get方式的请求
    if (type == "get") {
        ajaxObj.open(type, obj.url + "?" + params, true);
        ajaxObj.send(null);
        //判断如果请求是post的话，发送ajax的post方式的请求
    } else {
        ajaxObj.open(type, obj.url, true);
        ajaxObj.setRequestHeader("Content-Type",
            "application/x-www-form-urlencoded");
        ajaxObj.send(params);
    }
}
}