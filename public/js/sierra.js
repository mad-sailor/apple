$(()=>{
    $(window).scroll(function(){
        // 顶部效果
        var $h1 = $(".section>div:nth-child(2)>h1");
        var $section = $(".section");
        var $wrapper = $(".section>.wrapper");
        var scrollTop = $("html,body").scrollTop();
        var offsetTop=$wrapper.offset().top;
        if(scrollTop>48){
            $h1.css({
                opacity:"0",
                transition:"0.5s linear"
            });
            $section.css({
                filter:"blur(8px)",
            })
        }else{
            $h1.css("opacity","1");
            $section.css({
                filter:"",
            })
        }
        // 40%累加效果
        var $grid_1=$(".grid_1");
        var $grid_1_span=$(".grid_1>div>span:nth-child(5)")
        if(innerHeight/3+scrollTop>=$grid_1.offset().top&& $grid_1_span.html()==0){
            var n=0;
            var timer=setInterval(function(){
                n++;
                if(n>=40){
                    clearInterval(timer);
                }
                $grid_1_span.html(n);
            },30);
        }
        //全新技术动画
        var $tech=$(".new-tech");
        if(innerHeight/1.2+scrollTop>=$tech.offset().top){
            $tech.animate({top:-100,opacity:1},1000)
        }
        //照片示例动画
        var $pic = $(".all-pic");
        if(innerHeight/1.2+scrollTop>=$pic.offset().top){
            $pic.animate({top:-100,opacity:1},1000)
        }
        // 照片APP动画
        var $app_pic=$(".app-pic");
        if(innerHeight/1.2+scrollTop>=$app_pic.offset().top){
            $app_pic.animate({top:-100,opacity:1},1000)
        }
        // app与功能动画
        var $app_fun=$(".app-fun");
        if(innerHeight/1.2+scrollTop>=$app_fun.offset().top){
            $app_fun.animate({top:-100,opacity:1},1000)
        }
        // 楼层框
        var $divleft=$(".blid");
        var $mac = $(".cantiner>div:nth-child(2)");
        if(innerHeight/1.2+scrollTop>=$mac.offset().top){
            $divleft.removeClass("hidden");
        }else{
            $divleft.addClass("hidden");
        }
        var $d1 = $(".d1");
        var $divul = $(".blid>ul");
        $d1.each((i,f)=>{
            var offsetTop = $(f).offset().top;
            if(innerHeight/1.3+scrollTop>offsetTop){
                $divul.children(`:eq(${i})`).addClass("col").siblings().removeClass("col");
            }
        })
        $divul.on("click","li",function(){
            var i = $(this).index();
            var offsetTop= $(`.d1:eq(${i})`).offset().top;
            $("html,body").stop(true).animate({
                scrollTop:offsetTop
            },1000)
        })
    })
})