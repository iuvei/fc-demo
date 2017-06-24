//完善信息
function userInfo2() {
    var userName=$("#userName").val();
    var nickname=$("#nickname").val();
    var password=$("#password").val();
    var phone=$("#phone").val();
    var qq=$("#qq").val();
    var email=$("#email").val();
    var confirm_password=$("#confirm_password").val();
    if($('.ch-inpt').val()==''){
        $('.ch-inpt').focus();
    }
    if(userName!=undefined){
        if (userName == '') {
            layer.confirm('请输入提款人姓名', {
                skin: 'error-class',
                title: '',
                maxmin: true, //开启最大化最小化按钮
                area: ['380px', '260px'],
                btn: ['确定']
            }, function () {
                layer.closeAll();
            });
            return false;
        }
    }

    if(password!=undefined){
        if (password=='') {
            layer.confirm('密码不能为空！', {
                skin: 'error-class',
                title: '',
                maxmin: true, //开启最大化最小化按钮
                area: ['380px', '260px'],
                btn: ['确定']
            }, function () {
                layer.closeAll();
            });
            return false;
        }
    }
    if(email!=undefined){
        if (email=='') {
            layer.confirm('邮箱不能为空！', {
                skin: 'error-class',
                title: '',
                maxmin: true, //开启最大化最小化按钮
                area: ['380px', '260px'],
                btn: ['确定']
            }, function () {
                layer.closeAll();
            });
            return false;
        }
    }
    if(confirm_password!=undefined){
        if (confirm_password=='') {
            layer.confirm('请确认密码！', {
                skin: 'error-class',
                title: '',
                maxmin: true, //开启最大化最小化按钮
                area: ['380px', '260px'],
                btn: ['确定']
            }, function () {
                layer.closeAll();
            });
            return false;
        }
    }

    if(password!=undefined && confirm_password!=undefined){
        if (password!=confirm_password) {
            layer.confirm('两次密码不一样！', {
                skin: 'error-class',
                title: '',
                maxmin: true, //开启最大化最小化按钮
                area: ['380px', '260px'],
                btn: ['确定']
            }, function () {
                layer.closeAll();
            });
            return false;
        }
    }

    //验证邮箱
    var reg_email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if(email!=undefined && email!=''){
        if(!reg_email.test(email)){
            layer.confirm('邮箱格式不正确', {
                skin: 'error-class',
                title: '',
                maxmin: true, //开启最大化最小化按钮
                area: ['380px', '260px'],
                btn: ['确定']
            }, function () {
                layer.closeAll();
            });
            return false;
        }
    }
    //验证手机号
    var reg_mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
    if(phone!=undefined && phone!=''){
        if(!reg_mobile.test(phone)){
            layer.confirm('手机号码格式不正确', {
                skin: 'error-class',
                title: '',
                maxmin: true, //开启最大化最小化按钮
                area: ['380px', '260px'],
                btn: ['确定']
            }, function () {
                layer.closeAll();
            });
            return false;
        }
    }
    //验证qq号
    var reg_qq = /^[1-9]\d{4,9}$/;
    if(qq!=undefined && qq!=''){
        if(!reg_qq.test(qq)){
            layer.confirm('qq号码格式不正确', {
                skin: 'error-class',
                title: '',
                maxmin: true, //开启最大化最小化按钮
                area: ['380px', '260px'],
                btn: ['确定']
            }, function () {
                layer.closeAll();
            });
            return false;
        }
    }
    var info={
        payee:userName, //提款人姓名
        nickname:nickname, //昵称
        cellphone:phone, //手机号
        qq:qq, //qq号
        email:email, //邮箱
        fund_password:password, //密码
        confirm_fund_password:confirm_password, //确认密码
    };
    $.ajax({
        type:"POST",
        url:"/user/perfect",
        data:info,
        datatype: "json",
        success:function(data,textStatus){
            console.log(textStatus);
            console.log(data);
            if(data.status=='success'){
                layer.confirm('个人信息修改成功', {
                    skin: 'success-class',
                    title: '',
                    maxmin: true, //开启最大化最小化按钮
                    area: ['380px', '260px'],
                    btn: ['确定']
                }, function () {
                    layer.closeAll();
                });
                if(userName!=undefined){
                    $('.user-info').html(userName); //提款人姓名
                }
                if(email!=undefined){
                    $('.email-info').html(email); //邮箱
                }
                if(password!=undefined && confirm_password!=undefined){
                    if(password==confirm_password){
                        $('.password-info').html('********');
                    }
                }
            }
        },
        error: function(){
            console.log('请求失败！');
        }
    });
}

