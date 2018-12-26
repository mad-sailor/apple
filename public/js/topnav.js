$(function(){
    $.ajax({
        type:'get',
        url:'topnav.html',
        success:function(res){
            $(`<link rel="stylesheet" href="css/topnav.css">`).appendTo('head');
            $("#top-nav").html(res);
        }
    })
});