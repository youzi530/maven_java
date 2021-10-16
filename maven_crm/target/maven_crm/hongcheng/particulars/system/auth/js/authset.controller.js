var authController = {
		authority_url: {
			ROLE_MENU_AUTH :"",
			ROLE_MENU_AUTH_UPD : ""
		},
		
		/**
		 * 角色所拥有菜单的权限
		 * @param roleId 角色ID
		 * @param callback 回调函数
		 */
		roleMenuAuth: function(roleId, callback) {
			var url = authController.authority_url.ROLE_MENU_AUTH;
			var data={"roleId":roleId};
			jqueryAjax.synchronizeAjax(url,data,null,callback);
		},
		
		/**
		 * 修改角色的菜单的权限
		 * @param roleId 角色ID
		 * @param menuAuthIds 菜单权限集合<br>
		 * 格式:["菜单ID-权限ID",....]
		 * @param callback 回调函数
		 */
		roleMenuAuthUpd: function(roleId, menuAuthIds, callback) {
			var url = authController.authority_url.ROLE_MENU_AUTH_UPD;
			var data={"roleId":roleId,"menuAuthIds":menuAuthIds};
			jqueryAjax.synchronizeAjax(url,data,null,callback);
		}
}