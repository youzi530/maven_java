var knowledgeMain = {
		query:function(url) {
			$("#my_knowledge #knowledge_table").bootstrapTable('destroy');
			$("#my_knowledge #knowledge_table").bootstrapTable({
			    method: 'post',
			    url: common.projectPath + url,
			    cache: false,
			    striped: false,
			    pagination: true,
			    pageSize: 10,
			    pageList: [10, 25, 50, 100, 200],
			    search: false,
			    columns: [{  
                    title: 'Number',//标题  可不加  
                    formatter: function (value, row, index) {  
                        return index+1;  
                    }  
                  }, {
			        field: 'title',
			        title: '文章标题',
			        events: clientEvent,
					formatter: function(value,row,index) {
						return "<a class='like' href='javascript:void(0);' title="+value+">"+value+"</a>";
					}
			    } ]
			});
		},
		
		/**
		 * 知识详情
		 */
		knowledgeDetail: function(id, type) {
			knowledgeCtroller.knowledgeDetail(id,function(data){
				var content = knowledgeInfoHTML.knowledgeInfoHTML(type);
				var modelId = "knowledge" + type + "Model";
				commFun.noModel(modelId, "知识详情",1000,700, content, null, null, true);
				//UE.delEditor('container');
				//var ue = UE.getEditor("container",{ toolbars:[['fullscreen']]});
				$("#"+modelId+" #title").attr("disabled",true).val(data.title);
				$("#"+modelId+" #detailContent").append(data.content);
				
				
				//判断ueditor 编辑器是否创建成功
		       /* ue.addListener("ready", function () {
		        	ue.setContent(data.content);
		        	//ue.setDisabled();
		        });*/
		        
		        if(data.file == undefined){
		        	$("#"+modelId+" #file").text("无附件");
		        }else{
		        	$("#"+modelId+" #file").html('<a id="download" href="#">'+data.file+'</a>');
		        	
		        	$("#download").click(function(){
		        		knowledgeCtroller.accessoryDownload(data.id,function(result){
		        			sweetAlert.caution("温馨提示", result.msg);
		        		});
		        		return false;
		        	});
		        }
			});
		},
		
		queryCollectTable:function(){
			knowledgeMain.query('knowledge/collectInfo.htl')
		},
		
		queryTable:function(){
			knowledgeMain.query('knowledge/knowledgeInfo.htl')
		},
		
		/**
		 * 初始化
		 */
		queryInit: function(){
			
			knowledgeMain.queryTable();
		},
		/**
		 * 添加知识
		 */
		add: function(value,row,index) {
			
			var content = knowledgeInfoHTML.knowledgeInfoHTML();
			var str = new Date().getTime();
			commFun.noModel("knowledgeDetailModel"+str, "添加知识",700,500, content, function(){
				
				var options = {
						  url : common.projectPath + 'knowledge/addKnowledge.htl',
				          type:"POST",
						  success : function(result) { 
							 sweetAlert.caution("温馨提示", result.msg);
							 if(result.msg == "添加成功"){
								 $.noModel("closeModel", "knowledgeDetailModel"+str);
								 $("#my_knowledge #knowledge_table").bootstrapTable("refresh");
							 }
						  }, 
						  error : function(result) { 
							  sweetAlert.error("错误提示", "操作失败");
						  } 
						 };
				
				$("#knowledgeForm").ajaxSubmit(options);
			},null, false);
			
			UE.delEditor('container');
			var ue = UE.getEditor("container");
		},
}