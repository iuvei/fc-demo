//绑定银行卡信息验证提示
$(function () {
    $(".qpAmount-input").bind("focus", function () {
        var data = $(this).attr('data-card');
        var val = $(this).val();
        var html = '';
        if (val == '') {
            switch (data) {
                case 'cardNum':
                    html = '<div class="err-msg tcg-tooltip custom-tooltip" style="display: block">请输入16或19位卡号</div>';
                    break;
                case 'confirmCardNum':
                    html = '<div class="err-msg tcg-tooltip custom-tooltip" style="display: block">请再次输入，不支持粘贴</div>';
                    break;
                case 'userName':
                    html = '<div class="err-msg tcg-tooltip custom-tooltip" style="display: block">请输入提款人姓名</div>';
                    break;
                case 'card-address':
                    html = '<div class="err-msg tcg-tooltip custom-tooltip" style="display: block">请输入银行分行</div>';
                    break;
                case 'card-email':
                    html = '<div class="err-msg tcg-tooltip custom-tooltip" style="display: block">请输入邮箱</div>';
                    break;
            }
            $(this).after(html);
        }

    });
    $(".qpAmount-input").bind("blur", function () {
        $(this).parent('.long-white').find('.err-msg').remove();
    });

    $(".cardNum").keyup(function () {
        var value = $(this).val();
        var reg = new RegExp("[^0-9]", "g");
        $(this).val(value.replace(reg, ''));
    });
    $("#drawingNum").keyup(function () {
        var value = $(this).val();
        if (value >= 100) {
            $(this).parents('#requestWithdrawForm').addClass('enable');
            $(this).parents('#requestWithdrawForm').find('.drawingBtn').attr('id', 'drawing');
        } else {
            $(this).parents('#requestWithdrawForm').removeClass('enable');
            $(this).parents('#requestWithdrawForm').find('.drawingBtn').removeAttr('id', 'drawing');
        }
    });

    $('.cardNum').bind("cut copy paste", function (e) {
        e.preventDefault();
    });

    $('#bank_List').find('.current').css('color', 'red');

});

