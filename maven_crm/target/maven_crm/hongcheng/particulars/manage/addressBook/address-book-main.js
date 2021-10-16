var addressBookMain = {

    datatablesDestroy:function(){
        $('#address_list_table').dataTable().fnDestroy();
    },

    datatablesCreate:function(){
        jQuery(function($) {
            var oTable1 = $('#address_list_table').dataTable( {
                // "aaSorting": [[ 1, "desc" ]],//默认第几个排序
                "ordering":false,
                "bStateSave": true,//状态保存
                searching : false,//去掉搜索框
                bAutoWidth: false,//是否自动宽度
                "aoColumnDefs": [
                    //{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
                    {"orderable":false,"aTargets":[0,1,2]}// 制定列不参与排序
                ] } );

        });
    },

    /**
     * 重置查询条件
     */
    resetFun: function() {
      $("#realName_").val("");
      addressBook.query();
    },
    /**
     * 查询
     */
    queryFun: function() {
        if ($("#realName_").val() == ''){
            sweetAlert.caution("温馨提示","查询不能为空");
            return;
        }
        crmajax.ajax({
            url:"likeQuery.addressBook",
            type:"post",
            data:{
                like:$("#realName_").val()
            },
            success:function (data) {
                data = data.substr(3,data.length);
                if (data != '没有查询到相关记录'){
                    var book = JSON.parse(data);

                    addressBookMain.datatablesDestroy();
                    $("#address_list_table tbody").empty();
                    for (var i = 0; i < book.length; i++) {
                        var tr = {userId:book[i].userId,realName:book[i].realName,mobile:book[i].mobile,email:book[i].email};
                        addressBook.addTr(tr);
                    }
                    addressBookMain.datatablesCreate();

                }else {
                    sweetAlert.caution('温馨提示',data);
                }
            },
            error:function (data) {
                sweetAlert.caution("未知错误",data)
            }
        })
    },

}