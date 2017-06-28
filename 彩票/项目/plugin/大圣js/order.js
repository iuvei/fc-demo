var bet_action, bet_name;
//向服务器提交投注订单
function orderPost(betData) {
    var orderId = parseInt($('#orderId').val());
    var orderInfo = {
        id: orderId,
        items: []
    };
    if (betData) {
        orderInfo.items.push(betData);
    } else {
        $('#betCartContent ul').each(function() {
            orderInfo.items.push($(this).data('buy'));
        });
    }
    if (!orderInfo.items.length) {
        return alert('订单数据丢失');
    }
    var timer = $('#bet-timer').text();
    $.ajax({
        type: 'POST',
        traditional: true,
        url: '/bet/buy',
        datatype: 'json',
        data: $.param(orderInfo),
        success: function(data) {
            if (data.status == 'success') {
                var price = $('#totalAmount').html(); //投注金额
                var info = `<div style="color: #fff">投注期号：<span style="color: #fff">${timer} 期</span></div><div style="color: #fff">投注总额：<span style="color: #fff">${data.message}</span></div>`;
                layer.confirm('订单支付成功<br/>' + info, {
                    skin: 'success-class',
                    title: '',
                    maxmin: true, //开启最大化最小化按钮
                    area: ['350px', '360px'],
                    btn: ['确定']
                }, function() {
                    layer.closeAll();
                    $('#clearBetCart').click();
                });
                userInfo();
            } else {
                layer.msg(`<div style="color: red;margin-top: 55px;">${data.message}</div>`, {
                    skin: 'error-class',
                    maxmin: true, //开启最大化最小化按钮
                    area: ['350px', '360px']
                });
            }
        },
        error: function() {
            layer.msg('提交失败！');
        }
    })
}

//投注计算
function touzhu() {
    var amount, bet = getBet();
    if (bet.sum < 1) {
        return;
    }
    $('#selectionBallStakes').html(bet.sum);
    amount = bet_amount(bet.sum);
    $('#selectionBallAmount').html(amount.toFixed(4));
    if (bet.sum >= 1) {
        $('#addBallToCart,#shortcutPlaceOrder').addClass('enable');
    } else {
        $('#addBallToCart,#shortcutPlaceOrder').removeClass('enable');
    }
}
//计算金额
function bet_amount(sum) {
    var money = 2,
        betMultiple = parseInt($('#beishu').val());
    return sum * money * betMultiple;
}
//阶乘
function factorial(num) {
    var result = 1;
    while (num) {
        result *= num;
        num--;
    }
    return result;
}

//选择注数
$('.num-wrp').bind('click', function() {
    $(this).toggleClass('selected');
    touzhu();
});
//选择模式，“元”到“厘”
$('#lottBetMode .currency').bind('click', function() {
    $(this).addClass('active').siblings().removeClass('active');
    var nums = $('#nums').val();
    var zhushu = $('#zhushu').val();
    var active = $(this).hasClass('active');
    var index = $('#lottBetMode .currency').index(this);
    //    console.log(index);
    if (index == 0 && active) {
        $('#selectionBallAmount').html((zhushu * 2 * nums).toFixed(4));
    } else if (index == 1 && active) {
        $('#selectionBallAmount').html((zhushu * 0.2 * nums).toFixed(4))
    } else if (index == 2 && active) {
        $('#selectionBallAmount').html((zhushu * 0.02 * nums).toFixed(4))
    } else if (index == 3 && active) {
        $('#selectionBallAmount').html((zhushu * 0.002 * nums).toFixed(4))
    }
    var pr = $('#selectionBallAmount').html();
    $('#price').val(pr);
});
//一键投注
$('#shortcutPlaceOrder').click(function() {
    var bet = getBet();
    if (bet.sum < 1) {
        return;
    }
    //    bet.li.find('.selected').removeClass('selected');
    tzInfo(bet.sum, bet_amount(bet.sum), makeBetData(bet.num));
});

