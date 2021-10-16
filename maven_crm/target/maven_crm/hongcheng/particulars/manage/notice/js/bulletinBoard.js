var bulletinBoard = {
    //查询已有的公告信息
    query:function () {
        var iden = $("#identity").val().substring(2,4);
        console.log(iden)
        if (iden == "职员"){
            $("#btn").hide();
        }
        var data;

        crmajax.ajax({
            url:"query.email",
            type:"post",
            data:data,
            success:function (data) {
                if (data == ""){
                    sweetAlert.caution("温馨提示","目前没有公告")
                }else {
                    bulletinBoardMain.datatablesDestroy();
                    $("#bulletinBoard_table tbody").empty();
                    for (var i = 0; i < data.length; i++) {

                        bulletinBoard.addTr(data[i]);
                    }
                    bulletinBoardMain.datatablesCreate();
                }
            },
            error:function (data) {
                sweetAlert.caution("未知错误",data)
            }
        })
    },
    queryFun:function(){


        var Name = $("#theme_").val();
        if (Name == ""){
            sweetAlert.caution("温馨提示","请输入查询条件")
            return;
        }
        $("tr").not($("#firsttr")).remove();
        $ajax({
            url:"find.email",
            type:"get",
            data:{
                Name:Name
            },
            success:function(data){

                if (data == ""){
                    sweetAlert.caution("温馨提示","查询失败")
                }else {
                    bulletinBoardMain.datatablesDestroy();
                    $("#bulletinBoard_table tbody").empty();
                    for (var i = 0; i < data.length; i++) {

                        bulletinBoard.addTr(data[i]);
                    }
                    bulletinBoardMain.datatablesCreate();

                }

            },
            error:function(error){
                alert(error);
            }
        });



    },





    //添加一行公告信息
    addTr:function (bulletinBoard) {

        var upd = '<td><a href="javascript:void(0);"  title="修改" style="margin-left: 10px;margin-right: 10px;"><i class="fa fa-wrench"></i></a></td>'
        var del = '<td><a href="javascript:void(0);" title="删除" style="margin-left: 10px;margin-right: 10px;"><i class="fa fa-trash-o"></i></a></td>'

        if ($("#identity").val().substring(2) == "职员"){
            del = '<td></td>';
            upd = '<td></td>';
        }

        $("#bulletinBoard_table tbody").append($('<tr id="bulletinBoardTr'+bulletinBoard.theme+'" data-index="0"> ' +
            '<td class="bs-checkbox"><input data-index="0" id="checkbox'+bulletinBoard.theme+'" name="btSelectItem" type="checkbox" class="itemSelect"></td>' +
            '<td style=""><a class="like" href="javascript:void(0);" title="主题">'+bulletinBoard.theme+'</a></td>' +
            '<td style="">'+bulletinBoard.content+'</td>' +
            '<td style="">'+bulletinBoard.releaseDate+'</td>'
            ).append($(upd).click(function () {
            bulletinBoardMain.updBulletinBoard(""+bulletinBoard.theme)
            })).append($(del).click(function () {
            bulletinBoardMain.delBulletinBoard(""+bulletinBoard.theme)
            })).append($('</tr>')));

    },

    update:function (theme,newbulletinBoard) {
        $("#bulletinBoard_table #bulletinBoardTr" + theme + " td:eq(1) a").text(newbulletinBoard.theme);
        $("#bulletinBoard_table #bulletinBoardTr" + theme + " td:eq(2)").text(newbulletinBoard.content);
        $("#bulletinBoard_table #bulletinBoardTr" + theme + " td:eq(3)").text(newbulletinBoard.releaseDate);

    },
    find:function (theme,newbulletinBoard) {
        $("#bulletinBoard_table #bulletinBoardTr" + theme + " td:eq(1) a").text(newbulletinBoard.theme);
        $("#bulletinBoard_table #bulletinBoardTr" + theme + " td:eq(2)").text(newbulletinBoard.content);
        $("#bulletinBoard_table #bulletinBoardTr" + theme + " td:eq(3)").text(newbulletinBoard.releaseDate);

    },
}