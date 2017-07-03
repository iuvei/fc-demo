$(function() {
    var Betting = {
        textArea: [],   //用来存放textarea已选的号码
        selectedData: [], //选择的数据
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
                _str += '<div class="clearfix rel">';
                if (GLOBAL.lessThenIE9()) {
                    _str += '<div id="J_forIe89" class="forIe89">'+ options.placeholder +'</div>';
                }
                _str += '<textarea cols="40" rows="6" id="J_ballInputArea" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" placeholder="' + options.placeholder + '"></textarea><div class="fl rel bet-btns bet-upload"><div><input id="J_uploadFile" type="file" accept="text/plain" name="file"></div><span class="bet-btn rel" id="">选择文件</span><span class="bet-btn" id="J_clearTextarea">清空选号</span></div></div>';
            }

            $('#J_selectArea').html(_str);

            if(options.haveCheckbox && options.defaultCheck > 0) {
                $('.J_CheckBox').slice((5 - options.defaultCheck)).addClass('active');
            }

            if (options.haveTextarea) {
                Betting.bindUploadEvent();
                // TODO: IE89的 placeholder
                // $('textarea').placeholder();
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
                // Betting.calculateAmount();
                if ($('#J_selectionBallStakes').text() != 0) {
                    $('#J_addBallToCart,#J_shortcutPlaceOrder').removeClass('disabled');
                }
            } else {
                $('#J_addBallToCart,#J_shortcutPlaceOrder').addClass('disabled');
                $('#J_selectionBallStakes').text(0);
                $('#J_selectionBallAmount').text('0.0000');
            }

            if ($('#J_ballInputArea').length) {
                Betting.textAreaBallChange();
            }

            // Betting.getBettingQuantity();
            // Betting.calculateAmount();
        },
        bettingEvent: function() {
            // 清空选号
            $('#J_bettingBox').on('click', '#J_clearTextarea', function(){
                $('#J_ballInputArea').val('');
            });

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

            // 一键清空
            $('#J_clearCart').click(function(){
                $('#J_betList').html('');
            });

            // 删除已选号码
            $('#J_betList').on('click', '.J_delNums', function() {
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
                // Betting.calculateAmount();
            });

            // 减少倍数
            $('#J_beishuCut').click(function() {
                var _val = $('#J_beishu').val();
                if (_val <= 1) {
                    return;
                } else {
                    $('#J_beishu').val(_val - 1);
                }
                Betting.calculateAmount();
            });

            // 增加倍数
            $('#J_beishuAdd').click(function() {
                // TODO:应该还有一个最大倍数的概念
                var _val = $('#J_beishu').val();
                $('#J_beishu').val(Number(_val) + 1);
                Betting.calculateAmount();
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

            // 一键投注
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
            var _data = Betting.getSelectData();
            // console.log(_data);
            // 渲染购物车
            Betting.renderCart(_data);
        },
        renderCart: function(data) {
            // 渲染购物车
            console.log(data);
            var _str = '';
            var _len = data.length;
            if (data && _len) {
                $.each(data, function(i, n) {
                    _str += '<li class="clearfix" data-type="'+ n.ajaxType +'" data-hex="'+ (n.hex ? n.hex : '') +'" data-need="'+ (n.need == 'sum' ? 'n' : n.need) +'">';
                    _str += '    <div class="t1" data-type="'+ n.type +'">'+ n.typeName +'</div>';
                    _str += '    <div class="t2"><div>';
                    _str += _changeNum(n);
                    _str += '<span class="cm_number hide">';
                    _str += _changeNum(n);
                    _str += '</span>';
                    _str += '</div></div>';
                    _str += '    <div class="t3" data-unit="'+ n.unit +'">'+ n.unitName +'</div>';
                    _str += '    <div class="t4">'+ n.num +'</div>';
                    _str += '    <div class="t5">'+ n.multiple +'</div>';
                    _str += '    <div class="t6">'+ n.sum +'</div>';
                    _str += '    <div class="t7"><em class="icon icon-del J_delNums"></em></div>';
                    _str += '</li>';
                });

                function _changeNum(k) {
                    var _html = '';
                    if (k.w) {
                        _html += k.w + (k.q ? ' | ' : '');
                    }
                    if (k.q) {
                        _html += k.q + (k.b ? ' | ' : '');
                    }
                    if (k.b) {
                        _html += k.b + (k.s ? ' | ' : '');
                    }
                    if (k.s) {
                        _html += k.s + (k.g ? ' | ' : '');
                    }
                    if (k.g) {
                        _html += k.g;
                    }
                    if (k.n) {
                        _html += k.n ;
                    }
                    if (k.n1) {
                        _html += k.n1 + (k.n2 ? ' | ' : '');
                    }
                    if (k.n2) {
                        _html += k.n2;
                    }
                    
                    return _html;
                }
            }

            $('#J_betList').prepend(_str);

            Betting.resetSelectArea();
        },
        resetSelectArea: function() {
            // 重置选区
            $('.J_numWrp.active').removeClass('active');
            Betting.resetBettingBox();
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

            Betting.calculateAmount();

            // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            // 当前选择的数据
            // console.log(_currentSelect);
            // Betting.selectedData
            // if (_selectNum) {
            //     Betting.getSelectData(_currentSelect, _type);
            // }

            // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        },
        getSelectData: function(currentSelect, type) {
            // type : ball
            // 获取选择的数据
            var _mainNav = $('.J_withChild.active').data('info').split('#')[1];
            var _subNav = $('.J_subMenu.active').data('info').split('#')[1];

            var _data = [];
            var _rule = SSC_TEMPLATE[_mainNav]({
                type : _subNav
            });
            var _opt = _rule.opt;

            if (_opt.type == 'ball') {
                var _d = {};
                var _n = '';
                var _need = '';
                $.each(_opt.numNameList, function(i, n) {
                    if (n.split('#')[0] == 'FIRST') { //万
                        _d.w = $('[data-row="FIRST"] .J_numWrp.active').text();
                        _need += 'w#';
                    } else if(n.split('#')[0] == 'SECOND') {  //千
                        _d.q = $('[data-row="SECOND"] .J_numWrp.active').text();
                        _need += 'q#';
                    } else if(n.split('#')[0] == 'THIRD') {   //百
                        _d.b = $('[data-row="THIRD"] .J_numWrp.active').text();
                        _need += 'b#';
                    } else if(n.split('#')[0] == 'FOURTH') {  //十
                        _d.s = $('[data-row="FOURTH"] .J_numWrp.active').text();
                        _need += 's#';
                    } else if(n.split('#')[0] == 'FIFTH') {   //个
                        _d.g = $('[data-row="FIFTH"] .J_numWrp.active').text();
                        _need += 'g';
                    } else if(n.split('#')[0] == 'NONE') {   //组选就一个值
                        _d.n = $('[data-row="NONE"] .J_numWrp.active').text();
                        _need += 'n';
                    } else if(n.split('#')[0] == 'NONE1') {   //组选就一个值
                        _d.n1 = $('[data-row="NONE1"] .J_numWrp.active').text();
                        _need += 'n1#';
                    } else if(n.split('#')[0] == 'NONE2') {   //组选就一个值
                        _d.n2 = $('[data-row="NONE2"] .J_numWrp.active').text();
                        _need += 'n2';
                    } else if(n.split('#')[0] == 'SUM') {   //和值
                        var _sum = '';
                        $.each($('[data-row="SUM"] .J_numWrp.active'), function(i){
                            if (i == $('[data-row="SUM"] .J_numWrp.active').length - 1) {
                                _sum += $(this).text();
                            } else {
                                _sum += $(this).text() +'|';
                            }
                        });
                        _d.n = _sum;
                        _need += 'sum';
                    }
                });
                _d.type = _subNav;
                _d.typeName = $('.J_subMenu.active').text();    //玩法类型
                _d.multiple = $('#J_beishu').val(); //投注倍数
                _d.unit = $('#J_unit').data('txt').split('#')[2];   //投注金额单位：yuan,jiao,fen,li
                _d.unitName = $('#J_unit').data('val'); //投注金额单位 元角分厘
                _d.sum = $('#J_selectionBallAmount').text();    //投注金额
                _d.num = $('#J_selectionBallStakes').text();    //投注注数
                _d.len = _opt.numNameList.length;
                _d.need = _need;  //需要的数据类型
                _d.ajaxType = _opt.ajaxType;

                if (_opt.haveCheckbox) {
                    var _hex = '';
                    $('.J_CheckBox.active').each(function(){
                        var _id = $(this).data('id');
                        if (_id == 1) {
                            _hex += 'w';
                        } else if(_id == 2){
                            _hex += 'q';
                        } else if(_id == 3){
                            _hex += 'b';
                        } else if(_id == 4){
                            _hex += 's';
                        } else if(_id == 5){
                            _hex += 'g';
                        }
                    });
                    _d.hex = _hex;
                }

                _data.push(_d);
            } else if(_rule.opt.type == 'text'){
                // TODO : 文本域上传
                
                // n : '',     //无定位
                // n1 : '',     //无定位组合
                // n2 : '',     //无定位组合
                // hex : ''    //指定万(w)，千(q)，百(b)，十(s)，个(g)
            }



            Betting.selectedData = _data;
            // console.log(_data);
            return _data;
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
            // Betting.calculateAmount();
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
        calculateAmount: function(num, plan) {
            if (num != undefined) {
                $('#J_selectionBallStakes').text(num);

                if(num) {
                    if (plan != undefined && plan == 0) {
                        $('#J_addBallToCart,#J_shortcutPlaceOrder').addClass('disabled');
                    } else {
                        $('#J_addBallToCart,#J_shortcutPlaceOrder').removeClass('disabled');
                    }
                } else {
                    $('#J_addBallToCart,#J_shortcutPlaceOrder').addClass('disabled');
                }
            }
            // 根据选择的注数计算金额
            var _type = $('.J_subMenu.active').data('info').split('#')[1];
            var _amount = 0;

            if (0 == _type.indexOf("Any4Com") || 0 == _type.indexOf("Any3Com") || 0 == _type.indexOf("Any3Sum") || 0 == _type.indexOf("Any2Com") || 0 == _type.indexOf("Any2Sum")) {
                $('#J_selectionBallStakes').html($('#J_selectionBallStakes').text() * $('#J_planNum').text());
            }

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
        },
        textAreaBallChange: function(){
            var _subNav = $('.J_subMenu.active').data('info').split('#')[1];
            var a = true;
            var b = SSC_TEMPLATE.allManualEntryEvents(_subNav);
            if (_subNav == 'Last3Com' || _subNav == 'First3Com' || _subNav == 'Middle3Com' || _subNav == 'Last3Com_LF' || _subNav == 'P3Com_LF' || _subNav == 'Any3Com_SSC') {
                a = false;
            }

            if ("Any2_Single" == _subNav || "Any3_Single" == _subNav || "Any4_Single" == _subNav || "Any3Com_SSC" == _subNav || "Any2Com_SSC_Single" == _subNav) {
                var d = $('#J_nowChoseNum').text();

                if (b.len > 1 * d){
                        layer.alert('请至少选择'+ b.len +'个位置<br/>您当前选择了' + d + '个位置', {
                        icon: 2
                    });
                    $('#J_ballInputArea').blur();
                    return;
                }

                Betting.calculateSSCAnyManualEntryStakes(b)
            } else {
                Betting.calculateSSCManualEntryStakes(a, b)
            }
        },
        bindUploadEvent: function() {
            var _subNav = $('.J_subMenu.active').data('info').split('#')[1];
            // var a = true;
            // var b = SSC_TEMPLATE.allManualEntryEvents(_subNav);
            // if (_subNav == 'Last3Com' || _subNav == 'First3Com' || _subNav == 'Middle3Com' || _subNav == 'Last3Com_LF' || _subNav == 'P3Com_LF' || _subNav == 'Any3Com_SSC') {
            //     a = false;
            // }

            $('#J_forIe89').click(function(){
                $(this).hide();
                $('#J_ballInputArea').focus();
            });

            $('#J_ballInputArea').off('focus').on('focus', function(){
                var _val = '';
                if (GLOBAL.lessThenIE8()) {
                    _val = $("#J_ballInputArea").html();
                } else {
                    _val = $("#J_ballInputArea").val();
                }
                if (/[A-Za-z\u4E00-\u9FFF]/.test(_val)) {
                    $('#J_forIe89').show();
                    $(this).val('');
                    Betting.calculateAmount();
                    Betting.textArea = [];
                } else {
                    $('#J_forIe89').hide();
                }
            });

            $('#J_ballInputArea').off('blur').on('blur', function(){
                var _val = '';
                if (GLOBAL.lessThenIE8()) {
                    _val = $("#J_ballInputArea").html();
                } else {
                    _val = $("#J_ballInputArea").val();
                }
                if (_val == '') {
                    $('#J_forIe89').show();
                    Betting.calculateAmount();
                    Betting.textArea = [];
                }
            });

            $('#J_ballInputArea').off('input propertychange').on('input propertychange', function(){
                var _val = '';
                if (GLOBAL.lessThenIE8()) {
                    _val = $("#J_ballInputArea").html();
                } else {
                    _val = $("#J_ballInputArea").val();
                }
                
                if (!_val) {
                    $('#J_forIe89').show();
                    Betting.textAreaBallChange();
                } else {
                    $('#J_forIe89').hide();
                }

                if (_val.replace(/[^\d]+/g, "").length <= 0) {
                    $('#J_forIe89').show();
                    Betting.calculateAmount();
                    Betting.textArea = [];
                    return;
                }
                
                Betting.textAreaBallChange();
            });

            $('#J_uploadFile').off('change').on('change', function(e) {
                $("#J_uploadFile").replaceWith($("#J_uploadFile").clone(true));

                var objFile = $(this);

                if (objFile.context.value.indexOf('.txt') == -1){
                    layer.alert('您选择的文件类型不符合要求,<br/>目前只支持txt文本格式的文件!', {
                        icon: 2
                    });
                    return false;
                }

                var _size = 0;
                if(objFile.context.size) {
                    _size = objFile.context.size;
                } else {
                    _size = objFile.context.files[0].size
                }

                if (_size > 1048576) {
                    layer.alert('您选择的文件大小超过1M,<br/>目前只支持1M大小的文件!', {
                        icon: 2
                    });
                    return false;
                }

                if (objFile.value == "") {
                    layer.alert('号码不能为空', {
                        icon: 2
                    });
                }
                var files = objFile.prop('files') || objFile.length; //获取到文件列表
                if (files.length == 0) {
                    // alert('请选择文件');
                } else {
                    // $('#J_ballInputArea').val('');
                    var fileString = '';
                    if (window.FileReader) {
                        var reader = new FileReader(); //新建一个FileReader
                        reader.readAsText(files[0], "UTF-8"); //读取文件 
                        reader.onload = function(evt) { //读取完文件之后会回来这里
                            fileString = evt.target.result; // 读取文件内容
                            $('#J_ballInputArea').val(fileString);
                            Betting.textAreaBallChange();
                            $('#J_forIe89').hide();
                        }
                    } else {
                        var fso, ts ; 
                        var ForReading = 1; 
                        fso = new ActiveXObject("Scripting.FileSystemObject"); 
                        ts = fso.OpenTextFile(e.currentTarget.value, ForReading); 
                        fileString = ts.ReadAll(); 
                        $('#J_ballInputArea').val(fileString);
                        Betting.textAreaBallChange();
                        $('#J_forIe89').hide();
                    }
                }
            });
        },
        manualEntryDisassemble: function(a) {
            if (/[A-Za-z\u4E00-\u9FFF]/.test(a)) {
                layer.alert('您的投注内容不符合要求,<br/>里面还有字母或者中文!', {
                    icon: 2
                });
                $('#J_ballInputArea').blur();
                return  0;
            }
            var b = a.replace(/[^\d\r\n\f\s,;#]+/g, "");
            return b = b.replace(/[^\d#]+/g, "@"), ("@" == b.substring(b.length - 1) ? b.substring(0, b.length - 1) : b).split("@")
        },
        entryRegular: function(a, b) {
            if (a) {
                var c = /^[0-9]*$/;
                return c.test(b)
            }
            var c = /^(\d)\1\1$/;
            return !c.test(b)
        },
        assemblyAnyBetBall: function(a, b) {
            for (var c = ["#", "#", "#", "#", "#"], d = 0; d < a.length; d++) c[b[d] - 1] = a.charAt(d);
            return c.join("_")
        },
        calculateSSCAnyManualEntryStakes: function(a) {
            // 时时彩任选的时候文本域事件
            Betting.textArea = [];
            var _subNav = $('.J_subMenu.active').data('info').split('#')[1];
            var _nowChose = [];
            $('.J_CheckBox.active').each(function(){
                _nowChose.push($(this).data('id') + '');
            });
            var _planLen = Betting.createBitScheme(Number($('#J_minChoseNum').text()), _nowChose);
            var _val = '';
            if (GLOBAL.lessThenIE8()) {
                _val = $("#J_ballInputArea").html();
            } else {
                _val = $("#J_ballInputArea").val();
            };
            var c = Betting.manualEntryDisassemble(_val);
            if (0 != c.length) {
                var d = 0,
                    e = [];
                if ("Any3Com_SSC" == _subNav)
                    for (var f = 0; f < c.length; f++) Betting.entryRegular(!1, c[f] + "") && c[f].length == 1 * a.len && (e.push(c[f].replace(/([0-9])(?=([0-9]{1})+([^0-9]|$))/g, "$1_")), d += 1 * a.stakes);
                else if ("Any2Com_SSC_Single" == _subNav)
                    for (var f = 0; f < c.length; f++) Betting.entryRegular(!0, c[f] + "") && !/^(\d)\1$/.test(c[f]) && c[f].length == 1 * a.len && (e.push(c[f]), d += 1 * a.stakes);
                else
                    for (var f = 0; f < c.length; f++)
                        if (c[f].length == 1 * a.len)
                            for (var g = 0; g < _planLen.length; g++) e.push(Betting.assemblyAnyBetBall(c[f], _planLen[g])), d += 1 * a.stakes; if (e.length > 0) {
                    var h = "Any3Com_SSC" == _subNav || "Any2Com_SSC_Single" == _subNav ? _nowChose + "@" + e.join(",") : e.join(","),
                        i = "Any3Com_SSC" == _subNav || "Any2Com_SSC_Single" == _subNav ? d * _planLen.length : d,
                        j = {
                            ball: h,
                            stakes: i,
                            type: 2,
                            digit: a.digit
                        };
                    
                    // console.log(e);
                    console.log(j);
                    Betting.textArea.push(j)
                }

                Betting.calculateAmount(d, $('#J_planNum').text());
            }
        },
        calculateSSCManualEntryStakes: function(a, b) {
            // console.log(a, b);
            // 时时彩的普通文本域事件
            // SSC_TEMPLATE.sameComparer()
            Betting.textArea = [];
            var _val = '';
            if (GLOBAL.lessThenIE8()) {
                _val = $("#J_ballInputArea").html();
            } else {
                _val = $("#J_ballInputArea").val();
            }
            var d = Betting.manualEntryDisassemble(_val);
            if (0 != d.length) {
                for (var e = 0, f = [], g = 0; g < d.length; g++) Betting.entryRegular(a, d[g] + "") && d[g].length == 1 * b.len && (f.push(d[g].replace(/([0-9#])(?=([0-9#]{1})+([^0-9#]|$))/g, "$1_")), e += 1 * b.stakes);
                if (f.length > 0) {
                    var h = {
                        ball: f.join(","),
                        stakes: e,
                        type: 2,
                        digit: b.digit
                    };
                    Betting.textArea.push(h)
                }
                Betting.calculateAmount(e);
            }
        }
    }

    Betting.init();
});