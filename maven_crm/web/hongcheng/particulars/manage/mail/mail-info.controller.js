var mailInfoCtroller = {

	client_info_url : {
		CLIENT_INFO_DETAIL : common.projectPath + "client/info/client/info/detail.htl",
		CLIENT_INFO_ADD : common.projectPath + "client/info/client/info/add.htl",
		CLIENT_INFO_UPDATE : common.projectPath + "client/info/client/info/update.htl",
		CLIENT_INFO_BATCH_DELETE : common.projectPath + "client/info/client/info/batch/delete.htl",
		CLIENT_INFO_DELETE : common.projectPath + "client/info/client/info/delete.htl",
		CLIENT_SHARE_APPLAY : common.projectPath + "client/info/client/share/applay.htl"

	},

	/**
	 * 客户详情
	 * 
	 * @param id
	 * @param callBackFun
	 *            回调函数
	 */
	clientInfoDetail : function(id, callBackFun) {
		var url = "modify.supplier";
		jqueryAjax.asynchronusAjaxText(url, {
			"id" : id
		}, null, callBackFun);
	},
	yuanxinxi: function(callBackFun) {
		var url ="yuangong.channel" ;
		jqueryAjax.synchronizeAjax(url, {
		}, null, callBackFun);
	},
	/**
	 * 添加客户
	 * 

	 */
	clientInfoAdd : function(jsonup, callBackFun) {
		var url = "add.mail";
		var data = {
			"jsonup":jsonup
		};
		jqueryAjax.asynchronusAjaxText(url, data, null, callBackFun);
	},
	/**
	 * 修改客户
	 * 

	 */
	clientInfoUpdate : function(jsonup222, callBackFun) {
		var url = "replace.supplier";
		var data = {
			"jsonup222":jsonup222
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
		var url = "chakan.supplier";
		var  s=JSON.stringify(ids);
		console.log(s);
		jqueryAjax.asynchronusAjaxText(url, {
				"s":s
			},
			null, callBackFun);
	},

	/**
	 * 删除客户信息
	 * 
	 * @param id
	 *            客户ID
	 */
	clientInfoDel : function(id,queren,callBackFun) {
		var url ="delete.mail"
		jqueryAjax.asynchronusAjaxText(url, {
			"id" : id,
			"queren":queren
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
		var url = mailInfoCtroller.client_info_url.CLIENT_SHARE_APPLAY;
		jqueryAjax.asynchronusAjaxText(url, {
			"id" : id,
			"userId" : userId
		}, null, callBackFun);
	}
}