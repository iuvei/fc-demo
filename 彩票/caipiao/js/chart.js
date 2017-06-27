var CHART = {
	holder: {
		winningNumber: [], //单行中奖号码
		canvasColumns: []
	},
	init: function(options) {
		options = options || {};
		options.length = options.length || 5; //默认5列有折线
		options.hasDiscounted = (options.hasDiscounted != undefined) ? options.hasDiscounted : true; //是否有折现

		for (var i = options.length - 1; i >= 0; i--) {
			CHART.holder.winningNumber[i] = '';
		}

		CHART.bindEvent(options);

		if(!CHART.lessThenIE8() && options.hasDiscounted){
			// 绘制折线
			CHART.draw(CHART.holder.winningNumber);
		}
	},
	bindEvent: function(options) {
		// 遗漏
		$('.J_missBtn').click(function() {
			if ($(this).find('i').hasClass('active')) {
				$(this).find('i').removeClass('active');
				$(".ch-row-contner .numCount-wrp ul").addClass("noNumber")
			} else {
				$(this).find('i').addClass('active');
				$(".ch-row-contner .numCount-wrp ul").removeClass("noNumber")
			}
		});

		if (options.hasDiscounted) {
			if (!CHART.lessThenIE8()) {
				$('.J_polyline').click(function() {
					if ($(this).find('i').hasClass('active')) {
						$(this).find('i').removeClass('active');
						$("canvas").hide();
					} else {
						$(this).find('i').addClass('active');
						$("canvas").show();
					}
				});
			} else {
				$('.J_polyline').hide();
			}
		}
	},
	draw: function(a) {
		CHART.collectBalls(a);
		CHART.canvasDirection(CHART.holder.canvasColumns)
	},
	collectBalls: function(a) {
		for (var i = a.length - 1; i >= 0; i--) {
			CHART.holder.canvasColumns[i] = [];
			$(".ch-row-contner .numCount-wrp ul.winning-" + (i + 1) + " li").each(function() {
				var a = {};
				var c = $(this);
				if (c.hasClass("hit-blue")) {
					a.number = $(this).text();
					a.color = "blue";
					a.offset = c.offset();
					CHART.holder.canvasColumns[i].push(a);
				}

				if (c.hasClass("hit-red")) {
					a.number = $(this).text();
					a.color = "red";
					a.offset = c.offset();
					CHART.holder.canvasColumns[i].push(a);
				}
			})
		}
	},
	canvasDirection: function(a) {
		for (var b = 0; b < a.length; b++) {
			for (var c = a[b], d = 0; d < c.length - 1; d++) {
				var e = c[d + 1].offset.left - c[d].offset.left;
				e > 0 ? CHART.canvasProperties(c[d], c[d + 1], "right", b + "_" + d) : e < 0 ? CHART.canvasProperties(c[d], c[d + 1], "left", b + "_" + d) : 0 == e && CHART.canvasProperties(c[d], c[d + 1], "straight", b + "_" + d)
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
		CHART.createCanvas(e, c)
	},
	createCanvas: function(a, b) {
		var c = document.createElement("canvas");
		"undefined" != typeof G_vmlCanvasManager && G_vmlCanvasManager.initElement(c), c.className = a.provideClass, c.width = a.width, c.height = a.height, c.style.cssText = a.style, c.id = a.id;
		var d = document.getElementById("chartBody"),
			e = document.getElementById("foot");

		d.insertBefore(c, e), CHART.drawLine(c, b)
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
	lessThenIE8: function() {
		var UA = navigator.userAgent,
			isIE = UA.indexOf('MSIE') > -1,
			v = isIE ? /\d+/.exec(UA.split(';')[1]) : 'no ie';
		return v <= 8;
	}
}