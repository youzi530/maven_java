//clientInfoCtroller
var purchaseManagerCtroller = {


	/**
	 * 通过id来查销售详情
	 *
	 * @param id
	 * @param callBackFun
	 *            回调函数
	 */
	isEistProduct : function(pid, callBackFun) {
		var url = "isEistPro.purchaseManage";
		jqueryAjax.synchronizeAjaxText(url, {
			"pid" : pid
		}, null, callBackFun);
	},


	/**
	 * 通过id来查销售详情
	 * 
	 * @param id
	 * @param callBackFun
	 *            回调函数
	 */
	clientInfoDetail : function(id, callBackFun) {
		var url = "kanBypid.purchaseManage";
		jqueryAjax.synchronizeAjaxText(url, {
			"id" : id
		}, null, callBackFun);
	},

	/**
	 *  凌巧自己写的函数：查所有的商品信息（查看商品名称）
	 */
	viewPur:function(callBackFun){
		var url = "see.product";
		jqueryAjax.synchronizeAjaxText(url, {

		}, null, callBackFun);
	},

	/**
	 *  凌巧自己写的函数：查userInfo表中的realName，将其展示下拉
	 */
	viewUsername:function(callBackFun){
		var url = "userInfo.product";
		jqueryAjax.synchronizeAjaxText(url, {

		}, null, callBackFun);
	},
	/**
	 *  凌巧自己写的函数：查userInfo表中的realName
	 */
	viewNowuserInfo:function(callBackFun){
		var url = "identity.do";
		jqueryAjax.synchronizeAjaxText(url, {

		}, null, callBackFun);
	},


	/**
	 * 添加采购信息
	 * 
	 * @param pName
	 *            商品名称
	 * @param username
	 *            采购人
	 * @param inNum
	 *            采购数量
	 * @param outNum
	 *            退货数量
	 * @param remark
	 *            备注
	 * @param callBackFun
	 *            回调函数
	 */
	clientInfoAdd : function(jsonpurchaseData, callBackFun) {
		var url = "add.purchaseManage";
		var data = {
			"jsonpurchaseData":jsonpurchaseData
		};
		jqueryAjax.asynchronusAjaxText(url, data, null, callBackFun);
	},

	/**
	 * 修改采购
	 *
	 * @param callBackFun
	 *            回调函数
	 */
	clientInfoUpdate : function(jsonproductData, callBackFun) {
		var url = "edit.purchaseManage";
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
		console.log(ids);
		var url = "manyDelete.purchaseManage";
		jqueryAjax.asynchronusAjaxText(url, {"ids":JSON.stringify(ids)},
				null, callBackFun);
	},

	/**
	 * 删除采购信息
	 * 
	 * @param id  采购ID
	 *
	 */
	clientInfoDel : function(id, callBackFun) {
		console.log(id);
		var url ="singleDelete.purchaseManage" ;
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
		var url = purchaseManagerCtroller.client_info_url.CLIENT_SHARE_APPLAY;
		jqueryAjax.asynchronusAjaxText(url, {
			"id" : id,
			"userId" : userId
		}, null, callBackFun);
	}
}