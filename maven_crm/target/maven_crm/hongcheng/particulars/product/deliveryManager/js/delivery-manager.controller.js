//clientInfoCtroller
var deliveryManagerCtroller = {

	/**
	 *  凌巧自己写的函数：查所有的信息
	 */
	viewPro:function(callBackFun){
		var url = "see.product";
		jqueryAjax.synchronizeAjaxText(url, {

		}, null, callBackFun);
	},

	/**
	 *  凌巧自己写的函数：查userInfo表中的realName
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
	 *  凌巧自己写的函数：查询收货人，查询客户
	 */
	viewClient:function(callBackFun){
		var url = "clentMessage.sendProduct";
		jqueryAjax.synchronizeAjaxText(url, {

		}, null, callBackFun);
	},

	/**
	 *  凌巧自己写的函数：生成合同函数，传过来的是ids,通过传过来的ids来查出数据，并将其插入到合同表中
	 *  我自己也可以写一个类似于洋哥的ajax在main.js中
	 */
	contractAdd:function(ids,callBackFun){
	var url = "contract.sendProduct";
		jqueryAjax.synchronizeAjaxText(url, {"ids":JSON.stringify(ids)},
			null, callBackFun);
	},

	/**
	 * 通过ids来查询到相关信息，我需要查找到发货管理里面的收货地址和收货人
	 * @param ids
	 * @param callBackFun
	 */
	viewSendproById:function(ids,callBackFun){
		var url = "cityman.sendProduct";
		jqueryAjax.synchronizeAjaxText(url, {"ids":JSON.stringify(ids)},
			null, callBackFun);
	},

	/**
	 * 客户详情
	 * 
	 * @param id
	 * @param callBackFun
	 *            回调函数
	 */
	clientInfoDetail : function(id, callBackFun) {
		var url = "kanBypid.sendProduct";
		jqueryAjax.synchronizeAjaxText(url, {
			"id" : id
		}, null, callBackFun);
	},

	/**
	 * 添加客户
	 * 
	 * @param pName
	 *            商品名称
	 * @param address
	 *            收货地址
	 * @param clientName
	 *            收货人
	 * @param username
	 *            发货人
	 * @param remark
	 *            备注
	 * @param callBackFun
	 *            回调函数
	 */
	clientInfoAdd : function(jsonpurchaseData, callBackFun) {
		var url = "add.sendProduct";
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
	 * @param pName
	 *            商品名称
	 * @param address
	 *            收货地址
	 * @param clientName
	 *            收货人
	 * @param username
	 *            发货人
	 * @param remark
	 *            备注
	 * @param callBackFun
	 *            回调函数
	 */
	clientInfoUpdate : function(jsonproductData, callBackFun) {
		var url = "edit.sendProduct";
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
		var url = "manyDelete.sendProduct";
		jqueryAjax.asynchronusAjaxText(url, {"ids":JSON.stringify(ids)},
				null, callBackFun);
	},

	/**
	 * 删除发货信息
	 * 
	 * @param id 发货信息唯一主键：ID
	 *
	 */
	clientInfoDel : function(id, callBackFun) {
		var url = "singleDelete.sendProduct";
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
		var url = deliveryManagerCtroller.client_info_url.CLIENT_SHARE_APPLAY;
		jqueryAjax.asynchronusAjaxText(url, {
			"id" : id,
			"userId" : userId
		}, null, callBackFun);
	}
}