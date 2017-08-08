window.onload= function(){
	//bar图的切换
	var bar_parent = getObject("bar_link");
	var bar_ul     = bar_parent.getElementsByTagName("ul")[0];
	var bar_lis    = bar_ul.getElementsByTagName("li");
	var bar_img    = bar_lis[0].getElementsByTagName("img")[0];
	for(var i=0;i<bar_lis.length;i++){
		bar_lis[i].index=i;
		bar_lis[i].onmousemove = function(){
			for(var j=0;j<bar_lis.length;j++){
				bar_lis[j].getElementsByTagName("img")[0].src="images/bar_active_1.png";
			}
			this.getElementsByTagName("img")[0].src="images/bar_active_2.png";
			bar_parent.style.background="url(images/bar_"+(this.index+1)+".png)";
			bar_parent.style.backgroundSize="100%";
			bar_parent.index=this.index;
		}
	}
	bar_parent.setTime=setInterval(fn_bar,3000);
	bar_parent.index=0;
	function fn_bar(){
		for(var j=0;j<bar_lis.length;j++){
				bar_lis[j].getElementsByTagName("img")[0].src="images/bar_active_1.png";
			}
			bar_lis[bar_parent.index].getElementsByTagName("img")[0].src="images/bar_active_2.png";
			bar_parent.style.background="url(images/bar_"+(bar_parent.index+1)+".png)";
			bar_parent.style.backgroundSize="100%";
			bar_parent.index++;
			if(bar_parent.index==3){
				bar_parent.index=0;
			}
	}
	bar_parent.onmousemove=function(){
		clearInterval(bar_parent.setTime);
	}
	bar_parent.onmouseout=function(event){
		bar_parent.setTime=setInterval(fn_bar,3000);
	}
	//业务介绍的动画

	var Referral_ul  =getObject('Referral_controller');
	var Referral_lis =Referral_ul.getElementsByTagName("li");
	var Referral_div =Referral_lis[0].getElementsByTagName("div")[0];
	console.log(Referral_div);
	for(var i=0;i<Referral_lis.length;i++){
		Referral_lis[i].index=i;
		Referral_lis[i].onmouseover=function(){
			startMove(this.getElementsByTagName("div")[0],{'top':'-36px'},10);
			//console.log(this.getElementsByTagName("div")[0]);
		}
		Referral_lis[i].onmouseout=function(){
			startMove(this.getElementsByTagName("div")[0],{'top':'194px'},5);
		}
	}

	//成功案例的动画
	var successful_ul   = getObject("successful_controller");
	var successful_lis  = successful_ul.getElementsByTagName("li");

	var successful_span = successful_lis[0].getElementsByTagName("span")[0];
	var successful_div  = successful_lis[0].getElementsByTagName("div")[0];

	for(var i=0;i<successful_lis.length;i++){
		successful_lis[i].onmouseover=function(){
			startMove(this.getElementsByTagName("span")[0],{'bottom':'-50px'},10);
			startMove(this.getElementsByTagName("div")[0],{'top':'1px'},10)
		}
		successful_lis[i].onmouseout=function(){
			startMove(this.getElementsByTagName("span")[0],{'bottom':'0'},10);
			startMove(this.getElementsByTagName("div")[0],{'top':'-309px'},10)
		}
	}
}

function getObject(id){
	return  document.getElementById(id);
}
//运动函数
function startMove(obj,json,a,endfun){
					 clearInterval(obj.setTime);
					 var iCur =0;
						//console.log(dir);
					 obj.setTime=setInterval(function(){
					 	var kaiguan = true;
					 	var dir;
					   for(var attr in json){
						 	if(attr=='opacity'){
						 	 	iCur =Math.round(getStyle(obj,'opacity')*100);
						 	 	 //dir= iCur>json[attr] ?-dir :dir;		
						 	}else{
						 		 iCur =parseInt(getStyle(obj,attr));
						 		 		
						 	}					 	
						 	if(iCur!=parseInt(json[attr])){
						 		kaiguan=false;
						 		if(attr=='opacity'){
						 			//var a =dir;
						 			dir=iCur>parseInt(json[attr])?-a:a;	
							 		obj.style.opacity=(iCur+dir)/100;
							 		obj.style.filter='alpha(opacity='+(iCur+dir)+')';
							 		//dir=a;
						 		}else{
						 			//var a =dir;
						 			dir=iCur>parseInt(json[attr])?-a:a;
						 			obj.style[attr]=iCur+dir+'px';
						 			//dir=a;
						 		}	
						 	}	
						 }
						 if(kaiguan){
						 	clearInterval(obj.setTime);
						 	endfun&&endfun();
						 }
					 },30);
					
				}

				//获取样式的值
	function getStyle ( obj, attr ){ 
		return obj.currentStyle?obj.currentStyle[attr] : getComputedStyle( obj )[attr];
	}