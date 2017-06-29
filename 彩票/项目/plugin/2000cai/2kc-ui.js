var UI = {
    header: function(a, b) {
        var c = "";
        if (a) {
            c += "<li class='login-nam'>您好，<span data-userinfo='username'>" + b.account.split("@")[1] + "</span>", c += "<dl id='headerLinks' class='sub-wallet-menu hide clearfix'>", c += "<span class='top-arw'></span>", c += "<dt data-modal='personal/gameHistory'>购彩记录</dt>", c += "<dt data-modal='agent/agentRegisterDownline'>精准注册</dt>", c += "<dt data-modal='agent/palStatementsAgent'>报表管理</dt>", c += "<dt data-modal='activity/activityInfo'>优惠活动</dt>", c += "<dt id='headerDownload'>下载中心</dt>", c += "</dl>", c += "</li>", c += "<li class='money-amount balanceWrapper'><p id='showBalance' class='show clearfix'><span class='wallet-lbl'>总余额</span><span id='sumWallet' class='data-wb'></span></p><span id='hideBalance' class='hide'>余额已隐藏</span>&nbsp;<span class='rs-refresh refresh-wallet'></span>&nbsp;<a href='javascript:void(0);' identify='hide' id='isCheckBalance'>隐藏</a>", c += "<dl id='walletList' class='sub-wallet-menu hide clearfix'>", c += "<span class='top-arw'></span>", c += "<dt data-modal='deposit/conversionOfFunds'>中心钱包</dt><dd id='safeBoxWallet'></dd>", c += "<dt data-modal='deposit/conversionOfFunds'>彩票钱包</dt><dd id='LOTTWallet'></dd>", c += "<dt data-modal='deposit/conversionOfFunds'>棋牌钱包</dt><dd id='PVPWallet'></dd>", c += "<dt data-modal='deposit/conversionOfFunds'>AG钱包</dt><dd id='AGWallet'></dd>", c += "<dt data-modal='deposit/conversionOfFunds'>BBIN钱包</dt><dd id='BBINWallet'></dd>", c += "</dl>", c += "</li>", c += "<li class='money-deposit rs-dw-btn'><a id='topDeposit' href='javascript:void(0);' data-modal='deposit'>充值</a></li>", c += "<li class='money-withdrawal rs-dw-btn'><a id='topWithdraw' href='javascript:void(0);' data-modal='deposit/conversionOfFunds'>转账</a></li>", c += "<li class='logout-ico'><a href='javascript:void(0);' id='logout'>&nbsp;</a></li>", c += "<li class='clearfix'></li>", $("#loggedInHeader").html(c), $("body").removeClass("logged-out").addClass("logged-in"), control.headerWalletList(), control.refreshWallet(), control.switchBalance(), control.logout(), $(document).off("click", "#headerDownload").on("click", "#headerDownload", function() {
                window.location.href = "/download.html"
            }), $(document).off("click", "#headerLogout").on("click", "#headerLogout", function() {
                $("#logout").trigger("click")
            })
        } else $("#loggedInHeader").html(""), $("body").removeClass("logged-in").addClass("logged-out");
        $(document).off("click", "#toHomePage").on("click", "#toHomePage", function() {
            "#lottery" == ("" == window.location.hash ? "#lobby" : window.location.hash) && im.unSubscribeDrawResult(globalVar.currentLottery.game), control.clearLottBetTimer(), window.location.href = "index.html"
        }), UI.marquee()
    },
    headerLottery: function() {
        $("#showBalance").html("<span class='wallet-lbl'>彩票钱包</span><span id='LOTTWallet' class='data-wb'></span>");
        var a = "";
        a += "<span class='top-arw'></span>", a += "<dt class='active' data-modal='deposit/conversionOfFunds'>中心钱包</dt><dd id='safeBoxWallet'></dd>", a += "<dt data-modal='deposit/conversionOfFunds'>棋牌钱包</dt><dd id='PVPWallet'></dd>", a += "<dt data-modal='deposit/conversionOfFunds'>AG钱包</dt><dd id='AGWallet'></dd>", a += "<dt data-modal='deposit/conversionOfFunds'>BBIN钱包</dt><dd id='BBINWallet'></dd>", a += "<dt data-modal='deposit/conversionOfFunds'>总余额</dt><dd id='sumWallet'></dd>", $("#walletList").html(a), window.sessionStorage.getItem("LOTTWallet") && ($("#PVPWallet").html(control.customCurrencyFormat(1 * window.sessionStorage.getItem("PVPWallet"), 4)), $("#safeBoxWallet").html(control.customCurrencyFormat(1 * window.sessionStorage.getItem("safeBoxWallet"), 4)), $("#AGWallet").html(control.customCurrencyFormat(1 * window.sessionStorage.getItem("AGWallet"), 4)), $("#BBINWallet").html(control.customCurrencyFormat(1 * window.sessionStorage.getItem("BBINWallet"), 4)), $("#LOTTWallet").html(control.customCurrencyFormat(1 * window.sessionStorage.getItem("LOTTWallet"), 4)), $("#sumWallet").html(control.customCurrencyFormat(sessionStorage.walletBalance, 4)))
    },
    marquee: function() {
        TCG.Ajax({
            url: "./getSystemAnnouncements",
            data: {
                merchantCode: globalVar.merchantCode
            }
        }, function(a) {
            if (a.status) {
                var b = "";
                if (a.result.contentLobby.length > 0) {
                    for (var c = 0; c < a.result.contentLobby.length; c++) b += "<p>" + a.result.contentLobby[c].content + "</p>";
                    $("#marquee").html(b).marquee({
                        allowCss3Support: !0,
                        duration: 3e4,
                        delayBeforeStart: 1e3,
                        gap: 20,
                        direction: "left",
                        duplicated: !0,
                        pauseOnCycle: !0,
                        pauseOnHover: !0,
                        startVisible: !0
                    })
                } else $("#marquee").html("<p>暂时没有滚动公告</p>")
            }
        })
    },
    loadLobbyPage: function(a, b) {
        TCG.Ajax({
            id: ".the-page-content",
            url: "./xml/lobby.xml",
            dataType: "html"
        }, function() {
            UI.lotteryMenus(), a ? UI.afterLogin(b) : ($("#leftMenu dl").addClass("hide"), $("#topMenu ul").addClass("hide"), control.login(), control.forgetPassword(), control.pageMenu("#topRightMenu li,#moreActivity"), control.pageMenu("#carousel img"), ($("body").hasClass("MSIE8") || $("body").hasClass("MSIE9")) && $("input, textarea").placeholder()), control.floatMenu(), control.carousel(), UI.hotGames(), control.indexAnnouncement(), $('[name="username"]').focus(), $('[name="password"]').focus(), $("#loginBtn").focus()
        })
    },
    loadLotteryPage: function() {
        control.clearLottBetTimer(), globalVar.currentLottery = UI.getCurrentLottery(), TCG.showLoading(), $.when(TCG.Ajax({
            url: "lgw/games/" + globalVar.currentLottery.gameId + "/setting",
            headers: {
                Merchant: globalVar.merchantCode,
                Authorization: window.sessionStorage.getItem("token")
            }
        }), TCG.Ajax({
            url: "lgw/games/" + globalVar.currentLottery.gameId + "/play_menu",
            headers: {
                Merchant: globalVar.merchantCode,
                Authorization: window.sessionStorage.getItem("token")
            }
        })).done(function(a, b) {
            globalVar.result.bettingModes = a[0], globalVar.result.lottPlayMenus = b[0], TCG.Ajax({
                id: ".the-page-content",
                url: "xml/lottery.xml",
                dataType: "html"
            }, function() {
                UI.headerLottery(), control.pageMenu("#leftMenu dt,#leftMenu dd,#topDeposit,#topWithdraw"), control.floatMenu(), UI.checkUserType(), null != globalVar.currentLottery && ($("#topLottMenus").addClass(globalVar.currentLottery.game), UI.lotteryMenus(), UI.lottBetTimes(!0), UI.showDrawUI(), im.subscribeDrawResult(globalVar.currentLottery.game, function(a) {
                    var b = JSON.parse(a),
                        c = window.setTimeout(function() {
                            UI.showDrawNumber(b.numero, b.winningNumber), window.clearTimeout(c)
                        }, 1e3);
                    $("li[bet-sort='todayBetHistory']").hasClass("tab-active") && lott.bettingOrderHistoryRecord()
                }), lott.init(), TCG.hideLoading())
            })
        }).fail(function() {
            TCG.hideLoading()
        })
    },
    lotteryMenus: function() {
        var a = window.location.pathname,
            b = "";
        b = "/game-lobby.html" == a ? "#lottery" : "" == window.location.hash ? "#lobby" : window.location.hash;
        var c = lott.lottSort(globalVar.result.games);
        if (c.length > 0) switch (b) {
            case "#lobby":
                UI.lottMenusByLobby(c);
                break;
            case "#lottery":
                UI.lottMenusByLottery(c)
        }
    },
    lottMenusByLobby: function(a) {
        var b = "",
            c = "";
        if (c += '<dl class="sm-link" id="fungames">', c += '<dt class="pvp_game inline-block"></dt>', c += '<dd class="inline-block slider-g-t">娱乐游戏</dd>', c += "</dl>", "false" == window.sessionStorage.getItem("isLogin")) {
            for (var d = 0; d < a.length; d++) {
                if (b += '<dl class="sm-link">', b += '<dt class="' + ("11X5" == a[d].code ? "fx11x5" : a[d].code) + ' inline-block"></dt>', b += '<dd class="inline-block slider-g-t">' + a[d].displayName + "</dd>", b += '<ul class="hide">', a[d].games.length > 0)
                    for (var e = 0; e < a[d].games.length; e++) b += '<li class="' + a[d].games[e].code + '" data-lotto="' + a[d].games[e].gameGroupId + "_" + a[d].games[e].gameId + "_" + a[d].games[e].code + '">' + a[d].games[e].remark + "</li>";
                b += "</ul></dl>"
            }
            $(".slider-menu").html(b + c), UI.lottMenusEvent(".sm-link ul li", !0)
        }
        if ("true" == window.sessionStorage.getItem("isLogin")) {
            var f = globalVar.result.customerSeries,
                g = {};
            if (f.length > 0) {
                for (var d = 0; d < a.length; d++)
                    for (var h = 0; h < f.length; h++)
                        if (a[d].code == f[h].gameGroupCode && (g[a[d].code] = a[d], a[d].games.length > 0))
                            for (var e = 0; e < a[d].games.length; e++) {
                                var i = f[h].gameGroupCode + "_" + a[d].games[e].gameGroupId + "_" + f[h].prizeModeId + "_" + f[h].maxSeries + "_" + f[h].minSeries + "_" + f[h].maxBetSeries + "_" + f[h].defaultSeries;
                                1 * f[h].prizeModeId == 1 && window.sessionStorage.setItem(a[d].games[e].code, i), 1 * f[h].prizeModeId == 2 && window.sessionStorage.setItem(a[d].games[e].code + "_ZY", i)
                            }
                        for (var j in g) {
                            if (b += '<dl class="sm-link">', b += '<dt class="' + ("11X5" == g[j].code ? "fx11x5" : g[j].code) + ' inline-block"></dt>', b += '<dd class="inline-block slider-g-t">' + g[j].displayName + "</dd>", b += '<ul class="hide">', g[j].games.length > 0)
                                for (var e = 0; e < g[j].games.length; e++) b += '<li class="' + g[j].games[e].code + '" data-lotto="' + g[j].games[e].gameGroupId + "_" + g[j].games[e].gameId + "_" + g[j].games[e].code + "_" + g[j].code + '">' + g[j].games[e].remark + "</li>";
                            b += "</ul></dl>"
                        }
            }
            $(".slider-menu").html(b + c), UI.lottMenusEvent(".sm-link ul li", !0), globalVar.series = f, TCG.hideLoading()
        }
    },
    lottMenusByLottery: function(a) {
        var b = '<dl class="gameList hide">',
            c = globalVar.result.customerSeries,
            d = {};
        if (c.length > 0) {
            for (var e = 0; e < a.length; e++)
                for (var f = 0; f < c.length; f++)
                    if (a[e].code == c[f].gameGroupCode && (d[a[e].code] = a[e], a[e].games.length > 0))
                        for (var g = 0; g < a[e].games.length; g++) {
                            var h = c[f].gameGroupCode + "_" + a[e].games[g].gameGroupId + "_" + c[f].prizeModeId + "_" + c[f].maxSeries + "_" + c[f].minSeries + "_" + c[f].maxBetSeries + "_" + c[f].defaultSeries;
                            1 * c[f].prizeModeId == 1 && window.sessionStorage.setItem(a[e].games[g].code, h), 1 * c[f].prizeModeId == 2 && window.sessionStorage.setItem(a[e].games[g].code + "_ZY", h)
                        }
                    for (var i in d) {
                        if (b += '<ul class="group_' + d[i].code + '">', d[i].games.length > 0)
                            for (var g = 0; g < d[i].games.length; g++) b += '<li id="lgGame-' + d[i].games[g].code + '" data-lotto="' + d[i].games[g].gameGroupId + "_" + d[i].games[g].gameId + "_" + d[i].games[g].code + '">' + d[i].games[g].remark + "</li>";
                        b += "</ul>"
                    }
        }
        b += '<ol id="fungames" class="group_games">', b += '<li id="fungames-lobby">娱乐大厅</li>', b += "</ol>", b += "</dl>", $("#topLottMenus").html(b), UI.lottMenusEvent("#topLottMenus ul li", !0), globalVar.series = c, TCG.hideLoading()
    },
    lottMenusEvent: function(a, b) {
        $(document).off("click", a).on("click", a, function() {
            if ("false" == window.sessionStorage.getItem("isLogin")) return void TCG.Alert("alerts", "您还未登录,请先登录!");
            im.unSubscribeDrawResult(globalVar.currentLottery.game);
            var a = $(this).attr("data-lotto"),
                b = a.split("_"),
                c = window.sessionStorage.getItem(b[2]);
            if (null != c && "null" != c && "" != c && void 0 != c || (c = window.sessionStorage.getItem(b[2] + "_ZY")), null == c || "null" == c || "" == c || void 0 == c) return void TCG.Alert("errors", "暂时没有找到可用的奖金系列");
            window.sessionStorage.setItem("currentLottery", a), "/game-lobby.html" == window.location.pathname ? window.location = "index.html#lottery" : window.location.hash = "#lottery", UI.loadLotteryPage()
        }), b && $(document).off("click", "#fungames").on("click", "#fungames", function() {
            return "false" == window.sessionStorage.getItem("isLogin") ? void TCG.Alert("alerts", "您还未登录,请先登录!") : void(window.location = "./game-lobby.html")
        })
    },
    forgotPassword: function() {
        var a = "<dl id='rs-dbox' class='ui-draggable forget-pwd clearfix'>";
        a += "<dt>根据下列方式找回登录密码</dt>", a += "<dd class='to-fpwd' submenu='email'>安全邮箱</dd>", a += "<dd class='to-fpwdf' submenu='customerservices'>联系客服</dd>", a += "<dd class='clearfix'></dd>", a += "</dl>", TCG.WinOpen({
            text: a,
            width: "430px",
            height: "270px",
            transparent: !0
        }, function() {
            $(document).off("click", "#rs-dbox dd").on("click", "#rs-dbox dd", function() {
                var a = $(this).attr("submenu");
                "email" == a && (TCG.WinClose(), control.findPasswordByEmail()), "customerservices" == a && control.customerService()
            })
        })
    },
    popupsModel: function(a) {
        var b = '<div class="popups_model">';
        return b += '<dl class="model_main_menus">', b += '<dt class="deposit_icon" data-modal="deposit"></dt>', b += '<dd data-modal="deposit">充值</dd>', b += '<dt class="withdraw_icon" data-modal="withdrawal"></dt>', b += '<dd data-modal="withdrawal">提款</dd>', b += '<dt class="member_icon" data-modal="personal"></dt>', b += '<dd data-modal="personal">个人</dd>', b += '<dt class="agent_icon" data-modal="agent"></dt>', b += '<dd data-modal="agent">代理</dd>', b += '<dt class="email_icon" data-modal="message/inbox"><span class="hide countUnreadMessage"></span></dt>', b += '<dd data-modal="message/inbox">讯息</dd>', b += '<dt class="service_icon" data-modal="customerservice"></dt>', b += '<dd data-modal="customerservice">客服</dd>', b += '<dt class="help_icon" data-modal="help"></dt>', b += '<dd data-modal="help">帮助</dd>', b += "</dl>", b += '<div class="model_content">', b += '<div class="model_child_menus">', b += UI.modalSubMenu(a), b += "</div>", b += '<div class="model_child_content">', b += "</div>", b += "</div>", b += '<div class="esc_words">', b += "<p>按ESC离开</p>", b += "</div>", b += "</div>"
    },
    modalSubMenu: function(a) {
        var b = "";
        switch (a) {
            case "deposit":
                b += "<p>充值</p>", b += "<ul>", b += "<li data-submenu='quickPayment'>网银支付</li>", b += "<li data-submenu='onlinePayment'>快捷支付</li>", b += "<li data-submenu='channelPayment'>微信支付</li>", b += "<li data-submenu='alipay'>支付宝</li>", b += "<li data-submenu='quickPayment2'>支付宝（银行）</li>", b += "<li data-submenu='conversionOfFunds'>钱包转账</li>", b += "<li data-submenu='depositRecords'>充值记录</li>", b += "</ul>";
                break;
            case "withdrawal":
                b += "<p>提款</p>", b += "<ul>", b += "<li data-submenu='withdrawalRequest'>提款申请</li>", b += "<li data-submenu='withdrawalRecords'>提款记录</li>", b += "<li data-submenu='bindCard'>绑定提款卡</li>", b += "</ul>";
                break;
            case "personal":
                b += "<p>个人</p>", b += "<ul>", b += "<li data-submenu='myProfile'>我的资料</li>", b += "<li data-submenu='bonusDetails'>奖金详情</li>", b += "<li data-submenu='gameHistory'>投注记录</li>", b += "<li data-submenu='norecordChase'>追号记录</li>", b += "<li data-submenu='changeAccount'>帐变明细</li>", b += "<li data-submenu='palStatementsPersonal'>盈亏报表</li>", b += "<li data-submenu='changePassword'>登录密码</li>", b += "<li data-submenu='modfndPassword'>资金密码</li>", b += "<li data-submenu='ssSettings'>设置密保</li>", b += "</ul>";
                break;
            case "agent":
                b += "<p>代理</p>", b += "<ul>", b += "<li data-submenu='agentRegisterDownline'>精准注册</li>", b += "<li data-submenu='agentGenerateAffiliateUrl'>链接注册</li>", b += "<li data-submenu='linkManager'>链接管理</li>", b += "<li data-submenu='memberManagement'>会员管理</li>", b += "<li data-submenu='agentDownlineTransactionDetails'>帐变明细</li>", b += "<li data-submenu='palStatementsAgent'>盈亏报表</li>", b += "<li data-submenu='agentTeamBetting'>团队投注</li>", b += "<li data-submenu='agentTeamIncomeReport'>团队收入</li>", b += "<li data-submenu='agentRevenueReport'>我的收入</li>", !0 === globalVar.enableDividentRecord && (b += "<li data-submenu='agentDividendRecord'>分红管理</li>"), !0 === globalVar.enableSalaryRecord && (b += "<li data-submenu='dailySalaryReport'>签约日工资</li>"), b += "</ul>";
                break;
            case "message":
                b += "<p>讯息</p>", b += "<ul>", b += "<li data-submenu='writeMessage'>编写讯息</li>", b += "<li data-submenu='inbox'>已收讯息</li>", b += "<li data-submenu='sentMessages'>已发讯息</li>", b += "</ul>";
                break;
            case "help":
                b += "<p>帮助</p>", b += "<ul>", b += "<li data-submenu='helpPlayPrize'>玩法奖金</li>", b += "<li data-submenu='helpDepositRelated'>充值相关</li>", b += "<li data-submenu='helpYourWithdrawal'>提款相关</li>", b += "<li data-submenu='helpAccountNumbers'>帐号相关</li>", b += "<li data-submenu='helpBonusBettingIssues'>常见问题</li>", b += "<li data-submenu='helpInstallation'>安装帮助</li>", b += "<li data-submenu='helpAboutUs'>关于我们</li>", b += "</ul>";
                break;
            case "activity":
                b += "<p>公告</p>", b += "<ul>", b += "<li data-submenu='managePromotions'>奖励中心</li>", b += "<li data-submenu='announcement'>公告新闻</li>", b += "<li data-submenu='activityInfo'>活动资讯</li>", b += "</ul>"
        }
        return b
    },
    afterLogin: function(a) {
        control.countUnreadMessage(), $("#leftMenu dl").removeClass("hide"), $("#topMenu ul").removeClass("hide");
        var b = "<dl class='rs-tc-vam'>";
        b += "<dt class='icon profile-icon'></dt>", b += "<dd class='welcome'>欢迎您</dd>", b += "<dd class='accnt-uname' data-userInfo='nickname'>" + (null == a.nickname ? "用户尚无昵称" : a.nickname) + "</dd>", b += "<dt class='abal-cont'>余额: ", b += "<span class='bal-amnt' id='afterLoginBalance' data-walletbalance='ALL'>" + a.totalAmount + "</span></dt>", b += "</div>", b += "</div>", b += "<dt class='last-logged-in'>上次登录 <span data-userInfo='lastLogin'>" + a.lastLoginTimes + "</span></dt>", b += "<dd class='depo-cont-btn sbmt-center'>", b += "<input class='depo-btn red-submt-btn' type='button' value='立即充值' data-modal='deposit' id='afterLoginDeposit'/>", b += "</dd>", b += "<dd id='helpDeposit' class='inline-block how-to-deposit' data-modal='help/helpDepositRelated'>如何充值</dd>", b += "<dd id='helpWithdraw' class='inline-block withdraw-notice' data-modal='help/helpYourWithdrawal'>提款须知</dd>", b += "<dd class='clearfix'></dd>", b += "</dl>", $("#accountInfo").html(b).removeClass("acct-out").addClass("acct-in"), control.pageMenu("#leftMenu dt,#leftMenu dd,#topMenu li, #afterLoginDeposit, #helpDeposit, #helpWithdraw, #topDeposit, #topWithdraw, #moreActivity, #headerLinks dt, #walletList dt"), UI.checkUserType()
    },
    checkUserType: function() {
        null != sessionStorage.getItem("isAgent") && 1 * sessionStorage.getItem("isAgent") == 0 && $("[data-modal^='agent']").remove()
    },
    hotGames: function() {
        var a = (new Date).getTime();
        TCG.Ajax({
            url: "lgw/games/popular",
            headers: {
                Merchant: globalVar.merchantCode
            },
            data: {
                count: globalVar.hotGameCount
            }
        }, function(b) {
            var c = "";
            if (b.length > 0) {
                for (var d = (new Date).getTime(), e = 0; e < b.length; e++) c += '<li class="' + b[e].gameCode + '">', c += '<span class="box-title"></span>', c += '<em lott-numero="' + b[e].gameCode + '" numero="' + b[e].numero + '"></em>', c += '<span lott-bet-times="' + b[e].gameCode + '" bet-times="' + Math.floor((b[e].remainTime - (d - a) / 2) / 1e3) + '" isSale="' + b[e].isSale + '" class="time-box"></span>', c += '<div class="btn hm-btn icon" lott-bet-btn="' + b[e].gameCode + '" data-lotto="Nl_' + b[e].gameId + "_" + b[e].gameCode + '">立即投注</div>', c += "</li>";
                if (c += '<div class="clearfix"></div>', $("#hotGameMenus").html(c), UI.lottMenusEvent("div[lott-bet-btn]", !1), control.clearLottBetTimer(), "false" != window.sessionStorage.getItem("isLogin")) {
                    var f = window.setInterval(control.hotGamesTimer, 1e3);
                    globalVar.lottBetTimer.push(f)
                }
            }
        })
    },
    refreshHotGamesUi: function() {
        $("em[lott-numero]").each(function(a) {
            var b = $(this).attr("lott-numero"),
                c = $("em[lott-numero='" + b + "']").attr("numero");
            $("em[lott-numero='" + b + "']").text("距离" + c + "期开奖");
            var d = $("span[lott-bet-times='" + b + "']").attr("bet-times");
            "false" == $("span[lott-bet-times='" + b + "']").attr("isSale") ? $("span[lott-bet-times='" + b + "']").text("--:--:--") : $("span[lott-bet-times='" + b + "']").text(UI.fmtTimeTohhmmss(1 * d, "hh:mm:ss")), d--, $("span[lott-bet-times='" + b + "']").attr("bet-times", d)
        })
    },
    refreshHotGames: function() {
        var a = (new Date).getTime();
        TCG.Ajax({
            url: "lgw/games/popular",
            headers: {
                Merchant: globalVar.merchantCode
            },
            data: {
                count: globalVar.hotGameCount
            },
            error: function(a) {
                UI.refreshHotGamesUi()
            }
        }, function(b) {
            if (b.length > 0) {
                for (var c = (new Date).getTime(), d = 0; d < b.length; d++) $("em[lott-numero='" + b[d].gameCode + "']").attr("numero", b[d].numero), $("span[lott-bet-times='" + b[d].gameCode + "']").attr("bet-times", Math.floor((b[d].remainTime - (c - a) / 2) / 1e3)), $("span[lott-bet-times='" + b[d].gameCode + "']").attr("isSale", b[d].isSale);
                UI.refreshHotGamesUi()
            }
        })
    },
    fmtTimeTohhmmss: function(a, b) {
        var c = "";
        if (a || (a = 0), "hh:mm:ss" == b) {
            var d = Math.floor(a % 60),
                e = Math.floor(a / 60),
                f = Math.floor(e % 60),
                g = Math.floor(e / 60);
            (!d || d < 0) && (d = 0), (!f || f < 0) && (f = 0), (!g || g < 0) && (g = 0), c = (g < 10 ? "0" + g : g) + ":" + (f < 10 ? "0" + f : f) + ":" + (d < 10 ? "0" + d : d)
        }
        if ("mm:ss" == b) {
            var d = Math.floor(a % 60),
                f = Math.floor(a / 60);
            (!d || d < 0) && (d = 0), (!f || f < 0) && (f = 0), c = (f < 10 ? "0" + f : f) + ":" + (d < 10 ? "0" + d : d)
        }
        return c
    },
    lottBetTimes: function(a) {
        var b = (new Date).getTime();
        TCG.Ajax({
            url: "lgw/numeros/near",
            headers: {
                Merchant: globalVar.merchantCode,
                Authorization: window.sessionStorage.getItem("token")
            },
            data: {
                gameId: globalVar.currentLottery.gameId
            }
        }, function(c) {
            if (c.currentNumero) {
                var d = (new Date).getTime();
                $('span[bet-timer="currNumero"]').attr("numero", c.currentNumero.numero), $('p[bet-timer="bet-times"]').attr("bet-times", Math.floor((c.currentNumero.remainTime - (d - b) / 2) / 1e3)), $('p[bet-timer="bet-times"]').attr("lock-times", Math.floor(1 * c.currentNumero.lockTime)), globalVar.currentLottery.isSale = c.currentNumero.isSale
            }
            if (c.previousNumero && ($('span[bet-timer="lastNumero"]').attr("numero", c.previousNumero.numero), $('span[bet-timer="lastNumero"]').text(c.previousNumero.numero)), c.nextNumero && $('span[bet-timer="currNumero"]').attr("next-numero", c.nextNumero.numero), a) {
                var e = window.setInterval(control.betTimer, 1e3);
                globalVar.lottBetTimer.push(e), TCG.Ajax({
                    url: "lgw/draw/" + globalVar.currentLottery.gameId,
                    headers: {
                        Merchant: globalVar.merchantCode,
                        Authorization: window.sessionStorage.getItem("token")
                    },
                    data: {
                        page: 0,
                        size: 10
                    }
                }, function(a) {
                    if (a.content && a.content.length > 0 && (UI.showDrawNumber(a.content[0].numero, a.content[0].winNo), a.content.length > 1))
                        for (var b = 1; b < a.content.length; b++) UI.lastDrawResult(a.content[b].numero, a.content[b].winNo, "for")
                })
            } else control.betTimer()
        })
    },
    showDrawUI: function() {
        var a = 0,
            b = "",
            c = "";
        switch ($("#drawResultVideo").hasClass("PK10") && $("#drawResultVideo").removeClass("PK10"), globalVar.currentLottery.series[0].gameGroup) {
            case "SSC":
            case "11X5":
                a = 5, c = "ball-rolling-";
                break;
            case "PK10":
                a = 10, $("#drawResultVideo").addClass("PK10"), c = "XYPK10" == globalVar.currentLottery.game ? "boat" : "car";
                break;
            case "LF":
                a = "TCP3P5" == globalVar.currentLottery.game ? 5 : 3, c = "ball-rolling-"
        }
        for (var d = 0; d < a; d++) {
            b += '<li class="' + c + ("PK10" == globalVar.currentLottery.series[0].gameGroup ? lott.addZero(1 * d + 1 + "", 2) : d) + '"></li>'
        }
        $("#drawResult").html(b)
    },
    showDrawNumber: function(a, b) {
        if (control.clearLottDrawNumberTimer(), a == $('span[bet-timer="lastNumero"]').attr("numero")) {
            if (5 == b.length && b.indexOf(",") < 0) {
                var c = window.setTimeout(function() {
                    $("#drawResult li:eq(4)").removeClass("ball-rolling-4"), $("#drawResult li:eq(4)").text(b.charAt(4))
                }, 500);
                globalVar.lottDrawNumberTimer.push(c);
                var d = window.setTimeout(function() {
                    $("#drawResult li:eq(3)").removeClass("ball-rolling-3"), $("#drawResult li:eq(3)").text(b.charAt(3))
                }, 1e3);
                globalVar.lottDrawNumberTimer.push(d);
                var e = window.setTimeout(function() {
                    $("#drawResult li:eq(2)").removeClass("ball-rolling-2"), $("#drawResult li:eq(2)").text(b.charAt(2))
                }, 1500);
                globalVar.lottDrawNumberTimer.push(e);
                var f = window.setTimeout(function() {
                    $("#drawResult li:eq(1)").removeClass("ball-rolling-1"), $("#drawResult li:eq(1)").text(b.charAt(1))
                }, 2e3);
                globalVar.lottDrawNumberTimer.push(f);
                var g = window.setTimeout(function() {
                    $("#drawResult li:eq(0)").removeClass("ball-rolling-0"), $("#drawResult li:eq(0)").text(b.charAt(0)), "SSC" == globalVar.currentLottery.series[0].gameGroup && "ZY" == globalVar.currentLottMode && $("#drawResult li:eq(0)").addClass("dr69"), control.clearLottDrawNumberTimer()
                }, 2500);
                globalVar.lottDrawNumberTimer.push(g)
            }
            if (3 == b.length && b.indexOf(",") < 0) {
                var e = window.setTimeout(function() {
                    $("#drawResult li:eq(2)").removeClass("ball-rolling-2"), $("#drawResult li:eq(2)").text(b.charAt(2))
                }, 500);
                globalVar.lottDrawNumberTimer.push(e);
                var f = window.setTimeout(function() {
                    $("#drawResult li:eq(1)").removeClass("ball-rolling-1"), $("#drawResult li:eq(1)").text(b.charAt(1))
                }, 1e3);
                globalVar.lottDrawNumberTimer.push(f);
                var g = window.setTimeout(function() {
                    $("#drawResult li:eq(0)").removeClass("ball-rolling-0"), $("#drawResult li:eq(0)").text(b.charAt(0)), control.clearLottDrawNumberTimer()
                }, 1500);
                globalVar.lottDrawNumberTimer.push(g)
            }
            if (b.length > 5 && b.length < 20 && b.indexOf(",") > 0) {
                var h = b.split(","),
                    c = window.setTimeout(function() {
                        $("#drawResult li:eq(4)").removeClass("ball-rolling-4"), $("#drawResult li:eq(4)").text(h[4])
                    }, 500);
                globalVar.lottDrawNumberTimer.push(c);
                var d = window.setTimeout(function() {
                    $("#drawResult li:eq(3)").removeClass("ball-rolling-3"), $("#drawResult li:eq(3)").text(h[3])
                }, 1e3);
                globalVar.lottDrawNumberTimer.push(d);
                var e = window.setTimeout(function() {
                    $("#drawResult li:eq(2)").removeClass("ball-rolling-2"), $("#drawResult li:eq(2)").text(h[2])
                }, 1500);
                globalVar.lottDrawNumberTimer.push(e);
                var f = window.setTimeout(function() {
                    $("#drawResult li:eq(1)").removeClass("ball-rolling-1"), $("#drawResult li:eq(1)").text(h[1])
                }, 2e3);
                globalVar.lottDrawNumberTimer.push(f);
                var g = window.setTimeout(function() {
                    $("#drawResult li:eq(0)").removeClass("ball-rolling-0"), $("#drawResult li:eq(0)").text(h[0]), control.clearLottDrawNumberTimer()
                }, 2500);
                globalVar.lottDrawNumberTimer.push(g)
            }
            if (b.length > 20 && b.indexOf(",") > 0) {
                var i = "";
                "PK10" == globalVar.currentLottery.series[0].gameGroup && (i = "XYPK10" == globalVar.currentLottery.game ? "boat" : "car");
                for (var h = b.split(","), j = 0; j < h.length; j++) $("#drawResult li:eq(" + j + ")").removeClass(), isNaN(h[j]) ? $("#drawResult li:eq(" + j + ")").addClass(i + lott.addZero(j + 1 + "", 2)) : $("#drawResult li:eq(" + j + ")").addClass(i + h[j]), $("#drawResult li:eq(" + j + ")").text(h[j])
            }
        }
        UI.lastDrawResult(a, b), lott.getHotAndGap()
    },
    getCurrentLottery: function() {
        var a = [],
            b = window.sessionStorage.getItem("currentLottery");
        if (null == b) return null;
        var c = b.split("_"),
            d = window.sessionStorage.getItem(c[2]);
        if (d) {
            var e = d.split("_"),
                f = {
                    gameGroupId: e[1],
                    gameGroup: e[0],
                    prizeModeId: e[2],
                    maxSeries: e[3],
                    minSeries: e[4],
                    maxBetSeries: e[5],
                    defaultSeries: e[6]
                };
            a.push(f)
        }
        var g = window.sessionStorage.getItem(c[2] + "_ZY");
        if (g) {
            var h = g.split("_"),
                i = {
                    gameGroupId: h[1],
                    gameGroup: h[0],
                    prizeModeId: h[2],
                    maxSeries: h[3],
                    minSeries: h[4],
                    maxBetSeries: h[5],
                    defaultSeries: h[6]
                };
            a.push(i)
        }
        return {
            gameId: c[1],
            game: c[2],
            series: a
        }
    },
    lastDrawResult: function(a, b, c) {
        if (a && b) {
            var d = $("#lastThreeDrawResult>li").size(),
                e = $("#lastSevenDrawResult>li").size(),
                f = "";
            switch (globalVar.currentLottery.series[0].gameGroup) {
                case "SSC":
                    f = "<li " + (1 * b.charAt(0) == 6 || 1 * b.charAt(0) == 9 ? 'class="sumNumber"' : "") + ">" + b.charAt(0) + "</li><li>" + b.charAt(1) + "</li><li>" + b.charAt(2) + "</li><li>" + b.charAt(3) + "</li><li>" + b.charAt(4) + "</li>";
                    break;
                case "11X5":
                    var g = b.split(",");
                    f = "<li>" + g[0] + "</li><li>" + g[1] + "</li><li>" + g[2] + "</li><li>" + g[3] + "</li><li>" + g[4] + "</li>";
                    break;
                case "PK10":
                    var g = b.split(",");
                    f = "<li>" + g[0] + "</li><li>" + g[1] + "</li><li>" + g[2] + "</li><li>" + g[3] + "</li><li>" + g[4] + "</li><li>" + g[5] + "</li><li>" + g[6] + "</li><li>" + g[7] + "</li><li>" + g[8] + "</li><li>" + g[9] + "</li>", $("#lastSevenDrawResult").addClass("customPK10");
                    break;
                case "LF":
                    for (var h = 0; h < b.length; h++) f += "<li>" + b.charAt(h) + "</li>"
            }
            1 * d >= 3 && !c && $("#lastThreeDrawResult>li:last-child").remove(), 1 * e >= 20 && ($("#lastSevenDrawResult>li:last-child").remove(), $("#lastSevenDrawResult>li:last-child").remove());
            var i = '<li><div class="alignleft">' + a + '</div>            <div class="alignright">            <ul>' + f + "</ul>            </div>            </li>",
                j = '<li class="draw_date">' + a + '</li>            <li class="draw_winning">            <ul>' + f + "</ul>            </li>";
            1 * d > 0 && !c ? $("#lastThreeDrawResult>li:first-child").before(i) : 1 * d < 3 && $("#lastThreeDrawResult").append(i), 1 * e > 0 && !c ? $("#lastSevenDrawResult>li:first-child").before(j) : $("#lastSevenDrawResult").append(j)
        }
    },
    loadUserInfo: function() {
        var a = window.sessionStorage.getItem("nickname"),
            b = window.sessionStorage.getItem("username"),
            c = b.split("@");
        $("[data-userInfo='username']").text(c[1]), $("[data-userInfo='nickname']").text(null == a || "null" == a ? "用户尚无昵称" : a), $("span.customer_service_btn").off("click").on("click", function() {
            control.customerService()
        })
    },
    loadWalletList: function(a, b, c) {
        for (var d = "", e = 0; e < b.length; e++)
            if (TCG.Prop(b[e].accountName) != "[" + b[e].accountName + "]") {
                var f = TCG.Prop(b[e].accountName),
                    g = "主钱包" == f ? "selected=''" : "";
                switch (b[e].accountTypeId) {
                    case 1:
                        var h = "<option value='" + b[e].accountTypeId + "' " + g + ">" + f + "</option>";
                        break;
                    case 2:
                        var i = "<option value='" + b[e].accountTypeId + "' " + g + ">" + f + "</option>";
                        break;
                    case 301:
                        var j = "<option value='" + b[e].accountTypeId + "' " + g + ">" + f + "</option>";
                        break;
                    case 306:
                        var k = "<option value='" + b[e].accountTypeId + "' " + g + ">" + f + "</option>";
                        break;
                    case 4:
                        var l = "<option value='" + b[e].accountTypeId + "' " + g + ">" + f + "</option>"
                }
            }
        d += i || "", d += l || "", d += h || "", d += j || "", d += k || "", $(a).html(d), control.customSelect(a), c()
    },
    loadTransferWalletList: function(a) {
        for (var b = "<option class='initial_val' value='' data-walletBalance='' data-walletAccountId=''>请选择钱包</option>", c = 0; c < a.length; c++)
            if ("FROZEN_ACCOUNT" != a[c].accountName) {
                var d = TCG.Prop(a[c].accountName);
                switch (a[c].accountTypeId) {
                    case 1:
                        var e = "<option value='" + a[c].accountTypeId + "' data-walletAccountId='" + a[c].accountId + "' data-walletBalance='" + a[c].availBalance + "'>" + d + "</option>";
                        break;
                    case 2:
                        var f = "<option value='" + a[c].accountTypeId + "' data-walletAccountId='" + a[c].accountId + "' data-walletBalance='" + a[c].availBalance + "'>" + d + "</option>";
                        break;
                    case 301:
                        var g = "<option value='" + a[c].accountTypeId + "' data-walletAccountId='" + a[c].accountId + "' data-walletBalance='" + a[c].availBalance + "'>" + d + "</option>";
                        break;
                    case 306:
                        var h = "<option value='" + a[c].accountTypeId + "' data-walletAccountId='" + a[c].accountId + "' data-walletBalance='" + a[c].availBalance + "'>" + d + "</option>";
                        break;
                    case 4:
                        var i = "<option value='" + a[c].accountTypeId + "' data-walletAccountId='" + a[c].accountId + "' data-walletBalance='" + a[c].availBalance + "'>" + d + "</option>"
                }
            }
        b += f || "", b += i || "", b += e || "", b += g || "", b += h || "", $("#conversionOfFundsForm select").html(b), "#lottery" == window.location.hash && $("#conversionOfFundsForm [name='transferTo']").val("4"), control.customSelect("#conversionOfFundsForm select"), control.selectTransferWallet(), control.getTransferFromBalance()
    },
    loadTransactionDetails: function(a, b) {
        var c = "";
        if (a.list.length > 0) {
            for (var d = 0; d < a.list.length; d++)
                if ([8122, 8222].indexOf(a.list[d].txTypeId) < 0) {
                    var e = a.list[d].tx_time,
                        f = e.slice(0, e.indexOf(" ")),
                        g = e.substr(e.indexOf(" ") + 1),
                        h = a.list[d].remark;
                    if (a.list[d].amount < 0) var i = "tbl-green",
                        j = "支出",
                        k = a.list[d].amount;
                    else {
                        var l = a.list[d].tx_type_id;
                        if (6201 == l || 2004 == l) var i = "tbl-green",
                            j = "支出",
                            k = "-" + a.list[d].amount;
                        else var i = "tbl-red",
                            j = "收入",
                            k = a.list[d].amount
                    }
                    if (h.indexOf("Lott_User_drawback") > 0 && (h = h.substr(0, h.indexOf("_Lott_User_drawback")) + ":Lott_User_drawback"), h.indexOf(" LOTT") > 0 && (h = h.split(" "), h = h[1]), h.indexOf("game type : null") > 0 && (h = "gameName_NOGAME"), h.indexOf(":") > 0) {
                        var m = h;
                        m = m.split(":"), h = "Rebate" == m[1] ? TCG.Prop("gameName_" + h.split(":")[0]) + " : " + TCG.Prop("Lott_Rebate") : "Lott_User_drawback" == m[1] ? TCG.Prop("gameName_" + h.substr(0, h.indexOf(":"))) + " : " + TCG.Prop("Lott_User_drawback") : "Lott_User_Cancel_Order" == m[1] ? TCG.Prop("gameName_" + h.substr(0, h.indexOf(":"))) + " : " + TCG.Prop("Lott_User_Cancel_Order") : TCG.Prop("gameName_" + h.substr(0, h.indexOf(":"))) + " : " + TCG.Prop(h.substr(h.indexOf(":") + 1))
                    }
                    if (h = TCG.Prop(h), h = h.replace(/[\[\]&]+/g, ""), "4301" == $("[name='type'] :selected").val() && "收入" == $("[name='type'] :selected").parent().attr("label")) {
                        if (k < 0) continue
                    } else if ("4301" == $("[name='type'] :selected").val() && "支出" == $("[name='type'] :selected").parent().attr("label") && k > 0) continue;
                    c += "<div class='divTableRow'>";
                    var n = "" + a.list[d].tx_type_id,
                        o = a.list[d].order_no;
                    if ("6106" == n && (h = "收到签约分红"), 4 == b && o && o.length > 0 && 0 == n.indexOf("4")) {
                        o = control.shortenText(o);
                        var p = a.list[d].order_no.split("-"),
                            q = p[0];
                        p.shift();
                        var r = p.join("-");
                        c += "<div class='divTableCell onel-cl-y ps-cen wdth-small openItem tbl-link' data-orderNo='" + q + "' data-numero='" + r + "'>" + o + "</div>"
                    } else c += 6114 == n ? "<div class='divTableCell onel-cl-y ps-cen wdth-small'>" + o + "</div>" : "<div class='divTableCell onel-cl-y ps-cen wdth-small'>" + a.list[d].tx_id + "</div>";
                    c += "<div class='divTableCell onel-cl-y ps-cen'>" + TCG.Prop(a.list[d].tx_type_id) + "</div>", c += "<div class='divTableCell onel-cl-y ps-cen div-y'>" + j + "</div>", c += "<div class='divTableCell onel-cl-y ps-cen div-z'>" + f + " <span class='tblDec'>" + g + "</span></div>", c += "<div class='divTableCell onel-cl-y ps-num " + i + "' data-switchDecimal='2' data-value='" + k + "'>" + control.customCurrencyFormat(k, 2) + "</div>", c += "<div class='divTableCell onel-cl-y ps-num' data-switchDecimal='2' data-value='" + a.list[d].current_avail_balance + "'>" + control.customCurrencyFormat(a.list[d].current_avail_balance, 2) + "</div>", c += "<div class='divTableCell onel-cl-y ps-cen div-z remark_cell'>" + h + "</div>", c += "</div>"
                }
        } else c += "<div class='tableContent-wrp'>", c += "<div class='noResult-data'>" + TCG.Prop("no_result") + "</div>", c += "</div>";
        var s = 4 == b ? "订单号" : "编号";
        $("#changeAccountColumns .col-1").text(s), $("#changeAccountList").html(c), control.selectTransactionDetail()
    },
    loadTransactionDetailsItem: function(a) {
        $("#itemWrapper .prsnl-game-name").html("<span id='rm_" + a.gameCode + "'>&nbsp;</span>"), $("#itemWrapper .orderNo").text(control.shortenText(a.orderNumber)), $("#itemWrapper .seriesModel").text(a.series + "/" + TCG.Prop("bettingMode_" + a.bettingModeCode)), $("#itemWrapper .prizeMoney").html(null == a.winningAmount ? "-" : control.customCurrencyFormat(a.winningAmount, 2)), $("#itemWrapper .bettingNoteCount").text(a.stakes), $("#itemWrapper .bettingMultiples").html(control.currencyFormat(a.multiple)), $("#itemWrapper .bettingTime").text(control.timeToDateFormat(a.bettingTime, "dateTime")), $("#itemWrapper .orderStatus").text(TCG.Prop("orderStatus_" + a.orderStatus)), $("#itemWrapper .bettingOnNumber").text(a.numero), $("#itemWrapper .lotteryNumbers").text(null == a.winningNumber ? "-" : a.winningNumber);
        for (var b = a.orderInfos, c = "", d = 0; d < b.length; d++) {
            var e = [];
            null != b[d].first && e.push(b[d].first),
                null != b[d].second && e.push(b[d].second), null != b[d].third && e.push(b[d].third), null != b[d].fourth && e.push(b[d].fourth), null != b[d].fifth && e.push(b[d].fifth), c += "<div class='divTableRow'>", c += "<div class='divTableCell onel-cl-y ps-cen'>" + TCG.Prop("play_name_" + b[d].playId) + "</div>", c += "<div class='divTableCell onel-cl-y ps-cen yel-pop'>" + b[d].bettingContent.replace(/\,+/, "") + "<div class='pop-yellow'>", c += control.hoverLongText(e.join(" | "), 10), c += "</div></div>", c += "<div class='divTableCell onel-cl-y ps-cen'>" + b[d].stakes + "</div>", c += "<div class='divTableCell onel-cl-y ps-cen' data-switchDecimal='2' data-value='" + b[d].bettingAmount + "'>" + control.customCurrencyFormat(b[d].bettingAmount, 2) + "</div>", c += "</div>"
        }
        $("#itemList").html(c), $("#moreText").on("click", function() {
            control.showLongText($(this).attr("data-text"))
        })
    },
    loadDownlineTransactionDetails: function(a, b) {
        var c = "";
        if (a.list.length > 0) {
            for (var d = 0; d < a.list.length; d++)
                if ([8122, 8222].indexOf(a.list[d].tx_type_id) < 0) {
                    var e = a.list[d].tx_time,
                        f = e.slice(0, e.indexOf(" ")),
                        g = e.substr(e.indexOf(" ") + 1),
                        h = a.list[d].remark,
                        i = a.list[d].current_avail_balance;
                    if (a.list[d].amount < 0) var j = "tbl-green",
                        k = "支出",
                        l = a.list[d].amount;
                    else {
                        var m = a.list[d].tx_type_id;
                        if ("6201" == m || "2004" == m) var j = "tbl-green",
                            k = "支出",
                            l = "-" + a.list[d].amount;
                        else var j = "tbl-red",
                            k = "收入",
                            l = a.list[d].amount
                    }
                    if (h.indexOf("Lott_User_drawback") > 0 && (h = h.substr(0, h.indexOf("_Lott_User_drawback")) + ":Lott_User_drawback"), h.indexOf(" LOTT") > 0 && (h = h.split(" "), h = h[1]), h.indexOf("game type : null") > 0 && (h = "gameName_NOGAME"), h.indexOf(":") > 0) {
                        var n = h;
                        n = n.split(":"), h = "Rebate" == n[1] ? TCG.Prop("gameName_" + h.split(":")[0]) + " : " + TCG.Prop("Lott_Rebate") : "Lott_User_drawback" == n[1] ? TCG.Prop("gameName_" + h.substr(0, h.indexOf(":"))) + " : " + TCG.Prop("Lott_User_drawback") : "Lott_User_Cancel_Order" == n[1] ? TCG.Prop("gameName_" + h.substr(0, h.indexOf(":"))) + " : " + TCG.Prop("Lott_User_Cancel_Order") : TCG.Prop("gameName_" + h.substr(0, h.indexOf(":"))) + " : " + TCG.Prop(h.substr(h.indexOf(":") + 1))
                    }
                    "6106" == a.list[d].tx_type_id && (h = "收到签约分红"), h = TCG.Prop(h), h = h.replace(/[\[\]&]+/g, "");
                    var o = a.list[d].customer_name.split("@");
                    if ("4301" == $("[name='type'] :selected").val() && "收入" == $("[name='type'] :selected").parent().attr("label")) {
                        if (l < 0) continue
                    } else if ("4301" == $("[name='type'] :selected").val() && "支出" == $("[name='type'] :selected").parent().attr("label") && l > 0) continue;
                    c += "<div class='divTableRow border-bot clearfix'>", c += "<div class='divTableCell pp-pads dv-w-150'>" + o[1] + "</div>", c += "<div class='divTableCell pp-pads dv-w-100'>" + TCG.Prop(a.list[d].tx_type_id) + "</div>", c += "<div class='divTableCell pp-pads dv-w-50'>" + k + "</div>", c += "<div class='divTableCell pp-pads dv-w-150'>" + f + " <span class='tblDec'>" + g + "</span></div>", c += "<div class='divTableCell pp-pads dv-w-140 " + j + "' data-switchDecimal='2' data-value='" + l + "'>" + control.customCurrencyFormat(l, 2) + "</div>", c += "<div class='divTableCell pp-pads dv-w-140' data-switchDecimal='2' data-value='" + i + "'>" + control.customCurrencyFormat(i, 2) + "</div>", c += "<div class='divTableCell pp-pads dv-w-235'>" + h + "</div>", c += "</div>"
                }
        } else c += "<div class='tableContent-wrp'>", c += "<div class='noResult-data'>" + TCG.Prop("no_result") + "</div>", c += "</div>";
        $("#downlineTransactionDetailsList").html(c)
    },
    loadPagination: function(a, b, c, d) {
        var b = 1 * b,
            e = null,
            f = [];
        f.push("<div class='pag-arr-left game-icons pag-bnt'><a href='javascript:void(0)' data-pageNav='prev'>&nbsp;</a></div>");
        for (var g = b <= c - 6 ? b : c - 6, h = g <= 0 ? 1 : 1 * g; h <= c; h++) h < 3 + b || h > c - 3 ? (e = b == h ? "active" : "", f.push("<div class='pag-num game-icons pag-bnt " + e + "'><a href='javascript:void(0);' data-pageNo='" + h + "'>" + h + "</a></div>")) : h == 3 + b && f.push("<div class='pag-bnt'>...</div>");
        f.push("<div class='pag-arr-right game-icons pag-bnt'><a href='javascript:void(0);' data-pageNav='next'>&nbsp;</a></div>"), f.push("<div class='pag-search-con inline-block'>"), f.push("<input type='text' class='pag-search game-icons' name='inputPageNo'  />"), f.push("<input class='game-icons switch-dete' type='button' name='goToPage' value='确定' />"), f.push("</div>");
        var d = d || "#pagination";
        $(d).html(f), control.pageNav(a, b, c, d), control.clickPageNo(a, b, c, d), control.goToPageNo(a, b, c, d)
    },
    loadWithdrawalRecords: function(a) {
        var b = "",
            c = 0,
            d = a.records,
            e = a.footer;
        if (null !== d && d instanceof Array && d.length > 0)
            for (var f = 0; f < d.length; f++) {
                var g = null == d[f].remark ? "-" : d[f].remark,
                    h = control.timeToDateFormat(d[f].withdrawDate, "dateTime").split(" "),
                    i = d[f].status;
                4 == i && (g = "-"), b += "<div class='tableContent-wrp'>", b += "<div class='inline-block tablesC sm-chdata'>" + d[f].refId + "</div>", b += "<div class='inline-block tablesC sg-num' data-value='" + d[f].amount + "' data-switchDecimal='2'>" + control.customCurrencyFormat(d[f].amount, 2) + "</div>", b += "<div class='inline-block tablesC RemarksData'>" + d[f].bankName + "</div>", b += "<div class='inline-block tablesC dateData'>" + h[0] + "<span class='time'>" + h[1] + "</span></div>", b += "<div class='inline-block tablesC dateData'>" + TCG.Prop("withdrawStatus_" + d[f].status) + "</div>", b += "<div class='inline-block tablesC'>" + TCG.Prop(g) + "</div>", b += "</div>"
            } else b += "<div class='tableContent-wrp'>", b += "<div class='noResult-data no-withdraw-data'>" + TCG.Prop("no_result") + "</div>", b += "</div>";
        if (null !== e && e instanceof Array && e.length > 0) {
            var c = e[0].amount;
            $("#totalWithdrawAmount").html(control.customCurrencyFormat(c, 2)).attr({
                "data-value": c,
                "data-SwitchDecimal": 2
            })
        }
        $("#withdrawalList").html(b)
    },
    loadDepositRecords: function(a) {
        var b = "",
            c = a.records,
            d = a.footer;
        if (null !== c && c instanceof Array && c.length > 0)
            for (var e = 0; e < c.length; e++) {
                var f = c[e].transId;
                null == f && (f = "&ndash;");
                var g = null === c[e].amount ? 0 : c[e].amount,
                    h = null === c[e].reimbursementAmount ? 0 : c[e].reimbursementAmount;
                b += "<div class='tableContent-wrp'>", b += "<div class='inline-block tablesC'>" + f + "</div>", b += "<div class='inline-block tablesC'>" + TCG.Prop("depositMode_" + c[e].depositMode) + "</div>", b += "<div class='inline-block tablesC mg-align' data-switchDecimal='2' data-value='" + c[e].requestedAmount + "'>" + control.customCurrencyFormat(c[e].requestedAmount, 2) + "</div>", b += "<div class='inline-block tablesC mg-align' data-switchDecimal='2' data-value='" + g + "'>" + control.customCurrencyFormat(c[e].amount, 2) + "</div>", b += "<div class='inline-block tablesC' data-switchDecimal='2' data-value='" + h + "'>" + control.customCurrencyFormat(c[e].reimbursementAmount, 2) + "</div>", b += "<div class='inline-block tablesC RemarksData'>" + c[e].refId + "</div>", b += "<div class='inline-block tablesC dateData'>" + UI.convertEpochToLocaldate(c[e].depositDate) + "</div>", b += "<div class='inline-block tablesC dateData'>" + UI.convertEpochToLocaldate(c[e].actualDepositDate) + "</div>", b += "<div class='inline-block tablesC'>" + TCG.Prop("depositType_" + c[e].state) + "</div>", b += "</div>"
            } else b += "<div class='align-center no-deposit-data'>没有查到符合条件的数据！</div>";
        if (null !== d && d instanceof Array && d.length > 0) {
            var i = d[0].amount,
                j = d[0].reimbursementAmount;
            $("#totalAmountCredit").html(control.customCurrencyFormat(i, 2)).attr({
                "data-switchDecimal": 2,
                "data-value": i
            }), $("#totalArrivalFee").html(control.customCurrencyFormat(j, 2)).attr({
                "data-switchDecimal": 2,
                "data-value": j
            })
        }
        $("#depositRecordsList").html(b), $("#bankCardList").html(b)
    },
    loadGameRooms: function(a, b, c) {
        var d = "",
            e = "";
        d += "<option value='game_ag_6'>捕鱼</option>", e += "<option value=''>全部</option>", e += "<option value='bjl_room'>百家乐</option>", e += "<option value='gswz_room'>港式五张</option>", e += "<option value='thirteen_room'>十三水</option>", e += "<option value='tbnn_room'>通比牛牛</option>", e += "<option value='nn_room'>牛牛</option>", e += "<option value='zjh_room'>扎金花</option>", $(a).html(0 == b || "PVP" == b ? e : d);
        var c = c || "set";
        "set" == c ? control.customSelect(a) : $(a).trigger("chosen:updated")
    },
    convertEpochToLocaldate: function(a, b) {
        switch (null == b && (b = "dateTime"), b) {
            case "dateTime":
                if (a) {
                    var c = new Date(a),
                        d = c.getFullYear(),
                        e = c.getMonth() + 1,
                        e = e < 10 ? "0" + e : e;
                    return dy = c.getDate() < 10 ? "0" + c.getDate() : c.getDate(), d2 = d + "-" + e + "-" + dy, h = c.getHours() < 10 ? "0" + c.getHours() : c.getHours(), m = c.getMinutes() < 10 ? "0" + c.getMinutes() : c.getMinutes(), s = c.getSeconds() < 10 ? "0" + c.getSeconds() : c.getSeconds(), tm = h + ":" + m + ":" + s, c = d2 + "<span class='time'>" + tm + "</span>"
                }
                if (null == a) return "&ndash;";
                break;
            case "date":
                if (a) {
                    var c = new Date(a),
                        d = c.getFullYear(),
                        e = c.getMonth() + 1,
                        e = e < 10 ? "0" + e : e;
                    return dy = c.getDate() < 10 ? "0" + c.getDate() : c.getDate(), d2 = d + "-" + e + "-" + dy, d2
                }
                if (null == a) return "&ndash;"
        }
        if (a) {
            var c = new Date(a),
                d = c.getFullYear(),
                e = c.getMonth() + 1,
                e = e < 10 ? "0" + e : e;
            return dy = c.getDate() < 10 ? "0" + c.getDate() : c.getDate(), d2 = d + "-" + e + "-" + dy, h = c.getHours() < 10 ? "0" + c.getHours() : c.getHours(), m = c.getMinutes() < 10 ? "0" + c.getMinutes() : c.getMinutes(), s = c.getSeconds() < 10 ? "0" + c.getSeconds() : c.getSeconds(), tm = h + ":" + m + ":" + s, c = d2 + "<span class='time'>" + tm + "</span>"
        }
        if (null == a) return "&ndash;"
    },
    loadNorecordChase: function(a) {
        var b = a.orders.content,
            c = "";
        if (b.length > 0)
            for (var d = 0; d < b.length; d++) {
                var e = control.shortenText(b[d].orderNumber);
                1 != b[d].chasing && "true" != b[d].chasing || (e = e + "-" + $.strPad(b[d].chasingOrder, 3)), c += "<div class='divTableRow'>", c += "<div class='divTableCell onel-cl-y ps-cen openItem ps-strings tbl-link' data-orderId='" + b[d].orderDetailId + "'data-chasingOrder='" + b[d].chasingOrder + "' data-orderMasterId='" + b[d].orderMasterId + "'>" + e + "</div>", c += "<div class='divTableCell onel-cl-y ps-cen'>" + TCG.Prop("gameName_" + b[d].gameCode) + "</div>", c += "<div class='divTableCell onel-cl-y ps-cen'>" + b[d].numero + "</div>", c += "<div class='divTableCell onel-cl-y ps-cen'>" + b[d].chaseEndNumero + "</div>", c += "<div class='divTableCell onel-cl-y ps-cen div-y'>" + b[d].chasingPhase + "</div>", c += "<div class='divTableCell onel-cl-y ps-cen div-y'>" + b[d].actualChasingPhase + "</div>", c += "<div class='divTableCell onel-cl-y ps-num' data-switchDecimal='2' data-value='" + b[d].planBettingAmount + "'>" + control.customCurrencyFormat(b[d].planBettingAmount, 2) + "</div>";
                var f = null == b[d].winningAmount ? 0 : b[d].winningAmount,
                    g = 4 == b[d].orderStatus ? "tbl-red" : "";
                c += "<div class='divTableCell onel-cl-y ps-num " + g + "' data-switchDecimal='2' data-value='" + f + "'>" + control.customCurrencyFormat(f, 2) + "</div>", c += "<div class='divTableCell onel-cl-y ps-cen div-x " + g + "'>" + TCG.Prop("orderStatus_" + b[d].orderStatus) + "</div>", c += "</div>"
            } else c += "<div class='tableContent-wrp'>", c += "<div class='noResult-data'>" + TCG.Prop("no_result") + "</div>", c += "</div>";
        var h = a.orderSumTO.sumPlanBettingAmt,
            i = a.orderSumTO.sumActualBettingAmt,
            j = a.orderSumTO.sumWinningAmt;
        $("#totalPlanBettingAmt").html(control.customCurrencyFormat(h, 2)).attr({
            "data-switchDecimal": 2,
            "data-value": h
        }), $("#totalActualBettingAmt").html(control.customCurrencyFormat(i, 2)).attr({
            "data-switchDecimal": 2,
            "data-value": i
        }), $("#totalWinningAmt").html(control.customCurrencyFormat(j, 2)).attr({
            "data-switchDecimal": 2,
            "data-value": j
        }), $("#norecordChaseList").html(c), $("#norecordChase input[name='order']").on("change", function() {
            $(this).val($(this).val().toUpperCase())
        });
        var k = window.sessionStorage.getItem("orderId"),
            l = window.sessionStorage.getItem("orderMasterId"),
            m = window.sessionStorage.getItem("chasingOrder");
        window.sessionStorage.getItem("chasing");
        null != k && "" != k && (sessionStorage.removeItem("orderMasterId"), sessionStorage.removeItem("chasingOrder"), sessionStorage.removeItem("chasing"), sessionStorage.removeItem("orderId"), $("#norecordChase").addClass("hide"), $("#itemWrapper").removeClass("hide").attr("data-orderMasterId", l).attr("data-chasingOrder", m).attr("data-orderId", k), control.getNoRecordChaseItem(l, k, m), control.viewNoRecordChaseItem(), control.backToNoRecordChase())
    },
    loadNoRecordChaseItem: function(a, b, c) {
        globalVar.orderMultiple = a.orderDetailOrders[c - 1].multiple;
        var d = a.orderDetailOrders.slice(0);
        d.sort(function(a, b) {
            return a.orderDetailId - b.orderDetailId
        }), a.orderDetailOrders = d, $("#itemWrapper .prsnl-game-name").html("<span id='rm_" + a.gameCode + "'>&nbsp;</span>");
        var e = control.shortenText(a.orderNumber);
        1 != a.chase && "true" != a.chase || (e = e + "-" + $.strPad(c, 3)), $("#itemWrapper .orderNo").text(e), $("#itemWrapper .seriesModel").text(a.series + "/" + TCG.Prop("bettingMode_" + a.mode));
        var f = 0;
        $.each(a.orderDetailOrders, function(a, b) {
            void 0 != b.winningAmount && (f += b.winningAmount)
        }), $("#itemWrapper .prizeMoney").html(control.customCurrencyFormat(f, 4)), $("#itemWrapper .bettingNoteCount").text(a.orderDetailOrders[0].stakes);
        a.orderDetailOrders[0].multiple;
        $("#itemWrapper .bettingTime").text(control.timeToDateFormat(a.bettingTime, "dateTime")), $("#itemWrapper .orderStatus").text(TCG.Prop("orderStatus_" + a.orderStatus)), $("#itemWrapper .bettingOnNumber").text(a.numero), $("#itemWrapper .lotteryNumbers").text(null == a.winningNumber ? "-" : a.winningNumber);
        var g = 1 == a.winningStop ? "是" : " 否";
        $("#itemWrapper .winningstop").text(g), $("#itemWrapper .plan_bet_amount").text(control.currencyFormat(a.totalBetAmount, 4));
        var h = 1 == a.abandoning ? "是" : " 否";
        $("#itemWrapper .abonding").text(h), $("#itemWrapper .actual_bet_amount").text(control.currencyFormat(a.totalActualBetAmount, 4));
        var i = 1 == a.completed ? "是" : " 否";
        $("#itemWrapper .chasephase").text(a.totalChasePhases), $("#itemWrapper .isCompleted").text(i);
        var j = "",
            k = a.orderDetailOrders,
            l = "";
        globalVar.orderMasterId = a.orderMasterId;
        var m = $("#itemWrapper [name='pageNo']");
        $.ajax({
            url: "./lgw/orders/detail/" + b + "/info",
            data: {
                page: 1 * m.val() - 1,
                size: 100
            },
            headers: globalVar.headers,
            dataType: "json",
            contentType: "application/json",
            success: function(b, d, e) {
                for (var f = b.content, g = 0; g < f.length; g++) {
                    var h = control.betMap(f[g]);
                    j += "<div class='divTableRow'>", j += "<div class='divTableCell onel-cl-y ps-cen yel-pop'>" + h.playName, j += "<div class='pop-yellow' style='left:30px'>" + h.playName + "</div>", j += "</div>", j += "<div class='divTableCell onel-cl-y ps-cen yel-pop ps-strings'>" + control.strSub(h.bet, 10) + "<div class='pop-yellow txbx1'>", j += control.hoverLongText(h.bet, 10), j += "</div></div>", j += "<div class='divTableCell onel-cl-y ps-cen'>" + f[g].stakes + "</div>", j += "<div class='divTableCell onel-cl-y ps-cen2'>" + f[g].series + "/" + TCG.Prop("bettingMode_" + f[g].bettingMode) + "/" + f[g].multiple * a.orderDetailOrders[parseInt(c) - 1].multiple + "</div>", j += "<div class='divTableCell onel-cl-y ps-num' data-switchDecimal='2' data-value='" + f[g].bettingAmount * globalVar.orderMultiple + "'>" + control.customCurrencyFormat(f[g].bettingAmount * globalVar.orderMultiple, 2) + "</div>", j += "</div>"
                }
                $("#orderInfos").html(j), $(".moreText").on("click", function() {
                    control.showLongText($(this).attr("data-text"))
                }), UI.loadPagination("nrc-table-2", m.val(), b.totalPages, "#ncoDetailPagination"), control.switchDecimal("#cnoswitchDecimal")
            }
        });
        for (var n = [], o = 0; o < k.length; o++)
            for (var p = 0; p < k.length; p++)
                if (1 * k[p].chasingOrder == o + 1) {
                    n[o] = k[p];
                    break
                }
        $("#orderDetailOrders").html("");
        for (var o = 0; o < k.length; o++) {
            l += "<div class='divTableRow orderDetailsItem'>", l += "<div class='divTableCell onel-cl-y ps-cen div-x col-checkbox'>", 2 == k[o].orderStatus && (l += "<input type='checkbox' id='check" + o + "' name='orderDetail' value='" + k[o].orderDetailId + "' />", l += "<label for='check" + o + "'></label>"), l += "</div>", l += "<div class='divTableCell onel-cl-y ps-cen'>" + k[o].numero + "</div>";
            var q = null == k[o].winningNumber ? "-" : k[o].winningNumber;
            l += "<div class='divTableCell onel-cl-y ps-cen yel-pop ps-strings'>" + control.strSub(q, 10) + "<div class='pop-yellow txbx1 chUn123'>", l += control.hoverLongText(q, ""), l += "</div></div>", l += "<div class='divTableCell onel-cl-y ps-cen div-x col-orderStatus'>" + TCG.Prop("orderStatus_" + k[o].orderStatus) + "</div>";
            var r = null == k[o].bettingSumAmount ? 0 : 1 * k[o].bettingSumAmount;
            l += "<div class='divTableCell onel-cl-y ps-num' data-switchDecimal='4' data-value='" + r + "'>" + control.customCurrencyFormat(r, 4) + "</div>";
            var s = null === k[o].winningAmount ? 0 : 1 * k[o].winningAmount;
            l += "<div class='divTableCell onel-cl-y ps-num " + (null != k[o].winningAmount ? "tbl-red" : "") + "' data-switchDecimal='4' data-value='" + s + "'>" + control.customCurrencyFormat(s, 4) + "</div>", l += "<div class='divTableCell onel-cl-y ps-cen div-x blue openGameHistoryItem' id='openGameHistoryItem' data-orderId='" + k[o].orderDetailId + "' data-chasing='true'>查看</div>", l += "</div>"
        }
        $("#orderDetailOrders").html(l), $(".openGameHistoryItem").on("click", function() {
            sessionStorage.setItem("gameHistoryOrderId", $(this).attr("data-orderId")), sessionStorage.setItem("orderMasterId", a.orderMasterId), sessionStorage.setItem("chasing", $(this).attr("data-chasing")), sessionStorage.setItem("noChaseOrder", "true"), $('.model_child_menus li[data-submenu="gameHistory"]').trigger("click")
        })
    },
    loadLottoPersonalPnlStatements: function(a) {
        var b = a.list,
            c = a.footer,
            d = "",
            e = "";
        if (null !== b && b instanceof Array && b.length > 0)
            for (var f = 0; f < b.length; f++) {
                d += "<div class='divTableRow clearfix'>";
                var g = b[f].agentTransferIn + (parseFloat(b[f].deposit) || 0),
                    h = b[f].agentTransferOut + (parseFloat(b[f].withdraw) || 0),
                    i = b[f].balanceDate,
                    j = i.split("-")[2] + "-" + i.split("-")[0] + "-" + i.split("-")[1];
                d += "<div class='divTableCell-mod div-fix-ppalscon'>" + j + "</div>", d += "<div class='divTableCell-mod div-fix-ppalscon ps-num' data-switchDecimal='2' data-value='" + g + "'>" + control.customCurrencyFormat(g, 2) + "</div>", d += "<div class='divTableCell-mod div-fix-ppalscon ps-num' data-switchDecimal='2' data-value='" + h + "'>" + control.customCurrencyFormat(h, 2) + "</div>", d += "<div class='divTableCell-mod div-fix-ppalscon ps-num' data-switchDecimal='2' data-value='" + b[f].lottGameBetting + "'>" + control.customCurrencyFormat(b[f].lottGameBetting, 2) + "</div>", d += "<div class='divTableCell-mod div-fix-ppalscon ps-num' data-switchDecimal='2' data-value='" + (b[f].lottGameRebate + b[f].lottAgentCommission) + "'>" + control.customCurrencyFormat(b[f].lottGameRebate + b[f].lottAgentCommission, 2) + "</div>", d += "<div class='divTableCell-mod div-fix-ppalscon  ps-num' data-switchDecimal='2' data-value='" + b[f].lottGameWinning + "'>" + control.customCurrencyFormat(b[f].lottGameWinning, 2) + "</div>";
                var k = b[f].lottPromotion + b[f].lottDailyIncome + b[f].lottBrokerage;
                d += "<div class='divTableCell-mod div-fix-ppalscon ps-num' data-switchDecimal='2' data-value='" + k + "'>" + control.customCurrencyFormat(k, 2) + "</div>";
                var l = b[f].lottGamePnl >= 0 ? "tbl-red" : "tbl-green";
                d += "<div class='divTableCell-mod div-fix-ppalscon ps-num " + l + "' data-switchDecimal='2' data-value='" + b[f].lottGamePnl + "'>" + control.customCurrencyFormat(b[f].lottGamePnl, 2) + "</div>", d += "</div>"
            }
        if (null !== c && "object" == typeof c) {
            var m = c.agentTransferIn + parseFloat(c.deposit),
                n = c.agentTransferOut + parseFloat(c.withdraw);
            e += "<span class='tbl-total-lbl-modppals span-tr inline-block'>合计:</span>", e += "<span class='tbl-total-amt span-tr inline-block' data-switchDecimal='2' data-value='" + m + "'>" + control.customCurrencyFormat(m, 2) + "</span>", e += "<span class='tbl-total-amt span-tr inline-block' data-switchDecimal='2' data-value='" + n + "'>" + control.customCurrencyFormat(n, 2) + "</span>", e += "<span class='tbl-total-amt span-tr inline-block' data-switchDecimal='2' data-value='" + c.lottGameBetting + "'>" + control.customCurrencyFormat(c.lottGameBetting, 2) + "</span>", e += "<span class='tbl-total-amt span-tr inline-block' data-switchDecimal='2' data-value='" + (c.lottGameRebate + c.lottAgentCommission) + "'>" + control.customCurrencyFormat(c.lottGameRebate + c.lottAgentCommission, 2) + "</span>", e += "<span class='tbl-total-amt span-tr inline-block' data-switchDecimal='2' data-value='" + c.lottGameWinning + "'>" + control.customCurrencyFormat(c.lottGameWinning, 2) + "</span>";
            var o = c.lottPromotion + c.lottDailyIncome + c.lottBrokerage;
            e += "<span class='tbl-total-amt span-tr inline-block' data-switchDecimal='2' data-value='" + o + "'>" + control.customCurrencyFormat(o, 2) + "</span>";
            e += "<span class='tbl-total-amt span-tr inline-block " + (c.lottGamePnl >= 0 ? "tbl-red" : "tbl-green") + "' data-switchDecimal='2' data-value='" + c.lottGamePnl + "'>" + control.customCurrencyFormat(c.lottGamePnl, 2) + "</span>"
        }
        $("#lottoPersonalPnlList").html(d), $("#lottoPersonalPnlTotal").html(e)
    },
    loadPvpPersonalPnlStatements: function(a, b) {
        for (var c = a.list, d = a.footer, e = "", f = "", g = 0; g < c.length; g++) {
            e += "<div class='divTableRow clearfix'>";
            var h = c[g].balanceDate.replace(" 00:00:00.0", "");
            e += "<div class='divTableCell-mod div-fix-ppalscon'>" + control.timeToDateFormat(h, "date") + "</div>";
            var i = (parseFloat(c[g].deposit) || 0) + c[g].agentTransferIn;
            e += "<div class='divTableCell-mod div-fix-ppalscon ps-num' data-switchDecimal='2' data-value='" + i + "'>" + control.customCurrencyFormat(i, 2) + "</div>";
            var j = (parseFloat(c[g].withdraw) || 0) + c[g].agentTransferOut;
            if (e += "<div class='divTableCell-mod div-fix-ppalscon  ps-num' data-switchDecimal='2' data-value='" + j + "'>" + control.customCurrencyFormat(j, 2) + "</div>", 0 == b) {
                e += "<div class='divTableCell-mod div-fix-ppalscon ps-num' data-switchDecimal='2' data-value='" + c[g].pvpGameLoses + "'>" + control.customCurrencyFormat(c[g].pvpGameLoses, 2) + "</div>", e += "<div class='divTableCell-mod div-fix-ppalscon ps-num' data-switchDecimal='2' data-value='" + c[g].pvpGameWinnings + "'>" + control.customCurrencyFormat(c[g].pvpGameWinnings, 2) + "</div>", e += "<div class='divTableCell-mod div-fix-ppalscon ps-num' data-switchDecimal='2' data-value='" + c[g].pvpGameRebate + "'>" + control.customCurrencyFormat(c[g].pvpGameRebate, 2) + "</div>", e += "<div class='divTableCell-mod div-fix-ppalscon ps-num' data-switchDecimal='2' data-value='" + c[g].pvpPromotion + "'>" + control.customCurrencyFormat(c[g].pvpPromotion, 2) + "</div>";
                var k = c[g].pvpGamePNL >= 0 ? "tbl-red" : "tbl-green";
                e += "<div class='divTableCell-mod div-fix-ppalscon ps-num " + k + "' data-switchDecimal='2' data-value='" + c[g].pvpGamePNL + "'>" + control.customCurrencyFormat(c[g].pvpGamePNL, 2) + "</div>", e += "</div>"
            } else if (1 == b) {
                e += "<div class='divTableCell-mod div-fix-ppalscon ps-num' data-switchDecimal='2' data-value='" + c[g].rngGameBetting + "'>" + control.customCurrencyFormat(c[g].rngGameBetting, 2) + "</div>", e += "<div class='divTableCell-mod div-fix-ppalscon ps-num' data-switchDecimal='2' data-value='" + c[g].rngGameWinning + "'>" + control.customCurrencyFormat(c[g].rngGameWinning, 2) + "</div>", e += "<div class='divTableCell-mod div-fix-ppalscon ps-num' data-switchDecimal='2' data-value='" + c[g].rngGameRebate + "'>" + control.customCurrencyFormat(c[g].rngGameRebate, 2) + "</div>", e += "<div class='divTableCell-mod div-fix-ppalscon ps-num' data-switchDecimal='2' data-value='" + c[g].rngPromotion + "'>" + control.customCurrencyFormat(c[g].rngPromotion, 2) + "</div>";
                var k = c[g].rngGamePNL >= 0 ? "tbl-red" : "tbl-green";
                e += "<div class='divTableCell-mod div-fix-ppalscon ps-num " + k + "' data-switchDecimal='2' data-value='" + c[g].rngGamePNL + "'>" + control.customCurrencyFormat(c[g].rngGamePNL, 2) + "</div>", e += "</div>"
            } else if (2 == b) {
                e += "<div class='divTableCell-mod div-fix-ppalscon ps-num' data-switchDecimal='2' data-value='" + c[g].liveGameBetting + "'>" + control.customCurrencyFormat(c[g].liveGameBetting, 2) + "</div>", e += "<div class='divTableCell-mod div-fix-ppalscon ps-num' data-switchDecimal='2' data-value='" + c[g].liveGameWinning + "'>" + control.customCurrencyFormat(c[g].liveGameWinning, 2) + "</div>", e += "<div class='divTableCell-mod div-fix-ppalscon ps-num' data-switchDecimal='2' data-value='" + c[g].liveGameRebate + "'>" + control.customCurrencyFormat(c[g].liveGameRebate, 2) + "</div>", e += "<div class='divTableCell-mod div-fix-ppalscon ps-num' data-switchDecimal='2' data-value='" + c[g].rngPromotion + "'>" + control.customCurrencyFormat(c[g].rngPromotion, 2) + "</div>";
                var k = c[g].liveGamePNL >= 0 ? "tbl-red" : "tbl-green";
                e += "<div class='divTableCell-mod div-fix-ppalscon ps-num " + k + "' data-switchDecimal='2' data-value='" + c[g].liveGamePNL + "'>" + control.customCurrencyFormat(c[g].liveGamePNL, 2) + "</div>", e += "</div>"
            }
        }
        if (null !== d && "object" == typeof d) {
            f += "<span class='tbl-total-lbl-modppals span-tr inline-block'>合计:</span>";
            var l = d.agentTransferIn + parseFloat(d.deposit);
            f += "<span class='tbl-total-amt span-tr inline-block' data-switchDecimal='2' data-value='" + l + "'>" + control.customCurrencyFormat(l, 2) + "</span>";
            var m = d.agentTransferOut + parseFloat(d.withdraw);
            if (f += "<span class='tbl-total-amt span-tr inline-block' data-switchDecimal='2' data-value='" + m + "'>" + control.customCurrencyFormat(m, 2) + "</span>", 0 == b) {
                f += "<span class='tbl-total-amt span-tr inline-block' data-switchDecimal='2' data-value='" + d.pvpGameLoses + "'>" + control.customCurrencyFormat(d.pvpGameLoses, 2) + "</span>", f += "<span class='tbl-total-amt span-tr inline-block' data-switchDecimal='2' data-value='" + d.pvpGameWinnings + "'>" + control.customCurrencyFormat(d.pvpGameWinnings, 2) + "</span>", f += "<span class='tbl-total-amt span-tr inline-block' data-switchDecimal='2' data-value='" + d.pvpGameRebate + "'>" + control.customCurrencyFormat(d.pvpGameRebate, 2) + "</span>", f += "<span class='tbl-total-amt span-tr inline-block' data-switchDecimal='2' data-value='" + d.pvpPromotion + "'>" + control.customCurrencyFormat(d.pvpPromotion, 2) + "</span>";
                var n = d.pvpGamePNL >= 0 ? "tbl-red" : "tbl-green";
                f += "<span class='tbl-total-amt span-tr inline-block " + n + "' data-switchDecimal='2' data-value='" + d.pvpGamePNL + "'>" + control.customCurrencyFormat(d.pvpGamePNL, 2) + "</span>"
            } else {
                f += "<span class='tbl-total-amt span-tr inline-block' data-switchDecimal='2' data-value='" + d.rngGameBetting + "'>" + control.customCurrencyFormat(d.rngGameBetting, 2) + "</span>", f += "<span class='tbl-total-amt span-tr inline-block' data-switchDecimal='2' data-value='" + d.rngGameWinning + "'>" + control.customCurrencyFormat(d.rngGameWinning, 2) + "</span>", f += "<span class='tbl-total-amt span-tr inline-block' data-switchDecimal='2' data-value='" + d.rngGameRebate + "'>" + control.customCurrencyFormat(d.rngGameRebate, 2) + "</span>", f += "<span class='tbl-total-amt span-tr inline-block' data-switchDecimal='2' data-value='" + d.rngPromotion + "'>" + control.customCurrencyFormat(d.rngPromotion, 2) + "</span>";
                var n = d.rngGamePNL >= 0 ? "tbl-red" : "tbl-green";
                f += "<span class='tbl-total-amt span-tr inline-block " + n + "' data-switchDecimal='2' data-value='" + d.rngGamePNL + "'>" + control.customCurrencyFormat(d.rngGamePNL, 2) + "</span>"
            }
        }
        $("#pvpPersonalPnlList").html(e), $("#pvpPersonalPnlTotal").html(f)
    },
    loadLottoGameHistory: function(a) {
        var b = "",
            c = a.orders.content;
        if (c.length > 0)
            for (var d = 0; d < c.length; d++) {
                b += "<div class='divTableRow' style='position: relative;'>", b += "<div class='divTableCell onel-cl-y ps-cen width-adjustment-104 '>" + TCG.Prop("gameName_" + c[d].gameCode) + "</div>";
                var e = control.shortenText(c[d].orderNumber);
                1 != c[d].chasing && "true" != c[d].chasing || (e = e + "-" + $.strPad(c[d].chasingOrder, 3)), b += "<div class='divTableCell onel-cl-y ps-cen ps-strings yel-pop tbl-link'><span class='openItem' data-orderId='" + c[d].orderDetailId + "' data-chasing='" + c[d].chasing + "' data-orderMasterId='" + c[d].orderMasterId + "'>" + e + "</span></div>", b += "<div class='divTableCell onel-cl-y ps-cen width-adjustment-128'>" + control.timeToDateFormat(c[d].bettingTime, "MonthDateTime") + "</div>", b += "<div class='divTableCell onel-cl-y ps-cen width-adjustment-128'>" + c[d].numero + "</div>";
                var f;
                f = 1 == c[d].chasing ? 1 == c[d].chasingOrder ? c[d].chasingPhase + "期" : "子单" : "-", b += "<div class='divTableCell onel-cl-y ps-cen div-y'>" + f + "</div>", b += "<div class='divTableCell onel-cl-y' data-switchDecimal='2' data-value='" + c[d].planBettingAmount + "'>" + control.customCurrencyFormat(c[d].planBettingAmount, 2) + "</div>", b += "<div class='divTableCell onel-cl-y width-adjustment-80' data-switchDecimal='2' data-value='" + c[d].actualBettingAmount + "'>" + control.customCurrencyFormat(c[d].actualBettingAmount, 2) + "</div>", null == c[d].winningAmount ? 5 == c[d].orderStatus ? b += "<div class='divTableCell onel-cl-y tbl-red width-adjustment-75 text-righ ch-riht-rl' data-switchDecimal='2' data-value='0'>" + control.customCurrencyFormat(0, 2) + "</div>" : b += "<div class='divTableCell onel-cl-y tbl-red width-adjustment-75 text-right ch-riht-rl'>-</div>" : b += "<div class='divTableCell onel-cl-y tbl-red width-adjustment-75 text-right ch-riht-rl' data-switchDecimal='2' data-value='" + c[d].winningAmount + "'>" + control.customCurrencyFormat(c[d].winningAmount, 2) + "</div>", b += "<div class='divTableCell onel-cl-y ps-cen div-z'>" + TCG.Prop("orderStatus_" + c[d].orderStatus) + "</div>", b += "</div>"
            } else b += "<div class='tableContent-wrp'>", b += "<div class='noResult-data'>" + TCG.Prop("no_result") + "</div>", b += "</div>";
        $("#lottoGameHistoryList").html(b), control.viewLottoGameHistoryItem();
        var g = a.orderSumTO,
            h = "";
        h += "<div class='tbl-total-con inline-block'>计划投注金额合计:</div>", h += "<div class='tbl-total-amt inline-block' data-switchDecimal='2' data-value='" + g.sumPlanBettingAmt + "'>" + control.customCurrencyFormat(g.sumPlanBettingAmt, 2) + "</div>", h += "<div class='tbl-total-con inline-block'>有效投注金额合计:</div>", h += "<div class='tbl-total-amt inline-block' data-switchDecimal='2' data-value='" + g.sumActualBettingAmt + "'>" + control.customCurrencyFormat(g.sumActualBettingAmt, 2) + "</div>", h += "<div class='tbl-total-con inline-block'>中奖金额合计:</div>", h += "<div class='tbl-total-amt inline-block' data-switchDecimal='2' data-value='" + g.sumWinningAmt + "'>" + control.customCurrencyFormat(g.sumWinningAmt, 2) + "</div>", $("#lottoGameHistoryTotal").html(h), $("#listWrapper input[name='order']").on("change", function() {
            $(this).val($(this).val().toUpperCase())
        });
        var i = sessionStorage.getItem("gameHistoryOrderId"),
            j = sessionStorage.getItem("orderMasterId"),
            k = sessionStorage.getItem("chasing");
        null != i && "" != i && (sessionStorage.removeItem("gameHistoryOrderId"), sessionStorage.removeItem("orderMasterId"), sessionStorage.removeItem("chasing"), $("#listWrapper").addClass("hide"), $("#itemWrapper").removeClass("hide"), sessionStorage.setItem("lastPage", "lottery"), control.getGameHistoryItem(i, j, k), control.viewLottoGameHistoryItem())
    },
    loadPromotions: function(a, b) {
        var c = $("#managePromotionsForm"),
            d = c.find("[name='limit']"),
            e = "",
            f = "",
            g = "",
            h = [],
            i = 0,
            j = {
                U: {
                    color_class: "tbl-red",
                    text: "<button>领取</button>"
                },
                C: {
                    color_class: "tbl-green",
                    text: "已领取"
                },
                E: {
                    color_class: "tbl-red",
                    text: "已过期"
                }
            };
        if ($("#totalPromotionsAmount").html(control.currencyFormat(0, 2)), h = a.list, h = control.sortBy(h, {
                prop: "approvedDate",
                desc: !0
            }), h.length > 0) {
            switch (b.type) {
                case "U":
                    for (var k = 0; k < h.length; k++) h[k].transTime.indexOf(".") >= 0 && (h[k].transTime = h[k].transTime.substr(0, globalVar.activity[k].createtime.indexOf("."))), h[k].approvedDate.indexOf(".") >= 0 && (h[k].approvedDate = h[k].approvedDate.substr(0, globalVar.activity[k].createtime.indexOf("."))), e += "<div class='divTableRow'>", e += "<div class='divTableCell onel-cl-y ps-cen mg-managepro'>" + h[k].eventName + "</div>", e += "<div class='divTableCell onel-cl-y ps-cen pro-date'>" + (h[k].approvedDate ? h[k].approvedDate : h[k].transTime) + "</div>", e += "<div class='divTableCell onel-cl-y ps-cen mg-managepro'>" + (h[k].transTime ? h[k].transTime : "无限期") + "</div>", e += "<div class='divTableCell onel-cl-y ps-cen mg-managepro1'>" + control.currencyFormat(h[k].rewardAmount, 2) + "</div>", e += "<div class='divTableCell onel-cl-y ps-cen mg-managepro'><span class='btn claim_promo' data-promotion_id='" + h[k].promId + "' data-reward_id='" + h[k].rewardId + "'>" + j[b.type].text + "</span></div>", e += "<div class='divTableCell onel-cl-y ps-cen mg-managepro'>" + (h[k].remark ? h[k].remark : "") + "</div>", e += "</div>", i += h[k].rewardAmount;
                    $("#unclaimedList").html(e), $("#totalPromotionsAmount").html(control.currencyFormat(i, 2));
                    break;
                case "C":
                    for (var k = 0; k < h.length; k++) h[k].transTime.indexOf(".") >= 0 && (h[k].transTime = h[k].transTime.substr(0, globalVar.activity[k].createtime.indexOf("."))), h[k].approvedDate.indexOf(".") >= 0 && (h[k].approvedDate = h[k].approvedDate.substr(0, globalVar.activity[k].createtime.indexOf("."))), f += "<div class='divTableRow'>", f += "<div class='divTableCell onel-cl-y ps-cen mg-managepro'>" + h[k].eventName + "</div>", f += "<div class='divTableCell onel-cl-y ps-cen pro-date'>" + (h[k].approvedDate ? h[k].approvedDate : h[k].transTime) + "</div>", f += "<div class='divTableCell onel-cl-y ps-cen mg-managepro'>" + (h[k].transTime ? h[k].transTime : "无限期") + "</div>", f += "<div class='divTableCell onel-cl-y ps-cen mg-managepro1'>" + control.currencyFormat(h[k].rewardAmount, 2) + "</div>", f += "<div class='divTableCell onel-cl-y ps-cen mg-managepro " + j[b.type].color_class + "'>" + j[b.type].text + "</div>", f += "<div class='divTableCell onel-cl-y ps-cen mg-managepro'>" + (h[k].remark ? h[k].remark : "") + "</div>", f += "</div>", i += h[k].rewardAmount;
                    $("#claimedList").html(f), $("#totalPromotionsAmount").html(control.currencyFormat(i, 2));
                    break;
                case "E":
                    for (var k = 0; k < h.length; k++) h[k].transTime.indexOf(".") >= 0 && (h[k].transTime = h[k].transTime.substr(0, globalVar.activity[k].createtime.indexOf("."))), h[k].approvedDate.indexOf(".") >= 0 && (h[k].approvedDate = h[k].approvedDate.substr(0, globalVar.activity[k].createtime.indexOf("."))), g += "<div class='divTableRow'>", g += "<div class='divTableCell onel-cl-y ps-cen mg-managepro'>" + h[k].eventName + "</div>",
                        g += "<div class='divTableCell onel-cl-y ps-cen pro-date'>" + (h[k].approvedDate ? h[k].approvedDate : h[k].transTime) + "</div>", g += "<div class='divTableCell onel-cl-y ps-cen mg-managepro'>" + (h[k].transTime ? h[k].transTime : "无限期") + "</div>", g += "<div class='divTableCell onel-cl-y ps-cen mg-managepro1'>" + control.currencyFormat(h[k].rewardAmount, 2) + "</div>", g += "<div class='divTableCell onel-cl-y ps-cen mg-managepro " + j[b.type].color_class + " '>" + j[b.type].text + "</div>", g += "<div class='divTableCell onel-cl-y ps-cen mg-managepro'>" + (h[k].remark ? h[k].remark : "") + "</div>", g += "</div>", i += h[k].rewardAmount;
                    $("#expiredList").html(g)
            }
            UI.loadPagination("managePromotions", b.pageNo, Math.ceil(1 * a.totalCount / d.val()), "#promotionsPagination")
        } else {
            var l = "";
            l += "<div class='tableContent-wrp'>", l += "<div class='noResult-data'>" + TCG.Prop("no_result") + "</div>", l += "</div>", $("#unclaimedList,#claimedList,#expiredList").html(l)
        }
    },
    loadLottoGameHistoryItem: function(a, b, c, d) {
        globalVar.orderId = b, globalVar.orderMasterId = c, globalVar.orderMultiple = a.multiple, $("#itemWrapper .prsnl-game-name").html("<span id='rm_" + a.gameCode + "'>&nbsp;</span>");
        var e = control.shortenText(a.orderNumber);
        if ($("#chasing").hasClass("hide") || $("#chasing").addClass("hide"), 1 == d || "true" == d) {
            var f = a.chasingOrder;
            e = e + "-" + $.strPad(f, 3), "true" === sessionStorage.getItem("noChaseOrder") && $("#backToGameHistory").attr("id", "backToChasing")
        }
        $("#itemWrapper #lotteryNum").removeClass("double"), $("#itemWrapper .orderNo").text(e), $("#itemWrapper .seriesModel").text(a.series + "/" + TCG.Prop("bettingMode_" + a.bettingModeCode)), $("#itemWrapper .prizeMoney").html(null == a.winningAmount ? "-" : control.customCurrencyFormat(a.winningAmount, 4)), $("#itemWrapper .bettingNoteCount").text(a.stakes), $("#itemWrapper .bettingMultiples").html(control.currencyFormat(a.multiple)), $("#itemWrapper .bettingTime").text(control.timeToDateFormat(a.bettingTime, "dateTime")), $("#itemWrapper .orderStatus").text(TCG.Prop("orderStatus_" + a.orderStatus)), $("#itemWrapper .bettingOnNumber").text(a.numero);
        var g = null == a.winningNumber ? "-" : a.winningNumber,
            h = g.indexOf(",") < 0 ? "" : ",";
        $("#itemWrapper #lotteryNum").html("<span>" + g.split(h).join("</span><span>") + "</span>"), null != a.winningNumber && $("#itemWrapper #lotteryNum").addClass("lotteryNumbers"), "," == h && $("#itemWrapper #lotteryNum").addClass("double");
        var i = "",
            j = $("#itemWrapper [name='pageNo']");
        $.ajax({
            url: "./lgw/orders/detail/" + b + "/info",
            data: {
                page: 1 * j.val() - 1,
                size: 100
            },
            headers: globalVar.headers,
            method: "GET",
            dataType: "json",
            contentType: "application/json",
            success: function(b, c, d) {
                for (var e = b.content, f = 0; f < e.length; f++) {
                    var g = control.betMap(e[f]);
                    i += "<div class='divTableRow'>", i += "<div class='divTableCell onel-cl-y ps-cen yel-pop'>" + g.playName, i += "<div class='pop-yellow' style='left:0'>" + g.playName + "</div>", i += "</div>", i += "<div class='divTableCell onel-cl-y ps-cen yel-pop xdaLs'>" + control.strSub(g.bet, 10) + "<div class='pop-yellow'>", i += control.hoverLongText(g.bet, 50), i += "</div></div>", i += "<div class='divTableCell onel-cl-y ps-cen xd2-xda'>" + e[f].stakes + "</div>", i += "<div class='divTableCell onel-cl-y ps-cen xd3-xda'>" + e[f].series + "/" + TCG.Prop("bettingMode_" + e[f].bettingMode) + "/" + e[f].multiple * globalVar.orderMultiple + "</div>", i += "<div class='divTableCell onel-cl-y ps-cen xg-xlass' data-switchDecimal='2' data-value='" + e[f].bettingAmount * globalVar.orderMultiple + "'>" + control.customCurrencyFormat(globalVar.orderMultiple * e[f].bettingAmount, 2) + "</div>";
                    var h = null == e[f].winAmount ? "-" : 1 * e[f].winAmount,
                        k = null != e[f].winAmount ? "tbl-red" : "";
                    i += "<div class='divTableCell onel-cl-y ps-cen xd3-xd cus-left-rel " + k + "' data-switchDecimal='2' data-value='" + h + "'>" + control.customCurrencyFormat(h, 2) + "</div>", i += "</div>"
                }
                2 == a.orderStatus ? $("#cancelGameHistoryDetail").parent().show() : $("#cancelGameHistoryDetail").parent().hide(), $("#itemList").html(i), $(".moreText").on("click", function() {
                    control.showLongText($(this).attr("data-text"))
                }), UI.loadPagination("itemWrapper", j.val(), b.totalPages, "#orderDetailPagination")
            }
        }), control.switchDecimal(), $("#backToChasing").on("click", function() {
            sessionStorage.setItem("orderId", b), sessionStorage.setItem("orderMasterId", c), sessionStorage.setItem("chasingOrder", a.chasingOrder), sessionStorage.setItem("chasing", d), sessionStorage.setItem("noChaseOrder", "false"), $('.model_child_menus li[data-submenu="norecordChase"]').trigger("click")
        }), control.goBackToGameHistory(), control.addCopySelection("js-copybtn")
    },
    separateOrderDetail: function(a, b, c) {
        globalVar.orderMasterId, c = globalVar.orderId;
        var d = "",
            e = $("#itemWrapper [name='pageNo']");
        $.ajax({
            url: "./lgw/orders/detail/" + c + "/info",
            data: {
                page: 1 * e.val() - 1,
                size: 100
            },
            headers: globalVar.headers,
            dataType: "json",
            contentType: "application/json",
            success: function(b, c, f) {
                for (var g = b.content, h = 0; h < g.length; h++) {
                    var i = control.betMap(g[h]);
                    d += "<div class='divTableRow'>", d += "<div class='divTableCell onel-cl-y ps-cen yel-pop'>" + i.playName, d += "<div class='pop-yellow' style='left:0'>" + i.playName + "</div>", d += "</div>", d += "<div class='divTableCell onel-cl-y ps-cen yel-pop xdaLs'>" + control.strSub(i.bet, 10) + "<div class='pop-yellow'>", d += control.hoverLongText(i.bet, 50), d += "</div></div>", d += "<div class='divTableCell onel-cl-y ps-cen xd2-xda'>" + g[h].stakes + "</div>", d += "<div class='divTableCell onel-cl-y ps-cen xd3-xda'>" + g[h].series + "/" + TCG.Prop("bettingMode_" + g[h].bettingMode) + "/" + g[h].multiple * globalVar.orderMultiple + "</div>", d += "<div class='divTableCell onel-cl-y ps-cen xg-xlass' data-switchDecimal='2' data-value='" + g[h].bettingAmount * globalVar.orderMultiple + "'>" + control.customCurrencyFormat(globalVar.orderMultiple * g[h].bettingAmount, 2) + "</div>";
                    var j = null == g[h].winAmount ? "-" : 1 * g[h].winAmount,
                        k = null != g[h].winAmount ? "tbl-red" : "";
                    d += "<div class='divTableCell onel-cl-y ps-cen xd3-xd cus-left-rel " + k + "' data-switchDecimal='2' data-value='" + j + "'>" + control.customCurrencyFormat(j, 2) + "</div>", d += "</div>"
                }
                switch ($("#itemList").html(d), $(".moreText").on("click", function() {
                    control.showLongText($(this).attr("data-text"))
                }), a) {
                    case "betHistory":
                        $("#itemList").html(d), UI.loadPagination("itemWrapper", e.val(), b.totalPages, "#orderDetailPagination");
                        break;
                    case "nrc":
                        $("#orderInfos").html(d), UI.loadPagination("nrc-table-2", e.val(), b.totalPages, "#ncoDetailPagination")
                }
            }
        })
    },
    loadPvpGameHistory: function(a, b) {
        var c = "",
            d = "",
            e = a.list,
            f = a.footer;
        if (e.length > 0)
            for (var g = 0; g < e.length; g++) c += "<div class='divTableRow'>", c += "<div class='divTableCell onel-cl-y ps-cen dl-chz1'>" + TCG.Prop(e[g].game_category) + "</div>", c += "<div class='divTableCell onel-cl-y ps-cen dl-chz1'>" + e[g].game_name + "</div>", c += "<div class='divTableCell onel-cl-y ps-cen' data-switchDecimal='2' data-value='" + e[g].game_loses + "'>" + control.customCurrencyFormat(e[g].game_loses, 2) + "</div>", c += "<div class='divTableCell onel-cl-y ps-cen' data-switchDecimal='2' data-value='" + e[g].game_winnings + "'>" + control.customCurrencyFormat(e[g].game_winnings, 2) + "</div>", c += "<div class='divTableCell onel-cl-y ps-cen' data-switchDecimal='2' data-value='" + e[g].net_profit + "'>" + control.customCurrencyFormat(e[g].net_profit, 2) + "</div>", c += "</div>";
        else c += "<div class='tableContent-wrp'>", c += "<div class='noResult-data'>" + TCG.Prop("no_result") + "</div>", c += "</div>";
        if ($("#pvpGameHistoryTable .betLost").text("PVP" == b ? "净输金额" : "投注金额"), $("#pvpGameHistoryTable .prizeWon").text("PVP" == b ? "净赢金额" : "中奖金额"), $("#pvpGameHistoryList").html(c), null !== f && "object" == typeof f) {
            var h = f.game_loses,
                i = f.game_winnings,
                j = "PVP" == b ? "净输金额合计" : "有效投注金额合计",
                k = "PVP" == b ? "净赢金额合计" : "中奖金额合计";
            d += "<div class='tbl-total-con inline-block'>" + j + ":</div>", d += "<div class='tbl-total-amt inline-block' data-switchDecimal='2' data-value='" + h + "'>" + control.customCurrencyFormat(h, 2) + "</div>", d += "<div class='tbl-total-con inline-block'>" + k + ":</div>", d += "<div class='tbl-total-amt inline-block' data-switchDecimal='2' data-value='" + i + "'>" + control.customCurrencyFormat(i, 2) + "</div>"
        }
        $("#pvpGameHistoryTotal").html(d)
    },
    loadBetHistory: function(a) {
        var b = "",
            c = "",
            d = a.list,
            e = a.footer;
        if (d.length > 0)
            for (var f = 0; f < d.length; f++) b += "<div class='divTableRow'>", b += "<div class='divTableCell onel-cl-y ps-cen c-150'>" + d[f].betTime + "</div>", b += "<div class='divTableCell onel-cl-y ps-cen' data-switchDecimal='2' data-value='" + d[f].betAmt + "'>" + control.customCurrencyFormat(d[f].betAmt, 2) + "</div>", b += "<div class='divTableCell onel-cl-y ps-cen' data-switchDecimal='2' data-value='" + d[f].winAmt + "'>" + control.customCurrencyFormat(d[f].winAmt, 2) + "</div>", b += "<div class='divTableCell onel-cl-y ps-cen' data-switchDecimal='2' data-value='" + (d[f].winAmt - d[f].betAmt) + "'>" + control.customCurrencyFormat(d[f].winAmt - d[f].betAmt, 2) + "</div>", b += "<div class='divTableCell onel-cl-y ps-cen'>" + d[f].betOrderNo + "</div>", b += "</div>";
        else b += "<div class='tableContent-wrp'>", b += "<div class='noResult-data'>" + TCG.Prop("no_result") + "</div>", b += "</div>";
        if ($("#betHistoryList").html(b), null !== e && "object" == typeof e) {
            var g = e.game_loses,
                h = e.game_winnings,
                i = "PVP" == gameType ? "净输金额合计" : "有效投注金额合计",
                j = "PVP" == gameType ? "净赢金额合计" : "中奖金额合计";
            c += "<div class='tbl-total-con inline-block'>" + i + ":</div>", c += "<div class='tbl-total-amt inline-block' data-switchDecimal='2' data-value='" + g + "'>" + control.customCurrencyFormat(g, 2) + "</div>", c += "<div class='tbl-total-con inline-block'>" + j + ":</div>", c += "<div class='tbl-total-amt inline-block' data-switchDecimal='2' data-value='" + h + "'>" + control.customCurrencyFormat(h, 2) + "</div>"
        }
        $("#betHistoryTotal").html(c)
    },
    loadCustomerSeries: function(a) {
        TCG.Ajax({
            url: "./getLottoGamesSeries?merchantCode=2000cai"
        }, function(b) {
            if (b.status) {
                var c = {};
                $(b.result).map(function() {
                    switch (this.gameGroupCode + this.prizeModeId) {
                        case "SSC1":
                            c.SSC1 = 1 * this.maxBetSeries;
                            break;
                        case "SSC2":
                            c.SSC2 = 1 * this.maxBetSeries;
                            break;
                        case "11X51":
                            c["11X5"] = 1 * this.maxBetSeries;
                            break;
                        case "LF1":
                            c.FC3D = 1 * this.maxBetSeries, c.TCP3P5 = 1 * this.maxBetSeries;
                            break;
                        case "PK101":
                            c.PK101 = 1 * this.maxBetSeries
                    }
                });
                for (var d = 0; d < a.length; d++) {
                    var e = a[d].maxSeries,
                        f = a[d].gameGroupCode,
                        g = "",
                        h = a[d].rebateRate,
                        i = a[d].playMenuGroups;
                    "SSC" == f && (f = 1 == a[d].prizeModeId ? "SSC1" : "SSC2"), "LF" == f && (f = a[d].gameCode), "PK10" == f && (f = "PK101");
                    for (var j = 0; j < i.length; j++) {
                        var k = j % 2 == 0 ? "yellow-bg" : "",
                            l = i[j].playMenus,
                            m = null != i[j].playCode ? TCG.Prop(i[j].playCode) : "",
                            n = UI.loadPlayMenus(l, k, f, e, h, c, i[j].playCode),
                            o = n.total_rowSpan;
                        g += "<tr class='" + k + "'>", g += "<td rowspan='" + o + "'>" + m + "</td>", g += n.html
                    }
                    $("#bonusDetails_" + f).after(g)
                }
            } else TCG.Alert("errors", TCG.Prop(b.description))
        })
    },
    loadPlayMenus: function(a, b, c, d, e, f, g) {
        for (var h = "", i = 0, j = 0; j < a.length; j++) {
            var k = a[j].playInfos,
                l = k.length,
                m = null != a[j].playCode ? TCG.Prop(a[j].playCode) : "";
            h += a.length > 1 && j > 0 ? "<tr class='" + b + "'>" : "", h += "<td rowspan='" + l + "'>" + m + "</td>", h += UI.loadPlayInfos(k, b, a.length, k.length, c, d, e, f, g, a[j].playCode), i += k.length
        }
        return {
            html: h,
            total_rowSpan: i
        }
    },
    loadPlayInfos: function(a, b, c, d, e, f, g, h, i, j) {
        var k = "";
        if ($.inArray(j, ["First2Sum_PK10", "First3Sum_PK10", "FirstLastSum_PK10"]) > -1) {
            var l = a.slice(0);
            l.sort(function(a, b) {
                return b.bonus - a.bonus
            }), a = l
        }
        for (var m = 0; m < a.length; m++) {
            k += d > 1 && m > 0 ? "<tr class='" + b + "'>" : "";
            var n = null != a[m].prizeType ? TCG.Prop(a[m].prizeType) : "";
            switch (e) {
                case "SSC1":
                    k += "<td>" + n + "</td>", k += "<td>" + (f > h[e] ? control.customCurrencyFormat(h[e] * (a[m].bonus / 1e3), 4) : control.customCurrencyFormat(f * a[m].bonus / 1e3, 4)) + "</td>", k += "<td>" + 100 * g + "%</td>";
                    break;
                case "SSC2":
                    k += "<td>" + n + "</td>";
                    var o = f > h[e] ? h[e] * (a[m].bonus / 1e3) : f * a[m].bonus / 1e3;
                    k += "<td>" + control.customCurrencyFormat(o, 4) + "</td>", k += "<td>" + control.customCurrencyFormat(.9 * o, 4) + "</td>", k += "<td>" + control.customCurrencyFormat(.75 * o, 4) + "</td>", k += "<td>" + (100 * g).toFixed(2) + "%</td>";
                    break;
                case "11X5":
                    k += "<td>" + n + "</td>", k += "<td>" + (f > h[e] ? control.customCurrencyFormat(h[e] * (a[m].bonus / 990), 4) : control.customCurrencyFormat(f * a[m].bonus / 990, 4)) + "</td>", k += "<td>" + 100 * g + "%</td>";
                    break;
                case "FC3D":
                case "TCP3P5":
                    k += "<td>" + n + "</td>", k += "<td>" + (f > h[e] ? control.customCurrencyFormat(h[e] * (a[m].bonus / 1e3), 4) : control.customCurrencyFormat(f * a[m].bonus / 1e3, 4)) + "</td>", k += "<td>" + 100 * g + "%</td>";
                    break;
                case "PK101":
                    if ("Sum_PK10" == i)
                        if ("P_FIRST" == a[m].prizeType) switch (j) {
                            case "First2Sum_PK10":
                                k += "<td>3,4,18,19</td>";
                                break;
                            case "First3Sum_PK10":
                                k += "<td>6,7,26,27</td>";
                                break;
                            case "FirstLastSum_PK10":
                                k += "<td>3,4,18,19</td>";
                                break;
                            default:
                                k += "<td>" + n + "</td>"
                        } else if ("P_SECOND" == a[m].prizeType) switch (j) {
                            case "First2Sum_PK10":
                                k += "<td>5,6,16,17</td>";
                                break;
                            case "First3Sum_PK10":
                                k += "<td>8,25</td>";
                                break;
                            case "FirstLastSum_PK10":
                                k += "<td>5,6,16,17</td>";
                                break;
                            default:
                                k += "<td>" + n + "</td>"
                        } else if ("P_THIRD" == a[m].prizeType) switch (j) {
                            case "First2Sum_PK10":
                                k += "<td>7,8,14,15</td>";
                                break;
                            case "First3Sum_PK10":
                                k += "<td>9,24</td>";
                                break;
                            case "FirstLastSum_PK10":
                                k += "<td>7,8,14,15</td>";
                                break;
                            default:
                                k += "<td>" + n + "</td>"
                        } else if ("P_FOURTH" == a[m].prizeType) switch (j) {
                            case "First2Sum_PK10":
                                k += "<td>9,10,12,13</td>";
                                break;
                            case "First3Sum_PK10":
                                k += "<td>10,23</td>";
                                break;
                            case "FirstLastSum_PK10":
                                k += "<td>9,10,12,13</td>";
                                break;
                            default:
                                k += "<td>" + n + "</td>"
                        } else if ("P_FIFTH" == a[m].prizeType) switch (j) {
                            case "First2Sum_PK10":
                                k += "<td>11</td>";
                                break;
                            case "First3Sum_PK10":
                                k += "<td>11,22</td>";
                                break;
                            case "FirstLastSum_PK10":
                                k += "<td>11</td>";
                                break;
                            default:
                                k += "<td>" + n + "</td>"
                        } else if ("P_SIXTH" == a[m].prizeType) switch (j) {
                            case "First3Sum_PK10":
                                k += "<td>12,21</td>";
                                break;
                            default:
                                k += "<td>" + n + "</td>"
                        } else if ("P_SEVENTH" == a[m].prizeType) switch (j) {
                            case "First3Sum_PK10":
                                k += "<td>13,20</td>";
                                break;
                            default:
                                k += "<td>" + n + "</td>"
                        } else if ("P_EIGHTH" == a[m].prizeType) switch (j) {
                                case "First3Sum_PK10":
                                    k += "<td>14,19</td>";
                                    break;
                                default:
                                    k += "<td>" + n + "</td>"
                            } else if ("P_NINTH" == a[m].prizeType) switch (j) {
                                case "First3Sum_PK10":
                                    k += "<td>15,16,17,18</td>";
                                    break;
                                default:
                                    k += "<td>" + n + "</td>"
                            } else k += "<td>" + n + "</td>";
                            else k += "<td>" + n + "</td>";
                    k += "<td>" + (f > h[e] ? control.customCurrencyFormat(h[e] * (a[m].bonus / 1e3), 4) : control.customCurrencyFormat(f * a[m].bonus / 1e3, 4)) + "</td>", k += "<td>" + 100 * g + "%</td>"
            }
            k += d > 1 && m > 0 ? "</tr>" : "", k += c > 1 && 0 == m ? "</tr>" : "", $("#highest_rebate_" + e).text(f)
        }
        return k
    },
    bak_loadCustomerSeries: function(a) {
        for (var b = 0; b < a.length; b++) {
            var c = a[b].maxBetSeries,
                d = a[b].maxSeries;
            switch (a[b].gameGroupCode) {
                case "SSC":
                    if (1 == a[b].prizeModeId) {
                        $("#tab-content1 .max-series").text(d);
                        var e = [1e5, 2e4, 200, 20, 1e5, 1e4, 1e3, 100, 10, 1e4, 1e4, 1e3, 100, 10, 1e4, 1e4, 1e3, 100, 10, 1e3, 333.33333, 166.66667, 1e3, 100, 10, 1e3, 1e3, 333.33333, 166.66667, 1e3, 333.33333, 166.66667, 1e3, 100, 10, 1e3, 1e3, 333.33333, 166.66667, 1e3, 333.33333, 166.66667, 1e3, 100, 10, 1e3, 1e3, 333.33333, 166.66667, 100, 50, 100, 10, 100, 100, 50, 100, 10, 100, 10, 10, 3.69, 18.5185, 1e3, 333.33333, 166.6667, 1e3, 333.33333, 166.6667, 3.69, 18.5185, 1e3, 333.33333, 166.6667, 1e3, 333.33333, 166.6667, 3.69, 18.5185, 1e3, 333.33333, 166.6667, 1e3, 333.33333, 166.6667, 5.2632, 100, 50, 5.2632, 100, 50, 4, 4, 10, 100, 1e3, 1e4];
                        UI.computeRebate("SSC1", e, d, c)
                    } else {
                        $("#tab-content2 .max-series").text(d);
                        var e = [1e4, 1e4, 1e3, 100, 10, 1e4, 1e4, 1e3, 100, 10, 1e3, 333.33333, 166.66667, 1e3, 100, 10, 1e3, 1e3, 333.33333, 166.66667, 1e3, 333.33333, 166.66667, 1e3, 100, 10, 1e3, 1e3, 333.33333, 166.66667, 1e3, 333.33333, 166.66667, 1e3, 100, 10, 1e3, 1e3, 333.33333, 166.66667, 100, 50, 100, 10, 100, 100, 50, 100, 10, 100, 10, 10, 3.69, 18.5185, 1e3, 333.33333, 166.6667, 1e3, 333.33333, 166.6667, 3.69, 18.5185, 1e3, 333.33333, 166.6667, 1e3, 333.33333, 166.6667, 3.69, 18.5185, 1e3, 333.33333, 166.6667, 1e3, 333.33333, 166.6667, 5.2632, 100, 50, 5.2632, 100, 50, 4, 4, 10, 100, 1e3, 1e4];
                        UI.computeRebate("SSC2", e, d, c)
                    }
                    break;
                case "11X5":
                    $("#tab-content3 .max-series").text(d);
                    var e = [2.2, 5.5, 16.5, 66, 462, 77, 22, 8.25, 5.5, 16.5, 66, 462, 77, 22, 8.25, 462, 77, 15.4, 6.16, 3.08, 2.31, 16.5, 7.3333, 5.1333, 4.62, 990, 165, 110, 55, 3.66666, 11];
                    UI.computeRebate("11X5", e, d, c);
                    break;
                case "LF":
                    $("#tab-content4 .max-series").text(d);
                    var e = [1e3, 1e3, 333.3333, 166.6666, 333.3333, 166.6666, 333.3333, 166.6666, 100, 50, 100, 50, 3.69, 18.52, 35.7, 4, 4, 10];
                    UI.computeRebate("3D", e, d, c), $("#tab-content5 .max-series").text(d);
                    var e = [1e3, 1e3, 333.3333, 166.6666, 333.3333, 166.6666, 333.3333, 166.6666, 3.69, 18.52, 35.7, 100, 50, 100, 50, 100, 50, 4, 4, 4, 10, 10];
                    UI.computeRebate("P3P5", e, d, c)
            }
        }
    },
    computeRebate: function(a, b, c, d) {
        switch (a) {
            case "SSC1":
                for (var e = c > d ? d : c, f = (c - d) / 20, g = 0; g < b.length; g++) {
                    var h = g + 1,
                        i = e * b[g] / 1e3;
                    $("#tab-content1 .trow-" + h + " .col-a").html(control.customCurrencyFormat(i, 2)), $("#tab-content1 .trow-" + h + " .col-b").html(control.customCurrencyFormat(f, 2) + "%")
                }
                break;
            case "SSC2":
                for (var e = c > d ? d : c, j = .9 * e, k = .75 * e, f = (c - d) / 20, g = 0; g < b.length; g++) {
                    var h = g + 1,
                        i = e * b[g] / 1e3;
                    $("#tab-content2 .trow-" + h + " .col-a").html(control.customCurrencyFormat(i, 2)), $("#tab-content2 .trow-" + h + " .col-a1").html(control.customCurrencyFormat(j, 2)), $("#tab-content2 .trow-" + h + " .col-a2").html(control.customCurrencyFormat(k, 2)), $("#tab-content2 .trow-" + h + " .col-b").html(control.customCurrencyFormat(f, 2) + "%")
                }
                break;
            case "11X5":
                for (var e = c > d ? d : c, f = (c - d) / 20, g = 0; g < b.length; g++) {
                    var h = g + 1,
                        i = e * b[g] / 1e3;
                    $("#tab-content3 .trow-" + h + " .col-a").html(control.customCurrencyFormat(i, 2)), $("#tab-content3 .trow-" + h + " .col-b").html(control.customCurrencyFormat(f, 2) + "%")
                }
                break;
            case "3D":
                for (var e = c > d ? d : c, f = (c - d) / 20, g = 0; g < b.length; g++) {
                    var h = g + 1,
                        i = e * b[g] / 1e3;
                    $("#tab-content4 .trow-" + h + " .col-a").html(control.customCurrencyFormat(i, 2)), $("#tab-content4 .trow-" + h + " .col-b").html(control.customCurrencyFormat(f, 2) + "%")
                }
                break;
            case "P3P5":
                for (var e = c > d ? d : c, f = (c - d) / 20, g = 0; g < b.length; g++) {
                    var h = g + 1,
                        i = e * b[g] / 1e3;
                    $("#tab-content5 .trow-" + h + " .col-a").html(control.customCurrencyFormat(i, 2)), $("#tab-content5 .trow-" + h + " .col-b").html(control.customCurrencyFormat(f, 2) + "%")
                }
        }
    },
    loadAgentDownlines: function(a) {
        var b = [],
            c = 0,
            d = ["会员", "代理"],
            e = ["关闭", "正常", "过期"];
        if (a.List.length > 0)
            for (var f = 0; f < a.List.length; f++) {
                var g = a.List[f];
                c += g.affiliateCount;
                var h = UI.generateAffiliateUrl(g.code);
                b.push('<div class="divTableRow border-bot clearfix">'), b.push('<div class="divTableCell yel-con-2">' + UI.shortenPathName(g.path) + "</div>"), b.push('<div class="divTableCell div-x tbl-link ico-file zeroclipboard" data-clipboard-text="' + h.url + '">' + UI.beautifyAffiliateUrl(g.code) + "</div>"), b.push('<div class="divTableCell div-z registerCount">' + g.affiliateCount + "</div>"), b.push('<div class="divTableCell div-y">' + d[g.type] + "</div>"), b.push('<div class="divTableCell div-y">' + e[g.status] + "</div>"), b.push('<div class="divTableCell">' + g.startDate + "</div>"), b.push('<div class="divTableCell">' + (null != g.endDate ? g.endDate : "永久有效") + "</div>"), b.push('<div class="divTableCell div-y"><div class="tbl-gear game-icons"><ul class="dropdown-opts hide"><span class="arrow-up"></span><li class="affiliateUrlDetail">详情</li><li class="affiliateUrlDelete">删除</li></ul></div></div>'), b.push('<div style="display:none;" class="entry">' + JSON.stringify(g) + "</div>"), b.push("</div>")
            } else b.push("<div class='tableContent-wrp'>"), b.push("<div class='noResult-data'>" + TCG.Prop("no_result") + "</div>"), b.push("</div>");
        $("#linkManagerList").html(b.join("")), $("#linkManagerForm #totalEffectiveAmount").text(c), ZeroClipboard.config({
            moviePath: window.location.origin + "/js/lib/ZeroClipboard.swf"
        }), new ZeroClipboard($(".zeroclipboard")).on("complete", function(a, b) {
            TCG.Alert("success", TCG.Prop("linkManager_success_copy"))
        })
    },
    generateAffiliateUrl: function(a) {
        var b = "",
            c = "",
            d = window.location.host.split(".");
        return c = a + "." + d[1] + "." + d[2], b += window.location.protocol + "//", b += c, b += "/register.html", {
            hostname: c,
            url: b
        }
    },
    beautifyAffiliateUrl: function(a) {
        return "<span>" + UI.generateAffiliateUrl(a).hostname + "</span>"
    },
    shortenPathName: function(a) {
        var b = null === a ? "-" : a;
        return b.length > 4 && (b = b.substring(0, 4) + "...", b += '<div class="pop-yel-2"><span>' + a + "</span></div>"), b
    },
    loadMemberManagement: function(a, b) {
        var c = a,
            d = "";
        if (null != c)
            for (var e = 0; e < c.length; e++) {
                var f = null == c[e].lastLogin ? new Date : c[e].lastLogin.time,
                    g = null == c[e].registerDate ? new Date : c[e].registerDate.time,
                    h = (0 == c[e].activeFlag || (1 == c[e].activeFlag || (2 == c[e].activeFlag || (5 == c[e].activeFlag || (6 == c[e].activeFlag || c[e].activeFlag)))), 0 == c[e].super6Rebate ? "-" : c[e].super6Rebate),
                    i = 0 == c[e].sscRebate ? "-" : c[e].sscRebate,
                    j = control.customCurrencyFormat(c[e].accountBalance, 2);
                d += '<div class="divTableRow border-bot clearfix">', d += '<div id="showdetail" class="divTableCell div-x tbl-link" data-downline=' + c[e].customerId + ">" + c[e].customerName + "</div>", d += '<div class="divTableCell ">' + (1 == c[e].type ? "代理" : "会员") + "</div>", d += '<div class="divTableCell ">' + c[e].teamSize + "</div>", d += '<div class="divTableCell div-z">' + control.formatDateFull(1 * g, "yyyy-MM-dd hh:mm") + "</div>", d += '<div class="divTableCell div-x">' + control.days_between(new Date, new Date(1 * f)) + "</div>", d += '<div class="divTableCell ">' + i + "</div>", d += '<div class="divTableCell ">' + h + "</div>", d += '<div class="divTableCell div-x ps-num" data-switchDecimal="2"  data-value="' + c[e].accountBalance.toFixed(2) + '">' + j + "</div>", d += '<div class="divTableCell div-y"><div class="tbl-gear game-icons"><ul class="dropdown-opts hide"><span class="arrow-up"></span>', d += function(a) {
                    var b = "";
                    return b += '<li class="setRebate" >返点设定</li>', b += '<li class="bettingHistoryLink">游戏记录</li>', b += '<li class="transferToDown" data-downline="' + c[e].customerName + '">转给下级</li>', 0 == a.type && (b += '<li class="setAgent">设定代理</li>'), b += '<li class="sendMessage" data-customername="' + a.customerName + '" data-customerid="' + a.customerId + '">发送消息</li>'
                }(c[e]), d += "</ul></div></div>", d += '<div class="entry" style="display:none;">' + JSON.stringify(c[e]) + "</div>", d += "</div>"
            }
        $("#memberManagementList").html(d), $("#totalTeamSize").html(sessionStorage.teamSize), $("#totalPlannedAmount").html(control.customCurrencyFormat(sessionStorage.teamBalance, 2)).attr({
            "data-SwitchDecimal": 2,
            "data-value": sessionStorage.teamBalance
        })
    },
    loadBettingRecord: function(a) {
        var b = "",
            c = "",
            d = a.footer,
            e = a.list;
        if (null !== e && e instanceof Array && e.length > 0 ? $.each(e, function(a, c) {
                var d = c.create_time.split(" ")[0],
                    e = "";
                switch (c.status) {
                    case "2":
                        e = "未开奖";
                        break;
                    case "4":
                        e = "已中奖";
                        break;
                    case "5":
                        e = "未中奖";
                        break;
                    case "6":
                        e = "追中撤单";
                        break;
                    case "7":
                        e = "出号撤单";
                        break;
                    case "8":
                        e = "个人撤单";
                        break;
                    case "12":
                        e = "空开撤单"
                }
                b += '<div class="divTableRow border-bot clearfix">', b += '<div class="divTableCell onel-th-x">' + control.shortenText(c.order_num) + "</div>", b += '<div class="divTableCell onel-th-x">' + c.game_name + "</div>", b += '<div class="divTableCell onel-th-x">' + control.formatDateFull(d, "yyyy-MM-dd") + "</div>", b += '<div class="divTableCell onel-th-x rs-td-amt" data-switchDecimal="2" data-value="' + c.actual_bet_amount + '" >' + control.customCurrencyFormat(c.actual_bet_amount, 2) + "</span></div>", b += '<div class="divTableCell onel-th-x rs-td-amt tbl-red" data-switchDecimal="2" data-value="' + c.win_amount + '">' + control.customCurrencyFormat(c.win_amount, 2) + "</span></div>", b += '<div class="divTableCell onel-th-x tbl-red">' + e + "</div>", b += "</div>"
            }) : (b += "<div class='tableContent-wrp'>", b += "<div class='noResult-data'>" + TCG.Prop("no_result") + "</div>", b += "</div>"), null !== d && "object" == typeof d) {
            var f = d.total_actual_bet_amount,
                g = d.total_win_amount;
            c += "<div class='tbl-total-con inline-block'>投注金额合计:", c += "<span class='tbl-total-amt inline-block' data-SwitchDecimal='2' data-value='" + f + "'>" + control.customCurrencyFormat(f, 2) + "</span>", c += "</div>", c += "<div class='tbl-total-con inline-block'>中奖金额合计:", c += "<span class='tbl-total-amt inline-block' data-SwitchDecimal='2' data-value='" + g + "'>" + control.customCurrencyFormat(g, 2) + "</span>", c += "</div>"
        }
        $("#gameHistoryList").html(b), $("#agentGameHistoryTotal").html(c), $("#agentGameHistoryForm input[name='orderNum']").on("change", function() {
            $(this).val($(this).val().toUpperCase())
        })
    },
    loadAgentPvpGameHistory: function(a, b) {
        var c = "",
            d = "",
            e = a.list,
            f = a.footer;
        if (null !== e && e instanceof Array && e.length > 0)
            for (var g = 0; g < e.length; g++) c += "<div class='divTableRow border-bot clearfix'>", c += "<div class='divTableCell onel-th-x'>" + TCG.Prop(e[g].game_category) + "</div>", c += "<div class='divTableCell onel-th-x ch-width140'>" + e[g].game_name + "</div>", c += "<div class='divTableCell onel-th-x rs-td-amt' data-switchDecimal='2' data-value='" + e[g].game_loses + "'>" + control.customCurrencyFormat(e[g].game_loses, 2) + "</span></div>", c += "<div class='divTableCell onel-th-x rs-td-amt' data-switchDecimal='2' data-value='" + e[g].game_winnings + "'>" + control.customCurrencyFormat(e[g].game_winnings, 2) + "</span></div>", c += "<div class='divTableCell onel-th-x' data-switchDecimal='2' data-value='" + e[g].net_profit + "'>" + control.customCurrencyFormat(e[g].net_profit, 2) + "</div>", c += "</div>";
        else c += "<div class='tableContent-wrp'>", c += "<div class='noResult-data'>" + TCG.Prop("no_result") + "</div>", c += "</div>";
        if (null !== f && "object" == typeof f) {
            var h = f.game_loses,
                i = f.game_winnings,
                j = "PVP" == b ? "净输金额合计" : "有效投注金额合计",
                k = "PVP" == b ? "净赢金额合计" : "中奖金额合计";
            d += "<div class='tbl-total-con inline-block'>" + j + ":", d += "<span class='tbl-total-amt inline-block' data-SwitchDecimal='2' data-value='" + h + "'>" + control.customCurrencyFormat(h, 2) + "</span>", d += "</div>", d += "<div class='tbl-total-con inline-block'>" + k + ":", d += "<span class='tbl-total-amt inline-block' data-SwitchDecimal='2' data-value='" + i + "'>" + control.customCurrencyFormat(i, 2) + "</span>", d += "</div>"
        }
        $("#agentPvpGameHistoryTable .betLoss").text("PVP" == b ? "净输金额" : "投注金额"), $("#agentPvpGameHistoryTable .prizeWon").text("PVP" == b ? "净赢金额" : "中奖金额"), $("#agentPvpGameHistoryList").html(c), $("#agentPvpGameHistoryTotal").html(d)
    },
    loadLottoAgentPnl: function(a, b) {
        var c = "";
        0 == b ? (c += "<div class='divTableCell onel-th-x'>帐号</div>", c += "<div class='divTableCell onel-th-x'>充值</div>", c += "<div class='divTableCell onel-th-x'>提款</div>", c += "<div class='divTableCell onel-th-x'>投注</div>", c += "<div class='divTableCell onel-th-x'>返点</div>", c += "<div class='divTableCell onel-th-x'>中奖</div>", c += "<div class='divTableCell onel-th-x'>活动</div>", c += "<div class='divTableCell onel-th-x'>盈亏</div>") : (c += "<div class='divTableCell onel-th-x'>账号</div>", c += "<div class='divTableCell onel-th-x'>团队充值</div>", c += "<div class='divTableCell onel-th-x'>团队提款</div>", c += "<div class='divTableCell onel-th-x'>团队投注</div>", c += "<div class='divTableCell onel-th-x'>团队返点</div>", c += "<div class='divTableCell onel-th-x'>团队中奖</div>", c += "<div class='divTableCell onel-th-x'>团队活动</div>", c += "<div class='divTableCell onel-th-x'>团队盈亏</div>"), $("#lottoAgentPnlColumn").html(c);
        var d = a.list,
            e = "",
            f = "";
        if (null !== d && d instanceof Array && d.length > 0)
            for (var g = 0; g < d.length; g++) {
                e += "<div class='divTableRow'>";
                var h = d[g].customer_name.split("@");
                f = "1" === d[g].has_direct ? "tbl-link" : "", e += "<div class='divTableCell " + f + "' data-customerId='" + d[g].customer_id + "'>" + h[1] + "</div>";
                var i = d[g].deposit + d[g].agent_transfer_in;
                e += "<div class='divTableCell ps-num' data-switchDecimal='2' data-value='" + i + "'>" + control.customCurrencyFormat(i, 2) + "</div>";
                var j = d[g].withdraw + d[g].agent_transfer_out;
                e += "<div class='divTableCell ps-num' data-switchDecimal='2' data-value='" + j + "'>" + control.customCurrencyFormat(j, 2) + "</div>", e += "<div class='divTableCell ps-num' data-switchDecimal='2' data-value='" + d[g].lott_game_betting + "'>" + control.customCurrencyFormat(d[g].lott_game_betting, 2) + "</div>";
                var k = d[g].lott_game_rebate + d[g].lott_agent_commission,
                    l = k;
                e += "<div class='divTableCell ps-num " + l + "'  data-switchDecimal='2' data-value='" + k + "'>" + control.customCurrencyFormat(k, 2) + "</div>", e += "<div class='divTableCell ps-num' data-switchDecimal='2' data-value='" + d[g].lott_game_winning + "'>" + control.customCurrencyFormat(d[g].lott_game_winning, 2) + "</div>";
                var m = d[g].lott_promotion + d[g].lott_daily_income + d[g].lott_brokerage;
                e += "<div class='divTableCell ps-num' data-switchDecimal='2' data-value='" + m + "'>" + control.customCurrencyFormat(m, 2) + "</div>";
                var n = d[g].lott_game_pnl >= 0 ? "tbl-red" : "tbl-green";
                e += "<div class='divTableCell ps-num " + n + "' data-switchDecimal='2' data-value='" + d[g].lott_game_pnl + "'>" + control.customCurrencyFormat(d[g].lott_game_pnl, 2) + "</div>", e += "</div>", $("#lottoAgentPnlForm .breadcrumbs .b-list:last").text() == h[1] && $("#lottoAgentPnlForm .breadcrumbs .b-list:last").attr("data-customerId", d[g].customer_id)
            }
        $("#lottoAgentPnlList").html(e)
    },
    loadPvpAgentPnl: function(a, b, c) {
        var d = "";
        0 == c ? (d += "<div class='divTableCell onel-th-x'>帐号</div>", d += "<div class='divTableCell onel-th-x'>充值</div>", d += "<div class='divTableCell onel-th-x'>提款</div>", d += "<div class='divTableCell onel-th-x'>" + (0 == b ? "净输" : "投注") + "</div>", d += "<div class='divTableCell onel-th-x'>" + (0 == b ? "净赢" : "中奖") + "</div>", d += "<div class='divTableCell onel-th-x'>返点</div>", d += "<div class='divTableCell onel-th-x'>活动</div>", d += "<div class='divTableCell onel-th-x'>盈亏</div>") : (d += "<div class='divTableCell onel-th-x'>帐号</div>", d += "<div class='divTableCell onel-th-x'>团队充值</div>", d += "<div class='divTableCell onel-th-x'>团队提款</div>", d += "<div class='divTableCell onel-th-x'>" + (0 == b ? "团队净输" : "团队投注") + "</div>", d += "<div class='divTableCell onel-th-x'>" + (0 == b ? "团队净赢" : "团队中奖") + "</div>", d += "<div class='divTableCell onel-th-x'>团队返点</div>", d += "<div class='divTableCell onel-th-x'>团队活动</div>", d += "<div class='divTableCell onel-th-x'>团队盈亏</div>"), $("#pvpAgentPnlColumn").html(d);
        var e = a.list,
            f = "";
        if (null !== e && e instanceof Array && e.length > 0)
            for (var g = 0; g < e.length; g++) {
                f += "<div class='divTableRow'>";
                var h = e[g].customer_name.split("@");
                f += "<div class='divTableCell tbl-link ps-strings' data-customerId='" + e[g].customer_id + "'>" + h[1] + "</div>";
                var i = e[g].deposit;
                f += "<div class='divTableCell ps-num' data-switchDecimal='2' data-value='" + i + "'>" + control.customCurrencyFormat(i, 2) + "</div>";
                var j = e[g].withdraw;
                if (f += "<div class='divTableCell ps-num' data-switchDecimal='2' data-value='" + j + "'>" + control.customCurrencyFormat(j, 2) + "</div>", 0 == b) {
                    f += "<div class='divTableCell ps-num' data-switchDecimal='2' data-value='" + e[g].pvp_game_loses + "'>" + control.customCurrencyFormat(e[g].pvp_game_loses, 2) + "</div>";
                    var k = e[g].pvp_game_winnings >= 0 ? "tbl-red" : "tbl-green";
                    f += "<div class='divTableCell ps-num " + k + "'  data-switchDecimal='2' data-value='" + e[g].pvp_game_winnings + "'>" + control.customCurrencyFormat(e[g].pvp_game_winnings, 2) + "</div>", f += "<div class='divTableCell ps-num' data-switchDecimal='2' data-value='" + e[g].pvp_game_rebate + "'>" + control.customCurrencyFormat(e[g].pvp_game_rebate, 2) + "</div>", f += "<div class='divTableCell ps-num' data-switchDecimal='2' data-value='" + e[g].pvp_promotion + "'>" + control.customCurrencyFormat(e[g].pvp_promotion, 2) + "</div>";
                    var l = e[g].pvp_game_pnl,
                        m = l >= 0 ? "tbl-red" : "tbl-green";
                    f += "<div class='divTableCell ps-num " + m + "' data-switchDecimal='2' data-value='" + l + "'>" + control.customCurrencyFormat(l, 2) + "</div>", f += "</div>"
                } else if (1 == b) {
                    f += "<div class='divTableCell ps-num' data-switchDecimal='2' data-value='" + e[g].rng_game_betting + "'>" + control.customCurrencyFormat(e[g].rng_game_betting, 2) + "</div>";
                    var k = e[g].rng_game_winning >= 0 ? "tbl-red" : "tbl-green";
                    f += "<div class='divTableCell ps-num " + k + "'  data-switchDecimal='2' data-value='" + e[g].rng_game_winning + "'>" + control.customCurrencyFormat(e[g].rng_game_winning, 2) + "</div>", f += "<div class='divTableCell ps-num' data-switchDecimal='2' data-value='" + e[g].rng_game_rebate + "'>" + control.customCurrencyFormat(e[g].rng_game_rebate, 2) + "</div>", f += "<div class='divTableCell ps-num' data-switchDecimal='2' data-value='" + e[g].rng_promotion + "'>" + control.customCurrencyFormat(e[g].rng_promotion, 2) + "</div>";
                    var m = e[g].rng_game_pnl >= 0 ? "tbl-red" : "tbl-green";
                    f += "<div class='divTableCell ps-num " + m + "' data-switchDecimal='2' data-value='" + e[g].rng_game_pnl + "'>" + control.customCurrencyFormat(e[g].rng_game_pnl, 2) + "</div>", f += "</div>"
                } else if (2 == b) {
                    f += "<div class='divTableCell ps-num' data-switchDecimal='2' data-value='" + e[g].live_game_betting + "'>" + control.customCurrencyFormat(e[g].live_game_betting, 2) + "</div>";
                    var k = e[g].live_game_winning >= 0 ? "tbl-red" : "tbl-green";
                    f += "<div class='divTableCell ps-num " + k + "'  data-switchDecimal='2' data-value='" + e[g].live_game_winning + "'>" + control.customCurrencyFormat(e[g].live_game_winning, 2) + "</div>", f += "<div class='divTableCell ps-num' data-switchDecimal='2' data-value='" + (e[g].live_game_rebate + e[g].live_agent_commission) + "'>" + control.customCurrencyFormat(e[g].live_game_rebate + e[g].live_agent_commission, 2) + "</div>", f += "<div class='divTableCell ps-num' data-switchDecimal='2' data-value='" + e[g].rng_promotion + "'>" + control.customCurrencyFormat(e[g].rng_promotion, 2) + "</div>";
                    var m = e[g].live_game_pnl >= 0 ? "tbl-red" : "tbl-green";
                    f += "<div class='divTableCell ps-num " + m + "' data-switchDecimal='2' data-value='" + e[g].live_game_pnl + "'>" + control.customCurrencyFormat(e[g].live_game_pnl, 2) + "</div>", f += "</div>"
                }
                $("#pvpAgentPnlForm .breadcrumbs .b-list:last").text() == h[1] && $("#pvpAgentPnlForm .breadcrumbs .b-list:last").attr("data-customerId", e[g].customer_id)
            }
        $("#pvpAgentPnlList").html(f)
    },
    loadAgentTeamIncome: function(a) {
        var b = "";
        b += "<div class='divTableCell onel-th-x'>帐号</div>", b += "<div class='divTableCell onel-th-x'>代理返点</div>", b += "<div class='divTableCell onel-th-x dailySalary'>日工资</div>", b += "<div class='divTableCell onel-th-x'>佣金</div>", b += "<div class='divTableCell onel-th-x'>收入总额</div>", $("#agentTeamIncomeColumn").html(b);
        var c = a.list,
            d = "";
        if (null !== c && c instanceof Array && c.length > 0)
            for (var e = 0; e < c.length; e++) {
                d += "<div class='divTableRow'>";
                var f = c[e].customer_name.split("@");
                d += "<div class='divTableCell tbl-link ps-strings' data-customerId='" + c[e].customer_id + "'>" + f[1] + "</div>", d += "<div class='divTableCell ps-num' data-switchDecimal='2' data-value='" + c[e].lott_agent_commission + "'>" + control.customCurrencyFormat(c[e].lott_agent_commission, 2) + "</div>", d += "<div class='divTableCell ps-num dailySalary' data-switchDecimal='2' data-value='" + c[e].lott_daily_income + "'>" + control.customCurrencyFormat(c[e].lott_daily_income, 2) + "</div>", d += "<div class='divTableCell ps-num' data-switchDecimal='2' data-value='" + c[e].lott_brokerage + "'>" + control.customCurrencyFormat(c[e].lott_brokerage, 2) + "</div>";
                var g = c[e].lott_agent_commission + c[e].lott_daily_income + c[e].lott_brokerage;
                d += "<div class='divTableCell ps-num ' data-switchDecimal='2' data-total='2' data-value='" + g + "'>" + control.customCurrencyFormat(g, 2) + "</div>", d += "</div>", $("#agentTeamIncome .breadcrumbs .b-list:last").text() == f[1] && $("#agentTeamIncome .breadcrumbs .b-list:last").attr("data-customerId", c[e].customer_id)
            }
        $("#agentTeamIncomeList").html(d), globalVar.enableSalaryRecord || $(".dailySalary").hide()
    },
    loadRevenueReport: function(a) {
        var b = a.list,
            c = a.footer,
            d = "",
            e = "";
        if (null !== b && b instanceof Array && b.length > 0)
            for (var f = 0; f < b.length; f++) {
                var g = b[f].balance_date.split(" "),
                    h = "" == b[f].lott_agent_commission ? 0 : b[f].lott_agent_commission,
                    i = "" == b[f].lott_daily_income ? 0 : b[f].lott_daily_income,
                    j = "" == b[f].lott_brokerage ? 0 : b[f].lott_brokerage,
                    k = "" == b[f].agent_income ? 0 : b[f].agent_income;
                d += "<div class='arr-tr clearfix'>", d += "<div class='arr-td'>" + g[0] + "</div>", d += "<div class='arr-td amount-fixCh' data-switchDecimal='2' data-value='" + h + "'>" + control.customCurrencyFormat(h, 2) + "</div>", d += "<div class='arr-td amount-fixCh dailySalary' data-switchDecimal='2' data-value='" + i + "'>" + control.customCurrencyFormat(i, 2) + "</div>", d += "<div class='arr-td amount-fixCh' data-switchDecimal='2' data-value='" + j + "'>" + control.customCurrencyFormat(j, 2) + "</div>", d += "<div class='arr-td amount-fixCh' data-switchDecimal='2' data-value='" + k + "'>" + control.customCurrencyFormat(k, 2) + "</div>", d += "</div>"
            }
        if (null !== c && "object" == typeof c) {
            var l = c.lott_agent_commission,
                m = c.lott_daily_income,
                n = c.lott_brokerage,
                o = c.agent_income;
            e += "<span class='sdt'>代理返点合计:</span><span class='sdd' data-switchDecimal='2' data-value='" + l + "'>" + control.customCurrencyFormat(l, 2) + "</span>", e += "<span class='sdt dailySalary'>日工资合计:</span><span class='sdd dailySalary' data-switchDecimal='2' data-value='" + m + "'>" + control.customCurrencyFormat(m, 2) + "</span>", e += "<span class='sdt'>佣金合计:</span><span class='sdd' data-switchDecimal='2' data-value='" + n + "'>" + control.customCurrencyFormat(n, 2) + "</span>", e += "<span class='sdt'>收入总额合计:</span><span class='sdd' data-switchDecimal='2' data-value='" + o + "'>" + control.customCurrencyFormat(o, 2) + "</span>"
        }
        $("#revenueReportList").html(d), $("#revenueReportTotal").html(e), globalVar.enableSalaryRecord || $(".dailySalary").hide()
    },
    loadAgentDividendRecord: function(a) {
        for (var b = a.list || [], c = "", d = "", e = 0; e < b.length; e++) c += '<div class="dvdentRport-content">', c += '<div class="po-middle team-betting" id="betting">' + b[e].lott_game_betting + "</div>", c += '<div class="po-middle team-pl" id="profit">' + b[e].curr_net_profit + "</div>", c += '<div class="po-middle team-active" id="active">' + b[e].curr_active_member_count + "</div>", c += '<div class="po-middle dvdent-rate" id="rate">' + b[e].curr_dividend_rate + "</div>", c += '<div class="po-middle dvdent-amount" id="income">' + b[e].curr_dividend_income + "</div></div>";
        for (var e = 0; e < b.length; e++) d += '<div class="dvdentRport-content">', d += '<div class="po-middle team-betting" id="betting">' + b[e].team_betting + "</div>", d += '<div class="po-middle team-pl" id="profit">' + b[e].prev_net_profit + "</div>", d += '<div class="po-middle team-active" id="active">' + b[e].active_member_count + "</div>", d += '<div class="po-middle dvdent-rate" id="rate">' + b[e].prev_dividend_rate + "</div>", d += '<div class="po-middle dvdent-amount" id="income">' + b[e].prev_dividend_income + "(" + TCG.Prop("dividend_status" + b[e].dividend_status) + ")</div></div>";
        $("#dividendReportContent #current.container-report-dvent").html(c), $("#dividendReportContent #previous.container-report-dvent").html(d), $("#dividendReportContent .capsuleTab li").on("click", function() {
            $("#dividendReportContent .capsuleTab li").removeClass("active"), $(this).addClass("active");
            var a = $(this).attr("id");
            $("#dividendReportContent .container-report-dvent").addClass("hide"), $("#dividendReportContent #" + a + ".container-report-dvent").removeClass("hide")
        })
    },
    loadDefaultAgentDividendRecord: function(a) {
        if (null !== a && "object" == typeof a) {
            var b = a.list[0],
                c = control.timeToDateFormat(b.prev_start_date.time, "date") + "~" + control.timeToDateFormat(b.prev_end_date.time, "date");
            $(".prev_commission_period").text(c);
            var d = b.prev_net_profit,
                e = d >= 0 ? "tbl-red" : "tbl-green";
            $(".prev_pnl").text(d).addClass(e);
            var f = b.prev_dividend_income;
            $(".prev_commission").text(f);
            var g = control.timeToDateFormat(b.curr_start_date.time, "date") + "~" + control.timeToDateFormat(b.curr_end_date.time, "date");
            $(".current_commission_period").text(g);
            var h = b.curr_net_profit,
                i = h >= 0 ? "tbl-red" : "tbl-green";
            $(".current_pnl").text(h).addClass(i);
            var j = b.curr_dividend_income;
            $(".current_commission").text(j);
            var k = b.prev_dividend_rate + "%";
            $(".commission_rate").text(k);
            var l = b.commission_distributed_count;
            $(".count_of_commission_computed").text(l);
            var m = b.commission_received_count;
            $(".count_of_commission_disbursed").text(m)
        }
    },
    loadContractManagementList: function(a, b, c, d) {
        var e = a.downline,
            f = [],
            g = "",
            h = a.footer.seriesRestriction,
            i = [];
        $("#usedContracts").text(a.footer.usedContracts), $("#totalContracts").text(a.footer.totalContracts - a.footer.usedContracts), $("#contractManagementList").html("");
        for (var j = 0; j < a.downline.length; j++) i.push(a.downline[j].receiver);
        if (!d)
            for (var j = 0; j < e.length; j++)
                if (f.push(e[j].receiver), "C" != e[j].status && "R" != e[j].status) {
                    g += "<div class='d-cont-wrp'>", g += "<div class='d-name'>" + e[j].receiver + "</div>", g += "<div class='d-contact'><a href='javascript:void(0);' data-targetCustomer='" + e[j].receiver + "' data-requestedRate='" + e[j].contractRate + "' data-mode='view' class='action-btn viewList'>详情</a></div>", g += "<div class='d-time'>" + control.timeToDateFormat(e[j].createdDate, "dateTime") + "</div>";
                    var k = null != e[j].processedDate ? control.timeToDateFormat(e[j].processedDate, "dateTime") : "-";
                    g += "<div class='d-apTime'>" + k + "</div>";
                    var l, m;
                    switch (e[j].status) {
                        case "P":
                        case "V":
                            l = "待确定", m = "等待确定";
                            break;
                        case "A":
                            l = "已签约", m = "<a href='javascript:void(0);' data-contractRate='" + e[j].contractRate + "' data-requestId='" + e[j].id + "' data-targetCustomer='" + e[j].receiver + "' class='action-btn void'>解约</a>  |   <a href='javascript:void(0);' data-contractRate='" + e[j].contractRate + "' data-requestId='" + e[j].id + "' data-targetCustomer='" + e[j].receiver + "' data-contractRate='" + e[j].contractRate + "' data-minimumBet='" + e[j].minimumBet + "' data-activeMember='" + e[j].activeMember + "' data-mode='edit' class='action-btn viewList'>修改</a>";
                            break;
                        case "E":
                            l = "待确定", m = "等待确定";
                            break;
                        case "C":
                            l = "Cancelled", m = "<a href='javascript:void(0);' data-targetCustomer='" + e[j].receiver + "' data-requestedRate='" + e[j].contractRate + "' class='action-btn request'>发起签约</a>";
                            break;
                        case "R":
                            l = "Rejected", m = "<a href='javascript:void(0);' data-targetCustomer='" + e[j].receiver + "' data-requestedRate='" + e[j].contractRate + "' class='action-btn request'>发起签约</a>";
                            break;
                        default:
                            l = "未签约", m = "<a href='javascript:void(0);' data-targetCustomer='" + e[j].receiver + "' data-requestedRate='" + e[j].contractRate + "' class='action-btn request'>发起签约</a>"
                    }
                    g += "<div class='d-status'>" + l + "</div>", g += "<div class='d-histLog'><a href='javascript:void(0);' data-receiverId='" + e[j].receiverId + "' data-mode='log' class='action-btn log'>签约历史</a></div>", g += "<div class='d-action'>" + m + "</div>", g += "</div>"
                }
        if (c) {
            for (var j = 0; j < b.length; j++)
                if (b[j].customerName == c && b[j].sscRebate >= h && g.indexOf(c) < 0) {
                    g += "<div class='d-cont-wrp'>", g += "<div class='d-name'>" + c + "</div>", g += "<div class='d-contact'>-</div>", g += "<div class='d-time'>-</div>", g += "<div class='d-apTime'>-</div>";
                    var l, m;
                    l = "未签约", m = "<a href='javascript:void(0);' data-targetCustomer='" + c + "' data-requestedRate='' class='action-btn request'>发起签约</a>", g += "<div class='d-status'>" + l + "</div>", g += "<div class='d-histLog'>-</div>", g += "<div class='d-action'>" + m + "</div>", g += "</div>"
                }
        } else
            for (var j = 0; j < b.length; j++)
                if (i.indexOf(b[j].customerName) < 0 && b[j].sscRebate >= h) {
                    g += "<div class='d-cont-wrp'>", g += "<div class='d-name'>" + b[j].customerName + "</div>", g += "<div class='d-contact'>-</div>", g += "<div class='d-time'>-</div>";
                    var k = null != b[j].processedDate ? control.timeToDateFormat(b[j].processedDate, "dateTime") : "-";
                    g += "<div class='d-apTime'>" + k + "</div>";
                    var l, m;
                    "P" == b[j].status ? (l = "待确定", m = "等待确定") : "A" == b[j].status || "E" == b[j].status ? (l = "已签约", m = "<a href='javascript:void(0);' data-contractRate='" + b[j].contractRate + "' data-requestId='" + b[j].id + "' class='action-btn void'>解约</a>  |   <a href='javascript:void(0);' data-contractRate='" + b[j].contractRate + "' data-targetCustomer='" + b[j].receiver + "' data-contractRate='" + b[j].contractRate + "' data-minimumBet='" + b[j].minimumBet + "' data-activeMember='" + b[j].activeMember + "' class='action-btn modify'>修改</a>") : (l = "未签约", m = "<a href='javascript:void(0);' data-targetCustomer='" + b[j].customerName + "' data-customeId='" + b[j].customerId + "' data-requestedRate='" + b[j].contractRate + "' class='action-btn request'>发起签约</a>"), g += "<div class='d-status'>" + l + "</div>", g += "<div class='d-histLog'>-</div>", g += "<div class='d-action'>" + m + "</div>", g += "</div>"
                }
        $("#contractManagementList").html(g), control.sendContractRequest(), control.voidContract(), control.backToContractManagement()
    },
    loadContractManagementListDownlines: function(a, b) {
        var c = "",
            d = a.result.downline,
            e = d.slice(0);
        e.sort(function(a, b) {
            return a.minimumBet - b.minimumBet
        }), d = e, "view" == b ? $(".add-contract").hasClass("hide") || $(".add-contract").addClass("hide") : $(".add-contract").removeClass("hide");
        var f, g = 1;
        for (f = 0; f < d.length; f++) "C" != d[f].status && "R" != d[f].status && "V" != d[f].status && (c += '<div class="divident-content-wrp">', c += '<div class="d-rnumber" data-requestId="' + d[f].id + '">' + g + "</div>", c += '<div class="d-betVolume">' + d[f].minimumBet + "</div>", c += '<div class="d-act-member">' + d[f].activeMember + "</div>", c += '<div class="d-rate">' + control.percentRate(d[f].contractRate, "rateToPercent") + "</div>", c += '<div class="d-action">-</div>', c += "</div>", g++);
        $(".contractList").append(c), "view" != b && $("#cmContentRebates .contractList div:last").addClass("action-btn").text("删除"), $(".add-contract .d-rnumber").text(g)
    },
    loadDisbursementList: function(a) {
        var b = a.list,
            c = "",
            d = "";
        $(".distbursement-content").remove();
        for (var e = 0; e < b.length; e++) d = "0" === b[e].status && b[e].amount > 0 ? '<div class="action-btn disburse" id="' + b[e].id + '" data-beneficiaryId="' + b[e].beneficiary_id + '">派发</div></div>' : '<div class="" id="' + b[e].id + '" data-beneficiaryId="' + b[e].beneficiary_id + '">-</div></div>', c += '<div class="distbursement-content">', c += '<div class="d-name">' + b[e].beneficiary_name + "</div>", c += '<div class="d-date">' + b[e].create_date + "</div>", c += '<div class="d-Tbeating">' + b[e].team_bet + "</div>", c += '<div class="d-TPNL">' + b[e].team_profit + "</div>", c += '<div class="d-active-member">' + b[e].active_member + "</div>", c += '<div class="d-ratio">' + control.percentRate(b[e].contract_rate, "rateToPercent") + "</div>", c += '<div class="d-amount">' + b[e].amount + "</div>", c += d;
        $("#disbursementList").append(c)
    },
    loadContractualHistoryLog: function(a) {
        var b = "";
        b += "<div class='popTable'><div class='ptbl-tr ptbl-thead clearfix'>", b += "<div class='ptbl-td ptbl-th'>日期</div>", b += "<div class='ptbl-td ptbl-th'>历史记录</div></div>", b += "<div class='popTbody clearfix'>";
        for (var c = 0; c < a.length; c++) {
            var d = "";
            switch (a[c].action) {
                case "N":
                    d = "发起签约";
                    break;
                case "E":
                    d = "修改签约";
                    break;
                case "C":
                    d = "解约成功";
                    break;
                case "A":
                    d = "新签约成功";
                    break;
                case "R":
                    d = "解约";
                    break;
                case "V":
                    d = "发起解约";
                    break;
                case "P":
                    d = "修改签约";
                    break;
                case "D":
                    d = "日工资派发"
            }
            b += "<div class='ptbl-tr clearfix'>", b += "<div class='ptbl-td'>" + control.timeToDateFormat(a[c].activityDate, "dateTime") + "</div>", b += "<div class='ptbl-td'>" + d + "</div></div>"
        }
        b += "</div></div>", TCG.Alert(",", b, "L")
    },
    loadAgentContract: function(a) {
        var b = "";
        $("#agentContract .dvdentRport-content").remove();
        var c = a.slice(0);
        c.sort(function(a, b) {
            return a.minimumBet - b.minimumBet
        }), globalVar.dividendLabel && (b += '<div class="dvdentRport-content"><div class="po-middle team-betting">半月≥450,000元</div><div class="po-middle team-active">5人</div><div class="po-middle dvdent-rate">20%</div></div><div class="dvdentRport-content"><div class="po-middle team-betting">半月≥4,500,000元</div><div class="po-middle team-active">8人</div><div class="po-middle dvdent-rate">23%</div></div><div class="dvdentRport-content"><div class="po-middle team-betting">半月≥7,500,000元</div><div class="po-middle team-active">10人</div><div class="po-middle dvdent-rate">25%</div></div><div class="dvdentRport-content"><div class="po-middle team-betting">半月≥15,000,000元</div><div class="po-middle team-active">15人</div><div class="po-middle dvdent-rate">28%</div></div><div class="dvdentRport-content"><div class="po-middle team-betting">半月≥30,000,000元</div><div class="po-middle team-active">20人</div><div class="po-middle dvdent-rate">30%</div></div>');
        for (var d = 0; d < c.length; d++) "A" == c[d].status && (b += '<div class="dvdentRport-content">', b += '<div class="po-middle team-betting">半月≥' + c[d].minimumBet + "元</div>", b += '<div class="po-middle team-active">' + c[d].activeMember + "人</div>", b += '<div class="po-middle dvdent-rate">' + control.percentRate(c[d].contractRate, "rateToPercent") + "</div></div>");
        $("#agentContract").prepend(b)
    },
    loadDailySalaryList: function(a, b, c, d) {
        var e = a.downline;
        a.agent.length > 0 && (globalVar.userMinActiveMember = a.agent[a.agent.length - 1].details[a.agent[a.agent.length - 1].details.length - 1].activeMember);
        var f = [],
            g = [],
            h = "",
            i = a.footer.seriesRestriction;
        $("#usedContracts").text(a.footer.usedContracts), $("#totalContracts").text(a.footer.totalContracts - a.footer.usedContracts), $("#dailySalaryList").html("");
        for (var j = 0; j < a.downline.length; j++) f.push(a.downline[j].receiver);
        if (!d)
            for (var j = 0; j < e.length; j++)
                if (g.push(e[j].receiver), "C" != e[j].status && "R" != e[j].status) {
                    h += "<div class='d-cont-wrp'>", h += "<div class='d-name'>" + e[j].receiver + "</div>", h += "<div class='d-contact'><a href='javascript:void(0);' data-targetCustomer='" + e[j].receiver + "' data-requestedRate='" + e[j].contractRate + "' data-salaryId='" + e[j].id + "' data-mode='view' class='action-btn viewList'>详情</a></div>", h += "<div class='d-time'>" + control.timeToDateFormat(e[j].createdDate, "dateTime") + "</div>";
                    var k = null != e[j].processedDate ? control.timeToDateFormat(e[j].processedDate, "dateTime") : "-";
                    h += "<div class='d-apTime'>" + k + "</div>";
                    var l, m;
                    switch (e[j].status) {
                        case "P":
                        case "V":
                            l = "待确定", m = "等待确定";
                            break;
                        case "A":
                            l = "已签约", m = "<a href='javascript:void(0);' data-contractRate='" + e[j].contractRate + "' data-requestId='" + e[j].id + "' data-targetCustomer='" + e[j].receiver + "' class='action-btn void'>解约</a>  |   <a href='javascript:void(0);' data-contractRate='" + e[j].contractRate + "' data-salaryId='" + e[j].id + "' data-receiverId='" + e[j].receiverId + "' data-targetCustomer='" + e[j].receiver + "' data-contractRate='" + e[j].contractRate + "' data-minimumBet='" + e[j].minimumBet + "' data-activeMember='" + e[j].activeMember + "' data-mode='edit' class='action-btn viewList'>修改</a>";
                            break;
                        case "E":
                            l = "待确定", m = "等待确定";
                            break;
                        case "C":
                            l = "Cancelled", m = "<a href='javascript:void(0);' data-targetCustomer='" + e[j].receiver + "' data-requestedRate='" + e[j].contractRate + "' class='action-btn request'>发起签约</a>";
                            break;
                        case "R":
                            l = "Rejected", m = "<a href='javascript:void(0);' data-targetCustomer='" + e[j].receiver + "' data-requestedRate='" + e[j].contractRate + "' class='action-btn request'>发起签约</a>";
                            break;
                        default:
                            l = "未签约", m = "<a href='javascript:void(0);' data-targetCustomer='" + e[j].receiver + "' data-requestedRate='" + e[j].contractRate + "' class='action-btn request'>发起签约</a>"
                    }
                    h += "<div class='d-status'>" + l + "</div>", h += "<div class='d-histLog'><a href='javascript:void(0);' data-receiverId='" + e[j].receiverId + "' data-mode='log' class='action-btn log'>签约历史</a></div>", h += "<div class='d-action'>" + m + "</div>", h += "</div>"
                }
        if (c) {
            for (var j = 0; j < b.length; j++)
                if (b[j].customerName == c && b[j].sscRebate >= i && h.indexOf(c) < 0) {
                    h += "<div class='d-cont-wrp'>", h += "<div class='d-name'>" + c + "</div>", h += "<div class='d-contact'>-</div>", h += "<div class='d-time'>-</div>", h += "<div class='d-apTime'>-</div>";
                    var l, m;
                    l = "未签约", m = "<a href='javascript:void(0);' data-targetCustomer='" + c + "' data-customerId='" + b[j].customerId + "' data-requestedRate='' class='action-btn request'>发起签约</a>", h += "<div class='d-status'>" + l + "</div>", h += "<div class='d-histLog'>-</div>", h += "<div class='d-action'>" + m + "</div>", h += "</div>"
                }
        } else {
            globalVar.userNoSalary = [];
            for (var j = 0; j < b.length; j++)
                if (f.indexOf(b[j].customerName) < 0 && b[j].sscRebate >= i) {
                    h += "<div class='d-cont-wrp'>", h += "<div class='d-name'>" + b[j].customerName + "</div>", h += "<div class='d-contact'>-</div>", h += "<div class='d-time'>-</div>";
                    var k = null != b[j].processedDate ? control.timeToDateFormat(b[j].processedDate, "dateTime") : "-";
                    h += "<div class='d-apTime'>" + k + "</div>";
                    var l, m;
                    if ("P" == b[j].status) l = "待确定", m = "等待确定";
                    else if ("A" == b[j].status || "E" == b[j].status) l = "已签约", m = "<a href='javascript:void(0);' data-contractRate='" + b[j].contractRate + "' data-requestId='" + b[j].id + "' class='action-btn void'>解约</a>  |   <a href='javascript:void(0);' data-contractRate='" + b[j].contractRate + "' data-targetCustomer='" + b[j].receiver + "' data-contractRate='" + b[j].contractRate + "' data-minimumBet='" + b[j].minimumBet + "' data-activeMember='" + b[j].activeMember + "' class='action-btn modify'>修改</a>";
                    else {
                        l = "未签约", m = "<a href='javascript:void(0);' data-targetCustomer='" + b[j].customerName + "' data-customerId='" + b[j].customerId + "' data-requestedRate='" + b[j].contractRate + "' class='action-btn request'>发起签约</a>";
                        var n = {};
                        n.customerName = b[j].customerName, n.customerId = b[j].customerId, globalVar.userNoSalary.push(n)
                    }
                    h += "<div class='d-status'>" + l + "</div>", h += "<div class='d-histLog'>-</div>", h += "<div class='d-action'>" + m + "</div>", h += "</div>"
                }
        }
        $("#dailySalaryList").html(h), null !== globalVar.userNoSalary && globalVar.userNoSalary instanceof Array && globalVar.userNoSalary.length > 0 && ($("#newContract").removeClass("hide"), control.newSalaryRequest()), control.sendSalaryRequest(), control.voidSalary(), control.backToDailySalary()
    },
    loadDailySalaryListDownlines: function(a, b) {
        var c, d = "",
            e = a.result.details;
        "view" == b ? $(".add-contract").hasClass("hide") || $(".add-contract").addClass("hide") : $(".add-contract").removeClass("hide");
        var f, g = 1;
        for (f = 0; f < e.length; f++) c = "F" == e[f].rateType ? "固定金额" : "比例", "C" != e[f].status && "R" != e[f].status && "V" != e[f].status && (d += '<div class="divident-content-wrp">', d += '<div class="d-rnumber" data-requestId="' + e[f].contractId + '">' + g + "</div>", d += '<div class="d-betVolume">' + e[f].betVolume + "</div>", d += '<div class="d-act-member">' + e[f].activeMember + "</div>", d += '<div class="d-rate-type" data-rateType="' + e[f].rateType + '">' + c + "</div>", "P" == e[f].rateType ? d += '<div class="d-rate" data-rate="' + e[f].rate + '">' + (100 * e[f].rate).toFixed(1) + "%</div>" : d += '<div class="d-rate" data-rate="' + e[f].rate / e[f].betVolume + '">' + e[f].rate + "</div>", d += '<div class="d-action">-</div>', d += "</div>", g++);
        $(".salaryList").append(d), "view" != b && $("#cmContentRebates .salaryList div:last").addClass("action-btn").text("删除"), $(".add-contract .d-rnumber").text(g)
    },
    loadSalaryDisbursementList: function(a) {
        var b = a.list,
            c = "";
        $(".distbursement-content").remove();
        for (var d = 0; d < b.length; d++) c += '<div class="distbursement-content">', c += '<div class="d-name">' + b[d].beneficiary_name.split("@")[1] + "</div>", c += '<div class="d-date">' + b[d].create_time + "</div>", c += '<div class="d-Tbeating">' + b[d].team_betting + "</div>", c += '<div class="d-active-member">' + b[d].active_member + "</div>", "F" == b[d].rate_type ? c += '<div class="d-ratio">固定金额' + b[d].rate + "</div>" : c += '<div class="d-ratio">比例' + (100 * b[d].rate).toFixed(1) + "%</div>", c += '<div class="d-amount">' + b[d].amount + "</div></div>";
        $("#disbursementList").append(c)
    },
    loadSalaryAgentRecord: function(a) {
        for (var b = a.agent[0].details, c = "", d = 0; d < b.length; d++) c += '<div class="dvdnt3_content">', c += '<div class="all_equal" id="betting">日量≥' + b[d].betVolume + "元</div>", c += '<div class="all_equal" id="active">' + b[d].activeMember + "</div>", "F" == b[d].rateType ? c += '<div class="all_equal" id="rate">固定金额' + b[d].rate + "</div>" : c += '<div class="all_equal" id="rate">比例' + (100 * b[d].rate).toFixed(1) + "%</div></div>";
        $("#dividendReportContent .conten_ch_wrp3").html(c)
    },
    loadAgentInfo: function(a) {},
    loadTeamSummaryAgentPNL: function(a) {
        var b = 0,
            c = 0,
            d = 0,
            e = 0,
            f = 0,
            g = 0,
            h = 0;
        b += a.list[0].deposit, c += a.list[0].live_game_betting + a.list[0].lott_game_betting + a.list[0].pvp_game_loses + a.list[0].rng_game_betting, d += a.list[0].withdraw, e += a.list[0].live_game_pnl + a.list[0].lott_game_pnl + a.list[0].pvp_game_pnl + a.list[0].rng_game_pnl, f += a.list[0].live_game_rebate + a.list[0].lott_game_rebate + a.list[0].pvp_game_rebate + a.list[0].rng_game_rebate, g += 0, h += a.list[0].lott_promotion + a.list[0].pvp_promotion + a.list[0].rng_promotion, $(".ts-agentpnl .ts-avewap #deposit").text(b), $(".ts-agentpnl .ts-avewap #bet").text(c), $(".ts-agentpnl .ts-avewap #withdraw").text(d), $(".ts-agentpnl .ts-avewap #pnl").text(e), $(".ts-agentpnl .ts-avewap #rebate").text(f), $(".ts-agentpnl .ts-avewap #register").text(g), $(".ts-agentpnl .ts-avewap #promotion").text(h)
    },
    loadSecurityQuestions: function(a) {
        var b = "<select name='question' class='form-control ctSelect' required='' data-placeholder='&nbsp'>";
        b += "<option value=''></option>";
        for (var c = 0; c < a.length; c++) b += "<option value='" + a[c].question + "'>" + a[c].question + "</option>";
        b += "</select>", $("#securityQuestionForm .securityQ").html(b).addClass("slect-box-custom-large mem-icon"), control.customSelect("#securityQuestionForm select")
    },
    loadProvinceList: function(a) {
        for (var b = "<option value='' data-englishName=''></option>", c = 0; c < a.length; c++) {
            var d = a[c].childNodes[0].nodeValue;
            b += "<option value='" + d + "' data-englishName='" + a[c].getAttribute("name") + "'>" + d + "</option>"
        }
        return b
    },
    loadCityList: function(a) {
        for (var b = (a.length, "<option value=''></option>"), c = 0; c < a.length; c++) {
            var d = a[c].childNodes[0].nodeValue;
            b += "<option value='" + d + "'>" + d + "</option>"
        }
        return b
    },
    loadBankCards: function(a, b) {
        var c = b.bankCards,
            d = "";
        if (c.length > 0) {
            d += "<div class='main-wrp-card'>";
            for (var e = 0; e < c.length; e++) d += "<div class='banks z-i" + (e + 1) + " z-i no-slected' data-bankId='" + c[e].bankCardId + "' data-bankCardHolder='" + c[e].cardHolder + "' data-bankProvince='" + c[e].province + "' data-bankName='" + c[e].bankName + "' data-bankCardNo='" + c[e].cardNumber + "'>", d += "<span class='bankLogo-Card bank-" + c[e].bankCode + "'></span>", d += "<span class='det-01'>" + c[e].cardNumber + "</span>", d += "<span class='det-02'>卡号</span>", d += "<span class='det-03'>" + c[e].cardNumber + "</span>", d += "<span class='det-04'>提款人姓名 </span>", d += "<span class='det-05'>" + c[e].cardHolder + "</span>", d += "<span class='det-06'>綁卡日期</span>", d += "<span class='det-07'>" + UI.convertEpochToLocaldate(c[e].createdAt, "date") + "</span>", d += "</div>";
            d += "</div>"
        } else d += "<div class='bankCard-Plain'>", d += "<span class='det-01 fx-mov'>**** **** **** 0000</span>", d += "<span class='det-02'>卡号</span>", d += "<span class='det-03'>**** **** ****0000</span>", d += "<span class='det-04'>提款人姓名 </span>", d += "<span class='det-05'>XXXXXX</span>", d += "<span class='det-06'>綁卡日期</span>", d += "<span class='det-07'>0000-00-00</span>", d += "</div>";
        switch (a) {
            case "bindCard":
                ;
                $("#bankCardList").html("<div class='all-list'><div class='card-holder dataLoaded'>" + d + "</div></div>"), control.setBankCardLength(c.length);
                break;
            case "withdrawalRequest":
                $("#requestWithdrawForm .remainingWithdrawTimes").text(b.remainingTransactionTimes), $("#bankCardList").html(d).addClass("withdrawalRequest"), 0 == c.length && $("#bankInfo .noBankCard").text("您尚未绑定银行卡")
        }
    },
    loadWithdrawBankList: function(a) {
        var b = "<option value=''></option>";
        bank1 = "", bank2 = "", bank3 = "", bank4 = "", bank5 = "", bank6 = "", bank7 = "", bank8 = "", bank9 = "", bank10 = "", bank11 = "", bank12 = "", bank13 = "", bank14 = "", bank15 = "", bank16 = "", bank17 = "", bank18 = "", bank19 = "", bank20 = "", bank21 = "", bank22 = "", bank23 = "", bank24 = "", bank25 = "", bank26 = "", bank27 = "", bank28 = "", bank29 = "", bank30 = "", bank31 = "", bank32 = "", bank33 = "", bank34 = "", bank35 = "", bank36 = "", bankDefault = "";
        for (var c = 0; c < a.length; c++) switch (a[c].bank_eng_name) {
            case "ICBC":
                bank1 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "ABC":
                bank2 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "CCB":
                bank3 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "CMB":
                bank4 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "BCM":
                bank5 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "CBHB":
                bank6 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "BJRCB":
                bank7 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "BOB":
                bank8 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "CQRCB":
                bank9 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "DALIAN":
                bank10 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "FUDIAN":
                bank11 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "CGB":
                bank12 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "HEB":
                bank13 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "HNNXS":
                bank14 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "HXB":
                bank15 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "HZB":
                bank16 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "NBCB":
                bank18 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "NJCB":
                bank19 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "PINGAN":
                bank20 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "SPDB":
                bank21 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "RIZHAO":
                bank22 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "BOS":
                bank23 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "SRCB":
                bank24 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "SDB":
                bank25 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "WHCCB":
                bank26 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "CIB":
                bank27 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "CEB":
                bank28 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "CMBC":
                bank29 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "BOC":
                bank30 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "PSBC":
                bank31 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "ZJTLCB":
                bank32 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "CZB":
                bank33 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "CITIC":
                bank34 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            case "HKBEA":
                bank35 = "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>";
                break;
            default:
                bankDefault += "<option data-bankName='" + a[c].bank_ch_name + "' value='" + a[c].bank_code + "'>" + a[c].bank_ch_name + "</option>"
        }
        b = bank1 + bank2 + bank3 + bank4 + bank5 + bank6 + bank7 + bank8 + bank9 + bank10 + bank11 + bank12 + bank13 + bank14 + bank15 + bank16 + bank17 + bank18 + bank19 + bank20 + bank21 + bank22 + bank23 + bank24 + bank25 + bank26 + bank27 + bank28 + bank29 + bank30 + bank31 + bank32 + bank33 + bank34 + bank35 + bankDefault, $("#bindCardForm [name='bankName']").html(b).trigger("chosen:updated")
    },
    loadDepositBankList: function(a, b, c) {
        for (var d = "", e = "", f = "", g = "", h = "", i = "", j = 0; j < b.length; j++) switch (b[j].bank_eng_name) {
            case "CMB":
                d += "quickPayment" == c || "quickPayment2" == c ? "<li class='opTab-content inline-block form-group hide'>" : "<li class='opTab-content inline-block form-group'>", d += "<input data-minDeposit='" + b[j].min_deposit + "' data-maxDeposit='" + b[j].max_deposit + "' value='" + b[j].bank_code + "' class='bank-list' type='radio'  name='bankName' />", d += "<span class='bankRadioBtn mem-icon crcl-ch inline-block '>&nbsp;</span>", d += "<img class='inline-block' onerror='UI.removeNoImgBank(this)' src='images/bank/" + b[j].bank_code + ".png' />", d += "</li>";
                break;
            case "ICBC":
                e += "<li class='opTab-content inline-block form-group bank-ICBC'>", e += "<input data-minDeposit='" + b[j].min_deposit + "' data-maxDeposit='" + b[j].max_deposit + "' value='" + b[j].bank_code + "' class='bank-list' type='radio' name='bankName' />", e += "<span class='bankRadioBtn mem-icon crcl-ch inline-block '>&nbsp;</span>", e += "<img class='inline-block' onerror='UI.removeNoImgBank(this)' src='images/bank/" + b[j].bank_code + ".png' />", e += "</li>";
                break;
            case "Manual Alipay":
                e += "<li class='opTab-content inline-block form-group hide'>", e += "<input data-minDeposit='" + b[j].min_deposit + "' data-maxDeposit='" + b[j].max_deposit + "' value='" + b[j].bank_code + "' class='bank-list' type='radio' name='bankName' />", e += "<span class='bankRadioBtn mem-icon crcl-ch inline-block'>&nbsp;</span>", e += "<img class='inline-block' onerror='UI.removeNoImgBank(this)' src='images/bank/" + b[j].bank_code + ".png' />", e += "</li>";
                break;
            case "ABC":
                f += "<li class='opTab-content inline-block form-group'>", f += "<input data-minDeposit='" + b[j].min_deposit + "' data-maxDeposit='" + b[j].max_deposit + "' value='" + b[j].bank_code + "' class='bank-list' type='radio' name='bankName' />", f += "<span class='bankRadioBtn mem-icon crcl-ch inline-block'>&nbsp;</span>", f += "<img class='inline-block' onerror='UI.removeNoImgBank(this)' src='images/bank/" + b[j].bank_code + ".png' />", f += "</li>";
                break;
            case "CCB":
                g += "<li class='opTab-content inline-block form-group'>", g += "<input data-minDeposit='" + b[j].min_deposit + "' data-maxDeposit='" + b[j].max_deposit + "' value='" + b[j].bank_code + "' class='bank-list' type='radio' name='bankName' />", g += "<span class='bankRadioBtn mem-icon crcl-ch inline-block'>&nbsp;</span>", g += "<img class='inline-block' onerror='UI.removeNoImgBank(this)' src='images/bank/" + b[j].bank_code + ".png' />",
                    g += "</li>";
                break;
            case "BOC":
                h += "<li class='opTab-content inline-block form-group'>", h += "<input data-minDeposit='" + b[j].min_deposit + "' data-maxDeposit='" + b[j].max_deposit + "' value='" + b[j].bank_code + "' class='bank-list' type='radio' name='bankName' />", h += "<span class='bankRadioBtn mem-icon crcl-ch inline-block'>&nbsp;</span>", h += "<img class='inline-block' onerror='UI.removeNoImgBank(this)' src='images/bank/" + b[j].bank_code + ".png' />", h += "</li>";
                break;
            default:
                i += "<li class='opTab-content inline-block form-group'>", i += "<input data-minDeposit='" + b[j].min_deposit + "' data-maxDeposit='" + b[j].max_deposit + "' value='" + b[j].bank_code + "' class='bank-list' type='radio' name='bankName' />", i += "<span class='bankRadioBtn mem-icon crcl-ch inline-block'>&nbsp;</span>", i += "<img class='inline-block' onerror='UI.removeNoImgBank(this)' src='images/bank/" + b[j].bank_code + ".png' />", i += "</li>"
        }
        $("#switchQuickDepositTab li.hide").removeClass("hide");
        var k = d + e + f + g + h + i;
        $("#bankList").html(k);
        for (var l = !1, m = !1, n = $("#quickPaymentForm"), j = 0; j < b.length; j++) "ICBC" == b[j].bank_eng_name ? l = !0 : "CMB" != b[j].bank_eng_name && "Manual Alipay" != b[j].bank_eng_name || (m = !0);
        "quickPayment2" == c ? ($("#bankList li").removeClass("hide"), $("#bankList li.bank-ICBC").addClass("hide"), n.find(".bank-ICBC").find("[name='bankName']").attr("checked", !1), n.find(".bank-ICBC").find(".bankRadioBtn").removeClass("selected-red"), $("#bankList li").eq(0).find("[name='bankName']").trigger("click"), $("#bankList li").eq(0).find(".bankRadioBtn").addClass("selected-red")) : "quickPayment" == c && (n.find(".bank-ICBC").find("[name='bankName']").trigger("click"), n.find(".bank-ICBC").find(".bankRadioBtn").addClass("selected-red"), l && m ? ($("#bankList li").addClass("hide"), $("#bankList li.bank-ICBC").removeClass("hide")) : l ? ($("#bankList li").addClass("hide"), $("#bankList li.bank-ICBC").removeClass("hide"), $("#switchQuickDepositTab li").eq(0).removeClass("hide"), $("#switchQuickDepositTab li").eq(0).addClass("active"), $("#switchQuickDepositTab li").eq(1).addClass("hide")) : m && ($("#bankList li").removeClass("hide"), $("#bankList li.bank-ICBC").addClass("hide"), $("#switchQuickDepositTab li").eq(0).addClass("hide"), $("#switchQuickDepositTab li").eq(1).addClass("active"), $("#switchQuickDepositTab li").eq(1).removeClass("hide"), $("#bankList li").eq(0).find("[name='bankName']").trigger("click"), $("#bankList li").eq(0).find(".bankRadioBtn").addClass("selected-red"))), control.selectDepositBank(a)
    },
    onlinePaymentList: function(a, b, c) {
        for (var d = "", e = "", f = 0; f < b.length; f++) {
            d += "<li data-vendorId=" + b[f].vendorId + ">快捷支付" + (f + 1) + "<span></span></li>", e += "<ul class='bankList-OpTab'>";
            for (var g = 0; g < b[f].banks.length; g++) e += "<li class='opTab-content inline-block'>", e += "<input data-qr_enable='" + b[f].banks[g].bank_eng_name + "' data-minDeposit=' " + b[f].banks[g].min + "' data-maxDeposit='" + b[f].banks[g].max + "' value='" + b[f].banks[g].bank_code + "' class='bank-list' type='radio' name='bankName' />", e += "<span class='bankRadioBtn mem-icon crcl-ch inline-block'>&nbsp;</span>", e += "<img class='inline-block' onerror='UI.removeNoImgBank(this)' src='images/bank/" + b[f].banks[g].bank_code + ".png' />", e += "</li>";
            e += "</ul>"
        }
        $("#onlinePaymentForm .depositNav").html(d), $("#opTab2").html(e), $("#onPaymentNav li").eq(0).addClass("active"), $("#onlinePaymentForm .bankList-OpTab").addClass("hide"), $("#onlinePaymentForm .bankList-OpTab").eq(0).removeClass("hide"), vendorId.onlinePayment = $("#onPaymentNav li").eq(0).attr("data-vendorId"), control.selectDepositBank(a)
    },
    wechatList: function(a, b, c) {
        for (var d = "", e = 0; e < b.length; e++) d += "<li data-vendorId=" + b[e].vendorId + ">微信支付" + (e + 1) + "<span></span>", d += "<input data-bank_eng_name='" + b[e].banks[0].bank_eng_name + "' data-qr_enable='" + b[e].banks[0].qr_enable + "' data-minDeposit=' " + b[e].banks[0].min + "' data-maxDeposit='" + b[e].banks[0].max + "' value='" + b[e].banks[0].bank_code + "'  type='hidden' name='bankName' />", d += "</li>";
        $("#channelPaymentForm .depositNav").html(d), $("#wechatNav li").eq(0).addClass("active"), vendorId.wechat = $("#wechatNav li").eq(0).attr("data-vendorId"), vendorId.wechat_qr_enable = $("#wechatNav li").eq(0).find("[name='bankName']").attr("data-qr_enable");
        var f, g;
        f = $("#wechatNav li").eq(0).find("[name='bankName']").attr("data-mindeposit"), g = $("#wechatNav li").eq(0).find("[name='bankName']").attr("data-maxdeposit"), $("#channelPaymentForm .min").html(f), $("#channelPaymentForm .max").html(g)
    },
    alipayList: function(a, b, c) {
        for (var d = "", e = 0; e < b.length; e++) d += "<li data-vendorId=" + b[e].vendorId + ">支付宝" + (e + 1) + "<span></span>", d += "<input data-bank_eng_name='" + b[e].banks[0].bank_eng_name + "' data-qr_enable='" + b[e].banks[0].qr_enable + "' data-minval=' " + b[e].banks[0].min + "' data-maxval='" + b[e].banks[0].max + "' value='" + b[e].banks[0].bank_code + "'  type='hidden' name='bankName' />", d += "</li>";
        $("#aliPayForm .depositNav").html(d), $("#alipayNav li").eq(0).addClass("active"), vendorId.alipay = $("#alipayNav li").eq(0).attr("data-vendorId"), vendorId.alipay_qr_enable = $("#alipayNav li").eq(0).find("[name='bankName']").attr("data-qr_enable");
        var f, g;
        f = $("#alipayNav li").eq(0).find("[name='bankName']").attr("data-minval"), g = $("#alipayNav li").eq(0).find("[name='bankName']").attr("data-maxval"), $("#aliPayForm .min").html(f), $("#aliPayForm .max").html(g)
    },
    removeNoImgBank: function(a) {
        $(a).parents("li.form-group").remove()
    },
    loadDepositPromotions: function(a) {
        var b = "",
            c = !1;
        if (a.length < 0) $("#opTab1").after("<span>暂唔可选择的活动</span>"), $("#opTab1").remove();
        else {
            b += "<option class='opTab-content promotion-item promotion-no-result' data-minDeposit='-1' value='0'>暂无可选择的活动</option>";
            for (var d = 0; d < a.length; d++) b += "<option style='display:none' class='opTab-content promotion-item' data-minDeposit='" + a[d].minDeposit + "' value='" + a[d].promId + "'>" + a[d].promName + "</option>", c = !0;
            $("#opTab1 select").html(b), control.customSelect("#opTab1 select"), control.filterPromotions(parseInt($("input[name='amount']").val())), c && $("#opTab1").removeClass("hide")
        }
    },
    postDepositAlipay: function() {
        var a = "";
        a += "<div class='depo-qr'>", a += "<img src='../images/2kc-qr.png'>", a += "<ol>", a += "<li>拿出您的手机，打开支付宝，登录账号；</li>", a += "<li>在支付宝页面点击【扫一扫】，然后将手机摄像", a += "<br>头对准支付宝的二维码进行扫描；</li>", a += "<li>扫描成功后点击【转账】，输入金额后【确认转", a += "<br>账】；然后输入支付密码即可。</li>", a += "</ol>", a += "</div>", TCG.Alert("alerts", a, "L")
    },
    loadRebateQuota: function() {
        TCG.Ajax({
            url: "./agent/quota"
        }, function(a) {
            var b = a.result;
            if (a.status) {
                globalVar.quotaObj.length = 0;
                var c = "";
                if (c += '<ul id="dira-regdline-quota-tabs">', b.length > 0) {
                    globalVar.quotaObj = b;
                    for (var d = 0; d < b.length; d++) c += "<li class='clearfix'>", c += "<input type='radio' name='dira-regdline-rquota' id='rquota" + b[d].quotaId + "' disabled='disabled' class='disabled' quota-id='" + b[d].quotaId + "' value='0'>", c += "<label for='rquota" + b[d].quotaId + "' class='disabled' disabled='disabled'>" + b[d].templateName + " / " + b[d].quotaRemaining + "个</label>", c += "</li>";
                    c += "</ul>", $("#qoutaWrapper").removeClass("hide")
                } else $("#qoutaWrapper").addClass("hide");
                $("#rebateQuota").html(c)
            } else TCG.Alert("errors", TCG.Prop(a.description))
        })
    },
    loadGameSeriesList: function(a) {
        TCG.Ajax({
            url: "./getLottoGamesSeries?merchantCode=2000cai"
        }, function(b) {
            if (b.status) {
                for (var c = b.result, d = "<option value=''>全部</option>", e = 0; e < c.length; e++) d += "<option value='" + c[e].gameGroupCode + "'>" + TCG.Prop(c[e].gameGroupCode + c[e].prizeModeId) + "</option>";
                a(d)
            } else TCG.Alert("errors", TCG.Prop(b.description))
        })
    },
    loadQueryConditionList: function(a, b) {
        TCG.Ajax({
            url: "./lgw/orders/query_conditions",
            headers: a
        }, function(a) {
            var c = {},
                d = [],
                e = "",
                f = "<option value=''>全部</option>";
            for (var g in a.games) f += "<option value='" + g + "'>" + TCG.Prop("gameName_" + a.games[g]) + "</option>", d.push({
                id: g,
                gameName: TCG.Prop("gameName_" + a.games[g])
            });
            c.games = f, c.gamesArr = d;
            for (var h in a.orderStatus) e += "<option value='" + h + "'>" + TCG.Prop("orderStatus_" + a.orderStatus[h]) + "</option>";
            c.orderStatus = e, b(c)
        })
    },
    loadGameSeries: function(a, b, c, d) {
        var e = "",
            f = !1,
            g = !0;
        b ? (e = "./agentSet/downlineRebates?customerId=" + c, g = !1) : (e = "./getLottoCustomersSeries?merchantCode=2000cai", f = !1), TCG.Ajax({
            url: e
        }, function(c) {
            if (c.status) {
                var e = [];
                if (null !== c.result.configs && c.result.configs instanceof Array && c.result.configs.length > 0)
                    for (var h = c.result.configs, i = 0; i < h.length; i++) {
                        var j = h[i].type + h[i].prizeModeId;
                        e.push(j)
                    }
                var k, l = "",
                    m = [];
                b ? (k = jQuery.parseJSON(sessionStorage.agentGameSeries), m = c.result.configs) : (k = c.result, sessionStorage.agentGameSeries = JSON.stringify(k));
                var n = lott.lottSeriesSort(k);
                n.clean(void 0), n.length > 0 && (l += "<ul class='dira-regdline-gb-list'>", $.each(n, function(a, b) {
                    var c = b.gameGroupCode + b.prizeModeId;
                    l += "<li class='dira-regdline-gb-listitem'>", l += "<input type='checkbox' class='mg-check' id='check" + a + "' name='lottery' value=" + b.gameGroupCode + " data-gameCode='" + c + "' checked />", l += "<label for='check" + a + "'>" + TCG.Prop(b.gameGroupCode + b.prizeModeId) + ":</label>", l += "<div class='quota' id='lottQuota" + a + "'></div>", l += "<input type='text' class='quota-amount' gameCode='" + c + "' placeholder='-----' />", l += "<input type='button' class='minus'/>", l += "<input type='button' class='plus'/>", l += "</li>"
                }), l += "</ul>"), $("#gameSeries").html(l), d && $("input[name='lottery']").each(function() {
                    -1 == $.inArray($(this).attr("data-gameCode"), e) && $(this).parent().hide()
                }), $(".dira-regdline-gb-listitem input[data-gameCode='SSC1']").change(function() {
                    $(this).is(":checked") ? $(".dira-regdline-gb-listitem input[data-gameCode='SSC2']").is(":checked") || ($(".dira-regdline-gb-listitem input[data-gameCode='SSC2']").removeAttr("disabled"), $(".dira-regdline-gb-listitem input[data-gameCode='SSC2']").trigger("click")) : $(".dira-regdline-gb-listitem input[data-gameCode='SSC2']").is(":checked") ? ($(".dira-regdline-gb-listitem input[data-gameCode='SSC2']").trigger("click"), $(".dira-regdline-gb-listitem input[data-gameCode='SSC2']").attr("disabled", !0)) : $(".dira-regdline-gb-listitem input[data-gameCode='SSC2']").attr("disabled", !0)
                });
                var o = globalVar.globeRebate;
                $.each(n, function(b, c) {
                    for (var d = c.gameGroupCode + "_" + c.prizeModeId, e = c.gameGroupCode + c.prizeModeId, g = c.maxSeries, h = c.minSeries, i = 2, j = !1, k = 0; k < o.length; k++)
                        if (o[k].gameType == d) {
                            o[k].highestRebate - o[k].rebateDifference < g ? g = o[k].highestRebate - o[k].rebateDifference : g -= o[k].rebateDifference, i = o[k].rebateInterval;
                            break
                        }
                    for (var k = 0; k < m.length; k++) {
                        if (e == m[k].type + m[k].prizeModeId) {
                            j = !0, h = h < m[k].rebateValue ? m[k].rebateValue : h;
                            break
                        }
                    }
                    m.length > 0 && !j && $("#check" + b).attr("checked", !0), control.sliderAmount(h, h, g, i, b, a, f)
                }), g || control.checkUserSeries(k), $(document).off("click", a + " input[name='lottery']").on("click", a + " input[name='lottery']", function() {
                    if (b) return !1;
                    if ($(this).prop("checked")) {
                        var a = $(this).siblings("input[type='text']").attr("min");
                        $(this).siblings("input[type='text']").val(a).attr("readonly", !1), $(this).siblings(".quota").slider("value", a), $(this).siblings(".quota").slider("enable"), $(this).siblings(".quota-amount").removeAttr("disabled"), $(this).siblings(".minus").removeAttr("disabled"), $(this).siblings(".plus").removeAttr("disabled"), $(this).addClass("mg-check")
                    } else {
                        var a = $(this).siblings("input[type='text']").attr("min");
                        $(this).siblings("input[type='text']").val(a).attr("readonly", !0), $(this).siblings(".quota").slider("disable"), $(this).siblings(".quota-amount").attr("disabled", "true"), $(this).siblings(".minus").attr("disabled", "true"), $(this).siblings(".plus").attr("disabled", "true"), $(this).removeClass("mg-check")
                    }
                })
            } else TCG.Alert("errors", TCG.Prop(c.description))
        })
    },
    loadGroupGames: function(a) {
        TCG.Ajax({
            url: "lgw/games",
            headers: {
                Merchant: globalVar.merchantCode
            }
        }, function(b) {
            if (b.length > 0) {
                for (var c = "<div class='game game-all selected' data-gameCode=''><span>全部</span></div>", d = 0; d < b.length; d++) {
                    c += "<ul class='group_" + b[d].code + "'>";
                    for (var e = 0; e < b[d].games.length; e++) c += "<li class='game' data-gameCode='" + b[d].games[e].code + "'>" + b[d].games[e].remark + "</li>";
                    c += "</ul>"
                }
                a(c)
            }
        })
    },
    loadTeamBetting: function(a) {
        var b = "",
            c = "",
            d = a.list,
            e = a.footer;
        if (null !== d && d instanceof Array && d.length > 0)
            for (var f = 0; f < d.length; f++) {
                var g = d[f].create_time.split(" ");
                b += "<div class='divTableRow' style='position: relative'>", b += "<div class='divTableCell onel-th-x ch-width140'>" + d[f].game_name + "</div>", b += "<div class='divTableCell onel-th-x mylink tbl-l'><span class='openItem' data-orderId='" + d[f].order_detail_id + "' data-chasing='" + d[f].chase + "' data-orderMasterId='" + d[f].order_master_id + "'>" + control.shortenText(d[f].order_num) + "</span></div>", b += "<div class='divTableCell onel-th-x'>" + d[f].customer_name + "</div>", b += "<div class='divTableCell onel-th-x div-long'>" + g[0] + " <span class='tclDec'>" + g[1] + "</span></div>", b += "<div class='divTableCell onel-th-x div-long2'>" + d[f].numero + "</div>", b += "<div class='divTableCell onel-th-x div-y'>" + d[f].chase_remark + "</div>", b += "<div class='divTableCell onel-th-x ps-num2' data-switchDecimal='2' data-value='" + d[f].plan_bet_amount + "'>" + control.customCurrencyFormat(d[f].plan_bet_amount, 2) + "</div>", b += "<div class='divTableCell onel-th-x ps-num2' data-switchDecimal='2' data-value='" + d[f].actual_bet_amount + "'>" + control.customCurrencyFormat(d[f].actual_bet_amount, 2) + "</div>";
                var h = 4 == d[f].status ? "tbl-red" : "";
                b += "<div class='divTableCell onel-th-x ps-num2 " + h + "' data-switchDecimal='2' data-value='" + d[f].win_amount + "'>" + control.customCurrencyFormat(d[f].win_amount, 2) + "</div>", b += "<div class='divTableCell onel-th-x div-z'>" + TCG.Prop("orderStatus_" + d[f].status) + "</div>", b += "</div>"
            } else b += "<div class='tableContent-wrp'>", b += "<div class='noResult-data'>" + TCG.Prop("no_result") + "</div>", b += "</div>";
        if (null !== e && "object" == typeof e) {
            var i = e.total_plan_bet_amount,
                j = e.total_actual_bet_amount,
                k = e.total_win_amount;
            c += "<div class='tbl-total-con inline-block'>计划投注金额合计:</div>", c += "<div class='tbl-total-amt inline-block' data-switchDecimal='2' data-value='" + i + "'>" + control.customCurrencyFormat(i, 2) + "</div>", c += "<div class='tbl-total-con inline-block'>有效投注金额合计:</div>", c += "<div class='tbl-total-amt inline-block' data-switchDecimal='2' data-value='" + j + "'>" + control.customCurrencyFormat(j, 2) + "</div>", c += "<div class='tbl-total-con inline-block'>中奖金额合计:</div>", c += "<div class='tbl-total-amt inline-block' data-switchDecimal='2' data-value='" + k + "'>" + control.customCurrencyFormat(k, 2) + "</div>"
        }
        $("#teamBettingList").html(b), $("#totalTeamBetting").html(c), $("#lottoTeamBetting input[name='order']").on("change", function() {
            $(this).val($(this).val().toUpperCase())
        })
    },
    loadPvpTeamBetting: function(a, b) {
        var c = "",
            d = "",
            e = a.footer,
            f = a.list;
        if (null !== f && f instanceof Array && f.length > 0)
            for (var g = 0; g < f.length; g++) {
                c += "<div class='divTableRow'>";
                var b = "PVP" == f[g].game_category ? "棋牌" : "捕鱼";
                c += "<div class='divTableCell'>" + b + "</div>", c += "<div class='divTableCell'>" + f[g].game_name + "</div>", c += "<div class='divTableCell'>" + f[g].customer_name + "</div>", c += "<div class='divTableCell' data-switchDecimal='2' data-value='" + f[g].game_loses + "'>" + control.customCurrencyFormat(f[g].game_loses, 2) + "</div>", c += "<div class='divTableCell' data-switchDecimal='2' data-value='" + f[g].game_winnings + "'>" + control.customCurrencyFormat(f[g].game_winnings, 2) + "</div>";
                var h = f[g].net_profit >= 0 ? "tbl-red" : "tbl-green";
                c += "<div class='divTableCell " + h + "' data-switchDecimal='2' data-value='" + f[g].net_profit + "'>" + control.customCurrencyFormat(f[g].net_profit, 2) + "</div>", c += "</div>"
            } else c += "<div class='tableContent-wrp'>", c += "<div class='noResult-data'>" + TCG.Prop("no_result") + "</div>", c += "</div>";
        if ($("#pvpTeamBettingTable .betLost").text("PVP" == b ? "净输金额" : "投注金额"), $("#pvpTeamBettingTable .prizeWon").text("PVP" == b ? "净赢金额" : "中奖金额"), null !== e && "object" == typeof e) {
            var i = "PVP" == b ? "净输金额合计" : "投注金额合计",
                j = "PVP" == b ? "净赢金额合计" : "中奖金额合计",
                k = e.game_loses,
                l = e.game_winnings,
                m = e.net_profit;
            d += "<div class='tbl-total-con inline-block'>" + i + ":</div>", d += "<div class='tbl-total-amt inline-block' data-switchdecimal='2' data-value='" + k + "'>" + control.customCurrencyFormat(k, 2) + "</div>", d += "<div class='tbl-total-con inline-block'>" + j + ":</div>", d += "<div class='tbl-total-amt inline-block' data-switchdecimal='2' data-value='" + l + "'>" + control.customCurrencyFormat(l, 2) + "</div>", d += "<div class='tbl-total-con inline-block'>游戏盈亏合计:</div>", d += "<div class='tbl-total-amt inline-block' data-switchdecimal='2' data-value='" + m + "'>" + control.customCurrencyFormat(m, 2) + "</div>"
        }
        $("#pvpTeamBettingList").html(c), $("#pvpTeamBettingTotal").html(d)
    },
    loadMessageRecipient: function(a) {
        var b = globalVar.messageRecipientList.downlines,
            c = globalVar.messageRecipientList.upline,
            d = globalVar.messagePreSelectedRecipient ? globalVar.messagePreSelectedRecipient : globalVar.messageSelectedRecipient,
            e = "";
        if ("upline" == a) {
            for (var f = "", g = "", h = 0; h < d.length; h++)
                if (d[h].customerId == c.customerId) {
                    f = "sel", g = "checked=''";
                    break
                }
            var i = c.customerName;
            e += "<li class='rec-item " + f + "'><span class='custom-checkbox'></span><input type='checkbox' id='user_" + c.customerId + "' name='selectRecipient' value='" + c.customerId + "' " + g + " data-customerName='" + i + "' /><label>" + i + "</label></li>"
        } else
            for (var j = 0; j < b.length; j++) {
                for (var f = "", g = "", h = 0; h < d.length; h++)
                    if (d[h].customerId == b[j].customerId) {
                        f = "sel", g = "checked=''";
                        break
                    }
                var i = b[j].customerName;
                switch (a) {
                    case "all":
                        e += "<li class='rec-item " + f + "'><span class='custom-checkbox'></span><input id='user_" + b[j].customerId + "' type='checkbox' name='selectRecipient' value='" + b[j].customerId + "' " + g + " data-customerName='" + i + "' /><label>" + i + "</label></li>";
                        break;
                    case "member":
                        0 == b[j].type && (e += "<li class='rec-item " + f + "'><span class='custom-checkbox'></span><input type='checkbox' name='selectRecipient' id='user_" + b[j].customerId + "' value='" + b[j].customerId + "' " + g + " data-customerName='" + i + "' /><label>" + i + "</label></li>");
                        break;
                    case "agent":
                        1 != b[j].type && 2 != b[j].type || (e += "<li class='rec-item " + f + "'><span class='custom-checkbox'></span><input type='checkbox' name='selectRecipient' id='user_" + b[j].customerId + "' value='" + b[j].customerId + "' " + g + " data-customerName='" + i + "' /><label>" + i + "</label></li>")
                }
            }
        $("#writeMessageForm .messageRecipientList").html(e), control.checkRecipient(), control.checkAllRecipient(), control.clickCheckAllRecipient(), control.uncheckAllRecipient(), control.addSelectedRecipient(), control.searchRecipient(), $("#writeMessageForm .rec-item").not(".hide").find("[name='selectRecipient']:checked").length > 0 && $("#writeMessageForm .rec-item").not(".hide").find("[name='selectRecipient']:checked").length == $("#writeMessageForm .rec-item").not(".hide").find("[name='selectRecipient']").length ? $("#writeMessageForm [name='checkAllRecipient']").prop({
            checked: !0
        }).parents(".rec-item").addClass("sel") : $("#writeMessageForm [name='checkAllRecipient']").prop({
            checked: !1
        }).parents(".rec-item").removeClass("sel")
    },
    insertSelectedRecipient: function() {
        globalVar.messageSelectedRecipient = control.arrayUnique(globalVar.messageSelectedRecipient);
        for (var a = globalVar.messageSelectedRecipient, b = "", c = 0, d = [], e = 0; e < a.length; e++) b += "<li>" + a[e].customerName + " <span class='removeRecipient' data-customerId='" + a[e].customerId + "'>x</span></li>", d.push(a[e].customerId);
        $("#selectedRecipient").html(b), $("#allSelectedRecipient ul").html(b), control.removeSelectedRecipient(), $("#selectedRecipient li").each(function() {
            c += $(this).width()
        }), c > 488 ? $("#writeMessageForm [name='showSelectedRecipient']").removeClass("hide") : $("#writeMessageForm [name='showSelectedRecipient']").addClass("hide"), $("#writeMessageForm .sel-count").text(d.length), control.validateWriteMessageForm()
    },
    loadInboxMessages: function(a) {
        for (var b = a.messages, c = "", d = 0, e = 0, f = 0; f < b.length; f++) {
            d += 0 == b[f].isRead ? 1 : 0, e += 1 == b[f].isRead ? 1 : 0;
            var g = 0 == b[f].isRead ? "unread" : "",
                h = h = 1 == b[f].isFromOperator ? "系统" : b[f].sender;
            "2000cai" != h && "system admin" != h && "superior" != h || (h = "系统消息"), c += "<li class='clearfix " + g + "' data-isFromOperator='" + b[f].isFromOperator + "'>", c += "<div class='msg-chkbx'><input type='checkbox' value='" + b[f].messageId + "' name='messageId' /></div>", c += "<div class='msg-peek'>", c += "<div class='the-recipient'><label>发件人:</label> <span class='message-sender' data-senderId='" + b[f].senderId + "'>" + h + "</span></div>", c += "<h3 class='message-title'>" + b[f].title + "</h3>", c += "<div class='msg-excerpt'><p class='message-content' data-content='" + b[f].content + "'>" + control.linkMessageToPage(b[f].content, "preview") + "</p></div></div>";
            var i = b[f].date.split(" "),
                j = i[0].split("-");
            c += "<div class='date-bin clearfix'><span class='sent-date msg-date message-dateTime' data-dateTime='" + b[f].date + "'>" + j[1] + "-" + j[2] + "</span><input type='button' class='delete-item' name='delete' data-messageId='" + b[f].messageId + "' /></div>", c += "</li>"
        }
        $("#messageList").html(c), $("#inboxMessages .total-message-count").text(e + d), $("#inboxMessages .total-read-count").text(e), $("#inboxMessages .total-unread-count").text(d), d > 0 ? $(".countUnreadMessage").text(d).removeClass("hide") : $(".countUnreadMessage").text("").addClass("hide"), control.getInboxMessagePreview(), control.selectInboxMessages(), control.clickDeleteInboxMessages()
    },
    loadInboxMessagePreview: function(a) {
        var b = "<div class='top-view-msg'>";
        b += "<div class='vmsg-title clearfix'>", b += "<h2 class='message-title'>" + a.title + "</h2>", 0 == a.isFromOperator && "系统消息" != a.sender && (b += "<input type='button' value='回复' class='reply' name='reply' />"), b += "</div>", b += "<div class='sent-deets clearfix'>", b += "<div class='the-recipient'>", b += "<label>发件人:</label> <span class='message-sender' data-senderId='" + a.senderId + "'>" + a.sender + "</span>", b += "</div>", b += "<div class='sent-date-time'>";
        var c = a.dateTime.split(" ");
        b += "<span class='full-date'>" + c[0] + "</span>&nbsp;<span class='sent-time'>" + c[1] + "</span>", b += "</div>", b += "</div>", b += "</div>", b += "<div class='the-msg-sent the-msg'>", b += "<div class='ua-cont'>", b += "<p>亲爱的用户 您好：</p>", b += "<p>" + control.linkMessageToPage(a.content, "content") + "</p>", b += "</div>", b += "</div>", $("#messagePreview").html(b).attr({
            "data-messageId": a.messageId
        }), control.pageMenu("#messageLink"), control.showReplyMessageForm()
    },
    loadSentMessages: function(a) {
        for (var b = a.messages, c = "", d = 0; d < b.length; d++) {
            c += "<li class='clearfix " + (0 != b[d].isRead ? "unread" : "") + "'>", c += "<div class='msg-chkbx'>", c += "<input type='checkbox' name='messageId' value='" + b[d].messageId + "' />", c += "</div>", c += "<div class='msg-peek'>", c += "<div class='the-recipient'>", c += "<label>收件人:</label> <span class='message-reciever'>" + b[d].reciever + "</span>", c += "</div>", c += "<h3 class='message-title'>" + b[d].title + "</h3>", c += "<div class='msg-excerpt'>", c += "<p class='message-content' data-content='" + b[d].content + "'>" + control.linkMessageToPage(b[d].content, "preview") + "</p>", c += "</div>", c += "</div>", c += "<div class='date-bin clearfix'>";
            var e = b[d].date.split(" "),
                f = e[0].split("-");
            c += "<span class='sent-date msg-date message-dateTime' data-dateTime='" + b[d].date + "'>" + f[1] + "-" + f[2] + "</span>", c += "<input type='button' class='delete-item' name='delete' data-messageId='" + b[d].messageId + "' />", c += "</div>", c += "</li>"
        }
        $("#messageList").html(c), control.clickDeleteSentMessages(), control.selectSentMessages(), control.getSentMessagePreview()
    },
    loadSentMessagePreview: function(a) {
        var b = "<div class='top-view-msg'>";
        b += "<div class='vmsg-title clearfix'>", b += "<h2>" + a.title + "</h2>", b += "</div>", b += "<div class='sent-deets clearfix'>", b += "<div class='the-recipient'>", b += "<label>收件人:</label> <span>" + a.reciever + "</span>", b += "</div>", b += "<div class='sent-date-time'>";
        var c = a.dateTime.split(" ");
        b += "<span class='full-date'>" + c[0] + "</span>&nbsp;<span class='sent-time'>" + c[1] + "</span>", b += "</div>", b += "</div>", b += "</div>", b += "<div class='the-msg-sent the-msg'>", b += "<div class='ua-cont'>", b += "<p>亲爱的用户 您好：</p>", b += "<p>" + control.linkMessageToPage(a.content, "content") + "</p>", b += "</div>", b += "</div>", $("#messagePreview").html(b).attr({
            "data-messageId": a.messageId
        })
    },
    loadRoomList: function(a) {
        for (var b = a.rooms, c = "", d = 0; d < b.length; d++) {
            c += "<li>", c += "<div class='gm-li-box'>", c += "<div class='gm-li-top clearfix'>", c += "<h3>" + b[d].roomName + "</h3>", c += "<span>" + b[d].nowPlayerNum + "人</span>", c += "</div>", c += "<ul class='clearfix'>", c += "<li class='clearfix'>", c += "<label class='min-bid'>最低买入:</label>", c += "<span>" + b[d].minMoney + "</span>", c += "</li>", c += "<li class='clearfix'>", c += "<label class='high-bet'>最高投注:</label>";
            c += "<span>" + (b[d].maxWager < 0 ? "无上限" : b[d].maxWager) + "</span>", c += "</li>", c += "</ul>", c += "<div class='gm-play-btn enable clearfix'>", c += "<div class='gm-blu'>", c += "<input type='button' name='openPvpGame' value='开始游戏' data-gameName='" + b[d].roomName + "' data-nodeId='" + b[d].roomNodeId + "' data-gameId='" + b[d].gameId + "' data-accountType='1' />", c += "</div>", c += "</div>", c += "</div>", c += "</li>"
        }
        $("#totalRoomsCount").text(b.length), $("#roomList").html(c)
    }
};