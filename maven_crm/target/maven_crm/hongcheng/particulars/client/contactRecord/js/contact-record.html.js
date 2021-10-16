var concatHTML = {
		/**
		 * 查询条件
		 */
		queryHTML: function() {
			var queryHtml = 
					'<div class="form-inline center-block" style="margin-left: 10px;">'+
						'<div class="row" style="margin-top: 10px;margin-right: 0px;">'+
							'<div class="col-sm-5">'+
								'<button type="button" class="btn btn-info btn-sm" onclick="contactMain.addContact()" style="margin-right: 0.5em;">'+
									'<i class="fa fa-plus"></i>添加'+
								'</button>'+
								'<button type="button" class="btn btn-info btn-sm" onclick="contactMain.updContact(\'\')" style="margin-right: 0.5em;">'+
									'<i class="fa fa-pencil"></i>修改'+
								'</button>'+
								'<button type="button" class="btn btn-info btn-sm" onclick="contactMain.delBatchContact()" style="margin-right: 0.5em;">'+
									'<i class="fa fa-minus"></i>删除'+
								'</button>'+
							'</div>'+
							'<div class="col-sm-5">'+
								'<div class="form-group">'+
									'<label for="clientName_" style="width: 80px;text-align:right;">记录时间：</label>'+
									'<input type="text" class="form-control" id="contactTime_" readonly="readonly" placeholder="记录时间" style="width: 200px;">'+
								'</div>'+
							'</div>'+
							'<div class="col-sm-2" style="float: right;margin-top: -10px;">'+
								'<div class="form-inline" style="float: right; margin-right: 10px;min-width:168px;text-align:right;">'+
									'<input type="button" title="重置" value="重置" class="btn navbar-btn btn-info btn-sm" style="margin-right:0.5em;" onClick="contactMain.resetFun()">'+
									'<input type="button" title="查询" value="查询" class="btn navbar-btn btn-info btn-sm" style="margin-right:0.5em;" onClick="contactMain.queryFun()">'+
									/*'<lable class="control-label">'+
										'<button type="button" class="btn btn-info btn-sm" title="更多条件" style="margin-bottom:4px;width:46px;height:30px;margin-left:0.5em;" onClick="contactMain.moreFun(this)">'+
											'<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>'+
										'</button>'+
									'</lable>'+*/
								'</div>'+
							'</div>'+
						'</div>'+
						/*'<div id="criteria_id" class="row" style="margin-left: 0px; margin-right: 0px; margin-top: 10px; display: none;">'+
							'<div class="row" style="margin-right: 0px; margin-bottom: 15px;">'+
								'<div class="col-sm-5">'+
									'<div class="form-group">'+
										'<label for="workAddress_" style="width: 80px;text-align:right;">客户：</label>'+
										'<input type="text" class="form-control" id="clientInfo_" placeholder="客户">'+
										'<input type="hidden" class="form-control" id="clientInfoId_">'+
									'</div>'+
								'</div>'+
								'<div class="col-sm-5">'+
									'<div class="form-group">'+
										'<label for="mainPhone_" style="width: 80px;text-align:right;">联系人：</label>'+
										'<input type="text" class="form-control" id="linkmanInfo_" placeholder="联系人">'+
										'<input type="hidden" class="form-control" id="linkmanInfoId_">'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+*/
					'</div>';
			return queryHtml;
		},
		
		/**
		 * table片段
		 */
		queryColumns: function(isCheckbox) {
			var uid = common.userInfo.id;
			var checkbox = {};
			if (isCheckbox != undefined && isCheckbox == true) {
				checkbox = {
						"checkbox": true
				};
			}
			var crId = {
					"field": "id",
					"title": "ID",
					"visible": false,
					"sortable": false	
			};
			var clientName = {
					"field": "clientName",
					"title": "客户名称",
					"width": "200px"
			};
			var linkmanName = {
					"field": "linkmanName",
					"title": "联系人",
					"width": "100px"
			};
			var content = {
					"field": "content",
					"title": "联系内容",
					"visible": true,
					"sortable": false,
					"events": contactEvent,
					"formatter": function(value,row,index) {
						return "<a class='like' href='javascript:void(0);' title="+value+">"+value+"</a>";
					}
			};
			if (isCheckbox != undefined) {
				var operation = {
						"field": "userId",
						"title": "操作",
						"width": "80px",
						"formatter": function(value,row,index) {
							if (value == uid) {
								delClick = 'contactMain.delContact("'+row.id+'")';
								var str = "<a href='javascript:void(0);' onclick='contactMain.updContact(\""+row.id+"\")' title='修改' style='margin-left: 10px;margin-right: 10px;'><i class='fa fa-wrench'></i></a>";
								str += "<a href='javascript:void(0);' onclick='contactMain.delContact(\""+row.id+"\")' title='删除'><i class='fa fa-trash-o'></i></a>";
								return str;
							}
							return "";
						}
				};
			}
			
			var queryArray = new Array();
			if (isCheckbox != undefined) {
				queryArray.push(checkbox);
			}
			queryArray.push(crId);
			queryArray.push(clientName);
			queryArray.push(linkmanName);
			queryArray.push(content);
			if (isCheckbox != undefined) {
				queryArray.push(operation);
			}
			
			return queryArray;
		},
		
		/**
		 * 联系记录详情
		 */
		contactHTML: function(modelId, method) {
			var contactHtml = '<div class="form" style="padding:5px;">';
			if (method == 'detail') {
				contactHtml += '<div class="row">';
				contactHtml += '<div class="col-sm-6">';
				contactHtml += '<div class="form-group">';
				contactHtml += '<label for="clientName">所属公司</label>';
				contactHtml += '<input type="text" class="form-control" id="clientName" placeholder="">';
				contactHtml += '</div></div>';
				
				contactHtml += '<div class="col-sm-6">';
				contactHtml += '<div class="form-group">';
				contactHtml += '<label for="userName">记录人</label>';
				contactHtml += '<input type="text" class="form-control" id="userName" placeholder="">';
				contactHtml += '</div></div></div>';
			}
			
			if (method == 'add'){
				contactHtml += '<div class="row">';
				contactHtml += '<div class="col-sm-6">';
				contactHtml += '<div class="form-group">';
				contactHtml += '<label for="clientInfo">客户<span style="color: red;">*</span></label>';
				contactHtml += '<select class="form-control" id="clientInfo">';
				//如果没有可以联系的也提示信息
				contactHtml += '<option value="请选择">请选择</option>';
				contactHtml += '</select>';
				contactHtml += '<input type="hidden" id="contactId">';
				contactHtml += '<input type="hidden" id="linkmanId">';
				contactHtml += '</div></div>';
			}else if (method == 'update'){
				contactHtml += '<div class="row">';
				contactHtml += '<div class="col-sm-6">';
				contactHtml += '<div class="form-group">';
				contactHtml += '<label for="clientInfo">客户<span style="color: red;">*</span></label>';
				contactHtml += '<input type="text" class="form-control" id="clientInfo" placeholder="" name="" disabled>';
				contactHtml += '<input type="hidden" id="contactId">';
				contactHtml += '<input type="hidden" id="linkmanId">';
				contactHtml += '</div></div>';
			}
			
			contactHtml += '<div class="col-sm-6">';
			contactHtml += '<div class="form-group">';
			contactHtml += '<label for="contactTime">联系时间<span style="color: red;">*</span></label>';
			if (method != 'detail') {
				contactHtml += '<div id="contactTimeDiv" class="input-group date form_date">';
				contactHtml += '<input class="form-control size="16" type="text" value="" id="contactTime" readonly="readonly">';
				contactHtml += '<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>';
				contactHtml += '<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>';
				contactHtml += '</div>';
			} else {
				contactHtml += '<input class="form-control size="16" type="text" value="" id="contactTime" readonly="readonly">';
			}
			contactHtml += '</div></div></div>';
			
			
			contactHtml += '<div class="row">';
			contactHtml += '<div class="col-sm-12">';
			contactHtml += '<div class="form-group">';
			contactHtml += '<label for="content">记录内容<span style="color: red;">*</span></label>';
			contactHtml += '<textarea rows="5" class="form-control" id="content" style="resize: none;"></textarea>';
			contactHtml += '</div></div></div>';
			
			
			contactHtml += '</div>';
			
			return contactHtml;
		}
}