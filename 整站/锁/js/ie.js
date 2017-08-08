$(function(){
	/*自适应轮播图未实现。移动距离，图片位置*/
	var picList =$(".picList");
	/*索引值*/
	var index=0;
	/*每个图片的大小*/
	var pic_width =$(".picList a").width();
	/*自动运动*/
	picList.Timer=setInterval(automatic,5000);
	/*点击运动控制*/
	var controller = $(".controller li");
	var pic_width=document.documentElement.clientWidth;
	function automatic(){
		index++;
		if(index==$(".picList a").length){
			index=0;
		}

		picList.animate({"left":-pic_width*index},1000,function(){
			controller.eq(index).addClass("active").siblings().removeClass("active");
		});
	}
	/*点击运动*/
	for(var i=0;i<controller.length;i++){
		controller.eq(i).click(function(){
			clearInterval(picList.Timer);
			clearInterval(picList.Timer2);
			$(this).addClass("active").siblings().removeClass("active");
			//alert($(this).index());
			index=$(this).index();
			picList.animate({"left":-pic_width*$(this).index()},1000);
			picList.Timer2=setTimeout(function(){
				picList.Timer=setInterval(automatic,5000);
			},2000);
		})
	}
	/*随着窗口变化改变bar容器的大小*/
	/*自适应轮播*/
		var maxWidth=1920;
		//var bar_wrap=document.getElementById("wrap");
		setWidth();
 		window.onresize = function () {
 			setWidth();
 		}
 		function setWidth(){

 			var cliWidth =document.documentElement.clientWidth;
 			if(cliWidth>1200){
	 			var newWidth = (cliWidth-maxWidth)/2;
	 				$(".picList a img").css("backgroundPosition",newWidth+"px 0px");	
 			}
 		}
})