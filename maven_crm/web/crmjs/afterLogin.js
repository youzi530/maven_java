var afterLogin = {

    afterlogin:function () {
        crmajax.ajax({
            url:"identity.do",
            type:"post",
            data:{

            },
            success:function (data) {
               var path = window.location.pathname;
               var pathSplit = path.split("/");
               var htmlName = pathSplit[pathSplit.length-1];

                data = data.substring(3,data.length);
                var datas = data.split(",");
                if ((datas[0] == "供销职员" || datas[0] == "客户职员") && htmlName == "work_manager.html"){
                    $("button:eq(0)").css("display","none");
                    $("button:eq(1)").css("display","none");
                }
                if (datas[0] == "admin"){
                    adminHide.hide()
                }else if (datas[0] == "供销经理"){
                    sspHide.hide(datas[0])
                }else if ((datas[0] == "供销职员")){
                    sspHide.hide(datas[0])
                }else if (datas[0] == "客户经理"){
                    clientHide.hide(datas[0])
                }else if (datas[0] == "客户职员"){
                    clientHide.hide(datas[0])
                }
            },
            error:function (data) {
                sweetAlert.caution("未知错误",data)
            }
        })
    }

}