var bulletinBoardMain = {
    datatablesDestroy:function(){
        $('#bulletinBoard_table').dataTable().fnDestroy();
    },

    datatablesCreate:function(){
        jQuery(function($) {
            var oTable1 = $('#bulletinBoard_table').dataTable( {
                // "aaSorting": [[ 1, "desc" ]],//默认第几个排序
                "ordering":false,
                "bStateSave": true,//状态保存
                searching : false,//去掉搜索框
                bAutoWidth: false,//是否自动宽度
                "aoColumnDefs": [
                    //{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
                    {"orderable":false,"aTargets":[0,1,2,3,4,5]}// 制定列不参与排序
                ] } );

        });
    },
    /**
     * 重置查询条件
     */
    resetFun: function() {
        var inputs_ = $("#bulletinBoard #criteriaNav").find(":text,textarea,input[type='text']");
        inputs_.val("");
        var checks_ = $("#bulletinBoard #criteriaNav").find("input[type='checkbox']");
        checks_.prop({"checked":false});
        bulletinBoard.query();
    },



    /**
     * 公告详情
     */
    bulletinBoardDetail: function(theme, type) {
        bulletinBoardCtroller.bulletinBoardDetail(theme, function(data){          //判断是否存在，返回通过主键获得的数据

            if (data.msg == 0) {
                sweetAlert.caution("温馨提示", "未获取到相关公告");
                return;
            }

            var contents = bulletinBoardHTML.bulletinBoardHTML(type);
            var modelId = "bulletinBoard" + type + "Model";
            var isHideBut = type == 'update' ? false : true;
            commFun.noModel(modelId, "公告详情",700,500, contents, bulletinBoardMain.submitData, type, isHideBut);


            bulletinBoardMain.fillData(modelId, type, data);

        });

    },

    /**
     * 添加公告信息
     */
    addBulletinBoard: function() {
        var contents = bulletinBoardHTML.bulletinBoardHTML('add');
        commFun.noModel("bulletinBoardaddModel", "添加公告信息",700,500, contents, bulletinBoardMain.submitData, "add" , false);

    },

    /**
     * 修改公告信息
     */
    updBulletinBoard: function(theme) {

        bulletinBoardMain.bulletinBoardDetail(theme, 'update');
    },

    /**
     * 填充数据
     */
    fillData: function(modelId, type, data) {
        var notice = data;
        $("#" + modelId + " #theme").val(notice.theme);
        $("#" + modelId + " #content").val(notice.content);
        $("#" + modelId + " #releaseDate").val(notice.releaseDate);

    },

    /**
     * 提交数据
     */
    submitData: function(type) {
        var modelId = "bulletinBoard" + type + "Model";
        var theme = $("#" + modelId + " #theme").val();
        var content = $("#" + modelId + " #content").val();
        var releaseDate = $("#" + modelId + " #releaseDate").val();


        if (theme == '') {
            sweetAlert.caution("温馨提示", "主题不允许为空！");
            return false;
        }
        if (content == '') {
            sweetAlert.caution("温馨提示", "内容不允许为空！");
            return false;
        }
        if (releaseDate == '') {
            sweetAlert.caution("温馨提示", "发布公告日期不允许为空！");
            return false;
        }


        var res = false;
        if (type == 'add') {// 添加
            bulletinBoardCtroller.bulletinBoardAdd(theme,content,releaseDate,function(data){
                    if (data == '') {
                        bulletinBoardMain.queryTableParam = {};
                        $("#email #bulletinBoard_table").bootstrapTable("refresh");
                        res = true;
                    } else {
                        var msg = data.substring(0,4);
                        sweetAlert.caution("温馨提示", msg);
                        if (msg == "添加成功"){

                            res = true;//控制弹出框关闭
                            newTr = {theme:theme,content:content,releaseDate:releaseDate}
                            bulletinBoardMain.datatablesDestroy();
                            bulletinBoard.addTr(newTr);
                            bulletinBoardMain.datatablesCreate();
                        }
                    }
                });
        } else if(type == 'update'){// 修改
            var id = $("#" + modelId + " #email").val();
            var test1 = theme; var test2 = content; var test3=releaseDate;
            bulletinBoardCtroller.bulletinBoardUpdate(theme,content,releaseDate, function(data) {

                        sweetAlert.caution("温馨提示", data);

                        if (data == "更新成功！"){
                           var test ={theme:test1,content:test2,releaseDate:test3};
                            bulletinBoard.update(theme,test)
                        }
                        res = true;//关闭弹窗

                });
        }

        return res;
    },

    /**
     * 批量删除
     */
    delBatchBulletinBoard: function() {

        var ids = new Array();
        $("input:checkbox[name='btSelectItem']:checked").each(function () {
            ids.push($(this).attr('id').substring(8))
        });

        if (ids.length == 0){
            sweetAlert.caution("温馨提示", "请选择要删除的数据", "确定", 3000);
            return;
        }

        sweetAlert.warning("确定删除吗？", "", "确定", "取消", null, 5000, function(){

            bulletinBoardCtroller.bulletinBoardBatchDel(ids, function(data){
                if (data != '') {
                    sweetAlert.caution("温馨提示",data,"关闭",3000);
                    if (data == "删除成功"){
                        bulletinBoardMain.datatablesDestroy();
                        for (var i = 0; i < ids.length; i++) {
                            $("#bulletinBoard_table #bulletinBoardTr"+ids[i]).remove()
                        }
                        bulletinBoardMain.datatablesCreate();
                    }
                }
            });
        }, "", "", null, null, false);
    },

    /**
     * 单个删除
     */
    delBulletinBoard: function(theme) {
        sweetAlert.warning("确定删除吗？", "", "确定", "取消", null, 5000, function(){
            bulletinBoardCtroller.bulletinBoardDel(theme, function(data){
                if (data != '') {
                    sweetAlert.caution("温馨提示",data,"关闭",3000);
                    if (data == "删除成功"){
                        bulletinBoardMain.datatablesDestroy();
                        $("#bulletinBoard_table #bulletinBoardTr"+theme).remove();
                        bulletinBoardMain.datatablesCreate();
                    }
                }
            });
        }, "", "", null, null, false);
    },



}


/**
 * bootstrap-table event 事件
 */
window.bulletinBoardEvent = {
    "click .like":function(e,value,row,index){
        bulletinBoardMain.bulletinBoardDetail(row.theme, 'detail');
    }
}
window.userEvent = {
    "click .like":function(e,value,row,index){
        sweetAlert.caution("温馨提示：", "此处暂不支持查看用户详情！", "确定", 3000);
    }
}


