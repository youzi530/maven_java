var vertifyActivity = {

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
            url:"query.vertify",
            type:"post",
            data:data,
            success:function (data) {//data已经是json数据
                if(!flag){//职员
                    if (data == ""){
                        sweetAlert.caution("温馨提示","请尽快联系客户")
                    }else {
                        data = data.substring(3,data.length);

                        var vertifyMsg = data.split("crmuser");
                        var clis = vertifyMsg[0];
                        var shares = vertifyMsg[1];
                        var approves = vertifyMsg[2];

                        var jsonClis = JSON.parse(clis);
                        var jsonShares = JSON.parse(shares);
                        var jsonApproves = JSON.parse(approves);

                        vertifyActivitiMain.datatablesDestroy()
                        for (var i = 0; i < jsonClis.length; i++) {
                            var tr = {clientId:jsonClis[i].clientId,clientName:jsonClis[i].clientName,workAddress:jsonClis[i].workAddress,
                                mainPhone:jsonClis[i].mainPhone,applyerId:$("#userId").val(),applyerName:$("#username").text(), shareId:jsonShares[i].userId,
                                shareName:jsonShares[i].realName,approveId:jsonApproves[i].userId,approveName:jsonApproves[i].realName,
                                receiveState:jsonClis[i].receiveState};
                            vertifyActivity.addTr(tr);
                        }
                        vertifyActivitiMain.datatablesCreate()
                    }
                }else {//经理或老板
                    if (data == ""){
                        sweetAlert.caution("温馨提示","请尽快联系客户")
                    }else {
                        data = data.substring(3,data.length);

                        var vertifyMsg = data.split("crmuser");
                        var clis = vertifyMsg[0];
                        var applys = vertifyMsg[1];
                        var shares = vertifyMsg[2];
                        var approves = vertifyMsg[3];

                        var jsonClis = JSON.parse(clis);
                        var jsonApplys = JSON.parse(applys);
                        var jsonShares = JSON.parse(shares);
                        var jsonApproves = JSON.parse(approves);

                        vertifyActivitiMain.datatablesDestroy()
                        for (var i = 0; i < jsonClis.length; i++) {
                            var tr = {clientId:jsonClis[i].clientId,clientName:jsonClis[i].clientName,workAddress:jsonClis[i].workAddress,
                                mainPhone:jsonClis[i].mainPhone,applyerId:jsonApplys[i].userId,applyerName:jsonApplys[i].realName, shareId:jsonShares[i].userId,
                                shareName:jsonShares[i].realName,approveId:jsonApproves[i].userId,approveName:jsonApproves[i].realName,
                                receiveState:jsonClis[i].receiveState};
                            vertifyActivity.addTr(tr);
                        }
                        vertifyActivitiMain.datatablesCreate()
                    }
                }
            },
            error:function (data) {
                sweetAlert.caution("未知错误",data)
            }
        })
    },

    addTr:function (tr) {

        if ($("#identity").val() == '客户职员'){
            var option = '';
            var approve = ''
            switch (tr.receiveState) {
                case 1:
                    option = '待审核';
                    if (tr.approveName == "未审核"){
                        approve = '<td id="'+tr.approveId+'" style="" name="'+tr.approveName+'">无</td>';
                    }else {
                        approve= '<td id="'+tr.approveId+'" style="" name="'+tr.approveName+'">'+tr.approveId+'(工号:'+tr.approveName+')'+'</td>';
                    }
                    break;
                case 2:
                    option = '同意'
                    approve= '<td id="'+tr.approveId+'" style="" name="'+tr.approveName+'">'+tr.approveId+'(工号:'+tr.approveName+')'+'</td>';
                    break;
                case 3:
                    option = '驳回';
                    approve = '<td id="'+tr.approveId+'" style="" name="'+tr.approveName+'">'+tr.approveId+'(工号:'+tr.approveName+')'+'</td>';
                    break;
            }
            $("#vertify_activity_table tbody").append($('<tr id="vertifyTr'+tr.clientId+','+tr.shareId+'" data-index="0" name="'+tr.shareId+'">' +
                '<td class="bs-checkbox"><input data-index="0" id="checkbox,'+tr.clientId+','+tr.shareId+'" name="btSelectItem" type="checkbox" class="itemSelect"></td>' +
                '<td style=""><a id="'+tr.clientId+'" class="like" href="javascript:void(0);" title="客户姓名" name="'+tr.clientName+'">'+tr.clientName+'(序号:'+tr.clientId+')'+'</a></td>' +
                '<td style="">'+tr.workAddress+'</td>' +
                '<td style="">'+tr.mainPhone+'</td>' +
                '<td id="'+tr.applyerId+'" style="" name="'+tr.applyerName+'">'+tr.applyerName+'</td>' +
                '<td id="'+tr.shareId+'" style="" name="'+tr.shareName+'">'+tr.shareName+'(工号:'+tr.shareId+')'+'</td>' +
                approve+
                '<td style="width: 80px;">' +
                option +
                '</td>  ' +
                '</tr>'))
        }else {
            var option = '<select style="height: 31px"  class="form-control">';
            var approve = '';
            switch (tr.receiveState) {
                case 1:
                    option += '<option id="1" value="待审核" onclick="vertifyActivitiMain.waitApprove('+tr.clientId+','+tr.shareId+')">待审核</option>' +
                        '<option id="2" value="同意" onclick="vertifyActivitiMain.shareApprove('+tr.clientId+','+tr.shareId+')">同意</option>' +
                        '<option id="3" value="驳回" onclick="vertifyActivitiMain.shareTurnDown('+tr.clientId+','+tr.shareId+')">驳回</option></select>';
                    if (tr.approveName == "未审核"){
                        approve = '<td id="'+tr.approveId+'" style="" name="'+tr.approveName+'">无</td>';
                    }else {
                        approve= '<td id="'+tr.approveId+'" style="" name="'+tr.approveName+'">'+tr.approveId+'(工号:'+tr.approveName+')'+'</td>';
                    }
                    break;
                case 2:
                    option += '<option id="2" value="同意" onclick="vertifyActivitiMain.shareApprove('+tr.clientId+','+tr.shareId+')">同意</option>' +
                        '<option id="3" value="驳回" onclick="vertifyActivitiMain.shareTurnDown('+tr.clientId+','+tr.shareId+')">驳回</option>' +
                        '<option id="1" value="待审核" onclick="vertifyActivitiMain.waitApprove('+tr.clientId+','+tr.shareId+')">待审核</option></select>';
                    approve = '<td id="'+tr.approveId+'" style="" name="'+tr.approveName+'">'+tr.approveId+'(工号:'+tr.approveName+')'+'</td>';
                    break;
                case 3:
                    option += '<option id="3" value="驳回" onclick="vertifyActivitiMain.shareTurnDown('+tr.clientId+','+tr.shareId+')">驳回</option>' +
                        '<option id="1" value="待审核" onclick="vertifyActivitiMain.waitApprove('+tr.clientId+','+tr.shareId+')">待审核</option>' +
                        '<option id="2" value="同意" onclick="vertifyActivitiMain.shareApprove('+tr.clientId+','+tr.shareId+')">同意</option></select>' ;
                    approve = '<td id="'+tr.approveId+'" style="" name="'+tr.approveName+'">'+tr.approveId+'(工号:'+tr.approveName+')'+'</td>';
                    break;
            }
            $("#vertify_activity_table tbody").append($('<tr id="vertifyTr'+tr.clientId+','+tr.shareId+'" data-index="0" name="'+tr.shareId+'">' +
                '<td class="bs-checkbox"><input data-index="0" id="checkbox,'+tr.clientId+','+tr.shareId+'" name="btSelectItem" type="checkbox" class="itemSelect"></td>' +
                '<td style=""><a id="'+tr.clientId+'" class="like" href="javascript:void(0);" title="客户姓名" name="'+tr.clientName+'">'+tr.clientName+'(序号:'+tr.clientId+')'+'</a></td>' +
                '<td style="">'+tr.workAddress+'</td>' +
                '<td style="">'+tr.mainPhone+'</td>' +
                '<td id="'+tr.approveId+'" style="" name="'+tr.applyerName+'">'+tr.applyerName+'(工号:'+tr.applyerId+')'+'</td>' +
                '<td id="'+tr.shareId+'" style="" name="'+tr.shareName+'">'+tr.shareName+'(工号:'+tr.shareId+')'+'</td>' +
                 approve +
                '<td>' +
                option +
                '</td>' +
                '</tr>'))
        }

    },

    update:function () {

    }

}