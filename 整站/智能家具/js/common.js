
window.onload=function(){
	var bar =document.getElementById("bar_start");
	var bar_li=bar.getElementsByTagName("li");
	var bar_span = document.getElementById("bar_font");
	var bar_parent=document.getElementById("bar_parent");
	var barTime=null;
	var bar_kg=false;
	//bar移动
	barTime=setInterval(fn_barmove,3000);
	bar_parent.onmousemove=function(){
		if(bar.style.left=='0px'){
			clearInterval(barTime);
		}
	} 
	bar_parent.onmouseout=function(){
		console.log("sss");
		clearInterval(barTime);
		if(bar_kg==false){
			barTime=setInterval(fn_barmove,3000);
		}		
	}
	function fn_barmove(){
		if(bar_kg==true){
			return
		}
		bar_kg=true;
		diaphaneity(bar_span,1,0,10);
		doMove(bar,'left',5,-1920,function(){
			bar.insertBefore(bar_li[0],bar_li[bar_li.length]);
			bar.style.left=0+'px';
			diaphaneity(bar_span,1,100,10);
			bar_kg=false;
		});
	}
	

	//智能家具展示
	var reveal_show =document.getElementById("reveal_show");
	var reveal_parent=reveal_show.getElementsByTagName("div");
	//var reveal_span  = reveal_parent[0].getElementsByTagName("span");
	//var reveal_img   = reveal_span[1].getElementsByTagName("img")[0];
	//父级变换
	//var ceshi = reveal_span[1];
	//子级固定
	//var ceshi2 = reveal_img[0];
	var kaiguan =false;
	var a =0;
	for(var j=0;j<reveal_parent.length;j++){
	var reveal_span  = reveal_parent[j].getElementsByTagName("span");
	var reveal_img   = reveal_span[1].getElementsByTagName("img")[0];
		for(var i=0;i<reveal_span.length;i++){
				reveal_span[i].onmousemove =function(){
					if(kaiguan==true){
						return;
					}
					kaiguan=true;
					fn_BD(this.getElementsByTagName("img")[0],false);
				}
				//console.log(reveal_span[i].getElementsByTagName("img")[0].parentNode);
				reveal_span[i].getElementsByTagName("img")[0].onmouseout =function(){
					clearInterval(timeout);
					fn_BD(this,true);
				}
				
		}
	}
	
	//风格显示
	
	var enquiry_count =document.getElementById("enquiry_count");
	var countSon      =enquiry_count.getElementsByTagName("span");
	var   obj_1 =document.getElementById("jxfg");
	var   obj_2 = document.getElementById("dzhfg");

	var  touch_show = document.getElementById("touch_show");
	var  touch_ul   = touch_show.getElementsByTagName("ul");

	var touch_div   =touch_ul[0].getElementsByTagName("div");
	var touch_div1   =touch_ul[1].getElementsByTagName("div");
	var touch_div2   =touch_ul[2].getElementsByTagName("div");

	obj_2.onclick=function(){
		for(var i=0;i<countSon.length;i++){
			countSon[i].classList.remove("s_active");
		}
		this.classList.add("s_active");
		setTimeout(function(){
			touch_show.style.background="url(images/bar_right.png)";
		},500)
		doMove( touch_div[0], 'top', 2, -81,function(){
			doMove( touch_div[1], 'top', 2, 0)
		});

		doMove( touch_div1[0], 'bottom', 1, -50,function(){
			doMove( touch_div1[1], 'bottom', 1, 0)
		});

		doMove( touch_div2[0], 'bottom', 1, -50,function(){
			doMove( touch_div2[1], 'bottom', 1, 0)
		});
	}
	obj_1.onclick=function(){
		for(var i=0;i<countSon.length;i++){
			countSon[i].classList.remove("s_active");
		}
		this.classList.add("s_active");
		setTimeout(function(){
			touch_show.style.background="url(images/touch_show_1.png)";
		},500)
		doMove( touch_div[1], 'top', 2, -81,function(){
			doMove( touch_div[0], 'top', 2, 0)
		});

		doMove( touch_div1[1], 'bottom', 1, -50,function(){
			doMove( touch_div1[0], 'bottom', 1, 0)
		});

		doMove( touch_div2[1], 'bottom', 1, -50,function(){
			doMove( touch_div2[0], 'bottom', 1, 0)
		});
	}
	//新闻滚动
	var new_scroll=document.getElementById("new_scroll");
	var scrollLis =new_scroll.getElementsByTagName("li");
	var new_time_a=setInterval(function(){
		doMove ( new_scroll, 'top', 1, -79,function(){
			new_scroll.style.top='0px';
	 		new_scroll.insertBefore(scrollLis[0],scrollLis[scrollLis.length]);
		});
	},3000);
	new_scroll.onmousemove=function(){
		clearInterval(new_time_a);
	}

	new_scroll.onmouseout=function(){
		new_time_a=setInterval(function(){
			doMove ( new_scroll, 'top', 1, -79,function(){
				new_scroll.style.top='0px';
		 		new_scroll.insertBefore(scrollLis[0],scrollLis[scrollLis.length]);
			});
			},7000);
	}
	//设计师信息展示
	var  team =document.getElementById("team");
	var  ulParent=team.getElementsByTagName("li");

	var  divParent=document.getElementsByClassName("kkkk");
			var span= divParent[0].getElementsByTagName("span");
			var div= divParent[0].getElementsByTagName("div")[0];
			var divson=div.getElementsByTagName("div")[0];
			var strongSon=div.getElementsByTagName("strong")[0];
			var img= divParent[0].getElementsByTagName("img");
			img[0].onmousemove=function(){
				span[0].style.bottom='-51px';
				span[0].style.display="none";
				doMove ( div, 'height', 8, 387,function(){
					divson.style.display='block';
					shake(divson,20,10,'top',80,function(){
						strongSon.style.display='block';
					});
					
				})
			}
			strongSon.onmousemove=function(){
				span[0].style.bottom='10px';
				divson.style.display='none'
				strongSon.style.display='none';
				doMove ( div, 'height', 8, 0,function(){
					span[0].style.display="block";
				});
			}

			var span1= divParent[1].getElementsByTagName("span");
			var div1= divParent[1].getElementsByTagName("div")[0];
			var divson1=div1.getElementsByTagName("div")[0];
			var strongSon1=div1.getElementsByTagName("strong")[0];
			var img1= divParent[1].getElementsByTagName("img");
			img1[0].onmousemove=function(){
				span1[0].style.bottom='-51px';
				span1[0].style.display="none";
				doMove ( div1, 'height', 8, 387,function(){
					divson1.style.display='block';
					shake(divson1,20,10,'top',80,function(){
						strongSon1.style.display='block';
					});
					
				})
			}
			strongSon1.onmousemove=function(){
				span1[0].style.bottom='10px';
				divson1.style.display='none'
				strongSon1.style.display='none';
				doMove ( div1, 'height', 8, 0,function(){
					span1[0].style.display="block";
				});
			}
			var span2= divParent[2].getElementsByTagName("span");
			var div2= divParent[2].getElementsByTagName("div")[0];
			var divson2=div2.getElementsByTagName("div")[0];
			var strongSon2=div2.getElementsByTagName("strong")[0];
			var img2= divParent[2].getElementsByTagName("img");
			img2[0].onmousemove=function(){
				span2[0].style.bottom='-51px';
				span2[0].style.display="none";
				doMove ( div2, 'height', 8, 387,function(){
					divson2.style.display='block';
					shake(divson2,20,10,'top',80,function(){
						strongSon2.style.display='block';
					});
					
				})
			}
			strongSon2.onmousemove=function(){
				span2[0].style.bottom='10px';
				divson2.style.display='none'
				strongSon2.style.display='none';
				doMove ( div2, 'height', 8, 0,function(){
					span2[0].style.display="block";
				});
			}
			var span3= divParent[3].getElementsByTagName("span");
			var div3= divParent[3].getElementsByTagName("div")[0];
			var divson3=div3.getElementsByTagName("div")[0];
			var strongSon3=div3.getElementsByTagName("strong")[0];
			var img3= divParent[3].getElementsByTagName("img");
			img3[0].onmousemove=function(){
				span3[0].style.bottom='-51px';
				span3[0].style.display="none";
				doMove ( div3, 'height', 8, 387,function(){
					divson3.style.display='block';
					shake(divson3,20,10,'top',80,function(){
						strongSon3.style.display='block';
					});
					
				})
			}
			strongSon3.onmousemove=function(){
				span3[0].style.bottom='10px';
				divson3.style.display='none'
				strongSon3.style.display='none';
				doMove ( div3, 'height', 8, 0,function(){
					span3[0].style.display="block";
				});
			}
		
			
function fn_BD(obj,b){
		obj.style.display='block';
		timeout =setInterval(function(){
			if(b==false){
				 a=a+0.05;
				 obj.style.transform='scale('+a+')';
				 if(a>1){
				 	clearInterval(timeout);
				}
			}else{
				 a=a-0.05;
				 obj.style.transform='scale('+a+')';
				 if(a<0){
				 	clearInterval(timeout);
				 	obj.style.display='none';
				 	kaiguan=false;
				 }
			}
		},20);
	}
	
	
	

}
//需要抖动的对象，抖动的频率,帧数,方向,初始位置
function shake(obj,rate,frame,att,size,enfn){
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
					enfn&enfn();
			}else{
					setdu=setdu+arr[index];
					obj.style[att]=setdu+"px";
					index++;
				}
			},50);
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
		
	}, 10);
}
//获取样式的值
function getStyle ( obj, attr ) { return obj.currentStyle?obj.currentStyle[attr] : getComputedStyle( obj )[attr]; }