$('.p-input').focus(function() {
    document.onkeydown = function() {
        if (event.keyCode == 13) {
            userInfo2();
        }

    }
});
//修改密码
$('.modify-password').click(function () {
    var type=$(this).attr('data-password');
    var newPassword=$(this).parent('.right').find('.newPassword').val();
    var password=$(this).parent('.right').find(".oldPassword").val();
    var confirm_password=$(this).parent('.right').find(".conPassword").val();
    if (password=='') {
        layer.confirm('请输入旧密码！', {
            skin: 'error-class',
            title: '',
            maxmin: true, //开启最大化最小化按钮
            area: ['380px', '260px'],
            btn: ['确定']
        }, function () {
            layer.closeAll();
        });
        return false;
    }
    if (newPassword=='') {
        layer.confirm('请输入新密码！', {
            skin: 'error-class',
            title: '',
            maxmin: true, //开启最大化最小化按钮
            area: ['380px', '260px'],
            btn: ['确定']
        }, function () {
            layer.closeAll();
        });
        return false;
    }
    if (confirm_password=='') {
        layer.confirm('请确认密码！', {
            skin: 'error-class',
            title: '',
            maxmin: true, //开启最大化最小化按钮
            area: ['380px', '260px'],
            btn: ['确定']
        }, function () {
            layer.closeAll();
        });
        return false;
    }
    if (newPassword!=confirm_password) {
        layer.confirm('两次密码不一样！', {
            skin: 'error-class',
            title: '',
            maxmin: true, //开启最大化最小化按钮
            area: ['380px', '260px'],
            btn: ['确定']
        }, function () {
            layer.closeAll();
        });
        return false;
    }
    var info={
        type:type, //密码类型
        old_password:password, //旧密码
        password:newPassword, //新密码
        confirm_password:confirm_password, //确认密码
    };
    $.ajax({
        type:"POST",
        url:"/user/password",
        data:info,
        datatype: "json",
        success:function(data,textStatus){
            console.log(textStatus);
            console.log(data);
            var status=textStatus;
            if(status=='success'){
                if(data.message=='修改成功'){
                    layer.confirm('修改成功！', {
                        skin: 'success-class',
                        title: '',
                        maxmin: true, //开启最大化最小化按钮
                        area: ['380px', '260px'],
                        btn: ['确定']
                    }, function () {
                        layer.closeAll();
                    });
                }else if(data.message=='旧密码错误'){
                    layer.confirm('旧密码错误！', {
                        skin: 'error-class',
                        title: '',
                        maxmin: true, //开启最大化最小化按钮
                        area: ['380px', '260px'],
                        btn: ['确定']
                    }, function () {
                        layer.closeAll();
                    });
                }

            }

        },
        error: function(){
            console.log('请求失败！');
        }
    });
});


//日期选择
$(function () {
    // $( ".startDay" ).datepicker({ maxDate: "-30 30D",dateFormat: 'yy-mm-dd',altField: '.startDay'});
    $(".endDay").datepicker({
        onselect: function(dateText, inst){
            console.log(dateText);
            console.log(inst);
            $(".startDay").datepicker(
                "option","maxDate",dateText
            );
        },
        beforeShow : function(input){
            console.log(input);
        },
        onClose : function(dateText, inst){
            console.log(dateText);
            $('#endDay').val(dateText);  //获取结束日期
            console.log(inst);
        },
        dateFormat: 'yy-mm-dd',
        maxDate: "-30 30D",
        defaultDate: '-1M'
    });

    $(".startDay").datepicker({
        onselect: function(dateText, inst){
            console.log(dateText);
            console.log(inst);
            $(".endDay").datepicker(
                "option","minDate",dateText
            );
        },
        beforeShow : function(input){
            console.log(input);

        },
        onClose : function(dateText, inst){
            console.log(dateText);
            $('#startDay').val(dateText); //获取开始日期
            console.log(inst);
        },
        dateFormat: 'yy-mm-dd',
        maxDate: "-30 30D"
    });
    var dates = $(".startDay,.endDay");
    dates.datepicker({
        onSelect: function(selectedDate){
            var option = this.id == "start" ? "minDate" : "maxDate";
            dates.not(this).datepicker("option", option, selectedDate);
        }
    });

    $(".agentDay").datepicker({
        beforeShow : function(input){
            console.log(input);
        },
        onClose : function(dateText, inst){
            console.log(dateText);
            $('#endDay').val(dateText);  //获取结束日期
            console.log(inst);
        },
        dateFormat: 'yy-mm-dd',
        minDate: 0,
        defaultDate: '-1M'
    });

});

