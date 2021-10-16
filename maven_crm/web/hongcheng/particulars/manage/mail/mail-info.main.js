var mailInfoMain = {
		// 保存查询条件
		// 虽然 bootstrap-table 提供了用于查询的按钮，但这里我们采用自定按钮
		queryTableParam: {},
		/**
		 * 初始化查询条件和表格
		 * @returns
		 */
		queryTable: function() {
			$("#client_info #criteriaNav").html('');
			var queryHtml = mailInfoHTML.queryHTML();
			var queryColumn = mailInfoHTML.queryColumns(true);
			$("#client_info #criteriaNav").append(queryHtml);
			
			$("#client_info #client_info_table").bootstrapTable({
			    method: 'post',
			    url: common.projectPath + 'client/info/quest/client/info.htl',
			    cache: false,
			    striped: false,
			    pagination: true,
			    pageSize: 10,
			    sidePagination:"server",
			    pageList: [10, 25, 50, 100, 200],
			    search: false,
			    queryParams: function(params){
			    	$.extend(params,mailInfoMain.queryTableParam);
					mailInfoMain.queryTableParam = {};
			    	return params;
			    },
			    showColumns: false,
			    showRefresh: false,
			    clickToSelect: true,
			    columns: queryColumn
			});
		},
		
		/**
		 * 重置查询条件
		 */
		resetFun: function() {
			var inputs_ = $("#client_info #criteriaNav").find(":text,textarea,input[type='text']");
			inputs_.val("");
			var checks_ = $("#client_info #criteriaNav").find("input[type='checkbox']");
			checks_.prop({"checked":false});
		},
		/**
		 * 查询
		 */
		queryFun: function() {
			var clientName = $("#clientName_").val(),
				workAddress = $("#workAddress_").val(),
				mainPhone = $("#mainPhone_").val(),
				province = $("#distpicker_ #loc_province :selected").val(),
				city = $("#distpicker_ #loc_city :selected").val(),
				town = $("#distpicker_ #loc_town :selected").val();
			if (province != '') {
				if (city == '') {
					sweetAlert.caution("温馨提示", "请选择所在城市！");
					return;
				}
				if (town == '') {
					sweetAlert.caution("温馨提示", "请选择所在区/县！");
					return;
				}
			}
			mailInfoMain.queryTableParam = {
					"clientName": clientName, 
					"workAddress": workAddress, 
					"mainPhone": mainPhone,
					"town": town
			};
			$("#client_info #client_info_table").bootstrapTable("refresh");
			return mailInfoMain.queryTableParam;
		},
		/**
		 * 显示/隐藏其他查询条件
		 */
		//分页
		datatablesDestroy:function(){
			$('#file_center_table').dataTable().fnDestroy();
		},

	datatablesCreate:function(){
		jQuery(function($) {
			var oTable1 = $('#file_center_table').dataTable( {
				// "aaSorting": [[ 1, "desc" ]],//默认第几个排序
				"ordering":false,
				"bStateSave": true,//状态保存
				searching : false,//去掉搜索框
				bAutoWidth: false,//是否自动宽度
				"aoColumnDefs": [
					//{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
					{"orderable":false,"aTargets":[0,1,2,3,4,5,6]}// 制定列不参与排序
				] } );

		});
	},
		moreFun: function(t) {
			if($("#client_info #criteria_id").is(":hidden")){
				$("#client_info #criteria_id").slideDown();
				$(t).children("span").removeClass("glyphicon glyphicon-plus").addClass("glyphicon glyphicon-minus");
			}else{
				$("#client_info #criteria_id").hide();
				$(t).children("span").removeClass("glyphicon glyphicon-minus").addClass("glyphicon glyphicon-plus");
			}
		},
		/**
		 * 初始化其他组件
		 */
		initFun : function() {
			// 省市级联
			// $('#distpicker_').distpicker({
			// 	province : '---- 所在省 ----',
			// 	city : '---- 所在市 ----',
			// 	district : '---- 所在区/县 ----'
			// });
		},
		/**
		 * 客户详情
		 */
		clientDetail: function(id, type) {
			mailInfoCtroller.clientInfoDetail(id, function(data){
				console.log(data);
				//判断是否存在，返回通过主键获得的数据
				if (data.msg == 0) {
					sweetAlert.caution("温馨提示", "未获取到相关客户信息");
					return;
				}
				// var content = mailInfoHTML.clientInfoHTML2(type);
				var modelId = "client" + type + "Model";
				var isHideBut = type == 'update' ? false : true;
				var content = mailInfoHTML.clientInfoHTML2(type,data);
				//将这条数据展示在页面上\
				//这里通过jquery可以拿到所有数据，
				commFun.noModel(modelId, "供应商xinxi",700,500, content, mailInfoMain.submitData2, type, isHideBut);
				mailInfoMain.fillData2(modelId, type, data);
				// supplierInfoMain.fillData2(modelId, type, data);
				// if (type != 'detail') {
				// 	// 初始化时间组件
				// 	var $registerTime = $('#' + modelId + ' #registerTime');
				// 	$registerTime.datetimepicker({
				// 		language:  'zh-CN',
				// 		format: "yyyy年mm月dd日",// 日期格式
				// 		minView: "month",// 精确视图，这样只有年月日，没有时分秒
				// 		autoclose: true,// 是否自动关闭
				// 		todayBtn: true,// 是否显示选择今天日期的按钮
				// 		forceParse: 0
				// 	});
				// }
				//
				// 省市级联
				// $('#clientupdateModel #distpicker').distpicker({
				// 	province : '---- 所在省 ----',
				// 	city : '---- 所在市 ----',
				// 	district : '---- 所在区/县 ----'
				// });

				// supplierInfoMain.fillData(modelId, type, data);
			});
		},
		
		/**
		 * 添加客户信息
		 */
		addClient: function() {
			mailInfoCtroller.yuanxinxi(function(data) {
				var content = mailInfoHTML.clientInfoHTML('add',data);
				commFun.noModel("clientaddModel", "添加供应商信息", 700, 500, content, mailInfoMain.submitData, "add", false);
				// 初始化时间组件
				$('#clientaddModel #registerTime').datetimepicker({
					language: 'zh-CN',
					format: "yyyy年mm月dd日",// 日期格式
					minView: "month",// 精确视图，这样只有年月日，没有时分秒
					autoclose: true,// 是否自动关闭
					todayBtn: true,// 是否显示选择今天日期的按钮
					forceParse: 0
				});

				// 省市级联
				$('#clientaddModel #distpicker').distpicker({
					province: '---- 所在省 ----',
					city: '---- 所在市 ----',
					district: '---- 所在区/县 ----'
				});
			});
		},
		
		/**
		 * 修改客户信息
		 */
		updClient: function(id) {
			// var sName4=document.getElementById("54gys").innerText;
			// console.log(sName4);
			console.log(id);
			// if (id == '') {
			// 	var selectedData = $("#client_info #client_info_table").bootstrapTable('getSelections');
			// 	if (selectedData.length < 1) {
			// 		sweetAlert.caution("温馨提示：", "请选择要修改的数据！", "确定", 3000);
			// 		return;
			// 	} else if (selectedData.length > 1) {
			// 		sweetAlert.caution("温馨提示：", "每次只允许修改一条数据！", "确定", 3000);
			// 		return;
			// 	} else {
			// 		id = selectedData[0].id;
			// 	}
			// }

			mailInfoMain.clientDetail(id, 'update');
		},
		
		/**
		 * 填充数据
		 */
		fillData: function(modelId, type, data) {
			 var client = data.clientInfo;
			$("#" + modelId + " #clientId").val(client.id);
			$("#" + modelId + " #status").val(client.status);
			$("#" + modelId + " #clientName").val(client.clientName);
			$("#" + modelId + " #workAddress").val(client.workAddress);
			$("#" + modelId + " #mainPhone").val(client.mainPhone);
			$("#" + modelId + " #zipCode").val(client.zipCode);
			$("#" + modelId + " #email").val(client.email);
			$("#" + modelId + " #industry").val(client.industry);
			$("#" + modelId + " #rank").find("option[value='"+client.rank+"']").attr("selected", true);
			$("#" + modelId + " #creditGrade").find("option[value='"+client.creditGrade+"']").attr("selected", true);
			$("#" + modelId + " #creditLimit").find("option[value='"+client.creditLimit+"']").attr("selected", true);
			$("#" + modelId + " #superCompany").val(client.superCompany);
			$("#" + modelId + " #financePhone").val(client.financePhone);
			$("#" + modelId + " #companyHome").val(client.companyHome);
			$("#" + modelId + " #principal").val(client.principal);
			$("#" + modelId + " #responDepart").val(client.responDepart);
			$("#" + modelId + " #remark").val(client.remark);
			// if (type == 'detail') {
			// 	var date = new Date(client.register);
			// 	var dformat = [ date.getFullYear(), date.getMonth() + 1, date.getDate() ].join('-');
			// 	$("#" + modelId + " #register").val(dformat);
			// } else {
			// 	// 时间
			// 	if (client.register != null)
			// 		$("#" + modelId + " #registerTime").datetimepicker("setDate", new Date(client.register));
			// }
			//
			// // 省市县
			// $('#'+modelId+' #distpicker').distpicker({
			// 	province : client.province,
			// 	city : client.city,
			// 	district : client.town
			// });
			// // 联系人
			// var linkmans = '';
			// var linkmanNames = client.linkmanNames;
			// var linkmanIds = client.linkmanIds;
			// for (var i = 0; i < linkmanNames.length; i++) {
			// 	linkmans += '<button type="button" class="btn btn-info btn-sm" onclick="clientInfoMain.linkmanDetail(\''+linkmanIds[i]+'\')" style="margin-right: 0.5em;">'+linkmanNames[i]+'</button>';
			// }
			// $("#" + modelId + " #linkman").html(linkmans);
			
			
			if (type == 'detail') {
				$("#" + modelId + " input[type='text']").attr("disabled", true);
				$("#" + modelId + " select").attr("disabled", true);
				$("#" + modelId + " textarea").attr("disabled", true);
			}
		},
	/**
	 *
	 * @param modelId
	 * @param type
	 * @param data返回的数据
	 */
	fillData2: function(modelId, type, data) {
		console.log(data);
		var json4 = JSON.parse(data);
		console.log()
		$("#" + modelId + " #sId2").val(json4[0].sid);
		$("#" + modelId + " #sName2").val(json4[0].sName);
		$("#" + modelId + " #nature2").val(json4[0].nature);
		$("#" + modelId + " #mainProduct2").val(json4[0].mainProduct);
		$("#" + modelId + " #phone2").val(json4[0].phone);
		$("#" + modelId + " #license2").val(json4[0].license);
		// if (type == 'detail') {
		// 	var date = new Date(client.register);
		// 	var dformat = [ date.getFullYear(), date.getMonth() + 1, date.getDate() ].join('-');
		// 	$("#" + modelId + " #register").val(dformat);
		// } else {
		// 	// 时间
		// 	if (client.register != null)
		// 		$("#" + modelId + " #registerTime").datetimepicker("setDate", new Date(client.register));
		// }
		//
		// // 省市县
		// $('#'+modelId+' #distpicker').distpicker({
		// 	province : client.province,
		// 	city : client.city,
		// 	district : client.town
		// });
		// // 联系人
		// var linkmans = '';
		// var linkmanNames = client.linkmanNames;
		// var linkmanIds = client.linkmanIds;
		// for (var i = 0; i < linkmanNames.length; i++) {
		// 	linkmans += '<button type="button" class="btn btn-info btn-sm" onclick="clientInfoMain.linkmanDetail(\''+linkmanIds[i]+'\')" style="margin-right: 0.5em;">'+linkmanNames[i]+'</button>';
		// }
		// $("#" + modelId + " #linkman").html(linkmans);


		if (type == 'detail') {
			$("#" + modelId + " input[type='text']").attr("disabled", true);
			$("#" + modelId + " select").attr("disabled", true);
			$("#" + modelId + " textarea").attr("disabled", true);
		}
	},

	/**
		 * 提交数据
		 */
		submitData: function(type) {
			var modelId = "client" + type + "Model";
			var receiveId = $("#" + modelId + " #receiveMan").val();
			console.log(receiveId );
			var receiveMan=$("#" + modelId + " #receiveMan").find('option:selected').text();
			console.log(receiveMan );
			var content = $("#" + modelId + " #content").val();
			console.log(content);
			var username=$("#username").text();
			console.log(username);
			var userId=$("#identity").val()
			// console.log(usernameId);
			var supplier= {id:null,username:""+username+"",userId:""+userId+"",receiveMan:""+receiveMan+"",receiveId:""+receiveId+"",content:""+content+"",ready:"已发"};
			var jsonsup = JSON.stringify(supplier);
			var res = false;
			if (type == 'add') {// 添加
				mailInfoCtroller.clientInfoAdd(jsonsup, function(data){
					if (data == '[]') {
						sweetAlert.caution("温馨提示,此用户已存在");
					} else {
						// mailInfoMain.queryTableParam = {};
						$("#client_info #client_info_table").bootstrapTable("refresh");
						res = true;
						// console.log(data);
						// mailInfoMain.datatablesDestroy();
						var json4 = JSON.parse(data);
						// console.log(json4[0]);
						addTr4(json4[0].id,json4[0].username,json4[0].userId,json4[0].receiveMan,json4[0].receiveId,json4[0].content,json4[0].ready);
						// mailInfoMain.datatablesCreate();
					}
				});
			} else {// 修改
				var id = $("#" + modelId + " #clientId").val();
				mailInfoCtroller.clientInfoUpdate(id, clientName, workAddress, mainPhone, zipCode, email,
						province, city, town, industry,rank, creditGrade, creditLimit, superCompany,
						financePhone, companyHome, registerTime, principal, responDepart, remark, function(data) {
					if (data == '') {
						mailInfoMain.queryTableParam = {};
						$("#client_info #client_info_table").bootstrapTable("refresh");
						res = true;
					} else {
						sweetAlert.caution("温馨提示", data);
					}
				});
			}
			
			return res;
		},
	/**
	 * 修改
	 * @param type
	 * @returns {boolean}
	 */
	submitData2: function(type) {
		$
		var type2=type;
		console.log(type);

		var modelId = "client" + type + "Model";
		var sId=$("#" + modelId + " #sId2").val()
		var sName = $("#" + modelId + " #sName2").val();
		console.log(sName );
		var  nature= $("#" + modelId + " #nature2").val();
		console.log(nature);
		var mainProduct = $("#" + modelId + " #mainProduct2").val();
		console.log(mainProduct);
		var phone = $("#" + modelId + " #phone2").val();
		console.log(phone);
		var license = $("#" + modelId + " #license2").val();
		console.log(license);
		if (sName == '') {
			sweetAlert.caution("温馨提示", "供应商名称不允许为空！");
			return false;
		}
		if(!(/^[\u4e00-\u9fa5]{0,}$/.test(sName))){
			sweetAlert.caution("温馨提示", "供应商名字为汉字！！！");
			return false;
		}
		if (nature == '') {
			sweetAlert.caution("温馨提示", "商业性质不允许为空！");
			return false;
		}
		if (mainProduct == '') {
			sweetAlert.caution("温馨提示", "主要产品不允许为空！");
			return false;
		}
		if (phone == '') {
			sweetAlert.caution("温馨提示", "电话不允许为空！");
			return false;
		}
		if(!(/^1[3456789]\d{9}$/.test(phone))){
			sweetAlert.caution("温馨提示", "请输入正确的电话号码！");
			return false;
		}
		if(license ==''){
			sweetAlert.caution("温馨提示", "营业执照号不允许为空！");
			return false;
		}
		if(!(/^[0-9]*$/.test(license))){
			sweetAlert.caution("温馨提示", "营业执照号为数字！！！")
			return false;
		}
		var supplier= {sid:""+sId+"",sName:""+sName+"",nature:""+nature+"",mainProduct:""+mainProduct+"",phone:""+phone+"",license:""+license+""};
		var jsonsup = JSON.stringify(supplier);
		var res = false;
		mailInfoCtroller.clientInfoUpdate(jsonsup, function(data){
			var json4=JSON.parse(data);
			console.log(json4)
			if (data != '') {
				mailInfoMain.queryTableParam = {};
				// sweetAlert.caution("这是之前的信息，可以进行修改");
				$("#client_info #client_info_table").bootstrapTable("refresh");
				res = true;
				 $("#"+json4[0].sid+"gys").text(json4[0].sName);
				$("#"+json4[0].sid+"spsx").text(json4[0].nature);
				$("#"+json4[0].sid+"zycp").text(json4[0].mainProduct);
				$("#"+json4[0].sid+"dhhm").text(json4[0].phone);
				$("#"+json4[0].sid+"yyzz").text(json4[0].license);

			} else {
				sweetAlert.caution("wusuowei");
			}
		});


		return res;
	},
		
		/**
		 * 批量删除
		 */
		delBatchClient: function() {
			// var selectedData = $(".aaa :checkbox[checked]").id;
			// // if (selectedData.length < 1) {
			// // 			// 	sweetAlert.caution("温馨提示：", "请选择要删除的数据！", "确定", 3000);
			// // 			// 	return;
			// // 			// }
			// alert(selectedData);
			//
			sweetAlert.warning("确定删除吗？", "", "确定", "取消", null, 5000, function(){
				// var ids = new Array();
				// $.each(selectedData, function(k, v) {
				// 	ids.push(v.id);
				// });
				var ids = new Array();
				$('input:checkbox[name=btSelectItem]:checked').each(function(){
					ids.push($(this).attr('id'));//向数组中添加元素
				});
				console.log("ids");
				mailInfoCtroller.clientInfoBatchDel(ids, function(data){
					if (data == '') {
						sweetAlert.caution("温馨提示",data,"关闭",3000);
					} else {
						sweetAlert.success("温馨提示","删除成功","关闭",3000);
						$("#client_info #client_info_table").bootstrapTable("refresh");
						mailInfoMain.datatablesDestroy();
						var json4 = JSON.parse(data);
						for(var i=0;i<json4.length;i++){
							var tr=document.getElementById(""+json4[i]+"");
							tr.remove();
						}
						mailInfoMain.datatablesCreate();
					}
				});
			}, "", "", null, null, false);
		},
		
		/**
		 * 单个删除
		 */
		delClient: function(id,queren) {
			sweetAlert.warning("确定删除吗？", "", "确定", "取消", null, 5000, function(){
				mailInfoCtroller.clientInfoDel(id,queren,function(data){
					console.log(data);
					// if (data == '') {
					// 	sweetAlert.caution("温馨提示",data,"关闭",3000);
					// } else {
						console.log(data);
						sweetAlert.success("温馨提示","删除成功","关闭",3000);
						$("#client_info #client_info_table").bootstrapTable("refresh");
						// mailInfoMain.datatablesDestroy();
						var tr = document.getElementById(""+id+""+queren+"");
						tr.remove();
						// mailInfoMain.datatablesCreate();
					// }
				});
			}, "", "", null, null, false);
		},
		
		/**
		 * 客户共享
		 */
		shareApplayClient: function() {
			var clientId = "";
			var selectedData = $("#client_info #client_info_table").bootstrapTable('getSelections');
			if (selectedData.length < 1) {
				sweetAlert.caution("温馨提示：", "请选择要修改的数据！", "确定", 3000);
				return;
			} else if (selectedData.length > 1) {
				sweetAlert.caution("温馨提示：", "每次只允许修改一条数据！", "确定", 3000);
				return;
			} else {
				clientId = selectedData[0].id;
			}
			// 弹出选择接受共享的人的信息列表的 model
			var userHtml = '<nav id="tableNav" class="navbar navbar-default" role="navigation" style="margin-bottom:10px">'+
								'<table id="user_info_table"></table>'+
							'</nav>';
			$.noModel({
				id: "shareApplay_user",
				title: "同事信息",
				content: userHtml,
				width: 700,
				height: 500,
				singleButtons: [{
					name: "取消",
					halign: "right"
				}, {
					name: "提交",
					halign: "right",
					callback: function() {
						var selectedData = $("#shareApplay_user #user_info_table").bootstrapTable('getSelections');
						if (selectedData.length < 1) {
							sweetAlert.caution("温馨提示：", "请选择接收人！", "确定", 3000);
							return false;
						} else if (selectedData.length > 1) {
							sweetAlert.caution("温馨提示：", "只允许选择一个接收人！", "确定", 3000);
							return false;
						} else {
							var res = false;
							var userId = selectedData[0].id;
							mailInfoCtroller.clientShareApplay(clientId, userId, function(data) {
								if (data != '') {
									sweetAlert.caution("温馨提示：", data, "确定", 3000);
								} else {
									sweetAlert.success("温馨提示","提交成功","关闭",3000);
									res = true;
								}
							});
							
							return res;
						}
					}
				}]
			});
			// 接受共享的人的信息列表
			
			var queryColumn = userInfoHTML.queryColumns();
			$("#shareApplay_user #user_info_table").bootstrapTable({
			    method: 'post',
			    url: common.projectPath + 'user/info/list.htl',
			    cache: false,
			    striped: false,
			    pagination: true,
			    pageSize: 10,
			    sidePagination:"server",
			    pageList: [10, 25, 50, 100, 200],
			    search: false,
			    showColumns: false,
			    showRefresh: false,
			    clickToSelect: true,
			    columns: queryColumn
			});
		},
		
		/**-------------------------------------------联系人信息------------------------------------**/
		/**
		 * 联系人详情
		 */
		linkmanDetail: function(id) {
			linkmanController.linkmanDetail(id, function(data){
				if (data.msg == 0) {
					sweetAlert.caution("温馨提示", "未获取到相关客户信息");
					return;
				}
				
				var modelId = "linkmandetailModel";
				var content = linkmanHTML.linkmanHTML(modelId);
				commFun.noModel(modelId, "联系人详情",700,500, content, null, null, true);

				mailInfoMain.fillLinkmanData(modelId,  data);
			});
		},
		
		/**
		 * 联系人详情
		 */
		fillLinkmanData: function(modelId,  data) {
			var linkma = data.linkmanInfo;
			$("#" + modelId + " #linkmanId").val(linkma.id);
			$("#" + modelId + " #linkmanName").val(linkma.linkmanName);
			$("#" + modelId + " #createTime").val(data.createTime);
			$("#" + modelId + " #clientName").val(linkma.clientName);
			$("#" + modelId + " #clientId").val(linkma.clientId);
			$("#" + modelId + " #age").val(linkma.age);
			$("#" + modelId + " #department").val(linkma.department);
			$("#" + modelId + " #duty").val(linkma.duty);
			$("#" + modelId + " #superCharge").val(linkma.superCharge);
			$("#" + modelId + " #workPhone").val(linkma.workPhone);
			$("#" + modelId + " #mobilePhone").val(linkma.mobilePhone);
			$("#" + modelId + " #email").val(linkma.email);
			$("#" + modelId + " #residencePhone").val(linkma.residencePhone);
			$("#" + modelId + " #passValue").val(linkma.passValue);
			$("#" + modelId + " #birthday").val(linkma.birthday);
			$("#" + modelId + " #prinDepart").val(linkma.prinDepart);
			$("#" + modelId + " #hobby").val(linkma.hobby);
			$("#" + modelId + " #remark").val(linkma.remark);
			$("#" + modelId + " #linkSex").find("input[value='"+linkma.sex+"']").prop("checked", true);
			
			$("#" + modelId + " input[type='text']").attr("disabled", true);
			$("#" + modelId + " input[type='radio']").attr("disabled", true);
			$("#" + modelId + " textarea").attr("disabled", true);
			$("#" + modelId + " #clientName").removeAttr("onclick");
		},
		/**
		 * 初始化
		 */
		queryInit: function(){
			//clientInfoMain.queryTable();
			mailInfoMain.initFun();
		}
}

/**
 * bootstrap-table event 事件
 */
window.clientEvent = {
	"click .like":function(e,value,row,index){
		mailInfoMain.clientDetail(row.id, 'detail');
	}
}
window.userEvent = {
	"click .like":function(e,value,row,index){
		sweetAlert.caution("温馨提示：", "此处暂不支持查看用户详情！", "确定", 3000);
	}
}

$(document).ready(function(){
	mailInfoMain.queryInit();
});