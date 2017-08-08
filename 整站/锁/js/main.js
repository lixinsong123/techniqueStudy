$(function(){
	/*关于我们*/
	//电话区的效果
	var rt_left = $(".rt_left");
	var sjx_down   = $(".sjx_down");
	var pull_down  =$(".pull_down");
	var rt_right =$(".rt_right input");
	var sjx_controller=true;
	rt_right.focus(function(){
		$(this).val("");
	})
	rt_right.blur(function(){
		$(this).val("请输入关键字！");
	})
	rt_left.click(function(){
		if(sjx_controller){
			sjx_down.css("-webkit-transform","rotate(180deg)");
			pull_down.css("display","block");
		}else{
			sjx_down.css("-webkit-transform","rotate(0deg)");
			pull_down.css("display","none");
		}
		
		sjx_controller=!sjx_controller;
	})
	/*展示区效果*/
	var concerning_show =$(".concerning .concerning_show li");
	//console.log(concerning_show.eq(1));
	for(var i=0;i<concerning_show.length;i++){
		concerning_show.eq(i).mouseenter(function(){
			// $(this).find("a").removeClass("a_mouseup");
			// $(this).find("a").addClass("a_mouseover");
			removeClass($(this),"a","a_mouseup");
			addClass($(this),"a","a_mouseover");
		});
		concerning_show.eq(i).mouseleave(function(){
			//alert("ss");
			// $(this).find("a").removeClass("a_mouseover");
			// $(this).find("a").addClass("a_mouseup");
			removeClass($(this),"a","a_mouseover");
			addClass($(this),"a","a_mouseup");
		});
	}
	/*新闻咨询效果*/
	var content_skeleton_lis = $(".content_skeleton li a");
	for(var i=0;i<content_skeleton_lis.length;i++){
		content_skeleton_lis.eq(i).mouseenter(function(){
			removeClass($(this),"b","rotate_end");
			addClass($(this),"b","rotate_start");
			$(this).css("backgroundPositionY","-38px");
		});
		content_skeleton_lis.eq(i).mouseleave(function(){
			removeClass($(this),"b","rotate_start");
			addClass($(this),"b","rotate_end");
			$(this).css("backgroundPositionY","-210px");
		});
	}
	/*触摸添加/离开删除函数*/
	function addClass(obj,son_name,className){
		obj.find(son_name).addClass(className);
	};
	function removeClass(obj,son_name,className){
		obj.find(son_name).removeClass(className);
	};

	//新闻滚动效果
	var news_scroll_controller = $(".news_scroll_controller");

	var  news_scroll_Timer=setInterval(fn_newScroll,5000);
	//-webkit-transition:2s;
	var news_scroll_text=4;
	function fn_newScroll(){
		var news_time=600;
		news_scroll_text = news_scroll_text>0?-38:4;
		for(var i=0;i<news_scroll_controller.length;i++){
			news_scroll_controller.eq(i).animate({"top":news_scroll_text},news_time*(i+1));
		}
	}
	/*走不同的点*/
	// var Move_arr_one=[
	// {"top":"-382","left":"-100"},
	// {"top":"-382","left":"201"},
	// {"top":"-382","left":"502"},
	// {"top":"-382","left":"809"}];
	// var Move_arr_two=[
	// {"top":"0","left":"0"},
	// {"top":"0","left":"301"},
	// {"top":"0","left":"612"},
	// {"top":"0","left":"915"}];
	// var Move_arr_three=[
	// {"top":"382","left":"100"},
	// {"top":"382","left":"401"},
	// {"top":"382","left":"712"},
	// {"top":"382","left":"1015"}];
	/*走相同的点*/
	var Move_arr_1=[{"top":"-382","left":"-100","opacity":"0"}];
	var Move_arr_2=[
	{"top":"0","left":"0","opacity":"1"},
	{"top":"0","left":"301","opacity":"1"},
	{"top":"0","left":"612","opacity":"1"},
	{"top":"0","left":"915","opacity":"1"}];
	var Move_arr_3=[{"top":"382","left":"1015","opacity":"0"}];
	/*效果展示區效果*/
	
	/*给所有的li转换为绝对定位*/
	var Move_Positon = $(".Move_parent").find("li");
	for(var i=0;i<Move_Positon.length;i++){
		Move_Positon.eq(i).css("position","absolute");
	}
	// console.log(Move_provt.eq(0).find("li").eq(0));
	var Move_provt = $(".Move_parent");

	/*给各自的li赋值*/
		setLi(Move_provt.eq(0),Move_arr_1);
		setLi(Move_provt.eq(1),Move_arr_2);
		setLi(Move_provt.eq(2),Move_arr_3);
	function setLi(obj,arr){
		var son_li = obj.find("li");
		for(var j=0;j<son_li.length;j++){

			if(arr.length==1){
				son_li.eq(j).css("top",arr[0].top+"px");
				son_li.eq(j).css("left",arr[0].left+"px");
				son_li.eq(j).css("opacity",arr[0].opacity);
				son_li.eq(j).removeClass("product_Rotate_start");
				son_li.eq(j).addClass("product_Rotate_end");
			}else{
				son_li.eq(j).css("top",arr[j].top+"px");
				son_li.eq(j).css("left",arr[j].left+"px");
				son_li.eq(j).css("opacity",arr[j].opacity);
				son_li.eq(j).removeClass("product_Rotate_end");
				son_li.eq(j).addClass("product_Rotate_start");
			}
		}
	}
	/*ul控制变量*/
	var a_a=0;
	var b_b=1;
	var c_c=2;
	var product_left=$(".product_left");
	product_left.click(function(){
		//alert("左");
		 setLi(Move_provt.eq(a_a),Move_arr_3);
		 setLi(Move_provt.eq(b_b), Move_arr_1);
		 setLi(Move_provt.eq(c_c),Move_arr_2);
		 setProductIndex();
	});
	function setProductIndex(){
		a_a=++a_a>2?0:a_a;
		 b_b=++b_b>2?0:b_b;
		 c_c=++c_c>2?0:c_c;
	}
	var product_right=$(".product_right");
	product_right.click(function(){
		//alert("右");
		setLi(Move_provt.eq(a_a),Move_arr_3);
		 setLi(Move_provt.eq(b_b),Move_arr_2);
		 setLi(Move_provt.eq(c_c),Move_arr_1);
		setProductIndex();
	});

	/*li触摸效果*/
	for(var i=0;i<Move_Positon.length;i++){
		Move_Positon.eq(i).mouseenter(function(){
			$(this).find(".a_product_Display").stop();
			$(this).find(".a_product_Display").css("display","block");
			$(this).find(".a_product_Display").animate({"top":"14","opacity":"1"},1000);
		});
		Move_Positon.eq(i).mouseleave(function(){
			$(this).find(".a_product_Display").stop();
			$(this).find(".a_product_Display").animate({"top":"-346","opacity":"0"},1000);
		})

	}
	/*footer的相关效果*/
	var qR_Code =$(".qR_Code").find("span");

	for(var i=0;i<qR_Code.length;i++){
		qR_Code.eq(i).mouseenter(function(){
			$(this).find("b").css("display","block");
		})

		qR_Code.eq(i).mouseleave(function(){
			$(this).find("b").css("display","none");
		})
	}
})