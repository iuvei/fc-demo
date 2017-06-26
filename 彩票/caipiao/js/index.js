$(function() {

	// banner
	var Banner = {
		i: 0,
		timer: null,
		init: function() {
			Banner.drawDoc();
			Banner.bindEvent();
			Banner.autoPlay();
		},
		bindEvent: function() {
			$('#J_bannerDoc li').on({
				mouseover: function() {
					clearInterval(Banner.timer);
					var _index = $(this).index();

					Banner.i = _index;

					if ($(this).hasClass('active')) {
						return;
					}
					Banner.play(_index);
				},
				mouseout: function() {
					clearInterval(Banner.timer);
					Banner.autoPlay();
				}
			});
		},
		play: function(index) {
			$('#J_bannerDoc li').eq(index).addClass('active').siblings('li').removeClass('active');
			$('#J_bannerList li').stop(true).fadeOut();
			$('#J_bannerList li').eq(index).stop(true).fadeIn();
		},
		drawDoc: function() {
			var _bannerLen = $('#J_bannerList').find('li').length;
			var _str = '';
			for (var i = 0; i < _bannerLen; i++) {
				if (i == 0) {
					_str += '<li class="active"></li>';
				} else {
					_str += '<li></li>';
				}
			}
			$('#J_bannerDoc').html(_str);
		},
		autoPlay: function() {
			var _bannerLen = $('#J_bannerList').find('li').length;
			Banner.timer = setInterval(function() {
				Banner.i++;
				if (Banner.i >= _bannerLen) {
					Banner.i = 0;
				}
				Banner.play(Banner.i);
			}, 6000);
		}
	};

	Banner.init();

	// 刷新
	$('#J_refresh').click(function() {
		console.log('刷新');
	});

	// 显示、隐藏余额
	$('#J_cutoverBalance').click(function(){
		console.log('显示、隐藏余额');
	});

	// 公告滚动
	
	// 设置皮肤
	$('.J_setSkin').click(function(){
		var _skin = $(this).data('skin');
		var _href = $('#J_skinCss').attr('href');
		$('#J_skinCss').attr('href', _href.split('skin/')[0] + 'skin/' + _skin + '.css');

		// TODO: 将应用皮肤存在cookie中
	});



});