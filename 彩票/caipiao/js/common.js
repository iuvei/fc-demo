$(function() {
	var COMMON = {
		isIndex: false,
		init: function() {
			COMMON.setSkin();
			COMMON.getUrlParam();
			COMMON.renderUserInfo();
			COMMON.bindEvent();
		},
		bindEvent: function() {
			// 退出
			$('#J_signOut').click(function() {
				COMMON.signOut();
			});

			// 刷新
			$('#J_refresh').click(function() {
				COMMON.renderUserInfo();
			});

			// 显示、隐藏余额
			$('#J_cutoverBalance').click(function() {
				if ($(this).hasClass('show')) {
					$(this).removeClass('show').html('隐藏');
					$('#J_totalBalance').html('余额已隐藏');
				} else {
					$(this).addClass('show').html('显示');
					$('#J_totalBalance').html('总余额 ￥<i>' + $(this).data('balance') + '</i>');
				}
			});

			// 走势图
			$('#J_trendChart').click(function() {
				window.open('/caipiao/page/chart.html?name=qq_fen_fen');
			});
		},
		setSkin: function() {
			if ($('#J_skin').length) {
				// 设置皮肤
				var _defaultSkin = GLOBAL.COOKIE.getCookieItem('ds_skin');
				if (_defaultSkin) {
					var _href = $('#J_skinCss').attr('href');
					$('#J_skinCss').attr('href', _href.split('skin/')[0] + 'skin/' + _defaultSkin + '.css');
				}

				$('.J_setSkin').click(function() {
					var _skin = $(this).data('skin');
					var _href = $('#J_skinCss').attr('href');
					$('#J_skinCss').attr('href', _href.split('skin/')[0] + 'skin/' + _skin + '.css');

					// TODO: 将应用皮肤存在cookie中
					GLOBAL.COOKIE.setCookieItem('ds_skin', _skin);
				});
			}
		},
		renderUserInfo: function() {
			GLOBAL.getAjaxData({
				type: 'get',
				url: '../data/user/detail.json'
			}, function(data) {
				$('.J_userName').html(data.username);
				$('.J_balance').html(data.balance)
				$('#J_cutoverBalance').data('balance', data.balance);
			});
		},
		homeBallInfo: function() {
			GLOBAL.getAjaxData({
				type: 'get',
				url: '../data/product/list.json'
			}, function(data) {
				var _data = data.data;
				$.each(_data, function(i, val) {
					$('#J_betTimer' + val.id).html(val['periods'].date + '-' + val['periods'].num); //彩票期数
					//定时器处理

					COMMON.countDown(parseInt(val.periods.lottery_surplus), val.id, val.id);
				});
			});
		},
		signOut: function() {
			layer.confirm('确定要退出登录吗？', {
				icon: 2,
				closeBtn: 0,
				maxWidth: '520px'
			}, function(index) {
				GLOBAL.getAjaxData({
					type: 'get',
					url: '../data/user/logout.json'
				}, function(data) {
					layer.close(index);
					// TODO: 跳转到登录页面
					window.location.href = 'login';
				});
			});
		},
		countDown: function(intDiff, suffix, $id) {
			var t = window.setInterval(function() {
				var day = 0,
					hour = 0,
					minute = 0,
					second = 0; //时间默认值

				if (intDiff >= 0) {
					day = Math.floor(intDiff / (60 * 60 * 24));
					hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
					minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
					second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
				} else {
					// TODO: 结束提示
					// layer.alert('第<span style="padding:0 5px;">' + $('#J_betTimer').html() + '</span>期已结束<br/>请留意投注期号。', {
					// 	icon: 2,
					// 	time: 2000
					// });

					window.clearInterval(t);
					COMMON.getBallInfo($id);
					return;
				}
				// $('#day_show' + suffix).html(day);
				if (hour <= 9) {
					hour = '0' + hour;
				}
				if (minute <= 9) {
					minute = '0' + minute;
				}
				if (second <= 9) {
					second = '0' + second;
				}

				if (COMMON.isIndex) {
					$('#J_hourShow' + suffix).html(hour);
					$('#J_minuteShow' + suffix).html(minute);
					$('#J_secondShow' + suffix).html(second);
				} else {
					second += '';
					$('#J_countDownNum').html('<em>' + hour.substr(0, 1) + '</em><em>' + hour.substr(1, 1) + '</em><span>:</span><em>' + minute.substr(0, 1) + '</em><em>' + minute.substr(1, 1) + '</em><span>:</span><em>' + second.substr(0, 1) + '</em><em>' + second.substr(1, 1) + '</em>');
				}

				intDiff--;
			}, 1000);
		},
		getBallInfo: function($id) {
			GLOBAL.getAjaxData({
				type: 'get',
				url: '../data/product/detail.json'
			}, function(data) {
				// TODO: 判断是详情页还是首页
				if (COMMON.isIndex) {
					$('#J_betTimer' + data.id).html(data['periods'].date + '-' + data['periods'].num); //彩票期数
					//定时器处理
					COMMON.countDown(parseInt(data.periods.lottery_surplus), data.id, data.id);
				} else {
					// TODO: 详情页
					$('#J_betTimer').html(data.periods.date + '-' + COMMON.fillLenght(data.periods.num, 3, '0')); //彩票期数
					// $('#countDown').val(parseInt(data.periods.lottery_surplus)); //距离开奖时间 秒数
					$('#orderId').val(data.periods.id);

					COMMON.countDown(parseInt(data.periods.lottery_surplus), '', $id);

					COMMON.lotteryNum('J_drawResult', data.prev_periods.lottery_num, $id);
					$('#J_dataNum').text(data.prev_periods.date + '-' + COMMON.fillLenght(data.prev_periods.num, 3, '0'));
				}
			});
		},
		fillLenght: function(str, len, fill) {
			//补全数据
			while (str.length < len) {
				str = fill + str;
			}
			return str;
		},
		lotteryNum: function(_id, num, d) {
			//处理开奖号
			if (num.length > 0) {
				var _str = '';
				for (var i = 0; i < 5; i++) {
					_str += '<em>' + num[i] + '</em>';
				};
				$('#' + _id).html(_str);

				GLOBAL.getAjaxData({
					type: 'get',
					url: '../data/lottery/list.json'
				}, function(d) {
					var three = $('#J_lastThreeDrawResult1');
					var three2 = $('#J_lastThreeDrawResult2');
					three.find('dd').remove();
					three2.find('dd').remove();
					// seven.find('li').remove();
					$.each(d.data, function(k, val) {
						val.num = COMMON.fillLenght(val.num, 3, '0');
						if (k < 3) {
							// three.append(`<li><div class="alignleft">${val.date}-${val.num}</div><div class="alignright"><ul><li>${val.lottery_num[0]}</li><li>${val.lottery_num[1]}</li><li>${val.lottery_num[2]}</li><li>${val.lottery_num[3]}</li><li>${val.lottery_num[4]}</li></ul></div></li>`);
							three.append(`<dd>${val.date}-${val.num}</dd>`);
							three2.append(`<dd>${val.lottery_num[0]}${val.lottery_num[1]}${val.lottery_num[2]}${val.lottery_num[3]}${val.lottery_num[4]}</dd>`);

						}
						// seven.append(`<li class="draw_date">${val.date}-${val.num}</li><li class="draw_winning"><ul><li>${val.lottery_num[0]}</li><li>${val.lottery_num[1]}</li><li>${val.lottery_num[2]}</li><li>${val.lottery_num[3]}</li><li>${val.lottery_num[4]}</li></ul></li>`);
					});
				});
			}
		},
		getUrlParam: function() {
			var r = window.location.search.substr(1).match(/name=(\w+)/);
			var x = GLOBAL.getRequestURL();
			if (!x.name) {
				// 判断是否为首页或者详情页面
				COMMON.isIndex = true;
			}
			if (COMMON.isIndex) {
				COMMON.homeBallInfo();
			} else {
				// if (!r) {
				// 	location.href = '/caipiao/page/index.html';
				// }
				if (r[1] == 'chong_qing_shi_shi') {
					COMMON.getBallInfo(1);
				} else if (r[1] == 'qq_fen_fen') {
					COMMON.getBallInfo(2);
				} else if (r[1] == 'bei_ji_fen_fen') {
					COMMON.getBallInfo(3);
				}
			}
		},

	}

	COMMON.init();
});