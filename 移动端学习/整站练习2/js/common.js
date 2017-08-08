$(function(){
	var a =getRem();
	var rem =document.documentElement.style.fontSize = a / 15+ 'px';
	//根据可视区高度得到body的高度
	$("body").css("height",$(window).height());
	
	barDraw_Move();
	fn_score();
	fn_load(function(){
		bar_Move();
	});
	
})
function getRem(){
	return document.documentElement.getBoundingClientRect().width;
}
/*欢迎页面*/
function fn_load(end_fn){
	var welcome = $(".welcome");
	var iTime   = new Date().getTime();
	var arr =["img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg","img/5.jpg","img/star.png"];
	var bTime=false;
	var bImaLoad=false;
	var iTimer = null;
	/*根据时间和图片加载完判断是否开始跳转*/
	
	iTimer = setInterval(function(){
		var a =new Date().getTime();
		if(new Date().getTime()-iTime>=5000){
			bTime=true;
		}
		if(bTime&&bImaLoad){
			clearInterval(iTimer);
			welcome.bind("webkitTransitionEnd",fn_end);
			welcome.css("opacity","0");
			end_fn&&end_fn();
			//使用transitionend 
			//setTimeout(function(){welcome.removeClass("pageShow");},1000);	
		}
	},1000);
	/*图片资源预先加载*/
	var oImage = new Image();
	for(var i=0;i<arr.length;i++){
		oImage.src=arr[i];
		oImage.onload=function(){
			//alert("图片已加载完毕");
			bImaLoad=true;
		}
	}
	function fn_end(){
		welcome.removeClass("pageShow");
	}
}
/*bar移动*/
function barDraw_Move(){
	var tabBar = $(".tabBar");
	tabBar.bind("touchstart",fn_barTouchstart);
	tabBar.bind("touchmove",fn_barTouchmove);
	tabBar.bind("touchend",fn_barTouchend);
	var disX=0;
	var startX=0;
	var iX=0;
	function fn_barTouchstart(ev){
		clearInterval(bar_list.iTimer);
		 bar_list.css("webkitTransition","none");
		ev =ev.originalEvent.changedTouches[0];
		disX =ev.pageX;
		//console.log(disX);
		//startX=iX; 
	}
	function fn_barTouchmove(ev){
		ev =ev.originalEvent.changedTouches[0];
		var pageX =ev.pageX-disX;
		iX = pageX+startX;
		console.log(startX);
		bar_list.css("WebkitTransform","translateX("+iX+"px)");
	}
	function fn_barTouchend(ev){
		bar_list.css("webkitTransition","1s");
		 index =iX/tabBar.width();
		 index = -Math.round(index);
		 if(index<0){
		 	index=0;
		 }else if(index>=5){
		 	index=4;
		 }
		 startX=-640*index;
		 //console.log(startX);
		 //console.log(index);
		bar_list.css("WebkitTransform","translateX("+startX+"px)");
		nav_controller.eq(index).addClass("active").siblings().removeClass("active");
		p.text(arr[index]);
		bar_Move();
	}

}
var index=0;
var bar_list=null;
var nav_controller=null;
var p =null;
var arr=null;
function bar_Move(){
	 arr=["成都九寨沟景区","若帆之阁","长春仙馆","松陵酒家","夹镜鸣琴"];
	 bar_list = $(".bar_list");
	 bar_list.css("webkitTransition","2s");
	 nav_controller =$(".nav_controller").find("a");
	 p =$(".barMask").find("p");
	 index  =1;
	bar_list.iTimer=setInterval(function(){
		bar_list.css("WebkitTransform","translateX("+-640*index+"px)");
		nav_controller.eq(index).addClass("active").siblings().removeClass("active");
		p.text(arr[index]);
		index++;
		index=index%5;
	},5000);
}
/*星星评分*/
function fn_score(){
	var oA = $(".score a");
	oA.click(function(){
		var son =$(this).parent().find("a");
		for(var i=0;i<son.length;i++){
			son.eq(i).removeClass("active");
		}
		var index = $(this).index();
		for(var i=0;i<=index;i++){
			son.eq(i).addClass("active");
		}
		//alert($(this).index());
	});
}
