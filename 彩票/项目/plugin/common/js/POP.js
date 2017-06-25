var POP = {
	init: function() {
		POP.bindEvent();
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
	}
}