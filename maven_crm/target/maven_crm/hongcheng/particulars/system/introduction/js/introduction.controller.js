var introductionController = {

    userInfoChange:function (mobile,email,callBackFun) {
        jqueryAjax.asynchronusAjaxText("update.userSettings",{
            mobile:mobile,
            email:email
        },null,callBackFun)
    },

}