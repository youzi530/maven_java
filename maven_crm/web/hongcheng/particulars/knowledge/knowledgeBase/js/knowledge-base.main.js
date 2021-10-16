var knowledgeMain = {
		// 虽然 bootstrap-table 提供了用于查询的按钮，但这里我们采用自定按钮
		queryTableParam: {},
		
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
			    queryParams: function(params){
			    	$.extend(params,knowledgeMain.queryTableParam);
			    	knowledgeMain.queryTableParam = {};
			    	return params;
			    },
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
			    },{
			        field: 'readNum',
			        title: '阅读次数'
			    },{
			        field: 'issuer',
			        title: '发布人'
			    } ]
			});
		},
		
		/**
		 * 知识详情
		 */
		knowledgeDetail: function(id, type) {
			knowledgeCtroller.knowledgeDetail(id,function(data){
				var content = knowledgeInfoHTML.knowledgeInfoHTML();
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
		        
		        $("#"+modelId+" #addCollect").click(function(){
		        	knowledgeCtroller.knowledgeAddCollect(data.id,function(result){
		        		sweetAlert.caution("温馨提示", result.msg);
		        	});
	        		return false;
		        });
			});
		},
		
		
		querySearch:function(){
			knowledgeMain.queryTableParam = {
					"content": $("#my_knowledge #searchContent").val()
			};
			knowledgeMain.query('knowledge/search.htl');
		},
		
		
		queryTable:function(){
			knowledgeMain.query('knowledge/knowledgeAllInfo.htl')
		},
		/**
		 * 初始化
		 */
		queryInit: function(){
			knowledgeMain.queryTable();
		},
}
/**
 * bootstrap-table event 事件
 */
window.clientEvent = {
	"click .like":function(e,value,row,index){
		knowledgeMain.knowledgeDetail(row.id, 'detail');
	}
}
$(document).ready(function(){
	knowledgeMain.queryInit();
});