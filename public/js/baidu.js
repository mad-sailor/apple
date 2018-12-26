 //创建地图实例
 var map = new BMap.Map("allmap");
//创建坐标点 百度地图开发者->开发文档->坐标拾取器
var point = new BMap.Point(120.2155100000,30.2530820000);
// 设置当前坐标点，地图显示级别 1-19
map.centerAndZoom(point, 19);
// 初始化地图，设置中心点坐标和地图级别
//电脑在线环境，可以运行程序
//覆盖物
var search1 = document.getElementById('search1');
var search2 = document.getElementById('search2');
var search3 = document.getElementById('search3');
var position = document.getElementById('position');
if(search3.value===""){
    search1.value="浙江";
    search2.value="杭州";
    search3.value="apple";
}else{
    search1.value;
    search2.value;
    search3.value;
}
function sousuo(){
    var ing = search1.value+search2.value+search3.value;
    var local = new BMap.LocalSearch(map, {      
            renderOptions:{map: map}
    });      
    local.search(ing);

    var map = new BMap.Map("adc");
    map.centerAndZoom(new BMap.Point(116.300814,39.915799),11);
    var local =new BMap.LocalSearch(map,{
        renderOptions:{map:map,panel:"ad"}
    });
    local.search(ing)
    
    var scaleControl = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
    scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
    map.addControl(scaleControl);
    var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
    map.addControl(navControl);
    var overviewControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:true});
    map.addControl(overviewControl);
    map.addControl(new BMap.MapTypeControl());
}
position.onclick=function(){
    sousuo();
}
sousuo();


var $ol = $(".header>#s>span.icon");
var $ul = $('.header>.tion');
$ol.on("click",function(e){
    e.preventDefault();
    if ($ul.css('display') === 'none') {
        $ul.css('display','block')
    }else {
        $ul.css('display','none')
    }
})
$(search1).focus(function(){
    if ($ul.css('display') === 'none') {
        $ul.css('display','block')
    }else {
        $ul.css('display','none')
    }
});
 var $input=$(".header>#s>input");
$(".header>.tion>ul>li>a").on("click",function(e){
    e.preventDefault();
    var $opt=$(this);
    var $html = $opt.html()
    if($input.val() === ''){
        $input.val($html)
        $ul.css('display','none')
    }else {
        $input.val($html)
        $ul.css('display','none')
    }
})


