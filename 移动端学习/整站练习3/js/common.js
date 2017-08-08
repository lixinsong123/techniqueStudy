$(function(){
	var a =getRem();
	var rem =document.documentElement.style.fontSize = a / 15+ 'px';
	//根据可视区高度得到body的高度
	$("body").css("height",$(window).height());
	 createSwiper();
	 //首页对象
	 var home= new Dialog();
	 home.init({
	 	logo:"logo_content",
	 }); 
	 //泡泡对象
	 var paopao1 = new Paopao();
	 paopao1.init({});
	  var paopao2 = new Paopao();
	 paopao2.init({src:"images/paopao2.png",left:200,transition:2});
	  var paopao3 = new Paopao();
	 paopao3.init({src:"images/paopao3.png",left:300,transition:5});
	  var paopao4 = new Paopao();
	 paopao4.init({src:"images/paopao4.png",left:400,transition:7});

	 console.log(paopao1);
})
function Dialog(){
			this.mark=null;
			this.obj = null;
			this.settings={//默认参数
					logo:""
			};		
}
Dialog.prototype.init=function(options){
	fn_extends(this.settings,options);
	 if(this.settings.logo){
	 	this.logo=$(".logo_content");
	 	this.setContent();
	}
}
Dialog.prototype.setContent=function(){
	
	var ceshi =this.logo.find("p");
	var length =ceshi.length;
	var This =this;
	var i  =1;
	fn_logo(ceshi.eq(0),This.arr_json[0]);
	var Timer=setInterval(function(){
		
		fn_logo(ceshi.eq(i),This.arr_json[i]);
		i++;
		if(i>=length){
			clearInterval(Timer);
		}
	},1500);
}
Dialog.prototype.arr_json={
	0:"公司主营指纹识别及摄像",
	1:"监控系列产品的全球营销,",
	2:"致力于生物识别技术在全",
	3:"球的推广应用及产业化的",
	4:"发展。"
}


function Paopao(){
	this.settings={//默认参数
					src:"images/paopao.png",
					scale:1,
					translateY:100,
					left:0,
					transition: 10
			};	
}
Paopao.prototype.move=function(){
	var This = this;
	setTimeout(function(){
		This.img.style.transform = "translateY("+(-$(window).height())+"px)";
		This.delete();
	},500);
}
Paopao.prototype.init=function(options){
	fn_extends(this.settings,options);
	this.create();
}
Paopao.prototype.delete=function(){
	var This = this;
	setTimeout(function(){
		document.body.removeChild(This.img );
	},This.settings.transition*1000);
}
Paopao.prototype.create=function(){
	this.img = document.createElement("img");
	this.img .className="paopao";
	this.img.style.transform = "scale("+this.settings.scale+")";
	this.img.style.left =this.settings.left+"px";
	this.img.style.transition=this.settings.transition+"s";
	this.img.style.transform = "translateY("+this.settings.translateY+"px)";
	this.img.src =this.settings.src;
	document.body.appendChild(this.img );
	this.move();
}





//logo内容的效果
function fn_logo(obj,arr,endfn){
	obj =obj[0];
	var newarr =arr.split("");
	var length =arr.length;
	var i =0;
	var Timer=null;
	Timer=setInterval(function(){
		obj.innerHTML+=newarr[i];
		i++;
		if(i>=length){
			clearInterval(Timer);
			endfn&&endfn();
		}
	},120);
		
}
//从父级获取到属性及值，动态追加到子级。
function fn_extends(son,parent){
	for(var arr in parent){
		son[arr]  =parent[arr];
	}
}
//创建分屏对象
function createSwiper(){
	 var mySwiper = new Swiper ('.swiper-container', {
		    direction: 'vertical',
		  });
}
function getRem(){
	return document.documentElement.getBoundingClientRect().width;
}