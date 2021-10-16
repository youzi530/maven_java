var workManageController = {

    work_manage_url : {
        WORK_INFO_ADD :"addWork.workManage",
        WORK_INFO_DEL:"deleteOne.workManage",
        WORK_INFO_BATCH_DEL:"deleteMore.workManage",
        WORK_INFO_BOSS_UPD:"bossUpdWork.workManage",
        WORK_INFO_STAFF_UPD:"staffUpdWork.workManage"
    },

    workAdd : function(content,progress,workerId,workerName,leaderId,leaderName,callBackFun) {
        var url = workManageController.work_manage_url.WORK_INFO_ADD;
        var data = {
            workManage: JSON.stringify({
                "content": content,
                "progress": progress,
                "workerId": workerId,
                "workerName": workerName,
                "leaderId": leaderId,
                "leaderName": leaderName
            })
        };
        jqueryAjax.asynchronusAjaxText(url, data, null, callBackFun);
    },

    workBossUpd:function(wid,content,workerId,workerName,callBackFun){
        var url = workManageController.work_manage_url.WORK_INFO_BOSS_UPD;
        var data = {
            workManage: JSON.stringify({
                "wid":wid,
                "content": content,
                "workerId": workerId,
                "workerName": workerName,
            })
        };
        jqueryAjax.asynchronusAjaxText(url, data, null, callBackFun);
    },

    workStaffUpd:function(wid,progress,callBackFun){
        var url = workManageController.work_manage_url.WORK_INFO_STAFF_UPD;
        var data = {
            workManage: JSON.stringify({
                "wid":wid,
                "progress": progress
            })
        };
        jqueryAjax.asynchronusAjaxText(url, data, null, callBackFun);
    },

    delWork:function (wid, callBackFun) {
        var url = workManageController.work_manage_url.WORK_INFO_DEL;
        jqueryAjax.asynchronusAjaxText(url, {
            "wid" : wid
        }, null, callBackFun);
    },

    delBatchWork:function (wids, callBackFun) {
        var url = workManageController.work_manage_url.WORK_INFO_BATCH_DEL;
        jqueryAjax.asynchronusAjaxText(url, {"wids":JSON.stringify(wids)}, null, callBackFun);
    },

}