//清空购物车
$('#clearBetCart').bind('click', function() {
    $('#betCartContent ul').remove();
    bet_total();
    $('#historyOrder.tab-active').prev().click();
});
//增加倍数
var add = 1;
$('.plus_btn').bind('click', function() {
    add++;
    $('#beishu').val(add);
    touzhu();
});
//减少倍数
$('.minus_btn').bind('click', function() {
    add--;
    if (add <= 1) {
        $('#beishu').val(1);
    } else {
        $('#beishu').val(add);
    }
    touzhu();
});
//快捷选择
function quickly_select(elm, need, not) {
    var list = $(elm).parent().prev().find('.num-wrp');
    if (need && not) {
        list.filter(not).removeClass('selected');
        list.filter(need).addClass('selected');
    } else {
        if (need === false) {
            list.removeClass('selected');
        } else {
            list.addClass('selected');
        }
    }
    touzhu();
}
//清除下注按钮
$('.clear').bind('click', function() {
    quickly_select(this, false);
});
//奇注
$('.ji').bind('click', function() {
    quickly_select(this, ':odd', ':even');
});
//偶注
$('.ou').bind('click', function() {
    quickly_select(this, ':even', ':odd');
});
//全注
$('.all').bind('click', function() {
    quickly_select(this);
});
//大
$('.big').bind('click', function() {
    quickly_select(this, ':gt(4)', ':lt(5)');
});
//小
$('.small').bind('click', function() {
    quickly_select(this, ':lt(5)', ':gt(4)');
});
//获取投注数据
function getBet() {
    var num = {},
        sum = 0,
        li;
    if (/^(all|varied)\d$/.test(bet_action)) { //直选通选处理
        sum = 1;
        li = $('#select-' + bet_action + ' dl').each(function() {
            var unit = $(this).attr('unit');
            num[unit] = '';
            sum *= $(this).find('.selected').each(function() {
                num[unit] += this.innerHTML;
            }).length;
        });
    } else {
        switch (bet_action) {
            case 'group5': //五星组选
                var sum120 = 0;
                num['n'] = '';
                li = $('#select-group5 dl').each(function() {
                    sum120 += $(this).find('.selected').each(function() {
                        num['n'] += this.innerHTML;
                    }).length;
                });
                if (sum120 >= 5) {
                    sum = factorial(sum120) / factorial(5) / factorial(sum120 - 5);
                }
                break;
        }
    }
    return {
        sum: sum,
        num: num,
        typeVal: bet_name,
        li: li
    };
}
//生成投注数据
function makeBetData(num) {
    var beishu = $('#beishu').val(); //倍数
    var unit = $('#lottBetMode').find('.active').attr('unit-type'); // yuan/jiao/fen/li
    return $.extend({
        type: bet_action,
        multiple: beishu,
        unit: unit
    }, num);
}
//添加到购物车
$('#addBallToCart').bind('click', function() {
    var bet = getBet();
    if (bet.sum < 1) {
        return;
    }
    bet.li.find('.selected').removeClass('selected');
    addCart(bet.sum, bet.num, bet.typeVal);
    $('#selectionBallAmount').html((0).toFixed(4));
    $('#selectionBallStakes').html(0);
    $('#historyOrder.tab-active').prev().click();
});

//添加到购物车列表
function addCart(sum, num, typeVal) {
    var tzNums = []; //投注号码
    $.each(num, function(k, v) {
        tzNums.push(v);
    });
    tzNums = tzNums.join('|');
    var mode = $('#lottBetMode').find('.active'); // 人民币单位
    var modeVal = mode.html(); //模式
    var price = bet_amount(sum); //投注金额
    var data = makeBetData(num);
    var carContent = `<ul class="bet_number custom11">
                <li class="f-data-fix">${typeVal}</li>
                <li class="Gcustom"><span style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">${tzNums}</span><span class="cm_number hide">${tzNums}</span></li>
            <li class="fxChzz">${modeVal}</li>
            <li class="orderStakes">${sum}</li>
            <li class="tz-mainWrp">${data.multiple}</li>
                <li class="orderAmount">${price}</li>
                <li class="game-icons cancel-x" >&nbsp;</li>
            </ul>`;
    $('#betCartContent').append(carContent).find('ul:last').data('buy', data);
    bet_total();
}

//计算总额
function bet_total() {
    //总金额相加
    var priceAll = 0;
    $.each($('.orderAmount'), function() {
        priceAll += parseInt($(this).html());
    });
    $('#totalAmount').html(priceAll.toFixed(4));
    //总注数相加
    var StakesAll = 0;
    $.each($('.orderStakes'), function() {
        StakesAll += parseInt($(this).html());
    });
    $('#totalStakes').html(StakesAll);
    if (priceAll) {
        $('#chaseBetOrder,#confirmBetOrder').addClass('enable');
    } else {
        $('#chaseBetOrder,#confirmBetOrder').removeClass('enable');
    }
}

function getRandomNum(exclude) {
    var list = '0123456789',
        len = exclude.length;
    while (len-- > 0) {
        list = list.replace(exclude[len], '');
    }
    console.info(Math.random());
    var k = Math.ceil(Math.random() * 100) % list.length;
    return list[k];
}

