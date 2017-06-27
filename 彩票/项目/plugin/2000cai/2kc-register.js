$(document).ready(function() {
    var a = {
        merchantCode: "2000cai",
        affCode: "",
        expiredAffCode: !1,
        init: function() {
            a.checkAffUrl(), a.events(), a.loadErrorMessages(), document.getElementsByClassName("form-control ch-inpt")[1].setAttribute("maxlength", "16")
        },
        checkAffUrl: function() {
            var b = window.location.hostname,
                c = b.substring(0, b.indexOf(".", 0));
            "www" != c && TCG.Ajax({
                url: "./affiliate",
                data: {
                    merchantCode: a.merchantCode,
                    code: c
                }
            }, function(b) {
                if (b.status) {
                    if (null != b.result.qq) {
                        var d = b.result.qq;
                        _link = "<li><a href='http://wpa.qq.com/msgrd?v=3&uin=" + d + "&site=qq&menu=yes' target='_blank'>联系代理</a></li>", $("#csLink").after(_link)
                    }
                    "expired.affiliate.url" == b.description ? (TCG.Alert("errors", TCG.Prop(b.description)), a.expiredAffCode = !0, a.affCode = "", $(".form-submit").attr("disabled", "true")) : (a.affCode = c, a.expiredAffCode = !1)
                } else TCG.Alert("errors", TCG.Prop(b.description)), a.expiredAffCode = !0, a.affCode = "", $(".form-submit").attr("disabled", "true")
            })
        },
        events: function() {
            $(document).on("click", "#termsAndCondition", function() {
                TCG.Ajax({
                    url: "./xml/userAgreement.xml",
                    dataType: "html",
                    cache: !1
                }, function(a) {
                    TCG.WinOpen({
                        width: "700px",
                        height: "600px",
                        text: a
                    }, function() {
                        console.log("test")
                    })
                })
            }), $(document).on("click", "#closeUserAgreement", function() {
                TCG.hideLoading()
            }), $(document).on("click", "#csLink > a", function() {
                var a = void 0 != window.screenLeft ? window.screenLeft : screen.left,
                    b = void 0 != window.screenTop ? window.screenTop : screen.top,
                    c = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
                    d = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
                    e = c / 2 - 400 + a,
                    f = d / 2 - 280 + b,
                    g = window.open("http://kf1.learnsaas.com/chat/chatClient/chatbox.jsp?companyID=688455&configID=57905&jid=9040258761", "CustomerService", "resizable= no, menubar=no, status=no, toolbar=no, scrollbars=no, width=800, height=560, top=" + f + ", left=" + e);
                window.focus && g.focus()
            }), $(document).on("click", "#registerForm .form-submit", function() {
                $("#registerForm")[0].childNodes[1].childNodes[5].removeAttribute("name");
                var b = $("#registerForm"),
                    c = (b.find(".form-reset"), b.find(".form-submit")),
                    d = b.find("[name='username']"),
                    e = b.find("[name='pass']"),
                    f = b.find("[name='conPass']"),
                    g = b.find("[name='terms']"),
                    h = a.merchantCode,
                    i = a.affCode;
                if (console.log("Conpass: " + f), !a.checkUsername(d)) return void d.focus();
                if (!a.checkPassword(e, f)) return void e.focus();
                if (!a.confirmPassword(e, f)) return void f.focus();
                if (0 == a.expiredAffCode)
                    if ("123456" != e.val())
                        if (g.is(":checked")) {
                            if (!c.hasClass("processing")) {
                                c.addClass("processing");
                                var j = [h, d.val(), "", e.val(), f.val(), "", "", "", i],
                                    k = {
                                        values: a.encode(j)
                                    };
                                $.ajax({
                                    url: "./register",
                                    data: k,
                                    type: "POST",
                                    dataType: "JSON",
                                    cache: !1
                                }).success(function(b) {
                                    b.status ? TCG.Alert("success", "注册成功 <br /> 帐号：" + d.val(), "", function() {
                                        TCG.showLoading();
                                        var b = {
                                            values: a.encode([h, d.val(), e.val(), 11111])
                                        };
                                        $.ajax({
                                            url: "./login",
                                            data: b,
                                            type: "POST",
                                            dataType: "JSON",
                                            cache: !1
                                        }).success(function(a) {
                                            a.status ? (window.sessionStorage.setItem("username", a.result.userName), window.sessionStorage.setItem("token", a.result.token), window.location = "index.html") : (TCG.Alert("errors", TCG.Prop(a.description)), TCG.hideLoading()), "function" == typeof callback && callback(a.status)
                                        })
                                    }, "进入游戏") : (TCG.Alert("errors", TCG.Prop(b.description)), c.removeClass("processing"))
                                })
                            }
                        } else TCG.Alert("errors", TCG.Prop("registerForm_terms_required"));
                else TCG.Alert("errors", TCG.Prop("registerForm_passwordStrength")), e.parents(".form-group").removeClass("valid").addClass("invalid");
                else TCG.Alert("errors", TCG.Prop("expired.affiliate.url"))
            }), $(document).on("keyup", "#registerForm [name='username']", function() {
                a.checkUsername($(this))
            }), $(document).on("focusout", "#registerForm [name='username']", function() {
                a.checkUsernameAvailability($(this))
            }), $(document).on("keyup", "#registerForm [name='pass']", function() {
                var b = $(this),
                    c = $("#registerForm [name='conPass']");
                a.checkPassword(b, c)
            }), $(document).off("keyup", "#registerForm [name='conPass']").on("keyup", "#registerForm [name='conPass']", function() {
                var b = $("#registerForm [name='pass']"),
                    c = $(this);
                a.confirmPassword(b, c)
            }), $(document).on("change", "[name='terms']", function() {
                $(this).is(":checked") ? $(".checkicon").removeClass("reg-unchecked").addClass("reg-checked") : $(".checkicon").removeClass("reg-checked").addClass("reg-unchecked")
            }), $(document).off("focusout", "#registerForm input").on("focusout", "#registerForm input", function() {
                $(".err-msg", $(this).parent()).addClass("hide")
            }), $(document).off("focus", "#registerForm input").on("focus", "#registerForm input", function() {
                $(".err-msg", $(this).parent()).removeClass("hide")
            }), $(document).on("keyup", "form .form-control", function(a) {
                13 == a.which && $(this).parents("form").find(".form-submit").click()
            })
        },
        checkUsername: function(a) {
            var b = !1;
            return "" == a.val() || !/^[\w]{6,11}$/.test(a.val()) || /^\d+$/.test(a.val().charAt(0)) ? a.parents(".form-group").removeClass("valid").addClass("invalid") : (a.parents(".form-group").removeClass("invalid").addClass("valid"), b = !0), b
        },
        checkUsernameAvailability: function(b) {
            if (a.checkUsername(b)) {
                var c = {
                    merchantCode: a.merchantCode,
                    username: b.val()
                };
                $.ajax({
                    url: "./checkUsername",
                    type: "POST",
                    dataType: "JSON",
                    data: c,
                    success: function(a) {
                        a.status || (TCG.Alert("errors", TCG.Prop(a.description)), b.parents(".form-group").removeClass("valid").addClass("invalid"))
                    }
                })
            }
        },
        checkPassword: function(b, c) {
            var d = !1;
            return "" != b.val() && /^[\w]{6,16}$/.test(b.val()) ? (b.parents(".form-group").removeClass("invalid").addClass("valid"), d = !0) : b.parents(".form-group").removeClass("valid").addClass("invalid"), "" != c.val() && a.confirmPassword(b, c), d
        },
        confirmPassword: function(a, b) {
            var c = !1;
            return "" == a.val() || a.val() != b.val() ? b.parents(".form-group").removeClass("valid").addClass("invalid") : (b.parents(".form-group").removeClass("invalid").addClass("valid"), c = !0), c
        },
        loadErrorMessages: function() {
            $("#registerForm [data-errMsg]").each(function(a) {
                var b = TCG.Prop($(this).attr("data-errMsg"));
                $(this).html(b)
            })
        },
        encode: function(a) {
            for (var b = [], c = 0; c < a.length; c++) b.push(encodeURI(a[c]));
            return getEncryptedText(b)
        }
    };
    a.init()
});