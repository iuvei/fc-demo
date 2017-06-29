var im = {};
im.drawNumberStompTopic = [], im.userTopic = {}, im.connect = function(a, b) {
    UU.webMessageBridgeInst.connect(a, "/rtmsg", b)
}, im.subscribeDrawResult = function(a, b) {
    var c = "/topic/draw_number/" + a;
    this.drawNumberStompTopic[a] = new UU.StompTopic, this.drawNumberStompTopic[a].topic = c, this.drawNumberStompTopic[a].subscribe(function(a) {
        b(a)
    })
}, im.unSubscribeDrawResult = function(a) {
    this.drawNumberStompTopic[a] && this.drawNumberStompTopic[a].unsubscribe()
}, im.subscribeUserChannel = function(a, b) {
    var c = "/topic/user/" + a;
    this.userTopic = new UU.StompTopic, this.userTopic.topic = c, this.userTopic.subscribe(function(a) {
        b(a)
    })
}, im.unSubscribeUserChannel = function(a) {
    this.userTopic.unsubscribe()
};