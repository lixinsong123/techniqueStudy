window.onload=function(){
			/*根据可视区获取高度*/
			var P_height=document.documentElement.clientHeight;
			var parent = document.getElementById("parent");
			parent.style.height=(P_height-124)+"px"
			/*手指控制*/
			var finger_controller =document.getElementById("finger_controller");
			var finger =document.getElementById("finger");
			// finger_controller.addEventListener("mouseover",function(){
			// 	finger.style.display="block";
			// });
			var $circuit_card  =$(".circuit_card");

			var $outside =	$(".outside");
			var $inside  =	$(".inside");

			finger_controller.onmouseover=function(){
				finger.style.display="block";
			}
			finger_controller.onmouseout=function(){
				finger.style.display="none";
			}
			var Timer=null;
			var t =false;
			finger_controller.onclick=function(){
				
				if(t==true){
					return;
				}
				t=true;
				clearInterval(Timer);
				$outside.css("animation","outsideMove 300s");
				$inside.css("animation","insideMove 300s")
				 // $circuit_card.animate({"transform":"scale(1)"},2000);
				var sudu=0;
				Timer=setInterval(function(){
					sudu+=0.01;
					$circuit_card.css("transform","scale("+sudu+")");
					if(sudu>=1){    
						clearInterval(Timer);
						setTimeout(function(){
							window.location.href='home.html';
						},500)
						t=false;
						
					}
				},13);
			}

		 

		}