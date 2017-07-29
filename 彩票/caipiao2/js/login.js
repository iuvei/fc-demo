$(function() {
    $('.password-info,.user-info').focus(function() {
        document.onkeydown = function() {
            if (event.keyCode == 13) {
                $('.password-info,.user-info').blur();
                login();
            }
        }
    });

    $('#loginBtn').click(function() {
        login();
    });

    function login() {
        var name = $("#username").val();
        var password = $("#password").val();

        if (!name) {
            layer.alert('请输入登录账号！', {
                skin: 'bett-alert-dialog',
                icon: 2
            });
            return false;
        }

        if (!password) {
            layer.alert('请输入登录密码！', {
                skin: 'bett-alert-dialog',
                icon: 2
            });
            return false;
        }

        GLOBAL.getAjaxData({
            url: '/user/login',
            data: {
                username: name,
                password: password
            },
            beforeSend: function(XMLHttpRequest) {
                $("#loginBtn").val('正在登录...');
            }
        }, function(data) {
            if (data == '登录成功') {
                var date = new Date();
                date.setTime(date.getTime() + (2 * 24 * 60 * 60 * 1000)); //2天后的cookie过期
                GLOBAL.COOKIE.setCookieItem('bet_username', username, 2);
                GLOBAL.COOKIE.setCookieItem('bet_password', password, 2);
                window.location.href = 'index.html';
            }
        }, function(data) {
            if (data == '你已经登录') {
                layer.confirm('你已经登录', {
                    skin: 'bett-alert-dialog',
                    icon: 2,
                    btn: ['立即登录']
                }, function() {
                    window.location.href = 'index.html';
                    layer.closeAll();
                });
            } else {
                GLOBAL.alert(data);
            }
        });
    }
});