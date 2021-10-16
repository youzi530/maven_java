var clientHide = {

    hide:function (data) {
        $("#menuUL > li:eq(1)").css("display","none");
        $("#menuUL > li:eq(2)").css("display","none");
        $("#menuUL > li:eq(3)").css("display","none");
        $("#menuUL > li:eq(4)").css("display","none");
        $("#menuUL > li:eq(7)").css("display","none");
        var identity = data.substring(2,data.length)
        if(identity == "职员" ){
            $("#menuUL > li:eq(0) li:eq(1)").css("display","none");
            $("button:eq(1)").css("display","none");
        }
    }

}