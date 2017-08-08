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

				//获取样式的值
	function getStyle ( obj, attr ){ 
		return obj.currentStyle?obj.currentStyle[attr] : getComputedStyle( obj )[attr];
	}