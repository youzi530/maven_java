var vertifyActivitiController = {
		my_activiti_url: {
			CLIENT_SHARE_WAIT : "wait.vertify",
			CLIENT_SHARE_APPROVE : "approve.vertify",
			CLIENT_SHARE_REFUSE : "refuse.vertify",
			CLIENT_SHARE_DELETEMORE : "deleteMore.vertify"
		},

	clientShareWait: function(clientId, userId, callBackFun) {// 1
		var url = vertifyActivitiController.my_activiti_url.CLIENT_SHARE_WAIT;
		jqueryAjax.asynchronusAjaxText(url, {
			"clientId" : clientId,
			"userId" : userId
		}, null, callBackFun);
	},
		
		/**
		 * 客户共享审批【批准】
		 *
		 */
		clientShareApprove: function(clientId, userId, callBackFun) {// 2
			var url = vertifyActivitiController.my_activiti_url.CLIENT_SHARE_APPROVE;
			jqueryAjax.asynchronusAjaxText(url, {
				"clientId" : clientId,
				"userId" : userId
			}, null, callBackFun);
		},
		
		/**
		 * 客户共享审批【驳回】
		 *
		 */
		clientShareTurnDown: function(clientId, userId, callBackFun) {// 3
			var url = vertifyActivitiController.my_activiti_url.CLIENT_SHARE_REFUSE;
			jqueryAjax.asynchronusAjaxText(url, {
				"clientId" : clientId,
				"userId" : userId
			}, null, callBackFun);
		},

	/**
	 * 删除多个分享
	 */
	delBatchShare:function(clientIds,userIds, callBackFun) {
		var url = vertifyActivitiController.my_activiti_url.CLIENT_SHARE_DELETEMORE;
		jqueryAjax.asynchronusAjaxText(url, {"clientIds":JSON.stringify(clientIds),"userIds":JSON.stringify(userIds)}, null, callBackFun);
	},
		
		/**
		 * 客户共享审批【拒绝】
		 * 
		 * @param id
		 *            ID
		 * @param processInstanceId
		 *            流程ID
		 * @param callBackFun
		 *            回调函数
		 */
		clientShareRefuse: function(id, processInstanceId, callBackFun) {
			var url = myActivitiController.my_activiti_url.CLIENT_SHARE_APPROVE;
			jqueryAjax.asynchronusAjaxText(url, {
				"id" : id,
				"processInstanceId" : processInstanceId,
				"careOfState": 3
			}, null, callBackFun);
		}
}