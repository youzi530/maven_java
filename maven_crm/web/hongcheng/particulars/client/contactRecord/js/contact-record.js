var contactRecord = {

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
            url:"query.contactRecord",
            type:"post",
            data:data,
            success:function (data) {//data已经是json数据
                if(!flag){//职员
                    if (data == ""){
                        sweetAlert.caution("温馨提示","请尽快联系客户")
                    }else {
                        data = data.substring(3,data.length);
                        var clisrecords = data.split("crmuser");
                        var clis = clisrecords[0];
                        var records = clisrecords[1];
                        var jsonClis = JSON.parse(clis);
                        var jsonRecords = JSON.parse(records);
                        contactMain.datatablesDestroy()
                        for (var i = 0; i < jsonClis.length; i++) {
                            var tr = {id:jsonRecords[i].id, linkmanId:$("#userId").val(), linkmanName:$("#username").text(), clientId:jsonClis[i].clientId,
                                clientName:jsonClis[i].clientName, contactTime:jsonRecords[i].contactTime, content:jsonRecords[i].content};
                            contactRecord.addTr(tr);
                        }
                        contactMain.datatablesCreate()
                    }
                }else {//经理或老板
                    if (data == ""){
                        sweetAlert.caution("温馨提示","请尽快联系客户")
                    }else {
                        data = data.substring(3,data.length);
                        var clisusers = data.split("crmuser");
                        var users = clisusers[0];
                        var clis = clisusers[1];
                        var ids = clisusers[2];
                        var jsonClis = JSON.parse(clis);
                        var jsonUsers = JSON.parse(users);
                        var jsonIds = JSON.parse(ids)
                        contactMain.datatablesDestroy()
                        for (var i = 0; i < jsonClis.length; i++) {
                            console.log(jsonClis[i].clientId)
                            var tr = {id:jsonIds[i].id, linkmanId:jsonUsers[i].userId, linkmanName:jsonUsers[i].realName, clientId:jsonClis[i].clientId,
                            clientName:jsonClis[i].clientName, contactTime:jsonIds[i].contactTime, content:jsonIds[i].content};
                            contactRecord.addTr(tr);
                        }
                        contactMain.datatablesCreate()
                    }
                }
            },
            error:function (data) {
                sweetAlert.caution("未知错误",data)
            }
        })
    },

    queryClient:function(){
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

                        for (var i = 0; i < data.length; i++) {
                            var receive = "";
                            if (data[i].receiveState == 2 || data[i].receiveState == "2"){
                                receive = "&nbsp;&nbsp;（共享工号:"+data[i].receiveId+"）"
                            }
                            $("#contactaddModel #clientInfo").append('<option name="'+data[i].clientName+'" id="'+data[i].clientId+'" value="'+$("#userId").val()+'">'+data[i].clientName+'(序号:'+data[i].clientId+')'+receive+'</option>')
                        }
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
                        for (var i = 0; i < jsonClis.length; i++) {
                            var receive = "";
                            if (jsonUsers[i].receiveState == 2 || jsonClis[i].receiveState == "2"){
                                receive = "&nbsp;&nbsp;（共享工号:"+jsonClis[i].receiveId+"）"
                            }
                            $("#contactaddModel #clientInfo").append('<option name="'+jsonClis[i].clientName+'" id="'+jsonClis[i].clientId+'" value="'+$("#userId").val()+'">'+
                                jsonClis[i].clientName+'(序号:'+jsonClis[i].clientId+',负责人:'+jsonUsers[i].realName+',工号:'+jsonUsers[i].userId+')'+receive+'</option>')
                        }
                    }
                }
            },
            error:function (data) {
                sweetAlert.caution("未知错误",data)
            }
        })
    },

    addTr:function (tr) {

        var del = '';
        if ($("#identity").val() == '客户职员'){
            $("#contact_record_table tbody").append($('<tr id="contactRecordTr'+tr.id+'" data-index="0">' +
                '<td class="bs-checkbox"><input data-index="0" id="checkbox'+tr.id+'" name="btSelectItem" type="checkbox" class="itemSelect"></td>' +
                '<td style=""><a id="'+tr.clientId+'" class="like" href="javascript:void(0);" title="客户姓名" name="'+tr.clientName+'">'+tr.clientName+'(序号:'+tr.clientId+')'+'</a></td>' +
                '<td id="'+tr.linkmanId+'" style="" name="'+tr.linkmanName+'">'+tr.linkmanName+'</td>' +
                '<td style="">'+tr.content+'</td>' +
                '<td style="">'+tr.contactTime+'</td>' +
                '<td style="width: 80px; "><a href="javascript:void(0);" disabled="false" onClick="contactMain.updContact('+tr.id+')" title="修改" style="margin-left: 10px;margin-right: 10px;"><i class="fa fa-wrench"></i></a>'+del+'</td>  ' +
                '</tr>'))
        }else {
            del = '<a href="javascript:void(0);" disabled="false" onClick="contactMain.delContact('+tr.id+')" title="删除"><i class="fa fa-trash-o"></i></a>';
            $("#contact_record_table tbody").append($('<tr id="contactRecordTr'+tr.id+'" data-index="0">' +
                '<td class="bs-checkbox"><input data-index="0" id="checkbox'+tr.id+'" name="btSelectItem" type="checkbox" class="itemSelect"></td>' +
                '<td style=""><a id="'+tr.clientId+'" class="like" href="javascript:void(0);" title="客户姓名" name="'+tr.clientName+'">'+tr.clientName+'(序号:'+tr.clientId+')'+'</a></td>' +
                '<td id="'+tr.linkmanId+'" style="" name="'+tr.linkmanName+'">'+tr.linkmanName+'(工号:'+tr.linkmanId+')'+'</td>' +
                '<td style="">'+tr.content+'</td>' +
                '<td style="">'+tr.contactTime+'</td>' +
                '<td style="width: 80px; "><a href="javascript:void(0);" disabled="false" onClick="contactMain.updContact('+tr.id+')" title="修改" style="margin-left: 10px;margin-right: 10px;"><i class="fa fa-wrench"></i></a>'+del+'</td>  ' +
                '</tr>'))
        }

    },

    update:function () {

    },

}