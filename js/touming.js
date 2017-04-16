window.onload=function(){
	var bannerbox=$(".bannerbox")[0];
	var lis=$("li",bannerbox);
	var num=0;
	setInterval(function(){
		num++;
        if(num>=lis.length){
          num=0;
        }
		for(var i=0;i<lis.length;i++){
			lis[i].style.opacity=0;
		}
		animate(lis[num],{opacity:1},1000);
	},3000)
}