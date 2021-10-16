var vertifyActivitiHTML = {
		/**
		 * table片段
		 */
		queryColumns: function() {
			var uid = common.userInfo.id;
			var checkbox = {
					"checkbox": true
			};
			
			var cId = {
					"field": "id",
					"title": "ID",
					"visible": false,
					"sortable": false	
			};
			var processInstanceId = {
					"field": "processInstanceId",
					"title": "流程ID",
					"visible": false,
					"sortable": false	
			};
			var clientName = {
					"field": "clientName",
					"title": "客户名称",
					"visible": true,
					"sortable": false,
					"events": clientActivitEvent,
					"formatter": function(value,row,index) {
						return "<a class='like' href='javascript:void(0);' title="+value+">"+value+"</a>";
					}
			};
			var workAddress = {
					"field": "workAddress",
					"title": "工作地址"	
			};
			var email = {
					"field": "email",
					"title": "电子邮箱"	
			};
			var userName = {
					"field": "userName",
					"title": "申请人"
			};
			var receiveName = {
					"field": "receiveName",
					"title": "共享人"
			};
			var approveName = {
					"field": "approveName",
					"title": "审批人"
			};
			var operation = {
					"field": "approveUserId",
					"title": "操作",
					"width": "100px",
					"formatter": function(value,row,index) {
						var disabled = true;
						if (value == uid) {
							disabled = false;
						}
						var str = "<a href='javascript:void(0);' disabled="+disabled+" onclick='myActivitiMain.shareApprove(\""+row.id+"\", \""+row.processInstanceId+"\")' title='同意' style='margin-left: 10px;margin-right: 10px;'><i class='fa fa-pencil'></i></a>";
						str += "<a href='javascript:void(0);' disabled="+disabled+" onclick='myActivitiMain.shareTurnDown(\""+row.id+"\", \""+row.processInstanceId+"\")' title='驳回' style='margin-right: 10px;'><i class='fa fa-reply'></i></a>";
						str += "<a href='javascript:void(0);' disabled="+disabled+" onclick='myActivitiMain.shareRefuse(\""+row.id+"\", \""+row.processInstanceId+"\")' title='拒绝'><i class='fa fa-times'></i></a>";
						return str;
					}
			};
			var queryArray = new Array();
			queryArray.push(checkbox);
			queryArray.push(cId);
			queryArray.push(processInstanceId);
			queryArray.push(clientName);
			queryArray.push(workAddress);
			queryArray.push(email);
			queryArray.push(userName);
			queryArray.push(receiveName);
			queryArray.push(approveName);
			queryArray.push(operation);
			
			return queryArray;
		}
}