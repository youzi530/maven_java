var authority = {

    query:function(){
        crmajax.ajax({
            url:"query.userInfo",
            type:"post",
            data:{

            },
            success:function (data) {//data已经是json数据
                if (data == ""){
                    sweetAlert.caution("温馨提示","请尽快发展公司")
                }else {
                    authorityMain.datatablesDestroy()
                    $("#linkman_info_table tbody").empty();
                    for (var i = 0; i < data.length; i++) {
                        authority.addTr(data[i]);
                    }
                    authorityMain.datatablesCreate()
                }
            },
            error:function (data) {
                sweetAlert.caution("未知错误",data)
            }
        })
    },

    addTr:function (newTr) {

        var select = '<select onchange="authorityMain.changeAuth(this)" style="height: 31px"  class="form-control" id="select'+newTr.userId+'">' +
            '<option value="请选择">请选择</option>' +
            '<option value="admin" onclick="">管理员</option>' +
            '<option value="客户经理" onclick="">客户经理</option>' +
            '<option value="供销经理" onclick="">供销经理</option>' +
            '<option value="客户职员">客户职员</option>' +
            '<option value="供销职员">供销职员</option>' +
            '</select>';

        var roleId = newTr.roleId;

        if (roleId == 'admin'){
            roleId = "管理员"
        }
        var bir = parseInt(newTr.birthday.substring(0,4));
        var now = new Date().getFullYear();
        var del = '<a href="javascript:void(0);" disabled="false" onClick="userInfoMain.delLinkman('+newTr.userId+')" title="删除"><i class="fa fa-trash-o"></i></a>';

        $("#linkman_info_table tbody").append($('<tr id="linkmanTr'+newTr.userId+'" data-index="0"> ' +
            '<td style=""><a class="like" href="javascript:void(0);" title="联系人姓名">'+newTr.realName+'(工号:'+newTr.userId+')'+'</a></td>' +
            ' <td style="">'+newTr.sex+'</td>' +
            '<td style="">'+(now-bir)+'</td>' +
            '<td style="">'+newTr.entryTime+'</td>' +
            '<td style=""><span style="color:#f0b80e;">'+roleId+'</span></td>' +
            '<td style=""><span style="color:#f0b80e;">'+newTr.status+'</span></td>' +
            '<td style="">'+newTr.mobile+'</td>' +
            '<td style="">'+newTr.email+'</td>' +
            '<td style=""><a class="like" href="#">'+newTr.account+','+'&nbsp;&nbsp;'+newTr.password+'</a></td>' +
            '<td style="width: 80px; ">'+select+'</td>' +
            '</tr>'));

        $("#select"+newTr.userId).find('option[value="'+newTr.roleId+'"]').attr("selected",true);
    },


}