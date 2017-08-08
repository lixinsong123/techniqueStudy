window.onload=function(){
	clientWidth();
	lunbo();
}
//根据窗口尺寸来设置bar图大小
window.onresize=function(){
 	clientWidth();
 }
 function viewWidth(){
 	return document.documentElement.clientWidth;
 }
function clientWidth(){
	var bar_img =document.querySelector("#bar_img");
	var clientWidth =viewWidth();
	if(clientWidth<1200){
		clientWidth=1200;
	}
	bar_img.style.width=clientWidth+"px";
}

function lunbo(){
	var lunbo_bg = document.querySelector(".lunbo_bg");
	var controllers = document.querySelector(".controller_1").getElementsByTagName("li");
	zd_LB(lunbo_bg,controllers);
	SD_LB(lunbo_bg,controllers);
}
var Timer =null;
var index =0;
function SD_LB(obj,obj2){
	let bg = obj;
	let controllers = obj2;
	for(var i=0;i<controllers.length;i++){
		controllers[i].index=i;
		controllers[i].onmouseover=function(){
			clearInterval(Timer);
			LB_croe(bg,controllers,this.index+1);
			index=this.index;
		}
		controllers.onmouseout=function(){
			Timer = setInterval(function(){
				index++;
				if(index==controllers.length+1){
					index=1;
				}
				LB_croe(bg,controllers,index);
			},4000);
		}
	}
}
function zd_LB(obj,obj2){
	//background: url(../images/about/lunbo_1.jpg)
	let bg = obj;
	let controllers = obj2;
	Timer = setInterval(function(){
		index++;
		if(index==controllers.length+1){
			index=1;
		}
		LB_croe(bg,controllers,index);
	},4000);
}
function  LB_croe(bg,controllers,index){
		bg.style.background="url(images/about/lunbo_"+index+".jpg)";
		bg.style.backgroundSize="cover";
		for(var i=0;i<controllers.length;i++){
				controllers[i].classList.remove("active");
		}
		controllers[index-1].classList.add("active");
}
