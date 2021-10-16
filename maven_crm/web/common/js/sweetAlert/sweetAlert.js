/**
 * 各类提示框
 * @type 
 */
var sweetAlert = {
	/**
	 * 普通信息提示框
	 * @param {} title 标题
	 * @param {} text 描述
	 * @param {} btnText 按钮文本
	 * @param {} timer 自动关闭时间
	 */
	general:function(title,text,btnText,timer){
		swal({
			title:title,//标题
			text:text,//警告框描述
			type:"",
			allowOutsideClick:true,//点击警告框外关闭
			confirmButtonText:btnText,//按钮文字
			confirmButtonColor:"#AEDEF4",//改变确认按钮背景颜色
			timer:timer//自动关闭时间
		});
		$(".sweet-overlay").css({"display":"none"});//隐藏模态窗口
	},
	/**
	 * 成功信息提示框
	 * @param {} title 标题
	 * @param {} text 描述
	 * @param {} btnText 按钮文本
	 * @param {} timer 自动关闭时间
	 */
	success:function(title,text,btnText,timer){
		swal({
			title:title,//标题
			text:text,//警告框描述
			type:"success",
			allowOutsideClick:true,//点击警告框外关闭
			confirmButtonText:btnText,//按钮文字
			confirmButtonColor:"#AEDEF4",//改变确认按钮背景颜色
			cancelButtonText:"取消",//取消按钮文字
			imageUrl:null,//自定义图片
			imageSize:"80x80",//图片大小
			timer:timer//自动关闭时间
		});
		$(".sweet-overlay").css({"display":"none"});//隐藏模态窗口


	},
	/**
	 * 错误信息提示框
	 * @param {} title 标题
	 * @param {} text 描述
	 * @param {} btnText 按钮文本
	 * @param {} timer 自动关闭时间
	 */
	error:function(title,text,btnText,timer){
		swal({
			title:title,//标题
			text:text,//警告框描述
			type:"error",
			allowOutsideClick:true,//点击警告框外关闭
			confirmButtonText:btnText,//按钮文字
			confirmButtonColor:"#AEDEF4",//改变确认按钮背景颜色
			timer:timer//自动关闭时间
		});
		$(".sweet-overlay").css({"display":"none"});//隐藏模态窗口
	},
	/**
	 * 警告提示框
	 * @param {} title
	 * @param {} text
	 * @param {} btnText
	 * @param {} timer
	 */
	caution:function(title,text,btnText,timer){
		swal({
			title:title,//标题
			text:text,//警告框描述
			type:"sweetAlert-info",
			allowOutsideClick:true,//点击警告框外关闭
			confirmButtonText:btnText,//按钮文字
//			imageUrl:imsConstants.contextPath+"ims/component/sweetAlert/img/warn.png",
			timer:timer//自动关闭时间
		});
		$(".sweet-overlay").css({"display":"none"});//隐藏模态窗口
	},
	/**
	 * info提示框
	 * @param {} title
	 * @param {} text
	 * @param {} btnText
	 * @param {} timer
	 */
	info:function(title,text,btnText,timer){
		swal({
			title:title,//标题
			text:text,//警告框描述
			type:"sweetAlert-info",
			allowOutsideClick:true,//点击警告框外关闭
			confirmButtonText:btnText,//按钮文字
			timer:timer//自动关闭时间
		});
		$(".sweet-overlay").css({"display":"none"});//隐藏模态窗口
	},
	/**
	 * confirm信息提示框
	 * @param {} title 标题
	 * @param {} text 描述
	 * @param {} btnText 确定按钮文本
	 * @param {} closeBtnText 关闭按钮文本
	 * @param {} imageUrl 图片连接
	 * @param {} timer 自动关闭时间
	 * @param {} funOk 确定按钮回调函数
	 * @param {} funTitle 回调函数成功提示信息标题
	 * @param {} funText 回调函数成功提示信息描述
	 * @param {} parameter 回调函数所需参数
	 * @param {} funCancel 关闭按钮回调函数
	 * @param {} isOpenAlert 是否自动使用成功提示
	 */
	warning:function(title,text,btnText,closeBtnText,imageUrl,timer,funOk,funTitle,funText,parameter,funCancel,isOpenAlert){
		swal({
			title:title,//标题
			text:text,//警告框描述
			type:"warning",
			allowOutsideClick:true,//点击警告框外关闭
			showCancelButton:true,//显示关闭按钮
			confirmButtonText:btnText,//按钮文字
			confirmButtonColor:"#AEDEF4",//改变确认按钮背景颜色
			cancelButtonText:closeBtnText,//取消按钮文字
			closeOnConfirm:false,//点击确认后不关闭提示窗口
			closeOnCancel: true,//点击取消按钮关闭提示框
			imageUrl:null,//自定义图片
			imageSize:"80x80",//图片大小
			timer:timer//自动关闭时间
		},
		function(isConfirm){
			if (isConfirm) {
					if(funOk != null){
						if(parameter != "undefined" && parameter != null && parameter != ""){
							funOk(parameter);
						}else{
							funOk();
						}
					}
					if (isOpenAlert || typeof isOpenAlert == "undefined") {
						sweetAlert.success(funTitle,funText,"关闭","3000");
					}
			} else {
				if (funCancel != null) {
					funCancel();
				}
			}
	    });
		$(".sweet-overlay").css({"display":"none"});//隐藏模态窗口
	},
	/**
	 * 
	 * @param {} parameter所需参数对象，包含如下属性
	 * title：标题
	 * text：描述
	 * type：类型，可选择值为：success,error,info和warning
	 * showCancelButton：是否显示关闭按钮
	 * btnText：确定按钮显示文本
	 * btnColor：确定按钮背景颜色
	 * closeBtnText：关闭按钮显示文本
	 * closeOnConfirm:点击确定是否关闭提示框，false为不关闭
	 * closeOnCancel:点击关闭按钮是否关闭提示框，false为不关闭
	 * imageUrl：提示框自定义图片
	 * imageSize：图片大小
	 * timer：自定义关闭时间
	 * funOk：类型设置为warning时，确定按钮的回调函数
	 * funCancel：类型设置为warning时，关闭按钮的回调函数
	 * successText：类型设置为warning时，确定按钮提示框显示文本
	 * errorText：类型设置为warning时，关闭按钮提示框显示文本
	 * backgroupColor：提示框背景颜色
	 */
	allSweetAlert:function(parameter){
		if(parameter.btnColor == null || parameter.btnColor == ""){
			btnColor = "#AEDEF4";
		}
		if(parameter.closeOnConfirm != true && parameter.closeOnConfirm != false){
			parameter.closeOnConfirm = true;
		}
		if(parameter.closeOnCancel != true && parameter.closeOnCancel != false){
			parameter.closeOnCancel = true;
		}
		
		swal({
			title:parameter.title,//标题
			text:parameter.text,//警告框描述
			type:parameter.type,
			allowOutsideClick:true,//点击警告框外关闭
			showCancelButton:parameter.showCancelButton,//显示关闭按钮
			confirmButtonText:parameter.btnText,//按钮文字
			confirmButtonColor:parameter.btnColor,//改变确认按钮背景颜色
			cancelButtonText:parameter.closeBtnText,//取消按钮文字
			closeOnConfirm:parameter.closeOnConfirm,//点击确定是否关闭提示框
			closeOnCancel: parameter.closeOnCancel,//点击取消是否关闭提示框
			imageUrl:parameter.imageUrl,//自定义图片
			imageSize:parameter.imageSize,//图片大小
			timer:parameter.timer//自动关闭时间
		},
		function(isConfirm) {
			if (isConfirm) {
				if(parameter.funOk != null){
					parameter.funOk();
				}
				sweetAlert.success(parameter.successText,"","确定","3000");
			} else {
				if(parameter.funCancel != null){
					parameter.funCancel();
				}
				sweetAlert.error(parameter.errorText,"","确定",null);
			} 
	    });
		$(".sweet-overlay").css({"display":"none"});//隐藏模态窗口
	}
};