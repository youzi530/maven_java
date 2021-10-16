var bulletinBoardHTML = {

      /**
     * 公告详情/新增/修改 HTML
     * @param type 请求类型
     */
    bulletinBoardHTML: function(type) {
        var bulletinBoardHtml = '<div class="form" style="padding:5px;">';

        bulletinBoardHtml += '<div class="row">';
        bulletinBoardHtml += '<div class="col-sm-6">';
        bulletinBoardHtml += '<div class="form-group">';
        bulletinBoardHtml += '<label for="theme">主题<span style="color: red;">*</span></label>';
      if (type == 'update'){
          bulletinBoardHtml += '<input type="text" class="form-control" id="theme" placeholder="" disabled>';
      }else {
          bulletinBoardHtml += '<input type="text" class="form-control" id="theme" placeholder="">';
      }
        bulletinBoardHtml += '<input type="hidden" id="status">';
        bulletinBoardHtml += '</div></div></div>';

        bulletinBoardHtml += '<div class="row">';
        bulletinBoardHtml += '<div class="col-sm-6">';
        bulletinBoardHtml += '<div class="form-group">';
        bulletinBoardHtml += '<label for="content">内容<span style="color: red;">*</span></label>';
        bulletinBoardHtml += '<input type="text" class="form-control" id="content" placeholder="">';
        bulletinBoardHtml += '</div></div></div>';


        bulletinBoardHtml += '<div class="row">';
        bulletinBoardHtml += '<div class="col-sm-6">';
        bulletinBoardHtml += '<div class="form-group">';
        bulletinBoardHtml += '<label for="releaseDate">发布公告日期<span style="color: red;">*</span></label>';
        bulletinBoardHtml += '<input type="text" class="form-control" id="releaseDate" placeholder="">';
        bulletinBoardHtml += '</div></div></div>';



        bulletinBoardHtml += '</div>';

        return bulletinBoardHtml;
    }
}