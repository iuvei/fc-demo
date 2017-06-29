function regExPattern(a, b) {
    var c;
    switch (a) {
        case "email":
            c = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z|a-z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
            break;
        case "remark":
            c = /^.{0,255}$/;
            break;
        case "alphaNum":
            c = /\w+/;
            break;
        case "username":
            c = /^[\w]{6,11}$/;
            break;
        case "password":
            c = /^[\w]{6,16}$/;
            break;
        case "numberOnly":
            c = /^[0-9]+$/;
            break;
        case "alpha":
            c = /[a-z|A-Z]+/;
            break;
        case "alphaOnly":
            c = /^\W+|[a-z]+$/i;
            break;
        case "mobileNo":
            c = /^[0-9]{11}$/;
            break;
        case "decimalNum":
            c = /^(\d+\.?\d+|\d+)$/;
            break;
        case "decimal1Num":
            c = /^(\d+\.?\d{0,1}|\d+)$/;
            break;
        case "amount":
            c = /^(\d+\.?\d+|\d+)$/;
            break;
        case "bankCardNumber":
            c = /^[0-9]{16,19}$/;
            break;
        case "alipayAccount":
            c = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z|a-z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b|^[0-9]{11}$/;
            break;
        case "orderNumber":
            c = /^[A-Z0-9]+\-\d+$/;
            break;
        case "issueNumber":
            c = /^\d+\-\d+$/;
            break;
        case "qq":
            c = /^[1-9]\d{4,13}$/;
            break;
        case "url":
            c = /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/;
            break;
        default:
            return !1
    }
    return c.test(b)
}
var globalVar = {
        result: {},
        merchantCode: "2000cai",
        defaultAgent: "",
        getAddressResult: null,
        lottBetTimer: [],
        lottDrawNumberTimer: [],
        syncRate: 1,
        quotaObj: [],
        globeRebate: [],
        currentLottery: {},
        headers: {},
        hotGameCount: 8,
        activity: [],
        bankCardLengh: 0,
        BANK_CARD_MAX_LIMIT: 5,
        cid: "",
        messageRecipientList: [],
        messageSelectedRecipient: [],
        pvpGameWindows: null,
        fishingGameWindows: null,
        onlinePaymentWindows: null,
        channelPaymentWindows: null,
        walletList: {},
        deletedIds: [],
        loading: !0,
        xmlHttp: ""
    },
    vendorId = {
        onlinePayment: null,
        onlinePayment_index: 0,
        wechat: null,
        wechat_qr_enable: null,
        wechat_index: 0,
        alipay: null,
        alipay_qr_enable: null,
        alipay_index: 0
    };
Array.prototype.clean = function(a) {
    for (var b = 0; b < this.length; b++) this[b] == a && (this.splice(b, 1), b--);
    return this
};
var control = {
    init: function() {
        window.sessionStorage.setItem("isLogin", !1), control.checkLogin(!0), control.form("login"), control.stickyHeader()
    },
    formatDateFull: function(a, b) {
        null === b || void 0 === b ? b = "yyyy-MM-dd hh:mm:ss" : "yyyy/MM/dd hh:mm" == b && (a = a.toString().replace(/-/g, "/"));
        var c = new Date(a),
            d = c.getFullYear(),
            e = c.getMonth() + 1,
            f = c.getDate(),
            g = c.getHours(),
            h = c.getMinutes(),
            i = c.getSeconds();
        e = e < 10 ? "0" + e : e, f = f < 10 ? "0" + f : f, g = g < 10 ? "0" + g : g, h = h < 10 ? "0" + h : h, i = i < 10 ? "0" + i : i;
        var j = b;
        return j = j.replace("yyyy", d), j = j.replace("MM", e), j = j.replace("dd", f), j = j.replace("hh", g), j = j.replace("mm", h), j = j.replace("ss", i)
    },
    checkLogin: function(a) {
        var b = "" === window.location.hash ? "#lobby" : window.location.hash;
        TCG.Ajax({
            url: "memberinfo"
        }, function(c) {
            if (c.status) {
                var d = globalVar.merchantCode,
                    e = c.result.account.split("@")[1],
                    f = [];
                f.push("merchant=" + d), f.push("username=" + e);
                var g = document.createElement("script");
                g.type = "text/javascript", g.async = !0;
                document.location && encodeURIComponent(window.location.href.substring(window.location.protocol.length));
                g.src = "https://nodejs.uxgaming.com/embedded/supported.js?" + f.join("&");
                var h = document.getElementsByTagName("script")[0];
                h.parentNode.insertBefore(g, h), globalVar.refreshWalletTimer && window.clearInterval(globalVar.refreshWalletTimer), globalVar.refreshWalletTimer = window.setInterval(function() {
                    control.headerWalletList(null, !0)
                }, 3e5);
                var i = JSON.parse(c.result.memberLabel.replace(/'/g, '"'));
                globalVar.enableDividentRecord = !1, globalVar.enableSalaryRecord = !1;
                for (var j = 0; j < i.length; j++)
                    if ("招商" == i[j].labelName || "特权" == i[j].labelName || "招商2" == i[j].labelName) {
                        globalVar.enableDividentRecord = !0;
                        break
                    }
                window.sessionStorage.setItem("isLogin", !0), window.sessionStorage.setItem("isAgent", c.result.type), window.sessionStorage.setItem("nickname", c.result.nickname), window.sessionStorage.setItem("username", c.result.account), window.sessionStorage.setItem("customerId", c.result.customerId), window.sessionStorage.setItem("regDate", c.result.regdate), window.sessionStorage.setItem("token", c.result.token);
                var k = {
                    account: c.result.account,
                    nickname: c.result.nickname,
                    totalAmount: void 0 === c.result.safeBalance ? "0.00" : c.result.safeBalance,
                    lastLoginTimes: c.result.lastlogin
                };
                globalVar.headers = {
                    Merchant: globalVar.merchantCode,
                    Authorization: c.result.token
                }, UI.header(!0, k), $.when(TCG.Ajax({
                    url: "lgw/games",
                    headers: {
                        Merchant: globalVar.merchantCode
                    }
                }), TCG.Ajax({
                    url: "lgw/customers/series",
                    headers: {
                        Merchant: globalVar.merchantCode,
                        Authorization: window.sessionStorage.getItem("token")
                    }
                })).done(function(c, d) {
                    globalVar.result.games = c[0], globalVar.result.customerSeries = d[0], a || "#lobby" != b || (UI.afterLogin(k), UI.lotteryMenus()), a && ("#lobby" == b && UI.loadLobbyPage(!0, k), "#lottery" == b && UI.loadLotteryPage())
                }), im.connect(c.result.customerId, function() {
                    im.subscribeUserChannel(c.result.customerId, function(a) {
                        var b = JSON.parse(a);
                        if ("I18n" == b.type && b.content.indexOf("LGSBALANCE") > -1) {
                            var c = b.content.split("_"),
                                d = c[1] + c[2] + (new Date).getTime();
                            $(".notif-btm").prepend('<div id="' + d + '" class="wn-draw">\t\t\t\t\t\t\t\t<span class="wn-name">' + TCG.Prop("gameName_" + c[1]) + '</span>\t\t\t\t\t\t\t\t<span class="wn-draw-date">第' + c[2] + '期</span>\t\t\t\t\t\t\t\t<span class="wn-rbt">盈利 ' + lott.formatNumber(c[4], 4) + '</span>\t\t\t\t\t\t\t\t<span class="close-draw"></span>\t\t\t\t\t\t\t\t</div>');
                            var e = window.setTimeout(function() {
                                $("#" + d).fadeOut(2e3, function() {
                                    $(this).remove()
                                }), null != e && window.clearTimeout(e)
                            }, 3e3);
                            $(".close-draw").off("click").on("click", function() {
                                $(this).parent().remove()
                            }), control.headerWalletList(null, !0), $("li[bet-sort='todayBetHistory']").hasClass("tab-active") && lott.bettingOrderHistoryRecord()
                        }
                    })
                });
                var l = JSON.parse(c.result.memberLabel.replace(/\'/g, '"'));
                globalVar.hasLRM = !1, globalVar.dividendLabel = !1;
                for (var j = 0; j < l.length; j++) "LRM" == l[j].labelName ? globalVar.hasLRM = !0 : "特权" == l[j].labelName && (globalVar.dividendLabel = !0);
                control.indexAnnouncement(), TCG.Ajax({
                    url: "./getContractualDividendInfo"
                }, function(a) {
                    if (a.result.agent.length > 0)
                        for (var b = 0; b < a.result.agent.length; b++)
                            if ("A" == a.result.agent[b].status || "V" == a.result.agent[b].status) {
                                globalVar.enableDividentRecord = !0;
                                break
                            }
                }), TCG.Ajax({
                    url: "./getContractDailySalaryInfo"
                }, function(a) {
                    if (a.result.agent.length > 0)
                        for (var b = 0; b < a.result.agent.length; b++)
                            if ("A" == a.result.agent[b].status || "V" == a.result.agent[b].status) {
                                globalVar.enableSalaryRecord = !0;
                                break
                            }
                }), control.checkSalaryRequest()
            } else {
                if (a || TCG.hideLoading(), window.sessionStorage.setItem("isLogin", !1), UI.header(!1), "#lottery" == b) return void TCG.Alert("alerts", TCG.Prop("check_login_failed"), "XS", function() {
                    window.location.href = "index.html"
                });
                if ("#chart" == b) return void TCG.Alert("alerts", TCG.Prop("check_login_failed"), "XS", function() {
                    window.location.href = "index.html"
                });
                "#lobby" == b && ($.when(TCG.Ajax({
                    url: "lgw/games",
                    headers: {
                        Merchant: globalVar.merchantCode
                    }
                })).done(function(a) {
                    globalVar.result.games = a, UI.loadLobbyPage(!1, null)
                }).fail(function() {
                    TCG.hideLoading()
                }), "login.change.pw.required" == c.description && control.firstTimeLogins())
            }
        })
    },
    login: function() {
        $(document).off("click", "#loginBtn").on("click", "#loginBtn", function() {
            var a = $("input[name='uUsername']").val(),
                b = $("input[name='uPassword']").val(),
                c = /^\w{6,14}$/.test(a),
                d = /^\w{6,16}$/.test(b);
            if ("" == a && "" == b) return void TCG.Alert("errors", TCG.Prop("login_userNamePassword_required"), "XS", function() {
                $("input[name='uUsername']").focus()
            });
            if ("" == a) return void TCG.Alert("errors", TCG.Prop("login_userName_required"), "XS", function() {
                $("input[name='uUsername']").focus()
            });
            if ("" == b) return void TCG.Alert("errors", TCG.Prop("login_password_required"), "XS", function() {
                $("input[name='uPassword']").focus()
            });
            if (!c) return void TCG.Alert("errors", TCG.Prop("login_userName_invalid"), "XS", function() {
                $("input[name='uUsername']").focus()
            });
            if (!d) return void TCG.Alert("errors", TCG.Prop("login_password_invalid"), "XS", function() {
                $("input[name='uPassword']").focus()
            });
            if (!$("#loginBtn").hasClass("processing")) {
                $("#loginBtn").addClass("processing").attr("value", "正在登录"), TCG.showLoading();
                var e = {
                    values: control.encode([globalVar.merchantCode, a, b, 11111])
                };
                TCG.Ajax({
                    url: "./login",
                    data: e,
                    type: "POST"
                }, function(a) {
                    if (a.status)
                        if (window.sessionStorage.setItem("username", a.result.userName), window.sessionStorage.setItem("token", a.result.token), window.sessionStorage.setItem("oldPwd", b), TCG.hideLoading(), a.result.firstTimeLogin) window.sessionStorage.setItem("isLogin", !1), control.firstTimeLogins();
                        else {
                            a.result.passwordExpired ? (window.sessionStorage.setItem("isLogin", !1), control.expiredPassword()) : control.checkLogin(!1), control.clearLottBetTimer();
                            var c = window.setInterval(control.hotGamesTimer, 1e3);
                            globalVar.lottBetTimer.push(c)
                        }
                    else TCG.hideLoading(), TCG.Alert("errors", TCG.Prop(a.description)), $("#loginBtn").removeClass("processing").attr("value", "立即登录")
                })
            }
        })
    },
    headerWalletList: function(a, b) {
        TCG.Ajax({
            url: "./getAllWalletBal"
        }, function(c) {
            if (c.status) {
                var d = c.result.value.balances,
                    e = 0;
                if (d.length > 0) {
                    for (var f = 0; f < d.length; f++) switch ("FROZEN_ACCOUNT" != d[f].accountName && (e = 1 * e + 1 * d[f].availBalance), d[f].accountName) {
                        case "PVP":
                            $("#PVPWallet").html(control.customCurrencyFormat(d[f].availBalance, 4)), window.sessionStorage.setItem("PVPWallet", d[f].availBalance);
                            break;
                        case "SAFE_BOX":
                            $("#safeBoxWallet").html(control.customCurrencyFormat(d[f].availBalance, 4)), window.sessionStorage.setItem("safeBoxWallet", d[f].availBalance), globalVar.walletList.main = d[f];
                            break;
                        case "AG":
                            $("#AGWallet").html(control.customCurrencyFormat(d[f].availBalance, 4)), window.sessionStorage.setItem("AGWallet", d[f].availBalance);
                            break;
                        case "BBIN":
                            $("#BBINWallet").html(control.customCurrencyFormat(d[f].availBalance, 4)), window.sessionStorage.setItem("BBINWallet", d[f].availBalance);
                            break;
                        case "LOTT":
                            $("#LOTTWallet").html(control.customCurrencyFormat(d[f].availBalance, 4)), window.sessionStorage.setItem("LOTTWallet", d[f].availBalance), globalVar.walletList.lotto = d[f]
                    }
                    $("#afterLoginBalance").text(control.currencyFormat(e, 2)), $("#sumWallet").html(control.customCurrencyFormat(e, 4)), sessionStorage.walletBalance = e;
                    if ("#lottery" == ("" == window.location.hash ? "#lobby" : window.location.hash) && UI.headerLottery(), $("#instantTransferFund")[0]) {
                        var g = globalVar.walletList.main,
                            h = globalVar.walletList.lotto,
                            i = g.availBalance + h.availBalance;
                        $("#instantTransferFund").slider({
                            range: "min",
                            min: 0,
                            max: i,
                            step: .01,
                            value: g.availBalance,
                            stop: function(a, b) {
                                var c = 0;
                                b.value > globalVar.walletList.main.availBalance ? (c = b.value - globalVar.walletList.main.availBalance, control.instantTransferFund(globalVar.walletList.lotto, globalVar.walletList.main, c)) : b.value < globalVar.walletList.main.availBalance && (c = globalVar.walletList.main.availBalance - b.value, control.instantTransferFund(globalVar.walletList.main, globalVar.walletList.lotto, c))
                            }
                        })
                    }
                }
            } else b || TCG.Alert("errors", TCG.Prop("walletList_failed"));
            a && a(c.status)
        }), control.walletDropdown("li.money-amount p.show")
    },
    instantTransferFund: function(a, b, c) {
        $("#instantTransferFund").slider({
            disabled: !0
        }), 2 == b.accountTypeId ? TCG.Ajax({
            url: "./checkLockTransStatus",
            data: {
                accountTypeId: a.accountTypeId
            }
        }, function(d) {
            d.status ? 1 == d.result.status ? TCG.Ajax({
                url: "./checkLockStatusByType",
                data: {
                    accountTypeId: a.accountTypeId
                }
            }, function(a) {
                var b = 0;
                for (var c in a)
                    if (a.hasOwnProperty(c)) {
                        var d = a[c];
                        for (var e in d) d.hasOwnProperty(e) && "1" == d[e].lock_status && (b += parseInt(d[e].current_to_required))
                    }
                TCG.Alert("errors", "无法转账，流水还剩余  " + b, "警报"), control.resetInstantTransferFund()
            }) : control.doInstantTransferFund(a, b, c, "from_sub_to_main") : (TCG.Alert("errors", TCG.Prop(d.description)), control.resetInstantTransferFund())
        }) : 2 == a.accountTypeId ? TCG.Ajax({
            url: "./checkLockStatus",
            data: {
                accountId: b.accountId
            }
        }, function(d) {
            if (d.status) switch (d.result.lock_status) {
                case 0:
                case "0":
                    control.doInstantTransferFund(a, b, c, "from_main_to_sub");
                    break;
                case 1:
                case "1":
                    TCG.Confirm("确定要把钱转移到钱包内？一旦转入必须完成红利才能转出。", "", function(d) {
                        d ? control.doInstantTransferFund(a, b, c, "from_main_to_sub") : control.resetInstantTransferFund()
                    });
                    break;
                default:
                    control.resetInstantTransferFund()
            } else TCG.Alert("errors", TCG.Prop(d.description)), control.resetInstantTransferFund()
        }) : control.resetInstantTransferFund()
    },
    resetInstantTransferFund: function() {
        $("#instantTransferFund").slider({
            disabled: !1,
            value: globalVar.walletList.main.availBalance
        })
    },
    doInstantTransferFund: function(a, b, c, d) {
        var e, f = {},
            c = c.toFixed(2);
        switch (d) {
            case "from_main_to_sub":
                e = "./transferFromMainWallet", f = {
                    accountTypeId: b.accountTypeId,
                    amount: c
                };
                break;
            case "from_sub_to_main":
                e = "./transferToMainWallet", f = {
                    accountTypeId: a.accountTypeId,
                    amount: c
                };
                break;
            default:
                return void control.resetInstantTransferFund()
        }
        TCG.Ajax({
            url: e,
            data: f
        }, function(a) {
            a.status ? (TCG.Alert("success", TCG.Prop("transfer_success")), control.getWalletBalance(function(a) {
                $("#instantTransferFund").slider({
                    disabled: !1
                })
            })) : (TCG.Alert("errors", TCG.Prop(a.description)), control.resetInstantTransferFund())
        })
    },
    refreshWallet: function() {
        $(document).off("click", ".refresh-wallet").on("click", ".refresh-wallet", function() {
            control.headerWalletList()
        })
    },
    expiredPassword: function() {
        control.userAgreement("expired"), TCG.Ajax({
            url: "xml/expiredPassword.xml",
            dataType: "html"
        }, function(a) {
            TCG.WinOpen({
                text: a,
                transparent: !0,
                width: "460px",
                height: "445px"
            }, function() {
                var a = window.sessionStorage.getItem("username").split("@");
                $("#firstLoginUser").html(a[1]), $("#popup_close").hide(), $(document).off("click", "#expiredPaswordSubmit").on("click", "#expiredPaswordSubmit", function() {
                    $("#firstLoginChangePwd")[0].childNodes[3].childNodes[1].removeAttribute("name"), $("#firstLoginChangePwd")[0].childNodes[3].childNodes[3].removeAttribute("name");
                    var a = $("input[name='firstLoginNewPwd']").val(),
                        b = $("input[name='firstLoginConfirmPwd']").val();
                    if (!/^\w{6,16}$/.test(a)) return void TCG.Alert("errors", TCG.Prop("firstTimeLogins_newPwd_invalid"), "XS", function() {
                        $("input[name='firstLoginNewPwd']").focus()
                    });
                    if (!/^\w{6,16}$/.test(b)) return void TCG.Alert("errors", TCG.Prop("firstTimeLogins_confNewPwd_invalid"), "XS", function() {
                        $("input[name='firstLoginConfirmPwd']").focus()
                    });
                    if (a != b) return void TCG.Alert("errors", TCG.Prop("firstTimeLogins_confPwdNewPwd_notmatch"), "XS", function() {
                        $("input[name='firstLoginConfirmPwd']").focus()
                    });
                    if (!$("#expiredPaswordSubmit").hasClass("processing")) {
                        $("#expiredPaswordSubmit").addClass("processing"), TCG.showLoading();
                        var c = {
                            values: control.encode([window.sessionStorage.getItem("oldPwd"), a, b])
                        };
                        TCG.Ajax({
                            url: "modifyPassword",
                            data: c,
                            type: "POST"
                        }, function(a) {
                            a.status ? (TCG.WinClose(), control.checkLogin(!1)) : (TCG.hideLoading(), $("div.model_child_content #loading").remove(), TCG.Alert("errors", TCG.Prop(a.description)), $("#expiredPaswordSubmit").removeClass("processing")), $("div.model_child_content #loading").remove()
                        })
                    }
                }), $(document).off("click", "#cancelBtn").on("click", "#cancelBtn", function() {
                    TCG.WinClose(), control.checkLogin(!1)
                }), $(document).off("click", "#dontShowBtn").on("click", "#dontShowBtn", function() {
                    $("#dontShowBtn").hasClass("processing") || ($("#dontShowBtn").addClass("processing"), TCG.Ajax({
                        url: "./extendPasswordValidity"
                    }, function(a) {
                        a.status ? (TCG.WinClose(), control.checkLogin(!1)) : TCG.Alert("errors", TCG.Prop(a.description)), $("#dontShowBtn").removeClass("processing")
                    }))
                })
            })
        })
    },
    firstTimeLogins: function() {
        control.userAgreement("firstTime"), TCG.Ajax({
            url: "xml/firstTimeLogin.xml",
            dataType: "html"
        }, function(a) {
            TCG.WinOpen({
                text: a,
                transparent: !0,
                width: "460px",
                height: "445px"
            }, function() {
                var a = window.sessionStorage.getItem("username").split("@");
                $("#firstLoginUser").html(a[1]), $("#popup_close").hide(), $(document).off("click", "#firstLoginSubmit").on("click", "#firstLoginSubmit", function() {
                    $("#firstLoginChangePwd")[0].childNodes[3].childNodes[1].removeAttribute("name"), $("#firstLoginChangePwd")[0].childNodes[3].childNodes[3].removeAttribute("name");
                    var a = $("input[name='firstLoginNewPwd']").val(),
                        b = $("input[name='firstLoginConfirmPwd']").val();
                    if (!/^\w{6,16}$/.test(a)) return void TCG.Alert("errors", TCG.Prop("firstTimeLogins_newPwd_invalid"), "XS", function() {
                        $("input[name='firstLoginNewPwd']").focus()
                    });
                    if (!/^\w{6,16}$/.test(b)) return void TCG.Alert("errors", TCG.Prop("firstTimeLogins_confNewPwd_invalid"), "XS", function() {
                        $("input[name='firstLoginConfirmPwd']").focus()
                    });
                    if (a != b) return void TCG.Alert("errors", TCG.Prop("firstTimeLogins_confPwdNewPwd_notmatch"), "XS", function() {
                        $("input[name='firstLoginConfirmPwd']").focus()
                    });
                    if (!$("#firstLoginSubmit").hasClass("processing")) {
                        $("#firstLoginSubmit").addClass("processing"), TCG.showLoading();
                        var c = {
                            values: control.encode([window.sessionStorage.getItem("oldPwd"), a, b])
                        };
                        TCG.Ajax({
                            url: "modifyPassword",
                            data: c,
                            type: "POST"
                        }, function(a) {
                            if (a.status) {
                                control.clearLottBetTimer();
                                var b = window.setInterval(control.hotGamesTimer, 1e3);
                                globalVar.lottBetTimer.push(b), TCG.WinClose(), control.checkLogin(!1)
                            } else TCG.hideLoading(), $("div.model_child_content #loading").remove(), TCG.Alert("errors", TCG.Prop(a.description)), $("#firstLoginSubmit").removeClass("processing");
                            $("div.model_child_content #loading").remove()
                        })
                    }
                })
            })
        })
    },
    stickyHeader: function() {
        $("#stickyHeader").sticky()
    },
    userAgreement: function(a) {
        $(document).off("click", "#userAgreement").on("click", "#userAgreement", function() {
            TCG.Ajax({
                url: "xml/userAgreement.xml",
                dataType: "html"
            }, function(b) {
                TCG.WinOpen({
                    text: b,
                    transparent: !0,
                    width: "560px",
                    height: "580px"
                }, function() {
                    $("#popup_close").hide(), $(document).off("click", "#closeUserAgreement").on("click", "#closeUserAgreement", function() {
                        "firstTime" == a ? control.firstTimeLogins() : control.expiredPassword()
                    })
                })
            })
        })
    },
    logout: function() {
        $(document).off("click", "#logout").on("click", "#logout", function() {
            TCG.Confirm(TCG.Prop("logout"), "XL", function(a) {
                a && TCG.Ajax({
                    url: "./logout"
                }, function(a) {
                    sessionStorage.clear(), localStorage.clear(), window.location = "index.html"
                })
            })
        })
    },
    pageMenu: function(a) {
        $(document).off("click", a).on("click", a, function() {
            var a = $(this).attr("data-modal");
            if (void 0 != a && null != a && "" != a) {
                if ("false" == window.sessionStorage.getItem("isLogin") && $(this).hasClass("login_required")) return void TCG.Alert("alerts", "您还未登录,请先登录!");
                var b = a.split("/");
                if ("customerservice" == b[0]) return void control.customerService();
                var c = UI.popupsModel(b[0]);
                window.sessionStorage.setItem("mainMenu", b[0]), TCG.WinOpen({
                    text: c,
                    width: "1274px",
                    height: "600px"
                }, function() {
                    UI.checkUserType(), control.popupsModelMenu(), control.popupSubMenu(), b.length > 1 ? $('.model_child_menus li[data-submenu="' + b[1] + '"]').trigger("click") : $(".model_child_menus li:first-child").trigger("click"), control.closePopOnESC("on")
                }, function() {
                    control.closePopOnESC("off"), window.sessionStorage.removeItem("mainMenu"), window.sessionStorage.removeItem("childMenu")
                })
            }
        })
    },
    popupsModelMenu: function() {
        $(document).off("click", ".model_main_menus dt,.model_main_menus dd").on("click", ".model_main_menus dt,.model_main_menus dd", function() {
            var a = $(this).attr("data-modal").split("/"),
                b = a[0];
            if (b != window.sessionStorage.getItem("mainMenu") && (window.sessionStorage.setItem("mainMenu", b), void 0 != b && null != b && "" != b)) {
                if ("false" == window.sessionStorage.getItem("isLogin") && "customerservice" != b && "help" != b && "activity" != b) return void TCG.Alert("alerts", TCG.Prop("login_failed"));
                if ("customerservice" == b) return void control.customerService();
                $(".model_child_menus").html(UI.modalSubMenu(b)), control.popupSubMenu(), void 0 != a[1] ? $(".model_child_menus li[data-submenu='" + a[1] + "']").trigger("click") : $(".model_child_menus li:first-child").trigger("click")
            }
        })
    },
    popupSubMenu: function() {
        $(document).off("click", ".model_child_menus li").on("click", ".model_child_menus li", function() {
            var a = $(this).attr("data-submenu");
            window.sessionStorage.setItem("childMenu", a), $(".model_child_menus li").removeClass("sub-act"), void 0 != a && null != a && "" != a && ($(".model_child_content").prepend('<div id="loading"></div>'), TCG.Ajax({
                id: ".model_child_content",
                url: "./xml/" + a + ".xml",
                dataType: "html"
            }, function() {
                UI.loadUserInfo(), $('.model_child_menus li[data-submenu="' + a + '"]').addClass("sub-act");
                var b = new Function("return control." + a + "();");
                $.when(b()).done(function() {
                    $("div.model_child_content #loading").remove()
                }), $(document).off("click", ".form-submit").on("click", ".form-submit", function() {
                    0 != globalVar.loading ? $(".model_child_content").prepend('<div id="loading"></div>') : $("div.model_child_content #loading").remove(), globalVar.loading = !0
                })
            }))
        })
    },
    closePopOnESC: function(a) {
        "on" == a ? $(document).on("keyup", function(a) {
            27 == a.keyCode && $("#popup_close").click()
        }) : $(document).off("keyup")
    },
    forgetPassword: function() {
        $(document).off("click", "#forgetPasswords").on("click", "#forgetPasswords", function() {
            UI.forgotPassword()
        })
    },
    findPasswordByEmail: function() {
        TCG.Ajax({
            url: "xml/forgotPasswordForm.xml",
            dataType: "html"
        }, function(a) {
            TCG.WinOpen({
                text: a,
                width: "489px",
                height: "405px",
                transparent: !0
            }, function() {
                var a = $("#forgotPasswordForm"),
                    b = a.find(".form-submit");
                $(document).off("click", "input[name='forgetSubmit']").on("click", "input[name='forgetSubmit']", function() {
                    if (!b.hasClass("processing")) {
                        b.addClass("processing");
                        var a = $('input[name="forgetUsername"]').val(),
                            c = $('input[name="forgetEmail"]').val();
                        if (!/^\w{6,14}$/.test(a)) return void TCG.Alert("errors", TCG.Prop("forgot_password_username_invalid"), "XS", function() {
                            $("input[name='forgetUsername']").focus()
                        });
                        var d = /\w+\@\w+\.\w{2,}/.test(c),
                            e = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(c);
                        if (!d && !e) return void TCG.Alert("errors", TCG.Prop("forgot_password_email_invalid"), "XS", function() {
                            $("input[name='forgetEmail']").focus()
                        });
                        var f = {
                            values: control.encode([globalVar.merchantCode, a, c])
                        };
                        TCG.Ajax({
                            url: "/findPwdByEmail",
                            data: f,
                            type: "POST"
                        }, function(a) {
                            a.status ? TCG.Alert("success", TCG.Prop("forgot_password_password_sent"), "XS", function() {
                                TCG.WinClose()
                            }) : TCG.Alert("errors", TCG.Prop(a.description)), b.removeClass("processing")
                        })
                    }
                }), $(document).off("click", "input[name='forgetCancel']").on("click", "input[name='forgetCancel']", function() {
                    TCG.WinClose(), UI.forgotPassword()
                })
            })
        })
    },
    switchBalance: function() {
        $(document).off("click", "#isCheckBalance").on("click", "#isCheckBalance", function() {
            var a = $(this).attr("identify");
            "hide" == a && ($(this).attr("identify", "show").text("显示"), $("#showBalance").hide(), $(".rs-refresh").hide(), $("#hideBalance").show()), "show" == a && (control.headerWalletList(), $(this).attr("identify", "hide").text("隐藏"), $("#hideBalance").hide(), $("#showBalance").show(), $(".rs-refresh").show(), control.walletDropdown("li.money-amount p.show"))
        })
    },
    customerService: function() {
        var a = void 0 != window.screenLeft ? window.screenLeft : screen.left,
            b = void 0 != window.screenTop ? window.screenTop : screen.top,
            c = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
            d = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
            e = c / 2 - 400 + a,
            f = d / 2 - 280 + b,
            g = window.open("https://kf1.learnsaas.com/chat/chatClient/chatbox.jsp?companyID=688455&configID=57905&jid=9040258761&s=1", "CustomerService", "resizable= no, menubar=no, status=no, toolbar=no, scrollbars=no, width=800, height=560, top=" + f + ", left=" + e);
        window.focus && g.focus()
    },
    hotGamesTimer: function() {
        if (globalVar.syncRate % 32 == 0) UI.refreshHotGames(), UI.refreshHotGamesUi(), globalVar.syncRate = 1;
        else {
            var a = !0;
            $("em[lott-numero]").each(function(b) {
                var c = $(this).attr("lott-numero"),
                    d = $("em[lott-numero='" + c + "']").attr("numero");
                $("em[lott-numero='" + c + "']").text("距离" + d + "期开奖");
                var e = $("span[lott-bet-times='" + c + "']").attr("bet-times"),
                    f = $("span[lott-bet-times='" + c + "']").attr("isSale");
                1 * e == -1 && a ? (a = !1, UI.refreshHotGames(), globalVar.syncRate = 1) : "false" == f ? $("span[lott-bet-times='" + c + "']").text("--:--:--") : $("span[lott-bet-times='" + c + "']").text(UI.fmtTimeTohhmmss(1 * e, "hh:mm:ss")), e--, $("span[lott-bet-times='" + c + "']").attr("bet-times", e)
            })
        }
        globalVar.syncRate++
    },
    betTimer: function() {
        if (globalVar.syncRate % 32 == 0) UI.showDrawUI(), UI.lottBetTimes(!1), globalVar.syncRate = 1;
        else {
            var a = $('#lotteryHeader span[bet-timer="currNumero"]').attr("numero");
            $('span[bet-timer="currNumero"]').text(a), globalVar.currentLottery.numero = a;
            var b = $('#lotteryHeader p[bet-timer="bet-times"]').attr("bet-times"),
                c = 1 * $('#lotteryHeader p[bet-timer="bet-times"]').attr("lock-times") - 1;
            if (1 * b - 1 * c == 0) {
                var d = null,
                    e = 1;
                TCG.showMessage(TCG.Prop("gameName_" + globalVar.currentLottery.game) + '第<span style="color: yellow">' + a + "</span>期已结束<br/>请留意投注期号。"), d = window.setInterval(function() {
                    1 * --e <= 0 && (window.clearInterval(d), TCG.hideMessage())
                }, 1800), lott.chase.isChase && "" != lott.chase.currNumero && window.setTimeout(function() {
                    lott.chase.listNumeros(!1)
                }, 500)
            }
            1 * c - 1 * b >= 0 && 1 * c - 1 * b <= 1 * c + 1 ? (globalVar.currentLottery.isLockTimes = !0, $('span[bet-timer="words"]').text("开奖锁定"), $('p[bet-timer="bet-times"]').css({
                color: "#ff8282"
            }), globalVar.currentLottery.isSale ? $('p[bet-timer="bet-times"]').text(UI.fmtTimeTohhmmss(1 * b, "hh:mm:ss")) : $('p[bet-timer="bet-times"]').text("--:--:--"), 1 * b == -1 && (UI.lottBetTimes(!1), globalVar.syncRate = 1, UI.showDrawUI())) : (globalVar.currentLottery.isLockTimes = !1, $('span[bet-timer="words"]').text("投注剩余"), $('p[bet-timer="bet-times"]').css({
                color: "#608df1"
            }), globalVar.currentLottery.isSale ? $('p[bet-timer="bet-times"]').text(UI.fmtTimeTohhmmss(1 * b - (1 * c + 1), "hh:mm:ss")) : $('p[bet-timer="bet-times"]').text("--:--:--")), b--, $('p[bet-timer="bet-times"]').attr("bet-times", b)
        }
        globalVar.syncRate++
    },
    clearLottBetTimer: function() {
        if (globalVar.lottBetTimer.length > 0) {
            for (var a = 0; a < globalVar.lottBetTimer.length; a++) window.clearInterval(globalVar.lottBetTimer[a]);
            globalVar.lottBetTimer = []
        }
        globalVar.syncRate = 1
    },
    clearLottDrawNumberTimer: function() {
        if (globalVar.lottDrawNumberTimer.length > 0) {
            for (var a = 0; a < globalVar.lottDrawNumberTimer.length; a++) window.clearTimeout(globalVar.lottDrawNumberTimer[a]);
            globalVar.lottDrawNumberTimer = []
        }
    },
    indexAnnouncement: function() {
        var a = {
                merchantCode: globalVar.merchantCode,
                type: "M"
            },
            b = parseInt(sessionStorage.getItem("isAgent"));
        Boolean(sessionStorage.getItem("isLogin")) && b > 0 && null != b && (a = {
            merchantCode: globalVar.merchantCode
        }), TCG.Ajax({
            url: "getListAnnouncement",
            data: a
        }, function(a) {
            if (a.status) {
                var b = "";
                if (globalVar.activity = a.result, a.result.length > 0)
                    for (var c = a.result.length > 7 ? 7 : a.result.length, d = 0; d < c; d++) {
                        var e = "P" == a.result[d].category ? "activityInfo" : "announcement";
                        b += '<dl class="news-content" data-modal="activity/' + e + '" data-content="' + a.result[d].id + '">', b += '<dt class="news-title">' + control.strSub(a.result[d].title, 28) + "</dt>", a.result[d].createtime.indexOf(".") < 0 ? b += '<dd class="news-date">' + a.result[d].createtime + "</dd>" : b += '<dd class="news-date">' + a.result[d].createtime.substr(0, a.result[d].createtime.indexOf(".")) + "</dd>", b += "</dl>"
                    }
                $(".news-wrp").html(b), $(document).off("click", ".news-wrp dl").on("click", ".news-wrp dl", function() {
                    var a = $(this).attr("data-modal"),
                        b = $(this).attr("data-content");
                    window.sessionStorage.setItem("activity", b);
                    var c = a.split("/"),
                        d = UI.popupsModel(c[0]);
                    TCG.WinOpen({
                        text: d,
                        width: "1274px",
                        height: "600px"
                    }, function() {
                        UI.checkUserType(), control.popupsModelMenu(), control.popupSubMenu(), window.sessionStorage.setItem("childMenu", ""), c.length >= 1 ? $('.model_child_menus li[data-submenu="' + c[1] + '"]').trigger("click") : $(".model_child_menus li:first-child").trigger("click")
                    })
                })
            }
        })
    },
    strSub: function(a, b) {
        if (null == a) return 0;
        var c, d, e = 0,
            f = "";
        for (c = 0; c < a.length; c++)
            if (d = a.charCodeAt(c), f += a.charAt(c), d < 127 ? e += 1 : 128 <= d && d <= 2047 ? e += 2 : 2048 <= d && d <= 65535 && (e += 2), e == 1 * b) {
                c + 1 != a.length && (f += "...");
                break
            }
        return f
    },
    hoverLongText: function(a, b) {
        if (a.length > b) {
            var c = control.strSub(a, b);
            return a = a.replace(/\,/g, ""), a = a.replace(/\|/g, " "), c + '<label class="moreText" id="moreText" style="cursor: pointer;" data-text="' + a + '">更多</label>'
        }
        return a
    },
    showLongText: function(a) {
        TCG.Alert("", '<textarea id="manualEntryDetail" cols="40" rows="12" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" style="margin: 0px; width: 506px; height: 478px;">正在加载,请稍等...</textarea>', "L"), window.setTimeout(function() {
            $("#manualEntryDetail").val(a)
        }, 50)
    },
    announcement: function() {
        control.activityPopup("N")
    },
    activityInfo: function() {
        control.activityPopup("P")
    },
    activityPopup: function(a) {
        var b = window.sessionStorage.getItem("activity");
        control.showActivityList(a), $(document).off("click", ".rs-an-list>ul>li").on("click", ".rs-an-list>ul>li", function() {
            $(".rs-an-list>ul>li").removeClass("hlt-blue"), $(this).addClass("hlt-blue");
            var a = $(this).attr("data-content");
            control.showActivityContent(a)
        }), null == b ? $(".rs-an-list>ul>li:first-child").trigger("click") : (window.sessionStorage.removeItem("activity"), $('.rs-an-list>ul>li[data-content="' + a + "/" + b + '"]').trigger("click"))
    },
    showActivityList: function(a) {
        for (var b = 0; b < globalVar.activity.length; b++)
            if (globalVar.activity[b].category == a) {
                var c = "";
                c += '<li class="clearfix" data-content="' + a + "/" + globalVar.activity[b].id + '">', c += '<span class="list-line"></span>', c += '<p class="rs-date">';
                var d = globalVar.activity[b].createtime.substring(0, 10).split("-");
                c += '<span class="rs-month">' + d[1] + "月</span>", c += '<span class="rs-day">' + d[2] + "</span>", c += "</p>", c += '<div class="list-exerpt">', c += "<h2>" + control.strSub(globalVar.activity[b].title, 20) + "</h2>", c += "<p></p>", c += "</div>", c += '<div class="clearfix"></div>', c += "</li>", $(".rs-an-list>ul").append(c)
            }
    },
    showActivityContent: function(a) {
        for (var b = a.split("/"), c = 0; c < globalVar.activity.length; c++)
            if (globalVar.activity[c].category == b[0] && globalVar.activity[c].id == b[1]) {
                var d = "";
                d += '<div class="an-title-date">', d += "<h1>" + globalVar.activity[c].title + "</h1>", globalVar.activity[c].createtime.indexOf(".") < 0 ? d += "<span>" + globalVar.activity[c].createtime + "</span>" : d += "<span>" + globalVar.activity[c].createtime.substr(0, globalVar.activity[c].createtime.indexOf(".")) + "</span>", d += "</div>", d += '<div class="an-the-message">' + globalVar.activity[c].content + "</div>", $(".rs-an-content").html(d)
            }
    },
    managePromotions: function() {
        control.form(), control.countUnreadMessage(), control.switchDecimal(), control.switchPromotions(), control.searchPromotions(), $("#managePromotionsForm .form-submit").click()
    },
    switchPromotions: function() {
        $(document).off("click", "#switchPromotions li").on("click", "#switchPromotions li", function() {
            var a = $(this).attr("data-rel");
            if (!$(this).hasClass("active")) {
                switch (a) {
                    case "unclaimed":
                        $("#unclaimedTable").removeClass("hide"), $("#unclaimedTotal").removeClass("hide"), $("#claimedTable").addClass("hide"), $("#claimedTotal").addClass("hide"), $("#expiredTable").addClass("hide"), $("#expiredTotal").addClass("hide"), $("#promotion_status").val("U");
                        break;
                    case "claimed":
                        $("#claimedTable").removeClass("hide"), $("#claimedTotal").removeClass("hide"), $("#unclaimedTable").addClass("hide"), $("#unclaimedTotal").addClass("hide"), $("#expiredTable").addClass("hide"), $("#expiredTotal").addClass("hide"), $("#promotion_status").val("C");
                        break;
                    case "expired":
                        $("#expiredTable").removeClass("hide"), $("#expiredTotal").removeClass("hide"), $("#claimedTable").addClass("hide"), $("#claimedTotal").addClass("hide"), $("#unclaimedTable").addClass("hide"), $("#unclaimedTotal").addClass("hide"), $("#promotion_status").val("E")
                }
                $("#managePromotionsForm .form-submit").click(), $("#switchPromotions li.active").removeClass("active"), $(this).addClass("active")
            }
        })
    },
    searchPromotions: function() {
        $(document).off("click", "#managePromotionsForm .form-submit").on("click", "#managePromotionsForm .form-submit", function() {
            control.getPromotions()
        })
    },
    getPromotions: function(a) {
        var b = $("#managePromotionsForm"),
            c = (b.find(".form-submit"), b.find("[name='promotion_status']")),
            d = b.find("[name='limit']"),
            e = b.find("[name='pageNo']"),
            f = {
                type: c.val(),
                pageNo: e.val(),
                start: (e.val() - 1) * d.val(),
                limit: d.val()
            };
        TCG.Ajax({
            url: "./getPromotions",
            data: f
        }, function(a) {
            a.status ? (UI.loadPromotions(a.result, f), control.claimPromotion()) : TCG.Alert("errors", TCG.Prop(a.description)), $("div.model_child_content #loading").remove()
        })
    },
    carousel: function() {
        $("#carousel").carouFredSel({
            circular: !0,
            auto: {
                duration: 1e3,
                pauseOnHover: !0,
                width: "702px"
            },
            pagination: {
                pauseOnHover: !0,
                container: "#sliderNav",
                anchorBuilder: function(a, b) {
                    return "<a href='#" + a + "' class='nav'>" + a + "</a>"
                }
            }
        })
    },
    form: function(a) {
        $(document).off("keyup", "form .form-control").on("keyup", "form .form-control", function(b) {
            if (13 == b.which) {
                if ("login" == a && "" == $("#loginForm input[name='uPassword']").val()) return void $("#loginForm input[name='uPassword']").focus();
                $(this).parents("form").find(".form-submit").click()
            }
        })
    },
    copyClipboard: function(a) {
        var b = a || $("[data-clipboard]");
        ZeroClipboard.setDefaults({
            moviePath: "./js/lib/ZeroClipboard.swf"
        });
        var c = new ZeroClipboard(b);
        return "Manual" == sessionStorage.getItem("depositPage") && c.on("complete", function(a, b) {
            TCG.Alert("success", TCG.Prop("linkManager_success_copy"))
        }), c
    },
    limitTwoDecimal: function(a) {
        $(document).off("keyup", a).on("keyup", a, function() {
            var b = $(a).val(),
                c = b.substr(b.indexOf(".") + 1);
            b.indexOf(".") > 0 && c.length > 2 && $(a).val(b.slice(0, -1))
        })
    },
    timeToDateFormat: function(a, b) {
        var c = new Date(a);
        c.setTime(c.getTime() + 6e4 * (new Date).getTimezoneOffset() + 288e5);
        var b = b || "date",
            d = c,
            e = d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1,
            f = d.getDate() < 10 ? "0" + d.getDate() : d.getDate(),
            g = d.getSeconds(),
            h = d.getMinutes(),
            i = d.getHours();
        switch (b) {
            case "date":
                newDateFormat = d.getFullYear() + "-" + e + "-" + f;
                break;
            case "dateTime":
                newDateFormat = d.getFullYear() + "-" + e + "-" + f + " " + (i < 10 ? "0" + i : i) + ":" + (h < 10 ? "0" + h : h) + ":" + (g < 10 ? "0" + g : g);
                break;
            case "MonthDateTime":
                newDateFormat = e + "-" + f + " " + (i < 10 ? "0" + i : i) + ":" + (h < 10 ? "0" + h : h) + ":" + (g < 10 ? "0" + g : g)
        }
        return newDateFormat
    },
    amountSetMinMax: function(a, b, c) {
        var d = parseInt(a);
        return d < b ? (TCG.Alert("errors", TCG.Prop("amountSetMinMax_amount_greater_required") + b), !0) : d > c ? (TCG.Alert("errors", TCG.Prop("amountSetMinMax_amount_lesser_required") + c), !0) : void 0
    },
    numberWithCommas: function(a) {
        var b = a.toString().split(".");
        return b[0] = b[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","), b.join(".")
    },
    customSelect: function(a, b) {
        void 0 == b && (b = !0);
        var c = {
            width: "100%",
            disable_search: b,
            no_results_text: "没有查到符合条件的数据"
        };
        $(a).chosen(c).on("chosen:showing_dropdown", function() {
            $(this).parents("div").addClass("red-up")
        }).on("chosen:hiding_dropdown", function() {
            $(this).parents("div").removeClass("red-up")
        })
    },
    resetCustomSelect: function(a) {
        a.find(".selected-red").removeClass("selected-red"), setTimeout(function() {
            a.find("select").trigger("chosen:updated")
        }, 100)
    },
    getWalletList: function(a, b) {
        TCG.Ajax({
            url: "./getWalletList"
        }, function(c) {
            c.status ? UI.loadWalletList(a, c.result.value, b) : TCG.Alert("errors", TCG.Prop(c.description))
        })
    },
    maskData: function(a, b) {
        for (var c = a.substring(0, b), d = 0; d < a.length; d++) d >= b && (c += "*");
        return c
    },
    sortBy: function(a, b) {
        var c = Object.prototype.toString,
            d = function(a) {
                return a
            },
            e = function(a) {
                return this.parser(null !== a && "object" == typeof a && a[this.prop] || a)
            };
        return a instanceof Array && a.length ? ("[object Object]" !== c.call(b) && (b = {}), "function" != typeof b.parser && (b.parser = d), b.desc = b.desc ? -1 : 1, a.sort(function(a, c) {
            return a = e.call(b, a), c = e.call(b, c), b.desc * (a < c ? -1 : +(a > c))
        })) : []
    },
    getServerTime: function() {
        try {
            globalVar.xmlHttp = new XMLHttpRequest
        } catch (a) {
            try {
                globalVar.xmlHttp = new ActiveXObject("Msxml2.XMLHTTP")
            } catch (a) {
                try {
                    globalVar.xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (a) {
                    TCG.Alert("errors", "AJAX not supported")
                }
            }
        }
        return globalVar.xmlHttp.open("HEAD", window.location.href.toString(), !1), globalVar.xmlHttp.setRequestHeader("Content-Type", "text/html"), globalVar.xmlHttp.send(""), globalVar.xmlHttp.getResponseHeader("Date")
    },
    encode: function(a) {
        for (var b = [], c = 0; c < a.length; c++) b.push(encodeURI(a[c]));
        return getEncryptedText(b)
    },
    getWalletBalance: function(a) {
        TCG.Ajax({
            url: "./getAllWalletBal"
        }, function(b) {
            if (b.status) {
                var c = b.result.value.balances,
                    d = 0;
                if (c.length > 0) {
                    for (var e = 0; e < c.length; e++) switch ("FROZEN_ACCOUNT" != c[e].accountName && (d += c[e].availBalance), c[e].accountName) {
                        case "PVP":
                            $("#transferPVPWallet").html(control.customCurrencyFormat(c[e].availBalance, 4)), $("#PVPWallet").html(control.customCurrencyFormat(c[e].availBalance, 4)), $("#roomListPVPWallet").html(control.customCurrencyFormat(c[e].availBalance, 4)), window.sessionStorage.setItem("PVPWallet", c[e].availBalance);
                            break;
                        case "SAFE_BOX":
                            $("#transferSafeBoxWallet").html(control.customCurrencyFormat(c[e].availBalance, 4)), $("#safeBoxWallet").html(control.customCurrencyFormat(c[e].availBalance, 4)), window.sessionStorage.setItem("safeBoxWallet", c[e].availBalance), globalVar.walletList.main = c[e];
                            break;
                        case "AG":
                            $("#transferAGWallet").html(control.customCurrencyFormat(c[e].availBalance, 4)), $("#AGWallet").html(control.customCurrencyFormat(c[e].availBalance, 4)), window.sessionStorage.setItem("AGWallet", c[e].availBalance);
                            break;
                        case "LOTT":
                            $("#transferLOTTWallet").html(control.customCurrencyFormat(c[e].availBalance, 4)), $("#LOTTWallet").html(control.customCurrencyFormat(c[e].availBalance, 4)), window.sessionStorage.setItem("LOTTWallet", c[e].availBalance), globalVar.walletList.lotto = c[e];
                            break;
                        case "BBIN":
                            $("#transferBBINWallet").html(control.customCurrencyFormat(c[e].availBalance, 4)), $("#BBINWallet").html(control.customCurrencyFormat(c[e].availBalance, 4)), window.sessionStorage.setItem("BBINWallet", c[e].availBalance)
                    }
                    if ($("#sumWallet").html(control.customCurrencyFormat(d, 4)), $("[data-walletbalance='ALL']").text(control.currencyFormat(d, 2)), $("[data-walletbalance='MAIN_WALLET']").text(control.currencyFormat(globalVar.walletList.main.availBalance, 2)), sessionStorage.walletBalance = d, $("#instantTransferFund")[0]) {
                        var f = globalVar.walletList.main,
                            g = globalVar.walletList.lotto,
                            h = f.availBalance + g.availBalance;
                        $("#instantTransferFund").slider({
                            max: h,
                            value: f.availBalance
                        })
                    }
                    a && a(b.result)
                }
            } else TCG.Alert("errors", TCG.Prop(b.description))
        })
    },
    getUserInfo: function(a) {
        TCG.Ajax({
            url: "./memberinfo"
        }, function(b) {
            if (b.status) {
                var c = JSON.parse(b.result.memberLabel.replace(/\'/g, '"'));
                globalVar.hasLRM = !1;
                for (var d = 0; d < c.length; d++) "LRM" == c[d].labelName ? globalVar.hasLRM = !0 : "特权" == c[d].labelName && (globalVar.dividendLabel = !0)
            }
            a(b)
        })
    },
    currencyFormat: function(a, b) {
        if (isNaN(a)) return "NaN";
        var c, d = a.toString().replace("-", "").split("."),
            e = "-" == a.toString()[0] ? "-" : "";
        return c = d[0].replace(/./g, function(a, b, c) {
            return b && "." !== a && (c.length - b) % 3 == 0 ? "," + a : a
        }), e + c + function(a) {
            var b = "",
                a = void 0 == a && void 0 != d[1] ? d[1].length : a;
            if (a > 0)
                if (b += ".", void 0 == d[1])
                    for (var c = 0; c < a; c++) b += "0";
                else
                    for (var c = 0; c < a; c++) b += c < d[1].length ? d[1][c] : "0";
            return b
        }(b)
    },
    customCurrencyFormat: function(a, b) {
        if (void 0 != b) {
            if ("-" == a) return a;
            a = a || 0;
            var c = control.currencyFormat(a, b).toString().split("."),
                b = NaN == c[1] || void 0 == c[1] ? "0" : c[1].replace(",", ""),
                d = c[0] + ".<span class='tblDec'>" + b + "</span>"
        } else var c = control.currencyFormat(a).toString().split("."),
            d = c[0];
        return d
    },
    datepickerStartEnd: function(a, b, c, d, e) {
        var c = void 0 == c ? "-365" : c,
            f = ["日", "一", "二", "三", "四", "五", "六"],
            g = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            h = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
        if (d) {
            a.datepicker && a.datetimepicker("destroy"), b.datepicker && b.datetimepicker("destroy");
            var i, j, k = function() {
                    for (var a = ["#ui_hour_input_picker", "#ui_min_input_picker", "#ui_sec_input_picker"], b = 0; b < a.length; b++) $(document).off("keyup", a[b]).on("keyup", a[b], function() {
                        var a = $(this),
                            b = a.attr("id"),
                            c = parseInt(a.val()),
                            d = "ui_min_input_picker" == b || "ui_sec_input_picker" == b ? 60 : 24;
                        c >= d && a.val(d - 1)
                    }), $(document).off("focusout", a[b]).on("focusout", a[b], function() {
                        var a = $(this),
                            b = parseInt(a.val());
                        a.attr("id");
                        b ? b < 10 && (b = "0" + b) : b = "00", a.val(b)
                    }), $(document).off("click", a[b]).on("click", a[b], function() {
                        $(this).val("")
                    })
                },
                l = function(a) {
                    for (var b = a.elemCon, c = (a.elemInput, ""), d = "", e = b.find(".ui_tpicker_hour_slider"), f = b.find(".ui_tpicker_minute_slider"), g = b.find(".ui_tpicker_second_slider"), h = [{
                            elem: e,
                            timeDetail: "ui_hour_input_picker"
                        }, {
                            elem: f,
                            timeDetail: "ui_min_input_picker"
                        }, {
                            elem: g,
                            timeDetail: "ui_sec_input_picker"
                        }], i = 0; i < h.length; i++) {
                        var j = h[i].elem;
                        j.children(0).each(function() {
                            $.each(this.attributes, function() {
                                this.specified && (c += " " + this.name + '="' + this.value + '"')
                            })
                        });
                        var d = '<input id="' + h[i].timeDetail + '" type="text" ' + c + ' value="00"/>';
                        j.html(d), c = ""
                    }
                    window.setTimeout(function() {
                        $(b).find(".ui-state-highlight").removeClass("ui-state-highlight"), $(b).prepend('<span class="MSIE8 tp-span-mg"></span>'), k()
                    }, 0)
                },
                m = function(a, b, c) {
                    return {
                        controlType: "select",
                        timeInput: !0,
                        timeFormat: "HH:mm:ss",
                        oneLine: !0,
                        timeText: "时间:",
                        closeText: "确定",
                        altFieldTimeOnly: !0,
                        showTimepicker: !0,
                        showButtonPanel: !0,
                        gotoCurrent: !1,
                        showOtherMonths: !0,
                        dateFormat: "yy-mm-dd",
                        maxDate: 0,
                        onSelect: a,
                        beforeShow: b,
                        onClose: c,
                        dayNamesMin: f,
                        monthNames: g,
                        monthNamesShort: h,
                        afterInject: function() {
                            var a = i || j;
                            a && l(a)
                        }
                    }
                },
                n = function(b, c) {
                    e && (a.datetimepicker("setDate", $(a[0]).attr("complete-date")), $(a[0]).val($(a[0]).val().split(" ")[0])), window.setTimeout(function() {
                        i = {
                            elemCon: $(c.dpDiv),
                            elemInput: $(a[0])
                        }, l(i);
                        var b = $(a[0]).attr("complete-date").split(" "),
                            d = b[1].split(":");
                        $("#ui_hour_input_picker").val(d[0]), $("#ui_min_input_picker").val(d[1]), $("#ui_sec_input_picker").val(d[2])
                    }, 0)
                },
                o = function(c) {
                    if (b.datetimepicker("option", "minDate", c), e) {
                        $(b[0]).val($(b[0]).val().split(" ")[0]);
                        var d = $(a[0]);
                        d.attr("complete-date", c), d.val(c.split(" ")[0])
                    }
                },
                p = function(b, c) {
                    if (e) {
                        var d = $("#ui_hour_input_picker").val();
                        d = "" == d ? "00" : d;
                        var f = $("#ui_min_input_picker").val();
                        f = "" == f ? "00" : f;
                        var g = $("#ui_sec_input_picker").val();
                        g = "" == g ? "00" : g;
                        var h = $(a[0]).attr("complete-date").split(" "),
                            i = h[0] + " " + d + ":" + f + ":" + g;
                        $(a[0]).attr("complete-date", i), $(a[0]).val(h[0])
                    }
                },
                q = function(a, c) {
                    e && (b.datetimepicker("setDate", $(b[0]).attr("complete-date")), $(b[0]).val($(b[0]).val().split(" ")[0])), window.setTimeout(function() {
                        j = {
                            elemCon: $(c.dpDiv),
                            elemInput: $(b[0])
                        }, l(j);
                        var a = $(b[0]).attr("complete-date").split(" "),
                            d = a[1].split(":");
                        $("#ui_hour_input_picker").val(d[0]), $("#ui_min_input_picker").val(d[1]), $("#ui_sec_input_picker").val(d[2])
                    }, 0)
                },
                r = function(c) {
                    if (a.datetimepicker("option", "maxDate", c), e) {
                        $(a[0]).val($(a[0]).val().split(" ")[0]);
                        var d = $(b[0]);
                        d.attr("complete-date", c), d.val(c.split(" ")[0])
                    }
                },
                s = function(a, c) {
                    if (e) {
                        var d = $("#ui_hour_input_picker").val();
                        d = "00" == d || "" == d ? 23 : d;
                        var f = $("#ui_min_input_picker").val();
                        f = "00" == f || "" == f ? 59 : f;
                        var g = $("#ui_sec_input_picker").val();
                        g = "00" == g || "" == g ? 59 : g;
                        var h = $(b[0]).attr("complete-date").split(" "),
                            i = h[0] + " " + d + ":" + f + ":" + g;
                        $(b[0]).attr("complete-date", i), $(b[0]).val(h[0])
                    }
                };
            if (a.datetimepicker(m(o, n, p)).datetimepicker("setDate", c), e) {
                var t = $(a[0]).val().split(" ");
                $(a[0]).attr("complete-date", t[0] + " 00:00:00"), $(a[0]).val(t[0])
            }
            var u = m(r, q, s);
            if (u.minDate = c, u.maxDate = 0, u.setDate = 0, b.datetimepicker(u).datetimepicker("setDate", new Date), e) {
                var v = $(b[0]).val().split(" ");
                $(b[0]).attr("complete-date", v[0] + " 23:59:59"), $(b[0]).val(v[0])
            }
        } else a.datepicker && a.datepicker("destroy"), b.datepicker && b.datepicker("destroy"), a.datepicker({
            showOtherMonths: !0,
            dateFormat: "yy-mm-dd",
            maxDate: 0,
            onSelect: function(a) {
                b.datepicker("option", "minDate", a)
            },
            beforeShow: function(a, b) {
                window.setTimeout(function() {
                    $(b.dpDiv).prepend('<span class="MSIE8 tp-span-mg"></span>')
                }, 0)
            },
            dayNamesMin: f,
            monthNames: g,
            monthNamesShort: h
        }).datepicker("setDate", c), b.datepicker({
            showOtherMonths: !0,
            dateFormat: "yy-mm-dd",
            minDate: c,
            maxDate: 0,
            setDate: 0,
            onSelect: function(b) {
                a.datepicker("option", "maxDate", b)
            },
            beforeShow: function(a, b) {
                window.setTimeout(function() {
                    $(b.dpDiv).find(".ui-state-highlight").removeClass("ui-state-highlight"), $(b.dpDiv).prepend('<span class="MSIE8 tp-span-mg"></span>')
                }, 0)
            },
            dayNamesMin: f,
            monthNames: g,
            monthNamesShort: h
        }).datepicker("setDate", "0")
    },
    goToPageNo: function(a, b, c, d) {
        var d = d || "#pagination";
        $(document).off("click", d + " [name='goToPage']").on("click", d + " [name='goToPage']", function() {
            var e = $(d + " [name='inputPageNo']");
            if (regExPattern("numberOnly", e.val()))
                if (e.val() > 0 && e.val() <= c) switch (a) {
                    case "transactionDetails":
                        $("#changeAccountForm [name='pageNo']").val(e.val()), $("#changeAccountForm .form-submit").click();
                        break;
                    case "lottoGameHistory":
                        $("#lottoGameHistoryForm [name='pageNo']").val(e.val()), $("#lottoGameHistoryForm .form-submit").click();
                        break;
                    case "pvpGameHistory":
                        $("#pvpGameHistoryForm [name='pageNo']").val(e.val()), $("#pvpGameHistoryForm .form-submit").click();
                        break;
                    case "betHistory":
                        $("#betHistoryForm [name='pageNo']").val(e.val()), $("#betHistoryForm .form-submit").click();
                        break;
                    case "norecordChase":
                        $("#norecordChaseForm [name='pageNo']").val(e.val()), $("#norecordChaseForm .form-submit").click();
                        break;
                    case "memberManagementForm":
                        $("#" + a + " [name='pageNo']").val(e.val()), control.getMemberManagement(!1);
                        break;
                    case "agentPvpGameHistory":
                        $("#agentPvpGameHistoryForm [name='pageNo']").val(e.val()), $("#agentPvpGameHistoryForm .form-submit").click();
                        break;
                    case "linkManager":
                        $("#linkManagerForm [name='pageNo']").val(e.val()), control.viewAffiliateUrls();
                        break;
                    case "lottoTeamBetting":
                        $("#lottoTeamBettingForm [name='pageNo']").val(e.val()), $("#lottoTeamBettingForm .form-submit").click();
                        break;
                    case "pvpTeamBetting":
                        $("#pvpTeamBettingForm [name='pageNo']").val(e.val()), $("#pvpTeamBettingForm .form-submit").click();
                        break;
                    case "managePromotions":
                        $("#managePromotionsForm [name='pageNo']").val(e.val()), $("#managePromotionsForm .form-submit").click();
                        break;
                    case "revenueReport":
                        $("#revenueReportForm [name='pageNo']").val(e.val()), $("#revenueReportForm .form-submit").click();
                        break;
                    case "profitAndLossStatements":
                        $("#lottoAgentPnlForm [name='pageNo']").val(e.val()), $("#lottoAgentPnlForm .form-submit").click();
                        break;
                    case "getPvpAgentPnl":
                        $("#pvpAgentPnlForm [name='pageNo']").val(e.val()), $("#pvpAgentPnlForm .form-submit").click();
                        break;
                    case "agentTeamIncome":
                        $("#agentTeamIncome [name='pageNo']").val(e.val()), $("#agentTeamIncome .form-submit").click();
                        break;
                    case "contractManagementContent":
                        $("#contractManagement [name='inputPageNo']").val(e.val()), $("#contractManagementForm .form-submit").click();
                        break;
                    case "disbursement":
                        $("#disbursementForm [name='pageNo']").val(e), $("#disbursementForm .form-submit").click();
                        break;
                    case "sentMessages":
                        control.getSentMessages(e.val());
                        break;
                    case "inboxMessages":
                        control.getInboxMessages(e.val());
                        break;
                    case "downlineTransactionDetails":
                        $("#downlineTransactionDetailsForm [name='pageNo']").val(e.val()), $("#downlineTransactionDetailsForm .form-submit").click();
                        break;
                    case "itemWrapper":
                        $("#itemWrapper [name='pageNo']").val(e.val()), UI.separateOrderDetail("betHistory");
                        break;
                    case "nrc-table-2":
                        $(".nrc-table-2 [name='pageNo']").val(e.val()), UI.separateOrderDetail("nrc");
                        break;
                    case "agentTeamIncome":
                        $("#" + a + " [name='pageNo']").val(e), null !== sessionStorage.getItem("pnlCustomerId") ? control.getAgentTeamIncome(sessionStorage.getItem("pnlCustomerId")) : control.getAgentTeamIncome();
                        break;
                    default:
                        $("#" + a + " [name='pageNo']").val(e.val()), $("#" + a + " .form-submit").click()
                } else e.val(b)
        })
    },
    pageNav: function(a, b, c, d) {
        var d = d || "#pagination";
        $(document).off("click", d + " [data-pageNav]").on("click", d + " [data-pageNav]", function() {
            var d = $(this).attr("data-pageNav"),
                e = "next" == d ? 1 * b + 1 : 1 * b - 1;
            if (e > 0 && e <= c) switch (a) {
                case "transactionDetails":
                    $("#changeAccountForm [name='pageNo']").val(e), $("#changeAccountForm .form-submit").click();
                    break;
                case "lottoGameHistory":
                    $("#lottoGameHistoryForm [name='pageNo']").val(e), $("#lottoGameHistoryForm .form-submit").click();
                    break;
                case "pvpGameHistory":
                    $("#pvpGameHistoryForm [name='pageNo']").val(e), $("#pvpGameHistoryForm .form-submit").click();
                    break;
                case "betHistory":
                    $("#betHistoryForm [name='pageNo']").val(e), $("#betHistoryForm .form-submit").click();
                    break;
                case "norecordChase":
                    $("#norecordChaseForm [name='pageNo']").val(e), $("#norecordChaseForm .form-submit").click();
                    break;
                case "memberManagementForm":
                    $("#memberManagementForm [name='pageNo']").val(e), control.getMemberManagement(!1);
                    break;
                case "agentPvpGameHistory":
                    $("#agentPvpGameHistoryForm [name='pageNo']").val(e), $("#agentPvpGameHistoryForm .form-submit").click();
                    break;
                case "linkManager":
                    $("#linkManagerForm [name='pageNo']").val(e), control.viewAffiliateUrls();
                    break;
                case "lottoTeamBetting":
                    $("#lottoTeamBettingForm [name='pageNo']").val(e), $("#lottoTeamBettingForm .form-submit").click();
                    break;
                case "pvpTeamBetting":
                    $("#pvpTeamBettingForm [name='pageNo']").val(e), $("#pvpTeamBettingForm .form-submit").click();
                    break;
                case "managePromotions":
                    $("#managePromotionsForm [name='pageNo']").val(e), $("#managePromotionsForm .form-submit").click();
                    break;
                case "revenueReport":
                    $("#revenueReportForm [name='pageNo']").val(e), $("#revenueReportForm .form-submit").click();
                    break;
                case "profitAndLossStatements":
                    $("#lottoAgentPnlForm [name='pageNo']").val(e), null !== sessionStorage.getItem("pnlCustomerId") ? control.getLottoAgentPnl(sessionStorage.getItem("pnlCustomerId")) : control.getLottoAgentPnl();
                    break;
                case "getPvpAgentPnl":
                    $("#pvpAgentPnlForm [name='pageNo']").val(e), null !== sessionStorage.getItem("pnlCustomerId") ? control.getPvpAgentPnl(sessionStorage.getItem("pnlCustomerId")) : control.getPvpAgentPnl();
                    break;
                case "contractManagementContent":
                    $("#contractManagement [name='inputPageNo']").val(e), $("#contractManagementForm .form-submit").click();
                    break;
                case "disbursement":
                    $("#disbursementForm [name='pageNo']").val(e), $("#disbursementForm .form-submit").click();
                    break;
                case "sentMessages":
                    control.getSentMessages(e);
                    break;
                case "inboxMessages":
                    control.getInboxMessages(e);
                    break;
                case "downlineTransactionDetails":
                    $("#downlineTransactionDetailsForm [name='pageNo']").val(e), $("#downlineTransactionDetailsForm .form-submit").click();
                    break;
                case "itemWrapper":
                    $("#itemWrapper [name='pageNo']").val(e), UI.separateOrderDetail("betHistory");
                    break;
                case "nrc-table-2":
                    $(".nrc-table-2 [name='pageNo']").val(e), UI.separateOrderDetail("nrc");
                    break;
                case "agentTeamIncome":
                    $("#" + a + " [name='pageNo']").val(e), null !== sessionStorage.getItem("pnlCustomerId") ? control.getAgentTeamIncome(sessionStorage.getItem("pnlCustomerId")) : control.getAgentTeamIncome();
                    break;
                default:
                    $("#" + a + " [name='pageNo']").val(e), $("#" + a + " .form-submit").click()
            }
        })
    },
    clickPageNo: function(a, b, c, d) {
        var d = d || "#pagination";
        $(document).off("click", d + " [data-pageNo]").on("click", d + " [data-pageNo]", function() {
            var b = 1 * $(this).attr("data-pageNo");
            if (b > 0 && b <= c) switch (a) {
                case "transactionDetails":
                    $("#changeAccountForm [name='pageNo']").val(b), $("#changeAccountForm .form-submit").click();
                    break;
                case "lottoGameHistory":
                    $("#lottoGameHistoryForm [name='pageNo']").val(b), $("#lottoGameHistoryForm .form-submit").click();
                    break;
                case "pvpGameHistory":
                    $("#pvpGameHistoryForm [name='pageNo']").val(b), $("#pvpGameHistoryForm .form-submit").click();
                    break;
                case "betHistory":
                    $("#betHistoryForm [name='pageNo']").val(b), $("#betHistoryForm .form-submit").click();
                    break;
                case "norecordChase":
                    $("#norecordChaseForm [name='pageNo']").val(b), $("#norecordChaseForm .form-submit").click();
                    break;
                case "memberManagementForm":
                    $("#memberManagementForm [name='pageNo']").val(b), control.getMemberManagement(!1);
                    break;
                case "agentPvpGameHistory":
                    $("#agentPvpGameHistoryForm [name='pageNo']").val(b), $("#agentPvpGameHistoryForm .form-submit").click();
                    break;
                case "linkManager":
                    $("#linkManagerForm [name='pageNo']").val(b), control.viewAffiliateUrls();
                    break;
                case "lottoTeamBetting":
                    $("#lottoTeamBettingForm [name='pageNo']").val(b), $("#lottoTeamBettingForm .form-submit").click();
                    break;
                case "pvpTeamBetting":
                    $("#pvpTeamBettingForm [name='pageNo']").val(b), $("#pvpTeamBettingForm .form-submit").click();
                    break;
                case "managePromotions":
                    $("#managePromotionsForm [name='pageNo']").val(b), $("#managePromotionsForm .form-submit").click();
                    break;
                case "revenueReport":
                    $("#revenueReportForm [name='pageNo']").val(b), $("#revenueReportForm .form-submit").click();
                    break;
                case "profitAndLossStatements":
                    $("#lottoAgentPnlForm [name='pageNo']").val(b), null !== sessionStorage.getItem("pnlCustomerId") ? control.getLottoAgentPnl(sessionStorage.getItem("pnlCustomerId")) : control.getLottoAgentPnl();
                    break;
                case "getPvpAgentPnl":
                    $("#pvpAgentPnlForm [name='pageNo']").val(b), null !== sessionStorage.getItem("pnlCustomerId") ? control.getPvpAgentPnl(sessionStorage.getItem("pnlCustomerId")) : control.getPvpAgentPnl();
                    break;
                case "contractManagementContent":
                    $("#contractManagement [name='inputPageNo']").val(b), $("#contractManagementForm .form-submit").click();
                    break;
                case "disbursement":
                    $("#disbursementForm [name='pageNo']").val(b), $("#disbursementForm .form-submit").click();
                    break;
                case "sentMessages":
                    control.getSentMessages(b);
                    break;
                case "inboxMessages":
                    control.getInboxMessages(b);
                    break;
                case "downlineTransactionDetails":
                    $("#downlineTransactionDetailsForm [name='pageNo']").val(b), $("#downlineTransactionDetailsForm .form-submit").click();
                    break;
                case "itemWrapper":
                    $("#itemWrapper [name='pageNo']").val(b), UI.separateOrderDetail("betHistory");
                    break;
                case "nrc-table-2":
                    $(".nrc-table-2 [name='pageNo']").val(b), UI.separateOrderDetail("nrc");
                    break;
                case "agentTeamIncome":
                    $("#agentTeamIncome [name='pageNo']").val(b), null !== sessionStorage.getItem("pnlCustomerId") ? control.getAgentTeamIncome(sessionStorage.getItem("pnlCustomerId")) : control.getAgentTeamIncome();
                    break;
                default:
                    $("#" + a + " [name='pageNo']").val(b), $("#" + a + " .form-submit").click()
            }
        })
    },
    switchDecimal: function(a, b) {
        var a = a || "#switchDecimal",
            b = b || "";
        $(document).off("click", a).on("click", a, function() {
            $("[data-switchDecimal]", b).each(function(a) {
                var b = 2 == $(this).attr("data-switchDecimal") ? 4 : 2,
                    c = $(this).attr("data-value");
                $(this).attr("data-switchDecimal", b), $(this).html(control.customCurrencyFormat(c, b))
            })
        })
    },
    getProvinceList: function(a) {
        if (null !== globalVar.getAddressResult) {
            var b = globalVar.getAddressResult,
                c = b.getElementsByTagName("string");
            globalVar.getAddressResult = b, a(UI.loadProvinceList(c))
        } else TCG.Ajax({
            url: "./resource/province_city_zh-CN.xml",
            dataType: "xml"
        }, function(b) {
            var c = b.getElementsByTagName("string");
            globalVar.getAddressResult = b, a(UI.loadProvinceList(c))
        })
    },
    getCityList: function(a, b) {
        var c = globalVar.getAddressResult,
            d = "city_" + a,
            e = c.getElementsByTagName(d)[0],
            f = e.getElementsByTagName("item");
        b(UI.loadCityList(f))
    },
    selectProvince: function(a, b) {
        $(document).off("change", a).on("change", a, function() {
            var a = $(this).val(),
                c = $(this).find("option[value='" + a + "']"),
                d = $(b);
            "" == c.attr("data-englishName") ? d.html("<option value=''>市</option>").trigger("chosen:updated") : control.getCityList(c.attr("data-englishName"), function(a) {
                $(b).html(a).trigger("chosen:updated")
            })
        })
    },
    getBankCards: function(a) {
        TCG.Ajax({
            url: "./withdraw/getCard"
        }, function(b) {
            b.status ? (globalVar.minWithdraw = b.result.minWithdrawal, globalVar.maxWithdraw = b.result.maxWithdrawal, UI.loadBankCards(a, b.result)) : TCG.Alert("errors", TCG.Prop(b.description))
        })
    },
    walletDropdown: function(a) {
        $(a).mouseenter(function() {
            $(a).nextAll(".sub-wallet-menu.hide").show(), $(".money-amount.balanceWrapper").mouseleave(function(b) {
                $(b.target).parents(".money-amount.balanceWrapper")[0] || $(a).nextAll(".sub-wallet-menu.hide").hide()
            })
        }), $(".sub-wallet-menu.hide").mouseleave(function(b) {
            $(a).nextAll(".sub-wallet-menu.hide").hide()
        }), $("li.login-nam span").mouseenter(function() {
            $("li.login-nam .sub-wallet-menu").removeClass("hide"), $(".login-nam").mouseleave(function(a) {
                $("li.login-nam .sub-wallet-menu").addClass("hide")
            })
        }), $(".sub-wallet-menu").mouseleave(function(a) {
            $("li.login-nam .sub-wallet-menu").addClass("hide")
        })
    },
    days_between: function(a, b) {
        var c = null == a.getTime() ? new Date : a.getTime(),
            d = null == b.getTime() ? new Date : b.getTime(),
            e = Math.abs(c - d);
        return Math.round(e / 864e5)
    },
    loadGlobalRebates: function(a) {
        TCG.Ajax({
            url: "./agent/globalRebateSettings"
        }, function(b) {
            b.status ? (globalVar.globeRebate = b.result, a && a()) : TCG.Alert("errors", TCG.Prop(b.description))
        })
    },
    arrayUnique: function(a) {
        for (var b = [], c = 0; c < a.length; c++)
            if (0 == c) b.push(a[c]);
            else {
                for (var d = !0, e = 0; e < b.length; e++)
                    if (b[e].customerId == a[c].customerId) {
                        d = !1;
                        break
                    }
                d && b.push(a[c])
            }
        return b
    },
    countUnreadMessage: function() {
        setTimeout(function() {
            TCG.Ajax({
                url: "./getUnreadMessageCount"
            }, function(a) {
                a.status ? a.result > 0 ? $(".countUnreadMessage").text(a.result).removeClass("hide") : $(".countUnreadMessage").addClass("hide") : TCG.Alert("errors", TCG.Prop(a.description))
            })
        }, 250)
    },
    showTooltip: function(a, b, c, d) {
        $("div.model_child_content #loading").remove(), globalVar.loading = !1;
        var e = c || "form-tooltip",
            f = "<div class='err-msg tcg-tooltip " + e + "' style='display: block'>";
        f += "<div class='err-cont' style='width:auto !important;'>", f += "<span class='rs-tri'></span>", f += "<span class='the-err-msg'>" + TCG.Prop(b) + "</span>", f += "</div></div>", a.parents(".form-group").addClass("in-rel"), a.parents("form").find(".tcg-tooltip").remove(), a.after(f), d ? d() : $(document).off("click.tooltip", "html").on("click.tooltip", "html", function(a) {
            $(a.target).hasClass("form-submit") || ($("." + e).remove(), $(document).off("click.tooltip"))
        })
    },
    floatMenu: function() {
        if ($("#leftMenu")[0]) {
            var a = $("#leftMenu").offset();
            $(window).scroll(function() {
                $(window).scrollTop() > a.top ? $("#leftMenu").stop().animate({
                    marginTop: $(window).scrollTop() - a.top + 15 + 50
                }, 1e3) : $("#leftMenu").stop().animate({
                    marginTop: 0
                }, 1e3)
            })
        }
    },
    customSelectGame: function(a) {
        var a = a;
        $(document).off("click", a).on("click", a, function() {
            var a = $(this).parents(".selectGame"),
                b = a.find("[name='game']");
            a.addClass("show-data"), a.find(".gameList .game").unbind("click").bind("click", function(c) {
                var d = $(this),
                    e = d.attr("data-gameCode");
                if ("" == e) b.val(d.text()).attr({
                    "data-gameCode": d.attr("data-gameCode")
                }), a.find(".gameList .game").removeClass("selected"), a.find(".gameList .game-all").addClass("selected");
                else {
                    a.find(".gameList .game-all").removeClass("selected");
                    var f = "" == b.attr("data-gameCode") ? [] : b.val().split(","),
                        g = "" == b.attr("data-gameCode") ? [] : b.attr("data-gameCode").split(",");
                    if ($(this).hasClass("selected")) {
                        var h = f.indexOf(d.text());
                        h >= 0 && f.splice(h, 1);
                        var h = g.indexOf(e);
                        h >= 0 && g.splice(h, 1), d.removeClass("selected")
                    } else g.indexOf(e) < 0 && (f.push(d.text()), g.push(e), d.addClass("selected"));
                    f.length > 0 ? (b.val(f.join(",")), b.attr({
                        "data-gameCode": g.join(",")
                    })) : (b.val("全部"), b.attr({
                        "data-gameCode": ""
                    }), a.find(".gameList .game").removeClass("selected"), a.find(".gameList .game-all").addClass("selected"))
                }
            }), $(document).off("click", "html").on("click", "html", function(b) {
                "customGameList" == b.target.id || $(b.target).parents("#customGameList")[0] || ($(document).off("click", "html"), a.removeClass("show-data"))
            })
        })
    },
    onChangeSelect: function(a) {
        $(document).off("change", a + " [name='account']").on("change", a + " [name='account']", function() {
            control.changeOptions(a + " [name='account']", a + " [name='type']")
        })
    },
    changeOptions: function(a, b) {
        var c = $(a),
            b = $(b),
            d = c.find("option:selected").val();
        b.remove("options");
        var e = {
            width: "100%",
            disable_search: !0
        };
        switch ($(a, b).chosen(e).on("chosen:showing_dropdown", function() {
            $(a, b).parents("div").addClass("red-up")
        }).on("chosen:hiding_dropdown", function() {
            $(a, b).parents("div").removeClass("red-up")
        }), d) {
            case "1":
                var f = "";
                f += '<option value="" class="entire" selected>全部</option>', f += '<optgroup label="收入">', f += '<option value="5100">对战盈亏</option>', f += '<option value="8102">钱包转账</option>', f += "</optgroup>", f += '<optgroup label="支出">', f += '<option value="5200">对战盈亏</option>', f += '<option value="8202">钱包转账</option>', f += "</optgroup>", $(b).html(f);
                break;
            case "2":
                var f = "";
                f += '<option value="" class="entire" selected>全部</option>', f += '<optgroup label="收入">', f += '<option value="6101">充值</option>', f += '<option value="6116,6112">分红</option>', f += '<option value="6131,5112,3102,4104">活动</option>', f += '<option value="4401">佣金</option>', f += '<option value="4301">日工资</option>', f += '<option value="8102">钱包转账</option>', f += '<option value="6110">系统充正</option>', f += '<option value="6104">上下级转账</option>', f += '<option value="6111,6109,6113">娱乐返点</option>', f += '<option value="6118">真人代理返点</option>', f += "</optgroup>", f += '<optgroup label="支出">', f += '<option value="6201">提款</option>', f += '<option value="8202">钱包转账</option>', f += '<option value="6208">系统冲负</option>', f += '<option value="6207">上下级转账</option>', f += '<option value="4301">日工资</option>', f += "</optgroup>", $(b).html(f);
                break;
            case "301":
            case "306":
                var f = "";
                f += '<option value="" class="entire" selected>全部</option>', f += '<optgroup label="收入">', f += '<option value="3116">中奖</option>', f += '<option value="3101">钱包转账</option>', f += "</optgroup>", f += '<optgroup label="支出">', f += '<option value="3216">投注</option>', f += '<option value="3201">钱包转账</option>', f += "</optgroup>", $(b).html(f);
                break;
            case "4":
                var f = "";
                f += '<option value="" class="entire" selected>全部</option>', f += '<optgroup label="收入">', f += '<option value="4100">中奖</option>', f += '<option value="4106,4107,4108,4109,4110,4111">撤单</option>', f += '<option value="6114">彩票代理返点</option>', f += '<option value="4105">彩票个人返点</option>', f += '<option value="4101">钱包转账</option>', f += "</optgroup>", f += '<optgroup label="支出">', f += '<option value="4200">投注</option>', f += '<option value="4201">钱包转账</option>', f += '<option value="4208">撤单手续费</option>', f += "</optgroup>", $(b).html(f)
        }
        $(b).trigger("chosen:updated")
    },
    shortenText: function(a, b) {
        var b = b || 6,
            c = a.length,
            d = c < b ? 0 : c - b,
            e = c;
        return a.slice(d, e)
    },
    selectGameType: function(a, b) {
        $(document).off("change", a).on("change", a, function() {
            var a = $(this).val();
            UI.loadGameRooms(b, a, "update")
        })
    },
    selectDepositAmount: function(a) {
        $(document).off("click", "#amountList .amount").on("click", "#amountList .amount", function() {
            var b = parseInt($(this).text());
            switch ($(a).val(b), $(this).parents("form").attr("id")) {
                case "onlinePaymentForm":
                    control.filterPromotions(b), control.validateOnlinePaymentForm();
                    break;
                case "quickPaymentForm":
                    control.validateQuickPaymentForm();
                    break;
                case "conversionOfFundsForm":
                    control.validateTransferBalanceForm()
            }
        })
    },
    incDecDepositAmount: function(a, b, c) {
        var c = c || 100;
        $(document).off("click", a).on("click", a, function() {
            var a, d = $(b),
                e = $(this).attr("data-changeAmount"),
                f = regExPattern("amount", d.val());
            switch (a = f ? "increase" == e ? parseFloat(d.val()) + parseFloat(c) : parseInt(d.val()) - parseFloat(c) <= 0 ? d.val() : parseFloat(d.val()) - parseFloat(c) : c, a >= .1 && $(b).val(a), $(this).parents("form").attr("id")) {
                case "onlinePaymentForm":
                    control.filterPromotions(a), control.validateOnlinePaymentForm();
                    break;
                case "quickPaymentForm":
                    control.validateQuickPaymentForm();
                    break;
                case "conversionOfFundsForm":
                    control.validateTransferBalanceForm()
            }
        })
    },
    getDepositBankList: function(a, b) {
        TCG.Ajax({
            url: "./getDepositBankList"
        }, function(c) {
            if (c.status) {
                var d;
                switch (a) {
                    case "quickPayment":
                        if (d = null == c.result.manual_transfer_banks ? [] : c.result.manual_transfer_banks, 0 == d.length) {
                            var e = "";
                            e += "<div class='recharge_noBankListMT'>", e += "<h3>银行信息</h3>", globalVar.hasLRM ? e += "<p>提示：该渠道正在维护中，请选择其他的充值方式进行充值。</p>" : e += "<p>提示：由于您目前属于“见习会员”无法使用该渠道进行充值，请多多活跃哦！</p>", e += "<input type='button' class='cService' name='customerservice' value='咨询在线客服'/>", e += "</div>", $("#quickPaymentDeposit").html(e), $(".recharge_noBankListMT [name='customerservice']").unbind("click").bind("click", function() {
                                control.customerService()
                            })
                        }
                        break;
                    case "quickPayment2":
                        d = null == c.result.manual_transfer_banks ? [] : c.result.manual_transfer_banks;
                        for (var f = !0, g = 0; g < d.length; g++) "CMB" != d[g].bank_eng_name && "Manual Alipay" != d[g].bank_eng_name || (f = !1);
                        if (0 == d.length || f) {
                            var e = "";
                            e += "<div class='recharge_noBankListMT'>", e += "<h3>银行信息</h3>", globalVar.hasLRM ? e += "<p>提示：该渠道正在维护中，请选择其他的充值方式进行充值。</p>" : e += "<p>提示：由于您目前属于“见习会员”无法使用该渠道进行充值，请多多活跃哦！</p>", e += "<input type='button' class='cService' name='customerservice' value='咨询在线客服'/>", e += "</div>", $("#quickPaymentDeposit").html(e), $(".recharge_noBankListMT [name='customerservice']").unbind("click").bind("click", function() {
                                control.customerService()
                            })
                        }
                        break;
                    default:
                        return
                }
                "function" == typeof b ? b(d) : 0 != d.length && UI.loadDepositBankList(b, d, a)
            } else TCG.Alert("errors", TCG.Prop(c.description))
        })
    },
    getDepositBankListByVendor: function(a, b) {
        TCG.Ajax({
            url: "./getDepositBankListByVendor"
        }, function(c) {
            if (c.status) {
                var d, c = JSON.parse(c.result);
                switch (a) {
                    case "onlinePayment":
                        if (d = null == c.pg_banks ? [] : c.pg_banks, 0 == d.length) {
                            var e = "";
                            e += "<div class='recharge_noBankListPG'>", e += "<h3>银行信息</h3>", globalVar.hasLRM ? e += "<p>提示：该渠道正在维护中，请选择其他的充值方式进行充值。</p>" : e += "<p>提示：由于您目前属于“见习会员”无法使用该渠道进行充值，请多多活跃哦！</p>", e += "<input type='button' class='cService' name='customerservice' value='咨询在线客服'/>", e += "</div>", $(".onPayment-Rtcontent").html(e), $(".onPayment-Rtcontent .form-submit").hide(), $(".recharge_noBankListPG [name='customerservice']").unbind("click").bind("click", function() {
                                control.customerService()
                            })
                        }
                        break;
                    case "wechat":
                        if (d = null == c.wechat_banks ? [] : c.wechat_banks, 0 == d.length) {
                            var e = "";
                            e += "<div class='recharge_noBankListPG'>", e += "<h3>银行信息</h3>", globalVar.hasLRM ? e += "<p>提示：该渠道正在维护中，请选择其他的充值方式进行充值。</p>" : e += "<p>提示：由于您目前属于“见习会员”无法使用该渠道进行充值，请多多活跃哦！</p>", e += "<input type='button' class='cService' name='customerservice' value='咨询在线客服'/>", e += "</div>", $("#postDepositWeChat, #channelPaymentNotAvailable").remove(), $("#channelPayment").hide(), $("#channelPaymentForm").removeClass("hide").append(e), $(".recharge_noBankListQR [name='customerservice']").unbind("click").bind("click", function() {
                                control.customerService()
                            })
                        }
                        break;
                    case "alipay":
                        if (d = null == c.alipay_banks ? [] : c.alipay_banks, 0 == d.length) {
                            var e = "";
                            e += "<div class='recharge_noBankListPG'>", e += "<h3>银行信息</h3>", globalVar.hasLRM ? e += "<p>提示：该渠道正在维护中，请选择其他的充值方式进行充值。</p>" : e += "<p>提示：由于您目前属于“见习会员”无法使用该渠道进行充值，请多多活跃哦！</p>", e += "<input type='button' class='cService' name='customerservice' value='咨询在线客服'/>", e += "</div>", $("#postDepositAlipay, #aliPayNotAvailable").remove(), $("#aliPayForm").removeClass("hide").append(e), $("#aliPay").hide(), $(".recharge_noBankListQR [name='customerservice']").unbind("click").bind("click", function() {
                                control.customerService()
                            })
                        }
                }
                if ("function" == typeof b) b(d);
                else if ("onlinePayment" == a) return void(0 != d.length && UI.onlinePaymentList(b, d, a));
                if ("function" == typeof b) b(d);
                else if ("wechat" == a) return void(0 != d.length && UI.wechatList(b, d, a));
                if ("function" == typeof b) b(d);
                else if ("alipay" == a) return void(0 != d.length && UI.alipayList(b, d, a))
            }
        })
    },
    selectDepositBank: function(a) {
        var b, c;
        $("#onPayment-leftcontent");
        $(document).off("click", a).on("click", a, function() {
            switch ($(".bankRadioBtn").removeClass("selected-red"), $(this).parent().find(".bankRadioBtn").addClass("selected-red"), b = $(this).parent().find("[name='bankName']").attr("data-mindeposit"), c = $(this).parent().find("[name='bankName']").attr("data-maxdeposit"), $(".onPayment-leftcontent .min").html(b), $(".onPayment-leftcontent .max").html(c), $(this).parents("form").attr("id")) {
                case "onlinePaymentForm":
                    control.validateOnlinePaymentForm();
                    break;
                case "quickPaymentForm":
                    control.validateQuickPaymentForm();
                    break;
                case "conversionOfFundsForm":
                    control.validateTransferBalanceForm()
            }
        })
    },
    onlinePayment: function() {
        control.form(), control.countUnreadMessage(), control.getWalletBalance(), control.getDepositPromotions(), control.onPaymentNav(), control.selectDepositAmount("#onlinePaymentForm [name='amount']"), control.incDecDepositAmount("#onlinePaymentForm [data-changeAmount]", "#onlinePaymentForm [name='amount']"), control.getDepositBankListByVendor("onlinePayment", "#onlinePaymentForm [name='bankName']"), control.clickDepositPromotions(), control.accordionTab(), control.limitTwoDecimal("#onlinePaymentForm [name='amount']"), control.generateSlider(0, [0, 1e3, 5e3, 1e4, 5e4], 0, 5e3, 1e3, $("#onlinePaymentSlider"), $("#onlinePaymentForm"), !1, 0, !1, "sliderAdjustment", null, !0, control.validateonlinePaymentInput), $("#onlinePaymentForm [name='amount']").val(sessionStorage.getItem("depositPG") || "0");
        var a = window.sessionStorage.getItem("username");
        control.submitOnlinePayment(a), control.validateOnlinePaymentInput(), $("[name='promotions']").parent().parent().hide()
    },
    onPaymentNav: function() {
        var a = 0;
        $(document).off("click", "#onPaymentNav li").on("click", "#onPaymentNav li", function() {
            $("#onPaymentNav li").removeClass("active"), $(this).addClass("active"), a = $(this).index(), vendorId.onlinePayment_index = a, vendorId.onlinePayment = $(this).attr("data-vendorId"), $("#onlinePaymentForm .bankList-OpTab").addClass("hide"), $("#onlinePaymentForm .bankList-OpTab").eq(a).removeClass("hide"), $(".onPayment-leftcontent .min").html("20"), $(".onPayment-leftcontent .max").html("50,000"), $("#onlinePaymentForm").find("[name='bankName']:checked").each(function() {
                $(this).prop("checked", !1)
            }), $("#onlinePaymentForm .bankRadioBtn").removeClass("selected-red"), $("#onlinePaymentForm").find("[name='amount']").val("0"), $("#onlinePaymentForm").removeClass("enable"), $("#onlinePaymentForm .ui-slider-handle").css("left", "0%"), $("#onlinePaymentForm .sliderLegend").find("li").removeClass("selected "), $("#onlinePaymentForm .sliderLegend").find("li").eq(0).addClass("selected ")
        })
    },
    validateonlinePaymentInput: function() {
        var a = $("#onlinePaymentForm"),
            b = a.find("[name='bankName']:checked");
        1 * a.find("[name='amount']").val() > 0 && 1 == b.length ? a.addClass("enable") : a.removeClass("enable")
    },
    clickDepositPromotions: function() {
        $(document).off("click", "#onlinePaymentForm .promotion-item").on("click", "#onlinePaymentForm .promotion-item", function() {
            $("#onlinePaymentForm [name='promotions']:checked").prop("checked", !1), $(".winningsRadioBtn").removeClass("selected-red"), $(this).find(".winningsRadioBtn").addClass("selected-red"), $(this).find("[name='promotions']").prop("checked", !0)
        })
    },
    filterPromotions: function(a) {
        var b = !0;
        regExPattern("amount", a) ? $(".promotion-item").each(function() {
            var c = 1 * $(this).attr("data-minDeposit");
            a < c && 1 * $(this).attr("data-minDeposit") != -1 ? $(this).hide() : a >= c && 1 * $(this).attr("data-minDeposit") != -1 && ($(this).show(), b = !1)
        }) : ($("#opTab1").css("pointer-events", "auto"), $(".promotion-item").removeClass("hide")), b ? ($(".promotion-no-result").show(), $("#opTab1").css("pointer-events", "none"), $("#opTab1 select option[value='0']").text("暂无可选择的活动")) : ($("#opTab1").css("pointer-events", "auto"), $(".promotion-no-result").hide(), $("#opTab1 select option[value='0']").text("可选择参加活动")), $("#opTab1 select").val("0").trigger("chosen:updated")
    },
    validateChannelPaymentInput: function() {
        var a = $("#channelPaymentForm");
        1 * a.find("[name='amount']").val() > 0 ? a.addClass("enable") : a.removeClass("enable")
    },
    accordionTab: function() {
        $(document).off("click", "#accordionTab .tabBtn").on("click", "#accordionTab .tabBtn", function() {
            var a = $(this),
                b = $("#accordionTab .tabBtn"),
                c = $("#accordionTab .tabContent"),
                d = $("#" + a.attr("data-rel"));
            d.is(":hidden") && (c.slideUp(200), b.removeClass("status-show").addClass("status-hide"), a.removeClass("status-hide").addClass("status-show"), d.slideDown(200))
        })
    },
    extractNumber: function(a) {
        var b = a.replace(/[^0-9\.]/g, "");
        return b = b.match(/^\d+(?:\.\d{0,2})?/), null === b ? "" : b[0]
    },
    validateOnlinePaymentInput: function() {
        $(document).off("keypress", "#onlinePaymentForm [name='amount']").on("keypress", "#onlinePaymentForm [name='amount']", function(a) {
            13 == a.keyCode && a.preventDefault()
        }), $(document).off("keyup", "#onlinePaymentForm [name='amount']").on("keyup", "#onlinePaymentForm [name='amount']", function() {
            var a = control.extractNumber(this.value);
            $(this).val(a), control.filterPromotions(a), control.validateOnlinePaymentForm()
        })
    },
    validateOnlinePaymentForm: function() {
        var a = $("#onlinePaymentForm"),
            b = a.find("[name='amount']"),
            c = a.find("[name='bankName']:checked");
        "" != b.val() && regExPattern("amount", b.val()) && c[0] && "0" != b.val() ? a.addClass("enable") : a.removeClass("enable")
    },
    getDepositPromotions: function(a) {
        var a = a || "",
            b = {
                amount: a
            };
        TCG.Ajax({
            url: "./getDepositPromotion",
            data: b
        }, function(a) {
            a.status ? UI.loadDepositPromotions(a.result) : (TCG.Alert("errors", TCG.Prop(a.description)), $("#opTab1").after("<span>暂唔可选择的活动</span>"), $("#opTab1").remove())
        })
    },
    submitOnlinePayment: function(a) {
        var b = a.split("@")[1];
        $(document).off("click", "#onlinePaymentForm .form-submit").on("click", "#onlinePaymentForm .form-submit", function() {
            var a = vendorId.onlinePayment_index,
                c = $("#onlinePaymentForm"),
                d = c.find("[name='amount']"),
                e = c.find("[name='bankName']:checked"),
                f = c.find(".form-submit"),
                g = e.attr("data-mindeposit"),
                h = e.attr("data-maxdeposit"),
                i = $(c.find(".bankList-OpTab")).eq(a).find("li").eq(0);
            if (!regExPattern("amount", d.val())) return void control.showTooltip(d, "onlinePaymentForm_amount_invalid");
            if ("" == d.val() || "0" == d.val()) return void control.showTooltip(d, "onlinePaymentForm_amount_required");
            if (parseFloat(d.val()) < g) return void control.showTooltip(d, "onlinePaymentForm_amount_required");
            if (parseFloat(d.val()) > h) return void control.showTooltip(d, "onlinePaymentForm_amount_required");
            if (!e[0]) return void control.showTooltip($(i.find("[name='bankName']")[0]), "onlinePaymentForm_bankName_required");
            if (void 0 == b || null == b) return void TCG.Alert("errors", TCG.Prop("No Account Name!"));
            if (!f.hasClass("processing")) {
                f.addClass("processing");
                var j = {
                    values: control.encode([b, d.val(), e.val(), vendorId.onlinePayment])
                };
                globalVar.onlinePaymentWindows = window.open("", "onlinePaymentWindows", "_blank", "width=1024,height=768"), TCG.Ajax({
                    url: "./depositPG",
                    data: j
                }, function(a) {
                    if ($("div.model_child_content #loading").remove(), a.status) {
                        var b = a.result.redirection_url;
                        control.onlinePaymentPostDeposit(c, b), f.removeClass("processing")
                    } else {
                        var d, e = ["deposit amount must not be less than", "deposit amount must not be exceed"];
                        a.description.match(e[0]) ? (d = TCG.Prop(e[0]), e = a.description.split(e[0]), d += $.trim(e[1]), TCG.Alert("errors", d)) : a.description.match(e[1]) ? (d = TCG.Prop(e[1]), e = a.description.split(e[1]), d += $.trim(e[1]), TCG.Alert("errors", d)) : TCG.Alert("errors", TCG.Prop(a.description)), f.removeClass("processing"), null != globalVar.onlinePaymentWindows && globalVar.onlinePaymentWindows.close()
                    }
                })
            }
        })
    },
    onlinePaymentPostDeposit: function(a, b) {
        var c = a.find("[name='amount']"),
            d = c.val();
        control.getWalletBalance(), control.getDepositPromotions(), a.find(".bankRadioBtn").removeClass("selected-red"), a.removeClass("enable"), a.find(".form-reset").click(), c.val(d), globalVar.onlinePaymentWindows.location.href = b, sessionStorage.setItem("depositPG", d)
    },
    quickPayment: function() {
        control.form(), control.countUnreadMessage(), control.getWalletBalance(), control.getDepositPromotions(), control.switchQuickDepositTab(), control.selectDepositAmount("#quickPaymentForm [name='amount']"), control.incDecDepositAmount("#quickPaymentForm [data-changeAmount]", "#quickPaymentForm [name='amount']"), control.getDepositBankList("quickPayment", "#quickPaymentForm [name='bankName']"), control.limitTwoDecimal("#quickPaymentForm [name='amount']"), control.generateSlider(0, [0, 1e3, 5e3, 1e4, 5e4], 0, 5e3, 1e3, $("#quickPaymentSlider"), $("#quickPaymentForm"), !1, 0, !1, "sliderAdjustment", null, !0), $("#quickPaymentForm [name='amount']").val(sessionStorage.getItem("depositManual") || "0"), $("#quickPaymentForm [name='amount']").val("");
        var a = window.sessionStorage.getItem("username");
        control.submitQuickPayment(a), control.validateQuickPaymentInput()
    },
    quickPayment2: function() {
        control.form(), control.countUnreadMessage(), control.getWalletBalance(), control.getDepositPromotions(), control.switchQuickDepositTab(), control.selectDepositAmount("#quickPaymentForm [name='amount']"), control.incDecDepositAmount("#quickPaymentForm [data-changeAmount]", "#quickPaymentForm [name='amount']"), control.getDepositBankList("quickPayment2", "#quickPaymentForm [name='bankName']"), control.limitTwoDecimal("#quickPaymentForm [name='amount']"), control.generateSlider(0, [0, 1e3, 5e3, 1e4, 5e4], 0, 5e3, 1e3, $("#quickPaymentSlider"), $("#quickPaymentForm"), !1, 0, !1, "sliderAdjustment", null, !0), $("#quickPaymentForm [name='amount']").val(sessionStorage.getItem("depositManual") || "0"), $("#quickPaymentForm [name='amount']").val("");
        var a = window.sessionStorage.getItem("username");
        control.submitQuickPayment(a, !0), control.validateQuickPaymentInput()
    },
    switchQuickDepositTab: function() {
        $(document).off("click", "#switchQuickDepositTab li").on("click", "#switchQuickDepositTab li", function() {
            var a = $("#quickPaymentForm"),
                b = $(this).attr("data-targetId");
            $("#switchQuickDepositTab li").removeClass("active"), $(this).addClass("active"), $("#quickPaymentPostDeposit").addClass("hide"), $("#quickPaymentPostDepositFailed").addClass("hide"), $("#quickPaymentDeposit form").removeClass("hide"), a.find(".bank-ICBC").find("[name='bankName']").attr("checked", !1), a.find(".bank-ICBC").find(".bankRadioBtn").removeClass("selected-red"), a.find("[name='amount']").val(""), "manualAlipay" == b ? ($("#bankList li").removeClass("hide"), $("#bankList li.bank-ICBC").addClass("hide"), $("#quickPaymentDeposit .depositUsername").removeClass("hide")) : "crossBranchDeposit" == b ? ($("#bankList li").removeClass("hide"), $("#bankList li.bank-ICBC").addClass("hide"), $("#quickPaymentDeposit .depositUsername").addClass("hide"), $("#bankList li").eq(0).find("[name='bankName']").trigger("click"), $("#bankList li").eq(0).find(".bankRadioBtn").addClass("selected-red")) : ($("#bankList li").addClass("hide"), $("#bankList li.bank-ICBC").removeClass("hide"), $("#quickPaymentDeposit .depositUsername").addClass("hide"), a.find(".bank-ICBC").find("[name='bankName']").trigger("click"), a.find(".bank-ICBC").find(".bankRadioBtn").addClass("selected-red")), control.validateQuickPaymentForm()
        })
    },
    validateQuickPaymentInput: function() {
        $(document).off("keypress", "#quickPaymentForm [name='amount']").on("keypress", "#quickPaymentForm [name='amount']", function(a) {
            13 == a.keyCode && a.preventDefault()
        }), $(document).off("keyup", "#quickPaymentForm [name='amount']").on("keyup", "#quickPaymentForm [name='amount']", function() {
            var a = control.extractNumber(this.value);
            $(this).val(a), control.filterPromotions(a), control.validateQuickPaymentForm()
        }), $(document).off("keyup", "#quickPaymentForm [name='targetUsername']").on("keyup", "#quickPaymentForm [name='targetUsername']", function() {
            control.validateQuickPaymentForm()
        })
    },
    validateQuickPaymentForm: function() {
        var a = $("#switchQuickDepositTab li.active").attr("data-targetId"),
            b = $("#quickPaymentForm"),
            c = b.find("[name='amount']"),
            d = b.find("[name='bankName']:checked"),
            e = b.find("[name='targetUsername']");
        d[0] ? "manualAlipay" == a ? c.val() <= 0 || "" == c.val() || !regExPattern("amount", c.val()) || "" == e.val() ? b.removeClass("enable") : b.addClass("enable") : c.val() <= 0 || "" == c.val() || !regExPattern("amount", c.val()) ? b.removeClass("enable") : b.addClass("enable") : b.removeClass("enable")
    },
    submitQuickPayment: function(a, b) {
        var c = a.split("@")[1];
        $(document).off("click", "#quickPaymentForm .form-submit").on("click", "#quickPaymentForm .form-submit", function() {
            var a = $("#switchQuickDepositTab li.active").attr("data-targetId"),
                d = $("#quickPaymentForm"),
                e = d.find("[name='amount']"),
                f = d.find("[name='bankName']:checked"),
                g = (d.find(".form-reset"), d.find("[name='promotions']")),
                h = d.find("[name='targetUsername']"),
                i = d.find(".form-submit");
            if (b && (a = "manualAlipay"), "manualAlipay" == a && "" == h.val()) return void control.showTooltip(h, "quickPaymentForm_targetUsername");
            if ("" == e.val()) return void control.showTooltip(e, "quickPaymentForm_amount_required");
            if (!regExPattern("amount", e.val())) return void control.showTooltip(e, "quickPaymentForm_amount_invalid");
            if (!f[0]) return void control.showTooltip($(d.find("[name='bankName']")), "quickPaymentForm_bankName_required");
            if (void 0 == c || null == c) return void TCG.Alert("errors", TCG.Prop("No Account Name!"), "", function() {
                $("div.model_child_content #loading").remove()
            });
            if (!i.hasClass("processing")) {
                i.addClass("processing");
                var j = f.val();
                if ("manualAlipay" == a) var k = {
                        values: control.encode([c, e.val(), f.val(), h.val()])
                    },
                    l = "./depositMA";
                else var k = {
                        values: control.encode([c, e.val(), f.val()])
                    },
                    l = "./depositMT";
                TCG.Ajax({
                    url: l,
                    data: k
                }, function(b) {
                    if (b.status)
                        if ("0" != g.val()) {
                            var c = {
                                promotionId: g.val()
                            };
                            TCG.Ajax({
                                url: "./acceptPromotion",
                                data: c
                            }, function(a) {
                                0 != a.status && a.status || TCG.Alert("errors", a.description, "", function() {
                                    $("div.model_child_content #loading").remove()
                                }), d.removeClass("enable"), control.getWalletBalance(), control.viewPostDeposit(b.result, j), i.removeClass("processing"), $("div.model_child_content #loading").remove()
                            })
                        } else "manualDeposit" != a ? control.viewPostDeposit(b.result, j) : (control.viewPostDeposit(b.result, j), i.removeClass("processing")), $("div.model_child_content #loading").remove();
                    else {
                        var e, f = ["deposit amount must not be less than", "deposit amount must not be exceed"];
                        b.description.match(f[0]) ? (e = TCG.Prop(f[0]), f = b.description.split(f[0]), e += $.trim(f[1]), TCG.Alert("errors", e, "", function() {
                            $("div.model_child_content #loading").remove()
                        })) : b.description.match(f[1]) ? (e = TCG.Prop(f[1]), f = b.description.split(f[1]), e += $.trim(f[1]), TCG.Alert("errors", e, "", function() {
                            $("div.model_child_content #loading").remove()
                        })) : TCG.Alert("errors", TCG.Prop(b.description), "", function() {
                            $("div.model_child_content #loading").remove()
                        }), $("div.model_child_content #loading").remove(), i.removeClass("processing")
                    }
                    i.removeClass("processing"), $("div.model_child_content #loading").remove()
                })
            }
        })
    },
    checkMemberLabelLRM: function(a) {
        TCG.Ajax({
            url: "./memberinfo"
        }, function(b) {
            if (b.status) {
                for (var c = JSON.parse(b.result.memberLabel.replace(/\'/g, '"')), d = !1, e = 0; e < c.length; e++)
                    if ("LRM" == c[e].labelName) {
                        d = !0;
                        break
                    }
                a(d)
            } else TCG.Alert("errors", TCG.Prop(b.description))
        })
    },
    claimPromotion: function() {
        $(document).off("click", ".claim_promo").on("click", ".claim_promo", function() {
            var a = $(this).attr("data-promotion_id"),
                b = $(this).attr("data-reward_id"),
                c = {
                    promotionId: a,
                    rewardId: b
                };
            TCG.Ajax({
                url: "./acceptPromotion",
                data: c
            }, function(a) {
                0 != a.status && a.status ? (TCG.Alert("success", "活动领取成功"), $("#managePromotionsForm .form-submit").trigger("click")) : TCG.Alert("errors", TCG.Prop(a.description))
            })
        })
    },
    viewPostDeposit: function(a, b) {
        var c = $("#switchQuickDepositTab li.active").attr("data-targetId"),
            d = $("#quickPaymentForm"),
            e = $("#quickPaymentPostDeposit"),
            f = $("#copyBankName"),
            g = $("#copyBankBranch"),
            h = $("#copyAccountName"),
            i = $("#copyEmail"),
            j = $("#copyAmount"),
            k = $("#copyPostScript"),
            l = "";
        sessionStorage.setItem("depositManual", a.amount), d.addClass("hide"), "manualDeposit" == c || "crossBranchDeposit" == c ? $(".openBankUrl").parent().hide() : $(".openBankUrl").parent().show(), "0004" === b ? f.text("招商银行") : f.text("工商银行"), "" !== a.receiver_account ? l = a.receiver_account : "" !== a.email ? l = a.email : TCG.Confirm("无法获取银行卡号或邮箱，请联系客服", "", function(a) {
            if (!a) return void d.removeClass("hide");
            control.customerService()
        }), "0001" == b ? i.val(a.email) : i.val(l), e.removeClass("hide"), g.val(a.bank_branch), h.val(a.receiver_name), j.val(control.numberWithCommas(a.amount.toFixed(2))), k.val(a.remarks), sessionStorage.setItem("depositPage", "Manual"), control.copyClipboard(), $(document).off("click", ".openBankUrl").on("click", ".openBankUrl", function() {
            window.open("https://www.alipay.com/", "Bank", "_blank"), $("div.model_child_content #loading").remove()
        }), $(document).off("click", ".goBackToForm").on("click", ".goBackToForm", function() {
            var a = $("#quickPaymentForm"),
                b = a.find("[nam='amount']");
            a.find("[name='amount']").val(""), a.find("[name='targetUsername']").val(""), 1 * b.val() > 0 ? a.addClass("enable") : a.removeClass("enable"), e.addClass("hide"), d.removeClass("hide")
        })
    },
    viewPostDepositFailed: function(a) {
        $("#switchQuickDepositTab li.active").attr("data-rel");
        $("#quickPaymentForm").addClass("hide"), $("#quickPaymentPostDepositFailed").removeClass("hide"), $("#quickPaymentPostDepositFailed [name='customerService']").unbind("click").bind("click", function() {
            control.customerService()
        }), $("#quickPaymentPostDepositFailed [name='instruction']").unbind("click").bind("click", function() {
            TCG.Alert("Registered Users", $("#instruction_content").html(), "depoL"), $("#dialog_box_title").remove()
        })
    },
    alipay: function() {
        control.getDepositBankListByVendor("alipay"), control.alipayNav(), control.countUnreadMessage(), control.getWalletBalance(), control.validateAlipayForm(), control.generateSlider(0, [0, 500, 1e3, 2e3, 3e3], 0, 5e3, 1e3, $("#paymentSlider"), $("#aliPayForm"), !1, null, null, "sliderAdjustmentChanelPayment", null, !0, control.validateAlipayInput), control.getDepositPromotions();
        var a = null === sessionStorage.getItem("depositAlipay") || void 0 === sessionStorage.getItem("depositAlipay") ? "0" : sessionStorage.getItem("depositAlipay");
        $("#aliPayForm [name='amount']").val(sessionStorage.getItem(a)), control.validateAlipayInput(), $(document).off("click", "#aliPayForm .form-submit").on("click", "#aliPayForm .form-submit", function() {
            control.submitAliPay()
        }), $("#aliPayNotAvailable").remove(), $("#aliPay").removeClass("hide"), $("[name='promotions']").parent().parent().hide()
    },
    alipayNav: function() {
        var a, b, c = 0;
        $(document).off("click", "#alipayNav li").on("click", "#alipayNav li", function() {
            $("#alipayNav li").removeClass("active"), $(this).addClass("active"), c = $(this).index(), vendorId.alipay_index = $(this).index(), $("#alipayNav li").eq(c).find("[name='bankName']"), $("#aliPayForm").find("[name='amount']").val(""), vendorId.alipay_qr_enable = $(this).find("[name='bankName']").attr("data-qr_enable"), vendorId.alipay = $(this).attr("data-vendorId"), a = $(this).find("[name='bankName']").attr("data-minval"), b = $(this).find("[name='bankName']").attr("data-maxval"), $("#aliPayForm .min").html(a), $("#aliPayForm .max").html(b), $("#aliPayForm").find("[name='amount']").val("0"), $("#aliPayForm").removeClass("enable"), $("#aliPayForm .ui-slider-handle").css("left", "0%"), $("#aliPayForm .sliderLegend").find("li").removeClass("selected "), $("#aliPayForm .sliderLegend").find("li").eq(0).addClass("selected ")
        })
    },
    validateAlipayForm: function() {
        $(document).off("keyup", "#aliPayForm [name='amount']").on("keyup", "#aliPayForm [name='amount']", function() {
            var a = control.extractNumber(this.value);
            $(this).val(a), control.filterPromotions(a), control.validateAlipayInput()
        })
    },
    validateAlipayInput: function() {
        var a = $("#aliPayForm");
        1 * a.find("[name='amount']").val() > 0 ? a.addClass("enable") : a.removeClass("enable")
    },
    submitAliPay: function() {
        var a, b, c, d = vendorId.alipay_index,
            e = $("#aliPayForm"),
            f = e.find("[data-userinfo='username']")[0].innerHTML,
            g = e.find("input[name='amount']"),
            h = e.find("input[name='bankName']").eq(d),
            i = e.find("input[name='amount']").val(),
            j = e.find("[name='promotions']"),
            k = e.find(".form-submit"),
            c = parseFloat(i) + parseFloat((.4 * Math.random() + .1).toFixed(1));
        if (parseFloat(i) >= parseFloat(h.attr("data-maxval")) ? (c = parseFloat(h.attr("data-maxval")) - parseFloat((.4 * Math.random() + .1).toFixed(1)), a = {
                values: control.encode([f, c, "0501", "1"])
            }, e.find("input[name='postDepositAmt']").val(c)) : i % 100 < 1 ? (b = (parseFloat(i) + 1).toFixed(2), c = i.toString().indexOf(".") > -1 ? parseFloat(b) : parseFloat(b) + parseFloat((.4 * Math.random() + .1).toFixed(1)), a = {
                values: control.encode([f, c, "0501", "1"])
            }, e.find("input[name='postDepositAmt']").val(c)) : i % 1 != 0 ? (a = {
                values: control.encode([f, i, "0501", "1"])
            }, e.find("input[name='postDepositAmt']").val(i)) : (b = (parseFloat(i) + 1).toFixed(2), c = parseFloat(b) + parseFloat((.4 * Math.random() + .1).toFixed(1)), a = {
                values: control.encode([f, c, "0501", "1"])
            }, e.find("input[name='postDepositAmt']").val(c)), "" == g.val() || "0" == g.val()) return void control.showTooltip(g, "alipayForm_amount_invalid");
        if (0 == vendorId.alipay_qr_enable) globalVar.aliPayWindows = window.open("", "aliPayWindows", "_blank", "width=1024,height=768"), a = {
            values: control.encode([f, c, "0501", "0", vendorId.alipay])
        }, $("#aliPayForm [name='amount']").val(sessionStorage.getItem("depositAlipay") || "0"), TCG.Ajax({
            url: "./depositQR",
            data: a,
            type: "POST"
        }, function(a) {
            if (a.status)
                if (null !== a.result && "object" == typeof a.result) {
                    var b = a.result.redirect_url;
                    if ($("#postDepositAlipay .qr_logo").removeClass("tcg-loader"), "0" != j.val()) {
                        var c = {
                            promotionId: j.val()
                        };
                        TCG.Ajax({
                            url: "./acceptPromotion",
                            data: c
                        }, function(a) {
                            0 != a.status && a.status || TCG.Alert("errors", a.description), control.aliPayPostDeposit_Jump(e, b), k.removeClass("processing")
                        })
                    } else control.aliPayPostDeposit_Jump(e, b), k.removeClass("processing")
                } else TCG.Alert("errors", TCG.Prop("unknown.system.err"), "", function() {
                    $("#postDepositAlipay [name='backToForm']").trigger("click")
                });
            else {
                var d, f = ["deposit amount must not be less than", "deposit amount must not be exceed"];
                a.description.match(f[0]) ? (d = TCG.Prop(f[0]), f = a.description.split(f[0]), d += $.trim(f[1]), TCG.Alert("errors", d)) : a.description.match(f[1]) ? (d = TCG.Prop(f[1]), f = a.description.split(f[1]), d += $.trim(f[1]), TCG.Alert("errors", d)) : TCG.Alert("errors", TCG.Prop(a.description)), $("#aliPay").removeClass("hide"), $("#postDepositAlipay").addClass("hide"), null != globalVar.aliPayWindows && globalVar.aliPayWindows.close()
            }
            $("div.model_child_content #loading").remove()
        });
        else {
            $("#postDepositAlipay .defaultDepositNote").unbind("click").bind("click", function() {
                control.customerService()
            });
            $("#postDepositAlipay .thirdPartyDeposit").addClass("hide"),
                function() {
                    $("#aliPay").addClass("hide"), $("#postDepositAlipay").removeClass("hide"), $("#postDepositAlipay .qr_logo").addClass("tcg-loader").html(""), "" == j.val() ? $("#postDepositAlipay .postDepositPromo").text("不参加优惠活动") : $("#postDepositAlipay .postDepositPromo").text(j.find("option:selected").text()), $("#postDepositAlipay .customerService").addClass("hide"), $("#postDepositAlipay .defaultDepositNote").removeClass("hide"), $("#postDepositAlipay .failedDepositNote").addClass("hide"), $("#postDepositAlipay .postDepositBtn").addClass("hide"), $("#postDepositAlipay [name='backToForm']").unbind("click").bind("click", function() {
                        e.find(".form-reset").click(), $("#postDepositAlipay").addClass("hide"), $("#aliPay").removeClass("hide"), $("#aliPayForm [name='amount']").val(sessionStorage.getItem("depositAlipay") || "0"), control.filterPromotions(i), j.find("option[value='']").prop("selected", !0), j.trigger("chosen:updated")
                    }), $("#postDepositAlipay [name='confirmBtn']").unbind("click").bind("click", function() {
                        $(".model_child_menus li[data-submenu='conversionOfFunds']").click()
                    }), a = {
                        values: control.encode([f, c, "0501", "1", vendorId.alipay])
                    }, TCG.Ajax({
                        url: "./depositQR",
                        data: a,
                        type: "POST"
                    }, function(a) {
                        if (a.status)
                            if (null !== a.result && "object" == typeof a.result) {
                                var b = a.result.qr_img_url;
                                if ("TIMEOUT" == a.result.qr_error_code ? (void 0 == globalVar.qrCounter ? globalVar.qrCounter = 1 : globalVar.qrCounter += 1, globalVar.qrCounter = void 0, $("#postDepositAlipay .qr_logo").removeClass("tcg-loader"), $("#postDepositAlipay .defaultDepositNote").addClass("hide"), $("#postDepositAlipay .defaultDepositNote").unbind("click").bind("click", function() {
                                        control.customerService()
                                    }), $("#postDepositAlipay .failedDepositNote").removeClass("hide"), $("#postDepositAlipay .customerService").removeClass("hide"), $("#postDepositAlipay .customerService a").unbind("click").bind("click", function() {
                                        control.customerService()
                                    }), $("#postDepositAlipay .qr_logo").html("<span>获取二维码失败</span>"), $("#postDepositAlipay .postDepositBtn").addClass("hide"), $("#postDepositAlipay .thirdPartyDeposit").removeClass("hide"), $("#postDepositAlipay .thirdPartyDeposit").unbind("click").bind("click", function() {
                                        globalVar.aliPayWindows = window.open(a.result.redirect_url, "充值", "width=500,height=500")
                                    })) : "DECODE_FAIL" != a.result.qr_error_code && "NOT_SUPPORTED" != a.result.qr_error_code || ($("#postDepositAlipay .thirdPartyDeposit").removeClass("hide"), $("#postDepositAlipay .thirdPartyDeposit").unbind("click").bind("click", function() {
                                        globalVar.aliPayWindows = window.open(a.result.redirect_url, "充值", "width=500,height=500")
                                    }), b = null), $("#postDepositAlipay .qr_logo").removeClass("tcg-loader"), "0" != j.val()) {
                                    var c = {
                                        promotionId: j.val()
                                    };
                                    TCG.Ajax({
                                        url: "./acceptPromotion",
                                        data: c
                                    }, function(a) {
                                        0 != a.status && a.status || TCG.Alert("errors", a.description), control.aliPayPostDeposit(e, b), k.removeClass("processing")
                                    })
                                } else control.aliPayPostDeposit(e, b), k.removeClass("processing")
                            } else TCG.Alert("errors", TCG.Prop("unknown.system.err"), "", function() {
                                $("#postDepositAlipay [name='backToForm']").trigger("click")
                            });
                        else {
                            var d, f = ["deposit amount must not be less than", "deposit amount must not be exceed"];
                            a.description.match(f[0]) ? (d = TCG.Prop(f[0]), f = a.description.split(f[0]), d += $.trim(f[1]), TCG.Alert("errors", d)) : a.description.match(f[1]) ? (d = TCG.Prop(f[1]), f = a.description.split(f[1]), d += $.trim(f[1]), TCG.Alert("errors", d)) : TCG.Alert("errors", TCG.Prop(a.description)), $("#aliPay").removeClass("hide"), $("#postDepositAlipay").addClass("hide")
                        }
                        $("div.model_child_content #loading").remove()
                    })
                }()
        }
    },
    aliPayPostDeposit: function(a, b) {
        var c = a.find("[name='amount']"),
            d = a.find("[name='postDepositAmt']"),
            e = c.val();
        control.getWalletBalance(), control.getDepositPromotions(), c.val(e), sessionStorage.setItem("depositAlipay", d.val()), $("#postDepositAlipay .postDepositBtn").removeClass("hide"), null == b ? $("#postDepositAlipay .qr_logo").html("<span>获取二维码失败</span>") : $("#postDepositAlipay .qr_logo").html("<img src='" + b + "' />")
    },
    aliPayPostDeposit_Jump: function(a, b) {
        var c = a.find("[name='amount']"),
            d = a.find("[name='postDepositAmt']"),
            e = c.val();
        control.getWalletBalance(), control.getDepositPromotions(), c.val(e), sessionStorage.setItem("depositAlipay", d.val()), globalVar.aliPayWindows.location.href = b, $("#postDepositAlipay .postDepositBtn").removeClass("hide")
    },
    conversionOfFunds: function() {
        control.form(), control.countUnreadMessage(), control.incDecDepositAmount("#conversionOfFundsForm [data-changeAmount]", "#conversionOfFundsForm [name='amount']", 100), control.selectDepositAmount("#conversionOfFundsForm [name='amount']"), control.getWalletBalance(function(a) {
            UI.loadTransferWalletList(a.value.balances), control.getProportionOfFunds(a.value.balances), control.switchWallets()
        }), control.refreshTransferBalance(), control.submitTransferBalance(), control.limitTwoDecimal("#conversionOfFundsForm [name='amount']"), control.validateTransferBalanceInput()
    },
    refreshTransferBalance: function() {
        $(document).off("click", "#refreshTransferBalance").on("click", "#refreshTransferBalance", function() {
            control.getWalletBalance(function(a) {
                control.getProportionOfFunds(a.value.balances)
            })
        })
    },
    getProportionOfFunds: function(a) {
        for (var b, c, d, e, f, g = 0, h = 0; h < a.length; h++)
            if ("FROZEN_ACCOUNT" != a[h].accountName) {
                switch (a[h].accountName) {
                    case "PVP":
                        b = a[h].availBalance;
                        break;
                    case "SAFE_BOX":
                        d = a[h].availBalance;
                        break;
                    case "AG":
                        c = a[h].availBalance;
                        break;
                    case "LOTT":
                        e = a[h].availBalance;
                        break;
                    case "BBIN":
                        f = a[h].availBalance
                }
                g += a[h].availBalance
            }
        $("#percent_PVP").css({
            width: b / g * 100 + "%"
        }), $("#percent_SAFE_BOX").css({
            width: d / g * 100 + "%"
        }), $("#percent_AG").css({
            width: c / g * 100 + "%"
        }), $("#percent_LOTT").css({
            width: e / g * 100 + "%"
        }), $("#percent_BBIN").css({
            width: f / g * 100 + "%"
        })
    },
    selectTransferWallet: function() {
        var a = !1;
        $(document).off("change", "#conversionOfFundsForm .form-control.ctSelect").on("change", "#conversionOfFundsForm .form-control.ctSelect", function(b) {
            b.preventDefault();
            var c = $("#conversionOfFundsForm"),
                d = c.find("[name='transferFrom']"),
                e = c.find("[name='transferTo']");
            c.find("[name='amount']");
            if ("transferFrom" == $(this).attr("name") ? "" != d.val() && d.val() == e.val() && e.find("option[value='']").prop("selected", !0).trigger("chosen:updated") : "" != e.val() && e.val() == d.val() && d.find("option[value='']").prop("selected", !0).trigger("chosen:updated"), $(d).val()) {
                var f = parseFloat($(d).find("[value=" + $(d).val() + "]").attr("data-walletbalance"));
                control.generateSlider(0, [0, 100, 500, 5e3], 0, 5e3, 1e3, $("#channelPaymentSlider"), $("#conversionOfFundsForm"), !0, f, a, null, null, null, control.validateTransferBalanceForm), a = !0
            } else $("#channelPaymentSlider").html(""), $("#channelPaymentSlider").slider("destroy"), a = !1;
            control.validateTransferBalanceForm()
        })
    },
    getTransferFromBalance: function() {
        $(document).off("click", "#getTransferFromBalance").on("click", "#getTransferFromBalance", function() {
            var a = $("#conversionOfFundsForm [name='transferFrom']"),
                b = a.find("option[value='" + a.val() + "']").attr("data-walletBalance");
            $("#conversionOfFundsForm [name='amount']").val(b), control.validateTransferBalanceForm()
        })
    },
    validateTransferBalanceInput: function() {
        $(document).off("keyup", "#conversionOfFundsForm [name='amount']").on("keyup", "#conversionOfFundsForm [name='amount']", function() {
            var a = control.extractNumber(this.value);
            $(this).val(a), control.validateTransferBalanceForm()
        })
    },
    switchWallets: function() {
        $(document).off("click", "#reverseWallet").on("click", "#reverseWallet", function() {
            var a = $("[name='transferFrom']"),
                b = $("[name='transferTo']"),
                c = a.find("option:selected"),
                d = b.find("option:selected");
            a.find("option[data-walletAccountId='" + d.attr("data-walletAccountId") + "']").prop("selected", !0), b.find("option[data-walletAccountId='" + c.attr("data-walletAccountId") + "']").prop("selected", !0), a.trigger("chosen:updated"), b.trigger("chosen:updated")
        })
    },
    validateTransferBalanceForm: function() {
        var a = $("#conversionOfFundsForm"),
            b = a.find("[name='transferFrom']"),
            c = a.find("[name='transferTo']"),
            d = a.find("[name='amount']");
        "" != b.val() && "" != c.val() && "" != d.val() && regExPattern("amount", d.val()) && 0 != d.val() ? a.addClass("enable") : a.removeClass("enable")
    },
    submitTransferBalance: function() {
        $(document).off("click", "#conversionOfFundsForm .form-submit").on("click", "#conversionOfFundsForm .form-submit", function() {
            var a = $("#conversionOfFundsForm"),
                b = a.find("[name='transferFrom']"),
                c = a.find("[name='transferTo']"),
                d = a.find("[name='amount']"),
                e = a.find(".form-submit");
            if (b.val() == c.val()) return void TCG.Alert("errors", TCG.Prop("conversionOfFunds_same_wallet_invalid"), "", function() {
                $("div.model_child_content #loading").remove()
            });
            if (("306" == b.val() || "301" == b.val()) && d.val() % 1 != 0) return void control.showTooltip(b, "conversionOfFunds_AGBBINtransfer_decimals_invalid");
            if ("" == b.val()) return void control.showTooltip(b, "conversionOfFunds_transferFrom_required");
            if ("" == c.val()) return void control.showTooltip(c, "conversionOfFunds_transferTo_required");
            if (("306" == c.val() || "301" == c.val()) && d.val() % 1 != 0) return void control.showTooltip(c, "conversionOfFunds_AGBBINtransfer_decimals_invalid");
            if ("" == d.val()) return void control.showTooltip(d, "conversionOfFunds_amount_required");
            if (!regExPattern("amount", d.val())) return void control.showTooltip(d, "conversionOfFunds_amount_invalid");
            if (parseFloat($("option:selected", b).attr("data-walletBalance")) < parseFloat(d.val())) return void control.showTooltip(b, "conversionOfFunds_balance_insufficient");
            if (!e.hasClass("processing"))
                if (2 == c.val()) e.addClass("processing"), TCG.Ajax({
                    url: "./checkLockTransStatus",
                    data: {
                        accountTypeId: b.val()
                    }
                }, function(c) {
                    c.status ? 1 == c.result.status ? TCG.Ajax({
                        url: "./checkLockStatusByType",
                        data: {
                            accountTypeId: b.val()
                        }
                    }, function(a) {
                        var b = 0;
                        for (var c in a)
                            if (a.hasOwnProperty(c)) {
                                var d = a[c];
                                for (var f in d) d.hasOwnProperty(f) && "1" == d[f].lock_status && (b += parseFloat(d[f].current_to_required))
                            }
                        TCG.Alert("errors", "无法转账，流水还剩余  " + b, "警报"), e.removeClass("processing")
                    }) : control.transferWalletBalance("from_sub_to_main", a) : (TCG.Alert("errors", TCG.Prop(c.description)), e.removeClass("processing"))
                });
                else if (2 == b.val()) {
                e.addClass("processing");
                var f = c.find("option[value='" + c.val() + "']").attr("data-walletAccountId");
                TCG.Ajax({
                    url: "./checkLockStatus",
                    data: {
                        accountId: f
                    }
                }, function(b) {
                    if (b.status) switch (b.result.lock_status) {
                        case 0:
                        case "0":
                            control.transferWalletBalance("from_main_to_sub", a);
                            break;
                        case 1:
                        case "1":
                            TCG.Confirm("确定要把钱转移到钱包内？一旦转入必须完成红利才能转出。", "", function(b) {
                                b ? control.transferWalletBalance("from_main_to_sub", a) : ($("div.model_child_content #loading").remove(), e.removeClass("processing"))
                            });
                            break;
                        default:
                            $("div.model_child_content #loading").remove(), e.removeClass("processing")
                    } else TCG.Alert("errors", TCG.Prop(b.description)), e.removeClass("processing")
                })
            } else {
                var g = !0;
                TCG.Ajax({
                    url: "./checkLockStatusByType",
                    data: {
                        accountTypeId: b.val()
                    }
                }, function(c) {
                    var d = 0;
                    for (var f in c)
                        if (c.hasOwnProperty(f)) {
                            var h = c[f];
                            for (var i in h)
                                if (h.hasOwnProperty(i) && ("1" == h[i].lock_status && (d += parseFloat(h[i].current_to_required)), b.val() == i && "0" == h[i].lock_status)) {
                                    g = !1;
                                    break
                                }
                        }
                    g ? TCG.Alert("warning", "无法转账，流水还剩余  " + d + "警报", "", function() {
                        e.removeClass("processing")
                    }) : control.transferWalletBalance("from_sub_to_sub", a)
                })
            }
            $("div.model_child_content #loading").remove()
        })
    },
    transferWalletBalance: function(a, b) {
        var c, d = b.find("[name='transferFrom']"),
            e = b.find("[name='transferTo']"),
            f = b.find("[name='amount']"),
            g = b.find(".form-reset"),
            h = b.find(".form-submit"),
            i = {};
        switch (a) {
            case "from_main_to_sub":
                c = "./transferFromMainWallet", i = {
                    accountTypeId: e.val(),
                    amount: f.val()
                };
                break;
            case "from_sub_to_main":
                c = "./transferToMainWallet", i = {
                    accountTypeId: d.val(),
                    amount: f.val()
                };
                break;
            case "from_sub_to_sub":
                c = "./transferSubToSubWallet", i = {
                    fromAccountTypeId: d.val(),
                    toAccountTypeId: e.val(),
                    amount: f.val()
                };
                break;
            default:
                return void h.removeClass("processing")
        }
        TCG.Ajax({
            url: c,
            data: i
        }, function(a) {
            a.status ? (TCG.Alert("success", TCG.Prop("transfer_success")), g.click(), b.removeClass("enable"), control.resetCustomSelect(b), control.getWalletBalance(function(a) {
                UI.loadTransferWalletList(a.value.balances), control.getProportionOfFunds(a.value.balances)
            }), $('select[name="transferFrom"]').val($('select[name="transferFrom"] option:first').val()), $('select[name="transferTo"]').val($('select[name="transferTo"] option:first').val())) : TCG.Alert("errors", TCG.Prop(a.description)), $("div.model_child_content #loading").remove(), h.removeClass("processing")
        })
    },
    depositRecords: function() {
        control.countUnreadMessage(), control.customSelect("#depositRecordsForm select"), control.datepickerStartEnd($("#depositRecordsForm [name='startTime']"), $("#depositRecordsForm [name='endTime']"), new Date, !1, !1), control.searchDepositRecords(), control.switchDecimal(), $("#depositRecordsForm .form-submit").click()
    },
    searchDepositRecords: function() {
        $(document).off("click", "#depositRecordsForm .form-submit").on("click", "#depositRecordsForm .form-submit", function() {
            var a, b = $("#depositRecordsForm"),
                c = b.find(".form-submit"),
                d = b.find("[name='status']"),
                e = b.find("[name='method']"),
                f = b.find("[name='startTime']"),
                g = b.find("[name='endTime']"),
                h = b.find("[name='pageNo']"),
                i = ((new Date).getTime(), new Date(f.val()).getTime()),
                j = new Date(g.val()).getTime(),
                k = control.dayDifference(i, j),
                l = 10;
            if ("1" == h.val() ? a = 1 * h.val() - 1 : (l = 1 * h.val() * 10, a = l - 10), k > 7) return void TCG.Alert("errors", TCG.Prop("date_exceed_7_days"), "", function() {
                $("div.model_child_content #loading").remove()
            });
            if (!c.hasClass("processing")) {
                c.addClass("processing");
                var m = {
                    state: d.val(),
                    depositMode: e.val(),
                    startDate: f.val() + " 00:00:00",
                    endDate: g.val() + " 23:59:59",
                    start: a,
                    end: l
                };
                TCG.Ajax({
                    url: "./getDepositTransaction",
                    data: m
                }, function(a) {
                    if (a.status) {
                        UI.loadDepositRecords(a.result);
                        var b = Math.ceil(a.result.footer[0].totalCount / 10);
                        UI.loadPagination("depositRecordsForm", h.val(), b)
                    } else TCG.Alert("errors", TCG.Prop(a.description), "", function() {
                        $("div.model_child_content #loading").remove()
                    });
                    $("div.model_child_content #loading").remove(), c.removeClass("processing")
                })
            }
        })
    },
    withdrawalRequest: function() {
        control.form(), control.countUnreadMessage(), control.goToBindCard(), control.getWalletBalance(), control.getBankCards("withdrawalRequest"), control.limitTwoDecimal("#requestWithdrawForm [name='amount']");
        var a = new Date,
            b = a.getHours(),
            c = a.getMinutes();
        b >= 2 && b <= 8 || 9 == b && 0 == c ? TCG.Alert("errors", TCG.Prop("not_available_time")) : (control.selectBank(), control.submitWithdrawRequest(), control.validateWithdrawRequestInput()), setTimeout(function() {
            $("#requestWithdrawForm .form-reset").click(), $("#requestWithdrawForm").removeClass("hide")
        }, 500)
    },
    goToBindCard: function() {
        $(document).off("click", "#goToBindCard").on("click", "#goToBindCard", function() {
            $(".model_child_menus li[data-submenu='bindCard']").click()
        })
    },
    selectBank: function() {
        $(document).off("click", "#bankCardList.withdrawalRequest .banks").on("click", "#bankCardList.withdrawalRequest .banks", function() {
            var a = $(this),
                b = $("#bankCardList .banks");
            b.removeClass("no-slected"), b.removeClass("selected"), a.addClass("selected"), $("#bankInfo .bankCardHolder").text("持卡人: " + a.attr("data-bankCardHolder")), $("#bankInfo .bankProvince").text("省份： " + a.attr("data-bankProvince")), $("#bankInfo .bankName").text("开户银行： " + a.attr("data-bankName")), $("#bankInfo .bankCardNo").text("银行卡号： " + a.attr("data-bankCardNo")), control.submitWithdrawRequest(a.attr("data-bankId")), control.validateWithdrawRequestForm()
        })
    },
    validateWithdrawRequestInput: function() {
        $(document).off("keyup", "#requestWithdrawForm .form-control").on("keyup", "#requestWithdrawForm .form-control", function() {
            control.validateWithdrawRequestForm()
        })
    },
    validateWithdrawRequestForm: function() {
        var a = $("#requestWithdrawForm"),
            b = $("#bankCardList .banks.selected"),
            c = a.find("[name='amount']"),
            d = a.find("[name='withdrawalPass']");
        void 0 != b[0] && "" != c.val() && regExPattern("amount", c.val()) && "" != d.val() ? a.addClass("enable") : a.removeClass("enable")
    },
    submitWithdrawRequest: function(a) {
        var a = a || null;
        $(document).off("click", "#requestWithdrawForm .form-submit").on("click", "#requestWithdrawForm .form-submit", function() {
            var b = $("#requestWithdrawForm"),
                c = $("#bankCardList .banks"),
                d = b.find("[name='amount']"),
                e = b.find("[name='withdrawalPass']"),
                f = b.find(".form-reset"),
                g = b.find(".form-submit"),
                h = control.amountSetMinMax(d.val(), globalVar.minWithdraw, globalVar.maxWithdraw);
            if (null == a) return void control.showTooltip($("#bankCardList"), "requestWithdrawForm_bank_required");
            if ("" == d.val()) return void control.showTooltip(d, "requestWithdrawForm_amount_required");
            if (!regExPattern("amount", d.val())) return void control.showTooltip(d, "requestWithdrawForm_amount_invalid");
            if ("" == e.val()) return void control.showTooltip(e, "requestWithdrawForm_withdrawalPass_required");
            if (h) return void control.showTooltip(d, "requestWithdrawForm_amount_invalid");
            if (!g.hasClass("processing")) {
                g.addClass("processing");
                var i = {
                    values: control.encode([d.val(), a, e.val()])
                };
                TCG.Ajax({
                    url: "./withdrawApply",
                    data: i
                }, function(a) {
                    if (a.status) {
                        TCG.Alert("success", TCG.Prop(a.description)), f.click(), b.removeClass("enable"), $("#bankCardList .banks").removeClass("selected"), c.removeClass("selected").addClass("no-slected"), $("#bankInfo .bankCardHolder").html("&nbsp;"), $("#bankInfo .bankProvince").html("&nbsp;"), $("#bankInfo .bankName").html("&nbsp;"), $("#bankInfo .bankCardNo").html("&nbsp;"), control.getWalletBalance(), control.submitWithdrawRequest();
                        var d = $("#requestWithdrawForm .remainingWithdrawTimes").text() - 1;
                        $("#requestWithdrawForm .remainingWithdrawTimes").text(d)
                    } else TCG.Alert("errors", TCG.Prop(a.description));
                    $("div.model_child_content #loading").remove(), g.removeClass("processing")
                })
            }
        })
    },
    withdrawalRecords: function() {
        control.countUnreadMessage(), control.datepickerStartEnd($("#withdrawalForm [name='startTime']"), $("#withdrawalForm [name='endTime']"), new Date), control.customSelect("#withdrawalForm select"), control.switchDecimal(), control.getWithdrawalRecords(), $("#withdrawalForm .form-submit").click()
    },
    getWithdrawalRecords: function() {
        $(document).off("click", "#withdrawalForm .form-submit").on("click", "#withdrawalForm .form-submit", function() {
            var a, b = $("#withdrawalForm"),
                c = b.find(".form-submit"),
                d = b.find("[name='status']"),
                e = b.find("[name='startTime']"),
                f = b.find("[name='endTime']"),
                g = ((new Date).getTime(), new Date(e.val()).getTime()),
                h = new Date(f.val()).getTime(),
                i = control.dayDifference(g, h),
                j = b.find("[name='pageNo']"),
                k = 10;
            if ("1" == j.val() ? a = 1 * j.val() - 1 : (k = 1 * j.val() * 10, a = k - 10), data = {
                    status: d.val(),
                    startDate: e.val() + " 00:00:00",
                    endDate: f.val() + " 23:59:59",
                    start: a,
                    end: k
                }, i > 7) return void TCG.Alert("errors", TCG.Prop("date_exceed_7_days"), "", function() {
                $("div.model_child_content #loading").remove()
            });
            c.hasClass("processing") || (c.addClass("processing"), TCG.Ajax({
                url: "./getWithdrawTransaction",
                data: data
            }, function(a) {
                if (a.status) {
                    UI.loadWithdrawalRecords(a.result);
                    var b = Math.ceil(a.result.footer[0].totalCount / 10);
                    UI.loadPagination("withdrawalForm", j.val(), b)
                } else TCG.Alert("errors", TCG.Prop(a.description), "", function() {
                    $("div.model_child_content #loading").remove()
                });
                $("div.model_child_content #loading").remove(), c.removeClass("processing")
            }))
        })
    },
    bindCard: function() {
        control.getUserInfo(function(a) {
            if (a.status) {
                control.countUnreadMessage();
                var b = a.result;
                null !== b.email && $("#bindCardForm .form-group.mailbox").remove(), null !== b.payee && $("#bindCardForm .form-group.withdrawName [name='withdrawName']").val(control.maskData(b.payee, 1)).attr("readonly", "true").parent().addClass("dark"), TCG.Ajax({
                    url: "./hasWithdrawalPassword"
                }, function(a) {
                    a.status ? (1 == a.result && ($("#bindCardForm .form-group.withdrawPass").remove(), $("#bindCardForm .form-group.conWithdrawPass").remove()), control.getProvinceList(function(a) {
                        $("#bindCardForm [name='bankProvince']").html(a), control.customSelect("#bindCardForm select"), control.selectProvince("#bindCardForm [name='bankProvince']", "#bindCardForm [name='bankCity']")
                    })) : TCG.Alert("errors", TCG.Prop(a.description))
                }), control.getWithdrawBankList(), control.getBankCards("bindCard"), control.form(), control.addBankCard(b.payee), control.validateBindCardInput()
            } else window.location = "/"
        })
    },
    getWithdrawBankList: function() {
        TCG.Ajax({
            url: "./getWithdrawBankList"
        }, function(a) {
            a.status ? UI.loadWithdrawBankList(a.result.withdraw_banks) : TCG.Alert("errors", TCG.Prop(a.description))
        })
    },
    validateBindCardInput: function() {
        $(document).off("keyup", "#bindCardForm input.form-control").on("keyup", "#bindCardForm input.form-control", function() {
            control.validateBindCardForm()
        }), $(document).off("change", "#bindCardForm select.form-control").on("change", "#bindCardForm select.form-control", function() {
            control.validateBindCardForm()
        }), $(document).off("paste", "#bindCardForm [name='bankCardNo'], #bindCardForm [name='bankCardNoConfirm']").on("paste", "#bindCardForm [name='bankCardNo'], #bindCardForm [name='bankCardNoConfirm']", function() {
            return !1
        }), $(document).off("keypress", "#bindCardForm [name='bankCardNo'], #bindCardForm [name='bankCardNoConfirm']").on("keypress", "#bindCardForm [name='bankCardNo'], #bindCardForm [name='bankCardNoConfirm']", function(a) {
            if ([0, 8, 13, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57].indexOf(1 * a.which) < 0) return !1
        }), $(document).off("focus", "#bindCardForm [name='bankCardNo'], #bindCardForm [name='bankCardNoConfirm']").on("focus", "#bindCardForm [name='bankCardNo'], #bindCardForm [name='bankCardNoConfirm']", function(a) {
            var b = $(this);
            control.showTooltip(b, "bindCardForm_" + b.attr("name") + "_tooltip", "custom-tooltip", function() {
                $(document).off("focusout", "#bindCardForm [name='bankCardNo'], #bindCardForm [name='bankCardNoConfirm']").on("focusout", "#bindCardForm [name='bankCardNo'], #bindCardForm [name='bankCardNoConfirm']", function() {
                    $(".custom-tooltip").remove()
                })
            })
        })
    },
    validateBindCardForm: function() {
        var a = $("#bindCardForm"),
            b = a.find("[name='withdrawName']"),
            c = a.find("[name='bankName']"),
            d = c.find("option[value='" + c.val() + "']").attr("data-bankName"),
            e = a.find("[name='bankCardNo']"),
            f = a.find("[name='bankCardNoConfirm']"),
            g = a.find("[name='bankProvince']"),
            h = a.find("[name='bankCity']"),
            i = (a.find("[name='bankBranch']"), a.find("[name='mailbox']")),
            j = a.find("[name='withdrawPass']"),
            k = a.find("[name='conWithdrawPass']");
        void 0 == a.find(".form-submit").attr("disabled") && "" != c.val() && void 0 != d && "" != d && "" != e.val() && regExPattern("bankCardNumber", e.val()) && e.val() == f.val() && "" != g.val() && "" != h.val() && (void 0 != b.attr("readonly") || "" != b.val() && regExPattern("alphaOnly", b.val())) && (!i[0] || "" != i.val() && regExPattern("email", i.val())) && (!j[0] || "" != j.val() && regExPattern("password", j.val()) && "" != k.val() && k.val() == j.val()) ? a.addClass("enable") : a.removeClass("enable")
    },
    setBankCardLength: function(a) {
        globalVar.bankCardLengh = a, globalVar.bankCardLengh >= globalVar.BANK_CARD_MAX_LIMIT && ($("#bindCardForm .form-submit").prop("disabled", !0), $("#bindCardForm #cardLimitReminder").hide(), $("#bindCardForm #cardLimitMessage").show(), $(document).off("click", "#bindCardForm #cardLimitMessage span.blueText").on("click", "#bindCardForm #cardLimitMessage span.blueText", function() {
            control.customerService()
        }))
    },
    addBankCard: function(a) {
        var a = a;
        $(document).off("click", "#bindCardForm .form-submit").on("click", "#bindCardForm .form-submit", function() {
            var b = $("#bindCardForm"),
                c = b.find("[name='withdrawName']"),
                d = b.find("[name='bankName']"),
                e = d.find("option[value='" + d.val() + "']").attr("data-bankName"),
                f = b.find("[name='bankCardNo']"),
                g = b.find("[name='bankCardNoConfirm']"),
                h = b.find("[name='bankProvince']"),
                i = b.find("[name='bankCity']"),
                j = b.find("[name='bankBranch']"),
                k = b.find("[name='mailbox']"),
                l = b.find("[name='withdrawPass']"),
                m = b.find("[name='conWithdrawPass']"),
                n = b.find(".form-reset"),
                o = b.find(".form-submit");
            if ("" == d.val() || void 0 == e || "" == e) return void control.showTooltip(d, "bindCardForm_bankName_required");
            if (f.val() != g.val()) return void control.showTooltip(g, "bindCardForm_bankCardNoCon_incorrect");
            if ("" == f.val()) return void control.showTooltip(f, "bindCardForm_bankCardNo_required");
            if (!regExPattern("bankCardNumber", f.val())) return void control.showTooltip(f, "bindCardForm_bankCardNo_invalid");
            if ("" == h.val()) return void control.showTooltip(h, "bindCardForm_bankProvince_required");
            if ("" == i.val()) return void control.showTooltip(i, "bindCardForm_bankCity_required");
            if (null == a) {
                if ("" == c.val()) return void control.showTooltip(c, "bindCardForm_withdrawName_required");
                if (!regExPattern("alphaOnly", c.val())) return void control.showTooltip(c, "bindCardForm_payeeName_invalid");
                payeeNameVal = c.val()
            } else payeeNameVal = null;
            if (k[0]) {
                if ("" == k.val()) return void control.showTooltip(k, "bindCardForm_mailbox_required");
                if (!regExPattern("email", k.val())) return void control.showTooltip(k, "bindCardForm_mailbox_invalid");
                emailVal = k.val()
            } else emailVal = null;
            if (l[0]) {
                if ("" == l.val()) return void control.showTooltip(l, "bindCardForm_withdrawPass_required");
                if (!regExPattern("password", l.val())) return void control.showTooltip(l, "bindCardForm_withdrawPass_invalid");
                if (withdrawPassVal = l.val(), "" == m.val()) return void control.showTooltip(m, "bindCardForm_confirmWithdrawPass_required");
                if (m.val() != l.val()) return void control.showTooltip(m, "bindCardForm_confirmWithdrawPass_failed");
                conWithdrawPassVal = m.val()
            } else withdrawPassVal = null, conWithdrawPassVal = null;
            if (globalVar.bankCardLengh >= globalVar.BANK_CARD_MAX_LIMIT) $("#bindCardForm .form-submit").prop("disabled", !0);
            else if (!o.hasClass("processing")) {
                o.addClass("processing");
                var p = {
                    values: control.encode([d.val(), e, f.val(), h.val(), i.val(), j.val(), emailVal, payeeNameVal, withdrawPassVal, conWithdrawPassVal])
                };
                TCG.Ajax({
                    url: "./withdraw/addCard",
                    data: p
                }, function(d) {
                    d.status ? (n.click(), b.removeClass("enable"), i.html("<option value=''>市</option>"), control.resetCustomSelect(b), control.getBankCards("bindCard"), null != emailVal && b.find(".form-group.mailbox").remove(), null != withdrawPassVal && b.find(".form-group.withdrawPass").remove(), null != conWithdrawPassVal && b.find(".form-group.conWithdrawPass").remove(), null != payeeNameVal ? (c.val(control.maskData(payeeNameVal, 1)).parent().addClass("dark"), c.attr("readonly", "true"), control.addBankCard(payeeNameVal)) : (c.val(control.maskData(a, 1)), control.addBankCard(a)), TCG.Alert("success", TCG.Prop("bindCardForm_bind_Success"))) : TCG.Alert("errors", TCG.Prop(d.description)), $("div.model_child_content #loading").remove(), o.removeClass("processing")
                })
            }
        })
    },
    myProfile: function() {
        control.getUserInfo(function(a) {
            if (a.status) {
                control.countUnreadMessage();
                var b = $("#myProfileForm"),
                    c = a.result;
                c.payee && b.find("[name='payeeName']").parents(".form-input").addClass("readonly").html(c.payee), c.email && b.find("[name='email']").parents(".form-input").addClass("readonly").html(c.email), b.find("[name='nickname']").val(c.nickname), b.find("[name='mobileNo']").val(c.mobile), b.find("[name='qq']").val(c.qq), TCG.Ajax({
                    url: "./hasWithdrawalPassword"
                }, function(a) {
                    a.status ? (1 == a.result && (b.find("[name='withdrawPass']").parents(".form-input").addClass("readonly").html("********"), b.find("[name='conWithdrawPass']").parents(".form-input").addClass("readonly").html("********")), control.form(), control.checkNicknameAvailability(c.nickname), control.submitMyProfile(c.payee, c.email, a.result), control.validateMyProfileInput(), control.validateMyProfileForm()) : TCG.Alert("errors", TCG.Prop(a.description))
                })
            } else window.location = "/"
        })
    },
    checkNicknameAvailability: function(a) {
        var a = a;
        $(document).off("focusout", "#myProfileForm [name='nickname']").on("focusout", "#myProfileForm [name='nickname']", function() {
            var b = $(this).val();
            if ("" != b && (null == a || null != a && a != b)) {
                var c = {
                    merchantCode: globalVar.merchantCode,
                    nickname: b
                };
                TCG.Ajax({
                    url: "./checkNickname",
                    data: c
                }, function(a) {
                    a.status || TCG.Alert("errors", TCG.Prop(a.description))
                })
            }
        })
    },
    validateMyProfileInput: function() {
        $(document).off("keyup", "#myProfileForm .form-control").on("keyup", "#myProfileForm .form-control", function() {
            control.validateMyProfileForm()
        })
    },
    validateMyProfileForm: function() {
        var a = $("#myProfileForm"),
            b = a.find("[name='payeeName']"),
            c = a.find("[name='withdrawPass']"),
            d = a.find("[name='conWithdrawPass']"),
            e = a.find("[name='email']");
        a.find("[name='nickname']"), a.find("[name='mobileNo']"), a.find("[name='qq']");
        (void 0 == b[0] || "" != b.val() && regExPattern("alphaOnly", b.val())) && (void 0 == e[0] || "" != e.val() && regExPattern("email", e.val())) && (void 0 == c[0] || "" != c.val() && regExPattern("password", c.val()) && c.val() == d.val()) ? a.addClass("enable"): a.removeClass("enable")
    },
    submitMyProfile: function(a, b, c) {
        var d = {
            payeeName: a,
            email: b,
            hasWithdrawPass: c
        };
        $(document).off("click", "#myProfileForm .form-submit").on("click", "#myProfileForm .form-submit", function() {
            var a = $("#myProfileForm"),
                b = a.find("[name='payeeName']"),
                c = a.find("[name='withdrawPass']"),
                e = a.find("[name='conWithdrawPass']"),
                f = a.find("[name='email']"),
                g = a.find("[name='nickname']"),
                h = a.find("[name='mobileNo']"),
                i = a.find("[name='qq']");
            if ("" == g.val()) return void control.showTooltip(g, "submitMyProfile_nickname_required");
            if ("" != h.val() && !regExPattern("mobileNo", h.val())) return void control.showTooltip(h, "submitMyProfile_mobileno_required");
            if ("" != i.val() && !regExPattern("numberOnly", i.val())) return void control.showTooltip(i, "submitMyProfile_qqno_required");
            var j = {
                nickname: g.val(),
                mobile: h.val(),
                qq: i.val()
            };
            if (void 0 == d.payeeName) {
                if ("" == b.val()) return void control.showTooltip(b, "submitMyProfile_withdrawalName_required");
                if (!regExPattern("alphaOnly", b.val())) return void control.showTooltip(b, "submitMyProfile_withdrawalName_required");
                j.payeename = b.val()
            } else j.payeename = d.payeeName;
            if (void 0 == d.email) {
                if ("" == f.val()) return void control.showTooltip(f, "submitMyProfile_email_required");
                if (!regExPattern("email", f.val())) return void control.showTooltip(f, "submitMyProfile_email_required");
                j.mail = f.val()
            } else j.mail = d.email;
            if (1 == d.hasWithdrawPass) g.val() == sessionStorage.getItem("nickname") ? control.updateMyProfile(a, j) : TCG.Ajax({
                url: "./checkNickname",
                data: {
                    merchantCode: globalVar.merchantCode,
                    nickname: g.val()
                }
            }, function(b) {
                b.status ? control.updateMyProfile(a, j) : TCG.Alert("errors", TCG.Prop(b.description))
            });
            else {
                if ("" == c.val()) return void control.showTooltip(c, "submitMyProfile_password_required");
                if (!regExPattern("password", c.val())) return void control.showTooltip(c, "submitMyProfile_password_required");
                if (c.val() != e.val()) return void control.showTooltip(e, "submitMyProfile_fundPassword_required");
                var k = {
                    values: control.encode([c.val(), e.val(), 1])
                };
                g.val() == sessionStorage.getItem("nickname") || null == sessionStorage.getItem("nickname") || "null" == sessionStorage.getItem("nickname") ? control.updateMyProfile(a, j, k) : TCG.Ajax({
                    url: "./checkNickname",
                    data: {
                        merchantCode: globalVar.merchantCode,
                        nickname: g.val()
                    }
                }, function(b) {
                    b.status ? control.updateMyProfile(a, j, k) : TCG.Alert("errors", TCG.Prop(b.description))
                })
            }
        })
    },
    updateMyProfile: function(a, b, c) {
        var d = a.find(".form-submit");
        d.hasClass("processing") || (d.addClass("processing"), TCG.Ajax({
            url: "./updatememberinfo",
            data: b
        }, function(e) {
            e.status ? (c ? (control.setWithdrawPass(a, b, c), TCG.Alert("success", TCG.Prop("myProfileForm_pinfo_success"))) : (TCG.Alert("success", TCG.Prop("myProfileForm_pinfo_success")), d.removeClass("processing"), control.submitMyProfile(b.payeename, b.mail, 1)), control.checkNicknameAvailability(b.nickname), sessionStorage.setItem("nickname", b.nickname), a.find("[name='payeeName']")[0] && a.find("[name='payeeName']").parents(".form-input").addClass("readonly").html(b.payeename), a.find("[name='email']")[0] && a.find("[name='email']").parents(".form-input").addClass("readonly").html(b.mail)) : (TCG.Alert("errors", TCG.Prop(e.description)), d.removeClass("processing")), $("div.model_child_content #loading").remove()
        }))
    },
    setWithdrawPass: function(a, b, c) {
        var d = a.find(".form-submit");
        TCG.Ajax({
            url: "./setPaymentPassword",
            data: c
        }, function(c) {
            c.status ? (a.find("[name='withdrawPass']")[0] && a.find("[name='withdrawPass']").parents(".form-input").addClass("readonly").html("********"), a.find("[name='conWithdrawPass']")[0] && a.find("[name='conWithdrawPass']").parents(".form-input").addClass("readonly").html("********"), control.submitMyProfile(b.payeename, b.mail, 1)) : (TCG.Alert("errors", TCG.Prop(c.description)), control.submitMyProfile(b.payeename, b.mail, 0)), $("div.model_child_content #loading").remove(), d.removeClass("processing")
        })
    },
    bonusDetails: function() {
        control.countUnreadMessage(), control.clickBonusDetailsTab(), control.getCustomerSeries()
    },
    clickBonusDetailsTab: function() {
        $(document).off("click", "#bonusDetailsTabs .tab-btn").on("click", "#bonusDetailsTabs .tab-btn", function() {
            var a = $(this).attr("data-rel");
            $("#bonusDetailsTabs .tab-btn").removeClass("sel").addClass("unsel"), $(this).removeClass("unsel").addClass("sel"), $("#bonusDetailsTabs .tab-content").hide(), $("#" + a).show()
        }), $(document).off("click", "#lfTabs li").on("click", "#lfTabs li", function() {
            var a = $(this).attr("data-rel");
            $("#lfTabs li").removeClass("active"), $(this).addClass("active"), $("#tab-content4 .sub-content-2").hide(), $("#" + a).show()
        })
    },
    getCustomerSeries: function() {
        $.ajax({
            url: "./lgw/games/game_group_bonus",
            headers: globalVar.headers,
            dataType: "json",
            contentType: "application/json",
            cache: !1,
            complete: function(a, b, c) {
                var d = a.responseJSON;
                switch (a.status) {
                    case 200:
                        UI.loadCustomerSeries(d);
                        break;
                    case 500:
                        TCG.Alert("errors", TCG.Prop(d.errorCode))
                }
            }
        })
    },
    gameHistory: function() {
        control.form(), control.countUnreadMessage(), control.switchDecimal(), control.switchGameHistory(), control.showMoreFilter("gameHistory"), control.searchLottoGameHistory(), control.viewLottoGameHistoryItem(), control.datepickerStartEnd($("#lottoGameHistoryForm [name='startTime']"), $("#lottoGameHistoryForm [name='endTime']"), new Date, !0, !0), control.customSelect("#lottoGameHistoryForm [name='chaseNo']"), UI.loadQueryConditionList(globalVar.headers, function(a) {
            $("#lottoGameHistoryForm [name='game']").html(a.games), control.customSelect("#lottoGameHistoryForm [name='game']"), control.customSelect("#lottoGameHistoryForm [name='status']"), $("#lottoGameHistoryForm [name='pageNo']").val(1), $("#lottoGameHistoryForm .form-submit").click()
        }), UI.loadGameRooms("#pvpGameHistoryForm [name='gameRoom']", "PVP"), control.selectGameType("#pvpGameHistoryForm [name='gameType']", "#pvpGameHistoryForm [name='gameRoom']"), control.datepickerStartEnd($("#pvpGameHistoryForm [name='startTime']"), $("#pvpGameHistoryForm [name='endTime']"), new Date, !0, !0), control.customSelect("#pvpGameHistoryForm select");
        var a = window.sessionStorage.getItem("customerId");
        control.searchPvpGameHistory(a), control.searchBetHistory(), control.datepickerStartEnd($("#betHistoryForm [name='startTime']"), $("#betHistoryForm [name='endTime']"), new Date, !0, !0), control.customSelect("#betHistoryForm select")
    },
    switchGameHistory: function() {
        $(document).off("click", "#switchGameHistory li").on("click", "#switchGameHistory li", function() {
            var a = $(this).attr("data-rel");
            $(this).hasClass("active") || ("lotto" == a ? ($("#lottoGameHistoryForm").removeClass("hide"), $("#lottoGameHistoryTable").removeClass("hide"), $("#lottoGameHistoryTotal").removeClass("hide"), $("#pvpGameHistoryForm").addClass("hide"), $("#pvpGameHistoryTable").addClass("hide"), $("#pvpGameHistoryTotal").addClass("hide"), $("#betHistoryForm").addClass("hide"), $("#betHistoryTable").addClass("hide"), $("#betHistoryTotal").addClass("hide"), $("#lottoGameHistoryForm .form-submit").click()) : "pvp" == a ? ($("#lottoGameHistoryForm").addClass("hide"), $("#lottoGameHistoryTable").addClass("hide"), $("#lottoGameHistoryTotal").addClass("hide"), $("#pvpGameHistoryForm").removeClass("hide"), $("#pvpGameHistoryTable").removeClass("hide"), $("#pvpGameHistoryTotal").removeClass("hide"), $("#betHistoryForm").addClass("hide"), $("#betHistoryTable").addClass("hide"), $("#betHistoryTotal").addClass("hide"), $("#pvpGameHistoryForm .form-submit").click()) : ($("#lottoGameHistoryForm").addClass("hide"), $("#lottoGameHistoryTable").addClass("hide"), $("#lottoGameHistoryTotal").addClass("hide"), $("#pvpGameHistoryForm").addClass("hide"), $("#pvpGameHistoryTable").addClass("hide"), $("#pvpGameHistoryTotal").addClass("hide"), $("#betHistoryForm").removeClass("hide"), $("#betHistoryTable").removeClass("hide"), $("#betHistoryTotal").removeClass("hide"), $("#betHistoryForm .form-submit").click()), $("#switchGameHistory li.active").removeClass("active"), $(this).addClass("active"))
        })
    },
    searchLottoGameHistory: function() {
        $(document).off("click", "#lottoGameHistoryForm .form-submit").on("click", "#lottoGameHistoryForm .form-submit", function() {
            control.getLottoGameHistory()
        })
    },
    showMoreFilter: function(a) {
        switch (a) {
            case "gameHistory":
                $(document).off("click", "#lottoGameHistoryForm .tabBtn").on("click", "#lottoGameHistoryForm .tabBtn", function() {
                    var a = $("#lottoGameHistoryForm"),
                        b = a.find(".otherFilter"),
                        c = $("#tableContainer");
                    b.hasClass("hide") ? ($(this).addClass("active"), b.removeClass("hide"), c.addClass("mini"), $("#lottoGameHistoryList").addClass("y-overflow"), control.customSelect("#lottoGameHistoryForm [name='chaseStatus']")) : ($(this).removeClass("active"), b.addClass("hide"), c.removeClass("mini"), $("#lottoGameHistoryList").removeClass("y-overflow"))
                });
                break;
            case "norecordChase":
                $(document).off("click", "#norecordChaseForm .tabBtn").on("click", "#norecordChaseForm .tabBtn", function() {
                    var a = $("#norecordChaseForm"),
                        b = a.find(".otherFilter"),
                        c = $("#norecordChaseList");
                    b.hasClass("hide") ? ($(this).addClass("active"), b.removeClass("hide"), c.removeClass("collapse"), a.find(".prsnl-top-con").addClass("border-bot")) : ($(this).removeClass("active"), b.addClass("hide"), c.addClass("collapse"), a.find(".prsnl-top-con").removeClass("border-bot"))
                });
                break;
            case "memberManagement":
                $(document).off("click", "#memberManagementForm .tabBtn").on("click", "#memberManagementForm .tabBtn", function() {
                    var a = $("#memberManagementForm"),
                        b = a.find(".otherFilter"),
                        c = $(".memberManagement .onel-tbl-con");
                    b.hasClass("hide") ? ($(this).addClass("active"), b.removeClass("hide"), c.removeClass("collapse")) : ($(this).removeClass("active"), b.addClass("hide"), c.addClass("collapse"))
                });
                break;
            case "agentTeamBetting":
                $(document).off("click", "#lottoTeamBettingForm .tabBtn").on("click", "#lottoTeamBettingForm .tabBtn", function() {
                    var a = $("#lottoTeamBettingForm"),
                        b = a.find(".otherFilter"),
                        c = $("#teamBettingList");
                    b.hasClass("hide") ? ($(this).addClass("active"), b.removeClass("hide"), c.removeClass("collapse")) : ($(this).removeClass("active"), b.addClass("hide"), c.addClass("collapse"))
                })
        }
    },
    getLottoGameHistory: function() {
        var a = $("#lottoGameHistoryForm"),
            b = (a.find(".form-control"), a.find(".form-submit")),
            c = a.find("[name='startTime']"),
            d = a.find("[name='endTime']"),
            e = a.find("[name='status']"),
            f = a.find("[name='game']"),
            g = a.find("[name='order']"),
            h = a.find("[name='issue']"),
            i = a.find("[name='chaseStatus']"),
            j = a.find("[name='pageNo']"),
            k = g.val().split("-"),
            l = k[0] || "",
            m = "";
        if (!b.hasClass("processing")) {
            b.addClass("processing"), void 0 != k[1] && (m = isNaN(k[1]) ? k[1] : 1 * k[1]);
            var n = {
                startDate: Number(new Date(c.attr("complete-date").replace(/\-/g, "/"))),
                endDate: Number(new Date(d.attr("complete-date").replace(/\-/g, "/"))),
                orderStatus: e.val(),
                gameId: f.val(),
                orderNumber: l,
                chasingOrder: m,
                numero: h.val() ? h.val() : "",
                chasingStatus: i.val(),
                page: 1 * j.val() - 1,
                size: 9
            };
            n.startDate = n.startDate - 6e4 * (new Date).getTimezoneOffset() - 288e5, n.endDate = n.endDate - 6e4 * (new Date).getTimezoneOffset() - 288e5, control.customLoader({
                element: "#gameHistoryPage",
                method: "create"
            }), $.ajax({
                url: "./lgw/orders",
                headers: globalVar.headers,
                data: JSON.stringify(n),
                dataType: "json",
                contentType: "application/json",
                type: "POST",
                complete: function(a, c, d) {
                    var e = a.responseJSON;
                    switch (a.status) {
                        case 200:
                            UI.loadLottoGameHistory(e), UI.loadPagination("lottoGameHistory", j.val(), e.orders.totalPages, "#gameHistoryLottoPagination");
                            break;
                        case 500:
                            TCG.Alert("errors", TCG.Prop(e.errorCode))
                    }
                    $("div.model_child_content #loading").remove(), b.removeClass("processing")
                }
            })
        }
    },
    viewLottoGameHistoryItem: function() {
        $(document).off("click", "#lottoGameHistoryList .openItem").on("click", "#lottoGameHistoryList .openItem", function() {
            c || $("#chasing").addClass("hide"), $("#listWrapper").addClass("hide"), $("#itemWrapper").removeClass("hide");
            var a = $(this).attr("data-orderId"),
                b = $(this).attr("data-orderMasterId"),
                c = $(this).attr("data-chasing");
            control.getGameHistoryItem(a, b, c), sessionStorage.setItem("lastPage", "gameHistory")
        })
    },
    getGameHistoryItem: function(a, b, c) {
        b = isNaN(b) ? globalVar.orderMasterId : b, $.ajax({
            url: "./lgw/orders/detail/" + a,
            headers: globalVar.headers,
            dataType: "json",
            contentType: "application/json",
            success: function(d, e, f) {
                b = isNaN(b) ? d.result.content[0].orderMasterId : b, UI.loadLottoGameHistoryItem(d, a, b, c), control.cancelGameHistoryDetail(), $("#cancelOrderDetailId").val(a)
            }
        })
    },
    addCopySelection: function(a) {
        document.getElementById(a).removeAttribute("style", !0), $(document).off("click", "#" + a).on("click", "#" + a, function() {
            var a = $(this).html();
            try {
                $(this).css({
                    "background-color": "#004A88",
                    color: "#fff"
                }), window.clipboardData && window.clipboardData.setData ? window.clipboardData.setData("Text", a) : (document.execCommand("copy"), document.execCommand("copy", !1, a))
            } catch (a) {
                alert("Oops, unable to copy")
            }
        })
    },
    cancelGameHistoryDetail: function() {
        $(document).off("click", "#cancelGameHistoryDetail").on("click", "#cancelGameHistoryDetail", function() {
            TCG.Confirm(TCG.Prop("gameHistoryCancel"), "", function(a) {
                if (a) {
                    var b = $("#cancelOrderDetailId").val();
                    $.ajax({
                        url: "./lgw/orders/suborders/cancel",
                        headers: globalVar.headers,
                        data: "[" + b + "]",
                        type: "PUT",
                        dataType: "json",
                        contentType: "application/json",
                        complete: function(a, b, c) {
                            switch (a.status) {
                                case 500:
                                    TCG.Alert("errors", TCG.Prop(a.responseJSON.errorCode));
                                    break;
                                case 200:
                                    $("#cancelGameHistoryDetail").parent().hide(), $("#itemWrapper .orderStatus").text(TCG.Prop("orderStatus_8")), TCG.Alert("success", TCG.Prop("gameHistoryCancel_success"), null, function() {
                                        control.headerWalletList()
                                    })
                            }
                            $("div.model_child_content #loading").remove()
                        }
                    })
                }
            })
        })
    },
    goBackToGameHistory: function() {
        $(document).off("click", "#backToGameHistory").on("click", "#backToGameHistory", function() {
            var a = sessionStorage.getItem("lastPage"),
                b = sessionStorage.getItem("childMenu");
            switch (a) {
                case "teamBetting":
                    $("#itemWrapper").addClass("hide"), $("#teamBetting").removeClass("hide"), control.searchTeamBetting();
                    break;
                case "gameHistory":
                    $("#cancelGameHistoryDetail").parent().hide(), $("#itemWrapper [name='pageNo']").val("1"), $("#orderDetailPagination .pag-num").removeClass("active"), $("#orderDetailPagination [data-pageno='1']").parent().addClass("active"), $("#listWrapper").removeClass("hide"), $("#itemWrapper").addClass("hide"), control.getLottoGameHistory();
                    break;
                case "lottery":
                    "gameHistory" == b ? ($("#cancelGameHistoryDetail").parent().hide(), $("#itemWrapper [name='pageNo']").val("1"), $("#orderDetailPagination .pag-num").removeClass("active"), $("#orderDetailPagination [data-pageno='1']").parent().addClass("active"), $("#listWrapper").removeClass("hide"), $("#itemWrapper").addClass("hide"), control.getLottoGameHistory()) : ($("#listWrapper").removeClass("hide"), $("#itemWrapper").addClass("hide"), TCG.WinClose());
                    break;
                default:
                    $("#listWrapper").removeClass("hide"), $("#itemWrapper").addClass("hide"), control.getLottoGameHistory()
            }
            sessionStorage.removeItem("lastPage")
        })
    },
    searchPvpGameHistory: function(a) {
        var a = a;
        $(document).off("click", "#pvpGameHistoryForm .form-submit").on("click", "#pvpGameHistoryForm .form-submit", function() {
            control.getPvpGameHistory(a)
        })
    },
    getPvpGameHistory: function(a) {
        var b = $("#pvpGameHistoryForm"),
            c = b.find("[name='startTime']"),
            d = b.find("[name='endTime']"),
            e = b.find("[name='gameType']"),
            f = b.find("[name='gameRoom']"),
            g = b.find("[name='pageNo']"),
            h = b.find(".form-submit"),
            i = {
                customerId: a,
                startDate: c.attr("complete-date"),
                endDate: d.attr("complete-date"),
                gameType: e.val(),
                gameId: f.val(),
                pageNo: g.val(),
                pageSize: 10
            };
        h.hasClass("processing") || (h.addClass("processing"), TCG.Ajax({
            url: "./getAccountGameBetHistory",
            data: i
        }, function(a) {
            a.status ? (UI.loadPvpGameHistory(a.result, e.val()), UI.loadPagination("pvpGameHistory", a.result.page.currentPage, a.result.page.total, "#gameHistoryPvpPagination")) : TCG.Alert("errors", TCG.Prop(a.description)), $("div.model_child_content #loading").remove(), h.removeClass("processing")
        }))
    },
    searchBetHistory: function() {
        $(document).off("click", "#betHistoryForm .form-submit").on("click", "#betHistoryForm .form-submit", function() {
            control.getBetHistory()
        })
    },
    getBetHistory: function() {
        var a = $("#betHistoryForm"),
            b = a.find("[name='startTime']"),
            c = a.find("[name='endTime']"),
            d = a.find("[name='walletType']"),
            e = a.find("[name='pageNo']"),
            f = a.find(".form-submit"),
            g = {
                startTime: b.attr("complete-date"),
                endTime: c.attr("complete-date"),
                accountType: d.val(),
                pageNo: e.val(),
                pageSize: 9
            };
        f.hasClass("processing") || (f.addClass("processing"), TCG.Ajax({
            url: "./getBettingDetails",
            data: g
        }, function(a) {
            if (a.status) {
                UI.loadBetHistory(a.result);
                var b = a.result.page.pageSize,
                    c = Math.ceil(a.result.page.total / b);
                UI.loadPagination("betHistory", a.result.page.currentPage, c, "#gameHistoryLottoPagination")
            } else TCG.Alert("errors", TCG.Prop(a.description));
            $("div.model_child_content #loading").remove(), f.removeClass("processing")
        }))
    },
    norecordChase: function() {
        control.countUnreadMessage(), control.datepickerStartEnd($("#norecordChaseForm [name='startTime']"), $("#norecordChaseForm [name='endTime']"), new Date, !0, !0), control.switchDecimal(), control.searchNorecordChase(), control.selectNoRecordChase(), control.showMoreFilter("norecordChase"), UI.loadQueryConditionList(globalVar.headers, function(a) {
            $("#norecordChaseForm [name='game']").html(a.games), control.customSelect("#norecordChaseForm select"), $("#norecordChaseForm [name='pageNo']").val(1), $("#norecordChaseForm .form-submit").click()
        })
    },
    searchNorecordChase: function() {
        $(document).off("click", "#norecordChaseForm .form-submit").on("click", "#norecordChaseForm .form-submit", function() {
            var a = $("#norecordChaseForm"),
                b = a.find(".form-submit"),
                c = a.find("[name='status']"),
                d = a.find("[name='game']"),
                e = a.find("[name='startTime']"),
                f = a.find("[name='endTime']"),
                g = a.find("[name='order']"),
                h = a.find("[name='issue']"),
                i = (a.find("[name='chaseStatus']"), a.find("[name='pageNo']")),
                j = g.val().split("-"),
                k = j[0] || "",
                l = "";
            if (!b.hasClass("processing")) {
                b.addClass("processing"), void 0 != j[1] && (l = isNaN(j[1]) ? j[1] : 1 * j[1]);
                var m = {
                    startDate: Number(new Date(e.attr("complete-date").replace(/\-/g, "/"))),
                    endDate: Number(new Date(f.attr("complete-date").replace(/\-/g, "/"))),
                    orderStatus: c.val(),
                    gameId: d.val(),
                    orderNumber: k,
                    chasingOrder: l,
                    numero: h.val() ? h.val() : "",
                    chasingStatus: "1",
                    page: 1 * i.val() - 1,
                    size: 15
                };
                m.startDate = m.startDate - 6e4 * (new Date).getTimezoneOffset() - 288e5, m.endDate = m.endDate - 6e4 * (new Date).getTimezoneOffset() - 288e5, control.customLoader({
                    element: "#norecordChase",
                    method: "create"
                }), $.ajax({
                    url: "./lgw/orders",
                    headers: globalVar.headers,
                    data: JSON.stringify(m),
                    dataType: "json",
                    contentType: "application/json",
                    type: "POST",
                    complete: function(a, c, d) {
                        var e = a.responseJSON;
                        switch (a.status) {
                            case 200:
                                UI.loadNorecordChase(e), UI.loadPagination("norecordChase", i.val(), e.orders.totalPages);
                                break;
                            case 500:
                                TCG.Alert("errors", TCG.Prop(e.errorCode))
                        }
                        $("div.model_child_content #loading").remove(), b.removeClass("processing")
                    }
                })
            }
        })
    },
    viewNoRecordChaseItem: function() {
        $(document).off("click", "#itemWrapper .capsuleTab li").on("click", "#itemWrapper .capsuleTab li", function() {
            var a = $(this).attr("data-rel"),
                b = $("#itemWrapper").attr("data-orderId"),
                c = $("#itemWrapper").attr("data-orderMasterId"),
                d = $("#itemWrapper").attr("data-chasingOrder");
            $("#itemWrapper .capsuleTab li.active").removeClass("active"), $(this).addClass("active"), $("#itemWrapper .tab1Content").addClass("hide"), $("#itemWrapper .tab2Content").addClass("hide"), $("#itemWrapper ." + a).removeClass("hide"), "tab1Content" == a ? $("#itemWrapper .cancelNoRecordChaseItem").hide() : $("#itemWrapper .cancelNoRecordChaseItem").show(), control.getNoRecordChaseItem(c, b, d)
        })
    },
    selectNoRecordChase: function() {
        $(document).off("click", "#norecordChaseList .openItem").on("click", "#norecordChaseList .openItem", function() {
            var a = $(this).attr("data-orderMasterId"),
                b = $(this).attr("data-orderId"),
                c = $(this).attr("data-chasingOrder");
            $("#norecordChase").addClass("hide"), $("#itemWrapper").removeClass("hide").attr("data-orderId", b), $("#itemWrapper").removeClass("hide").attr("data-orderMasterId", a), $("#itemWrapper").removeClass("hide").attr("data-chasingOrder", c), control.viewNoRecordChaseItem(), control.backToNoRecordChase(), $("#itemWrapper .capsuleTab li[data-rel='tab1Content']").click()
        })
    },
    backToNoRecordChase: function() {
        $(document).off("click", "#backToNoRecordChase").on("click", "#backToNoRecordChase", function() {
            $("#norecordChaseList").html(""), $("#norecordChaseForm .form-submit").click(), $("#itemWrapper").addClass("hide"), $("#norecordChase").removeClass("hide")
        })
    },
    getNoRecordChaseItem: function(a, b, c) {
        $.ajax({
            url: "./lgw/orders/" + a,
            headers: globalVar.headers,
            dataType: "json",
            contentType: "application/json",
            complete: function(a, d, e) {
                var f = a.responseJSON;
                switch (a.status) {
                    case 200:
                        UI.loadNoRecordChaseItem(f, b, c), control.selectNoRecordChaseItem(), control.cancelNoRecordChaseItem(), control.addCopySelection("js-copybtn"), $("div.model_child_content #loading").remove();
                        break;
                    case 500:
                        TCG.Alert("errors", TCG.Prop(f.errorCode), "", function() {
                            $("div.model_child_content #loading").remove()
                        })
                }
            }
        })
    },
    selectNoRecordChaseItem: function(a) {
        var a = a || 0;
        $(document).off("click", "#orderDetailOrders [name='orderDetail']").on("click", "#orderDetailOrders [name='orderDetail']", function() {
            var b = $(this).attr("id").replace("check", "");
            if ($(this).is(":checked")) $("#orderDetailOrders [name='orderDetail']").each(function() {
                var a = $(this).attr("id").replace("check", "");
                parseInt(b) <= parseInt(a) && $(this).prop({
                    checked: !0
                })
            }), control.selectNoRecordChaseItem(b);
            else {
                if (a < b) return !1;
                $("#orderDetailOrders [name='orderDetail']").prop({
                    checked: !1
                }), control.selectNoRecordChaseItem()
            }
        })
    },
    cancelNoRecordChaseItem: function() {
        $(document).off("click", "#cancelNoRecordChaseItem").on("click", "#cancelNoRecordChaseItem", function() {
            var a = $("#orderDetailOrders [name='orderDetail']:checked");
            if (null !== a && a.length > 0) {
                var b = [];
                a.each(function() {
                    b.push($(this).val())
                }), $.ajax({
                    url: "./lgw/orders/suborders/cancel",
                    headers: globalVar.headers,
                    data: "[" + b.join(",") + "]",
                    type: "PUT",
                    dataType: "json",
                    contentType: "application/json",
                    complete: function(b, c, d) {
                        switch (b.status) {
                            case 500:
                                TCG.Alert("errors", TCG.Prop(b.responseJSON.errorCode), "", function() {
                                    $("div.model_child_content #loading").remove()
                                });
                                break;
                            case 200:
                                TCG.Alert("success", TCG.Prop("gameHistoryCancel_success"), null, function() {
                                    control.headerWalletList(), $("div.model_child_content #loading").remove()
                                }), a.each(function() {
                                    $(this).parents(".orderDetailsItem").find(".col-orderStatus").text("个人撤单"), $(this).parents(".orderDetailsItem").find(".col-checkbox").html("")
                                })
                        }
                    }
                })
            }
            $("div.model_child_content #loading").remove()
        })
    },
    changeAccount: function() {
        $("#changeAccountForm [name='pageNo']").val(1), control.form(), control.countUnreadMessage(), control.switchDecimal("#transactionDetailSwitchBtn"), control.datepickerStartEnd($("#changeAccountForm [name='startTime']"), $("#changeAccountForm [name='endTime']"), new Date), control.searchTransactionDetails(), control.getWalletList("#changeAccountForm [name='account']", function() {
            control.changeOptions("#changeAccountForm [name='account']", "#changeAccountForm [name='type']"), control.customSelect("#changeAccountForm [name='type']"), $("#changeAccountForm .form-submit").click()
        }), control.onChangeSelect("#changeAccountForm")
    },
    searchTransactionDetails: function() {
        $(document).off("click", "#changeAccountForm .form-submit").on("click", "#changeAccountForm .form-submit", function() {
            control.getTransactionDetails()
        })
    },
    dayDifference: function(a, b) {
        return Math.round((b - a) / 864e5)
    },
    getTransactionDetails: function() {
        "transaction" == sessionStorage.getItem("messageLink") && ($("[name='type']").val("4301"), $("[name='type']").trigger("chosen:updated"), sessionStorage.removeItem("messageLink"));
        var a = $("#changeAccountForm"),
            b = a.find("[name='account']"),
            c = a.find("[name='type']"),
            d = c.chosen().val(),
            e = a.find("[name='startTime']"),
            f = a.find("[name='endTime']"),
            g = a.find("[name='pageNo']"),
            h = "" == g.val() ? 1 : g.val(),
            i = a.find(".form-submit"),
            j = ((new Date).getTime(), new Date(e.val()).getTime()),
            k = new Date(f.val()).getTime();
        if (control.dayDifference(j, k) > 30) return void TCG.Alert("errors", TCG.Prop("date_exceed_30_days"), function() {
            $("div.model_child_content #loading").remove()
        });
        if (!i.hasClass("processing")) {
            i.addClass("processing");
            var l = {
                accountType: b.val(),
                transactionType: d,
                startTime: e.val() + " 00:00:00",
                endTime: f.val() + " 23:59:59",
                pageNo: h,
                pageSize: 15
            };
            control.customLoader({
                element: "#changeAccount",
                method: "create"
            }), TCG.Ajax({
                url: "./getTransactionDetails",
                data: l
            }, function(a) {
                if (a.status) {
                    var c = Math.ceil(a.result.page.total / a.result.page.pageSize);
                    UI.loadTransactionDetails(a.result, b.val()), UI.loadPagination("transactionDetails", g.val(), c)
                } else $("div.model_child_content #loading").remove(), TCG.Alert("errors", TCG.Prop(a.description));
                $("div.model_child_content #loading").remove(), i.removeClass("processing")
            })
        }
    },
    selectTransactionDetail: function() {
        $(document).off("click", "#changeAccountList .openItem").on("click", "#changeAccountList .openItem", function() {
            var a = $(this).attr("data-orderNo"),
                b = $(this).attr("data-numero");
            $("#changeAccount").addClass("hide"), $("#itemWrapper").removeClass("hide"), control.openTransactionDetail(a, b), control.backToTransactionDetails(), control.switchDecimal("#transactionDetailSwitchBtn")
        })
    },
    openTransactionDetail: function(a, b) {
        var c = {
            orderNo: a,
            numero: b
        };
        TCG.Ajax({
            url: "./lgw/orders/detail",
            data: c,
            headers: globalVar.headers
        }, function(a) {
            a ? $.ajax({
                url: "./lgw/orders/detail/" + a.orderDetailId + "/info",
                headers: globalVar.headers,
                dataType: "json",
                contentType: "application/json",
                success: function(b, c, d) {
                    UI.loadLottoGameHistoryItem(a, a.orderDetailId, a.orderMasterId, !1)
                }
            }) : TCG.Alert("errors", TCG.Prop(a.description))
        })
    },
    backToTransactionDetails: function() {
        $(document).off("click", "#backToTransactionDetails").on("click", "#backToTransactionDetails", function() {
            $("#changeAccount").removeClass("hide"), $("#itemWrapper").addClass("hide")
        })
    },
    palStatementsPersonal: function() {
        control.countUnreadMessage(), control.datepickerStartEnd($("#lottoPersonalPnlForm [name='startTime']"), $("#lottoPersonalPnlForm [name='endTime']"), new Date), control.datepickerStartEnd($("#pvpPersonalPnlForm [name='startTime']"), $("#pvpPersonalPnlForm [name='endTime']"), new Date), control.switchPersonalPnl(), control.switchDecimal(), $("#lottoPersonalPnlForm [name='pageNo']").val(1), $("#pvpPersonalPnlForm [name='pageNo']").val(1);
        var a = window.sessionStorage.getItem("customerId");
        control.searchLottoPersonalPnlStatements(a), control.searchPvpPersonalPnlStatements(a), $("#lottoPersonalPnlForm .form-submit").click()
    },
    switchPersonalPnl: function() {
        $(document).off("click", "#switchPersonalPnl li").on("click", "#switchPersonalPnl li", function() {
            var a = $(this).attr("data-rel");
            $(this).hasClass("active") || ("lotto" == a ? ($("#pvpPersonalPnlForm").addClass("hide"), $("#pvpPersonalPnlTable").addClass("hide"), $("#lottoPersonalPnlForm").removeClass("hide"), $("#lottoPersonalPnlTable").removeClass("hide"), $("#lottoPersonalPnlForm .form-submit").click()) : ($("#lottoPersonalPnlForm").addClass("hide"), $("#lottoPersonalPnlTable").addClass("hide"), $("#pvpPersonalPnlForm").removeClass("hide"), $("#pvpPersonalPnlTable").removeClass("hide"), $("#pvpPersonalPnlForm .form-submit").click(), control.onPvpPersonalPnlSelect()), $("#switchPersonalPnl li.active").removeClass("active"), $(this).addClass("active"))
        })
    },
    searchLottoPersonalPnlStatements: function(a) {
        var a = a;
        $(document).off("click", "#lottoPersonalPnlForm .form-submit").on("click", "#lottoPersonalPnlForm .form-submit", function() {
            var b = $("#lottoPersonalPnlForm"),
                c = b.find(".form-submit"),
                d = b.find("[name='startTime']"),
                e = b.find("[name='endTime']"),
                f = b.find("[name='pageNo']"),
                g = {
                    customerId: a,
                    startDate: d.val() + " 00:00:00",
                    endDate: e.val() + " 23:59:59",
                    pageNo: f.val(),
                    pageSize: 100
                },
                h = new Date(d.val()).getTime(),
                i = new Date(e.val()).getTime();
            if (control.dayDifference(h, i) > 30) return void TCG.Alert("errors", TCG.Prop("date_exceed_30_days"), "", function() {
                $("div.model_child_content #loading").remove()
            });
            c.hasClass("processing") || (c.addClass("processing"), control.customLoader({
                element: "#listWrapper",
                method: "create"
            }), TCG.Ajax({
                url: "./getDetailedLottoPNLReport",
                data: g
            }, function(a) {
                a.status ? UI.loadLottoPersonalPnlStatements(a.result) : ($("div.model_child_content #loading").remove(), TCG.Alert("errors", TCG.Prop(a.description))), $("div.model_child_content #loading").remove(), c.removeClass("processing")
            }))
        })
    },
    searchPvpPersonalPnlStatements: function(a) {
        var a = a;
        $(document).off("click", "#pvpPersonalPnlForm .form-submit").on("click", "#pvpPersonalPnlForm .form-submit", function() {
            var b = $("#pvpPersonalPnlForm"),
                c = b.find(".form-submit"),
                d = b.find("[name='startTime']"),
                e = b.find("[name='endTime']"),
                f = b.find("[name='status']");
            pageNo = b.find("[name='pageNo']"), f = null == f.val() ? f = "0" : f.val(), data = {
                customerId: a,
                startDate: d.val(),
                endDate: e.val(),
                pageNo: pageNo.val(),
                gameType: f,
                pageSize: 100
            }, c.hasClass("processing") || (c.addClass("processing"), TCG.Ajax({
                url: "./getPersonalPVPFishingPNLReport",
                data: data
            }, function(a) {
                a.status ? UI.loadPvpPersonalPnlStatements(a.result, f) : TCG.Alert("errors", TCG.Prop(a.description)), $("div.model_child_content #loading").remove(), c.removeClass("processing")
            }))
        })
    },
    onPvpPersonalPnlSelect: function() {
        control.pvpPersonalPnlOptions("#pvpPersonalPnlForm [name='status']"), control.customSelect("#pvpPersonalPnlForm [name='status']")
    },
    pvpPersonalPnlOptions: function(a) {
        var b = $(a),
            c = (b.find("option:selected").val(), "");
        c += '<option value="0" selected>棋牌</option>', c += '<option value="1" >捕鱼</option>', c += '<option value="2" >真人</option>', $(b).html(c), $(document).off("change", "#pvpPersonalPnlForm [name='status']").on("change", "#pvpPersonalPnlForm [name='status']", function() {
            var a = $("#pvpPersonalPnlForm"),
                b = a.find("[name='status']").val();
            $("#pvpPersonalPnlTable .loses").text(0 == b ? "净输" : "投注"), $("#pvpPersonalPnlTable .winnings").text(0 == b ? "净赢" : "中奖")
        })
    },
    changePassword: function() {
        control.form(), control.countUnreadMessage(), control.submitChangePassword(), control.validateChangePasswordInput()
    },
    validateChangePasswordInput: function() {
        $(document).off("keyup", "#changePasswordForm .form-control").on("keyup", "#changePasswordForm .form-control", function() {
            control.validateChangePasswordForm()
        })
    },
    validateChangePasswordForm: function() {
        var a = $("#changePasswordForm"),
            b = a.find("[name='oldPass']"),
            c = a.find("[name='newPass']"),
            d = a.find("[name='conNewPass']");
        "" != b.val() && "" != c.val() && regExPattern("password", c.val()) && "" != d.val() && c.val() == d.val() ? a.addClass("enable") : a.removeClass("enable")
    },
    submitChangePassword: function() {
        $(document).off("click", "#changePasswordForm .form-submit").on("click", "#changePasswordForm .form-submit", function() {
            var a = $("#changePasswordForm"),
                b = a.find("[name='oldPass']"),
                c = a.find("[name='newPass']"),
                d = a.find("[name='conNewPass']"),
                e = a.find(".form-reset"),
                f = a.find(".form-submit");
            if ("" == b.val()) return void control.showTooltip(b, "changePasswordForm_oldPass_required");
            if ("" == c.val()) return void control.showTooltip(c, "changePasswordForm_newPass_required");
            if (!regExPattern("password", c.val())) return void control.showTooltip(c, "changePasswordForm_newPass_invalid");
            if ("" == d.val()) return void control.showTooltip(d, "changePasswordForm_conNewPass_required");
            if (c.val() != d.val()) return void control.showTooltip(d, "changePasswordForm_conNewPass_notMatch");
            if (!f.hasClass("processing")) {
                var g = {
                    values: control.encode([b.val(), c.val(), d.val()])
                };
                f.addClass("processing"), TCG.Ajax({
                    url: "./modifyPassword",
                    data: g
                }, function(b) {
                    b.status ? (TCG.Alert("success", TCG.Prop("changePasswordForm_success")), e.click(), a.removeClass("enable")) : ($("div.model_child_content #loading").remove(), TCG.Alert("errors", TCG.Prop(b.description))), $("div.model_child_content #loading").remove(), f.removeClass("processing")
                })
            }
        })
    },
    modfndPassword: function() {
        control.countUnreadMessage(), TCG.Ajax({
            url: "./hasWithdrawalPassword"
        }, function(a) {
            a.status ? (1 == a.result && ($("#oldWithdrawPass .form-group").html("<input type='password' required='' name='oldPass' class='form-control ch-input' />"), $("#oldWithdrawPass").removeClass("hide")), control.form(), control.submitModfndPassword(), control.validateModfndPasswordInput()) : TCG.Alert("errors", TCG.Prop(a.description), "", function() {
                $("div.model_child_content #loading").remove()
            })
        })
    },
    validateModfndPasswordInput: function() {
        $(document).off("keyup", "#modfndPasswordForm .form-control").on("keyup", "#modfndPasswordForm .form-control", function() {
            control.validateModfndPasswordForm()
        })
    },
    validateModfndPasswordForm: function() {
        var a = $("#modfndPasswordForm"),
            b = a.find("[name='oldPass']"),
            c = a.find("[name='newPass']"),
            d = a.find("[name='conNewPass']");
        "" == c.val() || !regExPattern("password", c.val()) || "" == d.val() || c.val() != d.val() || void 0 != b[0] && "" == b.val() ? a.removeClass("enable") : a.addClass("enable")
    },
    submitModfndPassword: function() {
        $(document).off("click", "#modfndPasswordForm .form-submit").on("click", "#modfndPasswordForm .form-submit", function() {
            var a = $("#modfndPasswordForm"),
                b = a.find("[name='oldPass']"),
                c = a.find("[name='newPass']"),
                d = a.find("[name='conNewPass']"),
                e = a.find(".form-submit");
            if ("" == c.val()) return void control.showTooltip(c, "modfndPasswordForm_newPass_required");
            if (!regExPattern("password", c.val())) return void control.showTooltip(c, "modfndPasswordForm_newPass_invalid");
            if ("" == d.val()) return void control.showTooltip(d, "modfndPasswordForm_conNewPass_required");
            if (c.val() != d.val()) return void control.showTooltip(d, "modfndPasswordForm_conNewPass_notMatch");
            if (!e.hasClass("processing"))
                if (e.addClass("processing"), b[0]) {
                    if ("" == b.val()) return void control.showTooltip(b, "modfndPasswordForm_oldPass_required");
                    var f = {
                        values: control.encode([b.val(), c.val(), d.val()])
                    };
                    control.changeModfndPassword(a, f)
                } else {
                    var f = {
                        values: control.encode([c.val(), d.val(), 0])
                    };
                    control.setModfndPassword(a, f)
                }
        })
    },
    setModfndPassword: function(a, b) {
        var c = a.find(".form-reset"),
            d = a.find(".form-submit");
        TCG.Ajax({
            url: "./setPaymentPassword",
            data: b
        }, function(b) {
            b.status ? ($("div.model_child_content #loading").remove(), TCG.Alert("success", TCG.Prop(b.description)), c.click(), a.removeClass("enable"), $("#oldWithdrawPass .form-group").html("<input type='password' required='' name='oldPass' class='form-control ch-input' />"), $("#oldWithdrawPass").removeClass("hide")) : TCG.Alert("errors", TCG.Prop(b.description), "", function() {
                $("div.model_child_content #loading").remove()
            }), d.removeClass("processing")
        })
    },
    changeModfndPassword: function(a, b) {
        var c = a.find(".form-reset"),
            d = a.find(".form-submit");
        TCG.Ajax({
            url: "./changePaymentPassword",
            data: b
        }, function(b) {
            $("div.model_child_content #loading").remove(), b.status ? (TCG.Alert("success", TCG.Prop(b.description)), c.click(), a.removeClass("enable")) : TCG.Alert("errors", TCG.Prop(b.description)), $("div.model_child_content #loading").remove(), d.removeClass("processing")
        })
    },
    ssSettings: function() {
        control.form(), control.countUnreadMessage(), control.checkSecurityQuestions(), control.validateSecurityQuestionInput(), setTimeout(function() {
            $("#securityQuestionForm .form-reset").click(), $("#securityQuestionForm").removeClass("hide")
        }, 500)
    },
    checkSecurityQuestions: function() {
        TCG.Ajax({
            url: "./getCustomerSecurityQuestion"
        }, function(a) {
            a.status ? a.result.questions.length > 0 ? $("#securityQuestionForm .securityQ").html(a.result.questions[0]).removeClass("slect-box-custom-medium mem-icon") : control.getSecurityQuestions() : TCG.Alert("errors", TCG.Prop(a.description)), control.submitSecurityQuestionAnswer()
        })
    },
    getSecurityQuestions: function() {
        TCG.Ajax({
            url: "./getSecurityQuestions"
        }, function(a) {
            a.status ? UI.loadSecurityQuestions(a.result) : TCG.Alert("errors", TCG.Prop(a.description))
        })
    },
    validateSecurityQuestionInput: function() {
        $(document).off("keyup", "#securityQuestionForm input.form-control").on("keyup", "#securityQuestionForm input.form-control", function() {
            control.validateSecurityQuestionForm()
        }), $(document).off("change", "#securityQuestionForm select.form-control").on("change", "#securityQuestionForm select.form-control", function() {
            control.validateSecurityQuestionForm()
        })
    },
    validateSecurityQuestionForm: function() {
        var a = $("#securityQuestionForm"),
            b = a.find("[name='question']"),
            c = a.find("[name='answer']"),
            d = a.find("[name='withdrawalPass']");
        /[^A-Za-z0-9]/g.test(c.val()) ? c.attr("maxlength", "8") : c.attr("maxlength", "16"), "" == c.val() || "" == d.val() || void 0 != b[0] && "" == b.val() ? a.removeClass("enable") : a.addClass("enable")
    },
    submitSecurityQuestionAnswer: function() {
        $(document).off("click", "#securityQuestionForm .form-submit").on("click", "#securityQuestionForm .form-submit", function() {
            var a = $("#securityQuestionForm"),
                b = a.find("[name='question']"),
                c = a.find("[name='answer']"),
                d = a.find("[name='withdrawalPass']");
            if ("" == c.val()) return void control.showTooltip(c, "securityQuestionForm_answer.is.required");
            if ("" == d.val()) return void control.showTooltip(d, "securityQuestionForm_withdraw.password.is.required");
            var e = {
                answer: c.val(),
                withdrawPassword: d.val()
            };
            if (b[0]) {
                if ("" == b.val()) return void control.showTooltip(b, "securityQuestionForm_question.is.required");
                e.question = b.val(), control.setSecurityQuestionAnswer(a, e)
            } else e.question = $("#securityQuestionForm .securityQ").text(), control.resetSecurityQuestionAnswer(a, e)
        })
    },
    setSecurityQuestionAnswer: function(a, b) {
        var c = (a.find(".form-reset"), a.find(".form-submit"));
        c.hasClass("processing") || (c.addClass("processing"), TCG.Ajax({
            url: "./setupSecurityQuestion",
            data: b
        }, function(d) {
            d.status ? (TCG.Alert("success", TCG.Prop(d.description)), $("#securityQuestionForm .securityQ").html(b.question).removeClass("slect-box-custom-large mem-icon"), setTimeout(function() {
                a.find("[type='text']").val(""), a.find("[type='password']").val(""), a.removeClass("enable")
            }, 500)) : TCG.Alert("errors", TCG.Prop(d.description)), $("div.model_child_content #loading").remove(), c.removeClass("processing")
        }))
    },
    resetSecurityQuestionAnswer: function(a, b) {
        var c = (a.find(".form-reset"), a.find(".form-submit"));
        c.hasClass("processing") || (c.addClass("processing"), TCG.Ajax({
            url: "./resetSecurityQuestion",
            data: b
        }, function(b) {
            b.status ? (TCG.Alert("success", TCG.Prop(b.description)), control.getSecurityQuestions(), setTimeout(function() {
                a.find("[type='text']").val(""), a.find("[type='password']").val(""), a.removeClass("enable")
            }, 500)) : TCG.Alert("errors", TCG.Prop(b.description)), $("div.model_child_content #loading").remove(), c.removeClass("processing")
        }))
    },
    agentRegisterDownline: function() {
        control.loadGlobalRebates(function() {
            control.getUserSeries()
        }), control.customLoader({
            element: "#agentRegisterDownlineForm",
            method: "create"
        }), control.countUnreadMessage(), UI.loadGameSeries("#agentRegisterDownlineForm"), control.submitRegisterAgent(), control.onQuotaSwitch("#agentRegisterDownlineForm"), control.clickQuotaTab("#dira-regdline-quota-tabs"), control.onRegTypeSwitch("#agentRegisterDownlineForm")
    },
    getUserSeries: function() {
        var a = globalVar.series;
        control.checkUserSeries(a);
        var b = {};
        $(a).map(function() {
            switch (this.gameGroupCode + this.prizeModeId) {
                case "SSC1":
                    b.SSC1 = this;
                    break;
                case "SSC2":
                    b.SSC2 = this;
                    break;
                case "11X51":
                    b["11X5"] = this, b["11X51"] = this;
                    break;
                case "LF1":
                    b.FC3D = this, b.TCP3P5 = this, b.LF1 = this;
                    break;
                case "PK101":
                    b.PK101 = this
            }
        }), globalVar.customerSeries = b
    },
    checkUserSeries: function(a) {
        for (var b = !1, c = globalVar.globeRebate, d = 0; d < a.length; d++) {
            var e;
            switch (a[d].gameGroupCode) {
                case "SSC":
                    e = a[d].gameGroupCode + "_" + a[d].prizeModeId;
                    break;
                default:
                    e = a[d].gameGroupCode + "_1"
            }
            if ("SSC_1" == e)
                for (var f = 0; f < c.length; f++) "SSC_1" == c[f].gameType && a[d].maxSeries >= c[f].highestRebate && (b = !0);
            if (b) break
        }
        b ? UI.loadRebateQuota() : $("#qoutaWrapper").remove()
    },
    onQuotaSwitch: function(a) {
        $(document).off("change", a + " #rQuotaSwitch").on("change", a + " #rQuotaSwitch", function() {
            control.rQuotaSwitch(a, "#dira-regdline-quota-tabs", ".dira-regdline-gb-list")
        })
    },
    onRegTypeSwitch: function(a) {
        $(document).off("click", a + " .new-switch-con").on("click", a + " .new-switch-con", function() {
            var a = $(this).find(".selected");
            a.siblings().addClass("selected"), a.siblings().removeClass("hide"), a.removeClass("selected"), a.addClass("hide")
        })
    },
    rQuotaSwitch: function(a, b, c) {
        var d = $(b + " li input[type='radio'], " + b + " li label"),
            e = $(c + " li input[type='checkbox'], " + c + " li .quota-amount, " + c + " li .minus, " + c + " li .plus");
        $(a + " #rQuotaSwitch").is(":checked") ? (d.removeAttr("disabled"), d.removeClass("disabled"), e.attr("disabled", ""), $(".quota").slider("option", "disabled", !0), $(a + " #rQuotaSwitch").addClass("mg-check"), $("#gameSeries input[type='checkbox']").each(function() {
            $(this).addClass("mg-check").prop("checked", !0)
        }), $(".quota-amount[gameCode='SSC2']").removeAttr("disabled"), $(".quota-amount[gameCode='SSC2']").siblings("input").removeAttr("disabled"), $(".quota-amount[gameCode='SSC2']").siblings(".quota").slider("option", "disabled", !1)) : (d.attr("disabled", ""), d.addClass("disabled"), d.removeAttr("checked"), $(a + " .mg-radio-btn").removeClass("mg-radio-btn"), e.removeAttr("disabled"), $(".quota").slider("option", "disabled", !1), $("#gameSeries input[type=text]").each(function() {
            var a = $(this).attr("min");
            $(this).val(a), $(".quota").slider({
                value: a
            })
        }), $(a + " #rQuotaSwitch").removeClass("mg-check"), $(".quota-amount").each(function() {
            $(this).val($(this).attr("min")), $(this).siblings(".quota").slider("option", {
                value: $(this).attr("min"),
                max: $(this).attr("max")
            })
        }))
    },
    submitRegisterAgent: function() {
        $(document).off("click", "#agentRegisterDownlineForm .form-submit").on("click", "#agentRegisterDownlineForm .form-submit", function() {
            control.registerAgent()
        })
    },
    registerAgent: function() {
        var a = $("#agentRegisterDownlineForm"),
            b = a.find("input[name='dira-regdline-rquota']:checked").attr("quota-id"),
            c = a.find("input[name='lottery']:checked"),
            d = a.find("#dira-regdline-username").val(),
            e = a.find("#dira-regdline-password").val(),
            f = a.find(".new-switch-con div.selected").attr("data-val"),
            g = {
                merchantCode: globalVar.merchantCode,
                username: d
            };
        "" != d && /^[\w]{6,11}$/.test(d) ? "" == e || /^[\w]{6,11}$/.test(e) ? TCG.Ajax({
            url: "./checkUsername",
            data: g,
            type: "POST"
        }, function(a) {
            if (a.status)
                if (null != document.getElementById("rQuotaSwitch") && document.getElementById("rQuotaSwitch").checked)
                    if (void 0 == b) TCG.Alert("errors", "请选择配额", "", function() {
                        $("div.model_child_content #loading").remove()
                    });
                    else {
                        var h = [d, e, f, b],
                            i = "";
                        i += "<div style='text-align:left; margin-left:40px; color:#fff;'>", i += "注册类型: " + (1 == f ? "代理" : "会员") + "<br/>", i += "注册帐号: " + d + "<br/>", i += "登录密码: " + ("" != e ? e : "预设为123456") + "<br/>";
                        for (var j = i.replace(/^<div[^>]*>/g, ""), k = 0; k < c.length; k++) {
                            var l = c.eq(k).siblings("input.quota-amount").attr("gamecode"),
                                m = l.substr(l.length - 1);
                            h[k + 4] = c.eq(k).val() + "," + m + "," + c.eq(k).siblings("input.quota-amount").val(), i += c.eq(k).siblings("label").text().replace(":", "") + "奖金组: " + c.eq(k).siblings("input.quota-amount").val() + "<br/>"
                        }
                        i += "</div>", TCG.Confirm(i, "S", function(a) {
                            a ? (j = j.replace(/<br\/>/gi, "\n"), j += "平台网址: " + window.location.href, g = control.encode(h), TCG.Ajax({
                                url: "./agentSet/register?values=" + g
                            }, function(a) {
                                if (a.status) {
                                    TCG.Alert("success", TCG.Prop("register_downline_success"), "S", function() {
                                        $("div.model_child_content #loading").remove()
                                    }, "复制并关闭");
                                    control.copyClipboard($("#dialog_box_ok")).on("dataRequested", function(a, b) {
                                        a.setText(j), $("#dialog_box_ok").trigger("click")
                                    }), UI.loadRebateQuota()
                                } else TCG.Alert("errors", TCG.Prop(a.description), "S", function() {
                                    $("div.model_child_content #loading").remove()
                                })
                            })) : $("div.model_child_content #loading").remove()
                        })
                    }
            else {
                b = "";
                var h = [d, e, f, b],
                    i = "";
                i += "<div style='text-align:left; margin-left:40px; color:#fff;'>", i += "注册类型: " + (1 == f ? "代理" : "会员") + "<br/>", i += "注册帐号: " + d + "<br/>", i += "登录密码: " + ("" != e ? e : "预设为123456") + "<br/>";
                for (var j = i.replace(/^<div[^>]*>/g, ""), k = 0; k < c.length; k++) {
                    var l = c.eq(k).siblings("input.quota-amount").attr("gamecode"),
                        m = l.substr(l.length - 1);
                    h[k + 4] = c.eq(k).val() + "," + m + "," + c.eq(k).siblings("input.quota-amount").val(), i += c.eq(k).siblings("label").text().replace(":", "") + "奖金组: " + c.eq(k).siblings("input.quota-amount").val() + "<br/>"
                }
                i += "</div>", TCG.Confirm(i, "S", function(a) {
                    a ? (j = j.replace(/<br\/>/gi, "\n"), j += "平台网址: " + window.location.href, g = control.encode(h), TCG.Ajax({
                        url: "./agentSet/register?values=" + g
                    }, function(a) {
                        if (a.status) {
                            TCG.Alert("success", TCG.Prop("register_downline_success"), "S", function() {
                                $("div.model_child_content #loading").remove()
                            }, "复制并关闭");
                            control.copyClipboard($("#dialog_box_ok")).on("dataRequested", function(a, b) {
                                a.setText(j), $("#dialog_box_ok").trigger("click")
                            }), UI.loadRebateQuota()
                        } else TCG.Alert("errors", TCG.Prop(a.description), "S", function() {
                            $("div.model_child_content #loading").remove()
                        })
                    })) : $("div.model_child_content #loading").remove()
                })
            } else TCG.Alert("errors", TCG.Prop(a.description), "", function() {
                $("div.model_child_content #loading").remove()
            })
        }) : TCG.Alert("errors", TCG.Prop("format.pwd.err"), "", function() {
            $("div.model_child_content #loading").remove()
        }) : TCG.Alert("errors", TCG.Prop("format.username.err"), "", function() {
            $("div.model_child_content #loading").remove()
        })
    },
    agentGenerateAffiliateUrl: function() {
        control.customLoader({
            element: "#generateAffiliateUrlForm",
            method: "create"
        }), control.countUnreadMessage(), UI.loadGameSeries("#generateAffiliateUrlForm"), control.customSelect("#generateAffiliateUrlForm select"), control.chosePathType(), control.submitGenerateAffiliateUrl(), control.clickQuotaTab("#dira-genaffurl-quota-tabs"), control.onRegTypeSwitch("#generateAffiliateUrlForm")
    },
    chosePathType: function() {
        $(document).off("change", "#generateAffiliateUrlForm select[name='pathType']").on("change", "#generateAffiliateUrlForm select[name='pathType']", function() {
            var a = $(this).children("option:selected").val();
            0 == a || 1 == a ? ($("#generateAffiliateUrlForm input[name='dira-genaffurl-promotionpath']").val($(this).children("option:selected").text()),
                $("#generateAffiliateUrlForm input[name='dira-genaffurl-promotionpath']").attr("readonly", !0)) : 2 == a && ($("#generateAffiliateUrlForm input[name='dira-genaffurl-promotionpath']").val(""), $("#generateAffiliateUrlForm input[name='dira-genaffurl-promotionpath']").attr("placeholder", "--"), $("#generateAffiliateUrlForm input[name='dira-genaffurl-promotionpath']").attr("readonly", !1))
        }), $("#generateAffiliateUrlForm select[name='pathType']").trigger("change")
    },
    submitGenerateAffiliateUrl: function() {
        $(document).off("click", "#generateAffiliateUrlForm .form-submit").on("click", "#generateAffiliateUrlForm .form-submit", function() {
            control.doGenerateAffiliateUrl()
        })
    },
    doGenerateAffiliateUrl: function() {
        var a, b = $("#generateAffiliateUrlForm"),
            c = b.find(".form-submit"),
            d = b.find("select[name='interval'] option:selected").val(),
            e = b.find("input[name='lottery']:checked"),
            f = {
                type: b.find(".new-switch-con div.selected").attr("data-val"),
                startDate: control.formatDateFull(new Date, "yyyy-MM-dd"),
                pathType: b.find("select[name='pathType'] option:selected").val(),
                path: b.find("input[name='dira-genaffurl-promotionpath']").val(),
                qq: b.find("input[name='dira-genaffurl-promotionqq']").val(),
                gamesSeries: 0,
                configs: [e.length]
            };
        if (null == d || "" == d) return void TCG.Alert("errors", TCG.Prop("generateAffiliateUrlForm_interval_required"), "S", function() {
            $("div.model_child_content #loading").remove()
        });
        if ("unlimit" == d ? f.endDate = null : (a = new Date((new Date).getTime() + 864e5 * parseInt(d)), f.endDate = control.formatDateFull(a, "yyyy-MM-dd")), "" != f.qq && !regExPattern("qq", f.qq)) return void TCG.Alert("errors", TCG.Prop("generateAffiliateUrlForm_qq_required"), "S", function() {
            $("div.model_child_content #loading").remove()
        });
        if ("" == f.pathType) return globalVar.loading = !1, void TCG.Alert("errors", TCG.Prop("generateAffiliateUrlForm_path_type_required"), "S", function() {
            $("div.model_child_content #loading").remove()
        });
        if ("" == f.path || f.path.length > 14) return globalVar.loading = !1, void TCG.Alert("errors", TCG.Prop("generateAffiliateUrlForm_path_required"), "S", function() {
            $("div.model_child_content #loading").remove()
        });
        if (0 == e.length) return globalVar.loading = !1, void TCG.Alert("errors", TCG.Prop("generateAffiliateUrlForm_config_required"), "S", function() {
            $("div.model_child_content #loading").remove()
        });
        for (var g = 0; g < e.length; g++) {
            var h = e.eq(g).siblings("input.quota-amount").attr("gamecode"),
                i = h.substr(h.length - 1);
            f.configs[g] = {
                rebate: e.eq(g).siblings("input.quota-amount").val(),
                gameCode: e.eq(g).val(),
                prizeModeId: i
            }
        }
        c.hasClass("processing") || (c.addClass("processing"), TCG.Ajax({
            url: "xml/agentGenerateAffiliateUrlConfirm.xml",
            dataType: "html"
        }, function(a) {
            var b = $("<div></div>");
            b.append(a), b.find(".genurlType").text(TCG.Prop("generateAffiliateUrlForm_type" + f.type)), b.find(".genurlValidity").text($("select[name='interval'] option:selected").text()), b.find(".genurlProChannels").text(f.path);
            for (var d = 0; d < f.configs.length; d++) {
                var e = [];
                e.push('<dl class="dira-ga-urlcnfrm-gameItem">'), e.push('<dt class="dira-ga-urlcnfrm-gameName">' + TCG.Prop(f.configs[d].gameCode + "_" + f.configs[d].prizeModeId) + "</dt>"), e.push('<dd class="dira-ga-urlcnfrm-gameRebate">' + f.configs[d].rebate + "</dd>"), e.push("</dl>"), b.find(".dira-ga-urlcnfrm-games").append($(e.join("")))
            }
            TCG.Confirm(b.html(), "L", function(a) {
                a ? TCG.Ajax({
                    url: "agentSet/createAffiliateUrl",
                    data: JSON.stringify(f),
                    type: "POST",
                    contentType: "application/json"
                }, function(a) {
                    if (a.status) {
                        TCG.Confirm(TCG.Prop("generate_affiliate_url_success"), "XS", function(a) {
                            a || $("#popup_content div.model_child_menus li[data-submenu='linkManager']").trigger("click")
                        }, "复制并关闭", "到链接管理", "others");
                        var b = window.location.host.split("."),
                            d = "http://" + a.result + "." + b[b.length - 2] + "." + b[b.length - 1] + "/register.html";
                        control.copyClipboard($("#dialog_box_ok")).on("dataRequested", function(a, b) {
                            a.setText(d), $("#dialog_box_ok").trigger("click")
                        })
                    } else TCG.Alert("errors", TCG.Prop(a.description));
                    $("div.model_child_content #loading").remove(), c.removeClass("processing")
                }) : ($("div.model_child_content #loading").remove(), c.removeClass("processing"))
            })
        }))
    },
    sliderAmount: function(a, b, c, d, e, f, g) {
        var h, i = $(f),
            j = i.find("input[name='lottery']");
        h = !0 === g ? Math.floor(Math.random() * (c - b + 1)) + b : b;
        var k = {};
        $(globalVar.globeRebate).map(function() {
            switch (this.gameType) {
                case "SSC_1":
                    k.SSC1 = 1 * this.highestRebate;
                    break;
                case "SSC_2":
                    k.SSC2 = 1 * this.highestRebate;
                    break;
                case "11X5_1":
                    k["11X5"] = 1 * this.highestRebate;
                    break;
                case "LF_1":
                    k.FC3D = 1 * this.highestRebate, k.TCP3P5 = 1 * this.highestRebate;
                    break;
                case "PK10_1":
                    k.PK10 = 1 * this.highestRebate
            }
        }), j.eq(e).siblings(".quota-amount").val(h), j.eq(e).siblings(".quota-amount").attr("max", c), j.eq(e).siblings(".quota-amount").attr("min", b), j.eq(e).siblings(".plus").val(" "), j.eq(e).siblings(".minus").val(" "), j.eq(e).siblings(".quota").slider({
            value: h,
            orientation: "horizontal",
            range: "min",
            min: b,
            max: c,
            animate: !0,
            step: d,
            slide: function(a, b) {
                j.eq(e).siblings(".quota").siblings("input.quota-amount").val(b.value);
                var d = j.eq(e).siblings("input.quota-amount").attr("gameCode");
                b.value >= c || b.value >= k[d] ? (j.eq(e).siblings(".quota").removeClass("sa-blue"), j.eq(e).siblings(".quota").addClass("sa-red")) : (j.eq(e).siblings(".quota").removeClass("sa-red"), j.eq(e).siblings(".quota").addClass("sa-blue"))
            },
            change: function(a, b) {
                var d = j.eq(e).siblings("input.quota-amount").attr("gameCode");
                b.value >= c || b.value >= k[d] ? (j.eq(e).siblings(".quota").removeClass("sa-blue"), j.eq(e).siblings(".quota").addClass("sa-red")) : (j.eq(e).siblings(".quota").removeClass("sa-red"), j.eq(e).siblings(".quota").addClass("sa-blue"))
            }
        }), j.eq(e).siblings(".quota-amount").on("change", function() {
            var a = parseInt($(this).val());
            a > c ? ($(this).prevAll(".quota").slider({
                value: c
            }), $(this).val(c)) : a < b ? ($(this).prevAll(".quota").slider({
                value: b
            }), $(this).val(b)) : ($(this).prevAll(".quota").slider({
                value: a
            }), $(this).val(a)), isNaN(a) && $(this).val(b)
        }), j.eq(e).siblings(".plus").click(function() {
            var a = $(this).prevAll(".quota"),
                b = a.slider("value"),
                c = a.slider("option", "max");
            nextAmount = parseInt($(this).prevAll(".quota-amount").val()), d = a.slider("option", "step"), a.slider("value", b + d), nextAmount >= c ? $(this).prevAll(".quota-amount").val(b) : $(this).prevAll(".quota-amount").val(b + d)
        }), j.eq(e).siblings(".minus").click(function() {
            var a = $(this).prevAll(".quota"),
                b = a.slider("value"),
                c = a.slider("option", "min");
            nextAmount = parseInt($(this).prevAll(".quota-amount").val()), d = a.slider("option", "step"), a.slider("value", b - d), nextAmount <= c ? $(this).prevAll(".quota-amount").val(b) : $(this).prevAll(".quota-amount").val(b - d)
        })
    },
    channelPayment: function() {
        control.form(), control.getWalletBalance(), control.validateChannelPaymentForm(), control.getDepositBankListByVendor("wechat"), control.wechatNav(), control.generateSlider(0, [0, 500, 1e3, 2e3, 3e3], 0, 5e3, 1e3, $("#paymentSlider"), $("#channelPaymentForm"), !1, null, null, "sliderAdjustmentChanelPayment", null, !0, control.validateChannelPaymentInput), control.getDepositPromotions(), $("#channelPaymentForm [name='amount']").val(sessionStorage.getItem("depositQR") || "0"), control.validateChannelPaymentInput(), $(document).off("click", "#channelPaymentForm .form-submit").on("click", "#channelPaymentForm .form-submit", function() {
            control.submitChannelPayment($(this))
        }), $("#channelPaymentNotAvailable").remove(), $("#channelPayment").removeClass("hide"), control.filterPromotions($("input[name='amount']").val()), $("[name='promotions']").parent().parent().hide()
    },
    wechatNav: function() {
        var a, b, c = 0;
        $(document).off("click", "#wechatNav li").on("click", "#wechatNav li", function() {
            $("#wechatNav li").removeClass("active"), $(this).addClass("active"), c = $(this).index(), vendorId.wechat_index = $(this).index(), $("#wechatNav li").eq(c).find("[name='bankName']"), vendorId.wechat_qr_enable = $(this).find("[name='bankName']").attr("data-qr_enable"), vendorId.wechat = $(this).attr("data-vendorId"), a = $(this).find("[name='bankName']").attr("data-mindeposit"), b = $(this).find("[name='bankName']").attr("data-maxdeposit"), $("#channelPaymentForm .min").html(a), $("#channelPaymentForm .max").html(b), $("#channelPaymentForm").find("[name='amount']").val("0"), $("#channelPaymentForm").removeClass("enable"), $("#channelPaymentForm .ui-slider-handle").css("left", "0%"), $("#channelPaymentForm .sliderLegend").find("li").removeClass("selected "), $("#channelPaymentForm .sliderLegend").find("li").eq(0).addClass("selected ")
        })
    },
    validateChannelPaymentForm: function() {
        $(document).off("keyup", "#channelPaymentForm [name='amount']").on("keyup", "#channelPaymentForm [name='amount']", function() {
            var a = control.extractNumber(this.value);
            $(this).val(a), control.filterPromotions(a), control.validateChannelPaymentInput()
        })
    },
    validateChannelPaymentInput: function() {
        var a = $("#channelPaymentForm");
        1 * a.find("[name='amount']").val() > 0 ? a.addClass("enable") : a.removeClass("enable")
    },
    submitChannelPayment: function(a) {
        var b = $("#channelPaymentForm"),
            c = b.find("[data-userinfo='username']")[0].innerHTML,
            d = b.find("input[name='amount']").val(),
            e = b.find("[name='promotions']"),
            f = b.find("[name='amount']"),
            g = vendorId.wechat_index,
            h = $("#channelPaymentForm ").find("[name='bankName']").eq(g).attr("data-mindeposit"),
            i = $("#channelPaymentForm ").find("[name='bankName']").eq(g).attr("data-maxdeposit");
        if ("" == f.val() || "0" == f.val()) return void control.showTooltip(f, "alipayForm_amount_invalid");
        if (parseFloat(f.val()) < h) return void control.showTooltip(f, "alipayForm_amount_invalid");
        if (parseFloat(f.val()) > i) return void control.showTooltip(f, "alipayForm_amount_invalid");
        if (0 == vendorId.wechat_qr_enable) {
            var j = {
                values: control.encode([c, d, "0500", 0, vendorId.wechat])
            };
            globalVar.channelPaymentWindows = window.open("", "channelPaymentWindows", "_blank", "width=1024,height=768"), TCG.Ajax({
                url: "./depositQR",
                data: j,
                type: "POST"
            }, function(c) {
                if (c.status) {
                    var d = c.result.redirect_url;
                    if ("0" != e.val()) {
                        var f = {
                            promotionId: e.val()
                        };
                        TCG.Ajax({
                            url: "./acceptPromotion",
                            data: f
                        }, function(c) {
                            0 != c.status && c.status || TCG.Alert("errors", "活动领取失败"), control.channelPaymentPostDeposit_Jump(b, d), a.removeClass("processing")
                        })
                    } else control.channelPaymentPostDeposit_Jump(b, d), a.removeClass("processing");
                    $("div.model_child_content #loading").remove()
                } else {
                    var g, h = ["deposit amount must not be less than", "deposit amount must not be exceed"];
                    $("div.model_child_content #loading").remove(), c.description.match(h[0]) ? (g = TCG.Prop(h[0]), h = c.description.split(h[0]), g += $.trim(h[1]), TCG.Alert("errors", g)) : c.description.match(h[1]) ? (g = TCG.Prop(h[1]), h = c.description.split(h[1]), g += $.trim(h[1]), TCG.Alert("errors", g)) : TCG.Alert("errors", TCG.Prop(c.description)), $("#channelPayment").removeClass("hide"), $("#postDepositWeChat").addClass("hide"), a.removeClass("processing"), null != globalVar.channelPaymentWindows && globalVar.channelPaymentWindows.close()
                }
            })
        } else {
            $("#postDepositWeChat .thirdPartyDeposit").addClass("hide"),
                function() {
                    $("#channelPayment").addClass("hide"), $("#postDepositWeChat").removeClass("hide"), $("#postDepositWeChat .qr_logo").addClass("tcg-loader").html(""), $("#postDepositWeChat [name='postDepositAmt']").val(d), "" == e.val() ? $("#postDepositWeChat .postDepositPromo").text("不参加优惠活动") : $("#postDepositWeChat .postDepositPromo").text(e.find("option:selected").text()), $("#postDepositWeChat .customerService").addClass("hide"), $("#postDepositWeChat .defaultDepositNote").removeClass("hide"), $("#postDepositWeChat .defaultDepositNote").on("click", function() {
                        control.customerService()
                    }), $("#postDepositWeChat .failedDepositNote").addClass("hide"), $("#postDepositWeChat .postDepositBtn").addClass("hide"), $("#postDepositWeChat [name='backToForm']").unbind("click").bind("click", function() {
                        b.find(".form-reset").click(), $("#postDepositWeChat").addClass("hide"), $("#channelPayment").removeClass("hide"), $("#channelPaymentForm [name='amount']").val(sessionStorage.getItem("depositQR") || "0"), control.filterPromotions(d), e.find("option[value='']").prop("selected", !0), e.trigger("chosen:updated")
                    }), $("#postDepositWeChat [name='confirmBtn']").unbind("click").bind("click", function() {
                        $(".model_child_menus li[data-submenu='conversionOfFunds']").click()
                    });
                    var f = {
                        values: control.encode([c, d, "0500", 1, vendorId.wechat])
                    };
                    TCG.Ajax({
                        url: "./depositQR",
                        data: f,
                        type: "POST"
                    }, function(c) {
                        if (c.status) {
                            var d = c.result.qr_img_url;
                            if ("TIMEOUT" == c.result.qr_error_code ? (void 0 == globalVar.qrCounter ? globalVar.qrCounter = 1 : globalVar.qrCounter += 1, globalVar.qrCounter = void 0, $("#postDepositWeChat .qr_logo").removeClass("tcg-loader"), $("#postDepositWeChat .defaultDepositNote").addClass("hide"), $("#postDepositWeChat .failedDepositNote").removeClass("hide"), $("#postDepositWeChat .customerService").removeClass("hide"), $("#postDepositWeChat .customerService a").unbind("click").bind("click", function() {
                                    control.customerService()
                                }), $("#postDepositWeChat .qr_logo").html("<span>获取二维码失败</span>"), $("#postDepositWeChat .postDepositBtn").addClass("hide"), $("#postDepositWeChat .thirdPartyDeposit").removeClass("hide"), $("#postDepositWeChat .thirdPartyDeposit").unbind("click").bind("click", function() {
                                    globalVar.channelPaymentWindows = window.open(c.result.redirect_url, "充值", "width=500,height=500")
                                })) : "DECODE_FAIL" != c.result.qr_error_code && "NOT_SUPPORTED" != c.result.qr_error_code || ($("#postDepositWeChat .thirdPartyDeposit").removeClass("hide"), $("#postDepositWeChat .thirdPartyDeposit").unbind("click").bind("click", function() {
                                    globalVar.channelPaymentWindows = window.open(c.result.redirect_url, "充值", "width=500,height=500")
                                }), d = null), $("#postDepositWeChat .qr_logo").removeClass("tcg-loader"), "0" != e.val()) {
                                var f = {
                                    promotionId: e.val()
                                };
                                TCG.Ajax({
                                    url: "./acceptPromotion",
                                    data: f
                                }, function(c) {
                                    0 != c.status && c.status || TCG.Alert("errors", "活动领取失败"), control.channelPaymentPostDeposit(b, d), a.removeClass("processing")
                                })
                            } else control.channelPaymentPostDeposit(b, d), a.removeClass("processing");
                            $("div.model_child_content #loading").remove()
                        } else {
                            var g, h = ["deposit amount must not be less than", "deposit amount must not be exceed"];
                            $("div.model_child_content #loading").remove(), c.description.match(h[0]) ? (g = TCG.Prop(h[0]), h = c.description.split(h[0]), g += $.trim(h[1]), TCG.Alert("errors", g)) : c.description.match(h[1]) ? (g = TCG.Prop(h[1]), h = c.description.split(h[1]), g += $.trim(h[1]), TCG.Alert("errors", g)) : TCG.Alert("errors", TCG.Prop(c.description)), $("#channelPayment").removeClass("hide"), $("#postDepositWeChat").addClass("hide")
                        }
                    })
                }()
        }
    },
    channelPaymentPostDeposit: function(a, b) {
        var c = a.find("[name='amount']"),
            d = c.val();
        control.getWalletBalance(), control.getDepositPromotions(), c.val(d), sessionStorage.setItem("depositQR", d), $("#postDepositWeChat .postDepositBtn").removeClass("hide"), null == b ? $("#postDepositWeChat .qr_logo").html("<span>获取二维码失败</span>") : $("#postDepositWeChat .qr_logo").html("<img src='" + b + "' />")
    },
    channelPaymentPostDeposit_Jump: function(a, b) {
        var c = a.find("[name='amount']"),
            d = c.val();
        control.getWalletBalance(), control.getDepositPromotions(), c.val(d), sessionStorage.setItem("depositQR", d), globalVar.channelPaymentWindows.location.href = b, $("#postDepositWeChat .postDepositBtn").removeClass("hide")
    },
    generateSlider: function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
        var o = function(a) {
            $.each($(".sliderLegend li"), function(b, c) {
                var d = $(c).text();
                "全部" === d && a === i || d == a.toString() ? $(c).addClass("selected") : $(c).removeClass("selected")
            })
        };
        ! function() {
            var c = "",
                d = b.length;
            j && f.slider("destroy");
            for (var e = 0; e < d; e++) c += '<input class="ghostButton v-fix-btn' + e + '" data-value="' + b[e] + '" id="ghostButton' + b[e] + '" type="button">';
            c += '<div class="slider-personal-5 ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content" id="ghostSlider">', c += '<span class="ui-slider-handle ui-corner-all ui-state-default" style="left: 0%;" tabindex="0"></span>', c += "</div>", c += '<div class="slider-personal-5"></div>', c += '<ul class="sliderLegend v-fix-ul">';
            for (var e = 0; e < d; e++) {
                c += "<li " + (b[e] === a ? 'class="selected v-fix-li' + e + '"' : 'class="v-fix-li' + e + '"') + " >" + b[e] + "</li>"
            }
            c += h ? '<li class="v-fix-li' + d + '">全部</li>' : "", c += "</ul>", f.html(c)
        }(),
        function() {
            var c = f,
                d = h ? 1e3 * b.length : 1e3 * b.length - 1;
            $(function() {
                c.slider({
                    value: a,
                    min: 0,
                    max: d,
                    step: 1e3,
                    slide: function(a, c) {
                        var d, e = c.value / 1e3;
                        d = 0 === e ? e : h ? b[e] || i || 0 : b[e] || 0, g.find("input[name='amount']").val(d), m && control.filterPromotions(d), n && n(), o(d)
                    }
                }), g.find("input[name='amount']").val(a)
            })
        }(),
        function() {
            for (var a = 0; a < b.length; a++) $(document).off("click", "#ghostButton" + b[a]).on("click", "#ghostButton" + b[a], function() {
                var a = parseFloat($(this).attr("data-value")),
                    c = 1e3 * b.indexOf(a);
                f.slider({
                    value: c
                }), o(a), g.find("input[name='amount']").val(a), m && control.filterPromotions(a), n && n()
            })
        }()
    },
    sliderChannelPayment: function(a, b, c, d) {
        function e(a) {
            $.each($(".sliderLegend li"), function(b, c) {
                $(c).text() != a.toString() ? $(c).removeClass("selected") : $(c).addClass("selected")
            })
        }
        var f = $(d);
        try {
            document.getElementsByClassName("sliderLegend")[0]
        } catch (a) {
            document.querySelectorAll(".sliderLegend")[0]
        }
        $(function() {
            f.slider({
                value: a,
                min: b,
                max: c,
                step: 1e3,
                slide: function(a, b) {
                    0 == b.value ? (b.value = 500, e(500)) : 1e3 == b.value ? e(1e3) : 2e3 == b.value ? e(2e3) : 3e3 == b.value && e(3e3), $("#channelPaymentForm").find("input[name='amount']").val(b.value), control.filterPromotions(b.value)
                }
            }), control.filterPromotions(500), $("#channelPaymentForm").find("input[name='amount']").val(500)
        })
    },
    sliderChannelPaymentChange: function() {
        function a(a) {
            $.each($(".sliderLegend li"), function(b, c) {
                $(c).text() != a.toString() ? $(c).removeClass("selected") : $(c).addClass("selected")
            })
        }
        try {
            document.getElementsByClassName("sliderLegend")[0]
        } catch (a) {
            document.querySelectorAll(".sliderLegend")[0]
        }
        $(document).off("click", "#ghostButton500").on("click", "#ghostButton500", function() {
            $("#ghostSlider").slider({
                value: 0
            }), a(500), control.filterPromotions(500), $("#channelPaymentForm").find("input[name='amount']").val(500)
        }), $(document).off("click", "#ghostButton1000").on("click", "#ghostButton1000", function() {
            $("#ghostSlider").slider({
                value: 1e3
            }), a(1e3), control.filterPromotions(1e3), $("#channelPaymentForm").find("input[name='amount']").val(1e3)
        }), $(document).off("click", "#ghostButton2000").on("click", "#ghostButton2000", function() {
            $("#ghostSlider").slider({
                value: 2e3
            }), a(2e3), control.filterPromotions(2e3), $("#channelPaymentForm").find("input[name='amount']").val(2e3)
        }), $(document).off("click", "#ghostButton3000").on("click", "#ghostButton3000", function() {
            $("#ghostSlider").slider({
                value: 3e3
            }), a(3e3), control.filterPromotions(3e3), $("#channelPaymentForm").find("input[name='amount']").val(3e3)
        })
    },
    clickQuotaTab: function(a) {
        $(document).off("click", a + " [type='radio']").on("click", a + " [type='radio']", function() {
            var a = $(this).attr("quota-id"),
                b = ($(this).attr("data-rel"), this),
                c = null;
            $.each(globalVar.quotaObj, function(b, d) {
                d.quotaId == a && (c = d.quotaRebateConfig)
            }), $("#gameSeries input[type=text]").each(function() {
                for (var a = 0; a < c.length; a++) {
                    var b = c[a].type + c[a].prizeModeId;
                    if ($(this).attr("gameCode") == b) {
                        $(this).val(c[a].rebateValue);
                        var d = $("input[value='" + c[a].type + "']", $(this).parent());
                        $(d).is(":checked") || ($(d).is(":disabled") ? $(d).removeAttr("disabled").trigger("click").attr("disabled", "disabled") : $(d).trigger("click")), $(".quota").slider({
                            value: c[a].rebateValue
                        })
                    }
                }
            }), $(".quota-amount").each(function() {
                var a = 1 * $(this).val(),
                    b = $(this).attr("gameCode");
                a = a < globalVar.customerSeries[b].maxSeries ? a : globalVar.customerSeries[b].maxSeries, $(this).val(a), $(this).siblings(".quota").slider("option", {
                    value: a,
                    max: a
                })
            }), $("#rebateQuota input[type=radio]").each(function(a, c) {
                $(b).attr("quota-id") != $(c).attr("quota-id") ? $(c).removeClass("mg-radio-btn") : $(b).addClass("mg-radio-btn")
            })
        })
    },
    linkManager: function() {
        control.countUnreadMessage(), control.customSelect("#linkManagerForm select"), control.bindSearchAgentDownlines(), control.bindSearchGetRegisterdAffiliate(), control.bindDetailAffiliateUrls(), control.bindDeleteAffiliateUrls()
    },
    bindSearchAgentDownlines: function() {
        $(document).off("click", "#linkManagerForm .form-submit").on("click", "#linkManagerForm .form-submit", function() {
            $("#linkManagerForm [name='pageNo']").val(1), control.viewAffiliateUrls()
        }), $("#linkManagerForm .form-submit").trigger("click")
    },
    viewAffiliateUrls: function() {
        var a = $("#linkManagerForm"),
            b = a.find(".form-submit"),
            c = a.find("select[name='pathType'] option:selected").val(),
            d = a.find("select[name='type'] option:selected").val(),
            e = a.find("select[name='status'] option:selected").val(),
            f = a.find("input[name='pageNo']").val(),
            g = "";
        null != c && "" != c && (g += "pathType=" + c + "&"), null != d && "" != d && (g += "type=" + d + "&"), null != e && "" != e && (g += "status=" + e + "&"), g += "page=" + f + "&", g += "pageSize=10&", b.hasClass("processing") || (b.addClass("processing"), TCG.Ajax({
            url: "/agentSet/viewAffiliateUrls?" + g,
            type: "GET"
        }, function(c) {
            if (c.status) {
                var d = c.result.pageInfo;
                UI.loadAgentDownlines(c.result), a.find("#totalPlannedAmount").text(d.totalRecords), UI.loadPagination("linkManager", d.currentPage, Math.ceil(d.totalRecords / d.pageSize))
            } else TCG.Alert("errors", TCG.Prop(c.description), "S");
            $("div.model_child_content #loading").remove(), b.removeClass("processing")
        }))
    },
    bindSearchGetRegisterdAffiliate: function() {
        $(document).off("click", ".registerCount").on("click", ".registerCount", function() {
            var a = JSON.parse($(this).parents(".divTableRow").find(".entry").text());
            TCG.Ajax({
                url: "agentSet/registeredAffiliates?affiUrlId=" + a.id
            }, function(a) {
                a.status ? TCG.Ajax({
                    url: "xml/linkManagerEnrollmentPopup.xml",
                    dataType: "html"
                }, function(b) {
                    var c = [],
                        d = null,
                        e = $("<div></div>");
                    if (null == a.result) TCG.Alert("errors", TCG.Prop("lnkManager_noRegisteredUsers"));
                    else {
                        for (var f = 0; f < a.result.length; f++) d = a.result[f], c.push('<div class="dira-lm-enroll-trow clearfix">'), c.push('<div class="dira-lm-enroll-tcol">' + d.customerName + "</div>"), c.push('<div class="dira-lm-enroll-tcol">' + control.formatDateFull(d.registeredDate, "yyyy/MM/dd hh:mm") + "</div>"), c.push("</div>");
                        e.append(b), e.find(".dira-lm-enroll-tbody").append(c.join("")), TCG.Alert("Registered Users", e.html(), "L")
                    }
                }) : TCG.Alert("errors", TCG.Prop(a.description), "S")
            })
        })
    },
    bindDeleteAffiliateUrls: function() {
        $(document).off("click", ".affiliateUrlDelete").on("click", ".affiliateUrlDelete", function() {
            var a = JSON.parse($(this).parents(".divTableRow").find(".entry").text());
            TCG.Ajax({
                url: "/agentSet/deleteAffiliateUrl?affiUrlId=" + a.id
            }, function(a) {
                a.status ? control.viewAffiliateUrls() : TCG.Alert("errors", TCG.Prop(a.description), "S")
            })
        })
    },
    bindDetailAffiliateUrls: function() {
        $(document).off("click", ".affiliateUrlDetail").on("click", ".affiliateUrlDetail", function() {
            var a = JSON.parse($(this).parents(".divTableRow").find(".entry").text()),
                b = ["会员", "代理"],
                c = ["关闭", "正常", "过期"];
            TCG.Ajax({
                url: "xml/linkManagerAffiliateDetailPopup.xml",
                dataType: "html"
            }, function(d) {
                var e = $("<div></div>");
                e.append(d), e.find(".regLink").text(UI.generateAffiliateUrl(a.code).url), e.find(".regType").text(b[a.type]), e.find(".regStatus").text(c[a.status]);
                for (var f = 0; f < a.configs.length; f++) {
                    var g = [];
                    g.push('<dl class="dira-lm-affdtl-gameItem">'), g.push('<dt class="dira-lm-affdtl-gameName">' + TCG.Prop(a.configs[f].gameCode) + "</dt>"), g.push('<dd class="dira-lm-affdtl-gameRebate">' + a.configs[f].rebate + "</dd>"), g.push("</dl>"), e.find(".dira-lm-affdtl-games").append($(g.join("")))
                }
                TCG.Alert("Affiliate URL Detail", e.html(), "L")
            }, "关闭")
        })
    },
    memberManagement: function() {
        var a = window.sessionStorage.getItem("customerId");
        globalVar.cid = a, window.sessionStorage.setItem("resultObj", ""), control.countUnreadMessage(), control.datepickerStartEnd($("#memberManagementForm [name='startTime']"), $("#memberManagementForm [name='endTime']"), "2016-01-01"), control.customSelect("#memberManagementForm select"), control.switchDecimal(), control.dropdownMenu(), control.searchMemberManagement(), control.viewMemberAdditionalPage(), control.clickMemberManagementBreadcrumbs();
        var b = window.sessionStorage.getItem("username").split("@");
        $("#breadcrumbs .agentName").text(b[1]).attr({
            "data-customerId": a
        }), $("#memberManagementForm .form-submit").click(), control.showMoreFilter("memberManagement")
    },
    clickMemberManagementBreadcrumbs: function() {
        $(document).off("click", "#breadcrumbs .b-list").on("click", "#breadcrumbs .b-list", function() {
            var a = $(this).attr("data-customerId"),
                b = !1;
            $("#breadcrumbs .b-list").each(function() {
                b && $(this).remove(), $(this).attr("data-customerId") == a && (b = !0)
            }), control.getMemberManagement(!0, a)
        })
    },
    showDetail: function(a) {
        control.getMemberManagement(!0, a)
    },
    dropdownMenu: function() {
        $(document).off("click", "#rebateSetup").on("click", "#rebateSetup", function() {
            $("[data-switchDecimal]").each(function() {
                var a = 2 == $(this).attr("data-switchDecimal") ? 4 : 2,
                    b = $(this).attr("data-value");
                $(this).attr("data-switchDecimal", a), $(this).html(control.customCurrencyFormat(b, a))
            })
        })
    },
    searchMemberManagement: function() {
        $(document).off("click", "#memberManagementForm .form-submit").on("click", "#memberManagementForm .form-submit", function() {
            $("#breadcrumbs .b-list.new-entry").remove(), control.getMemberManagement(!0)
        })
    },
    getMemberManagement: function(a, b) {
        var c = $("#memberManagementForm"),
            d = (c.find(".form-control"), c.find(".form-submit")),
            e = c.find("[name='startTime']"),
            f = c.find("[name='endTime']"),
            g = c.find("[name='customerName']"),
            h = c.find("[name='downlineType']"),
            i = c.find("[name='userType']"),
            j = c.find("[name='pageNo']"),
            k = (c.find("[name='pageSize']"), {
                startRegDate: e.val(),
                endRegDate: f.val(),
                customerName: g.val(),
                userType: i.val(),
                downlineType: h.val(),
                pageNo: j.val() - 1,
                pageSize: 99
            });
        if (!d.hasClass("processing")) {
            d.addClass("processing");
            var l = k.pageNo + 1,
                m = !0;
            if (l % 12 != 0) {
                "" != sessionStorage.resultObj && null != sessionStorage.resultObj && (m = !1);
                var n = [],
                    o = m ? [] : jQuery.parseJSON(sessionStorage.resultObj);
                if (!a) {
                    for (var p = 0; p < o.length; p++) $.isArray(o[p]) && null != o[p] && o[p][0] == l && (n = o[p][1]);
                    if (0 != n.length) return control.loadPageList(l, 9), void d.removeClass("processing")
                }
            } else var o = jQuery.parseJSON(sessionStorage.resultObj);
            a || m || 9 * l > 99 ? (void 0 != b && (k.agentId = b, k.customerName = ""), $(".model_child_content").prepend('<div id="loading"></div>'), TCG.Ajax({
                url: "/agentSet/getAgentDownlines",
                data: k,
                type: "GET"
            }, function(b) {
                if (!b.status) return TCG.Alert("errors", TCG.Prop(b.description)), $("div.model_child_content #loading").remove(), d.removeClass("processing"), sessionStorage.setItem("resultObj", ""), void control.loadPageList(0, 0);
                if (null == b.result) {
                    var c = "";
                    return c += "<div class='tableContent-wrp'>", c += "<div class='noResult-data'>" + TCG.Prop("no_result") + "</div>", c += "</div>", $("#memberManagementList").html(c), $("div.model_child_content #loading").remove(), void d.removeClass("processing")
                }
                sessionStorage.teamBalance = b.result.teamBalance, sessionStorage.teamSize = b.result.pageInfo.total;
                var e, f = b.result.list,
                    g = [],
                    i = Math.ceil(11),
                    j = l % i;
                e = 0 == j ? l - (i - 1) : l - (j - 1), l % 12 != 0 && (o[0] = b.result.pageInfo);
                for (var m = 0; m < f.length; m++)
                    if (g.push(f[m]), 9 == g.length || f.length - 1 == m) {
                        var n = [e, g];
                        o[e] = n, e++, g = []
                    }
                sessionStorage.resultObj = JSON.stringify(o);
                var p = h.find("option[value='" + k.downlineType + "']").text();
                $("#totalTeamSizeLabel").text(p), a && (l = 1), control.loadPageList(l, 9), $("div.model_child_content #loading").remove(), d.removeClass("processing")
            })) : (control.loadPageList(l, 9), $("div.model_child_content #loading").remove(), d.removeClass("processing"))
        }
    },
    loadPageList: function(a, b) {
        for (var c, d = 0, e = "" == sessionStorage.resultObj ? [] : jQuery.parseJSON(sessionStorage.resultObj), f = null == e[0] ? "" : e[0], g = 0; g < e.length; g++) $.isArray(e[g]) && null != e[g] && e[g][0] == a && (c = e[g][1]);
        d = Math.ceil(f.total / b), TCG.Ajax({
            url: "./isTransferEnabled"
        }, function(a) {
            a.status ? UI.loadMemberManagement(c, a.result) : TCG.Alert("errors", TCG.Prop(a.description))
        }), UI.loadPagination("memberManagementForm", a, d)
    },
    viewMemberAdditionalPage: function() {
        $(document).off("click", "#showdetail").on("click", "#showdetail", function() {
            var a = $(this).closest(".divTableRow").find(".tbl-link").attr("data-downline"),
                b = $(this).text(),
                c = !1;
            if ($("#breadcrumbs .b-list").each(function() {
                    $(this).attr("data-customerId") == a && (c = !0)
                }), !c) {
                var d = "<div class='arrow-small-con mem-icon inline-block b-list new-entry' data-customerId='" + a + "'>" + b + "</div>";
                $("#breadcrumbs").append(d)
            }
            control.showDetail(a)
        }), $(document).off("click", ".setRebate").on("click", ".setRebate", function() {
            var a = JSON.parse($(this).parents(".divTableRow").find(".entry").text());
            $("#memberManagement").hide(), $("#rebateSetting").show();
            var b = $(this).closest(".divTableRow").find(".tbl-link").attr("data-downline");
            $("#rebateSetting #rQuotaSwitch").is(":checked") && $("#rebateSetting #rQuotaSwitch").trigger("change"), control.onQuotaSwitch("#rebateSetting"), control.clickQuotaTab("#dira-regdline-quota-tabs"), control.loadRebateSetting(b, a)
        }), $(document).off("click", ".bettingHistoryLink").on("click", ".bettingHistoryLink", function() {
            $("#memberManagement").hide(), $("#bettingHistory").show();
            var a = $(this).closest(".divTableRow").find(".tbl-link").attr("data-downline");
            control.agentGameHistory(a), UI.loadGameRooms("#agentPvpGameHistoryForm [name='gameRoom']", "PVP", "update"), control.selectGameType("#agentPvpGameHistoryForm [name='gameType']", "#agentPvpGameHistoryForm [name='gameRoom']")
        }), $(document).off("click", ".transferToDown").on("click", ".transferToDown", function() {
            var a = $("#showdetail").text();
            $("#memberManagement").hide(), $("#transferToDownline > div.member_ContentCh > div:nth-child(2) > div:nth-child(2)").text(a), $("#transferToDownline").show();
            var b = $(this).attr("data-downline");
            control.loadTransferDownline(b)
        }), $(document).off("click", ".setAgent").on("click", ".setAgent", function() {
            var a = $(this).closest(".divTableRow").find(".tbl-link").attr("data-downline");
            control.promoToAgent(a)
        }), $(document).off("click", ".sendMessage").on("click", ".sendMessage", function() {
            globalVar.messagePreSelectedRecipient = [{
                customerId: $(this).attr("data-customerId"),
                customerName: $(this).attr("data-customerName")
            }];
            var a = $(".model_main_menus .email_icon").attr("data-modal");
            $(".model_main_menus .email_icon").attr("data-modal", "message/writeMessage"), $(".model_main_menus .email_icon").trigger("click"), $(".model_main_menus .email_icon").attr("data-modal", a)
        })
    },
    loadRtnBtn: function() {
        $(document).off("click", ".return-btn").on("click", ".return-btn", function(a) {
            a.preventDefault(), $("#agentGameHistory").hide(), $("#transferToDownline").hide(), $("#rebateSetting").hide(), $("#bettingHistory").hide(), $("#agentGameHistoryForm").removeClass("hide"), $("#agentGameHistoryTable").removeClass("hide"), $("#agentGameHistoryTotal").removeClass("hide"), $("#agentPvpGameHistoryForm").addClass("hide"), $("#agentPvpGameHistoryTable").addClass("hide"), $("#agentPvpGameHistoryTotal").addClass("hide"), $("#switchAgentGameHistory li.active").removeClass("active"), $("#switchAgentGameHistory li[data-rel='lotto']").addClass("active"), $("#rebateSetting #rQuotaSwitch").is(":checked") && $("#rebateSetting #rQuotaSwitch").trigger("click"), $("#memberManagement").show()
        })
    },
    loadTransferDownline: function(a) {
        control.customSelect("#remarks"), control.loadRtnBtn(), control.getWalletBalance(), control.loadTransferSumbit(a), control.validateTransferToDownlineInput()
    },
    promoToAgent: function(a) {
        var b = {
            customerId: a
        };
        TCG.Ajax({
            url: "./agentSet/promoteDownline",
            data: b,
            type: "POST"
        }, function(a) {
            a.status ? TCG.Alert("success", "设定成功") : TCG.Alert("errors", TCG.Prop(a.description))
        })
    },
    loadTransferSumbit: function(a) {
        $(document).off("click", "#transferToDownlineForm .form-submit").on("click", "#transferToDownlineForm .form-submit", function() {
            control.submitTransferToDown(a)
        }), $(document).off("keyup", "#transferToDownline [name='transferAmt']").on("keyup", "#transferToDownline [name='transferAmt']", function() {
            $(".bl-data-hover").html($("[name='transferAmt']").val())
        })
    },
    validateTransferToDownlineInput: function() {
        $(document).off("keyup", "#transferToDownlineForm .form-control").on("keyup", "#transferToDownlineForm .form-control", function() {
            control.validateTransferToDownlineForm()
        })
    },
    validateTransferToDownlineForm: function() {
        $("#transferToDownlineForm")[0].childNodes[3].childNodes[5].childNodes[3].removeAttribute("name");
        var a = $("#transferToDownlineForm"),
            b = a.find("[name='transferAmt']");
        if ("" == a.find("[name='paymentpwd']").val() || "" == b.val()) a.removeClass("enable");
        else if (regExPattern("amount", b.val())) {
            var c = b.val().split(".");
            void 0 == c[1] || c[1].length <= 2 ? a.addClass("enable") : a.removeClass("enable")
        } else a.removeClass("enable")
    },
    submitTransferToDown: function(a) {
        $("#transferToDownlineForm")[0].childNodes[3].childNodes[5].childNodes[3].removeAttribute("name");
        var b = $("#transferToDownlineForm"),
            c = (sessionStorage.walletBalance, b.find("[name='paymentpwd']")),
            d = b.find("[name='transferAmt']"),
            e = b.find(".form-reset"),
            f = b.find(".form-submit"),
            g = b.find("[id='remarks']"),
            h = control.encode([a, d.val(), g.val(), c.val()]),
            i = {
                values: h
            };
        if ("" == d.val()) return void control.showTooltip(d, "transferToDownline_amount_invalid");
        if ("" == c.val()) return void control.showTooltip(c, "transferToDownline_password_required");
        if (!regExPattern("amount", d.val())) return void control.showTooltip(d, "transferToDownline_amount_invalid");
        var j = d.val().split(".");
        if (void 0 != j[1] && j[1].length > 2) return void control.showTooltip(d, "transferToDownline_amount_invalid");
        !1 === f.hasClass("processing") && (f.addClass("processing"), TCG.Ajax({
            url: "./agentLR/lowerRecharge",
            data: i
        }, function(a) {
            $("div.model_child_content #loading").remove(), a.status ? (TCG.Alert("success", "转帐成功"), control.getWalletBalance(), e.click(), b.removeClass("enable")) : TCG.Alert("errors", TCG.Prop(a.description), "", function() {
                $("div.model_child_content #loading").remove()
            }), $("div.model_child_content #loading").remove(), f.removeClass("processing")
        }))
    },
    agentGameHistory: function(a) {
        control.loadRtnBtn(), control.switchDecimal("#bettingDecimal"), control.datepickerStartEnd($("#agentGameHistoryForm [name='startTime']"), $("#agentGameHistoryForm [name='endTime']"), new Date, !0, !0), control.loadBettingRecordSumbit(a), control.switchAgentGameHistory(), UI.loadQueryConditionList(globalVar.headers, function(a) {
            $("#agentGameHistoryForm [name='gameId']").html(a.games), control.customSelect("#agentGameHistoryForm [name='gameId']"), $("#agentGameHistoryForm .form-submit").click()
        }), control.datepickerStartEnd($("#agentPvpGameHistoryForm [name='startTime']"), $("#agentPvpGameHistoryForm [name='endTime']"), new Date, !0, !0), control.customSelect("#agentPvpGameHistoryForm select"), control.searchAgentPvpGameHistory(a)
    },
    switchAgentGameHistory: function() {
        $(document).off("click", "#switchAgentGameHistory li").on("click", "#switchAgentGameHistory li", function() {
            "lotto" == $(this).attr("data-rel") ? ($("#agentGameHistoryForm").removeClass("hide"), $("#agentGameHistoryTable").removeClass("hide"), $("#agentGameHistoryTotal").removeClass("hide"), $("#agentPvpGameHistoryForm").addClass("hide"), $("#agentPvpGameHistoryTable").addClass("hide"), $("#agentPvpGameHistoryTotal").addClass("hide"), $("#agentGameHistoryForm .form-submit").click()) : ($("#agentGameHistoryForm").addClass("hide"), $("#agentGameHistoryTable").addClass("hide"), $("#agentGameHistoryTotal").addClass("hide"), $("#agentPvpGameHistoryForm").removeClass("hide"), $("#agentPvpGameHistoryTable").removeClass("hide"), $("#agentPvpGameHistoryTotal").removeClass("hide"), $("#agentPvpGameHistoryForm .form-submit").click()), $("#switchAgentGameHistory li.active").removeClass("active"), $(this).addClass("active"), control.datepickerStartEnd($("#agentGameHistoryForm [name='startTime']"), $("#agentGameHistoryForm [name='endTime']"), new Date, !0, !0)
        })
    },
    searchAgentPvpGameHistory: function(a) {
        var a = a;
        $(document).off("click", "#agentPvpGameHistoryForm .form-submit").on("click", "#agentPvpGameHistoryForm .form-submit", function() {
            control.getAgentPvpGameHistory(a)
        })
    },
    getAgentPvpGameHistory: function(a) {
        var b = $("#agentPvpGameHistoryForm"),
            c = b.find("[name='startTime']"),
            d = b.find("[name='endTime']"),
            e = b.find("[name='gameType']"),
            f = b.find("[name='gameRoom']"),
            g = b.find("[name='pageNo']"),
            h = b.find(".form-submit"),
            i = {
                customerId: a,
                startDate: c.attr("complete-date"),
                endDate: d.attr("complete-date"),
                gameType: e.val(),
                gameId: f.val(),
                pageNo: g.val(),
                pageSize: 10
            };
        h.hasClass("processing") || (h.addClass("processing"), TCG.Ajax({
            url: "./getAccountGameBetHistory",
            data: i
        }, function(a) {
            a.status ? (UI.loadAgentPvpGameHistory(a.result, e.val()), UI.loadPagination("agentPvpGameHistory", a.result.page.currentPage, a.result.page.total)) : ($("div.model_child_content #loading").remove(), TCG.Alert("errors", TCG.Prop(a.description))), $("div.model_child_content #loading").remove(), h.removeClass("processing")
        }))
    },
    loadBettingRecordSumbit: function(a) {
        $(document).off("click", "#agentGameHistoryForm .form-submit").on("click", "#agentGameHistoryForm .form-submit", function() {
            control.submitBettingRecord(a)
        })
    },
    submitBettingRecord: function(a) {
        var a = a,
            b = $("#bettingHistory"),
            c = b.find(".form-submit"),
            d = b.find("[name='startTime']"),
            e = b.find("[name='endTime']"),
            f = b.find("[name='gameId']"),
            g = b.find("[name='orderNum']"),
            h = "" == f.val() ? 0 : f.val(),
            i = b.find("[name='pageNo']"),
            j = (b.find("[name='pageSize']"), {
                customerId: a,
                startDate: d.attr("complete-date"),
                endDate: e.attr("complete-date"),
                gameId: h,
                orderNum: g.val(),
                pageNo: i.val(),
                pageSize: 10
            });
        c.hasClass("processing") || (c.addClass("processing"), $("#gameHistoryList").html(""), TCG.Ajax({
            url: "./downlineBetHistory",
            data: j
        }, function(a) {
            if (a.status) {
                UI.loadBettingRecord(a.result);
                var b = Math.ceil(a.result.page.total / a.result.page.pageSize);
                UI.loadPagination("agentGameHistoryForm", i.val(), b, "#bettingpagination")
            } else TCG.Alert("errors", TCG.Prop(a.description));
            $("div.model_child_content #loading").remove(), c.removeClass("processing")
        }))
    },
    loadRebateSetting: function(a, b) {
        control.loadRtnBtn(), UI.loadGameSeries("#rebateSetting", !0, a, !0), control.submitRebateSetting(b)
    },
    submitRebateSetting: function(a) {
        $(document).off("click", "#rebateSetting .form-submit").on("click", "#rebateSetting .form-submit", function() {
            control.updateMemberRebates(a)
        })
    },
    updateMemberRebates: function(a) {
        for (var b = $("#rebateSetting"), c = b.find(".form-submit"), d = b.find("input[name='lottery']:checked"), e = b.find(".mg-radio-btn"), f = {
                customerName: a.customerName,
                configs: []
            }, g = 0; g < d.length; g++) {
            var h = d.eq(g).siblings("input.quota-amount").attr("gamecode"),
                i = h.substr(h.length - 1);
            f.configs[g] = {
                rebateValue: d.eq(g).siblings("input.quota-amount").val(),
                type: d.eq(g).val(),
                prizeModeId: i
            }
        }
        void 0 != e.attr("quota-id") && (f.templateIdList = e.attr("quota-id")), $("#rQuotaSwitch").is(":checked") ? $("#rebateQuota input[name='dira-regdline-rquota']").hasClass("mg-radio-btn") ? c.hasClass("processing") || (c.addClass("processing"), TCG.Ajax({
            url: "./agentSet/updateDownlineRebates",
            data: JSON.stringify(f),
            method: "POST",
            contentType: "application/json; charset=UTF-8"
        }, function(a) {
            a.status ? (c.removeClass("processing"), TCG.Alert("success", TCG.Prop("update_member_rebate_success"), null, function() {
                $("div.model_child_content #loading").remove(), $("#returnMemberMam").trigger("click")
            })) : TCG.Alert("errors", TCG.Prop(a.description), null, function() {
                $("div.model_child_content #loading").remove(), c.removeClass("processing")
            }), $("div.model_child_content #loading").remove()
        })) : TCG.Alert("errors", "请选择配额", "", function() {
            $("div.model_child_content #loading").remove()
        }) : c.hasClass("processing") || (c.addClass("processing"), TCG.Ajax({
            url: "./agentSet/updateDownlineRebates",
            data: JSON.stringify(f),
            method: "POST",
            contentType: "application/json; charset=UTF-8"
        }, function(a) {
            a.status ? (c.removeClass("processing"), TCG.Alert("success", TCG.Prop("update_member_rebate_success"), null, function() {
                $("div.model_child_content #loading").remove(), $("#returnMemberMam").trigger("click")
            })) : TCG.Alert("errors", TCG.Prop(a.description), null, function() {
                $("div.model_child_content #loading").remove(), c.removeClass("processing")
            })
        }))
    },
    palStatementsAgent: function() {
        control.countUnreadMessage(), control.switchDecimal(), control.switchAgentPnl();
        var a = window.sessionStorage.getItem("customerId"),
            b = window.sessionStorage.getItem("username").split("@");
        $(".breadcrumbs .b-list.agentName").text(b[1]).attr({
            "data-customerId": a
        }), control.datepickerStartEnd($("#lottoAgentPnlForm [name='startTime']"), $("#lottoAgentPnlForm [name='endTime']"), new Date), control.searchLottoAgentPnl(), control.switchLottoAgentPnlSummaryType(), control.selectLottoAgentDownlinePnl(), control.clickLottoAgentPnlBreadcrumbs(), control.datepickerStartEnd($("#pvpAgentPnlForm [name='startTime']"), $("#pvpAgentPnlForm [name='endTime']"), new Date), control.customSelect("#pvpAgentPnlForm [name='gameType']"), control.searchPvpAgentPnl(), control.switchPvpAgentPnlSummaryType(), control.selectPvpAgentDownlinePnl(), control.clickPvpAgentPnlBreadcrumbs(), $("#lottoAgentPnlForm [name='summaryType']").val(0), $("#lottoAgentPnlForm .form-submit").click()
    },
    switchAgentPnl: function() {
        $(document).off("click", "#switchAgentPnl li").on("click", "#switchAgentPnl li", function() {
            var a = $(this).attr("data-rel");
            $(this).hasClass("active") || ("lotto" == a ? ($("#pvpAgentPnlForm").addClass("hide"), $("#pvpAgentPnlTable").addClass("hide"), $("#lottoAgentPnlForm").removeClass("hide"), $("#lottoAgentPnlTable").removeClass("hide"), $("#lottoAgentPnlForm .form-submit").click()) : ($("#lottoAgentPnlForm").addClass("hide"), $("#lottoAgentPnlTable").addClass("hide"), $("#pvpAgentPnlForm").removeClass("hide"), $("#pvpAgentPnlTable").removeClass("hide"), $("#pvpAgentPnlForm .form-submit").click()), sessionStorage.removeItem("pnlCustomerId"), $("#switchAgentPnl li.active").removeClass("active"), $(this).addClass("active"))
        })
    },
    clickLottoAgentPnlBreadcrumbs: function() {
        $(document).off("click", "#lottoAgentPnlForm .breadcrumbs .b-list").on("click", "#lottoAgentPnlForm .breadcrumbs .b-list", function() {
            if (!$(this).hasClass("loading")) {
                var a = $(this).attr("data-customerId"),
                    b = ($(this).text(), !1);
                $("#lottoAgentPnlForm .breadcrumbs .b-list").each(function() {
                    b && $(this).remove(), $(this).attr("data-customerId") == a && (b = !0)
                }), $("#lottoAgentPnlForm .breadcrumbs .b-list").addClass("loading"), $("#lottoAgentPnlForm .summaryTypeList li").addClass("loading"), sessionStorage.setItem("pnlCustomerId", a), control.getLottoAgentPnl(a, !0)
            }
        })
    },
    selectLottoAgentDownlinePnl: function() {
        $(document).off("click", "#lottoAgentPnlList .tbl-link").on("click", "#lottoAgentPnlList .tbl-link", function() {
            if (!$(this).hasClass("loading")) {
                var a = $(this).text(),
                    b = $(this).attr("data-customerId"),
                    c = !1;
                $("#lottoAgentPnlForm .breadcrumbs .b-list").each(function() {
                    $(this).attr("data-customerId") == b && (c = !0)
                }), c || ($("#lottoAgentPnlForm .breadcrumbs .b-list").addClass("loading"), $("#lottoAgentPnlForm .summaryTypeList li").addClass("loading"), _html = "<div class='arrow-small-con mem-icon inline-block b-list new-entry' data-customerId='" + b + "'>" + a + "</div>", $("#lottoAgentPnlForm .breadcrumbs").append(_html)), sessionStorage.setItem("pnlCustomerId", b), control.getLottoAgentPnl(b, !0)
            }
        })
    },
    switchLottoAgentPnlSummaryType: function() {
        $(document).off("click", "#lottoAgentPnlForm .summaryTypeList li").on("click", "#lottoAgentPnlForm .summaryTypeList li", function() {
            if (!$(this).hasClass("active") && !$("#lottoAgentPnlForm .form-submit").hasClass("processing")) {
                var a = $(this).attr("data-rel");
                $("#lottoAgentPnlForm .summaryTypeList li").removeClass("active"), $(this).addClass("active"), $("#lottoAgentPnlForm [name='summaryType']").val(a), $("#lottoAgentPnlForm .form-submit").click()
            }
        })
    },
    searchLottoAgentPnl: function() {
        $(document).off("click", "#lottoAgentPnlForm .form-submit").on("click", "#lottoAgentPnlForm .form-submit", function() {
            "" != $("#lottoAgentPnlForm [name='customerName']").val() ? sessionStorage.removeItem("pnlCustomerId") : ($("#lottoAgentPnlForm .breadcrumbs .b-list.new-entry").remove(), sessionStorage.removeItem("pnlCustomerId")), control.getLottoAgentPnl("", !0)
        })
    },
    getLottoAgentPnl: function(a, b) {
        var c = $("#lottoAgentPnlForm"),
            d = c.find("[name='customerName']"),
            e = c.find("[name='summaryType']"),
            f = c.find("[name='startTime']"),
            g = c.find("[name='endTime']"),
            h = c.find(".form-submit"),
            i = c.find("[name='pageNo']"),
            j = {
                customerName: d.val(),
                customerId: "",
                summaryType: e.val(),
                startDate: f.val(),
                endDate: g.val(),
                pageNo: i.val(),
                pageSize: 10
            };
        h.hasClass("processing") || (h.addClass("processing"), null !== sessionStorage.getItem("pnlCustomerId") && (a = sessionStorage.getItem("pnlCustomerId")), "" != a && void 0 != a && (j.customerName = "", j.customerId = a), "" == j.customerName && "" == j.customerId && (j.customerId = $("#lottoAgentPnlForm .breadcrumbs .b-list:last").attr("data-customerId")), b && (j.pageNo = 1), control.customLoader({
            element: "#listWrapper",
            method: "create"
        }), TCG.Ajax({
            url: "./getDownlineLottoPNLReport",
            data: j
        }, function(a) {
            if (a.status) {
                TCG.hideLoading(), "" != j.customerName && $("#lottoAgentPnlForm .breadcrumbs .b-list.new-entry:last").text() != j.customerName && ($("#lottoAgentPnlForm .breadcrumbs .b-list.new-entry").remove(), _html = "<div class='arrow-small-con mem-icon inline-block b-list new-entry' data-customerId='" + j.customerId + "'>" + j.customerName + "</div>", $("#lottoAgentPnlForm .breadcrumbs").append(_html)), UI.loadLottoAgentPnl(a.result, e.val());
                var b = a.result.page.pageSize,
                    d = Math.ceil(a.result.page.total / b);
                UI.loadPagination("profitAndLossStatements", a.result.page.currentPage, d)
            } else TCG.Alert("errors", TCG.Prop(a.description));
            c.find(".breadcrumbs .b-list").removeClass("loading"), c.find(".summaryTypeList li").removeClass("loading"), $("div.model_child_content #loading").remove(), h.removeClass("processing")
        }))
    },
    clickPvpAgentPnlBreadcrumbs: function() {
        $(document).off("click", "#pvpAgentPnlForm .breadcrumbs .b-list").on("click", "#pvpAgentPnlForm .breadcrumbs .b-list", function() {
            if (!$(this).hasClass("loading")) {
                var a = $(this).attr("data-customerId"),
                    b = ($(this).text(), !1);
                $("#pvpAgentPnlForm .breadcrumbs .b-list").each(function() {
                    b && $(this).remove(), $(this).attr("data-customerId") == a && (b = !0)
                }), $("#pvpAgentPnlForm .breadcrumbs .b-list").addClass("loading"), $("#pvpAgentPnlList .tbl-link").addClass("loading"), sessionStorage.setItem("pnlCustomerId", a), control.getPvpAgentPnl(a, !0)
            }
        })
    },
    selectPvpAgentDownlinePnl: function() {
        $(document).off("click", "#pvpAgentPnlList .tbl-link").on("click", "#pvpAgentPnlList .tbl-link", function() {
            if (!$(this).hasClass("loading")) {
                var a = $(this).text(),
                    b = $(this).attr("data-customerId"),
                    c = !1;
                if ($("#pvpAgentPnlForm .breadcrumbs .b-list").each(function() {
                        $(this).attr("data-customerId") == b && (c = !0)
                    }), !c) {
                    $("#pvpAgentPnlForm .breadcrumbs .b-list").addClass("loading"), $("#pvpAgentPnlList .tbl-link").addClass("loading");
                    var d = "<div class='arrow-small-con mem-icon inline-block b-list new-entry' data-customerId='" + b + "'>" + a + "</div>";
                    $("#pvpAgentPnlForm .breadcrumbs").append(d)
                }
                sessionStorage.setItem("pnlCustomerId", b), control.getPvpAgentPnl(b, !0)
            }
        })
    },
    switchPvpAgentPnlSummaryType: function() {
        $(document).off("click", "#pvpAgentPnlForm .summaryTypeList li").on("click", "#pvpAgentPnlForm .summaryTypeList li", function() {
            if (!$(this).hasClass("active") && !$("#pvpAgentPnlForm .form-submit").hasClass("processing")) {
                var a = $(this).attr("data-rel");
                $("#pvpAgentPnlForm .summaryTypeList li").removeClass("active"), $(this).addClass("active"), $("#pvpAgentPnlForm [name='summaryType']").val(a), $("#pvpAgentPnlForm .form-submit").click()
            }
        })
    },
    searchPvpAgentPnl: function() {
        $(document).off("click", "#pvpAgentPnlForm .form-submit").on("click", "#pvpAgentPnlForm .form-submit", function() {
            "" != $("#pvpAgentPnlForm [name='customerName']").val() ? sessionStorage.removeItem("pnlCustomerId") : ($("#pvpAgentPnlForm .breadcrumbs .b-list.new-entry").remove(), sessionStorage.removeItem("pnlCustomerId")), control.getPvpAgentPnl("", !0)
        })
    },
    getPvpAgentPnl: function(a, b) {
        var c = $("#pvpAgentPnlForm"),
            d = c.find("[name='customerName']"),
            e = c.find("[name='startTime']"),
            f = c.find("[name='summaryType']"),
            g = c.find("[name='gameType']"),
            h = c.find("[name='endTime']"),
            i = c.find(".form-submit"),
            j = c.find("[name='pageNo']"),
            k = {
                customerName: d.val(),
                customerId: "",
                summaryType: f.val(),
                startDate: e.val(),
                endDate: h.val(),
                gameType: g.val(),
                pageNo: j.val(),
                pageSize: 10
            };
        i.hasClass("processing") || (i.addClass("processing"), null !== sessionStorage.getItem("pnlCustomerId") && (a = sessionStorage.getItem("pnlCustomerId")), "" != a && void 0 != a && (k.customerName = "", k.customerId = a), "" == k.customerName && "" == k.customerId && (k.customerId = $("#pvpAgentPnlForm .breadcrumbs .b-list:last").attr("data-customerId")), b && (k.pageNo = 1), TCG.Ajax({
            url: "./getTeamPVPFishingPNLReport",
            data: k
        }, function(a) {
            if (a.status) {
                "" != k.customerName && $("#pvpAgentPnlForm .breadcrumbs .b-list.new-entry:last").text() != k.customerName && ($("#pvpAgentPnlForm .breadcrumbs .b-list.new-entry").remove(), _html = "<div class='arrow-small-con mem-icon inline-block b-list new-entry' data-customerId='" + k.customerId + "'>" + k.customerName + "</div>", $("#pvpAgentPnlForm .breadcrumbs").append(_html)), UI.loadPvpAgentPnl(a.result, g.val(), f.val());
                var b = a.result.page.pageSize,
                    d = Math.ceil(a.result.page.total / b);
                UI.loadPagination("getPvpAgentPnl", a.result.page.currentPage, d)
            } else TCG.Alert("errors", TCG.Prop(a.description));
            c.find(".breadcrumbs .b-list").removeClass("loading"), c.find(".tbl-link").removeClass("loading"), $("div.model_child_content #loading").remove(), i.removeClass("processing")
        }))
    },
    agentDownlineTransactionDetails: function() {
        $("#downlineTransactionDetailsForm [name='pageNo']").val(1), control.form(), control.countUnreadMessage(), control.datepickerStartEnd($("#downlineTransactionDetailsForm [name='startTime']"), $("#downlineTransactionDetailsForm [name='endTime']"), new Date, !0, !0), control.switchDecimal("#DownlineTransactionDetailsSwitchBtn"), control.searchDownlineTransactionDetails(), control.getWalletList("#downlineTransactionDetailsForm [name='account']", function() {
            control.changeOptions("#downlineTransactionDetailsForm [name='account']", "#downlineTransactionDetailsForm [name='type']"), control.customSelect("#downlineTransactionDetailsForm [name='type']"), UI.loadPagination("downlineTransactionDetails", 1, 0)
        }), control.onChangeSelect("#downlineTransactionDetailsForm")
    },
    searchDownlineTransactionDetails: function() {
        $("#downlineTransactionDetailsForm .form-submit").unbind("click").bind("click", function() {
            control.getDownlineTransactionDetails()
        })
    },
    getDownlineTransactionDetails: function() {
        var a = $("#downlineTransactionDetailsForm"),
            b = a.find("[name='username']"),
            c = a.find("[name='account']"),
            d = a.find("[name='type']"),
            e = a.find("[name='startTime']"),
            f = a.find("[name='endTime']"),
            g = a.find("[name='pageNo']"),
            h = "" == g.val() ? 1 : g.val(),
            i = a.find(".form-submit"),
            j = ((new Date).getTime(), new Date(e.val()).getTime()),
            k = new Date(f.val()).getTime();
        if (control.dayDifference(j, k) > 1) return $("div.model_child_content #loading").remove(), void TCG.Alert("errors", TCG.Prop("date_exceed_2_days"), "", function() {
            $("div.model_child_content #loading").remove()
        });
        if ("" == b.val() && "" == d.val()) return void TCG.Alert("errors", TCG.Prop("errorUsernameTransType"), "", function() {
            $("div.model_child_content #loading").remove()
        });
        if (!i.hasClass("processing")) {
            i.addClass("processing");
            var l = {
                customerName: b.val(),
                accountType: c.val(),
                transactionType: d.val(),
                startTime: e.attr("complete-date"),
                endTime: f.attr("complete-date"),
                pageNo: h,
                pageSize: 15
            };
            control.customLoader({
                element: "#downlineTransactionDetailsForm",
                method: "create"
            }), TCG.Ajax({
                url: "./agentset/getDownlineTransactionDetails",
                data: l
            }, function(a) {
                if (a.status) {
                    var b = Math.ceil(a.result.page.total / 15);
                    UI.loadDownlineTransactionDetails(a.result, c.val()), UI.loadPagination("downlineTransactionDetails", a.result.page.currentPage, b)
                } else TCG.Alert("errors", TCG.Prop(a.description));
                $("div.model_child_content #loading").remove(), i.removeClass("processing")
            })
        }
    },
    agentTeamIncomeReport: function() {
        control.countUnreadMessage(), control.datepickerStartEnd($("#agentTeamIncome [name='startTime']"), $("#agentTeamIncome [name='endTime']"), new Date, !1, !0), control.switchDecimal();
        var a = window.sessionStorage.getItem("customerId"),
            b = window.sessionStorage.getItem("username").split("@");
        $(".breadcrumbs .b-list.agentName").text(b[1]).attr({
            "data-customerId": a
        }), control.searchAgentTeamIncome(), control.switchAgentTeamIncome(), control.selectAgentTeamIncome(), control.clickAgentTeamIncome(), sessionStorage.removeItem("pnlCustomerId"), $("#agentTeamIncome [name='summaryType']").val(0), $("#agentTeamIncome .form-submit").click()
    },
    searchAgentTeamIncome: function() {
        $(document).off("click", "#agentTeamIncome .form-submit").on("click", "#agentTeamIncome .form-submit", function() {
            "" != $("#agentTeamIncome [name='customerName']").val() ? sessionStorage.removeItem("pnlCustomerId") : ($("#agentTeamIncome .breadcrumbs .b-list.new-entry").remove(), sessionStorage.removeItem("pnlCustomerId")), control.getAgentTeamIncome("", !0)
        })
    },
    getAgentTeamIncome: function(a, b) {
        var c = $("#agentTeamIncome"),
            d = c.find("[name='customerName']"),
            e = c.find("[name='summaryType']"),
            f = c.find("[name='startTime']"),
            g = c.find("[name='endTime']"),
            h = c.find(".form-submit"),
            i = c.find("[name='pageNo']"),
            j = {
                customerName: d.val(),
                customerId: "",
                summaryType: e.val(),
                startDate: f.val(),
                endDate: g.val(),
                pageNo: i.val(),
                pageSize: 10
            };
        h.hasClass("processing") || (h.addClass("processing"), null !== sessionStorage.getItem("pnlCustomerId") && (a = sessionStorage.getItem("pnlCustomerId")), "" != a && void 0 != a && (j.customerName = "", j.customerId = a), "" == j.customerName && "" == j.customerId && (j.customerId = $("#agentTeamIncome .breadcrumbs .b-list:last").attr("data-customerId")), b && (j.pageNo = 1), control.customLoader({
            element: "#listWrapper",
            method: "create"
        }), TCG.Ajax({
            url: "./getDownlineLottoPNLReport",
            data: j
        }, function(a) {
            if (a.status) {
                "" != j.customerName && $("#agentTeamIncome .breadcrumbs .b-list.new-entry:last").text() != j.customerName && ($("#agentTeamIncome .breadcrumbs .b-list.new-entry").remove(), _html = "<div class='arrow-small-con mem-icon inline-block b-list new-entry' data-customerId='" + j.customerId + "'>" + j.customerName + "</div>", $("#agentTeamIncome .breadcrumbs").append(_html)), UI.loadAgentTeamIncome(a.result);
                var b = a.result.page.pageSize,
                    d = Math.ceil(a.result.page.total / b);
                UI.loadPagination("agentTeamIncome", a.result.page.currentPage, d)
            } else TCG.Alert("errors", TCG.Prop(a.description));
            c.find(".breadcrumbs .b-list").removeClass("loading"), c.find(".summaryTypeList li").removeClass("loading"), $("div.model_child_content #loading").remove(), h.removeClass("processing")
        }))
    },
    switchAgentTeamIncome: function() {
        $(document).off("click", "#agentTeamIncome .summaryTypeList li").on("click", "#agentTeamIncome .summaryTypeList li", function() {
            if (!$(this).hasClass("active") && !$("#lottoAgentPnlForm .form-submit").hasClass("processing")) {
                var a = $(this).attr("data-rel");
                $("#agentTeamIncome .summaryTypeList li").removeClass("active"), $(this).addClass("active"), $("#agentTeamIncome [name='summaryType']").val(a), $("#agentTeamIncome .form-submit").click()
            }
        })
    },
    selectAgentTeamIncome: function() {
        $(document).off("click", "#agentTeamIncomeList .tbl-link").on("click", "#agentTeamIncomeList .tbl-link", function() {
            if (!$(this).hasClass("loading")) {
                var a = $(this).text(),
                    b = $(this).attr("data-customerId"),
                    c = !1;
                $("#agentTeamIncome .breadcrumbs .b-list").each(function() {
                    $(this).attr("data-customerId") == b && (c = !0)
                }), c || ($("#agentTeamIncome .breadcrumbs .b-list").addClass("loading"), $("#agentTeamIncome .summaryTypeList li").addClass("loading"), _html = "<div class='arrow-small-con mem-icon inline-block b-list new-entry' data-customerId='" + b + "'>" + a + "</div>", $("#agentTeamIncome .breadcrumbs").append(_html)), sessionStorage.setItem("pnlCustomerId", b), control.getAgentTeamIncome(b, !0)
            }
        })
    },
    clickAgentTeamIncome: function() {
        $(document).off("click", "#agentTeamIncome .breadcrumbs .b-list").on("click", "#agentTeamIncome .breadcrumbs .b-list", function() {
            if (!$(this).hasClass("loading")) {
                var a = $(this).attr("data-customerId"),
                    b = ($(this).text(), !1);
                $("#agentTeamIncome .breadcrumbs .b-list").each(function() {
                    b && $(this).remove(), $(this).attr("data-customerId") == a && (b = !0)
                }), $("#agentTeamIncome .breadcrumbs .b-list").addClass("loading"), $("#agentTeamIncome .summaryTypeList li").addClass("loading"), sessionStorage.setItem("pnlCustomerId", a), control.getAgentTeamIncome(a, !0)
            }
        })
    },
    agentTeamBetting: function() {
        control.showMoreFilter("agentTeamBetting"), control.countUnreadMessage(), control.datepickerStartEnd($("#lottoTeamBettingForm [name='startTime']"), $("#lottoTeamBettingForm [name='endTime']"), new Date, !0, !0), control.searchTeamBetting(), control.switchAgentTeamBetting(), control.eventsPvpTeamBetting(), $("#lottoTeamBettingForm [name='pageNo']").val(1), control.customSelect("#lottoTeamBettingForm select"), UI.loadGroupGames(function(a) {
            $("#customGameList").html(a), $("#lottoTeamBettingForm .form-submit").click(), control.customSelectGame("#lottoTeamBettingForm [name='game']")
        }), control.switchDecimal("#lottoTeamBetting .switchDecimal"), control.selectGameType("#pvpTeamBettingForm [name='gameType']", "#pvpTeamBettingForm [name='gameRoom']"), control.customSelect("#pvpTeamBettingForm select"), UI.loadGameRooms("#pvpTeamBettingForm [name='gameRoom']", "PVP", "update"), control.datepickerStartEnd($("#pvpTeamBettingForm [name='startTime']"), $("#pvpTeamBettingForm [name='endTime']"), new Date, !0, !0), control.showMorePvpFilter(), control.searchPvpTeamBetting()
    },
    selectTeamBettingArea: function(a, b) {
        $(document).off("change", a).on("change", a, function() {
            0 == $(this).val() ? $(b).val("").prop("disabled", !0) : $(b).prop("disabled", !1)
        })
    },
    switchAgentTeamBetting: function() {
        $(document).off("click", "#switchAgentTeamBetting li").on("click", "#switchAgentTeamBetting li", function() {
            "lotto" == $(this).attr("data-rel") ? ($("#pvpTeamBetting").addClass("hide"), $("#lottoTeamBetting").removeClass("hide"), $("#lottoTeamBettingForm .form-submit").click()) : ($("#lottoTeamBetting").addClass("hide"), $("#pvpTeamBetting").removeClass("hide"), $("#pvpTeamBettingForm .form-submit").click()), $("#switchAgentTeamBetting li.active").removeClass("active"), $(this).addClass("active")
        })
    },
    showMorePvpFilter: function() {
        $(document).off("click", "#pvpTeamBettingForm .tabBtn").on("click", "#pvpTeamBettingForm .tabBtn", function() {
            var a = $("#pvpTeamBettingForm"),
                b = a.find(".otherFilter"),
                c = $("#tableContainer");
            b.hasClass("hide") ? ($(this).addClass("active"), b.removeClass("hide"), c.addClass("mini"), $("#lottoGameHistoryList").addClass("y-overflow"), control.customSelect("#lottoGameHistoryForm [name='chaseStatus']")) : ($(this).removeClass("active"), b.addClass("hide"), c.removeClass("mini"), $("#lottoGameHistoryList").removeClass("y-overflow"))
        })
    },
    searchPvpTeamBetting: function() {
        $(document).off("click", "#pvpTeamBettingForm .form-submit").on("click", "#pvpTeamBettingForm .form-submit", function() {
            control.getPvpTeamBetting()
        })
    },
    eventsPvpTeamBetting: function() {
        $(document).off("click", "#teamBetting .openItem").on("click", "#teamBetting .openItem", function() {
            $("#teamBetting").addClass("hide"), $("#itemWrapper").removeClass("hide");
            var a = $(this).attr("data-orderId"),
                b = $(this).attr("data-orderMasterId"),
                c = "0" == $(this).attr("data-chasing") ? "false" : "true";
            control.getGameHistoryItem(a, b, c), sessionStorage.setItem("lastPage", "teamBetting")
        })
    },
    getPvpTeamBetting: function() {
        var a = $("#pvpTeamBettingForm"),
            b = a.find("[name='startTime']"),
            c = a.find("[name='endTime']"),
            d = a.find("[name='customerId']"),
            e = a.find("[name='range']"),
            f = a.find("[name='gameType']"),
            g = a.find("[name='gameRoom']"),
            h = a.find("[name='pageNo']"),
            i = a.find(".form-submit"),
            j = {
                username: d.val(),
                startDate: b.attr("complete-date"),
                endDate: c.attr("complete-date"),
                gameType: f.val(),
                gameId: g.val(),
                pageNo: h.val(),
                pageSize: 10,
                range: e.val()
            };
        i.hasClass("processing") || (i.addClass("processing"), control.customLoader({
            element: "#pvpTeamBetting",
            method: "create"
        }), TCG.Ajax({
            url: "./getTeamPVPRNGBettingReport",
            data: j
        }, function(a) {
            if (a.status) {
                UI.loadPvpTeamBetting(a.result, f.val());
                var b = a.result.page.pageSize,
                    c = Math.ceil(a.result.page.total / b);
                UI.loadPagination("pvpTeamBetting", a.result.page.currentPage, c, "#lottoTeamBettingPagination")
            } else TCG.Alert("errors", TCG.Prop(a.description));
            $("div.model_child_content #loading").remove(), control.switchDecimal(), i.removeClass("processing")
        }))
    },
    searchTeamBetting: function() {
        $(document).off("click", "#lottoTeamBettingForm .form-submit").on("click", "#lottoTeamBettingForm .form-submit", function() {
            var a = $("#lottoTeamBettingForm"),
                b = (a.find(".form-control"), a.find("[name='customerName']")),
                c = a.find("[name='startTime']"),
                d = a.find("[name='endTime']"),
                e = a.find("[name='status']"),
                f = a.find("[name='range']"),
                g = a.find("[name='game']"),
                h = "" == g.attr("data-gameCode") ? 0 : g.attr("data-gameCode"),
                i = a.find("[name='order']"),
                j = a.find("[name='issue']"),
                k = a.find("[name='chaseStatus']"),
                l = a.find("[name='pageNo']"),
                m = a.find(".form-submit"),
                n = ((new Date).getTime(), new Date(c.val()).getTime()),
                o = new Date(d.val()).getTime(),
                p = control.dayDifference(n, o),
                q = {
                    customerName: b.val(),
                    startDate: c.attr("complete-date"),
                    endDate: d.attr("complete-date"),
                    area: f.val(),
                    status: e.val(),
                    gameCode: h,
                    orderNum: i.val(),
                    numero: j.val(),
                    chase: k.val(),
                    pageNo: l.val(),
                    pageSize: 15
                };
            if (p > 30) return void TCG.Alert("errors", TCG.Prop("date_exceed_30_days"), "", function() {
                $("div.model_child_content #loading").remove()
            });
            m.hasClass("processing") || (m.addClass("processing"), control.customLoader({
                element: "#lottoTeamBetting",
                method: "create"
            }), TCG.Ajax({
                url: "./getTeamBettingReport",
                data: q
            }, function(a) {
                if (a.status) {
                    UI.loadTeamBetting(a.result);
                    var b = a.result.page.pageSize,
                        c = Math.ceil(a.result.page.total / b);
                    UI.loadPagination("lottoTeamBetting", a.result.page.currentPage, c, "#lottoTeamBettingPagination")
                } else TCG.Alert("errors", TCG.Prop(a.description));
                $("div.model_child_content #loading").remove(), m.removeClass("processing")
            }))
        })
    },
    agentRevenueReport: function() {
        control.countUnreadMessage(), control.customSelect("#revenueReportForm select"), control.datepickerStartEnd($("#revenueReportForm [name='startTime']"), $("#revenueReportForm [name='endTime']"), new Date), control.switchDecimal(), control.searchRevenueReport(), $("#revenueReportForm .form-submit").click()
    },
    searchRevenueReport: function() {
        $(document).off("click", "#revenueReportForm .form-submit").on("click", "#revenueReportForm .form-submit", function() {
            control.getRevenueReport()
        })
    },
    getRevenueReport: function() {
        var a = $("#revenueReportForm"),
            b = (a.find(".form-control"), a.find("[name='startTime']")),
            c = a.find("[name='endTime']"),
            d = a.find("[name='pageNo']"),
            e = a.find(".form-submit"),
            f = {
                startDate: b.val(),
                endDate: c.val(),
                pageNo: d.val(),
                pageSize: 10
            };
        e.hasClass("processing") || (e.addClass("processing"), TCG.Ajax({
            url: "./agent/getIncomeReport",
            data: f
        }, function(a) {
            if (a.status) {
                UI.loadRevenueReport(a.result);
                var b = a.result.page.pageSize,
                    c = Math.ceil(a.result.page.total / b);
                UI.loadPagination("revenueReport", a.result.page.currentPage, c)
            } else TCG.Alert("errors", TCG.Prop(a.description));
            $("div.model_child_content #loading").remove(), e.removeClass("processing")
        }))
    },
    agentDividendRecord: function() {
        control.countUnreadMessage(), control.switchAgentDividendTab(), control.backToContractManagement(), control.customSelect("#contractManagementForm select"), $("#contractManagementForm .form-submit").unbind("click").bind("click", function() {
            control.getContractManagementList()
        }), control.customSelect("#disbursementForm select"), control.datepickerStartEnd($("#disbursementForm [name='startTime']"), $("#disbursementForm [name='endTime']"), "-1"), $("#disbursementForm .form-submit").unbind("click").bind("click", function() {
            control.getDisbursementList()
        }), $("#switchAgentDividend li").unbind("click").bind("click", function() {
            var a = $(this).attr("data-rel");
            control.switchAgentDividendTab(a, $(this))
        }), "true" === sessionStorage.getItem("contract") ? $("#switchAgentDividend li[data-rel='contractManagementContent']").trigger("click") : $("#switchAgentDividend li[data-rel='dividendReportContent']").trigger("click"), control.usersNoContract(), $("#cm_betVolume, #cm_actMember, #cm_rate").off().on("keypress", function(a) {
            a = a || window.event;
            var b = a.keyCode || a.which;
            if (!(b >= 48 && b <= 57)) {
                if (8 != b && 46 != b) return !1;
                if ("." == a.key) return !1
            }
        })
    },
    usersNoContract: function() {
        if (!$("#newContract").hasClass("hide")) return !1;
        globalVar.userNoContracts = [];
        var a = {
                username: "",
                status: ""
            },
            b = (sessionStorage.getItem("regDate").split("-")[0], {
                startRegDate: "2016-01-01",
                downlineType: 1,
                userType: 1
            });
        TCG.Ajax({
            url: "./getContractualDividendInfo",
            data: a
        }, function(a) {
            if (a.status) {
                for (var c = [], d = a.result.footer.seriesRestriction, e = 0; e < a.result.downline.length; e++) "C" != a.result.downline[e].status && "R" != a.result.downline[e].status && "V" != a.result.downline[e].status && c.push(a.result.downline[e].receiver);
                a.result.agent.length > 0 ? globalVar.contractMaxRate = a.result.agent[a.result.agent.length - 1].contractRate : globalVar.contractMaxRate = a.result.footer.maxRate, globalVar.contractMinRate = a.result.footer.minRate, TCG.Ajax({
                    url: "./agentSet/getAgentDownlines",
                    data: b
                }, function(a) {
                    if (a.status && null !== a.result && "object" == typeof a.result) {
                        var b = [];
                        if (null !== a.result.list && a.result.list instanceof Array && a.result.list.length > 0) {
                            for (var e = 0; e < a.result.list.length; e++) a.result.list[e].sscRebate >= d && b.push(a.result.list[e].customerName);
                            globalVar.userNoContracts = b.filter(function(a) {
                                return -1 == c.indexOf(a)
                            }), null !== globalVar.userNoContracts && globalVar.userNoContracts instanceof Array && globalVar.userNoContracts.length > 0 && ($("#newContract").removeClass("hide"), control.newContractRequest())
                        }
                    }
                })
            }
        })
    },
    getAgentDividendRecord: function(a) {
        var b = {
            gameType: 4
        };
        $(".model_child_content").prepend('<div id="loading"></div>'), TCG.Ajax({
            url: "./agent/getCommissionReport",
            data: b
        }, function(a) {
            a.status ? UI.loadAgentDividendRecord(a.result) : TCG.Alert("errors", TCG.Prop(a.description), "", function() {
                $("div.model_child_content #loading").remove()
            }), $("div.model_child_content #loading").remove()
        }), TCG.Ajax({
            url: "./getContractualDividendInfo"
        }, function(a) {
            a.status ? UI.loadAgentContract(a.result.agent) : TCG.Alert("errors", TCG.Prop(a.description), "", function() {
                $("div.model_child_content #loading").remove()
            }), $("div.model_child_content #loading").remove()
        }), control.newContractRequest()
    },
    switchAgentDividendTab: function(a, b) {
        switch ($("#switchAgentDividend li.active").removeClass("active"), $(b).addClass("active"), $(".contentTab").addClass("hide"), $("#" + a).removeClass("hide"), a) {
            case "dividendReportContent":
                $("#newContract").addClass("hide"), control.getAgentDividendRecord(), control.usersNoContract();
                break;
            case "contractManagementContent":
                $("#newContract").addClass("hide"), $("#editContract").addClass("hide"), $("#contractManagement").removeClass("hide"), control.usersNoContract(), control.getReceiverScreen();
                break;
            case "disbursementContent":
                $("#newContract").addClass("hide"), $("#disbursementContent").removeClass("hide"), $("#disbursementContent .form-submit").click();
                break;
            case "defualtDvdtContent":
                control.getAgentDividendRecord("default")
        }
    },
    getReceiverScreen: function() {
        TCG.Ajax({
            url: "./getContractualDividendRequest"
        }, function(a) {
            if (a.result.length > 0) {
                $(".divident-main-wrapepr").addClass("hide"), $(".receiver-dvdnt").removeClass("hide");
                var b = a.result;
                b.sort(function(a, b) {
                    return a.minimumBet - b.minimumBet
                });
                for (var c = "", d = 0; d < b.length; d++) c += '<div class="reciever-content">', c += '<div class="r-betVolume po-middle">半月≥' + b[d].minimumBet + "元</div>", c += '<div class="r-amember po-middle">' + b[d].activeMember + "人</div>", c += '<div class="r-drate po-middle">' + control.percentRate(b[d].contractRate, "rateToPercent") + "</div>", c += "</div>";
                $("#receiverList").html(c), $(".approve").unbind("click").bind("click", function() {
                    var a = {
                        status: "A"
                    };
                    TCG.Ajax({
                        url: "./processDividendRequest",
                        data: a
                    }, function(a) {
                        a.status ? TCG.Alert("success", TCG.Prop(a.description), "", function() {
                            sessionStorage.removeItem("contract"), $(".divident-main-wrapepr").removeClass("hide"), $(".receiver-dvdnt").addClass("hide"), $("#switchAgentDividend li[data-rel='dividendReportContent']").trigger("click"), $("div.model_child_content #loading").remove()
                        }) : TCG.Alert("errors", TCG.Prop(a.description), "", function() {
                            $(".divident-main-wrapepr").removeClass("hide"), $(".receiver-dvdnt").addClass("hide"), $("#switchAgentDividend li[data-rel='dividendReportContent']").trigger("click"), $("div.model_child_content #loading").remove()
                        }), $(".request").removeClass("processing")
                    })
                }), $(".reject").unbind("click").bind("click", function() {
                    var a = {
                        status: "R"
                    };
                    TCG.Ajax({
                        url: "./processDividendRequest",
                        data: a
                    }, function(a) {
                        a.status ? TCG.Alert("success", TCG.Prop(a.description), "", function() {
                            $("#popup_close").trigger("click"), globalVar.enableDividentRecord = !1
                        }) : TCG.Alert("errors", TCG.Prop(a.description), "", function() {
                            $("div.model_child_content #loading").remove()
                        }), $(".request").removeClass("processing")
                    })
                })
            } else $("#contractManagement .form-submit").click()
        })
    },
    getContractManagementList: function() {
        var a, b = $("#contractManagementForm"),
            c = b.find("[name='username']"),
            d = b.find("[name='status']"),
            e = b.find(".form-submit"),
            f = $("#contractManagement [name='inputPageNo']"),
            g = !1;
        "" != f.val() && void 0 != f.val() || f.val("1");
        var h = {
                username: c.val(),
                status: d.val()
            },
            i = (sessionStorage.getItem("regDate").split("-")[0], {
                startRegDate: "2016-01-01",
                downlineType: 1,
                userType: 1
            });
        a = "" != c.val() && c.val(), e.hasClass("processing") || (e.addClass("processing"), TCG.Ajax({
            url: "./agentSet/getAgentDownlines",
            data: i
        }, function(b) {
            b.status ? ("P" != d.val() && "A" != d.val() || (b.result.list = []), null === b.result && (b.result = {}, b.result.list = []), "N" == h.status && (g = !0, h.status = ""), TCG.Ajax({
                url: "./getContractualDividendInfo",
                data: h
            }, function(c) {
                if (c.status) {
                    UI.loadContractManagementList(c.result, b.result.list, a, g);
                    var d = c.result.footer.pageSize;
                    Math.ceil(c.result.footer.total / d);
                    control.viewContractRates(), control.contractualDividendLog(), c.result.agent.length > 0 ? globalVar.contractMaxRate = c.result.agent[c.result.agent.length - 1].contractRate : globalVar.contractMaxRate = c.result.footer.maxRate, globalVar.contractMinRate = c.result.footer.minRate, $("div.model_child_content #loading").remove()
                } else TCG.Alert("errors", TCG.Prop(c.description), "", function() {
                    $("div.model_child_content #loading").remove()
                })
            }), e.removeClass("processing")) : (TCG.Alert("errors", TCG.Prop(b.description), "", function() {
                $("div.model_child_content #loading").remove()
            }), e.removeClass("processing")), $("div.model_child_content #loading").remove()
        }))
    },
    viewContractRates: function() {
        $("#contractManagementList .viewList").unbind("click").bind("click", function(a) {
            var b = $(this).attr("data-targetCustomer"),
                c = $(this).attr("data-mode"),
                d = {
                    username: b,
                    details: 1
                };
            "view" == c ? ($(".add-contract").addClass("hide"), $("#editContract .prsnl-title-row3").text("签约详情"), $("#editContract .form-submit").parent().hide(), $("#editContract .top-contner .cancel_req").hide(), $(".backToContractManagement").val("返回"), $(".backToContractManagement").parent().addClass("view"), $("#cmContentRebates").removeClass("adjust")) : ($(".add-contract").addClass("hide"), $("#newContract").addClass("hide"), $("#editContract .prsnl-title-row3").text("新增/修改签约"), $("#editContract .form-submit").parent().show(), $("#editContract .top-contner .cancel_req").show(), $(".backToContractManagement").val("返回"), $(".backToContractManagement").parent().removeClass("view"), $("#cmContentRebates").removeClass("adjust")), $("#contractName").html(b), $("#contractName").removeClass("hide"), $("#usernameSelect").addClass("hide"), $('select[name="usernames"]').chosen("destroy"), $("#contractName").html(b), $(".contractList").html(""), $("#contractManagement").addClass("hide"), $("#editContract").removeClass("hide"), TCG.Ajax({
                url: "./getContractualDividendInfo",
                data: d
            }, function(a) {
                a.status ? (UI.loadContractManagementListDownlines(a, c), "view" != c && (globalVar.deletedIds = [], control.addContractItem("edit"))) : TCG.Alert("errors", TCG.Prop(a.description))
            })
        })
    },
    sendContractRequest: function() {
        $("#contractManagementList .request").unbind("click").bind("click", function() {
            $("#editContract .prsnl-title-row3").text("新增/修改签约"), $("#editContract .form-submit").parent().show(), $("#editContract .top-contner .cancel_req").show(), $(".backToContractManagement").val("取消"), $(".backToContractManagement").parent().removeClass("view"), $("#cmContentRebates").removeClass("adjust"), $("#newContract").addClass("hide");
            var a = $(this).attr("data-targetCustomer");
            $("#contractName").html(a), $("#contractName").removeClass("hide"), $("#usernameSelect").addClass("hide"), $("#contractManagement").addClass("hide"), $(".add-contract .d-rnumber").text("1"), $("#editContract").removeClass("hide"), $(".add-contract").removeClass("hide"), $(".contractList").html(""), globalVar.deletedIds = [], control.addContractItem("new")
        })
    },
    newContractRequest: function() {
        $("#newContract").unbind("click").bind("click", function() {
            $("#editContract .prsnl-title-row3").text("新增/修改签约"), $("#editContract .form-submit").parent().show(), $("#editContract .top-contner .cancel_req").show(), $(".backToContractManagement").val("取消"), $(".backToContractManagement").parent().removeClass("view"), $("#cmContentRebates").addClass("adjust"), $("#newContract").addClass("hide"), $("#switchAgentDividend li").removeClass("active"), $("#switchAgentDividend li[data-rel='contractManagementContent']").addClass("active"), $("#contractManagementContent").removeClass("hide"), $("#dividendReportContent").addClass("hide"), $("#disbursementContent").addClass("hide"), $("#defualtDvdtContent").addClass("hide"), $("#contractManagement").addClass("hide"), $(".add-contract .d-rnumber").text("1"), $("#editContract").removeClass("hide"), $("#contractName").addClass("hide"), $("#usernameSelect").removeClass("hide"), $("#contractManagementForm .d-action").addClass("hide"), $('select[name="usernames"]').html("");
            for (var a = globalVar.userNoContracts, b = 0; b < a.length; b++) $('select[name="usernames"]').append($("<option></option>").attr("value", a[b]).text(a[b]));
            control.customSelect("select[name='usernames']", !1), $("#contractManagement").addClass("hide"), $("#editContract").removeClass("hide"), $(".add-contract").removeClass("hide"), $(".contractList").html(""), globalVar.deletedIds = [], control.addContractItem("new")
        })
    },
    addContractItem: function(a) {
        $(".pop-yellow#rate").text(control.limit("contract"));
        var b = "";
        b = $("#contractName").hasClass("hide") ? $("select[name='usernames'] :selected").val() : $("#contractName").text(), $(".add-action").unbind("click").bind("click", function(b) {
            var c = "",
                d = "",
                e = $("#cmContentRebates .divident-content-wrp").length + 1,
                f = {
                    itemNo: $(this).parents(".add-contract").find(".d-rnumber").text(),
                    betVolume: $(this).parents(".add-contract").find(".add-betVolume input").val(),
                    actMember: $(this).parents(".add-contract").find(".add-act-member input").val(),
                    actRate: $(this).parents(".add-contract").find(".add-rate input").val()
                };
            control.validateContractInput("contract") && ($(".contractList div.divident-content-wrp .d-action").removeClass("action-btn").text("-"), c += '<div class="divident-content-wrp add-contract">', c += '<div class="d-rnumber">' + e + "</div>", c += '<div class="add-betVolume"><input type="text" id="cm_betVolume" class="txt-input-prsnl mem-icon"></input></div>', c += '<div class="add-act-member"><input type="text" id="cm_actMember" class="txt-input-prsnl mem-icon"></input></div>', c += '<div class="add-rate action-btn"><input type="text" id="cm_rate" class="txt-input-prsnl mem-icon"></input><div class="pop-yellow" id="rate"></div></div>', c += '<div class="add-action action-btn">添加</div>', c += "</div>", $("#cmContentRebates").append(c), d += '<div class="divident-content-wrp new">', d += '<div class="d-rnumber">' + f.itemNo + "</div>", d += '<div class="d-betVolume">' + f.betVolume + "</div>", d += '<div class="d-act-member">' + f.actMember + "</div>", d += '<div class="d-rate">' + f.actRate + "%</div>", d += '<div class="d-action">-</div>', d += "</div>", $(".contractList").append(d), $("#cmContentRebates .contractList div:last").addClass("action-btn").text("删除"), $(this).parents(".add-contract").remove(), control.addContractItem(a))
        }), $(".d-action").unbind("click").bind("click", function(a) {
            if ("删除" != $(this).text()) return !1;
            globalVar.deletedIds.push($(this).siblings(".d-rnumber").attr("data-requestId")), $(this).parents(".divident-content-wrp").remove();
            var b = $(".contractList .divident-content-wrp");
            for (i = 0; i <= b.length; i++) $(".contractList div.divident-content-wrp:nth-child(" + i + ")").find(".d-rnumber").html(i);
            $(".contractList .d-rnumber:first").text("1"), $(".add-contract .d-rnumber").html(b.length + 1), $("#cmContentRebates .contractList div:last").addClass("action-btn").text("删除")
        });
        var c = {},
            d = {};
        $("#editContract .request").unbind("click").bind("click", function() {
            var e = $(this);
            c.targetCustomer = b, c.requestedRate = "", c.betVolume = "", c.activeMember = "", c.type = "LOTT", d.downline = b, d.rate = "", d.status = "E", d.betVolume = "", d.activeMember = "", d.type = "LOTT";
            var f = [],
                g = [],
                h = [],
                j = $(".contractList div.divident-content-wrp.new");
            for (i = 0; i < j.length; i++) {
                var k = $(".d-betVolume", j[i]).text(),
                    l = $(".d-act-member", j[i]).text(),
                    m = $(".d-rate", j[i]).text(),
                    m = control.percentRate(m, "rateToDecimal");
                f.push(k), g.push(l), h.push(m)
            }
            if ("" != $("#cm_betVolume").val() && "" != $("#cm_actMember").val() && "" != $("#cm_rate").val()) {
                if (!control.validateContractInput("contract")) return !1;
                f.push($("#cm_betVolume").val()), g.push($("#cm_actMember").val()), h.push(control.percentRate($("#cm_rate").val() + "%", "rateToDecimal"))
            } else if (0 == $(".divident-content-wrp.new").length && 1 == $(".divident-content-wrp").length) return control.validateContractInput("contract"), !1;
            var k = f.filter(function(a) {
                    return void 0 !== a
                }),
                n = g.filter(function(a) {
                    return void 0 !== a
                }),
                m = h.filter(function(a) {
                    return void 0 !== a
                });
            if (c.betVolume = k.join(","), c.activeMember = n.join(","), c.requestedRate = m.join(","), d.betVolume = k.join(","), d.activeMember = n.join(","), d.rate = m.join(","), !e.hasClass("processing")) {
                if (e.addClass("processing"), "new" != a) {
                    var o = globalVar.deletedIds.filter(function(a) {
                            return void 0 !== a
                        }),
                        p = {
                            downline: $("#contractName").text(),
                            requestId: o.join(","),
                            status: "C"
                        };
                    return "" != p.requestId && TCG.Ajax({
                        url: "./updateContractualDividend",
                        data: p
                    }, function(a) {
                        a.status ? TCG.Alert("success", TCG.Prop(a.description), "", function() {
                            $("div.model_child_content #loading").remove()
                        }) : TCG.Alert("errors", TCG.Prop(a.description), "", function() {
                            $("div.model_child_content #loading").remove()
                        }), e.removeClass("processing")
                    }), "" != d.betVolume && "" != d.activeMember && "" != d.rate && TCG.Ajax({
                        url: "./updateContractualDividend",
                        data: d
                    }, function(a) {
                        a.status ? TCG.Alert("success", TCG.Prop(a.description), "", function() {
                            $(".backToContractManagement").click(), $("div.model_child_content #loading").remove()
                        }) : (TCG.Alert("errors", TCG.Prop(a.description), "", function() {
                            $("div.model_child_content #loading").remove()
                        }), e.removeClass("processing"))
                    }), e.removeClass("processing"), !1
                }
                TCG.Ajax({
                    url: "./applyContractualDividend",
                    data: c
                }, function(a) {
                    a.status ? TCG.Alert("success", TCG.Prop("contractDividend_add_success"), "", function() {
                        $(".backToContractManagement").click()
                    }) : TCG.Alert("errors", TCG.Prop(a.description), "", function() {
                        $("div.model_child_content #loading").remove()
                    }), $("div.model_child_content #loading").remove(), e.removeClass("processing")
                })
            }
        })
    },
    voidContract: function() {
        $("#contractManagementList .void").unbind("click").bind("click", function() {
            var a = ($(this).attr("data-contractRate"), $(this).attr("data-targetCustomer")),
                b = ($(this).attr("data-requestId"), {
                    status: "C",
                    downline: a
                });
            $(this).hasClass("processing") || ($("#contractManagementList .void").addClass("processing"), TCG.Confirm("确定解除与" + a + "的签约分红？", "", function(a) {
                a ? TCG.Ajax({
                    url: "./updateContractualDividend",
                    data: b
                }, function(a) {
                    a.status ? (TCG.Alert("success", TCG.Prop(a.description)), $("#contractManagement .form-submit").click()) : TCG.Alert("errors", TCG.Prop(a.description)), $("#contractManagementList .void").removeClass("processing")
                }) : $("#contractManagementList .void").removeClass("processing")
            }))
        })
    },
    percentRate: function(a, b) {
        switch (b) {
            case "rateToPercent":
                return parseInt(100 * a) + "%";
            case "rateToDecimal":
                return a = a.replace("%", ""), parseFloat(a / 100).toFixed(3)
        }
    },
    validateContractInput: function(a) {
        var b = $(".add-contract"),
            c = b.find("#cm_betVolume"),
            d = b.find("#cm_actMember"),
            e = b.find("#cm_rate"),
            f = $("#cmContentRebates > div." + a + "List > div:last"),
            g = $(".d-betVolume", f),
            h = $(".d-act-member", f),
            i = $(".d-rate", f),
            j = i.text().replace("%", "");
        return "" == c.val() || "" == d.val() || "" == e.val() ? (TCG.Alert("errors", "不可为空"), !1) : regExPattern("numberOnly", c.val()) && regExPattern("numberOnly", d.val()) && regExPattern("decimalNum", e.val()) ? parseInt(c.val()) <= parseInt(g.text()) ? (TCG.Alert("errors", "当前投注额必须高于上一个投注额"), !1) : parseInt(d.val()) <= parseInt(h.text()) ? (TCG.Alert("errors", "当前活跃会员必须高于上一个活跃会员"), !1) : parseInt(e.val()) <= parseInt(j) ? (TCG.Alert("errors", "当前分红比例必须高于上一个分红比例"), !1) : parseInt(e.val()) >= 100 * globalVar.contractMaxRate ? (TCG.Alert("errors", "分红比例必须低于最高值"), !1) : !(parseInt(e.val()) <= 100 * globalVar.contractMinRate) || (TCG.Alert("errors", "分红比例必须高于最低值"), !1) : (TCG.Alert("errors", "只能输入数字"), !1)
    },
    backToContractManagement: function() {
        $(document).off("click", ".backToContractManagement").on("click", ".backToContractManagement", function() {
            control.usersNoContract(), $('select[name="usernames"]').chosen("destroy"), $("#contractManagementForm .d-action").addClass("hide"), $("#contractManagementList").html(""), $("#contractManagementForm .form-submit").click(), $("#editContract").addClass("hide"), $("#contractManagement").removeClass("hide"), $(".add-contract input").each(function() {
                $(this).val("")
            })
        })
    },
    getDisbursementList: function() {
        var a = $("#disbursementForm"),
            b = a.find("[name='startTime']"),
            c = a.find("[name='endTime']"),
            d = a.find("[name='receiver']"),
            e = a.find("[name='status']"),
            f = a.find(".form-submit"),
            g = {
                startDate: b.val(),
                endDate: c.val(),
                receiver: d.val(),
                status: e.val()
            };
        f.hasClass("processing") || (f.addClass("processing"), TCG.Ajax({
            url: "./getDisbursementRecords",
            data: g
        }, function(a) {
            a.status ? (UI.loadDisbursementList(a.result), control.disburseContractDividend()) : TCG.Alert("errors", TCG.Prop(a.description), "", function() {
                $("div.model_child_content #loading").remove()
            }), $("div.model_child_content #loading").remove(), f.removeClass("processing")
        }))
    },
    disburseContractDividend: function() {
        $("#disbursementList .disburse").unbind("click").bind("click", function() {
            var a = {
                id: $(this).attr("id"),
                downlineId: $(this).attr("data-beneficiaryId")
            };
            TCG.Confirm("是否派发签约分红", "", function(b) {
                b && TCG.Ajax({
                    url: "./disburseContractDividend",
                    data: a
                }, function(a) {
                    a.status ? TCG.Alert("success", TCG.Prop(a.description), "", function() {
                        $("#disbursementForm input[type='button']").trigger("click")
                    }) : TCG.Alert("errors", TCG.Prop(a.description), "", function() {
                        $("div.model_child_content #loading").remove()
                    }), $("div.model_child_content #loading").remove()
                })
            })
        })
    },
    limit: function(a) {
        var b, c;
        return "contract" == a ? (b = globalVar.contractMinRate, c = globalVar.contractMaxRate, "比例范围: " + Math.round(100 * b + 1) + "% ～" + Math.round(100 * c - 1) + "%") : (b = globalVar.salaryMinRate, c = globalVar.salaryMaxRate, "比例范围: " + 100 * b + "% ～" + (100 * c).toFixed(1) + "%")
    },
    contractualDividendLog: function() {
        $("#contractManagementList .log").unbind("click").bind("click", function(a) {
            var b = $(this),
                c = b.attr("data-receiverId"),
                d = {
                    downline: c
                };
            b.hasClass("processing") || (b.addClass("processing"), TCG.Ajax({
                url: "./getContractHistoryLog",
                data: d
            }, function(a) {
                b.removeClass("processing"), a.status ? UI.loadContractualHistoryLog(a.result) : TCG.Alert("errors", TCG.Prop(a.description), "", function() {
                    $("div.model_child_content #loading").remove()
                }), $("div.model_child_content #loading").remove()
            }))
        })
    },
    checkContractRequest: function() {
        TCG.Ajax({
            url: "./getContractualDividendRequest"
        }, function(a) {
            a.result.length > 0 && (globalVar.enableDividentRecord = !0, sessionStorage.setItem("contract", !0), "P" == a.result[0].status || "E" == a.result[0].status ? TCG.Confirm("您的上级发起了签约分红，请查看协议，谢谢", "", function(a) {
                a && ($("#leftMenu .sb-agent").trigger("click"), setTimeout(function() {
                    $("#popup_content .model_child_menus li[data-submenu='agentDividendRecord']").trigger("click"), setTimeout(function() {
                        $("#switchAgentDividend li[data-rel='contractManagementContent']").trigger("click")
                    }, 20)
                }, 20))
            }) : TCG.Confirm("上级发起了解约，是否同意解约？", "", function(a) {
                var b = {};
                a ? (b.status = "C", TCG.Ajax({
                    url: "./processDividendRequest",
                    data: b
                }, function(a) {
                    a.status ? TCG.Alert("success", TCG.Prop(a.description), "", function() {
                        globalVar.enableDividentRecord = !1, sessionStorage.removeItem("contract"), $("div.model_child_content #loading").remove()
                    }) : TCG.Alert("errors", TCG.Prop(a.description), "", function() {
                        $("div.model_child_content #loading").remove()
                    }), $(".request").removeClass("processing")
                })) : (b.status = "A", TCG.Ajax({
                    url: "./processDividendRequest",
                    data: b
                }, function(a) {
                    a.status ? TCG.Alert("success", TCG.Prop(a.description), "", function() {
                        sessionStorage.removeItem("contract"), $("div.model_child_content #loading").remove()
                    }) : TCG.Alert("errors", TCG.Prop(a.description), "", function() {
                        sessionStorage.removeItem("contract"), $("div.model_child_content #loading").remove()
                    }), $(".request").removeClass("processing")
                }))
            }, " 同意解约", "拒绝解约"))
        })
    },
    dailySalaryReport: function() {
        var a = new Date(control.getServerTime()),
            b = a.getHours(),
            c = a.getMinutes();
        (c = c <= 29 ? 29 : c) >= 29 && 0 == b && (b = 1, c = 29), "1:29" == b + ":" + c ? TCG.Alert("errors", TCG.Prop("dailySalary_error_0130"), null, function() {
            $("#popup_close").click()
        }) : (control.countUnreadMessage(), control.switchSalaryTabs(), control.customSelect("#dailySalaryForm select"), control.backToDailySalary(), control.salaryRateType(), $("#dailySalaryForm .form-submit").unbind("click").bind("click", function() {
            control.getDailySalaryList()
        }), control.customSelect("#salaryDisbursementForm select"), control.datepickerStartEnd($("#salaryDisbursementForm [name='startTime']"), $("#salaryDisbursementForm [name='endTime']"), "-1"), $("#salaryDisbursementForm .form-submit").unbind("click").bind("click", function() {
            control.getSalaryDisbursementList()
        }), $("#switchSalaryTabs li").unbind("click").bind("click", function() {
            var a = $(this).attr("data-rel");
            control.switchSalaryTabs(a, $(this))
        }), $("#cm_betVolume, #cm_actMember").off().on("keypress", function(a) {
            a = a || window.event;
            var b = a.keyCode || a.which;
            if (!(b >= 48 && b <= 57)) {
                if (8 != b && 46 != b) return !1;
                if ("." == a.key) return !1
            }
        }), $("#cm_rate").off().on("keypress", function(a) {
            a = a || window.event;
            var b = a.keyCode || a.which;
            if ("P" == $('[name="rateType"]').val()) {
                if (b >= 48 && b <= 57 || "." == a.key)
                    if (regExPattern("decimal1Num", $(this).val())) {
                        if ("." == $(this).val()[$(this).val().length - 2]) return !1;
                        if ($(this).val().indexOf(".") > 0 && "." == a.key) return !1
                    } else {
                        if ("" != $(this).val()) return !1;
                        if ("." == a.key) return !1
                    }
                else if (8 != b && 46 != b) return !1
            } else if (!(b >= 48 && b <= 57)) {
                if (8 != b && 46 != b) return !1;
                if ("." == a.key) return !1
            }
        }), "true" === sessionStorage.getItem("salary") ? $("#switchSalaryTabs li[data-rel='dailySalaryContent']").trigger("click") : $("#switchSalaryTabs li[data-rel='dividendReportContent']").trigger("click"))
    },
    switchSalaryTabs: function(a, b) {
        switch ($("#switchSalaryTabs li.active").removeClass("active"), $(b).addClass("active"), $(".contentTab").addClass("hide"), $("#" + a).removeClass("hide"), a) {
            case "dividendReportContent":
                control.usersNoSalary();
                break;
            case "dailySalaryContent":
                $("#editContract").addClass("hide"), $("#dailySalary").removeClass("hide"), control.getSalaryScreen();
                break;
            case "salaryDisbursementContent":
                $("#newContract").addClass("hide"), $("#salaryDisbursementContent").removeClass("hide"), $("#salaryDisbursementContent .form-submit").click()
        }
    },
    usersNoSalary: function() {
        if (!$("#newContract").hasClass("hide")) return !1;
        globalVar.userNoSalary = [];
        var a = {
                username: "",
                status: "",
                type: "LOTT"
            },
            b = (sessionStorage.getItem("regDate").split("-")[0], {
                startRegDate: "2016-01-01",
                downlineType: 1,
                userType: 1
            });
        TCG.Ajax({
            url: "./getContractDailySalaryInfo",
            data: a
        }, function(a) {
            if (a.status) {
                for (var c = [], d = a.result.footer.seriesRestriction, e = 0; e < a.result.downline.length; e++) "C" != a.result.downline[e].status && "R" != a.result.downline[e].status && "V" != a.result.downline[e].status && c.push(a.result.downline[e].receiver);
                globalVar.userMinActiveMember = a.result.agent[a.result.agent.length - 1].details[a.result.agent[a.result.agent.length - 1].details.length - 1].activeMember, UI.loadSalaryAgentRecord(a.result), globalVar.salaryMaxRate = a.result.footer.maxRate, globalVar.salaryMinRate = a.result.footer.minRate, TCG.Ajax({
                    url: "./agentSet/getAgentDownlines",
                    data: b
                }, function(a) {
                    if (a.status && null !== a.result && "object" == typeof a.result && null !== a.result.list && a.result.list instanceof Array && a.result.list.length > 0) {
                        for (var b = 0; b < a.result.list.length; b++)
                            if (a.result.list[b].sscRebate >= d && c.indexOf(a.result.list[b].customerName) < 0) {
                                var e = {};
                                e.customerName = a.result.list[b].customerName, e.customerId = a.result.list[b].customerId, globalVar.userNoSalary.push(e)
                            }
                        null !== globalVar.userNoSalary && globalVar.userNoSalary instanceof Array && globalVar.userNoSalary.length > 0 && ($("#newContract").removeClass("hide"), control.newSalaryRequest())
                    }
                })
            }
        })
    },
    getSalaryScreen: function() {
        TCG.Ajax({
            url: "./getContractualDailySalaryRequest"
        }, function(a) {
            if (a.result.length > 0) {
                $(".contractdaywages-wapper").addClass("hide"), $(".receiver-dvdnt").removeClass("hide");
                var b = a.result[0].details,
                    c = a.result[0].id;
                b.sort(function(a, b) {
                    return a.betVolume - b.betVolume
                });
                for (var d = "", e = 0; e < b.length; e++) d += '<div class="reciever-content">', d += '<div class="r-betVolume po-middle">日量≥' + b[e].betVolume + "元</div>", d += '<div class="r-amember po-middle">' + b[e].activeMember + "人</div>", "P" == b[e].rateType ? d += '<div class="r-drate po-middle">比例' + (100 * b[e].rate).toFixed(1) + "%</div>" : d += '<div class="r-drate po-middle">固定金额' + b[e].rate + "</div>", d += "</div>";
                $("#receiverList").html(d), $(".approve").unbind("click").bind("click", function() {
                    var a = {
                        status: "A",
                        id: c
                    };
                    TCG.Ajax({
                        url: "./processDailySalaryContract",
                        data: a
                    }, function(a) {
                        a.status ? TCG.Alert("success", TCG.Prop(a.description), "", function() {
                            sessionStorage.removeItem("salary"), $(".contractdaywages-wapper").removeClass("hide"), $(".receiver-dvdnt").addClass("hide"), $("#switchSalaryTabs li[data-rel='dividendReportContent']").trigger("click"), $("div.model_child_content #loading").remove()
                        }) : TCG.Alert("errors", TCG.Prop(a.description), "", function() {
                            $(".contractdaywages-wapper").removeClass("hide"), $(".receiver-dvdnt").addClass("hide"), $("#switchSalaryTabs li[data-rel='dividendReportContent']").trigger("click"), $("div.model_child_content #loading").remove()
                        }), $(".request").removeClass("processing")
                    })
                }), $(".reject").unbind("click").bind("click", function() {
                    var a = {
                        status: "R",
                        id: c
                    };
                    TCG.Ajax({
                        url: "./processDailySalaryContract",
                        data: a
                    }, function(a) {
                        a.status ? TCG.Alert("success", TCG.Prop(a.description), "", function() {
                            $("#popup_close").trigger("click"), globalVar.enableDividentRecord = !1
                        }) : TCG.Alert("errors", TCG.Prop(a.description), "", function() {
                            $("div.model_child_content #loading").remove()
                        }), $(".request").removeClass("processing")
                    })
                })
            } else $("#dailySalary .form-submit").click()
        })
    },
    getDailySalaryList: function() {
        var a, b = $("#dailySalaryForm"),
            c = b.find("[name='username']"),
            d = b.find("[name='status']"),
            e = b.find(".form-submit"),
            f = $("#dailySalary [name='inputPageNo']"),
            g = !1;
        "" != f.val() && void 0 != f.val() || f.val("1");
        var h = {
                username: c.val(),
                status: d.val(),
                type: "LOTT"
            },
            i = (sessionStorage.getItem("regDate").split("-")[0], {
                startRegDate: "2016-01-01",
                downlineType: 1,
                userType: 1
            });
        a = "" != c.val() && c.val(), e.hasClass("processing") || (e.addClass("processing"), TCG.Ajax({
            url: "./agentSet/getAgentDownlines",
            data: i
        }, function(b) {
            b.status ? ("P" != d.val() && "A" != d.val() || (b.result.list = []), null === b.result && (b.result = {}, b.result.list = []), "N" == h.status && (g = !0, h.status = ""), TCG.Ajax({
                url: "./getContractDailySalaryInfo",
                data: h
            }, function(c) {
                c.status ? (UI.loadDailySalaryList(c.result, b.result.list, a, g), control.viewSalaryRates(), control.dailySalaryLog(), globalVar.salaryMaxRate = c.result.footer.maxRate, globalVar.salaryMinRate = c.result.footer.minRate, $("div.model_child_content #loading").remove()) : TCG.Alert("errors", TCG.Prop(c.description), "", function() {
                    $("div.model_child_content #loading").remove()
                })
            }), e.removeClass("processing")) : (TCG.Alert("errors", TCG.Prop(b.description), "", function() {
                $("div.model_child_content #loading").remove()
            }), e.removeClass("processing")), $("div.model_child_content #loading").remove()
        }))
    },
    viewSalaryRates: function() {
        $("#dailySalaryList .viewList").unbind("click").bind("click", function(a) {
            var b = $(this).attr("data-targetCustomer"),
                c = $(this).attr("data-mode"),
                d = $(this).attr("data-salaryId"),
                e = $(this).attr("data-receiverId"),
                f = {
                    id: d
                };
            "view" == c ? ($(".add-contract").addClass("hide"), $("#editContract .prsnl-title-row3").text("签约详情"), $("#editContract .form-submit").parent().hide(), $("#editContract .top-contner .cancel_req").hide(), $(".backToDailySalary").val("返回"), $(".backToDailySalary").parent().addClass("view"), $("#cmContentRebates").removeClass("adjust")) : ($(".add-contract").addClass("hide"), $("#newContract").addClass("hide"), $("#editContract .prsnl-title-row3").text("修改签约"), $("#editContract .form-submit").parent().show(), $("#editContract .top-contner .cancel_req").show(), $(".backToDailySalary").val("返回"), $(".backToDailySalary").parent().removeClass("view"), $("#cmContentRebates").removeClass("adjust"), control.customSelect("[name='rateType']")), $("#contractName").html(b), $("#contractName").removeClass("hide"), $("#contractName").attr("data-customerId", e), $("#usernameSelect").addClass("hide"), $('select[name="usernames"]').chosen("destroy"), $("#contractName").html(b), $(".salaryList").html(""), $("#dailySalary").addClass("hide"), $("#editContract").removeClass("hide"), TCG.Ajax({
                url: "./getContractDailySalaryInfo",
                data: f
            }, function(a) {
                a.status ? (UI.loadDailySalaryListDownlines(a, c), "view" != c && (globalVar.deletedIds = [], control.addSalaryItem("edit"))) : TCG.Alert("errors", TCG.Prop(a.description))
            })
        })
    },
    sendSalaryRequest: function() {
        $("#dailySalaryList .request").unbind("click").bind("click", function() {
            $("#editContract .prsnl-title-row3").text("修改签约"), $("#editContract .form-submit").parent().show(), $("#editContract .top-contner .cancel_req").show(), $(".backToDailySalary").val("取消"), $(".backToDailySalary").parent().removeClass("view"), $("#cmContentRebates").removeClass("adjust"), $("#newContract").addClass("hide");
            var a = $(this).attr("data-targetCustomer");
            $("#contractName").html(a), $("#contractName").attr("data-customerId", $(this).attr("data-customerId")), $("#contractName").removeClass("hide"), $("#usernameSelect").addClass("hide"), $("#dailySalary").addClass("hide"), control.customSelect("[name='rateType']"), $(".add-contract .d-rnumber").text("1"), $("#editContract").removeClass("hide"), $(".add-contract").removeClass("hide"), $(".salaryList").html(""), globalVar.deletedIds = [], control.addSalaryItem("new")
        })
    },
    newSalaryRequest: function() {
        $("#newContract").unbind("click").bind("click", function() {
            $("#editContract .prsnl-title-row3").text("修改签约"), $("#editContract .form-submit").parent().show(), $("#editContract .top-contner .cancel_req").show(), $(".backToDailySalary").val("取消"), $(".backToDailySalary").parent().removeClass("view"), $("#cmContentRebates").addClass("adjust"), $("#newContract").addClass("hide"), $("#switchSalaryTabs li").removeClass("active"), $("#switchSalaryTabs li[data-rel='dailySalaryContent']").addClass("active"), $("#dailySalaryContent").removeClass("hide"), $("#dividendReportContent").addClass("hide"), $("#salaryDisbursementContent").addClass("hide"), $("#defualtDvdtContent").addClass("hide"), $("#dailySalary").addClass("hide"), $(".add-contract .d-rnumber").text("1"), $("#editContract").removeClass("hide"), $("#contractName").addClass("hide"), $("#usernameSelect").removeClass("hide"), $("#dailySalaryForm .d-action").addClass("hide"), $('select[name="usernames"]').html("");
            for (var a = globalVar.userNoSalary, b = 0; b < a.length; b++) $('select[name="usernames"]').append($("<option></option>").attr("value", a[b].customerId).text(a[b].customerName));
            control.customSelect("[name='rateType']"), control.customSelect("select[name='usernames']", !1), $("#dailySalary").addClass("hide"), $("#editContract").removeClass("hide"), $(".add-contract").removeClass("hide"), $(".salaryList").html(""), globalVar.deletedIds = [], control.addSalaryItem("new")
        })
    },
    addSalaryItem: function(a) {
        $(".pop-yellow#rate").text(control.limit("salary"));
        var b = "";
        $(".add-action").unbind("click").bind("click", function(b) {
            var c = "",
                d = "",
                e = $("#cmContentRebates .divident-content-wrp").length + 1,
                f = {
                    itemNo: $(this).parents(".add-contract").find(".d-rnumber").text(),
                    betVolume: $(this).parents(".add-contract").find(".add-betVolume input").val(),
                    actMember: $(this).parents(".add-contract").find(".add-act-member input").val(),
                    rateType: $(this).parents(".add-contract").find("[name='rateType'] option:selected"),
                    actRate: $(this).parents(".add-contract").find(".add-rate input").val()
                };
            control.validateSalaryInput("salary") && ($(".salaryList div.divident-content-wrp .d-action").removeClass("action-btn").text("-"), c += '<div class="divident-content-wrp add-contract">', c += '<div class="d-rnumber">' + e + "</div>", c += '<div class="add-betVolume"><input type="text" id="cm_betVolume" class="txt-input-prsnl mem-icon"></input></div>', c += '<div class="add-act-member"><input type="text" id="cm_actMember" class="txt-input-prsnl mem-icon"></input> </div>', c += '<div class="add-rateType slect-box-custom-large mem-icon po-middle"><select class="ch333 ch_block ch_overyd" name="rateType"><option value="P">比例</option><option value="F">固定金额</option></select></div>', c += '<div class="add-rate action-btn"><input type="text" id="cm_rate" class="txt-input-prsnl mem-icon"></input><div class="pop-yellow" id="rate"></div></div>', c += '<div class="add-action action-btn">添加</div>', c += "</div>", $("#cmContentRebates").append(c), control.customSelect("[name='rateType']"),
                "F" == f.rateType.val() ? f.rate = f.actRate / f.betVolume : (f.rate = control.percentRate(f.actRate, "rateToDecimal"), f.actRate += "%"), d += '<div class="divident-content-wrp new">', d += '<div class="d-rnumber">' + f.itemNo + "</div>", d += '<div class="d-betVolume">' + f.betVolume + "</div>", d += '<div class="d-act-member">' + f.actMember + "</div>", d += '<div class="d-rate-type" data-rateType="' + f.rateType.val() + '">' + f.rateType.text() + "</div>", d += '<div class="d-rate" data-rate="' + f.rate + '">' + f.actRate + "</div>", d += '<div class="d-action">-</div>', d += "</div>", $(".salaryList").append(d), $("#cmContentRebates .salaryList div:last").addClass("action-btn").text("删除"), $(this).parents(".add-contract").remove(), control.addSalaryItem(a))
        }), $(".d-action").unbind("click").bind("click", function(a) {
            if ("删除" != $(this).text()) return !1;
            globalVar.deletedIds.push($(this).siblings(".d-rnumber").attr("data-requestId")), $(this).parents(".divident-content-wrp").remove();
            var b = $(".salaryList .divident-content-wrp");
            for (i = 0; i <= b.length; i++) $(".salaryList div.divident-content-wrp:nth-child(" + i + ")").find(".d-rnumber").html(i);
            $(".salaryList .d-rnumber:first").text("1"), $(".add-contract .d-rnumber").html(b.length + 1), $("#cmContentRebates .salaryList div:last").addClass("action-btn").text("删除")
        });
        var c = {};
        $("#editContract .request").unbind("click").bind("click", function() {
            b = $("#contractName").hasClass("hide") ? $("select[name='usernames'] :selected").val() : $("#contractName").attr("data-customerId");
            var a = $(this);
            c.downlineId = b, c.requestedRate = "", c.gameType = "LOTT", c.betVolume = "", c.activeMembers = "", c.rateTypes = "";
            var d = [],
                e = [],
                f = [],
                g = [],
                h = $(".salaryList div.divident-content-wrp");
            for (i = 0; i < h.length; i++) {
                var j = $(".d-betVolume", h[i]).text(),
                    k = $(".d-act-member", h[i]).text(),
                    l = $(".d-rate-type", h[i]).attr("data-rateType"),
                    m = $(".d-rate", h[i]).text();
                "P" == l && (m = control.percentRate(m, "rateToDecimal")), d.push(j), e.push(k), f.push(l), g.push(m)
            }
            if ("" != $("#cm_betVolume").val() && "" != $("#cm_actMember").val() && "" != $("#cm_rate").val()) {
                if (!control.validateSalaryInput("salary")) return !1;
                d.push($("#cm_betVolume").val()), e.push($("#cm_actMember").val()), f.push($("[name='rateType']").val()), "P" == $("[name='rateType']").val() ? g.push(control.percentRate($("#cm_rate").val(), "rateToDecimal")) : g.push($("#cm_rate").val())
            } else if (0 == $(".divident-content-wrp.new").length && 1 == $(".divident-content-wrp").length) return control.validateSalaryInput("salary"), !1;
            var j = d.filter(function(a) {
                    return void 0 !== a
                }),
                n = e.filter(function(a) {
                    return void 0 !== a
                }),
                o = f.filter(function(a) {
                    return void 0 !== a
                }),
                m = g.filter(function(a) {
                    return void 0 !== a
                });
            c.betVolume = j.join(","), c.activeMembers = n.join(","), c.rateTypes = o.join(","), c.requestedRate = m.join(","), a.hasClass("processing") || (a.addClass("processing"), TCG.Ajax({
                url: "./applyContractDailySalary",
                data: c
            }, function(b) {
                b.status ? TCG.Alert("success", TCG.Prop("contractDividend_add_success"), "", function() {
                    $(".backToDailySalary").click()
                }) : TCG.Alert("errors", TCG.Prop(b.description), "", function() {
                    $("div.model_child_content #loading").remove()
                }), $("div.model_child_content #loading").remove(), a.removeveClass("processing")
            }))
        })
    },
    getSalaryDisbursementList: function() {
        var a = $("#salaryDisbursementForm"),
            b = a.find("[name='startTime']"),
            c = a.find("[name='endTime']"),
            d = a.find("[name='receiver']"),
            e = a.find("[name='status']"),
            f = a.find(".form-submit"),
            g = new Date(b.val()).getTime(),
            h = new Date(c.val()).getTime(),
            i = control.dayDifference(g, h),
            j = {
                startDate: b.val(),
                endDate: c.val(),
                receiver: d.val(),
                status: e.val(),
                gameType: 4
            };
        if (i > 7) return void TCG.Alert("errors", TCG.Prop("date_exceed_7_days"), "", function() {
            $("div.model_child_content #loading").remove()
        });
        f.hasClass("processing") || (f.addClass("processing"), TCG.Ajax({
            url: "./getContractDailySalaryDisbursementRecords",
            data: j
        }, function(a) {
            a.status ? UI.loadSalaryDisbursementList(a.result) : TCG.Alert("errors", TCG.Prop(a.description), "", function() {
                $("div.model_child_content #loading").remove()
            }), $("div.model_child_content #loading").remove(), f.removeClass("processing")
        }))
    },
    backToDailySalary: function() {
        $(document).off("click", ".backToDailySalary").on("click", ".backToDailySalary", function() {
            $('select[name="usernames"]').chosen("destroy"), $("#dailySalaryForm .d-action").addClass("hide"), $("#dailySalaryList").html(""), $("#dailySalaryForm .form-submit").click(), $("#editContract").addClass("hide"), $("#dailySalary").removeClass("hide"), $(".add-contract input").each(function() {
                $(this).val("")
            })
        })
    },
    salaryRateType: function() {
        $(document).off("change", "[name='rateType']").on("change", "[name='rateType']", function() {
            $("#cm_rate").val("")
        })
    },
    dailySalaryLog: function() {
        $("#dailySalaryList .log").unbind("click").bind("click", function(a) {
            var b = $(this),
                c = b.attr("data-receiverId"),
                d = {
                    downline: c
                };
            b.hasClass("processing") || (b.addClass("processing"), TCG.Ajax({
                url: "./getDailySalaryContractHistoryLog",
                data: d
            }, function(a) {
                b.removeClass("processing"), a.status ? UI.loadContractualHistoryLog(a.result) : TCG.Alert("errors", TCG.Prop(a.description), "", function() {
                    $("div.model_child_content #loading").remove()
                }), $("div.model_child_content #loading").remove()
            }))
        })
    },
    voidSalary: function() {
        $("#dailySalaryList .void").unbind("click").bind("click", function() {
            var a = $(this).attr("data-targetCustomer"),
                b = $(this).attr("data-requestId"),
                c = {
                    status: "V",
                    id: b
                };
            $(this).hasClass("processing") || ($("#dailySalaryList .void").addClass("processing"), TCG.Confirm("确定解除与" + a + "的签约日工资？", "", function(a) {
                a ? TCG.Ajax({
                    url: "./processDailySalaryContract",
                    data: c
                }, function(a) {
                    a.status ? (TCG.Alert("success", TCG.Prop(a.description)), $("#dailySalary .form-submit").click()) : TCG.Alert("errors", TCG.Prop(a.description)), $("#dailySalaryList .void").removeClass("processing")
                }) : $("#dailySalaryList .void").removeClass("processing")
            }))
        })
    },
    validateSalaryInput: function(a) {
        var b, c = $(".add-contract"),
            d = c.find("#cm_betVolume"),
            e = c.find("#cm_actMember"),
            f = c.find("[name='rateType']"),
            g = c.find("#cm_rate");
        b = "F" == f.val() ? g.val() / d.val() : control.percentRate(g.val() + "%", "rateToDecimal");
        var h = $("#cmContentRebates > div." + a + "List > div:last"),
            i = $(".d-betVolume", h),
            j = ($(".d-act-member", h), $(".d-act-member", h), $(".d-rate", h));
        j.attr("data-rate");
        return "" == d.val() || "" == e.val() || "" == g.val() ? (TCG.Alert("errors", "不可为空"), !1) : regExPattern("numberOnly", d.val()) && regExPattern("numberOnly", e.val()) && regExPattern("decimalNum", g.val()) ? parseFloat(d.val()) <= parseFloat(i.text()) ? (TCG.Alert("errors", "当前投注额必须高于上一个投注额"), !1) : parseFloat(b) > parseFloat(globalVar.salaryMaxRate) ? (TCG.Alert("errors", "日工资比例必须低于最高值"), !1) : parseFloat(b) < parseFloat(globalVar.salaryMinRate) ? (TCG.Alert("errors", "比例必须高于最低值"), !1) : "F" != e.val() || (!!regExPattern("numberOnly", g.val()) || (TCG.Alert("errors", "请输入完整的号码"), !1)) : (TCG.Alert("errors", "只能输入数字"), !1)
    },
    checkSalaryRequest: function() {
        TCG.Ajax({
            url: "./getContractualDailySalaryRequest"
        }, function(a) {
            if (a.result.length > 0) {
                var b = a.result[0].id;
                globalVar.enableSalaryRecord = !0, sessionStorage.setItem("salary", !0), "P" == a.result[0].status || "E" == a.result[0].status ? TCG.Confirm("日工资合约更新，点击确定进行查看", "", function(a) {
                    a ? ($("#leftMenu .sb-agent").trigger("click"), setTimeout(function() {
                        $("#popup_content .model_child_menus li[data-submenu='dailySalaryReport']").trigger("click"), setTimeout(function() {
                            $("#switchSalaryTabs li[data-rel='dailySalaryContent']").trigger("click")
                        }, 20)
                    }, 20)) : control.checkContractRequest()
                }) : TCG.Confirm("日工资将被解约，是否同意解约？", "", function(a) {
                    var c = {};
                    a ? (c.status = "C", c.id = b, TCG.Ajax({
                        url: "./processDailySalaryContract",
                        data: c
                    }, function(a) {
                        a.status ? TCG.Alert("success", TCG.Prop(a.description), "", function() {
                            globalVar.enableSalaryRecord = !1, sessionStorage.removeItem("salary"), control.checkContractRequest(), $("div.model_child_content #loading").remove()
                        }) : TCG.Alert("errors", TCG.Prop(a.description), "", function() {
                            $("div.model_child_content #loading").remove()
                        }), $(".request").removeClass("processing")
                    })) : (c.status = "A", c.id = b, TCG.Ajax({
                        url: "./processDailySalaryContract",
                        data: c
                    }, function(a) {
                        a.status ? TCG.Alert("success", TCG.Prop(a.description), "", function() {
                            globalVar.enableSalaryRecord = !0, sessionStorage.removeItem("salary"), control.checkContractRequest(), $("div.model_child_content #loading").remove()
                        }) : TCG.Alert("errors", TCG.Prop(a.description), "", function() {
                            control.checkContractRequest(), $("div.model_child_content #loading").remove()
                        }), $(".request").removeClass("processing")
                    }))
                }, " 同意解约", "拒绝解约")
            } else control.checkContractRequest()
        })
    },
    agentTeamSummary: function() {
        control.datepickerStartEnd($("#lottoAgentPnlForm [name='startTime']"), $("#lottoAgentPnlForm [name='endTime']"), -6), control.clickSummarySpan(), control.getAgentInfo(), control.getAgentDownlinePNLReport(), control.filterChart()
    },
    clickSummarySpan: function() {
        $(document).off("click", "#lottoAgentPnlForm .tab-btn").on("click", "#lottoAgentPnlForm .tab-btn", function() {
            var a = $(this).attr("data-span");
            $("#lottoAgentPnlForm .tab-btn").removeClass("sel").addClass("unsel"), $(this).removeClass("unsel").addClass("sel"), control.datepickerStartEnd($("#lottoAgentPnlForm [name='startTime']"), $("#lottoAgentPnlForm [name='endTime']"), a), control.getAgentDownlinePNLReport()
        })
    },
    getAgentInfo: function() {
        TCG.Ajax({
            url: "./agentSet/agentInfo"
        }, function(a) {
            a.status ? UI.loadAgentInfo(a.result) : TCG.Alert("errors", TCG.Prop(a.description), "", function() {
                $("div.model_child_content #loading").remove()
            }), $(".request").removeClass("processing")
        })
    },
    getAgentDownlinePNLReport: function() {
        var a = {
            startDate: $("#lottoAgentPnlForm [name='startTime']").val(),
            endDate: $("#lottoAgentPnlForm [name='endTime']").val(),
            pageNo: 1,
            pageSize: 1e3
        };
        TCG.Ajax({
            url: "./getDownlineLottoPNLReport",
            data: a
        }, function(a) {
            a.status ? UI.loadTeamSummaryAgentPNL(a.result) : TCG.Alert("errors", TCG.Prop(a.description), "", function() {
                $("div.model_child_content #loading").remove()
            }), $(".request").removeClass("processing")
        })
    },
    filterChart: function() {
        $(document).off("click", ".ts-chart .ts-overview span").on("click", ".ts-chart .ts-overview span", function() {
            $(".ts-chart .ts-overview span").removeClass("active"), $(this).addClass("active")
        })
    },
    writeMessage: function() {
        var a = window.sessionStorage.getItem("isAgent");
        control.validateAccountRecipient(a), globalVar.messageSelectedRecipient = [], control.countUnreadMessage(), control.getMessageRecipient(), control.showRecipientList(), control.showAllSelectedRecipient(), control.sendNewMessage(), control.validateWriteMesageInput()
    },
    validateAccountRecipient: function(a) {
        var b = "";
        switch (a) {
            case "0":
                b += "<li class='m-all-subordinate tab-btn-li sel' data-rel='upline'>", b += "<div class='tab-btn-w'><label class='tab-btn' data-rel='mtab-content1'><span>直属上级</span></label></div>", b += "</li>";
                break;
            case "1":
                b += "<li class='m-all-subordinate tab-btn-li sel' data-rel='all'>", b += "<div class='tab-btn-w'><label class='tab-btn' data-rel='mtab-content1'><span>全部下级</span></label></div>", b += "</li>", b += "<li class='m-all-subordinate tab-btn-li' data-rel='agent'>", b += "<div class='tab-btn-w'><label class='tab-btn' data-rel='mtab-content1'><span>直属代理</span></label></div>", b += "</li>", b += "<li class='m-all-subordinate tab-btn-li' data-rel='member'>", b += "<div class='tab-btn-w'><label class='tab-btn' data-rel='mtab-content1'><span>直属会员</span></label></div>", b += "</li>", b += "<li class='m-all-subordinate tab-btn-li' data-rel='upline'>", b += "<div class='tab-btn-w'><label class='tab-btn' data-rel='mtab-content1'><span>直属上级</span></label></div>", b += "</li>";
                break;
            case "2":
                b += "<li class='m-all-subordinate tab-btn-li sel' data-rel='all'>", b += "<div class='tab-btn-w'><label class='tab-btn' data-rel='mtab-content1'><span>全部下级</span></label></div>", b += "</li>", b += "<li class='m-all-subordinate tab-btn-li' data-rel='agent'>", b += "<div class='tab-btn-w'><label class='tab-btn' data-rel='mtab-content1'><span>直属代理</span></label></div>", b += "</li>", b += "<li class='m-all-subordinate tab-btn-li' data-rel='member'>", b += "<div class='tab-btn-w'><label class='tab-btn' data-rel='mtab-content1'><span>直属会员</span></label></div>", b += "</li>"
        }
        $("#filterRecipient").html(b), control.filterMessageRecipient()
    },
    validateWriteMesageInput: function() {
        $(document).off("keyup", "#writeMessagForm .form-control").on("keyup", "#writeMessageForm .form-control", function() {
            control.validateWriteMessageForm()
        })
    },
    validateWriteMessageForm: function() {
        var a = $("#writeMessageForm"),
            b = a.find("[name='subject']"),
            c = a.find("[name='message']"),
            d = globalVar.messageSelectedRecipient;
        "" == b.val() || "" == c.val() || 0 == d.length ? a.removeClass("enable") : a.addClass("enable")
    },
    getMessageRecipient: function() {
        TCG.Ajax({
            url: "./getRecipients"
        }, function(a) {
            a.status ? (globalVar.messageRecipientList = a.result, UI.loadMessageRecipient("all")) : TCG.Alert("errors", TCG.Prop(a.description))
        })
    },
    filterMessageRecipient: function() {
        $(document).off("click", "#filterRecipient li").on("click", "#filterRecipient li", function() {
            var a = $(this).attr("data-rel");
            $("#filterRecipient li.sel").removeClass("sel"), $(this).addClass("sel"), UI.loadMessageRecipient(a)
        })
    },
    checkRecipient: function() {
        $(document).off("click", "#writeMessageForm .messageRecipientList .rec-item").on("click", "#writeMessageForm .messageRecipientList .rec-item", function() {
            var a = $(this).find("[name='selectRecipient']");
            $(this).hasClass("sel") ? (a.prop({
                checked: !1
            }), $(this).removeClass("sel")) : (a.prop({
                checked: !0
            }), $(this).addClass("sel")), $("#writeMessageForm .rec-item:not(.hide) [name='selectRecipient']:checked").length > 0 && $("#writeMessageForm .rec-item:not(.hide) [name='selectRecipient']:checked").length == $("#writeMessageForm .rec-item:not(.hide) [name='selectRecipient']").length ? $("#writeMessageForm [name='checkAllRecipient']").prop({
                checked: !0
            }).parents(".rec-item").addClass("sel") : $("#writeMessageForm [name='checkAllRecipient']").prop({
                checked: !1
            }).parents(".rec-item").removeClass("sel")
        })
    },
    checkAllRecipient: function() {
        $(document).off("click", "#selectAllRecipient").on("click", "#selectAllRecipient", function() {
            var a = $(this);
            $(this).hasClass("sel") ? ($("#writeMessageForm .rec-item").removeClass("sel"), $("#writeMessageForm [name='selectRecipient']").prop({
                checked: !1
            }), $("#writeMessageForm [name='checkAllRecipient']").prop({
                checked: !1
            }), a.removeClass("sel")) : ($("#writeMessageForm .rec-item").not(".hide").addClass("sel"), $("#writeMessageForm [name='selectRecipient']").prop({
                checked: !0
            }), $("#writeMessageForm [name='checkAllRecipient']").prop({
                checked: !0
            }), a.addClass("sel"))
        })
    },
    clickCheckAllRecipient: function() {
        $(document).off("click", "#writeMessageForm [name='clickCheckAllRecipient']").on("click", "#writeMessageForm [name='clickCheckAllRecipient']", function() {
            var a = $("#selectAllRecipient");
            $(this).hasClass("sel") ? ($("#writeMessageForm .rec-item").removeClass("sel"), $("#writeMessageForm [name='selectRecipient']").prop({
                checked: !1
            }), $("#writeMessageForm [name='checkAllRecipient']").prop({
                checked: !1
            }), a.removeClass("sel")) : ($("#writeMessageForm .rec-item").not(".hide").addClass("sel"), $("#writeMessageForm [name='selectRecipient']").prop({
                checked: !0
            }), $("#writeMessageForm [name='checkAllRecipient']").prop({
                checked: !0
            }), a.addClass("sel"))
        })
    },
    uncheckAllRecipient: function() {
        $(document).off("click", "#writeMessageForm [name='uncheckAllRecipient']").on("click", "#writeMessageForm [name='uncheckAllRecipient']", function() {
            $("#writeMessageForm .rec-item").not(".hide").removeClass("sel"), $("#writeMessageForm [name='selectRecipient']").prop({
                checked: !1
            }), $("#writeMessageForm [name='checkAllRecipient']").prop({
                checked: !1
            })
        })
    },
    showRecipientList: function() {
        $(document).off("click", "#writeMessageForm [name='showRecipientList']").on("click", "#writeMessageForm [name='showRecipientList']", function() {
            var a = $("#filterRecipient li.sel").attr("data-rel");
            UI.loadMessageRecipient(a), $("#writeMessageForm .add-recepients").removeClass("hide"), $(this).addClass("click"), $("html").unbind("click").bind("click", function(a) {
                "recipientPopUp" == a.target.id || $(a.target).parents("#recipientPopUp")[0] || ($("html").off("click"), $("#writeMessageForm [name='showRecipientList']").removeClass("click"), $("#writeMessageForm [name='recipientName']").val(""), $("#writeMessageForm .add-recepients").addClass("hide"))
            })
        })
    },
    addSelectedRecipient: function() {
        $(document).off("click", "#writeMessageForm [name='addSelectedRecipient']").on("click", "#writeMessageForm [name='addSelectedRecipient']", function() {
            var a = $("#writeMessageForm [name='selectRecipient']:checked"),
                b = globalVar.messageSelectedRecipient;
            a.each(function() {
                b.push({
                    customerId: $(this).val(),
                    customerName: $(this).attr("data-customerName")
                })
            }), UI.insertSelectedRecipient(), $("#writeMessageForm .add-recepients").addClass("hide"), $("#writeMessageForm [name='showRecipientList']").removeClass("click")
        }), globalVar.messagePreSelectedRecipient && ($("#writeMessageForm [name='addSelectedRecipient']").trigger("click"), delete globalVar.messagePreSelectedRecipient)
    },
    removeSelectedRecipient: function() {
        $(document).off("click", "#writeMessageForm .removeRecipient").on("click", "#writeMessageForm .removeRecipient", function() {
            for (var a = $(this).attr("data-customerId"), b = globalVar.messageSelectedRecipient, c = [], d = 0; d < b.length; d++) b[d].customerId != a && c.push({
                customerId: b[d].customerId,
                customerName: b[d].customerName
            });
            globalVar.messageSelectedRecipient = c, UI.insertSelectedRecipient()
        })
    },
    showAllSelectedRecipient: function() {
        $(document).off("click", "#showAllSelectedRecipient").on("click", "#showAllSelectedRecipient", function(a) {
            $(a.target).hasClass("removeRecipient") || ($("#allSelectedRecipient").removeClass("hide"), control.removeAllSelectedRecipient(), $("html").unbind("click").bind("click", function(a) {
                "allSelectedRecipient" == a.target.id || $(a.target).parents("#allSelectedRecipient")[0] || ($("html").unbind("click"), $("#allSelectedRecipient").addClass("hide"))
            }))
        })
    },
    removeAllSelectedRecipient: function() {
        $(document).off("click", "#removeAllSelectedRecipient").on("click", "#removeAllSelectedRecipient", function() {
            globalVar.messageSelectedRecipient = [], UI.insertSelectedRecipient(), $("html").unbind("click"), $("#allSelectedRecipient").addClass("hide")
        })
    },
    searchRecipient: function() {
        $(document).off("click", "#writeMessageForm [name='searchRecipient']").on("click", "#writeMessageForm [name='searchRecipient']", function() {
            var a = $("#writeMessageForm [name='recipientName']").val();
            "" == a ? $("#writeMessageForm .messageRecipientList .rec-item").removeClass("hide") : $("#writeMessageForm .messageRecipientList .rec-item").each(function() {
                new RegExp(a).test($(this).text()) ? $(this).removeClass("hide") : $(this).addClass("hide")
            }), $("#writeMessageForm .rec-item").not(".hide").find("[name='selectRecipient']:checked").length > 0 && $("#writeMessageForm .rec-item").not(".hide").find("[name='selectRecipient']:checked").length == $("#writeMessageForm .rec-item").not(".hide").find("[name='selectRecipient']").length ? $("#writeMessageForm [name='checkAllRecipient']").prop({
                checked: !0
            }).parents(".rec-item").addClass("sel") : $("#writeMessageForm [name='checkAllRecipient']").prop({
                checked: !1
            }).parents(".rec-item").removeClass("sel")
        })
    },
    sendNewMessage: function() {
        $(document).off("click", "#writeMessageForm .form-submit").on("click", "#writeMessageForm .form-submit", function() {
            for (var a = $("#writeMessageForm"), b = a.find("[name='subject']"), c = a.find("[name='message']"), d = a.find(".form-submit"), e = a.find(".form-reset"), f = globalVar.messageSelectedRecipient, g = /(<([^>]+)>)/gi, h = [], i = 0; i < f.length; i++) h.push(f[i].customerId + "$#$" + f[i].customerName);
            if (0 == h.length) return void control.showTooltip($("#showAllSelectedRecipient"), "writeMessage_recipient_required");
            if ("" == b.val()) return void control.showTooltip(b, "writeMessage_subject_required");
            if (g.test(b.val())) return void control.showTooltip(b, "writeMessage_invalid_characters");
            if ("" == c.val()) return void control.showTooltip(c, "writeMessage_message_required");
            if (g.test(c.val())) return void control.showTooltip(c, "writeMessage_invalid_characters");
            if (!d.hasClass("processing")) {
                d.addClass("processing");
                var j = {
                    addressee: h.join(","),
                    title: (b.val() + "").replace(/(<([^>]+)>)/gi, ""),
                    content: (c.val() + "").replace(/(<([^>]+)>)/gi, "")
                };
                TCG.Ajax({
                    url: "./sendMessage",
                    data: j
                }, function(a) {
                    a.status ? (TCG.Alert("success", TCG.Prop(a.description)), globalVar.messageSelectedRecipient = [], UI.insertSelectedRecipient(), e.click()) : TCG.Alert("errors", TCG.Prop(a.description)), $("div.model_child_content #loading").remove(), d.removeClass("processing")
                })
            }
        })
    },
    inbox: function() {
        control.countUnreadMessage(), control.getInboxMessages(1), control.selectAllInboxMessages(), control.clickDeleteAllInboxMessages()
    },
    getInboxMessages: function(a) {
        TCG.Ajax({
            url: "./getMessages",
            data: {
                page: a,
                pageSize: 10
            }
        }, function(a) {
            a.status ? (UI.loadInboxMessages(a.result), UI.loadPagination("inboxMessages", a.result.pageNo, a.result.totalPages)) : TCG.Alert("errors", TCG.Prop(a.description))
        })
    },
    selectInboxMessages: function() {
        $(document).off("change", "#messageList [name='messageId']").on("change", "#messageList [name='messageId']", function() {
            $(this).is(":checked") ? $(this).prop({
                checked: !0
            }).parents(".msg-chkbx").addClass("msg-checked") : $(this).prop({
                checked: !1
            }).parents(".msg-chkbx").removeClass("msg-checked"), $("#messageList [name='messageId']:checked").length > 0 && $("#messageList [name='messageId']:checked").length == $("#messageList [name='messageId']").length ? $("#inboxMessages [name='selectAllInboxMessages']").addClass("msg-checked") : $("#inboxMessages [name='selectAllInboxMessages']").removeClass("msg-checked")
        })
    },
    selectAllInboxMessages: function() {
        $(document).off("click", "#inboxMessages [name='selectAllInboxMessagesBtn'], #inboxMessages [for='selectAllInboxMessages']").on("click", "#inboxMessages [name='selectAllInboxMessagesBtn'], #inboxMessages [for='selectAllInboxMessages']", function() {
            var a = $("#inboxMessages [name='selectAllInboxMessages']");
            a.hasClass("msg-checked") ? (a.removeClass("msg-checked"), $("#messageList [name='messageId']").prop({
                checked: !1
            }).parents(".msg-chkbx").removeClass("msg-checked")) : (a.addClass("msg-checked"), $("#messageList [name='messageId']").prop({
                checked: !0
            }).parents(".msg-chkbx").addClass("msg-checked"))
        })
    },
    deleteInboxMessages: function(a) {
        var b = {
            messageId: a
        };
        TCG.Ajax({
            url: "./deleteInboxMessage",
            data: b
        }, function(b) {
            if (b.status) {
                var c = $("#messagePreview").attr("data-messageId");
                a.split(",").indexOf(c) >= 0 && $("#messagePreview").html("").attr({
                    "data-messageId": ""
                }), $("#inboxMessages [name='selectAllInboxMessages']").removeClass("msg-checked"), control.getInboxMessages(1)
            } else TCG.Alert("errors", TCG.Prop(b.description))
        })
    },
    clickDeleteInboxMessages: function() {
        $(document).off("click", "#messageList [name='delete']").on("click", "#messageList [name='delete']", function() {
            var a = $(this).attr("data-messageId");
            TCG.Confirm(TCG.Prop("confirm_delete"), "", function(b) {
                b && control.deleteInboxMessages(a)
            })
        })
    },
    clickDeleteAllInboxMessages: function() {
        $(document).off("click", "#inboxMessages [name='deleteAllInboxMessages']").on("click", "#inboxMessages [name='deleteAllInboxMessages']", function() {
            var a = [];
            $("#messageList [name='messageId']:checked").each(function() {
                a.push($(this).val())
            }), a.length > 0 && TCG.Confirm(TCG.Prop("confirm_delete"), "", function(b) {
                b && control.deleteInboxMessages(a.join(","))
            })
        })
    },
    getInboxMessagePreview: function() {
        $(document).off("click", "#messageList > li").on("click", "#messageList > li", function(a) {
            if ("messageId" != $(a.target).attr("name") && "delete" != $(a.target).attr("name")) {
                var b = $(this),
                    c = {
                        messageId: b.find("[name='messageId']").val(),
                        title: b.find(".message-title").text(),
                        sender: b.find(".message-sender").text(),
                        senderId: b.find(".message-sender").attr("data-senderId"),
                        content: b.find(".message-content").attr("data-content"),
                        isFromOperator: b.attr("data-isFromOperator"),
                        dateTime: b.find(".message-dateTime").attr("data-dateTime")
                    };
                b.hasClass("unread") ? TCG.Ajax({
                    url: "./markRead",
                    data: {
                        mailId: c.messageId
                    }
                }, function(a) {
                    if (a.status) {
                        var d = 1 * $("#inboxMessages .total-read-count").text() + 1;
                        unreadCount = 1 * $("#inboxMessages .total-unread-count").text() - 1, $("#inboxMessages .total-read-count").text(d), $("#inboxMessages .total-unread-count").text(unreadCount), unreadCount > 0 ? $(".countUnreadMessage").text(unreadCount).removeClass("hide") : $(".countUnreadMessage").text("").addClass("hide"), b.removeClass("unread")
                    }
                    UI.loadInboxMessagePreview(c)
                }) : UI.loadInboxMessagePreview(c)
            }
        })
    },
    linkMessageToPage: function(a, b) {
        var c, c = a.indexOf("dscontract"),
            d = a.substr(c),
            e = "ds";
        c < 0 && (c = a.indexOf("dstransaction"), d = a.substr(c), e = "tr"), c < 0 && (d = "");
        var f, g = a.replace(d, "");
        return "content" == b ? ("ds" == e ? f = "  <span id='messageLink' class='action-btn' data-modal='agent/dailySalaryReport'>请查看</span>" : (f = "  <span id='messageLink' class='action-btn' data-modal='personal/changeAccount'>请查看</span>", sessionStorage.setItem("messageLink", "transaction")), c >= 0 ? g + f : g) : g
    },
    showReplyMessageForm: function() {
        $(document).off("click", "#messagePreview [name='reply']").on("click", "#messagePreview [name='reply']", function() {
            var a = $("#messagePreview .message-sender").attr("data-senderId"),
                b = $("#messagePreview .message-sender").text(),
                c = $("#messagePreview .message-title").text();
            $("#replyPop").toggle("slide", {
                direction: "right"
            }, 800), $("#replyMessageForm .recipient").text(b).attr("data-customerId", a), $("#replyMessageForm [name='subject']").val(c), control.replyMessage(), control.validateReplyMessageInput()
        }), $(document).off("click", "#replyPop .close-panel").on("click", "#replyPop .close-panel", function() {
            $("#replyPop").toggle("slide", {
                direction: "right"
            }, 300), $("#replyMessageForm .recipient").text("").attr("data-customerId", ""), $("#replyMessageForm .form-reset").click()
        })
    },
    validateReplyMessageInput: function() {
        $(document).off("keyup", "#replyMessageForm .form-control").on("keyup", "#replyMessageForm .form-control", function() {
            control.validateReplyMessageForm()
        })
    },
    validateReplyMessageForm: function() {
        var a = $("#replyMessageForm"),
            b = a.find("[name='subject']"),
            c = a.find(".recipient").attr("data-customerId"),
            d = a.find(".recipient").text(),
            e = a.find("[name='message']");
        "" == b.val() || "" == e.val() || "" == c || void 0 == c || "" == d || void 0 == d ? a.removeClass("enable") : a.addClass("enable")
    },
    replyMessage: function() {
        $(document).off("click", "#replyMessageForm .form-submit").on("click", "#replyMessageForm .form-submit", function() {
            var a = $("#replyMessageForm"),
                b = a.find("[name='subject']"),
                c = a.find("[name='message']"),
                d = a.find(".recipient").attr("data-customerId"),
                e = a.find(".recipient").text(),
                f = d + "$#$" + e,
                g = /(<([^>]+)>)/gi,
                h = a.find(".form-submit"),
                i = {
                    addressee: f,
                    title: b.val(),
                    content: c.val()
                };
            return "" == b.val() ? void control.showTooltip(b, "replyMessage_subject_required") : g.test(b.val()) ? void control.showTooltip(b, "replyMessage_invalid_characters") : "" == c.val() ? void control.showTooltip(c, "replyMessage_message_required") : g.test(c.val()) ? void control.showTooltip(c, " replyMessage_invalid_characters") : void(h.hasClass("processing") || (h.addClass("processing"), TCG.Ajax({
                url: "./sendMessage",
                data: i
            }, function(a) {
                a.status ? (TCG.Alert("success", TCG.Prop(a.description)), $("#replyPop .close-panel").click()) : TCG.Ajax("errors", TCG.Prop(a.description)), $("div.model_child_content #loading").remove(), h.removeClass("processing")
            })))
        })
    },
    sentMessages: function() {
        control.countUnreadMessage(), control.getSentMessages(1), control.selectAllSentMessages(), control.clickDeleteAllSentMessages(), $("#messagePreview").html("")
    },
    getSentMessages: function(a) {
        var b = {
            page: a,
            pageSize: 10
        };
        TCG.Ajax({
            url: "./getOutbox",
            data: b
        }, function(a) {
            a ? (UI.loadSentMessages(a.result), UI.loadPagination("sentMessages", a.result.pageNo, a.result.totalPages)) : TCG.Alert("errors", TCG.Prop(a.description))
        })
    },
    getSentMessagePreview: function() {
        $(document).off("click", "#messageList > li").on("click", "#messageList > li", function(a) {
            if ("messageId" != $(a.target).attr("name") && "delete" != $(a.target).attr("name")) {
                var b = $(this),
                    c = {
                        messageId: b.find("[name='messageId']").val(),
                        title: b.find(".message-title").text(),
                        content: b.find(".message-content").attr("data-content"),
                        reciever: b.find(".message-reciever").text(),
                        dateTime: b.find(".message-dateTime").attr("data-dateTime")
                    };
                UI.loadSentMessagePreview(c)
            }
        })
    },
    selectSentMessages: function() {
        $(document).off("change", "#messageList [name='messageId'],").on("change", "#messageList [name='messageId']", function() {
            $(this).val();
            $(this).is(":checked") ? $(this).parents(".msg-chkbx").addClass("msg-checked") : $(this).parents(".msg-chkbx").removeClass("msg-checked"), $("#messageList [name='messageId']:checked").length > 0 && $("#messageList [name='messageId']:checked").length == $("#messageList [name='messageId']").length ? $("#sentMessages [name='selectAllSentMessage']").addClass("msg-checked") : $("#sentMessages [name='selectAllSentMessage']").removeClass("msg-checked")
        })
    },
    selectAllSentMessages: function() {
        $(document).off("click", "#sentMessages [for='selectAllSentMessage'], #sentMessages [name='selectAllSentMessageBtn']").on("click", "#sentMessages [for='selectAllSentMessage'], #sentMessages [name='selectAllSentMessageBtn']", function() {
            $("#sentMessages [name='selectAllSentMessage']").hasClass("msg-checked") ? ($("#sentMessages [name='selectAllSentMessage']").removeClass("msg-checked"), $("#messageList [name='messageId']").prop({
                checked: !1
            }).parents(".msg-chkbx").removeClass("msg-checked")) : ($("#sentMessages [name='selectAllSentMessage']").addClass("msg-checked"), $("#messageList [name='messageId']").prop({
                checked: !0
            }).parents(".msg-chkbx").addClass("msg-checked"))
        })
    },
    deleteSentMessages: function(a) {
        var b = {
            messageId: a
        };
        TCG.Ajax({
            url: "./deleteOutboxMessage",
            data: b
        }, function(b) {
            if (b.status) {
                var c = $("#messagePreview").attr("data-messageId");
                a.split(",").indexOf(c) >= 0 && $("#messagePreview").html("").attr({
                    "data-messageId": ""
                }), $("#sentMessages [name='selectAllSentMessage']").removeClass("msg-checked"), control.getSentMessages(1)
            } else TCG.Alert("errors", TCG.Prop(b.description))
        })
    },
    clickDeleteSentMessages: function() {
        $(document).off("click", "#messageList [name='delete']").on("click", "#messageList [name='delete']", function() {
            var a = $(this).attr("data-messageId");
            TCG.Confirm(TCG.Prop("confirm_delete"), "", function(b) {
                b && control.deleteSentMessages(a)
            })
        })
    },
    clickDeleteAllSentMessages: function() {
        $(document).off("click", "#sentMessages [name='deleteAllSentMessages']").on("click", "#sentMessages [name='deleteAllSentMessages']", function() {
            var a = [];
            $("#messageList [name='messageId']:checked").each(function() {
                a.push($(this).val())
            }), a.length > 0 && TCG.Confirm(TCG.Prop("confirm_delete"), "", function(b) {
                b && control.deleteSentMessages(a.join(","))
            })
        })
    },
    helpPlayPrize: function() {
        $(document).off("click", "#playPrize .tab-btn").on("click", "#playPrize .tab-btn", function() {
            var a = $(this).attr("data-rel");
            $("#playPrize .tab-btn").removeClass("sel").addClass("unsel"), $(this).removeClass("unsel").addClass("sel"), $("#playPrize .tab-content").hide(), $("#" + a).show(), $(".accordions").accordion({
                active: !1,
                collapsible: !0,
                heightStyle: "content"
            })
        }), $(".accordions").accordion({
            active: !1,
            collapsible: !0,
            heightStyle: "content"
        })
    },
    helpDepositRelated: function() {
        $(document).off("click", "#depositRel .tab-btn").on("click", "#depositRel .tab-btn", function() {
            var a = $(this).attr("data-rel");
            $("#depositRel .tab-btn").removeClass("sel").addClass("unsel"), $(this).removeClass("unsel").addClass("sel"), $("#depositRel .tab-content").hide(), $("#" + a).show(), $(".accordions").accordion({
                active: !1,
                collapsible: !0,
                heightStyle: "content"
            })
        }), $(".accordions").accordion({
            active: !1,
            collapsible: !0,
            heightStyle: "content"
        })
    },
    helpYourWithdrawal: function() {
        $(document).off("click", "#yourWithdraw .tab-btn").on("click", "#yourWithdraw .tab-btn", function() {
            var a = $(this).attr("data-rel");
            $("#yourWithdraw .tab-btn").removeClass("sel").addClass("unsel"), $(this).removeClass("unsel").addClass("sel"), $("#yourWithdraw .tab-content").hide(), $("#" + a).show(), $(".accordions").accordion({
                active: !1,
                collapsible: !0,
                heightStyle: "content"
            })
        }), $(".accordions").accordion({
            active: !1,
            collapsible: !0,
            heightStyle: "content"
        })
    },
    helpAccountNumbers: function() {
        $(document).off("click", "#accntNum .tab-btn").on("click", "#accntNum .tab-btn", function() {
            var a = $(this).attr("data-rel");
            $("#accntNum .tab-btn").removeClass("sel").addClass("unsel"), $(this).removeClass("unsel").addClass("sel"), $("#accntNum .tab-content").hide(), $("#" + a).show(), $(".accordions").accordion({
                active: !1,
                collapsible: !0,
                heightStyle: "content"
            })
        }), $(".accordions").accordion({
            active: !1,
            collapsible: !0,
            heightStyle: "content"
        })
    },
    helpInstallation: function() {
        $(document).off("click", "#installHelp .tab-btn").on("click", "#installHelp .tab-btn", function() {
            var a = $(this).attr("data-rel");
            $("#installHelp .tab-btn").removeClass("sel").addClass("unsel"), $(this).removeClass("unsel").addClass("sel"), $("#installHelp .tab-content").hide(), $("#" + a).show(), $(".accordions").accordion({
                active: !1,
                collapsible: !0,
                heightStyle: "content"
            })
        }), $(".accordions").accordion({
            active: !1,
            collapsible: !0,
            heightStyle: "content"
        })
    },
    helpBonusBettingIssues: function() {
        $(document).off("click", "#bbi .tab-btn").on("click", "#bbi .tab-btn", function() {
            var a = $(this).attr("data-rel");
            $("#bbi .tab-btn").removeClass("sel").addClass("unsel"), $(this).removeClass("unsel").addClass("sel"), $("#ibbi .tab-content").hide(), $("#" + a).show(), $(".accordions").accordion({
                active: !1,
                collapsible: !0,
                heightStyle: "content"
            })
        }), $(".accordions").accordion({
            active: !1,
            collapsible: !0,
            heightStyle: "content"
        })
    },
    helpAboutUs: function() {
        $(document).off("click", "#faqTabs .tab-btn").on("click", "#faqTabs .tab-btn", function() {
            var a = $(this).attr("data-rel");
            $("#faqTabs .tab-btn").removeClass("sel").addClass("unsel"), $(this).removeClass("unsel").addClass("sel"), $("#faqTabs .tab-content").hide(), $("#" + a).show(), $(".accordions").accordion({
                active: !1,
                collapsible: !0,
                heightStyle: "content"
            })
        }), $(".accordions").accordion({
            active: !1,
            collapsible: !0,
            heightStyle: "content"
        })
    },
    gameLobby: function() {
        control.getUserInfo(function(a) {
            if (a.status) {
                TCG.Ajax({
                    url: "./getContractualDividendInfo"
                }, function(a) {
                    if (a.result.agent.length > 0)
                        for (var b = 0; b < a.result.agent.length; b++)
                            if ("A" == a.result.agent[b].status || "V" == a.result.agent[b].status) {
                                globalVar.enableDividentRecord = !0;
                                break
                            }
                }), TCG.Ajax({
                    url: "./getContractDailySalaryInfo"
                }, function(a) {
                    if (a.result.agent.length > 0)
                        for (var b = 0; b < a.result.agent.length; b++)
                            if ("A" == a.result.agent[b].status || "V" == a.result.agent[b].status) {
                                globalVar.enableSalaryRecord = !0;
                                break
                            }
                }), control.checkSalaryRequest(), globalVar.refreshWalletTimer && window.clearInterval(globalVar.refreshWalletTimer), globalVar.refreshWalletTimer = setInterval(function() {
                    control.headerWalletList(null, !0)
                }, 3e5);
                for (var b = JSON.parse(a.result.memberLabel.replace(/'/g, '"')), c = 0; c < b.length; c++)
                    if ("招商" == b[c].labelName || "特权" == b[c].labelName || "招商2" == b[c].labelName) {
                        globalVar.enableDividentRecord = !0;
                        break
                    }
                control.clickPvpGameList(a.result), control.openFishingGame(), $.when(TCG.Ajax({
                    url: "lgw/games",
                    headers: {
                        Merchant: globalVar.merchantCode
                    }
                }), TCG.Ajax({
                    url: "lgw/customers/series",
                    headers: {
                        Merchant: globalVar.merchantCode,
                        Authorization: window.sessionStorage.getItem("token")
                    }
                })).done(function(b, c) {
                    globalVar.result.games = b[0], globalVar.result.customerSeries = c[0], UI.checkUserType(), UI.lotteryMenus(), control.stickyHeader(), control.pageMenu("#leftMenu dt,#leftMenu dd,#topMenu li, #topDeposit, #topWithdraw, #headerLinks dt, #walletList dt");
                    var d = {
                        account: a.result.account,
                        nickname: a.result.nickname,
                        totalAmount: void 0 == a.result.safeBalance ? "0.00" : a.result.safeBalance,
                        lastLoginTimes: a.result.lastlogin
                    };
                    UI.header(!0, d), globalVar.headers = {
                        Merchant: globalVar.merchantCode,
                        Authorization: a.result.token
                    }
                })
            } else window.location = "/"
        })
    },
    clickPvpGameList: function(a) {
        var a = a;
        $(document).off("click", "#pvpGameList > li").on("click", "#pvpGameList > li", function() {
            var b = $(this).attr("data-nodeId");
            if ("5079" == b || "7016" == b) {
                globalVar.pvpGameWindows = window.open("soon.html", "PVPGameWindows", "width=1280,height=760");
                var c = $(this).attr("data-gameId"),
                    d = $(this).attr("data-accountType"),
                    e = {
                        gameId: c,
                        nodeId: b,
                        accountType: d
                    };
                control.launchPvpGame(e)
            } else control.getPvpGameList(b, a)
        })
    },
    getPvpGameList: function(a, b) {
        TCG.Ajax({
            url: "./xml/gameroom.xml",
            dataType: "html"
        }, function(c) {
            TCG.WinOpen({
                text: c,
                transparent: !1,
                width: "1270px",
                height: "600px"
            }, function() {
                var c = b.account.split("@");
                $("#username").text(c[1]);
                var d = $("#gameList option[value='" + a + "']");
                d.prop({
                    selected: !0
                }), $("#selectedGame").text(d.text()), control.customSelect("#gameList"), control.selectGameList(), control.getWalletBalance(), control.refreshPvpWallet(), control.getRoomList(a), control.openPvpGame()
            })
        })
    },
    selectGameList: function() {
        $(document).off("change", "#gameList").on("change", "#gameList", function() {
            var a = $(this).val(),
                b = $("#gameList option[value='" + a + "']");
            $("#selectedGame").text(b.text()), control.getRoomList(a)
        })
    },
    refreshPvpWallet: function() {
        $(document).off("click", "#refreshPvpWallet").on("click", "#refreshPvpWallet", function() {
            control.getWalletBalance()
        })
    },
    refreshRoomList: function() {
        $(document).off("click", "#refreshRoomList").on("click", "#refreshRoomList", function() {
            var a = $("#gameList").val();
            control.getRoomList(a)
        })
    },
    getRoomList: function(a) {
        var b = {
            gameNodeId: a
        };
        TCG.Ajax({
            url: "./getRoomList",
            data: b
        }, function(a) {
            a.status ? UI.loadRoomList(a.result) : TCG.Alert("errors", TCG.Prop(a.description))
        })
    },
    openPvpGame: function() {
        $(document).off("click", "#roomList [name='openPvpGame']").on("click", "#roomList [name='openPvpGame']", function() {
            globalVar.pvpGameWindows = window.open("soon.html", "PVPGameWindows", "width=1280,height=760");
            var a = $(this).attr("data-nodeId"),
                b = $(this).attr("data-gameId"),
                c = $(this).attr("data-gameName"),
                d = $(this).attr("data-accountType"),
                e = {
                    gameId: b,
                    nodeId: a,
                    accountType: d
                };
            control.launchPvpGame(e, c)
        })
    },
    launchPvpGame: function(a, b) {
        TCG.Ajax({
            url: "./launchGame",
            data: a
        }, function(a) {
            if (a.status) {
                var b = a.result.content.game_url;
                globalVar.pvpGameWindows.location.href = b
            } else TCG.Alert("errors", TCG.Prop(a.description), function() {
                null != globalVar.pvpGameWindows && globalVar.pvpGameWindows.close(), "user.token.expired" == a.description && ($("#logout").trigger("click"), $("#dialog_box_ok").trigger("click"))
            })
        })
    },
    openFishingGame: function() {
        $(document).off("click", "#fishingGameList .game").on("click", "#fishingGameList .game", function() {
            globalVar.fishingGameWindows = window.open("soon.html", "RNGGameWindows", "width=1024,height=768");
            var a = $(this).attr("data-gameName"),
                b = $(this).attr("data-nodeId"),
                c = $(this).attr("data-gameId"),
                d = $(this).attr("data-accountType"),
                e = $(this).attr("data-gameVendor");
            control.checkWalletLockStatusByVendor(e, function(e) {
                var f = {
                    gameId: c,
                    nodeId: b,
                    accountType: d,
                    confirmTrans: 0
                };
                control.launchFishingGame(f, a)
            })
        })
    },
    launchFishingGame: function(a, b) {
        TCG.Ajax({
            url: "./launchGame",
            data: a
        }, function(a) {
            if (a.status)
                if (null != a.result.content) {
                    var b = a.result.content.game_url;
                    globalVar.fishingGameWindows.location.href = b
                } else globalVar.fishingGameWindows.close(), TCG.Alert("errors", "content is null", function() {
                    null != globalVar.fishingGameWindows && globalVar.fishingGameWindows.close()
                });
            else globalVar.fishingGameWindows.close(), TCG.Alert("errors", TCG.Prop(a.description), "", function() {
                null != globalVar.fishingGameWindows && globalVar.fishingGameWindows.close(), "user.token.expired" == a.description && ($("#logout").trigger("click"), $("#dialog_box_ok").trigger("click"))
            })
        })
    },
    checkWalletLockStatusByVendor: function(a, b) {
        var c = {
            gameVendor: a
        };
        TCG.Ajax({
            url: "./checkWalletLockStatusByVendor",
            data: c
        }, function(a) {
            1 == a.status ? 1 == a.result.lockStatus ? TCG.Confirm("确定要把钱转移到钱包内？一旦转入必须完成红利才能转出。", "", function(a) {
                b(a ? 1 : 0)
            }) : b(1) : b(0)
        })
    },
    customLoader: function(a) {},
    betMap: function(a) {
        function b(a) {
            for (var b = a.split(""), c = 0; c < b.length; c++)
                if (!isNaN(b[c])) return b.slice(0, c)
        }
        var c = {};
        c.playName = TCG.Prop("play_name_" + a.playId);
        var d = "";
        if (14 == a.playId) {
            d = a.bettingContent;
            var e = b(d);
            e = null === e ? 1 : e.length + 1, c.playName = c.playName + "(" + lott.bitsConversion("" + e) + ")"
        }
        if ($.inArray(1 * a.playId, [14, 1421]) > -1) switch (a.playId) {
            case 14:
                a.playCode = "FixedPlace_1";
                break;
            case 1421:
                a.playCode = "Last2BSOE_LF_FC3D"
        }
        if ("OECounts_11X5" == a.playCode && (d = a.bettingContent, d = d.replace(/\,/g, ""), d = lott.BSOEConversion(d)), $.inArray(a.playCode, ["Last2BSOE", "Last2BSOE_LF", "P5First2BSOE_LF", "First2BSOE", "First2BSOE_LF", "P3Last2BSOE_LF", "P5Last2BSOE_LF", "Last2BSOE_LF_FC3D"]) > -1 && (d = a.bettingContent, d = d.replace(/\,/g, ""), d = d.split("_"), d = lott.BSOEConversion(d[0]) + " | " + lott.BSOEConversion(d[1])), $.inArray(a.playCode, ["Any2Com_SSC", "Any2Com_SSC_Single", "Any2Sum_SSC", "Any3Sum_SSC", "Any3Com3_SSC", "Any3Com6_SSC", "Any3Com_SSC", "Any4Com24_SSC", "Any4Com12_SSC", "Any4Com6_SSC", "Any4Com4_SSC"]) > -1) {
            var f = a.bettingContent,
                g = f.substr(0, f.indexOf("@")),
                h = f.substr(f.indexOf("@") + 1, f.length);
            d = "(" + lott.bitsConversion(g) + ")" + h, d = d.replace(/\,/g, "")
        }
        if ($.inArray(a.playId, [13, 169, 170, 171, 172]) > -1 && (d = a.bettingContent, d = d.replace(/\,/g, "")), $.inArray(a.playId, [1470, 1471, 1472, 1473, 1474]) > -1) switch (d = a.bettingContent, d = d.replace(/\,/g, "")) {
            case "0":
                d = "虎";
                break;
            case "1":
                d = "龙"
        }
        if (1467 == a.playId) {
            d = a.bettingContent;
            var e = b(d);
            e = null === e ? 0 : e.length, d = d.replace(/\,/g, ""), d = lott.BSOEConversion(d), c.playName += lott.aloneDigitConversion("PK10", e)
        }
        if (923 == a.playId) {
            var i = ["（第一位）", "（第二位）", "（第三位）"];
            d = a.bettingContent;
            var e = b(d);
            e = null === e ? 0 : e.length, d = d.replace(/\,/g, ""), c.playName += i[e]
        }
        if (1422 == a.playId) {
            var i = ["（万）", "（千）", "（百）", "（十）", "（个）"];
            d = a.bettingContent;
            var e = b(d);
            e = null === e ? 0 : e.length, d = d.replace(/\,/g, ""), c.playName += i[e]
        }
        if (1447 == a.playId) {
            var i = ["（万）", "（千）", "（百）", "（十）", "（个）"];
            d = a.bettingContent;
            var e = b(d);
            e = null === e ? 0 : e.length, d = d.replace(/\,/g, ""), c.playName += i[e]
        }
        if (1468 == a.playId) {
            d = a.bettingContent;
            var e = b(d);
            switch (e = null === e ? 1 : e.length + 1, d = d.replace(/\,/g, ""), d = lott.BSOEConversion(d), e) {
                case 1:
                    c.playName += "(第六名)";
                    break;
                case 2:
                    c.playName += "(第七名)";
                    break;
                case 3:
                    c.playName += "(第八名)";
                    break;
                case 4:
                    c.playName += "(第九名)";
                    break;
                case 5:
                    c.playName += "(第十名)"
            }
        }
        if (1469 == a.playId) {
            d = a.bettingContent;
            var e = b(d);
            e = null === e ? 0 : e.length, d = d.replace(/\,/g, ""), d = lott.BSOEConversion(d)
        }
        if (1462 == a.playId) {
            d = a.bettingContent;
            var j = d.replace(/\,/g, ""),
                e = b(d);
            e = null === e ? 0 : e.length, d = j, c.playName += lott.aloneDigitConversion("PK10", e)
        }
        if (1463 == a.playId) {
            d = a.bettingContent;
            var j = d.replace(/\,/g, ""),
                e = b(d);
            switch (e = null === e ? 1 : e.length + 1, d = j, e) {
                case 1:
                    c.playName += "(第六名)";
                    break;
                case 2:
                    c.playName += "(第七名)";
                    break;
                case 3:
                    c.playName += "(第八名)";
                    break;
                case 4:
                    c.playName += "(第九名)";
                    break;
                case 5:
                    c.playName += "(第十名)"
            }
        }
        return c.bet = d || a.bettingContent, c
    }
};