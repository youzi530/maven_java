var knowledgeInfoHTML = {
		
		/**
		 * 知识详情/新增 HTML
		 */
		knowledgeInfoHTML: function(type) {
			
			var knowledgeHtml = '<form id="knowledgeForm" enctype="multipart/form-data">';
						
			knowledgeHtml += '<div class="form" style="padding:5px;">';
			knowledgeHtml += '<div class="row">';
			knowledgeHtml += '<div class="col-sm-12">';
			knowledgeHtml += '<div class="form-group">';
			knowledgeHtml += '<label for="responDepart">文章标题</label>';
			knowledgeHtml += '<input name="title" type="text" class="form-control" id="title" placeholder="">';
			knowledgeHtml += '</div></div></div>';
			
			
		
			
			
			if(type == "detail"){
				knowledgeHtml += '<div class="row">';
				knowledgeHtml += '<div class="col-sm-12">';
				knowledgeHtml += '<div class="form-group">';
				knowledgeHtml += '<label for="remark">文章内容</label>';
				knowledgeHtml += '<div id="detailContent"></div>';
				knowledgeHtml += '</div></div></div>';
				
				knowledgeHtml += '<div class="row">';
				knowledgeHtml += '<div class="col-sm-12">';
				knowledgeHtml += '<div class="form-group">';
				knowledgeHtml += '<label for="remark">文章附件</label>';
				knowledgeHtml += '<div id="file"></div>';
				knowledgeHtml += '</div></div></div>';
			}else{
				knowledgeHtml += '<div class="row">';
				knowledgeHtml += '<div class="col-sm-12">';
				knowledgeHtml += '<div class="form-group">';
				knowledgeHtml += '<label for="remark">文章内容</label>';
				knowledgeHtml += '<script id="container" name="content" type="text/plain"></script>';
				knowledgeHtml += '</div></div></div>';
				
				knowledgeHtml += '<div class="row">';
				knowledgeHtml += '<div class="col-sm-12">';
				knowledgeHtml += '<div class="form-group">';
				knowledgeHtml += '<label for="remark">文件上传</label>';
				knowledgeHtml += '<input name="file" type="file" class="form-control" id="file" placeholder="">';
				knowledgeHtml += '</div></div></div>';
			}
			
			knowledgeHtml += '</div>';
			knowledgeHtml   += '</form>';
			return knowledgeHtml;
		}
}