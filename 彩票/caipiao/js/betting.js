$(function() {
    var Betting = {
        singleStakesPrice: 2,   //默认一注的单价
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
                Betting.renderMaxBonus();
                Betting.renderSelectArea();
            });

            $('#J_bettRule').hover(function(){
                $('#J_bettingRule').show();
            }, function(){
                $('#J_bettingRule').hide();
            });
        },
        renderSelectArea: function() {
            var _mainNav = $('.J_withChild.active').data('info').split('#')[1];
            var _subNav = $('.J_subMenu.active').data('info').split('#')[1];
            var _data = SSC_TEMPLATE[_mainNav]({
                type: _subNav
            });
            var options = _data.opt;
            var _str = '';

            // 复选框
            if (options.haveCheckbox) {
                // options.defaultCheck //默认选中个数
                _str += '<div class="clearfix bet-checkbox">';
                _str += '<div class="fl">';
                _str += '<i class="J_CheckBox" data-id="1">万位</i><i class="J_CheckBox" data-id="2">千位</i><i class="J_CheckBox" data-id="3">百位</i><i class="J_CheckBox" data-id="4">十位</i><i class="J_CheckBox" data-id="5">个位</i>';
                _str += '</div><p class="fl">提示：至少选<span id="J_minChoseNum">'+ options.defaultCheck +'</span>个位置,您已选了<span id="J_nowChoseNum">'+ options.defaultCheck +'</span>个位置，系统将自动生成<span id="J_planNum">1</span>个方案。</p>';
                _str += '</div>';
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
                        _str += _getNumList(options.numList, options.multipleChoice, v.split('#')[0], options.maxSelect, options.minSelect);
                    }
                    if (options.quickFast) {
                        _str += '<ul class="row-text fr">';
                        if (!options.noAllFastBtn) {
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

                function _getNumList(numList, multipleChoice, rowName, maxSelect, minSelect) {
                    var _numlist = '';
                    if (numList.length > 12) {
                        var _ulDom = '';
                        for (var i = 0, _le = numList.length; i < _le; i += 12) {
                            _ulDom = '<ul data-start="'+ i +'" data-min="' + (minSelect ? minSelect : 1) + '" data-max="' + (maxSelect ? maxSelect : 12) + '" data-row="' + rowName + '" class="'+ (i ? 'row-many' : '') +' row-num fl J_ballList ' + ((multipleChoice == undefined || multipleChoice) ? 'J_multipleChoice' : '') + '">';
                            var _lenxx = numList.slice(i, i + 12).length - 1;
                            $.each(numList.slice(i, i + 12), function(a, b) {
                                if (a == _lenxx) {
                                    _ulDom += '<li class="J_numWrp last">' + b + '</li>';
                                } else {
                                    _ulDom += '<li class="J_numWrp">' + b + '</li>';
                                }
                            });
                            _ulDom += '</ul>';
                            _numlist += _ulDom;
                        }
                    } else {
                        _numlist = '<ul data-min="' + (minSelect ? minSelect : 1) + '" data-max="' + (maxSelect ? maxSelect : 10) + '" data-row="' + rowName + '" class="row-num fl J_ballList ' + ((multipleChoice == undefined || multipleChoice) ? 'J_multipleChoice' : '') + '">';
                        var _len = numList.length - 1;
                        $.each(numList, function(a, b) {
                            if (a == _len) {
                                _numlist += '<li class="J_numWrp last">' + b + '</li>';
                            } else {
                                _numlist += '<li class="J_numWrp">' + b + '</li>';
                            }
                        });
                        _numlist += '</ul>';
                    }
                    return _numlist;
                }
            }

            // 文本域
            if (options.haveTextarea) {
                _str += '<textarea cols="40" rows="6" id="ballInputArea" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" placeholder="' + options.placeholder + '"></textarea>';
            }

            $('#J_selectArea').html(_str);

            if(options.haveCheckbox && options.defaultCheck > 0) {
                $('.J_CheckBox').slice((5 - options.defaultCheck)).addClass('active');
            }

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

            Betting.resetBettingBox();
        },
        resetBettingBox: function() {
            // 重置最高额度
            var _mainNav = $('.J_withChild.active').data('info').split('#')[1];
            var _subNav = $('.J_subMenu.active').data('info').split('#')[1];
            var _data = SSC_TEMPLATE[_mainNav]({
                type: _subNav
            });
            $('#J_maxBonus').html(_data.maxBonus);
            
            // 重置选号区域底部
            $('#J_beishu').val(1);
            $('#J_selectionBallStakes').text(0);
            $('#J_selectionBallAmount').text('0.0000');
            $('#J_addBallToCart,#J_shortcutPlaceOrder').addClass('disabled');
            $('#J_unit').next('.nice-select').find('.current').html('元');
            $('#J_unit').next('.nice-select').find('[data-value="1#1#yuan"]').addClass('selected').siblings('li').removeClass('selected');
            $('#J_unit').data({
                txt: '1#1#yuan',
                val: '元'
            });
        },
        renderCheckbox: function() {
            // 渲染复选框区域内容
            var _curLen = $('.J_CheckBox.active').length;
            $('#J_nowChoseNum').text(_curLen);
            var _nowChose = [];
            $('.J_CheckBox.active').each(function(){
                _nowChose.push($(this).data('id') + '');
            });
            var _planLen = Betting.createBitScheme(Number($('#J_minChoseNum').text()), _nowChose);
            $('#J_planNum').text(_planLen.length);
            
            if (_planLen.length) {
                Betting.getBettingQuantity();
                Betting.calculateAmount();
                if ($('#J_selectionBallStakes').text() != 0) {
                    $('#J_addBallToCart,#J_shortcutPlaceOrder').removeClass('disabled');
                }
            } else {
                $('#J_addBallToCart,#J_shortcutPlaceOrder').addClass('disabled');
                $('#J_selectionBallStakes').text(0);
                $('#J_selectionBallAmount').text('0.0000');
            }
        },
        bettingEvent: function() {
            // 任选投注位置选中
            $('#J_bettingBox').on('click', '.J_CheckBox', function(){
                var _this = $(this);
                if (_this.hasClass('active')) {
                    _this.removeClass('active');
                } else {
                    _this.addClass('active');
                }

                Betting.renderCheckbox();
            });

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
                var _max = _this.parent('ul').data('max');  // 最多可选数量
                // TODO: 最少选择数量暂时没用到
                var _min = _this.parent('ul').data('min');  // 最少可选数量
                var _len = _this.parent('ul').find('.J_numWrp.active').length;    //当前行已选数量

                // console.log(_len,_max);
                var _hasSelect = false;  //当前号码是否已经选中

                if (_this.hasClass('active')) {
                    _this.removeClass('active');
                } else {
                    if (_canmany) {
                        if (_len == _max) {
                            layer.alert('前玩法最多只能选择'+ _max +'个号球!', {
                                icon: 2
                            });
                            return;
                        } else {
                            _this.addClass('active');
                            _hasSelect = true;
                        }
                    } else {
                        _this.addClass('active').siblings('li').removeClass('active');
                        _hasSelect = true;
                    }
                }

                // 计算注数
                Betting.getBettingQuantity({
                    hasSelect : _hasSelect,
                    index : (_this.parent('ul').data('start') + _this.index()),
                    text : _this.text()
                });
                Betting.calculateAmount();
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
            $('#J_beishu').off().on('keyup blur keydown focus', function() {
                var _val = $(this).val();
                var _reg = /^[1-9]\d*$/;
                if (!_reg.test(_val)) {
                    layer.alert('您输入的投注倍数格式不正确,只能输入大于或等于1的数字。', {
                        icon: 2
                    });
                    $(this).val(1).blur();
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

                Betting.calculateAmount();
                Betting.renderMaxBonus();
            });

            // 添加选号
            $('#J_addBallToCart').on('click', function(){
                if ($(this).hasClass('disabled')) {
                    return;
                }
                Betting.addBallToCart();
            });

            // 
            $('#J_shortcutPlaceOrder').on('click', function(){
                if ($(this).hasClass('disabled')) {
                    return;
                }
                Betting.shortcutPlaceOrder();
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
        addBallToCart: function() {
            console.log('添加选号');
        },
        shortcutPlaceOrder: function() {
            console.log('一键投注');
        },
        getBettingQuantity: function(options) {
            // 计算选择的注数
            // options 是针对和值设置的配置：如：前三和值类型
            options = options || {};
            // console.log(options.index);
            if (options.index != 0) {
                options.index = options.index || -1;
            }
            options.text = options.text || '';
            options.hasSelect = options.hasSelect || false;

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
            
            _formulaList.push(_currentSelect);
            var _selectNum = _currentRule.opt.formula(_formulaList, options);   //通过相应公式计算注数

            // 已选注数大于0时即可添加选号或一键投注
            if (_selectNum) {
                // 验证是否有复选框区域且是有方案
                if ($('#J_planNum').length && $('#J_planNum').text() == 0) {
                    return;
                }
                $('#J_addBallToCart,#J_shortcutPlaceOrder').removeClass('disabled');
            } else {
                $('#J_addBallToCart,#J_shortcutPlaceOrder').addClass('disabled');
            }

            $('#J_selectionBallStakes').text(_selectNum);
        },
        renderMaxBonus: function(mainNavType, subNavType) {
            // 渲染最高奖金
            var _mainNav = $('.J_withChild.active').data('info').split('#')[1];
            var _subNav = $('.J_subMenu.active').data('info').split('#')[1];
            var _data = SSC_TEMPLATE[_mainNav]({
                type: _subNav
            });
            var _unit = $('#J_unit').data('txt').split('#')[1];
            $('#J_maxBonus').html(Betting.formatNumber(_data.maxBonus * 10000 * _unit / 10000, 4));
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
            Betting.calculateAmount();
        },
        createBitScheme: function(a, b) {
            // 计算选择方案数
            // a: 最小选中数
            // b: 已选id组成的数组
            var c = [];
            if (1 * a == 2){
                for (var d = 0; d < b.length; d++){
                    for (var e = d + 1; e < b.length; e++) {
                        var f = [];
                        f.push(b[d]), f.push(b[e]), c.push(f)
                    }
                }
            }
            if (1 * a == 3){
                for (var d = 0; d < b.length; d++){
                    for (var e = d + 1; e < b.length; e++){
                        for (var g = e + 1; g < b.length; g++) {
                            var f = [];
                            f.push(b[d]), f.push(b[e]), f.push(b[g]), c.push(f)
                        }
                    }
                }
            }
            if (1 * a == 4){
                for (var d = 0; d < b.length; d++){
                    for (var e = d + 1; e < b.length; e++){
                        for (var g = e + 1; g < b.length; g++){
                            for (var h = g + 1; h < b.length; h++) {
                                var f = [];
                                f.push(b[d]), f.push(b[e]), f.push(b[g]), f.push(b[h]), c.push(f)
                            }
                        }
                    }
                }
            }
            return c
        },
        calculateAmount: function() {
            // 根据选择的注数计算金额
            var _type = $('.J_subMenu.active').data('info').split('#')[1];
            var _amount = 0;

            _amount = Betting.singleStakesPrice * Number($('#J_beishu').val()) * Number($('#J_selectionBallStakes').text()) * Number($('#J_unit').data('txt').split('#')[1]);

            if (0 == _type.indexOf("Any4Com") || 0 == _type.indexOf("Any3Com") || 0 == _type.indexOf("Any3Sum") || 0 == _type.indexOf("Any2Com") || 0 == _type.indexOf("Any2Sum")) {
                _amount = _amount * $('#J_planNum').text();
            }

            $('#J_selectionBallAmount').html(Betting.formatNumber(_amount, 4));
        },
        formatNumber: function(a, b, c) {
            // 格式化金额
            c || (a = Math.round(1e4 * a) / 1e4);
            var d, e, f, g = a + "",
                h = b;
            if (d = g.indexOf("."), e = g.length, 0 == h) - 1 != d && (g = g.substring(0, d));
            else if (-1 == d)
                for (g += ".", f = 1; f <= h; f++) g += "0";
            else
                for (g = g.substring(0, d + h + 1), f = e; f <= d + h; f++) g += "0";
            return g
        }
    }


    Betting.init();
});