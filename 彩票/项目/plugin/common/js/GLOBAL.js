var GLOBAL = {
	AJAX: {
		/**
		 * GLOBAL.AJAX.getAjaxData AJAX 请求获取处理协议 options 必输项 options.url
		 * 
		 * @param options
		 * @param func
		 * @param error_func
		 */
		getAjaxData: function(options, func, error_func) {
			// var config = GLOBAL.SESSION.getSessionItem('config');
			// if (!config) {
			// 	GLOBAL.USER.relogin();
			// 	return;
			// }
			options = options || {};
			options.type = options.type || 'post';
			options.dataType = options.dataType || 'json';
			options.async = (options.async != undefined) ? options.async : true;
			options.data = options.data || {};
			options.contentType = options.contentType || 'application/json';
			options.loading = (options.loading != undefined) ? options.loading : true; // 是否需要添加loading

			$.ajax({
				url: options.url,
				async: options.async,
				data: JSON.stringify(options.data),
				dataType: options.dataType,
				type: options.type,
				contentType: options.contentType,
				processData: true,
				traditional: true,
				cache: true,
				beforeSend: function(xhr) {
					// if (options.loading) {
					// 	MaskUtil.mask();
					// }
					xhr.setRequestHeader('Content-Type', options.contentType);
				},
				success: function(d) {
					// if (options.loading) {
					// 	MaskUtil.unmask();
					// }
					if (d.code == 'SUCCESS' || d.code == 'success') {
						if (typeof(func) == 'function') {
							func(d.data, options.data);
						} else if (func) {
							try {
								eval('' + func + '(' + d.data + ',' + options.data + ')');
							} catch (err) {
								throw new Error("回调不可用");
							}
						}
					} else if (d.code == 'SESSION_EXPIRED' || d.code == '5000') {
						// GLOBAL.USER.relogin({}, true);
					} else {
						if (error_func) {
							if (typeof(error_func) == 'function') {
								error_func(d.message, d);
							} else {
								eval('' + error_func + '(' + d.message + ',' + d + ')');
							}
						} else {
							layer.msg(d.message, {
								icon: 5
							});
						}
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					var msg = '<div style="padding:0 0 0 40px;"><h4>协议返回异常</h4>请检查用户配置或网络</div> ';
					layer.msg(msg, {
						icon: 2
					});
				}
			});
			// }
		},
	},
	/**
	 * [DATEPICKER 日期控件]
	 * @type {Object}
	 * 基于jQueryUi的datepicker
	 * 使用时需要引用的静态资源：jquery-ui.min.css、jquery.min.js、jquery-ui.min.js
	 * 具体参数使用方法可参见：http://blog.csdn.net/hliq5399/article/details/22406989
	 */
	DATEPICKER: {
		init: function() {
			var _this = this;
			//初始化日期,默认设置为当前日期
			the_day();

			function p(s) {
				return s < 10 ? '0' + s : s;
			}

			function the_day() {
				var myDate = new Date();
				//获取当前年
				var year = myDate.getFullYear();
				//获取当前月
				var month = myDate.getMonth() + 1;
				//获取当前日
				var date = myDate.getDate();
				var h = myDate.getHours(); //获取当前小时数(0-23)
				var m = myDate.getMinutes(); //获取当前分钟数(0-59)
				var s = myDate.getSeconds();
				var now = year + '-' + p(month) + "-" + p(date);
				$("#startDay,#endDay,.startDay,.endDay,.agentDay,.beforeToday,.afterToday").val(now);
			}

			_this.bindEvent();
		},
		bindEvent: function() {
			$(".endDay").datepicker({
				onClose: function(dateText, inst) {
					$('#endDay').val(dateText); //获取结束日期
					$(".startDay").datepicker("option", "maxDate", dateText);
				},
				dateFormat: 'yy-mm-dd',
				maxDate: "-30 30D",
				defaultDate: '-1M'
			});

			$(".startDay").datepicker({
				onClose: function(dateText, inst) {
					$('#startDay').val(dateText); //获取开始日期
					$(".endDay").datepicker("option", "minDate", dateText);
				},
				dateFormat: 'yy-mm-dd',
				maxDate: "-30 30D"
			});

			$(".beforeToday").datepicker({
				dateFormat: 'yy-mm-dd',
				maxDate: 0
			});

			$(".afterToday").datepicker({
				dateFormat: 'yy-mm-dd',
				minDate: 0
			});

			$(".agentDay").datepicker({
				dateFormat: 'yy-mm-dd'
			});
		}
	},
	/**
	 * [SESSION 存储session信息，sessionStorage或者cookie存储]
	 * 使用时需要引用的静态资源：jquery.cookie.js
	 * @type {Object}
	 */
	SESSION: {
		getSessionItem: function(key) {
			var use_cookie = (window.sessionStorage) ? false : true;
			var _key = (use_cookie ? $.cookie(key) : (window.sessionStorage.getItem(key)));
			_key = (_key ? _key : '');
			try {
				return _key && (_key != undefined) ? jQuery.parseJSON(_key) : null;
			} catch (err) {
				return _key;
			}
		},
		getSessionItem2: function(key) {
			var use_cookie = (window.sessionStorage) ? false : true;
			var _key = (use_cookie ? $.cookie(key) : (window.sessionStorage.getItem(key)));
			_key = (_key ? _key : '');
			return _key;
		},
		setSessionItem: function(key, value) {
			if (window.sessionStorage) {
				if (value && value != '') {
					window.sessionStorage.setItem(key, value);
				} else {
					window.sessionStorage.removeItem(key);
				}
			} else {
				$.cookie(key, value);
			}
		},
		removeItem: function(key) {
			if (window.sessionStorage) {
				window.sessionStorage.removeItem(key);
			} else {
				$.cookie(key, '', {
					path: '/'
				});
			}
		}
	},
	/**
	 * [USER 用户相关]
	 * 使用时需要引用的静态资源：layer.js
	 * @type {Object}
	 */
	USER: {
		checkLogin: function() {
			var user = GLOBAL.SESSION.getSessionItem('user');
			if (user && user.uid) {
				return true;
			} else {
				// TODO：提示登录
				alert('请登录');
				return false;
			}
		},
		logout: function() {
			layer.confirm('您确认要退出当前系统吗?', {
				icon: 3,
				title: '退出登录'
			}, function(index) {
				console.log('退出登录');
				// GLOBAL.AJAX.getAjaxData({
				//     url: '/logout',
				//     loading: false
				// }, function() {
				//     window.sessionStorage.clear();
				//     window.location.href = 'login';
				// });
			});
		},
		relogin: function() {
			window.location.href = 'login';
		}
	},
	TOOL: {
		getRequestURL: function() {
			var url = decodeURI(window.location.search);
			var theRequest = new Object();
			if (url.indexOf('?') != -1) {
				var str = url.substr(1);
				var strs = str.split('&');
				for (var i = 0; i < strs.length; i++) {
					theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
				}
			}
			return theRequest;
		}
	},
	/*
	LOTTERY: {
		init: function() {
			POP.bindEvent();
			POP.user();			//个人
			POP.withdrawals();	//提款
			POP.proxy();		//代理
			$('select').niceSelect();
			GLOBAL.DATEPICKER.init();
		},
		proxy: function() {
			// 代理
			$('.new-switch-con .po-middle').click(function() {
				$(this).toggleClass('selected');
				var se = $(this).hasClass('selected');
				if (se) {
					$(this).html('会员');
				} else {
					$(this).html('代理');
				}
			});

			// 链接注册
			$('#agentLink').click(function() {
				POP.getAgentLink();
			});

			// 链接管理
			$('#agentLinkSearch').click(function(){
				POP.agentLink(1);
			});
			
			//链接管理 下一页
			$('.agent_next').bind('click', function() {
				var p = $('#agent_currentPage').html();
				var n = $('#agent_totalPage').html();
				if (p == n) {
					return;
				}
				p++;
				if (p == n) {
					$('.agent_next').addClass('disabled');
				}
				if (p > 1) {
					$('.agent_prev').removeClass('disabled');
				}
				$('#his_recharge_currentPage').html(p);
				POP.agentLink(p);
			});

			//链接管理 上一页
			$('.agent_prev').bind('click', function() {
				var p = $('#agent_currentPage').html();
				var n = $('#agent_totalPage').html();
				if (p <= 1) {
					return;
				}
				p--;
				if (p == 1) {
					$('.agent_prev').addClass('disabled');
				}
				if (p < n) {
					$('.agent_next').removeClass('disabled');
				}
				POP.agentLink(p);
			});

			// 删除推广链接
			$('#agentLinkList').on('click', '.delete-agent-link', function() {
				var linkId = $(this).attr('agent-id');
				POP.deleteAgentLink(linkId);
			});

			// 下级管理
			$('#agentMemberSearch').click(function(){
				POP.agentMember(1);
			});

			//邀请用户列表 下一页
			$('.agent_user_next').bind('click', function() {
				var p = $('#agent_user_currentPage').html();
				var n = $('#agent__user_totalPage').html();
				if (p == n) {
					return;
				}
				p++;
				if (p == n) {
					$('.agent_user_next').addClass('disabled');
				}
				if (p > 1) {
					$('.agent_user_prev').removeClass('disabled');
				}
				$('#his_recharge_currentPage').html(p);
				POP.agentLinkUser(p);
			});

			//邀请用户列表 上一页
			$('.agent_user_prev').bind('click', function() {
				var p = $('#agent_user_currentPage').html();
				var n = $('#agent__user_totalPage').html();
				if (p <= 1) {
					return;
				}
				p--;
				if (p == 1) {
					$('.agent_user_prev').addClass('disabled');
				}
				if (p < n) {
					$('.agent_user_next').removeClass('disabled');
				}
				POP.agentLinkUser(p);
			});

			// 报表管理
			$('#profitList').click(function(){
				POP.profitList(1);
			});

			//盈亏列表 下一页
			$('.profit_next').bind('click', function() {
				var p = $('#profit_currentPage').html();
				var n = $('#profit_totalPage').html();
				if (p == n) {
					return;
				}
				p++;
				if (p == n) {
					$('.profit_next').addClass('disabled');
				}
				if (p > 1) {
					$('.profit_prev').removeClass('disabled');
				}
				$('#his_recharge_currentPage').html(p);
				POP.profitList(p);
			});

			//盈亏列表 上一页
			$('.profit_prev').bind('click', function() {
				var p = $('#profit_currentPage').html();
				var n = $('#profit_totalPage').html();
				if (p <= 1) {
					return;
				}
				p--;
				if (p == 1) {
					$('.profit_prev').addClass('disabled');
				}
				if (p < n) {
					$('.profit_next').removeClass('disabled');
				}
				POP.profitList(p);
			});

			// 团队投注
			$('#agentBet_list').click(function() {
				POP.agentBetList(1);
			});

			//用户代理投注记录 下一页
			$('.agentBet_next').bind('click', function() {
				var p = $('#agentBet_currentPage').html();
				var n = $('#agentBet_totalPage').html();
				if (p == n) {
					return;
				}
				p++;
				if (p == n) {
					$('.agentBet_next').addClass('disabled');
				}
				if (p > 1) {
					$('.agentBet_prev').removeClass('disabled');
				}
				$('#his_recharge_currentPage').html(p);
				POP.agentBetList(p);
			});

			//用户代理投注记录 上一页
			$('.agentBet_prev').bind('click', function() {
				var p = $('#agentBet_currentPage').html();
				var n = $('#agentBet_totalPage').html();
				if (p <= 1) {
					return;
				}
				p--;
				if (p == 1) {
					$('.agentBet_prev').addClass('disabled');
				}
				if (p < n) {
					$('.agentBet_next').removeClass('disabled');
				}
				POP.agentBetList(p);
			});
		},
		withdrawals: function() {
			// 提款

			// 提款申请
			$('#card_application').click(function() {
				POP.bindCardInfo();
			});

			// 绑定银行卡
			$('#bind_card').click(function() {
				POP.bindCardInfo();
				POP.userInfo();
			});

			// 提款记录查询
			$('#withdrawal_records').click(function() {
				POP.drawingHistory(1);
			});

			//提款记录 下一页
			$('.his_tk_next').bind('click', function() {
				var p = $('#his_tk_currentPage').html();
				var n = $('#his_tk_totalPage').html();
				if (p == n) {
					return;
				}
				p++;
				if (p == n) {
					$('.his_page_next').addClass('disabled');
				}
				if (p > 1) {
					$('.his_page_prev').removeClass('disabled');
				}
				$('#his_tk_currentPage').html(p);
				POP.drawingHistory(p);
			});

			//提款记录 上一页
			$('.his_tk_prev').bind('click', function() {
				var p = $('#his_tk_currentPage').html();
				var n = $('#his_tk_totalPage').html();
				if (p <= 1) {
					return;
				}
				p--;
				if (p == 1) {
					$('.his_page_prev').addClass('disabled');
				}
				if (p < n) {
					$('.his_page_next').removeClass('disabled');
				}
				POP.drawingHistory(p);
			});
		},
		bindEvent: function() {
			// 左侧导航栏
			$('.sb-icons').click(function() {
				var _this = $(this);
				var val = _this.data('modal');

				if (!val) {
					return false;
				}

				POP.cutoverTabs(this, '.icon', '.content', '');
				$('#pop,#mask').fadeIn(0);
				$('.left-menu-icon').each(function() {
					var val2 = $(this).attr('data-modal2');
					if (val == val2) {
						POP.cutoverTabs(this, '.icon', '.content', '');
						if (val2 == 'personal') {
							POP.getpPersonalInfo();
						}
					}
				});
			});

			//关闭弹出层
			$('#mask,#popup_close').click(function() {
				$('#pop,#mask').fadeOut(300);
			});

			// 弹出层导航一级菜单
			$('.left-menu-icon').click(function() {
				var _this = $(this);
				var val2 = _this.attr('data-modal2');

				if (!_this.hasClass('gay')) {
					POP.cutoverTabs(this, '.icon', '.content', '');

					if (val2 == 'deposit') {
						POP.accountList();
					} else if (val2 == 'personal') {
						POP.getpPersonalInfo();
					}
				}
			});

			//左边滚动导航栏二级菜单
			$('.child_menus_li').click(function() {
				$('.result').find('ul').remove();
				$('form').removeClass('enable');
				$('form').find('.bankRadioBtn').removeClass('selected-red');
				var _this = $(this),
					_index = $(this).index();
				var u = _this.parent('ul');
				_this.addClass('child_menus_acrive').siblings('.child_menus_li').removeClass('child_menus_acrive');
				var p = _this.parent().parent().parent('.content');
				p.find('.info').eq(_index).show().siblings('.info').hide();

				GLOBAL.DATEPICKER.init();
			});

			// 充值记录
			$('#rechargeRecord').click(function() {
				POP.rechargeRecord(1);
			});
		},
		cutoverTabs: function(elm, e, j, k) {
			$(elm).addClass(k).siblings(e).removeClass(k);
			var u = $(j).find('ul');
			u.find('.child_menus_li:gt(0)').removeClass('child_menus_acrive');
			u.find('.child_menus_li:eq(0)').addClass('child_menus_acrive');
			$(j).find('.info:gt(0)').hide();
			$(j).find('.info:eq(0)').show();
			$('#pop ' + j + ':eq(' + $(elm).index() + ')').css('display', 'inline-block').siblings(j).hide();
		},
		getpPersonalInfo: function() {
			// 获取用户详情
			$.ajax({
				type: 'POST',
				url: '/user/detail',
				datatype: 'json',
				success: function(e) {
					if (e.status == 'success') {
						if (e['message'].payee != '') {
							$('.user-info').html(e['message'].payee);
						}

						if (e['message'].email != '') {
							$('.email-info').html(e['message'].email);
						}
						$('#nickname').val(e['message'].nickname);
						$('#l-nickname').html(e['message'].nickname);
						$('#phone').val(e['message'].cellphone);
						$('#qq').val(e['message'].qq);
						$('#user_name').html(e['message'].username);
						if (e['message'].set_fund_password == true) {
							$('.password-info').html('********');
						}
					}
				},
				error: function() {
					console.log('获取用户详情失败！');
				}
			});
		},
		accountList: function() {
			//收款充值账号
			$.ajax({
				type: 'POST',
				url: '/recharge/account',
				datatype: 'json',
				success: function(e) {
					//银行信息
					$.each(e.bank, function(i, val) {
						var bank_img = '';
						var name = val.bank_name;
						switch (name) {
							case '中国工商银行':
								bank_img = '<img class="inline-block" src="images/bank/0001.png">';
								break;
							case '中国农业银行':
								bank_img = '<img class="inline-block" src="images/bank/0105.png">';
								break;
							case '中国建设银行':
								bank_img = '<img class="inline-block" src="images/bank/0103.png">';
								break;
							case '招商银行':
								bank_img = '<img class="inline-block" src="images/bank/0004.png">';
								break;
							case '交通銀行':
								bank_img = '<img class="inline-block" src="images/bank/0129.png">';
								break;
							case '广发银行':
								bank_img = '<img class="inline-block" src="images/bank/0115.png">';
								break;
							case '华夏银行':
								bank_img = '<img class="inline-block" src="images/bank/0123.png">';
								break;
							case '浦发银行':
								bank_img = '<img class="inline-block" src="images/bank/0104.png">';
								break;
							case '兴业银行':
								bank_img = '<img class="inline-block" src="images/bank/0107.png">';
								break;
							case '中国光大银行':
								bank_img = '<img class="inline-block" src="images/bank/0109.png">';
								break;
							case '中国民生银行':
								bank_img = '<img class="inline-block" src="images/bank/0106.png">';
								break;
							case '中国银行':
								bank_img = '<img class="inline-block" src="images/bank/0110.png">';
								break;
							case '中国邮政储蓄银行':
								bank_img = '<img class="inline-block" src="images/bank/0117.png">';
								break;
							case '中信银行':
								bank_img = '<img class="inline-block" src="images/bank/0118.png">';
								break;
							case '平安银行':
								bank_img = '<img class="inline-block" src="images/bank/0114.png">';
								break;
						}
						$('#bankImg').html(bank_img);
						$('#bankImg').attr('bank-id', val.id);

					});
					//微信信息
					$.each(e.weixin, function(i, val) {
						$('#weixinId').attr('weixin-id', val.id);
					});
					//支付宝信息
					$.each(e.alipay, function(i, val) {
						$('#alipayId').attr('alipay-id', val.id);
					});
				},
				error: function() {
					console.log('提交失败！');
				}
			});
		},
		drawingHistory: function(page) {
			//提款记录
			var startDay = $('#startDay').val();
			var endDay = $('#endDay').val();
			var status = $('#drawingStatus').find('.current').html(); //状态
			var ballStatus = '';
			switch (status) {
				case '待确认':
					ballStatus = 'wait';
					break;
				case '提现成功':
					ballStatus = 'success';
					break;
				case '提现失败':
					ballStatus = 'fail';
					break;
			}
			if (startDay == '') {
				layer.confirm('开始日期不能为空！', {
					skin: 'error-class',
					title: '',
					maxmin: true, //开启最大化最小化按钮
					area: ['380px', '260px'],
					btn: ['确定']
				}, function() {
					layer.closeAll();
				});
				return false;
			}
			if (endDay == '') {
				layer.confirm('结束日期不能为空！', {
					skin: 'error-class',
					title: '',
					maxmin: true, //开启最大化最小化按钮
					area: ['380px', '260px'],
					btn: ['确定']
				}, function() {
					layer.closeAll();
				});
				return false;
			}

			$.ajax({
				type: 'POST',
				url: '/withdraw/lists',
				datatype: 'json',
				data: {
					page: page, //指定第几页
					created_min: startDay, //指定最小日期
					created_max: endDay, //指定最大日期
					status: ballStatus, //状态
					pageSize: 11 //每页条数
				},
				success: function(e) {
					console.log(e);
					var html = '',
						_status = '',
						_remark = '';
					$('#his_tk_currentPage').html(e['message'].current_page); //当前页
					$('#his_tk_totalPage').html(e['message'].last_page); //总页数
					if (e.status == 'success') {
						if (e['message'].data.length == 0) {
							$('#drawingList').html('<div style="text-align: center;position: relative;right: 204px;top: 73px;">无记录</div>');
							return;
						}
						$.each(e.message, function(i, val) {
							$.each(val, function(j, k) {
								var this_status = k.status;
								switch (this_status) {
									case 'wait':
										_status = '待确认';
										break;
									case 'success':
										_status = '提现成功';
										break;
									case 'fail':
										_status = '提现失败';
										break;
								}
								if (k.remark == '') {
									_remark = '---'
								} else {
									_remark = k.remark;
								}
								var list = `<ul class="historyDrawingList">
										<li class="historyDrawing-id">${k.id}</li>
										<li class="historyDrawing-num">${k.money}</li>
										<li class="historyDrawing-bank">${k['bank'].name}</li>
										<li class="historyDrawing-time">${k.created}</li>
										<li class="historyDrawing-status">${_status}</li>
										<li class="historyDrawing-remark">${_remark}</li>
										</ul>`;
								html += list;
							})
						});
						$('#drawingList').html(html);
					}
				},
				error: function() {
					console.log('提交失败！');
					layer.confirm('提交失败', {
						skin: 'error-class',
						title: '',
						maxmin: true, //开启最大化最小化按钮
						area: ['380px', '260px'],
						btn: ['确定']
					}, function() {
						layer.closeAll();
					});
				}
			});
		},
		rechargeRecord: function(page) {
			//充值记录
			var startDay = $('#startDay').val();
			var endDay = $('#endDay').val();
			var status = $('#recharge-record').find('.current').html(); //状态
			console.log(status);
			var ballStatus = '';
			switch (status) {
				case '待确认':
					ballStatus = 'wait';
					break;
				case '充值成功':
					ballStatus = 'success';
					break;
				case '充值失败':
					ballStatus = 'fail';
					break;
			}
			if (startDay == '') {
				layer.confirm('开始日期不能为空！', {
					skin: 'error-class',
					title: '',
					maxmin: true, //开启最大化最小化按钮
					area: ['380px', '260px'],
					btn: ['确定']
				}, function() {
					layer.closeAll();
				});
				return false;
			}
			if (endDay == '') {
				layer.confirm('结束日期不能为空！', {
					skin: 'error-class',
					title: '',
					maxmin: true, //开启最大化最小化按钮
					area: ['380px', '260px'],
					btn: ['确定']
				}, function() {
					layer.closeAll();
				});
				return false;
			}

			$.ajax({
				type: 'POST',
				url: '/recharge/lists',
				datatype: 'json',
				data: {
					page: page, //指定第几页
					created_min: startDay, //指定最小日期
					created_max: endDay, //指定最大日期
					status: ballStatus, //状态
					pageSize: 11 //每页条数
				},
				success: function(e) {
					console.log(e);
					var html = '',
						_status = '',
						_remark = '',
						_type = '',
						_channel = '';
					$('#his_recharge_currentPage').html(e['message'].current_page); //当前页
					$('#his_recharge_totalPage').html(e['message'].last_page); //总页数
					if (e.status == 'success') {
						if (e['message'].data.length == 0) {
							$('#rechargeList').html('<div style="text-align: center;position: relative;right: 204px;top: 73px;">无记录</div>');
							return;
						}
						$.each(e.message, function(i, val) {
							$.each(val, function(j, k) {
								var this_status = k.status;
								switch (this_status) {
									case 'wait':
										_status = '待确认';
										break;
									case 'success':
										_status = '充值成功';
										break;
									case 'fail':
										_status = '充值失败';
										break;
								}
								if (k.remark == '') {
									_remark = '---'
								} else {
									_remark = k.remark;
								}

								if (k.channel == 'offline') {
									_channel = '线下转账'
								} else {
									_channel = '线上支付';
								}

								if (k.type == 'bank') {
									_type = '银行'
								} else if (k.type == 'weixin') {
									_type = '微信';
								} else if (k.type == 'alipay') {
									_type = '支付宝';
								}
								var list = `<ul class="historyRechargeList">
										<li >${k.id}</li>
										<li >${k.money}</li>
										<li >${_type}</li>
										<li >${k.created}</li>
										<li >${_channel}</li>
										<li >${_status}</li>
										<li >${_remark}</li>
										</ul>`;
								html += list;
							})
						});
						$('#rechargeList').html(html);
					}
				},
				error: function() {
					console.log('提交失败！');
					layer.confirm('提交失败', {
						skin: 'error-class',
						title: '',
						maxmin: true, //开启最大化最小化按钮
						area: ['380px', '260px'],
						btn: ['确定']
					}, function() {
						layer.closeAll();
					});
				}
			});
		},
		bindCardInfo: function() {
			//获取绑定的银行卡信息
			var banksList = $('.bindCardList').find('.banks');
			$.ajax({
				type: 'POST',
				url: '/bank/lists',
				datatype: 'json',
				success: function(e) {
					console.log(e);
					var html = '';
					var x = 0;
					$.each(e, function(i, val) {
						var str = val.created;
						var createdTime = str.substring(0, 10);
						var this_id = 0;
						var name = val.bank_name;
						switch (name) {
							case '中国工商银行':
								this_id = 1;
								break;
							case '中国农业银行':
								this_id = 2;
								break;
							case '中国建设银行':
								this_id = 3;
								break;
							case '招商银行':
								this_id = 4;
								break;
							case '交通銀行':
								this_id = 5;
								break;
							case '广发银行':
								this_id = 6;
								break;
							case '华夏银行':
								this_id = 7;
								break;
							case '浦发银行':
								this_id = 8;
								break;
							case '兴业银行':
								this_id = 9;
								break;
							case '中国光大银行':
								this_id = 10;
								break;
							case '中国民生银行':
								this_id = 11;
								break;
							case '中国银行':
								this_id = 12;
								break;
							case '中国邮政储蓄银行':
								this_id = 13;
								break;
							case '中信银行':
								this_id = 14;
								break;
							case '平安银行':
								this_id = 15;
								break;
						}
						x++;
						var list = `<div class="banks z-i${x} z-i no-slected" data-bankid="${val.id}" data-bankcardholder="${val.holder}" data-bankprovince="${val.zone1}" data-bankname="${val.bank_name}" data-bankcardno="*************${val.last_number}">
	                                    <span class="bankLogo-Card bank-${this_id}"></span>
	                                    <span class="det-01">*************${val.last_number}</span>
	                                    <span class="det-02">卡号</span>
	                                    <span class="det-03">*************${val.last_number}</span>
	                                    <span class="det-04">提款人姓名 </span>
	                                    <span class="det-05">${val.holder}</span>
	                                    <span class="det-06">绑卡日期</span>
	                                    <span class="det-07">${createdTime}</span>
	                                </div>`;
						html += list;
					});
					$('.bindCardList').html(html);
					if (x == 5) {
						$('.above-footer').find('#cardLimitMessage').removeClass('hide');
						$('.newAddCard').removeAttr('id', 'bindCard');
						$('.above-footer').find('.above-footer-btn').addClass('not-allowed');
						$('.above-footer').find('.abs-right-red').addClass('gray');
						$('.above-footer').find('#cardLimitMessage').removeClass('hide');
						$('.above-footer').find('#cardLimitReminder').addClass('hide');
					}

				},
				error: function() {
					console.log('提交失败！');
				}
			});
		},
		userInfo: function() {
			//用户详情
			$.ajax({
				type: 'POST',
				url: '/user/detail',
				datatype: 'json',
				success: function(data) {
					if (data.status == "success") {
						console.log(data);
						if (!isLogin) {
							location.href = '/home.html';
						} else {
							$('#sumWallet,#afterLoginBalance,.UserAmount').html(data['message'].balance);
							$('#user-name,.userName').html(data['message'].username);
							$('#loggedInHeader,.news-wrp').show();
							$('#beforeLogin').hide();
							$('#afterLogin,.sub-main-wrp').show();

							if (data['message'].payee != '') {
								var str = data['message'].payee;
								var name = str.substr(str, 1);
								$('#card-user-name').val(name + '**');
								$('#card-user-name').attr('readonly', 'readonly');
								$('#card-user-name').addClass('disabled');
							}

							if (data['message'].email != '') {
								$('#card-email').val(data['message'].email);
								$('#card-email').attr('readonly', 'readonly');
								$('#card-email').addClass('disabled');
							}

							if ($('#card-user-name').val() != '' && $('#card-email').val() != '') {
								$('.newAddCard').attr('id', 'bindCard');
								$('.above-footer').find('.disabled').removeClass('disabled');
								$('.above-footer').find('.gray').removeClass('gray');
								$('.above-footer').find('.tip').addClass('hide');
								$('.above-footer').find('#cardLimitReminder').removeClass('hide');
							}
						}
					} else if (data.status == 'ban_guest' && isLogin) {
						location.href = '/index.html';
					}
				},
				error: function() {
					console.log('请求失败！');
				}
			});
		},
		agentBetList: function(page) {
			// 用户代理投注记录
			var startDay = $('#startDay').val();
			var endDay = $('#endDay').val();
			$.ajax({
				type: 'POST',
				url: '/invite/bet',
				datatype: 'json',
				data: {
					page: page, //指定第几页
					created_min: startDay, //指定最小日期
					created_max: endDay, //指定最大日期
					pageSize: 11 //每页条数
				},
				beforeSend: function(XMLHttpRequest) {},
				success: function(e) {
					console.log(e);
					if (e['message'].data.length == 0) {
						$('#agentBet').html('<div style="text-align: center;position: relative;right: 204px;top: 73px;">无投注记录</div>');
						return;
					}
					var html = '',
						tip = '',
						awardNum = '';
					$('#agentBet_currentPage').html(e['message'].current_page); //当前页
					$('#agentBet_totalPage').html(e['message'].last_page); //总页数
					$.each(e.message, function(i, val) {
						$.each(val, function(j, k) {
							var orderId = k.order_id, //订单编号
								name = k['product'].name, //彩票名
								daytime = k['periods'].date, //投注日期
								num = k['periods'].num, //投注编号
								orderNum = daytime + ' ' + fill_lenght(num, 3, '0'), //游戏奖期
								created = k.created, //投注时间
								username = k.username, //用户名
								money = k.money, //投注金额
								bonus = k.bonus, //中奖金额
								status = k.status, //状态
								lotteryNum = k['periods'].lottery_num; //中奖号码
							if (status == 'wait') {
								tip = '待开奖';
							} else if (status == 'winning') {
								tip = '已中奖';
							} else {
								tip = '未中奖';
							}
							if (lotteryNum == '') {
								awardNum = '-';
							} else {
								awardNum = lotteryNum;
							}
							var historyDetailed = `<ul class="historyDetailedList">
	                                    <li class="historyDetailed-type">${name}</li>
	                                    <li class="historyDetailed-id">${orderId}</li>
	                                    <li class="historyDetailed-id">${username}</li>
	                                    <li class="historyDetailed-time">${created}</li>
	                                    <li class="historyDetailed-date">${orderNum}</li>
	                                    <li class="searchDetailed-num">${awardNum}</li>
	                                    <li class="searchDetailed-price">${money}</li>
	                                    <li class="searchDetailed-award">${bonus}</li>
	                                    <li class="searchDetailed-status">${tip}</li>
	                                </ul>`;
							html += historyDetailed;
						})
					});

					$('#agentBet').html(html);
				},
				error: function() {
					console.log('提交失败！');
				}
			});
		},
		profitList: function(p) {
			//盈亏列表
			var startDay = $('#startDay').val();
			var endDay = $('#endDay').val();
			$.ajax({
				type: 'POST',
				url: '/invite/profit',
				datatype: 'json',
				data: {
					created_min: startDay,
					created_max: endDay,
					pageSize: 11,
					page: p
				},
				success: function(e) {
					console.log(e);
					var html = '';
					$('#profit_currentPage').html(e['message'].current_page); //当前页
					$('#profit_totalPage').html(e['message'].last_page); //总页数
					if (e.status == 'success') {
						if (e['message'].data.length == 0) {
							$('#profit_list').html('<div style="text-align: center;position: relative;right: 204px;top: 73px;">无记录</div>');
							return;
						}
						$.each(e.message, function(i, val) {
							$.each(val, function(j, k) {
								var time = k.created;
								var _time = time.substring(0, 10);
								var list = `<ul class="agentLinkList">
	                                    <li>${k.username}</li>
	                                    <li>${k.user_id}</li>
	                                    <li>${k.bet}</li>
	                                    <li>${k.recharge}</li>
	                                    <li>${k.withdraw}</li>
	                                    <li>${k.winning}</li>
	                                    <li>${k.income}</li>
	                                    <li>${k.team_bet}</li>
	                                    <li>${k.team_recharge}</li>
	                                    <li>${k.team_withdraw}</li>
	                                    <li>${k.team_winning}</li>
	                                    <li>${k.team_income}</li>
	                                    </ul>`;
								html += list;
							})
						});
						$('#profit_list').html(html);
					} else {
						$('#profit_list').html('<div style="text-align: center;position: relative;right: 204px;top: 73px;">数据不存在</div>');
					}
				},
				error: function() {
					console.log('提交失败！');
					layer.confirm('提交失败', {
						skin: 'error-class',
						title: '',
						maxmin: true, //开启最大化最小化按钮
						area: ['380px', '260px'],
						btn: ['确定']
					}, function() {
						layer.closeAll();
					});
				}
			});
		},
		agentMember: function(p) {
			//会员管理
			var startDay = $('#startDay').val();
			var endDay = $('#endDay').val();
			var agentRange = $('#agentRange').find('.current').html();
			var range = '';
			if (agentRange == '所有下线') {
				range = 'all';
			} else {
				range = 'only';
			}
			$.ajax({
				type: 'POST',
				url: '/user/branch',
				datatype: 'json',
				data: {
					range: range,
					created_min: startDay,
					created_max: endDay,
					pageSize: 11,
					page: p
				},
				success: function(e) {
					var html = '';
					$('#agent_user_currentPage').html(e['message'].current_page); //当前页
					$('#agent_user_totalPage').html(e['message'].last_page); //总页数
					if (e.status == 'success') {
						if (e['message'].data.length == 0) {
							$('#agentUser').html('<div style="text-align: center;position: relative;right: 204px;top: 73px;">无记录</div>');
							return;
						}
						$.each(e.message, function(i, val) {
							$.each(val, function(j, k) {
								var createdTime = k.created;
								var _createdTime = createdTime.substring(0, 10);
								var list = `<ul class="agentUserList">
	                                    <li>${k.id}</li>
	                                    <li>${k.username}</li>
	                                    <li >${k.balance}</li>
	                                    <li >${k.invite_num}</li>
	                                    <li >${k.inactive}</li>
	                                    <li >${_createdTime}</li>
	                                    </ul>`;
								html += list;
							})
						});
						$('#agentUser').html(html);
					}
				},
				error: function() {
					layer.confirm('提交失败', {
						skin: 'error-class',
						title: '',
						maxmin: true, //开启最大化最小化按钮
						area: ['380px', '260px'],
						btn: ['确定']
					}, function() {
						layer.closeAll();
					});
				}
			});
		},
		agentLink: function(p) {
			//邀请链接列表
			var startDay = $('#startDay').val();
			var endDay = $('#endDay').val();
			var agentLink = $('#agentLinkStatus').find('.current').html();
			var status = '';
			if (agentLink == '正常') {
				status = 'normal';
			} else if (agentLink == '取消') {
				status = 'cancel';
			}
			$.ajax({
				type: 'POST',
				url: '/invite/lists',
				datatype: 'json',
				data: {
					status: status,
					created_min: startDay,
					created_max: endDay,
					pageSize: 11,
					page: p
				},
				success: function(e) {
					var html = '',
						_status = '',
						_type = '';
					$('#agent_currentPage').html(e['message'].current_page); //当前页
					$('#agent_totalPage').html(e['message'].last_page); //总页数
					if (e.status == 'success') {
						if (e['message'].data.length == 0) {
							$('#agentLinkList').html('<div style="text-align: center;position: relative;right: 204px;top: 73px;">无记录</div>');
							return;
						}
						$.each(e.message, function(i, val) {
							$.each(val, function(j, k) {
								var this_type = k.type;
								switch (this_type) {
									case 'member':
										_type = '会员';
										break;
									case 'agent':
										_type = '代理';
										break;
								}

								var this_status = k.status;
								switch (this_status) {
									case 'normal':
										_status = '正常';
										break;
									case 'cancel':
										_status = '取消';
										break;
								}
								var time = k.term_at;
								var _time = time.substring(0, 10);
								var createdTime = k.created;
								var _createdTime = createdTime.substring(0, 10);
								var domain = document.domain;
								var port = window.location.port;
								var code = k.code;
								var url = domain + ':' + port + '/login.php' + '?' + 'name' + '=' + code;
								var list = `<ul class="agentLinkList">
	                                    <li>${k.id}</li>
	                                    <li data-clipboard-text="${url}" class="copyLink">${url}</li>
	                                    <li >${_type}</li>
	                                    <li >${k.channel}</li>
	                                    <li >${_status}</li>
	                                    <li >${_time}</li>
	                                    <li >${k.register}</li>
	                                    <li >${_createdTime}</li>
	                                    <li class="delete-agent-link" agent-id="${k.id}">取消</li>
	                                    </ul>`;
								html += list;
							})
						});
						$('#agentLinkList').html(html);
					}
				},
				error: function() {
					console.log('提交失败！');
					layer.confirm('提交失败', {
						skin: 'error-class',
						title: '',
						maxmin: true, //开启最大化最小化按钮
						area: ['380px', '260px'],
						btn: ['确定']
					}, function() {
						layer.closeAll();
					});
				}
			});
		},
		agentLinkUser: function(p) {
			//邀请链接注册用户列表
			var startDay = $('#startDay').val();
			var endDay = $('#endDay').val();
			var agentLink = $('#agentLinkStatus').find('.current').html();
			var status = '';
			if (agentLink == '正常') {
				status = 'normal';
			} else if (agentLink == '取消') {
				status = 'cancel';
			}
			$.ajax({
				type: 'POST',
				url: '/invite/users',
				datatype: 'json',
				data: {
					status: status,
					created_min: startDay,
					created_max: endDay,
					pageSize: 11,
					page: p
				},
				success: function(e) {
					console.log(e);
					var html = '';
					$('#agent_user_currentPage').html(e['message'].current_page); //当前页
					$('#agent__user_totalPage').html(e['message'].last_page); //总页数
					if (e.status == 'success') {
						if (e['message'].data.length == 0) {
							$('#agentUser').html('<div style="text-align: center;position: relative;right: 204px;top: 73px;">无记录</div>');
							return;
						}
						$.each(e.message, function(i, val) {
							$.each(val, function(j, k) {
								var time = k.created;
								var _time = time.substring(0, 10);
								var list = `<ul class="agentLinkList">
	                                <li>${k.username}</li>
	                                <li>${_time}</li>
	                                </ul>`;
								html += list;
							})
						});
						$('#agentUser').html(html);
					} else {
						$('#agentUser').html('<div style="text-align: center;position: relative;right: 204px;top: 73px;">数据不存在</div>');
					}
				},
				error: function() {
					console.log('提交失败！');
					layer.confirm('提交失败', {
						skin: 'error-class',
						title: '',
						maxmin: true, //开启最大化最小化按钮
						area: ['380px', '260px'],
						btn: ['确定']
					}, function() {
						layer.closeAll();
					});
				}
			});
		},
		getAgentLink: function() {
			// 生成推广链接
			var endDay = $('#endDay').val();
			var angentType = $('#dira-regtype-proxy').html();
			var channel = $('#channelType').find('.current').html();
			var type = '';
			if (channel == '选择渠道') {
				layer.confirm('请选择渠道', {
					skin: 'error-class',
					title: '',
					maxmin: true, //开启最大化最小化按钮
					area: ['380px', '260px'],
					btn: ['确定']
				}, function() {
					layer.closeAll();
				});
				return false;
			}
			if (angentType == '代理') {
				type = 'agent';
			} else {
				type = 'member';
			}
			$.ajax({
				type: 'POST',
				url: '/invite/add',
				datatype: 'json',
				data: {
					type: type,
					channel: channel,
					term_at: endDay
				},
				success: function(e) {
					if (e.status == 'success') {
						layer.confirm('生成成功', {
							skin: 'success-class',
							title: '',
							maxmin: true, //开启最大化最小化按钮
							area: ['380px', '260px'],
							btn: ['确定']
						}, function() {
							layer.closeAll();
						});
					} else {
						layer.confirm('生成失败', {
							skin: 'success-class',
							title: '',
							maxmin: true, //开启最大化最小化按钮
							area: ['380px', '260px'],
							btn: ['确定']
						}, function() {
							layer.closeAll();
						});
					}

				},
				error: function() {
					layer.confirm('提交失败', {
						skin: 'error-class',
						title: '',
						maxmin: true, //开启最大化最小化按钮
						area: ['380px', '260px'],
						btn: ['确定']
					}, function() {
						layer.closeAll();
					});
				}
			});
		},
		deleteAgentLink: function(linkId) {
			// 删除推广链接
			$.ajax({
				type: 'POST',
				url: '/invite/cancel',
				datatype: 'json',
				data: {
					id: linkId
				},
				success: function(e) {
					if (e.status == 'success') {
						layer.confirm('取消成功', {
							skin: 'success-class',
							title: '',
							maxmin: true, //开启最大化最小化按钮
							area: ['380px', '260px'],
							btn: ['确定']
						}, function() {
							layer.closeAll();
						});
					}
				},
				error: function() {
					layer.confirm('提交失败', {
						skin: 'error-class',
						title: '',
						maxmin: true, //开启最大化最小化按钮
						area: ['380px', '260px'],
						btn: ['确定']
					}, function() {
						layer.closeAll();
					});
				}
			});
		},
		// 	█╗  █╗ ███╗  ███╗ █╗██╗ 
		// █║  █║█╬══╝ █╬══█╗██╬═█╗
		// █║  █║╚███╗ █████║█╔╝ ╚╝
		// █║ ██║ ╚══█╗█╔═══╝█║    
		// ╚██╬█║████╬╝╚███╗ █║    
		//  ╚═╝╚╝╚═══╝  ╚══╝ ╚╝    
		user: function() {
			// 个人
			
			// 我的资料
			$('#editUserInfo').click(function(){
				POP.editUserInfo();
			});

			// 资金详情

			// 购彩记录
			$('#purchaseHistory').click(function(){
				POP.history(1);
			});

			//左边滚动导航栏 投注历史 下一页
			$('.his_page_next').bind('click', function() {
				var p = $('#his_currentPage').html();
				var n = $('#his_totalPage').html();
				if (p == n) {
					return;
				}
				p++;
				if (p == n) {
					$('.his_page_next').addClass('disabled');
				}
				if (p > 1) {
					$('.his_page_prev').removeClass('disabled');
				}
				$('#his_currentPage').html(p);
				POP.history(p);
			});

			//左边滚动导航栏 投注历史 上一页
			$('.his_page_prev').bind('click', function() {
				var p = $('#his_currentPage').html();
				var n = $('#his_totalPage').html();
				if (p <= 1) {
					return;
				}
				p--;
				if (p == 1) {
					$('.his_page_prev').addClass('disabled');
				}
				if (p < n) {
					$('.his_page_next').removeClass('disabled');
				}
				POP.history(p);
			});

			// 账变明细
			$('#searchDetailed').click(function(){
				POP.accountInfo(1);
			});

			//左边滚动导航栏 账变明细 下一页
			$('.account_page_next ').bind('click', function() {
				var p = $('#account_currentPage').html();
				var n = $('#account_totalPage').html();
				if (p == n) {
					return;
				}
				p++;
				if (p == n) {
					$('.account_page_next').addClass('disabled');
				}
				if (p > 1) {
					$('.account_page_prev').removeClass('disabled');
				}
				$('#account_currentPage').html(p);
				POP.accountInfo(p)
			});

			//左边滚动导航 栏账变明细 上一页
			$('.account_page_prev').bind('click', function() {
				var p = $('#account_currentPage').html();
				var n = $('#account_totalPage').html();
				if (p <= 1) {
					return;
				}
				p--;
				if (p == 1) {
					$('.account_page_prev').addClass('disabled');
				}
				if (p < n) {
					$('.account_page_next').removeClass('disabled');
				}
				POP.accountInfo(p);
			});
			
			//修改密码(登录密码 + 资金密码)
			$('.modify-password').click(function() {
				POP.editPassword($(this));
			});
		},
		editUserInfo: function() {
			// 完善个人信息
			var userName = $("#userName").val();
			var nickname = $("#nickname").val();
			var password = $("#password").val();
			var phone = $("#phone").val();
			var qq = $("#qq").val();
			var email = $("#email").val();
			var confirm_password = $("#confirm_password").val();
			if ($('.ch-inpt').val() == '') {
				$('.ch-inpt').focus();
			}
			if (userName != undefined) {
				if (userName == '') {
					layer.confirm('请输入提款人姓名', {
						skin: 'error-class',
						title: '',
						maxmin: true, //开启最大化最小化按钮
						area: ['380px', '260px'],
						btn: ['确定']
					}, function() {
						layer.closeAll();
					});
					return false;
				}
			}

			if (password != undefined) {
				if (password == '') {
					layer.confirm('密码不能为空！', {
						skin: 'error-class',
						title: '',
						maxmin: true, //开启最大化最小化按钮
						area: ['380px', '260px'],
						btn: ['确定']
					}, function() {
						layer.closeAll();
					});
					return false;
				}
			}
			if (email != undefined) {
				if (email == '') {
					layer.confirm('邮箱不能为空！', {
						skin: 'error-class',
						title: '',
						maxmin: true, //开启最大化最小化按钮
						area: ['380px', '260px'],
						btn: ['确定']
					}, function() {
						layer.closeAll();
					});
					return false;
				}
			}
			if (confirm_password != undefined) {
				if (confirm_password == '') {
					layer.confirm('请确认密码！', {
						skin: 'error-class',
						title: '',
						maxmin: true, //开启最大化最小化按钮
						area: ['380px', '260px'],
						btn: ['确定']
					}, function() {
						layer.closeAll();
					});
					return false;
				}
			}

			if (password != undefined && confirm_password != undefined) {
				if (password != confirm_password) {
					layer.confirm('两次密码不一样！', {
						skin: 'error-class',
						title: '',
						maxmin: true, //开启最大化最小化按钮
						area: ['380px', '260px'],
						btn: ['确定']
					}, function() {
						layer.closeAll();
					});
					return false;
				}
			}

			//验证邮箱
			var reg_email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
			if (email != undefined && email != '') {
				if (!reg_email.test(email)) {
					layer.confirm('邮箱格式不正确', {
						skin: 'error-class',
						title: '',
						maxmin: true, //开启最大化最小化按钮
						area: ['380px', '260px'],
						btn: ['确定']
					}, function() {
						layer.closeAll();
					});
					return false;
				}
			}
			//验证手机号
			var reg_mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
			if (phone != undefined && phone != '') {
				if (!reg_mobile.test(phone)) {
					layer.confirm('手机号码格式不正确', {
						skin: 'error-class',
						title: '',
						maxmin: true, //开启最大化最小化按钮
						area: ['380px', '260px'],
						btn: ['确定']
					}, function() {
						layer.closeAll();
					});
					return false;
				}
			}
			//验证qq号
			var reg_qq = /^[1-9]\d{4,9}$/;
			if (qq != undefined && qq != '') {
				if (!reg_qq.test(qq)) {
					layer.confirm('qq号码格式不正确', {
						skin: 'error-class',
						title: '',
						maxmin: true, //开启最大化最小化按钮
						area: ['380px', '260px'],
						btn: ['确定']
					}, function() {
						layer.closeAll();
					});
					return false;
				}
			}
			var info = {
				payee: userName, //提款人姓名
				nickname: nickname, //昵称
				cellphone: phone, //手机号
				qq: qq, //qq号
				email: email, //邮箱
				fund_password: password, //密码
				confirm_fund_password: confirm_password, //确认密码
			};
			$.ajax({
				type: "POST",
				url: "/user/perfect",
				data: info,
				datatype: "json",
				success: function(data, textStatus) {
					console.log(textStatus);
					console.log(data);
					if (data.status == 'success') {
						layer.confirm('个人信息修改成功', {
							skin: 'success-class',
							title: '',
							maxmin: true, //开启最大化最小化按钮
							area: ['380px', '260px'],
							btn: ['确定']
						}, function() {
							layer.closeAll();
						});
						if (userName != undefined) {
							$('.user-info').html(userName); //提款人姓名
						}
						if (email != undefined) {
							$('.email-info').html(email); //邮箱
						}
						if (password != undefined && confirm_password != undefined) {
							if (password == confirm_password) {
								$('.password-info').html('********');
							}
						}
					}
				},
				error: function() {
					console.log('请求失败！');
				}
			});
		},
		history: function(page) {
			// 购彩记录
			var startDay = $('#startDay').val();
			var endDay = $('#endDay').val();
			var option = $('#balls-type').find('.current').html(); //彩票类型
			var status = $('#awards-status').find('.current').html(); //状态
			var ballType, ballStatus = '';
			switch (option) {
				case '重庆时时彩':
					ballType = '1';
					break;
				case '北京五分彩':
					ballType = '3';
					break;
				case '腾讯分分彩':
					ballType = '2';
					break;
			}
			switch (status) {
				case '待支付':
					ballStatus = 'wait';
					break;
				case '已支付':
					ballStatus = 'pay';
					break;
				case '过期':
					ballStatus = 'expire';
					break;
				case '撤销':
					ballStatus = 'retreat';
					break;
				case '未中奖':
					ballStatus = 'regret';
					break;
				case '中奖':
					ballStatus = 'winning';
					break;
			}
			if (startDay == '') {
				layer.confirm('开始日期不能为空！', {
					skin: 'error-class',
					title: '',
					maxmin: true, //开启最大化最小化按钮
					area: ['380px', '260px'],
					btn: ['确定']
				}, function() {
					layer.closeAll();
				});
				return false;
			}
			if (endDay == '') {
				layer.confirm('结束日期不能为空！', {
					skin: 'error-class',
					title: '',
					maxmin: true, //开启最大化最小化按钮
					area: ['380px', '260px'],
					btn: ['确定']
				}, function() {
					layer.closeAll();
				});
				return false;
			}

			$.ajax({
				type: 'POST',
				url: '/bet/lists',
				datatype: 'json',
				data: {
					page: page, //指定第几页
					created_min: startDay, //指定最小日期
					created_max: endDay, //指定最大日期
					product_id: ballType, //商品ID
					status: ballStatus, //状态
					pageSize: 11 //每页条数
				},
				beforeSend: function(XMLHttpRequest) {},
				success: function(e) {
					if (e['message'].data.length == 0) {
						$('#historyDetailedBox').html('<div style="text-align: center;position: relative;right: 204px;top: 73px;">无投注记录</div>');
						return;
					}
					var html = '',
						tip = '',
						awardNum = '';
					$('#his_currentPage').html(e['message'].current_page); //当前页
					$('#his_totalPage').html(e['message'].last_page); //总页数
					$.each(e.message, function(i, val) {
						$.each(val, function(j, k) {
							var orderId = k.order_id, //订单编号
								name = k['product'].name, //游戏类型
								daytime = k['periods'].date, //投注日期
								num = k['periods'].num, //投注编号
								orderNum = daytime + ' ' + fill_lenght(num, 3, '0'), //游戏奖期
								created = k.created, //投注时间
								money = k.money, //投注金额
								bonus = k.bonus, //中奖金额
								status = k.status, //状态
								lotteryNum = k['periods'].lottery_num; //中奖号码
							if (status == 'wait') {
								tip = '待支付';
							} else if (status == 'pay') {
								tip = '已支付';
							} else if (status == 'expire') {
								tip = '过期';
							} else if (status == 'retreat') {
								tip = '撤销';
							} else if (status == 'regret') {
								tip = '未中奖';
							} else if (status == 'winning') {
								tip = '中奖';
							}
							if (lotteryNum == '') {
								awardNum = '-';
							} else {
								awardNum = lotteryNum;
							}
							var historyDetailed = `<ul class="historyDetailedList">
	                                    <li class="historyDetailed-type">${name}</li>
	                                    <li class="historyDetailed-id">${orderId}</li>
	                                    <li class="historyDetailed-time">${created}</li>
	                                    <li class="historyDetailed-date">${orderNum}</li>
	                                    <li class="searchDetailed-num">${awardNum}</li>
	                                    <li class="searchDetailed-price">${money}</li>
	                                    <li class="searchDetailed-award">${bonus}</li>
	                                    <li class="searchDetailed-status">${tip}</li>
	                                </ul>`;
							html += historyDetailed;
						})
					});

					$('#currentPage').html(e['message'].current_page); //当前页
					$('#totalPage').html(e['message'].last_page); //总页数

					$('#historyDetailedBox').html(html);
				},
				error: function() {
					console.log('提交失败！');
				}
			});
		},
		accountInfo: function(page) {
			// 账变明细
			var selectType = $('.select-account-type').find('.current').html();
			// var selectBall=$('.slect-box-custom-large option:selected').text();
			var start = $('#startDay').val();
			var end = $('#endDay').val();
			var theType = '';
			if (selectType == '支付') {
				theType = 'pay'
			} else if (selectType == '中奖') {
				theType = 'winning'
			}
			var info = {
				type: theType,
				created_min: start,
				created_max: end,
				pageSize: 10,
				page: page //指定第几页
			};
			$.ajax({
				type: "POST",
				url: "/user/balance-log",
				data: info,
				datatype: "json",
				success: function(data, textStatus) {
					var html = '';
					var f = '';
					if (data['message'].data.length == 0) {
						$('#searchDetailedBox').html('<div style="text-align: center;position: relative;right: 204px;top: 73px;">无账变明细</div>');
						return;
					}
					$('#account_currentPage').html(data['message'].current_page); //总页数
					$('#account_totalPage').html(data['message'].last_page); //总页数
					$.each(data['message'], function(i, val) {
						$.each(val, function(j, k) {
							var type = k.comment;
							var id = k.id;
							var time = k.created;
							var num = k.num;
							var form = k.form;
							var surplus = k.surplus;
							$('#surplus').html(surplus);
							if (form == 'expend') {
								f = '支出';
							} else {
								f = '收入';
							}
							var Ul = `<ul class="searchDetailedList">
	                            <li class="searchDetailed-type">${type}</li>
	                            <li class="searchDetailed-id">${id}</li>
	                            <li class="searchDetailed-time">${time}</li>
	                            <li class="searchDetailed-num">${num}</li>
	                            <li class="searchDetailed-from">${f}</li>
	                            </ul>`;
							html += Ul;
						});
					});
					$('#searchDetailedBox').html(html);
				},
				error: function() {
					console.log('请求失败！');
				}
			});
		},
		editPassword: function(obj) {
			// 修改密码(登录密码 + 资金密码)
			var type = obj.attr('data-password');
			var newPassword = obj.parent('.right').find('.newPassword').val();
			var password = obj.parent('.right').find(".oldPassword").val();
			var confirm_password = obj.parent('.right').find(".conPassword").val();

			if (password == '') {
				layer.confirm('请输入旧密码！', {
					skin: 'error-class',
					title: '',
					maxmin: true, //开启最大化最小化按钮
					area: ['380px', '260px'],
					btn: ['确定']
				}, function() {
					layer.closeAll();
				});
				return false;
			}
			if (newPassword == '') {
				layer.confirm('请输入新密码！', {
					skin: 'error-class',
					title: '',
					maxmin: true, //开启最大化最小化按钮
					area: ['380px', '260px'],
					btn: ['确定']
				}, function() {
					layer.closeAll();
				});
				return false;
			}
			if (confirm_password == '') {
				layer.confirm('请确认密码！', {
					skin: 'error-class',
					title: '',
					maxmin: true, //开启最大化最小化按钮
					area: ['380px', '260px'],
					btn: ['确定']
				}, function() {
					layer.closeAll();
				});
				return false;
			}
			if (newPassword != confirm_password) {
				layer.confirm('两次密码不一样！', {
					skin: 'error-class',
					title: '',
					maxmin: true, //开启最大化最小化按钮
					area: ['380px', '260px'],
					btn: ['确定']
				}, function() {
					layer.closeAll();
				});
				return false;
			}
			var info = {
				type: type, //密码类型
				old_password: password, //旧密码
				password: newPassword, //新密码
				confirm_password: confirm_password, //确认密码
			};
			$.ajax({
				type: "POST",
				url: "/user/password",
				data: info,
				datatype: "json",
				success: function(data, textStatus) {
					var status = textStatus;
					if (status == 'success') {
						if (data.message == '修改成功') {
							layer.confirm('修改成功！', {
								skin: 'success-class',
								title: '',
								maxmin: true, //开启最大化最小化按钮
								area: ['380px', '260px'],
								btn: ['确定']
							}, function() {
								layer.closeAll();
							});
						} else if (data.message == '旧密码错误') {
							layer.confirm('旧密码错误！', {
								skin: 'error-class',
								title: '',
								maxmin: true, //开启最大化最小化按钮
								area: ['380px', '260px'],
								btn: ['确定']
							}, function() {
								layer.closeAll();
							});
						}

					}

				},
				error: function() {
					console.log('请求失败！');
				}
			});
		}
	}
	*/
};