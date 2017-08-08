/*
	my js的库
*/
//获取和设置transform中的值
function cssTransform(element, attr, val){
	if(!element.transform){
		element.transform = {};
	}	
	if(typeof val === "undefined"){ 
		if(typeof element.transform[attr] === "undefined"){
			switch(attr){
				case "scale":
				case "scaleX":
				case "scaleY":
				case "scaleZ":
					element.transform[attr] = 100;
					break;
				default:
					element.transform[attr] = 0;	
			}
		} 
		return element.transform[attr];
	} else {
		element.transform[attr] = val;
		var transformVal  = "";
		for(var s in element.transform){
			switch(s){
				case "scale":
				case "scaleX":
				case "scaleY":
				case "scaleZ":
					transformVal += " " + s + "("+(element.transform[s]/100)+")";
					break;
				case "rotate":
				case "rotateX":
				case "rotateY":
				case "rotateZ":
				case "skewX":
				case "skewY":
					transformVal += " " + s + "("+element.transform[s]+"deg)";
					break;
				default:
					transformVal += " " + s + "("+element.transform[s]+"px)";				
			}
		}
		element.style.WebkitTransform = element.style.transform = transformVal;
	}
}
//获取元素的绝对top值
		function getTop(obj){
			var iTop = 0;
			while(obj){
				iTop+= obj.offsetTop;
				obj  = obj.offsetParent;
			}
			return iTop;
		}
//拖拽函数函数封装（需拖拽的对象）
function drag(obj){
			obj.onmousedown=function(ev){
				var ev = ev||window.event;
				//console.log(ev);
				var disX  = ev.clientX-this.offsetLeft;
				var disY  = ev.clientY-this.offsetTop;
				if(obj.setCapture){
					obj.setCapture();
				}
				document.onmousemove=function(ev){
					var ev = ev||window.event;
					var x = ev.clientX-disX;
					var y = ev.clientY-disY;
					//磁性吸附=_=
					if(x<100){
						x=0;
					}
					obj.style.left=x+"px";
					obj.style.top = y+"px";
				}
				document.onmouseup=function(){
					document.onmousemove=document.onmouseup=null;
					if(obj.releaseCapture){
						obj.releaseCapture();
					}
				}
				return false;
			}
}
//随机产生n个从x-y中不重复的整数
function check(n,x,y){
	var num=[];
	for(var i=0;i<n;i++){
		num[i]=Math.ceil(Math.random()*(y-x)+x);
		for(var j=0;j<num.length-1;j++){
			if(num[j]===num[++j]){
				num.splice(j,1);
				n++;
			}
		}
	}
	//alert(num.length);
	return num;
}
//返回一个X-Y之间的随机数
function stochastic(x,y){
	//四舍五入和0-1之间的随机数
	return Math.round(Math.random()*(y-x)+x);
}
//需要检测的标签对象-->检测标签中的内容是否全部都是数字(仅对与input标签)
function check(obj){		
		var text = obj.value;
		//var judge=true;
	for(var i=0;i<text.length;i++){
				//alert(text.charCodeAt(i)>57);
		if(text.charCodeAt(i)>57||text.charCodeAt(i)<48){
			//judge=false;
			return false;
		}
	}
			/*
			if(panduan==false){
				alert("这不是一串数字");
			}*/
			//改进-->简单明了
			//return judge==false? false: true;
	return true;
}
//透明函数,对象，速度，目标点,改变频率,回调函数
function diaphaneity(obj,speed,target,rate,enfn){
	var setTime =null;
	var target=target;
	speed = parseFloat(getStyle(obj,'opacity'))*100<target?speed:-speed;
	setTime=setInterval(function(){

		//console.log(parseFloat(getStyle(obj,'opacity'))*100);
		var extent=parseFloat(getStyle(obj,'opacity'))*100+speed;//改变后的透明度
		obj.style.opacity=extent*0.01+"";
		if(parseFloat(getStyle(obj,'opacity'))*100===target){
			obj.style.opacity=target*0.01+"";
			clearInterval(setTime);
			enfn&&enfn();
		}

	},rate);
}
//需要抖动的对象，抖动的频率,帧数,方向,初始位置
function shake(obj,rate,frame,att,size){
		var arr=[];
		var setTime=null;
		for(var i=rate;i>0;i-=frame){
			arr.push(i,-i);
		}
		arr.push(0);
		var index=0;
		var setdu=parseInt(size);//有问题的,待解决。
		console.log(setdu);
			setTime=setInterval(function(){
			if(index>=arr.length){
					index=0;
					clearInterval(setTime);
					setTime=null;
			}else{
					setdu=setdu+arr[index];
					obj.style[att]=setdu+"px";
					index++;
				}
			},50);
	}