//查询资金明细
function accountInfo(page) {
    var selectType=$('.select-account-type').find('.current').html();
    console.log(selectType);
    // var selectBall=$('.slect-box-custom-large option:selected').text();
    var start=$('#startDay').val();
    var end=$('#endDay').val();
    var theType='';
    if(selectType=='支付'){
        theType='pay'
    }else if(selectType=='中奖'){
        theType='winning'
    }
    var info={
        type:theType,
        created_min:start,
        created_max:end,
        pageSize:10,
        page:page //指定第几页
    };
    $.ajax({
        type:"POST",
        url:"/user/balance-log",
        data:info,
        datatype: "json",
        success:function(data,textStatus){
            var html='';
            var f='';
                if(data['message'].data.length==0){
                    $('#searchDetailedBox').html('<div style="text-align: center;position: relative;right: 204px;top: 73px;">无账变明细</div>');
                    return;
                }
                 $('#account_currentPage').html(data['message'].current_page); //总页数
                 $('#account_totalPage').html(data['message'].last_page); //总页数
                $.each(data['message'],function (i,val) {
                    $.each(val,function (j,k) {
                        var type=k.comment;
                        var id=k.id;
                        var time=k.created;
                        var num=k.num;
                        var form=k.form;
                        var surplus=k.surplus;
                        $('#surplus').html(surplus);
                        if(form=='expend'){
                            f='支出';
                        }else {
                            f='收入';
                        }
                        var Ul=`<ul class="searchDetailedList">
                            <li class="searchDetailed-type">${type}</li>
                            <li class="searchDetailed-id">${id}</li>
                            <li class="searchDetailed-time">${time}</li>
                            <li class="searchDetailed-num">${num}</li>
                            <li class="searchDetailed-from">${f}</li>
                            </ul>`;
                        html+=Ul;
                    });
                });
            $('#searchDetailedBox').html(html);
        },
        error: function(){
            console.log('请求失败！');
        }
    });

}
//左边导航栏投注历史
function history(page) {
    var startDay=$('#startDay').val();
    var endDay=$('#endDay').val();
    var option=$('#balls-type').find('.current').html();//彩票类型
    var status=$('#awards-status').find('.current').html();//状态
    console.log(option);
    console.log(status);
    var ballType,ballStatus='';
    switch (option){
        case '重庆时时彩':
            ballType='1';
            break;
        case '北京五分彩':
            ballType='3';
            break;
        case '腾讯分分彩':
            ballType='2';
            break;
         }
    switch (status){
        case '待支付':
            ballStatus='wait';
            break;
        case '已支付':
            ballStatus='pay';
            break;
        case '过期':
            ballStatus='expire';
            break;
        case '撤销':
            ballStatus='retreat';
            break;
        case '未中奖':
            ballStatus='regret';
            break;
        case '中奖':
            ballStatus='winning';
            break;
    }
    if(startDay==''){
        layer.confirm('开始日期不能为空！', {
            skin: 'error-class',
            title: '',
            maxmin: true, //开启最大化最小化按钮
            area: ['380px', '260px'],
            btn: ['确定']
        }, function () {
            layer.closeAll();
        });
        return false;
    }
    if(endDay==''){
        layer.confirm('结束日期不能为空！', {
            skin: 'error-class',
            title: '',
            maxmin: true, //开启最大化最小化按钮
            area: ['380px', '260px'],
            btn: ['确定']
        }, function () {
            layer.closeAll();
        });
        return false;
    }

    $.ajax({
        type: 'POST',
        url: '/bet/lists',
        datatype: 'json',
        data: {
            page: page,            //指定第几页
            created_min:startDay, //指定最小日期
            created_max:endDay, //指定最大日期
            product_id:ballType, //商品ID
            status:ballStatus,  //状态
            pageSize:11         //每页条数
        },
        beforeSend: function (XMLHttpRequest) {
        },
        success: function (e) {
            if(e['message'].data.length==0){
                $('#historyDetailedBox').html('<div style="text-align: center;position: relative;right: 204px;top: 73px;">无投注记录</div>');
                return;
            }
            var html = '',
                tip = '',
                awardNum = '';
                $('#his_currentPage').html(e['message'].current_page); //当前页
                $('#his_totalPage').html(e['message'].last_page); //总页数
                // console.log(e);
                $.each(e.message, function (i, val) {
                        $.each(val, function (j, k) {
                            var orderId = k.order_id, //订单编号
                                name = k['product'].name, //游戏类型
                                daytime = k['periods'].date, //投注日期
                                num = k['periods'].num, //投注编号
                                orderNum = daytime + ' ' + fill_lenght(num, 3, '0'), //游戏奖期
                                created = k.created, //投注时间
                                money = k.money, //投注金额
                                bonus = k.bonus, //中奖金额
                                status = k.status, //状态
                                lotteryNum = k['periods'].lottery_num; //中奖号码
                            if (status == 'wait') {
                                tip = '待支付';
                            } else if (status == 'pay') {
                                tip = '已支付';
                            } else if(status == 'expire'){
                                tip = '过期';
                            }else if(status == 'retreat'){
                                tip = '撤销';
                            }else if(status == 'regret'){
                                tip = '未中奖';
                            }else if(status == 'winning'){
                                tip = '中奖';
                            }
                            if (lotteryNum == '') {
                                awardNum = '-';
                            } else {
                                awardNum = lotteryNum;
                            }
                            var historyDetailed=`<ul class="historyDetailedList">
                                    <li class="historyDetailed-type">${name}</li>
                                    <li class="historyDetailed-id">${orderId}</li>
                                    <li class="historyDetailed-time">${created}</li>
                                    <li class="historyDetailed-date">${orderNum}</li>
                                    <li class="searchDetailed-num">${awardNum}</li>
                                    <li class="searchDetailed-price">${money}</li>
                                    <li class="searchDetailed-award">${bonus}</li>
                                    <li class="searchDetailed-status">${tip}</li>
                                </ul>`;
                            html+=historyDetailed;
                        })
                    });

            $('#currentPage').html(e['message'].current_page); //当前页
            $('#totalPage').html(e['message'].last_page); //总页数

            $('#historyDetailedBox').html(html);
        },
        error: function () {
            console.log('提交失败！');
        }
    });
}

    the_day();
    //初始化日期
    function p(s) {
        return s < 10 ? '0' + s: s;
    }
    function the_day() {
        var myDate = new Date();
        //获取当前年
        var year=myDate.getFullYear();
        //获取当前月
        var month=myDate.getMonth()+1;
        //获取当前日
        var date=myDate.getDate();
        var h=myDate.getHours();       //获取当前小时数(0-23)
        var m=myDate.getMinutes();     //获取当前分钟数(0-59)
        var s=myDate.getSeconds();
        var now=year+'-'+p(month)+"-"+p(date);
        $("#startDay,#endDay,.startDay,.endDay,.agentDay").val(now);
    }

