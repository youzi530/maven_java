var contactMain = {

	contactAll : {
		CLIENT_AFTER:""
	},

	datatablesDestroy:function(){
		$('#contact_record_table').dataTable().fnDestroy();
	},

	datatablesCreate:function(){
		jQuery(function($) {
			var oTable1 = $('#contact_record_table').dataTable( {
				// "aaSorting": [[ 1, "desc" ]],//默认第几个排序
				"ordering":false,
				"bStateSave": true,//状态保存
				searching : false,//去掉搜索框
				bAutoWidth: false,//是否自动宽度
				"aoColumnDefs": [
					//{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
					{"orderable":false,"aTargets":[0,1,2,3,4,5]}// 制定列不参与排序
				] } );

		});
	},
	
	/**
	 * 重置查询条件
	 */
	resetFun: function() {
		var inputs_ = $("#contact_record #criteriaNav").find("input[type='text']");
		inputs_.val("");
		contactMain.datatablesDestroy()
		$("#contact_record_table tbody").empty();
		contactRecord.query();
		contactMain.datatablesCreate()
	},
	/**
	 * 查询
	 */
	queryFun: function() {

		var beginTime = '', endTime = '';
		var contactTime = $("#contactTime_").val();
		if (contactTime == ''){
			sweetAlert.caution("温馨提示","查询不能为空");
			return;
		}
		if (contactTime != '' && contactTime.split(' ~ ').length > 0) {
			beginTime = contactTime.split(' ~ ')[0];
			endTime = contactTime.split(' ~ ')[1];
			var iden = $("#identity").val().substring(2,4);
			var flag = false;
			if (iden == "职员"){

			}else {
				flag = true;
			}
			crmajax.ajax({
				url:"find.contactRecord",
				type:"post",
				data:{
					beginTime:beginTime,
					endTime:endTime
				},
				success:function (data) {//data已经是json数据
					if(!flag){//职员
						if (data == ""){
							sweetAlert.caution("温馨提示","这段时间内没有记录")
						}else {
							data = data.substring(3,data.length);
							var clisrecords = data.split("crmuser");
							var clis = clisrecords[0];
							var records = clisrecords[1];
							var jsonClis = JSON.parse(clis);
							var jsonRecords = JSON.parse(records);
							contactMain.datatablesDestroy()
							$("#contact_record_table tbody").empty()
							for (var i = 0; i < jsonClis.length; i++) {
								var tr = {id:jsonRecords[i].id, linkmanId:$("#userId").val(), linkmanName:$("#username").text(), clientId:jsonClis[i].clientId,
									clientName:jsonClis[i].clientName, contactTime:jsonRecords[i].contactTime, content:jsonRecords[i].content};
								contactRecord.addTr(tr);
							}
							contactMain.datatablesCreate()
						}
					}else {//经理或老板
						if (data == ""){
							sweetAlert.caution("温馨提示","这段时间内没有记录")
						}else {
							data = data.substring(3,data.length);
							var clisusers = data.split("crmuser");
							var users = clisusers[0];
							var clis = clisusers[1];
							var ids = clisusers[2];
							var jsonClis = JSON.parse(clis);
							var jsonUsers = JSON.parse(users);
							var jsonIds = JSON.parse(ids)
							contactMain.datatablesDestroy()
							$("#contact_record_table tbody").empty()
							for (var i = 0; i < jsonClis.length; i++) {
								console.log(jsonClis[i].clientId)
								var tr = {id:jsonIds[i].id, linkmanId:jsonUsers[i].userId, linkmanName:jsonUsers[i].realName, clientId:jsonClis[i].clientId,
									clientName:jsonClis[i].clientName, contactTime:jsonIds[i].contactTime, content:jsonIds[i].content};
								contactRecord.addTr(tr);
							}
							contactMain.datatablesCreate()
						}
					}
				},
				error:function (data) {
					sweetAlert.caution("未知错误",data)
				}
			})
		}
	},
	/**
	 * 显示/隐藏其他查询条件
	 */
	moreFun: function(t) {
		if($("#contact_record #criteria_id").is(":hidden")){
			$("#contact_record #criteria_id").slideDown();
			$(t).children("span").removeClass("glyphicon glyphicon-plus").addClass("glyphicon glyphicon-minus");
		}else{
			$("#contact_record #criteria_id").hide();
			$(t).children("span").removeClass("glyphicon glyphicon-minus").addClass("glyphicon glyphicon-plus");
		}
	},
	/**
	 * 初始化其他组件
	 */
	initFun : function() {
		// 时间断组件
		var $contactTime = $('#contact_record #contactTime_');
		$contactTime.daterangepicker({
			"showDropdowns": true,// 显示日历上方的年份和月份选择框跳转到特定的月份和年份
			"linkedCalendars": false,// 两个日历可以是单独的年月
			"locale" : {// 自定义格式，由于 daterangepicker 组件不支持全球化，因此需要我们自己格式
				format : 'YYYY-MM-DD',// 格式
				separator : ' ~ ',// 时间段分隔符
				applyLabel : '确定',
				cancelLabel : '取消',
				fromLabel : '起始日期',
				toLabel : '结束日期',
				daysOfWeek : [ '日', '一', '二', '三', '四', '五','六' ],// 汉化星期
				monthNames : [ '一月', '二月', '三月', '四月', '五月','六月', '七月', '八月', '九月', '十月', '十一月','十二月' ],// 汉化月份
				firstDay : 1
			}
		});
//		daterange.dateRange($contactTime);
		$('#contact_record #contactTime_').val('');
	},
	
	/**
	 * 联系记录详情
	 */
	contactDetail: function(id, type,data) {

		var modelId = "contact" + type + "Model";
		var content = concatHTML.contactHTML(modelId, type);
		var isHideBut = type == 'update' ? false : true;
		commFun.noModel(modelId, "联系记录详情",700,380, content, contactMain.submitData, type, isHideBut);
		if (type == 'update') {
			// 初始化时间组件
			var $contactTimeDiv = $('#' + modelId + ' #contactTimeDiv');
			$contactTimeDiv.datetimepicker({
				language:  'zh-CN',
				format: "yyyy-mm-dd hh:ii",// 日期格式
				autoclose: true,// 是否自动关闭
				todayBtn: true,// 是否显示选择今天日期的按钮
				forceParse: 0
			});
		}

		contactMain.fillData(modelId, type, data);
	},
	
	/**
	 * 添加联系记录
	 */
	addContact: function() {
		var content = concatHTML.contactHTML("contactaddModel", "add");
		commFun.noModel("contactaddModel", "添加联系记录",700,380, content, contactMain.submitData, "add", false);
		// 初始化时间组件
		var $contactTimeDiv = $('#contactaddModel #contactTimeDiv');
		$contactTimeDiv.datetimepicker({
			language:  'zh-CN',
			format: "yyyy-mm-dd hh:ii",// 日期格式 
			autoclose: true,// 是否自动关闭
			todayBtn: true,// 是否显示选择今天日期的按钮
			forceParse: 0
		});

		contactRecord.queryClient()
	},
	/**
	 * 修改联系记录
	 */
	updContact: function(id) {

			var clientName = $("#contact_record_table #contactRecordTr"+id+" td:eq(1) a").text()
			var clientId = $("#contact_record_table #contactRecordTr"+id+" td:eq(1) a").attr('id');
			var linkmanId =$("#contact_record_table #contactRecordTr"+id+" td:eq(2)").attr('id');
			var content = $("#contact_record_table #contactRecordTr"+id+" td:eq(3)").text()
			var contactTime = $("#contact_record_table #contactRecordTr"+id+" td:eq(4)").text()
			var index = clientName.indexOf('(');
			contactMain.contactAll.CLIENT_AFTER = clientName.substr(index)
			var data = {id:id,clientName:clientName.substr(0,index),clientId:clientId,linkmanId:linkmanId,content:content,contactTime:contactTime};
		contactMain.contactDetail(id, "update",data);
	},
	
	/**
	 * 填充数据
	 */
	fillData: function(modelId, type, data) {
		$("#" + modelId + " #contactId").val(data.id);
		$("#" + modelId + " #clientInfo").attr('name',data.clientId)
		$("#" + modelId + " #clientInfo").val(data.clientName);
		$("#" + modelId + " #linkmanId").val(data.linkmanId);
		$("#" + modelId + " #content").val(data.content);
		// 联系时间
		if (type == 'update') {
			if (data.contactTime != null) 
				$("#" + modelId + " #contactTimeDiv").datetimepicker("setDate", new Date(data.contactTime));
		} else {
			var date = new Date(data.contactTime);
			var dformat = [ date.getFullYear(), date.getMonth() + 1, date.getDate() ].join('-') + ' ' + [ date.getHours(), date.getMinutes() ].join(':');
			$("#" + modelId + " #contactTime").val(dformat);
		}

		if (type == 'detail') {
			$("#" + modelId + " input[type='text']").attr("disabled", true);
			$("#" + modelId + " textarea").attr("disabled", true);
		}
	},
	
	/**
	 * 提交数据
	 */
	submitData: function(type) {
		var modelId = "contact" + type + "Model";
		var linkmanId = "";
		var linkmanName = "";
		var cliId = "";
		var clientName = "";
		var content = "";
		var contactTime = "";
		if (type == 'add'){
			linkmanId = $("#userId").val()
			linkmanName = $("#username").text();
			cliId = $("#" + modelId + " #clientInfo option:selected").attr('id')
			clientName =  $("#" + modelId + " #clientInfo option:selected").attr('name')
			content = $("#" + modelId + " #content").val();
			contactTime = $("#" + modelId + " #contactTime").val();
		}else if (type == 'update'){
			linkmanId =  $("#" + modelId + " #linkmanId").val();
			cliId = $("#" + modelId + " #clientInfo").attr('name')
			content = $("#" + modelId + " #content").val();
			contactTime = $("#" + modelId + " #contactTime").val();
		}
		if ($("#" + modelId + " #clientInfo option:selected").val() == "请选择"){
			sweetAlert.caution("温馨提示", "联系客户不允许为空！");
			return false;
		}
		if(linkmanId == '') {
			sweetAlert.caution("温馨提示", "联系人不允许为空！");
			return false;
		}
		if(contactTime == '') {
			sweetAlert.caution("温馨提示", "联系时间不允许为空！");
			return false;
		}
		if(content == '') {
			sweetAlert.caution("温馨提示", "联系内容不允许为空！");
			return false;
		}
		var res = false;
		if (type == "add") {// 添加
			contactController.contactAdd(linkmanId,cliId, content, contactTime, function(data) {
				if (data != '') {
					var msg = data.substring(0,4);

					if (msg == "添加成功"){
						sweetAlert.success("", msg);
						var id = data.substring(4,data.length);//自增
						res = true;//控制弹出框关闭
						newTr = {id:id,linkmanId:linkmanId,linkmanName:linkmanName,clientId:cliId,clientName:clientName,contactTime:contactTime,content:content}
						contactMain.datatablesDestroy()
						contactRecord.addTr(newTr)
						contactMain.datatablesCreate()
					}else {
						sweetAlert.caution("温馨提示", msg);
					}
				} else {
					sweetAlert.caution("温馨提示", data);
				}
			});
		} else if (type == 'update') {// 修改
			var contactId = $("#" + modelId + " #contactId").val();
			contactController.contactUpdate(contactId,content, contactTime, function(data) {
				if (data != '') {
					res = true;//关闭弹窗
					$("#contact_record_table #contactRecordTr"+contactId + " td:eq(3)").text(content);
					$("#contact_record_table #contactRecordTr"+contactId + " td:eq(4)").text(contactTime);
					if (data == "更新成功"){
						sweetAlert.success("",data)
					}else {
						sweetAlert.caution("温馨提示",data)
					}
				} else {
					sweetAlert.caution("未知错误", data);
				}
			});
		}
		
		return res;
	},
	
	/**
	 * 删除联系记录
	 */
	delContact: function(id) {
		sweetAlert.warning("确定删除吗？", "", "确定", "取消", null, 5000, function(){
			contactController.contactDel(id, function(data){
				if (data != '') {

					if (data == "删除成功"){
						sweetAlert.success("",data,"关闭",3000);
						contactMain.datatablesDestroy()
						$("#contact_record_table #contactRecordTr"+id).remove()
						contactMain.datatablesCreate()
					}else {
						sweetAlert.caution("温馨提示",data,"关闭",3000);
					}
				} else {
					sweetAlert.caution("未知错误",data)
				}
			});
		}, "", "", null, null, false);
	},
	
	/**
	 * 批量删除联系记录
	 */
	delBatchContact: function() {

		var ids = new Array();

		$("input:checkbox[name='btSelectItem']:checked").each(function () {
			ids.push($(this).attr('id').substr(8))
		})

		if (ids.length == 0){
			sweetAlert.caution("温馨提示", "请选择要删除的数据", "确定", 3000);
			return;
		}
		sweetAlert.warning("确定删除吗？", "", "确定", "取消", null, 5000, function(){
			contactController.contacBatchtDel(ids, function(data){
				if (data != '') {

					if (data == "删除成功"){
						sweetAlert.success("",data,"关闭",3000);
						contactMain.datatablesDestroy()
						for (var i = 0; i < ids.length; i++) {
							$("#contact_record_table #contactRecordTr"+ids[i]).remove()
						}
					contactMain.datatablesCreate()
					}else {
						sweetAlert.caution("温馨提示",data,"关闭",3000);
					}
				}
			});
		}, "", "", null, null, false);
	},
	
	/**
	 * 初始化
	 */
	queryInit: function(){
		//contactMain.queryTable();
		contactMain.initFun();
	}
}

/**
 * bootstrap-table event 事件
 */
window.contactEvent = {
	"click .like":function(e,value,row,index){
		contactMain.contactDetail(row.id, 'detail');
	}
}
window.linkmanEvent = {
	"click .like":function(e,value,row,index){
		contactMain.linkDetail('', row.id);
	}
}


$(document).ready(function() {
	contactMain.queryInit();
});