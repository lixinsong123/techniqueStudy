window.onload=function(){
	var obj = document.getElementById("nav_active");
	var Oli = obj.getElementsByTagName("a");
	for(var i=0;i<Oli.length;i++){
		Oli[i].onclick=function(){
			for(var j=0;j<Oli.length;j++){
				Oli[j].classList.remove("active");
			}
			this.classList.add("active");
		}
	}


	var last_bg = document.getElementById("last_bg").getElementsByTagName("img")[0];
	var last_c  =document.getElementById("last_controller").getElementsByTagName("li");
	//鼠标控制
	var aa_index=0;
	for(var i=0;i<last_c.length;i++){
		last_c[i].index=i;
		last_c[i].onmousemove=function(){
			for(var j=0;j<last_c.length;j++){
				last_c[j].getElementsByTagName("img")[0].src="images/last_y_"+1+".png";
			}
			this.getElementsByTagName("img")[0].src="images/last_y_"+2+".png";
			last_bg.src="images/last_"+(this.index+1)+".jpg";
			aa_index=this.index;
			clearInterval(setTime_o);
		}
		last_c[i].onmouseout = function(){
			setTime_o =setInterval(kk,2000)
		}
	}
	//自动控制
	function kk(){ n
		aa_index=aa_index>2?aa_index=0:aa_index;
		for(var j=0;j<last_c.length;j++){
				last_c[j].getElementsByTagName("img")[0].src="images/last_y_"+1+".png";
		}
		last_c[aa_index].getElementsByTagName("img")[0].src="images/last_y_"+2+".png";
		last_bg.src="images/last_"+(aa_index+1)+".jpg";
		aa_index++;
	}
	var setTime_o =setInterval(kk,2000);


}

