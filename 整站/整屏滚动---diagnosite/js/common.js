/*组件化开发*/
/*创建一个工具对象*/
var toolObj={};
toolObj.timeScroll=null;//整屏切换动画的实例
toolObj.currentState="scrollState1";
//初始化配置
toolObj.init = function(){
	toolObj.resize();//设置每一屏的高度和top值
	toolObj.events();//事件初始化
	toolObj.configIntAnimate();//导航条的动画初始化
	$("body").height(8500);
	toolObj.button3D(".start",".state1",".state2",0.3);//3d翻转动画
	toolObj.configTimeScroll();//整屏切换的动画以及每一屏中的小动画
	//$("html,body").scrollTop(0);
	twoAnimate.init();//配置第二屏的动画
	threeAnimate.init();//配置第三屏的动画
}
/*jquery的初始化*/
$(document).ready(toolObj.init);
/*配置事件*/
toolObj.events=function(){
	/*窗口改变事件*/
	$(window).resize(toolObj.resize);
	toolObj.nav();//调用nav的动画
	//清楚浏览器默认滚动行为
	$(".wrapper").bind("mousewheel",function(ev){
		ev.preventDefault();
	});
	/*把浏览器的滚动条拉回top*/
	$(window).bind("scroll",scrollFn);
	function scrollFn(){
		$(window).scrollTop(0);
	}
	//在滚动条滚动的过程中，计算页面中应该到哪一个点上去
	$(window).bind("scroll",toolObj.scrollStatus);
	$(window).bind("mousedown",function(){
		$(window).unbind("scroll",scrollFn);
	})
	$(window).bind("mouseup",toolObj.fn_mouseup);
	$(".wrapper").one("mousewheel",fn_mouseWheel);
	$(".wrapper").timer=null;
	function fn_mouseWheel(ev){
		$(window).unbind("scroll",scrollFn);
		if(ev.deltaY>=1){
			console.log("上");
			//var ceshi = toolObj.timeScroll.getLabelBefore();
			//toolObj.timeScroll.tweenTo(ceshi);
			toolObj.fn_changeState("prve");
		}else{
			//console.log("下");
			//var ceshi = toolObj.timeScroll.getLabelAfter();
			//toolObj.timeScroll.tweenTo(ceshi);
			toolObj.fn_changeState("next");
		}
		/*管理滚轮间隔时间----->优化*/
		clearInterval($(".wrapper").timer);
		$(".wrapper").timer=setTimeout(function(){
			$(".wrapper").one("mousewheel",fn_mouseWheel);
		},1200);
	}
}
/*切换整屏且计算滚动条的距离*/
toolObj.fn_changeState=function(value){

	if(value==="next"){
		//获取当前状态的时间
		var currentTime =toolObj.timeScroll.getLabelTime(toolObj.currentState);
		//获取下一个状态
		var nextCurrent  =toolObj.timeScroll.getLabelAfter(currentTime);
		if(nextCurrent==null){
			return;
		}
		//记录新的状态
		toolObj.currentState=nextCurrent;
		//主体移动
		//toolObj.timeScroll.tweenTo(nextCurrent);
		//滚动条的移动
		toolObj.fn_Scrllo(nextCurrent)

	}else if(value==="prve"){
		//获取当前状态的时间
		var currentTime =toolObj.timeScroll.getLabelTime(toolObj.currentState);
		//获取上一个状态
		var prveCurrent  =toolObj.timeScroll.getLabelBefore(currentTime);
		if(prveCurrent==null){
			return;
		}
		//记录新的状态
		toolObj.currentState=prveCurrent;
		//toolObj.timeScroll.tweenTo(prveCurrent);
		toolObj.fn_Scrllo(prveCurrent)
	}
	
}
/*滚动条滚动函数*/
toolObj.fn_Scrllo=function(obj){
		//获取动画的总时长
		var totalTime =toolObj.timeScroll.totalDuration();
		//获取下一状态的时间
		var newTime  = toolObj.timeScroll.getLabelTime(obj);
		//获取滚动条能够滚动的最大宽度
		var MaxScrollH = $("body").height()-$(window).height();
		//滚动条滚动的距离
		var positionY  = newTime/totalTime*MaxScrollH;
		//滚动条持续的时间
		var dTime  = Math.abs(toolObj.timeScroll.time()-newTime);
		var SrollAnimate = new TimelineMax();
		SrollAnimate.to($("html,body"),dTime,{"scrollTop":positionY});
}

