var isLogin = false;
var $isDetail;
function queryString(key)
{
    var regex_str = "^.+\\?.*?\\b"+ key +"=(.*?)(?:(?=&)|$|#)";
    var regex = new RegExp(regex_str,"i");
    var url = window.location.toString();
    if(regex.test(url)) return RegExp.$1;
    return undefined;
}
var this_id=$('#ballId').val();
if(this_id!=undefined){
    document.getElementById("ballId").value = queryString("name");
}
var ball_type=$('#ballId').val();
var $id=0;
if(ball_type=='qq_fen_fen'){
    $id=2;
}else if(ball_type=='bei_ji_fen_fen'){
    $id=3;
}
//彩票产品详情
$(function(){
    userInfo();
    getUrlParam();
});
//获取url参数
function getUrlParam(){
    var r = window.location.search.substr(1).match(/name=(\w+)/);
    if($isDetail){
         if(!r){
            location.href='/home.html';
        }
        if(r[1]=='chong_qing_shi_shi'){
            BallInfo(1);
            $('.select-game-icon.CQSSC').css('backgroundPosition','-10px -991px');
        }else if(r[1]=='qq_fen_fen'){
            BallInfo(2);
            $('.select-game-icon.CQSSC').css('backgroundPosition','-94px -279px');
        }else if(r[1]=='bei_ji_fen_fen'){
            BallInfo(3);
            $('.select-game-icon.CQSSC').css('backgroundPosition','-10px -1256px');
        }
    }else {
        homeBallInfo();
    }

}
//首页彩票详情
function homeBallInfo() {
    $.ajax({
        type: 'POST',
        url: '/product/lists',
        datatype: 'json',
        beforeSend: function (XMLHttpRequest) {
        },
        success: function (data) {
            if (data.status == 'success') {
                $.each(data.message.data,function (i,val) {
                    $('#bet-timer'+val.id).html(val['periods'].date + '-' +val['periods'].num); //彩票期数
                    //定时器处理
                    timer(parseInt(val.periods.lottery_surplus),val.id,val.id);
                });
            } else {
                alert(data.message);
            }
        },
        error: function () {
            console.log('请求失败！');
        }
    });
}
//投注页彩票详情
function BallInfo($id) {
    $.ajax({
        type: 'POST',
        url: '/product/detail',
        datatype: 'json',
        data: {id: $id},
        beforeSend: function (XMLHttpRequest) {
//            $("#loading").show();
        },
        success: function (data) {
            if (data.status == 'success') {
                if($isDetail){
                $('#bet-timer').html(data.message.periods.date + '-' + fill_lenght(data.message.periods.num, 3, '0')); //彩票期数
                $('#countDown').val(parseInt(data.message.periods.lottery_surplus));//距离开奖时间 秒数
                $('#orderId').val(data.message.periods.id);
                    timer(parseInt(data.message.periods.lottery_surplus),'',$id);
                lottery_num('drawResult', data.message.prev_periods.lottery_num,$id);
                $('#dataNum').text(data.message.prev_periods.date + '-' + fill_lenght(data.message.prev_periods.num, 3, '0'));
                }else{
                    $('#bet-timer'+data.message.id).html(data.message['periods'].date + '-' +data.message['periods'].num); //彩票期数
                    //定时器处理
                    timer(parseInt(data.message.periods.lottery_surplus),data.message.id,data.message.id);
                }
            } else {
                alert(data.message);
            }
        },
        error: function () {
            console.log('请求失败！');
        }
    });
}
//用户详情
function userInfo() {
    $.ajax({
        type: 'POST',
        url: '/user/detail',
        datatype: 'json',
        success: function (data) {
            if (data.status == "success") {
                console.log(data);
                if (!isLogin) {
                    location.href = '/home.html';
                } else {
                    $('#sumWallet,#afterLoginBalance,.UserAmount').html(data['message'].balance);
                    $('#user-name,.userName').html(data['message'].username);
                    $('#loggedInHeader,.news-wrp').show();
                    $('#beforeLogin').hide();
                    $('#afterLogin,.sub-main-wrp').show();

                    if (data['message'].payee != '') {
                        var str = data['message'].payee;
                        var name = str.substr(str, 1);
                        $('#card-user-name').val(name + '**');
                        $('#card-user-name').attr('readonly', 'readonly');
                        $('#card-user-name').addClass('disabled');
                    }

                    if (data['message'].email != '') {
                        $('#card-email').val(data['message'].email);
                        $('#card-email').attr('readonly', 'readonly');
                        $('#card-email').addClass('disabled');
                    }
                    
                     if($('#card-user-name').val()!='' && $('#card-email').val()!=''){
                        $('.newAddCard').attr('id','bindCard');
                        $('.above-footer').find('.disabled').removeClass('disabled');
                        $('.above-footer').find('.gray').removeClass('gray');
                        $('.above-footer').find('.tip').addClass('hide');
                        $('.above-footer').find('#cardLimitReminder').removeClass('hide');
                     }
                }
            } else if (data.status == 'ban_guest' && isLogin) {
                location.href = '/index.html';
            }
        },
        error: function () {
            console.log('请求失败！');
        }
    });
}
//倒计时
function timer(intDiff,suffix,$id) {
    var t = window.setInterval(function () {
        var day = 0,
                hour = 0,
                minute = 0,
                second = 0; //时间默认值
        if (intDiff >= 0) {
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        } else {
            window.clearInterval(t);
            BallInfo($id);
            return;
        }
        if (hour <= 9)
            hour = '0' + hour;
        if (minute <= 9)
            minute = '0' + minute;
        if (second <= 9)
            second = '0' + second;
        $('#day_show'+suffix).html(day);
        $('#hour_show'+suffix).html(hour);
        $('#minute_show'+suffix).html(minute);
        $('#second_show'+suffix).html(second);
        intDiff--;
    }, 1000);
}
//处理开奖号
function lottery_num(_id, num,d) {
    if (num.length > 0) {
        if ($('#' + _id + ' li').each(function (index) {
            var elm = $(this).addClass('ball-rolling-' + index);
            setTimeout(function () {
                elm.removeClass('ball-rolling-' + index).text(num[index]);
            }, 1000 * (index + 1));
        }).length) {
            $.ajax({
                type: 'POST',
                url: '/lottery/lists',
                datatype: 'json',
                data: {id: d, pageSize: 10},
                success: function (data) {
                    if (data.status == "success") {
                        console.log('开奖期号');
                        console.log(data);
                        var three = $('#lastThreeDrawResult'), seven = $('#lastSevenDrawResult');
                        three.find('li').remove();
                        seven.find('li').remove();
                        $.each(data.message.data, function (k, val) {
                            val.num = fill_lenght(val.num, 3, '0');
                            if (k < 3) {
                                three.append(`<li><div class="alignleft">${val.date}-${val.num}</div><div class="alignright"><ul><li>${val.lottery_num[0]}</li><li>${val.lottery_num[1]}</li><li>${val.lottery_num[2]}</li><li>${val.lottery_num[3]}</li><li>${val.lottery_num[4]}</li></ul></div></li>`);
                            }
                            seven.append(`<li class="draw_date">${val.date}-${val.num}</li><li class="draw_winning"><ul><li>${val.lottery_num[0]}</li><li>${val.lottery_num[1]}</li><li>${val.lottery_num[2]}</li><li>${val.lottery_num[3]}</li><li>${val.lottery_num[4]}</li></ul></li>`);
                        });
                    }
                },
                error: function () {
                    console.log('请求失败！');
                }
            });
        }
    }
}
//补全数据
function fill_lenght(str, len, fill) {
    while (str.length < len) {
        str = fill + str;
    }
    return str;
}
