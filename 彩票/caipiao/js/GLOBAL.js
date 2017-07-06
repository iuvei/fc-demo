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
					// console.log('跳转到登录页面');
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
	PAGER : {
		/**
		 * demo: 
		 * // 分页
			GLOBAL.PAGER.buildPager('#J_pager', data, function(opt) {
					E.refresh(opt);
				}, options);
		 */
		/**
		 * GLOBAL.PAGER.initPager 分页
		 * 
		 * @param data
		 * @param func
		 * @param func_options 用法:
		 * 
		 * <pre>
		 * $('#goods_pager').html(GLOBAL.PAGER.initPager(data, 'GOODS.refresh', {
		 * 	pageSize : 10,
		 * 	pageIndex : 1
		 * }));
		 * </pre>
		 */
		initPager : function(data, func, func_options) {
			if (typeof (func_options) == 'string' && func_options != '') {
				func_options = jQuery.parseJSON(func_options);
			}
			data = data || {};
			data.total = data.total || 0; // 总条数
			data.pageIndex = data.pageIndex || 0; // 当前页
			data.pageSize = data.pageSize || func_options.pageSize || 20; // 每页条数

			var count = ((data.total % data.pageSize == 0) ? (data.total / data.pageSize) : (parseInt(data.total / data.pageSize) + 1)); // 总页数
			var pageIndex = parseInt(data.pageIndex || func_options.pageIndex || 0); // 当前页
			var a = [];
			// 分页统计信息
			var phtml = '';
			// phtml +='<div class="pagination pagination-right">';
			// phtml += '<span>共计 ' + data.total + ' 条 当前第 ' + pageIndex + ' / ' + count + ' 页 每页 ' + data.pageSize + ' 条</span>';
			phtml += '<ul> ';
			// 总页数少于10 全部显示,大于10 显示前3 后3 中间3 其余....
			if (pageIndex == 1) {
				a[a.length] = '<li><span class="disabled">上一页</span></li>';
			} else {
				a[a.length] = '<li><a data-index="' + (pageIndex - 1) + '" >上一页</a></li>';
			}

			function setPageList() {
				if (pageIndex == i) {
					a[a.length] = '<li><span class="disabled active">' + i + '</span></li>';
				} else {
					a[a.length] = '<li><a data-index="' + i + '" >' + i + '</a></li>';
				}
			}
			if (count <= 10) {
				// 总页数小于10
				for (var i = 1; i <= count; i++) {
					setPageList();
				}
			} else {
				// 总页数大于10
				if (pageIndex <= 4) {
					for (var i = 1; i <= 5; i++) {
						setPageList();
					}
					a[a.length] = '<li><span class="disabled" style="border: none;padding: 0px 6px;">...</span></li><li><a data-index="' + count + '" >' + count + '</a></li>';
				} else if (pageIndex >= count - 3) {
					a[a.length] = '<li><a data-index="1" >1</a></li><li><span class="disabled" style="border: none;padding: 0px 6px;">...</span></li>';
					for (var i = count - 4; i <= count; i++) {
						setPageList();
					}
				} else { // 当前页在中间
					a[a.length] = '<li><a data-index="1" >1</a></li><li><span class="disabled" style="border: none;padding: 0px 6px;">...</span></li>';
					for (var i = pageIndex - 2; i <= pageIndex + 2; i++) {
						setPageList();
					}
					a[a.length] = '<li><span class="disabled" style="border: none;padding: 0px 6px;">...</span></li><li><a data-index="' + count + '" >' + count + '</a></li>';
				}
			}
			if (pageIndex == count) {
				a[a.length] = '<li><span class="disabled">下一页</span></li>';
			} else {
				a[a.length] = '<li><a data-index="' + (pageIndex + 1) + '" class="next">下一页</a></li>';
			}
			phtml += a.join('');
			phtml += '<li style="padding-top: 4px;"><span style="border: none;margin-left: 10px;font-size: 12px;padding: 0 5px;height: 22px;line-height: 22px;">共'+ data.pageCount +'页，到第</span>';
			phtml += '<input type="text" class="pagination-pageNo" id="pageNo"/>';
			phtml += '<em class="fl mr5" style="line-height: 22px;">页</em>';
			phtml += '<div class="btn opt_go pagination-opt_go">确定</div>';
			phtml += '</li>';
			phtml += '</ul>';
			// phtml += '</div>';

			return phtml;
		},
		/**
		 * GLOBAL.PAGER.buildPager
		 * 
		 * @param target
		 * @param data
		 * @param func
		 * @param func_options
		 */
		buildPager : function(target, data, func, func_options) {
			if (typeof (func_options) == 'string' && func_options != '') {
				func_options = jQuery.parseJSON(func_options);
			}

			$(target).html(GLOBAL.PAGER.initPager(data, func, func_options));
			// 分页处理
			data = $.extend({
				pageIndex : 0,
				pageSize : 20
			}, func_options, data);

			// 分页 click事件
			$(target + ' ul li a').on('click', function() {
				var _pageIndex = $(this).data('index');
				func_options.pageIndex = _pageIndex;
				if (typeof (func) == 'function') {
					func(func_options);
				} else {
					eval(func + '(' + func_options + ')');
				}
			});
			// 跳转到X页
			$(target + ' div.opt_go').on('click', function() {
				var count = ((data.total % data.pageSize == 0) ? (data.total / data.pageSize) : (parseInt(data.total / data.pageSize) + 1)); // 总页数
				var _pageIndex = $(this).parent().find('input#pageNo').val();
				func_options.pageIndex = (parseInt(_pageIndex) || 1);
				if (_pageIndex < 1 || _pageIndex > count) {
					$(this).parent().find('input#pageNo').val('');
					layer.msg('页码范围不正确，请重新输入！', {
						icon : 2
					});
					// GLOBAL.MSG.showMsg({
					// msg : '页码范围不正确，请重新输入！',
					// position : 'bottom-right'
					// }, 'error');
				} else {
					if (typeof (func) == 'function') {
						func(func_options);
					} else {
						eval(func + '(' + func_options + ')');
					}
				}
			});
			// enter 支持
			$(target + ' input#pageNo').on('keydown', function(event) {
				if (event.keyCode == 13 || event.which === 13) {
					$(target + ' div.opt_go').trigger('click');
				}
			});
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
	}
};