/*配置整屏切换的动画以及每一屏中的小动画*/
toolObj.configTimeScroll = function(){

	var time = toolObj.timeScroll?toolObj.timeScroll.time():0;
	if(toolObj.timeScroll){
		toolObj.timeScroll.clear();
	}
	toolObj.timeScroll = new TimelineMax();
	/*第二屏切换到第一屏的时候，让第二屏的动画时间点归为0*/
	toolObj.timeScroll.to($(".scene1"),0,{onReverseComplete:function(){
		twoAnimate.timeLine.seek(0,false);
	}},0);

	toolObj.timeScroll.add("scrollState1");
	toolObj.timeScroll.to({},0.1,{onComplete:function(){
			menu.changeMenu("menu_state2");
	},onReverseComplete:function(){
			menu.changeMenu("");
		}
	},"-=0.2");
	toolObj.timeScroll.to($(".scene2"),0.8,{top:0,ease:Cubic.easeInOut});

	toolObj.timeScroll.to({},0.1,{onComplete:function(){
			twoAnimate.timeLine.tweenTo("twoState1");
	}},"-=0.2");	
	toolObj.timeScroll.add("scrollState2");
		/*-----------主动画中配置第二屏的小动画 start-----------*/
	toolObj.timeScroll.to({},0,{onComplete:function(){
			twoAnimate.timeLine.tweenTo("twoState2");
	},onReverseComplete:function(){
			twoAnimate.timeLine.tweenTo("twoState1");
	}});
	toolObj.timeScroll.to({},0.4,{});
	 	toolObj.timeScroll.add("point1");
	toolObj.timeScroll.to({},0,{onComplete:function(){
			twoAnimate.timeLine.tweenTo("twoState3");
	},onReverseComplete:function(){
			twoAnimate.timeLine.tweenTo("twoState2");
	}});
	toolObj.timeScroll.to({},0.4,{});
	 	toolObj.timeScroll.add("point2");
	toolObj.timeScroll.to({},0,{onComplete:function(){
			twoAnimate.timeLine.tweenTo("twoState4");
	},onReverseComplete:function(){
			twoAnimate.timeLine.tweenTo("twoState3");
	}});
	toolObj.timeScroll.to({},0.4,{});
	 	toolObj.timeScroll.add("point3");
	toolObj.timeScroll.to({},0.1,{onComplete:function(){
			menu.changeMenu("menu_state3");
	},onReverseComplete:function(){
			menu.changeMenu("menu_state2");
		}
	});
	toolObj.timeScroll.to($(".scene3"),0.8,{top:0,ease:Cubic.easeInOut});

	toolObj.timeScroll.to({},0.1,{onComplete:function(){
		threeAnimate.timeLine.tweenTo("threeState1");
	}});	

	toolObj.timeScroll.add("scrollState3");

	toolObj.timeScroll.to({},0,{onComplete:function(){
			threeAnimate.timeLine.tweenTo("threeState2");
	},onReverseComplete:function(){
			threeAnimate.timeLine.tweenTo("threeState1");
	}});
	toolObj.timeScroll.to({},0.4,{});
	 	toolObj.timeScroll.add("step_1");

	toolObj.timeScroll.to($(".scene4"),0.8,{top:0,ease:Cubic.easeInOut});
	toolObj.timeScroll.add("scrollState4");
	toolObj.timeScroll.to($(".scene5"),0.8,{top:0,ease:Cubic.easeInOut});

	toolObj.timeScroll.add("scrollState5");
	toolObj.timeScroll.stop();
	//当浏览器改变大小时，让动画走到之前的位置
	toolObj.timeScroll.seek(time);
}
/*配置导航条的动画*/
toolObj.configIntAnimate=function(){
	var initAnimate = new TimelineMax();
	initAnimate.to(".menu",0.5,{"opacity":"1"});
	initAnimate.to(".menu",0.5,{"left":"22"},"-=0.3");
	initAnimate.to(".nav",0.5,{"opacity":"1"});
	/*设置首屏的动画*/
	initAnimate.to(".scene1_logo",0.3,{"opacity":"1"});
	initAnimate.staggerTo(".scene1_1 img",2,{"opacity":1,"rotationX":0,ease:Elastic.easeOut},.2);
	initAnimate.to(".light_left",0.7,{"rotationZ":"0",ease:Cubic.easeOut},"-=2");
	initAnimate.to(".light_right",0.7,{"rotationZ":"0",ease:Cubic.easeOut},"-=2");
	initAnimate.to(".controls",0.5,{"opacity":"1","bottom":"20"},"-=0.7");
	//开启滚动条
	initAnimate.to("body",0,{"overflow-y":"scroll"});
	//屏幕小于950的时候调出左侧的导航栏
	var left_navAnimate = new TimelineMax();
	$(".btn_mobile").bind("click",function(){
		left_navAnimate.to(".left_nav",0.5,{"left":0});
	});
	$(".l_close").bind("click",function(){
		left_navAnimate.to(".left_nav",0.5,{"left":-300});
	});
}
/*nav的动画*/
toolObj.nav=function(){
	var navAnimate = new TimelineMax();
	$(".nav a").mouseenter(function(){
		navAnimate.clear();
		navAnimate.to(".line",0.3,{"opacity":1,left:$(this).offset().left,"width":$(this).width()});
	});
	$(".nav a").mouseleave(function(){
		navAnimate.clear();
		navAnimate.to(".line",0.3,{"opacity":0});
	});
	var lgAnimate=new TimelineMax();
	$(".language").mouseenter(function(){
		lgAnimate.clear();
		lgAnimate.to(".dropdown",0.3,{"opacity":1,"display":"block"});
	});
	$(".language").mouseleave(function(){
		lgAnimate.clear();
		lgAnimate.to(".dropdown",0.3,{"opacity":0,"display":"none"});
	});
}
//通用的3d翻转动画
//父级,正面，反面，持续时间
toolObj.button3D=function(obj,front,con,time){
	var button3DAnimate = new TimelineMax();
	button3DAnimate.to($(obj).find(front),0,{"rotationX":0,transformPerspective:600,transformOrigin:"center bottom"});
	button3DAnimate.to($(obj).find(con),0,{"rotationX":-90,transformPerspective:600,transformOrigin:"top center"});

	//给父级添加事件
	$(obj).bind("mouseenter",function(){
		var ele1 = $(this).find(front);
		var ele2   = $(this).find(con);
		var enterAnimate = new TimelineMax();
		enterAnimate.to(ele1,time,{"rotationX":90,top:-ele1.height(),ease:Cubic.easeInOut},0);
		enterAnimate.to(ele2,time,{"rotationX":0,top:0,ease:Cubic.easeInOut},0);
	});
	$(obj).bind("mouseleave",function(){
		var ele1 = $(this).find(front);
		var ele2   = $(this).find(con);
		var leaveAnimate = new TimelineMax();
		leaveAnimate.to(ele1,time,{"rotationX":0,top:0,ease:Cubic.easeInOut},0);
		leaveAnimate.to(ele2,time,{"rotationX":-90,top:ele2.height(),ease:Cubic.easeInOut},0);
	})
}
//设置每一屏的高度和top值
toolObj.resize=function(){

	$(".scene").css("height",$(window).height());
	/*
	var div =$(".wrapper").find(".scene");
	for(var i=1;i<div.length;i++){
		div.eq(i).css("top",$(window).height());
	}*/
	//优化
	$(".scene:not(':first')").css("top",$(window).height());
	if($(window).width()<=950){
		$("body").addClass("r950");
		$(".menu").css("top",0);
	}else{
		$("body").removeClass("r950");
		$(".menu").css("top",22);
	}

	toolObj.configTimeScroll();
}
//计算滚动条在滚动过程中的一个比例
toolObj.scrollScale=function(){
	var scrollT =$(window).scrollTop();
	var MaxH    =$("body").height()-$(window).height();
	var  scale  =scrollT/MaxH;
	return scale;
}
//在滚动条滚动的过程中，计算页面中应该到哪一个点上去
toolObj.scrollStatus=function(){
	var times  = toolObj.scrollScale()*toolObj.timeScroll.totalDuration();
	//当滚动条在滚动的过程中,让页面中的动画到达某个时间点。
	toolObj.timeScroll.seek(times,false);
}
toolObj.fn_mouseup=function(){
	//得到当前页面的某个时间点
	var scale = toolObj.scrollScale();
	var times  =scale*toolObj.timeScroll.totalDuration();
	//获取上一个状态和下一个状态
	var prevstate  = toolObj.timeScroll.getLabelAfter(times);
	var nextstate  = toolObj.timeScroll.getLabelBefore(times);
	//获取上一个时间或者下一个时间
	var pervTime   = toolObj.timeScroll.getLabelTime(prevstate);
	var nextTime   = toolObj.timeScroll.getLabelTime(nextstate);
	//获取上下状态与当前状态时间的插值
	var preDvalue  =Math.abs(pervTime-times);
	var nextDvalue =Math.abs(nextTime-times);
	/*
		one: 	scale 0  scrollState1
		two: 	scale 1  scrollState5
		three:  preDvalue<nextDvalue preDvalue
		four:   preDvalue>nextDvalue nextDvalue
		判断是那种状态
	*/
	var state="";
	if(scale===0){
		state="scrollState1";
	}else if(scale===1){
		state="scrollState5";
	}else if(preDvalue<nextDvalue){
		state=prevstate;
	}else{
		state=nextstate;
	}
	//主体运动
	toolObj.timeScroll.tweenTo(state);
	//滚动条移动
	toolObj.fn_Scrllo(state);
	//更新状态
	toolObj.currentState=state;
}
//配置第二屏的动画
var twoAnimate={};
twoAnimate.timeLine = new TimelineMax();
//第二屏动画的实现细节
twoAnimate.init = function(){
	/*第二屏执行动画细节*/
	twoAnimate.timeLine.staggerTo($(".scene2_1 img"),1,{opacity:1,rotationX:0,ease:Elastic.easeInOut});
	twoAnimate.timeLine.to($(".points"),0.5,{bottom:22},"-=1");
	twoAnimate.timeLine.to($(".scene2 .point0 .text"),0.1,{opacity:1});
	twoAnimate.timeLine.to($(".scene2 .point0 .point_icon"),0,{"background-position":"right top"});
	twoAnimate.timeLine.add("twoState1");
	
	twoAnimate.timeLine.staggerTo($(".scene2_1 img"),0.2,{opacity:0,rotationX:90},0);

	twoAnimate.timeLine.to($(".scene2_2 .left"),0.4,{opacity:1});
	twoAnimate.timeLine.staggerTo(".scene2_2 .right img",0.3,{opacity:1,rotationX:0,ease:Elastic.easeInOut},0,"-=0.4");
	/*第二个按钮*/
	clearSelect();

	twoAnimate.timeLine.to($(".scene2 .point1 .text"),0.2,{opacity:1});
	twoAnimate.timeLine.to($(".scene2 .point1 .point_icon"),0,{"background-position":"right top"},"-=0.2");
	twoAnimate.timeLine.add("twoState2");

	twoAnimate.timeLine.to($(".scene2_2 .left"),0.4,{opacity:0});
	twoAnimate.timeLine.staggerTo(".scene2_2 .right img",0.3,{opacity:0,rotationX:90,ease:Elastic.easeInOut},0,"-=0.4");

	twoAnimate.timeLine.to($(".scene2_3 .left"),0.4,{opacity:1});
	twoAnimate.timeLine.staggerTo(".scene2_3 .right img",0.3,{opacity:1,rotationX:0,ease:Elastic.easeInOut},0,"-=0.4");
	/*第三个按钮*/
	clearSelect();

	twoAnimate.timeLine.to($(".scene2 .point2 .text"),0.2,{opacity:1});
	twoAnimate.timeLine.to($(".scene2 .point2 .point_icon"),0,{"background-position":"right top"},"-=0.2");
	twoAnimate.timeLine.add("twoState3");

	twoAnimate.timeLine.to($(".scene2_3 .left"),0.4,{opacity:0});
	twoAnimate.timeLine.staggerTo(".scene2_3 .right img",0.3,{opacity:0,rotationX:90,ease:Elastic.easeInOut},0,"-=0.4");

	twoAnimate.timeLine.to($(".scene2_4 .left"),0.4,{opacity:1});
	twoAnimate.timeLine.staggerTo(".scene2_4 .right img",0.3,{opacity:1,rotationX:0,ease:Elastic.easeInOut},0,"-=0.4");
	/*第四个按钮*/
	clearSelect();

	twoAnimate.timeLine.to($(".scene2 .point3 .text"),0.2,{opacity:1});
	twoAnimate.timeLine.to($(".scene2 .point3 .point_icon"),0,{"background-position":"right top"},"-=0.2");
	twoAnimate.timeLine.add("twoState4");
	twoAnimate.timeLine.stop();
	function clearSelect(){
		twoAnimate.timeLine.to($(".scene2 .text"),0,{opacity:0});
		twoAnimate.timeLine.to($(".scene2 .point_icon"),0,{"background-position":"left top"});
	}
}
//配置第三屏的动画
var threeAnimate={};
threeAnimate.timeLine = new TimelineMax();
//第三屏动画的实现细节
threeAnimate.init = function(){
	threeAnimate.timeLine.to($(".scene3 .center_align_2 img"),0,{opacity:0,rotationX:-90,transformPerspective:600,transformOrigin:"center center"});
	
	threeAnimate.timeLine.staggerTo($(".step3_1 img"),0.2,{opacity:1,rotationX:0,ease:Cubic.easeInOut},"+=0.1");
	threeAnimate.timeLine.add("threeState1");
	
	threeAnimate.timeLine.to($(".step3_1 img"),0.3,{opacity:0,rotationX:-90,ease:Cubic.easeInOut});
	threeAnimate.timeLine.staggerTo($(".step3_2 img"),0.2,{opacity:1,rotationX:0,ease:Cubic.easeInOut},"+=0.1");
	threeAnimate.timeLine.add("threeState2");
	threeAnimate.timeLine.stop();
}
//实现导航条3D翻转动画
var menu={};
//每滚动一屏的时候，就调用这个函数，函数里面是3D翻转的具体实现细节。
menu.changeMenu = function(stateClass){//参数的作用：切换到某一屏的时候，要传入的class名字
	console.log(stateClass);
	//具体实现3D的翻转效果
	var oldMenu  = $(".menu");
	var newMenu  = oldMenu.clone();
	newMenu.removeClass("menu_state2").removeClass("menu_state3");
	newMenu.addClass(stateClass);
	$(".menu_wrapper").append(newMenu);
	var menuAnimate = new TimelineMax();
	oldMenu.addClass("removeClass");
	menuAnimate.to(newMenu,0,{top:100,rotationX:-90,transformPerspective:600,transformOrigin:"top center"});
	menuAnimate.to(oldMenu,0,{top:22,rotationX:0,transformPerspective:600,transformOrigin:"center bottom"});

	menuAnimate.to(oldMenu,0.3,{top:-55,rotationX:90,ease:Cubic.easeInOut,onComplete:function(){
		$(".removeClass").remove();
	}});
	menuAnimate.to(newMenu,0.3,{top:22,rotationX:0,ease:Cubic.easeInOut},"-=0.3");
	/*重新创建的导航栏动画效果重置了，所以需要重新在赋值一次*/
	toolObj.button3D(".start",".state1",".state2",0.3);
	toolObj.nav();
}