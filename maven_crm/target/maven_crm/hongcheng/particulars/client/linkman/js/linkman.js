var linkman = {

    query:function(){
        crmajax.ajax({
            url:"query.linkman",
            type:"post",
            data:{

            },
            success:function (data) {//data已经是json数据
                if (data == ""){
                    sweetAlert.caution("温馨提示","请尽快发展部门")
                }else {
                    linkmanMain.datatablesDestroy();
                    $("#linkman_info_table tbody").empty();
                    for (var i = 0; i < data.length; i++) {
                        linkman.addTr(data[i]);
                    }
                linkmanMain.datatablesCreate();
                }
            },
            error:function (data) {
                sweetAlert.caution("未知错误",data)
            }
        })
    },

    addTr:function (newTr) {
        var bir = parseInt(newTr.birthday.substring(0,4));
        var now = new Date().getFullYear();
        var del = '<a href="javascript:void(0);" disabled="false" onClick="linkmanMain.delLinkman('+newTr.userId+')" title="删除"><i class="fa fa-trash-o"></i></a>';

        $("#linkman_info_table tbody").append($('<tr id="linkmanTr'+newTr.userId+'" data-index="0"> ' +
            '<td class="bs-checkbox"><input data-index="0" id="checkbox'+newTr.userId+'" name="btSelectItem" type="checkbox" class="itemSelect"></td>' +
            '<td style=""><a class="like" href="javascript:void(0);" title="联系人姓名">'+newTr.realName+'(工号:'+newTr.userId+')'+'</a></td>' +
            ' <td style="">'+newTr.sex+'</td>' +
            '<td style="">'+(now-bir)+'</td>' +
            '<td style="">'+newTr.entryTime+'</td>' +
            '<td style=""><span style="color:#f0b80e;">'+newTr.status+'</span></td>' +
            '<td style="">'+newTr.mobile+'</td>' +
            '<td style="">'+newTr.email+'</td>' +
            '<td style=""><a class="like" href="#">'+newTr.account+','+'&nbsp;&nbsp;'+newTr.password+'</a></td>' +
            '<td style="width: 80px; "><a href="javascript:void(0);" disabled="false" onClick="linkmanMain.updLinkman('+newTr.userId+')" title="修改" style="margin-left: 10px;margin-right: 10px;"><i class="fa fa-wrench"></i></a>'+del+'</td> </tr>'));
    },

    update:function (userId,tr) {
        $("#linkman_info_table #linkmanTr"+ tr.userId + " td:eq(1) a").text(tr.realName);
        $("#linkman_info_table #linkmanTr"+ tr.userId + " td:eq(2)").text(tr.sex);
        var bir = parseInt(tr.birthday.substring(0,4));
        var now = new Date().getFullYear();
        $("#linkman_info_table #linkmanTr"+ tr.userId + " td:eq(3)").text((now-bir));
        var year = parseInt(tr.entryTime.substring(0,4));
        var month = parseInt(tr.entryTime.substring(5,7));
        var day = parseInt(tr.entryTime.substring(8,10));
        $("#linkman_info_table #linkmanTr"+ tr.userId + " td:eq(4)").text(year+"-"+month+"-"+day);
        $("#linkman_info_table #linkmanTr"+ tr.userId + " td:eq(5) span").text(tr.status);
        $("#linkman_info_table #linkmanTr"+ tr.userId + " td:eq(6)").text(tr.mobile);
        $("#linkman_info_table #linkmanTr"+ tr.userId + " td:eq(7)").text(tr.email);
        $("#linkman_info_table #linkmanTr"+ tr.userId + " td:eq(8) a").html(tr.account+','+'&nbsp;&nbsp;'+tr.password);

    },

}