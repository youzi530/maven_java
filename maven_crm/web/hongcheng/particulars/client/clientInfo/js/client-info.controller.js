var clientInfoCtroller = {

	client_info_url : {
		CLIENT_INFO_DETAIL : "getOne.client",
		CLIENT_INFO_ADD :"add.client",
		CLIENT_INFO_UPDATE : "update.client",
		CLIENT_INFO_BATCH_DELETE : "moreDelete.client",
		CLIENT_INFO_DELETE : "oneDelete.client",
		CLIENT_SHARE_APPLAY : "share.client",
        CLIENT_INFO_FIND:"find.client"
	},

    /**
     * 查找客户
     * @param clientName 姓名
     * @param workAddress 工作地址
     * @param mainPhone 主要电话
     * @param province 省
     * @param city 市
     * @param town 县
     * @param callBackFun 回调函数
     */
    clientFind:function(userId,clientName, workAddress,province, city, town,callBackFun){
	    var url = clientInfoCtroller.client_info_url.CLIENT_INFO_FIND;
        var data = {
            "userId":userId,
            "clientName" : clientName,
            "workAddress" : workAddress,
            "province" : province,
            "city" : city,
            "town" : town
        };
        jqueryAjax.asynchronusAjaxText(url, data, null, callBackFun);
    },

	/**
	 * 客户详情
	 * 
	 * @param id
	 * @param callBackFun
	 *            回调函数
	 */
	clientInfoDetail : function(id, callBackFun) {
		var url = clientInfoCtroller.client_info_url.CLIENT_INFO_DETAIL;
		jqueryAjax.synchronizeAjax(url, {
			"clientId" : id
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
	clientInfoAdd : function(clientName, workAddress, mainPhone, zipCode,
			email, province, city, town, industry, rank, creditGrade,
			creditLimit, superCompany, financePhone, companyHome, registerTime,remark,userId,callBackFun) {
		var url = clientInfoCtroller.client_info_url.CLIENT_INFO_ADD;
		var data = {
			"clientName" : clientName,
			"workAddress" : workAddress,
			"mainPhone" : mainPhone,
			"zipCode" : zipCode,
			"email" : email,
			"province" : province,
			"city" : city,
			"town" : town,
			"industry" : industry,
			"rank" : rank,
			"creditGrade" : creditGrade,
			"creditLimit" : creditLimit,
			"superCompany" : superCompany,
			"financePhone" : financePhone,
			"companyHome" : companyHome,
			"remark" : remark,
			"registerTime" : registerTime,
			"userId":userId,
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
	clientInfoUpdate : function(id, clientName, workAddress, mainPhone,
			zipCode, email, province, city, town, industry, rank, creditGrade,
			creditLimit, superCompany, financePhone, companyHome, registerTime,
			 remark, userId,status,callBackFun) {
		var url = clientInfoCtroller.client_info_url.CLIENT_INFO_UPDATE;
		var data = {
			"clientId" : id,
			"clientName" : clientName,
			"workAddress" : workAddress,
			"mainPhone" : mainPhone,
			"zipCode" : zipCode,
			"email" : email,
			"province" : province,
			"city" : city,
			"town" : town,
			"industry" : industry,
			"rank" : rank,
			"creditGrade" : creditGrade,
			"creditLimit" : creditLimit,
			"superCompany" : superCompany,
			"financePhone" : financePhone,
			"companyHome" : companyHome,
			"remark" : remark,
			"registerTime" : registerTime,
            "userId":userId,
            "status":status
		};
		jqueryAjax.asynchronusAjaxText(url, data, null, callBackFun);
	},

	/**
	 * 批量删除客户信息
	 * 
	 * @param ids
	 *            客户ID集合
	 */
	clientInfoBatchDel : function(ids,userids, callBackFun) {
		var url = clientInfoCtroller.client_info_url.CLIENT_INFO_BATCH_DELETE;
		jqueryAjax.asynchronusAjaxText(url, {"ids":JSON.stringify(ids),"userids":JSON.stringify(userids)}, null, callBackFun);
	},

	/**
	 * 删除客户信息
	 * 
	 * @param id
	 *            客户ID
	 */
	clientInfoDel : function(id, userId,callBackFun) {
		var url = clientInfoCtroller.client_info_url.CLIENT_INFO_DELETE;
		jqueryAjax.asynchronusAjaxText(url, {
			"clientId" : id,
			"userId":userId
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
	clientShareApplay:function(ids, userId, callBackFun) {
		var url = clientInfoCtroller.client_info_url.CLIENT_SHARE_APPLAY;
		jqueryAjax.asynchronusAjaxText(url, {
			"ids" : JSON.stringify(ids),
			"userId" : userId
		}, null, callBackFun);
	}
}