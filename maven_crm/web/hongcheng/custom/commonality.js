/*!
 * 通用类
 * 
 * 存放各类常量/通用AJAX
 * 
 * 2016-07-08
 * wangbt
 */


/**
 * 公共变量
 */
var common = {
		projectPath: "",//项目路径
		userInfo: {}// 当前用户ID
}

/**
 * AJAX
 */
var jqueryAjax = {
		
		/**
		 * jQuery Ajax 同步/异步方法
		 * @param {Object} url 请求地址 -- 必须
		 * @param {Object} type 请求类型 -- 非必须
		 * @param {Object} cache 是否缓存此页面  true:缓存； false：不缓存 -- 非必须
		 * @param {Object} datas 参数 -- 非必须
		 * @param {Object} dataType 返回值类型 -- 非必须
		 * @param {Object} async 是否同步 -- 非必须
		 * @param {Object} contentType 提交方式，
		 * 			有四种常见方式，分别为：application/x-www-form-urlencoded（默认）、multipart/form-data、application/json 和 text/xml    非必须
		 * @param {Object} callBackFun 回调函数 -- 非必须
		 * @param {Object} beforeSend 请求提交前回调（可用于防止用户频繁提交）-- 非必须
		 * @param {Object} complete 请求完后回调（可用于防止用户频繁提交） -- 非必须
		 */
		sysAysAjax: function(url, type, cache, datas, dataType, async, contentType, callBackFun, beforeSend, complete){

			$.ajax({
				type: (type == null || typeof(type) == "undefined") ? "post" : type,
				url:url,
				cache: (cache == null || typeof(cache)=="undefined") ? true : cache,
				// data: {"id":datas.id,"sName":datas.sName},
				data: (datas == null || typeof(datas)=="undefined") ? {} : datas,
				dataType: (dataType == null || typeof(dataType)=="undefined") ? "TEXT" : dataType,
				async:(async != null && async != undefined) ? async : true,
				contentType: (contentType == null || contentType == 'undefined') ? 'application/x-www-form-urlencoded' : contentType,
				scriptCharset: 'utf-8',
				statusCode: {404: function(){
					sweetAlert.error("提示", "访问地址无效");
				}, 400: function(){
					sweetAlert.error("提示", "参数类型不匹配");
				}},
				beforeSend: (beforeSend == null || beforeSend == undefined) ? null : beforeSend,
				complete: function(XMLHttpRequest, textStatus){// 该函数在success之后执行
					var sessionStatus = XMLHttpRequest.getResponseHeader("sessionStatus");
					if(sessionStatus == "timeout"){// session超时跳回到登录页面
						window.location.replace(common.projectPath + "login.jsp");
					}
					
					if(complete != null && complete != undefined){
						complete();
					}
				},
				success: function(data){
					callBackFun(data);

				},
				error: function(data){
					sweetAlert.error("系统提示", "程序暂停使用，请联系客服！", "关闭", 5000);
				}
			});
		},
		
		/**
		 * jQuery Ajax 异步方法
		 * @param {Object} url 请求地址
		 * @param {Object} datas 参数
		 * @param {Object} contentType 提交方式
		 * @param {Object} callBackFun 回调函数
		 */
		synchronizeAjax: function(url, datas, contentType, callBackFun){
			// function(url, type, cache, datas, dataType, async, contentType, callBackFun, beforeSend, complete)
			jqueryAjax.sysAysAjax(url, "POST", null, datas, "JSON", true, contentType, callBackFun);
		},
		
		/**
		 * jQuery Ajax 同步方法
		 * @param {Object} url 请求地址
		 * @param {Object} datas 参数
		 * @param {Object} contentType 提交方式
		 * @param {Object} callBackFun 回调函数 
		 */
		asynchronusAjax: function(url, datas, contentType, callBackFun){
			jqueryAjax.sysAysAjax(url, "POST", null, datas, "JSON", false, contentType, callBackFun);
		},
		
		/**
		 * 返回TEXT类型的同步AJAX
		 * @param {Object} url 请求地址
		 * @param {Object} datas 参数
		 * @param {Object} contentType 提交方式
		 * @param {Object} callBackFun 回调函数 
		 */
		asynchronusAjaxText: function(url, datas, contentType, callBackFun) {
			jqueryAjax.sysAysAjax(url, "POST", null, datas, "TEXT", false, contentType, callBackFun);
		},
		
		/**
		 * 返回TEXT类型的异步AJAX
		 */
		synchronizeAjaxText: function(url, datas, contentType, callBackFun) {
			jqueryAjax.sysAysAjax(url, "POST", null, datas, "TEXT", true, contentType, callBackFun);
		},
}

var commFun = {
		/**
		 * noModel层
		 * @param id noModel的ID
		 * @param title 标题
		 * @param width 宽
		 * @param height 高
		 * @param content 内容
		 * @param confirmFun 确定按钮的回调函数
		 * @param subParams 确定按钮参数
		 * @param isHideBut 是否隐藏按钮
		 * @param closeFun 关闭按钮回调函数
		 * @param closeParam 关闭按钮参数
		 */
		noModel: function(id, title, width, height, content, confirmFun, subParams, isHideBut, closeFun, closeParam) {
			if(!verificat.isNotNull(isHideBut)) {
				isHideBut = false;
			}
			$.noModel({
				id: id,
				title: title,
				content: content,
				width: width,
				height: height,
				isHideBut: isHideBut,
				singleButtons: [{
					name: "关闭",
					order: 1,
					halign: "right",
					isDisabled: false,
					params: closeParam,
					callback: function(btnObj) {
						if(closeFun != undefined && closeFun != null) {
							return closeFun(closeParam);
						} else {
							return true;
						}
					}
				}, {
					name: "确定",
					order: 2,
					halign: "right",
					isDisabled: false,
					params: subParams,
					callback: function(btnObj) {
						if(confirmFun != undefined && confirmFun != null) {
							return confirmFun(btnObj);
						} else {
							return true;
						}
					}
				}]
			});
		}
}

