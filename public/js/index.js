$(()=>{
    var arr=[
        ["img/index/behind_the_mac_daito_large.jpg","img/index/behind_the_mac_daito_medium.jpg","img/index/behind_the_mac_daito_small.jpg"],
        ["img/index/behind_the_mac_boniface_large.jpg","img/index/behind_the_mac_boniface_medium.jpg","img/index/behind_the_mac_boniface_small.jpg"],
        ["img/index/behind_the_mac_majid_large.jpg","img/index/behind_the_mac_majid_medium.jpg","img/index/behind_the_mac_majid_small.jpg"],["img/index/behind_the_mac_makato_large.jpg","img/index/behind_the_mac_makato_medium.jpg","img/index/behind_the_mac_makato_small.jpg"],["img/index/behind_the_mac_peter_large.jpg","img/index/behind_the_mac_peter_medium.jpg","img/index/behind_the_mac_peter_small.jpg"],["img/index/behind_the_mac_phoebe_large.jpg","img/index/behind_the_mac_phoebe_medium.jpg","img/index/behind_the_mac_phoebe_small.jpg"],
    ];
    var num;
    var ran=Math.random()*100;
    if(ran<17){
        num=0;
    }else if(ran<34){
        num=1;
    }else if(ran<48){
        num=2;
    }else if(ran<65){
        num=3;
    }else if(ran<83){
        num=4;
    }else{
        num=5;
    }
    $(window).resize(mach);
	function mach(){
        var result=window.matchMedia('(min-width:1069px)');
        var result1=window.matchMedia('(min-width:736px)');
        var $iphonex=$(".top-three>img:first");
        var $ipad=$(".top-three>img:eq(1)");
        var $behind=$(".six-block>.behind");
        var img;
        if(result.matches){
            $iphonex.attr({src:"img/index/iphone_x_largetall.jpg"});
            $ipad.attr({src:"img/index/ipad_largetall.jpg"});
            img=arr[num][0];
            $behind.css({backgroundImage:`url(${img})`});
        }else if(result1.matches){
            $iphonex.attr({src:"img/index/iphone_x_mediumtall.jpg"});
            $ipad.attr({src:"img/index/ipad_mediumtall.jpg"});
            img=arr[num][1];
            $behind.css({backgroundImage:`url(${img})`});
        }else{
            $iphonex.attr({src:"img/index/iphone_x_small.jpg"});
            $ipad.attr({src:"img/index/ipad_small.jpg"});
            img=arr[num][2];
            $behind.css({backgroundImage:`url(${img})`});
        }   
    }
    mach();
});