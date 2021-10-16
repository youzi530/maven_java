var linkmanMain = {

	datatablesDestroy:function(){
		$('#linkman_info_table').dataTable().fnDestroy();
	},

	datatablesCreate:function(){
		jQuery(function($) {
			var oTable1 = $('#linkman_info_table').dataTable( {
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

	/**
	 * 重置查询条件
	 */
	resetFun : function() {
		var inputs_ = $("#linkman_info #criteriaNav").find(
				":text,textarea,input[type='text']");
		inputs_.val("");
		linkman.query();
	},
	/**
	 * 查询
	 */
	queryFun : function() {
		var linkmanName = $("#linkmanName_").val();
		if (linkmanName == ''){
			sweetAlert.caution("温馨提示","查询不能为空");
			return;
		}
		$("#linkman_info_table")
		linkmanController.cliUserFind(linkmanName,function (data) {
			if (data != ""){
				if (data.length == 2){
					sweetAlert.caution("温馨提示","查无此人")
				}else {
					$("#linkman_info_table tbody").empty();
					var users = JSON.parse(data);
					for (var i = 0; i < users.length; i++) {
						linkman.addTr(users[i]);
					}
				}
			}
		})
	},
	/**
	 * 显示/隐藏其他查询条件
	 */
	moreFun: function(t) {
		if($("#linkman_info #criteria_id").is(":hidden")){
			$("#linkman_info #criteria_id").slideDown();
			$(t).children("span").removeClass("glyphicon glyphicon-plus").addClass("glyphicon glyphicon-minus");
		}else{
			$("#linkman_info #criteria_id").hide();
			$(t).children("span").removeClass("glyphicon glyphicon-minus").addClass("glyphicon glyphicon-plus");
		}
	},
	
	/**
	 * 联系人详情
	 */
	linkmanDetail: function(id, type) {
		linkmanController.linkmanDetail(id, function(data){
			var len = JSON.stringify(data)
			if (len.length == 2) {
				sweetAlert.caution("温馨提示", "未获取到相关用户信息");
				return;
			}
			
			var modelId = "linkman" + type + "Model";
			var content = linkmanHTML.linkmanHTML(modelId, "linkman");
			var isHideBut = type == 'update' ? false : true;
			commFun.noModel(modelId, "联系人详情",700,500, content, linkmanMain.submitData, type, isHideBut);

			// 初始化时间组件
			$('#linkmanaddModel #birthday').datetimepicker({
				language:  'zh-CN',
				format: "yyyy年mm月dd日",// 日期格式
				minView: "month",// 精确视图，这样只有年月日，没有时分秒
				autoclose: true,// 是否自动关闭
				todayBtn: true,// 是否显示选择今天日期的按钮
				forceParse: 0
			});

			$('#linkmanaddModel #entryTime').datetimepicker({
				language:  'zh-CN',
				format: "yyyy年mm月dd日",// 日期格式
				minView: "month",// 精确视图，这样只有年月日，没有时分秒
				autoclose: true,// 是否自动关闭
				todayBtn: true,// 是否显示选择今天日期的按钮
				forceParse: 0
			});
			
			linkmanMain.fillData(modelId, type, data);
		});
	},
	
	/**
	 * 添加联系人
	 */
	addLinkman: function() {
		var content = linkmanHTML.linkmanHTML("linkmanaddModel", "linkman");
		commFun.noModel("linkmanaddModel", "添加联系人信息",700,500, content, linkmanMain.submitData, "add" , false);
		// 初始化时间组件
		$('#linkmanaddModel #birthday').datetimepicker({
			language:  'zh-CN',
			format: "yyyy年mm月dd日",// 日期格式
			minView: "month",// 精确视图，这样只有年月日，没有时分秒
			autoclose: true,// 是否自动关闭
			todayBtn: true,// 是否显示选择今天日期的按钮
			forceParse: 0
		});

		$('#linkmanaddModel #entryTime').datetimepicker({
			language:  'zh-CN',
			format: "yyyy年mm月dd日",// 日期格式
			minView: "month",// 精确视图，这样只有年月日，没有时分秒
			autoclose: true,// 是否自动关闭
			todayBtn: true,// 是否显示选择今天日期的按钮
			forceParse: 0
		});
	},
	
	/**
	 * 修改联系人
	 */
	updLinkman: function(userId) {
		linkmanMain.linkmanDetail(userId,'update')
	},

	/**
	 * 单个删除
	 */
	delLinkman: function(id) {
		sweetAlert.warning("确定删除吗？", "请确保选中员工的工作信息已转交", "确定", "取消", null, 5000, function(){
			linkmanController.linkmanDetele(id, function(data){
				if (data != '') {

					if (data == "删除成功"){
						sweetAlert.success("",data,"关闭",3000);
						linkmanMain.datatablesDestroy();
						$("#linkman_info_table #linkmanTr"+id).remove()
						linkmanMain.datatablesCreate();
					}else {
						sweetAlert.caution("温馨提示",data,"关闭",3000);
					}
				}
			});
		}, "", "", null, null, false);
	},
	
	/**
	 * 批量删除
	 */
	delBatchLinkman: function() {

		var ids = new Array();
		$("input:checkbox[name='btSelectItem']:checked").each(function () {
			ids.push($(this).attr('id').substr(8))
		});

		if (ids.length == 0){
			sweetAlert.caution("温馨提示", "请选择要删除的数据", "确定", 3000);
			return;
		}

		sweetAlert.warning("确定删除吗？", "请确保选中员工的工作信息已转交", "确定", "取消", null, 5000, function(){

			linkmanController.linkmanBatchDelete(ids, function(data){
				if (data != '') {
					if (data == "删除成功"){
						sweetAlert.success("",data,"关闭",3000);
						linkmanMain.datatablesDestroy()
						for (var i = 0; i < ids.length; i++) {
							$("#linkman_info_table #linkmanTr"+ids[i]).remove()
						}
					linkmanMain.datatablesCreate()
					}else {
						sweetAlert.caution("温馨提示",data,"关闭",3000);
					}
				}
			});
		}, "", "", null, null, false);
	},
	
	/**
	 * 填充数据
	 */
	fillData: function(modelId, type, data) {
		var linkma = data;
		$("#" + modelId + " #linkmanId").val(linkma.userId);
		$("#" + modelId + " #linkmanName").val(linkma.realName);
		$("#" + modelId + " #identity").val(linkma.identity);

		$("#" + modelId).find("input:radio[value='"+linkma.sex+"']").attr("checked",true);
		//出生日期控件
		var year = parseInt(linkma.birthday.substring(0,4));
		var month = parseInt(linkma.birthday.substring(5,7));
		var day = parseInt(linkma.birthday.substring(8,10));
		$("#" + modelId + " #birthday").datetimepicker("setDate", new Date(year,month-1,day,0,0,0,0));

		$("#" + modelId + " #status").find("option[value='"+linkma.status+"']").attr("selected",true);
		$("#" + modelId + " #mobilePhone").val(linkma.mobile);
		$("#" + modelId + " #email").val(linkma.email);
		$("#" + modelId + " #account").val(linkma.account);
		$("#" + modelId + " #password").val(linkma.password);

		 year = parseInt(linkma.entryTime.substring(0,4));
		 month = parseInt(linkma.entryTime.substring(5,7));
		 day = parseInt(linkma.entryTime.substring(8,10));

		$("#" + modelId + " #entryTime").datetimepicker("setDate", new Date(year,month-1,day,0,0,0,0));

		if (type == 'detail') {
			$("#" + modelId + " input[type='text']").attr("disabled", true);
			$("#" + modelId + " input[type='radio']").attr("disabled", true);
			$("#" + modelId + " textarea").attr("disabled", true);
			$("#" + modelId + " #clientName").removeAttr("onclick");
		}
	},
	
	/**
	 * 提交数据
	 */
	submitData: function(type) {

		var modelId = "linkman" + type + "Model";

		var linkmanName = $("#" + modelId + " #linkmanName").val();
		var identity = $("#" + modelId + " #identity").val();
		var sex = $("#" + modelId + " #linkSex").find("input[name='sex']:checked").val();
		var birValue = $("#" + modelId + " #birValue").val();
		var status = $("#" + modelId + " #status").val();
		var mobilePhone = $("#" + modelId + " #mobilePhone").val();
		var email = $("#" + modelId + " #email").val();
		var account = $("#" + modelId + " #account").val();
		var password = $("#" + modelId + " #password").val();
		var entryValue = $("#" + modelId + " #entryValue").val();

		if (linkmanName == '') {
			sweetAlert.caution("温馨提示", "联系人名称不允许为空！");
			return false;
		}
		if (identity.length != 18) {
			sweetAlert.caution("温馨提示", "身份证号有误!");
			return false;
		}
		if (sex == '') {
			sweetAlert.caution("温馨提示", "性别不允许为空！");
			return false;
		}
		if (birValue == '') {
			sweetAlert.caution("温馨提示", "出生日期不允许为空！");
			return false;
		}
		if (!verificat.mobileVer(mobilePhone)) {
			sweetAlert.caution("温馨提示", "移动电话格式不正确！");
			return false;
		}
		if (!verificat.emailVer(email)) {
			sweetAlert.caution("温馨提示", "电子邮箱格式不正确！");
			return false;
		}
		if (account == '') {
			sweetAlert.caution("温馨提示", "账号分配不允许为空！");
			return false;
		}
		if (password == '') {
			sweetAlert.caution("温馨提示", "密码分配不允许为空！");
			return false;
		}
		if (entryValue == '') {
			sweetAlert.caution("温馨提示", "出生日期不允许为空！");
			return false;
		}

		var res = false;

		if (type == 'add') {
			linkmanController.linkmanAdd( linkmanName,identity,sex,birValue,status,
				mobilePhone,email,account,password,entryValue,function(data){
				if (data != ''){
					var msg = data.substring(0,4);

					if (msg == "添加成功"){
						sweetAlert.success("", msg);
						var userId = data.substring(4,data.length);
						res = true;//控制弹出框关闭
						newTr = {userId:userId,realName:linkmanName,identity:identity,sex:sex,birthday:birValue,status:status,
							mobile:mobilePhone,email:email,account:account,password:password,entryTime:entryValue}
							linkmanMain.datatablesDestroy()
						linkman.addTr(newTr)
						linkmanMain.datatablesCreate()
					}else {
						sweetAlert.caution("温馨提示", msg);
					}
				}else {
					sweetAlert.caution("未知错误",data);
				}
			});
		} else if (type == 'update') {
			var userId = $("#" + modelId + " #linkmanId").val();
			linkmanController.linkmanUpdate(userId,linkmanName,identity,sex,birValue,status,
				mobilePhone,email,account,password,entryValue, function(data){
				if (data == '') {
					sweetAlert.caution("未知错误",data);
					res = true;
				} else {
					res = true;//关闭弹窗
					if (data == "更新成功"){
						sweetAlert.success("温馨提示", data);
						var tr ={userId:userId,realName:linkmanName,identity:identity,sex:sex,birthday:birValue,status:status,
							mobile:mobilePhone,email:email,account:account,password:password,entryTime:entryValue};
						linkmanMain.datatablesDestroy()
						linkman.update(userId,tr)
						linkmanMain.datatablesCreate()
					}else {
						sweetAlert.caution("温馨提示", data);
					}
				}
			});
		}
		
		return res;
	},

	/**
	 * 初始化
	 */
	queryInit : function() {
		//linkmanMain.queryTable();
	}
}
/**
 * bootstrap-table event 事件
 */
window.linkmanEvent = {
	"click .like":function(e,value,row,index){
		linkmanMain.linkmanDetail(row.id, 'detail');
	}
}

window.clientEvent = {
	"click .like":function(e,value,row,index){
		linkmanMain.clientDetail('',row.id);
	}
}
window.contactEvent = {
		"click .like":function(e,value,row,index){
			linkmanMain.contactDetail('',row.id);
		}
}

$(document).ready(function() {
	linkmanMain.queryInit();
});