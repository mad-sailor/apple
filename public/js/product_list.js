$(()=>{
    function getlist(pno,where){
        $.ajax({
            url:"http://127.0.0.1:8888/product/list",
            type:"get",
            data:{pno,where},
            dataType: "json"
        }).then(output=>{
            $("section .shop_list").html(" ");
            $('.content_list ul').html(" ");
            var html = "";
            var {data} = output;
            for(var k of data){
                var {cid,pic,mtitle,price,screen,cpu,ssd,touch} = k;
                html+= `<div class="shop">
                <div class="radius"></div>
                <div class="img">
                    <img src="${pic}" alt="">
                </div>
                <p class="p1">${mtitle}</p>
                <p class="p2">RMB&nbsp;${price}&nbsp;起售</p>
                <ul class="desc">
                    <li class="no_wrap">${screen}</li>
                    <li>
                        ${cpu}
                    </li>
                    <li>
                        ${ssd}
                        <sup>2</sup>
                    </li>
                    <li>
                        ${touch}
                    </li>
                </ul>
            </div>
            <div class="message">
                <div class="clear">
                    <img src="${pic}" class="${mtitle=='Mac Pro'?'pro':'normal'}">
                    <ul>
                        <li class="background">${screen}<br><br>${cpu}<br><br>${ssd}<br><br>${touch}</li>
                        <li class="price"><span class='fuck'>售价</span>:&nbsp;¥&nbsp;<span class="you">${price}</span></li>
                        <li><span class="car" data-cid="${cid}">加入购物车</span></li>
                    </ul>
                </div>
                <span class="close">×</span>
            </div>
            `
            }
            var pages = '';
            if(output.pno==1)
                pages+=`<li class="disabled"><a href="javascript:;">上一页</a></li>`;
            else
                pages+=`<li><a href="javascript:;">上一页</a></li>`;
            var pno=parseInt(output.pno);
            if(pno-2>1&&pno+2<output.pageCount&&output.pageCount>5){
                for(var i=pno-2;i<=pno+2;i++){
                    if(pno==i)
                        pages+=`<li class="active"><a href="javascript:;">${i}</a></li>`;
                    else
                        pages+=`<li><a href="javascript:;">${i}</a></li>`;
                }
            }else if(pno+2>=output.pageCount&&output.pageCount>5){
                for(var i=output.pageCount-4;i<=output.pageCount;i++){
                    if(pno==i)
                        pages+=`<li class="active"><a href="javascript:;">${i}</a></li>`;
                    else
                        pages+=`<li><a href="javascript:;">${i}</a></li>`;
                }
            }else{
                var num;
                if(output.pageCount<5)
                    num=parseInt(output.pageCount);
                else
                    num=5;
                for(var i=1;i<=num;i++){
                    if(pno==i)
                        pages+=`<li class="active"><a href="javascript:;">${i}</a></li>`;
                    else
                        pages+=`<li><a href="javascript:;">${i}</a></li>`;
                }
            }
            if(output.pno==output.pageCount)
                pages+=`<li class="disabled"><a href="javascript:;">下一页</a></li>`;
            else
                pages+=`<li><a href="javascript:;">下一页</a></li>`;
            $("section .shop_list").html(html);
            $('.content_list ul').html(pages);
        });
    }
    function condition(pno){
        $lis = $('.Apl_Class .active');
        var arr = [];
        $lis.each(function(i){
            var $li = $(this);
            if($li.html()=="全部"){
                arr[i] = " 1=1 ";
            }else{
                if(i==0){
                    arr[0] = ` mtitle like "%${$li.html()}%" `;
                }else if(i==1){
                    arr[1] = ` screen like "%${$li.html()}%" `;
                }else if(i==2){
                    arr[2] = ` cpu like "%${$li.html()}%" `;
                }
            }
        });
        var where = " where "+arr.join('and');
        getlist(pno,where);
    }
    getlist(1);
    $('.Apl_Class').on("click","ul>li:not(:first-child)",function(){
        var $li = $(this);
        $li.addClass('active').siblings().removeClass('active');
        condition(1);
    });
    $('.content_list>ul').on("click","li",function(){
        var $li = $(this);
        if(!($li.hasClass('disabled')||$li.hasClass('active'))){
            var pno = 1;
            if($li.children('a').html()=='下一页'){
               pno = parseInt($li.siblings('.active').next().children('a').html());
            }else if($li.children('a').html()=='上一页'){
                pno = parseInt($li.siblings('.active').prev().children('a').html());
            }else{
                pno = parseInt($li.children('a').html());
            }
            condition(pno);
        }
    });
    $('.shop_list').on("click",".shop",function(){
        $(this).next().show();
    });
    $('.shop_list').on("click",".close",function(){
        $(this).parent().hide();
    });
    $('.shop_list').on("click",".car",function(){
        var cid = $(this).data('cid');
        $.ajax({
            type:'get',
            url:'http://127.0.0.1:8888/user/islogin',
            dataType:'json',
            success:function(res){
                var {code,uname} = res;
                if(code==1){
                    alert('加入成功!');
                    $('.message').hide();
                    $.ajax({
                        type:'get',
                        url:'http://127.0.0.1:8888/product/add',
                        data:{uname,cid}
                    });
                }else if(code==-1){
                    alert('请先登录');
                    location.href="http://127.0.0.1:8888/login.html?back="+location.href;
                }
            }
        })
    });
});