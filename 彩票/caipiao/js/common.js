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
				$('#J_headerUserName').data('n', data.username);
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
                }

                return _txt;
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
				}
			},
			// 充值记录
			rechargeRecord: {
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
					GLOBAL.getAjaxData({
						url: '/user/detail'
					}, function(data) {
						// TODO：资金密码 + 确认资金密码是否有返回？？？
						console.log(data);
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
					option.status = option.status || $('#J_status').next('.nice-select').find('.selected').data().value || '';
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
						if(d.total > 0){
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
					option.status = option.status || $('#J_status').next('.nice-select').find('.selected').data().value || '';
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
					option.type = option.type || $('#J_status').next('.nice-select').find('.selected').data().value || '';
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
						if(d.total > 0){
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
					option.type = option.type || $('#J_status').next('.nice-select').find('.selected').data().value || '';
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
							layer.alert('请输入旧密码！', {
								skin: 'bett-alert-dialog',
								icon: 2
							});
							return false;
						}
						if (!password.length) {
							layer.alert('请输入新密码！', {
								skin: 'bett-alert-dialog',
								icon: 2
							});
							return false;
						}
						if (password.length < 6 || password.length > 16) {
							layer.alert('新密码由6到16位数字或字母组成', {
								skin: 'bett-alert-dialog',
								icon: 2
							});
							return false;
						} else {
							var _reg = /^[a-zA-Z0-9]+$/;
							if(!_reg.test(password)){
								layer.alert('新密码由6到16位数字或字母组成,不能使用特殊字符', {
									skin: 'bett-alert-dialog',
									icon: 2
								});
								return false;
							}
						}
						if (!confirm_password.length) {
							layer.alert('请输入确认密码！', {
								skin: 'bett-alert-dialog',
								icon: 2
							});
							return false;
						}

						if (password != confirm_password) {
							layer.alert('确认密码必需与新密码一至！', {
								skin: 'bett-alert-dialog',
								icon: 2
							});
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
								layer.alert(_msg, {
									skin: 'bett-alert-dialog',
									icon: 1,
									time: 2000
								});
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
						console.log(_type);

						// TOTO: 哪个接口？

						// GLOBAL.getAjaxData({
						// 	url: '/invite/add',
						// 	data: {
						// 		type : _type
						// 	}
						// }, function(data) {
							
						// });
					});
				}
			},
			// 链接管理
			linkManagement: {
				init: function() {
					console.log('不知道哪个接口');
					this.getList();
				},
				bindEvent: function() {
					var clipboard = new Clipboard('.J_clipboard');
					clipboard.on('success', function(e) {
					    console.info('Action:', e.action);
					    console.info('Text:', e.text);
					    console.info('Trigger:', e.trigger);
					    e.clearSelection();
					});

					clipboard.on('error', function(e) {
					    console.error('Action:', e.action);
					    console.error('Trigger:', e.trigger);
					});
				},
				getList: function(option) {
					option = option || {};

					// GLOBAL.getAjaxData({
					// 	url: '/invite/lists',
					// 	data: {
					// 		status: '',
					// 		created_min: '',
					// 		created_max: '',
					// 	}
					// }, function(data) {
					// 	console.log(data);
					// });
				}
			},

			// 下级管理
			subordinateManagement: {
				init: function() {
					setTimeout(function(){
						$('#J_userNames').html('<span class="J_name">' + $('#J_headerUserName').data('n') + '</span>');
					}, 1000);
					COMMON.USER.initDatePick();
					this.bindEvent();
				},
				bindEvent: function() {
					$('#J_searchListBtn').click(function() {
						COMMON.USER.subordinateManagement.getList();
					});

					$('#J_list').on('click', '.t1', function(){
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
							_str += '    <div class="t1">'+ n.username +'</div>';
							_str += '    <div class="t2">'+ n.recharge +'</div>';
							_str += '    <div class="t3">'+ n.withdraw +'</div>';
							_str += '    <div class="t4">'+ n.bet +'</div>';
							_str += '    <div class="t5">返点？？？</div>';
							_str += '    <div class="t6">'+ n.winning +'</div>';
							_str += '    <div class="t7">活动？？？</div>';
							_str += '    <div class="t8">盈亏？？</div>';
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
						url: '/invite/users',
						data: {
							username: option.username,
							date_min: option.date_min,
							date_max: option.date_max,
							pageSize: option.pageSize,
							page: option.page
						}
					}, function(d) {
						COMMON.USER.subordinateManagement.renderList(d);
						if(d.total > 0){
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
					option.date_min = option.date_min || $('#J_startDay').val() || '';
					option.date_max = option.date_max || $('#J_endDay').val() || '';
					option.pageSize = option.pageSize || 10;
					option.page = option.page || 1;
					GLOBAL.getAjaxData({
						url: '/invite/users',
						data: {
							username: option.username,
							date_min: option.date_min,
							date_max: option.date_max,
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
					}, 1000);
					COMMON.USER.initDatePick();
					this.bindEvent();
				},
				bindEvent: function() {
					$('#J_searchListBtn').click(function() {
						COMMON.USER.reportManagement.getList();
					});

					$('#J_list').on('click', '.t1', function(){
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
							_str += '    <div class="t2">'+ n.recharge +'</div>';
							_str += '    <div class="t3">'+ n.withdraw +'</div>';
							_str += '    <div class="t4">'+ n.bet +'</div>';
							_str += '    <div class="t5">返点？？？</div>';
							_str += '    <div class="t6">'+ n.winning +'</div>';
							_str += '    <div class="t7">活动？？？</div>';
							_str += '    <div class="t8">盈亏？？</div>';
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
						if(d.total > 0){
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
							_str += '    <div class="t6">'+ n.periods.lottery_num +'</div>';
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
						if(d.total > 0){
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
					// option.status = option.status || $('#J_status').next('.nice-select').find('.selected').data().value || '';
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
		}
	}

	COMMON.init();
// });