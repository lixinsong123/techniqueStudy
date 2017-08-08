$(function(){
	$("#serach_button").button();
	$("#reg_a").click(function(){
		$("#reg").dialog({
			title:'会员注册',
			buttons:{
				'提交' : function(){
					alert("Ajax正在处理中");
				},
				'取消' : function(){
					$(this).dialog('close');
				}
			}
		});
	});
});