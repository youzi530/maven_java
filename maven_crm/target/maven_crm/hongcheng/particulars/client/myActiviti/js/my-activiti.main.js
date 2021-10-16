var vertifyActivitiMain = {

	datatablesDestroy:function(){
		$('#vertify_activity_table').dataTable().fnDestroy();
	},

	datatablesCreate:function(){
		jQuery(function($) {
			var oTable1 = $('#vertify_activity_table').dataTable( {
				// "aaSorting": [[ 1, "desc" ]],//默认第几个排序
				"ordering":false,
				"bStateSave": true,//状态保存
				searching : false,//去掉搜索框
				bAutoWidth: false,//是否自动宽度
				"aoColumnDefs": [
					//{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
					{"orderable":false,"aTargets":[0,1,2,3,4,5,6,7]}// 制定列不参与排序
				] } );

		});
	},


	/**
	 * 待审核
	 */
	waitApprove:function(clientId,userId){
		sweetAlert.warning("确定撤回吗？", "", "确定", "取消", null, 5000, function(){
			vertifyActivitiController.clientShareWait(clientId, userId, function(data){
				if (data != '') {

					if (data == "操作成功"){
						sweetAlert.success("", data);
						$("#vertify_activity_table #vertifyTr"+clientId+","+userId + " td:eq(6)").text($("#username").text()+"(工号:)"+$("#userId").val())
					}else {
						sweetAlert.caution("温馨提示", data);
					}
				} else {
					sweetAlert.success("未知错误", data);
				}
			});
		}, "", "", null, null, false);
	},
	
	/**
	 * 同意
	 */
	shareApprove: function(clientId, userId) {

		sweetAlert.warning("确定同意吗？", "", "确定", "取消", null, 5000, function(){

			vertifyActivitiController.clientShareApprove(clientId, userId, function(data){
				if (data != '') {
					if (data == "操作成功"){
						sweetAlert.success("", data);
						$("#vertify_activity_table #vertifyTr"+clientId+","+userId + " td:eq(6)").text($("#username").text()+"(工号:)"+$("#userId").val())
					}else {
						sweetAlert.caution("温馨提示", data);
					}
				} else {
					sweetAlert.success("未知错误", data);
				}
			});
		}, "", "", null, null, false);
	},
	
	/**
	 * 驳回
	 */
	shareTurnDown: function(clientId, userId) {

		sweetAlert.warning("确定驳回吗？", "", "确定", "取消", null, 5000, function(){

			vertifyActivitiController.clientShareTurnDown(clientId, userId, function(data){
				if (data != '') {

					if (data == "操作成功"){
						sweetAlert.success("", data);
						$("#vertify_activity_table #vertifyTr"+clientId+","+userId + " td:eq(6)").text($("#username").text()+"(工号:)"+$("#userId").val())
					}else {
						sweetAlert.caution("温馨提示", data);
					}
				} else {
					sweetAlert.success("未知错误", data);
				}
			});
		}, "", "", null, null, false);
	},

	/**
	 * 批量删除
	 */
	delBatchShare: function() {

		var clientIds = new Array();
		var userIds = new Array();
		$("input:checkbox[name='btSelectItem']:checked").each(function () {
			var merge = $(this).attr('id').split(',');
			clientIds.push(merge[1]);
			userIds.push(merge[2]);
		});

		if (clientIds.length == 0){
			sweetAlert.caution("温馨提示", "请选择要删除的数据", "确定", 3000);
			return;
		}


		sweetAlert.warning("确定删除吗？", "此操作将删除员工的客户", "确定", "取消", null, 5000, function(){

			vertifyActivitiController.delBatchShare(clientIds,userIds,function(data){
				if (data != '') {

					if (data == "删除成功"){
						sweetAlert.success("",data,"关闭",3000);
						vertifyActivitiMain.datatablesDestroy()
						for (var i = 0; i < clientIds.length; i++) {
								$("#vertify_activity_table #vertifyTr"+clientIds[i]+","+userIds[i]).remove()
						}
					vertifyActivitiMain.datatablesCreate()
					}else {
						sweetAlert.caution("温馨提示",data,"关闭",3000);
					}
				}
			});
		}, "", "", null, null, false);
	},
	
	/**
	 * 拒绝
	 */
	shareRefuse: function(id, pi) {
		myActivitiController.clientShareRefuse(id, pi, function(data){
			if (data != '') {
				if(data == "操作成功"){
					sweetAlert.success("", data);
				}else {
					sweetAlert.caution("温馨提示", data);
				}
			} else {
				sweetAlert.caution("未知错误", data);
			}
		});
	},
	
	/**
	 * 流程图
	 */
	proccessImage: function(row) {
		var url = common.projectPath + "client/info/proccess/image.htl?processInstanceId=" + row.processInstanceId;
		var content = '<div style="text-align: center; line-height: 330px;"><img src="'+url+'"/></div>';
		commFun.noModel("processImg" + row.processInstanceId, "客户共享流程展示",700,500, content, null, "", true);
	},
	

	/**
	 * 初始化
	 */
	queryInit : function() {
		//myActivitiMain.queryTable();
	}
}

window.clientActivitEvent = {
	"click .like" : function(e, value, row, index) {
		myActivitiMain.proccessImage(row);
	}
}

$(document).ready(function() {
	//myActivitiMain.queryInit();
});