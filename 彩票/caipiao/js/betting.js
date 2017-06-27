$(function(){
	// 删除已选号码
	$('.J_delNums').click(function(){
		$(this).parents('li').remove();
	});


	$('select').niceSelect();
});