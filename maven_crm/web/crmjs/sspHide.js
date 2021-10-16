var sspHide = {

    hide:function (data) {
        $("#menuUL > li:eq(0)").css("display","none");
        $("#menuUL > li:eq(4)").css("display","none");
        $("#menuUL > li:eq(7)").css("display","none");
        var identity = data.substring(2,data.length)
        if(identity == "职员" ){
            $("button:eq(1)").css("display","none");
        }
    }

}