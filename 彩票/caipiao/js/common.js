// $(function() {
	var COMMON = {
		isIndex: false,
		isChart: false,
		isDeatil: false,
		timer: null,
		timer2: null,
		lottBetTimer: [],
		chartW: [0,0,0,0,0,0,0,0,0,0],
		chartQ: [0,0,0,0,0,0,0,0,0,0],
		chartB: [0,0,0,0,0,0,0,0,0,0],
		chartS: [0,0,0,0,0,0,0,0,0,0],
		chartG: [0,0,0,0,0,0,0,0,0,0],
		chartLast: [0,0,0],
		init: function() {
			COMMON.setSkin();
			COMMON.getUrlParam();
			COMMON.renderUserInfo();
			COMMON.renderCateList();
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
					$(this).removeClass('show').html('显示');
					$('#J_totalBalance').html('余额已隐藏');
				} else {
					$(this).addClass('show').html('隐藏');
					$('#J_totalBalance').html('余额 <i>￥' + $(this).data('balance') + '</i>');
				}
			});

			// 显示开奖历史
			$('#J_bettingHeader').on('mouseover', '#J_lastThreeDrawResult1,#J_historyList', function() {
				$('#J_historyList').show();
			});
			$('#J_bettingHeader').on('mouseout', '#J_lastThreeDrawResult1,#J_historyList', function() {
				$('#J_historyList').hide();
			});

			// 走势图
			$('body').on('click', '#J_trendChart', function(){
				var _url = GLOBAL.getRequestURL();
				window.location.href = 'chart.html?id=' + _url.id + '&type=' + _url.type;
			});

			// 遗漏
			$('#J_missBtn').click(function() {
				if ($(this).find('i').hasClass('active')) {
					$(this).find('i').removeClass('active');
					$(".ch-row-contner .numCount-wrp ul").addClass("noNumber")
				} else {
					$(this).find('i').addClass('active');
					$(".ch-row-contner .numCount-wrp ul").removeClass("noNumber")
				}
			});

			// 折现
			if (!GLOBAL.lessThenIE8()) {
				$('#J_polyline').click(function() {
					if ($(this).find('i').hasClass('active')) {
						$(this).find('i').removeClass('active');
						$("canvas").hide();
					} else {
						$(this).find('i').addClass('active');
						$("canvas").show();
					}
				});
			} else {
				$('#J_polyline').hide();
			}

			// 修改期数
			$('.J_recently').click(function() {
				var _this = $(this);
				var _pageSize = _this.data('size');
				
				_this.addClass('active').siblings().removeClass('active');
				
				COMMON.renderHistory({
					pageSize: _pageSize
				});
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
		renderCateList: function() {
			var _cateList = GLOBAL.SESSION.getSessionItem('cateList');
			if(!_cateList){
				GLOBAL.getAjaxData({
					url: '/product/cate-lists'
				}, function(data) {
					_render(data);
					GLOBAL.SESSION.setSessionItem('cateList', JSON.stringify(data));
				});
			} else {
				_render(_cateList);
			}

			function _render(data){
				if (data && data.length) {
					$.each(data, function(i, n){
						$('#J_cateList_'+n.id).find('dd').remove();
						var _str = '';
						if(n.product && n.product.length){
							$.each(n.product, function(x, y){
								if(x % 2){
									_str += '<dd class="new">';
								} else{
									_str += '<dd class="hot">';
								}
								_str += '<a href="'+ (COMMON.isIndex ? '' : '../') +'betting.html?name='+ y.code +'&id='+ y.id +'&type='+ y.category_id +'">'+ y.name +'</a></dd>';
							});
						}
						$('#J_cateList_'+n.id).append(_str);
					});
				}
			}
		},
		renderUserInfo: function() {
			GLOBAL.getAjaxData({
				url: '/user/detail'
			}, function(data) {
				$('#J_headerUserName,.J_userName').html(data.nickname ? data.nickname : data.username);
				$('#J_headerUserName').data('n', data.username);
				$('.J_balance').html(data.balance)
				$('#J_cutoverBalance').data('balance', data.balance);
				GLOBAL.COOKIE.setCookieItem('betUserInfo', JSON.stringify(data), 2);
			});
		},
		homeBallInfo: function() {
			GLOBAL.getAjaxData({
				url: '/product/lists'
			}, function(data) {
				var _data = data.data;
				$.each(_data, function(i, val) {
					// 跳转地址
					$('#J_jumpToPage' + val.id).attr('href', 'betting.html?name=' + val.code +'&id=' + val.id + '&type='+ val.category_id);
					//彩票期数
					$('#J_betTimer' + val.id).html(val.periods.date + '-' + val.periods.num);
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
			var timer = window.setInterval(function() {
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
					if (COMMON.isDeatil || COMMON.isChart) {
						GLOBAL.alert('第<span style="padding:0 5px;">' + $('.J_betTimer').html() + '</span>期已结束<br/>请留意投注期号。', 2000);
					}

					COMMON.clearLottBetTimer();
					if(COMMON.isIndex){
						COMMON.homeBallInfo();	//一起刷新
					} else {
						COMMON.getBallInfo($id);	//单独刷新一个，显示可能会有差别
					}
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
					$('.J_countDownNum').html('<em>' + hour.substr(0, 1) + '</em><em>' + hour.substr(1, 1) + '</em><span>:</span><em>' + minute.substr(0, 1) + '</em><em>' + minute.substr(1, 1) + '</em><span>:</span><em>' + second.substr(0, 1) + '</em><em>' + second.substr(1, 1) + '</em>');
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
			// console.log(COMMON.lottBetTimer);
			COMMON.lottBetTimer.push(timer);
			// console.log(COMMON.lottBetTimer);
		},
		clearLottBetTimer: function() {
	        if (COMMON.lottBetTimer.length > 0) {
	            for (var i = 0; i < COMMON.lottBetTimer.length; i++){
	            	window.clearInterval(COMMON.lottBetTimer[i]);
	            }
	            COMMON.lottBetTimer = []
	        }
	    },
		getBallInfo: function($id, getList) {
			// clearInterval(COMMON.timer2);
			// window.clearInterval(COMMON.timer2);
			var _url = GLOBAL.getRequestURL();
			var _renderHistory = getList != undefined ? getList : true;
			GLOBAL.getAjaxData({
				url: '/product/detail',
				data: {
					id : Number($id) || _url.id
				}
			}, function(data) {
				// TODO: 判断是详情页还是首页
				if (COMMON.isIndex) {
					$('.J_betTimer' + data.id).html(data['periods'].date + '-' + data['periods'].num); //彩票期数
					//定时器处理
					COMMON.countDown(parseInt(data.periods.lottery_surplus), data.id, data.id);
				} else {
					if(_url.type != data.category_id){
						var _trueUrl = GLOBAL.changeUrlArg(window.location.href, 'type', data.category_id);
						window.location.href = _trueUrl;
					}
					$('.J_productLogo').attr('src', data.logo);
					// TODO: 详情页
					if(_url.name.indexOf('beijing') > -1) {
						$('.J_betTimer').html(COMMON.fillLenght(data.periods.num, 3, '0')); //彩票期数
						$('#J_dataNum').text(COMMON.fillLenght(data.prev_periods.num, 3, '0'));
					} else {
						$('.J_betTimer').html(data.periods.date + '-' + COMMON.fillLenght(data.periods.num, 3, '0')); //彩票期数
						$('#J_dataNum').text(data.prev_periods.date + '-' + COMMON.fillLenght(data.prev_periods.num, 3, '0'));
					}
					$('.J_betTimer').data('n', (data.periods.date + '-' + COMMON.fillLenght(data.periods.num, 3, '0')));
					// $('#countDown').val(parseInt(data.periods.lottery_surplus)); //距离开奖时间 秒数
					$('#orderId').val(data.periods.id);

					COMMON.countDown(parseInt(data.periods.lottery_surplus), '', $id);

					COMMON.lotteryNum('J_drawResult', data.prev_periods.lottery_num, $id);

					if(_renderHistory){
						COMMON.renderHistory();
					}
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
			var _url = GLOBAL.getRequestURL();
			//处理开奖号
			if (num.length > 0) {
				var _str = '';
				if (_url.type == 1 || _url.type == 4 || _url.type == 2) {
					$.each(num.split(','), function(i, n){
						_str += '<em>' + n + '</em>';
					});
				} else if(_url.type == 3) {
					$.each(num.split(','), function(i, n){
						_str += '<em class="s'+ n +'"></em>';
					});
				}
				$('#' + _id).html(_str);
			} else {
				// 没获取到最新的数据三秒获取一次
				clearTimeout(COMMON.timer);
				COMMON.timer = setTimeout(function(){
					COMMON.getBallInfo(_url.id, false);
				}, 10000);
			}
		},
		renderChartTable: function() {
			var _url = GLOBAL.getRequestURL();
			var _type = _url.type;

			// TODO:
			console.log(_type);
		},
		renderHistory: function(option){
			option = option || {};
			var _url = GLOBAL.getRequestURL();
			// var _pageSize = 10;
			if (COMMON.isChart) {
				if(!option.pageSize){
					option.pageSize = $('.J_recently.active').data('size') || 30;
				}
			} else {
				option.pageSize = 10;
				// if(_url.id == 1){
					// option.pageSize = 100;
				// } else (_url.id == 2){
				// 	option.pageSize = 100;
				// }
			}

			GLOBAL.getAjaxData({
				url: '/lottery/lists',
				data : {
					id : _url.id,
					pageSize : option.pageSize
				}
			}, function(d) {
				var _list1 = '';
				var _list2 = '';
				var _list3 = '';
				var _lottery_num = '';
				$('#J_lastThreeDrawResult1').find('dd').remove();
				$('#J_lastThreeDrawResult2').find('dd').remove();
				$.each(d.data, function(k, val) {
					_lottery_num = val.lottery_num;
					// if(_url.type == '2'){	//11选5
					// 	_lottery_num = _lottery_num.replace(/\,/g, '');
					// }
					val.num = COMMON.fillLenght(val.num, 3, '0');
					if (k < 3) {
						if(_url.name.indexOf('beijing') > -1){
							_list1 += '<dd>'+ val.num +'</dd>';
						}else{
							_list1 += '<dd>'+ val.date.replace(/\-/g, '') +'-'+ val.num +'</dd>';
						}

						// if(_url.type == '4'){	//pk10
							_list2 += '<dd>';
							$.each(_lottery_num.split(','), function(x, y){
								_list2 += y + ' ';
							});
							_list2 += '</dd>';
						// } else {
						// 	_list2 += '<dd>' + _lottery_num[0] + _lottery_num[1] + _lottery_num[2] + _lottery_num[3] + _lottery_num[4] + '</dd>';
						// }

					}
					if (k < 10) {
						_list3 += '<li><span>';
						if(_url.name.indexOf('beijing') > -1){
							_list3 += val.num +'</span>';
						}else{
							_list3 += val.date.replace(/\-/g, '') +'-'+ val.num +'</span>';
						}
						_list3 += '<em>';
						$.each(_lottery_num.split(','), function(x, y){
							_list3 += y + ' ';
						});
						// _list3 += _lottery_num[0] + _lottery_num[1] + _lottery_num[2] + _lottery_num[3] + _lottery_num[4];
						_list3 += '</em></li>';
					}
				});

				$('#J_lastThreeDrawResult1').append(_list1);
				$('#J_lastThreeDrawResult2').append(_list2);
				$('#J_historyList').html(_list3);
				
				// 走势页面
				if(COMMON.isChart){
					var _str = '';
					var _w = 0;
					if (d.data.length) {
						var _d = '';
						$.each(d.data, function(i, n){
							_d = n.date.replace(/\-/g, '');
							_str += '<div class="ch-row-contner " id="'+ _d +'-'+ n.num +'">';
							_str += '    <div class="firstdatail po-middle">';
							_str += '        <ul class="ch-drawNumb po-middle">';
							_str += '            <li>'+ _d +'-'+ n.num +'</li>';
							_str += '        </ul>';
							_str += '        <ul class="winning-Num po-middle">';
							_str += '            <li>'+ n.lottery_num[0] +'</li>';
							_str += '            <li>'+ n.lottery_num[1] +'</li>';
							_str += '            <li>'+ n.lottery_num[2] +'</li>';
							_str += '            <li>'+ n.lottery_num[3] +'</li>';
							_str += '            <li>'+ n.lottery_num[4] +'</li>';
							_str += '        </ul>';
							_str += '    </div>';
							_str += '    <div class="numCount-wrp po-middle">';
							_str += '<ul class="winning-1 po-middle">';
							_str += _getNums(n.lottery_num[0], 'w');
							_str += '</ul>';
							_str += '<ul class="winning-2 po-middle">';
							_str += _getNums(n.lottery_num[1], 'q');
							_str += '</ul>';
							_str += '<ul class="winning-3 po-middle">';
							_str += _getNums(n.lottery_num[2], 'b');
							_str += '</ul>';
							_str += '<ul class="winning-4 po-middle">';
							_str += _getNums(n.lottery_num[3], 's');
							_str += '</ul>';
							_str += '<ul class="winning-5 po-middle">';
							_str += _getNums(n.lottery_num[4], 'g');
							_str += '</ul>';
							_str += '</div>';
							_str += '	<div class="lastDetail-wrp po-middle">';
							_str += '        <ul class="J_chartLastTd">';

							if(n.lottery_num[2] == n.lottery_num[3] && n.lottery_num[3] == n.lottery_num[4]){
			                    _str += '<li class="orangeCheck J_wss1"></li><li class="J_wss2">1</li><li class="J_wss3">1</li>';
			                } else {
				                if(n.lottery_num[2] == n.lottery_num[3] || n.lottery_num[2] == n.lottery_num[4] || n.lottery_num[3] == n.lottery_num[4]) {
				                    _str += '<li class="J_wss1">1</li><li class="bleCheck J_wss2"></li><li class="J_wss3">1</li>';
				                } else {
				                    _str += '<li class="J_wss1">1</li><li class="J_wss2">1</li><li class="orangeCheck J_wss3"></li>';
				                }
			                }

							_str += '            <li>'+ (Number(n.lottery_num[2]) + Number(n.lottery_num[3]) + Number(n.lottery_num[4])) +'</li>';
							_str += '        </ul>';
							_str += '    </div>';
							_str += '</div>';
						});


						/**
						 * [_getNums description]
						 * @param  {[type]} num [中奖号码]
						 * @param  {[type]} parity [奇偶, 0:hit-blue，1:hit-red]
						 * @return {[type]}        [description]
						 */
						function _getNums(num, parity) {
							var _li = '';
							var _class = 'hit-blue';
							if(parity == 'q' || parity == 's'){
								_class = 'hit-red';
							}

							for (var i = 0;i < 10; i++) {
								if(i == num){
									_li += '<li id="'+ i +'" class="J_'+ parity + '_'+ i +' '+ _class +'">'+ i +'</li>';
								} else {
									_li += '<li id="'+ i +'" class="J_'+ parity + '_'+ i+'">1</li>';
								}
							}
							return _li;
						}
					}

					$('#J_chartBox').html(_str);

					// 修改遗漏值
					COMMON.chartW = [0,0,0,0,0,0,0,0,0,0];
					COMMON.chartQ = [0,0,0,0,0,0,0,0,0,0];
					COMMON.chartB = [0,0,0,0,0,0,0,0,0,0];
					COMMON.chartS = [0,0,0,0,0,0,0,0,0,0];
					COMMON.chartG = [0,0,0,0,0,0,0,0,0,0];
					COMMON.chartLast = [0,0,0];

					$('.winning-1 li').each(function(i, n){
						$('.J_w_'+ i ).each(function(k, v){
							if($(this).hasClass('hit-blue') || $(this).hasClass('hit-red')){
								COMMON.chartW[i] = 0;
							} else {
								COMMON.chartW[i] = COMMON.chartW[i] + 1;
								$(this).html(COMMON.chartW[i]);
							}
						});
					});

					$('.winning-2 li').each(function(i, n){
						$('.J_q_'+ i ).each(function(k, v){
							if($(this).hasClass('hit-blue') || $(this).hasClass('hit-red')){
								COMMON.chartQ[i] = 0;
							} else {
								COMMON.chartQ[i] = COMMON.chartQ[i] + 1;
								$(this).html(COMMON.chartQ[i]);
							}
						});
					});

					$('.winning-3 li').each(function(i, n){
						$('.J_b_'+ i ).each(function(k, v){
							if($(this).hasClass('hit-blue') || $(this).hasClass('hit-red')){
								COMMON.chartB[i] = 0;
							} else {
								COMMON.chartB[i] = COMMON.chartB[i] + 1;
								$(this).html(COMMON.chartB[i]);
							}
						});
					});

					$('.winning-4 li').each(function(i, n){
						$('.J_s_'+ i ).each(function(k, v){
							if($(this).hasClass('hit-blue') || $(this).hasClass('hit-red')){
								COMMON.chartS[i] = 0;
							} else {
								COMMON.chartS[i] = COMMON.chartS[i] + 1;
								$(this).html(COMMON.chartS[i]);
							}
						});
					});

					$('.winning-5 li').each(function(i, n){
						$('.J_g_'+ i ).each(function(k, v){
							if($(this).hasClass('hit-blue') || $(this).hasClass('hit-red')){
								COMMON.chartG[i] = 0;
							} else {
								COMMON.chartG[i] = COMMON.chartG[i] + 1;
								$(this).html(COMMON.chartG[i]);
							}
						});
					});

					$('.J_chartLastTd li').each(function(i, n) {
						$('.J_wss' + i).each(function(k, v) {
							if ($(this).hasClass('orangeCheck') || $(this).hasClass('bleCheck')) {
								COMMON.chartLast[i] = 0;
							} else {
								COMMON.chartLast[i] = COMMON.chartLast[i] + 1;
								$(this).html(COMMON.chartLast[i]);
							}
						});
					});

					COMMON.CHART.init();
				}
			});
		},
		getUrlParam: function() {
			var _url = GLOBAL.getRequestURL();
			var _userNav = $('#J_userNav').length;
			var _chartBox = $('#J_chartBox').length;

			if (!_url.name && !_userNav && !_chartBox) {
				// 判断是否为首页或者详情页面 或者走势页面
				COMMON.isIndex = true;
			}

			if (COMMON.isIndex) {
				COMMON.homeBallInfo();
			} else {
				if (_userNav) {
					// 用户中心
				}

				if (_chartBox) {
					// 走势
					COMMON.isChart = true;
					COMMON.getBallInfo(_url.id);
					COMMON.renderChartTable();
					COMMON.renderHistory();
				}

				if (_url.name) {
					// 详情页
					COMMON.isDeatil = true;
					COMMON.getBallInfo(_url.id);
				}

				// 渲染开奖历史
				// COMMON.renderHistory();
			}
		},
		USER: {
			clearNoNum: function(obj) {  
				obj.val(obj.val().replace(/[^\d.]/g,"")); //清除"数字"和"."以外的字符  
				obj.val(obj.val().replace(/^\./g,"")); //验证第一个字符是数字而不是  
				obj.val(obj.val().replace(/\.{2,}/g,".")); //只保留第一个. 清除多余的  
				obj.val(obj.val().replace(".","$#$").replace(/\./g,"").replace("$#$","."));
				obj.val(obj.val().replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')); //只能输入两个小数  
			},
			renderBankList: function() {
				// 渲染可绑定银行卡选项
				GLOBAL.getAjaxData({
					url: '/bank/option'
				}, function(d) {
					var _str = '';
					if(d.length){
						$.each(d, function(i, n){
							_str += '<option value="'+ n.id +'">'+ n.name +'</option>';
						});
					}
					$('#J_bankList').html(_str);

					$('select').chosen();
				});
			},
			renderAddressList: function(pid) {
				// 渲染地址列表
				GLOBAL.getAjaxData({
					url: '/zone/lists',
					data: {
						id : pid || ''
					}
				}, function(d) {
					var _str = '';
					if(d.length){
						$.each(d, function(i, n){
							_str += '<option value="'+ n.id +'">'+ n.name +'</option>';
						});
					}

					if (pid) {
						$('#J_city').html(_str).trigger("chosen:updated");
					} else {
						$('#J_province').html(_str).trigger("chosen:updated");
					}
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
			converUnit: function(unit){
				var _txt = '';
                switch(unit){
                    case 'yuan':
                    _txt = '元';
                    break;
                    case 'jiao':
                    _txt = '角';
                    break;
                    case 'fen':
                    _txt = '分';
                    break;
                    case 'li':
                    _txt = '厘';
                    break;
                }

                return _txt;
			},
			converWinningStatus: function(status){
                var _txt = '';
                switch(status){
                    case 'wait':
                    _txt = '等待支付';
                    break;
                    case 'pay':
                    _txt = '已经支付';
                    break;
                    case 'expire':
                    _txt = '过期';
                    break;
                    case 'retreat':
                    _txt = '撤销';
                    break;
                    case 'regret':
                    _txt = '未中奖';
                    break;
                    case 'winning':
                    _txt = '中奖';
                    break;
                    case 'finish':
                    _txt = '结束';
                    break;
                    case 'stop':
                    _txt = '中奖停止';
                    break;
                }

                return _txt;
            },
            converRechargeStatus: function(status){
                var _txt = '';
                switch(status){
                    case 'wait':
                    _txt = '待确认';
                    break;
                    case 'fail':
                    _txt = '充值失败';
                    break;
                    case 'success':
                    _txt = '充值成功';
                    break;
                }

                return _txt;
            },
            converRechargeType: function(status){
                var _txt = '';
                switch(status){
                    case 'bank':
                    _txt = '银行';
                    break;
                    case 'alipay':
                    _txt = '支付宝';
                    break;
                    case 'weixin':
                    _txt = '微信';
                    break;
                    case 'quick':
                    _txt = '快捷支付';
                    break;
                }

                return _txt;
            },
            recharge: function(money, type) {
            	GLOBAL.getAjaxData({
					url: '/recharge/add',
					data: {
						money: money,
						channel: 'online',
						type: type
					}
				}, function(data) {
					GLOBAL.alert('充值成功', 2000, 1);
				});
            },
			// 线上支付
			rechargeOnline: {
				init: function(){
					COMMON.USER.renderBankList();
					this.bindEvent();
				},
				bindEvent: function(){
					$('#J_quoatList li').click(function(){
						$(this).addClass('active').siblings().removeClass('active');
						$('#J_quoatInp').val($(this).data('n'));
					});

					$('#J_confirmBtn').click(function(){
						var num = $('#J_quoatInp').val();

						if(num < 1 || num > 50000){
							GLOBAL.alert('最低充值金额为1元，单笔最高充值金额为50,000元');
							return false;
						}
						COMMON.USER.recharge(num, 'bank');
					});
				}
			},
			// 网银转账
			rechargeTransfer: {
				init: function(){
					COMMON.USER.renderBankList();
					this.bindEvent();
				},
				bindEvent: function(){
					$('#J_quoatInp').on({
						keyup: function() {
							COMMON.USER.clearNoNum($(this));
						}
					});

					$('#J_confirmBtn').click(function(){
						var num = $('#J_quoatInp').val();

						if(!num){
							GLOBAL.alert('请输入充值金额');
							return false;
						}

						if(num < 1 || num > 50000){
							GLOBAL.alert('最低充值金额为1元，单笔最高充值金额为50,000元');
							return false;
						}
						COMMON.USER.recharge(num, 'bank');
					});
				}
			},
			// 微信转账
			rechargeWechat: {
				init: function(){
					// COMMON.USER.renderBankList();
					this.bindEvent();
				},
				bindEvent: function(){
					$('#J_quoatList li').click(function(){
						$(this).addClass('active').siblings().removeClass('active');
						$('#J_quoatInp').val($(this).data('n'));
					});

					$('#J_confirmBtn').click(function(){
						var num = $('#J_quoatInp').val();

						if(num < 1 || num > 50000){
							GLOBAL.alert('最低充值金额为1元，单笔最高充值金额为50,000元');
							return false;
						}
						COMMON.USER.recharge(num, 'bank');
					});
				}
			},
			// 充值记录
			rechargeRecord: {
				init: function() {
					COMMON.USER.initDatePick();
					this.bindEvent();
				},
				bindEvent: function() {
					$('#J_searchListBtn').click(function(){
						COMMON.USER.rechargeRecord.getList();
					});
				},
				renderList: function(data) {
					var _str = '';
					if (data.total > 0){
						$.each(data.data, function(i, n){
							_str += '<li>';
							_str += '    <div class="t1">'+ n.id +'</div>';
							_str += '    <div class="t2">'+ COMMON.USER.converRechargeType(n.type) +'</div>';
							_str += '    <div class="t3">'+ n.money +'</div>';
							_str += '    <div class="t4">'+ '--' +'</div>';
							_str += '    <div class="t5">'+ n.created +'</div>';
							_str += '    <div class="t6">'+ '--' +'</div>';
							_str += '    <div class="t7">'+ COMMON.USER.converRechargeStatus(n.status) +'</div>';
							_str += '    <div class="t8" title="'+ n.remark +'">'+ n.remark +'</div>';
							_str += '</li>';
						});					
					} else {
						_str += '<li class="empty">没有找到符合条件的数据</li>';
					}

					$('#J_list').html(_str);
				},
				getList: function(option) {
					option = option || {};
					option.status = option.status || $('#J_status').val() || '';
					option.type = option.type || $('#J_mode').val() || '';
					option.created_min = option.created_min || $('#J_startDay').val() || '';
					option.created_max = option.created_max || $('#J_endDay').val() || '';
					option.pageSize = option.pageSize || 10;
					option.page = option.page || 1;

					GLOBAL.getAjaxData({
						url: '/recharge/lists',
						data: {
							type: option.type,
							status: option.status,
							created_min: option.created_min,
							created_max: option.created_max,
							pageSize: option.pageSize,
							page: option.page
						}
					}, function(d) {
						COMMON.USER.rechargeRecord.renderList(d);
						if(d.total > 10){
							laypage({
								cont: 'J_Paging',
								pages: Math.ceil(d.total / d.per_page),
								prev: '<',
								next: '>',
								first: false,
								last: false,
								skip: true, //是否开启跳页
								groups: 10, //连续显示分页数
								jump: function(obj) {
									COMMON.USER.rechargeRecord.getData({
										page: obj.curr
									});
								}
							});
						}
					});
				},
				getData: function(option){
					option = option || {};
					option.status = option.status || $('#J_status').val() || '';
					option.type = option.type || $('#J_mode').val() || '';
					option.created_min = option.created_min || $('#J_startDay').val() || '';
					option.created_max = option.created_max || $('#J_endDay').val() || '';
					option.pageSize = option.pageSize || 10;
					option.page = option.page || 1;
					GLOBAL.getAjaxData({
						url: '/recharge/lists',
						data: {
							type: option.type,
							status: option.status,
							created_min: option.created_min,
							created_max: option.created_max,
							pageSize: option.pageSize,
							page: option.page
						}
					}, function(d) {
						COMMON.USER.rechargeRecord.renderList(d);
					});
				}
			},
			// 提款申请
			withdrawalApplication: {
				init: function(){
					this.initDetail();
					this.bindEvent();
				},
				bindEvent: function(){
					$('#money').on({
						keyup: function() {
							COMMON.USER.clearNoNum($(this));
						}
					});

					$('#J_tkBankList').on('click', '.J_cancelBankCard', function(){
						var _this = $(this);

						layer.confirm('确定要接触绑定该卡吗？', {
							icon: 2,
							closeBtn: 0,
							maxWidth: '520px'
						}, function(index) {
							GLOBAL.getAjaxData({
								url: '/bank/relieve',
								data: {
									id : _this.data('id')
								}
							}, function(data) {
								layer.close(index);
								_this.parents('li').remove();
							});
						});
					});

					$('#J_confirmBtn').click(function(){
						COMMON.USER.withdrawalApplication.withdraw();
					});

					$('#J_tkBankList').on('click', '.J_withdrawLi', function(){
						$(this).addClass('active').siblings('li').removeClass('active');
					});
				},
				withdraw: function() {
					var _money = $('#money').val();
					var _password = $('#password').val();
					var _id = $('.J_withdrawLi.active').data('id');
					
					if(_id == undefined){
						GLOBAL.alert('请选择提款银行卡');
						return false;
					}

					if(!_money){
						GLOBAL.alert('请输入提款金额');
						return false;
					}

					if (_money < 100 || _money > 200000) {
						GLOBAL.alert('单笔最低提款金额为100元，<br/>单笔最高提款金额为200,0000元');
						return false;
					}

					if (!_password) {
						GLOBAL.alert('请输入资金密码');
						return false;
					}

					// 提款
					GLOBAL.getAjaxData({
						url: '/withdraw/add',
						data: {
							user_bank_id: _id,
							money: _money,
							password: _password
						}
					}, function(data) {
						
					});
				},
				initDetail: function() {
					// 	银行列表
					GLOBAL.getAjaxData({
						url: '/bank/lists'
					}, function(data) {
						var _str = '';
						if (data.length) {
							$.each(data, function(i, n) {
								_str += '<li class="J_withdrawLi '+ (i == 0 ? 'active' : '') +'" data-id="'+ n.id +'">';
								_str += '	<div class="t1">'+ n.bank_name +'</div>';
								_str += '	<div class="t2">'+ n.zone1 +' - '+ n.zone2 +'</div>';
								_str += '	<div class="t3">***************'+ n.last_number +'</div>';
								_str += '	<div class="t4">'+ n.holder +'</div>';
								_str += '	<div class="t5">'+ n.created +'</div>';
								_str += '	<div class="t6"><a href="javascript:;" class="text-l-color J_cancelBankCard" data-id="'+ n.id +'">解除绑定</a></div>';
								_str += '</li>';
							});
						} else {
							_str += '<li class="empty"><p>暂时没有绑定提款卡</p></li>'
						}
						$('#J_tkBankList').append(_str);
					});
				}
			},
			// 提款记录
			withdrawalRecords: {
				init: function() {
					COMMON.USER.initDatePick();
					this.bindEvent();
				},
				bindEvent: function(d){
					$('#J_searchListBtn').click(function() {
						COMMON.USER.withdrawalRecords.getList();
					});
				},
				renderList: function(data) {
					var _str = '';
					if (data.total > 0){
						$.each(data.data, function(i, n){
							_str += '<li>';
							_str += '    <div class="t1">'+ n.id +'</div>';
							_str += '    <div class="t2">'+ n.money +'</div>';
							_str += '    <div class="t3">'+ n.bank.name +'</div>';
							_str += '    <div class="t4">'+ n.created +'</div>';
							_str += '    <div class="t5">'+ COMMON.USER.converRechargeStatus(n.status) +'</div>';
							_str += '    <div class="t6" title="'+ n.remark +'">'+ n.remark +'</div>';
							_str += '</li>';
						});					
					} else {
						_str += '<li class="empty">没有找到符合条件的数据</li>';
					}

					$('#J_list').html(_str);
				},
				getList: function(option) {
					option = option || {};
					option.status = option.status || $('#J_status').val() || '';
					option.created_min = option.created_min || $('#J_startDay').val() || '';
					option.created_max = option.created_max || $('#J_endDay').val() || '';
					option.pageSize = option.pageSize || 10;
					option.page = option.page || 1;

					GLOBAL.getAjaxData({
						url: '/withdraw/lists',
						data: {
							status: option.status,
							created_min: option.created_min,
							created_max: option.created_max,
							pageSize: option.pageSize,
							page: option.page
						}
					}, function(d) {
						COMMON.USER.withdrawalRecords.renderList(d);
						if(d.total > 10){
							laypage({
								cont: 'J_Paging',
								pages: Math.ceil(d.total / d.per_page),
								prev: '<',
								next: '>',
								first: false,
								last: false,
								skip: true, //是否开启跳页
								groups: 10, //连续显示分页数
								jump: function(obj) {
									COMMON.USER.withdrawalRecords.getData({
										page: obj.curr
									});
								}
							});
						}
					});
				},
				getData: function(option){
					option = option || {};
					option.status = option.status || $('#J_status').val() || '';
					option.created_min = option.created_min || $('#J_startDay').val() || '';
					option.created_max = option.created_max || $('#J_endDay').val() || '';
					option.pageSize = option.pageSize || 10;
					option.page = option.page || 1;
					GLOBAL.getAjaxData({
						url: '/withdraw/lists',
						data: {
							status: option.status,
							created_min: option.created_min,
							created_max: option.created_max,
							pageSize: option.pageSize,
							page: option.page
						}
					}, function(d) {
						COMMON.USER.withdrawalRecords.renderList(d);
					});
				}
			},
			// 绑定银行卡
			withdrawalBindcard: {
				init: function() {
					COMMON.USER.renderBankList();
					COMMON.USER.renderAddressList();
					this.bindEvent();
				},
				bindEvent: function(){
					// $('#money').on({
					// 	keyup: function() {
					// 		COMMON.USER.clearNoNum($(this));
					// 	}
					// });
					
					// var _user = GLOBAL.COOKIE.getCookieItem('betUserInfo');

					$('#J_province').on('change',function(){
						var _id = $(this).val();
						COMMON.USER.renderAddressList(_id);
					});

					$('#J_addBankCard').click(function(){
						// Todo:充值金额字段缺少

						var bankId = $("#J_bankList").val(); //银行id
						var cardNum = $('#J_cardNum').val(); //银行卡号
						var cardConNum = $('#J_cardConNum').val(); //确认银行卡号
						var provinceId = $("#J_province").val();
						var cityId = $("#J_city").val();
						var branch = $('#branch').val(); //银行分行
						var reg = /^\d{16,19}$/;
						var _user = GLOBAL.COOKIE.getCookieItem('betUserInfo');

						if (cardNum == '') {
							GLOBAL.alert('请输入银行卡12号');
							return false;
						} else if (reg.test(cardNum) == false) {
							GLOBAL.alert('请输入16到19位的银行卡号');
							return false;
						}

						if (cardConNum == '' && cardNum != '') {
							GLOBAL.alert('请输入确认银行卡号');
							return false;
						}

						if (cardNum != cardConNum) {
							GLOBAL.alert('确认银行卡号与银行卡号不一致');
							return false;
						}

						if (provinceId == '') {
							GLOBAL.alert('请选择银行所在省市');
							return false;
						}
						if (cityId == '') {
							GLOBAL.alert('请选择银行所在市区');
							return false;
						}
						if (branch == '') {
							GLOBAL.alert('请输入银行分行');
							return false;
						}

						var payee = (_user.payee ? _user.payee : '');
						var email = (_user.email ? _user.email : '');

						if (!payee) {
							GLOBAL.alert('请在我的资料补全提款人姓名');
							return false;
						}

						if (!email) {
							GLOBAL.alert('请在我的资料补全安全邮箱');
							return false;
						}

						GLOBAL.getAjaxData({
							url: '/bank/add',
							data: {
								payee:  payee,//当前用户没有补全收款人姓名时必填
								email: email,//当前用户没有补全安全邮箱时必填
								bank_id: bankId,//	银行ID
								card_number: cardNum,//银行卡号，16或19位
								zone1_id: provinceId,//一级地区
								zone2_id: cityId,//二级地区
								branch: branch	//分行名
							}
						}, function(data) {
							GLOBAL.alert('绑定银行卡成功', 2000, 1);
							// TODO:充值所有的值
						});
					});
				}
			},
			// 我的资料
			profile: {
				init: function() {
					this.detail();
					this.bindEvent();
				},
				bindEvent: function() {
					$('#J_confirmBtn').click(function(){
						var _payee = $('#payee').val();
						var _fund_password = $('#fund_password').val();
						var _confirm_fund_password = $('#confirm_fund_password').val();
						var _email = $('#email').val();

						if (!_payee) {
							layer.alert('请输入提款人姓名！', {
								skin: 'bett-alert-dialog',
								icon: 2
							});
							return false;
						}
						if (_fund_password.length < 6 || _fund_password.length > 18) {
							layer.alert('请输入6-18位资金密码！', {
								skin: 'bett-alert-dialog',
								icon: 2
							});
							return false;
						}
						if (!_confirm_fund_password) {
							layer.alert('请输入确认资金密码！', {
								skin: 'bett-alert-dialog',
								icon: 2
							});
							return false;
						}
						if (!_email) {
							layer.alert('请输入安全邮箱！', {
								skin: 'bett-alert-dialog',
								icon: 2
							});
							return false;
						}

						if (_fund_password != _confirm_fund_password) {
							layer.alert('确认资金密码必需与资金密码一致', {
								skin: 'bett-alert-dialog',
								icon: 2
							});
							$('#fund_password,#confirm_fund_password').val('');
							return false;
						}

						var _data ={
							cellphone: $('#cellphone').val(),
							nickname: $('#nickname').val(),
							qq: $('#qq').val(),
							email: _email,
							fund_password: _fund_password,
							confirm_fund_password: _confirm_fund_password,
							payee: _payee
						}

						GLOBAL.getAjaxData({
							url: '/user/perfect',
							data: _data
						}, function(data) {
							layer.alert('我的资料修改成功', {
								skin: 'bett-alert-dialog',
								icon: 1,
								time: 2000
							});
							COMMON.USER.profile.detail();
						});
					});
				},
				detail: function() {
					var _user = GLOBAL.COOKIE.getCookieItem('betUserInfo');
					if(_user.set_fund_password){
						$('#fund_password,#confirm_fund_password').val('123456').prop('disabled', true);
					}

					GLOBAL.getAjaxData({
						url: '/user/detail'
					}, function(data) {
						// TODO：资金密码 + 确认资金密码是否有返回？？？
						if(data.payee){
							$('#payee').val(data.payee).prop('disabled', true);;
						}
						if(data.nickname){
							$('#nickname').val(data.nickname);
						}
						if(data.cellphone){
							$('#cellphone').val(data.cellphone);
						}
						if(data.qq){
							$('#qq').val(data.qq);
						}
						if(data.email){
							$('#email').val(data.email).prop('disabled', true);
						}
					});
				}
			},
			// 资金详情
			fundsDetail: {
				init: function() {
					$('#J_tabTt li').click(function(){
						var _index = $(this).index();
						$(this).addClass('active').siblings().removeClass('active');
						$('#J_tabCon li').addClass('hide');
						$('#J_tabCon li').eq(_index).removeClass('hide');

					});
				}
			},
			// 投注记录
			bettingRecord: {
				init: function(){
					COMMON.USER.initDatePick();
					this.bindEvent();
				},
				bindEvent: function(d){
					$('#J_searchListBtn').click(function() {
						COMMON.USER.bettingRecord.getList();
					});
				},
				renderList: function(data) {
					var _str = '';
					if (data.total > 0){
						$.each(data.data, function(i, n){
							_str += '<li>';
							_str += '    <div class="t1">'+ n.product.name +'</div>';
							_str += '    <div class="t2">'+ n.order_id +'</div>';
							_str += '    <div class="t3">'+ n.created +'</div>';
							_str += '    <div class="t4">'+ n.periods.date + '-'+ n.periods.num +'</div>';
							_str += '    <div class="t5">-</div>';
							_str += '    <div class="t6">'+ n.money +'</div>';
							_str += '    <div class="t7">'+ n.bonus +'</div>';
							_str += '    <div class="t8">'+ COMMON.USER.converWinningStatus(n.status) +'</div>';
							_str += '</li>';
						});					
					} else {
						_str += '<li class="empty">没有找到符合条件的数据</li>';
					}

					$('#J_list').html(_str);
				},
				getList: function(option) {
					option = option || {};
					option.status = option.status || $('#J_status').val() || '';
					option.created_min = option.created_min || $('#J_startDay').val() || '';
					option.created_max = option.created_max || $('#J_endDay').val() || '';
					option.pageSize = option.pageSize || 10;
					option.page = option.page || 1;

					GLOBAL.getAjaxData({
						url: '/bet/lists',
						data: {
							status: option.status,
							created_min: option.created_min,
							created_max: option.created_max,
							pageSize: option.pageSize,
							page: option.page
						}
					}, function(d) {
						COMMON.USER.bettingRecord.renderList(d);
						if(d.total > 10){
							laypage({
								cont: 'J_Paging',
								pages: Math.ceil(d.total / d.per_page),
								prev: '<',
								next: '>',
								first: false,
								last: false,
								skip: true, //是否开启跳页
								groups: 10, //连续显示分页数
								jump: function(obj) {
									COMMON.USER.bettingRecord.getData({
										page: obj.curr
									});
								}
							});
						}
					});
				},
				getData: function(option){
					option = option || {};
					option.status = option.status || $('#J_status').val() || '';
					option.created_min = option.created_min || $('#J_startDay').val() || '';
					option.created_max = option.created_max || $('#J_endDay').val() || '';
					option.pageSize = option.pageSize || 10;
					option.page = option.page || 1;
					GLOBAL.getAjaxData({
						url: '/bet/lists',
						data: {
							status: option.status,
							created_min: option.created_min,
							created_max: option.created_max,
							pageSize: option.pageSize,
							page: option.page
						}
					}, function(d) {
						COMMON.USER.bettingRecord.renderList(d);
					});
				}
			},
			// 追号记录
			chaseRecord: {
				init: function(){
					COMMON.USER.initDatePick();
					this.bindEvent();
				},
				bindEvent: function(d){
					$('#J_searchListBtn').click(function() {
						COMMON.USER.chaseRecord.getList();
					});
				},
				renderList: function(data) {
					var _str = '';
					if (data.total > 0){
						$.each(data.data, function(i, n){
							_str += '<li>';
							_str += '    <div class="t1">'+ n.product.name +'</div>';
							_str += '    <div class="t2"><a href="chase_order.html?id='+ n.order_id +'" class="text-l-color">'+ n.order_id +'</a></div>';
							_str += '    <div class="t3">'+ (n.start_periods_num ? n.start_periods_num : '-') +'</div>';
							_str += '    <div class="t4">'+ (n.end_periods_num ? n.end_periods_num : '-') +'</div>';
							_str += '    <div class="t5">'+ n.chase_periods +'</div>';
							_str += '    <div class="t6">'+ n.already_chase +'</div>';
							_str += '    <div class="t7">'+ n.money +'</div>';
							_str += '    <div class="t8">'+ n.bonus +'</div>';
							_str += '    <div class="t9">'+ COMMON.USER.converWinningStatus(n.status) +'</div>';
							_str += '</li>';
						});					
					} else {
						_str += '<li class="empty">没有找到符合条件的数据</li>';
					}

					$('#J_list').html(_str);
				},
				getList: function(option) {
					option = option || {};
					option.status = option.status || $('#J_status').val() || '';
					option.created_min = option.created_min || $('#J_startDay').val() || '';
					option.created_max = option.created_max || $('#J_endDay').val() || '';
					option.pageSize = option.pageSize || 10;
					option.page = option.page || 1;

					GLOBAL.getAjaxData({
						url: '/chase/lists',
						data: {
							status: option.status,
							created_min: option.created_min,
							created_max: option.created_max,
							pageSize: option.pageSize,
							page: option.page
						}
					}, function(d) {
						COMMON.USER.chaseRecord.renderList(d);
						if(d.total > 10){
							laypage({
								cont: 'J_Paging',
								pages: Math.ceil(d.total / d.per_page),
								prev: '<',
								next: '>',
								first: false,
								last: false,
								skip: true, //是否开启跳页
								groups: 10, //连续显示分页数
								jump: function(obj) {
									COMMON.USER.chaseRecord.getData({
										page: obj.curr
									});
								}
							});
						}
					});
				},
				getData: function(option){
					option = option || {};
					option.status = option.status || $('#J_status').val() || '';
					option.created_min = option.created_min || $('#J_startDay').val() || '';
					option.created_max = option.created_max || $('#J_endDay').val() || '';
					option.pageSize = option.pageSize || 10;
					option.page = option.page || 1;
					GLOBAL.getAjaxData({
						url: '/chase/lists',
						data: {
							status: option.status,
							created_min: option.created_min,
							created_max: option.created_max,
							pageSize: option.pageSize,
							page: option.page
						}
					}, function(d) {
						COMMON.USER.chaseRecord.renderList(d);
					});
				}
			},
			// 追号订单内容
			chaseOrder: {
				init: function() {
					var _id = Number(GLOBAL.getRequestURL().id);
					this.bindEvent();
					this.renderDeatil(_id);
					this.getList(_id);
				},
				bindEvent: function() {
					$('.J_chaseOrderTt').click(function(){
						var _i = $(this).index();
						$(this).addClass('active').siblings('.J_chaseOrderTt').removeClass('active');
						$('.J_chaseOrderCon').hide();
						$('.J_chaseOrderCon').eq(_i).show();
					});

					$('.J_chaseChose').click(function(){
						if($(this).hasClass('active')){
							$(this).removeClass('active');
						}else{
							$(this).addClass('active');
						}
					});

					// 撤单
					$('#J_chaseCancel').click(function(){
						var _ids = [];

						$('.J_chaseChose.active').each(function(){
							_ids.push($(this).data('id'));	
						});

						if(!_ids.length){
							GLOBAL.alert('请选择想要撤销的追号！');
							return;
						}
						COMMON.USER.chaseOrder.chaseCancel(_ids);
					});
				},
				chaseCancel: function(ids) {
					layer.confirm('确定要撤销选择的追号吗？', {
						icon: 2,
						closeBtn: 0,
						maxWidth: '520px'
					}, function(index) {
						GLOBAL.getAjaxData({
							url: '/bet/revoke',
							data: {
								ids: ids
							}
						}, function(d) {
							// layer.close(index);
							window.location.reload()
						});
					});				
				},
				renderDeatil: function(_id) {
					GLOBAL.getAjaxData({
						url: '/chase/detail',
						data: {
							id: _id
						}
					}, function(d) {
						// TODO：是否只显示这些字段
						// console.log(d);
						$('#order_id').text(d.order_id);
						$('#created').text(d.created);
						$('#money').text(d.money);
						$('#bonus').text(d.bonus);
						$('#is_winning_stop').text((d.is_winning_stop == 'yes'? '是' : '否'));
						$('#start_periods_num').text(d.start_periods_num);
						$('#end_periods_num').text(d.end_periods_num);
						$('#chase_periods').text(d.chase_periods);
					});
				},
				getList: function(_id) {
					GLOBAL.getAjaxData({
						url: '/bet/items',
						data: {
							id: _id,
							pageSize : 10
						}
					}, function(d) {
						COMMON.USER.chaseOrder.renderList(d);

						if(d.total > 10){
							laypage({
								cont: 'J_Paging',
								pages: Math.ceil(d.total / d.per_page),
								prev: '<',
								next: '>',
								first: false,
								last: false,
								skip: true, //是否开启跳页
								groups: 10, //连续显示分页数
								jump: function(obj) {
									COMMON.USER.chaseOrder.getData({
										page: obj.curr
									});
								}
							});
						}
					});
				},
				getData: function(option){
					option = option || {};
					option.pageSize = option.pageSize || 1;
					option.page = option.page || 10;
					GLOBAL.getAjaxData({
						url: '/bet/items',
						data: {
							id: Number(GLOBAL.getRequestURL().id),
							pageSize: option.pageSize,
							page: option.page
						}
					}, function(d) {
						COMMON.USER.chaseOrder.renderList(d);
					});
				},
				renderList: function(data) {
					var _str = '';
					if (data.total > 0){
						$.each(data.data, function(i, n){
							// TODO: 系列
							_str += '<li>';
							_str += '    <div class="t1">'+ n.rule +'</div>';
							_str += '    <div class="t2" title="'+ n.number +'">'+ n.number +'</div>';
							_str += '    <div class="t3">'+ n.num +'</div>';
							_str += '    <div class="t4">什么系列？？？'+ COMMON.USER.converUnit(n.unit) + ' / ' + n.multiple +'</div>';
							_str += '    <div class="t5">'+ n.money +'</div>';
							_str += '</li>';
						});					
					} else {
						_str += '<li class="empty">没有找到符合条件的数据</li>';
					}

					$('#J_list1').html(_str);
				}
			},
			// 账变明细
			accountDetails: {
				init: function(){
					COMMON.USER.initDatePick();
					this.bindEvent();
				},
				bindEvent: function(d){
					$('#J_searchListBtn').click(function() {
						COMMON.USER.accountDetails.getList();
					});
				},
				renderList: function(data) {
					var _str = '';
					if (data.total > 0){
						$.each(data.data, function(i, n){
							_str += '<li>';
							_str += '    <div class="t1">'+ n.comment +'</div>';
							_str += '    <div class="t2">'+ n.id +'</div>';
							_str += '    <div class="t3">'+ (n.form == 'expend'? '支出' : '收入') +'</div>';
							_str += '    <div class="t4">'+ n.num +'</div>';
							_str += '    <div class="t5">-</div>';
							_str += '</li>';
						});					
					} else {
						_str += '<li class="empty">没有找到符合条件的数据</li>';
					}

					$('#J_list').html(_str);
				},
				getList: function(option) {
					option = option || {};
					option.type = option.type || $('#J_status').val() || '';
					option.created_min = option.created_min || $('#J_startDay').val() || '';
					option.created_max = option.created_max || $('#J_endDay').val() || '';
					option.pageSize = option.pageSize || 10;
					option.page = option.page || 1;

					GLOBAL.getAjaxData({
						url: '/user/balance-log',
						data: {
							status: option.type,
							created_min: option.created_min,
							created_max: option.created_max,
							pageSize: option.pageSize,
							page: option.page
						}
					}, function(d) {
						COMMON.USER.accountDetails.renderList(d);
						if(d.total > 10){
							laypage({
								cont: 'J_Paging',
								pages: Math.ceil(d.total / d.per_page),
								prev: '<',
								next: '>',
								first: false,
								last: false,
								skip: true, //是否开启跳页
								groups: 10, //连续显示分页数
								jump: function(obj) {
									COMMON.USER.accountDetails.getData({
										page: obj.curr
									});
								}
							});
						}
					});
				},
				getData: function(option){
					option = option || {};
					option.type = option.type || $('#J_status').val() || '';
					option.created_min = option.created_min || $('#J_startDay').val() || '';
					option.created_max = option.created_max || $('#J_endDay').val() || '';
					option.pageSize = option.pageSize || 10;
					option.page = option.page || 1;
					GLOBAL.getAjaxData({
						url: '/user/balance-log',
						data: {
							status: option.type,
							created_min: option.created_min,
							created_max: option.created_max,
							pageSize: option.pageSize,
							page: option.page
						}
					}, function(d) {
						COMMON.USER.accountDetails.renderList(d);
					});
				}
			},
			// 登录密码 / 资金密码
			password: {
				init: function(type){
					this.bindEvent(type);
				},
				bindEvent: function(type){
					$('#J_confirmBtn').click(function(){
						var old_password = $('#old_password').val();
						var password = $('#password').val();
						var confirm_password = $('#confirm_password').val();

						if (type == 'fund') {
							//TODO: 如果有原密码则必填，修改登录密码时必填，修改资金安全密码时需要核查用户详情是否设置资金密码状态。
							
						}

						if (!old_password) {
							GLOBAL.alert('请输入旧密码！');
							return false;
						}
						if (!password.length) {
							GLOBAL.alert('请输入新密码！');
							return false;
						}
						if (password.length < 6 || password.length > 16) {
							GLOBAL.alert('新密码由6到16位数字或字母组成');
							return false;
						} else {
							var _reg = /^[a-zA-Z0-9]+$/;
							if(!_reg.test(password)){
								GLOBAL.alert('新密码由6到16位数字或字母组成,不能使用特殊字符');
								return false;
							}
						}
						if (!confirm_password.length) {
							GLOBAL.alert('请输入确认密码！');
							return false;
						}

						if (password != confirm_password) {
							GLOBAL.alert('确认密码必需与新密码一至！');
							return false;
						}

						GLOBAL.getAjaxData({
							url: '/user/password',
							data: {
								type : type,
								old_password : old_password,
								password : password,
								confirm_password : confirm_password
							}
						}, function(data) {
							var _msg = '登录密码修改成功'
							if (type == '') {
								_msg = '资金密码修改成功';
							}

							if (password != confirm_password) {
								GLOBAL.alert(_msg, 2000, 1);
								return false;
							}
						});
					});
				}
			},
			// 链接注册
			linkRegistration: {
				init: function() {
					$('#J_inviteType span').click(function(){
						$(this).addClass('active').siblings().removeClass('active');
					});

					$('#J_confirmBtn').click(function(){
						var _type = $('#J_inviteType span.active').data('t');
					});
				}
			},
			// 链接管理
			linkManagement: {
				init: function() {
					this.bindEvent();
				},
				bindEvent: function() {
					$('#J_searchListBtn').click(function() {
						COMMON.USER.linkManagement.getList();
					});

					$('#J_list').on('click', '.J_delLink', function(){
						var _this = $(this);
						var _id = _this.data('id');
						layer.confirm('确定要删除该链接吗？', {
							icon: 2,
							closeBtn: 0,
							maxWidth: '520px'
						}, function(index) {
							GLOBAL.getAjaxData({
								url: '/invite/cancel',
								data: {
									id : _id
								}
							}, function(data) {
								layer.close(index);
								COMMON.USER.linkManagement.getList();
							});
						});
					});
				},
				renderList: function(data) {
					var _str = '';
					if (data.total > 0){
						$.each(data.data, function(i, n){
							_str += '<li>';
							_str += '    <div class="t1">'+ n.channel +'</div>';
							_str += '    <div class="t2 J_clipboard J_clipboard_'+ i +'" data-clipboard-text="'+ n.code +'">'+ n.code +'</div>';
							_str += '    <div class="t3">'+ n.register +'</div>';
							_str += '    <div class="t4">'+ (n.type == 'member' ? '会员' : '代理') +'</div>';
							_str += '    <div class="t5">'+ (n.status == 'normal'? '正常' : '取消') +'</div>';
							_str += '    <div class="t6">'+ n.created +'</div>';
							_str += '    <div class="t7">'+ n.term_at +'</div>';
							if(n.status == 'normal'){
								_str += '<div class="t8 J_delLink" data-id="'+ n.id +'">删除</div>';
							}else{
								_str += '<div class="t8">-</div>';
							}
							_str += '</li>';
						});					
					} else {
						_str += '<li class="empty">没有找到符合条件的数据</li>';
					}

					$('#J_list').html(_str);

					$.each($('.J_clipboard'), function(i, n){
						var clipboard = new Clipboard('.J_clipboard_' + i);
						clipboard.on('success', function(e) {
						    // console.info('Action:', e.action);
						    // console.info('Text:', e.text);
						    // console.info('Trigger:', e.trigger);
						    // GLOBAL.alert('复制成功', 2000, 1);
						    e.clearSelection();
						});

						clipboard.on('error', function(e) {
							// console.log(e);
						    // console.error('Action:', e.action);
						    // console.error('Trigger:', e.trigger);
						});
					});

				},
				getList: function(option) {
					option = option || {};
					option.status = option.status || $('#J_status').val() || '';
					option.type = option.type || $('#J_linkType').val() || '';
					option.channel = option.channel || $('#channel').val() || '';
					option.created_min = option.created_min || $('#J_startDay').val() || '';
					option.created_max = option.created_max || $('#J_endDay').val() || '';
					option.pageSize = option.pageSize || 10;
					option.page = option.page || 1;

					GLOBAL.getAjaxData({
						url: '/invite/lists',
						data: {
							status: option.status,
							type: option.type,
							channel: option.channel,
							created_min: option.created_min,
							created_max: option.created_max,
							pageSize: option.pageSize,
							page: option.page
						}
					}, function(d) {
						COMMON.USER.linkManagement.renderList(d);
						if(d.total > 10){
							laypage({
								cont: 'J_Paging',
								pages: Math.ceil(d.total / d.per_page),
								prev: '<',
								next: '>',
								first: false,
								last: false,
								skip: true, //是否开启跳页
								groups: 10, //连续显示分页数
								jump: function(obj) {
									COMMON.USER.linkManagement.getData({
										page: obj.curr
									});
								}
							});
						}
					});
				},
				getData: function(option){
					option = option || {};
					option.status = option.status || $('#J_status').val() || '';
					option.type = option.type || $('#J_linkType').val() || '';
					option.channel = option.channel || $('#channel').val() || '';
					option.created_min = option.created_min || $('#J_startDay').val() || '';
					option.created_max = option.created_max || $('#J_endDay').val() || '';
					option.pageSize = option.pageSize || 10;
					option.page = option.page || 1;
					GLOBAL.getAjaxData({
						url: '/invite/lists',
						data: {
							status: option.status,
							type: option.type,
							channel: option.channel,
							created_min: option.created_min,
							created_max: option.created_max,
							pageSize: option.pageSize,
							page: option.page
						}
					}, function(d) {
						COMMON.USER.linkManagement.renderList(d);
					});
				}
			},
			// 下级管理
			subordinateManagement: {
				init: function() {
					setTimeout(function(){
						$('#J_userNames').html('<span class="J_name">' + $('#J_headerUserName').data('n') + '</span>');
					}, 200);
					COMMON.USER.initDatePick();
					this.bindEvent();
				},
				bindEvent: function() {
					$('#J_searchListBtn').click(function() {
						COMMON.USER.subordinateManagement.getList();
					});

					$('#J_list').on('click', '.t2', function(){
						if ($(this).html() == $('.J_name').last().text().split('>')[1]) {
							return;
						}

						$('#J_userNames').html($('#J_userNames').html() + '<span class="J_name">&gt;' + $(this).html() + '</span>');
						COMMON.USER.subordinateManagement.getData({
							username : $(this).html()
						});
					});

					$('#J_userNames').on('click', '.J_name', function(){
						$(this).nextAll().remove();
						// $('#J_userNames').html($('#J_userNames').html() + '&gt;<span class="J_name">' + $(this).html() + '</span>');
						
						COMMON.USER.subordinateManagement.getData({
							username : $(this).html()
						});
					});
				},
				renderList: function(data) {
					var _str = '';
					if (data.total > 0){
						$.each(data.data, function(i, n){
							_str += '<li>';
							_str += '    <div class="t1">'+ n.id +'</div>';
							_str += '    <div class="t2">'+ n.username +'</div>';
							_str += '    <div class="t3">'+ n.balance +'</div>';
							_str += '    <div class="t4">'+ n.invite_num +'</div>';
							_str += '    <div class="t5">'+ n.inactive +'</div>';
							_str += '    <div class="t6">'+ n.created +'</div>';
							_str += '</li>';
						});					
					} else {
						_str += '<li class="empty">没有找到符合条件的数据</li>';
					}

					$('#J_list').html(_str);
				},
				getList: function(option) {
					option = option || {};
					option.username = option.username || $('#username').val() || '';
					option.range = option.range || $('#range').val() || '';
					option.created_min = option.created_min || $('#J_startDay').val() || '';
					option.created_max = option.created_max || $('#J_endDay').val() || '';
					option.pageSize = option.pageSize || 10;
					option.page = option.page || 1;

					GLOBAL.getAjaxData({
						url: '/user/branch',
						data: {
							username: option.username,
							range: option.range,
							created_min: option.created_min,
							created_max: option.created_max,
							pageSize: option.pageSize,
							page: option.page
						}
					}, function(d) {
						COMMON.USER.subordinateManagement.renderList(d);
						if(d.total > 10){
							laypage({
								cont: 'J_Paging',
								pages: Math.ceil(d.total / d.per_page),
								prev: '<',
								next: '>',
								first: false,
								last: false,
								skip: true, //是否开启跳页
								groups: 10, //连续显示分页数
								jump: function(obj) {
									COMMON.USER.subordinateManagement.getData({
										page: obj.curr
									});
								}
							});
						}
					});
				},
				getData: function(option){
					option = option || {};
					option.username = option.username || $('#username').val() || '';
					option.range = option.range || $('#range').val() || '';
					option.created_min = option.created_min || $('#J_startDay').val() || '';
					option.created_max = option.created_max || $('#J_endDay').val() || '';
					option.pageSize = option.pageSize || 10;
					option.page = option.page || 1;
					GLOBAL.getAjaxData({
						url: '/user/branch',
						data: {
							username: option.username,
							range: option.range,
							created_min: option.created_min,
							created_max: option.created_max,
							pageSize: option.pageSize,
							page: option.page
						}
					}, function(d) {
						COMMON.USER.subordinateManagement.renderList(d);
					});
				}
			},
			// 报表管理
			reportManagement: {
				init: function() {
					setTimeout(function(){
						$('#J_userNames').html('<span class="J_name">' + $('#J_headerUserName').data('n') + '</span>');
					}, 200);
					COMMON.USER.initDatePick();
					this.bindEvent();
				},
				bindEvent: function() {
					$('#J_searchListBtn').click(function() {
						COMMON.USER.reportManagement.getList();
					});

					$('#J_list').on('click', '.t1', function(){
						if ($(this).html() == $('.J_name').last().text().split('>')[1]) {
							return;
						}

						$('#J_userNames').html($('#J_userNames').html() + '<span class="J_name">&gt;' + $(this).html() + '</span>');
						COMMON.USER.reportManagement.getData({
							username : $(this).html()
						});
					});

					$('#J_userNames').on('click', '.J_name', function(){
						$(this).nextAll().remove();
						// $('#J_userNames').html($('#J_userNames').html() + '&gt;<span class="J_name">' + $(this).html() + '</span>');
						
						COMMON.USER.reportManagement.getData({
							username : $(this).html()
						});
					});
				},
				renderList: function(data) {
					var _str = '';
					if (data.total > 0){
						$.each(data.data, function(i, n){
							_str += '<li>';
							_str += '    <div class="t1">'+ n.username +'</div>';
							_str += '    <div class="t2">'+ n.team_recharge + '/' + n.recharge +'</div>';
							_str += '    <div class="t3">'+ n.team_withdraw + '/' + n.withdraw +'</div>';
							_str += '    <div class="t4">'+ n.team_bet + '/' + n.bet +'</div>';
							_str += '    <div class="t5">'+ n.team_winning + '/' + n.winning +'</div>';
							_str += '    <div class="t6">'+ n.team_income + '/' + n.income +'</div>';
							_str += '</li>';
						});					
					} else {
						_str += '<li class="empty">没有找到符合条件的数据</li>';
					}

					$('#J_list').html(_str);
				},
				getList: function(option) {
					option = option || {};
					option.username = option.username || $('#username').val() || '';
					option.date_min = option.date_min || $('#J_startDay').val() || '';
					option.date_max = option.date_max || $('#J_endDay').val() || '';
					option.pageSize = option.pageSize || 10;
					option.page = option.page || 1;

					GLOBAL.getAjaxData({
						url: '/invite/profit',
						data: {
							username: option.username,
							date_min: option.date_min,
							date_max: option.date_max,
							pageSize: option.pageSize,
							page: option.page
						}
					}, function(d) {
						COMMON.USER.reportManagement.renderList(d);
						if(d.total > 10){
							laypage({
								cont: 'J_Paging',
								pages: Math.ceil(d.total / d.per_page),
								prev: '<',
								next: '>',
								first: false,
								last: false,
								skip: true, //是否开启跳页
								groups: 10, //连续显示分页数
								jump: function(obj) {
									COMMON.USER.reportManagement.getData({
										page: obj.curr
									});
								}
							});
						}
					});
				},
				getData: function(option){
					option = option || {};
					option.username = option.username || $('#username').val() || '';
					option.date_min = option.date_min || $('#J_startDay').val() || '';
					option.date_max = option.date_max || $('#J_endDay').val() || '';
					option.pageSize = option.pageSize || 10;
					option.page = option.page || 1;
					GLOBAL.getAjaxData({
						url: '/invite/profit',
						data: {
							username: option.username,
							date_min: option.date_min,
							date_max: option.date_max,
							pageSize: option.pageSize,
							page: option.page
						}
					}, function(d) {
						COMMON.USER.reportManagement.renderList(d);
					});
				}
			},
			// 团队投注
			teamBetting: {
				init: function() {
					COMMON.USER.initDatePick();
					this.bindEvent();
				},
				bindEvent: function(d){
					$('#J_searchListBtn').click(function() {
						COMMON.USER.teamBetting.getList();
					});
				},
				renderList: function(data) {
					var _str = '';
					if (data.total > 0){
						$.each(data.data, function(i, n){
							_str += '<li>';
							_str += '    <div class="t1">'+ n.product.name +'</div>';
							_str += '    <div class="t2">'+ n.order_id +'</div>';
							_str += '    <div class="t3">'+ n.username +'</div>';
							_str += '    <div class="t4">'+ n.created +'</div>';
							_str += '    <div class="t5">'+ n.periods.date + '-'+ n.periods.num +'</div>';
							_str += '    <div class="t6">'+ (n.periods.lottery_num?n.periods.lottery_num:'-') +'</div>';
							_str += '    <div class="t7">'+ n.money +'</div>';
							_str += '    <div class="t8">'+ n.bonus +'</div>';
							_str += '</li>';
						});					
					} else {
						_str += '<li class="empty">没有找到符合条件的数据</li>';
					}

					$('#J_list').html(_str);
				},
				getList: function(option) {
					option = option || {};
					option.username = option.username || $('#username').val() || '';
					option.date_min = option.date_min || $('#J_startDay').val() || '';
					option.date_max = option.date_max || $('#J_endDay').val() || '';
					option.pageSize = option.pageSize || 10;
					option.page = option.page || 1;

					GLOBAL.getAjaxData({
						url: '/invite/bet',
						data: {
							username: option.username,
							date_min: option.date_min,
							date_max: option.date_max,
							pageSize: option.pageSize,
							page: option.page
						}
					}, function(d) {
						COMMON.USER.teamBetting.renderList(d);
						if(d.total > 10){
							laypage({
								cont: 'J_Paging',
								pages: Math.ceil(d.total / d.per_page),
								prev: '<',
								next: '>',
								first: false,
								last: false,
								skip: true, //是否开启跳页
								groups: 10, //连续显示分页数
								jump: function(obj) {
									COMMON.USER.teamBetting.getData({
										page: obj.curr
									});
								}
							});
						}
					});
				},
				getData: function(option){
					option = option || {};
					// option.status = option.status || $('#J_status').val() || '';
					option.date_min = option.date_min || $('#J_startDay').val() || '';
					option.date_max = option.date_max || $('#J_endDay').val() || '';
					option.pageSize = option.pageSize || 10;
					option.page = option.page || 1;
					option.username = option.username || $('#username').val() || '';
					GLOBAL.getAjaxData({
						url: '/invite/bet',
						data: {
							username: option.username,
							date_min: option.date_min,
							date_max: option.date_max,
							pageSize: option.pageSize,
							page: option.page
						}
					}, function(d) {
						COMMON.USER.teamBetting.renderList(d);
					});
				}
			}
		},
		CHART : {
			holder: {
				winningNumber: [], //单行中奖号码
				canvasColumns: []
			},
			init: function(options) {
				options = options || {};
				options.length = options.length || 5; //默认5列有折线
				options.hasDiscounted = (options.hasDiscounted != undefined) ? options.hasDiscounted : true; //是否有折现

				for (var i = options.length - 1; i >= 0; i--) {
					COMMON.CHART.holder.winningNumber[i] = '';
				}

				if(!GLOBAL.lessThenIE8() && options.hasDiscounted){
					// 绘制折线
					COMMON.CHART.draw(COMMON.CHART.holder.winningNumber);
				}
			},
			getBetHistory: function(options) {
				options = options || {};
	            options.page = options.page || 1;
	            options.pageSize = options.pageSize || 30;

				 GLOBAL.getAjaxData({
	                url: '/bet/lists',
	                data: {
	                    page: options.page,
	                    pageSize: options.pageSize
	                }
	            }, function(data) {
	            });
			},
			draw: function(a) {
				COMMON.CHART.clearCanvas();
				COMMON.CHART.collectBalls(a);
				COMMON.CHART.canvasDirection(COMMON.CHART.holder.canvasColumns)
			},
			collectBalls: function(a) {
				for (var i = a.length - 1; i >= 0; i--) {
					COMMON.CHART.holder.canvasColumns[i] = [];
					$(".ch-row-contner .numCount-wrp ul.winning-" + (i + 1) + " li").each(function() {
						var a = {};
						var c = $(this);
						if (c.hasClass("hit-blue")) {
							a.number = $(this).text();
							a.color = "blue";
							a.offset = c.offset();
							COMMON.CHART.holder.canvasColumns[i].push(a);
						}

						if (c.hasClass("hit-red")) {
							a.number = $(this).text();
							a.color = "red";
							a.offset = c.offset();
							COMMON.CHART.holder.canvasColumns[i].push(a);
						}
					})
				}
			},
			canvasDirection: function(a) {
				for (var b = 0; b < a.length; b++) {
					for (var c = a[b], d = 0; d < c.length - 1; d++) {
						var e = c[d + 1].offset.left - c[d].offset.left;
						e > 0 ? COMMON.CHART.canvasProperties(c[d], c[d + 1], "right", b + "_" + d) : e < 0 ? COMMON.CHART.canvasProperties(c[d], c[d + 1], "left", b + "_" + d) : 0 == e && COMMON.CHART.canvasProperties(c[d], c[d + 1], "straight", b + "_" + d)
					}
				}
			},
			canvasProperties: function(a, b, c, d) {
				var e = {};
				switch (e.id = d, e.provideClass = a.color, e.height = 41, c) {
					case "right":
						e.style = "position: absolute; visibility: visible; top: " + (a.offset.top + 11) + "px; left: " + (a.offset.left + 11) + "px;", e.width = Math.abs(a.offset.left - b.offset.left);
						break;
					case "left":
						e.style = "position: absolute; visibility: visible; top: " + (a.offset.top + 11) + "px; left: " + (b.offset.left + 11) + "px;", e.width = Math.abs(a.offset.left - b.offset.left);
						break;
					case "straight":
						e.style = "position: absolute; visibility: visible; top: " + (a.offset.top + 10) + "px; left: " + (a.offset.left + 10) + "px;", e.width = 2
				}
				COMMON.CHART.createCanvas(e, c)
			},
			createCanvas: function(a, b) {
				var c = document.createElement("canvas");
				"undefined" != typeof G_vmlCanvasManager && G_vmlCanvasManager.initElement(c), c.className = a.provideClass, c.width = a.width, c.height = a.height, c.style.cssText = a.style, c.id = a.id;
				var d = document.getElementById("chartBody"),
					e = document.getElementById("foot");

				d.insertBefore(c, e), COMMON.CHART.drawLine(c, b)
			},
			drawLine: function(a, b) {
				var c, d, e, f, g;
				switch ("blue" == a.className ? c = "#54B8FD" : "red" == a.className && (c = "#FEA4A4"), b) {
					case "right":
						d = 0, e = 0, f = a.width, g = a.height;
						break;
					case "left":
						d = a.width, e = 0, f = 0, g = a.height;
						break;
					case "straight":
						d = 0, e = 0, f = 2, g = a.height
				}
				var h = document.getElementById(a.id);
				var i = h.getContext("2d");
				i.beginPath(), i.moveTo(d, e), i.lineTo(f, g), i.lineWidth = 2, i.strokeStyle = c, i.stroke()
			},
			clearCanvas: function() {
				$('canvas').remove();
			}
		}
	}

	COMMON.init();
// });