//提交绑定银行卡
$('.abs-right-red').on('click', '#bindCard', function () {
    var userName = $('#card-user-name').val(); //用户姓名
    var cardType = $("#bank_List").find(".current").attr('data-id3'); //银行id
    var cardNum = $('#card-num').val(); //银行卡号
    var cardConNum = $('#card-confim-num').val(); //确认银行卡号
    var provinceTxt = $("#province").find(".current").attr('data-id');
    var cityTxt = $("#city").find(".current").attr('data-id2');
    var province = parseInt(provinceTxt); //省
    var city = parseInt(cityTxt); // 市/区
    var address = $('#card-address').val(); //银行分行
    var email = $('#card-email').val(); //安全邮箱
    var reg = /^\d{16,19}$/;
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
    if (cardType == undefined) {
        layer.confirm('请输入选择银行', {
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
    //验证银行卡号
    if (cardNum == '') {
        layer.confirm('请输入银行卡号', {
            skin: 'error-class',
            title: '',
            maxmin: true, //开启最大化最小化按钮
            area: ['380px', '260px'],
            btn: ['确定']
        }, function () {
            layer.closeAll();
        });
        return false;
    } else if (reg.test(cardNum) == false) {
        layer.confirm('请输入16到19位的银行卡号', {
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
    //验证确认银行卡号
    if (cardConNum == '' && cardNum != '') {
        layer.confirm('请输入确认银行卡号', {
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

    if (cardNum != cardConNum) {
        layer.confirm('确认银行卡号与银行卡号不一致', {
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

    if (provinceTxt == undefined) {
        layer.confirm('请选择银行所在省市', {
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
    if (cityTxt == undefined) {
        layer.confirm('请选择银行所在市区', {
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
        if (address == '') {
        layer.confirm('请输入银行分行', {
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
        url: '/bank/add',
        datatype: 'json',
        data: {
            payee: userName, //提款人姓名
            email: email, // 安全邮箱
            bank_id: cardType, //银行id
            card_number: cardNum, //银行卡号
            zone1_id: province, //省
            zone2_id: city, //市
            branch: address //分行名
        },
        success: function (e) {
            console.log(e);
            if (e.status == 'success') {
                layer.confirm('银行卡绑定成功', {
                    skin: 'success-class',
                    title: '',
                    maxmin: true, //开启最大化最小化按钮
                    area: ['380px', '260px'],
                    btn: ['确定']
                }, function () {
                    bindCardInfo();
                    $('#card-num,#card-confim-num,#card-address').val('');
                    $('#card-user-name,#card-email').attr('readonly', 'readonly');
                    $('#bank_List').find('.current').html('选择银行');
                    $('#province').find('.current').html('省');
                    $('#city').find('.current').html('市');
                    $("#province").find(".current").removeAttr('data-id');
                    $("#city").find(".current").removeAttr('data-id2');
                    layer.closeAll();
                });

            } else {
                layer.confirm('银行卡绑定失败', {
                    skin: 'error-class',
                    title: '',
                    maxmin: true, //开启最大化最小化按钮
                    area: ['380px', '260px'],
                    btn: ['确定']
                }, function () {
                    layer.closeAll();
                });
            }
        },
        error: function () {
            console.log('提交失败！');
        }
    });
})



$('#bind_card').click(function () {
    //获取省、直辖市列表
    $.ajax({
        type: 'POST',
        url: '/zone/lists',
        datatype: 'json',
        success: function (e) {
            // console.log(e);
            var html = '';
            $.each(e, function (i, val) {
                // console.log(val.name);
                var list = '<li data-value="" class="option" data-p=" ' + val.id + ' ">' + val.name + '</li>';
                html += list;
            });
            $('#province').find('ul').html(html);
        },
        error: function () {
            console.log('提交失败！');
        }
    });
    //获取银行列表
    $.ajax({
        type: 'POST',
        url: '/bank/option',
        datatype: 'json',
        success: function (e) {
            console.log(e);
            var html = '';
            $.each(e, function (i, val) {
                var list = '<li data-value="" class="option" data-b=" ' + val.id + ' ">' + val.name + '</li>';
                html += list;
            });
            $('#bank_List').find('ul').html(html);
        },
        error: function () {
            console.log('提交失败！');
        }
    });

});
//市级列表重置
$('#province').bind('click', function () {
    var this_id = $(this).find('.current').attr('data-id');
    if (this_id != undefined) {
        $('#city').find('.current').html('市');
        $('#city').find('.current').removeAttr('data-id');
    }
});

//获取绑定的银行卡信息
function bindCardInfo() {
    var banksList = $('.bindCardList').find('.banks');
    $.ajax({
        type: 'POST',
        url: '/bank/lists',
        datatype: 'json',
        success: function (e) {
            console.log(e);
            var html = '';
            var x = 0;
            $.each(e, function (i, val) {
                var str = val.created;
                var createdTime = str.substring(0, 10);
                var this_id = 0;
                var name = val.bank_name;
                switch (name) {
                    case '中国工商银行':
                        this_id = 1;
                        break;
                    case '中国农业银行':
                        this_id = 2;
                        break;
                    case '中国建设银行':
                        this_id = 3;
                        break;
                    case '招商银行':
                        this_id = 4;
                        break;
                    case '交通銀行':
                        this_id = 5;
                        break;
                    case '广发银行':
                        this_id = 6;
                        break;
                    case '华夏银行':
                        this_id = 7;
                        break;
                    case '浦发银行':
                        this_id = 8;
                        break;
                    case '兴业银行':
                        this_id = 9;
                        break;
                    case '中国光大银行':
                        this_id = 10;
                        break;
                    case '中国民生银行':
                        this_id = 11;
                        break;
                    case '中国银行':
                        this_id = 12;
                        break;
                    case '中国邮政储蓄银行':
                        this_id = 13;
                        break;
                    case '中信银行':
                        this_id = 14;
                        break;
                    case '平安银行':
                        this_id = 15;
                        break;
                }
                x++;
                var list = `<div class="banks z-i${x} z-i no-slected" data-bankid="${val.id}" data-bankcardholder="${val.holder}" data-bankprovince="${val.zone1}" data-bankname="${val.bank_name}" data-bankcardno="*************${val.last_number}">
                                    <span class="bankLogo-Card bank-${this_id}"></span>
                                    <span class="det-01">*************${val.last_number}</span>
                                    <span class="det-02">卡号</span>
                                    <span class="det-03">*************${val.last_number}</span>
                                    <span class="det-04">提款人姓名 </span>
                                    <span class="det-05">${val.holder}</span>
                                    <span class="det-06">绑卡日期</span>
                                    <span class="det-07">${createdTime}</span>
                                </div>`;
                html += list;
            });
            $('.bindCardList').html(html);
            if (x == 5) {
                $('.above-footer').find('#cardLimitMessage').removeClass('hide');
                $('.newAddCard').removeAttr('id', 'bindCard');
                $('.above-footer').find('.above-footer-btn').addClass('not-allowed');
                $('.above-footer').find('.abs-right-red').addClass('gray');
                $('.above-footer').find('#cardLimitMessage').removeClass('hide');
                $('.above-footer').find('#cardLimitReminder').addClass('hide');
            }

        },
        error: function () {
            console.log('提交失败！');
        }
    });

}

$('.bindCardList').on('click', '.banks', function () {
    $(this).addClass('selected').siblings('.banks').removeClass('selected');
    $(this).parent().find('.banks').removeClass('no-slected');
});

//提款申请
$('.red-border-bh').on('click', '#drawing', function () {
    var num = parseInt($('#drawingNum').val());
    var nums = parseInt($('.UserAmount').html())
    var pass = $('#pass').val();
    var bankid = parseInt($(this).parents('#requestWithdrawForm').find('.selected').attr('data-bankid'));
    console.log(num);
    console.log(typeof (num));
    console.log(bankid);
    console.log(typeof (bankid));
    var se = $(this).parents('#requestWithdrawForm').find('.banks').hasClass('selected');
    if (!se) {
        layer.confirm('请选择银行卡', {
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
    if (pass == '') {
        layer.confirm('请输入资金密码', {
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
    if (num > nums) {
        layer.confirm('钱包余额不足', {
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
        url: '/withdraw/add',
        datatype: 'json',
        data: {
            user_bank_id: bankid,
            money: num,
            password: pass
        },
        success: function (e) {
            console.log(e);
            if (e.status == 'success') {
                console.log(e);
                layer.confirm('提款申请成功', {
                    skin: 'success-class',
                    title: '',
                    maxmin: true, //开启最大化最小化按钮
                    area: ['380px', '260px'],
                    btn: ['确定']
                }, function () {
                    layer.closeAll();
                });
            }
        },
        error: function (e) {
            console.log('获取用户详情失败！');
            if (e.status == 'error') {
                layer.confirm('余额不足', {
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
    });

});

//提款记录
function drawingHistory(page) {
    var startDay = $('#startDay').val();
    var endDay = $('#endDay').val();
    var status = $('#drawingStatus').find('.current').html(); //状态
    console.log(status);
    var ballStatus = '';
    switch (status) {
        case '待确认':
            ballStatus = 'wait';
            break;
        case '提现成功':
            ballStatus = 'success';
            break;
        case '提现失败':
            ballStatus = 'fail';
            break;
    }
    if (startDay == '') {
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
    if (endDay == '') {
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
        url: '/withdraw/lists',
        datatype: 'json',
        data: {
            page: page, //指定第几页
            created_min: startDay, //指定最小日期
            created_max: endDay, //指定最大日期
            status: ballStatus, //状态
            pageSize: 11 //每页条数
        },
        success: function (e) {
            console.log(e);
            var html = '',
                _status = '',
                _remark = '';
            $('#his_tk_currentPage').html(e['message'].current_page); //当前页
            $('#his_tk_totalPage').html(e['message'].last_page); //总页数
            if (e.status == 'success') {
                if (e['message'].data.length == 0) {
                    $('#drawingList').html('<div style="text-align: center;position: relative;right: 204px;top: 73px;">无记录</div>');
                    return;
                }
                $.each(e.message, function (i, val) {
                    $.each(val, function (j, k) {
                        var this_status = k.status;
                        switch (this_status) {
                            case 'wait':
                                _status = '待确认';
                                break;
                            case 'success':
                                _status = '提现成功';
                                break;
                            case 'fail':
                                _status = '提现失败';
                                break;
                        }
                        if (k.remark == '') {
                            _remark = '---'
                        } else {
                            _remark = k.remark;
                        }
                        var list = `<ul class="historyDrawingList">
                                    <li class="historyDrawing-id">${k.id}</li>
                                    <li class="historyDrawing-num">${k.money}</li>
                                    <li class="historyDrawing-bank">${k['bank'].name}</li>
                                    <li class="historyDrawing-time">${k.created}</li>
                                    <li class="historyDrawing-status">${_status}</li>
                                    <li class="historyDrawing-remark">${_remark}</li>
                                    </ul>`;
                        html += list;
                    })
                });
                $('#drawingList').html(html);
            }
        },
        error: function () {
            console.log('提交失败！');
            layer.confirm('提交失败', {
                skin: 'error-class',
                title: '',
                maxmin: true, //开启最大化最小化按钮
                area: ['380px', '260px'],
                btn: ['确定']
            }, function () {
                layer.closeAll();
            });
        }
    });
}



//提款记录 下一页
$('.his_tk_next').bind('click', function () {
    var p = $('#his_tk_currentPage').html();
    var n = $('#his_tk_totalPage').html();
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
    $('#his_tk_currentPage').html(p);
    drawingHistory(p);
});
//提款记录 上一页
$('.his_tk_prev').bind('click', function () {
    var p = $('#his_tk_currentPage').html();
    var n = $('#his_tk_totalPage').html();
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
    drawingHistory(p);
});


//新增银行卡
$('#goToBindCard').click(function () {
    $("#bind_card").trigger("click");
});
//完善个人信息
$('#goToPersonInfo').click(function () {
    $("#person_Info").trigger("click");
});

$('#buy_his').click(function () {
    $("#personal").trigger("click");
    $("#hisBuy").trigger("click");

});
$('#agent_list').click(function () {
    $("#agent").trigger("click");
    $("#agentList").trigger("click");
});
$('#bb_list').click(function () {
    $("#agent").trigger("click");
    $("#bbList").trigger("click");
});

$('#topDeposit').click(function () {
    $("#deposit").trigger("click");
    // $("#agent_info").trigger("click");
    // $("#bbList").trigger("click");
});
//线下转账

function rechargeAdd(v,j,t) {

    var num = $(v).parent('.quickPaymentDeposit').find('.cardNum').val();
    var this_id=$(v).parent('.quickPaymentDeposit').find('.account_id').attr(j);
    if (num == '' || num <1) {
        layer.confirm('金额不符合规定', {
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
        money:num,
        channel:'offline',
        recipient_account_id:this_id,
        type:t
    };
    $.ajax({
        type: 'POST',
        url: '/recharge/add ',
        datatype: 'json',
        data: info,
        success: function (e) {
            console.log(e);
            if(e.status=='success'){
                var bank=e.message.info.bank_name;
                var name=e.message.info.holder;
                var account=e.message.info.account;
                var branch=e.message.info.zone1+e.message.info.zone2+e.message.info.branch;
                $(v).parent('.quickPaymentDeposit').find('.QuickPayment-Rltcontent').show();
                $(v).parent('.quickPaymentDeposit').find('.bank-ul').hide();
                $(v).parent('.quickPaymentDeposit').find('.list2').hide();
                $(v).parent('.quickPaymentDeposit').find('.subMit-btn').hide();
                if(bank!=undefined){
                    $(v).parent('.quickPaymentDeposit').find('#copyBankName').val(bank);
                }
                if(branch!=undefined){
                    $(v).parent('.quickPaymentDeposit').find('.copyBankBranch').val(branch);
                    $(v).parent('.quickPaymentDeposit').find('.copy_branch').attr('data-clipboard-text',branch);
                }
                $(v).parent('.quickPaymentDeposit').find('.copyAccountName').val(name);
                $(v).parent('.quickPaymentDeposit').find('.copyEmail').val(account);
                $(v).parent('.quickPaymentDeposit').find('.copyAmount').val(num);
                $(v).parent('.quickPaymentDeposit').find('.copy_account_name').attr('data-clipboard-text',name);
                $(v).parent('.quickPaymentDeposit').find('.copy_email').attr('data-clipboard-text',account);
                $(v).parent('.quickPaymentDeposit').find('.copy_amount').attr('data-clipboard-text',num);

            }
        },
        error: function () {
            console.log('提交失败！');
        }
    });
}

$('.goBackToForm').click(function () {
   $(this).parent('.QuickPayment-Rltcontent').hide();
    $(this).parents('.quickPaymentDeposit').find('.list2').show();
    $(this).parents('.quickPaymentDeposit').find('.bank-ul').show();
   $(this).parents('.quickPaymentDeposit').find('.subMit-btn').show();
    $(this).parents('.quickPaymentDeposit').find('.cardNum').val('');
});


//线上支付
// $('#recharge').click(function () {
//     var num = $('#bank-recharge').val();
//     if (num < 1) {
//         layer.confirm('请输入正确的金额', {
//             skin: 'error-class',
//             title: '',
//             maxmin: true, //开启最大化最小化按钮
//             area: ['380px', '260px'],
//             btn: ['确定']
//         }, function () {
//             layer.closeAll();
//         });
//         return false;
//     }
//
//
// });

//收款充值账号
function accountList() {
    $.ajax({
        type: 'POST',
        url: '/recharge/account',
        datatype: 'json',
        success: function (e) {
            console.log('收款充值账号列表');
            console.log(e);
            //银行信息
            $.each(e.bank,function (i,val) {
                console.log(val.id);
                var bank_img = '';
                var name = val.bank_name;
                switch (name) {
                    case '中国工商银行':
                        bank_img = '<img class="inline-block" src="images/bank/0001.png">';
                        break;
                    case '中国农业银行':
                        bank_img = '<img class="inline-block" src="images/bank/0105.png">';
                        break;
                    case '中国建设银行':
                        bank_img = '<img class="inline-block" src="images/bank/0103.png">';
                        break;
                    case '招商银行':
                        bank_img = '<img class="inline-block" src="images/bank/0004.png">';
                        break;
                    case '交通銀行':
                        bank_img = '<img class="inline-block" src="images/bank/0129.png">';
                        break;
                    case '广发银行':
                        bank_img = '<img class="inline-block" src="images/bank/0115.png">';
                        break;
                    case '华夏银行':
                        bank_img = '<img class="inline-block" src="images/bank/0123.png">';
                        break;
                    case '浦发银行':
                        bank_img = '<img class="inline-block" src="images/bank/0104.png">';
                        break;
                    case '兴业银行':
                        bank_img = '<img class="inline-block" src="images/bank/0107.png">';
                        break;
                    case '中国光大银行':
                        bank_img = '<img class="inline-block" src="images/bank/0109.png">';
                        break;
                    case '中国民生银行':
                        bank_img = '<img class="inline-block" src="images/bank/0106.png">';
                        break;
                    case '中国银行':
                        bank_img = '<img class="inline-block" src="images/bank/0110.png">';
                        break;
                    case '中国邮政储蓄银行':
                        bank_img = '<img class="inline-block" src="images/bank/0117.png">';
                        break;
                    case '中信银行':
                        bank_img = '<img class="inline-block" src="images/bank/0118.png">';
                        break;
                    case '平安银行':
                        bank_img = '<img class="inline-block" src="images/bank/0114.png">';
                        break;
                }
                $('#bankImg').html(bank_img);
                $('#bankImg').attr('bank-id',val.id);

            });
            //微信信息
            $.each(e.weixin,function (i,val) {
                console.log(val.id);
                $('#weixinId').attr('weixin-id',val.id);
            });
            //支付宝信息
            $.each(e.alipay,function (i,val) {
                console.log(val.id);
                $('#alipayId').attr('alipay-id',val.id);
            });
        },
        error: function () {
            console.log('提交失败！');
        }
    });
}


$('.opTab-content').click(function(){
    $(this).find('.bankRadioBtn').addClass('selected-red');
    var c=$(this).siblings('.opTab-content');
    c.find('.bankRadioBtn').removeClass('selected-red');
    var h=$(this).parent('.bankList-OpTab').find('span');
    var s=h.hasClass('selected-red');
    if(s){
        $('form').addClass('enable');
    }
});

$('.ghostButton').click(function(){
    var _id=$(this).attr('id');
    var num=_id.replace(/[^0-9]/ig,"");
    var m=0;
    switch(num){
        case '0':
            $('.ui-slider-handle').css('left','0%');
            break;
        case '1000':
            $('.ui-slider-handle').css('left','25%');
            m=1000;
            break;
        case '5000':
            $('.ui-slider-handle').css('left','50%');
            m=5000;
            break;
        case '10000':
            $('.ui-slider-handle').css('left','75%');
            m=10000;
            break;
        case '50000':
            $('.ui-slider-handle').css('left','100%');
            m=50000;
            break;
    }
    $('#bank-recharge').val(m);
});

//充值记录
function rechargeRecord(page) {
    var startDay = $('#startDay').val();
    var endDay = $('#endDay').val();
    var status = $('#recharge-record').find('.current').html(); //状态
    console.log(status);
    var ballStatus = '';
    switch (status) {
        case '待确认':
            ballStatus = 'wait';
            break;
        case '充值成功':
            ballStatus = 'success';
            break;
        case '充值失败':
            ballStatus = 'fail';
            break;
    }
    if (startDay == '') {
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
    if (endDay == '') {
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
        url: '/recharge/lists',
        datatype: 'json',
        data: {
            page: page, //指定第几页
            created_min: startDay, //指定最小日期
            created_max: endDay, //指定最大日期
            status: ballStatus, //状态
            pageSize: 11 //每页条数
        },
        success: function (e) {
            console.log(e);
            var html = '',
                _status = '',
                _remark = '',
                _type = '',
                _channel='';
            $('#his_recharge_currentPage').html(e['message'].current_page); //当前页
            $('#his_recharge_totalPage').html(e['message'].last_page); //总页数
            if (e.status == 'success') {
                if (e['message'].data.length == 0) {
                    $('#rechargeList').html('<div style="text-align: center;position: relative;right: 204px;top: 73px;">无记录</div>');
                    return;
                }
                $.each(e.message, function (i, val) {
                    $.each(val, function (j, k) {
                        var this_status = k.status;
                        switch (this_status) {
                            case 'wait':
                                _status = '待确认';
                                break;
                            case 'success':
                                _status = '充值成功';
                                break;
                            case 'fail':
                                _status = '充值失败';
                                break;
                        }
                        if (k.remark == '') {
                            _remark = '---'
                        } else {
                            _remark = k.remark;
                        }

                        if (k.channel=='offline') {
                            _channel = '线下转账'
                        } else {
                            _channel = '线上支付';
                        }

                        if (k.type=='bank') {
                            _type = '银行'
                        } else if (k.type=='weixin'){
                            _type = '微信';
                        }else if(k.type=='alipay'){
                            _type = '支付宝';
                        }
                        var list = `<ul class="historyRechargeList">
                                    <li >${k.id}</li>
                                    <li >${k.money}</li>
                                    <li >${_type}</li>
                                    <li >${k.created}</li>
                                    <li >${_channel}</li>
                                    <li >${_status}</li>
                                    <li >${_remark}</li>
                                    </ul>`;
                        html += list;
                    })
                });
                $('#rechargeList').html(html);
            }
        },
        error: function () {
            console.log('提交失败！');
            layer.confirm('提交失败', {
                skin: 'error-class',
                title: '',
                maxmin: true, //开启最大化最小化按钮
                area: ['380px', '260px'],
                btn: ['确定']
            }, function () {
                layer.closeAll();
            });
        }
    });
}


//充值记录 下一页
$('.his_recharge_next').bind('click', function () {
    var p = $('#his_recharge_currentPage').html();
    var n = $('#his_recharge_totalPage').html();
    if (p == n) {
        return;
    }
    p++;
    if (p == n) {
        $('.his_recharge_next').addClass('disabled');
    }
    if (p > 1) {
        $('.his_recharge_prev').removeClass('disabled');
    }
    $('#his_recharge_currentPage').html(p);
    rechargeRecord(p);
});
//充值记录 上一页
$('.his_recharge_prev').bind('click', function () {
    var p = $('#his_recharge_currentPage').html();
    var n = $('#his_recharge_totalPage').html();
    if (p <= 1) {
        return;
    }
    p--;
    if (p == 1) {
        $('.his_recharge_prev').addClass('disabled');
    }
    if (p < n) {
        $('.his_recharge_next').removeClass('disabled');
    }
    rechargeRecord(p);
});
//代理


$('.new-switch-con .po-middle').click(function () {
    $(this).toggleClass('selected');
    var se=$(this).hasClass('selected');
    if(se){
        $(this).html('会员');
    }else {
        $(this).html('代理');
    }

});

//链接注册
$('#agentLink').click(function () {
    var endDay = $('#endDay').val();
    var angentType=$('#dira-regtype-proxy').html();
    var channel=$('#channelType').find('.current').html();
    var type='';
    if (channel=='选择渠道') {
        layer.confirm('请选择渠道', {
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
    if(angentType=='代理'){
        type='agent';
    }else {
        type='member';
    }
    $.ajax({
        type: 'POST',
        url: '/invite/add',
        datatype: 'json',
        data: {
            type:type,
            channel:channel,
            term_at:endDay
        },
        success: function (e) {
            console.log(e);
            if(e.status=='success'){
                layer.confirm('生成成功', {
                    skin: 'success-class',
                    title: '',
                    maxmin: true, //开启最大化最小化按钮
                    area: ['380px', '260px'],
                    btn: ['确定']
                }, function () {
                    layer.closeAll();
                });
            }else {
                layer.confirm('生成失败', {
                    skin: 'success-class',
                    title: '',
                    maxmin: true, //开启最大化最小化按钮
                    area: ['380px', '260px'],
                    btn: ['确定']
                }, function () {
                    layer.closeAll();
                });
            }

        },
        error: function () {
            console.log('提交失败！');
            layer.confirm('提交失败', {
                skin: 'error-class',
                title: '',
                maxmin: true, //开启最大化最小化按钮
                area: ['380px', '260px'],
                btn: ['确定']
            }, function () {
                layer.closeAll();
            });
        }
    });
});
//会员管理
function agentMember(p) {
    var startDay = $('#startDay').val();
    var endDay = $('#endDay').val();
    var agentRange=$('#agentRange').find('.current').html();
    console.log(agentRange);
    var range='';
    if(agentRange=='所有下线'){
        range='all';
    }else {
        range='only';
    }
    $.ajax({
        type: 'POST',
        url: '/user/branch',
        datatype: 'json',
        data: {
            range:range,
            created_min:startDay,
            created_max:endDay,
            pageSize:11,
            page:p
        },
        success: function (e) {
            console.log(e);
            var html = '';
            $('#agent_user_currentPage').html(e['message'].current_page); //当前页
            $('#agent_user_totalPage').html(e['message'].last_page); //总页数
            if(e.status=='success'){
                if (e['message'].data.length == 0) {
                    $('#agentUser').html('<div style="text-align: center;position: relative;right: 204px;top: 73px;">无记录</div>');
                    return;
                }
                $.each(e.message, function (i, val) {
                    $.each(val, function (j, k) {
                        var createdTime=k.created;
                        var _createdTime=createdTime.substring(0,10);
                        var list = `<ul class="agentUserList">
                                    <li>${k.id}</li>
                                    <li>${k.username}</li>
                                    <li >${k.balance}</li>
                                    <li >${k.invite_num}</li>
                                    <li >${k.inactive}</li>
                                    <li >${_createdTime}</li>
                                    </ul>`;
                        html += list;
                    })
                });
                $('#agentUser').html(html);
            }
        },
        error: function () {
            console.log('提交失败！');
            layer.confirm('提交失败', {
                skin: 'error-class',
                title: '',
                maxmin: true, //开启最大化最小化按钮
                area: ['380px', '260px'],
                btn: ['确定']
            }, function () {
                layer.closeAll();
            });
        }
    });
}

//邀请链接列表
function agentLink(p) {
    var startDay = $('#startDay').val();
    var endDay = $('#endDay').val();
    var agentLink=$('#agentLinkStatus').find('.current').html();
    var status='';
    if(agentLink=='正常'){
        status='normal';
    }else if(agentLink=='取消'){
        status='cancel';
    }
    $.ajax({
        type: 'POST',
        url: '/invite/lists',
        datatype: 'json',
        data: {
            status:status,
            created_min:startDay,
            created_max:endDay,
            pageSize:11,
            page:p
        },
        success: function (e) {
            console.log(e);
            var html = '',
                _status = '',
                _type = '';
            $('#agent_currentPage').html(e['message'].current_page); //当前页
            $('#agent_totalPage').html(e['message'].last_page); //总页数
            if(e.status=='success'){
                if (e['message'].data.length == 0) {
                    $('#agentLinkList').html('<div style="text-align: center;position: relative;right: 204px;top: 73px;">无记录</div>');
                    return;
                }
                $.each(e.message, function (i, val) {
                    $.each(val, function (j, k) {
                        var this_type = k.type;
                        switch (this_type) {
                            case 'member':
                                _type = '会员';
                                break;
                            case 'agent':
                                _type = '代理';
                                break;
                        }

                        var this_status=k.status;
                        switch (this_status) {
                            case 'normal':
                                _status = '正常';
                                break;
                            case 'cancel':
                                _status = '取消';
                                break;
                        }
                        var time=k.term_at;
                        var _time=time.substring(0,10);
                        var createdTime=k.created;
                        var _createdTime=createdTime.substring(0,10);
                        var domain = document.domain;
                        var port=window.location.port;
                        var code=k.code;
                        var url=domain+':'+port+'/login.php'+'?'+'name'+'='+code;
                        var list = `<ul class="agentLinkList">
                                    <li>${k.id}</li>
                                    <li data-clipboard-text="${url}" class="copyLink">${url}</li>
                                    <li >${_type}</li>
                                    <li >${k.channel}</li>
                                    <li >${_status}</li>
                                    <li >${_time}</li>
                                    <li >${k.register}</li>
                                    <li >${_createdTime}</li>
                                    <li class="delete-agent-link" agent-id="${k.id}">取消</li>
                                    </ul>`;
                        html += list;
                    })
                });
                $('#agentLinkList').html(html);
            }
        },
        error: function () {
            console.log('提交失败！');
            layer.confirm('提交失败', {
                skin: 'error-class',
                title: '',
                maxmin: true, //开启最大化最小化按钮
                area: ['380px', '260px'],
                btn: ['确定']
            }, function () {
                layer.closeAll();
            });
        }
    });
}
//点击复制
var clipboard = new Clipboard('.copyLink');
clipboard.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);
    layer.confirm('复制成功', {
        skin: 'success-class',
        title: '',
        maxmin: true, //开启最大化最小化按钮
        area: ['380px', '260px'],
        btn: ['确定']
    }, function () {
        layer.closeAll();
    });
    e.clearSelection();
});

clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});

//链接管理 下一页
$('.agent_next').bind('click', function () {
    var p = $('#agent_currentPage').html();
    var n = $('#agent_totalPage').html();
    if (p == n) {
        return;
    }
    p++;
    if (p == n) {
        $('.agent_next').addClass('disabled');
    }
    if (p > 1) {
        $('.agent_prev').removeClass('disabled');
    }
    $('#his_recharge_currentPage').html(p);
    agentLink(p);
});
//链接管理 上一页
$('.agent_prev').bind('click', function () {
    var p = $('#agent_currentPage').html();
    var n = $('#agent_totalPage').html();
    if (p <= 1) {
        return;
    }
    p--;
    if (p == 1) {
        $('.agent_prev').addClass('disabled');
    }
    if (p < n) {
        $('.agent_next').removeClass('disabled');
    }
    agentLink(p);
});
$('#agentLinkList').on('click','.delete-agent-link',function () {
    var linkId=$(this).attr('agent-id');
    console.log(linkId);
    $.ajax({
        type: 'POST',
        url: '/invite/cancel',
        datatype: 'json',
        data: {
            id:linkId
        },
        success: function (e) {
            console.log(e);
            if(e.status=='success'){
                layer.confirm('取消成功', {
                    skin: 'success-class',
                    title: '',
                    maxmin: true, //开启最大化最小化按钮
                    area: ['380px', '260px'],
                    btn: ['确定']
                }, function () {
                    layer.closeAll();
                });
            }
        },
        error: function () {
            console.log('提交失败！');
            layer.confirm('提交失败', {
                skin: 'error-class',
                title: '',
                maxmin: true, //开启最大化最小化按钮
                area: ['380px', '260px'],
                btn: ['确定']
            }, function () {
                layer.closeAll();
            });
        }
    });
});

//邀请链接注册用户列表
function agentLinkUser(p) {
    var startDay = $('#startDay').val();
    var endDay = $('#endDay').val();
    var agentLink=$('#agentLinkStatus').find('.current').html();
    var status='';
    if(agentLink=='正常'){
        status='normal';
    }else if(agentLink=='取消'){
        status='cancel';
    }
    $.ajax({
        type: 'POST',
        url: '/invite/users',
        datatype: 'json',
        data: {
            status:status,
            created_min:startDay,
            created_max:endDay,
            pageSize:11,
            page:p
        },
        success: function (e) {
            console.log(e);
            var html = '';
            $('#agent_user_currentPage').html(e['message'].current_page); //当前页
            $('#agent__user_totalPage').html(e['message'].last_page); //总页数
            if(e.status=='success'){
                if (e['message'].data.length == 0) {
                    $('#agentUser').html('<div style="text-align: center;position: relative;right: 204px;top: 73px;">无记录</div>');
                    return;
                }
                $.each(e.message, function (i, val) {
                    $.each(val, function (j, k) {
                        var time=k.created;
                        var _time=time.substring(0,10);
                        var list = `<ul class="agentLinkList">
                                    <li>${k.username}</li>
                                    <li>${_time}</li>
                                    </ul>`;
                        html += list;
                    })
                });
                $('#agentUser').html(html);
            }else {
                $('#agentUser').html('<div style="text-align: center;position: relative;right: 204px;top: 73px;">数据不存在</div>');
            }
        },
        error: function () {
            console.log('提交失败！');
            layer.confirm('提交失败', {
                skin: 'error-class',
                title: '',
                maxmin: true, //开启最大化最小化按钮
                area: ['380px', '260px'],
                btn: ['确定']
            }, function () {
                layer.closeAll();
            });
        }
    });
}


//邀请用户列表 下一页
$('.agent_user_next').bind('click', function () {
    var p = $('#agent_user_currentPage').html();
    var n = $('#agent__user_totalPage').html();
    if (p == n) {
        return;
    }
    p++;
    if (p == n) {
        $('.agent_user_next').addClass('disabled');
    }
    if (p > 1) {
        $('.agent_user_prev').removeClass('disabled');
    }
    $('#his_recharge_currentPage').html(p);
    agentLinkUser(p);
});
//邀请用户列表 上一页
$('.agent_user_prev').bind('click', function () {
    var p = $('#agent_user_currentPage').html();
    var n = $('#agent__user_totalPage').html();
    if (p <= 1) {
        return;
    }
    p--;
    if (p == 1) {
        $('.agent_user_prev').addClass('disabled');
    }
    if (p < n) {
        $('.agent_user_next').removeClass('disabled');
    }
    agentLinkUser(p);
});


//盈亏列表
function profitList(p) {
    var startDay = $('#startDay').val();
    var endDay = $('#endDay').val();
    $.ajax({
        type: 'POST',
        url: '/invite/profit',
        datatype: 'json',
        data: {
            created_min:startDay,
            created_max:endDay,
            pageSize:11,
            page:p
        },
        success: function (e) {
            console.log(e);
            var html = '';
            $('#profit_currentPage').html(e['message'].current_page); //当前页
            $('#profit_totalPage').html(e['message'].last_page); //总页数
            if(e.status=='success'){
                if (e['message'].data.length == 0) {
                    $('#profit_list').html('<div style="text-align: center;position: relative;right: 204px;top: 73px;">无记录</div>');
                    return;
                }
                $.each(e.message, function (i, val) {
                    $.each(val, function (j, k) {
                        var time=k.created;
                        var _time=time.substring(0,10);
                        var list = `<ul class="agentLinkList">
                                    <li>${k.username}</li>
                                    <li>${k.user_id}</li>
                                    <li>${k.bet}</li>
                                    <li>${k.recharge}</li>
                                    <li>${k.withdraw}</li>
                                    <li>${k.winning}</li>
                                    <li>${k.income}</li>
                                    <li>${k.team_bet}</li>
                                    <li>${k.team_recharge}</li>
                                    <li>${k.team_withdraw}</li>
                                    <li>${k.team_winning}</li>
                                    <li>${k.team_income}</li>
                                    </ul>`;
                        html += list;
                    })
                });
                $('#profit_list').html(html);
            }else {
                $('#profit_list').html('<div style="text-align: center;position: relative;right: 204px;top: 73px;">数据不存在</div>');
            }
        },
        error: function () {
            console.log('提交失败！');
            layer.confirm('提交失败', {
                skin: 'error-class',
                title: '',
                maxmin: true, //开启最大化最小化按钮
                area: ['380px', '260px'],
                btn: ['确定']
            }, function () {
                layer.closeAll();
            });
        }
    });
}


//盈亏列表 下一页
$('.profit_next').bind('click', function () {
    var p = $('#profit_currentPage').html();
    var n = $('#profit_totalPage').html();
    if (p == n) {
        return;
    }
    p++;
    if (p == n) {
        $('.profit_next').addClass('disabled');
    }
    if (p > 1) {
        $('.profit_prev').removeClass('disabled');
    }
    $('#his_recharge_currentPage').html(p);
    profitList(p);
});
//盈亏列表 上一页
$('.profit_prev').bind('click', function () {
    var p = $('#profit_currentPage').html();
    var n = $('#profit_totalPage').html();
    if (p <= 1) {
        return;
    }
    p--;
    if (p == 1) {
        $('.profit_prev').addClass('disabled');
    }
    if (p < n) {
        $('.profit_next').removeClass('disabled');
    }
    profitList(p);
});


//用户代理投注记录
function agentBetList(page) {
    var startDay=$('#startDay').val();
    var endDay=$('#endDay').val();
    $.ajax({
        type: 'POST',
        url: '/invite/bet',
        datatype: 'json',
        data: {
            page: page,            //指定第几页
            created_min:startDay, //指定最小日期
            created_max:endDay, //指定最大日期
            pageSize:11         //每页条数
        },
        beforeSend: function (XMLHttpRequest) {
        },
        success: function (e) {
            console.log(e);
            if(e['message'].data.length==0){
                $('#agentBet').html('<div style="text-align: center;position: relative;right: 204px;top: 73px;">无投注记录</div>');
                return;
            }
            var html = '',
                tip = '',
                awardNum = '';
            $('#agentBet_currentPage').html(e['message'].current_page); //当前页
            $('#agentBet_totalPage').html(e['message'].last_page); //总页数
            $.each(e.message, function (i, val) {
                $.each(val, function (j, k) {
                    var orderId = k.order_id, //订单编号
                        name = k['product'].name, //彩票名
                        daytime = k['periods'].date, //投注日期
                        num = k['periods'].num, //投注编号
                        orderNum = daytime + ' ' + fill_lenght(num, 3, '0'), //游戏奖期
                        created = k.created, //投注时间
                        username = k.username, //用户名
                        money = k.money, //投注金额
                        bonus = k.bonus, //中奖金额
                        status = k.status, //状态
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
                    var historyDetailed=`<ul class="historyDetailedList">
                                    <li class="historyDetailed-type">${name}</li>
                                    <li class="historyDetailed-id">${orderId}</li>
                                    <li class="historyDetailed-id">${username}</li>
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

            $('#agentBet').html(html);
        },
        error: function () {
            console.log('提交失败！');
        }
    });
}


//用户代理投注记录 下一页
$('.agentBet_next').bind('click', function () {
    var p = $('#agentBet_currentPage').html();
    var n = $('#agentBet_totalPage').html();
    if (p == n) {
        return;
    }
    p++;
    if (p == n) {
        $('.agentBet_next').addClass('disabled');
    }
    if (p > 1) {
        $('.agentBet_prev').removeClass('disabled');
    }
    $('#his_recharge_currentPage').html(p);
    agentBetList(p);
});
//用户代理投注记录 上一页
$('.agentBet_prev').bind('click', function () {
    var p = $('#agentBet_currentPage').html();
    var n = $('#agentBet_totalPage').html();
    if (p <= 1) {
        return;
    }
    p--;
    if (p == 1) {
        $('.agentBet_prev').addClass('disabled');
    }
    if (p < n) {
        $('.agentBet_next').removeClass('disabled');
    }
    agentBetList(p);
});

