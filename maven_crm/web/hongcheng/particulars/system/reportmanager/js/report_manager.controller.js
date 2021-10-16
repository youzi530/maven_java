var clientInfoCtroller = {
		client_info_url : {
			USER_INFO_DETAIL: common.projectPath + "/user/info/detail.htl",
			Client_INFO_RANK : common.projectPath + "/client/info/clientInfoRank.htl",
		},

		/**
		 * 查询级别
		 * @param id
		 * @param callBackFun 成功回调函数
		 */
		queryRank: function(callBackFun) {
			var url = clientInfoCtroller.client_info_url.Client_INFO_RANK;
			jqueryAjax.synchronizeAjax(url, {}, null, callBackFun);
		}
}
