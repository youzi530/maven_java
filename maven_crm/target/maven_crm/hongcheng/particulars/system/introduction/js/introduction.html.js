var introductionHTML = {

    settingsHTML:function () {
        var settingshtml = '<div class="form" style="padding:5px;">';

        settingshtml += '<div class="row">';
        settingshtml += '<div class="col-sm-6">';
        settingshtml += '<div class="form-group">';
        settingshtml += '<label for="mobileInput">移动电话<span style="color: red;">*</span></label>';
        settingshtml += '<input type="text" class="form-control" id="mobileInput" placeholder="">';
        settingshtml += '</div></div>';

        settingshtml += '<div class="col-sm-6">';
        settingshtml += '<div class="form-group">';
        settingshtml += '<label for="emailInput">电子邮箱<span style="color: red;">*</span></label>';
        settingshtml += '<input type="text" class="form-control" id="emailInput" placeholder="">';
        settingshtml += '</div></div></div>';

        settingshtml += '</div>';

        return settingshtml;
    }


}