//左边滚动导航栏 投注历史 下一页
$('.his_page_next').bind('click', function () {
    var p = $('#his_currentPage').html();
    var n = $('#his_totalPage').html();
    if (p == n) {
        return;
    }
    p++;
    if (p == n) {
        $('.his_page_next').addClass('disabled');
    }
    if (p > 1) {
        $('.his_page_prev').removeClass('disabled');
    }
    $('#his_currentPage').html(p);
    history(p);
});
//左边滚动导航栏 投注历史 上一页
$('.his_page_prev').bind('click', function () {
    var p = $('#his_currentPage').html();
    var n = $('#his_totalPage').html();
    if (p <= 1) {
        return;
    }
    p--;
    if (p == 1) {
        $('.his_page_prev').addClass('disabled');
    }
    if (p < n) {
        $('.his_page_next').removeClass('disabled');
    }
    history(p);
});

//左边滚动导航栏 账变明细 下一页
$('.account_page_next ').bind('click', function () {
    var p = $('#account_currentPage').html();
    var n = $('#account_totalPage').html();
    if (p == n) {
        return;
    }
    p++;
    if (p == n) {
        $('.account_page_next').addClass('disabled');
    }
    if (p > 1) {
        $('.account_page_prev').removeClass('disabled');
    }
    $('#account_currentPage').html(p);
    accountInfo(p)
});
//左边滚动导航 栏账变明细 上一页
$('.account_page_prev').bind('click', function () {
    var p = $('#account_currentPage').html();
    var n = $('#account_totalPage').html();
    if (p <= 1) {
        return;
    }
    p--;
    if (p == 1) {
        $('.account_page_prev').addClass('disabled');
    }
    if (p < n) {
        $('.account_page_next').removeClass('disabled');
    }
    accountInfo(p);
});









