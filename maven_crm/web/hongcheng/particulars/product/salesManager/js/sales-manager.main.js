//clientInfoMain
var salesManagerMain = {
		// 保存查询条件
		// 虽然 bootstrap-table 提供了用于查询的按钮，但这里我们采用自定按钮
		queryTableParam: {},
		/**
		 * 初始化查询条件和表格
		 * @returns
		 */
		queryTable: function() {
			$("#client_info #criteriaNav").html('');
			var queryHtml = salesManagerMain.queryHTML();
			var queryColumn = salesManagerMain.queryColumns(true);
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
			    	$.extend(params,salesManagerMain.queryTableParam);
					salesManagerMain.queryTableParam = {};
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
				url:"see.sales",
				type:"get",
				data:{
				},
				success:function(data){
					console.log(data);
					for(var i=0;i<data.length;i++){
						saleManageAddTr(data,data[i].cid,data[i].pid,data[i].pName,data[i].salePrice,data[i].saleNum,data[i].username);
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
			var pName = $("#saleName").val();
			$("tr").not($("#firstTr")).remove();
			if(pName==""){
				sweetAlert.caution("温馨提示", "请输入查询的商品名");
			}

			$ajax({
				url:"queryByPname.sales",
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
						salesManagerMain.resetFun();
					}
					for(var i =0;i<json.length;i++){
						saleManageAddTr(json,json[i].cid,json[i].pid,json[i].pName,json[i].salePrice,json[i].saleNum,json[i].username);
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
			// $('#').distpicker({
			// 	province : '---- 所在省 ----',
			// 	city : '---- 所在市 ----',
			// 	district : '---- 所在区/县 ----'
			// });
		},
		/**
		 * 客户详情
		 */
		clientDetail: function(id, type) {
			salesManagerCtroller.clientInfoDetail(id, function(data){

				if (data.msg == 0) {
					sweetAlert.caution("温馨提示", "未获取到相关客户信息");
					return;
				}

				var date=data;
				salesManagerCtroller.viewPro(function (da) {
					salesManagerCtroller.viewUsername(function (data1) {
						salesManagerCtroller.viewNowuserInfo(function (data2) {
							var content = salesManagerHTML.salesManagerHTML(type,da,data1,data2);
							var modelId = "client" + type + "Model";
							var isHideBut = type == 'update' ? false : true;

							commFun.noModel(modelId, "销售详情",700,500, content, salesManagerMain.submitData, type, isHideBut);

							salesManagerMain.fillData(modelId, type, date);
						});

					});
				});

			});
		},
		
		/**
		 * 添加客户信息
		 */
		addClient: function() {
			salesManagerCtroller.viewPro(function (data) {
				salesManagerCtroller.viewUsername(function (data1) {
					salesManagerCtroller.viewNowuserInfo(function (data2) {
						var content = salesManagerHTML.salesManagerHTML('add',data,data1,data2);
						commFun.noModel("clientaddModel", "添加销售信息",700,500, content, salesManagerMain.submitData, "add" , false);
					});
				});
			});

		},
		
		/**
		 * 修改销售信息
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
			salesManagerMain.clientDetail(id, 'update');
		},
		
		/**
		 * 填充数据
		 */
		fillData: function(modelId, type, data) {

			var json1 = JSON.parse(data);
			var cid = json1[0].cid;
			var pName = json1[0].pName;
			var salePrice = json1[0].salePrice;
			var saleNum = json1[0].saleNum;
			var username = json1[0].username;
			var sate = json1[0].sate;


			//var client = data.clientInfo;
			//$("#" + modelId + " #clientId").val(client.id);
			$("#" + modelId + " #status").val(cid);
			$("#" + modelId + " #pName").val(pName);
			$("#" + modelId + " #salePrice").val(salePrice);
			$("#" + modelId + " #saleNum").val(saleNum);
			$("#" + modelId + " #username").val(username);
			$("#" + modelId + " #sate").val(sate);
		},
		
		/**
		 * 提交数据
		 */
		submitData: function(type) {
			var modelId = "client" + type + "Model";

			var ids = $("#" + modelId + " #status").val();
			var pName = $("#" + modelId + " #pName").val();
			var salePrice = $("#" + modelId + " #salePrice").val();
			var saleNum = $("#" + modelId + " #saleNum").val();
			var username = $("#" + modelId + " #username").val();
			var sate = $("#" + modelId + " #sate").val();

			var split = pName.split("：");
			var strings = split[1].split("）");
			var id = strings[0];

			// var ProMaxNum;
			// var u;
			// salesManagerCtroller.viewProNumByid(id,function (data6) {
			// 	var parse = JSON.parse(data6);
			// 	ProMaxNum = (parse[0].pNum);
			// 	console.log("数量"+ProMaxNum);
			//
			// 	console.log("ProMaxNum"+ProMaxNum);
			// 	console.log("saleNum"+saleNum);
			// 	 u= parseInt(saleNum);
			// 	if (ProMaxNum < u ) {
			// 		sweetAlert.caution("温馨提示", "销售的商品数量不允许大于库存量！");
			// 		return false;
			// 	}
			//
			// });

			var purchaseData;
			var jsonpurchaseData;
			//选中的那个商品的pid：
			var pid = $("#pName").find("option[value = '"+pName+"']").attr("id");

			purchaseData = {cid:null,pid:""+pid+"",pName:""+pName+"",salePrice:""+salePrice+"",saleNum:""+saleNum+"",username:""+username+"",sate:""+sate+""};
			jsonpurchaseData = JSON.stringify(purchaseData);

			if (pName == '') {
				sweetAlert.caution("温馨提示", "商品名称不允许为空！");
				return false;
			}
			if (salePrice == '') {
				sweetAlert.caution("温馨提示", "商品价格不允许为空！");
				return false;
			}
			if(!(/[0-9]\d*/).test(salePrice)){
				sweetAlert.caution("温馨提示", "输入的商品价格格式不对！");
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

			if (username == '') {
				sweetAlert.caution("温馨提示", "销售员不允许为空！");
				return false;
			}

			var res = false;
			if (type == 'add') {// 添加
				salesManagerCtroller.viewProNumByid(id,function (data6) {
					var falg = true;
					var parse = JSON.parse(data6);
					var ProMaxNum = BigInt(parse[0].pNum);
					var sal = BigInt(saleNum);
					if (ProMaxNum < sal ) {
						sweetAlert.caution("温馨提示", "销售的商品数量不允许大于库存量！");
						falg = false;
					}else{
						falg = true;
					}
					salesManagerCtroller.clientInfoAdd(jsonpurchaseData, function (data) {
						if(falg == true){
							if (data == '') {
								sweetAlert.caution("温馨提示", "添加失败", "关闭", 3000);
							} else {
								sweetAlert.success("温馨提示", "添加成功", "关闭", 3000);

								salesManagerMain.queryTableParam = {};
								$("#client_info #client_info_table").bootstrapTable("refresh");
								res = true;

								var json = JSON.parse(data);
								saleManageAddTr(json, json[0].cid, json[0].pid, json[0].pName, json[0].salePrice, json[0].saleNum, json[0].username, json[0].sate);
							}
							$('button:contains("关闭")').click(function () {
								window.location.reload();
							})
						}
					});
				});
			} else {// 修改

				var cid = ids;
				productData = {cid:""+cid+"",pid:""+pid+"",pName:""+pName+"",salePrice:""+salePrice+"",saleNum:""+saleNum+"",username:""+username+"",sate:""+sate+""};
				jsonproductData = JSON.stringify(productData);

				salesManagerCtroller.clientInfoUpdate(jsonproductData, function(data) {
					var json = JSON.parse(data);
					if (data == '') {
						salesManagerMain.queryTableParam = {};
						$("#client_info #client_info_table").bootstrapTable("refresh");
						res = true;
					} else {
						sweetAlert.success("温馨提示","修改成功","关闭",3000);
						salesManagerMain.queryTableParam = {};
						$("#client_info #client_info_table").bootstrapTable("refresh");
						res = true;

						//$("#call_manager_table #proTr"+json.pid + " td:eq(2) a").text(json.pName);
						$("#call_manager_table #proTr"+json.cid + " td:eq(2) a").text(json.pName);
						$("#call_manager_table #proTr"+json.cid + " td:eq(3) ").text(json.salePrice);
						$("#call_manager_table #proTr"+json.cid + " td:eq(4) ").text(json.saleNum);
						$("#call_manager_table #proTr"+json.cid + " td:eq(5) ").text(json.username);
						$("#call_manager_table #proTr"+json.cid + " td:eq(6) ").text(json.sate);
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

				salesManagerCtroller.clientInfoBatchDel(ids, function(data){
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
				salesManagerCtroller.clientInfoDel(id, function(data){
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
							salesManagerCtroller.clientShareApplay(clientId, userId, function(data) {
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

				salesManagerMain.fillLinkmanData(modelId,  data);
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
			//salesManagerMain.queryTable();
			salesManagerMain.initFun();
		}
}

/**
 * bootstrap-table event 事件
 */
window.clientEvent = {
	"click .like":function(e,value,row,index){
		salesManagerMain.clientDetail(row.id, 'detail');
	}
}
window.userEvent = {
	"click .like":function(e,value,row,index){
		sweetAlert.caution("温馨提示：", "此处暂不支持查看用户详情！", "确定", 3000);
	}
}

//这里是对页面的调整布局
$(document).ready(function(){
	salesManagerMain.queryInit();
});