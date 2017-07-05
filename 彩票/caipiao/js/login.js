$('.hm-btn').click(function() {
    if ($('#afterLogin').css('display') == 'none') {
        layer.confirm('您还未登录，请先登录！', {
            skin: 'warning-class',
            title: '',
            maxmin: true, //开启最大化最小化按钮
            area: ['380px', '260px'],
            btn: ['确定']
        }, function() {
            layer.closeAll();
        });
        $(this).unbind('click');
        return false;
    }
});

function validata() {
    var name = $("#username").val();
    var password = $("#password").val();
    if ($('.ch-inpt').val() == '') {
        $('.ch-inpt').focus();
    }
    if (name == "") {
        layer.confirm('请输入登录账号！', {
            skin: 'error-class',
            title: '',
            maxmin: true, //开启最大化最小化按钮
            area: ['380px', '260px'],
            btn: ['确定']
        }, function() {
            layer.closeAll();
        });
        return false;
    }

    if (password == "") {
        layer.confirm('请输入登录密码！', {
            skin: 'error-class',
            title: '',
            maxmin: true, //开启最大化最小化按钮
            area: ['380px', '260px'],
            btn: ['确定']
        }, function() {
            layer.closeAll();
        });
        return false;
    }
    //登录
    var user = {
        username: $("#username").val(),
        password: $("#password").val()
    };

    denglu(user);
}

function denglu(user) {
    $.ajax({
        type: "POST",
        url: "/user/login",
        data: user,
        datatype: "json",
        beforeSend: function(XMLHttpRequest) {
            $("#loginBtn").val('正在登录...');
        },
        success: function(data, textStatus) {
            console.log('登录成功！');
            console.log(textStatus);
            console.log(data);
            var status = data.message;
            $('#loginStatus').val(data.status);
            var username = $('#username').val();
            var password = $("#password").val();
            $("#loading").fadeOut();
            if (status == '登录成功') {
                var date = new Date();
                date.setTime(date.getTime() + (2 * 24 * 60 * 60 * 1000)); //2天后的cookie过期
                $.cookie("username", username, {
                    path: '/',
                    expires: date
                });
                $.cookie("password", password, {
                    path: '/',
                    expires: date
                });
                window.open("/home.html", "_self");
                BallInfo();
            } 
            if (data.message == '你已经登录'){
                layer.confirm('你已经登录', {
                    skin: 'warning-class',
                    title: '',
                    maxmin: true, //开启最大化最小化按钮
                    area: ['380px', '260px'],
                    btn: ['立即登录']
                }, function() {
                    window.open("/home.html", "_self");
                    BallInfo();
                    layer.closeAll();
                });
            }


        },
        complete: function(XMLHttpRequest, textStatus) {
            console.log(XMLHttpRequest.responseText);
            console.log(textStatus);
        },
        error: function() {
            console.log('请求失败！');
        }
    });
}
//获取code值
function queryString(key)
{
    var regex_str = "^.+\\?.*?\\b"+ key +"=(.*?)(?:(?=&)|$|#)";
    var regex = new RegExp(regex_str,"i");
    var url = window.location.toString();
    if(regex.test(url)) return RegExp.$1;
    return undefined;
}
var this_code=$('#code').val();
if(this_code!=undefined){
    document.getElementById("code").value = queryString("name");
}


