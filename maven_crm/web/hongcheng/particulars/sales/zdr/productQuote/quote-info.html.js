var quoteInfoHTML = {
		/**
		 * 查询条件
		 */
		queryHTML: function() {
			var queryHtml = 
					'<div class="form-inline center-block" style="margin-left: 10px;">'+
						'<div class="row" style="margin-top: 10px;margin-right: 0px;">'+
							'<div class="col-sm-5">'+
								'<button type="button" class="btn btn-info btn-sm" onclick="quoteInfoMain.addClient()" style="margin-right: 0.5em;">'+
									'<i class="fa fa-plus"></i>添加'+
								'</button>'+
								'<button type="button" class="btn btn-info btn-sm" onclick="quoteInfoMain.updClient(\'\')" style="margin-right: 0.5em;">'+
									'<i class="fa fa-pencil"></i>修改'+
								'</button>'+
								'<button type="button" class="btn btn-info btn-sm" onclick="quoteInfoMain.delBatchClient()" style="margin-right: 0.5em;">'+
									'<i class="fa fa-minus"></i>删除'+
								'</button>'+
								'<button type="button" class="btn btn-info btn-sm" onclick="quoteInfoMain.shareApplayClient()" style="margin-right: 0.5em;">'+
									'<i class="fa fa-reply-all"></i>共享'+
								'</button>'+
							'</div>'+
							'<div class="col-sm-5">'+
								'<div class="form-group">'+
									'<label for="clientName_">客户名称：</label>'+
									'<input type="text" class="form-control" id="clientName_" placeholder="客户名称">'+
								'</div>'+
							'</div>'+
							'<div class="col-sm-2" style="float: right;margin-top: -10px;">'+
								'<div class="form-inline" style="float: right; margin-right: 10px;min-width:168px;text-align:right;">'+
									'<input type="button" title="重置" value="重置" class="btn navbar-btn btn-info btn-sm" style="margin-right:0.5em;" onClick="quoteInfoMain.resetFun()">'+
									'<input type="button" title="查询" value="查询" class="btn navbar-btn btn-info btn-sm" style="margin-right:0.5em;" onClick="quoteInfoMain.queryFun()">'+
									'<lable class="control-label">'+
										'<button type="button" class="btn btn-info btn-sm" title="更多条件" style="margin-bottom:4px;width:46px;height:30px;margin-left:0.5em;" onClick="quoteInfoMain.moreFun(this)">'+
											'<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>'+
										'</button>'+
									'</lable>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div id="criteria_id" class="row" style="margin-left: 0px; margin-right: 0px; margin-top: 10px; display: none;">'+
							'<div class="row" style="margin-right: 0px; margin-bottom: 15px;">'+
								'<div class="col-sm-5">'+
									'<div class="form-group">'+
										'<label for="workAddress_">工作地址：</label>'+
										'<input type="text" class="form-control" id="workAddress_" placeholder="客户地址">'+
									'</div>'+
								'</div>'+
								'<div class="col-sm-5">'+
									'<div class="form-group">'+
										'<label for="mainPhone_">联系电话：</label>'+
										'<input type="text" class="form-control" id="mainPhone_" placeholder="联系电话">'+
									'</div>'+
								'</div>'+
							'</div>'+
							'<div class="row" style="margin-top: 15px; margin-right: 0px; margin-bottom: 15px;">'+
								'<div class="col-sm-12">'+
									'<div class="form-group">'+
										'<label for="distpicker_">所在城市：</label>'+
										'<div id="distpicker_" style="float: right;">'+
											'<select class="form-control" id="loc_province"></select>'+
											'<select class="form-control" id="loc_city"></select>'+
											'<select class="form-control" id="loc_town"></select>'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
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
			if (isCheckbox != undefined && isCheckbox == false) {
				checkbox = {
						"radio": true
				};
			}
			
			var cId = {
					"field": "id",
					"title": "ID",
					"visible": false,
					"sortable": false	
			};
			var clientName = {
					"field": "clientName",
					"title": "客户名称",
					"visible": true,
					"sortable": false,
					"events": clientEvent,
					"formatter": function(value,row,index) {
						return "<a class='like' href='javascript:void(0);' title="+value+">"+value+"</a>";
					}
			};
			var workAddress = {
					"field": "workAddress",
					"title": "工作地址"	
			};
			var mainPhone = {
					"field": "mainPhone",
					"title": "主要联系方式"	
			};
			var rank = {
					"field": "rank",
					"title": "客户级别",
					"formatter": function(value,row,index) {
						var res = "";
						switch (value) {
						case 1:
							res = "潜在客户";
							break;
						case 2:
							res = "合作伙伴";
							break;
						case 3:
							res = "忠实客户";
							break;
						case 4:
							res = "代理商";
							break;
						case 5:
							res = "战略合作";
							break;

						default:
							break;
						}
						
						return res;
					}
			};
			var creditGrade = {
					"field": "creditGrade",
					"title": "信用等级",
					"formatter": function(value,row,index) {
						if (value < 1) return "";
						if (value > 5) return "";
						var res = "<span style='color:#f0b80e;'>";
						for (var i = 0; i < value; i++) {
							res += "★";
						}
						res += "</span>";
						
						return res;
					}
			};
			var creditLimit = {
					"field": "creditLimit",
					"title": "信用额度"
			};
			var status = {
					"field": "status",
					"title": "用户状态",
					"formatter": function(value,row,index) {
						return value == 0 ? "活跃" : value == 1 ? "删除" : value == 2 ? "僵尸" : "";
					}
			};
			var companyHome = {
					"field": "companyHome",
					"title": "公司主页",
					"formatter": function(value,row,index) {
						return "<a class='like' href='"+value+"'>"+value+"</a>";
					}
			};
			var operation = {
					"field": "userId",
					"title": "操作",
					"width": "80px",
					"formatter": function(value,row,index) {
						var disabled = true;
						if (value == uid) {
							disabled = false;
						}
						var str = "<a href='javascript:void(0);' disabled="+disabled+" onclick='quoteInfoMain.updClient(\""+row.id+"\")' title='修改' style='margin-left: 10px;margin-right: 10px;'><i class='fa fa-wrench'></i></a>";
						str += "<a href='javascript:void(0);' disabled="+disabled+" onclick='quoteInfoMain.delClient(\""+row.id+"\")' title='删除'><i class='fa fa-trash-o'></i></a>";
						return str;
					}
			};
			var queryArray = new Array();
			queryArray.push(checkbox);
			queryArray.push(cId);
			queryArray.push(clientName);
			queryArray.push(workAddress);
			queryArray.push(mainPhone);
			queryArray.push(rank);
			queryArray.push(creditGrade);
			queryArray.push(creditLimit);
			queryArray.push(status);
			queryArray.push(companyHome);
			queryArray.push(operation);
			
			return queryArray;
		},
		/**
		 * 客户详情/新增/修改 HTML
		 * @param type 请求类型，只有详情可以看到与客户关联的联系人信息
		 */
		clientInfoHTML: function(id,type,data) {
			var clientHtml = '<div class="form" style="padding:5px;">';
			
			clientHtml += '<div class="row">';
			clientHtml += '<div class="col-sm-6">';
			clientHtml += '<div class="form-group">';
			clientHtml += '<label for="qudaoName">供应商名称<span style="color: red;">*</span></label>';
			clientHtml += '<input type="text" class="form-control" id="'+id+'qudaoName" placeholder="">';
			clientHtml += '<input type="hidden" id="clientId">';
			clientHtml += '<input type="hidden" id="status">';
			clientHtml += '</div></div>';
			
			clientHtml += '<div class="col-sm-6">';
			clientHtml += '<div class="form-group">';
			clientHtml += '<label for="way">渠道方式<span style="color: red;">*</span></label>';
			clientHtml += '<input type="text" class="form-control" id="way" placeholder="">';
			clientHtml += '</div></div></div>';
			
			if (type == 'detail') {
				clientHtml += '<div class="row">';
				clientHtml += '<div class="col-sm-12">';
				clientHtml += '<div class="form-group">';
				clientHtml += '<label for="linkman">联系人</label>';
				clientHtml += '<div id="linkman" style="border: 1px solid #ccc;min-height: 50px;border-radius: 3px;padding: 5px;"></div>';
				clientHtml += '</div></div></div>';
			}
			clientHtml += '<div class="row">';
			clientHtml += '<div class="col-sm-6">';
			clientHtml += '<div class="form-group">';
			clientHtml += '<label for="distpicker">联系员工</label>';
			clientHtml += '<div id="小小" class="form-group">';
			clientHtml += '<select class="form-control" id="dagongzai" style="float: left; width: inherit; margin-right: 10px;">';
			for(var i=0;i<data.length;i++){
				clientHtml+='<option value='+data[i].realName+'>'+data[i].realName+'</option>';
			}
			// clientHtml += '<select class="form-control" id="city" style="float: left; width: inherit; margin-right: 10px;"></select>';
			// clientHtml += '<select class="form-control" id="town" style="float: left; width: inherit;"></select>';
			clientHtml += '</select></div></div></div></div>';

			return clientHtml;
		},
	clientInfoHTML2: function(type,data,ids2) {
		var clientHtml = '<div class="form" style="padding:5px;">';
		if(type=='add') {
			clientHtml += '<div class="row">';
			clientHtml += '<div class="col-sm-6">';
			clientHtml += '<div class="form-group">';
			clientHtml += '<label for="pName">商品名称<span style="color: red;">*</span></label>';
			clientHtml += '<select class="form-control" id="sName" onchange="quoteInfoMain.show(this.options[this.options.selectedIndex].id)">';
			clientHtml += '<option value=请选择 id="请选择" >请选择</option>';
			for (var i = 0; i < data.length; i++) {
				var abc = true;
				for (var j = 0; j < ids2.length; j++) {
					if (data[i].pid == ids2[j]) {
						abc = false;
					}
				}
				if (abc) {
					clientHtml += '<option id=' + data[i].pType + ' value=' + data[i].pid + '>' + data[i].pName + '</option>';
				}

			}
			clientHtml += '</select>';
			clientHtml += '</div></div>';

			// clientHtml += '<div class="col-sm-6">';
			// clientHtml += '<div class="form-group">';
			// clientHtml += '<label for="sName">供应商名称<span style="color: red;">*</span></label>';
			// clientHtml += '<input type="text" class="form-control" id="sName" placeholder="">';
			// clientHtml += '</div></div></div>';


			clientHtml += '<div class="col-sm-6">';
			clientHtml += '<div class="form-group">';
			clientHtml += '<label for="pType">商品类别</label>';
			clientHtml += '<input type="text" class="form-control" id="pType" placeholder="">';
			clientHtml += '</div></div></div>';
		}
		else{
			clientHtml += '<div class="row">';
			clientHtml += '<div class="col-sm-6">';
			clientHtml += '<div class="form-group">';
			clientHtml += '<label for="pName">商品名称<span style="color: red;">*</span></label>';
			clientHtml += '<input type="text" class="form-control" disabled="disabled" id="pName" placeholder="">';
			clientHtml += '</div></div>';

			// clientHtml += '<div class="col-sm-6">';
			// clientHtml += '<div class="form-group">';
			// clientHtml += '<label for="sName">供应商名称<span style="color: red;">*</span></label>';
			// clientHtml += '<input type="text" class="form-control" id="sName" placeholder="">';
			// clientHtml += '</div></div></div>';

			clientHtml += '<div class="col-sm-6">';
			clientHtml += '<div class="form-group">';
			clientHtml += '<label for="pType">商品类别</label>';
			clientHtml += '<input type="text" disabled="disabled" class="form-control" id="pType" placeholder="">';
			clientHtml += '</div></div>'

			clientHtml += '<div class="col-sm-6">';
			clientHtml += '<div class="form-group">';
			clientHtml += '<input type="hidden" disabled="disabled" class="form-control" id="pid" placeholder="">';
			clientHtml += '</div></div></div>';
		}

		clientHtml += '<div class="row">';
		clientHtml += '<div class="col-sm-6">';
		clientHtml += '<div class="form-group">';
		clientHtml += '<label for="cPrice">客户报价<span style="color: red;">*</span></label>';
		clientHtml += '<input type="text" class="form-control" id="cPrice" placeholder="">';
		clientHtml += '</div></div>';

		clientHtml += '<div class="col-sm-6">';
		clientHtml += '<div class="form-group">';
		clientHtml += '<label for="sPrice">供应商报价<span style="color: red;">*</span></label>';
		clientHtml += '<input type="text" class="form-control" id="sPrice" placeholder="">';
		clientHtml += '</div></div></div>';


		clientHtml += '<div class="row">';
		clientHtml += '<div class="col-sm-6">';
		clientHtml += '<div class="form-group">';
		clientHtml += '<label for="dPrice">渠道报价<span style="color: red;">*</span></label>';
		clientHtml += '<input type="text" class="form-control" id="dPrice" placeholder="">';
		clientHtml += '</div></div>';

		clientHtml += '<div class="col-sm-6">';
		clientHtml += '<div class="form-group">';
		clientHtml += '<label for="industry"></label>';
		clientHtml += '<input type="hidden" class="form-control" id="industry" placeholder="" >';
		clientHtml += '</div></div></div>';

		clientHtml += '</div>';

		return clientHtml;
	}
}