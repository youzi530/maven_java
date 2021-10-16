//commodityInfoMain
var emarketActivitiesMain = {
		// 保存查询条件
		// 虽然 bootstrap-table 提供了用于查询的按钮，但这里我们采用自定按钮
		queryTableParam: {},
		/**
		 * 初始化查询条件和表格
		 * @returns
		 */
		queryTable: function() {
			$("#client_info #criteriaNav").html('');
			var queryHtml = emarketActivitiesHTML.queryHTML();
			var queryColumn = emarketActivitiesHTML.queryColumns(true);
			$("#client_info #criteriaNav").append(queryHtml);

			$("#client_info #client_info_table").bootstrapTable({
			    method: 'get',
			    url: "query.product",
			    cache: false,
			    striped: false,
			    pagination: true,
			    pageSize: 10,
			    sidePagination:"server",
			    pageList: [10, 25, 50, 100, 200],
			    search: false,
			    queryParams: function(params){
			    	$.extend(params,emarketActivitiesMain.queryTableParam);
					emarketActivitiesMain.queryTableParam = {};
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

            $("tr").not($("#firstTr")).remove();

            $ajax({
                url:"see.product",
                type:"get",
                data:{
                },
                success:function(data){
                    //console.log(data)
                    for(var i=0;i<data.length;i++){
                        productAddTr(data,data[i].pid,data[i].pName,data[i].sName,data[i].pType,data[i].pPrice,data[i].pNum,data[i].pDescription);
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
            var pName = $("#commodityName").val();
            $("tr").not($("#firstTr")).remove();
            if(pName==""){
                sweetAlert.caution("温馨提示", "请输入查询的商品名");
            }
            $ajax({
                url:"queryByPname.product",
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
						emarketActivitiesMain.resetFun();
                    }
                    for(var i =0;i<json.length;i++){
                        productAddTr(json,json[i].pid,json[i].pName,json[i].sName,json[i].pType,json[i].pPrice,json[i].pNum,json[i].pDescription);
                    }
                },
                error:function(error){
                    alert(error);
                }
            });

            // sName = $("#workAddress_").val(),
            // pType = $("#mainPhone_").val(),
            // province = $("#distpicker_ #loc_province :selected").val(),
            // city = $("#distpicker_ #loc_city :selected").val(),
            // town = $("#distpicker_ #loc_town :selected").val();
			// if (province != '') {
			// 	if (city == '') {
			// 		sweetAlert.caution("温馨提示", "请选择所在城市！");
			// 		return;
			// 	}
			// 	if (town == '') {
			// 		sweetAlert.caution("温馨提示", "请选择所在区/县！");
			// 		return;
			// 	}
			// }
			// emarketActivitiesMain.queryTableParam = {
			// 		//"pName": pName,
            //         "pName": pName
			// 		// "sName": sName,
			// 		// "pType": pType,
			// 		// "town": town
			// };
			// $("#client_info #client_info_table").bootstrapTable("refresh");
			// return emarketActivitiesMain.queryTableParam;
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
		 * 商品详情
		 */
		clientDetail: function(id, type) {
			//console.log(id);
			emarketActivitiesCtroller.clientInfoDetail(id, function(data){          //判断是否存在，返回通过主键获得的数据
				if (data.msg == 0) {
					sweetAlert.caution("温馨提示", "未获取到相关商品信息");
					return;
				}
				var date=data;
				emarketActivitiesCtroller.viewPro(function (da) {
					var json1 = JSON.parse(da);
					var pids = json1[0].pid;
					console.log(pids);
					console.log("从servlet传过来的"+da);
					console.log("从servlet传过来的"+json1);

					var content = emarketActivitiesHTML.emarketActivitiesHTML(type,da);
					var modelId = "client" + type + "Model";
					var isHideBut = type == 'update' ? false : true;
					commFun.noModel(modelId, "商品详情",700,500, content, emarketActivitiesMain.submitData,type, isHideBut);
					emarketActivitiesMain.fillData(modelId, type, date);
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
					$('#clientupdateModel #distpicker').distpicker({
						province : '---- 所在省 ----',
						city : '---- 所在市 ----',
						district : '---- 所在区/县 ----'
					});

				});

			});
		},

		/**
		 * 添加商品信息
		 */
			addClient: function() {
			emarketActivitiesCtroller.viewPro(function (data) {
				//console.log(data);
				var content = emarketActivitiesHTML.emarketActivitiesHTML('add',data);
				commFun.noModel("clientaddModel", "添加商品信息",700,500, content, emarketActivitiesMain.submitData, "add" , false);


				// 初始化时间组件
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
					province : '---- 所在省 ----',
					city : '---- 所在市 ----',
					district : '---- 所在区/县 ----'
				});
			});
		},

		/**
		 * 修改商品信息
		 */
		updClient: function(id) {
			console.log(id);
			//console.log(dataJson);

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
			emarketActivitiesMain.clientDetail(id,'update');
		},


	/**
		 * 填充数据
		 */
		fillData: function(modelId, type, data) {

			// var client = data.clientInfo;
			// console.log(client);
			// var pid = data[0].pid;

			var json1 = JSON.parse(data);
			var pid = json1[0].pid;
			var pName = json1[0].pName;
			var sName = json1[0].sName;
			var pType = json1[0].pType;
			var pPrice = json1[0].pPrice;
			var pNum = json1[0].pNum;
			var pDescription = json1[0].pDescription;

			//$("#" + modelId + " #productId").val(pid);
			$("#" + modelId + " #status").val(pid);
			$("#" + modelId + " #pName").val(pName);
			//var dat = $("#" + modelId + " #pName").val();
			$("#" + modelId + " #sName").val(sName);
			$("#" + modelId + " #pType").val(pType);
			$("#" + modelId + " #pPrice").val(pPrice);
			$("#" + modelId + " #pNum").val(pNum);
			// $("#" + modelId + " #industry").val(client.industry);
			// $("#" + modelId + " #rank").find("option[value='"+client.rank+"']").attr("selected", true);
			// $("#" + modelId + " #creditGrade").find("option[value='"+client.creditGrade+"']").attr("selected", true);
			// $("#" + modelId + " #creditLimit").find("option[value='"+client.creditLimit+"']").attr("selected", true);
			// $("#" + modelId + " #superCompany").val(client.superCompany);
			// $("#" + modelId + " #financePhone").val(client.financePhone);
			// $("#" + modelId + " #companyHome").val(client.companyHome);
			// $("#" + modelId + " #principal").val(client.principal);
			// $("#" + modelId + " #responDepart").val(client.responDepart);
			$("#" + modelId + " #pDescription").val(pDescription);

			// if (type == 'detail') {
			// 	var date = new Date(client.register);
			// 	var dformat = [ date.getFullYear(), date.getMonth() + 1, date.getDate() ].join('-');
			// 	$("#" + modelId + " #register").val(dformat);
			// } else {
			// 	// 时间
			// 	if (client.register != null)
			// 		$("#" + modelId + " #registerTime").datetimepicker("setDate", new Date(client.register));
			// }

			// 省市县
			// $('#'+modelId+' #distpicker').distpicker({
			// 	province : client.province,
			// 	city : client.city,
			// 	district : client.town
			// });
			// 联系人
			// var linkmans = '';
			// var linkmanNames = client.linkmanNames;
			// var linkmanIds = client.linkmanIds;
			// for (var i = 0; i < linkmanNames.length; i++) {
			// 	linkmans += '<button type="button" class="btn btn-info btn-sm" onclick="emarketActivitiesMain.linkmanDetail(\''+linkmanIds[i]+'\')" style="margin-right: 0.5em;">'+linkmanNames[i]+'</button>';
			// }
			// $("#" + modelId + " #linkman").html(linkmans);


			// if (type == 'detail') {
			// 	$("#" + modelId + " input[type='text']").attr("disabled", true);
			// 	$("#" + modelId + " select").attr("disabled", true);
			// 	$("#" + modelId + " textarea").attr("disabled", true);
			// }
		},

		/**
		 * 提交数据
		 */
		submitData: function(type) {
			var modelId = "client" + type + "Model";
			//临时存起来，将pid存在status里面
			var pids = $("#" + modelId + " #status").val();
			var pName = $("#" + modelId + " #pName").val();
			var sName = $("#" + modelId + " #sName").val();
			var pType = $("#" + modelId + " #pType").val();
			var pPrice = $("#" + modelId + " #pPrice").val();
			var pNum = $("#" + modelId + " #pNum").val();
			var pDescription = $("#" + modelId + " #pDescription").val();

			var productData;
			var jsonproductData;

			productData = {pid:null,pName:""+pName+"",sName:""+sName+"",pType:""+pType+"",pPrice:""+pPrice+"",pNum:""+pNum+"",pDescription:""+pDescription+""};
			jsonproductData = JSON.stringify(productData);

			if (pName == '') {
				sweetAlert.caution("温馨提示", "商品名称不允许为空！");
				return false;
			}
			if (sName == '') {
				sweetAlert.caution("温馨提示", "供应商名称不允许为空！");
				return false;
			}
			if (pType == '') {
				sweetAlert.caution("温馨提示", "商品类别不允许为空！");
				return false;
			}
			if (pPrice == '') {
				sweetAlert.caution("温馨提示", "商品价格不允许为空！");
				return false;
			}
			if (pNum == '') {
				sweetAlert.caution("温馨提示", "商品数量不允许为空！");
				return false;
			}

			var res = false;

			if (type == 'add') {// 添加
				// emarketActivitiesCtroller.clientInfoAdd(pName, sName, pType, pPrice, pNum,
				// 		 pDescription, function(data){
				emarketActivitiesCtroller.clientInfoAdd(jsonproductData, function(data){
					if (data == '') {
						sweetAlert.success("温馨提示","添加失败","关闭",3000);

					} else {
						sweetAlert.success("温馨提示","添加成功","关闭",3000);
						emarketActivitiesMain.queryTableParam = {};
                        $("#client_info #client_info_table").bootstrapTable("refresh");
                        res = true;
						//sweetAlert.caution("温馨提示", data);
						emarketActivitiesMain.queryTableParam = {};
						$("#client_info #client_info_table").bootstrapTable("refresh");
						res = true;
						console.log("传回来的，带pid"+data);
						console.log(data.pid);
						var json = JSON.parse(data);
						//console.log(json[0].pDescription);
						productAddTr(json,json[0].pid,json[0].pName,json[0].sName,json[0].pType,json[0].pNum,json[0].pPrice,json[0].pDescription);


					}
				});
			} else {// 修改：下面函数推测是修改后的数据，然后存进数据库中！！！
				var id = pids;
				productData = {pid:""+id+"",pName:""+pName+"",sName:""+sName+"",pType:""+pType+"",pPrice:""+pPrice+"",pNum:""+pNum+"",pDescription:""+pDescription+""};
				jsonproductData = JSON.stringify(productData);

				emarketActivitiesCtroller.clientInfoUpdate(jsonproductData, function(data) {
					if (data == '') {
                        sweetAlert.caution("温馨提示","修改失败","关闭",3000);
						emarketActivitiesMain.queryTableParam = {};
						$("#client_info #client_info_table").bootstrapTable("refresh");
						res = true;
					} else {
                        sweetAlert.success("温馨提示","修改成功","关闭",3000);
						emarketActivitiesMain.queryTableParam = {};
                        $("#client_info #client_info_table").bootstrapTable("refresh");
                        res = true;

                        var json = JSON.parse(data);
                        //$("#call_manager_table #proTr"+json.pid + " td:eq(2) a").text(json.pName);
                        $("#call_manager_table #proTr"+json.pid + " td:eq(2) a").text(json.pName);
                        $("#call_manager_table #proTr"+json.pid + " td:eq(3) ").text(json.sName);
                        $("#call_manager_table #proTr"+json.pid + " td:eq(4) ").text(json.pType);
                        $("#call_manager_table #proTr"+json.pid + " td:eq(5) ").text(json.pPrice);
                        $("#call_manager_table #proTr"+json.pid + " td:eq(6) ").text(json.pNum);
                        $("#call_manager_table #proTr"+json.pid + " td:eq(7) ").text(json.pDescription);
					}
				});
			}

			return res;
		},

		/**
		 * 批量删除
		 */
		delBatchClient: function() {

			//var selectedData = $("#call_manager_table").bootstrapTable('getSelections');
			// var data = $("#call_manager_table").bootstrapTable("getData");
			// alert(data);
			// if (selectedData.length < 1) {
			// 	sweetAlert.caution("温馨提示：", "请选择要删除的数据！", "确定", 3000);
			// 	return;
			// }

            var ids = new Array();
            $('input:checkbox[name=btSelectItem]:checked').each(function(){
                ids.push($(this).attr('id'));//向数组中添加元素
            });
            //console.log(ids);

            if (ids.length <=0) {
            	sweetAlert.caution("温馨提示：", "请选择要删除的数据！", "确定", 3000);
                return;
            }
            sweetAlert.warning("确定删除吗？", "", "确定", "取消", null, 5000, function(){
				// var ids = new Array();
				// $.each(selectedData, function(k, v) {
				// 	ids.push(v.id);
				// });
				emarketActivitiesCtroller.clientInfoBatchDel(ids, function(data){
				    //alert(ids);
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

		delClient: function(mid) {
			sweetAlert.warning("确定删除吗？", "", "确定", "取消", null, 5000, function(){
				emarketActivitiesCtroller.clientInfoDel(mid, function(data){
					console.log(mid);
					if (data != '') {
						sweetAlert.caution("温馨提示",data,"关闭",3000);
					} else {
						sweetAlert.success("温馨提示","删除成功","关闭",3000,mid);
						$("#client_info #client_info_table #call_manager_table").bootstrapTable("refresh");
						var tr = document.getElementById("proTr" +mid+"");
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
							emarketActivitiesCtroller.clientShareApplay(clientId, userId, function(data) {
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

				emarketActivitiesMain.fillLinkmanData(modelId,  data);
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
			$("#" + modelId + " #pNum").val(linkma.pNum);
			$("#" + modelId + " #residencePhone").val(linkma.residencePhone);
			$("#" + modelId + " #passValue").val(linkma.passValue);
			$("#" + modelId + " #birthday").val(linkma.birthday);
			$("#" + modelId + " #prinDepart").val(linkma.prinDepart);
			$("#" + modelId + " #hobby").val(linkma.hobby);
			$("#" + modelId + " #pDescription").val(linkma.pDescription);
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
			//emarketActivitiesMain.queryTable();
			emarketActivitiesMain.initFun();
		}
}

/**
 * bootstrap-table event 事件
 */
window.clientEvent = {
	"click .like":function(e,value,row,index){
		emarketActivitiesMain.clientDetail(row.id, 'detail');
	}
}
window.userEvent = {
	"click .like":function(e,value,row,index){
		sweetAlert.caution("温馨提示：", "此处暂不支持查看用户详情！", "确定", 3000);
	}
}

$(document).ready(function(){
	emarketActivitiesMain.queryInit();
});