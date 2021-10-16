var linkmanHTML = {

		
		/**
		 * 联系人详情
		 * @param modelId
		 * @param method 请求方式；当从客户详情界面查看联系人详情时，不显示查看客户详情按钮
		 */
		linkmanHTML: function(modelId, method) {

			var linkmanHtml = '<div class="form" style="padding:5px;">';

			linkmanHtml += '<div class="row">';
			linkmanHtml += '<div class="col-sm-6">';
			linkmanHtml += '<div class="form-group">';
			linkmanHtml += '<label for="linkmanName">联系人姓名<span style="color: red;">*</span></label>';
			linkmanHtml += '<input type="text" class="form-control" id="linkmanName" placeholder="">';
			linkmanHtml += '<input type="hidden" id="linkmanId">';
			linkmanHtml += '<input type="hidden" id="createTime">';
			linkmanHtml += '</div></div>';

			linkmanHtml += '<div class="col-sm-6">';
			linkmanHtml += '<div class="form-group">';
			linkmanHtml += '<label for="identity">身份证号<span style="color: red;">*</span></label>';
			linkmanHtml += '<input type="text" class="form-control" id="identity" placeholder="">';
			linkmanHtml += '</div></div></div>';

			linkmanHtml += '<div class="row">';
			linkmanHtml += '<div class="col-sm-6">';
			linkmanHtml += '<div class="form-group" id="linkSex">';
			linkmanHtml += '<label for="sex">性别<span style="color: red;">*</span></label>';
			linkmanHtml += '<div class="input-group m-bot15">';
			linkmanHtml += '<input type="radio" name="sex" value="男" checked> 男';
			linkmanHtml += '<input type="radio" name="sex" value="女" style="margin-left: 20px;"> 女';
			linkmanHtml += '</div>';
			linkmanHtml += '</div></div>';

			linkmanHtml += '<div class="col-sm-6">';
			linkmanHtml += '<div class="form-group">';
			linkmanHtml += '<label for="birValue">出生日期<span style="color: red;">*</span></label>';
			linkmanHtml += '<div id="birthday" class="input-group date form_date">';
			linkmanHtml += '<input class="form-control size="16" type="text" value="" id="birValue" readonly="readonly">';
			linkmanHtml += '<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>';
			linkmanHtml += '<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>';
			linkmanHtml += '</div>';
			linkmanHtml += '</div></div></div>';
			
			
			linkmanHtml += '<div class="row">';
			linkmanHtml += '<div class="col-sm-6">';
			linkmanHtml += '<div class="form-group">';
			linkmanHtml += '<label for="department">所属部门</label>';
			linkmanHtml += '<input type="text" class="form-control" id="department" placeholder="" value="客户部门" disabled>';
			linkmanHtml += '</div></div>';
			
			linkmanHtml += '<div class="col-sm-6">';
			linkmanHtml += '<div class="form-group">';
			linkmanHtml += '<label for="status">职员状态</label>';
			linkmanHtml += '<select class="form-control" id="status" style="color:#f0b80e;">';
			linkmanHtml += '<option value="试用期">试用期</option>';
			linkmanHtml += '<option value="正式员工">正式员工</option>';
			linkmanHtml += '<option value="离职">离职</option>';
			linkmanHtml += '</select>';
			linkmanHtml += '</div></div></div>';
			
			linkmanHtml += '<div class="row">';
			linkmanHtml += '<div class="col-sm-6">';
			linkmanHtml += '<div class="form-group">';
			linkmanHtml += '<label for="mobilePhone">移动电话<span style="color: red;">*</span></label>';
			linkmanHtml += '<input type="text" class="form-control" id="mobilePhone" placeholder="">';
			linkmanHtml += '</div></div>';
			
			linkmanHtml += '<div class="col-sm-6">';
			linkmanHtml += '<div class="form-group">';
			linkmanHtml += '<label for="email">电子邮箱<span style="color: red;">*</span></label>';
			linkmanHtml += '<input type="text" class="form-control" id="email" placeholder="">';
			linkmanHtml += '</div></div></div>';
			
			
			linkmanHtml += '<div class="row">';
			linkmanHtml += '<div class="col-sm-6">';
			linkmanHtml += '<div class="form-group">';
			linkmanHtml += '<label for="account">账号分配<span style="color: red;">*</span></label>';
			linkmanHtml += '<input type="text" class="form-control" id="account" placeholder="">';
			linkmanHtml += '</div></div>';
			
			linkmanHtml += '<div class="col-sm-6">';
			linkmanHtml += '<div class="form-group">';
			linkmanHtml += '<label for="password">密码分配<span style="color: red;">*</span></label>';
			linkmanHtml += '<input type="text" class="form-control" id="password" placeholder="">';
			linkmanHtml += '</div></div></div>';

			linkmanHtml += '<div class="row">';
			linkmanHtml += '<div class="col-sm-6">';
			linkmanHtml += '<div class="form-group">';
			linkmanHtml += '<label for="entryValue">入职日期<span style="color: red;">*</span></label>';
			linkmanHtml += '<div id="entryTime" class="input-group date form_date">';
			linkmanHtml += '<input class="form-control size="16" type="text" value="" id="entryValue" readonly="readonly">';
			linkmanHtml += '<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>';
			linkmanHtml += '<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>';
			linkmanHtml += '</div>';
			linkmanHtml += '</div></div></div>';
			
			linkmanHtml += '</div>';
			
			return linkmanHtml;
		}
}