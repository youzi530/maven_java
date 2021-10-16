//clientInfoCtroller
var salesManagerCtroller = {

	/**
	 *  凌巧自己写的函数：查userInfo表中的realName
	 */
	viewProNumByid:function(id,callBackFun){
		var url = "kanBypid.product";
		jqueryAjax.synchronizeAjaxText(url, {
			"id" : id
		}, null, callBackFun);
	},


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
	 * 客户详情
	 * 
	 * @param id
	 * @param callBackFun
	 *            回调函数
	 */
	clientInfoDetail : function(id, callBackFun) {
		var url = "kanBypid.sales";
		jqueryAjax.synchronizeAjaxText(url, {
			"cid" : id
		}, null, callBackFun);
	},

	/**
	 * 添加客户
	 * 
	 * @param pName
	 *            商品名称
	 * @param salePrice
	 *            商品价格
	 * @param saleNum
	 *            商品数量
	 * @param username
	 *            销售员（职员姓名）
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
	clientInfoAdd : function(jsonpurchaseData, callBackFun) {
		var url = "add.sales";
		var data = {
			"jsonpurchaseData" : jsonpurchaseData
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
	 * @param salePrice
	 *            商品价格
	 * @param saleNum
	 *            商品数量
	 * @param username
	 *            销售员（职员姓名）
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
	clientInfoUpdate : function(jsonproductData, callBackFun) {
		var url = "edit.sales";
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
		var url = "manyDelete.sales";
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
		var url = "singleDelete.sales";
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
		var url = "";
		jqueryAjax.asynchronusAjaxText(url, {
			"id" : id,
			"userId" : userId
		}, null, callBackFun);
	}
}