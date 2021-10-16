var clietInfo = {

    //查询已有的用户信息
    query:function () {
        var iden = $("#identity").val().substring(2,4);
        var data;
        var flag = false;
        if (iden == "职员"){
            data = {userId:$("#userId").val()};
        }else {
            data = {};
            flag = true;
        }
        crmajax.ajax({
            url:"query.client",
            type:"post",
            data:data,
            success:function (data) {//data已经是json数据
                if(!flag){//职员
                    if (data == ""){
                        sweetAlert.caution("温馨提示","请尽快发展客户")
                    }else {
                        clientInfoMain.datatablesDestroy()
                        $("#client_info_table tbody").empty()
                        for (var i = 0; i < data.length; i++) {
                            clietInfo.addTr(data[i]);
                        }
                   clientInfoMain.datatablesCreate()
                    }
                }else {//经理或老板
                   if (data == ""){
                       sweetAlert.caution("温馨提示","请尽快发展客户")
                   }else {
                       data = data.substring(3,data.length);
                       var clisusers = data.split("crmuser");
                       var clis = clisusers[0];
                       var users = clisusers[1];
                       var jsonClis = JSON.parse(clis);
                       var jsonUsers = JSON.parse(users);
                      clientInfoMain.datatablesDestroy()
                       $("#client_info_table tbody").empty()
                       for (var i = 0; i < jsonClis.length; i++) {
                           clietInfo.addTr(jsonClis[i],jsonUsers[i]);
                       }
                   clientInfoMain.datatablesCreate()
                   }
                }
            },
            error:function (data) {
                sweetAlert.caution("未知错误",data)
            }
        })
    },

    //添加一行用户信息
    addTr:function (info,user) {
        var rank; //1：潜在客户 2：合作伙伴 3：忠实客户 4：代理商 5：战略合作
        switch (info.rank) {
            case 1:
                rank = "潜在客户";
                break;
            case 2:
                rank = "合作伙伴";
                break;
            case 3:
                rank = "忠实客户";
                break;
            case 4:
                rank = "代理商";
                break;
            case 5:
                rank = "战略合作";
                break;
            default:
                rank = "待定";
                break;
        }
        var star;//分五级用★表示
        switch (info.creditGrade) {
            case 1:
                star = "★";
                break;
            case 2:
                star = "★★";
                break;
            case 3:
                star = "★★★";
                break;
            case 4:
                star = "★★★★";
                break;
            case 5:
                star = "★★★★★";
                break;
            default:
                star = "待定";
                break;
        }
        var sta;//0：活跃客户1：跟进客户2：流失客户
        switch (info.status) {
            case 0:
                sta = "活跃客户";
                break;
            case 1:
                sta = "跟进客户";
                break;
            case 2:
                sta = "流失客户";
                break;
            default:
                sta = "待定";
                break;
        }
        var del = '<a href="javascript:void(0);" disabled="false" onClick="clientInfoMain.delClient('+info.clientId+')" title="删除"><i class="fa fa-trash-o"></i></a>';
        if ($("#identity").val().substring(2) == "职员"){
            del = '';
        }
        var receive = "";
        if (info.receiveState == 2 || info.receiveState == "2"){
            receive = "&nbsp;&nbsp;（共享工号:"+info.receiveId+"）"
        }
        if (user != null || user!=undefined){
            $("#client_info_table tbody").append($('<tr id="clientTr'+info.clientId+'" data-index="0" name="'+user.userId+'"> ' +
                '<td class="bs-checkbox"><input data-index="0" id="checkbox'+info.clientId+'" name="btSelectItem" type="checkbox" class="itemSelect"></td>' +
                '<td style=""><a class="like" href="javascript:void(0);" title="客户名称">'+info.clientName+'(序号:'+info.clientId+',负责人:'+user.realName+',工号:'+user.userId+')'+receive+'</a></td>' +
                ' <td style="">'+info.workAddress+'</td>' +
                '<td style="">'+info.mainPhone+'</td>' +
                '<td style="">'+rank+'</td>' +
                '<td style=""><span style="color:#f0b80e;">'+star+'</span></td>' +
                '<td style="">'+info.creditLimit+'</td>' +
                '<td style="">'+sta+'</td>' +
                '<td style=""><a class="like" href="#">'+info.companyHome+'</a></td>' +
                '<td style="width: 80px; "><a href="javascript:void(0);" disabled="false" onClick="clientInfoMain.updClient('+info.clientId+')" title="修改" style="margin-left: 10px;margin-right: 10px;"><i class="fa fa-wrench"></i></a>'+del+'</td>; </tr>'));
        }else {
            $("#client_info_table tbody").append($('<tr id="clientTr'+info.clientId+'" data-index="0"> ' +
                '<td class="bs-checkbox"><input data-index="0" id="checkbox'+info.clientId+'" name="btSelectItem" type="checkbox" class="itemSelect"></td>' +
                '<td style=""><a class="like" href="javascript:void(0);" title="客户名称">'+info.clientName+'(序号:'+info.clientId+')'+receive+'</a></td>' +
                ' <td style="">'+info.workAddress+'</td>' +
                '<td style="">'+info.mainPhone+'</td>' +
                '<td style="">'+rank+'</td>' +
                '<td style=""><span style="color:#f0b80e;">'+star+'</span></td>' +
                '<td style="">'+info.creditLimit+'</td>' +
                '<td style="">'+sta+'</td>' +
                '<td style=""><a class="like" href="#">'+info.companyHome+'</a></td>' +
                '<td style="width: 80px; "><a href="javascript:void(0);" disabled="false" onClick="clientInfoMain.updClient('+info.clientId+')" title="修改" style="margin-left: 10px;margin-right: 10px;"><i class="fa fa-wrench"></i></a>'+del+'</td>; </tr>'));
        }

    },

    update:function (clientId,newInfo) {
        $("#client_info_table #clientTr" + clientId + " td:eq(1) a").text(newInfo.clientName);
        $("#client_info_table #clientTr" + clientId + " td:eq(2)").text(newInfo.workAddress);
        $("#client_info_table #clientTr" + clientId + " td:eq(3)").text(newInfo.mainPhone);
        var rank; //1：潜在客户 2：合作伙伴 3：忠实客户 4：代理商 5：战略合作
        switch (parseInt(newInfo.rank)) {
            case 1:
                rank = "潜在客户";
                break;
            case 2:
                rank = "合作伙伴";
                break;
            case 3:
                rank = "忠实客户";
                break;
            case 4:
                rank = "代理商";
                break;
            case 5:
                rank = "战略合作";
                break;
            default:
                rank = "待定";
                break;
        }
        $("#client_info_table #clientTr" + clientId + " td:eq(4)").text(rank);
        var star;//分五级用★表示
        switch (parseInt(newInfo.creditGrade)) {
            case 1:
                star = "★";
                break;
            case 2:
                star = "★★";
                break;
            case 3:
                star = "★★★";
                break;
            case 4:
                star = "★★★★";
                break;
            case 5:
                star = "★★★★★";
                break;
            default:
                star = "待定";
                break;
        }
        $("#client_info_table #clientTr" + clientId + " td:eq(5) span").text(star);
        $("#client_info_table #clientTr" + clientId + " td:eq(6)").text(newInfo.creditLimit);
        var sta;//0：活跃客户1：跟进客户2：流失客户
        switch (parseInt(newInfo.status)) {
            case 0:
                sta = "活跃客户";
                break;
            case 1:
                sta = "跟进客户";
                break;
            case 2:
                sta = "流失客户";
                break;
            default:
                sta = "待定";
                break;
        }
        $("#client_info_table #clientTr" + clientId + " td:eq(7)").text(sta);
        $("#client_info_table #clientTr" + clientId + " td:eq(8) a").text(newInfo.companyHome);
        $("#client_info_table #clientTr" + clientId + " td:eq(8) a").attr("href",newInfo.companyHome);
    }
}