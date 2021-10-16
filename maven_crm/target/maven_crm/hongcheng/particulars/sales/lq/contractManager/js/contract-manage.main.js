
//clientInfoMain
var contractManageMain = {
		// 保存查询条件
		// 虽然 bootstrap-table 提供了用于查询的按钮，但这里我们采用自定按钮
		queryTableParam: {},
		/**
		 * 初始化查询条件和表格
		 * @returns
		 */
		queryTable: function() {
			$("#client_info #criteriaNav").html('');
			var queryHtml = contractManageHTML.queryHTML();
			var queryColumn = contractManageHTML.queryColumns(true);
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
			    	$.extend(params,contractManageMain.queryTableParam);
					contractManageMain.queryTableParam = {};
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
			$('#contract_management_table').dataTable().fnDestroy();
		},

		datatablesCreate:function(){
			jQuery(function($) {
				var oTable1 = $('#contract_management_table').dataTable( {
					// "aaSorting": [[ 1, "desc" ]],//默认第几个排序
					"ordering":false,
					"bStateSave": true,//状态保存
					searching : false,//去掉搜索框
					bAutoWidth: false,//是否自动宽度
					"aoColumnDefs": [
						//{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
						{"orderable":false,"aTargets":[0,1,2,3,4,5,6,7,8]}// 制定列不参与排序
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
				url:"see.contractManage",
				type:"get",
				data:{
				},
				success:function(data){
					console.log(data);
					for(var i=0;i<data.length;i++){
						contractManageAddTr(data,data[i].conid,data[i].cName,data[i].detail,data[i].username,data[i].giveaway,data[i].state,data[i].checkTime);
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
			var pName = $("#realName_").val();
			$("tr").not($("#firstTr")).remove();
			if(pName==""){
				sweetAlert.caution("温馨提示", "请输入查询的商品名");
			}
			$ajax({
					url:"queryByPname.contractManage",
					type:"get",
					data:{
						"pName":pName
					},
					success:function(data){
						var data = data.substring(3,data.length);
						var json = JSON.parse(data);
						var size = json.length;
						if(json.length==0){
							sweetAlert.caution("温馨提示", "未查询到相关信息");
							contractManageMain.resetFun();
						}
						for(var i =0;i<json.length;i++){
							contractManageAddTr(json,json[i].conid,json[i].cName,json[i].detail,json[i].username,json[i].giveaway,json[i].state,json[i].checkTime);
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
			contractManageCtroller.clientInfoDetail(id, function(data){
				if (data.msg == 0) {
					sweetAlert.caution("温馨提示", "未获取到相关客户信息");
					return;
				}
				var date=data;
				contractManageCtroller.viewUser(function (data1) {
					contractManageCtroller.viewNowuserInf(function (data2) {
						contractManageCtroller.viewClient(function (data3) {
							var content = contractManageHTML.contractManageHTML(type,data1,data2,data3);
							var modelId = "client" + type + "Model";
							var isHideBut = type == 'update' ? false : true;
							commFun.noModel(modelId, "合同详情",700,500, content, contractManageMain.submitData, type, isHideBut);
							contractManageMain.fillData(modelId, type, date);

							if (type != 'detail') {
								// 初始化时间组件
								var $registerTime = $('#' + modelId + ' #checkTime');
								$registerTime.datetimepicker({
									language:  'zh-CN',
									format: "yyyy年mm月dd日",// 日期格式
									minView: "month",// 精确视图，这样只有年月日，没有时分秒
									autoclose: true,// 是否自动关闭
									todayBtn: true,// 是否显示选择今天日期的按钮
									forceParse: 0
								});
							}
						});

					});
				});
			});
		},
		
		/**
		 * 添加客户信息
		 */
		addClient: function() {
			contractManageCtroller.viewUser(function (data1) {
				contractManageCtroller.viewNowuserInf(function (data2) {
					contractManageCtroller.viewClient(function (data3) {
						var content = contractManageHTML.contractManageHTML('add',data1,data2,data3);
						commFun.noModel("clientaddModel", "添加合同信息",700,500, content, contractManageMain.submitData, "add" , false);

						$('#clientaddModel #checkTime').datetimepicker({
							language: 'zh-CN',
							// format: "yyyymmdd",// 日期格式
							minView: "month",// 精确视图，这样只有年月日，没有时分秒
							autoclose: true,// 是否自动关闭
							todayBtn: true,// 是否显示选择今天日期的按钮
							forceParse: 0
						});

					});
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
			contractManageMain.clientDetail(id, 'update');
		},
		
		/**
		 * 填充数据
		 */
		fillData: function(modelId, type, data) {

			var json1 = JSON.parse(data);
			var conid = json1[0].conid;
			var cName = json1[0].cName;
			var detail = json1[0].detail;
			var username = json1[0].username;
			var giveaway = json1[0].giveaway;
			var state = json1[0].state;
			var checkTime = json1[0].checkTime;

			//var client = data.clientInfo;
			//$("#" + modelId + " #clientId").val(conid);
			$("#" + modelId + " #status").val(conid);
			$("#" + modelId + " #cName").val(cName);
			$("#" + modelId + " #detail").val(detail);
			$("#" + modelId + " #username").val(username);
			$("#" + modelId + " #giveaway").val(giveaway);
			$("#" + modelId + " #state").val(state);
			$("#" + modelId + " #checkTime").val(checkTime);

		},
		
		/**
		 * 提交数据
		 */
		submitData: function(type) {
			var modelId = "client" + type + "Model";

			var ids = $("#" + modelId + " #status").val();
			var cName = $("#" + modelId + " #cName").val();
			var detail = $("#" + modelId + " #detail").val();
			var username = $("#" + modelId + " #username").val();
			var giveaway = $("#" + modelId + " #giveaway").val();
			var checkTime = $("#" + modelId + " #checkTime").val();
			var state = $("#" + modelId + " #state").val();

			var purchaseData;
			var jsonpurchaseData;
			//选中的那个商品的pid：
			//var pid = $("#pName").find("option[value = '"+pName+"']").attr("id");

			purchaseData = {conid:null,cName:""+cName+"",detail:""+detail+"",username:""+username+"",giveaway:""+giveaway+"",checkTime:""+checkTime+"",state:""+state+""};
			jsonpurchaseData = JSON.stringify(purchaseData);

			if (cName == '') {
				sweetAlert.caution("温馨提示", "合同主题不允许为空！");
				return false;
			}
			if (detail == '') {
				sweetAlert.caution("温馨提示", "订购明细不允许为空！");
				return false;
			}
			if (username == '') {
				sweetAlert.caution("温馨提示", "职员名称不允许为空！");
				return false;
			}
			if (state == '') {
				sweetAlert.caution("温馨提示", "审核状态不允许为空！");
				return false;
			}
			
			var res = false;
			if (type == 'add') {// 添加
				contractManageCtroller.clientInfoAdd(jsonpurchaseData, function(data){
					if (data == '') {
						sweetAlert.caution("温馨提示","添加失败","关闭",3000);
						res = true;
					} else {
						sweetAlert.success("温馨提示","添加成功","关闭",3000);

						contractManageMain.queryTableParam = {};
						$("#client_info #client_info_table").bootstrapTable("refresh");
						res = true;

						console.log("传回来的，带cid"+data);
						var json = JSON.parse(data);

						contractManageAddTr(json,json[0].conid,json[0].cName,json[0].detail,json[0].username,json[0].giveaway,json[0].checkTime,json[0].state);
					}
				});
			} else {// 修改

				var conid = ids;
				purchaseData = {conid:conid,cName:""+cName+"",detail:""+detail+"",username:""+username+"",giveaway:""+giveaway+"",checkTime:""+checkTime+"",state:""+state+""};
				jsonproductData = JSON.stringify(purchaseData);

				contractManageCtroller.clientInfoUpdate(jsonproductData, function(data) {
					var json = JSON.parse(data);
					if (data == '') {
						contractManageMain.queryTableParam = {};
						$("#client_info #client_info_table").bootstrapTable("refresh");
						res = true;
					} else {
						sweetAlert.success("温馨提示","修改成功","关闭",3000);
						contractManageMain.queryTableParam = {};
						$("#client_info #client_info_table").bootstrapTable("refresh");
						res = true;


						//$("#call_manager_table #proTr"+json.pid + " td:eq(2) a").text(json.pName);
						$("#contract_management_table #proTr"+json.conid + " td:eq(2) a").text(json.cName);
						$("#contract_management_table #proTr"+json.conid + " td:eq(3) ").text(json.detail);
						$("#contract_management_table #proTr"+json.conid + " td:eq(4) ").text(json.username);
						$("#contract_management_table #proTr"+json.conid + " td:eq(5) ").text(json.giveaway);
						$("#contract_management_table #proTr"+json.conid + " td:eq(6) ").text(json.checkTime);
						$("#contract_management_table #proTr"+json.conid + " td:eq(7) ").text(json.state);
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

				contractManageCtroller.clientInfoBatchDel(ids, function(data){
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
				contractManageCtroller.clientInfoDel(id, function(data){
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
							contractManageCtroller.clientShareApplay(clientId, userId, function(data) {
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

				contractManageMain.fillLinkmanData(modelId,  data);
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
			$("#" + modelId + " #cName").val(linkma.cName);
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
			$("#" + modelId + " #cName").removeAttr("onclick");
		},
		/**
		 * 初始化
		 */
		queryInit: function(){
			//contractManageMain.queryTable();
			contractManageMain.initFun();
		}
}

/**
 * bootstrap-table event 事件
 */
window.clientEvent = {
	"click .like":function(e,value,row,index){
		contractManageMain.clientDetail(row.id, 'detail');
	}
}
window.userEvent = {
	"click .like":function(e,value,row,index){
		sweetAlert.caution("温馨提示：", "此处暂不支持查看用户详情！", "确定", 3000);
	}
}

$(document).ready(function(){
	contractManageMain.queryInit();
});