//随机选1注
function random_bet(size) {
    var num = {};
    if (/^(all|varied)\d$/.test(bet_action)) { //直选通选处理
        sum = 1;
        li = $('#select-' + bet_action + ' dl').each(function() {
            var unit = $(this).attr('unit');
            num[unit] = getRandomNum('');
        });
    } else {
        switch (bet_action) {
            case 'group5': //五星组选
                var n = 5,
                    N = [];
                while (n-- > 0) {
                    N.push(getRandomNum(N.join()));
                }
                N.sort();
                num = {
                    'n': N.join()
                };
                break;
        }
    }
    addCart(1, num, bet_name);
    size--;
    if (size > 0) {
        random_bet(size);
    } else {
        $('#historyOrder.tab-active').prev().click();
    }


}

//删除购物车
$('#betCartContent').on('click', '.cancel-x', function() {
    $(this).parent().remove();
    bet_total();
    $('#historyOrder.tab-active').prev().click();
});
//确认投注信息 弹出框
function tzInfo(zhushu, price, betData) {
    zhushu = zhushu || $('#totalStakes').text(); //注数
    if (zhushu < 1) {
        return;
    }
    $('#historyOrder.tab-active').prev().click();
    price = price || $('#totalAmount').html(); //投注金额
    var info = `<div style="color: #fff;">注数：<span style="color: #fff">${zhushu}注</span></div><div style="color: #fff">投注金额：<span style="color: #fff">${price}</span></div>`;
    var data = $('#bet-timer').text();
    layer.confirm('请确认投注信息<br/>' + data + '期<br/>' + info, {
        skin: 'warning-class',
        title: '',
        maxmin: true, //开启最大化最小化按钮
        area: ['300px', '330px'],
        btn: ['确定', '取消']
    }, function() {
        orderPost(betData);
    }, function() {
        layer.closeAll();
    });
}
//当前投注和投注历史切换
function Tabs(elm) {
    $(elm).addClass('tab-active').siblings('.tablinks').removeClass('tab-active');
    $('.bet-con .tabcontent:eq(' + $(elm).index() + ')').show().siblings('.tabcontent').hide();
}

//投注方式
$('#sub_group_menus').on('click', 'li', function() {
    $(this).addClass('selected').siblings('li').removeClass('selected');
    var type = $(this).attr('type-id');
    $('.lot-game-wrp').hide();
    $('#select-' + type).show();
    bet_action = type;
    bet_name = $(this).text();
    bonusTips(type);
    bonus(type);
    touzhu();
});
//中奖说明
function bonusTips(type) {
    var html = '';
    switch (type) {
        case 'all5': //五星直选
            html = '从万位、千位、百位、十位、个位中分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：万位选择1，千位选择2，百位选择3，十位选择4，个位选择5，开奖号码为12345，即为中奖。';
            break;
        case 'group5': //五星组选120
            html = '从0-9中任意选择5个号码组成一注，所选号码与开奖号码的万、千、百、十、个位相同，顺序不限，即为中奖。例：投注方案：10568开奖号码：10568（顺序不限）即为中奖。';
            break;
        case 'varied5': //五星通选
            html = '从万位、千位、百位、十位、个位中各选一个号码投注，若所选号码与开奖号码数字全部相同且顺序一致，即中一等奖；若所选号码与开奖号码的前三或后三号码相同且顺序一致，即中二等奖；若所选号码与开奖号码的前二或后二号码相同且顺序一致，即中三等奖。 如：选择54321，开奖号码为54321，即中一等奖，开奖号码为543**、**321，即中二等奖，开奖号码为54***、***21，即中三等奖。';
            break;
        case 'all4': //四星直选
            html = '从千位、百位、十位、个位中分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。如：千位选择1，百位选择2，十位选择3，个位选择4，开奖号码为*1234，即为中奖。';
            break;
        case 'all3': //三星直选
            html = '从百位、十位、个位中分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。如：百位选择1，十位选择2，个位选择3，开奖号码为**123，即为中奖。';
            break;
        case 'all2': //二星直选
            html = '从十位、个位中分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。如：十位选择1，个位选择2，开奖号码为***12，即为中奖。';
            break;
        case 'all1': //一星直选
            html = '从个位中选择1个或多个号码投注，号码和顺序都相同，即为中奖。如：个位选择1，开奖号码为****1，即为中奖。';
            break;
    }
    $('#lottWinExplain').html(html);
}
//奖金
function bonus(type) {
    var money = 0,
        one = 0,
        two = 0,
        three = 0;
    switch (type) {
        case 'all5': //五星直选
            money = 180000;
            break;
        case 'group5': //五星组选120
            money = 1500;
            break;
        case 'varied5': //五星通选
            money = 0;
            one = 36000;
            two = 360;
            three = 36;
            break;
        case 'all4': //四星直选
            money = 18000;
            break;
        case 'all3': //三星直选
            money = 1800;
            break;
        case 'all2': //二星直选
            money = 180;
            break;
        case 'all1': //一星直选
            money = 18;
            break;
    }
    if (money > 0) {
        $('.Amountred').html(money.toFixed(4));
    } else {
        var tip = `<span style="color:#f96060;">一等奖：${one.toFixed(4)}</span>&nbsp;&nbsp;<span style="color:#f96060;">二等奖：${two.toFixed(4)}</span>&nbsp;&nbsp;<span style="color:#f96060;">三等奖：${three.toFixed(4)}</span>`;
        $('.Amountred').html(tip);
    }
}

