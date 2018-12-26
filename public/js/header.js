$(()=>{
    $.ajax({
        type:"get",
        url:"header.html",
        success:function(html){
            $(`<link rel="stylesheet" href="css/header.css">`).appendTo("head");
            $("#header").html(html);
            /**响应式布局相关 */
            function match(){
                var result=window.matchMedia('(min-width:768px)');
                if(result.matches){
                    $("#header>div.top-nav>ul>li:gt(1):not(:last)").css("display","block");
                    $("#header").css("background","rgba(0,0,0,.8)").find(".small-search").css("height",0);
                    $("#header>div.top-nav>ul>li.top-line").data("toggle","1").children(":first").css({transform:""}).next().css({transform:""});
                }else{
                    $("#header>div.top-nav>ul>li:gt(1):not(:last)").css("display","none");
                    $("#header>div.top-nav>ul>li:eq(1)>a>img").attr("src","img/header/image_small_logo.svg");
                }
            }
            match();
            $(window).resize(match);
            /**小屏幕下的点击 */
            $("#header>div.top-nav>ul>li.top-line").click(function(){
                var $li=$(this);
                if($li.data("toggle")==1){
                    $li.children(":first").css({transform:"translateY(3px) rotate(45deg)"}).next().css({transform:"translateY(-5px) rotate(-45deg)"});
                    $("#header").css("background","#000").find(".small-search").animate({height:935},500);
                    $li.data("toggle","2");
                    $('body').css("overflow","hidden");
                    $('#header').css('height','100%');
                }else if($li.data("toggle")==2){
                    $li.children(":first").css({transform:""}).next().css({transform:""});
                    $("#header").find(".small-search").animate({
                        height:0
                    },500,function(){
                        $("#header").css({
                            background:"rgba(0,0,0,.8)",
                            height:48
                        });
                    });
                    $li.data("toggle","1");
                    $('body').css('overflow','auto');                    
                }
            });
            /**搜索点击事件 */
            $("#header>div.top-nav>ul>li.search").click(function(){
                $("#header>div.top-nav>ul>li:gt(1):not(.search)").css({display:"none"});
                $(this).children("input").show().focus().blur(function(){
                    $("#header>div.top-nav>ul>li:gt(1):not(.search)").css({display:"block"});
                    $(this).hide();
                });
            });
            /**购物袋点击事件 */
            $('#header>.top-nav>ul>li:last>a').click(function(){
                var $a = $(this);
                $a.next().toggle();
            });
            /**登录相关 */
            function islogin(){
                $.ajax({
                    type:'get',
                    url:'http://127.0.0.1:8888/user/islogin',
                    dataType:'json',
                    success:function(res){
                        var {code,uname} = res;
                        if(code==1){
                            $("#signout").show().html(`welcome ${uname} 注销`).prev().hide();
                        }else if(code==-1){
                            $("#signout").hide().prev().show();
                        }
                    }
                })
            }
            islogin();
            $('#signout').click(function(){
                $.ajax({
                    type:'get',
                    url:'http://127.0.0.1:8888/user/signout',
                    success:islogin
                })
            });
            $("#signin").click(function(){
                location.href = "http://127.0.0.1:8888/login.html?back="+location.href;
            });
            /**顶部固定 */
            $(window).scroll(function(){
                var scrollTop=document.body.scrollTop||  document.documentElement.scrollTop;
                var $header=$("#header");
                if(scrollTop>0){
                    $header.css({
                        position:"fixed",
                        top:0,
                        zIndex:100
                    });
                    $header.next().css("marginTop",48);
                }
                else{
                    $header.css({
                        position:"relative"
                    });
                    $header.next().css("marginTop",0);
                }
            });
        }
    });
});

