var supplierInfoHTML = {
		/**
		 * 查询条件
		 */
		queryHTML: function() {
			var queryHtml = 
					'<div class="form-inline center-block" style="margin-left: 10px;">'+
						'<div class="row" style="margin-top: 10px;margin-right: 0px;">'+
							'<div class="col-sm-5">'+
								'<button type="button" class="btn btn-info btn-sm" onclick="supplierInfoMain.addClient()" style="margin-right: 0.5em;">'+
									'<i class="fa fa-plus"></i>添加'+
								'</button>'+
								'<button type="button" class="btn btn-info btn-sm" onclick="supplierInfoMain.updClient(\'\')" style="margin-right: 0.5em;">'+
									'<i class="fa fa-pencil"></i>修改'+
								'</button>'+
								'<button type="button" class="btn btn-info btn-sm" onclick="supplierInfoMain.delBatchClient()" style="margin-right: 0.5em;">'+
									'<i class="fa fa-minus"></i>删除'+
								'</button>'+
								'<button type="button" class="btn btn-info btn-sm" onclick="supplierInfoMain.shareApplayClient()" style="margin-right: 0.5em;">'+
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
									'<input type="button" title="重置" value="重置" class="btn navbar-btn btn-info btn-sm" style="margin-right:0.5em;" onClick="supplierInfoMain.resetFun()">'+
									'<input type="button" title="查询" value="查询" class="btn navbar-btn btn-info btn-sm" style="margin-right:0.5em;" onClick="supplierInfoMain.queryFun()">'+
									'<lable class="control-label">'+
										'<button type="button" class="btn btn-info btn-sm" title="更多条件" style="margin-bottom:4px;width:46px;height:30px;margin-left:0.5em;" onClick="supplierInfoMain.moreFun(this)">'+
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
						var str = "<a href='javascript:void(0);' disabled="+disabled+" onclick='supplierInfoMain.updClient(\""+row.id+"\")' title='修改' style='margin-left: 10px;margin-right: 10px;'><i class='fa fa-wrench'></i></a>";
						str += "<a href='javascript:void(0);' disabled="+disabled+" onclick='supplierInfoMain.delClient(\""+row.id+"\")' title='删除'><i class='fa fa-trash-o'></i></a>";
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
		clientInfoHTML: function(type) {
			var clientHtml = '<div class="form" style="padding:5px;">';
			
			clientHtml += '<div class="row">';
				clientHtml += '<div class="col-sm-6">';
				clientHtml += '<div class="form-group">';
				clientHtml += '<label for="sName">供应商名称<span style="color: red;">*</span></label>';
				clientHtml += '<input type="text" class="form-control" id="sName" placeholder="">';
				clientHtml += '<input type="hidden" id="clientId">';
				clientHtml += '<input type="hidden" id="status">';
				clientHtml += '</div></div>';

				clientHtml += '<div class="col-sm-6">';
				clientHtml += '<div class="form-group">';
				clientHtml += '<label for="nature">企业性质<span style="color: red;">*</span></label>';
				clientHtml += '<input type="text" class="form-control" id="nature" placeholder="">';
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
			clientHtml += '<label for="mainProduct">主要产品<span style="color: red;">*</span></label>';
			clientHtml += '<input type="text" class="form-control" id="mainProduct" placeholder="">';
			clientHtml += '</div></div>';
			
			clientHtml += '<div class="col-sm-6">';
			clientHtml += '<div class="form-group">';
			clientHtml += '<label for="phone">电话<span style="color: red;">*</span></label>';
			clientHtml += '<input type="text" class="form-control" id="phone" placeholder="">';
			clientHtml += '</div></div></div>';
			
			
			clientHtml += '<div class="row">';
			clientHtml += '<div class="col-sm-6">';
			clientHtml += '<div class="form-group">';
			clientHtml += '<label for="license">营业执照</label>';
			clientHtml += '<input type="text" class="form-control" id="license" placeholder="">';
			clientHtml += '</div></div>';

			return clientHtml;
		},
	clientInfoHTML2: function(modelId,type,data) {
			// console.log(data );
		var clientHtm2 = '<div class="form" style="padding:5px;">';

		clientHtm2 += '<div class="row">';
		clientHtm2 += '<div class="col-sm-6">';
		clientHtm2 += '<div class="form-group">';
		clientHtm2 += '<label for="sName2">供应商名称<span style="color: red;">*</span></label>';
		clientHtm2 += '<input type="text" class="form-control" id="sName2" placeholder="">';
		clientHtm2 += '<input type="hidden" id="clientId">';
		clientHtm2 += '<input type="hidden" id="status">';
		clientHtm2 += '</div></div>';

		clientHtm2 += '<div class="col-sm-6">';
		clientHtm2 += '<div class="form-group">';
		clientHtm2 += '<label for="nature2">企业性质<span style="color: red;">*</span></label>';
		clientHtm2 += '<input type="text" class="form-control" id="nature2" placeholder="">';
		clientHtm2 += '</div></div></div>';

		if (type == 'detail') {
			clientHtm2 += '<div class="row">';
			clientHtm2 += '<div class="col-sm-12">';
			clientHtm2 += '<div class="form-group">';
			clientHtm2 += '<label for="linkman2">联系人</label>';
			clientHtm2 += '<div id="linkman" style="border: 1px solid #ccc;min-height: 50px;border-radius: 3px;padding: 5px;"></div>';
			clientHtm2 += '</div></div></div>';
		}

		clientHtm2 += '<div class="row">';
		clientHtm2 += '<div class="col-sm-6">';
		clientHtm2 += '<div class="form-group">';
		clientHtm2 += '<label for="mainProduct2">主要产品<span style="color: red;">*</span></label>';
		clientHtm2 += '<input type="text" class="form-control" id="mainProduct2" placeholder="">';
		clientHtm2 += '</div></div>';

		clientHtm2 += '<div class="col-sm-6">';
		clientHtm2 += '<div class="form-group">';
		clientHtm2 += '<label for="phone2">电话<span style="color: red;">*</span></label>';
		clientHtm2 += '<input type="text" class="form-control" id="phone2" placeholder="">';
		clientHtm2 += '</div></div></div>';


		clientHtm2 += '<div class="row">';
		clientHtm2 += '<div class="col-sm-6">';
		clientHtm2 += '<div class="form-group">';
		clientHtm2 += '<label for="license2">营业执照</label>';
		clientHtm2 += '<input type="text" class="form-control" id="license2" placeholder="">';
		clientHtm2 += '</div></div>';

		clientHtm2 += '<div class="col-sm-6">';
		clientHtm2 += '<div class="form-group">';
		clientHtm2 += '<label for="sId2"></label>';
		clientHtm2 += '<input type="hidden" class="form-control" id="sId2" placeholder="">';
		clientHtm2 += '</div></div></div>';


		// var json4 = JSON.parse(data);
		// console.log(json4);
		// $("#" + modelId + " #sName2").attr("value",""+json4[0].sName+"");
		// $("#" + modelId + " #sName2").val(""+json4[0].sName+"");
		// var sName=$("#" + modelId + " #sName2").val();
		// console.log(sName);
		// supplierInfoMain.fillData2(modelId,type,data);
		return clientHtm2;
	}
}