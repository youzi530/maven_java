//clientInfoCtroller
var commodityCtroller = {

	/**
	 * 客户详情
	 * 
	 * @param id
	 * @param callBackFun
	 *            回调函数
	 */
	clientInfoDetail : function(id, callBackFun) {
		console.log("传进servlet"+id);
		var url = "kanBypid.product";
		jqueryAjax.synchronizeAjaxText(url, {
			 "id" : id,
		}, null, callBackFun);
	},

	/**
	 *  凌巧自己写的函数：查所有的信息
	 */
	viewPro:function(callBackFun){
		var url = "supplier.product";
		jqueryAjax.synchronizeAjaxText(url, {

		}, null, callBackFun);
	},

	/**
	 * 添加客户
	 *
	 *    回调函数
	 */
	clientInfoAdd : function(jsonproductData, callBackFun) {
		console.log("传过去的，没pid："+jsonproductData);
		var url = "add.product";
		var data = {
			"jsonproductData" : jsonproductData

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
		var url = "edit.product";
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
	    //console.log(ids);
		var url = "manyDelete.product";
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
		var url = "singleDelete.product";
		jqueryAjax.synchronizeAjaxText(url, {
			"id" : id
		}, null, callBackFun);
	},

	/**
	 * 自己手写的删除函数
	 * @param id
	 */
	commoditySingleDel:function(id){
		$ajax({
			url:"singleDelete.product",
			type:"get",
			data:{
				"id":id,
			},
			success:function(data){

			},
			error:function(error){
				alert(error);
			}
		});
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
		var url = commodityCtroller.client_info_url.CLIENT_SHARE_APPLAY;
		jqueryAjax.asynchronusAjaxText(url, {
			"id" : id,
			"userId" : userId
		}, null, callBackFun);
	}
}