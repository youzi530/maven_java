var loginJS = {
		/**
		 * 登录
		 */
		login: function(path){
			var account = $("#userAccount").val(),
				pwd = $("#userPWD").val()
				code = $("#userCode").val();
			if(!verificat.isNotNull(account)){
				sweetAlert.caution("温馨提示", "用户名不允许为空！");
				return;
			}
			if(!verificat.isNotNull(pwd)){
				sweetAlert.caution("温馨提示", "密码不允许为空！");
				return;
			}

			// $.ajax({
			// 	url: path + "/login/login.htl",
			// 	type: "POST",
			// 	data: {"account": account, "password": pwd, "code": code},
			// 	success: function(data){
			// 		if (data != 'SUCC') {
			// 			sweetAlert.caution("温馨提示", data);
			// 		} else {
			// 			window.location.href = path + "/main/hongcheng/main/main.jsp";
			// 		}
			// 	},
			// 	error: function(data){
			//
			// 	}
			// });
			// window.location.href = "views/main.html";
			//
		}
}