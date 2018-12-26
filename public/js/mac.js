$(function(){
  var LIWIDTH=1920,moved=0,timer=null,wait=5000,interval=1500;
  var $ulbanner=$("ul.banner-list");
  var $thumbs=$("ul.indicators");
  function move(){
    moved++;
    $thumbs.children(`:eq(${moved})`).addClass("active").siblings().removeClass("active");
    $ulbanner.animate({
        left:-moved*LIWIDTH
    },interval,function(){
        if(moved==3){
            $ulbanner.css("left",0);
            moved=0;
            $thumbs.children(":first").addClass("active").siblings().removeClass("active");
        }
    });
  }
  function autoMove(){
    timer=setInterval(move,wait);
  }
  autoMove();
  $thumbs.on("click","li",function(){
    clearInterval(timer);
    var $li=$(this);
    moved=$li.data("left");
    $ulbanner.stop(true).animate({
        left:-moved*LIWIDTH
    },interval,function(){
        $li.addClass("active").siblings().removeClass("active");
    });
    autoMove();
  });
  $('div.banner').hover(
    function(){
        $('a.prev.btn').css("left",0).next().css("right",20);
    },
    function(){
        $('a.prev.btn').css("left",-50).next().css("right",-30);
    }
  );
  $("a.btn").click(function(){
    var $arrow=$(this);
    if($arrow.hasClass("prev")){
        if(!$ulbanner.is(":animated")){
            clearInterval(timer);
            if(moved==0){
                moved=data.length;
                $ulbanner.css("left",-LIWIDTH*moved);
            }
            moved--;
            $ulbanner.animate({
                left:-moved*LIWIDTH
            },interval,function(){
                $thumbs.children("a:eq("+moved+")")
                    .addClass("active")
                    .siblings().removeClass("active")
            });
        }
        autoMove();
    }
    else{
        if(!$ulbanner.is(":animated")){
            clearInterval(timer);
            move();
            autoMove();
        }
    }
  });
  //点击小图片，下方my-big中显示大图片
  var $lIgm=$("img.my-big");
  $("img.nav-inco").click(function(e){
    e.preventDefault();
    var $img=$(this);
    var src=$img.attr("data-target");
    $lIgm.attr({src});                   
  });
});
//扇叶效果
$("#sec1 li").click(function(){
    $(this).css("z-index",1000).css("transform","rotate(0deg)").css("transform-origin","50% 50%");
    $(this).siblings().removeClass().css("transform","rotate(0deg)").css("transform-origin","50% 50%").css("opacity",0)
  })
  var $lis=$("#sec1 li");
  $("#btn1").click(function(){
    $lis.eq(0).css("transform","rotate(-60deg)").css("transform-origin","50% 120%").css("opacity",1).css("z-index",10)
    $lis.eq(1).css("transform","rotate(-42.86deg)").css("transform-origin","50% 120%").css("opacity",1).css("z-index",11)
    $lis.eq(2).css("transform","rotate(-25.71deg)").css("transform-origin","50% 120%").css("opacity",1).css("z-index",12)
    $lis.eq(3).css("transform","rotate(-8.57deg)").css("transform-origin","50% 120%").css("opacity",1).css("z-index",13)
    $lis.eq(4).css("transform","rotate(8.57deg)").css("transform-origin","50% 120%").css("opacity",1).css("z-index",14)
    $lis.eq(5).css("transform","rotate(25.71deg)").css("transform-origin","50% 120%").css("opacity",1).css("z-index",15)
    $lis.eq(6).css("transform","rotate(42.86deg)").css("transform-origin","50% 120%").css("opacity",1).css("z-index",16)
    $lis.eq(7).css("transform","rotate(60deg)").css("transform-origin","50% 120%").css("opacity",1).css("z-index",17)
  })
  $("#btn2").click(function(){
    $lis.attr("style","");
  })