var inputNumber={

    addClick:function () {
        //Add
        $(".quantity-add").click(function(e){
            //Vars
            var count = 1;
            var newcount = 0;

            //Wert holen + Rechnen
            var elemID = $(this).parent().attr("id");
            var countField = $("#"+elemID+'inp');
            var count = $("#"+elemID+'inp').val();
            var newcount = parseInt(count) + 10;
            if (newcount >= 100){
                newcount=100
            }
            //Neuen Wert setzen
            $("#"+elemID+'inp').val(newcount);
            //alert($("#"+elemID+'inp').val())
        });

        //Remove
        $(".quantity-remove").click(function(e){
            //Vars
            var count = 1;
            var newcount = 0;

            //Wert holen + Rechnen
            var elemID = $(this).parent().attr("id");
            var countField = $("#"+elemID+'inp');
            var count = $("#"+elemID+'inp').val();
            var newcount = parseInt(count) - 10;
            if (newcount < 0){
                newcount=0
            }
            //Neuen Wert setzen
            $("#"+elemID+'inp').val(newcount);

        });


        //Delete
        $(".quantity-delete").click(function(e){
            //Vars
            var count = 1;
            var newcount = 0;

            //Wert holen + Rechnen
            var elemID = $(this).parent().attr("id");
            var countField = $("#"+elemID+'inp');
            var count = $("#"+elemID+'inp').val();
            var newcount = parseInt(count) - 10;
            if (newcount < 0){
                newcount=0
            }
            //Neuen Wert setzen
            //$('.item').html('');

            var row = $( ".row" );
            $(event.target).closest(row).html('');
        });

    }

}