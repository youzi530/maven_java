var knowledgeCtroller = {
		knowledge_url : {
			KNOWLEDGE_DETAIL: common.projectPath + "knowledge/detail.htl",
			ACCESSORY_DOWNLOAD: common.projectPath + "knowledge/download.htl"
		},
		/**
		 * 知识详情
		 * @param id
		 * @param callBackFun 回调函数
		 */
		knowledgeDetail: function(id, callBackFun) {
			var url = knowledgeCtroller.knowledge_url.KNOWLEDGE_DETAIL;
			jqueryAjax.synchronizeAjax(url, {"id": id}, null, callBackFun);
		},
		
		/**
		 * 附件下载
		 * @param id
		 * @param callBackFun 回调函数
		 */
		accessoryDownload:function(id,callBackFun){
			jqueryAjax.synchronizeAjax(knowledgeCtroller.knowledge_url.ACCESSORY_DOWNLOAD, {"id": id},null,callBackFun);
		}
		
		
		
}