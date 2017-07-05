$(function(){





	$('select').niceSelect();


	laydate({
		elem: '#J_startDay',
		event: 'focus', //触发事件
		format: 'YYYY-MM-DD', //日期格式
		istime: false, //是否开启时间选择
		isclear: false, //是否显示清空
		istoday: false, //是否显示今天
		issure: false //是否显示确认
	});

	laydate({
		elem: '#J_endDay',
		event: 'focus', //触发事件
		format: 'YYYY-MM-DD', //日期格式
		istime: false, //是否开启时间选择
		isclear: false, //是否显示清空
		istoday: false, //是否显示今天
		issure: false //是否显示确认
	});























});