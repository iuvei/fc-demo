! function(a, b, c) {
    a.TCG = {};
    var d = a.TCG;
    c.alerts = {
        verticalOffset: 0,
        horizontalOffset: 0,
        repositionOnResize: !0,
        overlayOpacity: .01,
        overlayColor: "#000",
        draggable: !0,
        okButton: "确定",
        cancelButton: "取消",
        dialogClass: null,
        size: {
            XXS: {
                width: "298px",
                height: "230px"
            },
            XS: {
                width: "379px",
                height: "259px"
            },
            SL: {
                width: "298px",
                height: "327px"
            },
            S: {
                width: "397px",
                height: "370px"
            },
            M: {
                width: "500px",
                height: "460px"
            },
            AM: {
                width: "500px",
                height: "490px"
            },
            L: {
                width: "561px",
                height: "580px"
            },
            CL: {
                width: "511px",
                height: "514px"
            },
            CLL: {
                width: "347px",
                height: "365px"
            },
            depoL: {
                width: "710px",
                height: "500px"
            }
        },
        alert: function(a, b, d, e) {
            switch (d) {
                case "L":
                    c.alerts._show("L", b, !1, null, function(a) {
                        c("div.model_child_content #loading").remove(), e && e(a)
                    });
                    break;
                case "M":
                    c.alerts._show("AM", b, !0, a, function(a) {
                        c("div.model_child_content #loading").remove(), e && e(a)
                    });
                    break;
                case "CLL":
                    c.alerts._show("CLL", b, !0, a, function(a) {
                        c("div.model_child_content #loading").remove(), e && e(a)
                    });
                    break;
                case "depoL":
                    c.alerts._show("depoL", b, !0, a, function(a) {
                        c("div.model_child_content #loading").remove(), e && e(a)
                    });
                    break;
                default:
                    c.alerts._show("XS", b, !0, a, function(a) {
                        c("div.model_child_content #loading").remove(), e && e(a)
                    })
            }
        },
        confirm: function(a, b, d, e) {
            switch (e || (e = "confirm"), b) {
                case "S":
                    c.alerts._show("S", a, !0, e, function(a) {
                        d && d(a)
                    });
                    break;
                case "SL":
                    c.alerts._show("SL", a, !0, e, function(a) {
                        d && d(a)
                    });
                    break;
                case "XXS":
                    c.alerts._show("XXS", a, !0, e, function(a) {
                        d && d(a)
                    });
                    break;
                case "M":
                    c.alerts._show("M", a, !0, e, function(a) {
                        d && d(a)
                    });
                    break;
                case "L":
                    c.alerts._show("CL", a, !0, e, function(a) {
                        d && d(a)
                    });
                    break;
                default:
                    c.alerts._show("XS", a, !0, e, function(a) {
                        d && d(a)
                    })
            }
        },
        _show: function(a, d, e, f, g) {
            c.alerts._overlay("show");
            var h = '<div id="dialog_box_container"><div id="dialog_box_title"><div id="dialog_box_icon"></div></div><div id="dialog_box_content"></div></div>';
            e || (h = '<div id="dialog_box_container"><div id="dialog_box_content"></div></div>'), c("BODY").append(h), a && c("#dialog_box_container").css({
                width: c.alerts.size[a].width,
                height: c.alerts.size[a].height
            }), "L" == a && (c("#dialog_box_container").css({
                backgroundColor: "rgba(24, 30, 64, 1)"
            }), c("#dialog_box_content").css({
                margin: "31px 0px 0px 0px"
            }));
            var i = void 0 === b.body.style.maxHeight ? "absolute" : "fixed";
            switch (c("#dialog_box_container").css({
                position: i,
                zIndex: 1999,
                padding: 0,
                margin: 0
            }), c("#dialog_box_icon").addClass(f), c("#dialog_box_content").html(d), c.alerts._reposition(), c.alerts._maintainPosition(!0), f) {
                case "others":
                case "confirm":
                    c("#dialog_box_content").after('<div id="dialog_box_button"><input type="button" value="' + c.alerts.okButton + '" id="dialog_box_ok" /> <input type="button" value="' + c.alerts.cancelButton + '" id="dialog_box_cancel" /></div>'), c("#dialog_box_ok").click(function() {
                        c.alerts._hide(), g && g(!0)
                    }), c("#dialog_box_cancel").click(function() {
                        c.alerts._hide(), g && g(!1)
                    }), c("#dialog_box_ok").focus(), c("#dialog_box_ok, #dialog_box_cancel").keypress(function(a) {
                        13 == a.keyCode && c("#dialog_box_ok").trigger("click"), 27 == a.keyCode && c("#dialog_box_cancel").trigger("click")
                    });
                    break;
                default:
                    c("#dialog_box_content").after('<div id="dialog_box_button"><input type="button" value="' + c.alerts.okButton + '" id="dialog_box_ok" /></div>'), c("#dialog_box_ok").click(function() {
                        c.alerts._hide(), g(!0)
                    }), c("#dialog_box_ok").focus().keypress(function(a) {
                        13 != a.keyCode && 27 != a.keyCode || c("#dialog_box_ok").trigger("click")
                    })
            }
            if (c.alerts.draggable) try {
                c("#dialog_box_container").draggable({
                    handle: c("#dialog_box_title")
                }), c("#dialog_box_title").css({
                    cursor: "move"
                })
            } catch (a) {}
        },
        _hide: function() {
            c("#dialog_box_container").remove(), c.alerts._overlay("hide"), c.alerts._maintainPosition(!1)
        },
        _overlay: function(a) {
            switch (a) {
                case "show":
                    c.alerts._overlay("hide"), c("BODY").append('<div id="dialog_box_overlay"></div>'), c("#dialog_box_overlay").css({
                        position: "absolute",
                        zIndex: 1998,
                        top: "0px",
                        left: "0px",
                        width: "100%",
                        height: c(b).height(),
                        background: c.alerts.overlayColor,
                        opacity: c.alerts.overlayOpacity
                    });
                    break;
                case "hide":
                    c("#dialog_box_overlay").remove()
            }
        },
        _reposition: function() {
            var d = c(a).height() / 2 - c("#dialog_box_container").outerHeight() / 2 + c.alerts.verticalOffset,
                e = c(a).width() / 2 - c("#dialog_box_container").outerWidth() / 2 + c.alerts.horizontalOffset;
            d < 0 && (d = 0), e < 0 && (e = 0), void 0 === b.body.style.maxHeight && (d += c(a).scrollTop()), c("#dialog_box_container").css({
                top: d + "px",
                left: e + "px"
            }), c("#dialog_box_overlay").height(c(b).height())
        },
        _maintainPosition: function(b) {
            if (c.alerts.repositionOnResize) switch (b) {
                case !0:
                    c(a).bind("resize", c.alerts._reposition);
                    break;
                case !1:
                    c(a).unbind("resize", c.alerts._reposition)
            }
        }
    }, d.Alert = function(a, b, d, e, f) {
        1 * c("#dialog_box_button input").size() == 2 ? c("#dialog_box_cancel").trigger("click") : c.alerts._hide(), c.alerts.okButton = void 0 == f || null == f || "" == f ? "确定" : f, c.alerts.alert(a, b, d, e)
    }, d.Confirm = function(a, b, d, e, f, g) {
        1 * c("#dialog_box_button input").size() == 2 ? c("#dialog_box_cancel").trigger("click") : c.alerts._hide(), c.alerts.okButton = void 0 == e || null == e || "" == e ? "确定" : e, c.alerts.cancelButton = void 0 == f || null == f || "" == f ? "取消" : f, c.alerts.confirm(a, b, d, g)
    }, c.popups = {
        id: "",
        opacity: .6,
        overlayColor: "#000",
        show: function(arguments, a, d) {
            var e = {
                text: "",
                isWindow: !0,
                transparent: !1,
                width: "1270px",
                height: "657px"
            };
            e.text = void 0 !== arguments.text ? arguments.text : e.text, e.isWindow = void 0 !== arguments.isWindow ? arguments.isWindow : e.isWindow, e.transparent = void 0 !== arguments.transparent ? arguments.transparent : e.transparent, e.width = void 0 !== arguments.width ? arguments.width : e.width, e.height = void 0 !== arguments.height ? arguments.height : e.height, c.popups.opacity = e.transparent ? .01 : .6, c.popups.overlayColor = e.isWindow ? "#000" : "#fff", c.popups.hide(), c.popups.overlay("show"), e.isWindow ? (c.popups.id = "#theme_popup", c("body").append('<div id="theme_popup"><div id="popup_close"></div><div id="popup_content"></div></div>'), c(c.popups.id).css({
                width: e.width,
                height: e.height
            }), c("#popup_content").html(e.text)) : (c.popups.id = "#loading", c("body").append('<div id="loading"></div>'));
            var f = void 0 === b.body.style.maxHeight ? "absolute" : "fixed";
            c(c.popups.id).css({
                position: f,
                zIndex: 199,
                padding: 0,
                margin: 0
            }), c.popups.reposition(), c.popups.maintainPosition(!0), c("#popup_close").unbind("click"), c("#popup_close").bind("click", function() {
                c.popups.hide(), d && d()
            }), a && a()
        },
        hide: function() {
            c(c.popups.id).remove(), c.popups.overlay("hide"), c.popups.maintainPosition(!1), c.popups.id = ""
        },
        overlay: function(a) {
            switch (a) {
                case "show":
                    c.popups.overlay("hide"), c("BODY").append('<div id="popups_overlay"></div>'), c("#popups_overlay").css({
                        position: "absolute",
                        zIndex: 198,
                        top: "0px",
                        left: "0px",
                        width: "100%",
                        height: c(b).height(),
                        background: c.popups.overlayColor,
                        opacity: c.popups.opacity
                    });
                    break;
                case "hide":
                    c("#popups_overlay").remove()
            }
        },
        reposition: function() {
            var d = c(a).height() / 2 - c(c.popups.id).outerHeight() / 2 + 0,
                e = c(a).width() / 2 - c(c.popups.id).outerWidth() / 2 + 0;
            d < 0 && (d = 0), e < 0 && (e = 0), void 0 === b.body.style.maxHeight && (d += c(a).scrollTop()), c(c.popups.id).css({
                top: d + "px",
                left: e + "px"
            }), c("#popups_overlay").height(c(b).height())
        },
        maintainPosition: function(b) {
            switch (b) {
                case !0:
                    c(a).bind("resize", c.popups.reposition);
                    break;
                case !1:
                    c(a).unbind("resize", c.popups.reposition)
            }
        }
    }, d.WinOpen = function(arguments, a, b) {
        c.popups.show(arguments, a, b)
    }, d.WinClose = function() {
        c.popups.hide()
    }, c.lock = {
        id: "",
        zIndex: 0,
        opacity: .6,
        overlayColor: "#fff",
        overlayId: "",
        layZIndex: 0,
        size: {
            XS: {
                width: "320px",
                height: "auto"
            }
        },
        init: function(a) {
            "loading" == a && (c.lock.overlayId = "lock_overlay", c.lock.id = "#loading", c.lock.zIndex = 299, c.lock.layZIndex = 298, c.lock.opacity = .6), "message" == a && (c.lock.overlayId = "message_overlay", c.lock.id = "#lock_container", c.lock.zIndex = 2999, c.lock.layZIndex = 2998, c.lock.opacity = .01)
        },
        show: function(a, d) {
            c.lock.hide(a), c.lock.overlay("show");
            var e = "";
            "loading" == a && (e = '<div id="loading"></div>'), "message" == a && (e = '<div id="lock_container"><span class="msgIcon"></span><div id="lock_content"></div></div>'), c("body").append(e), "message" == a && c("#lock_container").css({
                width: c.lock.size.XS.width,
                height: c.lock.size.XS.height
            });
            var f = void 0 === b.body.style.maxHeight ? "absolute" : "fixed";
            c(c.lock.id).css({
                position: f,
                zIndex: c.lock.zIndex,
                padding: 0,
                margin: 0
            }), "message" == a && d && (c("#lock_container").css({
                padding: "30px 0px 30px 0px"
            }), c("#lock_content").html(d)), c.lock.reposition(), c.lock.maintainPosition(!0)
        },
        hide: function(a) {
            c.lock.init(a), c(c.lock.id).remove(), c.lock.overlay("hide"), c.lock.maintainPosition(!1)
        },
        overlay: function(a) {
            switch (a) {
                case "show":
                    c.lock.overlay("hide"), c("BODY").append('<div id="' + c.lock.overlayId + '"></div>'), c("#" + c.lock.overlayId).css({
                        position: "absolute",
                        zIndex: c.lock.layZIndex,
                        top: "0px",
                        left: "0px",
                        width: "100%",
                        height: c(b).height(),
                        background: c.lock.overlayColor,
                        opacity: c.lock.opacity
                    });
                    break;
                case "hide":
                    c("#" + c.lock.overlayId).remove()
            }
        },
        reposition: function() {
            var d = c(a).height() / 2 - c(c.lock.id).outerHeight() / 2 + 0,
                e = c(a).width() / 2 - c(c.lock.id).outerWidth() / 2 + 0;
            d < 0 && (d = 0), e < 0 && (e = 0), void 0 === b.body.style.maxHeight && (d += c(a).scrollTop()), c(c.lock.id).css({
                top: d + "px",
                left: e + "px"
            }), c("#" + c.lock.overlayId).height(c(b).height())
        },
        maintainPosition: function(b) {
            switch (b) {
                case !0:
                    c(a).bind("resize", c.lock.reposition);
                    break;
                case !1:
                    c(a).unbind("resize", c.lock.reposition)
            }
        }
    }, d.showLoading = function() {
        c.lock.show("loading")
    }, d.hideLoading = function() {
        c.lock.hide("loading")
    }, d.showMessage = function(a) {
        c.lock.show("message", a)
    }, d.hideMessage = function() {
        c.lock.hide("message")
    }, d.Ajax = function(arguments, b, e) {
        var f = arguments.url;
        return arguments.type || (arguments.type = "GET"), arguments.dataType || (arguments.dataType = "json"), arguments.async && "boolean" == typeof arguments.async || (arguments.async = !0), arguments.lock && "boolean" == typeof arguments.lock || (arguments.lock = !1), arguments.cache || (arguments.cache = !1), arguments.beforeSend = function(a) {
            this.lock && d.showLoading()
        }, arguments.error || (arguments.error = function(b) {
            401 == b.status && (d.Alert("alerts", "账号已登出，请重新登录<br><span style='font-size: 10px;color: #5c5c5c;'>URL:" + f + "<br>TOKEN:" + a.sessionStorage.getItem("token") + "</span>", "XS"), a.sessionStorage.clear(), a.setTimeout(function() {
                d.Ajax({
                    url: "./logout"
                }, function(b) {
                    localStorage.clear(), a.location.href = "index.html"
                })
            }, 2e3)), 500 == b.status && ("CUSTOMER_NOT_LOGIN" == b.responseJSON.errorCode ? (d.Alert("alerts", "账号已登出，请重新登录<br><span style='font-size: 10px;color: #5c5c5c;'>URL:" + f + "<br>TOKEN:" + a.sessionStorage.getItem("token") + "</span>", "XS"), a.sessionStorage.clear(), a.setTimeout(function() {
                d.Ajax({
                    url: "./logout"
                }, function(b) {
                    localStorage.clear(), a.location.href = "index.html"
                })
            }, 2e3)) : (d.Alert("errors", d.Prop(b.responseJSON.errorCode)), e && e(b)))
        }), arguments.success = function(e) {
            if ("text" !== this.dataType && "html" !== this.dataType || !this.id || c(this.id).html(e), "json" === this.dataType) {
                if (f.indexOf("memberinfo") < 0 && f.indexOf("logout") < 0 && !e.status && "login.not.session" == e.description) {
                    d.Alert("errors", "账号已登出，请重新登录<br><span style='font-size: 10px;color: #5c5c5c;'>URL:" + f + "<br>TOKEN:" + a.sessionStorage.getItem("token") + "</span>", "XS"), a.sessionStorage.clear();
                    var g = a.setTimeout(function() {
                        a.location.href = "index.html"
                    }, 2e3);
                    return void globalVar.lottDrawNumberTimer.push(g)
                }
                e.status && this.id && "string" == typeof e.data && c(this.id).html(e.data)
            }
            b && b(e)
        }, arguments.complete = function(a, b) {
            this.lock && d.hideLoading()
        }, c.ajax(arguments)
    }, d.loadLanguageProperties = function(a, b) {
        void 0 != a && "undefined" != a && "" != a || (a = "zh-CN"), c.i18n.properties({
            name: "message",
            path: "resource/",
            mode: "map",
            language: a,
            cache: !0,
            callback: function() {
                b && b()
            },
            error: function() {}
        })
    }, d.Prop = c.i18n.prop, d.loadLanguageProperties(), d.desEncrypt = function(a, b) {
        var c = CryptoJS.enc.Utf8.parse(b);
        return CryptoJS.DES.encrypt(a, c, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }).toString()
    }, d.desDecrypt = function(a, b) {
        var c = CryptoJS.enc.Utf8.parse(b);
        return CryptoJS.DES.decrypt({
            ciphertext: CryptoJS.enc.Base64.parse(a)
        }, c, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8)
    }, Array.prototype.indexOf || (Array.prototype.indexOf = function(a, b) {
        var c;
        if (null == this) throw new TypeError('"this" is null or not defined');
        var d = Object(this),
            e = d.length >>> 0;
        if (0 === e) return -1;
        var f = +b || 0;
        if (Math.abs(f) === 1 / 0 && (f = 0), f >= e) return -1;
        for (c = Math.max(f >= 0 ? f : e - Math.abs(f), 0); c < e;) {
            if (c in d && d[c] === a) return c;
            c++
        }
        return -1
    })
}(window, document, jQuery),
function() {
    function a(a, b) {
        return this.slice(a, b)
    }

    function b(a, b) {
        arguments.length < 2 && (b = 0);
        for (var c = 0, d = a.length; c < d; ++c, ++b) this[b] = 255 & a[c]
    }

    function c(c) {
        var d;
        if ("number" == typeof c) {
            d = new Array(c);
            for (var e = 0; e < c; ++e) d[e] = 0
        } else d = c.slice(0);
        return d.subarray = a, d.buffer = d, d.byteLength = d.length, d.set = b, "object" == typeof c && c.buffer && (d.buffer = c.buffer), d
    }
    try {
        new Uint8Array(1);
        return
    } catch (a) {}
    window.Uint8Array = c, window.Uint32Array = c, window.Int32Array = c
}(),
function() {
    "response" in XMLHttpRequest.prototype || "mozResponseArrayBuffer" in XMLHttpRequest.prototype || "mozResponse" in XMLHttpRequest.prototype || "responseArrayBuffer" in XMLHttpRequest.prototype || Object.defineProperty(XMLHttpRequest.prototype, "response", {
        get: function() {
            return new Uint8Array(new VBArray(this.responseBody).toArray())
        }
    })
}(),
function() {
    if (!("btoa" in window)) {
        var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        window.btoa = function(b) {
            var c, d, e = "";
            for (c = 0, d = b.length; c < d; c += 3) {
                var f = 255 & b.charCodeAt(c),
                    g = 255 & b.charCodeAt(c + 1),
                    h = 255 & b.charCodeAt(c + 2),
                    i = f >> 2,
                    j = (3 & f) << 4 | g >> 4,
                    k = c + 1 < d ? (15 & g) << 2 | h >> 6 : 64,
                    l = c + 2 < d ? 63 & h : 64;
                e += a.charAt(i) + a.charAt(j) + a.charAt(k) + a.charAt(l)
            }
            return e
        }
    }
}(),
function() {
    function a() {
        if (!(this instanceof a)) return new a;
        this.boundary = "------WebKitFormBoundary" + Math.random().toString(36);
        var b = this.data = [];
        this.__append = function(a) {
            var c, d = 0;
            if ("string" == typeof a)
                for (c = a.length; d < c; d++) b.push(255 & a.charCodeAt(d));
            else if (a && a.byteLength) {
                "byteOffset" in a || (a = new Uint8Array(a));
                for (c = a.byteLength; d < c; d++) b.push(255 & a[d])
            }
        }
    }(void 0 == this ? self : this).FormData = a;
    var b = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function(c) {
        return c instanceof a && (c.__endedMultipart || c.__append("--" + c.boundary + "--\r\n"), c.__endedMultipart = !0, this.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + c.boundary), c = new Uint8Array(c.data).buffer), b.call(this, c)
    }, a.prototype.append = function(a, b, c) {
        this.__endedMultipart && (this.data.length -= this.boundary.length + 6, this.__endedMultipart = !1);
        var d = Object.prototype.toString.call(b),
            e = "--" + this.boundary + '\r\nContent-Disposition: form-data; name="' + a + '"';
        if (/^\[object (?:Blob|File)(?:Constructor)?\]$/.test(d)) return this.append(a, new Uint8Array((new FileReaderSync).readAsArrayBuffer(b)), c || b.name);
        /^\[object (?:Uint8Array|ArrayBuffer)(?:Constructor)?\]$/.test(d) ? (e += '; filename="' + (c || "render.png").replace(/"/g, "%22") + '"\r\n', e += "Content-Type: image/png\r\n\r\n", this.__append(e), this.__append(b), e = "\r\n") : e += "\r\n\r\n" + b + "\r\n", this.__append(e)
    }
}();