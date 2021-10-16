var authorityMain = {

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

	changeAuth:function (obj) {
		var roleId = $(obj).val();
		if (roleId == "请选择"){

		}else {
			var userId = $(obj).attr('id').substr(6);
			sweetAlert.warning("确定修改权限吗？", "请确保选中员工的工作信息已转交", "确定", "取消", null, 5000, function(){
				crmajax.ajax({
					url:"authUpdate.userInfo",
					type:"post",
					data:{
						userId:userId,
						roleId:roleId
					},
					success:function (data) {
						data = data.substr(3,data.length);
						if (data == "操作成功"){
							sweetAlert.success("",data)
						}else {
							sweetAlert.caution("温馨提示",data)
						}
					},
					error:function (data) {
						sweetAlert.caution("未知错误",data);
					}
				})
			}, "", "", null, null, false);
		}
	},

}