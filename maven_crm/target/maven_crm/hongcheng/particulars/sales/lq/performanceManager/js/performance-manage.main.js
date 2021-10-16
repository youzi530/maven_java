//clientInfoMain
var performanceManageMain = {
		// 保存查询条件
		// 虽然 bootstrap-table 提供了用于查询的按钮，但这里我们采用自定按钮
		queryTableParam: {},
		/**
		 * 初始化查询条件和表格
		 * @returns
		 */
		queryTable: function() {
			$("#client_info #criteriaNav").html('');
			var queryHtml = performanceManageHTML.queryHTML();
			var queryColumn = performanceManageHTML.queryColumns(true);
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
			    	$.extend(params,performanceManageMain.queryTableParam);
					performanceManageMain.queryTableParam = {};
			    	return params;
			    },
			    showColumns: false,
			    showRefresh: false,
			    clickToSelect: true,
			    columns: queryColumn
			});
		},


		/**
		 * 分页
		 */
		datatablesDestroy:function(){
			$('#performance_management_table').dataTable().fnDestroy();
		},

		datatablesCreate:function(){
			jQuery(function($) {
				var oTable1 = $('#performance_management_table').dataTable( {
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

		/**
		 * 重置查询条件
		 */
		resetFun: function() {
			var inputs_ = $("#client_info #criteriaNav").find(":text,textarea,input[type='text']");
			inputs_.val("");
			var checks_ = $("#client_info #criteriaNav").find("input[type='checkbox']");
			checks_.prop({"checked":false});

			$("tr").not($("#firstTr")).remove();

			$ajax({
				url:"see.performanceManage",
				type:"get",
				data:{
				},
				success:function(data){
					console.log(data);
					for(var i=0;i<data.length;i++){
						performanceManageAddTr(data,data[i].perid,data[i].username,data[i].saleOrderNum,data[i].contractNum,data[i].contractMoney);
					}
				},
				error:function(error){
					alert(error);
				}
			});

		},
		/**
		 * 查询
		 */
		queryFun: function() {
			var username = $("#username1").val();

			$("tr").not($("#firstTr")).remove();
			if(username==""){
				sweetAlert.caution("温馨提示", "请输入查询的职员姓名");
			}
			$ajax({
				url:"queryByPname.performanceManage",
				type:"get",
				data:{
					"username":username
				},
				success:function(data){
					var data = data.substring(3,data.length);
					var json = JSON.parse(data);
					var size = json.length;
					if(json.length==0){
						sweetAlert.caution("温馨提示", "未查询到相关信息");
						performanceManageMain.resetFun();
					}
					for(var i =0;i<json.length;i++){
						performanceManageAddTr(json,json[i].perid,json[i].username,json[i].saleOrderNum,json[i].contractNum,json[i].contractMoney);
					}
				},
				error:function(error){
					alert(error);
				}
			});

		},
		/**
		 * 显示/隐藏其他查询条件
		 */
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
			performanceManageCtroller.clientInfoDetail(id, function(data){
				if (data.msg == 0) {
					sweetAlert.caution("温馨提示", "未获取到相关客户信息");
					return;
				}
				var date=data;
				performanceManageCtroller.viewUser(function (data1) {
					performanceManageCtroller.viewNowuserInf(function (data2) {
						var content = performanceManageHTML.performanceManageHTML(type,data1,data2);
						var modelId = "client" + type + "Model";
						var isHideBut = type == 'update' ? false : true;
						commFun.noModel(modelId, "绩效详情",700,500, content, performanceManageMain.submitData, type, isHideBut);
						performanceManageMain.fillData(modelId, type, date);
					});
				});

			});
		},
		
		/**
		 * 添加客户信息
		 */
		addClient: function() {
			performanceManageCtroller.viewUser(function (data1) {
				performanceManageCtroller.viewNowuserInf(function (data2) {
					var content = performanceManageHTML.performanceManageHTML('add',data1,data2);
					commFun.noModel("clientaddModel", "添加绩效信息",700,500, content, performanceManageMain.submitData, "add" , false);
				});
			});
		},
		
		/**
		 * 修改客户信息
		 */
		updClient: function(id) {
			if (id == '') {
				var selectedData = $("#client_info #client_info_table").bootstrapTable('getSelections');
				if (selectedData.length < 1) {
					sweetAlert.caution("温馨提示：", "请选择要修改的数据！", "确定", 3000);
					return;
				} else if (selectedData.length > 1) {
					sweetAlert.caution("温馨提示：", "每次只允许修改一条数据！", "确定", 3000);
					return;
				} else {
					id = selectedData[0].id;
				}
			}
			performanceManageMain.clientDetail(id, 'update');
		},
		
		/**
		 * 填充数据
		 */
		fillData: function(modelId, type, data) {
			var client = data.clientInfo;
			var json1 = JSON.parse(data);

			var perid = json1[0].perid;
			var username = json1[0].username;
			// var contactNum = json1[0].contactNum;
			// var newContactNum = json1[0].newContactNum;
			var saleOrderNum = json1[0].saleOrderNum;
			var contractNum = json1[0].contractNum;
			var contractMoney = json1[0].contractMoney;

			$("#" + modelId + " #status").val(perid);
			$("#" + modelId + " #username").val(username);
			// $("#" + modelId + " #contactNum").val(contactNum);
			// $("#" + modelId + " #newContactNum").val(newContactNum);
			$("#" + modelId + " #saleOrderNum").val(saleOrderNum);
			$("#" + modelId + " #contractNum").val(contractNum);
			$("#" + modelId + " #contractMoney").val(contractMoney);
		},
		
		/**
		 * 提交数据
		 */
		submitData: function(type) {
			var modelId = "client" + type + "Model";

			var ids = $("#" + modelId + " #status").val();
			var username = $("#" + modelId + " #username").val();
			// var contactNum = $("#" + modelId + " #contactNum").val();
			// var newContactNum = $("#" + modelId + " #newContactNum").val();
			var saleOrderNum = $("#" + modelId + " #saleOrderNum").val();
			var contractNum = $("#" + modelId + " #contractNum").val();
			var contractMoney = $("#" + modelId + " #contractMoney").val();

			var purchaseData;
			var jsonpurchaseData;
			purchaseData = {perid:null,username:""+username+"",saleOrderNum:""+saleOrderNum+"",contractNum:""+contractNum+"",contractMoney:""+contractMoney+""};
			jsonpurchaseData = JSON.stringify(purchaseData);

			if (username == '') {
				sweetAlert.caution("温馨提示", "职员姓名不允许为空！");
				return false;
			}

			if (saleOrderNum == '') {
				sweetAlert.caution("温馨提示", "销售订单数不允许为空！");
				return false;
			}
			if(!(/[0-9]\d*/).test(saleOrderNum)){
				sweetAlert.caution("温馨提示", "输入的销售订单数格式不对！");
				return false;
			}
			if (contractNum == '') {
				sweetAlert.caution("温馨提示", "合同数不允许为空！");
				return false;
			}
			if(!(/[0-9]\d*/).test(contractNum)){
				sweetAlert.caution("温馨提示", "输入的合同数格式不对！");
				return false;
			}
			if (contractMoney == '') {
				sweetAlert.caution("温馨提示", "合同金额不允许为空！");
				return false;
			}
			if(!(/[0-9]\d*/).test(contractMoney)){
				sweetAlert.caution("温馨提示", "输入的合同金额格式不对！");
				return false;
			}
			var res = false;
			if (type == 'add') {// 添加
				performanceManageCtroller.clientInfoAdd(jsonpurchaseData, function(data){
					if (data == '') {
						performanceManageMain.queryTableParam = {};
						$("#client_info #client_info_table").bootstrapTable("refresh");
						res = true;
					} else {
						sweetAlert.success("温馨提示","添加成功","关闭",3000);
						performanceManageMain.queryTableParam = {};
						$("#client_info #client_info_table").bootstrapTable("refresh");
						res = true;

						var json = JSON.parse(data);
						performanceManageAddTr(json,json[0].perid,json[0].username,json[0].saleOrderNum,json[0].contractNum,json[0].contractMoney);
					}
				});
			} else {// 修改

				var cid = ids;
				purchaseData = {perid:""+cid+"",username:""+username+"",saleOrderNum:""+saleOrderNum+"",contractNum:""+contractNum+"",contractMoney:""+contractMoney+""};
				jsonproductData = JSON.stringify(purchaseData);

				performanceManageCtroller.clientInfoUpdate(jsonproductData, function(data) {
					var json = JSON.parse(data);
					if (data == '') {
						performanceManageMain.queryTableParam = {};
						$("#client_info #client_info_table").bootstrapTable("refresh");
						res = true;
					} else {
						sweetAlert.success("温馨提示","修改成功","关闭",3000);
						performanceManageMain.queryTableParam = {};
						$("#client_info #client_info_table").bootstrapTable("refresh");
						res = true;

						$("#performance_management_table #proTr"+json.perid + " td:eq(2) a").text(json.username);
						$("#performance_management_table #proTr"+json.perid + " td:eq(3) ").text(json.saleOrderNum);
						$("#performance_management_table #proTr"+json.perid + " td:eq(4) ").text(json.contractNum);
						$("#performance_management_table #proTr"+json.perid + " td:eq(5) ").text(json.contractMoney);
					}
				});
			}
			
			return res;
		},
		
		/**
		 * 批量删除
		 */
		delBatchClient: function() {

			var ids = new Array();
			$('input:checkbox[name=btSelectItem]:checked').each(function(){
				ids.push($(this).attr('id'));//向数组中添加元素
			});
			if (ids.length <=0) {
				sweetAlert.caution("温馨提示：", "请选择要删除的数据！", "确定", 3000);
				return;
			}
			
			sweetAlert.warning("确定删除吗？", "", "确定", "取消", null, 5000, function(){
				performanceManageCtroller.clientInfoBatchDel(ids, function(data){
					if (data != '') {
						sweetAlert.caution("温馨提示",data,"关闭",3000);
					} else {
						sweetAlert.success("温馨提示","删除成功","关闭",3000);
						$("#client_info #client_info_table").bootstrapTable("refresh");
						for(var i = 0;i<ids.length;i++){
							var tr = document.getElementById("proTr" +ids[i]+"");
							tr.remove();
						}
					}
				});
			}, "", "", null, null, false);
		},
		
		/**
		 * 单个删除
		 */
		delClient: function(id) {
			sweetAlert.warning("确定删除吗？", "", "确定", "取消", null, 5000, function(){
				performanceManageCtroller.clientInfoDel(id, function(data){
					if (data != '') {
						sweetAlert.caution("温馨提示",data,"关闭",3000);
					} else {
						sweetAlert.success("温馨提示","删除成功","关闭",3000);
						$("#client_info #client_info_table").bootstrapTable("refresh");
						var tr = document.getElementById("proTr" +id+"");
						tr.remove();
					}
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
							performanceManageCtroller.clientShareApplay(clientId, userId, function(data) {
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

				performanceManageMain.fillLinkmanData(modelId,  data);
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
			$("#" + modelId + " #username").val(linkma.username);
			$("#" + modelId + " #clientId").val(linkma.clientId);
			$("#" + modelId + " #age").val(linkma.age);
			$("#" + modelId + " #department").val(linkma.department);
			$("#" + modelId + " #duty").val(linkma.duty);
			$("#" + modelId + " #superCharge").val(linkma.superCharge);
			$("#" + modelId + " #workPhone").val(linkma.workPhone);
			$("#" + modelId + " #mobilePhone").val(linkma.mobilePhone);
			$("#" + modelId + " #contractNum").val(linkma.contractNum);
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
			$("#" + modelId + " #username").removeAttr("onclick");
		},
		/**
		 * 初始化
		 */
		queryInit: function(){
			//performanceManageMain.queryTable();
			performanceManageMain.initFun();
		}
}

/**
 * bootstrap-table event 事件
 */
window.clientEvent = {
	"click .like":function(e,value,row,index){
		performanceManageMain.clientDetail(row.id, 'detail');
	}
}
window.userEvent = {
	"click .like":function(e,value,row,index){
		sweetAlert.caution("温馨提示：", "此处暂不支持查看用户详情！", "确定", 3000);
	}
}

$(document).ready(function(){
	performanceManageMain.queryInit();
});