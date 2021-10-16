//clientInfoHTML
var salesManagerHTML = {
		/**
		 * 查询条件
		 */
		queryHTML: function() {
			var queryHtml = 
					'<div class="form-inline center-block" style="margin-left: 10px;">'+
						'<div class="row" style="margin-top: 10px;margin-right: 0px;">'+
							'<div class="col-sm-5">'+
								'<button type="button" class="btn btn-info btn-sm" onclick="salesManagerMain.addClient()" style="margin-right: 0.5em;">'+
									'<i class="fa fa-plus"></i>添加'+
								'</button>'+
								'<button type="button" class="btn btn-info btn-sm" onclick="salesManagerMain.updClient(\'\')" style="margin-right: 0.5em;">'+
									'<i class="fa fa-pencil"></i>修改'+
								'</button>'+
								'<button type="button" class="btn btn-info btn-sm" onclick="salesManagerMain.delBatchClient()" style="margin-right: 0.5em;">'+
									'<i class="fa fa-minus"></i>删除'+
								'</button>'+
								'<button type="button" class="btn btn-info btn-sm" onclick="salesManagerMain.shareApplayClient()" style="margin-right: 0.5em;">'+
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
									'<input type="button" title="重置" value="重置" class="btn navbar-btn btn-info btn-sm" style="margin-right:0.5em;" onClick="salesManagerMain.resetFun()">'+
									'<input type="button" title="查询" value="查询" class="btn navbar-btn btn-info btn-sm" style="margin-right:0.5em;" onClick="salesManagerMain.queryFun()">'+
									'<lable class="control-label">'+
										'<button type="button" class="btn btn-info btn-sm" title="更多条件" style="margin-bottom:4px;width:46px;height:30px;margin-left:0.5em;" onClick="salesManagerMain.moreFun(this)">'+
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
			var pName = {
					"field": "pName",
					"title": "客户名称",
					"visible": true,
					"sortable": false,
					"events": clientEvent,
					"formatter": function(value,row,index) {
						return "<a class='like' href='javascript:void(0);' title="+value+">"+value+"</a>";
					}
			};
			var salePrice = {
					"field": "salePrice",
					"title": "工作地址"	
			};
			var saleNum = {
					"field": "saleNum",
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
						var str = "<a href='javascript:void(0);' disabled="+disabled+" onclick='salesManagerMain.updClient(\""+row.id+"\")' title='修改' style='margin-left: 10px;margin-right: 10px;'><i class='fa fa-wrench'></i></a>";
						str += "<a href='javascript:void(0);' disabled="+disabled+" onclick='salesManagerMain.delClient(\""+row.id+"\")' title='删除'><i class='fa fa-trash-o'></i></a>";
						return str;
					}
			};
			var queryArray = new Array();
			queryArray.push(checkbox);
			queryArray.push(cId);
			queryArray.push(pName);
			queryArray.push(salePrice);
			queryArray.push(saleNum);
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
		salesManagerHTML: function(type,data,data1,data2) {
			var snameData = JSON.parse(data);
			var userInfoData = JSON.parse(data1);

			data2 = data2.substring(3,data2.length);
			var datas = data2.split(",");
			userId = parseInt(datas[3]);//number类型
			var userid = datas[3];
			var role = datas[0];
			var username = datas[1];

			var clientHtml = '<div class="form" style="padding:5px;">';
			
			clientHtml += '<div class="row">';
			clientHtml += '<div class="col-sm-6">';
			clientHtml += '<div class="form-group">';
			clientHtml += '<label for="pName">商品名称<span style="color: red;">*</span></label>';

			clientHtml += '<select class="form-control" id="pName">';
			//clientHtml += '<option value=""></option>';
			for(var i=0;i<snameData.length;i++){
				clientHtml+='<option id='+snameData[i].pid+' value='+snameData[i].pName+"（编号："+snameData[i].pid+"）"+'>'+snameData[i].pName+"（编号："+snameData[i].pid+"）"+'</option>';
			}
			if(type == 'update'){
				$("#pName").find("option[value = '"+data1[0].pName+data[0].pid+"']").attr("selected","selected");
			}
			clientHtml += '</select>';

			// clientHtml += '<input type="text" class="form-control" id="pName" placeholder="">';
			// clientHtml += '<input type="hidden" id="clientId">';
			clientHtml += '<input type="hidden" id="status">';

			clientHtml += '</div></div>';

			
			clientHtml += '<div class="col-sm-6">';
			clientHtml += '<div class="form-group">';
			clientHtml += '<label for="salePrice">商品价格<span style="color: red;">*</span></label>';
			clientHtml += '<input type="text" class="form-control" id="salePrice" placeholder="">';
			clientHtml += '</div></div></div>';
			
			// if (type == 'detail') {
			// 	clientHtml += '<div class="row">';
			// 	clientHtml += '<div class="col-sm-12">';
			// 	clientHtml += '<div class="form-group">';
			// 	clientHtml += '<label for="linkman">联系人</label>';
			// 	clientHtml += '<div id="linkman" style="border: 1px solid #ccc;min-height: 50px;border-radius: 3px;padding: 5px;"></div>';
			// 	clientHtml += '</div></div></div>';
			// }
			
			clientHtml += '<div class="row">';
			clientHtml += '<div class="col-sm-6">';
			clientHtml += '<div class="form-group">';
			clientHtml += '<label for="saleNum">商品数量<span style="color: red;">*</span></label>';
			clientHtml += '<input type="text" class="form-control" id="saleNum" placeholder="">';
			clientHtml += '</div></div>';
			
			clientHtml += '<div class="col-sm-6">';
			clientHtml += '<div class="form-group">';
			clientHtml += '<label for="username">销售员<span style="color: red;">*</span></label>';
			// clientHtml += '<input type="text" class="form-control" id="username" placeholder="">';
			clientHtml += '<select class="form-control" id="username">';

			if(role == "admin"||role =="供销经理"){
				for(var i=0;i<userInfoData.length;i++){
					//clientHtml+='<option value='+userInfoData[i].realName+'>'+userInfoData[i].realName+'</option>';
					clientHtml+='<option value='+userInfoData[i].realName+"（工号："+userInfoData[i].userId+"）"+'>'+userInfoData[i].realName+"（工号："+userInfoData[i].userId+"）"+'</option>';
				}
				if(type == 'update'){
					$("#username").find("option[value = '"+data1[0].realName+data1[0].userId+"']").attr("selected","selected");
				}
			}else if(role == "供销职员"){
				clientHtml+='<option value='+username+"（工号："+userid+"）"+'>'+username+"（工号："+userid+"）"+'</option>';
			}


			clientHtml += '</select>';
			clientHtml += '</div></div></div>';
			
			
			clientHtml += '<div class="row">';
			clientHtml += '<div class="col-sm-6">';
			clientHtml += '<div class="form-group">';
			clientHtml += '<label for="sate">发货状态</label>';
			clientHtml += '<select class="form-control" id="sate" disabled>';
			clientHtml += '<option value="未发货">未发货</option>';
			clientHtml += '<option value="发货成功">发货成功</option>';
			clientHtml += '<option value="发货失败">发货失败</option>';
			clientHtml += '</select>';
			clientHtml += '</div></div>';

			// clientHtml += '<div class="col-sm-6">';
			// clientHtml += '<div class="form-group">';
			// clientHtml += '<label for="industry">所属行业</label>';
			// clientHtml += '<input type="text" class="form-control" id="industry" placeholder="">';
			// clientHtml += '</div></div></div>';
			//
			//
			// clientHtml += '<div class="row">';
			// clientHtml += '<div class="col-sm-12">';
			// clientHtml += '<div class="form-group">';
			// clientHtml += '<label for="distpicker">所在城市</label>';
			// clientHtml += '<div id="distpicker" class="form-group">';
			// clientHtml += '<select class="form-control" id="province" style="float: left; width: inherit; margin-right: 10px;"></select>';
			// clientHtml += '<select class="form-control" id="city" style="float: left; width: inherit; margin-right: 10px;"></select>';
			// clientHtml += '<select class="form-control" id="town" style="float: left; width: inherit;"></select>';
			// clientHtml += '</div></div></div></div>';
			//
			//
			// clientHtml += '<div class="row">';
			// clientHtml += '<div class="col-sm-6">';
			// clientHtml += '<div class="form-group">';
			// clientHtml += '<label for="rank">客户级别</label>';
			// clientHtml += '<select class="form-control" id="rank">';
			// clientHtml += '<option value="1">潜在客户</option>';
			// clientHtml += '<option value="2">合作伙伴</option>';
			// clientHtml += '<option value="3">忠实客户</option>';
			// clientHtml += '<option value="4">代理商</option>';
			// clientHtml += '<option value="5">战略合作</option>';
			// clientHtml += '</select>';
			// clientHtml += '</div></div>';
			//
			// clientHtml += '<div class="col-sm-6">';
			// clientHtml += '<div class="form-group">';
			// clientHtml += '<label for="creditGrade">信用等级</label>';
			// clientHtml += '<select class="form-control" id="creditGrade" style="color:#f0b80e;">';
			// clientHtml += '<option value="1">★</option>';
			// clientHtml += '<option value="2">★★</option>';
			// clientHtml += '<option value="3">★★★</option>';
			// clientHtml += '<option value="4">★★★★</option>';
			// clientHtml += '<option value="5">★★★★★</option>';
			// clientHtml += '</select>';
			// clientHtml += '</div></div></div>';
			//
			//
			// clientHtml += '<div class="row">';
			// clientHtml += '<div class="col-sm-6">';
			// clientHtml += '<div class="form-group">';
			// clientHtml += '<label for="creditLimit">信用额度</label>';
			// clientHtml += '<select class="form-control" id="creditLimit">';
			// clientHtml += '<option value="0">0</option>';
			// clientHtml += '<option value="5000">5000</option>';
			// clientHtml += '<option value="10000">10000</option>';
			// clientHtml += '<option value="20000">20000</option>';
			// clientHtml += '<option value="100000">100000</option>';
			// clientHtml += '</select>';
			// clientHtml += '</div></div>';
			//
			// clientHtml += '<div class="col-sm-6">';
			// clientHtml += '<div class="form-group">';
			// clientHtml += '<label for="superCompany">上级单位</label>';
			// clientHtml += '<input type="text" class="form-control" id="superCompany" placeholder="">';
			// clientHtml += '</div></div></div>';
			//
			//
			// clientHtml += '<div class="row">';
			// clientHtml += '<div class="col-sm-6">';
			// clientHtml += '<div class="form-group">';
			// clientHtml += '<label for="financePhone">财务电话</label>';
			// clientHtml += '<input type="text" class="form-control" id="financePhone" placeholder="">';
			// clientHtml += '</div></div>';
			//
			// clientHtml += '<div class="col-sm-6">';
			// clientHtml += '<div class="form-group">';
			// clientHtml += '<label for="companyHome">公司主页</label>';
			// clientHtml += '<input type="text" class="form-control" id="companyHome" placeholder="">';
			// clientHtml += '</div></div></div>';
			//
			//
			// clientHtml += '<div class="row">';
			// clientHtml += '<div class="col-sm-6">';
			// clientHtml += '<div class="form-group">';
			// clientHtml += '<label for="register">注册时间</label>';
			// if (type == 'detail') {
			// 	clientHtml += '<input class="form-control size="16" type="text" value="" id="register" readonly="readonly">';
			// } else {
			// 	clientHtml += '<div id="registerTime" class="input-group date form_date">';
			// 	clientHtml += '<input class="form-control size="16" type="text" value="" id="register" readonly="readonly">';
			// 	clientHtml += '<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>';
			// 	clientHtml += '<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>';
			// 	clientHtml += '</div>';
			// }
			// clientHtml += '</div></div>';
			//
			// clientHtml += '<div class="col-sm-6">';
			// clientHtml += '<div class="form-group">';
			// clientHtml += '<label for="principal">负责人</label>';
			// clientHtml += '<input type="text" class="form-control" id="principal" placeholder="">';
			// clientHtml += '</div></div></div>';
			//
			//
			// clientHtml += '<div class="row">';
			// clientHtml += '<div class="col-sm-12">';
			// clientHtml += '<div class="form-group">';
			// clientHtml += '<label for="responDepart">负责部门</label>';
			// clientHtml += '<input type="text" class="form-control" id="responDepart" placeholder="">';
			// clientHtml += '</div></div></div>';
			//
			//
			// clientHtml += '<div class="row">';
			// clientHtml += '<div class="col-sm-12">';
			// clientHtml += '<div class="form-group">';
			// clientHtml += '<label for="remark">备注</label>';
			// clientHtml += '<textarea class="form-control" id="remark" style="resize: none;"></textarea>';
			// clientHtml += '</div></div></div>';
			
			clientHtml += '</div>';
			
			return clientHtml;
		}
}