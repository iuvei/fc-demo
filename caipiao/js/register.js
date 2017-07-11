$(function() {
    $('.password-info,.user-info').focus(function() {
        document.onkeydown = function() {
            if (event.keyCode == 13) {
                $('.password-info,.user-info').blur();
                login();
            }
        }
    });

    $('#registerBtn').click(function() {
        login();
    });

    function login() {
        var name = $("#username").val();
        var password = $("#password").val();
        var confirm_password = $("#confirm_password").val();

        if (!name) {
            layer.alert('请输入用户名！', {
                skin: 'bett-alert-dialog',
                icon: 2
            });
            return false;
        }

        if (name.length < 4 || name.length > 16) {
            layer.alert('用户名由6到16位数字或字母组成', {
                skin: 'bett-alert-dialog',
                icon: 2
            });
            return false;
        } else {
            var _reg = /^[a-zA-Z0-9]+$/;
            if(!_reg.test(name)){
                layer.alert('用户名由4到16位数字或字母组成,不能使用特殊字符', {
                    skin: 'bett-alert-dialog',
                    icon: 2
                });
                return false;
            }
        }

        if (!password) {
            layer.alert('请输入密码！', {
                skin: 'bett-alert-dialog',
                icon: 2
            });
            return false;
        }

        if (password.length < 6 || password.length > 16) {
            layer.alert('密码由6到16位数字或字母组成', {
                skin: 'bett-alert-dialog',
                icon: 2
            });
            return false;
        } else {
            var _reg = /^[a-zA-Z0-9]+$/;
            if(!_reg.test(password)){
                layer.alert('密码由6到16位数字或字母组成,不能使用特殊字符', {
                    skin: 'bett-alert-dialog',
                    icon: 2
                });
                return false;
            }
        }

        if (!confirm_password.length) {
            layer.alert('请输入确认密码！', {
                skin: 'bett-alert-dialog',
                icon: 2
            });
            return false;
        }

        if (password != confirm_password) {
            layer.alert('确认密码必需与新密码一至！', {
                skin: 'bett-alert-dialog',
                icon: 2
            });
            return false;
        }

        GLOBAL.getAjaxData({
            url: '/user/register',
            data: {
                username: name,
                password: password,
                confirm_password: confirm_password
            },
            beforeSend: function(XMLHttpRequest) {
                $("#registerBtn").val('正在登录...');
            }
        }, function(data) {
            if (data == '登录成功') {
                layer.confirm('注册成功', {
                    icon: 1,
                    closeBtn: 0,
                    skin: 'bett-alert-dialog',
                    btn: ['去登录']
                }, function(index) {
                    window.location.href = '/login.html';
                });
            }
        });
    }
});