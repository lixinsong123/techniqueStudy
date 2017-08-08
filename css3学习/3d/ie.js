$(function(){
	var picList =$(".picList");
	/*索引值*/
	var index=0;
	/*每个图片的大小*/
	var pic_width =$(".picList a").width();
	/*自动运动*/
	picList.Timer=setInterval(automatic,5000);
	/*点击运动控制*/
	var controller = $(".controller li");
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
})