var lott = {
    init: function() {
        globalVar.multipTotalAmount = 0, globalVar.singleTotalAmount = 0, globalVar.singleTotalStakes = 0, globalVar.selectionBallAmount = 0, globalVar.selectionBallStakes = 0, globalVar.singleStakesPrice = 2, globalVar.playId = "", globalVar.playCode = "", globalVar.currentCart = [], globalVar.shortcutContent = [], globalVar.cartId = 0, globalVar.currentLottery.hot = {
            ball: {},
            size: {}
        }, globalVar.currentLottery.gap = {
            ball: {},
            size: {}
        }, globalVar.currentLottMode = "", lott.lottBettingModes(), $("#gap_and_hot dt").removeClass("active"), $("#gap_and_hot dt[data-val='gap']").addClass("active"), lott.chase.chaseBtnEvents(), lott.betBtnEvents(), lott.betCartAndHistoryEvents(), lott.clearBetCart(), lott.chartEvent()
    },
    clearCart: function() {
        globalVar.multipTotalAmount = 0, globalVar.singleTotalAmount = 0, globalVar.singleTotalStakes = 0, globalVar.currentCart.splice(0, globalVar.currentCart.length), globalVar.shortcutContent = [], globalVar.cartId = 0, $("#betCartContent").html(""), $("#totalStakes").text(globalVar.singleTotalStakes), $("#totalAmount").text(lott.formatNumber(globalVar.singleTotalAmount, 4)), lott.betButtonStyleListener()
    },
    formatNumber: function(a, b, c) {
        c || (a = Math.round(1e4 * a) / 1e4);
        var d, e, f, g = a + "",
            h = b;
        if (d = g.indexOf("."), e = g.length, 0 == h) - 1 != d && (g = g.substring(0, d));
        else if (-1 == d)
            for (g += ".", f = 1; f <= h; f++) g += "0";
        else
            for (g = g.substring(0, d + h + 1), f = e; f <= d + h; f++) g += "0";
        return g
    },
    factorial: function(a) {
        for (var b = 1, c = 1; c <= a; c += 1) b *= c;
        return b
    },
    sameComparer: function(a, b) {
        var c, d, e = 0;
        if ("string" == typeof a && "string" == typeof b) {
            if ("" == a || "" == b) return e;
            a = a.replace(/([0-9#])(?=([0-9#]{1})+([^0-9#]|$))/g, "$1_"), c = a.split("_"), b = b.replace(/([0-9#])(?=([0-9#]{1})+([^0-9#]|$))/g, "$1_"), d = b.split("_")
        } else c = a, d = b;
        for (var f = 0; f < c.length; f++) d.indexOf(c[f]) > -1 && e++;
        return e
    },
    isEmptyObject: function(a) {
        for (var b in a) return !1;
        return !0
    },
    arrRandom: function(a, b, c, d, e) {
        var f = new Array;
        switch (d) {
            case 3:
                for (var g = a; g <= b; g++) /^(\d)\1\1$/.test(g) || (f[g] = g);
                break;
            case 2:
                for (var g = a; g <= b; g++) /^(\d)\1$/.test(g) || (f[g] = g);
                break;
            case 0:
                for (var g = a; g <= b; g++) f[g] = g
        }
        f.sort(function() {
            return .5 - Math.random()
        });
        for (var h = [], g = 0; g < c; g++) e ? h.push(lott.addZero(f[g] + "", (b + "").length)) : h.push(f[g] + "");
        return h
    },
    numberRandom: function(a, b, c) {
        for (var d = [c], e = 0; e < c; e++) {
            var f = 0;
            do {
                var g = !1;
                f = Math.floor(Math.random() * (b - a + 1)) + a, -1 != d.indexOf(f) && (g = !0)
            } while (g);
            d[e] = f
        }
        return d
    },
    addZero: function(a, b) {
        if (a.length > 1 * b) return "";
        for (var c = "", d = 0; d < 1 * b - a.length; d++) c += "0";
        return c + a
    },
    randomBallEvents: function(a) {
        $(document).off("click", "div[bet-random]").on("click", "div[bet-random]", function() {
            $("li[bet-sort='currentBetCart']").hasClass("tab-active") || $("li[bet-sort='currentBetCart']").trigger("click"), a && a(this)
        })
    },
    lottSeriesSort: function(a) {
        for (var b = [
                ["SSC", 1],
                ["SSC", 2],
                ["11X5", 1],
                ["LF", 1],
                ["PK10", 1]
            ], c = [], d = 0; d < a.length; d++)
            for (var e = 0; e < b.length; e++) b[e][0] == a[d].gameGroupCode && b[e][1] == a[d].prizeModeId && (c[e] = a[d]);
        return c
    },
    lottSort: function(a) {
        for (var b = ["SSC", "11X5", "LF", "PK10"], c = [], d = 0; d < b.length; d++)
            for (var e = 0; e < a.length; e++) b[d] == a[e].code && c.push(a[e]);
        return c
    },
    setLottModeUI: function() {
        var a = globalVar.currentLottery.series,
            b = "";
        if (1 == a.length) {
            var c = a[0].prizeModeId;
            switch (c) {
                case "1":
                    b += '<dt class="game-icons menu-tab-right2 inline-block hide" lott-mode="Tradition">传统</dt>';
                    break;
                case "2":
                    b += '<dt class="game-icons menu-tab-right inline-block hide" lott-mode="ZY">智赢</dt>'
            }
        }
        if (a.length > 1 && (b += '<dt class="game-icons menu-tab-right inline-block" lott-mode="ZY">智赢<span class="hover-data hide">时时彩万位开“6”，返奖2000奖金的75%<br/>时时彩万位开“9”，返奖2000奖金的90%<br/>时时彩万位开“0,1,2,3,4,5,7,8”全额2000奖金</span></dt>', b += '<dt class="game-icons menu-tab-right2 inline-block" lott-mode="Tradition">传统</dt>'), $('dl[id="lottMode"]').html(b), $(document).off("click", "#lottMode dt").on("click", "#lottMode dt", function() {
                var a = $(this);
                a.hasClass("active") || (globalVar.currentCart.length > 0 ? TCG.Confirm("此选择将会清空您购物车所选内容<br/>请问您是否还要继续？", "XS", function(b) {
                    b && (lott.clearCart(), lott.lottModeUIProcessor(a))
                }) : lott.lottModeUIProcessor(a))
            }), a.length > 1 && $("#lottMode dt[lott-mode='Tradition']").trigger("click"), 1 == a.length) {
            var c = a[0].prizeModeId;
            switch (c) {
                case "1":
                    $("#lottMode dt[lott-mode='Tradition']").trigger("click");
                    break;
                case "2":
                    $("#lottMode dt[lott-mode='ZY']").trigger("click")
            }
        }
    },
    lottModeUIProcessor: function(a) {
        $("#lottMode dt").removeClass("active"), a.addClass("active"), $("#lottMode dt[lott-mode='ZY']").hasClass("active") && "SSC" == globalVar.currentLottery.series[0].gameGroup ? ($("#topLottMenus").addClass("watermark"), $("#drawResult li:first-child").addClass("dr69")) : ($("#topLottMenus").removeClass("watermark"), $("#drawResult li:first-child").removeClass("dr69"));
        var b = a.attr("lott-mode");
        lott.setSeries(b), lott.lottPlayMenusUI()
    },
    setSeries: function(a) {
        globalVar.currentLottMode = a;
        var b = {};
        if (1 == globalVar.currentLottery.series.length && (b = globalVar.currentLottery.series[0]), globalVar.currentLottery.series.length > 1) {
            var c = "Tradition" == globalVar.currentLottMode ? 0 : 1;
            b = globalVar.currentLottery.series[c]
        }
        globalVar.currentLottery.betSeries = b.maxBetSeries, globalVar.currentLottery.prizeModeId = b.prizeModeId
    },
    lottPlayMenusUI: function() {
        globalVar.playBonus = {}, globalVar.currentPlayMenu = {};
        var a = globalVar.result.lottPlayMenus;
        if (a.length > 0) {
            for (var b = "", c = 0; c < a.length; c++)
                if (a[c].prizeModeName == globalVar.currentLottMode && a[c].playMenuGroups.length > 0) {
                    globalVar.currentPlayMenu = a[c].playMenuGroups;
                    for (var d = a[c].playMenuGroups, e = 0; e < d.length; e++) {
                        if ("PK10" == globalVar.currentLottery.series[0].gameGroup) {
                            for (var f = 0, g = 0; g < d[e].playMenus.length; g++) 1 * d[e].playMenus[g].playSwitch == 0 && f++;
                            if (d[e].playMenus.length == f) continue
                        } else {
                            for (var h = 0, i = 0; i < d[e].playSubGroups.length; i++) {
                                for (var f = 0, j = 0; j < d[e].playSubGroups[i].playMenus.length; j++) 1 * d[e].playSubGroups[i].playMenus[j].playSwitch == 0 && f++;
                                d[e].playSubGroups[i].playMenus.length == f && h++
                            }
                            if (d[e].playSubGroups.length == h) continue
                        }
                        1736 != d[e].playId && (b += '<li class="with_child" menu-info="' + d[e].playId + "#" + d[e].playCode + "#" + e + '">' + TCG.Prop("play_name_" + d[e].playId), b += "</li>")
                    }
                }
            $('ul[class="menu-loterry"]').html(b), $(document).off("click", ".menu-loterry>li").on("click", ".menu-loterry>li", function() {
                $(".menu-loterry>li").removeClass("active"), $(this).addClass("active");
                var a = $(this).attr("menu-info"),
                    b = a.split("#"),
                    c = "";
                if ("PK10" == globalVar.currentLottery.series[0].gameGroup) {
                    var d = globalVar.currentPlayMenu[1 * b[2]];
                    c += "<dt>";
                    var e = d.playMenus;
                    if (e.length > 0) {
                        c += "<ul>";
                        for (var f = 0; f < e.length; f++) 1 * e[f].playSwitch == 1 && (c += '<li menu-info="' + e[f].playId + "#" + e[f].playCode + "#" + e[f].singleBetPrice + '">' + TCG.Prop("play_name_" + e[f].playId) + "</li>", globalVar.playBonus[e[f].playCode] = lott.playBonusOrder(e[f].playMenuInfos));
                        c += "</ul>"
                    }
                    c += "</dt>"
                } else
                    for (var d = globalVar.currentPlayMenu[1 * b[2]].playSubGroups, g = 0; g < d.length; g++) {
                        c += "<dt><span>" + TCG.Prop("play_name_" + d[g].playId) + ":</span>";
                        var e = d[g].playMenus;
                        if (e.length > 0) {
                            c += "<ul>";
                            for (var f = 0; f < e.length; f++) 1 * e[f].playSwitch == 1 && (c += '<li menu-info="' + e[f].playId + "#" + e[f].playCode + "#" + e[f].singleBetPrice + '">' + TCG.Prop("play_name_" + e[f].playId) + "</li>", globalVar.playBonus[e[f].playCode] = lott.playBonusOrder(e[f].playMenuInfos));
                            c += "</ul>"
                        }
                        c += "</dt>"
                    }
                $("#sub_group_menus").html(c), $("#sub_group_menus li").off("click").on("click", function() {
                    $("#sub_group_menus li").removeClass("selected"), $(this).addClass("selected"), "lot-game-wrp" != $("div[select-area='ball']").prop("class") && $("div[select-area='ball']").prop("class", "lot-game-wrp");
                    var a = $(this).attr("menu-info"),
                        b = a.split("#");
                    $("#lottWinExplain").html(TCG.Prop("play_explain_" + b[0] + "_" + globalVar.currentLottery.prizeModeId)), globalVar.shortcutContent.length > 0 && lott.clearShortcutContent();
                    var c = globalVar.currentLottery.series[0].gameGroup;
                    globalVar.singleStakesPrice = 1 * b[2], globalVar.playId = b[0], globalVar.playCode = b[1], globalVar.anyBitsContent = "", globalVar.anyBitScheme = [], lott.calculateAmount(0), $("div[select-area]").hide(), $('div[select-area="ball"]').show(), $("dl[bet-btn-area]").hide(), $('dl[bet-btn-area="ball"]').show(), $('dl[area-sort="textArea"]').hide(), lott[c].betBallUI(b[1]), lott.refreshCurrentBonus(globalVar.playCode, c)
                });
                var h = $("#sub_group_menus li").get(0);
                $(h).trigger("click")
            });
            var k = globalVar.currentLottery.series[0].gameGroup;
            "SSC" == k && $(".menu-loterry>li[menu-info*='#Last_3#']").trigger("click"), "11X5" == k && $(".menu-loterry>li[menu-info*='#First_3_11X5#']").trigger("click"), "LF" == k && "TCP3P5" == globalVar.currentLottery.game && $(".menu-loterry>li[menu-info*='#P3_Straight_LF#']").trigger("click"), "LF" == k && "FC3D" == globalVar.currentLottery.game && $(".menu-loterry>li[menu-info*='#Last_3_3D#']").trigger("click"), "PK10" == k && $(".menu-loterry>li[menu-info*='#Fixed_Place_PK10#']").trigger("click"), lott.lottBetSeries()
        }
    },
    refreshCurrentBonus: function(a, b) {
        var c = 0;
        a && (c = globalVar.playBonus[a].split(",")[0]);
        var d = 0;
        d = "11X5" == b ? 1980 : 2e3, $("span[play-menu='bonus']").text(lott.formatNumber(c * globalVar.currentLottery.betMode.unit * (globalVar.currentLottery.betSeries / d * 2), 4))
    },
    playBonusOrder: function(a) {
        for (var b = [], c = 0; c < a.length; c++) b.push(a[c].bonus);
        var d = b.length;
        if (d <= 1) return b.join(",");
        for (var e = 1; e < d; e++) {
            for (var f = b[e], g = e; g > 0 && b[g - 1] < f; g--) b[g] = b[g - 1];
            b[g] = f
        }
        return b.join(",")
    },
    lottBettingModes: function() {
        var a = globalVar.result.bettingModes;
        if (a.betMultipleMax && (globalVar.currentLottery.betMaxMult = a.betMultipleMax), a.betAmountMax && (globalVar.currentLottery.betMaxAmount = a.betAmountMax), a.bettingModes && a.bettingModes.length > 0) {
            for (var b = '<dt class="inline-block">模式:</dt>', c = 0; c < a.bettingModes.length; c++) b += '<dd class="btn game-icons inline-block currency" bet-mode="' + a.bettingModes[c].code + '"  mode-info="' + a.bettingModes[c].bettingModeId + "#" + a.bettingModes[c].unit + "#" + a.bettingModes[c].code + '">' + TCG.Prop("betting_mode_" + a.bettingModes[c].bettingModeId) + "</dd>";
            $("#lottBetMode").html(b), $("#lottBetMode dd").off("click").on("click", function() {
                if (!$(this).hasClass("active")) {
                    $("#lottBetMode dd").removeClass("active"), $(this).addClass("active");
                    var a = $(this),
                        b = $(this).attr("mode-info").split("#");
                    globalVar.currentLottery.betMode = {
                        id: b[0],
                        unit: b[1],
                        name: b[2]
                    };
                    var c = $('input[name="betMultiple"]').val();
                    if (1 * c > globalVar.currentLottery.betMaxMult) return void TCG.Alert("alerts", "在当前模式您的最大投注倍数不能超过" + globalVar.currentLottery.betMaxMult + "倍", "XS", function() {
                        $("input[name='betMultiple']").val(globalVar.currentLottery.betMaxMult), c = globalVar.currentLottery.betMaxMult, $("input[name='betMultiple']").trigger("input"), a.removeClass("active"), a.trigger("click")
                    });
                    if (globalVar.selectionBallAmount > 0) {
                        var d = 0;
                        d = 0 == globalVar.playCode.indexOf("Any4Com") || 0 == globalVar.playCode.indexOf("Any3Com") || 0 == globalVar.playCode.indexOf("Any3Sum") || 0 == globalVar.playCode.indexOf("Any2Com") || 0 == globalVar.playCode.indexOf("Any2Sum") ? globalVar.selectionBallAmount * globalVar.anyBitScheme.length : globalVar.selectionBallAmount, $("#selectionBallAmount").text(lott.formatNumber(c * d * globalVar.currentLottery.betMode.unit, 4))
                    }
                    if ("" != globalVar.playCode) {
                        var e = globalVar.currentLottery.series[0].gameGroup;
                        lott.refreshCurrentBonus(globalVar.playCode, e)
                    }
                }
            }), $('#lottBetMode dd[bet-mode="Dollar"]').trigger("click"), lott.lottBetMultiple(), lott.setLottModeUI()
        }
    },
    lottBetMultiple: function() {
        $("#lottBetMultiple dt[bet-mult='reduce'],#lottBetMultiple dt[bet-mult='add']").off("click").on("click", function() {
            var a = $(this).attr("bet-mult"),
                b = $('input[name="betMultiple"]').val();
            switch (a) {
                case "reduce":
                    if (1 * b <= 1) return;
                    b = 1 * b - 1, $('input[name="betMultiple"]').val(b);
                    break;
                case "add":
                    if (1 * b >= globalVar.currentLottery.betMaxMult) return;
                    b = 1 * b + 1, $('input[name="betMultiple"]').val(b)
            }
            if (globalVar.selectionBallAmount > 0) {
                var c = 0;
                c = 0 == globalVar.playCode.indexOf("Any4Com") || 0 == globalVar.playCode.indexOf("Any3Com") || 0 == globalVar.playCode.indexOf("Any3Sum") || 0 == globalVar.playCode.indexOf("Any2Com") || 0 == globalVar.playCode.indexOf("Any2Sum") ? globalVar.selectionBallAmount * globalVar.anyBitScheme.length : globalVar.selectionBallAmount, $("#selectionBallAmount").text(lott.formatNumber(b * c * globalVar.currentLottery.betMode.unit, 4))
            }
        }), $("input[name='betMultiple']").off("focus").on("focus", function() {
            $(this).select()
        }), $("input[name='betMultiple']").off("blur").on("blur", function() {
            if (!/^[1-9]\d*$/.test($(this).val())) return $("input[name='betMultiple']").val(1), void $("input[name='betMultiple']").trigger("input")
        }), $("input[name='betMultiple']").off("input propertychange").on("input propertychange", function() {
            var a = $(this).val();
            if (!/^[1-9]\d*$/.test(a)) return void("" != a && TCG.Alert("alerts", "您输入的投注倍数格式不正确,只能输入大于或等于1的数字。", "XS", function() {
                $("input[name='betMultiple']").val(1), a = 1, $("input[name='betMultiple']").trigger("input")
            }));
            if (1 * a > globalVar.currentLottery.betMaxMult) return void TCG.Alert("alerts", "您的最大投注倍数不能超过" + globalVar.currentLottery.betMaxMult + "倍", "XS", function() {
                $("input[name='betMultiple']").val(globalVar.currentLottery.betMaxMult), a = globalVar.currentLottery.betMaxMult, $("input[name='betMultiple']").trigger("input")
            });
            if (globalVar.selectionBallAmount > 0) {
                var b = 0;
                b = 0 == globalVar.playCode.indexOf("Any4Com") || 0 == globalVar.playCode.indexOf("Any3Com") || 0 == globalVar.playCode.indexOf("Any3Sum") || 0 == globalVar.playCode.indexOf("Any2Com") || 0 == globalVar.playCode.indexOf("Any2Sum") ? globalVar.selectionBallAmount * globalVar.anyBitScheme.length : globalVar.selectionBallAmount, $("#selectionBallAmount").text(lott.formatNumber(a * b * globalVar.currentLottery.betMode.unit, 4))
            }
        })
    },
    lottBetSeries: function() {
        var a = {};
        if (1 == globalVar.currentLottery.series.length && (a = globalVar.currentLottery.series[0]), globalVar.currentLottery.series.length > 1) {
            var b = "Tradition" == globalVar.currentLottMode ? 0 : 1;
            a = globalVar.currentLottery.series[b]
        }
        var c = $(".betSeriesSlider").slider({
            value: 1 * a.maxBetSeries,
            orientation: "horizontal",
            range: "min",
            min: 1 * a.minSeries,
            max: 1 * a.maxBetSeries,
            animate: !0,
            step: 2,
            slide: function(b, c) {
                globalVar.currentLottery.betSeries = c.value;
                var d = lott.formatNumber((1 * a.maxSeries - 1 * globalVar.currentLottery.betSeries) / 2e3 * 100, 2);
                $('#lottBetSeries dt[bet-series="val"]').text(globalVar.currentLottery.betSeries + "/" + d + "%");
                var e = globalVar.currentLottery.series[0].gameGroup;
                lott.refreshCurrentBonus(globalVar.playCode, e)
            },
            change: function(b, c) {
                globalVar.currentLottery.betSeries = c.value;
                var d = lott.formatNumber((1 * a.maxSeries - 1 * globalVar.currentLottery.betSeries) / 2e3 * 100, 2);
                $('#lottBetSeries dt[bet-series="val"]').text(globalVar.currentLottery.betSeries + "/" + d + "%");
                var e = globalVar.currentLottery.series[0].gameGroup;
                lott.refreshCurrentBonus(globalVar.playCode, e)
            }
        });
        c.slider({
            value: 1 * a.maxBetSeries
        }), c.slider({
            min: 1 * a.minSeries
        }), c.slider({
            max: 1 * a.maxBetSeries
        })
    },
    betCartAndHistoryEvents: function() {
        $(document).off("click", "li[bet-sort]").on("click", "li[bet-sort]", function() {
            if (!$(this).hasClass("tab-active")) {
                $("li[bet-sort]").removeClass("tab-active"), $(this).addClass("tab-active");
                var a = $(this).attr("bet-sort");
                $("div[bet-sort-content]").hide(), $("div[bet-sort-content='" + a + "']").show(), "todayBetHistory" == a && lott.bettingOrderHistoryRecord()
            }
        }), $("li[bet-sort='currentBetCart']").trigger("click")
    },
    bettingOrderHistoryRecord: function() {
        var a = new Date,
            b = (a.getFullYear(), a.getMonth() + 1 < 10 ? a.getMonth() : a.getMonth(), a.getDate() < 10 ? a.getDate() : a.getDate(), {
                gameId: globalVar.currentLottery.gameId,
                page: 0,
                size: 50
            });
        TCG.Ajax({
            url: "./lgw/orders/today",
            headers: {
                Merchant: globalVar.merchantCode,
                Authorization: window.sessionStorage.getItem("token")
            },
            data: b,
            dataType: "json",
            contentType: "application/json",
            type: "GET"
        }, function(a) {
            for (var b = "", c = a.orders.content, d = 0; d < c.length; d++) {
                var e = null == c[d].winningNumber ? "-" : c[d].winningNumber;
                b += "<ul>", b += "<li class='ch-new-row'> " + TCG.Prop("gameName_" + c[d].gameCode) + "</li>";
                var f = control.shortenText(c[d].orderNumber);
                1 != c[d].chasing && "true" != c[d].chasing || (f = f + "-" + $.strPad(c[d].chasingOrder, 3)), b += "<li class='ch-limit' data-modal='personal/gameHistory' data-content='" + c[d].orderDetailId + "' data-chasing='" + c[d].chasing + "' data-orderMasterId='" + c[d].orderMasterId + "' style='cursor: pointer;'>" + f + "</li>", b += "<li class='ch-new-row2'> " + control.timeToDateFormat(c[d].bettingTime, "MonthDateTime") + " </li>", b += "<li>" + c[d].numero + "</li>", b += "<li class='chControl chHover'>" + e + " <span class='cm_number hide'>" + e + "</span></li>", b += "<li>" + control.customCurrencyFormat(c[d].planBettingAmount, 4) + "</li>", b += "<li " + (4 == c[d].orderStatus ? "class='tbl-red' " : "") + ">" + control.customCurrencyFormat(c[d].winningAmount, 4) + "</li>", 2 == c[d].orderStatus ? b += "<li class='cancel-y cancelOrder tz_history_content_btn_adjustment' data-orderId='" + c[d].orderDetailId + "' data-orderMasterId='" + c[d].orderMasterId + "' data-chasing='" + c[d].chasing + "'>撤单</li>" : b += "<li>" + TCG.Prop("orderStatus_" + c[d].orderStatus) + "</li>", b += "</ul>"
            }
            $("#gameHistoryToday").html(b), $(document).on("click", "#gameHistoryToday .cancelOrder", function() {
                var a = $(this).parent(),
                    b = $(this).attr("data-orderMasterId"),
                    c = a.nextAll(),
                    d = [];
                "true" == $(this).attr("data-chasing") && c.each(function(a) {
                    $("li.cancelOrder", c[a]).attr("data-orderMasterId") == b && d.push($("li.cancelOrder", c[a]).attr("data-orderId"))
                });
                var e = $(this);
                if (d.push(e.attr("data-orderId")), 1 != d.length) return TCG.Alert("errors", "追号单需从最后一期开始撤单"), !1;
                TCG.Confirm(TCG.Prop("gameHistoryCancel"), "", function(a) {
                    a && $.ajax({
                        url: "./lgw/orders/suborders/cancel",
                        headers: {
                            Merchant: globalVar.merchantCode,
                            Authorization: window.sessionStorage.getItem("token")
                        },
                        data: "[" + d.toString() + "]",
                        type: "PUT",
                        dataType: "json",
                        contentType: "application/json",
                        complete: function(a, d, f) {
                            switch (a.status) {
                                case 500:
                                    TCG.Alert("errors", TCG.Prop(a.responseJSON.errorCode));
                                    break;
                                case 200:
                                    $("#itemWrapper .orderStatus").text(TCG.Prop("orderStatus_8")), "true" == e.attr("data-chasing") && c.each(function(a) {
                                        $("li.cancelOrder", c[a]).attr("data-orderMasterId") == b && $("li.cancelOrder", c[a]).text(TCG.Prop("orderStatus_8")).removeClass("cancelOrder cancel-y")
                                    }), e.text(TCG.Prop("orderStatus_8")).removeClass("cancelOrder cancel-y"), TCG.Alert("success", TCG.Prop("gameHistoryCancel_success"), "XS", function() {
                                        control.headerWalletList()
                                    })
                            }
                        }
                    })
                })
            }), $(document).off("click", "#gameHistoryToday li[data-modal='personal/gameHistory']").on("click", "#gameHistoryToday li[data-modal='personal/gameHistory']", function() {
                var a = $(this).attr("data-modal"),
                    b = $(this).attr("data-content"),
                    c = $(this).attr("data-chasing");
                globalVar.orderMasterId = $(this).attr("data-orderMasterId"), sessionStorage.setItem("orderMasterId", $(this).attr("data-orderMasterId")), window.sessionStorage.setItem("gameHistoryOrderId", b), window.sessionStorage.setItem("chasing", c);
                var d = a.split("/"),
                    e = UI.popupsModel(d[0]);
                TCG.WinOpen({
                    text: e,
                    width: "1274px",
                    height: "600px"
                }, function() {
                    UI.checkUserType(), control.popupsModelMenu(), control.popupSubMenu(), window.sessionStorage.setItem("childMenu", ""), d.length >= 1 ? $('.model_child_menus li[data-submenu="' + d[1] + '"]').trigger("click") : $(".model_child_menus li:first-child").trigger("click"), control.closePopOnESC("on")
                }, function() {
                    control.closePopOnESC("off")
                })
            })
        })
    },
    SSC: {
        betBallUI: function(a) {
            switch (a) {
                case "Last1Straight":
                    lott.direct(null, ["FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                        return a[a.length - 1][a[0]].length
                    });
                    break;
                case "AnyShow1_SSC":
                case "AnyShow2_SSC":
                case "AnyShow3_SSC":
                case "AnyShow4_SSC":
                    lott.NonDirect("特殊", ["FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                        return a[a.length - 1][a[0]].length
                    });
                    break;
                case "FixedPlace":
                    "ZY" == globalVar.currentLottMode ? lott.direct(null, ["SECOND", "THIRD", "FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                        return a[a.length - 1][a[0]].length + a[a.length - 1][a[1]].length + a[a.length - 1][a[2]].length + a[a.length - 1][a[3]].length
                    }) : lott.direct(null, ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                        return a[a.length - 1][a[0]].length + a[a.length - 1][a[1]].length + a[a.length - 1][a[2]].length + a[a.length - 1][a[3]].length + a[a.length - 1][a[4]].length
                    });
                    break;
                case "Last2Straight":
                    lott.direct(null, ["FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length
                    });
                    break;
                case "Last2Com":
                    lott.NonDirect("组选", ["FIFTH"], 0, 9, 1, !0, 7, 2, "", function(a) {
                        return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) / 2
                    });
                    break;
                case "Last2Split":
                    lott.direct(null, ["FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length
                    });
                    break;
                case "Last2Point":
                    lott.sumAndPointUI("包点", ["FIFTH"], 0, 18, 1, "2ndx");
                    break;
                case "Last2Join":
                    lott.direct(null, ["FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length + a[a.length - 1][a[1]].length
                    });
                    break;
                case "Last2Sum":
                    lott.sumAndPointUI("和值", ["FIFTH"], 0, 18, 1, "2nd");
                    break;
                case "Last3Straight":
                    lott.direct(null, ["THIRD", "FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length
                    });
                    break;
                case "Last3Point":
                    lott.sumAndPointUI("包点", ["FIFTH"], 0, 27, 1, "3rdx");
                    break;
                case "Last3Com3":
                    lott.NonDirect("组三", ["FIFTH"], 0, 9, 1, !0, 10, 2, "", function(a) {
                        return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1)
                    });
                    break;
                case "Last3Com6":
                    lott.NonDirect("组六", ["FIFTH"], 0, 9, 1, !0, 10, 3, "", function(a) {
                        return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) * (a[a.length - 1][a[0]].length - 2) / 6
                    });
                    break;
                case "Last3Com":
                    lott.allMixComboSelection();
                    break;
                case "Last3Join":
                    lott.direct(null, ["THIRD", "FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[2]].length
                    });
                    break;
                case "Last3StraightCom":
                    lott.NonDirect("直组", ["FIFTH"], 0, 9, 1, !0, 10, 3, "", function(a) {
                        return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) * (a[a.length - 1][a[0]].length - 2)
                    });
                    break;
                case "Last3Sum":
                    lott.sumAndPointUI("和值", ["FIFTH"], 0, 27, 1, "3rd");
                    break;
                case "First2Straight":
                    lott.direct(null, ["FIRST", "SECOND"], 0, 9, 1, !0, 10, 1, "3", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length
                    });
                    break;
                case "First2Com":
                    lott.NonDirect("组选", ["FIRST"], 0, 9, 1, !0, 7, 2, "", function(a) {
                        return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) / 2
                    });
                    break;
                case "First2Split":
                    lott.direct(null, ["FIRST", "SECOND"], 0, 9, 1, !0, 10, 1, "3", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length
                    });
                    break;
                case "First2Point":
                    lott.sumAndPointUI("包点", ["FIRST"], 0, 18, 1, "2ndx");
                    break;
                case "First2Join":
                    lott.direct(null, ["FIRST", "SECOND"], 0, 9, 1, !0, 10, 1, "3", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length + a[a.length - 1][a[1]].length
                    });
                    break;
                case "First2Sum":
                    lott.sumAndPointUI("和值", ["FIRST"], 0, 18, 1, "2nd");
                    break;
                case "First3Straight":
                    lott.direct(null, ["FIRST", "SECOND", "THIRD"], 0, 9, 1, !0, 10, 1, "2", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length
                    });
                    break;
                case "First3Point":
                    lott.sumAndPointUI("包点", ["FIRST"], 0, 27, 1, "3rdx");
                    break;
                case "First3Com3":
                    lott.NonDirect("组三", ["FIRST"], 0, 9, 1, !0, 10, 2, "", function(a) {
                        return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1)
                    });
                    break;
                case "First3Com6":
                    lott.NonDirect("组六", ["FIRST"], 0, 9, 1, !0, 10, 3, "", function(a) {
                        return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) * (a[a.length - 1][a[0]].length - 2) / 6
                    });
                    break;
                case "First3Com":
                    lott.allMixComboSelection();
                    break;
                case "First3Join":
                    lott.direct(null, ["FIRST", "SECOND", "THIRD"], 0, 9, 1, !0, 10, 1, "2", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[2]].length
                    });
                    break;
                case "First3StraightCom":
                    lott.NonDirect("直组", ["FIRST"], 0, 9, 1, !0, 10, 3, "", function(a) {
                        return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) * (a[a.length - 1][a[0]].length - 2)
                    });
                    break;
                case "First3Sum":
                    lott.sumAndPointUI("和值", ["FIRST"], 0, 27, 1, "3rd");
                    break;
                case "All5Straight":
                    lott.direct(null, ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length
                    });
                    break;
                case "All5All":
                    lott.direct(null, ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], 0, 9, 1, !1, 1, 1, "", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length
                    });
                    break;
                case "All5Join":
                    lott.direct(null, ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[4]].length
                    });
                    break;
                case "First2BSOE":
                    lott.BSOEUI(["FIRST", "SECOND"], "5", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length
                    });
                    break;
                case "Last2BSOE":
                    lott.BSOEUI(["FOURTH", "FIFTH"], "5", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length
                    });
                    break;
                case "First2ComAnyCode":
                    lott.NonDirect("胆码", ["FIRST"], 0, 9, 1, !0, 10, 1, "", function(a) {
                        return 10 * a[a.length - 1][a[0]].length
                    });
                    break;
                case "First2StraightAnyCode":
                    lott.NonDirect("胆码", ["FIRST"], 0, 9, 1, !0, 10, 1, "", function(a) {
                        return 1 * a[a.length - 1][a[0]].length
                    });
                    break;
                case "First3ComAnyCode1":
                    lott.NonDirect("胆码", ["FIRST"], 0, 9, 1, !1, 1, 1, "", function(a) {
                        return 55 * a[a.length - 1][a[0]].length
                    });
                    break;
                case "First3ComAnyCode2":
                    lott.NonDirect(["一胆", "二胆"], ["FIRST", "SECOND"], 0, 9, 1, !1, 1, 1, "", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * 10
                    });
                    break;
                case "First3StraightAnyCode1":
                    lott.NonDirect("胆码", ["FIRST"], 0, 9, 1, !1, 1, 1, "", function(a) {
                        return 1 * a[a.length - 1][a[0]].length
                    });
                    break;
                case "First3StraightAnyCode2":
                    lott.NonDirect(["一胆", "二胆"], ["FIRST", "SECOND"], 0, 9, 1, !1, 1, 1, "", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * 1
                    });
                    break;
                case "Last2ComAnyCode":
                    lott.NonDirect("胆码", ["FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                        return 10 * a[a.length - 1][a[0]].length
                    });
                    break;
                case "Last2StraightAnyCode":
                    lott.NonDirect("胆码", ["FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                        return 1 * a[a.length - 1][a[0]].length
                    });
                    break;
                case "Last3ComAnyCode1":
                    lott.NonDirect("胆码", ["FIFTH"], 0, 9, 1, !1, 1, 1, "", function(a) {
                        return 55 * a[a.length - 1][a[0]].length
                    });
                    break;
                case "Last3ComAnyCode2":
                    lott.NonDirect(["一胆", "二胆"], ["FOURTH", "FIFTH"], 0, 9, 1, !1, 1, 1, "", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * 10
                    });
                    break;
                case "Last3StraightAnyCode1":
                    lott.NonDirect("胆码", ["FIFTH"], 0, 9, 1, !1, 1, 1, "", function(a) {
                        return 1 * a[a.length - 1][a[0]].length
                    });
                    break;
                case "Last3StraightAnyCode2":
                    lott.NonDirect(["一胆", "二胆"], ["FOURTH", "FIFTH"], 0, 9, 1, !1, 1, 1, "", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * 1
                    });
                    break;
                case "Last4Straight":
                    lott.direct(null, ["SECOND", "THIRD", "FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length
                    });
                    break;
                case "Last4Join":
                    lott.direct(null, ["SECOND", "THIRD", "FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[3]].length
                    });
                    break;
                case "First4Straight":
                    lott.direct(null, ["FIRST", "SECOND", "THIRD", "FOURTH"], 0, 9, 1, !0, 10, 1, "1", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length
                    });
                    break;
                case "First4Join":
                    lott.direct(null, ["FIRST", "SECOND", "THIRD", "FOURTH"], 0, 9, 1, !0, 10, 1, "1", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[3]].length
                    });
                    break;
                case "Middle3Straight":
                    lott.direct(null, ["SECOND", "THIRD", "FOURTH"], 0, 9, 1, !0, 10, 1, "1", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length
                    });
                    break;
                case "First3Point":
                    lott.sumAndPointUI("包点", ["FOURTH"], 0, 27, 1, "3rdx");
                    break;
                case "Middle3Com3":
                    lott.NonDirect("组三", ["FOURTH"], 0, 9, 1, !0, 10, 2, "", function(a) {
                        return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1)
                    });
                    break;
                case "Middle3Com6":
                    lott.NonDirect("组六", ["FOURTH"], 0, 9, 1, !0, 10, 3, "", function(a) {
                        return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) * (a[a.length - 1][a[0]].length - 2) / 6
                    });
                    break;
                case "Middle3Com":
                    lott.allMixComboSelection();
                    break;
                case "Middle3Join":
                    lott.direct(null, ["SECOND", "THIRD", "FOURTH"], 0, 9, 1, !0, 10, 1, "1", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[2]].length
                    });
                    break;
                case "Middle3StraightCom":
                    lott.NonDirect("直组", ["FOURTH"], 0, 9, 1, !0, 10, 3, "", function(a) {
                        return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) * (a[a.length - 1][a[0]].length - 2)
                    });
                    break;
                case "Middle3Sum":
                    lott.sumAndPointUI("和值", ["FOURTH"], 0, 27, 1, "3rd");
                    break;
                case "Middle3ComAnyCode1":
                    lott.NonDirect("胆码", ["FOURTH"], 0, 9, 1, !1, 1, 1, "", function(a) {
                        return 55 * a[a.length - 1][a[0]].length
                    });
                    break;
                case "Middle3ComAnyCode2":
                    lott.NonDirect(["一胆", "二胆"], ["THIRD", "FOURTH"], 0, 9, 1, !1, 1, 1, "", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * 10
                    });
                    break;
                case "Middle3StraightAnyCode1":
                    lott.NonDirect("胆码", ["FOURTH"], 0, 9, 1, !1, 1, 1, "", function(a) {
                        return 1 * a[a.length - 1][a[0]].length
                    });
                    break;
                case "Middle3StraightAnyCode2":
                    lott.NonDirect(["一胆", "二胆"], ["THIRD", "FOURTH"], 0, 9, 1, !1, 1, 1, "", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * 1
                    });
                    break;
                case "Any1":
                    lott.direct(null, ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 0, "", function(a) {
                        return a[a.length - 1][a[0]].length + a[a.length - 1][a[1]].length + a[a.length - 1][a[2]].length + a[a.length - 1][a[3]].length + a[a.length - 1][a[4]].length
                    });
                    break;
                case "Any2":
                    lott.direct(null, ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 0, "", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[2]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length
                    });
                    break;
                case "Any3":
                    lott.direct(null, ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 0, "", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length
                    });
                    break;
                case "Any4":
                    lott.direct(null, ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 0, "", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length
                    });
                    break;
                case "AllCom120":
                    lott.NonDirect("组选", ["FIRST"], 0, 9, 1, !0, 10, 5, "", function(a) {
                        var b = a[a.length - 1][a[0]].length;
                        return (b - 4) * (b - 3) * (b - 2) * (b - 1) * b / 120
                    });
                    break;
                case "AllCom60":
                    lott.NonDirect(["二重号", "单号"], ["FIFTH", "FOURTH"], 0, 9, 1, !0, 10, {
                        FIFTH: 1,
                        FOURTH: 3
                    }, "", function(a) {
                        var b = a[a.length - 1][a[0]].length,
                            c = b > 0 ? a[a.length - 1][a[1]].length : 0;
                        return c * (c - 2) * (c - 1) / 6 * b - lott.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]]) * ((c - 2) * (c - 1)) / 2
                    });
                    break;
                case "AllCom30":
                    lott.NonDirect(["二重号", "单号"], ["FIFTH", "FOURTH"], 0, 9, 1, !0, 10, {
                        FIFTH: 2,
                        FOURTH: 1
                    }, "", function(a) {
                        var b = a[a.length - 1][a[0]].length;
                        return a[a.length - 1][a[1]].length * ((b - 1) * b) / 2 - lott.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]]) * (b - 1)
                    });
                    break;
                case "AllCom20":
                    lott.NonDirect(["三重号", "单号"], ["FIFTH", "FOURTH"], 0, 9, 1, !0, 10, {
                        FIFTH: 1,
                        FOURTH: 2
                    }, "", function(a) {
                        var b = a[a.length - 1][a[0]].length,
                            c = a[a.length - 1][a[1]].length;
                        return b * ((c - 1) * c) / 2 - lott.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]]) * (c - 1)
                    });
                    break;
                case "AllCom10":
                    lott.NonDirect(["三重号", "二重号"], ["FIFTH", "FOURTH"], 0, 9, 1, !0, 10, {
                        FIFTH: 1,
                        FOURTH: 1
                    }, "", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length - lott.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]])
                    });
                    break;
                case "AllCom5":
                    lott.NonDirect(["四重号", "单号"], ["FIFTH", "FOURTH"], 0, 9, 1, !0, 10, {
                        FIFTH: 1,
                        FOURTH: 1
                    }, "", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length - lott.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]])
                    });
                    break;
                case "F4Com24":
                case "L4Com24":
                    lott.NonDirect("组选", ["FIRST"], 0, 9, 1, !0, 10, 4, "", function(a) {
                        var b = a[a.length - 1][a[0]].length;
                        return (b - 3) * (b - 2) * (b - 1) * b / 24
                    });
                    break;
                case "F4Com12":
                case "L4Com12":
                    lott.NonDirect(["二重号", "单号"], ["FIFTH", "FOURTH"], 0, 9, 1, !0, 10, {
                        FIFTH: 1,
                        FOURTH: 2
                    }, "", function(a) {
                        var b = a[a.length - 1][a[0]].length,
                            c = a[a.length - 1][a[1]].length;
                        return b * (c - 1) * c / 2 - lott.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]]) * (c - 1)
                    });
                    break;
                case "F4Com6":
                case "L4Com6":
                    lott.NonDirect("二重号", ["FIRST"], 0, 9, 1, !0, 10, 2, "", function(a) {
                        var b = a[a.length - 1][a[0]].length;
                        return (b - 1) * b / 2
                    });
                    break;
                case "F4Com4":
                case "L4Com4":
                    lott.NonDirect(["三重号", "单号"], ["FIFTH", "FOURTH"], 0, 9, 1, !0, 10, {
                        FIFTH: 1,
                        FOURTH: 1
                    }, "", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length - lott.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]])
                    });
                    break;
                case "Any4Com24_SSC":
                    lott.NonDirect("组选", ["FIRST"], 0, 9, 1, !0, 10, 4, "", function(a) {
                        var b = a[a.length - 1][a[0]].length;
                        return (b - 3) * (b - 2) * (b - 1) * b / 24
                    }, !0);
                    break;
                case "Any4Com12_SSC":
                    lott.NonDirect(["二重号", "单号"], ["FIFTH", "FOURTH"], 0, 9, 1, !0, 10, {
                        FIFTH: 1,
                        FOURTH: 2
                    }, "", function(a) {
                        var b = a[a.length - 1][a[0]].length,
                            c = a[a.length - 1][a[1]].length;
                        return b * (c - 1) * c / 2 - lott.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]]) * (c - 1)
                    }, !0);
                    break;
                case "Any4Com6_SSC":
                    lott.NonDirect("二重号", ["FIRST"], 0, 9, 1, !0, 10, 2, "", function(a) {
                        var b = a[a.length - 1][a[0]].length;
                        return (b - 1) * b / 2
                    }, !0);
                    break;
                case "Any4Com4_SSC":
                    lott.NonDirect(["三重号", "单号"], ["FIFTH", "FOURTH"], 0, 9, 1, !0, 10, {
                        FIFTH: 1,
                        FOURTH: 1
                    }, "", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length - lott.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]])
                    }, !0);
                    break;
                case "Any3Sum_SSC":
                    lott.sumAndPointUI("和值", ["FIFTH"], 1, 26, 1, "3rdz");
                    break;
                case "Any3Com3_SSC":
                    lott.NonDirect("组三", ["FIFTH"], 0, 9, 1, !0, 10, 2, "", function(a) {
                        return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1)
                    }, !0);
                    break;
                case "Any3Com6_SSC":
                    lott.NonDirect("组六", ["FIFTH"], 0, 9, 1, !0, 10, 3, "", function(a) {
                        return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) * (a[a.length - 1][a[0]].length - 2) / 6
                    }, !0);
                    break;
                case "Any3Com_SSC":
                    lott.allMixComboSelection();
                    break;
                case "Any2Sum_SSC":
                    lott.sumAndPointUI("和值", ["FIFTH"], 1, 17, 1, "2rdz");
                    break;
                case "Any2Com_SSC":
                    lott.NonDirect("组选", ["FIRST"], 0, 9, 1, !0, 7, 2, "", function(a) {
                        return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) / 2
                    }, !0);
                    break;
                case "Any2Com_SSC_Single":
                default:
                    lott.allManualEntryEvents()
            }
        }
    },
    "11X5": {
        betBallUI: function(a) {
            switch (a) {
                case "Any1_11X5":
                    lott.direct("任选一", ["ANY"], 1, 11, 2, !0, 11, 1, "", function(a) {
                        return a[a.length - 1][a[0]].length
                    });
                    break;
                case "Any2_11X5":
                    lott.direct("任选二", ["ANY"], 1, 11, 2, !0, 11, 2, "", function(a) {
                        var b = a[a.length - 1][a[0]].length;
                        return b >= 2 ? lott.factorial(1 * b) / (lott.factorial(1 * b - 2) * lott.factorial(2)) : 0
                    });
                    break;
                case "Any3_11X5":
                    lott.direct("任选三", ["ANY"], 1, 11, 2, !0, 11, 3, "", function(a) {
                        var b = a[a.length - 1][a[0]].length;
                        return b >= 3 ? lott.factorial(1 * b) / (lott.factorial(1 * b - 3) * lott.factorial(3)) : 0
                    });
                    break;
                case "Any4_11X5":
                    lott.direct("任选四", ["ANY"], 1, 11, 2, !0, 11, 4, "", function(a) {
                        var b = a[a.length - 1][a[0]].length;
                        return b >= 4 ? lott.factorial(1 * b) / (lott.factorial(1 * b - 4) * lott.factorial(4)) : 0
                    });
                    break;
                case "Any5_11X5":
                    lott.direct("任选五", ["ANY"], 1, 11, 2, !0, 11, 5, "", function(a) {
                        var b = a[a.length - 1][a[0]].length;
                        return b >= 5 ? lott.factorial(1 * b) / (lott.factorial(1 * b - 5) * lott.factorial(5)) : 0
                    });
                    break;
                case "Any6_11X5":
                    lott.direct("任选六", ["ANY"], 1, 11, 2, !0, 11, 6, "", function(a) {
                        var b = a[a.length - 1][a[0]].length;
                        return b >= 6 ? lott.factorial(1 * b) / (lott.factorial(1 * b - 6) * lott.factorial(6)) : 0
                    });
                    break;
                case "Any7_11X5":
                    lott.direct("任选七", ["ANY"], 1, 11, 2, !0, 11, 7, "", function(a) {
                        var b = a[a.length - 1][a[0]].length;
                        return b >= 7 ? lott.factorial(1 * b) / (lott.factorial(1 * b - 7) * lott.factorial(7)) : 0
                    });
                    break;
                case "Any8_11X5":
                    lott.direct("任选八", ["ANY"], 1, 11, 2, !0, 11, 8, "", function(a) {
                        var b = a[a.length - 1][a[0]].length;
                        return b >= 8 ? lott.factorial(1 * b) / (lott.factorial(1 * b - 8) * lott.factorial(8)) : 0
                    });
                    break;
                case "OECounts_11X5":
                    lott.DdsUI(["ANY"], function(a) {
                        return a[a.length - 1][a[0]].length
                    });
                    break;
                case "3rdDigit_11X5":
                    lott.CzwUI(["ANY"], function(a) {
                        return a[a.length - 1][a[0]].length
                    });
                    break;
                case "First3Straight_11X5":
                    lott.direct(["第一位", "第二位", "第三位"], ["FIRST", "SECOND", "THIRD"], 1, 11, 2, !0, 11, 1, "", function(a) {
                        var b = a[a.length - 1][a[0]],
                            c = a[a.length - 1][a[1]],
                            d = a[a.length - 1][a[2]];
                        return lott.first3StraightOf11X5(b, c, d)
                    });
                    break;
                case "First3Com_11X5":
                    lott.direct("组选", ["ANY"], 1, 11, 2, !0, 11, 3, "", function(a) {
                        var b = a[a.length - 1][a[0]].length;
                        return b >= 3 ? lott.factorial(1 * b) / (lott.factorial(1 * b - 3) * lott.factorial(3)) : 0
                    });
                    break;
                case "First2Straight_11X5":
                    lott.direct(["第一位", "第二位"], ["FIRST", "SECOND"], 1, 11, 2, !0, 11, 1, "", function(a) {
                        var b = a[a.length - 1][a[0]],
                            c = a[a.length - 1][a[1]];
                        return lott.first2StraightOf11X5(b, c)
                    });
                    break;
                case "First2Com_11X5":
                    lott.direct("组选", ["ANY"], 1, 11, 2, !0, 11, 2, "", function(a) {
                        var b = a[a.length - 1][a[0]].length;
                        return b >= 2 ? lott.factorial(1 * b) / (lott.factorial(1 * b - 2) * lott.factorial(2)) : 0
                    });
                    break;
                case "First3AnyPlace_11X5":
                    lott.direct("胆码", ["ANY"], 1, 11, 2, !0, 11, 1, "", function(a) {
                        return a[a.length - 1][a[0]].length
                    });
                    break;
                case "FixedPlace_11X5":
                    lott.direct(["第一位", "第二位", "第三位"], ["FIRST", "SECOND", "THIRD"], 1, 11, 2, !0, 11, 1, "", function(a) {
                        return a[a.length - 1][a[0]].length + a[a.length - 1][a[1]].length + a[a.length - 1][a[2]].length
                    });
                    break;
                default:
                    lott.allManualEntryEvents()
            }
        }
    },
    LF: {
        betBallUI: function(a) {
            switch (a) {
                case "P3Straight_LF":
                    lott.direct(null, ["FIRST", "SECOND", "THIRD"], 0, 9, 1, !0, 10, 1, "2", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length
                    });
                    break;
                case "Last3Straight_LF":
                    lott.direct(null, ["THIRD", "FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length
                    });
                    break;
                case "P3Sum_LF":
                case "Last3Sum_LF":
                    lott.sumAndPointUI("和值", ["FIFTH"], 0, 27, 1, "3rd");
                    break;
                case "P3Com3_LF":
                case "Last3Com3_LF":
                    lott.NonDirect("组三", ["FIFTH"], 0, 9, 1, !0, 10, 2, "", function(a) {
                        return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1)
                    });
                    break;
                case "P3Com6_LF":
                case "Last3Com6_LF":
                    lott.NonDirect("组六", ["FIFTH"], 0, 9, 1, !0, 10, 3, "", function(a) {
                        return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) * (a[a.length - 1][a[0]].length - 2) / 6
                    });
                    break;
                case "Last3Com_LF":
                case "P3Com_LF":
                    lott.allMixComboSelection();
                    break;
                case "P3ComSum_LF":
                case "Last3ComSum_LF":
                    lott.sumAndPointUI("和值", ["FIFTH"], 1, 26, 1, "3rdz");
                    break;
                case "P3StraightAnyCode1_LF":
                case "Last3StraightAnyCode1_LF":
                    lott.NonDirect("胆码", ["FIFTH"], 0, 9, 1, !1, 1, 1, "", function(a) {
                        return 1 * a[a.length - 1][a[0]].length
                    });
                    break;
                case "P3StraightAnyCode2_LF":
                case "Last3StraightAnyCode2_LF":
                    lott.NonDirect(["一胆", "二胆"], ["FOURTH", "FIFTH"], 0, 9, 1, !1, 1, 1, "", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * 1
                    });
                    break;
                case "P5First2Straight_LF":
                    lott.direct(null, ["FIRST", "SECOND"], 0, 9, 1, !0, 10, 1, "3", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length
                    });
                    break;
                case "First2Straight_LF":
                    lott.direct(null, ["THIRD", "FOURTH"], 0, 9, 1, !0, 10, 1, "1", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length
                    });
                    break;
                case "P5First2Com_LF":
                case "First2Com_LF":
                    lott.NonDirect("组选", ["FIRST"], 0, 9, 1, !0, 7, 2, "", function(a) {
                        return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) / 2
                    });
                    break;
                case "P3Last2Straight_LF":
                    lott.direct(null, ["SECOND", "THIRD"], 0, 9, 1, !0, 10, 1, "2", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length
                    });
                    break;
                case "Last2Straight_LF":
                case "P5Last2Straight_LF":
                    lott.direct(null, ["FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length
                    });
                    break;
                case "P3Last2Com_LF":
                case "Last2Com_LF":
                    lott.NonDirect("组选", ["FIFTH"], 0, 9, 1, !0, 7, 2, "", function(a) {
                        return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) / 2
                    });
                    break;
                case "P5First2BSOE_LF":
                    lott.BSOEUI(["FIRST", "SECOND"], "5", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length
                    });
                    break;
                case "First2BSOE_LF":
                    lott.BSOEUI(["THIRD", "FOURTH"], "5", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length
                    });
                    break;
                case "P3Last2BSOE_LF":
                    lott.BSOEUI(["SECOND", "THIRD"], "5", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length
                    });
                    break;
                case "Last2BSOE_LF":
                    lott.BSOEUI(["FOURTH", "FIFTH"], "5", function(a) {
                        return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length
                    });
                    break;
                case "FixedPlace_LF":
                    "TCP3P5" == globalVar.currentLottery.game ? lott.direct(null, ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                        return a[a.length - 1][a[0]].length + a[a.length - 1][a[1]].length + a[a.length - 1][a[2]].length + a[a.length - 1][a[3]].length + a[a.length - 1][a[4]].length
                    }) : lott.direct(null, ["THIRD", "FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                        return a[a.length - 1][a[0]].length + a[a.length - 1][a[1]].length + a[a.length - 1][a[2]].length
                    });
                    break;
                default:
                    lott.allManualEntryEvents()
            }
        }
    },
    PK10: {
        betBallUI: function(a) {
            switch (a) {
                case "First5BSOE_PK10":
                    lott.PK10BSOEUI(["冠军", "亚军", "季军", "第四名", "第五名"], ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], "", function(a) {
                        return a[a.length - 1][a[0]].length + a[a.length - 1][a[1]].length + a[a.length - 1][a[2]].length + a[a.length - 1][a[3]].length + a[a.length - 1][a[4]].length
                    });
                    break;
                case "Last5BSOE_PK10":
                    lott.PK10BSOEUI(["第六名", "第七名", "第八名", "第九名", "第十名"], ["SIXTH", "SEVENTH", "EIGHTH", "NINTH", "TENTH"], "", function(a) {
                        return a[a.length - 1][a[0]].length + a[a.length - 1][a[1]].length + a[a.length - 1][a[2]].length + a[a.length - 1][a[3]].length + a[a.length - 1][a[4]].length
                    });
                    break;
                case "First2SumBSOE_PK10":
                    lott.PK10BSOEUI(["冠亚和"], ["FIRSTS"], "", function(a) {
                        return a[a.length - 1][a[0]].length
                    });
                    break;
                case "First1_PK10":
                    lott.direct("冠军", ["FIRST"], 1, 10, 2, !0, 10, 1, "", function(a) {
                        return a[a.length - 1][a[0]].length
                    });
                    break;
                case "First2_PK10":
                    lott.direct(["冠军", "亚军"], ["FIRST", "SECOND"], 1, 10, 2, !0, 10, 1, "", function(a) {
                        var b = a[a.length - 1][a[0]],
                            c = a[a.length - 1][a[1]];
                        return lott.first2StraightOf11X5(b, c)
                    });
                    break;
                case "First3_PK10":
                    lott.direct(["冠军", "亚军", "季军"], ["FIRST", "SECOND", "THIRD"], 1, 10, 2, !0, 10, 1, "", function(a) {
                        var b = a[a.length - 1][a[0]],
                            c = a[a.length - 1][a[1]],
                            d = a[a.length - 1][a[2]];
                        return lott.first3StraightOf11X5(b, c, d)
                    });
                    break;
                case "First4_PK10":
                    lott.direct(["冠军", "亚军", "季军", "第四名"], ["FIRST", "SECOND", "THIRD", "FOURTH"], 1, 10, 2, !0, 10, 1, "", function(a) {
                        var b = a[a.length - 1][a[0]],
                            c = a[a.length - 1][a[1]],
                            d = a[a.length - 1][a[2]],
                            e = a[a.length - 1][a[3]];
                        return lott.first4StraightOf11X5(b, c, d, e)
                    });
                    break;
                case "First5_PK10":
                    lott.direct(["冠军", "亚军", "季军", "第四名", "第五名"], ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], 1, 10, 2, !0, 10, 1, "", function(a) {
                        var b = a[a.length - 1][a[0]],
                            c = a[a.length - 1][a[1]],
                            d = a[a.length - 1][a[2]],
                            e = a[a.length - 1][a[3]],
                            f = a[a.length - 1][a[4]];
                        return lott.first5StraightOf11X5(b, c, d, e, f)
                    });
                    break;
                case "First5Fixed_PK10":
                    lott.direct(["冠军", "亚军", "季军", "第四名", "第五名"], ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], 1, 10, 2, !0, 10, 1, "", function(a) {
                        return a[a.length - 1][a[0]].length + a[a.length - 1][a[1]].length + a[a.length - 1][a[2]].length + a[a.length - 1][a[3]].length + a[a.length - 1][a[4]].length
                    });
                    break;
                case "Last5Fixed_PK10":
                    lott.direct(["第六名", "第七名", "第八名", "第九名", "第十名"], ["SIXTH", "SEVENTH", "EIGHTH", "NINTH", "TENTH"], 1, 10, 2, !0, 10, 1, "", function(a) {
                        return a[a.length - 1][a[0]].length + a[a.length - 1][a[1]].length + a[a.length - 1][a[2]].length + a[a.length - 1][a[3]].length + a[a.length - 1][a[4]].length
                    });
                    break;
                case "First2Sum_PK10":
                    lott.sumAndPointUI("冠亚和", ["FIFTH"], 3, 19, 1, "2rpk");
                    break;
                case "First3Sum_PK10":
                    lott.sumAndPointUI("冠亚季和", ["FIFTH"], 6, 27, 1, "3rpk");
                    break;
                case "FirstLastSum_PK10":
                    lott.sumAndPointUI("首尾和", ["FIFTH"], 3, 19, 1, "2rpk");
                    break;
                case "Dragon_Tiger_1_VS_10":
                case "Dragon_Tiger_2_VS_9":
                case "Dragon_Tiger_3_VS_8":
                case "Dragon_Tiger_4_VS_7":
                case "Dragon_Tiger_5_VS_6":
                    lott.toradoraBallUI(["ANY"], function(a) {
                        return a[a.length - 1][a[0]].length
                    });
                    break;
                default:
                    lott.allManualEntryEvents()
            }
        }
    },
    getHotAndGap: function() {
        TCG.Ajax({
            url: "lgw/draw/" + globalVar.currentLottery.gameId + "/hot_gap_info",
            headers: {
                Merchant: globalVar.merchantCode,
                Authorization: window.sessionStorage.getItem("token")
            }
        }, function(a) {
            var b = 0,
                c = 0;
            switch (globalVar.currentLottery.series[0].gameGroup) {
                case "SSC":
                case "LF":
                    b = 0, c = 10;
                    break;
                case "11X5":
                    b = 1, c = 12;
                    break;
                case "PK10":
                    b = 1, c = 11
            }
            if (a.hot)
                for (var d in a.hot) globalVar.currentLottery.hot.ball[d] = a.hot[d].slice(b, c), globalVar.currentLottery.hot.size[d] = a.hot[d].slice(12);
            if (a.gap)
                for (var e in a.gap) globalVar.currentLottery.gap.ball[e] = a.gap[e].slice(b, c), globalVar.currentLottery.gap.size[e] = a.gap[e].slice(12);
            var f = $("#gap_and_hot").attr("play-sort");
            lott.autoSetGapOrHot(f)
        })
    },
    gapAndHotBtnEvents: function() {
        $(document).off("click", "#gap_and_hot dt").on("click", "#gap_and_hot dt", function() {
            if (!$(this).hasClass("active")) {
                $("#gap_and_hot dt").removeClass("active"), $(this).addClass("active");
                var a = $("#gap_and_hot").attr("play-ranks").split("#"),
                    b = $("#gap_and_hot").attr("play-sort"),
                    c = $(this).attr("data-val");
                if ("non" != b) switch (c) {
                    case "hot":
                        lott.setHotUI(a, b);
                        break;
                    case "gap":
                        lott.setGapUI(a, b)
                }
            }
        })
    },
    setGapUI: function(a, b) {
        $("div[select-area='ball'] em").text("当前遗漏");
        for (var c = 0; c < a.length; c++) {
            var d = globalVar.currentLottery.gap[b][a[c]];
            if (d && d.length > 0)
                for (var e = 0; e < d.length; e++) $("#lott_ranks_" + a[c] + ">dl>dd:eq(" + e + ")").text(d[e])
        }
    },
    setHotUI: function(a, b) {
        $("div[select-area='ball'] em").text("当前冷热");
        for (var c = 0; c < a.length; c++) {
            var d = globalVar.currentLottery.hot[b][a[c]];
            if (d && d.length > 0)
                for (var e = 0; e < d.length; e++) $("#lott_ranks_" + a[c] + ">dl>dd:eq(" + e + ")").text(d[e])
        }
    },
    autoSetGapOrHot: function(a) {
        if ("non" != a) {
            var b = $("#gap_and_hot dt[class*='active']").attr("data-val"),
                c = $("#gap_and_hot").attr("play-ranks");
            if (c && "" != c) {
                var d = c.split("#");
                switch (b) {
                    case "hot":
                        lott.setHotUI(d, a);
                        break;
                    case "gap":
                        lott.setGapUI(d, a)
                }
            }
        }
    },
    direct: function(a, b, c, d, e, f, g, h, i, j) {
        var k = {},
            l = globalVar.currentLottery.series[0].gameGroup,
            m = "",
            n = b.join("#");
        $("#gap_and_hot").attr("play-ranks", n), $("#gap_and_hot").attr("play-sort", "ball");
        for (var o = 0; o < b.length; o++) {
            "11X5" == l || "PK10" == l && -1 == globalVar.playCode.indexOf("BSOE_PK10") ? k[b[o]] = [] : k[b[o]] = "";
            var p = null != a && "object" == typeof a ? a[o] : a;
            m += lott.ranks(p, b[o], c, d, e, f, !0)
        }
        b.push(k), $("div[select-area='ball']").html(m), lott.gapAndHotBtnEvents(), lott.autoSetGapOrHot("ball"), lott.selectionBall(b, f, g, h, i, j)
    },
    NonDirect: function(a, b, c, d, e, f, g, h, i, j, k) {
        var l = {},
            m = globalVar.currentLottery.series[0].gameGroup;
        $("#gap_and_hot").attr("play-sort", "non");
        var n = "";
        k && (n += '<div style="margin:0px 0px 30px 0px">' + lott.setAnySequenceBitUI("at") + "</div>");
        for (var o = 0; o < b.length; o++) {
            l[b[o]] = "11X5" == m ? [] : "";
            var p = null != a && "object" == typeof a ? a[o] : a;
            n += lott.ranks(p, b[o], c, d, e, f, !1)
        }
        if (b.push(l), $("div[select-area='ball']").html(n), f && 1 * g < d && $('li[sift="all"]').remove(), k) {
            var q = globalVar.playCode.charAt(3);
            $('span[at-sq-bits="no"]').text(q);
            for (var o = 1 * q; o > 0; o--) $("#atAnySequenceBit li:nth-last-child(" + o + ")").addClass("active");
            lott.setBitSchemeUI("at", 1 * q), $("#atAnySequenceBit li").off("click").on("click", function() {
                $(this).hasClass("active") ? $(this).removeClass("active") : $(this).addClass("active"), lott.setBitSchemeUI("at", 1 * q), 1 * globalVar.selectionBallStakes > 0 && lott.calculateAmount(1 * globalVar.selectionBallStakes)
            })
        }
        lott.selectionBall(b, f, g, h, i, j)
    },
    sumAndPointUI: function(a, b, c, d, e, f) {
        var g = {};
        $("#gap_and_hot").attr("play-sort", "non"), g["3rd"] = [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 63, 69, 73, 75, 75, 73, 69, 63, 55, 45, 36, 28, 21, 15, 10, 6, 3, 1], g["3rdx"] = [1, 1, 2, 3, 4, 5, 7, 8, 10, 12, 13, 14, 15, 15, 15, 15, 14, 13, 12, 10, 8, 7, 5, 4, 3, 2, 1, 1], g["2nd"] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], g["2ndx"] = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1], g["3rdz"] = [1, 2, 2, 4, 5, 6, 8, 10, 11, 13, 14, 14, 15, 15, 14, 14, 13, 11, 10, 8, 6, 5, 4, 2, 2, 1], g["2rdz"] = [1, 1, 2, 2, 3, 3, 4, 4, 5, 4, 4, 3, 3, 2, 2, 1, 1], g["3rpk"] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], g["2rpk"] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        var h = "";
        "Any3Sum_SSC" != globalVar.playCode && "Any2Sum_SSC" != globalVar.playCode || (h += '<div style="margin:0px 0px 30px 0px">' + lott.setAnySequenceBitUI("at") + "</div>"), h += lott.ranks(a, b, c, d, e, !1, !1), $("div[select-area='ball']").html(h);
        for (var i = 0; i < g[f].length; i++) - 1 == globalVar.playCode.indexOf("Sum_PK10") && $("#lott_ranks_" + b + ">dl>dd:eq(" + i + ")").text(g[f][i]);
        if ("Any3Sum_SSC" == globalVar.playCode || "Any2Sum_SSC" == globalVar.playCode) {
            var j = globalVar.playCode.charAt(3);
            $('span[at-sq-bits="no"]').text(j);
            for (var k = 1 * j; k > 0; k--) $("#atAnySequenceBit li:nth-last-child(" + k + ")").addClass("active");
            lott.setBitSchemeUI("at", 1 * j), $("#atAnySequenceBit li").off("click").on("click", function() {
                $(this).hasClass("active") ? $(this).removeClass("active") : $(this).addClass("active"), lott.setBitSchemeUI("at", 1 * j), 1 * globalVar.selectionBallStakes > 0 && lott.calculateAmount(1 * globalVar.selectionBallStakes)
            })
        }
        var l = {};
        l[b] = "";
        var m = [b, l];
        lott.selectionPointEvents(b, m, g[f], c, d)
    },
    selectionPointEvents: function(a, b, c, d, e) {
        $("#lott_ranks_" + a + ">dl>dt").unbind().hover(function() {
            $(this).addClass("hover")
        }, function() {
            $(this).removeClass("hover")
        }), $(document).off("click", "#lott_ranks_" + a + ">dl>dt").on("click", "#lott_ranks_" + a + ">dl>dt", function() {
            if ($(this).removeClass("hover"), $(this).hasClass("selected")) {
                if ($(this).removeClass("selected"), b[1][a].length > 0) {
                    var d = $("#lott_ranks_" + a + ">dl>dt").index(this),
                        e = $(this).text(),
                        f = c[d],
                        g = "," + e + "#" + f;
                    b[1][a].indexOf(g) > -1 && (b[1][a] = b[1][a].replace(g, ""));
                    var h = 0;
                    if (b[1][a].length > 1)
                        for (var i = b[1][a].substring(1).split(","), j = 0; j < i.length; j++) {
                            var k = i[j].split("#");
                            h = 1 * h + 1 * k[1]
                        }
                    lott.calculateAmount(h)
                }
            } else {
                $(this).addClass("selected");
                var d = $("#lott_ranks_" + a + ">dl>dt").index(this),
                    e = $(this).text(),
                    f = c[d];
                b[1][a] = b[1][a] + "," + e + "#" + f;
                for (var h = 0, i = b[1][a].substring(1).split(","), j = 0; j < i.length; j++) {
                    var k = i[j].split("#");
                    h = 1 * h + 1 * k[1]
                }
                lott.calculateAmount(h)
            }
        }), lott.addToCartEvents(function() {
            if (b[1][a].length <= 0) TCG.Alert("alerts", "当前玩法至少要选择一个号球!");
            else {
                for (var c = $('input[name="betMultiple"]').val(), d = b[1][a].substring(1).split(","), e = 0; e < d.length; e++) {
                    var f = d[e].split("#"),
                        g = f[0],
                        h = f[1],
                        i = e == d.length - 1;
                    "Any3Sum_SSC" != globalVar.playCode && "Any2Sum_SSC" != globalVar.playCode || (g = globalVar.anyBitsContent + "@" + g, h *= globalVar.anyBitScheme.length), lott.createBetCart(g, 1, c, "", h, i)
                }
                lott.clearSelectionBall(b)
            }
        }), lott.shortcutBettingEvents(function(c) {
            if (b[1][a].length <= 0) TCG.Alert("alerts", "当前玩法至少要选择一个号球!");
            else {
                for (var d = $('input[name="betMultiple"]').val(), e = b[1][a].substring(1).split(","), f = 0; f < e.length; f++) {
                    var g = e[f].split("#"),
                        h = g[0],
                        i = g[1];
                    "Any3Sum_SSC" != globalVar.playCode && "Any2Sum_SSC" != globalVar.playCode || (h = globalVar.anyBitsContent + "@" + h, i *= globalVar.anyBitScheme.length);
                    var j = lott.createShortcutBetContent(h, 1, d, "", i);
                    globalVar.shortcutContent.push(j)
                }
                lott.confirmBetOrder(c, !0, b)
            }
        }), lott.randomBallEvents(function(a) {
            for (var b = $('input[name="betMultiple"]').val(), f = $(a).attr("bet-random"), g = lott.numberRandom(d, e, 1 * f), h = 0; h < g.length; h++) {
                var i = "",
                    j = 0;
                i = g[h] + "", j = c[1 * g[h] - 1 * d];
                var k = h == g.length - 1;
                if ("Any3Sum_SSC" == globalVar.playCode || "Any2Sum_SSC" == globalVar.playCode) {
                    var l = globalVar.playCode.charAt(3),
                        m = lott.numberRandom(1, 5, 1 * l);
                    m.sort(function(a, b) {
                        return a - b
                    }), i = m.join("") + "@" + i, j *= 1
                }
                lott.createBetCart(i, 1, b, "", j, k)
            }
        })
    },
    BSOEUI: function(a, b, c) {
        var d = {},
            e = "",
            f = a.join("#");
        $("#gap_and_hot").attr("play-ranks", f), $("#gap_and_hot").attr("play-sort", "size");
        for (var g = 0; g < a.length; g++) d[a[g]] = "", e += '<div id="lott_ranks_' + a[g] + '" class="game-cntaner">', e += '<span class="lt-tb-row ch-xs inline-block">' + TCG.Prop("lottery_bett_" + a[g]) + "<em></em></span>", e += '<dl class="lt-number-row inline-block">', e += '<dt class="num-wrp">大</dt><dd class="sub-wrp"></dd>', e += '<dt class="num-wrp">小</dt><dd class="sub-wrp"></dd>', e += '<dt class="num-wrp">单</dt><dd class="sub-wrp"></dd>', e += '<dt class="num-wrp">双</dt><dd class="sub-wrp"></dd>', e += "</dl>", e += "</div>";
        a.push(d), $("div[select-area='ball']").html(e), lott.gapAndHotBtnEvents(), lott.autoSetGapOrHot("size"), lott.selectionBall(a, !1, 1, 1, b, c), lott.randomBallEvents(function(a) {
            for (var c = $('input[name="betMultiple"]').val(), d = $(a).attr("bet-random"), e = [], f = 0; f < 1 * d; f++) {
                var g = lott.numberRandom(0, 3, 2);
                e.push(g)
            }
            for (var h = 0; h < e.length; h++) {
                var g = e[h].join("_"),
                    i = h == e.length - 1;
                lott.createBetCart(g, 1, c, b, 1, i)
            }
        })
    },
    PK10BSOEUI: function(a, b, c, d) {
        var e = {},
            f = "",
            g = b.join("#");
        $("#gap_and_hot").attr("play-ranks", g), $("#gap_and_hot").attr("play-sort", "size");
        for (var h = 0; h < b.length; h++) e[b[h]] = "", f += '<div id="lott_ranks_' + b[h] + '" class="game-cntaner">', f += '<span class="lt-tb-row ch-xs inline-block">' + a[h] + "<em></em></span>", f += '<dl class="lt-number-row inline-block">', f += '<dt class="num-wrp">大</dt><dd class="sub-wrp"></dd>', f += '<dt class="num-wrp">小</dt><dd class="sub-wrp"></dd>', f += '<dt class="num-wrp">单</dt><dd class="sub-wrp"></dd>', f += '<dt class="num-wrp">双</dt><dd class="sub-wrp"></dd>', f += "</dl>", f += "</div>";
        b.push(e), $("div[select-area='ball']").html(f), "First2SumBSOE_PK10" != globalVar.playCode && (lott.gapAndHotBtnEvents(), lott.autoSetGapOrHot("size")), lott.selectionBall(b, !1, 1, 1, c, d)
    },
    PK10DigitConversion: function(a) {
        var b = "";
        switch (a) {
            case "FIRST":
                b = "0";
                break;
            case "SECOND":
                b = "1";
                break;
            case "THIRD":
                b = "2";
                break;
            case "FOURTH":
                b = "3";
                break;
            case "FIFTH":
                b = "4";
                break;
            case "SIXTH":
                b = "5";
                break;
            case "SEVENTH":
                b = "6";
                break;
            case "EIGHTH":
                b = "7";
                break;
            case "NINTH":
                b = "8";
                break;
            case "TENTH":
                b = "9"
        }
        return b
    },
    BSOEConversion: function(a) {
        var b = "";
        switch (a) {
            case "大":
                b = "0";
                break;
            case "小":
                b = "1";
                break;
            case "单":
                b = "2";
                break;
            case "双":
                b = "3";
                break;
            case "0":
                b = "大";
                break;
            case "1":
                b = "小";
                break;
            case "2":
                b = "单";
                break;
            case "3":
                b = "双";
                break;
            case "d":
                b = "胆";
                break;
            case "t":
                b = "拖";
                break;
            case "05":
                b = "0单5双";
                break;
            case "14":
                b = "1单4双";
                break;
            case "23":
                b = "2单3双";
                break;
            case "32":
                b = "3单2双";
                break;
            case "41":
                b = "4单1双";
                break;
            case "50":
                b = "5单0双"
        }
        return b
    },
    DdsUI: function(a, b) {
        var c = {},
            d = "";
        $("#gap_and_hot").attr("play-sort", "non");
        for (var e = 0; e < a.length; e++) c[a[e]] = [], d += '<div id="lott_ranks_' + a[e] + '" class="game-cntaner">', d += '<dl class="lt-number-row inline-block">', d += '<dt class="num-wrp" data-val="05">0单5双</dt><dd class="sub-wrp"></dd>', d += '<dt class="num-wrp" data-val="14">1单4双</dt><dd class="sub-wrp"></dd>', d += '<dt class="num-wrp" data-val="23">2单3双</dt><dd class="sub-wrp"></dd>', d += '<dt class="num-wrp" data-val="32">3单2双</dt><dd class="sub-wrp"></dd>', d += '<dt class="num-wrp" data-val="41">4单1双</dt><dd class="sub-wrp"></dd>', d += '<dt class="num-wrp" data-val="50">5单0双</dt><dd class="sub-wrp"></dd>', d += "</dl>", d += "</div>";
        a.push(c), $("div[select-area='ball']").hasClass("game-large") || $("div[select-area='ball']").addClass("game-large"), $("div[select-area='ball']").html(d), lott.ddsBallEvent(a, b)
    },
    ddsBallEvent: function(a, b) {
        var c = a[0];
        $(document).off("click", "#lott_ranks_" + c + ">dl>dt").on("click", "#lott_ranks_" + c + ">dl>dt", function() {
            var d = $(this).attr("data-val");
            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
                var e = a[a.length - 1][c].indexOf(d);
                e > -1 && a[a.length - 1][c].splice(e, 1)
            } else $(this).addClass("selected"), a[a.length - 1][c].push(d), a[a.length - 1][c].sort(function(a, b) {
                return a - b
            });
            lott.calculateAmount(b(a))
        }), lott.addToCartEvents(function() {
            if (a[a.length - 1][c].length >= 1) {
                for (var b = $('input[name="betMultiple"]').val(), d = 0; d < a[a.length - 1][a[0]].length; d++) {
                    var e = d == a[a.length - 1][a[0]].length - 1;
                    lott.createBetCart(a[a.length - 1][a[0]][d], 1, b, "", 1, e)
                }
                lott.clearSelectionBall(a)
            } else TCG.Alert("alerts", "当前玩法至少选择1个号球!")
        }), lott.shortcutBettingEvents(function(b) {
            if (a[a.length - 1][c].length >= 1) {
                for (var d = $('input[name="betMultiple"]').val(), e = 0; e < a[a.length - 1][a[0]].length; e++) {
                    var f = lott.createShortcutBetContent(a[a.length - 1][a[0]][e], 1, d, "", 1);
                    globalVar.shortcutContent.push(f)
                }
                lott.confirmBetOrder(b, !0, a)
            } else TCG.Alert("alerts", "当前玩法至少选择1个号球!")
        }), lott.randomBallEvents(function(a) {
            var b = $('input[name="betMultiple"]').val(),
                c = $(a).attr("bet-random"),
                d = [5, 14, 23, 32, 41, 50];
            d.sort(function() {
                return .5 - Math.random()
            });
            for (var e = 0; e < 1 * c; e++) {
                var f = lott.addZero(d[e] + "", 2),
                    g = e == 1 * c - 1;
                lott.createBetCart(f, 1, b, "", 1, g)
            }
        })
    },
    CzwUI: function(a, b) {
        var c = {};
        $("#gap_and_hot").attr("play-sort", "non");
        for (var d = "", e = 0; e < a.length; e++) c[a[e]] = [], d += lott.ranks("猜中位", a[e], 3, 9, 2, !0, !1);
        a.push(c), $("div[select-area='ball']").html(d), lott.czwBallEvents(a, 7, b)
    },
    czwBallEvents: function(a, b, c) {
        var d = a[0];
        lott.czwSiftBtnEvents(d, a, c), lott.multipleBallEvent(d, a, c, b), lott.addToCartEvents(function() {
            if (a[a.length - 1][d].length >= 1) {
                for (var b = $('input[name="betMultiple"]').val(), c = 0; c < a[a.length - 1][d].length; c++) {
                    var e = c == a[a.length - 1][d].length - 1;
                    lott.createBetCart(a[a.length - 1][d][c], 1, b, "", 1, e)
                }
                lott.clearSelectionBall(a)
            } else TCG.Alert("alerts", "当前玩法至少选择1个号球!")
        }), lott.shortcutBettingEvents(function(b) {
            if (a[a.length - 1][d].length >= 1) {
                for (var c = $('input[name="betMultiple"]').val(), e = 0; e < a[a.length - 1][d].length; e++) {
                    var f = lott.createShortcutBetContent(a[a.length - 1][d][e], 1, c, "", 1);
                    globalVar.shortcutContent.push(f)
                }
                lott.confirmBetOrder(b, !0, a)
            } else TCG.Alert("alerts", "当前玩法至少选择1个号球!")
        }), lott.randomBallEvents(function(a) {
            for (var b = $('input[name="betMultiple"]').val(), c = $(a).attr("bet-random"), d = lott.numberRandom(3, 9, 1 * c), e = 0; e < d.length; e++) {
                var f = lott.addZero(d[e] + "", 2),
                    g = e == d.length - 1;
                lott.createBetCart(f, 1, b, "", 1, g)
            }
        })
    },
    czwSiftBtnEvents: function(a, b, c) {
        $(document).off("click", "#lott_ranks_" + a + ">ul>li").on("click", "#lott_ranks_" + a + ">ul>li", function() {
            var d = $(this).attr("sift");
            switch ($("#lott_ranks_" + a + ">dl>dt").removeClass("selected"), d) {
                case "all":
                    $("#lott_ranks_" + a + ">dl>dt:nth-child(1n+1)").addClass("selected");
                    break;
                case "big":
                    $("#lott_ranks_" + a + ">dl>dt:gt(2)").addClass("selected");
                    break;
                case "small":
                    $("#lott_ranks_" + a + ">dl>dt:lt(3)").addClass("selected");
                    break;
                case "odd":
                    $("#lott_ranks_" + a + ">dl>dt:even").addClass("selected");
                    break;
                case "even":
                    $("#lott_ranks_" + a + ">dl>dt:odd").addClass("selected");
                    break;
                case "clear":
                    b[b.length - 1][a].splice(0, b[b.length - 1][a].length)
            }
            if ("clear" != d) {
                var e = $("#lott_ranks_" + a + " .selected").text().replace(/(?=(\d{2})+(\D|$))/g, "$2_").substring(1);
                b[b.length - 1][a] = e.split("_")
            }
            lott.calculateAmount(c(b))
        })
    },
    allManualEntryEvents: function() {
        var a = {};
        switch (globalVar.playCode) {
            case "Any2_11X5_Single":
                a.bits = ["ANY"], a.miBall = 2, a.stakes = 1, a.len = 4, a.digit = "", a.eg = "01 02 03,01 02 03\n01 02 03;01 02 03";
                break;
            case "Any3_11X5_Single":
                a.bits = ["ANY"], a.miBall = 3, a.stakes = 1, a.len = 6, a.digit = "", a.eg = "01 02 03,01 02 03\n01 02 03;01 02 03";
                break;
            case "Any4_11X5_Single":
                a.bits = ["ANY"], a.miBall = 4, a.stakes = 1, a.len = 8, a.digit = "", a.eg = "01 02 03 04,01 02 03 04\n01 02 03 04;01 02 03 04";
                break;
            case "Any5_11X5_Single":
                a.bits = ["ANY"], a.miBall = 5, a.stakes = 1, a.len = 10, a.digit = "", a.eg = "01 02 03 04 05,01 02 03 04 05\n01 02 03 04 05;01 02 03 04 05";
                break;
            case "Any6_11X5_Single":
                a.bits = ["ANY"], a.miBall = 6, a.stakes = 1, a.len = 12, a.digit = "", a.eg = "01 02 03 04 05 06,01 02 03 04 05 06\n01 02 03 04 05 06;01 02 03 04 05 06";
                break;
            case "Any7_11X5_Single":
                a.bits = ["ANY"], a.miBall = 7, a.stakes = 1, a.len = 14, a.digit = "", a.eg = "01 02 03 04 05 06 07,01 02 03 04 05 06 07\n01 02 03 04 05 06 07;01 02 03 04 05 06 07";
                break;
            case "Any8_11X5_Single":
                a.bits = ["ANY"], a.miBall = 8, a.stakes = 1, a.len = 16, a.digit = "", a.eg = "01 02 03 04 05 06 07 08,01 02 03 04 05 06 07 08\n01 02 03 04 05 06 07 08;01 02 03 04 05 06 07 08";
                break;
            case "First3Straight_11X5_Single":
                a.bits = ["FIRST", "SECOND", "THIRD"], a.miBall = 1, a.stakes = 1, a.len = 6, a.digit = "", a.eg = "01 02 03,01 02 03\n01 02 03;01 02 03";
                break;
            case "First3Com_11X5_Single":
                a.bits = ["ANY"], a.miBall = 3, a.stakes = 1, a.len = 6, a.digit = "", a.eg = "01 02 03,01 02 03\n01 02 03;01 02 03";
                break;
            case "First2Straight_11X5_Single":
                a.bits = ["FIRST", "SECOND"], a.miBall = 1, a.stakes = 1, a.len = 4, a.digit = "", a.eg = "01 02 03,01 02 03\n01 02 03;01 02 03";
                break;
            case "First2Com_11X5_Single":
                a.bits = ["ANY"], a.miBall = 2, a.stakes = 1, a.len = 4, a.digit = "", a.eg = "01 02 03,01 02 03\n01 02 03;01 02 03";
                break;
            case "P3Last2Straight_LF_Single":
                a.bits = ["SECOND", "THIRD"], a.miBall = 1, a.stakes = 1, a.len = 2, a.digit = "2", a.eg = "12 34\n12,34\n12;34";
                break;
            case "Last2Straight_LF_Single":
            case "P5Last2Straight_LF_Single":
                a.bits = ["FOURTH", "FIFTH"], a.miBall = 1, a.stakes = 1, a.len = 2, a.digit = "", a.eg = "12 34\n12,34\n12;34";
                break;
            case "P3Straight_LF_Single":
                a.bits = ["FIRST", "SECOND", "THIRD"], a.miBall = 1, a.stakes = 1, a.len = 3, a.digit = "2", a.eg = "123 456\n123,456\n123;456";
                break;
            case "Last3Straight_LF_Single":
                a.bits = ["THIRD", "FOURTH", "FIFTH"], a.miBall = 1, a.stakes = 1, a.len = 3, a.digit = "", a.eg = "123 456\n123,456\n123;456";
                break;
            case "P5First2Straight_LF_Single":
                a.bits = ["FIRST", "SECOND"], a.miBall = 1, a.stakes = 1, a.len = 2, a.digit = "3", a.eg = "12 34\n12,34\n12;34";
                break;
            case "First2Straight_LF_Single":
                a.bits = ["THIRD", "FOURTH"], a.miBall = 1, a.stakes = 1, a.len = 2, a.digit = "1", a.eg = "12 34\n12,34\n12;34";
                break;
            case "Last2Straight_Single":
                a.bits = ["FOURTH", "FIFTH"], a.miBall = 1, a.stakes = 1, a.len = 2, a.digit = "", a.eg = "12 34\n12,34\n12;34";
                break;
            case "Last2Join_Single":
                a.bits = ["FOURTH", "FIFTH"], a.miBall = 1, a.stakes = 2, a.len = 2, a.digit = "", a.eg = "12 34\n12,34\n12;34";
                break;
            case "Last3Straight_Single":
                a.bits = ["THIRD", "FOURTH", "FIFTH"], a.miBall = 1, a.stakes = 1, a.len = 3, a.digit = "", a.eg = "123 456\n123,456\n123;456";
                break;
            case "Last3Join_Single":
                a.bits = ["THIRD", "FOURTH", "FIFTH"], a.miBall = 1, a.stakes = 3, a.len = 3, a.digit = "", a.eg = "123 456\n123,456\n123;456";
                break;
            case "All5Straight_Single":
            case "All5All_Single":
                a.bits = ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], a.miBall = 1, a.stakes = 1, a.len = 5, a.digit = "", a.eg = "12345 67890\n12345,67890\n12345;67890";
                break;
            case "All5Join_Single":
                a.bits = ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], a.miBall = 1, a.stakes = 5, a.len = 5, a.digit = "", a.eg = "12345 67890\n12345,67890\n12345;67890";
                break;
            case "First2Straight_Single":
                a.bits = ["FIRST", "SECOND"], a.miBall = 1, a.stakes = 1, a.len = 2, a.digit = "3", a.eg = "12 34\n12,34\n12;34";
                break;
            case "First2Join_Single":
                a.bits = ["FIRST", "SECOND"], a.miBall = 1, a.stakes = 2, a.len = 2, a.digit = "3", a.eg = "12 34\n12,34\n12;34";
                break;
            case "First3Straight_Single":
                a.bits = ["FIRST", "SECOND", "THIRD"], a.miBall = 1, a.stakes = 1, a.len = 3, a.digit = "2", a.eg = "123 456\n123,456\n123;456";
                break;
            case "First3Join_Single":
                a.bits = ["FIRST", "SECOND", "THIRD"], a.miBall = 1, a.stakes = 3, a.len = 3, a.digit = "2", a.eg = "123 456\n123,456\n123;456";
                break;
            case "Last4Straight_Single":
                a.bits = ["SECOND", "THIRD", "FOURTH", "FIFTH"], a.miBall = 1, a.stakes = 1, a.len = 4, a.digit = "", a.eg = "1234 5678\n1234,5678\n1234;5678";
                break;
            case "Last4Join_Single":
                a.bits = ["SECOND", "THIRD", "FOURTH", "FIFTH"], a.miBall = 1, a.stakes = 4, a.len = 4, a.digit = "", a.eg = "1234 5678\n1234,5678\n1234;5678";
                break;
            case "First4Straight_Single":
                a.bits = ["FIRST", "SECOND", "THIRD", "FOURTH"], a.miBall = 1, a.stakes = 1, a.len = 4, a.digit = "1", a.eg = "1234 5678\n1234,5678\n1234;5678";
                break;
            case "First4Join_Single":
                a.bits = ["FIRST", "SECOND", "THIRD", "FOURTH"], a.miBall = 1, a.stakes = 4, a.len = 4, a.digit = "1", a.eg = "1234 5678\n1234,5678\n1234;5678";
                break;
            case "Middle3Straight_Single":
                a.bits = ["SECOND", "THIRD", "FOURTH"], a.miBall = 1, a.stakes = 1, a.len = 3, a.digit = "1", a.eg = "123 456\n123,456\n123;456";
                break;
            case "Middle3Join_Single":
                a.bits = ["SECOND", "THIRD", "FOURTH"], a.miBall = 1, a.stakes = 3, a.len = 3, a.digit = "1", a.eg = "123 456\n123,456\n123;456";
                break;
            case "Any2_Single":
                a.bits = ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], a.miBall = 0, a.stakes = 1, a.len = 2, a.digit = "", a.eg = "12 34\n12,34\n12;34";
                break;
            case "Any3_Single":
                a.bits = ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], a.miBall = 0,
                    a.stakes = 1, a.len = 3, a.digit = "", a.eg = "123 456\n123,456\n123;456";
                break;
            case "Any4_Single":
                a.bits = ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], a.miBall = 0, a.stakes = 1, a.len = 4, a.digit = "", a.eg = "1234 5678\n1234,5678\n1234;5678";
                break;
            case "Any2Com_SSC_Single":
                a.bits = ["ANY"], a.miBall = 1, a.stakes = 1, a.len = 2, a.digit = "", a.eg = "12 34\n12,34\n12;34";
                break;
            case "First2_PK10_Single":
                a.bits = ["FIRST", "SECOND"], a.miBall = 1, a.stakes = 1, a.len = 4, a.digit = "", a.eg = "0102 0102\n0102,0102\n0102;0102";
                break;
            case "First3_PK10_Single":
                a.bits = ["FIRST", "SECOND", "THIRD"], a.miBall = 1, a.stakes = 1, a.len = 6, a.digit = "", a.eg = "010203 010203\n010203,010203\n010203;010203";
                break;
            case "First4_PK10_Single":
                a.bits = ["FIRST", "SECOND", "THIRD", "FOURTH"], a.miBall = 1, a.stakes = 1, a.len = 8, a.digit = "", a.eg = "01020304 01020304\n01020304,01020304\n01020304;01020304";
                break;
            case "First5_PK10_Single":
                a.bits = ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], a.miBall = 1, a.stakes = 1, a.len = 10, a.digit = "", a.eg = "0102030405 0102030405\n0102030405,0102030405\n0102030405;0102030405"
        }
        lott.manualEntryUI(!0, a), lott.allManualEntryRandomBall(a.bits, a.miBall, a.digit)
    },
    allManualEntryRandomBall: function(a, b, c) {
        for (var d = {}, e = globalVar.currentLottery.series[0].gameGroup, f = 0; f < a.length; f++) d[a[f]] = "11X5" == e || "PK10" == e ? [] : "";
        a.push(d), lott.randomBallEvents(function(d) {
            var f = $('input[name="betMultiple"]').val(),
                g = $(d).attr("bet-random");
            if ("11X5" == e)
                for (var h = a.length - 1 == 1 ? 1 * b : a.length - 1, i = a.length - 1 == 1 ? "-" : "_", j = 0; j < 1 * g; j++) {
                    for (var k = "", l = lott.numberRandom(1, 11, h), m = 0; m < l.length; m++) k += i + lott.addZero(l[m] + "", 2);
                    var n = 1,
                        o = j == 1 * g - 1;
                    lott.createBetCart(k.substring(1), 1, f, c, n, o)
                } else if ("PK10" == e)
                    for (var h = a.length - 1 == 1 ? 1 * b : a.length - 1, i = a.length - 1 == 1 ? "-" : "_", j = 0; j < 1 * g; j++) {
                        for (var k = "", l = lott.numberRandom(1, 10, h), m = 0; m < l.length; m++) k += i + lott.addZero(l[m] + "", 2);
                        var n = 1,
                            o = j == 1 * g - 1;
                        lott.createBetCart(k.substring(1), 1, f, c, n, o)
                    } else {
                        if ("Any2Com_SSC_Single" != globalVar.playCode && a.length - 1 > 1 && 1 * b == 0 && globalVar.playCode.indexOf("Any") > -1)
                            for (var j = 0; j < 1 * g; j++) {
                                for (var p = lott.numberRandom(0, 4, 1 * globalVar.playCode.charAt(3)), l = new Array(5), k = "", q = 0; q < p.length; q++) l[p[q]] = lott.numberRandom(0, 9, 1)[0];
                                for (var r = 0; r < l.length; r++) null == l[r] ? k += "_#" : k += "_" + l[r];
                                var o = j == 1 * g - 1;
                                lott.createBetCart(k.substring(1), 1, f, c, 1, o)
                            }
                        if ("Any2Com_SSC_Single" == globalVar.playCode) {
                            for (var s = [], l = lott.arrRandom(1, 98, 1 * g, 2, !0), j = 0; j < 1 * g; j++) {
                                var p = lott.numberRandom(1, 5, 2);
                                p.sort(function(a, b) {
                                    return a - b
                                }), s.push(p.join(""))
                            }
                            for (var q = 0; q < s.length; q++) {
                                var k = s[q] + "@" + l[q],
                                    o = q == s.length - 1;
                                lott.createBetCart(k, 1, f, a.digit, 1, o)
                            }
                        }
                        if ("Any2Com_SSC_Single" != globalVar.playCode && a.length - 1 == 1 && 1 * b >= 1)
                            for (var j = 0; j < 1 * g; j++) {
                                var k = "";
                                k = lott.numberRandom(0, 9, 1 * b).join("");
                                var n = 1;
                                globalVar.playCode.indexOf("3Com3") > -1 && (n = 2), globalVar.playCode.indexOf("3StraightCom") > -1 && (n = 6), globalVar.playCode.indexOf("3ComAnyCode1") > -1 && (n = 55);
                                var o = j == 1 * g - 1;
                                lott.createBetCart(k, 1, f, c, n, o)
                            }
                        if ("Any2Com_SSC_Single" != globalVar.playCode && a.length - 1 > 1 && 1 * b == 1)
                            for (var j = 0; j < 1 * g; j++) {
                                for (var k = "", q = 0; q < a.length - 1; q++) k += "_" + lott.numberRandom(0, 9, 1)[0];
                                var n = 1;
                                globalVar.playCode.indexOf("Join") > -1 && (n = 1 * globalVar.playCode.charAt(globalVar.playCode.indexOf("Join") - 1)), globalVar.playCode.indexOf("3ComAnyCode2") > -1 && (n = 10);
                                var o = j == 1 * g - 1;
                                lott.createBetCart(k.substring(1), 1, f, c, n, o)
                            }
                    }
        })
    },
    allMixComboSelection: function() {
        var a = {
            stakes: 1,
            len: 3,
            eg: "122 123 211\n123,241,212\n122;221"
        };
        switch (globalVar.playCode) {
            case "Last3Com":
                a.digit = "";
                break;
            case "First3Com":
                a.digit = "2";
                break;
            case "Middle3Com":
                a.digit = "1";
                break;
            case "Last3Com_LF":
                a.digit = "";
                break;
            case "P3Com_LF":
                a.digit = "2";
                break;
            case "Any3Com_SSC":
                a.digit = ""
        }
        lott.manualEntryUI(!1, a), lott.randomBallEvents(function(b) {
            var c = $('input[name="betMultiple"]').val(),
                d = $(b).attr("bet-random"),
                e = lott.arrRandom(1, 998, 1 * d, 3, !0),
                f = [];
            if ("Any3Com_SSC" == globalVar.playCode)
                for (var g = 0; g < 1 * d; g++) {
                    var h = lott.numberRandom(1, 5, 3);
                    h.sort(function(a, b) {
                        return a - b
                    }), f.push(h.join(""))
                }
            for (var i = 0; i < e.length; i++) {
                var j = e[i].replace(/([0-9])(?=([0-9]{1})+([^0-9]|$))/g, "$1_"),
                    k = i == e.length - 1;
                j = "Any3Com_SSC" == globalVar.playCode ? f[i] + "@" + j : j, lott.createBetCart(j, 1, c, a.digit, a.stakes, k)
            }
        })
    },
    manualEntryUI: function(a, b) {
        var c = "",
            d = globalVar.currentLottery.series[0].gameGroup;
        globalVar.textArea = [], globalVar.anyBitsContent = "", c += '<dl class="manualBetting">';
        var e = "";
        if ("Any2_Single" != globalVar.playCode && "Any3_Single" != globalVar.playCode && "Any4_Single" != globalVar.playCode && "Any3Com_SSC" != globalVar.playCode && "Any2Com_SSC_Single" != globalVar.playCode || (e = lott.setAnySequenceBitUI("ma")), window.File && window.FileReader && window.FileList && window.Blob ? (c += '<dd><div class="rsLottBtns clearfix"><input id="betContentFile" type="file" accept="text/plain" name="file" style="display: none;" /><div id="betFileUpload"><label for="betContentFile">选择文件</label></div>', c += '<div id="emptySelection"><label for="">清空选号</label></div>', c += "</div>", c += e, c += "</dd>") : (c += '<dd style="height: 45px;"><div id="swfFileUpload">', c += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="126" height="45" id="fileUpload" align="middle">', c += '<param name="allowScriptAccess" value="always" />', c += '<param name="movie" value="js/fileUpload.swf"/>', c += '<param name="quality" value="high"/>', c += '<param name="wmode" value="transparent" />', c += '<embed src="js/fileUpload.swf" quality="high" allowScriptAccess="always" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="126" height="45"></embed>', c += "</object>", c += "</div>", c += e, c += "</dd>"), c += '<dd style="height: 30px;"><div class="uploadProgressBar"><div id="uploadProgressBar" style="width:0%;">0%</div></div></dd>', c += '<dd id="ballTextArea"><textarea cols="40" rows="6" id="ballInputArea" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off">', c += TCG.Prop("ballInputArea_" + d) + b.eg, c += "</textarea>", c += "</dd></dl>", $("div[select-area]").hide(), $('div[select-area="textArea"]').show(), $("dl[bet-btn-area]").hide(), $('dl[bet-btn-area="textArea"]').show(), lott.calculateAmount(0), $(".amount-bet-current").show(), $('div[select-area="textArea"]').html(c), "Any2_Single" == globalVar.playCode || "Any3_Single" == globalVar.playCode || "Any4_Single" == globalVar.playCode || "Any3Com_SSC" == globalVar.playCode || "Any2Com_SSC_Single" == globalVar.playCode) {
            $('span[ma-sq-bits="no"]').text(b.len);
            for (var f = b.len; f > 0; f--) $("#maAnySequenceBit li:nth-last-child(" + f + ")").addClass("active");
            lott.setBitSchemeUI("ma", b.len), $("#maAnySequenceBit li").off("click").on("click", function() {
                $(this).hasClass("active") ? $(this).removeClass("active") : $(this).addClass("active"), lott.setBitSchemeUI("ma", b.len), /[A-Za-z\u4E00-\u9FFF]/.test($("#ballInputArea").val()) || globalVar.textArea.length >= 0 && (globalVar.textArea = [], lott.calculateSSCAnyManualEntryStakes(b))
            })
        }
        $("#ballInputArea").off("focus").on("focus", function() {
            /[A-Za-z\u4E00-\u9FFF]/.test($(this).val()) && ($(this).val(""), lott.calculateAmount(0), globalVar.textArea = [])
        }), $("#ballInputArea").off("blur").on("blur", function() {
            "" == $(this).val() && ($(this).val(TCG.Prop("ballInputArea_" + d) + b.eg), lott.calculateAmount(0), globalVar.textArea = [])
        }), $("#ballInputArea").off("input propertychange").on("input propertychange", function() {
            $("#ballInputArea").val().replace(/[^\d]+/g, "").length <= 0 && lott.calculateAmount(0), globalVar.textArea = [];
            var c = globalVar.currentLottery.series[0].gameGroup;
            if ("11X5" == c || "PK10" == c) lott.calculateESFManualEntryStakes(b, c);
            else if ("Any2_Single" == globalVar.playCode || "Any3_Single" == globalVar.playCode || "Any4_Single" == globalVar.playCode || "Any3Com_SSC" == globalVar.playCode || "Any2Com_SSC_Single" == globalVar.playCode) {
                var d = $("#maAnySequenceBit li[class*='active']").size();
                if (b.len > 1 * d) return void TCG.Alert("alerts", "请至少选择" + b.len + "个位置<br/>您当前选择了" + d + "个位置");
                lott.calculateSSCAnyManualEntryStakes(b)
            } else lott.calculateSSCManualEntryStakes(a, b)
        }), $("#emptySelection").off("click").on("click", function() {
            $("#ballInputArea").val("").focus(), lott.calculateAmount(0), globalVar.textArea = []
        }), lott.buttonClickEvents("click", "#addTextAreaToCart", function(a) {
            if (globalVar.textArea.length <= 0) return TCG.Alert("alerts", "您的投注内容不符合要求!", "XS", function() {
                $("#ballInputArea").focus()
            }), void $(a).removeClass("processing");
            $("li[bet-sort='currentBetCart']").hasClass("tab-active") || $("li[bet-sort='currentBetCart']").trigger("click"), $(a).removeClass("enable"), $("#shortcutTextAreaToCart").removeClass("enable"), lott.addManualEntryToCart(), $(a).removeClass("processing")
        }), lott.buttonClickEvents("click", "#shortcutTextAreaToCart", function(a) {
            if (globalVar.textArea.length <= 0) return TCG.Alert("alerts", "您的投注内容不符合要求!", "XS", function() {
                $("#ballInputArea").focus()
            }), void $(a).removeClass("processing");
            lott.shortcutManualEntry(a), $(a).hasClass("processing") && $(a).removeClass("processing")
        }), lott.fileUpload.status = a, lott.fileUpload.obj = b, window.File && window.FileReader && window.FileList && window.Blob && lott.betContentUpload()
    },
    fileUpload: {
        block: 10240,
        fileLoaded: 0,
        fileSize: 0,
        content: "",
        status: !0,
        obj: {},
        readBlob: function() {
            var a = new FileReader;
            a.onload = function(b) {
                lott.fileUpload.fileLoaded += b.total;
                var c = lott.fileUpload.fileLoaded / lott.fileUpload.fileSize;
                c < 1 ? (lott.fileUpload.readBlob(), lott.fileUpload.content += a.result) : (c = 1, lott.fileUpload.content += a.result);
                var d = Math.ceil(100 * c) + "%";
                $("#uploadProgressBar").text(d), $("#uploadProgressBar").css("width", d), 1 == c && ($("#ballInputArea").val(lott.fileUpload.content), $(".uploadProgressBar").fadeOut(1e3, function() {
                    $("#uploadProgressBar").text("0%"), $("#uploadProgressBar").css("width", "0%");
                    var a = $(":file");
                    a.after(a.clone().val("")), a.remove(), lott.betContentUpload(), $("#ballInputArea").trigger("input")
                }))
            };
            var b;
            if (lott.fileUpload.file.webkitSlice) b = lott.fileUpload.file.webkitSlice(lott.fileUpload.fileLoaded, lott.fileUpload.fileLoaded + lott.fileUpload.block + 1);
            else if (lott.fileUpload.file.mozSlice) b = lott.fileUpload.file.mozSlice(lott.fileUpload.fileLoaded, lott.fileUpload.fileLoaded + lott.fileUpload.block + 1);
            else {
                if (!lott.fileUpload.file.slice) return void TCG.Alert("alerts", "您的浏览器不支持文件上传!");
                b = lott.fileUpload.file.slice(lott.fileUpload.fileLoaded, lott.fileUpload.fileLoaded + lott.fileUpload.block + 1)
            }
            a.readAsText(b)
        },
        swfUpload: function(a, b) {
            if ("start" == a && ($(".uploadProgressBar").show(), $("#uploadProgressBar").text("0%"), $("#uploadProgressBar").css("width", "0%")), "loading" == a && ($("#uploadProgressBar").text(b), $("#uploadProgressBar").css("width", b)), "complete" == a && $(".uploadProgressBar").fadeOut(1e3, function() {
                    $("#uploadProgressBar").text("0%"), $("#uploadProgressBar").css("width", "0%");
                    var a = void 0,
                        c = globalVar.currentLottery.series[0].gameGroup;
                    "11X5" == c ? (a = b.replace(/[^\d\r\n\f,;]+/g, ""), a = a.replace(/[^\d\d]+/g, "@")) : (a = b.replace(/[^\d\r\n\f\s,;#]+/g, ""), a = a.replace(/[^\d#]+/g, "@"));
                    var d = "@" == a.substring(a.length - 1) ? a.substring(0, a.length - 1) : a,
                        e = d.split("@");
                    "11X5" == c ? $("#ballInputArea").val(e.join("\n")) : $("#ballInputArea").val(e.join(" ")), $("#ballInputArea").trigger("input")
                }), "error" == a) return void TCG.Alert("alerts", b)
        }
    },
    betContentUpload: function() {
        $("#betContentFile").off("change").on("change", function(a) {
            if (lott.fileUpload.content = "", lott.fileUpload.file = this.files[0], lott.fileUpload.fileLoaded = 0, lott.fileUpload.fileSize = lott.fileUpload.file.size, !lott.fileUpload.file) {
                TCG.Alert("alerts", "请您选择文件!");
                var b = $(":file");
                return b.after(b.clone().val("")), b.remove(), void lott.betContentUpload()
            }
            if ("text/plain" != lott.fileUpload.file.type) {
                TCG.Alert("alerts", "您选择的文件类型不符合要求,<br/>目前只支持txt文本格式的文件!");
                var b = $(":file");
                return b.after(b.clone().val("")), b.remove(), void lott.betContentUpload()
            }
            if (lott.fileUpload.file.size > 1048576) {
                TCG.Alert("alerts", "您选择的文件大小超过1M,<br/>目前只支持1M大小的文件!");
                var b = $(":file");
                return b.after(b.clone().val("")), b.remove(), void lott.betContentUpload()
            }
            $(".uploadProgressBar").show(), lott.fileUpload.readBlob()
        })
    },
    entryRegular: function(a, b) {
        if (a) {
            var c = /^[0-9]*$/;
            return c.test(b)
        }
        var c = /^(\d)\1\1$/;
        return !c.test(b)
    },
    esfEntryRegular: function(a, b) {
        for (var c = /^0[1-9]|1[01]*$/, d = 0; d < a.length; d++) {
            if (!c.test(a[d])) return !1;
            for (var e = 0; e < b.length; e++)
                if (d != e && a[d] == b[e]) return !1
        }
        return !0
    },
    assemblyAnyBetBall: function(a, b) {
        for (var c = ["#", "#", "#", "#", "#"], d = 0; d < a.length; d++) c[b[d] - 1] = a.charAt(d);
        return c.join("_")
    },
    setAnySequenceBitUI: function(a) {
        var b = "";
        return b += '<div class="inline-block manualCheck"><ul class="manualCheckBoxWrp" id="' + a + 'AnySequenceBit">', b += '<li class="inline-block" sq-bit-id="1"><span class="csCheckBox"></span>万位</li><li class="inline-block" sq-bit-id="2"><span class="csCheckBox"></span>千位</li><li class="inline-block" sq-bit-id="3"><span class="csCheckBox"></span>百位</li><li class="inline-block" sq-bit-id="4"><span class="csCheckBox"></span>十位</li><li class="inline-block" sq-bit-id="5"><span class="csCheckBox"></span>个位</li>', b += "</ul></div>", b += '<div class="inline-block manualInfo">提示：至少选<span ' + a + '-sq-bits="no">0</span>个位置,您已选了<span ' + a + '-sq-bits="count">0</span>个位置，系统将自动生成<span ' + a + '-sq-bits="scheme">0</span>个方案。</div>'
    },
    setBitSchemeUI: function(a, b) {
        var c = [];
        $("#" + a + "AnySequenceBit li[class*='active']").each(function() {
            c.push($(this).attr("sq-bit-id"))
        }), $("span[" + a + '-sq-bits="count"]').text(c.length), globalVar.anyBitsContent = c.join(""), globalVar.anyBitScheme = lott.createBitScheme(b, c), $("span[" + a + "-sq-bits='scheme']").text(globalVar.anyBitScheme.length)
    },
    createBitScheme: function(a, b) {
        var c = [];
        if (1 * a == 2)
            for (var d = 0; d < b.length; d++)
                for (var e = d + 1; e < b.length; e++) {
                    var f = [];
                    f.push(b[d]), f.push(b[e]), c.push(f)
                }
        if (1 * a == 3)
            for (var d = 0; d < b.length; d++)
                for (var e = d + 1; e < b.length; e++)
                    for (var g = e + 1; g < b.length; g++) {
                        var f = [];
                        f.push(b[d]), f.push(b[e]), f.push(b[g]), c.push(f)
                    }
        if (1 * a == 4)
            for (var d = 0; d < b.length; d++)
                for (var e = d + 1; e < b.length; e++)
                    for (var g = e + 1; g < b.length; g++)
                        for (var h = g + 1; h < b.length; h++) {
                            var f = [];
                            f.push(b[d]), f.push(b[e]), f.push(b[g]), f.push(b[h]), c.push(f)
                        }
        return c
    },
    manualEntryDisassemble: function(a) {
        if (/[A-Za-z\u4E00-\u9FFF]/.test(a)) return TCG.Alert("alerts", "您的投注内容不符合要求<br/>里面还有字母或者中文!", "XS"), 0;
        var b = a.replace(/[^\d\r\n\f\s,;#]+/g, "");
        return b = b.replace(/[^\d#]+/g, "@"), ("@" == b.substring(b.length - 1) ? b.substring(0, b.length - 1) : b).split("@")
    },
    ESFManualEntryDisassemble: function(a, b) {
        if (/[A-Za-z\u4E00-\u9FFF]/.test(a)) return void TCG.Alert("alerts", "您的投注内容不符合要求<br/>里面还有字母或者中文!", "XS");
        var c;
        return c = "11X5" == b ? a.replace(/[^\d\r\n\f,;]+/g, "") : a.replace(/[^\d\r\n\f\s,;]+/g, ""), c = c.replace(/[^\d\d]+/g, "@"), ("@" == c.substring(c.length - 1) ? c.substring(0, c.length - 1) : c).split("@")
    },
    calculateSSCAnyManualEntryStakes: function(a) {
        var b = $("#ballInputArea").val(),
            c = lott.manualEntryDisassemble(b);
        if (0 != c.length) {
            var d = 0,
                e = [];
            if ("Any3Com_SSC" == globalVar.playCode)
                for (var f = 0; f < c.length; f++) lott.entryRegular(!1, c[f] + "") && c[f].length == 1 * a.len && (e.push(c[f].replace(/([0-9])(?=([0-9]{1})+([^0-9]|$))/g, "$1_")), d += 1 * a.stakes);
            else if ("Any2Com_SSC_Single" == globalVar.playCode)
                for (var f = 0; f < c.length; f++) lott.entryRegular(!0, c[f] + "") && !/^(\d)\1$/.test(c[f]) && c[f].length == 1 * a.len && (e.push(c[f]), d += 1 * a.stakes);
            else
                for (var f = 0; f < c.length; f++)
                    if (c[f].length == 1 * a.len)
                        for (var g = 0; g < globalVar.anyBitScheme.length; g++) e.push(lott.assemblyAnyBetBall(c[f], globalVar.anyBitScheme[g])), d += 1 * a.stakes; if (e.length > 0) {
                var h = "Any3Com_SSC" == globalVar.playCode || "Any2Com_SSC_Single" == globalVar.playCode ? globalVar.anyBitsContent + "@" + e.join(",") : e.join(","),
                    i = "Any3Com_SSC" == globalVar.playCode || "Any2Com_SSC_Single" == globalVar.playCode ? d * globalVar.anyBitScheme.length : d,
                    j = {
                        ball: h,
                        stakes: i,
                        type: 2,
                        digit: a.digit
                    };
                globalVar.textArea.push(j)
            }
            lott.calculateAmount(d)
        }
    },
    calculateSSCManualEntryStakes: function(a, b) {
        var c = $("#ballInputArea").val(),
            d = lott.manualEntryDisassemble(c);
        if (0 != d.length) {
            for (var e = 0, f = [], g = 0; g < d.length; g++) lott.entryRegular(a, d[g] + "") && d[g].length == 1 * b.len && (f.push(d[g].replace(/([0-9#])(?=([0-9#]{1})+([^0-9#]|$))/g, "$1_")), e += 1 * b.stakes);
            if (f.length > 0) {
                var h = {
                    ball: f.join(","),
                    stakes: e,
                    type: 2,
                    digit: b.digit
                };
                globalVar.textArea.push(h)
            }
            lott.calculateAmount(e)
        }
    },
    calculateESFManualEntryStakes: function(a, b) {
        var c = $("#ballInputArea").val(),
            d = lott.ESFManualEntryDisassemble(c, b);
        if (0 != d.length) {
            for (var e = 0, f = [], g = 0; g < d.length; g++) {
                var h = "",
                    i = "",
                    j = "";
                /^[0-9]*$/.test(d[g]) && d[g].length == 1 * a.len && (4 == d[g].length && ("First2Straight_11X5_Single" == globalVar.playCode || "First2_PK10_Single" == globalVar.playCode ? (j = d[g].replace(/(?=(\d{2})+(\D|$))/g, "$2_").substring(1), h = j.split("_"), i = j.split("_")) : (j = d[g].replace(/(?=(\d{2})+(\D|$))/g, "$2-").substring(1), h = j.split("-"), i = j.split("-"))), 6 == d[g].length && ("First3Straight_11X5_Single" == globalVar.playCode || "First3_PK10_Single" == globalVar.playCode ? (j = d[g].replace(/(?=(\d{2})+(\D|$))/g, "$2_").substring(1), h = j.split("_"), i = j.split("_")) : (j = d[g].replace(/(?=(\d{2})+(\D|$))/g, "$2-").substring(1), h = j.split("-"), i = j.split("-"))), 8 != d[g].length && 10 != d[g].length && 12 != d[g].length && 14 != d[g].length && 16 != d[g].length || ("First4_PK10_Single" == globalVar.playCode || "First5_PK10_Single" == globalVar.playCode ? (j = d[g].replace(/(?=(\d{2})+(\D|$))/g, "$2_").substring(1), h = j.split("_"), i = j.split("_")) : (j = d[g].replace(/(?=(\d{2})+(\D|$))/g, "$2-").substring(1), h = j.split("-"), i = j.split("-"))), lott.esfEntryRegular(h, i) && (f.push(j), e += 1 * a.stakes))
            }
            if (f.length > 0) {
                var k = {
                    ball: f.join(","),
                    stakes: e,
                    type: 2,
                    digit: a.digit
                };
                "PK10" == b && (k.type = 1), globalVar.textArea.push(k)
            }
            lott.calculateAmount(e)
        }
    },
    addManualEntryToCart: function() {
        if (!(globalVar.textArea.length <= 0)) {
            for (var a = $('input[name="betMultiple"]').val(), b = 0; b < globalVar.textArea.length; b++) lott.createBetCart(globalVar.textArea[b].ball, globalVar.textArea[b].type, a, globalVar.textArea[b].digit, globalVar.textArea[b].stakes, !1);
            lott.calculateCartBuyAmount(), globalVar.textArea = [], $("#ballInputArea").val(""), lott.calculateAmount(0)
        }
    },
    shortcutManualEntry: function(a) {
        if (!(globalVar.textArea.length <= 0)) {
            for (var b = $('input[name="betMultiple"]').val(), c = 0; c < globalVar.textArea.length; c++) {
                var d = lott.createShortcutBetContent(globalVar.textArea[c].ball, globalVar.textArea[c].type, b, globalVar.textArea[c].digit, globalVar.textArea[c].stakes);
                globalVar.shortcutContent.push(d)
            }
            lott.confirmBetOrder(a, !0, null)
        }
    },
    aloneDigitConversion: function(a, b) {
        var c = a + "_" + b,
            d = "";
        switch (c) {
            case "11X5_4":
                d = "（第一位）";
                break;
            case "11X5_3":
                d = "（第二位）";
                break;
            case "11X5_2":
                d = "（第三位）";
                break;
            case "11X5_1":
                d = "（第四位）";
                break;
            case "11X5_0":
                d = "（第五位）";
                break;
            case "SSC_4":
                d = "（万）";
                break;
            case "SSC_3":
                d = "（千）";
                break;
            case "SSC_2":
                d = "（百）";
                break;
            case "SSC_1":
                d = "（十）";
                break;
            case "SSC_0":
                d = "（个）";
                break;
            case "LF_4":
                d = "（万）";
                break;
            case "LF_3":
                d = "（千）";
                break;
            case "LF_2":
                d = "（百）";
                break;
            case "LF_1":
                d = "（十）";
                break;
            case "LF_0":
                d = "（个）";
                break;
            case "PK10_0":
                d = "(冠军)";
                break;
            case "PK10_1":
                d = "(亚军)";
                break;
            case "PK10_2":
                d = "(季军)";
                break;
            case "PK10_3":
                d = "(第四名)";
                break;
            case "PK10_4":
                d = "(第五名)";
                break;
            case "PK10_5":
                d = "(第六名)";
                break;
            case "PK10_6":
                d = "(第七名)";
                break;
            case "PK10_7":
                d = "(第八名)";
                break;
            case "PK10_8":
                d = "(第九名)";
                break;
            case "PK10_9":
                d = "(第十名)"
        }
        return d
    },
    bitsConversion: function(a) {
        var b = {
                b1: "万",
                b2: "千",
                b3: "百",
                b4: "十",
                b5: "个"
            },
            c = [];
        if (/^[1-5]+$/.test(a)) {
            for (var d = 0; d < a.length; d++) c.push(b["b" + a.charAt(d)]);
            return c.join("")
        }
        return "无"
    },
    toradoraBallUI: function(a, b) {
        var c = {},
            d = "";
        $("#gap_and_hot").attr("play-sort", "non");
        for (var e = 0; e < a.length; e++) c[a[e]] = "", d += '<div id="lott_ranks_' + a[e] + '" class="game-cntaner">', d += '<span class="lt-tb-row ch-xs inline-block">龙vs虎</span>', d += '<dl class="lt-number-row inline-block">', d += '<div class="pk10-wrp" data-val="1"><dt class="num-wrp dragon"></dt><dd class="sub-wrp">龙</dd></div>', d += '<div class="pk10-wrp" data-val="0"><dt class="num-wrp tiger"></dt><dd class="sub-wrp">虎</dd></div>', d += "</dl>", d += "</div>";
        a.push(c), $("div[select-area='ball']").hasClass("PK10") || $("div[select-area='ball']").addClass("PK10"), $("div[select-area='ball']").html(d), lott.toradoraBallEvent(a, b)
    },
    toradoraBallEvent: function(a, b) {
        var c = a[0];
        $(document).off("click", "#lott_ranks_" + c + ">dl>div").on("click", "#lott_ranks_" + c + ">dl>div", function() {
            if ($(this).hasClass("active")) $(this).removeClass("active"), a[a.length - 1][c] = "";
            else {
                $("#lott_ranks_" + c + ">dl>div").removeClass("active"), $(this).addClass("active");
                var d = $(this).attr("data-val");
                a[a.length - 1][c] = d
            }
            lott.calculateAmount(b(a))
        }), lott.addToCartEvents(function() {
            if (1 == a[a.length - 1][c].length) {
                var b = $('input[name="betMultiple"]').val();
                lott.createBetCart(a[a.length - 1][c], 1, b, "", 1, !0), lott.clearSelectionBall(a)
            } else TCG.Alert("alerts", "当前玩法只能选择1个号球!")
        }), lott.shortcutBettingEvents(function(b) {
            if (1 == a[a.length - 1][c].length) {
                var d = $('input[name="betMultiple"]').val(),
                    e = lott.createShortcutBetContent(a[a.length - 1][c], 1, d, "", 1);
                globalVar.shortcutContent.push(e), lott.confirmBetOrder(b, !0, a)
            } else TCG.Alert("alerts", "当前玩法只能选择1个号球!")
        }), lott.randomBallEvents(function(a) {
            for (var b = $('input[name="betMultiple"]').val(), c = $(a).attr("bet-random"), d = 0; d < 1 * c; d++) {
                var e = lott.numberRandom(0, 9, 1)[0],
                    f = 1 * e < 5 ? 0 : 1,
                    g = d == 1 * c - 1;
                lott.createBetCart(f, 1, b, "", 1, g)
            }
        })
    },
    selectionBall: function(a, b, c, d, e, f) {
        for (var g = globalVar.currentLottery.series[0].gameGroup, h = 0; h < a.length - 1; h++) b ? (lott.multipleBallEvent(a[h], a, f, c), lott.siftBtnEvents(a[h], a, f)) : lott.singleBallEvent(a[h], a, f);
        "SSC" != g || "FixedPlace" != globalVar.playCode && "First2StraightAnyCode" != globalVar.playCode && "Last2StraightAnyCode" != globalVar.playCode && "First2ComAnyCode" != globalVar.playCode && "Last2ComAnyCode" != globalVar.playCode ? "LF" == g && "FixedPlace_LF" == globalVar.playCode ? lott.addBallToCartOfAlone(a, e) : "11X5" == g && "FixedPlace_11X5" == globalVar.playCode ? lott.add11X5BallToCartOfAlone(a) : "SSC" == g && (globalVar.playCode.indexOf("AllCom") > -1 || globalVar.playCode.indexOf("L4Com") > -1 || globalVar.playCode.indexOf("F4Com") > -1 || 0 == globalVar.playCode.indexOf("Any4Com")) ? lott.addBallToCartOf5O4StarCom(a, d, e) : "PK10" == g && globalVar.playCode.indexOf("BSOE_PK10") > -1 ? lott.addBallToCartOfPk10Bose(a) : "PK10" == g && globalVar.playCode.indexOf("5Fixed_PK10") > -1 ? lott.add11X5BallToCartOfAlone(a) : "11X5" == g || "PK10" == g && -1 == globalVar.playCode.indexOf("BSOE_PK10") && -1 == globalVar.playCode.indexOf("5Fixed_PK10") ? lott.add11X5BallToCart(a, d, e) : lott.addBallToCart(a, d, e) : lott.addBallToCartOfAlone(a, e)
    },
    ranks: function(a, b, c, d, e, f, g) {
        var h = "";
        return h += '<div id="lott_ranks_' + b + '" class="game-cntaner">', h += '<span class="lt-tb-row ' + (1 == g ? "ch-xs" : "") + ' inline-block">' + (null == a || "" == a ? TCG.Prop("lottery_bett_" + b) : a) + (1 == g ? "<em></em>" : "") + "</span>", h += '<dl class="lt-number-row inline-block">' + lott.ball(c, d, e) + "</dl>", f && (h += lott.sift()), h += "</div>"
    },
    ball: function(a, b, c) {
        for (var d = "", e = a; e <= b; e++) d += '<dt class="num-wrp">' + (2 == c && e < 10 ? "0" + e : e) + "</dt>", d += '<dd class="sub-wrp"></dd>';
        return d
    },
    multipleBallEvent: function(a, b, c, d) {
        $("#lott_ranks_" + a + ">dl>dt").unbind().hover(function() {
            $(this).addClass("hover")
        }, function() {
            $(this).removeClass("hover")
        }), $(document).off("click", "#lott_ranks_" + a + ">dl>dt").on("click", "#lott_ranks_" + a + ">dl>dt", function() {
            var e = $(this).text(),
                f = globalVar.currentLottery.series[0].gameGroup;
            if ($(this).removeClass("hover"), $(this).hasClass("selected")) {
                $(this).removeClass("selected");
                var g = b[b.length - 1][a].indexOf(e);
                if (g > -1)
                    if ("11X5" == f || "PK10" == f && -1 == globalVar.playCode.indexOf("BSOE_PK10")) b[b.length - 1][a].splice(g, 1);
                    else {
                        var h = b[b.length - 1][a].replace(e, "");
                        b[b.length - 1][a] = h
                    }
                lott.calculateAmount(c(b))
            } else {
                if (b[b.length - 1][a].length + 1 > d) return void TCG.Alert("errors", "当前玩法最多只能选择" + d + "个号球!");
                if ($(this).addClass("selected"), "11X5" == f || "PK10" == f && -1 == globalVar.playCode.indexOf("BSOE_PK10")) b[b.length - 1][a].push(e), b[b.length - 1][a].sort(function(a, b) {
                    return a - b
                });
                else {
                    b[b.length - 1][a] += e;
                    var i = b[b.length - 1][a].replace(/([0-9])(?=([0-9]{1})+([^0-9]|$))/g, "$1_"),
                        j = i.split("_");
                    j.sort(function(a, b) {
                        return a - b
                    }), b[b.length - 1][a] = j.join("")
                }
                lott.calculateAmount(c(b))
            }
        })
    },
    singleBallEvent: function(a, b, c) {
        $("#lott_ranks_" + a + ">dl>dt").unbind().hover(function() {
            $(this).addClass("hover")
        }, function() {
            $(this).removeClass("hover")
        }), $(document).off("click", "#lott_ranks_" + a + ">dl>dt").on("click", "#lott_ranks_" + a + ">dl>dt", function() {
            if ($(this).removeClass("hover"), $(this).hasClass("selected")) $(this).removeClass("selected"), b[b.length - 1][a] = "";
            else {
                $("#lott_ranks_" + a + ">dl>dt").removeClass("selected"), $(this).addClass("selected");
                var d = $(this).text();
                (globalVar.playCode.indexOf("st2BSOE") > -1 || globalVar.playCode.indexOf("BSOE_PK10") > -1) && (d = lott.BSOEConversion(d)), b[b.length - 1][a] = d
            }
            lott.calculateAmount(c(b))
        })
    },
    sift: function() {
        return '<ul class="lt-pick-row inline-block"><li sift="all">全</li><li sift="big">大</li><li sift="small">小</li><li sift="odd">奇</li><li sift="even">偶</li><li sift="clear">清</li></ul>'
    },
    siftBtnEvents: function(a, b, c) {
        $(document).off("click", "#lott_ranks_" + a + ">ul>li").on("click", "#lott_ranks_" + a + ">ul>li", function() {
            var d = $(this).attr("sift"),
                e = globalVar.currentLottery.series[0].gameGroup;
            switch ($("#lott_ranks_" + a + ">dl>dt").removeClass("selected"), d) {
                case "all":
                    $("#lott_ranks_" + a + ">dl>dt:nth-child(1n+1)").addClass("selected");
                    break;
                case "big":
                    $("#lott_ranks_" + a + ">dl>dt:gt(4)").addClass("selected");
                    break;
                case "small":
                    $("#lott_ranks_" + a + ">dl>dt:lt(5)").addClass("selected");
                    break;
                case "odd":
                    var f = "11X5" == e || "PK10" == e && -1 == globalVar.playCode.indexOf("BSOE_PK10") ? "even" : "odd";
                    $("#lott_ranks_" + a + ">dl>dt:" + f).addClass("selected");
                    break;
                case "even":
                    var f = "11X5" == e || "PK10" == e && -1 == globalVar.playCode.indexOf("BSOE_PK10") ? "odd" : "even";
                    $("#lott_ranks_" + a + ">dl>dt:" + f).addClass("selected");
                    break;
                case "clear":
                    "11X5" == e || "PK10" == e && -1 == globalVar.playCode.indexOf("BSOE_PK10") ? b[b.length - 1][a].splice(0, b[b.length - 1][a].length) : b[b.length - 1][a] = ""
            }
            if ("clear" != d)
                if ("11X5" == e || "PK10" == e && -1 == globalVar.playCode.indexOf("BSOE_PK10")) {
                    var g = $("#lott_ranks_" + a + " .selected").text().replace(/(?=(\d{2})+(\D|$))/g, "$2_").substring(1);
                    b[b.length - 1][a] = g.split("_")
                } else b[b.length - 1][a] = $("#lott_ranks_" + a + " .selected").text();
            lott.calculateAmount(c(b))
        })
    },
    first5StraightOf11X5: function(a, b, c, d, e) {
        for (var f = 0, g = 0; g < a.length; g++)
            if ("" != a[g])
                for (var h = 0; h < b.length; h++)
                    if ("" != b[h] && a[g] != b[h])
                        for (var i = 0; i < c.length; i++)
                            if ("" != c[i] && a[g] != c[i] && b[h] != c[i])
                                for (var j = 0; j < d.length; j++)
                                    if ("" != d[j] && a[g] != d[j] && b[h] != d[j] && c[i] != d[j])
                                        for (var k = 0; k < e.length; k++) "" != d[j] && a[g] != e[k] && b[h] != e[k] && c[i] != e[k] && d[j] != e[k] && f++;
        return f
    },
    first4StraightOf11X5: function(a, b, c, d) {
        for (var e = 0, f = 0; f < a.length; f++)
            if ("" != a[f])
                for (var g = 0; g < b.length; g++)
                    if ("" != b[g] && a[f] != b[g])
                        for (var h = 0; h < c.length; h++)
                            if ("" != c[h] && a[f] != c[h] && b[g] != c[h])
                                for (var i = 0; i < d.length; i++) "" != d[i] && a[f] != d[i] && b[g] != d[i] && c[h] != d[i] && e++;
        return e
    },
    first3StraightOf11X5: function(a, b, c) {
        for (var d = 0, e = 0; e < a.length; e++)
            if ("" != a[e])
                for (var f = 0; f < b.length; f++)
                    if ("" != b[f] && a[e] != b[f])
                        for (var g = 0; g < c.length; g++) "" != c[g] && a[e] != c[g] && b[f] != c[g] && d++;
        return d
    },
    first2StraightOf11X5: function(a, b) {
        for (var c = 0, d = 0; d < a.length; d++)
            if ("" != a[d])
                for (var e = 0; e < b.length; e++) "" != b[e] && a[d] != b[e] && c++;
        return c
    },
    calculateAmount: function(a) {
        var b = 0,
            c = $('input[name="betMultiple"]').val();
        if (a >= 0 && (globalVar.selectionBallStakes = a, globalVar.selectionBallAmount = 1 * a * (1 * globalVar.singleStakesPrice), 0 == globalVar.playCode.indexOf("Any4Com") || 0 == globalVar.playCode.indexOf("Any3Com") || 0 == globalVar.playCode.indexOf("Any3Sum") || 0 == globalVar.playCode.indexOf("Any2Com") || 0 == globalVar.playCode.indexOf("Any2Sum") ? ($("#selectionBallStakes").text(globalVar.selectionBallStakes * globalVar.anyBitScheme.length), $("#selectionBallAmount").text(lott.formatNumber(1 * c * globalVar.selectionBallAmount * globalVar.anyBitScheme.length * globalVar.currentLottery.betMode.unit, 4)), a = globalVar.selectionBallStakes * globalVar.anyBitScheme.length) : ($("#selectionBallStakes").text(globalVar.selectionBallStakes), $("#selectionBallAmount").text(lott.formatNumber(1 * c * globalVar.selectionBallAmount * globalVar.currentLottery.betMode.unit, 4)))), "SSC" == globalVar.currentLottery.series[0].gameGroup) switch (globalVar.playCode) {
            case "First2Join":
            case "Last2Join":
                b = 1;
                break;
            case "First3Join":
            case "Middle3Join":
            case "Last3Join":
                b = 2;
                break;
            case "First4Join":
            case "Last4Join":
                b = 3;
                break;
            case "All5Join":
                b = 4
        }
        a > b ? ($("#addBallToCart").hasClass("enable") || $("#addBallToCart").addClass("enable"), $("#shortcutPlaceOrder").hasClass("enable") || $("#shortcutPlaceOrder").addClass("enable"), "block" != $('dl[bet-btn-area="textArea"]').css("display") && "inline-block" != $('dl[bet-btn-area="textArea"]').css("display") || ($("#addTextAreaToCart").hasClass("enable") || $("#addTextAreaToCart").addClass("enable"), $("#shortcutTextAreaToCart").hasClass("enable") || $("#shortcutTextAreaToCart").addClass("enable"))) : ($("#addBallToCart").removeClass("enable"), $("#shortcutPlaceOrder").removeClass("enable"), "block" != $('dl[bet-btn-area="textArea"]').css("display") && "inline-block" != $('dl[bet-btn-area="textArea"]').css("display") || ($("#addTextAreaToCart").removeClass("enable"), $("#shortcutTextAreaToCart").removeClass("enable")))
    },
    addToCartEvents: function(a) {
        lott.buttonClickEvents("click", "#addBallToCart", function(b) {
            $("li[bet-sort='currentBetCart']").hasClass("tab-active") || $("li[bet-sort='currentBetCart']").trigger("click"), $(b).removeClass("enable"), $("#shortcutPlaceOrder").removeClass("enable"), a && a(), $(b).removeClass("processing")
        })
    },
    shortcutBettingEvents: function(a) {
        lott.buttonClickEvents("click", "#shortcutPlaceOrder", function(b) {
            a && a(b), $(b).hasClass("processing") && $(b).removeClass("processing")
        })
    },
    clearShortcutContent: function() {
        globalVar.shortcutContent.length > 0 && (globalVar.currentCart.splice(1 * globalVar.shortcutContent[0], globalVar.shortcutContent.length), globalVar.shortcutContent.splice(0, globalVar.shortcutContent.length))
    },
    addBallToCart: function(a, b, c) {
        lott.addToCartEvents(function() {
            for (var d = "", e = 0; e < a.length - 1; e++) {
                if (!(a[a.length - 1][a[e]].length >= b)) {
                    TCG.Alert("alerts", "当前玩法至少选择" + b + "个号球!"), d = "";
                    break
                }
                0 == a[a.length - 1][a[e]].length ? d += "_#" : d += "_" + a[a.length - 1][a[e]]
            }
            var f = 0 == globalVar.playCode.indexOf("Any3Com") || "Any2Com_SSC" == globalVar.playCode ? globalVar.selectionBallStakes * globalVar.anyBitScheme.length : globalVar.selectionBallStakes;
            if (d.length - 1 > 0 && f > 0) {
                var g = $('input[name="betMultiple"]').val();
                d = 0 == globalVar.playCode.indexOf("Any3Com") || "Any2Com_SSC" == globalVar.playCode ? globalVar.anyBitsContent + "@" + d.substring(1) : d.substring(1), lott.createBetCart(d, 1, g, c, f, !0), lott.clearSelectionBall(a)
            }
        }), lott.shortcutBettingEvents(function(d) {
            for (var e = "", f = 0; f < a.length - 1; f++) {
                if (!(a[a.length - 1][a[f]].length >= b)) {
                    TCG.Alert("alerts", "当前玩法至少选择" + b + "个号球!"), e = "";
                    break
                }
                0 == a[a.length - 1][a[f]].length ? e += "_#" : e += "_" + a[a.length - 1][a[f]]
            }
            var g = 0 == globalVar.playCode.indexOf("Any3Com") || "Any2Com_SSC" == globalVar.playCode ? globalVar.selectionBallStakes * globalVar.anyBitScheme.length : globalVar.selectionBallStakes;
            if (e.length - 1 > 0 && g > 0) {
                var h = $('input[name="betMultiple"]').val();
                e = 0 == globalVar.playCode.indexOf("Any3Com") || "Any2Com_SSC" == globalVar.playCode ? globalVar.anyBitsContent + "@" + e.substring(1) : e.substring(1);
                var i = lott.createShortcutBetContent(e, 1, h, c, g);
                globalVar.shortcutContent.push(i), lott.confirmBetOrder(d, !0, a)
            }
        }), lott.randomBallEvents(function(d) {
            var e = $('input[name="betMultiple"]').val(),
                f = $(d).attr("bet-random");
            if (a.length - 1 > 1 && 1 * b == 0 && globalVar.playCode.indexOf("Any") > -1)
                for (var g = 0; g < 1 * f; g++) {
                    for (var h = lott.numberRandom(0, 4, 1 * globalVar.playCode.charAt(3)), i = new Array(5), j = "", k = 0; k < h.length; k++) i[h[k]] = lott.numberRandom(0, 9, 1)[0];
                    for (var l = 0; l < i.length; l++) null == i[l] ? j += "_#" : j += "_" + i[l];
                    var m = g == 1 * f - 1;
                    lott.createBetCart(j.substring(1), 1, e, c, 1, m)
                }
            if (a.length - 1 == 1 && 1 * b >= 1)
                for (var g = 0; g < 1 * f; g++) {
                    var j = "";
                    j = lott.numberRandom(0, 9, 1 * b).join("");
                    var n = 1;
                    globalVar.playCode.indexOf("3Com3") > -1 && (n = 2), globalVar.playCode.indexOf("3StraightCom") > -1 && (n = 6), globalVar.playCode.indexOf("3ComAnyCode1") > -1 && (n = 55);
                    var m = g == 1 * f - 1;
                    if (0 == globalVar.playCode.indexOf("Any3Com") || "Any2Com_SSC" == globalVar.playCode) {
                        var h = lott.numberRandom(1, 5, 1 * globalVar.playCode.charAt(3));
                        h.sort(function(a, b) {
                            return a - b
                        }), j = h.join("") + "@" + j, n *= 1
                    }
                    lott.createBetCart(j, 1, e, c, n, m)
                }
            if (a.length - 1 > 1 && 1 * b == 1)
                for (var g = 0; g < 1 * f; g++) {
                    for (var j = "", k = 0; k < a.length - 1; k++) j += "_" + lott.numberRandom(0, 9, 1)[0];
                    var n = 1;
                    globalVar.playCode.indexOf("Join") > -1 && (n = 1 * globalVar.playCode.charAt(globalVar.playCode.indexOf("Join") - 1)), globalVar.playCode.indexOf("3ComAnyCode2") > -1 && (n = 10);
                    var m = g == 1 * f - 1;
                    lott.createBetCart(j.substring(1), 1, e, c, n, m)
                }
        })
    },
    addBallToCartOfAlone: function(a, b) {
        lott.addToCartEvents(function() {
            if (globalVar.selectionBallStakes <= 0) return void TCG.Alert("alerts", "当前玩法至少选择1个号球!");
            var c = $('input[name="betMultiple"]').val();
            if ("FixedPlace" == globalVar.playCode || "FixedPlace_LF" == globalVar.playCode)
                for (var d = 0; d < a.length - 1; d++) {
                    var e = a[a.length - 1][a[d]].length;
                    if (e > 0) {
                        var f = "";
                        switch (a[d]) {
                            case "FIRST":
                                f = "4";
                                break;
                            case "SECOND":
                                f = "3";
                                break;
                            case "THIRD":
                                f = "2";
                                break;
                            case "FOURTH":
                                f = "1";
                                break;
                            case "FIFTH":
                                f = "0"
                        }
                        lott.createBetCart(a[a.length - 1][a[d]], 1, c, f, e, !1)
                    }
                } else {
                    for (var g = "", d = 0; d < a.length - 1; d++) g += "_" + a[a.length - 1][a[d]];
                    g = g.substring(1), g = g.replace(/(\d)(?=(\d{1})+(\D|$))/g, "$1_");
                    for (var h = g.split("_"), d = 0; d < h.length; d++)
                        if (h[d].length > 0) {
                            var e = "First2StraightAnyCode" == globalVar.playCode || "Last2StraightAnyCode" == globalVar.playCode ? h[d].length : 10 * h[d].length;
                            lott.createBetCart(h[d], 1, c, b, e, !1)
                        }
                }
            lott.calculateCartBuyAmount(), lott.clearSelectionBall(a)
        }), lott.shortcutBettingEvents(function(c) {
            if (globalVar.selectionBallStakes <= 0) return void TCG.Alert("alerts", "当前玩法至少选择1个号球!");
            var d = $('input[name="betMultiple"]').val();
            if ("FixedPlace" == globalVar.playCode || "FixedPlace_LF" == globalVar.playCode)
                for (var e = 0; e < a.length - 1; e++) {
                    var f = a[a.length - 1][a[e]].length;
                    if (f > 0) {
                        var g = "";
                        switch (a[e]) {
                            case "FIRST":
                                g = "4";
                                break;
                            case "SECOND":
                                g = "3";
                                break;
                            case "THIRD":
                                g = "2";
                                break;
                            case "FOURTH":
                                g = "1";
                                break;
                            case "FIFTH":
                                g = "0"
                        }
                        var h = lott.createShortcutBetContent(a[a.length - 1][a[e]], 1, d, g, f);
                        globalVar.shortcutContent.push(h)
                    }
                } else {
                    for (var i = "", e = 0; e < a.length - 1; e++) i += "_" + a[a.length - 1][a[e]];
                    i = i.substring(1), i = i.replace(/(\d)(?=(\d{1})+(\D|$))/g, "$1_");
                    for (var j = i.split("_"), e = 0; e < j.length; e++)
                        if (j[e].length > 0) {
                            var f = "First2StraightAnyCode" == globalVar.playCode || "Last2StraightAnyCode" == globalVar.playCode ? j[e].length : 10 * j[e].length,
                                h = lott.createShortcutBetContent(j[e], 1, d, b, f);
                            globalVar.shortcutContent.push(h)
                        }
                }
            lott.confirmBetOrder(c, !0, a)
        }), lott.randomBallEvents(function(a) {
            var c = $('input[name="betMultiple"]').val(),
                d = $(a).attr("bet-random");
            if ("FixedPlace" == globalVar.playCode || "FixedPlace_LF" == globalVar.playCode)
                for (var e = 0; e < 1 * d; e++) {
                    var f = "";
                    f = "FC3D" == globalVar.currentLottery.game ? lott.numberRandom(0, 2, 1)[0] + "" : lott.numberRandom(0, 4, 1)[0] + "";
                    var g = lott.numberRandom(0, 9, 1)[0] + "",
                        h = e == 1 * d - 1;
                    lott.createBetCart(g, 1, c, f, 1, h)
                } else
                    for (var e = 0; e < 1 * d; e++) {
                        var g = "";
                        g = lott.numberRandom(0, 9, 1)[0] + "";
                        var i = 1;
                        globalVar.playCode.indexOf("2ComAnyCode") > -1 && (i = 10);
                        var h = e == 1 * d - 1;
                        lott.createBetCart(g, 1, c, b, i, h)
                    }
        })
    },
    addBallToCartOfPk10Bose: function(a) {
        lott.addToCartEvents(function() {
            if (globalVar.selectionBallStakes <= 0) return void TCG.Alert("alerts", "当前玩法至少选择1个号球!");
            for (var b = $('input[name="betMultiple"]').val(), c = 0; c < a.length - 1; c++) {
                var d = a[a.length - 1][a[c]].length;
                if (d > 0) {
                    var e = lott.PK10DigitConversion(a[c]);
                    lott.createBetCart(a[a.length - 1][a[c]], 1, b, e, d, !1)
                }
            }
            lott.calculateCartBuyAmount(), lott.clearSelectionBall(a)
        }), lott.shortcutBettingEvents(function(b) {
            if (globalVar.selectionBallStakes <= 0) return void TCG.Alert("alerts", "当前玩法至少选择1个号球!");
            for (var c = $('input[name="betMultiple"]').val(), d = 0; d < a.length - 1; d++) {
                var e = a[a.length - 1][a[d]].length;
                if (e > 0) {
                    var f = lott.PK10DigitConversion(a[d]),
                        g = lott.createShortcutBetContent(a[a.length - 1][a[d]], 1, c, f, e);
                    globalVar.shortcutContent.push(g)
                }
            }
            lott.confirmBetOrder(b, !0, a)
        }), lott.randomBallEvents(function(a) {
            for (var b = $('input[name="betMultiple"]').val(), c = $(a).attr("bet-random"), d = "", e = 0; e < 1 * c; e++) {
                "First2SumBSOE_PK10" != globalVar.playCode && (d = lott.numberRandom(0, 4, 1)[0] + "");
                var f = lott.numberRandom(0, 3, 1)[0] + "",
                    g = e == 1 * c - 1;
                lott.createBetCart(f, 1, b, d, 1, g)
            }
        })
    },
    add11X5BallToCart: function(a, b, c) {
        lott.addToCartEvents(function() {
            var d = "";
            if (a.length - 1 == 1) {
                if (a[a.length - 1][a[0]].length < b) return void TCG.Alert("alerts", "当前玩法至少选择" + b + "个号球!");
                d = "_" + a[a.length - 1][a[0]].join("-")
            } else
                for (var e = 0; e < a.length - 1; e++) {
                    if (a[a.length - 1][a[e]].length > 0 && 1 * globalVar.selectionBallStakes == 0) return TCG.Alert("alerts", "当前玩法至少选择" + b + "个号球!"), void(d = "");
                    d += "_" + a[a.length - 1][a[e]].join("-")
                }
            if (d.length - 1 > 0 && globalVar.selectionBallStakes > 0) {
                var f = $('input[name="betMultiple"]').val();
                d = d.substring(1), lott.createBetCart(d, 1, f, c, globalVar.selectionBallStakes, !0), lott.clearSelectionBall(a)
            }
        }), lott.shortcutBettingEvents(function(d) {
            var e = "";
            if (a.length - 1 == 1) {
                if (a[a.length - 1][a[0]].length < b) return void TCG.Alert("alerts", "当前玩法至少选择" + b + "个号球!");
                e = "_" + a[a.length - 1][a[0]].join("-")
            } else
                for (var f = 0; f < a.length - 1; f++) {
                    if (a[a.length - 1][a[f]].length > 0 && 1 * globalVar.selectionBallStakes == 0) return TCG.Alert("alerts", "当前玩法至少选择" + b + "个号球!"), void(e = "");
                    e += "_" + a[a.length - 1][a[f]].join("-")
                }
            if (e.length - 1 > 0 && globalVar.selectionBallStakes > 0) {
                var g = $('input[name="betMultiple"]').val();
                e = e.substring(1);
                var h = lott.createShortcutBetContent(e, 1, g, c, globalVar.selectionBallStakes);
                globalVar.shortcutContent.push(h), lott.confirmBetOrder(d, !0, a)
            }
        }), lott.randomBallEvents(function(d) {
            for (var e = $('input[name="betMultiple"]').val(), f = $(d).attr("bet-random"), g = a.length - 1 == 1 ? 1 * b : a.length - 1, h = a.length - 1 == 1 ? "-" : "_", i = globalVar.playCode.indexOf("_PK10") > -1 ? 10 : 11, j = 0; j < 1 * f; j++) {
                for (var k = "", l = lott.numberRandom(1, i, g), m = 0; m < l.length; m++) k += h + lott.addZero(l[m] + "", 2);
                var n = j == 1 * f - 1;
                lott.createBetCart(k.substring(1), 1, e, c, 1, n)
            }
        })
    },
    add11X5BallToCartOfAlone: function(a) {
        lott.addToCartEvents(function() {
            if (globalVar.selectionBallStakes <= 0) return void TCG.Alert("alerts", "当前玩法至少选择1个号球!");
            for (var b = $('input[name="betMultiple"]').val(), c = 0; c < a.length - 1; c++) {
                var d = a[a.length - 1][a[c]].length;
                if (d > 0) {
                    var e = "";
                    if (globalVar.playCode.indexOf("5Fixed_PK10") > -1) e = lott.PK10DigitConversion(a[c]);
                    else switch (a[c]) {
                        case "FIRST":
                            e = "4";
                            break;
                        case "SECOND":
                            e = "3";
                            break;
                        case "THIRD":
                            e = "2"
                    }
                    lott.createBetCart(a[a.length - 1][a[c]].join("-"), 1, b, e, d, !1)
                }
            }
            lott.calculateCartBuyAmount(), lott.clearSelectionBall(a)
        }), lott.shortcutBettingEvents(function(b) {
            if (globalVar.selectionBallStakes <= 0) return void TCG.Alert("alerts", "当前玩法至少选择1个号球!");
            for (var c = $('input[name="betMultiple"]').val(), d = 0; d < a.length - 1; d++) {
                var e = a[a.length - 1][a[d]].length;
                if (e > 0) {
                    var f = "";
                    if (globalVar.playCode.indexOf("5Fixed_PK10") > -1) f = lott.PK10DigitConversion(a[d]);
                    else switch (a[d]) {
                        case "FIRST":
                            f = "4";
                            break;
                        case "SECOND":
                            f = "3";
                            break;
                        case "THIRD":
                            f = "2"
                    }
                    var g = lott.createShortcutBetContent(a[a.length - 1][a[d]].join("-"), 1, c, f, e);
                    globalVar.shortcutContent.push(g)
                }
            }
            lott.confirmBetOrder(b, !0, a)
        }), lott.randomBallEvents(function(a) {
            for (var b = $('input[name="betMultiple"]').val(), c = $(a).attr("bet-random"), d = 0; d < 1 * c; d++) {
                var e = globalVar.playCode.indexOf("5Fixed_PK10") > -1 ? 10 : 11,
                    f = lott.addZero(lott.numberRandom(1, e, 1)[0] + "", 2),
                    g = "";
                g = "First5Fixed_PK10" == globalVar.playCode ? lott.numberRandom(0, 4, 1)[0] + "" : "Last5Fixed_PK10" == globalVar.playCode ? lott.numberRandom(5, 9, 1)[0] + "" : lott.numberRandom(2, 4, 1)[0] + "";
                var h = d == 1 * c - 1;
                lott.createBetCart(f, 1, b, g, 1, h)
            }
        })
    },
    addBallToCartOf5O4StarCom: function(a, b, c) {
        lott.addToCartEvents(function() {
            for (var d = "", e = 0; e < a.length - 1; e++) {
                var f = "number" == typeof b ? b : b[a[e]];
                if (!(a[a.length - 1][a[e]].length >= f)) {
                    "number" == typeof b ? TCG.Alert("alerts", "当前玩法至少选择" + f + "个号球!") : TCG.Alert("alerts", "当前玩法至少选择" + f[a[0]] + "个重号," + f[a[1]] + "个单号!"), d = "";
                    break
                }
                d += "_" + a[a.length - 1][a[e]]
            }
            var g = 0 == globalVar.playCode.indexOf("Any4Com") ? globalVar.selectionBallStakes * globalVar.anyBitScheme.length : globalVar.selectionBallStakes;
            if (d.length - 1 > 0 && g > 0) {
                var h = $('input[name="betMultiple"]').val();
                d = 0 == globalVar.playCode.indexOf("Any4Com") ? globalVar.anyBitsContent + "@" + d.substring(1) : d.substring(1), lott.createBetCart(d, 1, h, c, g, !0), lott.clearSelectionBall(a)
            }
        }), lott.shortcutBettingEvents(function(d) {
            for (var e = "", f = 0; f < a.length - 1; f++) {
                var g = "number" == typeof b ? b : b[a[f]];
                if (!(a[a.length - 1][a[f]].length >= g)) {
                    "number" == typeof b ? TCG.Alert("alerts", "当前玩法至少选择" + g + "个号球!") : TCG.Alert("alerts", "当前玩法至少选择" + g[a[0]] + "个重号," + g[a[1]] + "个单号!"), e = "";
                    break
                }
                e += "_" + a[a.length - 1][a[f]]
            }
            var h = 0 == globalVar.playCode.indexOf("Any4Com") ? globalVar.selectionBallStakes * globalVar.anyBitScheme.length : globalVar.selectionBallStakes;
            if (e.length - 1 > 0 && h > 0) {
                var i = $('input[name="betMultiple"]').val();
                e = 0 == globalVar.playCode.indexOf("Any4Com") ? globalVar.anyBitsContent + "@" + e.substring(1) : e.substring(1);
                var j = lott.createShortcutBetContent(e, 1, i, c, h);
                globalVar.shortcutContent.push(j), lott.confirmBetOrder(d, !0, a)
            }
        }), lott.randomBallEvents(function(a) {
            var d = $('input[name="betMultiple"]').val(),
                e = $(a).attr("bet-random");
            if ("AllCom120" == globalVar.playCode || "F4Com24" == globalVar.playCode || "L4Com24" == globalVar.playCode || "Any4Com24_SSC" == globalVar.playCode)
                for (var f = 0; f < 1 * e; f++) {
                    var g = "";
                    g = lott.numberRandom(0, 9, 1 * b).join("");
                    var h = 1,
                        i = f == 1 * e - 1;
                    if ("Any4Com24_SSC" == globalVar.playCode) {
                        var j = lott.numberRandom(1, 5, 4);
                        j.sort(function(a, b) {
                            return a - b
                        }), g = j.join("") + "@" + g, h *= 1
                    }
                    lott.createBetCart(g, 1, d, c, h, i)
                }
            if ("AllCom60" == globalVar.playCode || "AllCom20" == globalVar.playCode || "F4Com12" == globalVar.playCode || "L4Com12" == globalVar.playCode || "Any4Com12_SSC" == globalVar.playCode)
                for (var f = 0; f < 1 * e; f++) {
                    var k = 3;
                    "AllCom60" == globalVar.playCode && (k = 4);
                    for (var l = lott.numberRandom(0, k - 1, 1)[0], j = lott.numberRandom(0, 9, k), g = j[1 * l] + "_", m = 0; m < j.length; m++) m != 1 * l && (g += j[m]);
                    var h = 1,
                        i = f == 1 * e - 1;
                    if ("Any4Com12_SSC" == globalVar.playCode) {
                        var j = lott.numberRandom(1, 5, 4);
                        j.sort(function(a, b) {
                            return a - b
                        }), g = j.join("") + "@" + g, h *= 1
                    }
                    lott.createBetCart(g, 1, d, c, h, i)
                }
            if ("AllCom30" == globalVar.playCode)
                for (var f = 0; f < 1 * e; f++) {
                    for (var n = lott.numberRandom(0, 2, 1)[0], j = lott.numberRandom(0, 9, 3), g = "", m = 0; m < j.length; m++) m != 1 * n && (g += j[m]);
                    g += "_" + j[1 * n];
                    var h = 1,
                        i = f == 1 * e - 1;
                    lott.createBetCart(g, 1, d, c, h, i)
                }
            if ("AllCom10" == globalVar.playCode || "AllCom5" == globalVar.playCode || "F4Com6" == globalVar.playCode || "L4Com6" == globalVar.playCode || "F4Com4" == globalVar.playCode || "L4Com4" == globalVar.playCode || "Any4Com6_SSC" == globalVar.playCode || "Any4Com4_SSC" == globalVar.playCode)
                for (var f = 0; f < 1 * e; f++) {
                    var o = "_";
                    "F4Com6" != globalVar.playCode && "L4Com6" != globalVar.playCode && "Any4Com6_SSC" != globalVar.playCode || (o = "");
                    var g = lott.numberRandom(0, 9, 2).join(o),
                        h = 1,
                        i = f == 1 * e - 1;
                    if ("Any4Com6_SSC" == globalVar.playCode || "Any4Com4_SSC" == globalVar.playCode) {
                        var j = lott.numberRandom(1, 5, 4);
                        j.sort(function(a, b) {
                            return a - b
                        }), g = j.join("") + "@" + g, h *= 1
                    }
                    lott.createBetCart(g, 1, d, c, h, i)
                }
        })
    },
    createBetCart: function(a, b, c, d, e, f) {
        var g = {
            id: globalVar.cartId,
            ball: a,
            type: b,
            playId: globalVar.playId,
            betModeId: globalVar.currentLottery.betMode.id,
            series: globalVar.currentLottery.betSeries,
            multiple: c,
            digit: d,
            stakes: e,
            amount: lott.formatNumber(1 * e * (1 * globalVar.singleStakesPrice) * globalVar.currentLottery.betMode.unit, 4),
            betModeUnit: globalVar.currentLottery.betMode.unit,
            playCode: globalVar.playCode
        };
        globalVar.currentCart.push(g), lott.assembleBetCartContent(g), f && lott.calculateCartBuyAmount(), lott.betButtonStyleListener(), globalVar.cartId++
    },
    assembleBetCartContent: function(a) {
        var b = globalVar.currentLottery.series[0].gameGroup,
            c = '<ul row-date="' + a.id + '" class="bet_number custom' + a.id + '">';
        if (a.playCode.indexOf("FixedPlace") > -1 || a.playCode.indexOf("BSOE_PK10") > -1 && "First2SumBSOE_PK10" != a.playCode || a.playCode.indexOf("Fixed_PK10") > -1 ? c += "<li>" + TCG.Prop("play_name_" + a.playId) + lott.aloneDigitConversion(b, a.digit) + "</li>" : c += '<li class="f-data-fix">' + TCG.Prop("play_name_" + a.playId) + "</li>", a.playCode.indexOf("st2BSOE") > -1) {
            var d = a.ball.split("_");
            c += '<li class="Gcustom">' + lott.BSOEConversion(d[0]) + " | " + lott.BSOEConversion(d[1]) + '<span class="cm_number hide">' + lott.BSOEConversion(d[0]) + " | " + lott.BSOEConversion(d[1]) + "</span></li>"
        } else if ("OECounts_11X5" == a.playCode || a.playCode.indexOf("BSOE_PK10") > -1) c += '<li class="Gcustom">' + lott.BSOEConversion(a.ball) + '<span class="cm_number hide">' + lott.BSOEConversion(a.ball) + "</span></li>";
        else if (a.playCode.indexOf("Dragon_Tiger") > -1) c += '<li class="Gcustom">' + ("1" == a.ball ? "龙" : "虎") + '<span class="cm_number hide">' + ("1" == a.ball ? "龙" : "虎") + "</span></li>";
        else {
            var e = "",
                f = "";
            if (a.ball.indexOf("@") > -1) {
                var g = a.ball.split("@");
                f = "(" + lott.bitsConversion(g[0]) + ")", e = g[1]
            } else e = a.ball;
            var h = e.length <= 100 ? control.strSub(e, 10 - f.length).replace(new RegExp("_", "gm"), " | ") : control.strSub(e, 10 - f.length).replace(new RegExp(",", "gm"), " | ").replace(new RegExp("_", "gm"), ","),
                i = e.length <= 100 ? e.replace(new RegExp("_", "gm"), " | ") : control.strSub(e, 100).replace(new RegExp(",", "gm"), " | ").replace(new RegExp("_", "gm"), ",") + '<label cart-id="' + a.id + '" cart-field="more" style="cursor: pointer;">详细</label>';
            c += '<li class="Gcustom">' + control.strSub(f + h, 7) + '<span class="cm_number hide">' + f + i + "</span></li>"
        }
        c += '<li class="fxChzz">' + TCG.Prop("betting_mode_" + a.betModeId) + "</li>", c += '<li class="orderStakes">' + a.stakes + "</li>", c += '<li class="tz-mainWrp">' + a.multiple + "</li>", c += '<li class="orderAmount">' + lott.formatNumber(a.amount * a.multiple, 4) + "</li>", c += '<li cart-field="del" class="game-icons cancel-x" cart-id="' + a.id + '">&nbsp;</li>', c += "</ul>", $("#betCartContent").prepend(c), $(document).off("click", "#betCartContent li[cart-field='del']").on("click", "#betCartContent li[cart-field='del']", function() {
            var a = $(this).attr("cart-id");
            $(this).parent().remove();
            for (var b = 0; b < globalVar.currentCart.length; b++) 1 * globalVar.currentCart[b].id == 1 * a && globalVar.currentCart.splice(b, 1);
            lott.calculateCartBuyAmount(), lott.betButtonStyleListener()
        }), a.ball.length > 100 && $("#betCartContent label[cart-field='more']").off("click").on("click", function() {
            for (var a = $(this).attr("cart-id"), b = "", c = 0; c < globalVar.currentCart.length; c++) 1 * globalVar.currentCart[c].id == 1 * a && (b = globalVar.currentCart[c].ball);
            "11X5" == globalVar.currentLottery.series[0].gameGroup ? (b = b.replace(/[_\-]+/g, " "), b = b.replace(/[,]+/g, ";")) : (b = b.replace(/[_]+/g, ""), b = b.replace(/[,]+/g, ";"));
            TCG.WinOpen({
                text: '<dl class="manualBetting"><dd style="width:1200px;height:600px;margin:0 auto;"><textarea id="manualEntryDetail" cols="40" rows="24" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off"></textarea></dd></dl>',
                width: "1270px",
                height: "600px"
            }, function() {
                $("#manualEntryDetail").val("正在载入,请稍后..."), window.setTimeout(function() {
                    $("#manualEntryDetail").val(b)
                }, 50)
            }, function() {})
        })
    },
    createShortcutBetContent: function(a, b, c, d, e) {
        var f = {
                id: globalVar.cartId,
                ball: a,
                type: b,
                playId: globalVar.playId,
                betModeId: globalVar.currentLottery.betMode.id,
                series: globalVar.currentLottery.betSeries,
                multiple: c,
                digit: d,
                stakes: e,
                amount: lott.formatNumber(1 * e * (1 * globalVar.singleStakesPrice) * globalVar.currentLottery.betMode.unit, 4),
                betModeUnit: globalVar.currentLottery.betMode.unit,
                playCode: globalVar.playCode
            },
            g = globalVar.currentCart.push(f);
        return globalVar.cartId++, g - 1
    },
    calculateCartBuyAmount: function() {
        for (var a = 0, b = 0, c = 0, d = 0; d < globalVar.currentCart.length; d++) a = 1 * a + 1 * globalVar.currentCart[d].stakes, b = 1 * b + 1 * globalVar.currentCart[d].amount, c = 1 * c + 1 * globalVar.currentCart[d].amount * (1 * globalVar.currentCart[d].multiple);
        globalVar.multipTotalAmount = c, globalVar.singleTotalAmount = b, globalVar.singleTotalStakes = a, $("#totalStakes").text(globalVar.singleTotalStakes), $("#totalAmount").text(lott.formatNumber(globalVar.multipTotalAmount, 4))
    },
    clearSelectionBall: function(a) {
        if (a)
            for (var b = globalVar.currentLottery.series[0].gameGroup, c = 0; c < a.length - 1; c++) "11X5" === b || "PK10" == b && (-1 == globalVar.playCode.indexOf("BSOE_PK10") || -1 == globalVar.playCode.indexOf("Dragon_Tiger")) ? a[a.length - 1][a[c]] = [] : a[a.length - 1][a[c]] = "", $("#lott_ranks_" + a[c] + ">dl>dt").removeClass("selected"), 0 == globalVar.playCode.indexOf("Dragon_Tiger") && $("#lott_ranks_" + a[c] + ">dl>div").removeClass("active");
        globalVar.selectionBallStakes = 0, globalVar.selectionBallAmount = 0, $("#selectionBallStakes").text(globalVar.selectionBallStakes), $("#selectionBallAmount").text(lott.formatNumber(globalVar.selectionBallAmount, 4))
    },
    betButtonStyleListener: function() {
        globalVar.currentCart.length > 0 ? ($("#confirmBetOrder").hasClass("enable") || $("#confirmBetOrder").addClass("enable"), $("#chaseBetOrder").hasClass("enable") || $("#chaseBetOrder").addClass("enable"), $("#clearBetCart").hasClass("enable") || $("#clearBetCart").addClass("enable")) : ($("#confirmBetOrder").removeClass("enable"), $("#chaseBetOrder").removeClass("enable"), $("#clearBetCart").removeClass("enable"))
    },
    buttonClickEvents: function(a, b, c) {
        $(document).off(a, b).on(a, b, function() {
            $(this).hasClass("enable") && ($(this).hasClass("processing") || ($(this).addClass("processing"), c && c(this)))
        })
    },
    betBtnEvents: function() {
        lott.buttonClickEvents("click", "#confirmBetOrder", function(a) {
            lott.confirmBetOrder(a, !1, null)
        })
    },
    clearBetCart: function() {
        lott.buttonClickEvents("click", "#clearBetCart", function(a) {
            lott.clearCart(), $(a).removeClass("processing")
        })
    },
    chase: {
        numeroList: [],
        maxChaseCount: 0,
        currNumero: "",
        selected: {
            sort: "",
            numero: ""
        },
        isChase: !1,
        historys: {
            sameMultiples: {},
            addMultiples: {},
            profitMargin: {}
        },
        listNumeros: function(a) {
            TCG.Ajax({
                url: "lgw/numeros/chase/" + globalVar.currentLottery.gameId,
                headers: {
                    Merchant: globalVar.merchantCode,
                    Authorization: window.sessionStorage.getItem("token")
                }
            }, function(b) {
                if (b.maxChaseCount && b.chaseNumeros && b.chaseNumeros.length > 0) {
                    lott.chase.maxChaseCount = b.chaseNumeros.length, lott.chase.numeroList = b.chaseNumeros, lott.chase.currNumero = lott.chase.numeroList[0];
                    for (var c = "", d = 0; d < lott.chase.numeroList.length; d++) {
                        var e = "",
                            f = "";
                        globalVar.currentLottery.numero != lott.chase.numeroList[d] && 0 != d || (e = ' selected="selected"', f = "(当前)"), c += '<option value="' + lott.chase.numeroList[d] + '"' + e + ">" + lott.chase.numeroList[d] + f + "</option>"
                    }
                    $("select[numero-sort]").html(c), a ? (control.customSelect("select[numero-sort]"), $('.tab li[tab-sort="sameMultiples"]').trigger("click")) : lott.chase.refreshChaseContent(lott.chase.selected.sort, lott.chase.selected.numero)
                }
                $(".chaseMultiplesTip").text(function() {
                    var a = $(this).text();
                    $(this).text(a.replace("{chaseMaxMultiples}", b.maxChaseCount))
                })
            })
        },
        refreshChaseContent: function(a, b) {
            var c = $("select[numero-sort='" + a + "'] option[value='" + b + "']"),
                d = 0,
                e = !1;
            if (c.length > 0 ? (e = !0, d = c.get(0).index) : (e = !1, d = 0), $("select[numero-sort='" + a + "']").get(0).selectedIndex = d, 1 * $("input[phase-sort='" + a + "']").val() > lott.chase.maxChaseCount) return void TCG.Alert("alerts", "当前彩种剩余可追号期数为" + lott.chase.maxChaseCount + "期", "XS", function() {
                $("input[phase-sort='" + a + "']").val(lott.chase.maxChaseCount)
            });
            $("select[numero-sort]").trigger("chosen:updated"), lott.chase.historys[a].startNumero && ((globalVar.currentLottery.numero == lott.chase.historys[a].startNumero || !e && b == lott.chase.historys[a].startNumero) && (lott.chase.historys[a].startNumero = lott.chase.currNumero), lott.chase.historys[a].phases && 1 * lott.chase.historys[a].phases > lott.chase.maxChaseCount && (lott.chase.historys[a].phases = lott.chase.maxChaseCount), "profitMargin" == a ? lott.chase.historys.profitMargin.multiples.length > 0 && lott.chase.createProfitMarginOrder(a) : lott.chase.createChaseOrder(a))
        },
        chaseBtnEvents: function() {
            lott.buttonClickEvents("click", "#chaseBetOrder", function(a) {
                TCG.Ajax({
                    url: "xml/lotterypopup.xml",
                    dataType: "html"
                }, function(a) {
                    TCG.WinOpen({
                        text: a,
                        width: "1270px",
                        height: "602px"
                    }, function() {
                        lott.chase.isChase = !0;
                        for (var a = 0, b = 0, c = 1; c < globalVar.currentCart.length; c++) globalVar.currentCart[c - 1].playId != globalVar.currentCart[c].playId && a++, globalVar.currentCart[c - 1].betModeId != globalVar.currentCart[c].betModeId && b++;
                        (a > 0 || b > 0) && $(".tab li[tab-sort='profitMargin']").remove(), lott.chase.listNumeros(!0), lott.chase.checkboxEvents(), $(document).off("click", ".tab li[tab-sort]").on("click", ".tab li[tab-sort]", function() {
                            var a = $(this).attr("tab-sort");
                            switch ($(".tab li[tab-sort]").removeClass("tab-active"), $(this).addClass("tab-active"), $("div[sub-sort]").removeClass("tabShow"), $("div[sub-sort='" + a + "']").addClass("tabShow"), lott.chase.selectNumeroEvents(a), lott.chase.inputPhaseEvents(a), lott.chase.inputMultiplesChangeEvents(a), lott.chase.inputMultiplesClickEvents(a), a) {
                                case "sameMultiples":
                                    lott.chase.sameMultiplesCreateChaseEvents();
                                    break;
                                case "addMultiples":
                                    lott.chase.addMultiplesCreateChaseEvents();
                                    break;
                                case "profitMargin":
                                    lott.chase.profitMarginCreateEvents()
                            }
                            lott.chase.refreshChaseContent(a, lott.chase.historys[a].startNumero), lott.chase.historys[a].totalAmount ? ($("#totalChasePhase").text(lott.chase.historys[a].phases), $("#totalChaseAmount").text(lott.chase.historys[a].totalAmount)) : ($("#totalChasePhase").text("0"), $("#totalChaseAmount").text("0.0000")), lott.chase.chaseBetButtonStyleListener(a)
                        }), lott.chase.chaseBettingEvents()
                    }, function() {
                        $("#chaseBetOrder").removeClass("processing"), lott.chase.maxChaseCount = 0, lott.chase.numeroList = [], lott.chase.currNumero = "", lott.chase.selected = {
                            sort: "",
                            numero: ""
                        }, lott.chase.historys = {
                            sameMultiples: {},
                            addMultiples: {},
                            profitMargin: {}
                        }, lott.chase.isChase = !1
                    })
                })
            })
        },
        checkboxEvents: function() {
            $("#winningStop>span").addClass("active"), $("#abandoning>span").removeClass("active"), $("#abandoning").hide(), $(document).off("click", "#winningStop").on("click", "#winningStop", function() {
                $("#winningStop>span").hasClass("active") ? $("#winningStop>span").removeClass("active") : $("#winningStop>span").addClass("active"), $("#winningStop>span").hasClass("active") || $("#abandoning>span").removeClass("active")
            }), $(document).off("click", "#abandoning").on("click", "#abandoning", function() {
                $("#abandoning>span").hasClass("active") ? $("#abandoning>span").removeClass("active") : $("#abandoning>span").addClass("active"), $("#abandoning>span").hasClass("active") && $("#winningStop>span").addClass("active")
            })
        },
        selectNumeroEvents: function(a) {
            var b = $("select[numero-sort='" + a + "']").val();
            lott.chase.selected = {
                sort: a,
                numero: b
            }, $("select[numero-sort='" + a + "']").on("change", function(b, c) {
                lott.chase.selected = {
                    sort: a,
                    numero: c.selected
                }
            })
        },
        inputPhaseEvents: function(a) {
            $("input[phase-sort='" + a + "']").off("focus").on("focus", function() {
                $(this).select()
            }), $(document).off("change", "input[phase-sort='" + a + "']").on("change", "input[phase-sort='" + a + "']", function() {
                var b = $(this).val();
                return /^[1-9]\d*$/.test(b) ? 1 * b > lott.chase.maxChaseCount ? void TCG.Alert("alerts", "当前彩种的最大追号期数不能超过" + lott.chase.maxChaseCount + "期", "XS", function() {
                    $("input[phase-sort='" + a + "']").val(lott.chase.maxChaseCount)
                }) : void 0 : void TCG.Alert("alerts", "您输入的追号期数格式不正确<br/>只能输入大于或等于1的整数", "XS", function() {
                    $("input[phase-sort='" + a + "']").val(1)
                })
            })
        },
        inputMultiplesChangeEvents: function(a) {
            $("input[mult-sort='" + a + "']").off("focus").on("focus", function() {
                $(this).select()
            }), $(document).off("change", "input[mult-sort='" + a + "']").on("change", "input[mult-sort='" + a + "']", function() {
                var b = $(this).val();
                return /^[1-9]\d*$/.test(b) ? 1 * b > globalVar.currentLottery.betMaxMult ? void TCG.Alert("alerts", "您的最大投注倍数不能超过" + globalVar.currentLottery.betMaxMult + "倍", "XS", function() {
                    $("input[mult-sort='" + a + "']").val(globalVar.currentLottery.betMaxMult)
                }) : void 0 : void TCG.Alert("alerts", "您输入的投注倍数格式不正确<br/>只能输入大于或等于1的整数", "XS", function() {
                    $("input[mult-sort='" + a + "']").val(1)
                })
            })
        },
        inputMultiplesClickEvents: function(a) {
            $(document).off("click", "span[" + a + "='reduce'],span[" + a + "='add']").on("click", "span[" + a + "='reduce'],span[" + a + "='add']", function() {
                var b = $(this).attr(a),
                    c = $('input[mult-sort="' + a + '"]').val();
                switch (b) {
                    case "reduce":
                        if (1 * c <= 1) return;
                        c = 1 * c - 1, $('input[mult-sort="' + a + '"]').val(c);
                        break;
                    case "add":
                        if (1 * c >= globalVar.currentLottery.betMaxMult) return;
                        c = 1 * c + 1, $('input[mult-sort="' + a + '"]').val(c)
                }
            })
        },
        createChaseOrder: function(a) {
            lott.chase.historys[a].multiples = [];
            for (var b = lott.chase.numeroList.indexOf(lott.chase.historys[a].startNumero), c = "", d = 0, e = lott.chase.historys[a].multiple, f = 0; f < 1 * lott.chase.historys[a].phases; f++) {
                var g = lott.formatNumber(e * globalVar.singleTotalAmount, 4);
                lott.chase.historys[a].multiples.push(1 * e), c += '<div class="checkbox-lot-table"><dl class="tz_title_content2">', c += "<dt>" + lott.chase.numeroList[b] + "</dt>", c += "<dt>" + e + "</dt>", c += "<dt>" + g + "</dt>", d = lott.formatNumber(1 * d + 1 * g, 4), c += "<dt>" + d + "</dt>", c += "</dl></div>", "addMultiples" == a && (f + 1) % (1 * lott.chase.historys[a].intervalPhase) == 0 && (e *= lott.chase.historys[a].intervalMultiples), b++
            }
            $('div[chase-content="' + a + '"]').html(c), lott.chase.historys[a].totalAmount = d, $("#totalChasePhase").text(lott.chase.historys[a].phases), $("#totalChaseAmount").text(d), lott.chase.chaseBetButtonStyleListener(a)
        },
        sameMultiplesCreateChaseEvents: function() {
            $("dt[create-chase='sameMultiples']").off("focus").on("focus", function() {
                $(this).select()
            }), $(document).off("click", "dt[create-chase='sameMultiples']").on("click", "dt[create-chase='sameMultiples']", function() {
                var a = $("select[numero-sort='sameMultiples']").val(),
                    b = $("input[phase-sort='sameMultiples']").val(),
                    c = $('input[mult-sort="sameMultiples"]').val();
                return 1 * c > globalVar.currentLottery.betMaxMult ? void TCG.Alert("alerts", "您的最大投注倍数不能超过" + globalVar.currentLottery.betMaxMult + "倍", "XS", function() {
                    $("input[mult-sort='sameMultiples']").val(globalVar.currentLottery.betMaxMult)
                }) : 1 * b > lott.chase.maxChaseCount ? void TCG.Alert("alerts", "当前彩种的剩余追号期数为" + lott.chase.maxChaseCount + "期", "XS", function() {
                    $("input[phase-sort='sameMultiples']").val(lott.chase.maxChaseCount)
                }) : (lott.chase.historys.sameMultiples = {
                    startNumero: a,
                    phases: b,
                    multiple: c
                }, void lott.chase.createChaseOrder("sameMultiples"))
            })
        },
        addMultiplesCreateChaseEvents: function() {
            $("input[phase-sort='intervalPhase']").off("focus").on("focus", function() {
                $(this).select()
            }), $(document).off("change", "input[phase-sort='intervalPhase']").on("change", "input[phase-sort='intervalPhase']", function() {
                var a = $(this).val(),
                    b = $('input[phase-sort="addMultiples"]').val();
                return /^[1-9]\d*$/.test(a) ? 1 * a > 1 * b ? void TCG.Alert("alerts", "间隔期数不能超过您输入的追号期数<br/>目前最大间隔为" + b + "期", "XS", function() {
                    $("input[phase-sort='intervalPhase']").val(b)
                }) : void 0 : void TCG.Alert("alerts", "您输入的间隔期数格式不正确<br/>只能输入大于或等于1的整数", "XS", function() {
                    $("input[phase-sort='intervalPhase']").val(1)
                })
            }), $("input[mult-sort='intervalMultiples']").off("focus").on("focus", function() {
                $(this).select()
            }), $(document).off("change", "input[mult-sort='intervalMultiples']").on("change", "input[mult-sort='intervalMultiples']", function() {
                var a = $(this).val(),
                    b = $("input[mult-sort='addMultiples']").val();
                if (!/^[1-9]\d*$/.test(a)) return void TCG.Alert("alerts", "您输入的隔期倍数格式不正确<br/>只能输入大于或等于1的整数", "XS", function() {
                    $("input[mult-sort='intervalMultiples']").val(1)
                });
                if (1 * a * b > globalVar.currentLottery.betMaxMult) {
                    var c = lott.formatNumber(1 * globalVar.currentLottery.betMaxMult / (1 * b), 0, "N");
                    return void TCG.Alert("alerts", "您的最大隔期倍数不能超过" + c + "倍", "XS", function() {
                        $("input[mult-sort='intervalMultiples']").val(c)
                    })
                }
            }), $("dt[create-chase='addMultiples']").off("focus").on("focus", function() {
                $(this).select()
            }), $(document).off("click", "dt[create-chase='addMultiples']").on("click", "dt[create-chase='addMultiples']", function() {
                var a = $("select[numero-sort='addMultiples']").val(),
                    b = $("input[phase-sort='addMultiples']").val(),
                    c = $('input[mult-sort="addMultiples"]').val(),
                    d = $("input[phase-sort='intervalPhase']").val(),
                    e = $("input[mult-sort='intervalMultiples']").val();
                if (1 * b > lott.chase.maxChaseCount) return void TCG.Alert("alerts", "当前彩种的剩余追号期数为" + lott.chase.maxChaseCount + "期", "XS", function() {
                    $("input[phase-sort='addMultiples']").val(lott.chase.maxChaseCount)
                });
                if (!/^[1-9]\d*$/.test(d)) return void TCG.Alert("alerts", "您输入的间隔期数格式不正确<br/>只能输入大于或等于1的整数", "XS", function() {
                    $("input[phase-sort='intervalPhase']").val(1)
                });
                if (1 * d > 1 * b) return void TCG.Alert("alerts", "间隔期数不能超过您输入的追号期数<br/>目前最大间隔为" + b + "期", "XS", function() {
                    $("input[phase-sort='intervalPhase']").val(b)
                });
                if (1 * c * e > globalVar.currentLottery.betMaxMult) {
                    var f = lott.formatNumber(1 * globalVar.currentLottery.betMaxMult / (1 * c), 0, "N");
                    return void TCG.Alert("alerts", "您的最大隔期倍数不能超过" + f + "倍", "XS", function() {
                        $("input[mult-sort='intervalMultiples']").val(f)
                    })
                }
                for (var g = 1 * c, h = !0, i = 0; i < 1 * b; i++)
                    if ((i + 1) % (1 * d) == 0 && (g *= e), g > globalVar.currentLottery.betMaxMult) {
                        h = !1;
                        break
                    }
                if (!h) return void TCG.Alert("alerts", "您的翻倍计划无法生成<br/>因为隔期倍数超过系统上限", "XS", function() {
                    $("input[mult-sort='intervalMultiples']").val(1)
                });
                lott.chase.historys.addMultiples = {
                    startNumero: a,
                    phases: b,
                    multiple: c,
                    intervalPhase: d,
                    intervalMultiples: e
                }, lott.chase.createChaseOrder("addMultiples")
            })
        },
        chaseBetButtonStyleListener: function(a) {
            lott.chase.historys[a].totalAmount && 1 * lott.chase.historys[a].totalAmount > 0 ? $("#chaseConfirmOrder").addClass("enable") : $("#chaseConfirmOrder").removeClass("enable")
        },
        chaseBettingEvents: function() {
            lott.buttonClickEvents("click", "#chaseConfirmOrder", function(a) {
                lott.confirmBetOrder(a, !1, null)
            })
        },
        profitMarginCreateEvents: function() {
            $(document).off("change", "#lowestYield").on("change", "#lowestYield", function() {
                /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/.test($(this).val()) || TCG.Alert("alerts", "您输入的最低收益率格式不正确<br/>只能输入正整数或小数!", "XS", function() {
                    $("#lowestYield").val(50)
                })
            }), $(document).off("click", "dt[create-chase='profitMargin']").on("click", "dt[create-chase='profitMargin']", function() {
                var a = $("select[numero-sort='profitMargin']").val(),
                    b = $("input[phase-sort='profitMargin']").val(),
                    c = $('input[mult-sort="profitMargin"]').val(),
                    d = $("#lowestYield").val();
                return 1 * c > globalVar.currentLottery.betMaxMult ? void TCG.Alert("alerts", "您的最大投注倍数不能超过" + globalVar.currentLottery.betMaxMult + "倍", "XS", function() {
                    $("input[mult-sort='profitMargin']").val(globalVar.currentLottery.betMaxMult)
                }) : 1 * b > lott.chase.maxChaseCount ? void TCG.Alert("alerts", "当前彩种的剩余追号期数为" + lott.chase.maxChaseCount + "期", "XS", function() {
                    $("input[phase-sort='profitMargin']").val(lott.chase.maxChaseCount)
                }) : (lott.chase.historys.profitMargin = {
                    startNumero: a,
                    phases: b,
                    multiple: c,
                    yield: d
                }, void lott.chase.createProfitMarginOrder("profitMargin"))
            })
        },
        createProfitMarginOrder: function(a) {
            lott.chase.historys[a].multiples = [];
            var b = lott.chase.numeroList.indexOf(lott.chase.historys[a].startNumero),
                c = "",
                d = 0,
                e = lott.chase.historys[a].multiple,
                f = globalVar.playBonus[globalVar.currentCart[0].playCode].split(",")[0],
                g = globalVar.currentLottery.series[0].gameGroup,
                h = globalVar.currentCart[0].betModeUnit,
                i = 0;
            i = "11X5" == g ? 1980 : 2e3;
            for (var j = 0; j < 1 * lott.chase.historys[a].phases; j++) {
                1 == j && (e = j);
                var k = lott.chase.calculateProfitMargin(1 * e, 1 * f, i, 1 * d, 1 * lott.chase.historys.profitMargin.yield, h);
                if (!k) break;
                e = 1 * k[5], d = 1 * k[1], lott.chase.historys[a].multiples.push(1 * e), c += '<div class="checkbox-lot-table"><dl class="tz_title_content2">', c += '<dt class="ch1-fixesA">' + lott.chase.numeroList[b] + "</dt>", c += '<dt class="ch1-fixesB">' + e + "</dt>", c += '<dt class="ch1-fixesC">' + k[0] + "</dt>", c += '<dt class="ch1-fixesD">' + lott.formatNumber(d, 4) + "</dt>", c += '<dt class="ch1-fixesE">' + k[2] + "</dt>", c += '<dt class="ch1-fixesF">' + k[4] + "</dt>", c += "</dl></div>", b++
            }
            $('div[chase-content="' + a + '"]').html(c), lott.chase.historys[a].totalAmount = d, $("#totalChasePhase").text(lott.chase.historys[a].phases), $("#totalChaseAmount").text(lott.formatNumber(d, 4)), lott.chase.chaseBetButtonStyleListener(a)
        },
        calculateProfitMargin: function(a, b, c, d, e, f) {
            for (;;) {
                if (1 * a <= 1 * globalVar.currentLottery.betMaxMult) {
                    var g = 0;
                    g = (a * b * f * (globalVar.currentLottery.betSeries / c * 2) - (1 * d + a * globalVar.singleTotalAmount)) / (1 * d + a * globalVar.singleTotalAmount) * 100;
                    if (1 * lott.formatNumber(g, 4) < 1 * e) {
                        a = 1 * a + 1;
                        continue
                    }
                    break
                }
                return void TCG.Alert("alerts", "您原计划实现" + lott.chase.historys.profitMargin.phases + "期,实际实现" + lott.chase.historys.profitMargin.multiples.length + "期", "XS", function() {
                    lott.chase.historys.profitMargin.phases = 0 == lott.chase.historys.profitMargin.multiples.length ? 1 : lott.chase.historys.profitMargin.multiples.length, $("input[phase-sort='profitMargin']").val(lott.chase.historys.profitMargin.phases)
                })
            }
            var h = lott.formatNumber(a * globalVar.singleTotalAmount, 4);
            d = lott.formatNumber(1 * d + 1 * h, 4);
            var i = lott.formatNumber(a * b * f * (globalVar.currentLottery.betSeries / c * 2), 4, "N"),
                j = lott.formatNumber(1 * i - 1 * d, 4, "N"),
                k = lott.formatNumber(1 * j / d * 1, 4);
            return [h, d, i, j, lott.formatNumber(100 * k, 2), a]
        }
    },
    confirmBetOrder: function(a, b, c) {
        if (!globalVar.currentLottery.isSale) return TCG.Alert("alerts", "当前彩种暂时没有开始销售,请稍后再试"), b && lott.clearShortcutContent(), void $(a).removeClass("processing");
        var d = $('input[name="betMultiple"]').val(),
            e = 0,
            f = 0;
        0 == globalVar.playCode.indexOf("Any4Com") || 0 == globalVar.playCode.indexOf("Any3Com") || 0 == globalVar.playCode.indexOf("Any3Sum") || 0 == globalVar.playCode.indexOf("Any2Com") || 0 == globalVar.playCode.indexOf("Any2Sum") ? (e = globalVar.selectionBallAmount * globalVar.anyBitScheme.length, f = globalVar.selectionBallStakes * globalVar.anyBitScheme.length) : (e = globalVar.selectionBallAmount, f = globalVar.selectionBallStakes);
        var g = b ? d * e * globalVar.currentLottery.betMode.unit : globalVar.multipTotalAmount,
            h = b ? f : globalVar.singleTotalStakes,
            i = lott.chase.isChase ? lott.formatNumber(lott.chase.historys[lott.chase.selected.sort].totalAmount, 4) : lott.formatNumber(g, 4),
            j = window.sessionStorage.getItem("LOTTWallet");
        if (1 * i > 1 * globalVar.currentLottery.betMaxAmount) return TCG.Alert("alerts", "您目前的投注金额大于最大可投注金额<br/>当前模式最大投注金额为" + globalVar.currentLottery.betMaxAmount + "元!"), b && lott.clearShortcutContent(), void $(a).removeClass("processing");
        if (1 * j < 1 * i) return void lott.autoTransfer(a, b, c);
        var k = "";
        k += '<div class="x-pop lott-rs-cont">', k += "<h2>请确认投注信息</h2>";
        var l = "";
        l = lott.chase.isChase ? lott.chase.historys[lott.chase.selected.sort].startNumero == globalVar.currentLottery.numero && globalVar.currentLottery.isLockTimes ? $('span[bet-timer="currNumero"]').attr("next-numero") : lott.chase.historys[lott.chase.selected.sort].startNumero : globalVar.currentLottery.isLockTimes ? $('span[bet-timer="currNumero"]').attr("next-numero") : globalVar.currentLottery.numero, k += "<p>" + TCG.Prop("gameName_" + globalVar.currentLottery.game) + "第" + l + "期</p>", k += '<dl class="lott-rs-pop clearfix" style="display: block;">', k += "<dt>注数:</dt><dd>" + h + "注</dd>", k += "<dt>投注金额:</dt><dd>" + i + "</dd>", k += "<dt>是否追号:</dt><dd>" + (lott.chase.isChase ? "是" : "否") + "</dd>", k += "</dl></div>", TCG.Confirm(k, "SL", function(d) {
            if (d) {
                var e = "BT" + (new Date).getTime();
                TCG.showLoading();
                var f = lott.assembleOrder(b);
                if (!lott.isEmptyObject(f)) {
                    var g = {};
                    if (g.headers = {
                            Merchant: globalVar.merchantCode,
                            Authorization: window.sessionStorage.getItem("token")
                        }, g.type = "POST", g.dataType = "json", f.bettingSlipString.length > 100) {
                        for (var h = JSON.stringify(f), i = h.length, j = new Uint8Array(i), k = 0; k < i; k++) j[k] = h.charCodeAt(k);
                        var l = window.pako.gzip(j),
                            m = new Uint8Array(l);
                        if (window.FormData) {
                            g.url = "lgw/orders/massive_betting_new";
                            var f = new FormData;
                            f.append("content", m), g.data = f, g.cache = !1, g.processData = !1, g.contentType = !1
                        } else {
                            for (var n = "", o = 0; o < m.length; o++) n += String.fromCharCode(m[o]);
                            var p = window.btoa(n);
                            g.url = "lgw/orders/massive_betting", g.data = {
                                content: p
                            }
                        }
                    } else g.url = "lgw/orders/betting", g.contentType = "application/json", g.data = JSON.stringify(f);
                    window.Supported && Supported.ajaxLog(e, g.url, "start", null, null), TCG.Ajax(g, function(d) {
                        window.Supported && Supported.ajaxLog(e, g.url, "end", "200", JSON.stringify(d)), TCG.hideLoading();
                        var f = '<div class="x-pop lott-rs-cont"><h2>生成订单成功</h2><dl class="lott-rs-pop clearfix" style="display: block;"><dt>订单编号:</dt><dd>' + d.orderNumber + "</dd><dt>投注期号:</dt><dd>" + d.numero + "</dd><dt>投注总额:</dt><dd>" + d.totalBettingAmount.toFixed(4) + "</dd>";
                        TCG.Alert("success", f, "CLL"), lott.chase.isChase && $("#popup_close").trigger("click"), $(a).removeClass("processing"), $(a).removeClass("enable"), b ? (lott.clearSelectionBall(c), lott.clearShortcutContent(), $("#addBallToCart").removeClass("enable"), $("#addTextAreaToCart").removeClass("enable")) : lott.clearCart(), globalVar.textArea && globalVar.textArea.length > 0 && (globalVar.textArea = [], $("#ballInputArea").val("")), control.headerWalletList(), $("li[bet-sort='todayBetHistory']").hasClass("tab-active") && lott.bettingOrderHistoryRecord()
                    }, function(c) {
                        window.Supported && Supported.ajaxLog(e, g.url, "error", c.status, JSON.stringify(c.responseJSON)), b && lott.clearShortcutContent(), $(a).removeClass("processing"), TCG.hideLoading()
                    })
                }
            } else b && lott.clearShortcutContent(), $(a).removeClass("processing")
        })
    },
    assembleOrder: function(a) {
        var b = {};
        if (globalVar.currentCart.length > 0) {
            var c = "",
                d = !1,
                e = !1,
                f = 0,
                g = "";
            if (a)
                for (var h = 0; h < globalVar.shortcutContent.length; h++) {
                    var i = 1 * globalVar.shortcutContent[h],
                        j = "";
                    globalVar.currentCart[i].digit && "" != globalVar.currentCart[i].digit && (j = "~" + globalVar.currentCart[i].digit), c += ";" + globalVar.currentCart[i].ball + "~" + globalVar.currentCart[i].type + "~" + globalVar.currentCart[i].playId + "~" + globalVar.currentCart[i].betModeId + "~" + globalVar.currentCart[i].series + "~" + globalVar.currentCart[i].multiple + j, f = 1 * f + 1 * globalVar.currentCart[i].amount * (1 * globalVar.currentCart[i].multiple)
                } else
                    for (var i = 0; i < globalVar.currentCart.length; i++) {
                        var j = "";
                        globalVar.currentCart[i].digit && "" != globalVar.currentCart[i].digit && (j = "~" + globalVar.currentCart[i].digit), c += ";" + globalVar.currentCart[i].ball + "~" + globalVar.currentCart[i].type + "~" + globalVar.currentCart[i].playId + "~" + globalVar.currentCart[i].betModeId + "~" + globalVar.currentCart[i].series + "~" + globalVar.currentCart[i].multiple + j, f = 1 * f + 1 * globalVar.currentCart[i].amount * (1 * globalVar.currentCart[i].multiple)
                    }
            lott.chase.isChase ? (d = $("#winningStop>span").hasClass("active"), e = $("#abandoning>span").hasClass("active"), f = 1 * lott.chase.historys[lott.chase.selected.sort].totalAmount, g = lott.chase.historys[lott.chase.selected.sort].startNumero) : (d = !1, e = !1, g = globalVar.currentLottery.isLockTimes ? $('span[bet-timer="currNumero"]').attr("next-numero") : globalVar.currentLottery.numero), b = {
                bettingSlipString: c.substring(1),
                winningStop: d,
                abandoning: e,
                gameId: globalVar.currentLottery.gameId,
                betCartAmountSum: lott.formatNumber(f, 4),
                chase: lott.chase.isChase,
                currentNumero: g,
                device: "WEB",
                orderType: 1,
                quickChase: !1,
                prizeModeId: globalVar.currentLottery.prizeModeId
            }, lott.chase.isChase && (b.chaseSlip = {
                numero: lott.chase.historys[lott.chase.selected.sort].startNumero,
                multiples: lott.chase.historys[lott.chase.selected.sort].multiples
            })
        }
        return b
    },
    chartEvent: function() {
        $(document).on("click", ".jp-onel .alignright", function() {
            var a = JSON.stringify(globalVar);
            sessionStorage.setItem("globalVar", a)
        })
    },
    autoTransfer: function(a, b, c) {
        var d = $('input[name="betMultiple"]').val(),
            e = 0;
        e = 0 == globalVar.playCode.indexOf("Any4Com") || 0 == globalVar.playCode.indexOf("Any3Com") || 0 == globalVar.playCode.indexOf("Any3Sum") || 0 == globalVar.playCode.indexOf("Any2Com") || 0 == globalVar.playCode.indexOf("Any2Sum") ? globalVar.selectionBallAmount * globalVar.anyBitScheme.length : globalVar.selectionBallAmount;
        var f = b ? e * d * globalVar.currentLottery.betMode.unit : globalVar.multipTotalAmount,
            g = lott.chase.isChase ? lott.formatNumber(lott.chase.historys[lott.chase.selected.sort].totalAmount, 4) : lott.formatNumber(f, 4),
            h = globalVar.walletList.lotto,
            i = 1 * g - 1 * h.availBalance;
        i < .01 && (i = .01), TCG.Confirm("您的彩票余额不足，请问您是否选择从您的中心钱包余额中扣除" + i.toFixed(4) + "？", "XXS", function(d) {
            if (d) {
                var e = {
                    accountTypeId: h.accountTypeId,
                    amount: i.toFixed(4)
                };
                TCG.showLoading(), TCG.Ajax({
                    url: "./transferFromMainWallet",
                    data: e
                }, function(d) {
                    d.status ? control.headerWalletList(function(e) {
                        TCG.hideLoading(), e ? lott.confirmBetOrder(a, b, c) : (b && lott.clearShortcutContent(), $(a).removeClass("processing"), TCG.Alert("errors", TCG.Prop(d.description), ""))
                    }) : (b && lott.clearShortcutContent(), TCG.hideLoading(), $(a).removeClass("processing"), TCG.Alert("errors", TCG.Prop(d.description), ""))
                })
            } else b && lott.clearShortcutContent(), $(a).removeClass("processing")
        })
    }
};