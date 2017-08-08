window.onload=function () {

	$(".starButtn").click(function(){
		var w =$(".goods").outerWidth();
		var h =$(".goods").outerHeight();
		$(".mask").css({width:w+"px",height:h+"px"});
		var len=$(".goods").length;
		var steps = len * 8 + parseInt(Math.random()*len);
		var index =0;
		var pos={};
		console.log(steps);
		var mapArr =[0,1,2,4,7,6,5,3]
		var dis  =parseInt(steps/4);
		for (var i = 0; i < steps; i++) {
			if(index>=len){
				index=0;
			}
			pos=$(".goods").eq(mapArr[index]).position();
			$(".mask").animate({left:pos.left+"px",top:pos.top+"px"},50*Math.abs(i-dis)/10);
			index++;
		};
	})
}