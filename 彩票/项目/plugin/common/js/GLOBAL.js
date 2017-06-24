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
	}
};