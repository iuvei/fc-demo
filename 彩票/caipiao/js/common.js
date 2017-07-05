// $(function() {
	var COMMON = {
		isIndex: false,
		timer: null,
		timer2: null,
		init: function() {
			COMMON.setSkin();
			COMMON.getUrlParam();
			COMMON.renderUserInfo();
			COMMON.bindEvent();
			COMMON.userCenterMenu();
		},
		userCenterMenu: function(){
			// 会员中心的左侧菜单
			if ($('#J_userNav').length) {
				$('#J_userNav').find('dt').click(function(){
					if($(this).parents('dl').hasClass('open')){
						$(this).parents('dl').removeClass('open');
						return;
					}
					$('#J_userNav').find('dl').removeClass('open');
					$(this).parents('dl').addClass('open');
				});
			}
		},
		bindEvent: function() {
			// 页面跳转
			$('.J_pageJump').click(function(){
				if($(this).data('page')){
					window.location.href = '/user/' + $(this).data('page') + '.html';
				}
			});
			
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

			// 显示开奖历史
			$('#J_lastThreeDrawResult1,#J_historyList').hover(function(){
				$('#J_historyList').show();
			}, function(){
				$('#J_historyList').hide();
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
				url: '/user/detail'
			}, function(data) {
				$('#J_headerUserName,.J_userName').html(data.nickname ? data.nickname : data.username);
				$('.J_balance').html(data.balance)
				$('#J_cutoverBalance').data('balance', data.balance);
			});
		},
		homeBallInfo: function() {
			GLOBAL.getAjaxData({
				url: '/product/lists'
			}, function(data) {
				var _data = data.data;
				$.each(_data, function(i, val) {
					// 跳转地址
					$('#J_jumpToPage' + val.id).attr('href', 'betting.html?name=' + val.code +'&id=' + val.id);
					//彩票期数
					$('#J_betTimer' + val.id).html(val['periods'].date + '-' + val['periods'].num);
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
					url: '/user/logout'
				}, function(data) {
					layer.close(index);
					// TODO: 跳转到登录页面
					window.location.href = '/login.html';
				});
			});
		},
		countDown: function(intDiff, suffix, $id) {
			// window.clearInterval(t);
			COMMON.timer2 = window.setInterval(function() {
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
					if (!COMMON.isIndex) {
						layer.alert('第<span style="padding:0 5px;">' + $('#J_betTimer').html() + '</span>期已结束<br/>请留意投注期号。', {
							skin: 'bett-alert-dialog',
							icon: 2,
							time: 2000
						});
					}

					window.clearInterval(COMMON.timer2);
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

				// 提前10s停止投注
				if(intDiff <= 10){
					$('#J_shortcutPlaceOrder,#J_confirmBets').addClass('disabled');
				} else {
					if(!$('#J_addBallToCart').hasClass('disabled') ){
						$('#J_shortcutPlaceOrder').removeClass('disabled');
					}
					if($('#J_betList li').length){
						$('#J_confirmBets').removeClass('disabled');
					}
				}
			}, 1000);
		},
		getBallInfo: function($id) {
			window.clearInterval(COMMON.timer2);
			var _url = GLOBAL.getRequestURL();
			GLOBAL.getAjaxData({
				url: '/product/detail',
				data: {
					id : Number($id) || _url.id
				}
			}, function(data) {
				// TODO: 判断是详情页还是首页
				if (COMMON.isIndex) {
					$('#J_betTimer' + data.id).html(data['periods'].date + '-' + data['periods'].num); //彩票期数
					//定时器处理
					COMMON.countDown(parseInt(data.periods.lottery_surplus), data.id, data.id);
				} else {
					$('#J_productLogo').attr('src', data.logo);
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
			
			clearTimeout(COMMON.timer);
			// window.clearInterval(t);
			//处理开奖号
			if (num.length > 0) {
				var _str = '';
				for (var i = 0; i < 5; i++) {
					_str += '<em>' + num[i] + '</em>';
				};
				$('#' + _id).html(_str);

				COMMON.renderHistory();
			} else {
				// 没获取到最新的数据三秒获取一次
				COMMON.timer = setTimeout(function(){
					COMMON.getBallInfo();
				}, 10000);
			}
		},
		renderHistory: function(){
			var _url = GLOBAL.getRequestURL();
			GLOBAL.getAjaxData({
				url: 'lottery/lists',
				data : {
					id : _url.id,
					pageSize : 10
				}
			}, function(d) {
				var _list1 = '';
				var _list2 = '';
				var _list3 = '';
				$('#J_lastThreeDrawResult1').find('dd').remove();
				$('#J_lastThreeDrawResult2').find('dd').remove();
				$.each(d.data, function(k, val) {
					val.num = COMMON.fillLenght(val.num, 3, '0');
					if (k < 3) {
						_list1 += '<dd>'+ val.date +'-'+ val.num +'</dd>';
						_list2 += '<dd>' + val.lottery_num[0] + val.lottery_num[1] + val.lottery_num[2] + val.lottery_num[3] + val.lottery_num[4] + '</dd>';
					}
					_list3 += '<li><span>'+ val.date +'-'+ val.num +'</span><em>' + val.lottery_num[0] + val.lottery_num[1] + val.lottery_num[2] + val.lottery_num[3] + val.lottery_num[4] + '</em></li>';
				});

				$('#J_lastThreeDrawResult1').append(_list1);
				$('#J_lastThreeDrawResult2').append(_list2);
				$('#J_historyList').html(_list3);
			});
		},
		getUrlParam: function() {
			var _url = GLOBAL.getRequestURL();
			var _userNav = $('#J_userNav').length;

			if (!_url.name && !_userNav) {
				// 判断是否为首页或者详情页面
				COMMON.isIndex = true;
			}

			if (COMMON.isIndex) {
				COMMON.homeBallInfo();
			} else {
				if (!_url.name) {
					// 用户中心
					// console.log(12);
					// location.href = '/index.html';
				} else {
					// 详情页
					COMMON.getBallInfo(_url.id);
				}

				// 渲染开奖历史
				// COMMON.renderHistory();
			}
		},
		USER: {
			renderBankList: function() {
				console.log('银行卡列表返回数据格式不对');
				// 渲染可绑定银行卡选项
				GLOBAL.getAjaxData({
					url: '/bank/option'
				}, function(d) {
					console.log(d);
				});
			},
			initDatePick: function() {
				var start = {
					elem: '#J_startDay',
					format: 'YYYY-MM-DD',
					max: laydate.now(),
					istoday: false,
					issure: false,
					isclear: false,
					choose: function(datas) {
						end.min = datas; //开始日选好后，重置结束日的最小日期
						end.start = datas //将结束日的初始值设定为开始日
					}
				};
				var end = {
					elem: '#J_endDay',
					format: 'YYYY-MM-DD',
					max: laydate.now(),
					istoday: false,
					issure: false,
					isclear: false,
					choose: function(datas) {
						start.max = datas; //结束日选好后，重置开始日的最大日期
					}
				};
				laydate(start);
				laydate(end);
			},
			rechargeOnline: {
				// 线上支付
				init: function(){
					COMMON.USER.renderBankList();

					this.bindEvent();
				},
				bindEvent: function(){
					$('#J_quoatList li').click(function(){
						$(this).addClass('active').siblings().removeClass('active');
						$('#J_quoatInp').val($(this).data('n'));
					});
				}
			},
			rechargeRecord: {
				// 充值记录
				init: function() {
					COMMON.USER.initDatePick();
					this.getList();
					this.bindEvent();
				},
				bindEvent: function() {
					$('#J_searchListBtn').click(function(){
						var _status = $('#J_status').next('.nice-select').find('.selected').data().value;
						var _mod = $('#J_mode').next('.nice-select').find('.selected').data().value;
						var _start = $('#J_startDay').va();
						var _end = $('#J_endDay').va();
						console.log(_status, _mod);

						// this.getList({

						// });
					});
				},
				getList: function(option) {
					option = option || {};

					GLOBAL.getAjaxData({
						url: '/recharge/lists'
					}, function(d) {
						console.log(d);

						// $('select').niceSelect();
					});
				}
			}
		}
	}

	COMMON.init();
// });