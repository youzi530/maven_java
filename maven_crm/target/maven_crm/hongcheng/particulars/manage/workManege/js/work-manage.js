var workManage = {

    query:function () {
        crmajax.ajax({
             url:"query.workManage",
            type:"post",
            data:{

            },
            success:function (data) {
                 data = data.substr(3,data.length);
                if (data != "暂无工作信息"){
                    var workers = JSON.parse(data);

                    workManageMain.datatablesDestroy();
                    $("#work_manage_table tbody").empty();
                    for (var i = 0; i < workers.length; i++) {
                        var tr = {wid:workers[i].wid,content:workers[i].content,progress:workers[i].progress,workerId:workers[i].workerId,
                        workerName:workers[i].workerName,leaderId:workers[i].leaderId,leaderName:workers[i].leaderName};
                        workManage.addTr(tr);
                    }
                    workManageMain.datatablesCreate();

                }else {
                    sweetAlert.caution("温馨提示",data)
                }
            },
            error:function (data) {
                sweetAlert.caution("未知错误",data)
            }
        })
    },

    addTr:function (tr) {

        var del = "";
        if ($("#identity").val().substr(2,4) == "职员"){

        }else {
            del = '<a href="javascript:void(0);" disabled="false" onClick="workManageMain.delWork('+tr.wid+')" title="删除"><i class="fa fa-trash-o"></i></a>';
        }

        $("#work_manage_table tbody").append($('<tr id="workManage'+tr.wid+'">' +
            '<td class="bs-checkbox"><input data-index="0" id="checkbox'+tr.wid+'" name="btSelectItem" type="checkbox" class="itemSelect"></td>' +
            '<td style=""><a id="'+tr.wid+'" class="like" href="javascript:void(0);" title="工作内容" name="'+tr.content+'">'+tr.content+'(序号:'+tr.wid+')'+'</a></td>' +
            '<td>' +
            '<div style="width:100%">' +
            '<div class="progress progress-striped active">' +
            '<div id="activeProgress'+tr.wid+'" class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: '+tr.progress+'%;">' +
            '</div></div></div>' +
            '</td>' +
            '<td id="'+tr.workerId+'" style="" name="'+tr.workerName+'">'+tr.workerName+'(工号:'+tr.workerId+')'+'</td>' +
            '<td id="'+tr.leaderId+'" style="" name="'+tr.leaderName+'">'+tr.leaderName+'(工号:'+tr.leaderId+')'+'</td>' +
            '<td><a href="javascript:void(0);" disabled="false" onClick="workManageMain.updWork('+tr.wid+')" title="修改" style="margin-left: 10px;margin-right: 10px;"><i class="fa fa-wrench"></i></a>'+del+'</td>' +
            '</tr>'));
    },

}