//增强版运动---->时间版运动
function timeMove(obj,json,times,fx,endfn){
	/*
Tween公式
4个参数
t：current  time（当前时间）
b：beginning  value（初始值）
c： change  in  value（变化量）
d：duration（持续时间）
return  （目标点）
*/

var Tween = {
	linear: function (t, b, c, d){  //匀速
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){  //加速曲线
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){  //减速曲线
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){  //加速减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){  //加加速曲线
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){  //减减速曲线
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 3.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
}
	
	if( typeof times == 'undefined' ){
		times = 400;
		fx = 'linear';
	}
	
	if( typeof times == 'string' ){
		if(typeof fx == 'function'){
			fn = fx;
		}
		fx = times;
		times = 400;
	}
	else if(typeof times == 'function'){
		fn = times;
		times = 400;
		fx = 'linear';
	}
	else if(typeof times == 'number'){
		if(typeof fx == 'function'){
			fn = fx;
			fx = 'linear';
		}
		else if(typeof fx == 'undefined'){
			fx = 'linear';
		}
	}
	
	var iCur = {};
	
	for(var attr in json){
		iCur[attr] = 0;
		
		if( attr == 'opacity' ){
			iCur[attr] = Math.round(getStyle(obj,attr)*100);
		}
		else{
			iCur[attr] = parseInt(getStyle(obj,attr));
		}
		
	}
	
	var startTime = getTime();
	
	clearInterval(obj.timer);
	
	obj.timer = setInterval(function(){
		
		var changeTime = getTime();
		
		var t = times - Math.max(0,startTime - changeTime + times);  //0到2000
		
		for(var attr in json){
			
			var value = Tween[fx](t,iCur[attr],json[attr]-iCur[attr],times);
			
			if(attr == 'opacity'){
				obj.style.opacity = value/100;
				obj.style.filter = 'alpha(opacity='+value+')';
			}
			else{
				obj.style[attr] = value + 'px';
			}
			
		}
		
		if(t == times){
			clearInterval(obj.timer);
			// if(fn){
			// 	fn.call(obj);

			// }
			endfn&&endfn();
		}
		
	},13);
}
//获取时间
function getTime(){
		return (new Date()).getTime();
}
//改进版运动函数------->缓冲运动
function startMove(obj,json,endfn){
					 clearInterval(obj.setTime);
					 var iCur =0;
					 obj.setTime=setInterval(function(){
					 	var kaiguan = true;
					 	var dir;
					   for(var attr in json){
						 	if(attr=='opacity'){
						 	 	iCur =Math.round(getStyle(obj,'opacity')*100);
						 	}else{
						 		 iCur =parseInt(getStyle(obj,attr));
						 		 		
						 	}
						 	dir = (parseInt(json[attr])-iCur)/8;
						 	dir = dir>0?Math.ceil(dir):Math.floor(dir);					 	
						 	if(iCur!=parseInt(json[attr])){
						 		kaiguan=false;
						 		if(attr=='opacity'){
							 		obj.style.opacity=(iCur+dir)/100;
							 		obj.style.filter='alpha(opacity='+(iCur+dir)+')';
						 		}else{
						 			obj.style[attr]=iCur+dir+'px';
						 		}	
						 	}	
						 }
						 if(kaiguan){
						 	clearInterval(obj.setTime);
						 	//回调函数
						 	endfn&&endfn.call(obj);
						 }
					 },30);
					
				}
//让层上下左右移动 ，参数   标签对象，上/下/左/右,终点距离,回调函数 
function doMove ( obj, attr, dir, target, endFn ) {
	var target=target;
	dir = parseInt(getStyle( obj, attr )) < target ? dir : -dir;
	
	clearInterval( obj.timer );
	
	obj.timer = setInterval(function () {
		
		var speed = parseInt(getStyle( obj, attr )) + dir;			// 步长
		
		if ( speed > target && dir > 0 ||  speed < target && dir < 0  ) {
			speed = target;
		}
		
		obj.style[attr] = speed + 'px';
		
		if ( speed == target) {
			clearInterval( obj.timer );
			
			/*
			if ( endFn ) {
				endFn();
			}
			*/
			endFn && endFn();
			
		}
		
	}, 50);
}

//获取样式的值
function getStyle ( obj, attr ) { return obj.currentStyle?obj.currentStyle[attr] : getComputedStyle( obj )[attr]; }