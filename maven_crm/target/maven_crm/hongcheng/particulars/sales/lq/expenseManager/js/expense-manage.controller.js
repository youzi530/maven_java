//clientInfoCtroller
var expenseManageCtroller = {


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
		var url = "kanBypid.expenseManage";
		jqueryAjax.synchronizeAjaxText(url, {
			"id" : id
		}, null, callBackFun);
	},

	/**
	 * 添加客户
	 * 
	 * @param username
	 *            职员名称
	 * @param income
	 *            收入
	 * @param outcome
	 *            支出
	 * @param detail
	 *            明细
	 * @param state
	 *            审核状态
	 * @param callBackFun
	 *            回调函数
	 */
	clientInfoAdd : function(jsonpurchaseData, callBackFun) {
		var url = "add.expenseManage";
		var data = {
			"jsonpurchaseData":jsonpurchaseData
		};
		jqueryAjax.asynchronusAjaxText(url, data, null, callBackFun);
	},

	/**
	 * 修改客户
	 * 
	 * @param id
	 *            ID
	 * @param username
	 *            职员名称
	 * @param income
	 *            收入
	 * @param outcome
	 *            支出
	 * @param detail
	 *            明细
	 * @param state
	 *            审核状态
	 * @param callBackFun
	 *            回调函数
	 */
	clientInfoUpdate : function(jsonproductData, callBackFun) {
		var url = "edit.expenseManage";
		var data = {
			"jsonproductData" : jsonproductData
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
		var url = "manyDelete.expenseManage";
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
		var url = "singleDelete.expenseManage";
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
		var url = expenseManageCtroller.client_info_url.CLIENT_SHARE_APPLAY;
		jqueryAjax.asynchronusAjaxText(url, {
			"id" : id,
			"userId" : userId
		}, null, callBackFun);
	}
}