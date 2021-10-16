//commodityCtroller
var emarketActivitiesCtroller = {

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
	 * 客户详情
	 * 
	 * @param id
	 * @param callBackFun
	 *            回调函数
	 */
	clientInfoDetail : function(id, callBackFun) {
		console.log("传进servlet"+id);
		var url = "kanBypid.emarkrtAcivity";
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
	 * @param pName
	 *            商品名称
	 * @param sName
	 *            供应商名称
	 * @param pType
	 *            商品类别
	 * @param pPrice
	 *            商品价格
	 * @param pNum
	 *            商品数量
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
	 * @param pDescription
	 *            商品描述
	 * @param callBackFun
	 *            回调函数
	 */
	clientInfoAdd : function(jsonproductData, callBackFun) {
		console.log("传过去的，没pid："+jsonproductData);
		var url = "add.emarkrtAcivity";
		var data = {
			"jsonproductData" : jsonproductData

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
	 * @param sName
	 *            供应商名称
	 * @param pType
	 *            商品类别
	 * @param pPrice
	 *            商品价格
	 * @param pNum
	 *            商品数量
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
	 * @param pDescription
	 *            商品描述
	 * @param callBackFun
	 *            回调函数
	 */
	clientInfoUpdate : function(jsonproductData, callBackFun) {
		var url = "edit.emarkrtAcivity";
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
		var url = "manyDelete.emarkrtAcivity";
		jqueryAjax.asynchronusAjaxText(url, {"ids":JSON.stringify(ids)},
				null, callBackFun);
	},

	/**
	 * 删除客户信息
	 * 
	 * @param id
	 *            客户ID
	 */
	clientInfoDel : function(mid, callBackFun) {
		var url = "singleDelete.emarkrtAcivity";
		jqueryAjax.synchronizeAjaxText(url, {
			"mid" : mid
		}, null, callBackFun);
	},

	/**
	 * 自己手写的删除函数
	 * @param id
	 */
	commoditySingleDel:function(id){
		$ajax({
			url:"singleDelete.emarkrtAcivity",
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
		var url = emarketActivitiesCtroller.client_info_url.CLIENT_SHARE_APPLAY;
		jqueryAjax.asynchronusAjaxText(url, {
			"id" : id,
			"userId" : userId
		}, null, callBackFun);
	}
}