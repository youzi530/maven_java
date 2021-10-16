var introductionMain = {

    //个人信息直接显示
    display:function () {
        crmajax.ajax({
            url:"introduction.userSettings",
            type:"post",
            data:{

            },
            success:function (data) {
                data = data.substring(3,data.length);
                sweetAlert.general("个人简介",data,"关闭",10000)
            },
            error:function (data) {
                sweetAlert("未知错误",data)
            }
        })
    },

    //用户信息设置弹出框
    settings:function () {
        crmajax.ajax({
            url:"setting.userSettings",
            type:"post",
            data:{

            },
            success:function (data) {
                data = data.substring(3,data.length)
                var msg = data.split(",");
                var mobile = msg[0];
                var email = msg[1];
                var content = introductionHTML.settingsHTML();
                commFun.noModel("systemsettingsModel","用户信息设置",700,500,content,introductionMain.submitData,"settings",false);
                $("#systemsettingsModel #mobileInput").val(mobile);
                $("#systemsettingsModel #emailInput").val(email);
            },
            error:function (data) {
                sweetAlert.caution("温馨提示",data)
            }
        })
    },

    /**
     * 提交数据
     */
    submitData: function(type) {
        var modelId = "system" + type + "Model";
        alert(modelId)
       var mobile  = $("#systemsettingsModel #mobileInput").val();
        var eamil = $("#systemsettingsModel #emailInput").val();
        if (mobile == '') {
            sweetAlert.caution("温馨提示", "移动电话不允许为空！");
            return false;
        }
        if (eamil == '') {
            sweetAlert.caution("温馨提示", "电子邮箱不允许为空！");
            return false;
        }


        var res = false;

        introductionController.userInfoChange(mobile,eamil,function (data) {
            if (data != ""){
                sweetAlert.caution("温馨提示",data)
                if ((data == "设置修改成功")){
                    location.reload(true)
                }
                res = true;
            }else {
                sweetAlert.caution("未知错误",data)
            }
        })

        return res;
    },

    /**
     * 初始化
     */
    queryInit: function(){

        //introductionMain.initFun();
    }


}


/**
 * bootstrap-table event 事件
 */
window.clientEvent = {
    "click .like":function(e,value,row,index){
        introductionMain.clientDetail(row.id, 'detail');
    }
}
window.userEvent = {
    "click .like":function(e,value,row,index){
        sweetAlert.caution("温馨提示：", "此处暂不支持查看用户详情！", "确定", 3000);
    }
}

// $(document).ready(function(){
//     introductionMain.queryInit();
// });