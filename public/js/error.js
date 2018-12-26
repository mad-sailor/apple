window.onclick=function(){
    document.onmousemove=function(e){
        var leftEye=document.getElementById("eye1");
        if(leftEye.classList.contains('eye-left-animation')){
            leftEye.classList.remove('eye-left-animation');
        }
        var rightEye=document.getElementById("eye2");
        if(rightEye.classList.contains('eye-right-animation')){
            rightEye.classList.remove('eye-right-animation');
        }

        var x=e.clientX;
        var y=e.clientY;
        var body=document.body;
        html=document.documentElement;

        var centerY=(Math.max(body.scrollHeight,body.offsetHeight,html.clientHeight,html.scrollHeight,html.offsetHeight))/2.0;
        var centerX=(Math.max(body.scrollWidth,body.scrollWidth,html.clientWidth,html.clientWidth))/2.0;
        
        var left = (((x - centerX) / (centerX * 2)) * (18)) + 15;
		var right = (((x - centerX) / (centerX * 2)) * (-18)) + 15;
		var top = (((y - centerY) / (centerY * 2)) * (30)) + 30;
       
        leftEye.style.left = left+"%";
        rightEye.style.right = right+"%";
        leftEye.style.top = top + "%";
		rightEye.style.top = top + "%";
        
    }
}