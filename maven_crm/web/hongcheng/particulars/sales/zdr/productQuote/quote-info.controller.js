
var quoteInfoCtroller = {
	//
	// client_info_url : {
	// 	CLIENT_INFO_DETAIL : common.projectPath + "client/info/client/info/detail.htl",
	// 	CLIENT_INFO_ADD : common.projectPath + "client/info/client/info/add.htl",
	// 	CLIENT_INFO_UPDATE : common.projectPath + "client/info/client/info/update.htl",
	// 	CLIENT_INFO_BATCH_DELETE : common.projectPath + "client/info/client/info/batch/delete.htl",
	// 	CLIENT_INFO_DELETE : common.projectPath + "client/info/client/info/delete.htl",
	// 	CLIENT_SHARE_APPLAY : common.projectPath + "client/info/client/share/applay.htl"
	//
	// },

	/**
	 *
	 *
	 * @param id
	 * @param callBackFun
	 *            回调函数
	 */
	clientInfoDetail : function(id, callBackFun) {
		var url ="modify.quote" ;
		jqueryAjax.synchronizeAjax(url, {
			"id" : id
		}, null, callBackFun);
	},
	shangp: function(callBackFun) {
		var url ="shangping.quote" ;
		jqueryAjax.synchronizeAjax(url, {
		}, null, callBackFun);
	},
	/**
	 * 添加客户
	 *
	 * @param clientName
	 *            客户名称
	 * @param workAddress
	 *            工作地址
	 * @param mainPhone
	 *            主要联系电话
	 * @param zipCode
	 *            邮编
	 * @param email
	 *            邮箱
	 * @param province
	 *            省
	 * @param city
	 *            市
	 * @param town
	 *            县/区
	 * @param industry
	 *            行业
	 * @param rank
	 *            级别
	 * @param creditGrade
	 *            等级
	 * @param creditLimit
	 *            额度
	 * @param superCompany
	 *            上级单位
	 * @param financePhone
	 *            财务电话
	 * @param companyHome
	 *            主页
	 * @param registerTime
	 *            注册时间
	 * @param principal
	 *            负责人
	 * @param responDepart
	 *            负责部门
	 * @param remark
	 *            备注
	 * @param callBackFun
	 *            回调函数
	 */
	clientInfoAdd : function(jsoncall, callBackFun) {
		var url = "add.quote";
		var data = {
		"jsoncall":jsoncall
		};
		jqueryAjax.asynchronusAjaxText(url, data, null, callBackFun);
	},
	/**
	 * 修改客户
	 *
	 * @param id
	 *            ID
	 * @param clientName
	 *            客户名称
	 * @param workAddress
	 *            工作地址
	 * @param mainPhone
	 *            主要联系电话
	 * @param zipCode
	 *            邮编
	 * @param email
	 *            邮箱
	 * @param province
	 *            省
	 * @param city
	 *            市
	 * @param town
	 *            县/区
	 * @param industry
	 *            行业
	 * @param rank
	 *            级别
	 * @param creditGrade
	 *            等级
	 * @param creditLimit
	 *            额度
	 * @param superCompany
	 *            上级单位
	 * @param financePhone
	 *            财务电话
	 * @param companyHome
	 *            主页
	 * @param registerTime
	 *            注册时间
	 * @param principal
	 *            负责人
	 * @param responDepart
	 *            负责部门
	 * @param remark
	 *            备注
	 * @param callBackFun
	 *            回调函数
	 */
	clientInfoUpdate : function(jsonsha, callBackFun) {
		var url = "replace.quote";
		var data = {
			"jsonsha":jsonsha
		};
		jqueryAjax.asynchronusAjaxText(url, data, null, callBackFun);
	},

	/**
	 * 批量删除客户信息
	 *
	 * @param ids
	 *            客户ID集合
	 */
	clientInfoBatchDel : function(ids2, callBackFun) {
		var url = "chakan.quote";
		var  s=JSON.stringify(ids2);
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
	clientInfoDel : function(id, callBackFun) {
		var url = "delete.quote";
		console.log(id);
		jqueryAjax.asynchronusAjaxText(url, {
				"id":id
			},
			null, callBackFun);
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
		var url = quoteInfoCtroller.client_info_url.CLIENT_SHARE_APPLAY;
		jqueryAjax.asynchronusAjaxText(url, {
			"id" : id,
			"userId" : userId
		}, null, callBackFun);
	}
}