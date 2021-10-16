//clientInfoCtroller
var  performanceManageCtroller = {

	/**
	 *  凌巧自己写的函数：查userInfo表中的realName
	 */
	viewUser:function(callBackFun){
		var url = "userInfo.product";
		jqueryAjax.synchronizeAjaxText(url, {

		}, null, callBackFun);
	},

	/**
	 *  凌巧自己写的函数：查userInfo表中的realName
	 */
	viewNowuserInf:function(callBackFun){
		var url = "identity.do";
		jqueryAjax.synchronizeAjaxText(url, {

		}, null, callBackFun);
	},

	/**
	 * 客户详情
	 * 
	 * @param id
	 * @param callBackFun
	 *            回调函数
	 */
	clientInfoDetail : function(id, callBackFun) {
		var url = "kanBypid.performanceManage";
		jqueryAjax.synchronizeAjaxText(url, {
			"id" : id
		}, null, callBackFun);
	},

	/**
	 * 添加客户
	 *
	 * @param callBackFun
	 *            回调函数
	 */
	clientInfoAdd : function(jsonpurchaseData, callBackFun) {
		var url = "add.performanceManage";
		var data = {
			"jsonpurchaseData":jsonpurchaseData
		};
		jqueryAjax.asynchronusAjaxText(url, data, null, callBackFun);
	},

	/**
	 * 修改客户
	 *
	 * @param callBackFun
	 *            回调函数
	 */
	clientInfoUpdate : function(jsonproductData, callBackFun) {
		var url = "edit.performanceManage";
		var data = {
			"jsonproductData":jsonproductData
		};
		jqueryAjax.asynchronusAjaxText(url, data, null, callBackFun);
	},

	/**
	 * 批量删除客户信息
	 * 
	 * @param ids
	 *            客户ID集合
	 */
	clientInfoBatchDel : function(ids, callBackFun) {
		var url = "manyDelete.performanceManage";
		jqueryAjax.asynchronusAjaxText(url, {"ids":JSON.stringify(ids)},
				null, callBackFun);
	},

	/**
	 * 删除客户信息
	 * 
	 * @param id
	 *            客户ID
	 */
	clientInfoDel : function(id, callBackFun) {
		var url ="singleDelete.performanceManage" ;
		jqueryAjax.asynchronusAjaxText(url, {
			"id" : id
		}, null, callBackFun);
	},
	
	/**
	 * 客户共享
	 * 
	 * @param id
	 *            ID
	 * @param userId
	 *            用户（同事）ID
	 * @param callBackFun
	 *            回调函数
	 */
	clientShareApplay:function(id, userId, callBackFun) {
		var url = performanceManageCtroller.client_info_url.CLIENT_SHARE_APPLAY;
		jqueryAjax.asynchronusAjaxText(url, {
			"id" : id,
			"userId" : userId
		}, null, callBackFun);
	}
}