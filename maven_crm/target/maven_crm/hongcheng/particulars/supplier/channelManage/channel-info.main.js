var channelInfoMain = {
		// 保存查询条件
		// 虽然 bootstrap-table 提供了用于查询的按钮，但这里我们采用自定按钮
		queryTableParam: {},
		/**
		 * 初始化查询条件和表格
		 * @returns
		 */
		queryTable: function() {
			$("#client_info #criteriaNav").html('');
			var queryHtml = channelInfoHTML.queryHTML();
			var queryColumn = channelInfoHTML.queryColumns(true);
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
			    	$.extend(params,channelInfoMain.queryTableParam);
					channelInfoMain.queryTableParam = {};
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
			channelInfoMain.queryTableParam = {
					"clientName": clientName, 
					"workAddress": workAddress, 
					"mainPhone": mainPhone,
					"town": town
			};
			$("#client_info #client_info_table").bootstrapTable("refresh");
			return channelInfoMain.queryTableParam;
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
			$('#distpicker_').distpicker({
				province : '---- 所在省 ----',
				city : '---- 所在市 ----',
				district : '---- 所在区/县 ----'
			});
		},
		/**
		 * 客户详情
		 */
		clientDetail: function(id, type) {
			var sName=$("#"+id+"gys").text();
			// 修改返回所有的数据
			channelInfoCtroller.clientInfoDetail(sName, function(data){
				var date=data;
				channelInfoCtroller.yuanxinxi(function(data){
					console.log(data);
					var content = channelInfoHTML.clientInfoHTML(id,type,data);
					var modelId = "client" + type + "Model";
					var isHideBut = type == 'update' ? false : true;
					commFun.noModel(modelId, "客户详情",700,500, content, channelInfoMain.submitData, type, isHideBut);
					// channelInfoMain.fillData(type);
					channelInfoMain.fillData2( type, date);
					if (type != 'detail') {
						// 初始化时间组件
						var $registerTime = $('#' + modelId + ' #registerTime');
						$registerTime.datetimepicker({
							language:  'zh-CN',
							format: "yyyy年mm月dd日",// 日期格式
							minView: "month",// 精确视图，这样只有年月日，没有时分秒
							autoclose: true,// 是否自动关闭
							todayBtn: true,// 是否显示选择今天日期的按钮
							forceParse: 0
						});
					}

					// 省市级联
					$('#clientaddModel #distpicker').distpicker({
						province : '---- 员工信息 ----',
						city : '---- 所在市 ----',
						district : '---- 所在区/县 ----'
					});
				})


			});
		},
		
		/**
		 * 添加客户信息
		 */
		addClient: function() {
			var content = channelInfoHTML.clientInfoHTML2('add');
			commFun.noModel("clientaddModel", "添加渠道信息",700,500, content, channelInfoMain.submitData2, "add" , false);
			// 初始化时间组件

			channelInfoMain.fillData('add');
			$('#clientaddModel #registerTime').datetimepicker({
				language:  'zh-CN',
				format: "yyyy年mm月dd日",// 日期格式 
				minView: "month",// 精确视图，这样只有年月日，没有时分秒
		        autoclose: true,// 是否自动关闭
		        todayBtn: true,// 是否显示选择今天日期的按钮
		        forceParse: 0
			});
			
			// 省市级联
			$('#clientaddModel #distpicker').distpicker({
				province : '---- 员工信息 ----',
				city : '---- 所在市 ----',
				district : '---- 所在区/县 ----'
			});
		},
		
		/**
		 * 修改客户信息
		 */
		updClient: function(id) {
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
			channelInfoMain.clientDetail(id, 'update');
		},
		
		/**
		 * 填充数据
		 */
		fillData: function(type) {
            $("#dagongzai").change(function(event) {//change为选项改变时事件，不要用click那些没用
                var da=$(this).find('option:selected').text();
                console.log(da);
            })
			var modelId= "client" + type + "Model";
			$ajax({
				url:"tianjia.channel",
				type:"get",
				data:{
				},
				success:function(data){
					var date=data.substring(3,data.length);
					var json=JSON.parse(date);
					$("#dagongzai").append("<option value='gouzei' selected >请选择</option>");
					for(var i=0;i<json.length;i++){
						$("#dagongzai").append("<option value='"+json[i].realName+"'>"+json[i].realName+"  工号"+json[i].userId+"</option>");
					}
				},
				error:function(error){
					alert(error);
				}
			});
			},
	//修改的时候将原来有的数据添加进去
	fillData2: function(type,data) {
		// 	console.log(data);
		// var json=JSON.parse(data);
		var modelId = "client" + type + "Model";
		$("#"+modelId+" input:eq(0)").val(""+data[0].sName+"");
		$("#way").val(""+data[0].way+"");
		// $("#qudaoName").val(""+json[0].sName+"");
		console.log($("#dagongzai option").text());
		// console.log($("#dagongzai option[value='']).val());
		// $("#dagongzai").find("option[value='"+data[0].username+"']").attr("selected", true);
		// var sj=$("#dagongzai option[value='凌巧']").text();
		$("#dagongzai").find("option[value = '"+data[0].username+"']").attr("selected","selected");
	},

		/**	// $("#dagongzai").each(function () {
		// 	var value=$(this).val();
		// 	if(value==data[0].username){
		// 		$(this).attr("option","selected");
		// 	}
		// })
		 * 提交数据
		 */
		submitData: function(type) {
			var modelId = "client" + type + "Model";
			var id=$("#"+modelId+" input:eq(0)").attr("id");
			var id2=id.substring(0,1);
			console.log(id);
			var  qudaoName= $("#" + modelId + " #"+id+"").val();
			var way = $("#" + modelId + " #way").val();
			var dagongzai = $("#" + modelId + " #dagongzai").find('option:selected').text();
			if (qudaoName == '') {
				sweetAlert.caution("温馨提示", "供应商名称不允许为空！");
				return false;
			}
			if (way == '') {
				sweetAlert.caution("温馨提示", "渠道方式不允许为空！");
				return false;
			}
			if (dagongzai == '') {
				sweetAlert.caution("温馨提示", "联系员工不允许为空！");
				return false;
			}
			if (dagongzai == '请选择') {
				sweetAlert.caution("温馨提示", "请选择联系员工！");
				return false;
			}

			var res = false;
			var supplier= {sName:""+qudaoName+"",way:""+way+"",username:""+dagongzai+""};
			var jsonsha = JSON.stringify(supplier);
			// console.log(jsonqd);
			channelInfoCtroller.clientInfoUpdate(jsonsha, function(data){
				var josn4=JSON.parse(data);
				// console.log(json4);
				// console.log(data);
				if (data != '') {
					channelInfoMain.queryTableParam = {};
					// sweetAlert.caution("这是之前的信息，可以进行修改");
					$("#client_info #client_info_table").bootstrapTable("refresh");
					res = true;
					$("#"+id2+"gys").text(josn4[0].sName);
					$("#"+id2+"way").text(josn4[0].way);
					$("#"+id2+"username").text(josn4[0].username);
					// $("#"+json4[0].sid+"dhhm").text(json4[0].phone);
					// $("#"+json4[0].sid+"yyzz").text(json4[0].license);

				} else {
					sweetAlert.caution("wusuowei");
				}
			});


			return res;
		},
	datatablesDestroy:function(){
		$('#quote_table').dataTable().fnDestroy();
	},

	datatablesCreate:function(){
		jQuery(function($) {
			var oTable1 = $('#quote_table').dataTable( {
				// "aaSorting": [[ 1, "desc" ]],//默认第几个排序
				"ordering":false,
				"bStateSave": true,//状态保存
				searching : false,//去掉搜索框
				bAutoWidth: false,//是否自动宽度
				"aoColumnDefs": [
					//{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
					{"orderable":false,"aTargets":[0,1,2,3,4]}// 制定列不参与排序
				] } );

		});
	},
	submitData2: function(type) {
		var modelId = "client" + type + "Model";
		var  qudaoName= $("#" + modelId + " #qudaoName").val();
		var way = $("#" + modelId + " #way").val();
		var dagongzai = $("#" + modelId + " #dagongzai").find('option:selected').text();

        // var dagongzai = $("#" + modelId + " #dagongzai").innerHTML;

        console.log(dagongzai);
		if (qudaoName == '') {
			sweetAlert.caution("温馨提示", "供应商名称不允许为空！");
			return false;
		}
		if (way == '') {
			sweetAlert.caution("温馨提示", "渠道方式不允许为空！");
			return false;
		}
		if (dagongzai == '') {
			sweetAlert.caution("温馨提示", "联系员工不允许为空！");
			return false;
		}
		if (dagongzai == '请选择') {
			sweetAlert.caution("温馨提示", "请选择联系员工！");
			return false;
		}

		var res = false;
		var supplier= {sName:""+qudaoName+"",way:""+way+"",username:""+dagongzai+""};
		var jsonqd = JSON.stringify(supplier);
		if (type == 'add') {// 添加
			channelInfoCtroller.clientInfoAdd(jsonqd, function(data){
				console.log(data);
				if (data == '[]') {
					sweetAlert.caution("温馨提示添加失败");

				} else {
					channelInfoMain.queryTableParam = {};
					sweetAlert.caution("温馨提示添加c'g");
					$("#client_info #client_info_table").bootstrapTable("refresh");
					res = true;
					var id=$("#thefirst").find("tr").last().attr('id')*1;
					console.log(id);
					channelInfoMain.datatablesDestroy();

					var json4 = JSON.parse(data);
					// console.log(json4[0]);
					addTr2(id,json4[0].sName,json4[0].way,json4[0].username);
					channelInfoMain.datatablesCreate();

				}
			});
		} else {// 修改
			channelInfoCtroller.clientInfoUpdate(jsonqd, function(data) {
				if (data == '[]') {
					sweetAlert.caution("温馨提示shiba", data);
				} else {
					channelInfoMain.queryTableParam = {};
					sweetAlert.caution("修改成功");
					$("#client_info #client_info_table").bootstrapTable("refresh");
					res = true;
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

			sweetAlert.warning("确定删除吗？", "", "确定", "取消", null, 5000, function(){
				//写两个数组，一个弄成对象

				var	ids2 = new Array();
				$('input:checkbox[name=btSelectItem]:checked').each(function(){
					ids2.push($(this).attr('id'));//向数组中添加元素
				});
				var ids = new Array();
				$('input:checkbox[name=btSelectItem]:checked').each(function(){
					ids.push($("#"+$(this).attr('id')+"gys").text());//向数组中添加元素
				});
				console.log(ids);
				channelInfoCtroller.clientInfoBatchDel(ids, function(data){
					if (data == '') {
						sweetAlert.caution("温馨提示",data,"关闭",3000);
					} else {
						sweetAlert.success("温馨提示","删除成功","关闭",3000);
						$("#client_info #client_info_table").bootstrapTable("refresh");
						channelInfoMain.datatablesDestroy();
						for(var i=0;i<ids2.length;i++){
							var tr=document.getElementById(""+ids2[i]+"");
							tr.remove();
						}
						channelInfoMain.datatablesCreate();
					}
				});
			}, "", "", null, null, false);
		},
		
		/**
		 * 单个删除
		 */
		delClient: function(id,sName) {
			sweetAlert.warning("确定删除吗？", "", "确定", "取消", null, 5000, function(){
				channelInfoCtroller.clientInfoDel(sName, function(data){
					console.log(data);
					if (data == '') {
						sweetAlert.caution("温馨提示",data,"关闭",3000);
					} else {
						console.log(data);
						sweetAlert.success("温馨提示","删除成功","关闭",3000);
						$("#client_info #client_info_table").bootstrapTable("refresh");
						channelInfoMain.datatablesDestroy();
						var tr = document.getElementById(""+id+"");
						tr.remove();
						channelInfoMain.datatablesCreate();
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
							channelInfoCtroller.clientShareApplay(clientId, userId, function(data) {
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

				channelInfoMain.fillLinkmanData(modelId,  data);
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
			channelInfoMain.initFun();
		}
}

/**
 * bootstrap-table event 事件
 */
window.clientEvent = {
	"click .like":function(e,value,row,index){
		channelInfoMain.clientDetail(row.id, 'detail');
	}
}
window.userEvent = {
	"click .like":function(e,value,row,index){
		sweetAlert.caution("温馨提示：", "此处暂不支持查看用户详情！", "确定", 3000);
	}
}

$(document).ready(function(){
	channelInfoMain.queryInit();
});