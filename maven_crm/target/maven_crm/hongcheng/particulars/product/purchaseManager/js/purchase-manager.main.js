//clientInfoMain
var purchaseManagerMain = {
		// 保存查询条件
		// 虽然 bootstrap-table 提供了用于查询的按钮，但这里我们采用自定按钮
		queryTableParam: {},
		/**
		 * 初始化查询条件和表格
		 * @returns
		 */
		queryTable: function() {
			$("#client_info #criteriaNav").html('');
			var queryHtml = purchaseManagerHTML.queryHTML();
			var queryColumn = purchaseManagerHTML.queryColumns(true);
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
			    	$.extend(params,purchaseManagerMain.queryTableParam);
					purchaseManagerMain.queryTableParam = {};
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
			$('#call_manager_table').dataTable().fnDestroy();
		},

		datatablesCreate:function(){
			jQuery(function($) {
				var oTable1 = $('#call_manager_table').dataTable( {
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
				url:"see.purchaseManage",
				type:"get",
				data:{
				},
				success:function(data){
					console.log(data);
					for(var i=0;i<data.length;i++){
						purManageAddTr(data,data[i].id,data[i].pName,data[i].username,data[i].inNum,data[i].outNum);
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
			var pName = $("#purchaseName").val();
			$("tr").not($("#firstTr")).remove();
			if(pName==""){
				sweetAlert.caution("温馨提示", "请输入查询的商品名");
			}
			$ajax({
				url:"queryByPname.purchaseManage",
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
						purchaseManagerMain.resetFun();
					}
					for(var i =0;i<json.length;i++){
						purManageAddTr(json,json[i].id,json[i].pName,json[i].username,json[i].inNum,json[i].outNum);
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
		 * 采购详情
		 */
		clientDetail: function(id, type) {
			purchaseManagerCtroller.clientInfoDetail(id, function(data){
				if (data.msg == 0) {
					sweetAlert.caution("温馨提示", "未获取到相关采购信息");
					return;
				}
				var date=data;

				//当在采购管理处，当商品信息里面已经删除了这件商品了，那么采购里面就不允许修改了
				var json1 = JSON.parse(data);
				var Pid = json1[0].pName;
				var arr=Pid.split("：");
				var arrs = arr[1].split("）");
				var pid = arrs[0];
				purchaseManagerCtroller.isEistProduct(pid,function (data3) {
					if(data3=="true"){
						purchaseManagerCtroller.viewPur(function (da) {
							purchaseManagerCtroller.viewUsername(function (data1) {
								purchaseManagerCtroller.viewNowuserInfo(function (data2) {
									var content = purchaseManagerHTML.purchaseManagerHTML(type,da,data1,data2);
									var modelId = "client" + type + "Model"	;
									var isHideBut = type == 'update' ? false : true;

									commFun.noModel(modelId, "采购详情",700,500, content, purchaseManagerMain.submitData, type, isHideBut);
									purchaseManagerMain.fillData(modelId, type, date);
								});

							});

						});
					}else{
						sweetAlert.caution("温馨提示：", "您选择的商品信息已经删除，不允许修改！", "确定", 3000);
					}
				});
			});
		},
		
		/**
		 * 添加采购信息
		 */
		addClient: function() {
			purchaseManagerCtroller.viewPur(function (data) { //查看商品所有的信息，将商品名称展示下拉
				purchaseManagerCtroller.viewUsername(function (data1) { //查看用户的realName和userId，下拉
					purchaseManagerCtroller.viewNowuserInfo(function (data2) {  //得到当前用户值，用于权限判断
						var content = purchaseManagerHTML.purchaseManagerHTML('add',data,data1,data2);
						commFun.noModel("clientaddModel", "添加采购信息",700,350, content, purchaseManagerMain.submitData, "add" , false);
					});
				});
			});
		},
		
		/**
		 * 修改采购信息
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
			purchaseManagerMain.clientDetail(id, 'update');
		},
		
		/**
		 * 填充数据
		 */
		fillData: function(modelId, type, data) {
			// var client = data.clientInfo;

			var json1 = JSON.parse(data);
			var id = json1[0].id;
			var pName = json1[0].pName;
			var username = json1[0].username;
			var inNum = json1[0].inNum;
			var outNum = json1[0].outNum;

			//$("#" + modelId + " #clientId").val(client.id);
			//$("#" + modelId + " #status").val(id);
			$("#" + modelId + " #pName").val(pName);
			$("#" + modelId + " #username").val(username);
			$("#" + modelId + " #inNum").val(inNum);
			$("#" + modelId + " #outNum").val(outNum);
			$("#" + modelId + " #email").val(id);

		},
		
		/**
		 * 提交数据
		 */
		submitData: function(type) {
			var modelId = "client" + type + "Model";

			var ids = $("#" + modelId + " #email").val();
			var pName = $("#" + modelId + " #pName").val();
			var username = $("#" + modelId + " #username").val();
			var inNum = $("#" + modelId + " #inNum").val();
			var outNum = $("#" + modelId + " #outNum").val();

			var purchaseData;
			var jsonpurchaseData;
			purchaseData = {id:null,pName:""+pName+"",username:""+username+"",inNum:""+inNum+"",outNum:""+outNum+""};
			jsonpurchaseData = JSON.stringify(purchaseData);

			if (pName == '') {
				sweetAlert.caution("温馨提示", "商品名称不允许为空！");
				return false;
			}
			if (username == '') {
				sweetAlert.caution("温馨提示", "采购人不允许为空！");
				return false;
			}
			if (inNum == '') {
				sweetAlert.caution("温馨提示", "采购数量不允许为空！");
				return false;
			}
            if(!(/[0-9]\d*/).test(inNum)){
                sweetAlert.caution("温馨提示", "输入的采购数量格式不对！");
                return false;
            }
			if (outNum == '') {
				sweetAlert.caution("温馨提示", "退货数量不允许为空！");
				return false;
			}
            if(!(/[0-9]\d*/).test(outNum)){
                sweetAlert.caution("温馨提示", "输入的退货数量格式不对！");
                return false;
            }
			//这里的outNum是String类型的
			if(parseInt(outNum) > parseInt(inNum)){
				sweetAlert.caution("温馨提示", "退货数量不允许多于进货数量！");
				return false;
			}
			var res = false;
			if (type == 'add') {// 添加
				purchaseManagerCtroller.clientInfoAdd(jsonpurchaseData, function(data){
					if (data == '') {
						sweetAlert.caution("温馨提示","添加失败","关闭",3000);

					} else {
						sweetAlert.success("温馨提示","添加成功","关闭",3000);
						purchaseManagerMain.queryTableParam = {};
						$("#client_info #client_info_table").bootstrapTable("refresh");
						res = true;

						var json = JSON.parse(data);
						purManageAddTr(json,json[0].id,json[0].pName,json[0].username,json[0].inNum,json[0].outNum);

						$('button:contains("关闭")').click(function () {
							window.location.reload();
						})

					}
				});
			} else {// 修改
				var id = ids;
				productData = {id:""+id+"",pName:""+pName+"",username:""+username+"",inNum:""+inNum+"",outNum:""+outNum+""};
				jsonproductData = JSON.stringify(productData);

				purchaseManagerCtroller.clientInfoUpdate(jsonproductData, function(data) {
					var json = JSON.parse(data);
					if (data == '') {
						commodityInfoMain.queryTableParam = {};
						$("#client_info #client_info_table").bootstrapTable("refresh");
						res = true;

					} else {
						sweetAlert.success("温馨提示","修改成功","关闭",3000);
						purchaseManagerMain.queryTableParam = {};
						$("#client_info #client_info_table").bootstrapTable("refresh");
						res = true;
						//$("#call_manager_table #proTr"+json.pid + " td:eq(2) a").text(json.pName);
						$("#call_manager_table #proTr"+json.id + " td:eq(2) a").text(json.pName);
						$("#call_manager_table #proTr"+json.id + " td:eq(3) ").text(json.username);
						$("#call_manager_table #proTr"+json.id + " td:eq(4) ").text(json.inNum);
						$("#call_manager_table #proTr"+json.id + " td:eq(5) ").text(json.outNum);

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
			// var selectedData = $("#client_info #client_info_table").bootstrapTable('getSelections');
			// if (selectedData.length < 1) {
			// 	sweetAlert.caution("温馨提示：", "请选择要删除的数据！", "确定", 3000);
			// 	return;
			// }

			var ids = new Array();
			$('input:checkbox[name=btSelectItem]:checked').each(function(){
				ids.push($(this).attr('id'));//向数组中添加元素
			});
			if (ids.length <=0) {
				sweetAlert.caution("温馨提示：", "请选择要删除的数据！", "确定", 3000);
				return;
			}
			sweetAlert.warning("确定删除吗？", "", "确定", "取消", null, 5000, function(){
				// var ids = new Array();
				// $.each(selectedData, function(k, v) {
				// 	ids.push(v.id);
				// });
				purchaseManagerCtroller.clientInfoBatchDel(ids, function(data){
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
				purchaseManagerCtroller.clientInfoDel(id, function(data){
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
							purchaseManagerCtroller.clientShareApplay(clientId, userId, function(data) {
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

				purchaseManagerMain.fillLinkmanData(modelId,  data);
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
			$("#" + modelId + " #pName").val(linkma.pName);
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
			$("#" + modelId + " #pName").removeAttr("onclick");
		},
		/**
		 * 初始化
		 */
		queryInit: function(){
			//purchaseManagerMain.queryTable();
			purchaseManagerMain.initFun();
		}
}

/**
 * bootstrap-table event 事件
 */
window.clientEvent = {
	"click .like":function(e,value,row,index){
		purchaseManagerMain.clientDetail(row.id, 'detail');
	}
}
window.userEvent = {
	"click .like":function(e,value,row,index){
		sweetAlert.caution("温馨提示：", "此处暂不支持查看用户详情！", "确定", 3000);
	}
}

$(document).ready(function(){
	purchaseManagerMain.queryInit();
});