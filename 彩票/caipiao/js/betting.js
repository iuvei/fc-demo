$(function() {
    var Betting = {
        bet_action: 'all5',
        init: function() {
            $('select').niceSelect();
            Betting.bindEvent();
            Betting.bettingEvent();
            Betting.renderSelectArea();
        },
        bindEvent: function() {
            // 主导航栏选择大类型
            $('.J_withChild').click(function() {
                var _this = $(this);
                var _info = _this.data('info');

                // TODO: 点击当前不改变
                // if (_this.hasClass('active')) {
                //     return;
                // } else {
                _this.addClass('active').siblings('span').removeClass('active');
                // }

                var _mainNav = _info.split('#');
                Betting.renderSubMenu(_mainNav[1]);

                // console.log(_mainNav[1]);
            });

            // 次级导航选择投注方式
            $('#J_subMenuList').on('click', '.J_subMenu', function() {
                var _this = $(this);
                var _info = _this.data('info');

                // TODO: 点击当前不改变
                // if (_this.hasClass('active')) {
                //     return;
                // } else {
                _this.parents('#J_subMenuList').find('dd').removeClass('active')
                _this.addClass('active');
                // }

                var _mainNav = $('.J_withChild.active').data('info').split('#');
                var _subNav = _info.split('#');

                Betting.renderBettingRule(_mainNav[1], _subNav[1]);
                Betting.renderMaxBonus(_mainNav[1], _subNav[1]);

                // console.log(_mainNav[1], _subNav[1]);
                Betting.renderSelectArea();
            });
        },
        renderSelectArea: function() {
            var _mainNav = $('.J_withChild.active').data('info').split('#')[1];
            var _subNav = $('.J_subMenu.active').data('info').split('#')[1];
            var _data = SSC_TEMPLATE[_mainNav]({
                type: _subNav
            });
            var options = _data.opt;

            // console.log(options);
            // console.log(options.multipleChoice);

            // return;
            // console.log(options`);
            // options.numNameList = ['万位', '千位'];
            // options.numList = ['大','小','单','双'];

            // options.numNameList = ['和值'];
            // options.numList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
            // options.quickFast = false;

            var _str = '';

            // 复选框
            if (options.haveCheckbox) {
                // options.defaultCheck //默认选中个数
                _str += '<div><input type="checkbox" name="" id=""><p>提示：至少选2个位置,您已选了2个位置，系统将自动生成1个方案。</p></div>';
            }

            //号码
            if (options.numNameList.length) {
                _str += '<ul class="bet-row">';
                $.each(options.numNameList, function(i, v) {
                    var _tt = '';
                    if(v.split('#').length > 1) {
                        _tt = v.split('#')[1];
                    } else {
                        _tt = v;
                    }
                    switch (v) {
                        case 'FIFTH':
                            _tt = '个位'
                            break;
                        case 'FOURTH':
                            _tt = '十位'
                            break;
                        case 'THIRD':
                            _tt = '百位'
                            break;
                        case 'SECOND':
                            _tt = '千位'
                            break;
                        case 'FIRST':
                            _tt = '万位'
                            break;
                        default:
                        break
                    }
                    _str += '<li>';
                    _str += '<div class="icon fl row-tt">' + _tt + '</div>';
                    if (options.numList.length) {
                        _str += _getNumList(options.numList, options.multipleChoice, v.split('#')[0]);
                    }
                    if (options.quickFast) {
                        _str += '<ul class="row-text fr">';
                        if (!options.hasNoAllFastBtn) {
                            _str += '<li class="J_all">全</li>';
                        }
                        _str += '<li class="J_big">大</li>';
                        _str += '<li class="J_small">小</li>';
                        _str += '<li class="J_ji">奇</li>';
                        _str += '<li class="J_ou">偶</li>';
                        _str += '<li class="J_clear">清</li>';
                        _str += '</ul>';
                    }
                    _str += '</li>';
                });

                _str += '</ul>';

                function _getNumList(numList, multipleChoice, rowName) {
                    // console.log(rowName);
                    var _numlist = '<ul data-row="'+ rowName +'" class="row-num fl J_ballList '+ ((multipleChoice == undefined || multipleChoice) ? 'J_multipleChoice' : '') +'">';
                    var _len = numList.length - 1;
                    $.each(numList, function(a, b) {
                        if (a == _len) {
                            _numlist += '<li class="J_numWrp last">' + b + '</li>';
                        } else {
                            _numlist += '<li class="J_numWrp">' + b + '</li>';
                        }
                    });
                    _numlist += '</ul>';
                    return _numlist;
                }
            }

            // 文本域
            if (options.haveTextarea) {
                _str += '<textarea cols="40" rows="6" id="ballInputArea" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" placeholder="' + options.placeholder + '"></textarea>';
            }

            $('#J_selectArea').html(_str);

            if (options.haveTextarea) {
                $('textarea').placeholder();
                if (GLOBAL.lessThenIE8()) {
                    $('textarea').on({
                        focus: function() {
                            $(this).val('');
                        },
                        blur: function() {
                            if (!$(this).val()) {
                                $(this).val($(this).attr('placeholder'))
                            }
                        }
                    });
                }
            }
        },
        bettingEvent: function() {
            // 删除已选号码
            $('.J_delNums').click(function() {
                $(this).parents('li').remove();
            });
            //清除下注按钮
            $('#J_bettingBox').on('click', '.J_clear', function() {
                Betting.quicklySelect(this, false);
            });
            //奇注
            $('#J_bettingBox').on('click', '.J_ji', function() {
                Betting.quicklySelect(this, ':odd', ':even');
            });
            //偶注
            $('#J_bettingBox').on('click', '.J_ou', function() {
                Betting.quicklySelect(this, ':even', ':odd');
            });
            //全注
            $('#J_bettingBox').on('click', '.J_all', function() {
                Betting.quicklySelect(this);
            });
            //大
            $('#J_bettingBox').on('click', '.J_big', function() {
                Betting.quicklySelect(this, ':gt(4)', ':lt(5)');
            });
            //小
            $('#J_bettingBox').on('click', '.J_small', function() {
                Betting.quicklySelect(this, ':lt(5)', ':gt(4)');
            });
            // 单独选择投注号码
            $('#J_bettingBox').on('click', '.J_numWrp', function() {
                var _this = $(this);
                var _canmany = _this.parent('ul').hasClass('J_multipleChoice');    //是否可以选择多个

                if (_this.hasClass('active')) {
                    _this.removeClass('active');
                } else {
                    if (_canmany) {
                        _this.addClass('active');
                    } else {
                        _this.addClass('active').siblings('li').removeClass('active');
                    }
                }

                // 计算注数
                Betting.getBettingQuantity();
            });
            // 减少倍数
            $('#J_beishuCut').click(function() {
                var _val = $('#J_beishu').val();
                if (_val <= 1) {
                    return;
                } else {
                    $('#J_beishu').val(_val - 1);
                }
            });

            // 增加倍数
            $('#J_beishuAdd').click(function() {
                var _val = $('#J_beishu').val();
                $('#J_beishu').val(Number(_val) + 1);
            });

            // 倍数
            $('#J_beishu').on({
                keyup: function() {
                    var _val = $(this).val();
                    var _reg = /^[1-9]\d*$/;
                    if (!_reg.test(_val)) {
                        layer.alert('您输入的投注倍数格式不正确,只能输入大于或等于1的数字。', {
                            icon: 2
                        });
                        $(this).val(1);
                    }
                }
            });

            // 投注单位
            $('#J_unit').next('.nice-select').find('li').click(function(e) {
                var val = $(this).text();
                var dataVal = $(this).attr("data-value");
                $('[name="nice-select"] ul').hide();
                $('#J_unit').data({
                    val: val,
                    txt: dataVal
                });
                // console.log($('#J_unit').data());
            });

            // 奖金返点
            // $('#J_rebate').next('.nice-select').find('li').click(function(e) {
            //     var val = $(this).text();
            //     var dataVal = $(this).attr("data-value");
            //     $('[name="nice-select"] ul').hide();
            //     $('#J_rebate').data({
            //         val: val,
            //         txt: dataVal
            //     });
            // });
        },
        getBettingQuantity: function() {
            var _mainNav = $('.J_withChild.active').data('info').split('#')[1];
            var _subNav = $('.J_subMenu.active').data('info').split('#')[1];
            var _currentRule = SSC_TEMPLATE[_mainNav]({
                type : _subNav
            });
            var _type = _currentRule.opt.type; //选择模式 ball:选号   text:文本域
            var _formulaList = [];      //公式列表
            var _currentSelect = [];    //当前已选号码的集合

            $('.J_ballList').each(function(i){
                var _this = $(this);
                _formulaList[i] = _this.data('row');
                _currentSelect[_this.data('row')] = _this.find('.J_numWrp.active').text();
            });
            
            // console.log(_formulaList);
            // console.log(_currentSelect);

            _formulaList.push(_currentSelect);

            var _selectNum = _currentRule.opt.formula(_formulaList);   //通过相应公式计算注数

            $('#J_selectionBallStakes').text(_selectNum);

            // if(){

            // }

            // console.log(SSC_TEMPLATE[_mainNav][_subNav].opt)

            // Betting.renderBettingRule(_mainNav[1], _subNav[1]);
            // Betting.renderMaxBonus(_mainNav[1], _subNav[1]);
        },
        renderMaxBonus: function(mainNavType, subNavType) {
            // 渲染最高奖金
            var _data = SSC_TEMPLATE[mainNavType]({
                type: subNavType
            });
            $('#J_maxBonus').html(_data.maxBonus);
        },
        renderBettingRule: function(mainNavType, subNavType) {
            // 渲染玩法说明
            var _data = SSC_TEMPLATE[mainNavType]({
                type: subNavType
            });
            $('#J_bettingRule').html(_data.rule);
        },
        renderSubMenu: function(mainNavType) {
            // 渲染次级菜单
            var _html = SSC_TEMPLATE[mainNavType]();
            $('#J_subMenuList').html(_html.dom);
            $('#J_bettingRule').html(_html.rule);

            Betting.renderSelectArea();
        },
        quicklySelect: function(elm, need, not) {
            var list = $(elm).parent().prev().find('.J_numWrp');
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
            
            Betting.getBettingQuantity();   //计算注数
        },



        createBitScheme: function(a, b) {
            var c = [];
            if (1 * a == 2)
                for (var d = 0; d < b.length; d++)
                    for (var e = d + 1; e < b.length; e++) {
                        var f = [];
                        f.push(b[d]), f.push(b[e]), c.push(f)
                    }
            if (1 * a == 3)
                for (var d = 0; d < b.length; d++)
                    for (var e = d + 1; e < b.length; e++)
                        for (var g = e + 1; g < b.length; g++) {
                            var f = [];
                            f.push(b[d]), f.push(b[e]), f.push(b[g]), c.push(f)
                        }
            if (1 * a == 4)
                for (var d = 0; d < b.length; d++)
                    for (var e = d + 1; e < b.length; e++)
                        for (var g = e + 1; g < b.length; g++)
                            for (var h = g + 1; h < b.length; h++) {
                                var f = [];
                                f.push(b[d]), f.push(b[e]), f.push(b[g]), f.push(b[h]), c.push(f)
                            }
            return c
        },





        

        touzhu: function() {
            var amount, bet = Betting.getBet();
            if (bet.sum < 1) {
                return;
            }
            $('#J_selectionBallStakes').html(bet.sum);
            amount = Betting.getBetAmount(bet.sum);
            $('#J_selectionBallAmount').html(amount.toFixed(4));
            if (bet.sum >= 1) {
                $('#J_addBallToCart,#J_shortcutPlaceOrder').addClass('disabled');
            } else {
                $('#J_addBallToCart,#J_shortcutPlaceOrder').removeClass('disabled');
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
        getBetAmount: function(sum) {
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