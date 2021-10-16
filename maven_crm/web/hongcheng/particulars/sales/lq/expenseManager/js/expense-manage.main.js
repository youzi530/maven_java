//clientInfoMain
var expenseManageMain = {
		// 保存查询条件
		// 虽然 bootstrap-table 提供了用于查询的按钮，但这里我们采用自定按钮
		queryTableParam: {},
		/**
		 * 初始化查询条件和表格
		 * @returns
		 */
		queryTable: function() {
			$("#client_info #criteriaNav").html('');
			var queryHtml = expenseManageHTML.queryHTML();
			var queryColumn = expenseManageHTML.queryColumns(true);
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
			    	$.extend(params,expenseManageMain.queryTableParam);
					expenseManageMain.queryTableParam = {};
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
			$('#expense_management_table').dataTable().fnDestroy();
		},

		datatablesCreate:function(){
			jQuery(function($) {
				var oTable1 = $('#expense_management_table').dataTable( {
					// "aaSorting": [[ 1, "desc" ]],//默认第几个排序
					"ordering":false,
					"bStateSave": true,//状态保存
					searching : false,//去掉搜索框
					bAutoWidth: false,//是否自动宽度
					"aoColumnDefs": [
						//{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
						{"orderable":false,"aTargets":[0,1,2,3,4,5,6,7]}// 制定列不参与排序
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
				url:"see.expenseManage",
				type:"get",
				data:{
				},
				success:function(data){
					console.log(data);
					for(var i=0;i<data.length;i++){
						expenseManageAddTr(data,data[i].costId,data[i].username,data[i].income,data[i].outcome,data[i].detail,data[i].state);
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
			var detail = $("#realName_").val();
			$("tr").not($("#firstTr")).remove();
			if(detail==""){
				sweetAlert.caution("温馨提示", "请输入查询的明细内容");
			}
			$ajax({
					url:"queryByPname.expenseManage",
					type:"get",
					data:{
						"detail":detail
					},
					success:function(data){
						var data = data.substring(3,data.length);
						var json = JSON.parse(data);
						var size = json.length;
						if(json.length==0){
							sweetAlert.caution("温馨提示", "未查询到相关信息");
							expenseManageMain.resetFun();
						}
						for(var i =0;i<json.length;i++){
							expenseManageAddTr(json,json[i].costId,json[i].username,json[i].income,json[i].outcome,json[i].detail,json[i].state);
						}
					},
					error:function(error){
						alert(error);
					}
			});
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

			expenseManageCtroller.clientInfoDetail(id, function(data){
				if (data.msg == 0) {
					sweetAlert.caution("温馨提示", "未获取到相关客户信息");
					return;
				}
				var date=data;
				expenseManageCtroller.viewUser(function (data1) {
					expenseManageCtroller.viewNowuserInf(function (data2) {
						var content = expenseManageHTML.expenseManageHTML(type,data1,data2);
						var modelId = "client" + type + "Model";
						var isHideBut = type == 'update' ? false : true;
						commFun.noModel(modelId, "费用详情",700,500, content, expenseManageMain.submitData, type, isHideBut);

						expenseManageMain.fillData(modelId, type, date);
					});

				});

			});
		},
		
		/**
		 * 添加客户信息
		 */
		addClient: function() {
			expenseManageCtroller.viewUser(function (data1) {
				expenseManageCtroller.viewNowuserInf(function (data2) {
					var content = expenseManageHTML.expenseManageHTML('add',data1,data2);
					commFun.noModel("clientaddModel", "添加费用信息",700,500, content, expenseManageMain.submitData, "add" , false);
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
			expenseManageMain.clientDetail(id, 'update');
		},

		/**
		 * 填充数据
		 */
		fillData: function(modelId, type, data) {

			var json1 = JSON.parse(data);
			var costId = json1[0].costId;
			var username = json1[0].username;
			var income = json1[0].income;
			var outcome = json1[0].outcome;
			var detail = json1[0].detail;
			var state = json1[0].state;

			var client = data.clientInfo;
			//$("#" + modelId + " #clientId").val(client.id);
			$("#" + modelId + " #status").val(costId);
			$("#" + modelId + " #username").val(username);
			$("#" + modelId + " #income").val(income);
			$("#" + modelId + " #outcome").val(outcome);
			$("#" + modelId + " #detail").val(detail);
			$("#" + modelId + " #state").val(state);

		},
		
		/**
		 * 提交数据
		 */
		submitData: function(type) {
			var modelId = "client" + type + "Model";

			var ids = $("#" + modelId + " #status").val();
			var username = $("#" + modelId + " #username").val();
			var income = $("#" + modelId + " #income").val();
			var outcome = $("#" + modelId + " #outcome").val();
			var detail = $("#" + modelId + " #detail").val();
			var state = $("#" + modelId + " #state").val();

			var purchaseData;
			var jsonpurchaseData;
			purchaseData = {costId:null,username:""+username+"",income:""+income+"",outcome:""+outcome+"",detail:""+detail+"",state:""+state+""};
			jsonpurchaseData = JSON.stringify(purchaseData);

			if (username == '') {
				sweetAlert.caution("温馨提示", "职员名称不允许为空！");
				return false;
			}
			if (income == '') {
				sweetAlert.caution("温馨提示", "收入不允许为空！");
				return false;
			}
			if(!(/[0-9]\d*/).test(income)){
				sweetAlert.caution("温馨提示", "输入的收入格式不对！");
				return false;
			}
			if (outcome == '') {
				sweetAlert.caution("温馨提示", "支出不允许为空！");
				return false;
			}
			if(!(/[0-9]\d*/).test(outcome)){
				sweetAlert.caution("温馨提示", "输入的支出	格式不对！");
				return false;
			}
			if (detail == '') {
				sweetAlert.caution("温馨提示", "明细不允许为空！");
				return false;
			}if (state == '') {
				sweetAlert.caution("温馨提示", "审核状态不允许为空！");
				return false;
			}
			
			var res = false;
			if (type == 'add') {// 添加
				expenseManageCtroller.clientInfoAdd(jsonpurchaseData, function(data){
					if (data == '') {
						expenseManageMain.queryTableParam = {};
						$("#client_info #client_info_table").bootstrapTable("refresh");
						res = true;
					} else {
						sweetAlert.success("温馨提示","添加成功","关闭",3000);

						expenseManageMain.queryTableParam = {};
						$("#client_info #client_info_table").bootstrapTable("refresh");
						res = true;


						var json = JSON.parse(data);
						expenseManageAddTr(json,json[0].costId,json[0].username,json[0].income,json[0].outcome,json[0].detail,json[0].state);
					}
				});
			} else {// 修改

				var cid = ids;
				purchaseData = {costId:""+cid+"",username:""+username+"",income:""+income+"",outcome:""+outcome+"",detail:""+detail+"",state:""+state+""};
				jsonproductData = JSON.stringify(purchaseData);

				expenseManageCtroller.clientInfoUpdate(jsonproductData, function(data) {
					var json = JSON.parse(data);
					if (data == '') {
						expenseManageMain.queryTableParam = {};
						$("#client_info #client_info_table").bootstrapTable("refresh");
						res = true;
					} else {
						sweetAlert.success("温馨提示","修改成功","关闭",3000);
						expenseManageMain.queryTableParam = {};
						$("#client_info #client_info_table").bootstrapTable("refresh");
						res = true;

						//$("#call_manager_table #proTr"+json.pid + " td:eq(2) a").text(json.pName);
						$("#expense_management_table #proTr"+json.costId + " td:eq(2) a").text(json.username);
						$("#expense_management_table #proTr"+json.costId + " td:eq(3) ").text(json.income);
						$("#expense_management_table #proTr"+json.costId + " td:eq(4) ").text(json.outcome);
						$("#expense_management_table #proTr"+json.costId + " td:eq(5) ").text(json.detail);
						$("#expense_management_table #proTr"+json.costId + " td:eq(6) ").text(json.state);

						console.log(json);
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
				expenseManageCtroller.clientInfoBatchDel(ids, function(data){
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
				expenseManageCtroller.clientInfoDel(id, function(data){
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
							expenseManageCtroller.clientShareApplay(clientId, userId, function(data) {
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

				expenseManageMain.fillLinkmanData(modelId,  data);
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
			$("#" + modelId + " #state").val(linkma.state);
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
			//expenseManageMain.queryTable();
			expenseManageMain.initFun();
		}
}

/**
 * bootstrap-table event 事件
 */
window.clientEvent = {
	"click .like":function(e,value,row,index){
		expenseManageMain.clientDetail(row.id, 'detail');
	}
}
window.userEvent = {
	"click .like":function(e,value,row,index){
		sweetAlert.caution("温馨提示：", "此处暂不支持查看用户详情！", "确定", 3000);
	}
}

$(document).ready(function(){
	expenseManageMain.queryInit();
});