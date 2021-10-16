var knowledgeInfoHTML = {

	/**
	 * 知识详情
	 */
	knowledgeInfoHTML : function() {

		var knowledgeHtml = '<form id="knowledgeForm" enctype="multipart/form-data">';

		knowledgeHtml += '<div class="form" style="padding:5px;">';
		knowledgeHtml += '<div class="row">';
		knowledgeHtml += '<div class="col-sm-12">';
		knowledgeHtml += '<div class="form-group">';
		knowledgeHtml += '<label for="responDepart">文章标题</label>';
		knowledgeHtml += '<input name="title" type="text" class="form-control" id="title" placeholder="">';
		knowledgeHtml += '</div></div></div>';

		knowledgeHtml += '<div class="row">';
		knowledgeHtml += '<div class="col-sm-12">';
		knowledgeHtml += '<div class="form-group">';
		knowledgeHtml += '<label for="remark">文章内容</label>';
		knowledgeHtml += '<div id="detailContent"></div>';
		knowledgeHtml += '</div></div></div>';

		knowledgeHtml += '<div class="row">';
		
		knowledgeHtml += '<div class="col-sm-10">';
		knowledgeHtml += '<div class="form-group">';
		knowledgeHtml += '<label for="remark">文章附件</label>';
		knowledgeHtml += '<div id="file"></div>';
		knowledgeHtml += '</div></div>';
		
		
		knowledgeHtml += '<div class="col-sm-2">';
		knowledgeHtml += '<div class="form-group">';
		knowledgeHtml += '<label for="remark"><a id="addCollect" href="#">收藏</a></label>';
		knowledgeHtml += '</div></div></div>';

		knowledgeHtml += '</div>';
		knowledgeHtml += '</form>';
		return knowledgeHtml;
	}
}