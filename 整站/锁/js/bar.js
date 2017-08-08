/*關閉運動*/
  $(function(){

 			/*bar的运动*/
 			var oCss  =document.getElementById("css");
			/*随着窗口变化改变bar容器的大小*/
			var bar_wrap=document.getElementById("wrap");
			setClientWidth();
 			window.onresize = function () {
 				setClientWidth();
 			}
 			function setClientWidth(){
 				var document_clientWidth=document.documentElement.clientWidth;
 				// if(document_clientWidth>1200){
				bar_wrap.style.width=document_clientWidth+"px";
 				// }
 			}

 			var OpicList = document.getElementById("picList");
 			var oli  ="";
			
 			var ocss  ="";
 			var zIndex=0;
 			var liLength = OpicList.clientWidth/32;
 			for(var i=0;i<liLength;i++){
 				oli+='<li>\
 				<a href="###"></a>\
 				<a href="###"></a>\
 				<a href="###"></a>\
 				<a href="###"></a>\
 				<span></span>\
 				<span></span></li>';
 				i>liLength/2?zIndex--:zIndex++;
 				ocss+=".picList>li:nth-of-type("+(i+1)+") a{\
 					background-position:"+-(i*32)+"px 0;\
 				}"
 				ocss+=".picList>li:nth-of-type("+(i+1)+"){\
 					z-index: "+zIndex+"\
 				}"

 			}
 			OpicList.innerHTML=oli;
 			oCss.innerHTML+=ocss;
 			var controller =document.getElementById("controller");
 			var oBtns   =controller.getElementsByTagName("li");
 			var oB_Li   =OpicList.children;
 			/*自动运动索引*/
 			var bar_index=0;
 			 oBtns[bar_index]
 			var bar_Timer=null;
			
 			bar_Timer=setInterval(bar_move,10000);
 			bar_Timer2=null;
 			function bar_move(){
 				bar_index++;
 				if(bar_index==oBtns.length){
 					bar_index=0;
 				}
 				for(var j=0;j<oB_Li.length;j++){
 					oB_Li[j].style.WebkitTransform="rotateX(-"+bar_index*90+"deg)";
 					oB_Li[j].style.WebkitTransition ="0.5s "+j*50+"ms";
 				}
 				for(var w=0;w<oBtns.length;w++){
 							oBtns[w].classList.remove("active");
 				}
 					oBtns[bar_index].classList.add("active");
 			}
			
 			/*点击后运动*/
 			for(var i=0;i<oBtns.length;i++){
 				(function(a){
 					oBtns[a].onclick=function(){
 						clearInterval(bar_Timer);
 						clearInterval(bar_Timer2);
 						bar_index=a;
 						for(var w=0;w<oBtns.length;w++){
 							oBtns[w].classList.remove("active");
 						}
 						this.classList.add("active");
 						for(var j=0;j<oB_Li.length;j++){
 							oB_Li[j].style.WebkitTransform="rotateX(-"+a*90+"deg)";
 							oB_Li[j].style.WebkitTransition ="0.5s "+j*50+"ms";
 						}
 						bar_Timer2=setTimeout(function(){
 							bar_Timer=setInterval(bar_move,10000);
 						},5000);
 					}
 				})(i);
 			}


 })
