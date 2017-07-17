$(function() {
    var Betting = {
        textArea: [],   //用来存放textarea已选的号码
        singleStakesPrice: 2,   //默认一注的单价
        playCode: 'SSC',    //彩种
        init: function() {
            // type 彩种类型
            // 1: 时时彩
            // 2: 十一选5
            // 3: 3D
            // 4: PK10
            var _type = GLOBAL.getRequestURL().type;

            if(_type == 1){
                TEMPLATE.renderSSC.init();
                // Betting.playCode = '';
            } else if(_type == 2) {
                TEMPLATE.render11X5.init();
                Betting.playCode = '11X5';
            } else if(_type == 3) {
                TEMPLATE.renderK3.init();
                Betting.playCode = 'K3';
            } else if(_type == 4) {
                TEMPLATE.renderPK10.init();
                Betting.playCode = 'PK10';
            }

            $('select').niceSelect();
            Betting.bindEvent();
            Betting.bettingEvent();

            // if(_type != 3){
                Betting.renderSelectArea();
            // } else {
            //     Betting.renderK3SelectArea();
            // }
        },
        bindEvent: function() {            
            // 历史投注换页
            $('#J_betTabPagePrev').click(function(){
                var _index = $('#J_curPage').html();
                var _total = $('#J_totalPage').html();

                if(_index == 1){
                    return;
                }
                Betting.getBetHistory({
                    page: _index--
                });
            });

            $('#J_betTabPageNext').click(function(){
                var _index = $('#J_curPage').html();
                var _total = $('#J_totalPage').html();
                
                if(_index == _total){
                    return;
                }
                Betting.getBetHistory({
                    page: _index++
                });
            });
            
            //切换当前投注、投注历史
            $('.J_betTabTt').click(function(){
                var _this = $(this);
                var _index = _this.index();
                $('.J_betTabTt').removeClass('active');
                _this.addClass('active');
                $('.J_betTabBox').addClass('hide');
                $('.J_betTabBox').eq(_index).removeClass('hide');
                if(_index){
                    Betting.getBetHistory();
                }
            });
            
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
        // renderK3SelectArea: function() {
        //     var _mainNav = $('.J_withChild.active').data('info').split('#')[1];
            
        //     console.log(_mainNav);
        // },
        renderSelectArea: function() {
            var _mainNav = $('.J_withChild.active').data('info').split('#')[1];
            var _subNav = ($('.J_subMenu.active').length ? $('.J_subMenu.active').data('info').split('#')[1] : _mainNav);
            var _data = TEMPLATE[_mainNav]({
                type: _subNav
            });
            var options = _data.opt;
            var _str = '';

            console.log(_subNav);

            if (_subNav == 'OECounts_11X5') {
                // 定单双
                _str += '<ul class="clearfix single-double J_ballList J_multipleChoice" data-row="NONE" data-max="6" data-min="1">';
                _str += '<li class="J_numWrp">0单5双</li>';
                _str += '<li class="J_numWrp">1单4双</li>';
                _str += '<li class="J_numWrp">2单3双</li>';
                _str += '<li class="J_numWrp">3单2双</li>';
                _str += '<li class="J_numWrp">4单1双</li>';
                _str += '<li class="J_numWrp last">5单0双</li>';
                _str += '</ul>';
            } else if (_subNav.indexOf('Dragon_Tiger') > -1) {
                _str += '<div class="clearfix">';
                _str += '<div class="icon fl row-tt" style="font-size: 15px;margin-top: 65px;">龙VS虎</div>';
                _str += '<ul class="dragon-tiger J_ballList" data-row="NONE" data-max="1" data-min="1">';
                _str += '<li class="J_numWrp no1" data-v="龙"></li>';
                _str += '<li class="J_numWrp no2" data-v="虎"></li>';
                _str += '</ul>';
                _str += '</div>';
            } else if (_subNav != 'K3_SUM' && _subNav.indexOf('K3') > -1) {
                // 快三除和值外的dom
                _str += _data.dice;
            } else {
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
                        _str += '<div class="icon fl row-tt" '+ (_subNav == 'First3Sum_PK10' ? 'style="font-size:14px;"': '') +'>' + _tt + '</div>';
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
                            _numlist = '<ul data-start="0" data-min="' + (minSelect ? minSelect : 1) + '" data-max="' + (maxSelect ? maxSelect : 10) + '" data-row="' + rowName + '" class="row-num fl J_ballList ' + ((multipleChoice == undefined || multipleChoice) ? 'J_multipleChoice' : '') + '">';
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
        resetBettingBox: function(templateData) {
            // 重置最高额度
            var _mainNav = $('.J_withChild.active').data('info').split('#')[1];
            var _subNav = ($('.J_subMenu.active').length ? $('.J_subMenu.active').data('info').split('#')[1] : _mainNav);
            var _data = templateData ? templateData : TEMPLATE[_mainNav]({
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
            // var _mainNav = $('.J_withChild.active').data('info').split('#')[1];
            // var _subNav = ($('.J_subMenu.active').length ? $('.J_subMenu.active').data('info').split('#')[1] : _mainNav);
            // var _currentRule = TEMPLATE[_mainNav]({
            //     type : _subNav
            // });
            
            // 我要追号
            $('#J_chaseNumber').click(function(){
                if($(this).hasClass('disabled')){
                    return;
                }
                // TODO: 追号
            });

            // 确认投注
            $('#J_confirmBets').click(function(){
                if($(this).hasClass('disabled')){
                    return;
                }
                
                var _data = Betting.getConfirmData();
                Betting.confirmCart(_data, 'confirm');
            });

            // 清空选号
            $('#J_bettingBox').on('click', '#J_clearTextarea', function(){
                $('#J_ballInputArea').val('');
                Betting.resetBettingBox();
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
                $('#J_confirmBets,#J_chaseNumber').addClass('disabled');
                Betting.renderTotal();
            });

            // 删除已选号码
            $('#J_betList').on('click', '.J_delNums', function() {
                $(this).parents('li').remove();
                if (!$('#J_betList li').length) {
                    $('#J_confirmBets,#J_chaseNumber').addClass('disabled');
                }
                Betting.renderTotal();
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

                var _hasSelect = false;  //当前号码是否已经选中

                if (_this.hasClass('active')) {
                    _this.removeClass('active');
                } else {
                    if (_canmany) {
                        if (_len == _max) {
                            layer.alert('前玩法最多只能选择'+ _max +'个号球!', {
                                skin: 'bett-alert-dialog',
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
                        skin: 'bett-alert-dialog',
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
                var _mainNav = $('.J_withChild.active').data('info').split('#')[1];
                var _subNav = ($('.J_subMenu.active').length ? $('.J_subMenu.active').data('info').split('#')[1] : _mainNav);
                if ($(this).hasClass('disabled')) {
                    return;
                }

                var _flag = true;
                // console.log(_subNav);
                // console.log(_subNav.indexOf("Any") != 0)

                if($('.J_ballList').length && !$('[data-row="SUM"]').length && (_subNav != 'First5BSOE_PK10' && _subNav != 'Last5BSOE_PK10' && _subNav != 'First5Fixed_PK10' && _subNav != 'Last5Fixed_PK10' && _subNav != 'FixedPlace_11X5' && _subNav.indexOf("Any") != 0)){
                    $.each($('.J_ballList'), function() {
                        var _len = $(this).find('.J_numWrp.active').length;
                        var _min = $(this).data('min');
                        if(_len < _min) {
                            GLOBAL.alert('当前玩法最多少选择'+ _min +'个号球!');
                            _flag = false;
                            return false;
                        }
                    });
                }
                if(!_flag){
                    return;
                }
                Betting.addBallToCart();
            });

            // 一键投注
            $('#J_shortcutPlaceOrder').on('click', function(){
                var _mainNav = $('.J_withChild.active').data('info').split('#')[1];
                var _subNav = ($('.J_subMenu.active').length ? $('.J_subMenu.active').data('info').split('#')[1] : _mainNav);
                if ($(this).hasClass('disabled')) {
                    return;
                }
                var _flag = true;
                // if($('.J_ballList').length && !$('[data-row="SUM"]').length){
                if($('.J_ballList').length && !$('[data-row="SUM"]').length && (_subNav != 'First5BSOE_PK10' && _subNav != 'Last5BSOE_PK10' && _subNav != 'First5Fixed_PK10' && _subNav != 'Last5Fixed_PK10' && _subNav != 'FixedPlace_11X5' && _subNav.indexOf("Any") != 0)){
                    $.each($('.J_ballList'), function() {
                        var _len = $(this).find('.J_numWrp.active').length;
                        var _min = $(this).data('min');
                        if(_len < _min) {
                            GLOBAL.alert('当前玩法最多少选择'+ _min +'个号球!');
                            _flag = false;
                            return false;
                        }
                    });
                }
                if(!_flag){
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
            
            // 机选
            $('.J_machineSelection').click(function() {
                var i = $(this).data('i');
                Betting.randomBalls(i);
            });

            // 快三选择色子
            $('#J_bettingBox').on('click', '.J_dice', function(){
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                } else {
                    $(this).addClass('active');
                }

                var _len = $('.J_dice.active').length;

                Betting.calculateAmount(_len);
            });

            $('#J_bettingBox').on('click', '.J_diceFast', function(){
                var _this = $(this);
                var _v = _this.data('v');

                if (_this.hasClass('active')) {
                    _this.removeClass('active');
                    $('.J_dice[data-v*="'+ _v +'"]').removeClass('active');
                } else {
                    _this.addClass('active');
                    $('.J_dice[data-v*="'+ _v +'"]').addClass('active');
                }

                var _len = $('.J_dice.active').length;

                Betting.calculateAmount(_len);
            });
        },
        confirmCart: function(_data, type) {
            // console.log(_data);
            // return;
            // type : confirm 确认投注    shortcut : 一键投注
            
            GLOBAL.getAjaxData({
                url: '/bet/buy',
                data: {
                    id : $('#orderId').val(),
                    items : _data
                }
            }, function(data) {
                // TODO:根据返回金额校验当前用户余额是否足够
                layer.alert('订单支付成功<br/>投注期号：' + $('#J_betTimer').html() + '期<br/>投注总额：' + data + '元', {
                    skin: 'bett-alert-dialog',
                    icon: 1
                });

                COMMON.renderUserInfo();

                if (type == 'confirm') {
                    $('#J_betList').html('');
                    $('#J_confirmBets,#J_chaseNumber').addClass('disabled');
                    Betting.renderTotal();
                } else if(type == 'shortcut'){
                    Betting.resetSelectArea();
                }
            });
        },
        randomBalls : function(times) {
            var _beishu = $('#J_beishu').val(); //倍数
            var _times = times; //机选数量
            var _formulaList = [];      //公式列表
            var _currentSelect = [];    //当前已选号码的集合
            var _mainNav = $('.J_withChild.active').data('info').split('#')[1];
            var _subNav = ($('.J_subMenu.active').length ? $('.J_subMenu.active').data('info').split('#')[1] : _mainNav);


            var k = {};
            var _formulaList = [];      //公式列表

            

            if($('.J_ballList').length){
                // $('.J_ballList').each(function(i){
                //     var _this = $(this);
                //     _formulaList[i] = _this.data('row');
                //     _currentSelect[_this.data('row')] = _this.find('.J_numWrp.active').text();
                // });
                
                // _formulaList.push(_currentSelect);
                

                $('.J_ballList').each(function(i){
                    var _this = $(this);
                    var _row = _this.data('row');
                    _formulaList[i] = _row;
                });

                for (var i = 0; i < _formulaList.length; i++) {
                    if("11X5" == Betting.playCode || "PK10" == Betting.playCode && -1 == _subNav.indexOf("BSOE_PK10")) {
                        k[_formulaList[i]] = [];
                        $.each($('[data-row="'+ _formulaList[i] +'"]').find('.J_numWrp.active'), function(x, y) {
                            k[_formulaList[i]].push($(this).text());
                        });
                        k[_formulaList[i]] = $('[data-row="'+ _formulaList[i] +'"]').find('.J_numWrp.active').text();
                    } else {
                        k[_formulaList[i]] = $('[data-row="'+ _formulaList[i] +'"]').find('.J_numWrp.active').text();
                    }
                }

                _formulaList.push(k);
            } else if($('.J_diceList').length){
                // console.log(Math.floor(Math.random()*6 + 1));
            } else if($('#J_ballInputArea').length) {
                _formulaList = TEMPLATE.allManualEntryEvents(_subNav).bits;
            }
            var a = _formulaList;   //公式列表

            // console.log(a);

            var _currentRule = TEMPLATE[_mainNav]({
                type : _subNav
            });
            var _minSelect =  _currentRule.opt.minSelect || 1;  //????这个是什么意思？？最小选择数量？

            var _amount = 0;    //一注的价格
            var _data = [];
            var _miBall = TEMPLATE.allManualEntryEvents(_subNav).miBall;
            // console.log(_subNav);
            if (_currentRule.opt.type == 'text') {
                // 默认设置为SSC
                for (var _ddddd = {}, e = Betting.playCode, f = 0; f < a.length; f++){
                    _ddddd[a[f]] = "11X5" == e || "PK10" == e ? [] : "";
                }
                a.push(_ddddd);

                // console.log(a.length);
                // console.log(_miBall);
                // var b = TEMPLATE[_mainNav]({
                //     type : _subNav
                // }).opt.minSelect;

                // console.log(b);

                if(Betting.playCode == '11X5'){
                    for (var h = a.length - 1 == 1 ? 1 * _miBall : a.length - 1, i = a.length - 1 == 1 ? "-" : "_", j = 0; j < 1 * _times; j++) {
                        for (var k = "", l = Betting.numberRandom(1, 11, h), m = 0; m < l.length; m++) k += i + Betting.addZero(l[m] + "", 2);
                            console.log(k);
                        var n = 1,
                            o = j == 1 * _times - 1;
                        _data.push(_getTextRoundData(k.substring(1), 1));
                    }
                } else if (Betting.playCode == 'PK10') {
                    for (var h = a.length - 1 == 1 ? 1 * _miBall : a.length - 1, i = a.length - 1 == 1 ? "-" : "_", j = 0; j < 1 * _times; j++) {
                        for (var k = "", l = Betting.numberRandom(1, 10, h), m = 0; m < l.length; m++) k += i + Betting.addZero(l[m] + "", 2);
                        var n = 1,
                            o = j == 1 * _times - 1;

                        console.log(k.substring(1), 1, f, c, n, o);
                        // lott.createBetCart(k.substring(1), 1, f, c, n, o)
                        _data.push(_getTextRoundData(k.substring(1), 1));
                    }
                } else {
                    if ("Any2Com_SSC_Single" != _subNav && a.length - 1 > 1 && 1 * _miBall == 0 && _subNav.indexOf("Any") > -1){
                        for (var j = 0; j < 1 * _times; j++) {
                            for (var p = Betting.numberRandom(0, 4, 1 * _subNav.charAt(3)), l = new Array(5), k = "", q = 0; q < p.length; q++) l[p[q]] = Betting.numberRandom(0, 9, 1)[0];
                            for (var r = 0; r < l.length; r++) null == l[r] ? k += "_#" : k += "_" + l[r];
                            var o = j == 1 * _times - 1;

                            _data.push(_getTextRoundData(k, 1));
                        }
                    }
                    if ("Any2Com_SSC_Single" == _subNav) {
                        for (var s = [], l = Betting.arrRandom(1, 98, 1 * _times, 2, !0), j = 0; j < 1 * _times; j++) {
                            var p = Betting.numberRandom(1, 5, 2);
                            p.sort(function(a, b) {
                                return a - b
                            }), s.push(p.join(""))
                        }
                        for (var q = 0; q < s.length; q++) {
                            var k = s[q] + "@" + l[q],
                                o = q == s.length - 1;

                            _data.push(_getTextRoundData(k, 1));
                        }
                    }
                    if ("Any2Com_SSC_Single" != _subNav && a.length - 1 == 1 && 1 * _miBall >= 1){
                        for (var j = 0; j < 1 * _times; j++) {
                            var k = "";
                            k = Betting.numberRandom(0, 9, 1 * _miBall).join("");
                            var n = 1;
                            _subNav.indexOf("3Com3") > -1 && (n = 2), _subNav.indexOf("3StraightCom") > -1 && (n = 6), _subNav.indexOf("3ComAnyCode1") > -1 && (n = 55);
                            var o = j == 1 * _times - 1;
                            console.log(k, 1, f, c, n, o);
                            // lott.createBetCart(k, 1, f, c, n, o)
                        }
                    }
                    if ("Any2Com_SSC_Single" != _subNav && a.length - 1 > 1 && 1 * _miBall == 1){
                        for (var j = 0; j < 1 * _times; j++) {
                            for (var k = "", q = 0; q < a.length - 1; q++) k += "_" + Betting.numberRandom(0, 9, 1)[0];
                            var n = 1;
                            _subNav.indexOf("Join") > -1 && (n = 1 * _subNav.charAt(_subNav.indexOf("Join") - 1)), _subNav.indexOf("3ComAnyCode2") > -1 && (n = 10);
                            var o = j == 1 * _times - 1;

                            _data.push(_getTextRoundData(k, n));
                        }
                    }
                }
            } else if(_currentRule.opt.type == 'ball'){
                if (Betting.playCode == '11X5' || Betting.playCode == 'PK10') {
                    if("OECounts_11X5" == _subNav){
                        // 11选5 定单双
                        var b = _beishu,
                            c = _times,
                            d = [5, 14, 23, 32, 41, 50];
                        d.sort(function() {
                            return .5 - Math.random()
                        });
                        console.log(d);
                        for (var e = 0; e < 1 * c; e++) {
                            var f = Betting.addZero(d[e] + "", 2),
                                g = e == 1 * c - 1;
                            // console.log(f, 1, b, "", 1, g);
                            _data.push(_getTextRoundData(f, 1));
                            // lott.createBetCart(f, 1, b, "", 1, g)
                        }
                    } else if("FixedPlace_11X5" == _subNav || _subNav.indexOf("5Fixed_PK10") > -1){
                        // 11选5 定位胆   PK10定位胆
                        for (var b = _beishu, c = _times, d = 0; d < 1 * c; d++) {
                            var e = _subNav.indexOf("5Fixed_PK10") > -1 ? 10 : 11,
                                f = Betting.addZero(Betting.numberRandom(1, e, 1)[0] + "", 2),
                                g = "";
                            g = "First5Fixed_PK10" == _subNav ? Betting.numberRandom(0, 4, 1)[0] + "" : "Last5Fixed_PK10" == _subNav ? Betting.numberRandom(5, 9, 1)[0] + "" : Betting.numberRandom(2, 4, 1)[0] + "";
                            var h = d == 1 * c - 1;
                            console.log(f, 1, b, g, 1, h);
                            // lott.createBetCart(f, 1, b, g, 1, h)
                            _data.push(_getTextRoundData(f, 1, g));
                        }
                    } else {
                        for (var e = _beishu, f = _times, g = a.length - 1 == 1 ? 1 * (_miBall ? _miBall : _minSelect) : a.length - 1, h = a.length - 1 == 1 ? "-" : "_", i = _subNav.indexOf("_PK10") > -1 ? 10 : 11, j = 0; j < 1 * f; j++) {
                            for (var k = "", l = Betting.numberRandom(1, i, g), m = 0; m < l.length; m++) k += h + Betting.addZero(l[m] + "", 2);
                            var n = j == 1 * f - 1;
                            
                            // console.log(k)
                            // console.log(k.substring(1), 1, e, c, 1, n);
                            _data.push(_getTextRoundData(k.substring(1), 1));
                            // lott.createBetCart(k.substring(1), 1, e, c, 1, n)
                        }
                    }
                } else if(Betting.playCode == 'SSC'){
                    if (_subNav.indexOf("AllCom") > -1 || _subNav.indexOf("L4Com") > -1 || _subNav.indexOf("F4Com") > -1 || 0 == _subNav.indexOf("Any4Com")) {
                        if ("AllCom120" == _subNav || "F4Com24" == _subNav || "L4Com24" == _subNav || "Any4Com24_SSC" == _subNav){
                            for (var f = 0; f < 1 * _times; f++) {
                                var g = "";
                                var b = TEMPLATE[_mainNav]({
                                    type : _subNav
                                }).opt.minSelect;
                                

                                g = Betting.numberRandom(0, 9, 1 * b).join("");
                                var h = 1,
                                    i = f == 1 * _times - 1;
                                if ("Any4Com24_SSC" == _subNav) {
                                    var j = Betting.numberRandom(1, 5, 4);
                                    j.sort(function(a, b) {
                                        return a - b
                                    }), g = j.join("") + "@" + g, h *= 1
                                }
                                
                                _data.push(_getTextRoundData(g, h));
                            }
                        }
                        if ("AllCom60" == _subNav || "AllCom20" == _subNav || "F4Com12" == _subNav || "L4Com12" == _subNav || "Any4Com12_SSC" == _subNav){
                            var b = TEMPLATE[_mainNav]({
                                    type : _subNav
                                }).opt.teamMinSelect;
                            for (var f = 0; f < 1 * _times; f++) {
                                var k = 3;
                                "AllCom60" == _subNav && (k = 4);
                                for (var l = Betting.numberRandom(0, k - 1, 1)[0], j = Betting.numberRandom(0, 9, k), g = j[1 * l] + "_", m = 0; m < j.length; m++) m != 1 * l && (g += j[m]);
                                var h = 1,
                                    i = f == 1 * _times - 1;
                                if ("Any4Com12_SSC" == _subNav) {
                                    var j = Betting.numberRandom(1, 5, 4);
                                    j.sort(function(a, b) {
                                        return a - b
                                    }), g = j.join("") + "@" + g, h *= 1
                                }

                                _data.push(_getTextRoundData(g, h));
                            }
                        }
                        if ("AllCom30" == _subNav){
                            for (var f = 0; f < 1 * _times; f++) {
                                for (var n = Betting.numberRandom(0, 2, 1)[0], j = Betting.numberRandom(0, 9, 3), g = "", m = 0; m < j.length; m++) m != 1 * n && (g += j[m]);
                                g += "_" + j[1 * n];
                                var h = 1,
                                    i = f == 1 * _times - 1;

                                _data.push(_getTextRoundData(g));
                            }
                        }
                        if ("AllCom10" == _subNav || "AllCom5" == _subNav || "F4Com6" == _subNav || "L4Com6" == _subNav || "F4Com4" == _subNav || "L4Com4" == _subNav || "Any4Com6_SSC" == _subNav || "Any4Com4_SSC" == _subNav){
                            var _teamMinSelect = TEMPLATE[_mainNav]({
                                type : _subNav
                            }).opt.teamMinSelect;

                            for (var f = 0; f < 1 * _times; f++) {
                                var o = "_";
                                "F4Com6" != _subNav && "L4Com6" != _subNav && "Any4Com6_SSC" != _subNav || (o = "");
                                var g = Betting.numberRandom(0, 9, 2).join(o),
                                    h = 1,
                                    i = f == 1 * _times - 1;
                                if ("Any4Com6_SSC" == _subNav || "Any4Com4_SSC" == _subNav) {
                                    var j = Betting.numberRandom(1, 5, 4);
                                    j.sort(function(a, _teamMinSelect) {
                                        return a - _teamMinSelect
                                    }), g = j.join("") + "@" + g, h *= 1
                                }

                                _data.push(_getTextRoundData(g, h));
                            }
                        }
                    } else if("FixedPlace" == _subNav  || "Last1Straight" == _subNav){
                        for (var e = 0; e < 1 * _times; e++) {
                            var f = "";
                            f = Betting.numberRandom(0, 4, 1)[0] + "";
                            var g = Betting.numberRandom(0, 9, 1)[0] + "",
                                h = e == 1 * _times - 1;

                            if ("FixedPlace" == _subNav) {
                                _data.push(_getTextRoundData(g, 1, f));
                            } else {
                                _data.push(_getTextRoundData(g, 1, 0));
                            }
                        }
                    } else {
                        _minSelect = TEMPLATE[_mainNav]({
                            type : _subNav
                        }).opt.minSelect;

                        if (a.length - 1 > 1 && 1 * _minSelect == 0 && _subNav.indexOf("Any") > -1){
                            for (var g = 0; g < 1 * _times; g++) {
                                for (var h = Betting.numberRandom(0, 4, 1 * _subNav.charAt(3)), i = new Array(5), j = "", k = 0; k < h.length; k++) i[h[k]] = Betting.numberRandom(0, 9, 1)[0];
                                for (var l = 0; l < i.length; l++) null == i[l] ? j += "_#" : j += "_" + i[l];
                                var m = g == 1 * _times - 1;

                                _data.push(_getTextRoundData(j, 1));
                            }
                        }
                        if (a.length - 1 == 1 && 1 * _minSelect >= 1){
                            for (var g = 0; g < 1 * _times; g++) {
                                var j = "";
                                j = Betting.numberRandom(0, 9, 1 * _minSelect).join("");
                                var n = 1;
                                _subNav.indexOf("3Com3") > -1 && (n = 2), _subNav.indexOf("3StraightCom") > -1 && (n = 6), _subNav.indexOf("3ComAnyCode1") > -1 && (n = 55);
                                var m = g == 1 * _times - 1;
                                if (0 == _subNav.indexOf("Any3Com") || "Any2Com_SSC" == _subNav) {
                                    var h = Betting.numberRandom(1, 5, 1 * _subNav.charAt(3));
                                    h.sort(function(a, _minSelect) {
                                        return a - _minSelect
                                    }), j = h.join("") + "@" + j, n *= 1
                                }
                                _data.push(_getTextRoundData(j, n));
                            }
                        }

                        if (a.length - 1 > 1 && 1 * _minSelect == 1) {
                            for (var g = 0; g < 1 * _times; g++) {
                                for (var j = "", k = 0; k < a.length - 1; k++){
                                    j += "_" + Betting.numberRandom(0, 9, 1)[0];  
                                }
                                var n = 1;
                                _subNav.indexOf("Join") > -1 && (n = 1 * _subNav.charAt(_subNav.indexOf("Join") - 1)), _subNav.indexOf("3ComAnyCode2") > -1 && (n = 10);
                                var m = g == 1 * _times - 1;

                                _data.push(_getTextRoundData(j, n));
                            }
                        }
                    }
                }
            } else if(_currentRule.opt.type == 'sum'){
                var _balls = _currentRule.opt.numList;
                var _ballSmallNumList = TEMPLATE.getSubNumList(_currentRule.opt.sumType);

                for (var g = Betting.numberRandom(_balls[0], _balls[_balls.length - 1], 1 * _times), h = 0; h < g.length; h++) {
                    var i = "",
                        j = 0;
                    i = g[h] + "", j = _ballSmallNumList[1 * g[h] - 1 * _balls[0]];
                    var k = h == g.length - 1;
                    if ("Any3Sum_SSC" == _subNav || "Any2Sum_SSC" == _subNav) {
                        var l = _subNav.charAt(3),
                            m = Betting.numberRandom(1, 5, 1 * l);
                        m.sort(function(a, _beishu) {
                            return a - _beishu
                        }), i = m.join("") + "@" + i, j *= 1
                    }
                    _data.push(_getTextRoundData(i, j));
                }
            } else if (_currentRule.opt.type == 'mixingAny') {
                for (var e = 0; e < 1 * _times; e++) {
                    var g = "";
                    g = Betting.numberRandom(0, 9, 1)[0] + "";
                    var i = 1;
                    _subNav.indexOf("2ComAnyCode") > -1 && (i = 10);
                    var h = e == 1 * _times - 1;
                    _data.push(_getTextRoundData(g, i));
                }
            } else if (_currentRule.opt.type == 'taste') {
                if(Betting.playCode == 'PK10' && _subNav.indexOf("BSOE_PK10") > -1){
                    // 大小单双
                    for (var b = _beishu, c = _times, d = "", e = 0; e < 1 * c; e++) {
                        "First2SumBSOE_PK10" != _subNav && (d = Betting.numberRandom(0, 4, 1)[0] + "");
                        var f = Betting.numberRandom(0, 3, 1)[0] + "",
                            g = e == 1 * c - 1;
                        // console.log(f, 1, b, d, 1, g);
                        _data.push(_getTextRoundData(f, 1, d));
                        // lott.createBetCart(f, 1, b, d, 1, g)
                    }
                } else {
                    for (var e = [], f = 0; f < 1 * _times; f++) {
                        var g = Betting.numberRandom(0, 3, 2);
                        e.push(g)
                    }
                    for (var h = 0; h < e.length; h++) {
                        var g = e[h].join("_"),
                            i = h == e.length - 1;

                        _data.push(_getTextRoundData(g, 1));
                    }
                }
            } else if (_currentRule.opt.type == 'mixing') {
                var a = {
                    stakes: 1,
                    len: 3
                };
                switch (_subNav) {
                    case "Last3Com":
                        a.digit = "";
                        break;
                    case "First3Com":
                        a.digit = "2";
                        break;
                    case "Middle3Com":
                        a.digit = "1";
                        break;
                    case "Last3Com_LF":
                        a.digit = "";
                        break;
                    case "P3Com_LF":
                        a.digit = "2";
                        break;
                    case "Any3Com_SSC":
                        a.digit = "";
                }
                var e = Betting.arrRandom(1, 998, 1 * _times, 3, !0),
                    f = [];
                if ("Any3Com_SSC" == _subNav){
                    for (var g = 0; g < 1 * _times; g++) {
                        var h = Betting.numberRandom(1, 5, 3);
                        h.sort(function(a, b) {
                            return a - b
                        }), f.push(h.join(""))
                    }
                }

                for (var i = 0; i < e.length; i++) {
                    var j = e[i].replace(/([0-9])(?=([0-9]{1})+([^0-9]|$))/g, "$1_"),
                        k = i == e.length - 1;
                    if("Any3Com_SSC" == _subNav){
                        j = f[i] + "@" + j 
                    } else {
                        j = j;
                    }
                    _data.push(_getTextRoundData(j, a.stakes));
                }
            } else if (_currentRule.opt.type == 'czwBall') {
                // 11选5猜中位
                for (var b = _beishu, c = _times, d = Betting.numberRandom(3, 9, 1 * c), e = 0; e < d.length; e++) {
                    var f = Betting.addZero(d[e] + "", 2),
                        g = e == d.length - 1;
                    _data.push(_getTextRoundData(f, 1));
                }
            } else if (_currentRule.opt.type == 'dragonTiger') {
                // PK10 龙虎斗
                for (var b = _beishu, c = _times, d = 0; d < 1 * c; d++) {
                    var e = Betting.numberRandom(0, 9, 1)[0],
                        f = 1 * e < 5 ? '0' : '1',
                        g = d == 1 * c - 1;
                    // console.log(f, 1, b, "", 1, g);
                    _data.push(_getTextRoundData(f, 1));
                    // lott.createBetCart(f, 1, b, "", 1, g)
                }
            } else if (_currentRule.opt.type == 'dice') {
                // Math.floor(Math.random()*6 + 1)
                var k_l = $('.J_dice').length;
                // console.log(k_l);
                for (var f = 0; f < 1 * _times; f++) {
                    var k_n = parseInt(Math.random() * k_l);
                    var g = $('#J_dice_'+k_n).data('v') + '';
                    // console.log(k_n, g);
                    _data.push(_getTextRoundData(g, h));
                }
            } else {
                if("11X5" == Betting.playCode && "FixedPlace_11X5" == _subNav) {
                    console.log(0);
                    // lott.add11X5BallToCartOfAlone(a)
                } else {
                    _minSelect = TEMPLATE[_mainNav]({
                        type : _subNav
                    }).opt.minSelect;

                    if("SSC" == Betting.playCode && (_subNav.indexOf("AllCom") > -1 || _subNav.indexOf("L4Com") > -1 || _subNav.indexOf("F4Com") > -1 || 0 == _subNav.indexOf("Any4Com"))) {
                        console.log(1);
                        // lott.addBallToCartOf5O4StarCom(a, d, e)
                    } else {
                        if("PK10" == Betting.playCode && _subNav.indexOf("BSOE_PK10") > -1) {
                            console.log(2);
                            // lott.addBallToCartOfPk10Bose(a)
                        } else {
                            if("PK10" == Betting.playCode && _subNav.indexOf("5Fixed_PK10") > -1) {
                                console.log(3);
                                // lott.add11X5BallToCartOfAlone(a)   
                            } else {
                                if("11X5" == Betting.playCode || "PK10" == g && -1 == _subNav.indexOf("BSOE_PK10") && -1 == _subNav.indexOf("5Fixed_PK10")) {
                                    for (var e = _beishu, f = _times, g = a.length - 1 == 1 ? 1 * _minSelect : a.length - 1, h = a.length - 1 == 1 ? "-" : "_", i = _subNav.indexOf("_PK10") > -1 ? 10 : 11, j = 0; j < 1 * f; j++) {
                                        for (var k = "", l = Betting.numberRandom(1, i, g), m = 0; m < l.length; m++) k += h + Betting.addZero(l[m] + "", 2);
                                        var n = j == 1 * f - 1;
                                        console.log(k);
                                        // console.log(k.substring(1), 1, e, '', 1, n);
                                        // lott.createBetCart(k.substring(1), 1, e, c, 1, n)
                                        _data.push(_getTextRoundData(k.substring(1), 1));
                                    }
                                } else {
                                    console.log(5);
                                    // lott.addBallToCart(a, d, e)
                                }
                            }
                        }
                    }
                }
                // _data.push(_getTextRoundData(g, 1));
            }

            function _getTextRoundData(j, num, type) {
                // j : 数值
                // num : 倍数
                // type : 位置 01234 = 个十百千万
                
                // console.log(j, num, type);
                
                var _ddd = {};
                var _need = '';

                // type = 4;

                if (j.indexOf('@') > -1){
                    j = j.split('@')[1];
                }

                var _FIRST = $('[data-row="FIRST"]');
                var _SECOND = $('[data-row="SECOND"]');
                var _THIRD = $('[data-row="THIRD"]');
                var _FOURTH = $('[data-row="FOURTH"]');
                var _FIFTH = $('[data-row="FIFTH"]');

                function _transText(num){
                    var _txt = '';
                    if(num == 0){
                        _txt = '大'
                    } else if(num == 1) {
                        _txt = '小';
                    } else if(num == 2) {
                        _txt = '单';
                    } else if(num == 3) {
                        _txt = '双';
                    }
                    return _txt;
                }

                if(_FIRST.length) {
                    if(_currentRule.opt.type == 'taste') {
                        if(Betting.playCode == 'PK10' && type == 4){
                            _ddd.w = _transText(j);
                            console.log(_ddd.w);
                        } else {
                            if (type == undefined) {
                                _ddd.w = _transText(j.split('_').join('').split('')[_FIRST.parent('li').index()]);
                            }else{
                                _ddd.w = '';
                            }
                        }
                    } else {
                        if (type == 4 || type == 5) {
                            _ddd.w = j;
                        } else{
                            if (type == undefined) {
                                if(Betting.playCode == '11X5' || Betting.playCode == 'PK10') {
                                    _ddd.w = j.split('_')[_FIRST.parent('li').index()];
                                } else {
                                    _ddd.w = j.split('_').join('').split('')[_FIRST.parent('li').index()];
                                }
                            } else {
                                _ddd.w = '';
                            }
                        }
                    }
                    if(_ddd.w == '#'){
                        _ddd.w = '';
                        if (type == undefined) {
                            _need += 'w#';
                        }
                    } else {
                        if (type == undefined || type != undefined && type == 4 || type == 5 || _subNav.indexOf("BSOE_PK10") > -1) {
                            _need += 'w#';
                        }
                    }
                }

                if(_SECOND.length) {
                    if(_currentRule.opt.type == 'taste') {
                        if(Betting.playCode == 'PK10' && type == 3){
                            _ddd.q = _transText(j);
                        } else {
                            if (type == undefined) {
                                _ddd.q = _transText(j.split('_').join('').split('')[_SECOND.parent('li').index()]);
                            }else{
                                _ddd.q = '';
                            }
                        }
                    } else {
                        if (type == 3 || type == 6) {
                            _ddd.q = j;
                        } else {
                            if(Betting.playCode == '11X5' || Betting.playCode == 'PK10') {
                                _ddd.q = j.split('_')[_SECOND.parent('li').index()];
                            } else {
                                _ddd.q = j.split('_').join('').split('')[_SECOND.parent('li').index()];
                            }
                        }
                    }
                    if(_ddd.q == '#'){
                        _ddd.q = '';
                        if (type == undefined) {
                            _need += 'q#';
                        }
                    } else {
                        if (type == undefined || type != undefined && type == 3 || type == 6 || _subNav.indexOf("BSOE_PK10") > -1) {
                            _need += 'q#';
                        }
                    }
                }

                if(_THIRD.length) {
                    if(_currentRule.opt.type == 'taste') {
                        if(Betting.playCode == 'PK10' && type == 2){
                            _ddd.b = _transText(j);
                        } else {
                            if (type == undefined) {
                                _ddd.b = _transText(j.split('_').join('').split('')[_THIRD.parent('li').index()]);
                            }else{
                                _ddd.b = '';
                            }
                        }
                    } else {
                        if (type == 2 || type == 7) {
                            _ddd.b = j;
                        } else {
                            if(Betting.playCode == '11X5' || Betting.playCode == 'PK10') {
                                _ddd.b = j.split('_')[_THIRD.parent('li').index()];
                            } else {
                                _ddd.b = j.split('_').join('').split('')[_THIRD.parent('li').index()];
                            }
                        }
                    }

                    if(_ddd.b == '#'){
                        _ddd.b = '';
                        if (type == undefined) {
                            _need += 'b#';
                        }
                    } else {
                        if (type == undefined || type != undefined && type == 2 || type == 7 || _subNav.indexOf("BSOE_PK10") > -1) {
                            _need += 'b#';
                        }
                    }
                }

                if(_FOURTH.length) {
                    if(_currentRule.opt.type == 'taste') {
                        if(Betting.playCode == 'PK10' && type == 1){
                            _ddd.s = _transText(j);
                        } else {
                            if (type == undefined) {
                                _ddd.s = _transText(j.split('_').join('').split('')[_FOURTH.parent('li').index()]);
                            }else{
                                _ddd.s = '';
                            }
                        }
                    } else {
                        if (type == 1 || type == 8) {
                            _ddd.s = j;
                        } else {
                            if(Betting.playCode == '11X5' || Betting.playCode == 'PK10') {
                                _ddd.s = j.split('_')[_FOURTH.parent('li').index()];
                            } else {
                                _ddd.s = j.split('_').join('').split('')[_FOURTH.parent('li').index()];
                            }
                        }
                    }
                    if(_ddd.s == '#'){
                        _ddd.s = '';
                        if (type == undefined) {
                            _need += 's#';
                        }
                    } else {
                        if (type == undefined || type != undefined && type == 1 || type == 8 || _subNav.indexOf("BSOE_PK10") > -1) {
                            _need += 's#';
                        }
                    }
                }

                if(_FIFTH.length) {
                    if(_currentRule.opt.type == 'taste') {
                        if(Betting.playCode == 'PK10' && type == 0){
                            _ddd.g = _transText(j);
                        } else {
                            if (type == undefined) {
                                _ddd.g = _transText(j.split('_').join('').split('')[_FIFTH.parent('li').index()]);
                            }else{
                                _ddd.g = '';
                            }
                        }
                    } else {
                        if (type == 0 || type == 9) {
                            _ddd.g = j;
                        } else {
                            if(Betting.playCode == '11X5' || Betting.playCode == 'PK10') {
                                _ddd.g = j.split('_')[_FIFTH.parent('li').index()];
                            } else {
                                _ddd.g = j.split('_').join('').split('')[_FIFTH.parent('li').index()];
                            }
                        }
                    }
                    if(_ddd.g == '#'){
                        _ddd.g = '';
                        if (type == undefined) {
                            _need += 'g';
                        }
                    } else {
                        if (type == undefined || type != undefined && type == 0 || type == 9 || _subNav.indexOf("BSOE_PK10") > -1) {
                            _need += 'g';
                        }
                    }
                }

                var _hex = '';
                if (_currentRule.opt.haveCheckbox) {
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
                    _ddd.hex = _hex;
                }

                if($('#J_ballInputArea').length || $('[data-row="NONE"]').length) {
                    if(Betting.playCode == '11X5'){
                        // console.log(j);
                        // console.log(_subNav);
                        if(_subNav == 'OECounts_11X5'){
                            // [5, 14, 23, 32, 41, 50]
                            switch(j){
                                case '05':
                                _ddd.n = '0单5双';
                                break;
                                case '14':
                                _ddd.n = '1单4双';
                                break;
                                case '23':
                                _ddd.n = '2单3双';
                                break;
                                case '32':
                                _ddd.n = '3单2双';
                                break;
                                case '41':
                                _ddd.n = '4单1双';
                                break;
                                case '50':
                                _ddd.n = '5单0双';
                                break;
                            }
                        } else {
                            if($('#J_ballInputArea').length){
                                _ddd.n = j.split('_').join(' | ');
                            } else {
                                _ddd.n = j;
                            }
                        }
                    } else if(Betting.playCode == 'PK10') {
                        if(_currentRule.opt.type == 'dragonTiger') {
                            _ddd.n = (j == '0' ? '龙' : '虎');
                        } else {
                            if($('#J_ballInputArea').length){
                                _ddd.n = j.split('_').join(' | ');
                            } else {
                                if(_subNav.indexOf("BSOE_PK10") > -1){
                                    _ddd.n = _transText(j);
                                } else {
                                    _ddd.n = j;
                                }
                            }
                        }
                    } else {
                        _ddd.n = j.split('_').join('').replace(/\#/g,'').split('').sort().join('');
                    }
                    // _ddd.n = j.split('_').join('');
                    _need += 'n';
                }

                if($('[data-row="NONE1"]').length) {
                    if(j.indexOf('_') == 0){
                        _ddd.n1 = j.split('_')[1].split('').sort().join('');
                    } else {
                        _ddd.n1 = j.split('_')[0].split('').sort().join('');
                    }
                    _need += 'n1#';
                }

                if($('[data-row="NONE2"]').length) {
                    if(j.indexOf('_') == 0){
                        _ddd.n2 = j.split('_')[2];
                    } else {
                        _ddd.n2 = j.split('_')[1];
                    }
                    _need += 'n2';
                }

                if($('[data-row="SUM"]').length) {
                    if(Betting.playCode == '11X5' || Betting.playCode == 'PK10' || Betting.playCode == 'K3') {
                        _ddd.n = j;
                    } else {
                        _ddd.n = j.split('').sort().join('');
                    }
                    _need += 'n';
                }

                if($('[data-row="DICE"]').length) {
                    // 快三 骰子
                    _ddd.n = j;
                }

                _ddd.multiple = $('#J_beishu').val();
                _ddd.ajaxType = _currentRule.opt.ajaxType;
                _ddd.unit = $('#J_unit').data('txt').split('#')[2];
                _ddd.unitName = $('#J_unit').data('val');
                _ddd.type = _currentRule.opt.type;
                _ddd.num = num ? num : 1,  //默认每次机选1;
                _ddd.sum = Betting.formatNumber(_ddd.num * 1 * _ddd.multiple * Number($('#J_unit').data('txt').split('#')[1] * Betting.singleStakesPrice), 4);
                _ddd.need = _need;
                if (Betting.playCode == 'K3') {
                    _ddd.typeName = $('.J_withChild.active').text();
                } else {
                    _ddd.typeName = $('.J_subMenu.active').text();
                }
                
                return _ddd;
            }

            Betting.renderCart(_data);
        },
        addBallToCart: function() {
            var _data = Betting.getSelectData();
            // 渲染购物车
            Betting.renderCart(_data);
        },
        renderCart: function(data) {
            // console.log(data);
            // 渲染购物车
            var _str = '';
            var _len = data.length;
            if (data && _len) {
                $.each(data, function(i, n) {
                    _str += '<li class="clearfix" data-type="'+ n.type +'" data-ajaxtype="'+ n.ajaxType +'" data-hex="'+ (n.hex ? n.hex : '') +'" data-need="'+ (n.need == 'sum' ? 'n' : n.need) +'" data-unit="'+ n.unit +'" data-multiple="'+ n.multiple +'" data-w="'+ (n.w ? n.w : '') +'" data-q="'+ (n.q ? n.q : '') +'" data-b="'+ (n.b ? n.b : '') +'" data-s="'+ (n.s ? n.s : '') +'" data-g="'+ (n.g ? n.g : '') +'" data-n="'+ (n.n ? n.n : '') +'" data-n1="'+ (n.n1 ? n.n1 : '') +'" data-n2="'+ (n.n2 ? n.n2 : '') +'" >';
                    _str += '    <div class="t1">'+ n.typeName +'</div>';
                    _str += '    <div class="t2"><div>';
                    _str += _changeNum(n);
                    _str += '<span class="cm_number hide J_cartNums">';
                    _str += _changeNum(n);
                    _str += '</span>';
                    _str += '</div></div>';
                    _str += '    <div class="t3">'+ n.unitName +'</div>';
                    _str += '    <div class="t4 J_nums">'+ n.num +'</div>';
                    _str += '    <div class="t5">'+ n.multiple +'</div>';
                    _str += '    <div class="t6 J_sums">'+ n.sum +'</div>';
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
                        _html += k.n;
                        // _html += k.n.split('').sort().join('') ;
                    }
                    if (k.n1) {
                        _html += (k.n1.split('').sort().join('')) + (k.n2 ? ' | ' : '');
                    }
                    if (k.n2) {
                        _html += k.n2.split('').sort().join('');
                    }
                    
                    return _html;
                }
            }

            $('#J_betList').prepend(_str);

            // 开放 我要追号 、确认投注按钮
            $('#J_confirmBets,#J_chaseNumber').removeClass('disabled');
            
            Betting.renderTotal();
            Betting.resetSelectArea();
        },
        renderTotal: function() {
            // 计算总的注数以及金额
            var _num = 0;
            var _sum = 0;

            $('.J_nums').each(function(){
                _num += $(this).text() - 0;
            });

            $('.J_sums').each(function(){
                _sum = _sum + ($(this).text() * 10000);
            });

            $('#J_totalNum').text(_num);
            $('#J_totalSum').text(Number(_sum / 10000).toFixed(4));
        },
        resetSelectArea: function() {
            // 重置选区
            $('.J_numWrp.active').removeClass('active');
            $('.J_dice.active').removeClass('active');
            Betting.resetBettingBox();
            if ($('#J_ballInputArea').length) {
                $('#J_ballInputArea').val('');
            }
        },
        getConfirmData: function() {
            var _items = [];
            $('#J_betList li').each(function(x, y){
                var _ajaxData = {};
                var _this = $(this);
                var _type = _this.data('type');
                var _need = _this.data('need');
                var _nums = _this.find('.J_cartNums').html().replace(/\ /g, '');

                _ajaxData.type = _this.data('ajaxtype');
                _ajaxData.multiple = _this.data('multiple');
                _ajaxData.unit = _this.data('unit');

                
                if(_this.data('hex')){
                    _ajaxData.hex = _this.data('hex').split('').join(',');
                }

                if (_type == 'ball') {
                    $.each(_need.split('#'), function(i, n){
                        if (n) {
                            _ajaxData[n] = _this.data(n) + '';
                        }
                        _ajaxData[n] = _ajaxData[n].split('').sort().join('');
                    });
                } else if(_type == 'text' || _type == 'mixing' || _type == 'mixingAny'){
                    _ajaxData.n = _nums;
                } else if(_type == 'sum'){
                    _ajaxData.n = _nums.replace(/\|/g, ',');;

                } else if(_type == 'taste'){
                    $.each(_need.split('#'), function(i, n){
                        if (n) {
                            _ajaxData[n] = _exchangeToNum(_this.data(n));
                        }
                    });

                    function _exchangeToNum(name){
                        var _num = '0';
                        if(name == '大'){
                            _num = '0';
                        } else if (name == '小') {
                            _num = '1';
                        } else if (name == '单') {
                            _num = '2';
                        } else if (name == '双') {
                            _num = '3';
                        }
                        return _num;
                    }
                }

                _items.push(_ajaxData);
            });

            return _items;
        },
        getBetHistory: function(options) {
            options = options || {};
            options.page = options.page || 1;
            options.pageSize = options.pageSize || 10;
            // 获取投注历史
            GLOBAL.getAjaxData({
                url: '/bet/lists',
                data: {
                    page: options.page,
                    pageSize: options.pageSize
                }
            }, function(data) {
                var _str = '';

                if (data.total > 0) {
                    $.each(data.data, function(i, n){
                        _str += '<li class="clearfix">';
                        _str += '    <div class="t1">'+ n.product.name +'</div>';
                        _str += '    <div class="t2">'+ n.order_id +'</div>';
                        _str += '    <div class="t3">'+ n.created +'</div>';
                        _str += '    <div class="t4">'+ n.periods.date +'-'+ n.periods.num +'</div>';
                        _str += '    <div class="t5">'+ (n.periods.lottery_num ? n.periods.lottery_num : '-') +'</div>';
                        _str += '    <div class="t6">'+ n.money +'</div>';
                        _str += '    <div class="t7">'+ n.bonus +'</div>';
                        _str += '    <div class="t8">'+ _compile(n.status) +'</div>';
                        _str += '</li>';
                    });

                    function _compile(status){
                        var _txt = '';
                        switch(status){
                            case 'wait':
                            _txt = '等待支付';
                            break;
                            case 'pay':
                            _txt = '已经支付';
                            break;
                            case 'expire':
                            _txt = '过期';
                            break;
                            case 'retreat':
                            _txt = '撤销';
                            break;
                            case 'regret':
                            _txt = '未中奖';
                            break;
                            case 'winning':
                            _txt = '中奖';
                            break;
                        }

                        return _txt;
                    }

                    $('#J_betHistoryPage').show();
                    $('#J_curPage').html(data.current_page);
                    $('#J_totalPage').html(data.total);
                } else {
                    _str += '<li class="empty">您没有投注历史！</li>';
                    $('#J_betHistoryPage').hide();
                }

                $('#J_betHistory').html(_str);
            });
        },
        shortcutPlaceOrder: function() {
            var _items = [];
            var _mainNav = $('.J_withChild.active').data('info').split('#')[1];
            var _subNav = ($('.J_subMenu.active').length ? $('.J_subMenu.active').data('info').split('#')[1] : _mainNav);
            var _currentRule = TEMPLATE[_mainNav]({
                type : _subNav
            });
            var _type = _currentRule.opt.type;
            var _data = Betting.getSelectData();
            var _ajaxData = {};

            _ajaxData.type = _currentRule.opt.ajaxType;
            _ajaxData.multiple = Number($('#J_beishu').val());  //转换为数字
            _ajaxData.unit = $('#J_unit').data('txt').split('#')[2];

            if (_data[0].hex) {
                _ajaxData.hex = _data[0].hex.split('').join(',');
            }

            if (_type == 'ball') {
                $.each(_data[0].need.split('#'), function(i, n){
                    if (n) {
                        _ajaxData[n] = _data[0][n];
                    }
                });
            } else if(_type == 'text' || _type == 'mixing'){
                _ajaxData.n = _data[0].n.replace(/( \| )/g, ',');
            } else if(_type == 'sum'){
                // console.log(_data[0].n);
                _ajaxData.n = _data[0].n.replace(/(\|)/g, ',');
            } else if(_type == 'mixingAny'){
                _ajaxData.n = _data[0].n;
            } else if(_type == 'taste'){
                $.each(_data[0].need.split('#'), function(i, n){
                    if (n) {
                        _ajaxData[n] = _exchangeToNum(_data[0][n]);
                    }
                });

                function _exchangeToNum(name){
                    var _num = '0';
                    if(name == '大'){
                        _num = '0';
                    } else if (name == '小') {
                        _num = '1';
                    } else if (name == '单') {
                        _num = '2';
                    } else if (name == '双') {
                        _num = '3';
                    }
                    return _num;
                }
            }

            _items.push(_ajaxData);

            Betting.confirmCart(_items, 'shortcut');
        },
        getBettingQuantity: function(options) {
            // console.log(options);
            // 计算选择的注数
            // options 是针对和值设置的配置：如：前三和值类型
            options = options || {};
            if (options.index != 0) {
                options.index = options.index || -1;
            }
            options.text = options.text || '';
            options.hasSelect = options.hasSelect || false;

            var _mainNav = $('.J_withChild.active').data('info').split('#')[1];
            var _subNav = ($('.J_subMenu.active').length ? $('.J_subMenu.active').data('info').split('#')[1] : _mainNav);
            var _currentRule = TEMPLATE[_mainNav]({
                type : _subNav
            });

            var k = {};
            var _type = _currentRule.opt.type; //选择模式 ball:选号   text:文本域
            var _formulaList = [];      //公式列表
            // var _currentSelect = [];    //当前已选号码的集合

            $('.J_ballList').each(function(i){
                var _this = $(this);
                var _row = _this.data('row');
                _formulaList[i] = _row;
                // _currentSelect[_row] = _this.find('.J_numWrp.active').text();
                // 1474
            });

            for (var i = 0; i < _formulaList.length; i++) {
                if("11X5" == Betting.playCode || "PK10" == Betting.playCode && -1 == _subNav.indexOf("BSOE_PK10")) {
                    k[_formulaList[i]] = [];
                    $.each($('[data-row="'+ _formulaList[i] +'"]').find('.J_numWrp.active'), function(x, y) {
                        k[_formulaList[i]].push($(this).text());
                    });
                    // _currentSelect[_row][i] = _this.find('.J_numWrp.active').text();
                } else {
                    k[_formulaList[i]] = $('[data-row="'+ _formulaList[i] +'"]').find('.J_numWrp.active').text();
                    // _currentSelect[_row] = ;
                    // k[_row] = ""
                }
            }


            // console.log(k);
            // console.log(_currentSelect);
            // console.log(_formulaList);
            _formulaList.push(k);
            // _formulaList.push(_currentSelect);
            // console.log(_formulaList);
            // return;

            var _selectNum = _currentRule.opt.formula(_formulaList, options);   //通过相应公式计算注数

            // 已选注数大于0时即可添加选号或一键投注
            if (_selectNum) {
                // 验证是否有复选框区域且是有方案
                if ($('#J_planNum').length && $('#J_planNum').text() == 0 || _subNav == 'All5Join' && _selectNum <= 5) {
                    return;
                }
                $('#J_addBallToCart,#J_shortcutPlaceOrder').removeClass('disabled');
            } else {
                $('#J_addBallToCart,#J_shortcutPlaceOrder').addClass('disabled');
            }

            $('#J_selectionBallStakes').text(_selectNum);

            Betting.calculateAmount();
        },
        getSelectData: function() {
            // type : ball
            // 获取选择的数据
            var _mainNav = $('.J_withChild.active').data('info').split('#')[1];
            var _subNav = ($('.J_subMenu.active').length ? $('.J_subMenu.active').data('info').split('#')[1] : _mainNav);

            var _data = [];
            var _rule = TEMPLATE[_mainNav]({
                type : _subNav
            });
            var _opt = _rule.opt;
            var _d = {};

            _d.type = _opt.type;   //选号类型
            _d.multiple = $('#J_beishu').val(); //投注倍数
            _d.unit = $('#J_unit').data('txt').split('#')[2];   //投注金额单位：yuan,jiao,fen,li
            _d.unitName = $('#J_unit').data('val'); //投注金额单位 元角分厘
            _d.sum = $('#J_selectionBallAmount').text();    //投注金额
            _d.num = $('#J_selectionBallStakes').text();    //投注注数
            _d.ajaxType = _opt.ajaxType;
            if (Betting.playCode == 'K3'){
                _d.typeName = $('.J_withChild.active').text();    //玩法类型名称
            } else {
                _d.typeName = $('.J_subMenu.active').text();    //玩法类型名称
            }

            if (_opt.type == 'ball' || _opt.type == 'taste' || _opt.type == 'sum' || _opt.type == 'mixingAny' || _opt.type == '11x5' || _opt.type == 'czwBall' || _opt.type == 'dragonTiger') {
                var _n = '';
                var _need = '';
                $.each(_opt.numNameList, function(i, n) {
                    if (n.split('#')[0] == 'FIRST') { //万
                        // _d.w = $('[data-row="FIRST"] .J_numWrp.active').text();
                        if(Betting.playCode == '11X5' || Betting.playCode == 'PK10'){
                            var x = '';
                            $.each($('[data-row="FIRST"] .J_numWrp.active'), function(){
                                x += '-' + $(this).text();
                            });
                            _d.w = x.substr(1);
                        } else {
                            _d.w = $('[data-row="FIRST"] .J_numWrp.active').text();
                        }
                        _need += 'w#';
                    } else if(n.split('#')[0] == 'SECOND') {  //千
                        // _d.q = $('[data-row="SECOND"] .J_numWrp.active').text();
                        if(Betting.playCode == '11X5' || Betting.playCode == 'PK10'){
                            var x = '';
                            $.each($('[data-row="SECOND"] .J_numWrp.active'), function(){
                                x += '-' + $(this).text();
                            });
                            _d.q = x.substr(1);
                        } else {
                            _d.q = $('[data-row="SECOND"] .J_numWrp.active').text();
                        }
                        _need += 'q#';
                    } else if(n.split('#')[0] == 'THIRD') {   //百
                        // _d.b = $('[data-row="THIRD"] .J_numWrp.active').text();
                        if(Betting.playCode == '11X5' || Betting.playCode == 'PK10'){
                            var x = '';
                            $.each($('[data-row="THIRD"] .J_numWrp.active'), function(){
                                x += '-' + $(this).text();
                            });
                            _d.b = x.substr(1);
                        } else {
                            _d.b = $('[data-row="THIRD"] .J_numWrp.active').text();
                        }
                        _need += 'b#';
                    } else if(n.split('#')[0] == 'FOURTH') {  //十
                        // _d.s = $('[data-row="FOURTH"] .J_numWrp.active').text();
                        if(Betting.playCode == '11X5' || Betting.playCode == 'PK10'){
                            var x = '';
                            $.each($('[data-row="FOURTH"] .J_numWrp.active'), function(){
                                x += '-' + $(this).text();
                            });
                            _d.s = x.substr(1);
                        } else {
                            _d.s = $('[data-row="FOURTH"] .J_numWrp.active').text();
                        }
                        _need += 's#';
                    } else if(n.split('#')[0] == 'FIFTH') {   //个
                        // _d.g = $('[data-row="FIFTH"] .J_numWrp.active').text();
                        if(Betting.playCode == '11X5' || Betting.playCode == 'PK10'){
                            var x = '';
                            $.each($('[data-row="FIFTH"] .J_numWrp.active'), function(){
                                x += '-' + $(this).text();
                            });
                            _d.g = x.substr(1);
                        } else {
                            _d.g = $('[data-row="FIFTH"] .J_numWrp.active').text();
                        }
                        _need += 'g';
                    } else if(n.split('#')[0] == 'NONE') {   //组选就一个值
                        if(Betting.playCode == '11X5'){
                            var x = '';
                            $.each($('[data-row="NONE"] .J_numWrp.active'), function(){
                                x += '-' + $(this).text();
                            });
                            _d.n = x.substr(1);
                        } else if (Betting.playCode == 'PK10') {
                            if(_opt.type == 'dragonTiger'){
                                _d.n = $('[data-row="NONE"] .J_numWrp.active').data('v');
                            } else {
                                var x = '';
                                $.each($('[data-row="NONE"] .J_numWrp.active'), function(){
                                    x += '-' + $(this).text();
                                });
                                _d.n = x.substr(1);
                            }
                        } else {
                            _d.n = $('[data-row="NONE"] .J_numWrp.active').text();
                        }
                        console.log(_d.n);
                        _need += 'n';
                    } else if(n.split('#')[0] == 'NONE1') {   //组选就一个值
                        // _d.n1 = $('[data-row="NONE1"] .J_numWrp.active').text();
                        if(Betting.playCode == '11X5'){
                            var x = '';
                            $.each($('[data-row="NONE1"] .J_numWrp.active'), function(){
                                x += '-' + $(this).text();
                            });
                            _d.n1 = x.substr(1);
                        } else {
                            _d.n1 = $('[data-row="NONE1"] .J_numWrp.active').text();
                        }
                        _need += 'n1#';
                    } else if(n.split('#')[0] == 'NONE2') {   //组选就一个值
                        // _d.n2 = $('[data-row="NONE2"] .J_numWrp.active').text();
                        if(Betting.playCode == '11X5'){
                            var x = '';
                            $.each($('[data-row="NONE2"] .J_numWrp.active'), function(){
                                x += '-' + $(this).text();
                            });
                            _d.n2 = x.substr(1);
                        } else {
                            _d.n2 = $('[data-row="NONE2"] .J_numWrp.active').text();
                        }
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
                
                _d.need = _need;  //需要的数据类型
            } else if(_opt.type == 'text' || _opt.type == 'mixing'){
                // TODO : 文本域上传
                _d.need = 'n';

                var _ball = '';

                if (_opt.haveCheckbox) {
                    _ball = Betting.textArea[0].ball;
                    if(_ball.indexOf('@') >= 0){
                        _ball = _ball.split('@')[1];
                    } else {
                        _ball = _ball.replace(/\_|#/g,'');
                    }
                } else {
                    _ball = Betting.textArea[0].ball;
                }
                console.log(_ball);

                var _ballList = [];

                if(Betting.playCode == '11X5' || Betting.playCode == 'PK10'){
                    _ballList = _ball.split('_');
                } else {
                    _ballList = _ball.split(',');
                }

                var _nums = '';
                $.each(_ballList, function(i, n){
                    if(Betting.playCode == '11X5' || Betting.playCode == 'PK10'){
                        _nums += n;
                        // _nums += n.split('_');
                    } else {
                        _nums += n.split('_').join('');
                    }
                    if (_ballList.length > 1 && i < _ballList.length - 1) {
                        _nums += ' | ';
                    }
                });
                _d.n = _nums;
            } else if(_opt.type == 'dice') {
                // 快三
                console.log('todo ： 不知道要什么格式');
                
            }

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
            console.log(_data);

            return _data;
        },
        renderMaxBonus: function(mainNavType, subNavType) {
            // 渲染最高奖金
            var _mainNav = $('.J_withChild.active').data('info').split('#')[1];
            var _subNav = ($('.J_subMenu.active').length ? $('.J_subMenu.active').data('info').split('#')[1] : _mainNav);
            var _data = TEMPLATE[_mainNav]({
                type: _subNav
            });
            var _unit = $('#J_unit').data('txt').split('#')[1];
            $('#J_maxBonus').html(Betting.formatNumber(_data.maxBonus * 10000 * _unit / 10000, 4));
        },
        renderBettingRule: function(mainNavType, subNavType) {
            // 渲染玩法说明
            var _data = TEMPLATE[mainNavType]({
                type: subNavType
            });
            $('#J_bettingRule').html(_data.rule);
        },
        renderSubMenu: function(mainNavType) {
            // 渲染次级菜单
            var _html = TEMPLATE[mainNavType]();
            if (_html && _html.dom) {
                $('#J_subMenuList').html(_html.dom);
            }
            if (_html && _html.rule) {
                $('#J_bettingRule').html(_html.rule);
            }

            Betting.renderSelectArea();
        },
        quicklySelect: function(elm, need, not) {
            var _subNav = ($('.J_subMenu.active').length ? $('.J_subMenu.active').data('info').split('#')[1] : _mainNav);
            if(Betting.playCode == '11X5' || Betting.playCode == 'PK10' && -1 == _subNav.indexOf("BSOE_PK10")) {
                if(need == ':odd' && not == ':even'){
                    not = ':odd';
                    need = ':even';
                } else if(need == ':even' && not == ':odd'){
                    need = ':odd';
                    not = ':even';
                }

                if(_subNav == 'rdDigit_11X5'){
                    if(need == ':gt(4)'){
                        need = ':gt(2)';
                    } else if(need == ':lt(5)'){
                        need = ':lt(3)';
                        not = ':gt(2)';
                    }
                }
            }

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
            var _mainNav = $('.J_withChild.active').data('info').split('#')[1];
            var _type = ($('.J_subMenu.active').length ? $('.J_subMenu.active').data('info').split('#')[1] : _mainNav);
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
            var _mainNav = $('.J_withChild.active').data('info').split('#')[1];
            var _subNav = ($('.J_subMenu.active').length ? $('.J_subMenu.active').data('info').split('#')[1] : _mainNav);
            var a = true;
            // console.log(_subNav);
            var b = TEMPLATE.allManualEntryEvents(_subNav);
            console.log(b);
            if (_subNav == 'Last3Com' || _subNav == 'First3Com' || _subNav == 'Middle3Com' || _subNav == 'Last3Com_LF' || _subNav == 'P3Com_LF' || _subNav == 'Any3Com_SSC') {
                a = false;
            }

            if ("11X5" == Betting.playCode || "PK10" == Betting.playCode) {
                // var k = {};
                // for (var i = 0; i < b.bits.length; i++) {
                //     if("11X5" == Betting.playCode || "PK10" == Betting.playCode && -1 == _subNav.indexOf("BSOE_PK10")) {
                //         k[b.bits[i]] = [];
                //         console.log()
                //     }
                // }
                // console.log(k);
                // b.bits.push(k);
                // console.log(b);
                Betting.calculateESFManualEntryStakes(b, Betting.playCode);
            } else if ("Any2_Single" == _subNav || "Any3_Single" == _subNav || "Any4_Single" == _subNav || "Any3Com_SSC" == _subNav || "Any2Com_SSC_Single" == _subNav) {
                var d = $('#J_nowChoseNum').text();

                if (b.len > 1 * d){
                        layer.alert('请至少选择'+ b.len +'个位置<br/>您当前选择了' + d + '个位置', {
                        skin: 'bett-alert-dialog',
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
            // var _subNav = ($('.J_subMenu.active').length ? $('.J_subMenu.active').data('info').split('#')[1] : _mainNav);
            // var a = true;
            // var b = TEMPLATE.allManualEntryEvents(_subNav);
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
                        skin: 'bett-alert-dialog',
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
                        skin: 'bett-alert-dialog',
                        icon: 2
                    });
                    return false;
                }

                if (objFile.value == "") {
                    layer.alert('号码不能为空', {
                        skin: 'bett-alert-dialog',
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
                    skin: 'bett-alert-dialog',
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
        ESFManualEntryDisassemble: function(a, b) {
            if (/[A-Za-z\u4E00-\u9FFF]/.test(a)){
                $('#J_ballInputArea').blur();
                return  0;
            }
            var c;
            return c = "11X5" == b ? a.replace(/[^\d\r\n\f,;]+/g, "") : a.replace(/[^\d\r\n\f\s,;]+/g, ""), c = c.replace(/[^\d\d]+/g, "@"), ("@" == c.substring(c.length - 1) ? c.substring(0, c.length - 1) : c).split("@")
        },
        esfEntryRegular: function(a, b) {
            for (var c = /^0[1-9]|1[01]*$/, d = 0; d < a.length; d++) {
                if (!c.test(a[d])) return !1;
                for (var e = 0; e < b.length; e++)
                    if (d != e && a[d] == b[e]) return !1
            }
            return !0
        },
        calculateESFManualEntryStakes: function(a, b) {
            console.log('calculateESFManualEntryStakes');
            console.log(a);
            console.log(b);
            Betting.textArea = [];
            var _mainNav = $('.J_withChild.active').data('info').split('#')[1];
            var _subNav = ($('.J_subMenu.active').length ? $('.J_subMenu.active').data('info').split('#')[1] : _mainNav);
            var c = $("#J_ballInputArea").val(),
                d = Betting.ESFManualEntryDisassemble(c, b);
            if (0 != d.length) {
                for (var e = 0, f = [], g = 0; g < d.length; g++) {
                    var h = "",
                        i = "",
                        j = "";
                    /^[0-9]*$/.test(d[g]) && d[g].length == 1 * a.len && (4 == d[g].length && ("First2Straight_11X5_Single" == _subNav || "First2_PK10_Single" == _subNav ? (j = d[g].replace(/(?=(\d{2})+(\D|$))/g, "$2_").substring(1), h = j.split("_"), i = j.split("_")) : (j = d[g].replace(/(?=(\d{2})+(\D|$))/g, "$2-").substring(1), h = j.split("-"), i = j.split("-"))), 6 == d[g].length && ("First3Straight_11X5_Single" == _subNav || "First3_PK10_Single" == _subNav ? (j = d[g].replace(/(?=(\d{2})+(\D|$))/g, "$2_").substring(1), h = j.split("_"), i = j.split("_")) : (j = d[g].replace(/(?=(\d{2})+(\D|$))/g, "$2-").substring(1), h = j.split("-"), i = j.split("-"))), 8 != d[g].length && 10 != d[g].length && 12 != d[g].length && 14 != d[g].length && 16 != d[g].length || ("First4_PK10_Single" == _subNav || "First5_PK10_Single" == _subNav ? (j = d[g].replace(/(?=(\d{2})+(\D|$))/g, "$2_").substring(1), h = j.split("_"), i = j.split("_")) : (j = d[g].replace(/(?=(\d{2})+(\D|$))/g, "$2-").substring(1), h = j.split("-"), i = j.split("-"))), Betting.esfEntryRegular(h, i) && (f.push(j), e += 1 * a.stakes))
                }
                if (f.length > 0) {
                    var k = {
                        ball: f.join(","),
                        stakes: e,
                        type: 2,
                        digit: a.digit
                    };
                    "PK10" == b && (k.type = 1), Betting.textArea.push(k)
                }
                console.log(e);
                // console.log(Betting.textArea);
                // lott.calculateAmount(e)
                Betting.calculateAmount(e);
            }
        },
        calculateSSCAnyManualEntryStakes: function(a) {
            // 时时彩任选的时候文本域事件
            Betting.textArea = [];
            var _mainNav = $('.J_withChild.active').data('info').split('#')[1];
            var _subNav = ($('.J_subMenu.active').length ? $('.J_subMenu.active').data('info').split('#')[1] : _mainNav);
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
                    Betting.textArea.push(j);
                }

                Betting.calculateAmount(d, $('#J_planNum').text());
            }
        },
        calculateSSCManualEntryStakes: function(a, b) {
            // 时时彩的普通文本域事件
            // TEMPLATE.sameComparer()
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
        },
        numberRandom: function(a, b, c) {
            for (var d = [c], e = 0; e < c; e++) {
                var f = 0;
                do {
                    var g = !1;
                    f = Math.floor(Math.random() * (b - a + 1)) + a, -1 != d.indexOf(f) && (g = !0)
                } while (g);
                d[e] = f
            }
            return d
        },
        arrRandom: function(a, b, c, d, e) {
            var f = new Array;
            switch (d) {
                case 3:
                    for (var g = a; g <= b; g++) /^(\d)\1\1$/.test(g) || (f[g] = g);
                    break;
                case 2:
                    for (var g = a; g <= b; g++) /^(\d)\1$/.test(g) || (f[g] = g);
                    break;
                case 0:
                    for (var g = a; g <= b; g++) f[g] = g
            }
            f.sort(function() {
                return .5 - Math.random()
            });
            for (var h = [], g = 0; g < c; g++) e ? h.push(Betting.addZero(f[g] + "", (b + "").length)) : h.push(f[g] + "");
            return h
        },
        addZero: function(a, b) {
            if (a.length > 1 * b) return "";
            for (var c = "", d = 0; d < 1 * b - a.length; d++) c += "0";
            return c + a
        }
    }

    Betting.init();
});