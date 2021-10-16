var clientInfoMain = {

	clientAll : {
		CLIENTNAME :"",
		BEFORE:"",
		AFTER:""
	},

	datatablesDestroy:function(){
		$('#client_info_table').dataTable().fnDestroy();
	},

	datatablesCreate:function(){
		jQuery(function($) {
			var oTable1 = $('#client_info_table').dataTable( {
				// "aaSorting": [[ 1, "desc" ]],//默认第几个排序
				"ordering":false,
				"bStateSave": true,//状态保存
				searching : false,//去掉搜索框
				bAutoWidth: false,//是否自动宽度
				"aoColumnDefs": [
					//{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
					{"orderable":false,"aTargets":[0,1,2,3,4,5,6,7,8,9]}// 制定列不参与排序
				] } );

		});
	},

		// 保存查询条件
		// 虽然 bootstrap-table 提供了用于查询的按钮，但这里我们采用自定按钮
		queryTableParam: {},
		/**
		 * 初始化查询条件和表格
		 * @returns
		 */
		queryTable: function() {
			$("#client_info #criteriaNav").html('');
			var queryHtml = clientInfoHTML.queryHTML();
			var queryColumn = clientInfoHTML.queryColumns(true);
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
			    	$.extend(params,clientInfoMain.queryTableParam);
			    	clientInfoMain.queryTableParam = {};
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
			clietInfo.query();
		},
		/**
		 * 查询
		 */
		queryFun: function() {
		    var userId = $("#userId").val();
			var clientName = $("#clientName_").val(),
				workAddress = $("#workAddress_").val(),
				province = $("#distpicker_ #loc_province :selected").val(),
				city = $("#distpicker_ #loc_city :selected").val(),
				town = $("#distpicker_ #loc_town :selected").val();
			if (clientName == "" && workAddress == "" && province == "" && city == "" && town == ""){
                sweetAlert.caution("温馨提示", "请输入查询条件！");
                return;
            }

			clientInfoCtroller.clientFind(userId,clientName, workAddress,province, city, town,function (data) {
                if (data != ""){
                	if (data.length == 11){
						sweetAlert.caution("温馨提示","查无此人")
					}else {
						$("#client_info_table tbody").empty()
						if (data.indexOf("crmuser") > 0){
							data = data.split("crmuser");
							var clis = JSON.parse(data[0]);
							var users = JSON.parse(data[1]);
							clientInfoMain.datatablesDestroy()
							$("#client_info_table tbody").empty()
							for (var i = 0; i < clis.length; i++) {
								clietInfo.addTr(clis[i],users[i])
							}
                	clientInfoMain.datatablesCreate()
						}else {
							clientInfoMain.datatablesDestroy()
							$("#client_info_table tbody").empty()
							data = JSON.parse(data);
							for (var i = 0; i < data.length; i++) {
								clietInfo.addTr(data[i])
							}
							clientInfoMain.datatablesCreate()
						}
					}
                }
            })
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
			clientInfoCtroller.clientInfoDetail(id, function(data){          //判断是否存在，返回通过主键获得的数据
				var len = JSON.stringify(data)
				if (len.length == 2) {
					sweetAlert.caution("温馨提示", "未获取到相关客户信息");
					return;
				}

				var content = clientInfoHTML.clientInfoHTML(type);
				var modelId = "client" + type + "Model";
				var isHideBut = type == 'update' ? false : true;
				commFun.noModel(modelId, "客户详情",700,500, content, clientInfoMain.submitData, type, isHideBut);
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

				clientInfoMain.fillData(modelId, type, data);

			});

		},
		
		/**
		 * 添加客户信息
		 */
		addClient: function() {
			var content = clientInfoHTML.clientInfoHTML('add');
			commFun.noModel("clientaddModel", "添加客户信息",700,500, content, clientInfoMain.submitData, "add" , false);
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
		},
		
		/**
		 * 修改客户信息
		 */
		updClient: function(id) {
			clientInfoMain.clientAll.CLIENTNAME = $("#client_info_table #clientTr"+id +" td:eq(1) a").text()
			var index = clientInfoMain.clientAll.CLIENTNAME.indexOf('(')
			clientInfoMain.clientAll.BEFORE = clientInfoMain.clientAll.CLIENTNAME.substr(0,index);
			clientInfoMain.clientAll.AFTER = clientInfoMain.clientAll.CLIENTNAME.substr(index,clientInfoMain.clientAll.CLIENTNAME.length);
			clientInfoMain.clientDetail(id, 'update');
		},
		
		/**
		 * 填充数据
		 */
		fillData: function(modelId, type, data) {
			var client = data;
			$("#" + modelId + " #clientId").val(client.clientId);
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
            $("#" + modelId + " #cliStatus").find("option[value='"+client.status+"']").attr("selected", true);
			var preLocation = client.province + "," + client.city + "," + client.town + "," + "若要更新需选全所在地";
			$("#" + modelId + " #preLocation").val(preLocation);

			$("#" + modelId + " #superCompany").val(client.superCompany);
			$("#" + modelId + " #financePhone").val(client.financePhone);
			$("#" + modelId + " #companyHome").val(client.companyHome);
			// $("#" + modelId + " #principal").val(client.principal);
			// $("#" + modelId + " #responDepart").val(client.responDepart);
			$("#" + modelId + " #remark").val(client.remark);
			if (type == 'detail') {
				var date = new Date(client.register);
				var dformat = [ date.getFullYear(), date.getMonth() + 1, date.getDate() ].join('-');
				$("#" + modelId + " #register").val(dformat);
			} else {
				// 时间
				if (client.register != null){
					var year = parseInt(client.register.substring(0,4));
					var month = parseInt(client.register.substring(5,7));
					var day = parseInt(client.register.substring(8,10));
					$("#" + modelId + " #registerTime").datetimepicker("setDate", new Date(year,month-1,day,0,0,0,0));
				}
			}

            // 省市县
			$('#'+modelId+' #distpicker').distpicker({
				province : client.province,
				city : client.city,
				district : client.town
			});
			
			
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
			var clientId = $("#" + modelId + " #clientId").val();
			var clientName = $("#" + modelId + " #clientName").val();
			var workAddress = $("#" + modelId + " #workAddress").val();
			var mainPhone = $("#" + modelId + " #mainPhone").val();
			var zipCode = $("#" + modelId + " #zipCode").val();
			var email = $("#" + modelId + " #email").val();
			var province = $("#" + modelId + " #province").val();
			var city = $("#" + modelId + " #city").val();
			var town = $("#" + modelId + " #town").val();
			var industry = $("#" + modelId + " #industry").val();
			var rank = $("#" + modelId + " #rank").val();
			var creditGrade = $("#" + modelId + " #creditGrade").val();
			var creditLimit = $("#" + modelId + " #creditLimit").val();
			var superCompany = $("#" + modelId + " #superCompany").val();
			var financePhone = $("#" + modelId + " #financePhone").val();
			var companyHome = $("#" + modelId + " #companyHome").val();
			var registerTime = $("#" + modelId + " #register").val();
			var principal = $("#" + modelId + " #principal").val();
			var responDepart = $("#" + modelId + " #responDepart").val();
			var remark = $("#" + modelId + " #remark").val();
			var userId = $("#userId").val();
            var status = $("#" + modelId + " #cliStatus").val();
            if (type == 'add' || type == 'update'){
				if (clientName == '') {
					sweetAlert.caution("温馨提示", "客户名称不允许为空！");
					return false;
				}
				if (workAddress == '') {
					sweetAlert.caution("温馨提示", "工作地址不允许为空！");
					return false;
				}
				if (mainPhone == '') {
					sweetAlert.caution("温馨提示", "主要电话不允许为空！");
					return false;
				}
				if (zipCode == '') {
					sweetAlert.caution("温馨提示", "邮编不允许为空！");
					return false;
				}
				if (!verificat.mobileVer(mainPhone)) {
					sweetAlert.caution("温馨提示", "主要电话格式不正确！");
					return false;
				}
				if (zipCode.length != 6) {
					sweetAlert.caution("温馨提示", "邮编格式不正确！");
					return false;
				}
				if (email.length != 0){
					if (!verificat.emailVer(email)) {
						sweetAlert.caution("温馨提示", "电子邮箱格式不正确！");
						return false;
					}
				}
				if (financePhone.length != 0){
					if (!verificat.mobileVer(financePhone)) {
						sweetAlert.caution("温馨提示", "财务电话格式不正确！");
						return false;
					}
				}
			}
			var res = false;
			if (type == 'add') {// 添加
				clientInfoCtroller.clientInfoAdd(clientName, workAddress, mainPhone, zipCode, email, 
						province, city, town, industry,rank, creditGrade, creditLimit, superCompany,
						financePhone, companyHome, registerTime,remark, userId,function(data){
					if (data == '') {
						clientInfoMain.queryTableParam = {};
						$("#client_info #client_info_table").bootstrapTable("refresh");
						res = true;
					} else {
						var msg = data.substring(0,4);

						if (msg == "添加成功"){
							sweetAlert.success("", msg);
							var clientId = data.substring(4,data.length);
							res = true;//控制弹出框关闭
							newTr = {clientId:clientId,userId:userId,clientName:clientName,workAddress:workAddress,mainPhone:mainPhone,
								zipCode:zipCode,rank:parseInt(rank),creditGrade:parseInt(creditGrade),creditLimit:creditLimit,status:0,companyHome:companyHome}
								if ($("#identity").val() == "客户职员"){
									clientInfoMain.datatablesDestroy()
									clietInfo.addTr(newTr);
									clientInfoMain.datatablesCreate()
								}else {
									var user = {userId:$("#userId").val(),realName:$("#username").val()};
									clientInfoMain.datatablesDestroy()
									clietInfo.addTr(newTr,user)
									clientInfoMain.datatablesCreate()
								}
						}else {
							sweetAlert.caution("温馨提示", msg);
						}
					}
				});
			} else if (type == "update") {// 修改

                if (province.length == 0 || city.length == 0 || town.length == 0){//如果用户没有选择所在地，则使用原来的信息
                    var area = $("#" + modelId + " #preLocation").val().split(",");
                    province = area[0];
                    city = area[1];
                    town = area[2];
                }
				clientInfoCtroller.clientInfoUpdate(clientId, clientName, workAddress, mainPhone, zipCode, email,
						province, city, town, industry,rank, creditGrade, creditLimit, superCompany,
						financePhone, companyHome, registerTime, remark, userId,status,function(data) {
					if (data == '') {
						clientInfoMain.queryTableParam = {};
						$("#client_info #client_info_table").bootstrapTable("refresh");
						res = true;
					} else {
						sweetAlert.caution("温馨提示", data);
						res = true;//关闭弹窗
                        if (data == "更新成功"){
                            var tr ={clientName:clientName+clientInfoMain.clientAll.AFTER,workAddress:workAddress,mainPhone:mainPhone,
                            	rank:rank,creditGrade:creditGrade,creditLimit:creditLimit,status:status,
                            companyHome:companyHome};
                            //clientInfoMain.datatablesDestroy()
                            clietInfo.update(clientId,tr)
							//clientInfoMain.datatablesCreate()
                        }
					}
				});
			}else if (type == "share"){
				var ids = new Array();//要共享的客户信息
				$("input:checkbox[name='btSelectItem']:checked").each(function () {
					ids.push($(this).attr('id').substring(8))
				})
				if (ids.length == 0){
					sweetAlert.caution("温馨提示","请选择要申请共享的客户","确定",3000);
					return ;
				}
				var userId = $("#" + modelId + " #crmuserShare").val().split(",")[0];//同事Id
				if (userId == "请选择"){
					sweetAlert.caution("温馨提示","请选择要申请共享的同事","确定",3000);
					return ;
				}
				clientInfoCtroller.clientShareApplay(ids,userId,function (data) {
					if (data != ""){

						data = data.substring(0,4);
						if (data == "共享成功"){
							sweetAlert.success("",data);
							res = true;
							clietInfo.query()
						}else {
							sweetAlert.caution("温馨提示",data);
							res = false;
						}
					}else {
						sweetAlert.caution("未知错误",data)
					}
				})

			}
			
			return res;
		},
		
		/**
		 * 批量删除
		 */
		delBatchClient: function() {

			var ids = new Array();
			var userids = new Array()
			$("input:checkbox[name='btSelectItem']:checked").each(function () {
				ids.push($(this).attr('id').substring(8));
				var id = $(this).attr('id').substring(8);
				userids.push($("#client_info_table #clientTr"+id).attr('name'));
			});

			if (ids.length == 0){
				sweetAlert.caution("温馨提示", "请选择要删除的数据", "确定", 3000);
				return;
			}

			sweetAlert.warning("确定删除吗？", "", "确定", "取消", null, 5000, function(){

				clientInfoCtroller.clientInfoBatchDel(ids, userids,function(data){
					if (data != '') {

						if (data == "删除成功"){
							sweetAlert.success("",data,"关闭",3000);
						clientInfoMain.datatablesDestroy()
							for (var i = 0; i < ids.length; i++) {
								$("#client_info_table #clientTr"+ids[i]).remove()
							}
						clientInfoMain.datatablesCreate()
						}else {
							sweetAlert.caution("温馨提示",data,"关闭",3000);
						}
					}
				});
			}, "", "", null, null, false);
		},
		
		/**
		 * 单个删除
		 */
		delClient: function(id) {
			var userId= $("#client_info_table #clientTr"+id).attr('name')
			sweetAlert.warning("确定删除吗？", "", "确定", "取消", null, 5000, function(){
				clientInfoCtroller.clientInfoDel(id, userId,function(data){
					if (data != '') {

						if (data == "删除成功"){
							sweetAlert.success("",data,"关闭",3000);
							clientInfoMain.datatablesDestroy()
							$("#client_info_table #clientTr"+id).remove()
							clientInfoMain.datatablesCreate()
						}else {
							sweetAlert.caution("温馨提示",data,"关闭",3000);
						}
					}
				});
			}, "", "", null, null, false);
		},
		
		/**
		 * 客户共享
		 */
		shareApplayClient: function() {
			crmajax.ajax({
				url:"shareGetUsers.client",
				type:"post",
				data:{

				},
				success:function (data) {
					if (data != ""){
						var content = clientInfoHTML.shareClientHtml(data);
						commFun.noModel("clientshareModel","本部门同事信息",700,500,content,clientInfoMain.submitData,"share",false);
						$('#clientshareModel #crmuserShare').change(function () {//此处可以设置弹出框里控件的函数
							if ($(this).val() == "请选择"){
								return;
							}
							var user = $(this).val().split(",");
							$("#clientshareModel #crmuser_info_table tbody").empty();
							$("#clientshareModel #crmuser_info_table tbody").append('<tr id="" data-index="0">' +
								'<td style=""><a class="like" href="javascript:void(0);" title="用户名称">'+user[1]+'</a></td>' +
								'<td style="">'+user[2]+'</td>' +
								'<td style="">'+user[3]+'</td>' +
								'<td style="">'+user[4]+'</td> ' +
								'</tr>');
						})
					}else{
						sweetAlert.caution("温馨提示","没有同事可以共享")
					}
				},
				error:function (data) {
					sweetAlert.caution("未知错误",data)
				}
			})

		},

		/**
		 * 初始化
		 */
		queryInit: function(){
			//clientInfoMain.queryTable();
			clientInfoMain.initFun();
		}
}

/**
 * bootstrap-table event 事件
 */
window.clientEvent = {
	"click .like":function(e,value,row,index){
		clientInfoMain.clientDetail(row.id, 'detail');
	}
}
window.userEvent = {
	"click .like":function(e,value,row,index){
		sweetAlert.caution("温馨提示：", "此处暂不支持查看用户详情！", "确定", 3000);
	}
}

$(document).ready(function(){
	clientInfoMain.queryInit();
});