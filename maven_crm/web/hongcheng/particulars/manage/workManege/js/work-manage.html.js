var workManageHTML = {

    getHtml:function (workers,type) {
        var workManageHtml = '';


        workManageHtml = '<div class="form" style="padding:5px;">';

        if (type == 'add'){//上级分配任务

            var options = '';
            options += '<option value="请选择">-请选择-</option>';
            for (var i = 0; i < workers.length; i++) {
                options += '<option value="'+workers[i].userId+','+workers[i].realName+'">'+workers[i].realName+'(职称:'+workers[i].roleId+',工号:'+workers[i].userId+')'+'</option>';
            }

            workManageHtml += '<input type="text" class="form-control" id="widStore" placeholder="" value="" style="display: none">';
            workManageHtml += '<div class="row">';
            workManageHtml += '<div class="col-sm-6">';
            workManageHtml += '<div class="form-group">';
            workManageHtml += '<label for="workContent">工作内容<span style="color: red;">*</span></label>';
            workManageHtml += '<input type="text" class="form-control" id="workContent" placeholder="">';

            workManageHtml += '</div></div>';

            workManageHtml += '<div class="col-sm-6">';
            workManageHtml += '<div class="form-group">';
            workManageHtml += '<label for="progress">工作进度<span style="color: red;">*</span></label>';
            workManageHtml += '<div class="form-group form-group-options">' +
                '<div id="inputNmuber" class="input-group input-group-option quantity-wrapper">' +
                ' <span  class="input-group-addon input-group-addon-remove quantity-remove btn">' +
                '<span class="glyphicon glyphicon-minus"></span>' +
                '</span>' +
                '<input  id="inputNmuberinp" type="text" value="0" name="option[]" class="form-control quantity-count" onfocus="this.blur()">' +
                '<span class="input-group-addon input-group-addon-remove quantity-add btn">' +
                '<span class="glyphicon glyphicon-plus"></span>' +
                '</span>' +
                '</div>' +
                '</div>';
            workManageHtml += '</div></div></div>';

            workManageHtml += '<div class="row">';
            workManageHtml += '<div class="col-sm-6">';
            workManageHtml += '<div class="form-group">';
            workManageHtml += '<label for="allocateWork">工作人<span style="color: red;">*</span></label>';
            workManageHtml += '<select class="form-control" id="allocateWork">'+options;
            workManageHtml += '</select>';
            workManageHtml += '</div></div></div>';
        }else if (type == 'update' && ($("#identity").val() != "客户职员" && $("#identity").val() != "供销职员")){//上级更新任务
            var options = '';
            options += '<option value="请选择">-请选择-</option>';
            for (var i = 0; i < workers.length; i++) {
                options += '<option value="'+workers[i].userId+','+workers[i].realName+'">'+workers[i].realName+'(职称:'+workers[i].roleId+',工号:'+workers[i].userId+')'+'</option>';
            }
            workManageHtml += '<input type="text" class="form-control" id="widStore" placeholder="" value="" style="display: none">';
            workManageHtml += '<div class="row">';
            workManageHtml += '<div class="col-sm-6">';
            workManageHtml += '<div class="form-group">';
            workManageHtml += '<label for="workContent">工作内容<span style="color: red;">*</span></label>';
            workManageHtml += '<input type="text" class="form-control" id="workContent" placeholder="">';
            workManageHtml += '</div></div>';
            workManageHtml += '<div class="col-sm-6">';
            workManageHtml += '<div class="form-group">';
            workManageHtml += '<label for="allocateWork">工作人<span style="color: red;">*</span></label>';
            workManageHtml += '<select class="form-control" id="allocateWork">'+options;
            workManageHtml += '</select>';
            workManageHtml += '</div></div></div>';

        }else if (type == 'update' && ($("#identity").val() == "客户职员" || $("#identity").val() == "供销职员")){//员工更新进度
            workManageHtml += '<input type="text" class="form-control" id="widStore" placeholder="" value="" style="display: none">';
            workManageHtml += '<div class="row">';
            workManageHtml += '<div class="col-sm-6">';
            workManageHtml += '<div class="form-group">';
            workManageHtml += '<label for="progress">工作进度<span style="color: red;">*</span></label>';
            workManageHtml += '<div class="form-group form-group-options">' +
                '<div id="inputNmuber" class="input-group input-group-option quantity-wrapper">' +
                ' <span  class="input-group-addon input-group-addon-remove quantity-remove btn">' +
                '<span class="glyphicon glyphicon-minus"></span>' +
                '</span>' +
                '<input id="inputNmuberinp" type="text" value="6" name="option[]" class="form-control quantity-count" readonly="true">' +
                '<span class="input-group-addon input-group-addon-remove quantity-add btn">' +
                '<span class="glyphicon glyphicon-plus"></span>' +
                '</span>' +
                '</div>' +
                '</div>';
            workManageHtml += '</div></div></div>';

        }

        workManageHtml += '</div>';

        return workManageHtml;

    },



}