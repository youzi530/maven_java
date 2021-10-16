var mainMenu = {

	menu: function(path) {
		var val = 0;
		
		
		switch(path){
			case 'client_info':
			case 'linkman':
			case 'contact_record':
			case 'myActiviti':
				val = 0;
				break;
			case 'my_knowledge':
			case 'knowledge_base':
				val = 4;
				break;
			case 'report_manager':
			case 'user_manager':
			case 'authset':
				val = 7;
				break;
			case 'supplier_info':
			case 'retrieval_center':
			case 'channel_management':
			case 'call_manager':
				val = 1;
				break;
			case 'commodity_info':
			case 'purchase_manager':
			case 'sales_manager':
			case 'delivery_manager':
				val = 2;
				break;
			case 'quote':
			case 'contract_management':
			case 'expense_management':
			case 'performance_management':
			case 'emarket_activities':
			case 'cost_analysis':
			case 'statistical_analysis':
				val = 3;
				break;
			case 'work_manager':
			case 'schedule_manager':
			case 'file_center':
			case 'address_list':
				val = 5;
				break;
			case 'notice_board':
			case 'message_manager':
			case 'mail_manager':
				val = 6;
				break;
		}

		var data = [{ "menuCode": "", "id": "01", "parentId": "0", "icon": "fa-users", "authorities": [], "status": 1, "menuSort": 1, "menuUrl": "", "menuList": [{ "menuCode": "", "id": "0101", "parentId": "01", "icon": "", "authorities": [], "status": 1, "menuSort": 1, "menuUrl": "client_info.html", "menuList": [], "menuName": "客户信息" }, { "menuCode": "", "id": "0102", "parentId": "01", "icon": "", "authorities": [], "status": 1, "menuSort": 2, "menuUrl": "linkman.html", "menuList": [], "menuName": "联系人信息" }, { "menuCode": "", "id": "0103", "parentId": "01", "icon": "", "authorities": [], "status": 1, "menuSort": 3, "menuUrl": "contact_record.html", "menuList": [], "menuName": "联系记录" }, { "menuCode": "", "id": "0104", "parentId": "01", "icon": "", "authorities": [], "status": 1, "menuSort": 4, "menuUrl": "myActiviti.html", "menuList": [], "menuName": "审批信息" }], "menuName": "客户管理" }, { "menuCode": "", "id": "02", "parentId": "0", "icon": "fa-briefcase", "authorities": [], "status": 1, "menuSort": 2, "menuUrl": "", "menuList": [{ "menuCode": "", "id": "0201", "parentId": "02", "icon": "", "authorities": [], "status": 1, "menuSort": 1, "menuUrl": "supplier_info.html", "menuList": [], "menuName": "供应商信息" }, { "menuCode": "", "id": "0203", "parentId": "02", "icon": "", "authorities": [], "status": 1, "menuSort": 3, "menuUrl": "channel_management.html", "menuList": [], "menuName": "渠道管理" }, { "menuCode": "", "id": "0204", "parentId": "02", "icon": "", "authorities": [], "status": 1, "menuSort": 4, "menuUrl": "call_manager.html", "menuList": [], "menuName": "来电管理" }], "menuName": "供应商管理" }, { "menuCode": "", "id": "03", "parentId": "0", "icon": "fa-truck", "authorities": [], "status": 1, "menuSort": 3, "menuUrl": "", "menuList": [{ "menuCode": "", "id": "0301", "parentId": "03", "icon": "", "authorities": [], "status": 1, "menuSort": 1, "menuUrl": "commodity_info.html", "menuList": [], "menuName": "商品信息" }, { "menuCode": "", "id": "0302", "parentId": "03", "icon": "", "authorities": [], "status": 1, "menuSort": 2, "menuUrl": "purchase_manager.html", "menuList": [], "menuName": "采购管理" }, { "menuCode": "", "id": "0304", "parentId": "03", "icon": "", "authorities": [], "status": 1, "menuSort": 4, "menuUrl": "sales_manager.html", "menuList": [], "menuName": "销售管理" }, { "menuCode": "", "id": "0305", "parentId": "03", "icon": "", "authorities": [], "status": 1, "menuSort": 5, "menuUrl": "delivery_manager.html", "menuList": [], "menuName": "发货管理" }], "menuName": "商品管理" }, { "menuCode": "", "id": "04", "parentId": "0", "icon": "fa-sitemap", "authorities": [], "status": 1, "menuSort": 4, "menuUrl": "", "menuList": [{ "menuCode": "", "id": "0401", "parentId": "04", "icon": "", "authorities": [], "status": 1, "menuSort": 1, "menuUrl": "quote.html", "menuList": [], "menuName": "报价管理" }, { "menuCode": "", "id": "0402", "parentId": "04", "icon": "", "authorities": [], "status": 1, "menuSort": 2, "menuUrl": "contract_management.html", "menuList": [], "menuName": "合同管理" }, { "menuCode": "", "id": "0403", "parentId": "04", "icon": "", "authorities": [], "status": 1, "menuSort": 3, "menuUrl": "expense_management.html", "menuList": [], "menuName": "费用管理" }, { "menuCode": "", "id": "0404", "parentId": "04", "icon": "", "authorities": [], "status": 1, "menuSort": 4, "menuUrl": "performance_management.html", "menuList": [], "menuName": "绩效管理" }, { "menuCode": "", "id": "0405", "parentId": "04", "icon": "", "authorities": [], "status": 1, "menuSort": 5, "menuUrl": "emarket_activities.html", "menuList": [], "menuName": "市场活动" }, { "menuCode": "", "id": "0406", "parentId": "04", "icon": "", "authorities": [], "status": 1, "menuSort": 6, "menuUrl": "cost_analysis.html", "menuList": [], "menuName": "成本分析" }, { "menuCode": "", "id": "0407", "parentId": "04", "icon": "", "authorities": [], "status": 1, "menuSort": 7, "menuUrl": "statistical_analysis.html", "menuList": [], "menuName": "统计分析" }], "menuName": "营销管理" }, { "menuCode": "", "id": "05", "parentId": "0", "icon": "fa-list-alt", "authorities": [], "status": 1, "menuSort": 5, "menuUrl": "", "menuList": [{ "menuCode": "", "id": "0501", "parentId": "05", "icon": "", "authorities": [], "status": 1, "menuSort": 1, "menuUrl": "knowledge_base.html", "menuList": [], "menuName": "知识库" }, { "menuCode": "", "id": "0502", "parentId": "05", "icon": "", "authorities": [], "status": 1, "menuSort": 2, "menuUrl": "my_knowledge.html", "menuList": [], "menuName": "我的知识" }], "menuName": "知识管理" }, { "menuCode": "", "id": "06", "parentId": "0", "icon": "fa-suitcase", "authorities": [], "status": 1, "menuSort": 6, "menuUrl": "", "menuList": [{ "menuCode": "", "id": "0601", "parentId": "06", "icon": "", "authorities": [], "status": 1, "menuSort": 1, "menuUrl": "work_manager.html", "menuList": [], "menuName": "工作管理" }, { "menuCode": "", "id": "0603", "parentId": "06", "icon": "", "authorities": [], "status": 1, "menuSort": 3, "menuUrl": "file_center.html", "menuList": [], "menuName": "文件中心" }, { "menuCode": "", "id": "0604", "parentId": "06", "icon": "", "authorities": [], "status": 1, "menuSort": 4, "menuUrl": "address_list.html", "menuList": [], "menuName": "通讯录" }], "menuName": "办公管理" }, { "menuCode": "", "id": "07", "parentId": "0", "icon": "fa-phone", "authorities": [], "status": 1, "menuSort": 7, "menuUrl": "", "menuList": [{ "menuCode": "", "id": "0701", "parentId": "07", "icon": "", "authorities": [], "status": 1, "menuSort": 1, "menuUrl": "notice_board.html", "menuList": [], "menuName": "公告栏" }, { "menuCode": "", "id": "0703", "parentId": "07", "icon": "", "authorities": [], "status": 1, "menuSort": 3, "menuUrl": "mail_manager.html", "menuList": [], "menuName": "邮件管理" }], "menuName": "通讯管理" }, { "menuCode": "", "id": "08", "parentId": "0", "icon": "fa-cogs", "authorities": [], "status": 1, "menuSort": 8, "menuUrl": "", "menuList": [{ "menuCode": "", "id": "0801", "parentId": "08", "icon": "", "authorities": [], "status": 1, "menuSort": 1, "menuUrl": "report_manager.html", "menuList": [], "menuName": "报表管理" }, { "menuCode": "", "id": "0802", "parentId": "08", "icon": "", "authorities": [], "status": 1, "menuSort": 2, "menuUrl": "user_manager.html", "menuList": [], "menuName": "用户管理" }, { "menuCode": "", "id": "0803", "parentId": "08", "icon": "", "authorities": [], "status": 1, "menuSort": 3, "menuUrl": "authset.html", "menuList": [], "menuName": "权限设置" }], "menuName": "系统管理" }];


		$("#main-nav").html('');
		$.each(data, function(k, v) {
			var $li = $("<li class=''></li>"),
				$a = $("<a href='javascript:void(0);'></a>"),
				$i = $("<i></i>"),
				$span = $("<span></span>");
			if(k == val) {
				$li.addClass("menu-list nav-active");
			} else if(v.children != "") {
				$li.addClass("menu-list");
			}
			$i.addClass("fa " + v.icon);
			$span.text(v.menuName);
			$i.appendTo($a);
			$span.appendTo($a);
			$a.appendTo($li);
			if(v.menuList != "") { // 有子菜单时，获取并添加子菜单，A标签无点击事件
				var $ul = mainMenu.menuChild(v.menuList);
				$ul.appendTo($li);
			} else { // 给A标签添加点击事件
				$a.off("click").on("click", function() {
					mainMenu.loadPage(v.menuCode, this);
				});
			}
			$li.appendTo($("#menuUL"));

			/**----------------设置菜单事件-----------------*/

			$a.on('click', function() {
				var parent = jQuery(this).parent();
				var sub = parent.find('> ul');

				if(!jQuery('body').hasClass('left-side-collapsed')) {
					if(sub.is(':visible')) {
						sub.slideUp(200, function() {
							parent.removeClass('nav-active');
							jQuery('.main-content').css({
								height: ''
							});
							mainMenu.mainContentHeightAdjust();
						});
					} else {
						mainMenu.visibleSubMenuClose();
						parent.addClass('nav-active');
						sub.slideDown(200, function() {
							mainMenu.mainContentHeightAdjust();
						});
					}
				}
				return false;
			});
			$i.on('click', function() {
				var el = $(this).parents(".panel").children(".panel-body");
				if($(this).hasClass("fa-chevron-down")) {
					$(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
					el.slideUp(200);
				} else {
					$(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
					el.slideDown(200);
				}
			});
			$li.hover(function() {
				jQuery(this).addClass('nav-hover');
			}, function() {
				jQuery(this).removeClass('nav-hover');
			});
		});

		/*$.ajax({
			url: path + "/login/menu.htl",
			type: "POST",
			dataType: "JSON",
			success: function(data) {
				$("#main-nav").html('');
				$.each(data, function(k, v) {
					var $li = $("<li class=''></li>"),
						$a = $("<a href='javascript:void(0);'></a>"),
						$i = $("<i></i>"),
						$span = $("<span></span>");
					if(k == 0){
						$li.addClass("menu-list nav-active");
					}else if(v.children != ""){
						$li.addClass("menu-list");
					}
					$i.addClass("fa " + v.icon);
					$span.text(v.menuName);
					$i.appendTo($a);
					$span.appendTo($a);
					$a.appendTo($li);
					if(v.menuList != ""){// 有子菜单时，获取并添加子菜单，A标签无点击事件
						var $ul = mainMenu.menuChild(v.menuList);
						$ul.appendTo($li);
					}else{// 给A标签添加点击事件
						$a.off("click").on("click", function(){
							mainMenu.loadPage(v.menuCode, this);
						});
					}
					$li.appendTo($("#menuUL"));
					
					
					----------------设置菜单事件-----------------
					
					$a.on('click',function() {
						var parent = jQuery(this).parent();
						var sub = parent.find('> ul');

						if (!jQuery('body').hasClass('left-side-collapsed')) {
							if (sub.is(':visible')) {
								sub.slideUp(200, function() {
									parent.removeClass('nav-active');
									jQuery('.main-content').css({
										height : ''
									});
									mainMenu.mainContentHeightAdjust();
								});
							} else {
								mainMenu.visibleSubMenuClose();
								parent.addClass('nav-active');
								sub.slideDown(200, function() {
									mainMenu.mainContentHeightAdjust();
								});
							}
						}
						return false;
					});
					$i.on('click',function() {
						var el = $(this).parents(".panel").children(".panel-body");
						if ($(this).hasClass("fa-chevron-down")) {
							$(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
							el.slideUp(200);
						} else {
							$(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
							el.slideDown(200);
						}
					});
					$li.hover(function() {
						jQuery(this).addClass('nav-hover');
					}, function() {
						jQuery(this).removeClass('nav-hover');
					});
				});
			},error: function(data) {
				alert(common.projectPath);
				alert("菜单获取失败");
			}
		});*/
	},

	/**
	 * 递归获取子菜单
	 * @param {Object} childMenu 子菜单集合
	 */
	menuChild: function(childMenu) {
		var $ul = $("<ul class='sub-menu-list'></ul>");
		$.each(childMenu, function(k, v) {
			var $ulChild = null;
			var $li = $("<li class=''></li>");
			var $a = $("<a href='javascript:void(0);'></a>");
			if(v.menuList != "") {
				var $i = $("<i></i>"),
					$span = $("<span></span>");
				$span.text(v.menuName);
				$i.appendTo($li);
				$span.appendTo($li);
				$ulChild = mainMenu.menuChild(v.menuList);
			} else {
				$a.text(v.menuName);
				$a.appendTo($li);
				$a.off("click").on("click", function() {
					mainMenu.loadPage(v.menuUrl, this);
				});
			}
			if($ulChild != null) {
				$ulChild.appendTo($li);
			}
			if(v.menuCode == "STATEMENT") {
				$li.addClass("active");
			}
			$li.appendTo($ul);

		});
		return $ul;
	},

	/*iFrameHeight: function() {
		var ifm = document.getElementById("iframepage");
		var subWeb = document.frames ? document.frames["iframepage"].document : ifm.contentDocument;
		if(ifm != null && subWeb != null) {
			ifm.height = subWeb.body.scrollHeight;
			ifm.width = subWeb.body.scrollWidth;
		}
	},*/

	/**
	 * 异步加载页面
	 * @param {Object} code
	 */
	loadPage: function(path, t) {
		
		if(path == ""){
			return;
		}else{
			window.location.href = path;
		}
		if(t != null && t != undefined) {
			$("#menuUL .active").removeClass("active");
			$(t).parent().addClass("active");
		}
		/*path = common.projectPath + path;
		$.get(path,function(data){
			$("#mainWrapper").html(data);
			if(t != null && t != undefined){
				$("#menuUL .active").removeClass("active");
				$(t).parent().addClass("active");
			}
		});*/
	},

	/**
	 * 退出
	 */
	logOut: function() {
		location.href = "http://localhost:8092/crm/login.html";
		crmajax.ajax({
			url:"user.signout",
			type:"post",
			data:{

			},
			success:function (data) {

			},
			error:function (data) {

			}
		})

	},

	visibleSubMenuClose: function() {
		jQuery('.menu-list').each(function() {
			var t = jQuery(this);
			if(t.hasClass('nav-active')) {
				t.find('> ul').slideUp(200, function() {
					t.removeClass('nav-active');
				});
			}
		});
	},
	mainContentHeightAdjust: function() {

	}
}
/**-----------------------------------------------------------------------------------------------------------------------*/