//账号注册
function login() {
    var name = $("#username").val();
    var password = $("#password").val();
    var confirm = $("#confirm-password").val();
    var regNum = /^[A-Za-z0-9_]/;
    var regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
    var reg = regNum.test(name);
    var regP = regPassword.test(password);
    var codeVal=$('#code').val();
    if (name == "") {
        layer.confirm('请输入登录账号！', {
            skin: 'error-class',
            title: '',
            maxmin: true, //开启最大化最小化按钮
            area: ['380px', '260px'],
            btn: ['确定']
        }, function() {
            layer.closeAll();
        });
        return false;
    }
    // if (!reg && name != "") {
    //     layer.confirm('用户名大小只能写字母、数字、下划线', {
    //         skin: 'error-class',
    //         title: '',
    //         maxmin: true, //开启最大化最小化按钮
    //         area: ['380px', '260px'],
    //         btn: ['确定']
    //     }, function() {
    //         layer.closeAll();
    //     });
    //     return false;
    // }
    if (name.length < 4 && name != "") {
        layer.confirm('账号不能小于4个字符', {
            skin: 'error-class',
            title: '',
            maxmin: true, //开启最大化最小化按钮
            area: ['380px', '260px'],
            btn: ['确定']
        }, function() {
            layer.closeAll();
        });
        return false;
    }
    if (password == "") {
        layer.confirm('请输入登录密码！', {
            skin: 'error-class',
            title: '',
            maxmin: true, //开启最大化最小化按钮
            area: ['380px', '260px'],
            btn: ['确定']
        }, function() {
            layer.closeAll();
        });
        return false;
    }
    if (confirm == "") {
        layer.confirm('请确认密码！', {
            skin: 'error-class',
            title: '',
            maxmin: true, //开启最大化最小化按钮
            area: ['380px', '260px'],
            btn: ['确定']
        }, function() {
            layer.closeAll();
        });
        return false;
    }
    if (confirm != password) {
        layer.confirm('确认密码与登录密码不一致！', {
            skin: 'error-class',
            title: '',
            maxmin: true, //开启最大化最小化按钮
            area: ['380px', '260px'],
            btn: ['确定']
        }, function() {
            layer.closeAll();
        });
        return false;
    }
    if (!regP && password != "") {
        layer.confirm('密码必须由6-12位数字加字母组成', {
            skin: 'error-class',
            title: '',
            maxmin: true, //开启最大化最小化按钮
            area: ['380px', '260px'],
            btn: ['确定']
        }, function() {
            layer.closeAll();
        });
        return false;
    }

    //注册
    var userLogin = {
        username: name,
        password: password,
        confirm_password: confirm,
        code:codeVal
    };
    //登录
    var user = {
        username: name,
        password: password,
    };
    $.ajax({
        type: "POST",
        url: "/user/register",
        data: userLogin,
        datatype: "json",
        success: function(data, textStatus) {
            console.log('注册成功');
            console.log(textStatus);
            console.log(data);
            if (data.status == 'success') {
                var tip = `注册成功`;
                layer.confirm(tip, {
                    skin: 'success-class',
                    title: '',
                    maxmin: true, //开启最大化最小化按钮
                    area: ['380px', '260px'],
                    btn: ['立即登录']
                }, function() {
                    // layer.closeAll();
                    denglu(user);
                });
            }else {
                layer.confirm('用户名已占用', {
                    skin: 'success-class',
                    title: '',
                    maxmin: true, //开启最大化最小化按钮
                    area: ['380px', '260px'],
                    btn: ['立即登录']
                }, function() {
                    // layer.closeAll();
                    denglu(user);
                });
            }
        },
        complete: function(XMLHttpRequest, textStatus) {
            console.log(XMLHttpRequest.responseText);
            console.log(textStatus);
        },
        error: function() {
            console.log('请求失败！');
        }
    });
}

$('#login-account').click(function() {
    window.open("/login.php", "_self");
})


function closeLeftBar() {
    $('#theme_popup,#popups_overlay').fadeOut();
}
//登录
$('.password-info').focus(function() {
    document.onkeydown = function() {
        if (event.keyCode == 13) {
            validata();
        }

    }
});
$('.login-info').focus(function() {
    document.onkeydown = function() {
        if (event.keyCode == 13) {
            login();
        }

    }
});

$('#moreActivity,.deposit_icon,.withdraw_icon,.member_icon,.email_icon,.service_icon').click(function() {
    if ($('#afterLogin').css('display') == 'none') {
        layer.confirm('您还未登录，请先登录！', {
            skin: 'warning-class',
            title: '',
            maxmin: true, //开启最大化最小化按钮
            area: ['380px', '260px'],
            btn: ['确定']
        }, function() {
            layer.closeAll();
        });
        return false;
    }
});
