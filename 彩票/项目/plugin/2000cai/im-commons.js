var UU = {};
UU.websocket_debug = !1, UU.tool = {
    isEmpty: function(a) {
        return !a || /^\s*$/.test(a)
    }
}, UU.WebMessageBridge = function() {}, UU.WebMessageBridge.prototype = {
    endpoint: "",
    connected: !1,
    disconnected: !1,
    sockjs: void 0,
    stompClient: void 0,
    reconnectTimer: void 0,
    reconnectTimeout: 1e4,
    connect: function(a, b, c) {
        var d = this;
        if (UU.tool.isEmpty(b)) {
            if (UU.tool.isEmpty(d.endpoint)) throw "connect endpoint is null."
        } else d.endpoint = b, d.disconnected = !1;
        d.sockjs = new SockJS(d.endpoint, null, null), d.stompClient = Stomp.over(d.sockjs), UU.websocket_debug || (d.stompClient.debug = null), d.stompClient.connect(a, a, function(a) {
            d.connected = !0, c && c()
        }, function() {
            d.disconnected || (d.disconnected = !1, d.reconnect())
        })
    },
    disconnect: function() {
        if (clearTimeout(this.reconnectTimer), this.disconnected = !0, stompClient) {
            try {
                this.stompClient.disconnect()
            } catch (a) {}
            this.connected = !1, this.stompClient = void 0, delete this.sockjs, this.sockjs = void 0
        }
    },
    subscribe: function(a, b) {
        if (this.connected) return this.stompClient.subscribe(a, b)
    },
    stateChanaged: function() {},
    reconnect: function() {
        var a = this;
        a.reconnectTimer = setTimeout(function() {
            a.connect()
        }, this.reconnectTimeout)
    }
}, UU.webMessageBridgeInst = new UU.WebMessageBridge, UU.StompTopic = function() {}, UU.StompTopic.prototype = {
    messageBridge: UU.webMessageBridgeInst,
    subscription: null,
    funcCallback: null,
    onSubscribeCallback: void 0,
    topic: "",
    message: "",
    unsubscribe: function() {
        null != this.subscription && this.subscription.unsubscribe(), this.subscription = null, this.funcCallback = null, this.message = ""
    },
    subscribe: function(a, b) {
        var c = this;
        this.funcCallback = a, this.onSubscribeCallback = b, setTimeout(function() {
            c.subscription = c.messageBridge.subscribe(c.topic, function(b) {
                c.message = b, a && a(b.body)
            }), c.subscription && "function" == typeof b && b()
        }, 1500)
    },
    connectedChanage: function() {
        this.messageBridge.connected && this.funcCallback && this.subscribe(this.funcCallback, this.onSubscribeCallback)
    }
};