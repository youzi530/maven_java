var contactController = {
	contact_url : {
		CONTACT_DETAIL : "",
		CONTACT_ADD : "add.contactRecord",
		CONTACT_UPD : "update.contactRecord",
		CONTACT_DEL : "deleteOne.contactRecord",
		CONTACT_BATCH_DEL : "deleteMore.contactRecord"
	},

	/**
	 * 联系详情
	 * 
	 * @param id
	 *            ID
	 * @param callBackFun
	 *            回调函数
	 */
	contactDetail : function(id, callBackFun) {
		var url = contactController.contact_url.CONTACT_DETAIL;
		jqueryAjax.synchronizeAjax(url, {
			"id" : id
		}, null, callBackFun);
	},

	/**
	 * 添加联系记录
	 * 
	 * @param linkmanId
	 *            联系人ID
	 * @param content
	 *            联系内容
	 * @param contactTimeStr
	 *            联系时间
	 * @param callBackFun
	 *            回调函数
	 */
	contactAdd : function(linkmanId,cliId, content, contactTimeStr, callBackFun) {
		var url = contactController.contact_url.CONTACT_ADD;
		jqueryAjax.asynchronusAjaxText(url, {
			"linkmanId" : linkmanId,
			"cliId":cliId,
			"content" : content,
			"contactTimeStr" : contactTimeStr
		}, null, callBackFun);
	},

	/**
	 * 修改联系记录
	 * 
	 * @param id
	 *            ID
	 * @param linkmanId
	 *            联系人ID
	 * @param content
	 *            联系内容
	 * @param contactTimeStr
	 *            联系时间
	 * @param callBackFun
	 *            回调函数
	 */
	contactUpdate : function(id,content, contactTimeStr,
			callBackFun) {
		var url = contactController.contact_url.CONTACT_UPD;
		jqueryAjax.asynchronusAjaxText(url, {
			"id" : id,
			"content" : content,
			"contactTimeStr" : contactTimeStr
		}, null, callBackFun);
	},

	/**
	 * 删除联系记录
	 * 
	 * @param id
	 *            ID
	 * @param callBackFun
	 *            回调函数
	 */
	contactDel : function(id, callBackFun) {
		var url = contactController.contact_url.CONTACT_DEL;
		jqueryAjax.asynchronusAjaxText(url, {
			"id" : id
		}, null, callBackFun);
	},

	/**
	 * 批量删除联系记录
	 * 
	 * @param ids
	 *            ID集合
	 * @param callBackFun
	 *            回调函数
	 */
	contacBatchtDel : function(ids, callBackFun) {
		var url = contactController.contact_url.CONTACT_BATCH_DEL;
		jqueryAjax.asynchronusAjaxText(url, {"ids":JSON.stringify(ids)}, null, callBackFun);
	}
}