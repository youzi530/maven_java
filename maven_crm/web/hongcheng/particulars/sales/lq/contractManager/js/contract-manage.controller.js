//clientInfoCtroller
var contractManageCtroller = {


	/**
	 *  凌巧自己写的函数：查询收货人，查询客户
	 */
	viewClient:function(callBackFun){
		var url = "clentMessage.sendProduct";
		jqueryAjax.synchronizeAjaxText(url, {

		}, null, callBackFun);
	},


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
		var url = "kanBypid.contractManage";
		jqueryAjax.synchronizeAjaxText(url, {
			"id" : id
		}, null, callBackFun);
	},

	/**
	 * 添加客户
	 * 
	 * @param cName
	 *            合同主题
	 * @param detail
	 *            订购明细
	 * @param username
	 *            职员名称
	 * @param giveaway
	 *            赠品
	 * @param state
	 *            审核状态
	 * @param checkTime
	 *            审核时间
	 * @param callBackFun
	 *            回调函数
	 */
	clientInfoAdd : function(jsonpurchaseData, callBackFun) {
		var url = "add.contractManage";
		var data = {
			"jsonpurchaseData" : jsonpurchaseData
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
		var url = "edit.contractManage";
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
		var url = "manyDelete.contractManage";
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
		var url = "singleDelete.contractManage";
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
		var url = contractManageCtroller.client_info_url.CLIENT_SHARE_APPLAY;
		jqueryAjax.asynchronusAjaxText(url, {
			"id" : id,
			"userId" : userId
		}, null, callBackFun);
	}
}