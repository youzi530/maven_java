//clientInfoMain
var deliveryManagerMain = {
		// 保存查询条件
		// 虽然 bootstrap-table 提供了用于查询的按钮，但这里我们采用自定按钮
		queryTableParam: {},
		/**
		 * 初始化查询条件和表格
		 * @returns
		 */
		queryTable: function() {
			$("#client_info #criteriaNav").html('');
			var queryHtml = deliveryManagerHTML.queryHTML();
			var queryColumn = deliveryManagerHTML.queryColumns(true);
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
			    	$.extend(params,deliveryManagerMain.queryTableParam);
					deliveryManagerMain.queryTableParam = {};
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
				url:"see.sendProduct",
				type:"get",
				data:{
				},
				success:function(data){
					console.log(data);
					for(var i=0;i<data.length;i++){
						sendProductAddTr(data,data[i].id,data[i].pName,data[i].address,data[i].clientName,data[i].username);
					}
				},
				error:function(error){
					alert(error);
				}
			});
		},

	/**
	 * 凌巧自己写的，生成合同的函数
	 */
	addcontract:function(){
			var ids = new Array();
			$('input:checkbox[name=btSelectItem]:checked').each(function(){
				ids.push($(this).attr('id'));//向数组中添加元素
			});
			if (ids.length <=0) {
				sweetAlert.caution("温馨提示：", "请选择要生成合同的订单！", "确定", 3000);
				return;
			}
			
			sweetAlert.warning("确定生成合同吗？", "", "确定", "取消", null, 5000, function(){
				//发一个请求，将选中的id所对应的发货信息查询到，在下面做验证，如果收货地址和收货人为空，则不允许继续生成合同：
				deliveryManagerCtroller.viewSendproById(ids,function (data1) {
					var flag= true;

					var data1 = data1.split("crm");
					var s = data1.length;
					console.log(s);
					for (var i = 0; i < data1.length-1; i++) {
						var json = JSON.parse(data1[i]);

						var address = json[0].address;
						var clientName = json[0].clientName;
						if(clientName == "请选择收货人"){
							sweetAlert.caution("温馨提示","请填写收货人！","关闭",3000);
							flag = false;
							res = true;
						}
						if(address == "请选择收货地址"){
							sweetAlert.caution("温馨提示","请填写收货地址！","关闭",3000);
							flag = false;
							res = true;
						}

						if(i<data1.length-2){
							if(JSON.parse(data1[i+1])[0].clientName != JSON.parse(data1[i])[0].clientName){
								sweetAlert.caution("温馨提示","请选择相同的收货人！","关闭",3000);
								flag = false;
							}else if(JSON.parse(data1[i+1])[0].username != JSON.parse(data1[i])[0].username){
								sweetAlert.caution("温馨提示","请选择相同的发货人！","关闭",3000);
								flag = false;
							}else{
								flag = true;
							}
						}
					}
					if(flag == true){
						deliveryManagerCtroller.contractAdd(ids, function(data){
							if (data != '') {
								sweetAlert.caution("温馨提示",data,"关闭",3000);
							} else {
								sweetAlert.success("温馨提示","生成合同成功","关闭",3000);
								$("#client_info #client_info_table").bootstrapTable("refresh");
								for(var i = 0;i<ids.length;i++){
									var tr = document.getElementById("proTr" +ids[i]+"");
									tr.remove();
								}
							}
						});
					}
				});

			}, "", "", null, null, false);
		},

		/**
		 * 查询
		 */
		queryFun: function() {
			var pName = $("#deliveryName").val();
			$("tr").not($("#firstTr")).remove();
			if(pName==""){
				sweetAlert.caution("温馨提示", "请输入查询的商品姓名");
			}

			$ajax({
				url:"queryByPname.sendProduct",
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
						deliveryManagerMain.resetFun();
					}
					for(var i =0;i<json.length;i++){
						sendProductAddTr(json,json[i].id,json[i].pName,json[i].address,json[i].clientName,json[i].username);
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
		 * 发货详情
		 */
		clientDetail: function(id, type) {
			deliveryManagerCtroller.clientInfoDetail(id, function(data){          //判断是否存在，返回通过主键获得的数据
				if (data.msg == 0) {
					sweetAlert.caution("温馨提示", "未获取到相关发货信息");
					return;
				}

				var date=data;
				deliveryManagerCtroller.viewPro(function (da) {
					deliveryManagerCtroller.viewUsername(function (data1) {
						deliveryManagerCtroller.viewNowuserInfo(function (data2) {
							deliveryManagerCtroller.viewClient(function (data3) {
								var content = deliveryManagerHTML.deliveryManagerHTML(type,da,data1,data2,data3);
								var modelId = "client" + type + "Model";
								var isHideBut = type == 'update' ? false : true;

								commFun.noModel(modelId, "发货详情",700,500, content, deliveryManagerMain.submitData, type, isHideBut);
								deliveryManagerMain.fillData(modelId, type, date);
							});

						});

					});

				});


			});
		},
		
		/**
		 * 添加发货信息
		 */
		addClient: function() {
			deliveryManagerCtroller.viewPro(function (data) {
				deliveryManagerCtroller.viewUsername(function (data1) {
					deliveryManagerCtroller.viewNowuserInfo(function (data2) {
						deliveryManagerCtroller.viewClient(function (data3) {
							var content = deliveryManagerHTML.deliveryManagerHTML('add',data,data1,data2,data3);
							commFun.noModel("clientaddModel", "添加发货信息",700,500, content, deliveryManagerMain.submitData, "add" , false);
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
			deliveryManagerMain.clientDetail(id, 'update');
		},
		
		/**
		 * 填充数据
		 */
		fillData: function(modelId, type, data) {
			//var client = data.clientInfo;

			var json1 = JSON.parse(data);
			var id = json1[0].id;
			var pName = json1[0].pName;
			var address = json1[0].address;
			var clientName = json1[0].clientName;
			var username = json1[0].username;
			var saleNum = json1[0].saleNum;
			var salePrice = json1[0].salePrice;

			//$("#" + modelId + " #clientId").val(client.id);
			$("#" + modelId + " #status").val(id);
			$("#" + modelId + " #pName").val(pName);

			$("#" + modelId + " #clientName").val(clientName);
			$("#" + modelId + " #username").val(username);
			$("#" + modelId + " #saleNum").val(saleNum);
			$("#" + modelId + " #salePrice").val(salePrice);
			$("#" + modelId + " #address").placeholder(address);
		},
		
		/**
		 * 提交数据
		 */
		submitData: function(type) {
			var modelId = "client" + type + "Model";

			var ids = $("#" + modelId + " #status").val();
			var pName = $("#" + modelId + " #pName").val();
			var address = $("#" + modelId + " #address").val();
			var clientName = $("#" + modelId + " #clientName").val();
			var username = $("#" + modelId + " #username").val();
			var saleNum = $("#" + modelId + " #saleNum").val();
			var salePrice = $("#" + modelId + " #salePrice").val();


			var purchaseData;
			var jsonpurchaseData;
			purchaseData = {id:null,pName:""+pName+"",address:""+address+"",clientName:""+clientName+"",username:""+username+"",saleNum:""+saleNum+"",salePrice:""+salePrice+""};
			jsonpurchaseData = JSON.stringify(purchaseData);

			if (pName == '') {
				sweetAlert.caution("温馨提示", "商品名称不允许为空！");
				return false;
			}
			if (address == '') {
				sweetAlert.caution("温馨提示", "收货地址不允许为空！");
				return false;
			}
			if (clientName == '') {
				sweetAlert.caution("温馨提示", "收货人不允许为空！");
				return false;
			}
			if (username == '') {
				sweetAlert.caution("温馨提示", "发货人不允许为空！");
				return false;
			}
			if (saleNum == '') {
				sweetAlert.caution("温馨提示", "商品数量不允许为空！");
				return false;
			}
			if(!(/[0-9]\d*/).test(saleNum)){
				sweetAlert.caution("温馨提示", "输入的商品数量格式不对！");
				return false;
			}
			if (salePrice == '') {
				sweetAlert.caution("温馨提示", "商品价格不允许为空！");
				return false;
			}
			if(!(/[0-9]\d*/).test(saleNum)){
				sweetAlert.caution("温馨提示", "输入的商品价格格式不对！");
				return false;
			}
			var res = false;
			if (type == 'add') {// 添加
				deliveryManagerCtroller.clientInfoAdd(jsonpurchaseData, function(data){
					if (data == '') {
						deliveryManagerMain.queryTableParam = {};
						$("#client_info #client_info_table").bootstrapTable("refresh");
						res = true;
					} else {
						sweetAlert.success("温馨提示","添加成功","关闭",3000);

						deliveryManagerMain.queryTableParam = {};
						$("#client_info #client_info_table").bootstrapTable("refresh");
						res = true;

						console.log("传回来的，带pid"+data);
						var id = data.id;
						console.log(id);
						var json = JSON.parse(data);
						var sid = json[0].id;
						console.log(sid);
						sendProductAddTr(json,json[0].id,json[0].pName,json[0].address,json[0].clientName,json[0].username,json[0].salePrice,json[0].saleNum);
					}
				});
			} else {// 修改
				// var id = $("#" + modelId + " #clientId").val();
				var id = ids;
				productData = {id:""+id+"",pName:""+pName+"",address:""+address+"",clientName:""+clientName+"",username:""+username+"",saleNum:""+saleNum+"",salePrice:""+salePrice+""};
				jsonproductData = JSON.stringify(productData);

				deliveryManagerCtroller.clientInfoUpdate(jsonproductData, function(data) {
					var json = JSON.parse(data);
					if (data == '') {
						deliveryManagerMain.queryTableParam = {};
						$("#client_info #client_info_table").bootstrapTable("refresh");
						res = true;
					} else {
						sweetAlert.success("温馨提示","修改成功","关闭",3000);
						deliveryManagerMain.queryTableParam = {};
						$("#client_info #client_info_table").bootstrapTable("refresh");
						res = true;
						//$("#call_manager_table #proTr"+json.pid + " td:eq(2) a").text(json.pName);
						$("#call_manager_table #proTr"+json.id + " td:eq(2) a").text(json.pName);

						$("#call_manager_table #proTr"+json.id + " td:eq(3) ").text(json.saleNum);
						$("#call_manager_table #proTr"+json.id + " td:eq(4) ").text(json.salePrice);

						$("#call_manager_table #proTr"+json.id + " td:eq(5) ").text(json.address);
						$("#call_manager_table #proTr"+json.id + " td:eq(6) ").text(json.clientName);
						$("#call_manager_table #proTr"+json.id + " td:eq(7) ").text(json.username);

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
				deliveryManagerCtroller.clientInfoBatchDel(ids, function(data){
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
				deliveryManagerCtroller.clientInfoDel(id, function(data){
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
							deliveryManagerCtroller.clientShareApplay(clientId, userId, function(data) {
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

				deliveryManagerMain.fillLinkmanData(modelId,  data);
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
			$("#" + modelId + " #saleNum").val(linkma.saleNum);
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
			//deliveryManagerMain.queryTable();
			deliveryManagerMain.initFun();
		}
}

/**
 * bootstrap-table event 事件
 */
window.clientEvent = {
	"click .like":function(e,value,row,index){
		deliveryManagerMain.clientDetail(row.id, 'detail');
	}
}
window.userEvent = {
	"click .like":function(e,value,row,index){
		sweetAlert.caution("温馨提示：", "此处暂不支持查看用户详情！", "确定", 3000);
	}
}

$(document).ready(function(){
	deliveryManagerMain.queryInit();
});