//投注形式
$('#ssc-menu').on('click', 'li.with_child', function() {
    var dl = $('#sub_group_menus>dl:eq(' + $(this).index() + ')'),
        selected = dl.find('li.selected');
    if (!dl.size()) {
        return alert('功能还在开发中！');
    }
    dl.show().siblings('dl').hide();
    $(this).addClass('active').siblings().removeClass('active');
    if (selected.size()) {
        selected.click();
    } else {
        dl.find('li:first').click();
    }
}).find('li.with_child.active').click();

//投注历史
$('#historyOrder').click(function() {
    historyOrders(1);
});

function historyOrders(page) {
    $.ajax({
        type: 'POST',
        url: '/bet/lists',
        datatype: 'json',
        data: {
            page: page,
            product_id: $id
        },
        beforeSend: function(XMLHttpRequest) {},
        success: function(e) {
            console.log('返回数据↓');
            console.log(e);
            var html = '',
                tip = '',
                awardNum = '';
            console.log(e);
            if (e['message'].data.length == 0) {
                $('#gameHistoryToday').html('<div style="text-align: center;position: relative;right: 204px;top: 30px;">无投注记录</div>');
                return;
            }
            $('#currentPage').html(e['message'].current_page); //当前页
            $('#totalPage').html(e['message'].last_page); //总页数
            //            var lastPage = e['message'].last_page;
            // $('#allPages').val(e['message'].current_page);
            //            var thisPage = $('#currentPage').html();
            $.each(e.message, function(i, val) {
                $.each(val, function(j, k) {
                    // console.log(k['periods'].date);
                    // console.log(k);
                    var orderId = k.order_id, //订单编号
                        name = k['product'].name, //游戏类型
                        daytime = k['periods'].date, //投注日期
                        num = k['periods'].num, //投注编号
                        orderNum = daytime + ' ' + fill_lenght(num, 3, '0'), //游戏奖期
                        created = k.created, //投注时间
                        //                            multiple = k.multiple, //投注倍数
                        money = k.money, //投注金额
                        bonus = k.bonus, //中奖金额
                        status = k.status, //状态
                        //                            ballType = k.rule, //投注模式：all5 , group5
                        lotteryNum = k['periods'].lottery_num; //中奖号码
                    if (status == 'wait') {
                        tip = '待开奖';
                    } else if (status == 'winning') {
                        tip = '已中奖';
                    } else {
                        tip = '未中奖';
                    }
                    if (lotteryNum == '') {
                        awardNum = '-';
                    } else {
                        awardNum = lotteryNum;
                    }
                    var histroyOrder = `<ul>
                             <li class="ch-new-row">${name}</li>
                             <li class="ch-limit">${orderId}</li>
                             <li class="ch-new-row2" style="width: 155px;">${created}</li>
                             <li>${orderNum}</li>
                             <li class="chControl chHover">${awardNum}</li>
                             <li>${money}</li>
                             <li><span>${bonus}</span></li>
                             <li class="cancel-y cancelOrder tz_history_content_btn_adjustment">${tip}</li>
                           </ul>`;
                    html += histroyOrder;
                })
            });
            $('#gameHistoryToday').html(html);
        },
        error: function() {
            console.log('提交失败！');
        }
    });
}
//投注历史 下一页
$('#nextPage').bind('click', function() {
    var p = $('#currentPage').html();
    var n = $('#totalPage').html();
    if (p == n) {
        return;
    }
    p++;
    if (p == n) {
        $('#nextPage').addClass('disabled');
    }
    if (p > 1) {
        $('#prevPage').removeClass('disabled');
    }
    $('#currentPage').html(p);
    historyOrders(p);
});
//投注历史 上一页
$('#prevPage').bind('click', function() {
    var p = $('#currentPage').html();
    var n = $('#totalPage').html();
    if (p <= 1) {
        return;
    }
    p--;
    if (p == 1) {
        $('#prevPage').addClass('disabled');
    }
    if (p < n) {
        $('#nextPage').removeClass('disabled');
    }
    historyOrders(p);
});