$(function(){
	$("#dowebok").fullpage({
		afterLoad   : function(anchorLink, index){
			if(index==1){
				$(".section0 .big_logo").addClass('foc');
				$(".section0 .company").addClass('foc');
			}else{
				$(".section0 .big_logo").removeClass('foc');
				$(".section0 .company").removeClass('foc');
			}
		},
		onLeave: function(index, direction){
			 
		},
		'navigation': true,
		'loopBottom':true,
		'navigationTooltips':['第一屏','第二屏','第三屏']
	});
});
 