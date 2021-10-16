var addressBook = {
    
    query:function () {
        crmajax.ajax({
            url:"query.addressBook",
            type:"post",
            data:{

            },
            success:function (data) {
                data = data.substr(3,data.length);
                if (data != '请尽快发展公司'){
                    var book = JSON.parse(data);

                    addressBookMain.datatablesDestroy();
                    $("#address_list_table tbody").empty();
                    for (var i = 0; i < book.length; i++) {
                        var tr = {userId:book[i].userId,realName:book[i].realName,mobile:book[i].mobile,email:book[i].email};
                        addressBook.addTr(tr);
                    }
                    addressBookMain.datatablesCreate();

                }else {
                    sweetAlert.caution('温馨提示',data);
                }
            },
            error:function (data) {
                sweetAlert.caution("未知错误",data)
            }
        })
    },

    addTr:function (tr) {
      $("#address_list_table tbody").append($('<tr>' +
          '<td style=""><a class="like" href="javascript:void(0);" title="用户姓名">'+tr.realName+'(工号:'+tr.userId+')</a></td>' +
          '<td style="">'+tr.mobile+'</td>' +
          '<td style="">'+tr.email+'</td>' +
          '</tr>'))
    },

}
