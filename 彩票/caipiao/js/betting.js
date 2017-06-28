$(function() {
    var Betting = {
        bet_action : 'all5',
        init: function() {
            Betting.bindEvent();
        },
        bindEvent: function() {
            // 删除已选号码
            $('.J_delNums').click(function() {
                $(this).parents('li').remove();
            });
            $('select').niceSelect();

            //清除下注按钮
            $('.J_clear').bind('click', function() {
                Betting.quicklySelect(this, false);
            });
            //奇注
            $('.J_ji').bind('click', function() {
                Betting.quicklySelect(this, ':odd', ':even');
            });
            //偶注
            $('.J_ou').bind('click', function() {
                Betting.quicklySelect(this, ':even', ':odd');
            });
            //全注
            $('.J_all').bind('click', function() {
                Betting.quicklySelect(this);
            });
            //大
            $('.J_big').bind('click', function() {
                Betting.quicklySelect(this, ':gt(4)', ':lt(5)');
            });
            //小
            $('.J_small').bind('click', function() {
                Betting.quicklySelect(this, ':lt(5)', ':gt(4)');
            });

            // 主导航栏选择大类型
            $('.J_withChild').click(function() {
                var _this = $(this);
                var _info = _this.data('info');

                if (_this.hasClass('active')) {
                    return;
                } else {
                    _this.addClass('active').siblings('span').removeClass('active');
                }

                // console.log(_info);
                var x = _info.split('#');
                console.log(x);
                // console.log(x[1]);
                Betting.renderSubMenu(x[1]);
            });

            // 次级导航选择投注方式
            $('#J_subMenuList').on('click', '.J_subMenu', function() {
                var _this = $(this);
                var _info = _this.data('info');
                if (_this.hasClass('active')) {
                    return;
                } else {
                    _this.addClass('active').siblings('dd').removeClass('active');
                }

                console.log(_info);
            });
        },
        renderSubMenu: function(type) {
            var _html = SSC_TEMPLATE[type]().dom;
            $('#J_subMenuList').html(_html);

            
        },
        quicklySelect: function(elm, need, not) {
            var list = $(elm).parent().prev().find('.num-wrp');
            if (need && not) {
                list.filter(not).removeClass('active');
                list.filter(need).addClass('active');
            } else {
                if (need === false) {
                    list.removeClass('active');
                } else {
                    list.addClass('active');
                }
            }
            // Betting.touzhu();
        },












        touzhu: function() {
            var amount, bet = Betting.getBet();
            if (bet.sum < 1) {
                return;
            }
            $('#selectionBallStakes').html(bet.sum);
            amount = Betting.bet_amount(bet.sum);
            $('#selectionBallAmount').html(amount.toFixed(4));
            if (bet.sum >= 1) {
                $('#addBallToCart,#shortcutPlaceOrder').addClass('enable');
            } else {
                $('#addBallToCart,#shortcutPlaceOrder').removeClass('enable');
            }
        },
        getBet: function() {
            //获取投注数据
            var num = {},
                sum = 0,
                li;
            
            // all5 : 五星直选
            // varied5 : 五星通选
            // group5 : 五星组选
            
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
                            sum = Betting.factorial(sum120) / Betting.factorial(5) / Betting.factorial(sum120 - 5);
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
        },
        bet_amount: function(sum) {
            //计算金额
            var money = 2,
                betMultiple = parseInt($('#J_beishu').val());
            return sum * money * betMultiple;
        },
        factorial: function(num) {
            //阶乘
            var result = 1;
            while (num) {
                result *= num;
                num--;
            }
            return result;
        }
    }


    Betting.init();
});