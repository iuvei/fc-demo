//添加数组IndexOf方法
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(elt /*, from*/ ) {
		var len = this.length >>> 0;

		var from = Number(arguments[1]) || 0;
		from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		if (from < 0)
			from += len;
		for (; from < len; from++) {
			if (from in this && this[from] === elt)
				return from;
		}
		return -1;
	};
}

var GLOBAL = {
	/**
	 * GLOBAL.getAjaxData AJAX 请求获取处理协议 options 必输项 options.url
	 * 
	 * @param options
	 * @param func
	 * @param error_func
	 */
	getAjaxData: function(options, func, error_func) {
		options = options || {};
		options.type = options.type || 'post';
		options.dataType = options.dataType || 'json';
		options.async = (options.async != undefined) ? options.async : true;
		options.data = options.data || {};
		options.contentType = options.contentType || 'application/json';
		options.loading = (options.loading != undefined) ? options.loading : true; // 是否需要添加loading

		$.ajax({
			// TODO: 去掉api
			url: '/api' + options.url,
			// url: options.url,
			async: options.async,
			data: JSON.stringify(options.data),
			dataType: options.dataType,
			type: options.type,
			contentType: options.contentType,
			processData: true,
			traditional: true,
			cache: true,
			beforeSend: function(xhr) {
				xhr.setRequestHeader('Content-Type', options.contentType);
			},
			success: function(d) {
				if (d.status == 'SUCCESS' || d.status == 'success') {
					if (typeof(func) == 'function') {
						func(d.message, options.data);
					} else if (func) {
						try {
							eval('' + func + '(' + d.message + ',' + options.data + ')');
						} catch (err) {
							throw new Error("回调不可用");
						}
					}
				} else if (d.status == 'ban_guest') {
					// TODO: 未登录，此接口要求登录
					console.log('跳转到登录页面');
					window.open("/login.html", "_self");
					// GLOBAL.USER.relogin({}, true);
				} else {
					if (error_func) {
						if (typeof(error_func) == 'function') {
							error_func(d.message, d);
						} else {
							eval('' + error_func + '(' + d.message + ',' + d + ')');
						}
					} else {
						layer.alert(d.message, {
							skin: 'bett-alert-dialog',
							icon: 2
						});
					}
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				var msg = '<div style="padding:0 0 0 40px;"><h4>协议返回异常</h4>请检查用户配置或网络</div> ';
				layer.alert(msg, {
					skin: 'bett-alert-dialog',
					icon: 2
				});
			}
		});
	},
	COOKIE: {
		getCookieItem: function(key) {
			var _key = $.cookie(key);
			_key = (_key ? _key : '');
			try {
				return _key && (_key != undefined) ? jQuery.parseJSON(_key) : null;
			} catch (err) {
				return _key;
			}
		},
		setCookieItem: function(key, value, expires) {
			if (expires) {
				$.cookie(key, value, {
					expires: expires
				});
			} else {
				$.cookie(key, value);
			}
		},
		removeItem: function(key) {
			$.cookie(key, null, {
				path: '/'
			});
		}
	},
	SESSION : {
		getSessionItem : function(key) {
			var use_cookie = (window.sessionStorage) ? false : true;
			var _key = (use_cookie ? $.cookie(key) : (window.sessionStorage.getItem(key)));
			_key = (_key ? _key : '');
			try {
				return _key && (_key != undefined) ? jQuery.parseJSON(_key) : null;
			} catch (err) {
				return _key;
			}
		},
		setSessionItem : function(key, value) {
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
		removeItem : function(key) {
			if (window.sessionStorage) {
				window.sessionStorage.removeItem(key);
			} else {
				$.cookie(key, '');
			}
		}
	},
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
	},
	lessThenIE8: function() {
		var UA = navigator.userAgent,
			isIE = UA.indexOf('MSIE') > -1,
			v = isIE ? /\d+/.exec(UA.split(';')[1]) : 'no ie';
		return v <= 8;
	},
	lessThenIE9: function() {
		var UA = navigator.userAgent,
			isIE = UA.indexOf('MSIE') > -1,
			v = isIE ? /\d+/.exec(UA.split(';')[1]) : 'no ie';
		return v <= 9;
	},
	alert: function(msg, time, icon) {
		if(time){
			layer.alert(msg, {
				skin: 'bett-alert-dialog',
				icon: icon || 2,
				time: time
			});
		} else {
			layer.alert(msg, {
				skin: 'bett-alert-dialog',
				icon: icon || 2
			});
		}
	},
	changeUrlArg: function(url, arg, val) {
		var pattern = arg + '=([^&]*)';
		var replaceText = arg + '=' + val;
		return url.match(pattern) ? url.replace(eval('/(' + arg + '=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url + '&' + replaceText : url + '?' + replaceText);
	}
};