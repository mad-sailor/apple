$(function(){
    $(".l-container>ul.clear").on("click",'li',function(){
        var $li=$(this);
        if(!$li.hasClass("active")){
            $li.addClass("active").siblings().removeClass("active");
            var i = $li.index();
            if(i==0){
                $li.parent().next().show().next().hide();
            }else if(i==1){
                $li.parent().next().hide().next().show();                
            }
        }
    });
    $('#btn-login').click(function(){
        var uname = $('#uname').val();
        var upwd = $('#upwd').val();
        var reg=/^[a-zA-Z][a-zA-Z0-9]{2,8}$/;
        if(!reg.test(uname)){
            alert("用户名格式错误!");
            return;
        }
        var reg=/^[a-zA-Z0-9]{6,16}$/;
        if(!reg.test(upwd)){
            alert("密码格式错误!");
            return;
        }
        $.ajax({
            type:'get',
            url:'http://127.0.0.1:8888/user/login',
            data:{uname,upwd},
            dataType:'json',
            success:function(res){
                var {code,msg} = res;
                if(code==1){
                    alert(msg);
                    if(location.search.slice(6)==""){
                        location.href="index.html";
                    }else{
                        location.href = location.search.slice(6);
                    }
                }else{
                    alert(msg);
                }
            }
        })
    });
    $('#agree').click(function(){
        var $ckb = $(this);
        var isagree = $ckb.prop('checked');
        if(isagree){
            $('#btn-reg').removeClass('disabled');
        }else{
            $('#btn-reg').addClass('disabled');
        }
    });
    $('#btn-reg').click(function(){
        var $btn = $(this);
        if(!$btn.hasClass('disabled')){
            var uname = $('#r-uname').val();
            var upwd = $('#r-upwd').val();
            var cpwd = $('#c-upwd').val();
            var email = $('#email').val();
            var reg=/^[a-zA-Z][a-zA-Z0-9]{2,8}$/;
            if(!reg.test(uname)){
                alert("用户名格式错误!");
                return;
            }
            var reg=/^[a-zA-Z0-9]{6,16}$/;
            if(!reg.test(upwd)){
                alert("密码格式错误!");
                return;
            }
            if(upwd!==cpwd){
                alert("两次密码不一致!");
                return;
            }
            var reg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
            if(!reg.test(email)){
                alert("邮箱格式错误!");
                return;
            }
            $.ajax({
                type:'get',
                url:'http://127.0.0.1:8888/user/register',
                data:{uname,upwd,email},
                dataType:'json',
                success:function(res){
                    var {code,msg} = res;
                    if(code==1){
                        alert('注册成功!');
                        location.reload();
                    }else{
                        alert(msg);
                   }
                }
            });
        }
    });
})