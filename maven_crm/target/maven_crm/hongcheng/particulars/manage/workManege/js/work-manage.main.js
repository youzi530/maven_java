var workManageMain = {

    datatablesDestroy:function(){
        $('#work_manage_table').dataTable().fnDestroy();
    },

    datatablesCreate:function(){
        jQuery(function($) {
            var oTable1 = $('#work_manage_table').dataTable( {
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

    resetFun: function() {
        $("#title_").val("")
        workManage.query()
    },

    /**
     * 查询
     */
    queryFun: function() {
        if($("#title_").val() == ""){
            sweetAlert.caution("温馨提示","查询不能为空");
            return;
        }else {
            crmajax.ajax({
                url:"likeQuery.workManage",
                type:"post",
                data:{
                    like:$("#title_").val()
                },
                success:function (data) {
                    data = data.substr(3,data.length);
                    if (data != "暂无相关主题工作信息"){
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
        }

    },

    addWork:function () {
        crmajax.ajax({
            url:"getWorkers.workManage",
            type:"post",
            data:{

            },
            success:function (data) {
                data = data.substr(3,data.length);
                if (data != "暂无职员"){
                    var content = workManageHTML.getHtml(JSON.parse(data),'add');
                    commFun.noModel("workmanageaddModel", "分发职员工作",700,500, content, workManageMain.submitData, "add" , false);
                    inputNumber.addClick()
                }else {
                    sweetAlert.caution("温馨提示","暂无职员");
                }
            },
            error:function (data) {
                sweetAlert.caution("未知错误",data)
            }
        })
    },

    updWork:function(wid){
        var work;
        crmajax.ajax({
            url:"getOne.workManage",
            type:"post",
            data:{
                wid:wid
            },
            success:function (data) {

                   work = data;
                   var workers = '';
                   if ($("#identity").val() != "客户职员" && $("#identity").val() != "供销职员"){
                       crmajax.ajax({
                           url:"getWorkers.workManage",
                           type:"post",
                           data:{

                           },
                           success:function (userInfo) {
                               userInfo = userInfo.substr(3,userInfo.length)
                               workers = JSON.parse(userInfo);
                               var content = workManageHTML.getHtml(workers,'update');
                               commFun.noModel("workmanageupdateModel", "更新工作信息",700,500, content, workManageMain.submitData, "update" , false);
                               workManageMain.filldata(work,true);
                           },
                           error:function (userInfo) {
                               sweetAlert.caution("未知错误",userInfo)
                           }
                       })
                   }else {
                       var content = workManageHTML.getHtml(null,'update');
                       commFun.noModel("workmanageupdateModel", "更新工作信息",700,500, content, workManageMain.submitData, "update" , false);
                       inputNumber.addClick();
                       workManageMain.filldata(work,false);
                   }

            },
            error:function (data) {
                sweetAlert.caution("未知错误",data)
            }
        });

    },

    filldata:function(work,flag){
        if (flag){
            $("#widStore").val(work.wid);
            $("#workmanageupdateModel #workContent").val(work.content);
            $("#workmanageupdateModel #allocateWork").find('option[value="'+work.workerId+','+work.workerName+'"]').attr("selected",true);
        }else { //职员
            $("#widStore").val(work.wid);
            $("#workmanageupdateModel #inputNmuberinp").val(work.progress);
        }
    },

    submitData:function (type) {

        var res = false;//弹窗是否关闭

        if (type == 'add'){
            var content = $("#workContent").val();
            var progress = $("#inputNmuberinp").val();
            var worker = $("#allocateWork").val();
            if (content == ''){
                sweetAlert.caution("温馨提示","工作内容不允许为空");
                return false;
            }
            if (worker == "请选择"){
                sweetAlert.caution("温馨提示","请选择职员")
                return false;
            }else {
                worker = worker.split(',')
            }
            workManageController.workAdd(content,parseInt(progress),worker[0],worker[1],
                $("#userId").val(),$("#username").text(),function (data) {
                    var msg = data.substring(0,4);
                    if (msg == "分发成功"){
                        var wid = data.substring(4,data.length);
                        workManageMain.datatablesDestroy();
                        var tr = {wid:wid,content:content,progress:progress,workerId:worker[0],
                            workerName:worker[1],leaderId:$("#userId").val(),leaderName:$("#username").text()};
                        workManage.addTr(tr);
                        workManageMain.datatablesCreate();
                        sweetAlert.success("",msg)
                        res = true;
                    }else {
                        sweetAlert.caution("温馨提示",msg)
                    }
            })
        }else if (type == 'update'){
            var wid = $("#widStore").val();
            if ($("#identity").val() != "客户职员" && $("#identity").val() != "供销职员"){
                var content = $("#workContent").val();
                var worker = $("#allocateWork").val();
                if (content == ''){
                    sweetAlert.caution("温馨提示","工作内容不允许为空");
                    return false;
                }
                if (worker == "请选择"){
                    sweetAlert.caution("温馨提示","请选择职员")
                    return false;
                }else {
                    worker = worker.split(',')
                }
                workManageController.workBossUpd($("#widStore").val(),content,worker[0],worker[1],function (data) {
                    if (data == "更新成功"){
                        res = true;
                        var before = $("#workManage"+wid+" td:eq(1) a").text();
                        var index = before.indexOf('(');
                        before = before.substr(index);
                        console.log("before:" + before);
                        console.log(content)
                        $("#workManage"+wid+" td:eq(1) a").text(content+before);
                        $("#workManage"+wid+" td:eq(3)").text((worker[1]+"(工号:"+worker[0]+")"));
                        sweetAlert.success("",data);
                    }else {
                        sweetAlert.caution("温馨提示",data);
                    }
                })
            }else {
                var progress = $("#inputNmuberinp").val();
                workManageController.workStaffUpd($("#widStore").val(),progress,function (data) {
                    if (data == "更新成功"){
                        res = true;
                        $("#activeProgress"+wid).css("width",progress+"%");
                        sweetAlert.success("",data);
                    }else {
                        sweetAlert.caution("温馨提示",data);
                    }
                })
            }
        }

        return res;
    },

    delWork: function(wid) {
        sweetAlert.warning("确定删除吗？", "", "确定", "取消", null, 5000, function(){
            workManageController.delWork(wid, function(data){
                if (data != '') {
                    if (data == "删除成功"){
                        sweetAlert.success("",data)
                        workManageMain.datatablesDestroy();
                        $("#work_manage_table #workManage"+wid).remove();
                        workManageMain.datatablesCreate();
                    }else {
                        sweetAlert.caution("温馨提示",data)
                    }
                }
            });
        }, "", "", null, null, false);
    },

    delBatchWork:function(){
        var wids = new Array();

        $("input:checkbox[name='btSelectItem']:checked").each(function () {
            wids.push($(this).attr('id').substr(8))
        });

        if (wids.length == 0){
            sweetAlert.caution("温馨提示", "请选择要删除的数据", "确定", 3000);
            return;
        }

        sweetAlert.warning("确定删除吗？", "", "确定", "取消", null, 5000, function(){
            workManageController.delBatchWork(wids, function(data){
                if (data != '') {
                    if (data == "删除成功"){
                        sweetAlert.success("",data)
                        workManageMain.datatablesDestroy();
                        for (var i = 0; i < wids.length; i++) {
                            $("#work_manage_table #workManage"+wids[i]).remove();
                        }
                        workManageMain.datatablesCreate();
                    }else {
                        sweetAlert.caution("温馨提示",data)
                    }
                }
            });
        }, "", "", null, null, false);

    },

}