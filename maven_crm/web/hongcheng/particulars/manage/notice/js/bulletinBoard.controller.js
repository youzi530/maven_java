var bulletinBoardCtroller = {

    bulletinBoard_url: {
        BULLETINBOARD_DETAIL:"getOne.email",
        BULLETINBOARD_ADD: "add.email",
        BULLETINBOARD_UPDATE: "update.email",
        BULLETINBOARD_BATCH_DELETE: "moreDelete.email",
        BULLETINBOARD_DELETE: "oneDelete.email",


    },

    /**
     * 公告详情
     *
     * @param theme
     * @param callBackFun
     *            回调函数
     */
    bulletinBoardDetail: function (theme, callBackFun) {
        var url = bulletinBoardCtroller.bulletinBoard_url.BULLETINBOARD_DETAIL;
        jqueryAjax.synchronizeAjax(url, {
            "theme": theme
        }, null, callBackFun);
    },




    /**
     * 添加公告
     *
     * @param theme
     *            主题
     * @param content
     *            内容
     * @param releaseDate
     *            日期
     * @param callBackFun
     *            回调函数
     */
    bulletinBoardAdd: function (theme, content, releaseDate, callBackFun) {
        var url = bulletinBoardCtroller.bulletinBoard_url.BULLETINBOARD_ADD;
        var data = {
            "theme": theme,
            "content": content,
            "releaseDate": releaseDate,


        };
        jqueryAjax.asynchronusAjaxText(url, data, null, callBackFun);
    },
    /**
     * 修改公告
     *
     * @param theme
     *            主题
     * @param content
     *            内容
     * @param releaseDate
     *            日期
     * @param callBackFun
     *            回调函数
     */
    bulletinBoardUpdate: function (theme, content, releaseDate, callBackFun) {
        var url = bulletinBoardCtroller.bulletinBoard_url.BULLETINBOARD_UPDATE;
        var data = {
            "theme": theme,
            "content": content,
            "releaseDate": releaseDate,

        };
        jqueryAjax.asynchronusAjaxText(url, data, null, callBackFun);
    },

    /**
     * 批量删除公告信息
     *
     * @param ids
     *            公告集合
     */
    bulletinBoardBatchDel: function (ids, callBackFun) {
        var url = bulletinBoardCtroller.bulletinBoard_url.BULLETINBOARD_BATCH_DELETE;
        jqueryAjax.asynchronusAjaxText(url, {"ids": JSON.stringify(ids)}, null, callBackFun);
    },

    /**
     * 删除公告信息
     *
     * @param theme
     *            主题
     */
    bulletinBoardDel: function (theme, callBackFun) {
        var url = bulletinBoardCtroller.bulletinBoard_url.BULLETINBOARD_DELETE;
        jqueryAjax.asynchronusAjaxText(url, {
            "theme": theme
        }, null, callBackFun);
    },

}