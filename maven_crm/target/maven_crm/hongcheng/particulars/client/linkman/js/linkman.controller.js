var linkmanController = {
	linkman_url : {
		LINKMAN_DETAIL : "getOne.linkman",
		LINKMAN_ADD : "add.linkman",
		LINKMAN_UPDATE : "update.linkman",
		LINKMAN_DELETE : "deleteOne.linkman",
		LINKMAN_BATCH_DELETE : "deleteMore.linkman"
	},

	cliUserFind:function(name,callBackFun){
		var url = "likeCliUser.linkman";
		var data = {
			"name":name
		}
		jqueryAjax.asynchronusAjaxText(url, data, null, callBackFun);
	},

	/**
	 * 联系人详情
	 * 
	 * @param id
	 *            ID
	 * @param callBackFun
	 *            回调函数
	 */
	linkmanDetail : function(id, callBackFun) {
		var url = linkmanController.linkman_url.LINKMAN_DETAIL;
		jqueryAjax.synchronizeAjax(url, {
			"userId" : id
		}, null, callBackFun);
	},

	/**
	 * 添加联系人
	 *
	 */
	linkmanAdd : function(linkmanName,identity,sex,birValue,status,
						  mobilePhone,email,account,password,entryValue, callBackFun) {

		var url = linkmanController.linkman_url.LINKMAN_ADD;
		var data = {
			"linkmanName" : linkmanName,
			"identity":identity,
			"sex" : sex,
			"birValue" : birValue,
			"status" : status,
			"mobilePhone" : mobilePhone,
			"email" : email,
			"account" : account,
			"password" : password,
			"entryValue" : entryValue
		}
		jqueryAjax.asynchronusAjaxText(url, data, null, callBackFun);
	},
	
	/**
	 * 修改联系人
	 *
	 */
	linkmanUpdate: function(userId, linkmanName,identity,sex,birValue,status,
							mobilePhone,email,account,password,entryValue, callBackFun) {
		var url = linkmanController.linkman_url.LINKMAN_UPDATE;
		var data = {
			"userId" : userId,
			"linkmanName" : linkmanName,
			"identity":identity,
			"sex" : sex,
			"birValue" : birValue,
			"status" : status,
			"mobilePhone" : mobilePhone,
			"email" : email,
			"account" : account,
			"password" : password,
			"entryValue" : entryValue
		}

		jqueryAjax.asynchronusAjaxText(url, data, null, callBackFun);
	},
	
	/**
	 * 删除联系人
	 * 
	 * @param id
	 *            ID
	 * @param callBackFun
	 *            回调函数
	 */
	linkmanDetele: function(id, callBackFun) {
		var url = linkmanController.linkman_url.LINKMAN_DELETE;
		jqueryAjax.asynchronusAjaxText(url, {"userId": id}, null, callBackFun);
	},
	
	/**
	 * 批量删除联系人
	 * 
	 * @param ids
	 *            联系人ID集合
	 * @param callBackFun
	 *            回调函数
	 */
	linkmanBatchDelete: function(ids, callBackFun) {
		var url = linkmanController.linkman_url.LINKMAN_BATCH_DELETE;
		jqueryAjax.asynchronusAjaxText(url, {"ids":JSON.stringify(ids)}, null, callBackFun);
	}
}