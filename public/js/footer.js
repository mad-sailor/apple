
$(()=>{
    $.ajax({
        type:"get",
        url:"footer.html",
        success:function(html){
            $(`<link rel="stylesheet" href="css/footer.css">`).appendTo("head");
            $("#footer").html(html);
            var LIWIDTH=27;
            $("#footer>.content>div:not(.two)>div").click(function(){
                var $div=$(this);
                var result=window.matchMedia('(min-width:768px)');
                if(!result.matches){
                    if($div.children("ul").css("height")=="0px"){
                        var num=$div.find("ul>li").length;
                        $div.children("ul").animate({height:`${num*LIWIDTH}px`},500);
                        $div.parent().animate({height:`${num*LIWIDTH+37}px`},500);
                        $div.children("h3").addClass("rot");
                    }else{
                        $div.children("ul").animate({height:0});
                        $div.parent().animate({height:37});
                        $div.children("h3").removeClass("rot");
                    }
                }
            });
            $("#footer>.content>div.two>div").click(function(){
                var $div=$(this);
                var result=window.matchMedia('(min-width:768px)');
                if(!result.matches){
                    var otherW=parseInt($div.siblings().children("ul").css("height"));
                    if($div.children("ul").css("height")=="0px"){
                        var num=$div.find("ul>li").length;
                        $div.children("ul").animate({height:`${num*LIWIDTH}px`},500);
                        $div.parent().animate({height:`${num*LIWIDTH+74+otherW}px`},500);
                        $div.children("h3").addClass("rot");
                    }else{
                        $div.children("ul").animate({height:0},500);
                        $div.parent().animate({height:`${74+otherW}px`},500);
                        $div.children("h3").removeClass("rot");
                    }
                }
            });
            $(window).resize(function(){
                var result=window.matchMedia('(min-width:768px)');
                if(result.matches){
                    $("#footer>.content>div.two").attr("style","").find("ul").css("height","100%");
                }else{
                    $("#footer>.content>div.two").find("ul").css({height:0});
                }
            });
        }
    });
})