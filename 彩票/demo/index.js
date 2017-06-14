var E = {
    init: function() {

        E.countDown();
        E.bindEvent();
    },
    bindEvent: function() {
        $('#J_checkLogin').click(function(){
            if (E.checkLogin()) {
                console.log('已经登录了');
            } else  {
                E.warnLogin();
            }
        });
    },
    countDown: function() {
        // 倒计时
        $('.J_countDown').each(function(i) {
            var _this = $(this);
            var _times = _this.data('times');

            _this.html(transFormNum(_times));
            setInterval(function() {
                if (_times < 1) {
                    _times = _this.data('max');
                } else {
                    _times--;
                }
                _this.html(transFormNum(_times));
            }, 1000);
        });

        function transFormNum(num, max) {
            var _str = '';

            if (num <= 60) {
                _str = '00' + ' : ' + '00' + ' : ' + _toDouble(num);
            } else if (num > 60 && num < 3600) {
                _str = '00' + ' : ' + _toDouble(parseInt(num / 60)) + ' : ' + _toDouble(num % 60);
            } else if (num >= 3600) {
                _str = _toDouble(parseInt(num / 3600)) + ' : ' + _toDouble(parseInt((num - 3600 * parseInt(num / 3600)) / 60)) + ' : ' + _toDouble(num % 60);
            }

            function _toDouble(n) {
                if (n < 10) {
                    return '0' + n;
                } else {
                    return n;
                }
            }
            return _str;
        }
    },
    checkLogin : function() {
        var _flag = false;

        // TODO : 校验登录
        if (1) {
            _flag = true;
        }

        return _flag;
    },
    warnLogin : function() {
        console.log('去登录');
    }
};