/**
 * [TEMPLATE description]
 * @type {Object}
 * @dom : subNav DOM结构
 * @rule : 玩法说明
 * @maxBonus : 最高奖金
 *
 * @opt : 显示配置
 * haveCheckbox ：是否有复选框
 * defaultCheck 默认选中个数
 * haveTextarea ：是否有上传文本域
 * numList ：是否有号码列表(0-9)
 * numNameList ：号码对应的名称
 *  第一种输出方式：
 *     // FIFTH : 个位
 *     // FOURTH : 十位
 *     // THIRD : 百位
 *     // SECOND : 千位
 *     // FIRST : 万位
 *  另一种输出方式：
 *      //FIRST#组选  显示组选，实则为万位【参见五星组选120】
 * 
 * quickFast ：是否有快捷选号(全、大、小、奇、偶、清)
 * multipleChoice ：一行是否可以选择多个号码
 * maxSelect: 最多可选个数
 * minSelect: 最少选择个数
 * noAllFastBtn : 没有 全 选快捷按钮，默认是有的（值为：undefined/false）。取值为true时表示不需要
 * type : 选号类型 ball : 号码选号，text : 文本域 sum:和值 mixing : 混合组选 mixingAny : 不定位组选 taste : 趣味
 * formula : 注数的计算方法
 * ajaxType : 后台接受的type值
 * sumType : 和值类型
 */
var TEMPLATE = {
    factorial: function(a) {
        for (var b = 1, c = 1; c <= a; c += 1) b *= c;
        return b
    },
    first2StraightOf11X5: function(a, b) {
        for (var c = 0, d = 0; d < a.length; d++)
            if ("" != a[d])
                for (var e = 0; e < b.length; e++) "" != b[e] && a[d] != b[e] && c++;
        return c
    },
    first3StraightOf11X5: function(a, b, c) {
        for (var d = 0, e = 0; e < a.length; e++)
            if ("" != a[e])
                for (var f = 0; f < b.length; f++)
                    if ("" != b[f] && a[e] != b[f])
                        for (var g = 0; g < c.length; g++) "" != c[g] && a[e] != c[g] && b[f] != c[g] && d++;
        return d
    },
    first4StraightOf11X5: function(a, b, c, d) {
        for (var e = 0, f = 0; f < a.length; f++)
            if ("" != a[f])
                for (var g = 0; g < b.length; g++)
                    if ("" != b[g] && a[f] != b[g])
                        for (var h = 0; h < c.length; h++)
                            if ("" != c[h] && a[f] != c[h] && b[g] != c[h])
                                for (var i = 0; i < d.length; i++) "" != d[i] && a[f] != d[i] && b[g] != d[i] && c[h] != d[i] && e++;
        return e
    },
    first5StraightOf11X5: function(a, b, c, d, e) {
        for (var f = 0, g = 0; g < a.length; g++)
            if ("" != a[g])
                for (var h = 0; h < b.length; h++)
                    if ("" != b[h] && a[g] != b[h])
                        for (var i = 0; i < c.length; i++)
                            if ("" != c[i] && a[g] != c[i] && b[h] != c[i])
                                for (var j = 0; j < d.length; j++)
                                    if ("" != d[j] && a[g] != d[j] && b[h] != d[j] && c[i] != d[j])
                                        for (var k = 0; k < e.length; k++) "" != d[j] && a[g] != e[k] && b[h] != e[k] && c[i] != e[k] && d[j] != e[k] && f++;
        return f
    },
    sumAndPoint: function(x, options, type) {
        // 和值求注数
        var c = TEMPLATE.getSubNumList(type);
        $('.J_numWrp').each(function(i){
            $(this).data('num', c[i]);
        });

        var _curChose = '';
        $('.J_numWrp.active').each(function(){
            _curChose += ',' + $(this).text() + '#' + $(this).data('num');
        });

        if (!options.hasSelect) {
            var g = ',' + options.text + '#' + c[options.index];
            var h = 0;
            if (_curChose.length > 1){
                for (var i = _curChose.substring(1).split(","), j = 0; j < i.length; j++) {
                    var k = i[j].split("#");
                    h = 1 * h + 1 * k[1]
                }
            }
            _num = h;
        } else {
            var h = 0;
            for (var h = 0, i = _curChose.substring(1).split(","), j = 0; j < i.length; j++) {
                var k = i[j].split("#");
                h = 1 * h + 1 * k[1]
            }
            _num = h;
        }

        return _num;
    },
    getSubNumList: function(type) {
        var _arr = [];

        switch(type){
            case '3rd':
                _arr = [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 63, 69, 73, 75, 75, 73, 69, 63, 55, 45, 36, 28, 21, 15, 10, 6, 3, 1]; 
            break;
            case '3rdx':
                _arr = [1, 1, 2, 3, 4, 5, 7, 8, 10, 12, 13, 14, 15, 15, 15, 15, 14, 13, 12, 10, 8, 7, 5, 4, 3, 2, 1, 1]; 
            break;
            case '2nd':
                _arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]; 
            break;
            case '2ndx':
                _arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1]; 
            break;
            case '3rdz':
                _arr = [1, 2, 2, 4, 5, 6, 8, 10, 11, 13, 14, 14, 15, 15, 14, 14, 13, 11, 10, 8, 6, 5, 4, 2, 2, 1]; 
            break;
            case '2rdz':
                _arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 4, 4, 3, 3, 2, 2, 1, 1]; 
            break;
            case '3rpk':
                _arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; 
            break;
            case '2rpk':
                _arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; 
            break;
            case 'k3sum':
                _arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; 
            break;
        }
        return _arr;
    },
    sameComparer: function(a, b) {
        // 同一比较
        var c, d, e = 0;
        if ("string" == typeof a && "string" == typeof b) {
            if ("" == a || "" == b) return e;
            a = a.replace(/([0-9#])(?=([0-9#]{1})+([^0-9#]|$))/g, "$1_"), c = a.split("_"), b = b.replace(/([0-9#])(?=([0-9#]{1})+([^0-9#]|$))/g, "$1_"), d = b.split("_")
        } else c = a, d = b;
        for (var f = 0; f < c.length; f++) d.indexOf(c[f]) > -1 && e++;
        return e
    },
    allManualEntryEvents: function(subNav) {
        // 所有手动输入事件。textarea
        var a = {};
        switch (subNav) {
            case "Any2_11X5_Single":
                a.bits = ["NONE"], a.miBall = 2, a.stakes = 1, a.len = 4, a.digit = "", a.eg = "01 02 03,01 02 03\n01 02 03;01 02 03";
                break;
            case "Any3_11X5_Single":
                a.bits = ["NONE"], a.miBall = 3, a.stakes = 1, a.len = 6, a.digit = "", a.eg = "01 02 03,01 02 03\n01 02 03;01 02 03";
                break;
            case "Any4_11X5_Single":
                a.bits = ["NONE"], a.miBall = 4, a.stakes = 1, a.len = 8, a.digit = "", a.eg = "01 02 03 04,01 02 03 04\n01 02 03 04;01 02 03 04";
                break;
            case "Any5_11X5_Single":
                a.bits = ["NONE"], a.miBall = 5, a.stakes = 1, a.len = 10, a.digit = "", a.eg = "01 02 03 04 05,01 02 03 04 05\n01 02 03 04 05;01 02 03 04 05";
                break;
            case "Any6_11X5_Single":
                a.bits = ["NONE"], a.miBall = 6, a.stakes = 1, a.len = 12, a.digit = "", a.eg = "01 02 03 04 05 06,01 02 03 04 05 06\n01 02 03 04 05 06;01 02 03 04 05 06";
                break;
            case "Any7_11X5_Single":
                a.bits = ["NONE"], a.miBall = 7, a.stakes = 1, a.len = 14, a.digit = "", a.eg = "01 02 03 04 05 06 07,01 02 03 04 05 06 07\n01 02 03 04 05 06 07;01 02 03 04 05 06 07";
                break;
            case "Any8_11X5_Single":
                a.bits = ["NONE"], a.miBall = 8, a.stakes = 1, a.len = 16, a.digit = "", a.eg = "01 02 03 04 05 06 07 08,01 02 03 04 05 06 07 08\n01 02 03 04 05 06 07 08;01 02 03 04 05 06 07 08";
                break;
            case "First3Straight_11X5_Single":
                a.bits = ["FIRST", "SECOND", "THIRD"], a.miBall = 1, a.stakes = 1, a.len = 6, a.digit = "", a.eg = "01 02 03,01 02 03\n01 02 03;01 02 03";
                break;
            case "First3Com_11X5_Single":
                a.bits = ["ANY"], a.miBall = 3, a.stakes = 1, a.len = 6, a.digit = "", a.eg = "01 02 03,01 02 03\n01 02 03;01 02 03";
                break;
            case "First2Straight_11X5_Single":
                a.bits = ["FIRST", "SECOND"], a.miBall = 1, a.stakes = 1, a.len = 4, a.digit = "", a.eg = "01 02 03,01 02 03\n01 02 03;01 02 03";
                break;
            case "First2Com_11X5_Single":
                a.bits = ["ANY"], a.miBall = 2, a.stakes = 1, a.len = 4, a.digit = "", a.eg = "01 02 03,01 02 03\n01 02 03;01 02 03";
                break;
            case "P3Last2Straight_LF_Single":
                a.bits = ["SECOND", "THIRD"], a.miBall = 1, a.stakes = 1, a.len = 2, a.digit = "2", a.eg = "12 34\n12,34\n12;34";
                break;
            case "Last2Straight_LF_Single":
            case "P5Last2Straight_LF_Single":
                a.bits = ["FOURTH", "FIFTH"], a.miBall = 1, a.stakes = 1, a.len = 2, a.digit = "", a.eg = "12 34\n12,34\n12;34";
                break;
            case "P3Straight_LF_Single":
                a.bits = ["FIRST", "SECOND", "THIRD"], a.miBall = 1, a.stakes = 1, a.len = 3, a.digit = "2", a.eg = "123 456\n123,456\n123;456";
                break;
            case "Last3Straight_LF_Single":
                a.bits = ["THIRD", "FOURTH", "FIFTH"], a.miBall = 1, a.stakes = 1, a.len = 3, a.digit = "", a.eg = "123 456\n123,456\n123;456";
                break;
            case "P5First2Straight_LF_Single":
                a.bits = ["FIRST", "SECOND"], a.miBall = 1, a.stakes = 1, a.len = 2, a.digit = "3", a.eg = "12 34\n12,34\n12;34";
                break;
            case "First2Straight_LF_Single":
                a.bits = ["THIRD", "FOURTH"], a.miBall = 1, a.stakes = 1, a.len = 2, a.digit = "1", a.eg = "12 34\n12,34\n12;34";
                break;
            case "Last2Straight_Single":
                a.bits = ["FOURTH", "FIFTH"], a.miBall = 1, a.stakes = 1, a.len = 2, a.digit = "", a.eg = "12 34\n12,34\n12;34";
                break;
            case "Last2Join_Single":
                a.bits = ["FOURTH", "FIFTH"], a.miBall = 1, a.stakes = 2, a.len = 2, a.digit = "", a.eg = "12 34\n12,34\n12;34";
                break;
            case "Last3Straight_Single":
                a.bits = ["THIRD", "FOURTH", "FIFTH"], a.miBall = 1, a.stakes = 1, a.len = 3, a.digit = "", a.eg = "123 456\n123,456\n123;456";
                break;
            case "Last3Join_Single":
                a.bits = ["THIRD", "FOURTH", "FIFTH"], a.miBall = 1, a.stakes = 3, a.len = 3, a.digit = "", a.eg = "123 456\n123,456\n123;456";
                break;
            case "All5Straight_Single":
            case "All5All_Single":
                a.bits = ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], a.miBall = 1, a.stakes = 1, a.len = 5, a.digit = "", a.eg = "12345 67890\n12345,67890\n12345;67890";
                break;
            case "All5Join_Single":
                a.bits = ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], a.miBall = 1, a.stakes = 5, a.len = 5, a.digit = "", a.eg = "12345 67890\n12345,67890\n12345;67890";
                break;
            case "First2Straight_Single":
                a.bits = ["FIRST", "SECOND"], a.miBall = 1, a.stakes = 1, a.len = 2, a.digit = "3", a.eg = "12 34\n12,34\n12;34";
                break;
            case "First2Join_Single":
                a.bits = ["FIRST", "SECOND"], a.miBall = 1, a.stakes = 2, a.len = 2, a.digit = "3", a.eg = "12 34\n12,34\n12;34";
                break;
            case "First3Straight_Single":
                a.bits = ["FIRST", "SECOND", "THIRD"], a.miBall = 1, a.stakes = 1, a.len = 3, a.digit = "2", a.eg = "123 456\n123,456\n123;456";
                break;
            case "First3Join_Single":
                a.bits = ["FIRST", "SECOND", "THIRD"], a.miBall = 1, a.stakes = 3, a.len = 3, a.digit = "2", a.eg = "123 456\n123,456\n123;456";
                break;
            case "Last4Straight_Single":
                a.bits = ["SECOND", "THIRD", "FOURTH", "FIFTH"], a.miBall = 1, a.stakes = 1, a.len = 4, a.digit = "", a.eg = "1234 5678\n1234,5678\n1234;5678";
                break;
            case "Last4Join_Single":
                a.bits = ["SECOND", "THIRD", "FOURTH", "FIFTH"], a.miBall = 1, a.stakes = 4, a.len = 4, a.digit = "", a.eg = "1234 5678\n1234,5678\n1234;5678";
                break;
            case "First4Straight_Single":
                a.bits = ["FIRST", "SECOND", "THIRD", "FOURTH"], a.miBall = 1, a.stakes = 1, a.len = 4, a.digit = "1", a.eg = "1234 5678\n1234,5678\n1234;5678";
                break;
            case "First4Join_Single":
                a.bits = ["FIRST", "SECOND", "THIRD", "FOURTH"], a.miBall = 1, a.stakes = 4, a.len = 4, a.digit = "1", a.eg = "1234 5678\n1234,5678\n1234;5678";
                break;
            case "Middle3Straight_Single":
                a.bits = ["SECOND", "THIRD", "FOURTH"], a.miBall = 1, a.stakes = 1, a.len = 3, a.digit = "1", a.eg = "123 456\n123,456\n123;456";
                break;
            case "Middle3Join_Single":
                a.bits = ["SECOND", "THIRD", "FOURTH"], a.miBall = 1, a.stakes = 3, a.len = 3, a.digit = "1", a.eg = "123 456\n123,456\n123;456";
                break;
            case "Any2_Single":
                a.bits = ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], a.miBall = 0, a.stakes = 1, a.len = 2, a.digit = "", a.eg = "12 34\n12,34\n12;34";
                break;
            case "Any3_Single":
                a.bits = ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], a.miBall = 0,
                    a.stakes = 1, a.len = 3, a.digit = "", a.eg = "123 456\n123,456\n123;456";
                break;
            case "Any4_Single":
                a.bits = ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], a.miBall = 0, a.stakes = 1, a.len = 4, a.digit = "", a.eg = "1234 5678\n1234,5678\n1234;5678";
                break;
            case "Any2Com_SSC_Single":
                a.bits = ["ANY"], a.miBall = 1, a.stakes = 1, a.len = 2, a.digit = "", a.eg = "12 34\n12,34\n12;34";
                break;
            case "First2_PK10_Single":
                a.bits = ["FIRST", "SECOND"], a.miBall = 1, a.stakes = 1, a.len = 4, a.digit = "", a.eg = "0102 0102\n0102,0102\n0102;0102";
                break;
            case "First3_PK10_Single":
                a.bits = ["FIRST", "SECOND", "THIRD"], a.miBall = 1, a.stakes = 1, a.len = 6, a.digit = "", a.eg = "010203 010203\n010203,010203\n010203;010203";
                break;
            case "First4_PK10_Single":
                a.bits = ["FIRST", "SECOND", "THIRD", "FOURTH"], a.miBall = 1, a.stakes = 1, a.len = 8, a.digit = "", a.eg = "01020304 01020304\n01020304,01020304\n01020304;01020304";
                break;
            case "First5_PK10_Single":
                a.bits = ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], a.miBall = 1, a.stakes = 1, a.len = 10, a.digit = "", a.eg = "0102030405 0102030405\n0102030405,0102030405\n0102030405;0102030405";
                break;
            case "Last3Com":
                a.digit = "";a.stakes = 1,a.len = 3,a.eg = "122 123 211\n123,241,212\n122;221";
                break;
            case "First3Com":
                a.digit = "2";a.stakes = 1,a.len = 3,a.eg = "122 123 211\n123,241,212\n122;221";
                break;
            case "Middle3Com":
                a.digit = "1";a.stakes = 1,a.len = 3,a.eg = "122 123 211\n123,241,212\n122;221";
                break;
            case "Last3Com_LF":
                a.digit = "";a.stakes = 1,a.len = 3,a.eg = "122 123 211\n123,241,212\n122;221";
                break;
            case "P3Com_LF":
                a.digit = "2";a.stakes = 1,a.len = 3,a.eg = "122 123 211\n123,241,212\n122;221";
                break;
            case "Any3Com_SSC":
                a.digit = "";a.stakes = 1,a.len = 3,a.eg = "122 123 211\n123,241,212\n122;221";
        }

        return a;
        // console.log(a);
        // lott.manualEntryUI(!0, a),
        // lott.allManualEntryRandomBall(a.bits, a.miBall, a.digit)
    },

//    
    getChaseData: function(name, currentPeriods) {
        currentPeriods = '20170719-001';
        // console.log(name, currentPeriods);
        // name : 游戏名称 如 ： chong_qing_shi_shi
        // currentPeriods ： 当前期数 如 : 20170719-088
        var data = {
            totalPeriods : 0,   //一天最多的期数
            maxPeriods : 0,     //最多可追的期数
        };
        var _str = '';
        // var _now = new Date();
        // var _y = _now.getFullYear();
        // var _m = ((_now.getMonth() + 1) < 10 ? '0' + (_now.getMonth()+1) : (_now.getMonth()+1));
        // var _d = (_now.getDate()< 10 ? '0' + _now.getDate() : _now.getDate());

        var _d0 = getDay(0);
        var _d1 = getDay(1);
        var _d2 = getDay(2);

        // console.log(_d0);
        // console.log(_d1);
        // console.log(_d2);

        // var str = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
        switch(name){
            case 'chong_qing_shi_shi':
                data.totalPeriods = 120;
                data.maxPeriods = 240;
                var _n = Number(currentPeriods.split('-')[1]);
                var _lave = data.totalPeriods - _n + 1;
                var _s = '(当前)';
                
                for (var i = 0; i < data.maxPeriods; i++) {
                    if (i > 0) {
                        _s = '';
                    }

                    if (_lave == data.totalPeriods) {
                        if (i < data.totalPeriods) {
                            _str += '<option value="'+ i +'">'+ _d0.tYear + _d0.tMonth + _d0.tDate + '-' + toThree(_n+i) + _s +'</option>';
                        } else {
                            _str += '<option value="'+ i + '">'+ _d1.tYear + _d1.tMonth + _d1.tDate + '-' + toThree(_n+i-data.totalPeriods) + '</option>';
                        }
                    } else {
                        if (i < _lave) {
                            _str += '<option value="' + i + '">'+ _d0.tYear + _d0.tMonth + _d0.tDate + '-' + toThree(_n+i) + _s +'</option>';
                        } else if(_lave <= i && i < (_lave + data.totalPeriods)){
                            _str += '<option value="'+ i + '">'+ _d1.tYear + _d1.tMonth + _d1.tDate + '-' + toThree(_n+i-data.totalPeriods) + '</option>';
                        } else {
                            _str += '<option value="'+ i + '">'+ _d2.tYear + _d2.tMonth + _d2.tDate + '-' + toThree(i - data.totalPeriods - _lave + 1) + '</option>';
                        }
                    }
                }
                data.select = _str;
            break
        }

        function toThree(num) {
            var _n = num;
            if (_n < 100) {
                if (_n < 10) {
                    _n = '00' + _n;
                } else {
                    _n = '0' + _n;
                }
            }
            return _n;
        }

        function getDay(day) {
            var today = new Date();
            var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
            today.setTime(targetday_milliseconds);
            var tYear = today.getFullYear();
            var tMonth = today.getMonth();
            var tDate = today.getDate();
            tMonth = doHandleMonth(tMonth + 1);
            tDate = doHandleMonth(tDate);

            return {
                tYear : tYear,
                tMonth : tMonth,
                tDate : tDate
            }
        }

        function doHandleMonth(month) {
            var m = month;
            if (month.toString().length == 1) {
                m = "0" + month;
            }
            return m;
        }

        return data;
    },

        
//  ████╗ ████╗ ███╗ 
// █╬═══╝█╬═══╝█╬══█╗
// █║    █║    █║  ╚╝
// ╚███╗ ╚███╗ █║    
//  ╚══█╗ ╚══█╗█║    
//     █║    █║█║  █╗
// ████╬╝████╬╝╚███╬╝
// ╚═══╝ ╚═══╝  ╚══╝ 

    // 时时彩
    All_5: function(options) {
        /* 五星 */
        options = options || {};
        options.type = options.type || 'All5Straight';

        var _rule = '';
        var _opt = {
            haveCheckbox: false,
            haveTextarea: false,
            placeholder: '',
            numList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            numNameList: ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH'],
            quickFast: true,
            multipleChoice: true,
            minSelect: 1,
            maxSelect: 10,
            type: 'ball',
            formula: null,
            ajaxType: ''
        };

        var _maxBonus = '170000.0000';
        switch (options.type) {
            case 'All5Straight':
                _rule = '从万位、千位、百位、十位、个位中分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：万位选择1，千位选择2，百位选择3，十位选择4，个位选择5，开奖号码为12345，即为中奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length;
                }
                _opt.ajaxType = 'all5';
                break;
            case 'All5Straight_Single':
                _rule = '"手动输入一个5位数号码组成一注，所选号码的万位、千位、百位、十位、个位与开奖号码相同，且顺序一致，即为中奖。如：选择12345，开奖号码为12345，即为中奖。"';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n12345 67890\n12345,67890\n12345;67890\n';
                _opt.numList = [];
                _opt.type = 'text';
                // a.miBall = 1, a.stakes = 1, a.len = 5, a.digit = "",
                _opt.numNameList = [];
                // _opt.formula = function(a){
                //     return console.log('对应 allManualEntryEvents');
                // };
                _opt.ajaxType = 'allS5';
                break;
            case 'All5All':
                _maxBonus = '34000.0000';
                _rule = '从万位、千位、百位、十位、个位中各选一个号码投注，若所选号码与开奖号码数字全部相同且顺序一致，即中一等奖；若所选号码与开奖号码的前三或后三号码相同且顺序一致，即中二等奖；若所选号码与开奖号码的前二或后二号码相同且顺序一致，即中三等奖。 如：选择54321，开奖号码为54321，即中一等奖，开奖号码为543**、**321，即中二等奖，开奖号码为54***、***21，即中三等奖。';
                _opt.quickFast = false;
                _opt.multipleChoice = false;
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length;
                };
                _opt.ajaxType = 'varied5';
                break;
            case 'All5All_Single':
                _maxBonus = '34000.0000';
                _rule = '"手动输入一个5位数号码组成一注，所选号码与开奖号码数字全部相同且顺序一致，即中一等奖；前三或后三号码相同且顺序一致，即中二等奖；前二或后二号码相同且顺序一致，即中三等奖。如：选择54321，开奖号码为54321，即中一等奖，开奖号码为543**、**321，即中二等奖，开奖号码为54***、***21，即中三等奖。"';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n12345 67890\n12345,67890\n12345;67890\n';
                _opt.numList = [];
                _opt.type = 'text';
                // a.miBall = 1, a.stakes = 1, a.len = 5, a.digit = ""
                _opt.numNameList = [];
                // _opt.formula = function(a){
                //     return console.log('对应 allManualEntryEvents');
                // };
                _opt.ajaxType = 'variedS5';
                break;
            case 'All5Join':
                _rule = '从万位、千位、百位、十位、个位中分别选择1个或多个号码投注，所选号码与开奖号码数字全部相同且顺序一致，即中一等奖；所选号码千位、百位、十位、个位与开奖号码相同，即中二等奖；所选号码百位、十位、个位与开奖号码相同，即中三等奖；所选号码十位、个位与开奖号码相同，即中四等奖；所选号码个位与开奖号码相同，即中五等奖。 如：万位选择1，千位选择2，百位选择3，十位选择4，个位选择5，开奖号码为12345，即中一等奖，开奖号码为*2345，即中二等奖，开奖号码为**345，即中三等奖，开奖号码为***45即中四等奖，开奖号码为****5即中五等奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[4]].length;
                };
                _opt.ajaxType = 'join5';
                break;
            case 'All5Join_Single':
                _rule = '"手动输入一个5位数号码组成一注，所选号码与开奖号码数字全部相同且顺序一致，即中一等奖；所选号码千位、百位、十位、个位与开奖号码相同，即中二等奖，依次类推。如：选择12345，开奖号码为12345即中一等奖，开奖号码为*2345即中二等奖，依次类推。"';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n12345 67890\n12345,67890\n12345;67890\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                // _opt.formula = function(a){
                //     return console.log('对应 allManualEntryEvents');
                // };
                _opt.ajaxType = 'joinS5';
                break;
            case 'AllCom120':
                _maxBonus = '1416.6666';
                _rule = '从0-9中任意选择5个号码组成一注，所选号码与开奖号码的万、千、百、十、个位相同，顺序不限，即为中奖。例：投注方案：10568开奖号码：10568（顺序不限）即为中奖。';
                _opt.numNameList = ['NONE#组选'];
                _opt.minSelect = 5;
                _opt.formula = function(a){
                    var b = a[a.length - 1][a[0]].length;
                    return (b - 4) * (b - 3) * (b - 2) * (b - 1) * b / 120
                };
                _opt.ajaxType = 'group5';
                break;
            case 'AllCom60':
                _maxBonus = '2833.3334';
                _rule = '选择1个二重号码和3个单号号码组成一注，所选的单号号码与开奖号码相同，且所选二重号码在开奖号码中出现了2次，即为中奖。例：投注方案：二重号8，单号016开奖号码：01688（顺序不限）即为中奖。';
                _opt.numNameList = ['NONE1#二重号', 'NONE2#单号'];
                _opt.teamMinSelect = {
                    NONE1 : 1,
                    NONE2 : 3
                };
                _opt.formula = function(a){
                    var b = a[a.length - 1][a[0]].length,
                        c = b > 0 ? a[a.length - 1][a[1]].length : 0;
                    return c * (c - 2) * (c - 1) / 6 * b - TEMPLATE.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]]) * ((c - 2) * (c - 1)) / 2
                };
                _opt.ajaxType = 'group5t60';
                break;
            case 'AllCom30':
                _maxBonus = '5666.6666';
                _rule = '选择2个二重号和1个单号号码组成一注，所选的单号号码与开奖号码相同，且所选的2个二重号吗分别在开奖号码中出现了2次，即为中奖。例：投注方案：二重号68，单号0开奖号码：06688（顺序不限）';
                _opt.numNameList = ['NONE1#二重号', 'NONE2#单号'];
                _opt.teamMinSelect = {
                    NONE1 : 2,
                    NONE2 : 1
                };
                _opt.formula = function(a){
                    var b = a[a.length - 1][a[0]].length;
                    return a[a.length - 1][a[1]].length * ((b - 1) * b) / 2 - TEMPLATE.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]]) * (b - 1)
                };
                _opt.ajaxType = 'group5t30';
                break;
            case 'AllCom20':
                _maxBonus = '8500.0000';
                _rule = '选择1个三重号码和2个单号号码组成一注，所选的单号号码与开奖号码相同，且所选三重号码在开奖号码中出现了3次，即为中奖。例：投注方案：三重号8，单号01开奖号码：01888（顺序不限）即为中奖。';
                _opt.numNameList = ['NONE1#三重号', 'NONE2#单号'];
                _opt.teamMinSelect = {
                    NONE1 : 1,
                    NONE2 : 2
                };
                _opt.formula = function(a){
                    var b = a[a.length - 1][a[0]].length,
                            c = a[a.length - 1][a[1]].length;
                    return b * ((c - 1) * c) / 2 - TEMPLATE.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]]) * (c - 1)
                };
                _opt.ajaxType = 'group5t20';
                break;
            case 'AllCom10':
                _rule = '选择1个三重号吗和1个二重号吗，所选三重号码在开奖号码中出现3次，并且所选二重号吗在开奖号码中出现了2次，即为中奖。例：投注方案：三重号8，二重号1开奖号码：11888（顺序不限）即为中奖。';
                _opt.numNameList = ['NONE1#三重号', 'NONE2#二重号'];
                _opt.teamMinSelect = {
                    NONE1 : 1,
                    NONE2 : 1
                };
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length - TEMPLATE.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]])
                };
                _opt.ajaxType = 'group5t10';
                break;
            case 'AllCom5':
                _maxBonus = '34000.0000';
                _rule = '选择1个四重号码和1个单号号码组成一注，所选的单号存在与开奖号码中，且所选四重号码在开奖号码中出现了4次，即为中奖。例：投注方案：四重号8，单号1开奖号码：18888（顺序不限）即为中奖。';
                _opt.numNameList = ['NONE1#四重号', 'NONE2#单号'];
                _opt.teamMinSelect = {
                    NONE1 : 1,
                    NONE2 : 1
                };
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length - TEMPLATE.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]])
                };
                _opt.ajaxType = 'group5t5';
                break;
        }

        var _str = ''; //subNav DOM结构
        _str += '<dl>';
        _str += '    <dt>直选：</dt>';
        _str += '    <dd id="J_All5Straight" class="J_subMenu active" data-info="31#All5Straight#2">五星直选</dd>';
        _str += '    <dd id="J_All5Straight_Single" class="J_subMenu" data-info="80#All5Straight_Single#2">五星直选（单式）</dd>';
        _str += '    <dd id="J_All5All" class="J_subMenu" data-info="32#All5All#2">五星通选</dd>';
        _str += '    <dd id="J_All5All_Single" class="J_subMenu" data-info="81#All5All_Single#2">五星通选（单式）</dd>';
        _str += '    <dd id="J_All5Join" class="J_subMenu" data-info="33#All5Join#2">五星连选</dd>';
        _str += '    <dd id="J_All5Join_Single" class="J_subMenu" data-info="82#All5Join_Single#2">五星连选（单式）</dd>';
        _str += '</dl>';
        _str += '<dl>';
        _str += '    <dt>组选：</dt>';
        _str += '    <dd id="J_AllCom120" class="J_subMenu" data-info="1601#AllCom120#2">五星组选120</dd>';
        _str += '    <dd id="J_AllCom60" class="J_subMenu" data-info="1602#AllCom60#2">五星组选60</dd>';
        _str += '    <dd id="J_AllCom30" class="J_subMenu" data-info="1603#AllCom30#2">五星组选30</dd>';
        _str += '    <dd id="J_AllCom20" class="J_subMenu" data-info="1604#AllCom20#2">五星组选20</dd>';
        _str += '    <dd id="J_AllCom10" class="J_subMenu" data-info="1605#AllCom10#2">五星组选10</dd>';
        _str += '    <dd id="J_AllCom5" class="J_subMenu" data-info="1606#AllCom5#2">五星组选5</dd>';
        _str += '</dl>';

        return {
            dom: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    First_4: function(options) {
        /* 前四 */
        options = options || {};
        options.type = options.type || 'First4Straight';

        var _rule = '';
        var _opt = {
            haveCheckbox: false,
            haveTextarea: false,
            placeholder: '',
            numList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            numNameList: ['FIRST', 'SECOND', 'THIRD', 'FOURTH'],
            quickFast: true,
            type: 'ball',
            minSelect: 1,
            formula: null,
            ajaxType: ''
        };
        var _maxBonus = '17000.0000';
        switch (options.type) {
            case 'First4Straight':
                _rule = '从万位、千位、百位、十位中分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：万位选择1，千位选择2，百位选择3，十位选择4，开 奖号码为"1234*"，即为中奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length
                };
                _opt.ajaxType = 'all4b';
                break;
            case 'First4Straight_Single':
                _rule = '"手动输入一个4位数号码组成一注，所选号码的万位、千位、百位、十位与开奖号码相同，且顺序一致，即为中奖。如：选择1234，开 奖号码为1234*，即为中奖。"';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n1234 5678\n1234,5678\n1234;5678\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                // _opt.formula = function(a){
                //     return console.log('对应 allManualEntryEvents');
                // };
                _opt.ajaxType = 'allS4b';
                break;
            case 'First4Join':
                _rule = '从万位、千位、百位、十位中分别选择1个或多个号码投注，若所选号码万位、千位、百位、十位与开奖号码相同，即中一等奖；若所选号码千位、百位、十位与开奖号码相同，即中二等奖；若所选号码百位、十位与开奖号码相同，即中三等奖；若所选号码十位与开奖号码相同，即中四等奖。 如：万位选择1，千位选择2，百位选择3，十位选择4，开奖号码为1234*，即中一等奖，开奖号码为*234*，即中二等奖，开奖号码为**34*，即中三等奖，开奖号码为***4*即中四等奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[3]].length
                };
                _opt.ajaxType = 'join4b';
                break;
            case 'First4Join_Single':
                _rule = '"手动输入一个4位数号码组成一注，所选号码万位、千位、百位、十位与开奖号码相同，即中一等奖；若所选号码千位、百位、十位与开奖号码相同，即中二等奖，依次类推。如：选择1234，开奖号码为1234*，即中一等奖，开奖号码为*234*，即中二等奖，开奖号码为**34*，即中三等奖，开奖号码为***4*即中四等奖。"';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n1234 5678\n1234,5678\n1234;5678\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                // _opt.formula = function(a){
                //     return console.log('对应 allManualEntryEvents');
                // };
                _opt.ajaxType = 'joinS4b';
                break;
            case 'F4Com24':
                _maxBonus = '708.3334';
                _rule = '至少选择4个号码投注，竞猜开奖号码的前4位，号码一致顺序不限，即为中奖。例：投注方案：0568开奖号码：0568*（顺序不限）即为中奖。';
                _opt.numNameList = ['NONE#组选'];
                _opt.minSelect = 4;
                _opt.formula = function(a){
                    var b = a[a.length - 1][a[0]].length;
                    return (b - 3) * (b - 2) * (b - 1) * b / 24
                };
                _opt.ajaxType = 'group4b';
                break;
            case 'F4Com12':
                _maxBonus = '1416.6666';
                _rule = '至少选择1个二重号码和2个单号号码，竞猜开奖号码的前四位，号码一致顺序不限，即为中奖。例：投注方案：二重号8，单号06开奖号码：8806*（顺序不限）';
                _opt.numNameList = ['NONE1#二重号', 'NONE2#单号'];
                _opt.teamMinSelect = {
                    NONE1 : 1,
                    NONE2 : 1
                };
                _opt.formula = function(a){
                    var b = a[a.length - 1][a[0]].length,
                        c = a[a.length - 1][a[1]].length;
                    return b * (c - 1) * c / 2 - TEMPLATE.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]]) * (c - 1)
                };
                _opt.ajaxType = 'group4bt12';
                break;
            case 'F4Com6':
                _maxBonus = '2833.3334';
                _rule = '至少选择2个二重号码，竞猜开奖号码的前四位，号码一致顺序不限，即为中奖。例：投注方案：二重号28开奖号码：2288*（顺序不限）';
                _opt.numNameList = ['NONE#二重号'];
                _opt.formula = function(a){
                    var b = a[a.length - 1][a[0]].length;
                    return (b - 1) * b / 2
                };
                _opt.ajaxType = 'group4bt6';
                break;
            case 'F4Com4':
                _maxBonus = '4250.0000';
                _rule = '至少选择1个三重号码和1个单号号码，竞猜开奖号码的前四位，号码一致顺序不限，即为中奖。例：投注方案：三重号8，单号2中奖号码：8882*（顺序不限）';
                _opt.numNameList = ['NONE1#三重号', 'NONE2#单号'];
                _opt.teamMinSelect = {
                    NONE1 : 1,
                    NONE2 : 1
                };
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length - TEMPLATE.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]])
                };
                _opt.ajaxType = 'group4bt4';
                break;
        }

        var _str = '';
        _str += '<dl>';
        _str += '    <dt>直选：</dt>';
        _str += '    <dd id="J_First4Straight" class="J_subMenu active" data-info="48#First4Straight#2">前四直选</dd>';
        _str += '    <dd id="J_First4Straight_Single" class="J_subMenu" data-info="83#First4Straight_Single#2">前四直选(单式)</dd>';
        _str += '    <dd id="J_First4Join" class="J_subMenu" data-info="49#First4Join#2">前四连选</dd>';
        _str += '    <dd id="J_First4Join_Single" class="J_subMenu" data-info="84#First4Join_Single#2">前四连选(单式)</dd>';
        _str += '</dl>';
        _str += '<dl>';
        _str += '    <dt>组选：</dt>';
        _str += '    <dd id="J_F4Com24" class="J_subMenu" data-info="1607#F4Com24#2">前四组选24</dd>';
        _str += '    <dd id="J_F4Com12" class="J_subMenu" data-info="1608#F4Com12#2">前四组选12</dd>';
        _str += '    <dd id="J_F4Com6" class="J_subMenu" data-info="1609#F4Com6#2">前四组选6</dd>';
        _str += '    <dd id="J_F4Com4" class="J_subMenu" data-info="1610#F4Com4#2">前四组选4</dd>';
        _str += '</dl>';
        return {
            dom: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    Last_4: function(options) {
        /* 后四 */
        options = options || {};
        options.type = options.type || 'Last4Straight';

        var _rule = '';
        var _opt = {
            haveCheckbox: false,
            haveTextarea: false,
            placeholder: '',
            numList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            numNameList: ['SECOND', 'THIRD', 'FOURTH', 'FIFTH'],
            quickFast: true,
            type: 'ball',
            formula: null,
            minSelect: 1,
            ajaxType: ''
        };
        var _maxBonus = '17000.0000';
        switch (options.type) {
            case 'Last4Straight':
                _rule = '从千位、百位、十位、个位中分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：千位选择1，百位选择2，十位选择3，个位选择4，开奖号码为"*1234"，即为中奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length
                };
                _opt.ajaxType = 'all4';
                break;
            case 'Last4Straight_Single':
                _rule = '"手动输入一个4位数号码组成一注，所选号码的千位、百位、十位、个位与开奖号码相同，且顺序一致，即为中奖。如：选择1234，开奖号码为*1234""，即为中奖。"""';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n1234 5678\n1234,5678\n1234;5678\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                // _opt.formula = function(a){
                //     return console.log('对应 allManualEntryEvents');
                // };
                _opt.ajaxType = 'allS4';
                break;
            case 'Last4Join':
                _rule = '从千位、百位、十位、个位中分别选择1个或多个号码投注，若所选号码千位、百位、十位、个位与开奖号码相同，即中一等奖；若所选号码百位、十位、个位与开奖号码相同，即中二等奖；若所选号码十位、个位与开奖号码相同，即中三等奖；若所选号码个位与开奖号码相同，即中四等奖。 如：千位选择1，百位选择2，十位选择3，个位选择4，开奖号码为*1234，即中一等奖，开奖号码为**234，即中二等奖，开奖号码为***34，即中三等奖，开奖号码为****4即中四等奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[3]].length
                };
                _opt.ajaxType = 'join4';
                break;
            case 'Last4Join_Single':
                _rule = '"手动输入一个4位数号码组成一注，所选号码千位、百位、十位、个位与开奖号码相同，即中一等奖；若所选号码百位、十位、个位与开奖号码相同，即中二等奖，依次类推。如：选择1234，开奖号码为*1234，即中一等奖，开奖号码为**234，即中二等奖，开奖号码为***34，即中三等奖，开奖号码为****4即中四等奖。"';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n1234 5678\n1234,5678\n1234;5678\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                // _opt.formula = function(a){
                //     return console.log('对应 allManualEntryEvents');
                // };
                _opt.ajaxType = 'joinS4';
                break;
            case 'L4Com24':
                _maxBonus = '708.3334';
                _rule = '至少选择4个号码投注，竞猜开奖号码的后4位，号码一致顺序不限，即为中奖。例：投注方案：0568开奖号码：*0568（顺序不限）即为中奖。';
                _opt.numNameList = ['NONE#组选'];
                _opt.minSelect = 4;
                _opt.formula = function(a){
                    var b = a[a.length - 1][a[0]].length;
                    return (b - 3) * (b - 2) * (b - 1) * b / 24
                };
                _opt.ajaxType = 'group4';
                break;
            case 'L4Com12':
                _maxBonus = '1416.6666';
                _rule = '至少选择1个二重号码和2个单号号码，竞猜开奖号码的后四位，号码一致顺序不限，即为中奖。例：投注方案：二重号8，单号06开奖号码：*8806（顺序不限）';
                _opt.numNameList = ['NONE1#二重号', 'NONE2#单号'];
                _opt.teamMinSelect = {
                    NONE1 : 1,
                    NONE2 : 1
                };
                _opt.formula = function(a){
                    var b = a[a.length - 1][a[0]].length,
                        c = a[a.length - 1][a[1]].length;
                    return b * (c - 1) * c / 2 - TEMPLATE.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]]) * (c - 1)
                };
                _opt.ajaxType = 'group4t12';
                break;
            case 'L4Com6':
                _maxBonus = '2833.3334';
                _rule = '至少选择2个二重号码，竞猜开奖号码的后四位，号码一致顺序不限，即为中奖。例：投注方案：二重号28开奖号码：*2288（顺序不限）';
                _opt.numNameList = ['NONE#二重号'];
                _opt.formula = function(a){
                    var b = a[a.length - 1][a[0]].length;
                    return (b - 1) * b / 2
                };
                _opt.ajaxType = 'group4t6';
                break;
            case 'L4Com4':
                _maxBonus = '4250.0000';
                _rule = '至少选择1个三重号码和1个单号号码，竞猜开奖号码的后四位，号码一致顺序不限，即为中奖。例：投注方案：三重号8，单号2中奖号码：*8882（顺序不限）';
                _opt.numNameList = ['NONE1#三重号', 'NONE2#单号'];
                _opt.teamMinSelect = {
                    NONE1 : 1,
                    NONE2 : 1
                };
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length - TEMPLATE.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]])
                };
                _opt.ajaxType = 'group4t4';
                break;
        }

        var _str = '';
        _str += '<dl>';
        _str += '    <dt>直选：</dt>';
        _str += '    <dd id="J_Last4Straight" class="J_subMenu active" data-info="29#Last4Straight#2">后四直选</dd>';
        _str += '    <dd id="J_Last4Straight_Single" class="J_subMenu" data-info="85#Last4Straight_Single#2">后四直选(单式)</dd>';
        _str += '    <dd id="J_Last4Join" class="J_subMenu" data-info="30#Last4Join#2">后四连选</dd>';
        _str += '    <dd id="J_Last4Join_Single" class="J_subMenu" data-info="86#Last4Join_Single#2">后四连选(单式)</dd>';
        _str += '</dl>';
        _str += '<dl>';
        _str += '    <dt>组选：</dt>';
        _str += '    <dd id="J_L4Com24" class="J_subMenu" data-info="1611#L4Com24#2">后四组选24</dd>';
        _str += '    <dd id="J_L4Com12" class="J_subMenu" data-info="1612#L4Com12#2">后四组选12</dd>';
        _str += '    <dd id="J_L4Com6" class="J_subMenu" data-info="1613#L4Com6#2">后四组选6</dd>';
        _str += '    <dd id="J_L4Com4" class="J_subMenu" data-info="1614#L4Com4#2">后四组选4</dd>';
        _str += '</dl>';
        return {
            dom: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    First_3: function(options) {
        /* 前三 */
        options = options || {};
        options.type = options.type || 'First3Straight';

        var _rule = '';
        var _opt = {
            haveCheckbox: false,
            haveTextarea: false,
            placeholder: '',
            numList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            numNameList: ['FIRST', 'SECOND', 'THIRD'],
            quickFast: true,
            type: 'ball',
            formula: null,
            minSelect: 1,
            ajaxType: ''
        };
        var _maxBonus = '1700.0000';
        switch (options.type) {
            case 'First3Straight':
                _rule = '从万位、千位、百位中分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：万位选择1，千位选择2，百位选择3，开奖号码为是"123**"，即为中奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length
                };
                _opt.ajaxType = 'all3b';
                break;
            case 'First3Straight_Single':
                _rule = '"手动输入一个3位数号码组成一注，所选号码的万位、千位、百位与开奖号码相同，且顺序一致，即为中奖。如：选择123，开奖号码为123**，即为中奖。"';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n123 456\n123,456\n123;456\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                // _opt.formula = function(a){
                //     return console.log('对应 allManualEntryEvents');
                // };
                _opt.ajaxType = 'allS3b';
                break;
            case 'First3Join':
                _rule = '从万位、千位、百位中分别选择1个或多个号码投注，若所选号码万位、千位、百位与开奖号码相同，即中一等奖；若所选号码千位、百位与开奖号码相同，即中二等奖；若所选号码百位与开奖号码相同，即中三等奖。 如：万位选择3，千位选择4，百位选择5，开奖号码为345**，即中一等奖，开奖号码为*45**，即中二等奖，开奖号码为**5**，即中三等奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[2]].length
                };
                _opt.ajaxType = 'join3b';
                break;
            case 'First3Join_Single':
                _rule = '"手动输入一个3位数号码组成一注，所选号码万位、千位、百位与开奖号码相同，即中一等奖；若所选号码千位、百位与开奖号码相同，即中二等奖；若所选号码百位与开奖号码相同，即中三等奖。如：选择345，开奖号码为345**，即中一等奖，开奖号码为*45**，即中二等奖，开奖号码为**5**，即中三等奖。"';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n123 456\n123,456\n123;456\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                // _opt.formula = function(a){
                //     return console.log('对应 allManualEntryEvents');
                // };
                _opt.ajaxType = 'joinS3b';
                break;
            case 'First3StraightCom':
                _rule = '从0-9中选择3个或以上号码投注，开奖号码为组六形态即中奖。 如：选择2、3、4；开奖号码为234**、243**、324**、342**、432**、423**，即中一注奖。';
                _opt.numNameList = ['NONE#直组'];
                _opt.minSelect = 3;
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) * (a[a.length - 1][a[0]].length - 2)
                };
                _opt.ajaxType = 'orderGroup3b';
                break;
            case 'First3Sum':
                _rule = '从0-27中选择1个或多个号码投注，所选数值为开奖号码前三位的数字相加之和相同，即为中奖。 如：选择和值1；开奖号码为001**、010**、100**，即中前三和值。';
                _opt.numList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
                _opt.numNameList = ['SUM#和值'];
                _opt.quickFast = false;
                // _opt.minSelect = 1;
                _opt.formula = function(x, options){
                    var _num = TEMPLATE.sumAndPoint(x, options, '3rd');
                    return _num;
                };
                _opt.sumType = '3rd';
                _opt.type = 'sum';
                _opt.ajaxType = 'sum3b';
                break;
            case 'First3Com3':
                _maxBonus = '566.6668';
                _rule = '从0-9中选择2个或多个号码投注，所选号码与开奖号码的前三位相同，顺序不限，即为中奖。 如：选择1、2，开奖号码为122**、212**、221** 、 112**、121**、211**，即为中奖。';
                _opt.numNameList = ['NONE#组三'];
                _opt.minSelect = 2;
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1)
                };
                _opt.ajaxType = 'group3b3';
                break;
            case 'First3Com6':
                _maxBonus = '283.3334';
                _rule = '从0-9中选择3个或多个号码投注，所选号码与开奖号码的前三位相同，顺序不限，即为中奖。 如：选择1、2、3，开奖号码为123**、132**、231** 、 213**、312**、321**，即为中奖。';
                _opt.numNameList = ['NONE#组六'];
                _opt.minSelect = 3;
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) * (a[a.length - 1][a[0]].length - 2) / 6
                };
                _opt.ajaxType = 'group3b6';
                break;
            case 'First3Com':
                _maxBonus = '566.6668';
                _rule = '输入购买号码，3个数字为一注，所选号码与开奖号码的前三位相同，顺序不限，即为中奖。 如：手动输入123、455，开奖号码为321**即中组六奖，开奖号码为545**即中组三奖。';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n122 123 211\n123,241,212\n122;221\n';
                _opt.numList = [];
                _opt.type = 'mixing';
                _opt.numNameList = [];
                _opt.formula = function(a){
                    // TODO：
                    return console.log('对应 allMixComboSelection');
                };
                _opt.ajaxType = 'blend3b';
                break;
        }

        var _str = '';
        _str += '<dl>';
        _str += '    <dt>直选：</dt>';
        _str += '    <dd id="J_First3Straight" class="J_subMenu active" data-info="40#First3Straight#2">前三直选</dd>';
        _str += '    <dd id="J_First3Straight_Single" class="J_subMenu" data-info="87#First3Straight_Single#2">前三直选(单式)</dd>';
        _str += '    <dd id="J_First3Join" class="J_subMenu" data-info="45#First3Join#2">前三连选</dd>';
        _str += '    <dd id="J_First3Join_Single" class="J_subMenu" data-info="88#First3Join_Single#2">前三连选(单式)</dd>';
        _str += '    <dd id="J_First3StraightCom" class="J_subMenu" data-info="46#First3StraightCom#2">前三直选组合</dd>';
        _str += '    <dd id="J_First3Sum" class="J_subMenu" data-info="47#First3Sum#2">前三和值</dd>';
        _str += '</dl>';
        _str += '<dl>';
        _str += '    <dt>组选：</dt>';
        _str += '    <dd id="J_First3Com3" class="J_subMenu" data-info="42#First3Com3#2">前三组三</dd>';
        _str += '    <dd id="J_First3Com6" class="J_subMenu" data-info="43#First3Com6#2">前三组六</dd>';
        _str += '    <dd id="J_First3Com" class="J_subMenu" data-info="44#First3Com#2">前三混合组选</dd>';
        _str += '</dl>';
        return {
            dom: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    Middle_3: function(options) {
        /* 中三 */
        options = options || {};
        options.type = options.type || 'Middle3Straight';

        var _rule = '';
        var _opt = {
            haveCheckbox: false,
            haveTextarea: false,
            placeholder: '',
            numList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            numNameList: ['SECOND', 'THIRD', 'FOURTH'],
            quickFast: true,
            type: 'ball',
            formula: null,
            minSelect : 1,
            ajaxType: ''
        };
        var _maxBonus = '1700.0000';
        switch (options.type) {
            case 'Middle3Straight':
                _rule = '从千位、百位、十位中分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：千位选择1，百位选择2，十位选择3，开奖号码为是"*123*"，即为中奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length
                };
                // _opt.minSelect = 1;
                _opt.ajaxType = 'all3m';
                break;
            case 'Middle3Straight_Single':
                _rule = '"手动输入一个3位数号码组成一注，所选号码的千位、百位、十位与开奖号码相同，且顺序一致，即为中奖。如：选择123，开奖号码为*123*，即为中奖。"';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n123 456\n123,456\n123;456\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                // _opt.formula = function(a){
                //     return console.log('对应 allManualEntryEvents');
                // };
                _opt.ajaxType = 'allS3m';
                break;
            case 'Middle3Join':
                _rule = '从千位、百位、十位中分别选择1个或多个号码投注，若所选号码千位、百位、十位与开奖号码相同，即中一等奖；若所选号码百位、十位与开奖号码相同，即中二等奖；若所选号码十位与开奖号码相同，即中三等奖。 如：千位选择2，百位选择3，十位选择4，开奖号码为*234*，即中一等奖，开奖号码为**34*，即中二等奖，开奖号码为***4*，即中三等奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[2]].length
                };
                _opt.ajaxType = 'join3m';
                break;
            case 'Middle3Join_Single':
                _rule = '"手动输入一个3位数号码组成一注，若所选号码千位、百位、十位与开奖号码相同，即中一等奖；若所选号码百位、十位与开奖号码相同，即中二等奖；若所选号码十位与开奖号码相同，即中三等奖。如：选择234，开奖号码为*234*，即中一等奖，开奖号码为**34*，即中二等奖，开奖号码为***4*，即中三等奖。"';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n123 456\n123,456\n123;456\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                // _opt.formula = function(a){
                //     return console.log('对应 allManualEntryEvents');
                // };
                _opt.ajaxType = 'joinS3m';
                break;
            case 'Middle3StraightCom':
                _rule = '从0-9中选择3个或以上号码投注，开奖号码为组六形态即中奖。 如：选择2、3、4；开奖号码为*234*、*243*、*324*、*342*、*432*、*423*，即中一注奖。';
                _opt.numNameList = ['NONE#直组'];
                _opt.minSelect = 3;
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) * (a[a.length - 1][a[0]].length - 2)
                };
                _opt.ajaxType = 'orderGroup3m';
                break;
            case 'Middle3Sum':
                _rule = '从0-27中选择1个或多个号码投注，所选数值为开奖号码中三位的数字相加之和相同，即为中奖。 如：选择和值1；开奖号码为*001*、*010*、*100*，即中中三和值。';
                _opt.numList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
                _opt.numNameList = ['SUM#和值'];
                _opt.quickFast = false;
                _opt.formula = function(x, options){
                    var _num = TEMPLATE.sumAndPoint(x, options, '3rd');
                    return _num;
                };
                _opt.type = 'sum';
                _opt.sumType = '3rd';
                _opt.ajaxType = 'sum3m';
                break;
            case 'Middle3Com3':
                _maxBonus = '566.6668';
                _rule = '从0-9中选择2个或多个号码投注，所选号码与开奖号码的中三位相同，顺序不限，即为中奖。 如：选择1、2，开奖号码为*122*、*212*、*221* 、 *112*、*121*、*211*，即为中奖。';
                _opt.numNameList = ['NONE#组三'];
                _opt.minSelect = 2;
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1)
                };
                _opt.ajaxType = 'group3m3';
                break;
            case 'Middle3Com6':
                _maxBonus = '283.3334';
                _rule = '从0-9中选择3个或多个号码投注，所选号码与开奖号码的中三位相同，顺序不限，即为中奖。 如：选择1、2、3，开奖号码为*123*、*132*、*231*、 *213*、*312*、*321*，即为中奖。';
                _opt.numNameList = ['NONE#组六'];
                _opt.minSelect = 3;
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) * (a[a.length - 1][a[0]].length - 2) / 6
                };
                _opt.ajaxType = 'group3m6';
                break;
            case 'Middle3Com':
                _maxBonus = '566.6668';
                _rule = '输入购买号码，3个数字为一注，所选号码与开奖号码的中三位相同，顺序不限，即为中奖。 如：手动输入123、455，开奖号码为*321*即中组六奖， 开奖号码为*545*即中组三奖。';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n122 123 211\n123,241,212\n122;221\n';
                _opt.numList = [];
                _opt.type = 'mixing';
                _opt.numNameList = [];
                _opt.formula = function(a){
                    // TODO:
                    return console.log('对应 allMixComboSelection');
                };
                _opt.ajaxType = 'blend3m';
                break;
        }

        var _str = '';
        _str += '<dl>';
        _str += '    <dt>直选：</dt>';
        _str += '    <dd id="J_Middle3Straight" class="J_subMenu active" data-info="50#Middle3Straight#2">中三直选</dd>';
        _str += '    <dd id="J_Middle3Straight_Single" class="J_subMenu" data-info="89#Middle3Straight_Single#2">中三直选(单式)</dd>';
        _str += '    <dd id="J_Middle3Join" class="J_subMenu" data-info="55#Middle3Join#2">中三连选</dd>';
        _str += '    <dd id="J_Middle3Join_Single" class="J_subMenu" data-info="90#Middle3Join_Single#2">中三连选(单式)</dd>';
        _str += '    <dd id="J_Middle3StraightCom" class="J_subMenu" data-info="56#Middle3StraightCom#2">中三直选组合</dd>';
        _str += '    <dd id="J_Middle3Sum" class="J_subMenu" data-info="57#Middle3Sum#2">中三和值</dd>';
        _str += '</dl>';
        _str += '<dl>';
        _str += '    <dt>组选：</dt>';
        _str += '    <dd id="J_Middle3Com3" class="J_subMenu" data-info="52#Middle3Com3#2">中三组三</dd>';
        _str += '    <dd id="J_Middle3Com6" class="J_subMenu" data-info="53#Middle3Com6#2">中三组六</dd>';
        _str += '    <dd id="J_Middle3Com" class="J_subMenu" data-info="54#Middle3Com#2">中三混合组选</dd>';
        _str += '</dl>';
        return {
            dom: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    Last_3: function(options) {
        /* 后三 */
        options = options || {};
        options.type = options.type || 'Last3Straight';

        var _rule = '';
        var _opt = {
            haveCheckbox: false,
            haveTextarea: false,
            placeholder: '',
            numList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            numNameList: ['THIRD', 'FOURTH', 'FIFTH'],
            quickFast: true,
            type: 'ball',
            formula: null,
            minSelect: 1,
            ajaxType: ''
        };
        var _maxBonus = '1700.0000';
        switch (options.type) {
            case 'Last3Straight':
                _rule = '从百位、十位、个位分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：百位选择1，十位选择2，个位选择3，开奖号码为是"**123"，即为中奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length
                };
                _opt.ajaxType = 'all3';
                break;
            case 'Last3Straight_Single':
                _rule = '"手动输入一个3位数号码组成一注，所选号码的百位、十位、个位与开奖号码相同，且顺序一致，即为中奖。如：选择123，开奖号码为**123，即为中奖。"';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n123 456\n123,456\n123;456\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                // _opt.formula = function(a){
                //     return console.log('对应 allManualEntryEvents');
                // };
                _opt.ajaxType = 'allS3';
                break;
            case 'Last3Join':
                _rule = '从百位、十位、个位选择1个或多个号码投注，若所选号码百位、十位、个位与开奖号码相同，即中一等奖；若所选号码十位、个位与开奖号码相同，即中二等奖；若所选号码个位与开奖号码相同，即中三等奖。 如：百位选择3，十位选择4，个位选择5，开奖号码为**345，即中一等奖，开奖号码为***45，即中二等奖，开奖号码为****5，即中三等奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[2]].length
                };
                _opt.ajaxType = 'join3';
                break;
            case 'Last3Join_Single':
                _rule = '"手动输入一个3位数号码组成一注，所选号码百位、十位、个位与开奖号码相同，即中一等奖；若所选号码十位、个位与开奖号码相同，即中二等奖；若所选号码个位与开奖号码相同，即中三等奖。如：选择345，开奖号码为**345，即中一等奖，开奖号码为***45，即中二等奖，开奖号码为****5，即中三等奖。"';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n123 456\n123,456\n123;456\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                // _opt.formula = function(a){
                //     return console.log('对应 allManualEntryEvents');
                // };
                _opt.ajaxType = 'joinS3';
                break;
            case 'Last3StraightCom':
                _rule = '从0-9中选择3个或以上号码投注，开奖号码为组六形态即中奖。 如：选择2、3、4；开奖号码为**234、**243、**324、**342、**432、**423，即中一注奖。';
                _opt.numNameList = ['NONE#直组'];
                _opt.minSelect = 3;
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) * (a[a.length - 1][a[0]].length - 2)
                };
                _opt.ajaxType = 'orderGroup3';
                break;
            case 'Last3Sum':
                _rule = '从0-27中选择1个或多个号码投注，所选数值为开奖号码后三位的数字相加之和相同，即为中奖。 如：选择和值1；开奖号码为**001、**010、**100，即中后三和值。';
                _opt.numList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
                _opt.numNameList = ['SUM#和值'];
                _opt.quickFast = false;
                _opt.formula = function(x, options){
                    var _num = TEMPLATE.sumAndPoint(x, options, '3rd');
                    return _num;
                };
                _opt.type = 'sum';
                _opt.sumType = '3rd';
                _opt.ajaxType = 'sum3';
                break;
            case 'Last3Com3':
                _maxBonus = '566.6668';
                _rule = '从0-9中选择2个或多个号码投注，所选号码与开奖号码的后三位相同，顺序不限，即为中奖 如：选择1、2，开奖号码为**122、**212、**221 、 **112、**121、**211，即为中奖。';
                _opt.numNameList = ['NONE#组三'];
                _opt.minSelect = 2;
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1)
                };
                _opt.ajaxType = 'group3a3';
                break;
            case 'Last3Com6':
                _maxBonus = '283.3334';
                _rule = '从0-9中选择3个或多个号码投注，所选号码与开奖号码的后三位相同，顺序不限，即为中奖。 如：选择1、2、3，开奖号码为**123，**132，**231，**213，**312，**321，即为中奖。';
                _opt.numNameList = ['NONE#组六'];
                _opt.minSelect = 3;
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) * (a[a.length - 1][a[0]].length - 2) / 6
                };
                _opt.ajaxType = 'group3a6';
                break;
            case 'Last3Com':
                _maxBonus = '566.6668';
                _rule = '输入购买号码，3个数字为一注，所选号码与开奖号码的后三位相同，顺序不限，即为中奖。 如：手动输入123、455，开奖号码为**321即中组六奖，开奖号码为**545即中组三奖。';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n122 123 211\n123,241,212\n122;221\n';
                _opt.numList = [];
                _opt.type = 'mixing';
                _opt.numNameList = [];
                _opt.formula = function(a){
                    // TODO：
                    return console.log('对应 allMixComboSelection');
                };
                _opt.ajaxType = 'blend3';
                break;
        }

        var _str = '';
        _str += '<dl>';
        _str += '    <dt>直选：</dt>';
        _str += '    <dd id="J_Last3Straight" class="J_subMenu active" data-info="21#Last3Straight#2">后三直选</dd>';
        _str += '    <dd id="J_Last3Straight_Single" class="J_subMenu" data-info="91#Last3Straight_Single#2">后三直选(单式)</dd>';
        _str += '    <dd id="J_Last3Join" class="J_subMenu" data-info="26#Last3Join#2">后三连选</dd>';
        _str += '    <dd id="J_Last3Join_Single" class="J_subMenu" data-info="92#Last3Join_Single#2">后三连选(单式)</dd>';
        _str += '    <dd id="J_Last3StraightCom" class="J_subMenu" data-info="27#Last3StraightCom#2">后三直选组合</dd>';
        _str += '    <dd id="J_Last3Sum" class="J_subMenu" data-info="28#Last3Sum#2">后三和值</dd>';
        _str += '</dl>';
        _str += '<dl>';
        _str += '    <dt>组选：</dt>';
        _str += '    <dd id="J_Last3Com3" class="J_subMenu" data-info="23#Last3Com3#2">后三组三</dd>';
        _str += '    <dd id="J_Last3Com6" class="J_subMenu" data-info="24#Last3Com6#2">后三组六</dd>';
        _str += '    <dd id="J_Last3Com" class="J_subMenu" data-info="25#Last3Com#2">后三混合组选</dd>';
        _str += '</dl>';
        return {
            dom: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    First_2: function(options) {
        /* 前二 */
        options = options || {};
        options.type = options.type || 'First2Straight';

        var _rule = '';
        var _opt = {
            haveCheckbox: false,
            haveTextarea: false,
            placeholder: '',
            numList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            numNameList: ['FIRST', 'SECOND'],
            quickFast: true,
            noAllFastBtn: false,
            type: 'ball',
            formula: null,
            minSelect: 1,
            ajaxType: ''
        };
        var _maxBonus = '170.0000';
        switch (options.type) {
            case 'First2Straight':
                _rule = '从万位、千位分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：万位选择3，千位选择4，开奖号码为34***，即为中奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length
                };
                _opt.ajaxType = 'all2b';
                break;
            case 'First2Straight_Single':
                _rule = '"手动输入一个2位数号码组成一注，所选号码的万位、千位与开奖号码相同，且顺序一致，即为中奖。如：选择34，开奖号码为34***，即为中奖。"';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n12 34\n12,34\n12;34\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                // _opt.formula = function(a){
                //     return console.log('对应 allManualEntryEvents');
                // };
                _opt.ajaxType = 'allS2b';
                break;
            case 'First2Join':
                _rule = '从万位和千位选择1个或多个号码投注，若所选号码万位、千位与开奖号码相同，即中一等奖；若所选号码千位与开奖号码相同，即中二等奖。 如：万位选择5，千位选择4，开奖号码为54***，即中一等奖，开奖号码为*4***，即中二等奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length + a[a.length - 1][a[1]].length
                };
                _opt.ajaxType = 'join2b';
                break;
            case 'First2Join_Single':
                _rule = '"手动输入一个2位数号码组成一注，所选号码万位、千位与开奖号码相同，即中一等奖；若所选号码千位与开奖号码相同，即中二等奖。如：选择54，开奖号码为54***，即中一等奖，开奖号码为*4***，即为中奖。"';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n12 34\n12,34\n12;34\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                // _opt.formula = function(a){
                //     return console.log('对应 allManualEntryEvents');
                // };
                _opt.ajaxType = 'joinS2b';
                break;
            case 'First2Sum':
                _rule = '从0-18中选择1个或多个号码投注，所选数值为开奖号码前二位的数字相加之和相同，即为中奖。 如：选择1，开奖号码为10***或01***，即为中奖。';
                _opt.numList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
                _opt.numNameList = ['SUM#和值'];
                _opt.quickFast = false;
                _opt.formula = function(x, options){
                    var _num = TEMPLATE.sumAndPoint(x, options, '2nd');
                    return _num;
                };
                _opt.type = 'sum';
                _opt.sumType = '2nd';
                _opt.ajaxType = 'sum2b';
                break;
            case 'First2Com':
                _maxBonus = '85.0000';
                _rule = '从0-9中选择2个或多个号码投注，所选号码与开奖号码的前二位相同，顺序不限，即为中奖。 如：选择7、8，开奖号码78***或87***即为中奖。';
                _opt.numNameList = ['NONE#组选'];
                _opt.noAllFastBtn = true;
                _opt.maxSelect = 7;
                _opt.minSelect = 2;
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) / 2
                };
                _opt.ajaxType = 'group2b';
                break;
        }

        var _str = '';
        _str += '<dl>';
        _str += '    <dt>直选：</dt>';
        _str += '    <dd id="J_First2Straight" class="J_subMenu active" data-info="34#First2Straight#2">前二直选</dd>';
        _str += '    <dd id="J_First2Straight_Single" class="J_subMenu" data-info="93#First2Straight_Single#2">前二直选(单式)</dd>';
        _str += '    <dd id="J_First2Join" class="J_subMenu" data-info="38#First2Join#2">前二连选</dd>';
        _str += '    <dd id="J_First2Join_Single" class="J_subMenu" data-info="94#First2Join_Single#2">前二连选(单式)</dd>';
        _str += '    <dd id="J_First2Sum" class="J_subMenu" data-info="39#First2Sum#2">前二和值</dd>';
        _str += '</dl>';
        _str += '<dl>';
        _str += '    <dt>组选：</dt>';
        _str += '    <dd id="J_First2Com" class="J_subMenu" data-info="35#First2Com#2">前二组选</dd>';
        _str += '</dl>';
        return {
            dom: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    Last_2: function(options) {
        /* 后二 */
        options = options || {};
        options.type = options.type || 'Last2Straight';

        var _rule = '';
        var _opt = {
            haveCheckbox: false,
            haveTextarea: false,
            placeholder: '',
            numList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            numNameList: ['FOURTH', 'FIFTH'],
            quickFast: true,
            type: 'ball',
            formula: null,
            minSelect: 1,
            ajaxType: ''
        };
        var _maxBonus = '170.0000';
        switch (options.type) {
            case 'Last2Straight':
                _rule = '从十位、个位分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：十位选择3，个位选择4，开奖号码为"***34"，即为中奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length
                };
                _opt.ajaxType = 'all2';
                break;
            case 'Last2Straight_Single':
                _rule = '"手动输入一个2位数号码组成一注，所选号码的十位、个位与开奖号码相同，且顺序一致，即为中奖。如：选择34，开奖号码为***34""，即为中奖。"""';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n12 34\n12,34\n12;34\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                // _opt.formula = function(a){
                //     return console.log('对应 allManualEntryEvents');
                // };
                _opt.ajaxType = 'allS2';
                break;
            case 'Last2Join':
                _rule = '从十位、个位分别选择1个或多个号码投注，若所选号码十位、个位与开奖号码相同，即中一等奖；若所选号码个位与开奖号码相同，即中二等奖。 如：十位选择4，个位选择5，开奖号码为***45，即中一等奖，开奖号码为****5，即中二等奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length + a[a.length - 1][a[1]].length
                };
                _opt.ajaxType = 'join2';
                break;
            case 'Last2Join_Single':
                _rule = '"手动输入一个2位数号码组成一注，所选号码十位、个位与开奖号码相同，即中一等奖；若所选号码个位与开奖号码相同，即中二等奖。如：选择45，开奖号码为***45，即中一等奖，开奖号码为****5，即中二等奖。"';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n12 34\n12,34\n12;34\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                // _opt.formula = function(a){
                //     return console.log('对应 allManualEntryEvents');
                // };
                _opt.ajaxType = 'joinS2';
                break;
            case 'Last2Sum':
                _rule = '从0-18中选择1个或多个号码投注，所选数值为开奖号码后二位的数字相加之和相同，即为中奖。 如：选择1，开奖号码为***10或***01即为中奖。';
                _opt.numList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
                _opt.numNameList = ['SUM#和值'];
                _opt.quickFast = false;
                _opt.formula = function(x, options){
                    var _num = TEMPLATE.sumAndPoint(x, options, '2nd');
                    return _num;
                };
                _opt.type = 'sum';
                _opt.sumType = '2nd';
                _opt.ajaxType = 'sum2';
                break;
            case 'Last2Com':
                _maxBonus = '85.0000';
                _rule = '从0-9中选择2个或多个号码投注，所选号码与开奖号码的后二位相同，顺序不限，即为中奖。 如：选择7、8，开奖号码***78或***87，即为中奖。';
                _opt.numNameList = ['NONE#组选'];
                _opt.noAllFastBtn = true;
                _opt.maxSelect = 7;
                _opt.minSelect = 2;
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) / 2
                };
                _opt.ajaxType = 'group2';
                break;
        }

        var _str = '';
        _str += '<dl>';
        _str += '    <dt>直选：</dt>';
        _str += '    <dd id="J_Last2Straight" class="J_subMenu active" data-info="15#Last2Straight#2">后二直选</dd>';
        _str += '    <dd id="J_Last2Straight_Single" class="J_subMenu" data-info="95#Last2Straight_Single#2">后二直选(单式)</dd>';
        _str += '    <dd id="J_Last2Join" class="J_subMenu" data-info="19#Last2Join#2">后二连选</dd>';
        _str += '    <dd id="J_Last2Join_Single" class="J_subMenu" data-info="96#Last2Join_Single#2">后二连选(单式)</dd>';
        _str += '    <dd id="J_Last2Sum" class="J_subMenu" data-info="20#Last2Sum#2">后二和值</dd>';
        _str += '</dl>';
        _str += '<dl>';
        _str += '    <dt>组选：</dt>';
        _str += '    <dd id="J_Last2Com" class="J_subMenu" data-info="16#Last2Com#2">后二组选</dd>';
        _str += '</dl>';
        return {
            dom: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    Last_1: function(options) {
        /* 一星 */
        options = options || {};
        options.type = options.type || 'FixedPlace';

        var _rule = '';
        var _opt = {
            haveCheckbox: false,
            haveTextarea: false,
            placeholder: '',
            numList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            numNameList: ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH'],
            quickFast: true,
            type: 'ball',
            formula: null,
            minSelect: 1,
            ajaxType: ''
        };
        var _maxBonus = '17.0000';
        switch (options.type) {
            case 'FixedPlace':
                _rule = '从万位、千位、百位、十位、个位任意位置上至少选择1个号码投注，所选号码与相同位置上的开奖号码一致，即中奖。';
                // 这里分为智盈跟传统，默认为传统
                // 智盈的算法如下
                // _opt.formula = function(a){
                //     return a[a.length - 1][a[0]].length + a[a.length - 1][a[1]].length + a[a.length - 1][a[2]].length + a[a.length - 1][a[3]].length
                // }
                // 传统的算法如下
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length + a[a.length - 1][a[1]].length + a[a.length - 1][a[2]].length + a[a.length - 1][a[3]].length + a[a.length - 1][a[4]].length
                };
                _opt.ajaxType = 'sure1';
                break;
            case 'Last1Straight':
                _rule = '从个位选择1个或多个号码投注，所选号码与开奖号码一致，即为中奖。 如：个位选择3，开奖号码为****3，即为中奖。';
                _opt.numNameList = ['FIFTH'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length
                };
                _opt.ajaxType = 'all1';
                break;
        }

        var _str = '';
        _str += '<dl>';
        _str += '    <dt>定位胆：</dt>';
        _str += '    <dd id="J_FixedPlace" class="J_subMenu active" data-info="14#FixedPlace#2">一星定位胆</dd>';
        _str += '    <dd id="J_Last1Straight" class="J_subMenu" data-info="13#Last1Straight#2">一星直选</dd>';
        _str += '</dl>';
        return {
            dom: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    Any_Place: function(options) {
        /* 不定位 */
        options = options || {};
        options.type = options.type || 'First3StraightAnyCode1';

        var _rule = '';
        var _opt = {
            haveCheckbox: false,
            haveTextarea: false,
            placeholder: '',
            numList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            numNameList: ['NONE#胆码'],
            quickFast: false,
            multipleChoice: false,
            type: 'ball',
            formula: null,
            minSelect: 1,
            ajaxType: ''
        };
        var _maxBonus = '1700.0000';
        switch (options.type) {
            case 'First3StraightAnyCode1':
                _maxBonus = '6.2730';
                _rule = '从0-9中选择1个号码投注，每注由1个号码组成，只要开奖号码的万位、千位、百位中包含所选号码，即为中奖。 如：选择2，开奖号码为**2**， *2***， 2****，即为中奖。';
                _opt.numNameList = ['NONE#胆码'];
                _opt.formula = function(a){
                    return 1 * a[a.length - 1][a[0]].length
                };
                _opt.maxSelect = 1;
                _opt.minSelect = 1;
                _opt.ajaxType = 'sure3b1';
                break;
            case 'First3StraightAnyCode2':
                _maxBonus = '31.4815';
                _rule = '从一码、二码中分别选择1个号码投注，每注由2个号码组成，只要开奖号码的万位、千位、百位中包含所选号码，即为中奖。 如：选择14，开奖号码为14***， 1*4**， 4*1**， *41**， 41***， *14**，即为中奖。';
                _opt.numNameList = ['NONE1#一胆', 'NONE2#二胆'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * 1
                };
                _opt.ajaxType = 'sure3b2';
                break;
            case 'Middle3StraightAnyCode1':
                _maxBonus = '6.2730';
                _rule = '从0-9中选择1个号码投注，每注由1个号码组成，只要开奖号码的千位、百位、十位中包含所选号码，即为中奖。 如：选择2，开奖号码为*2***， **2**， ***2*，即为中奖。';
                _opt.numNameList = ['NONE#胆码'];
                _opt.maxSelect = 1;
                _opt.minSelect = 1;
                _opt.formula = function(a){
                    return 1 * a[a.length - 1][a[0]].length
                };
                _opt.ajaxType = 'sure3m1';
                break;
            case 'Middle3StraightAnyCode2':
                _maxBonus = '31.4815';
                _rule = '从一码、二码中分别选择1个号码投注，每注由2个号码组成，只要开奖号码的千位、百位、十位中包含所选号码，即为中奖。 如：选择14，开奖号码为**14*， *1*4*， *4*1*， **41*，*14** ，*41**，即为中奖。';
                _opt.numNameList = ['NONE1#一胆', 'NONE2#二胆'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * 1
                };
                _opt.ajaxType = 'sure3m2';
                break;
            case 'Last3StraightAnyCode1':
                _maxBonus = '6.2730';
                _rule = '从0-9中选择1个号码投注，每注由1个号码组成，只要开奖号码的百位、十位、个位中包含所选号码，即为中奖。 如：选择2，开奖号码为**2**， ***2*， ****2，即为中奖。';
                _opt.numNameList = ['NONE#胆码'];
                _opt.formula = function(a){
                    return 1 * a[a.length - 1][a[0]].length
                };
                _opt.maxSelect = 1;
                _opt.minSelect = 1;
                _opt.ajaxType = 'sure3a1';
                break;
            case 'Last3StraightAnyCode2':
                _maxBonus = '31.4815';
                _rule = '从一码、二码中分别选择1个号码投注，每注由2个号码组成，只要开奖号码的百位、十位、个位中包含所选号码，即为中奖。 如：选择14，开奖号码为***14， **1*4， **4*1， ***41，**14* ，**41*，即为中奖。';
                _opt.numNameList = ['NONE1#一胆', 'NONE2#二胆'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * 1
                };
                _opt.ajaxType = 'sure3a2';
                break;
            case 'First2StraightAnyCode':
                _maxBonus = '8.9474';
                _rule = '从0-9中选择1个或多个号码投注投注，只要开奖号码的万位、千位中包含所选号码，即为中奖。 如：选择2，开奖号码为2****， *2***，即为中奖。';
                _opt.quickFast = true;
                _opt.multipleChoice = true;
                _opt.numNameList = ['NONE#胆码'];
                _opt.minSelect = 1;
                _opt.formula = function(a){
                    return 1 * a[a.length - 1][a[0]].length
                };
                _opt.ajaxType = 'sure2b';
                break;
            case 'Last2StraightAnyCode':
                _maxBonus = '8.9474';
                _rule = '从0-9中选择1个或多个号码投注，只要开奖号码的十位、个位中包含所选号码，即为中奖。 如：选择2，开奖号码为***2*， ****2，即为中奖。';
                _opt.quickFast = true;
                _opt.multipleChoice = true;
                _opt.numNameList = ['NONE#胆码'];
                _opt.formula = function(a){
                    return 1 * a[a.length - 1][a[0]].length
                };
                _opt.minSelect = 1;
                _opt.ajaxType = 'sure2';
                break;
            case 'First3ComAnyCode1':
                _rule = '从0-9中选择1个或多个号码投注，只要开奖号码的万位、千位、百位中包含所选号码，即为中奖(含对子、豹子号)。 如：选择2，开奖号码为222**即中豹子形态；开奖号码为322**即中组三形态；开奖号码为321**即中组六形态。';
                _opt.numNameList = ['NONE#胆码'];
                _opt.formula = function(a){
                    return 55 * a[a.length - 1][a[0]].length
                };
                _opt.minSelect = 1;
                _opt.ajaxType = 'gsure3b1';
                break;
            case 'First3ComAnyCode2':
                _rule = '从一码、二码中分别选择1个或多个号码投注，只要开奖号码的万位、千位、百位中包含所选号码，即为中奖(含对子、豹子号)。 如：选择22，开奖号码为222**即中豹子形态；选择21，开奖号码为122**即中组三形态；开奖号码为321**即中组六形态。';
                _opt.numNameList = ['NONE1#一胆', 'NONE2#二胆'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * 10
                };
                _opt.ajaxType = 'gsure3b2 ';
                break;
            case 'Middle3ComAnyCode1':
                _rule = '从0-9中选择1个或多个号码投注，只要开奖号码的千位、百位、十位中包含所选号码，即为中奖(含对子、豹子号)。 如：选择2，开奖号码为*222*即中豹子形态；开奖号码为*322*即中组三形态；开奖号码为*321*即中组六形态。';
                _opt.numNameList = ['NONE#胆码'];
                _opt.formula = function(a){
                    return 55 * a[a.length - 1][a[0]].length
                };
                _opt.maxSelect = 1;
                _opt.minSelect = 1;
                _opt.ajaxType = 'gsure3m1';
                break;
            case 'Middle3ComAnyCode2':
                _rule = '从一码、二码中分别选择1个或多个号码投注，只要开奖号码的千位、百位、十位中包含所选号码，即为中奖(含对子、豹子号)。 如：选择22，开奖号码为*222*即中豹子形态；选择21，开奖号码*122*即中组三形态，开奖号码*321*即中组六形态。';
                _opt.numNameList = ['NONE1#一胆', 'NONE2#二胆'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * 10
                };
                _opt.ajaxType = 'gsure3m2';
                break;
            case 'Last3ComAnyCode1':
                _rule = '从0-9中选择1个或多个号码投注，只要开奖号码的百位、十位、个位中包含所选号码，即为中奖(含对子、豹子号)。 如：选择2，开奖号码为**222即中豹子形态；开奖号码为**322即中组三形态；开奖号码为**321即中组六形态。';
                _opt.numNameList = ['NONE#胆码'];
                _opt.maxSelect = 1;
                _opt.minSelect = 1;
                _opt.formula = function(a){
                    return 55 * a[a.length - 1][a[0]].length
                };
                _opt.ajaxType = 'gsure3a1';
                break;
            case 'Last3ComAnyCode2':
                _rule = '从一码、二码中分别选择1个或多个号码投注，只要开奖号码的百位、十位、个位中包含所选号码，即为中奖(含对子、豹子号)。 如：选择22，开奖号码为**222即中豹子形态；选择21，开奖号码**122即中组三形态，开奖号码**321即中组六形态。';
                _opt.numNameList = ['NONE1#一胆', 'NONE2#二胆'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * 10
                };
                _opt.ajaxType = 'gsure3a2';
                break;
            case 'First2ComAnyCode':
                _maxBonus = '170.0000';
                _rule = '从0-9中选择1个或多个号码投注投注，只要开奖号码的万位、千位中包含所选号码，即为中奖(含对子号)。 如：选择2，开奖号码为22***即中对子；开奖号码为21***即中非对子。';
                _opt.quickFast = true;
                _opt.multipleChoice = true;
                _opt.numNameList = ['NONE#胆码'];
                _opt.minSelect = 1;
                _opt.type = 'mixingAny';
                _opt.formula = function(a){
                    return 10 * a[a.length - 1][a[0]].length
                };
                _opt.ajaxType = 'gsure2b';
                break;
            case 'Last2ComAnyCode':
                _maxBonus = '170.0000';
                _rule = '从0-9中选择1个或多个号码投注，只要开奖号码的十位、个位中包含所选号码，即为中奖(含对子号)。 如：选择2，开奖号码为***22即中对子；开奖号码为***21即中非对子。';
                _opt.quickFast = true;
                _opt.multipleChoice = true;
                _opt.numNameList = ['NONE#胆码'];
                _opt.minSelect = 1;
                _opt.type = 'mixingAny';
                _opt.formula = function(a){
                    return 10 * a[a.length - 1][a[0]].length
                };
                _opt.ajaxType = 'gsure2';
                break;
        }

        var _str = '';
        _str += '<dl>';
        _str += '    <dt>直选：</dt>';
        _str += '    <dd id="J_First3StraightAnyCode1" class="J_subMenu active" data-info="68#First3StraightAnyCode1#2">前三直选一码</dd>';
        _str += '    <dd id="J_First3StraightAnyCode2" class="J_subMenu" data-info="69#First3StraightAnyCode2#2">前三直选二码</dd>';
        _str += '    <dd id="J_Middle3StraightAnyCode1" class="J_subMenu" data-info="78#Middle3StraightAnyCode1#2">中三直选一码</dd>';
        _str += '    <dd id="J_Middle3StraightAnyCode2" class="J_subMenu" data-info="79#Middle3StraightAnyCode2#2">中三直选二码</dd>';
        _str += '    <dd id="J_Last3StraightAnyCode1" class="J_subMenu" data-info="74#Last3StraightAnyCode1#2">后三直选一码</dd>';
        _str += '    <dd id="J_Last3StraightAnyCode2" class="J_subMenu" data-info="75#Last3StraightAnyCode2#2">后三直选二码</dd>';
        _str += '    <dd id="J_First2StraightAnyCode" class="J_subMenu" data-info="65#First2StraightAnyCode#2">前二直选</dd>';
        _str += '    <dd id="J_Last2StraightAnyCode" class="J_subMenu" data-info="71#Last2StraightAnyCode#2">后二直选</dd>';
        _str += '</dl>';
        _str += '<dl>';
        _str += '    <dt>组选：</dt>';
        _str += '    <dd id="J_First3ComAnyCode1" class="J_subMenu" data-info="66#First3ComAnyCode1#2">前三组选一码</dd>';
        _str += '    <dd id="J_First3ComAnyCode2" class="J_subMenu" data-info="67#First3ComAnyCode2#2">前三组选二码</dd>';
        _str += '    <dd id="J_Middle3ComAnyCode1" class="J_subMenu" data-info="76#Middle3ComAnyCode1#2">中三组选一码</dd>';
        _str += '    <dd id="J_Middle3ComAnyCode2" class="J_subMenu" data-info="77#Middle3ComAnyCode2#2">中三组选二码</dd>';
        _str += '    <dd id="J_Last3ComAnyCode1" class="J_subMenu" data-info="72#Last3ComAnyCode1#2">后三组选一码</dd>';
        _str += '    <dd id="J_Last3ComAnyCode2" class="J_subMenu" data-info="73#Last3ComAnyCode2#2">后三组选二码</dd>';
        _str += '    <dd id="J_First2ComAnyCode" class="J_subMenu" data-info="64#First2ComAnyCode#2">前二组选</dd>';
        _str += '    <dd id="J_Last2ComAnyCode" class="J_subMenu" data-info="70#Last2ComAnyCode#2">后二组选</dd>';
        _str += '</dl>';
        return {
            dom: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    Fun: function(options) {
        /* 趣味 */
        options = options || {};
        options.type = options.type || 'First2BSOE';

        var _rule = '';
        var _opt = {
            haveCheckbox: false,
            haveTextarea: false,
            placeholder: '',
            numList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            numNameList: ['NONE#特殊'],
            quickFast: true,
            type: 'ball',
            formula: null,
            minSelect: 1,
            ajaxType: ''
        };
        var _maxBonus = '6.8000';
        switch (options.type) {
            case 'First2BSOE':
                _rule = '从万位、千位中的“大、小、单、双”至少各选一个组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：万位选择小，千位选择双，开奖号码为12***，即为中奖。';
                _opt.numList = ['大', '小', '单', '双'];
                _opt.numNameList = ['FIRST', 'SECOND'];
                _opt.quickFast = false;
                _opt.multipleChoice = false;
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length
                };
                _opt.type = 'taste';
                _opt.ajaxType = 'size2b';
                break;
            case 'Last2BSOE':
                _rule = '从十位、个位中的“大、小、单、双”至少各选一个组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：十位选择大，个位选择单，开奖号码为***63，即为中奖。';
                _opt.numList = ['大', '小', '单', '双'];
                _opt.numNameList = ['FOURTH', 'FIFTH'];
                _opt.quickFast = false;
                _opt.multipleChoice = false;
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length
                };
                _opt.type = 'taste';
                _opt.ajaxType = 'size2';
                break;
            case 'AnyShow1_SSC':
                _maxBonus = '4.1512';
                _rule = '从0-9中选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中包含所选号码，即为中奖。如：投注方案：8；开奖号码：至少出现1个8，即中一帆风顺。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length
                };
                _opt.minSelect = 1;
                _opt.ajaxType = 'repeat1';
                break;
            case 'AnyShow2_SSC':
                _maxBonus = '20.8692';
                _rule = '从0-9中选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中出现2次，即为中奖。如：投注方案：8；开奖号码：至少出现2个8，即中好事成双。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length
                };
                _opt.minSelect = 1;
                _opt.ajaxType = 'repeat2';
                break;
            case 'AnyShow3_SSC':
                _maxBonus = '198.5981';
                _rule = '从0-9中选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中出现3次，即为中奖。如：投注方案：8；开奖号码：至少出现3个8，即中三星报喜。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length
                };
                _opt.minSelect = 1;
                _opt.ajaxType = 'repeat3';
                break;
            case 'AnyShow4_SSC':
                _maxBonus = '3695.6521';
                _rule = '从0-9中选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中出现4次，即为中奖。如：投注方案：8；开奖号码：至少出现4个8，即中四季发财。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length
                };
                _opt.minSelect = 1;
                _opt.ajaxType = 'repeat4';
                break;
        }

        var _str = '';
        _str += '<dl>';
        _str += '    <dt>大小单双：</dt>';
        _str += '    <dd id="J_First2BSOE" class="J_subMenu active" data-info="62#First2BSOE#2">前二大小单双</dd>';
        _str += '    <dd id="J_Last2BSOE" class="J_subMenu" data-info="63#Last2BSOE#2">后二大小单双</dd>';
        _str += '</dl>';
        _str += '<dl>';
        _str += '    <dt>特殊：</dt>';
        _str += '    <dd id="J_AnyShow1_SSC" class="J_subMenu" data-info="169#AnyShow1_SSC#2">一帆风顺</dd>';
        _str += '    <dd id="J_AnyShow2_SSC" class="J_subMenu" data-info="170#AnyShow2_SSC#2">好事成双</dd>';
        _str += '    <dd id="J_AnyShow3_SSC" class="J_subMenu" data-info="171#AnyShow3_SSC#2">三星报喜</dd>';
        _str += '    <dd id="J_AnyShow4_SSC" class="J_subMenu" data-info="172#AnyShow4_SSC#2">四季发财</dd>';
        _str += '</dl>';
        return {
            dom: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    Any: function(options) {
        /* 任选 */
        options = options || {};
        options.type = options.type || 'Any1';

        var _rule = '';
        var _opt = {
            haveCheckbox: false,
            defaultCheck: 2,
            haveTextarea: false,
            placeholder: '',
            numList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            numNameList: ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH'],
            quickFast: true,
            type: 'ball',
            formula: null,
            minSelect: 1,
            ajaxType: ''
        };
        var _maxBonus = '17.0000';
        switch (options.type) {
            case 'Any1':
                _maxBonus = '17.0000';
                _rule = '从万位、千位、百位、十位、个位中至少一位上选择1个号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：选择万位号码为1，开奖号码为1****，即为中奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length + a[a.length - 1][a[1]].length + a[a.length - 1][a[2]].length + a[a.length - 1][a[3]].length + a[a.length - 1][a[4]].length
                };
                _opt.minSelect = 0;
                _opt.ajaxType = 'any1';
                break;
            case 'Any2':
                _maxBonus = '170.0000';
                _rule = '从万位、千位、百位、十位、个位中至少两位上各选1个号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：选择万位号码为1，千位号码为2，开奖号码为12***，即为中奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[2]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length
                };
                _opt.minSelect = 0;
                _opt.ajaxType = 'any2';
                break;
            case 'Any2_Single':
                _maxBonus = '170.0000';
                _rule = '"从万位、千位、百位、十位、个位中任意勾选两个位置，手动输入一个两位数号码组成一注，所选两个位置和输入的号码都与开奖号码相同，且顺序一致，即为中奖。如：勾选位置千位、个位，输入号码12； 开奖号码：*1**2，即为中奖。"';
                _opt.haveCheckbox = true;
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n12 34\n12,34\n12;34\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                // _opt.formula = function(a){
                //     return console.log('对应 allManualEntryEvents');
                // };
                _opt.ajaxType = 'anyS2';
                break;
            case 'Any3':
                _maxBonus = '1700.0000';
                _rule = '从万位、千位、百位、十位、个位中至少三位上各选1个号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：选择万位号码为1，千位号码为2，百位号码为3，开奖号码为123**，即为中奖。';
                _opt.minSelect = 0;
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length
                };
                _opt.ajaxType = 'any3';
                break;
            case 'Any3_Single':
                _maxBonus = '1700.0000';
                _rule = '"从万位、千位、百位、十位、个位中任意勾选三个位置，在这三个位上至少各选1个号码组成一注，所选三个位置上的开奖号码与所选号码完全相同，且顺序一致，即为中奖。如：勾选位置万位、千位、十位，输入号码152；开奖号码：15*2*，即为中奖。"';
                _opt.haveCheckbox = true;
                _opt.defaultCheck = 3;
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n123 456\n123,456\n123;456\n';
                _opt.numList = [];
                // a.miBall = 0,a.stakes = 1, a.len = 3, a.digit = "",
                _opt.type = 'text';
                _opt.numNameList = [];
                // _opt.formula = function(a){
                //     return console.log('对应 allManualEntryEvents');
                // };
                _opt.ajaxType = 'anyS3';
                break;
            case 'Any4':
                _maxBonus = '17000.0000';
                _rule = '从万位、千位、百位、十位、个位中至少四位上各选1个号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：选择万位号码为1，千位号码为2，百位号码为3，十位号码为4，开奖号码为1234*，即为中奖。';
                // _opt.minSelect = 0;
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length
                };
                _opt.minSelect = 0;
                _opt.ajaxType = 'any4';
                break;
            case 'Any4_Single':
                _maxBonus = '17000.0000';
                _rule = '"从万位、千位、百位、十位、个位中任意勾选四个位置，在这四个位上至少各选1个号码组成一注，所选四个位置上的开奖号码与所选号码完全相同，且顺序一致，即为中奖。如：勾选位置万位、千位、百位、十位，输入号码1502；开奖号码：1502*，即为中奖。"';
                _opt.haveCheckbox = true;
                _opt.defaultCheck = 4;
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n1234 5678\n1234,5678\n1234;5678\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                // _opt.formula = function(a){
                //     return console.log('对应 allManualEntryEvents');
                // };
                _opt.ajaxType = 'anyS4';
                break;
            case 'Any2Com_SSC':
                _maxBonus = '85.0000';
                _rule = '从万位、千位、百位、十位、个位中任意勾选两个位置，然后从0-9中选择两个号码组成一注，所选2个位置的开奖号码与所选号码一致，顺序不限，即为中奖。中奖举例：勾选位置万位、个位，选择号码79； 开奖号码：9***7 或 7***9，均中任二组选。';
                _opt.haveCheckbox = true;
                _opt.numNameList = ['NONE#组选'];
                _opt.noAllFastBtn = true;
                _opt.maxSelect = 7;
                _opt.minSelect = 2;
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) / 2
                };
                _opt.ajaxType = 'gany2';
                break;
            case 'Any2Com_SSC_Single':
                _maxBonus = '85.0000';
                _rule = '从万位、千位、百位、十位、个位中任意勾选两个位置，然后输入两个号码组成一注，所选2个位置的开奖号码与输入号码一致，顺序不限，即为中奖。中奖举例：勾选位置万位、个位，选择号码79； 开奖号码：9***7 或 7***9，均中任二组选单式。';
                _opt.haveCheckbox = true;
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n12 34\n12,34\n12;34\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.minSelect = 2;
                _opt.numNameList = [];
                // _opt.formula = function(a){
                //     return console.log('对应 allManualEntryEvents');
                // };
                _opt.ajaxType = 'ganyS2';
                break;
            case 'Any2Sum_SSC':
                _maxBonus = '85.0000';
                _rule = '从万位、千位、百位、十位、个位中任意勾选两个位置，然后选择一个和值，所选2个位置的开奖号码相加之和与所选和值一致，顺序不限，即为中奖。中奖举例：勾选位置千位、个位，选择和值6； 开奖号码：*4**2 或 *2**4，均中任二组选和值。';
                _opt.haveCheckbox = true;
                _opt.numList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
                _opt.numNameList = ['SUM#和值'];
                _opt.quickFast = false;
                _opt.formula = function(x, options){
                    var _num = TEMPLATE.sumAndPoint(x, options, '2rdz');
                    return _num;
                };
                _opt.type = 'sum';
                _opt.sumType = '2rdz';
                _opt.ajaxType = 'gsany2';
                break;
            case 'Any3Sum_SSC':
                _maxBonus = '566.6666';
                _rule = '"从万位、千位、百位、十位、个位中任意勾选三个位置，然后选择一个和值，所选3个位置的开奖号码相加之和与所选和值一致，顺序不限，即为中奖。中奖举例：勾选位置万位、千位、个位；选择和值8；开奖号码：13**4 顺序不限，即中任三组选和值。"';
                _opt.haveCheckbox = true;
                _opt.defaultCheck = 3;
                _opt.numList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
                _opt.numNameList = ['SUM#和值'];
                // _opt.minSelect = 1;
                _opt.type = 'sum';
                _opt.quickFast = false;
                _opt.formula = function(x, options){
                    var _num = TEMPLATE.sumAndPoint(x, options, '3rdz');
                    return _num;
                };
                _opt.sumType = '3rdz';
                _opt.ajaxType = 'gsany3';
                break;
            case 'Any3Com3_SSC':
                _maxBonus = '566.6666';
                _rule = '从万位、千位、百位、十位、个位中任意勾选三个位置，然后从0-9中选择两个号码组成一注，所选3个位置的开奖号码与所选号码一致，顺序不限，即为中奖。中奖举例：勾选位置万位、千位、个位，选择号码18； 开奖号码：11**8 或 18**1，均中任三组三复式';
                _opt.haveCheckbox = true;
                _opt.defaultCheck = 3;
                _opt.minSelect = 2;
                _opt.numNameList = ['NONE#组三'];
                // _opt.maxSelect = 10;
                // _opt.minSelect = 2;
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1)
                };
                _opt.ajaxType = 'any3g3';
                break;
            case 'Any3Com6_SSC':
                _maxBonus = '283.3334';
                _rule = '从万位、千位、百位、十位、个位中任意勾选三个位置，然后从0-9中选择三个号码组成一注，所选3个位置的开奖号码与所选号码一致，顺序不限，即为中奖。中奖举例：勾选位置万位、百位、个位，选择号码159； 开奖号码：1*5*9 或 9*1*5，均中任三组六复式。';
                _opt.haveCheckbox = true;
                _opt.defaultCheck = 3;
                _opt.minSelect = 3;
                _opt.numNameList = ['NONE#组六'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) * (a[a.length - 1][a[0]].length - 2) / 6
                };
                _opt.ajaxType = 'any3g6';
                break;
            case 'Any3Com_SSC':
                _maxBonus = '566.6666';
                _rule = '从万位、千位、百位、十位、个位中任意勾选三个位置，然后输入三个号码组成一注，所选3个位置的开奖号码与输入号码一致，顺序不限，即为中奖。中奖举例：勾选位置千位、百位、个位，分別投注(0,0,1),以及(1,2,3)，开奖号码：*00*1，顺序不限，均中任三混合组选。';
                _opt.haveCheckbox = true;
                _opt.haveTextarea = true;
                _opt.defaultCheck = 3;

                // a.stakes: 1,
                // a.len: 3,
                // a.digit = ""

                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n122 123 211\n123,241,212\n122;221\n';
                _opt.numList = [];
                _opt.type = 'mixing';
                _opt.numNameList = [];
                _opt.formula = function(a){
                    return console.log('对应 allMixComboSelection');
                };
                _opt.ajaxType = 'ablend3';
                break;
            case 'Any4Com24_SSC':
                _maxBonus = '708.3334';
                _rule = '从万位、千位、百位、十位、个位中任意勾选四个位置，然后从0-9中选择四个号码组成一注，所选4个位置的开奖号码与所选号码一致，顺序不限，即为中奖。中奖举例：勾选位置万位、千位、十位、个位，选择号码1234； 开奖号码：12*34 或 13*24，均中任四组选24.';
                _opt.haveCheckbox = true;
                _opt.defaultCheck = 4;
                _opt.maxSelect = 10;
                _opt.minSelect = 4;
                _opt.numNameList = ['NONE#组选'];
                _opt.formula = function(a){
                    var b = a[a.length - 1][a[0]].length;
                    return (b - 3) * (b - 2) * (b - 1) * b / 24
                };
                _opt.ajaxType = 'any4g24';
                break;
            case 'Any4Com12_SSC':
                _maxBonus = '1416.6666';
                _rule = '从万位、千位、百位、十位、个位中任意勾选四个位置，然后选择1个二重号码和2个单号号码组成一注，所选4个位置的开奖号码中包含与所选号码，且所选二重号码在所选4个位置的开奖号码中出现了2次，即为中奖。中奖举例：勾选位置万位、千位、十位、个位，选择二重号：8，单号：0、6； 开奖号码：88*06 或08*68 均中任四组选12.';
                _opt.haveCheckbox = true;
                _opt.defaultCheck = 4;
                _opt.numNameList = ['NONE1#二重号', 'NONE2#单号'];
                _opt.teamMinSelect = {
                    NONE1 : 1,
                    NONE2 : 2
                };
                _opt.formula = function(a){
                    var b = a[a.length - 1][a[0]].length,
                    c = a[a.length - 1][a[1]].length;
                    return b * (c - 1) * c / 2 - TEMPLATE.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]]) * (c - 1)
                };
                _opt.ajaxType = 'any4g12';
                break;
            case 'Any4Com6_SSC':
                _maxBonus = '2833.3334';
                _rule = '"从万位、千位、百位、十位、个位中任意勾选四个位置，然后从0-9中选择2个二重号组成一注，所选4个位置的开奖号码与所选号码一致，并且所选的2个二重号码在所选4个位置的开奖号码中分别出现了2次，顺序不限，即为中奖。中奖举例：勾选位置万位、千位、十位、个位，选择二重号：6、8； 开奖号码：66*88 或 68*68 均中任四组选6."';
                _opt.haveCheckbox = true;
                _opt.defaultCheck = 4;
                _opt.maxSelect = 10;
                _opt.minSelect = 2;
                _opt.teamMinSelect = {
                    NONE : 2
                };
                _opt.numNameList = ['NONE#二重号'];
                _opt.formula = function(a){
                    var b = a[a.length - 1][a[0]].length;
                    return (b - 1) * b / 2
                };
                _opt.ajaxType = 'any4g6';
                break;
            case 'Any4Com4_SSC':
                _maxBonus = '4250.0000';
                _rule = '"从万位、千位、百位、十位、个位中任意勾选四个位置，然后从0-9中选择1个三重号和1个单号组成一注，所选4个位置的开奖号码与所选号码一致，并且所选三重号码在所选4个位置的开奖号码中出现了3次，顺序不限，即为中奖。中奖举例：勾选位置万位、千位、十位、个位，选择三重号：8，单号：0； 开奖号码：88*80 或 80*88 均中任四组选4."';
                _opt.haveCheckbox = true;
                _opt.defaultCheck = 4;
                _opt.teamMinSelect = {
                    NONE1 : 1,
                    NONE2 : 1
                };
                _opt.numNameList = ['NONE1#三重号', 'NONE2#单号'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length - TEMPLATE.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]])
                };
                _opt.ajaxType = 'any4g4';
                break;
        }

        var _str = '';
        _str += '<dl>';
        _str += '    <dt>直选：</dt>';
        _str += '    <dd id="J_Any1" class="J_subMenu active" data-info="58#Any1#2">任一直选</dd>';
        _str += '    <dd id="J_Any2" class="J_subMenu" data-info="59#Any2#2">任二直选</dd>';
        _str += '    <dd id="J_Any2_Single" class="J_subMenu" data-info="97#Any2_Single#2">任二直选(单式)</dd>';
        _str += '    <dd id="J_Any3" class="J_subMenu" data-info="60#Any3#2">任三直选</dd>';
        _str += '    <dd id="J_Any3_Single" class="J_subMenu" data-info="98#Any3_Single#2">任三直选(单式)</dd>';
        _str += '    <dd id="J_Any4" class="J_subMenu" data-info="61#Any4#2">任四直选</dd>';
        _str += '    <dd id="J_Any4_Single" class="J_subMenu" data-info="99#Any4_Single#2">任四直选(单式)</dd>';
        _str += '</dl>';
        _str += '<dl>';
        _str += '    <dt>组选：</dt>';
        _str += '    <dd id="J_Any2Com_SSC" class="J_subMenu" data-info="183#Any2Com_SSC#2">任二组选</dd>';
        _str += '    <dd id="J_Any2Com_SSC_Single" class="J_subMenu" data-info="184#Any2Com_SSC_Single#2">任二组选(单式)</dd>';
        _str += '    <dd id="J_Any2Sum_SSC" class="J_subMenu" data-info="182#Any2Sum_SSC#2">任二组选和值</dd>';
        _str += '    <dd id="J_Any3Sum_SSC" class="J_subMenu" data-info="178#Any3Sum_SSC#2">任三组选和值</dd>';
        _str += '    <dd id="J_Any3Com3_SSC" class="J_subMenu" data-info="179#Any3Com3_SSC#2">任三组三</dd>';
        _str += '    <dd id="J_Any3Com6_SSC" class="J_subMenu" data-info="180#Any3Com6_SSC#2">任三组六</dd>';
        _str += '    <dd id="J_Any3Com_SSC" class="J_subMenu" data-info="181#Any3Com_SSC#2">任三混合组选</dd>';
        _str += '    <dd id="J_Any4Com24_SSC" class="J_subMenu" data-info="174#Any4Com24_SSC#2">任四组选24</dd>';
        _str += '    <dd id="J_Any4Com12_SSC" class="J_subMenu" data-info="175#Any4Com12_SSC#2">任四组选12</dd>';
        _str += '    <dd id="J_Any4Com6_SSC" class="J_subMenu" data-info="176#Any4Com6_SSC#2">任四组选6</dd>';
        _str += '    <dd id="J_Any4Com4_SSC" class="J_subMenu" data-info="177#Any4Com4_SSC#2">任四组选4</dd>';
        _str += '</dl>';
        return {
            dom: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    renderSSC: {
        init: function(){
            this.renderHeader();
            this.renderMainMenu();
            this.renderSubMenu();
            this.renderRule();
        },
        renderHeader: function() {
            // 渲染时时彩相关DOM结构
            var _str = '';
            _str += '<div class="below-num fl">';
            _str += '    <div class="fl below-phase">';
            _str += '        <p>开奖号码</p>';
            _str += '        <p>第<span class="text-l-color" id="J_dataNum"></span>期</p>';
            _str += '    </div>';
            _str += '    <div class="fl below-prize-num" id="J_drawResult">';
            _str += '        <em>0</em>';
            _str += '        <em>0</em>';
            _str += '        <em>0</em>';
            _str += '        <em>0</em>';
            _str += '        <em>0</em>';
            _str += '    </div>';
            _str += '</div>';
            _str += '<div class="below-history fl rel">';
            _str += '    <dl class="history-issue fl" id="J_lastThreeDrawResult1">';
            _str += '        <dt>开奖期号</dt>';
            _str += '    </dl>';
            _str += '    <dl class="history-trend fr" id="J_lastThreeDrawResult2">';
            _str += '        <dt class="cup" id="J_trendChart"><em class="icon fl"></em>走势图</dt>';
            _str += '    </dl>';
            _str += '    <ul class="below-history-box abs" id="J_historyList">';
            _str += '    </ul>';
            _str += '</div>';

            $('#J_bettingHeader').html(_str);
        },
        renderMainMenu: function() {
            var _str = '';
            _str += '<span class="J_withChild active" data-info="5#All_5#0">五星</span>';
            _str += '<span class="J_withChild" data-info="8#First_4#1">前四</span>';
            _str += '<span class="J_withChild" data-info="4#Last_4#2">后四</span>';
            _str += '<span class="J_withChild" data-info="7#First_3#3">前三</span>';
            _str += '<span class="J_withChild" data-info="9#Middle_3#4">中三</span>';
            _str += '<span class="J_withChild" data-info="3#Last_3#5">后三</span>';
            _str += '<span class="J_withChild" data-info="6#First_2#6">前二</span>';
            _str += '<span class="J_withChild" data-info="2#Last_2#7">后二</span>';
            _str += '<span class="J_withChild" data-info="1#Last_1#8">一星</span>';
            _str += '<span class="J_withChild" data-info="12#Any_Place#9">不定位</span>';
            _str += '<span class="J_withChild" data-info="11#Fun#10">趣味</span>';
            _str += '<span class="J_withChild" data-info="10#Any#12">任选</span>';
            $('#J_mainMenuList').html(_str);
        },
        renderSubMenu: function() {
            var _str = '';
            _str += '<dl>';
            _str += '    <dt>直选：</dt>';
            _str += '    <dd id="J_All5Straight" class="J_subMenu active" data-info="31#All5Straight#2">五星直选</dd>';
            _str += '    <dd id="J_All5Straight_Single" class="J_subMenu" data-info="80#All5Straight_Single#2">五星直选（单式）</dd>';
            _str += '    <dd id="J_All5All" class="J_subMenu" data-info="32#All5All#2">五星通选</dd>';
            _str += '    <dd id="J_All5All_Single" class="J_subMenu" data-info="81#All5All_Single#2">五星通选（单式）</dd>';
            _str += '    <dd id="J_All5Join" class="J_subMenu" data-info="33#All5Join#2">五星连选</dd>';
            _str += '    <dd id="J_All5Join_Single" class="J_subMenu" data-info="82#All5Join_Single#2">五星连选（单式）</dd>';
            _str += '</dl>';
            _str += '<dl>';
            _str += '    <dt>组选：</dt>';
            _str += '    <dd id="J_AllCom120" class="J_subMenu" data-info="1601#AllCom120#2">五星组选120</dd>';
            _str += '    <dd id="J_AllCom60" class="J_subMenu" data-info="1602#AllCom60#2">五星组选60</dd>';
            _str += '    <dd id="J_AllCom30" class="J_subMenu" data-info="1603#AllCom30#2">五星组选30</dd>';
            _str += '    <dd id="J_AllCom20" class="J_subMenu" data-info="1604#AllCom20#2">五星组选20</dd>';
            _str += '    <dd id="J_AllCom10" class="J_subMenu" data-info="1605#AllCom10#2">五星组选10</dd>';
            _str += '    <dd id="J_AllCom5" class="J_subMenu" data-info="1606#AllCom5#2">五星组选5</dd>';
            _str += '</dl>';

            $('#J_subMenuList').html(_str);
        },
        renderRule: function() {
            $('#J_maxBonus').html('170000.0000');
            $('#J_bettingRule').html('从万位、千位、百位、十位、个位中分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：万位选择1，千位选择2，百位选择3，十位选择4，个位选择5，开奖号码为12345，即为中奖。');
        }
    },


 //  █╗    █╗  █╗  █╗█████╗
 // ██║   ██║  █║  █║█╔═══╝
 // ╚█║   ╚█║  ╚█╗█╬╝████╗ 
 //  █║    █║   ╚█╬╝ ╚═══█╗
 //  █║    █║   █╬█╗     █║
 //  █║    █║  █╬╝╚█╗█╗  █║
 // ███╗  ███╗ █║  █║╚███╬╝
 // ╚══╝  ╚══╝ ╚╝  ╚╝ ╚══╝ 



    // 11选5
    Any_11X5: function(options) {
        // 任选
        options = options || {};
        options.type = options.type || 'Any1_11X5';

        var _rule = '';
        var _opt = {
            haveCheckbox: false,
            defaultCheck: 2,
            haveTextarea: false,
            placeholder: '',
            numList: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'],
            numNameList: ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH'],
            quickFast: true,
            type: '',
            formula: null,
            minSelect: 1,
            maxSelect: 11,
            ajaxType: ''
        };
        var _maxBonus = '';
        switch (options.type) {
            case 'Any1_11X5':
            _maxBonus = '3.7333';
            _rule = '从01-11中任意选择1个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。 如：选择02，开奖号码为***02*，即为中奖。';
            _opt.numNameList = ['NONE#任选一'];
            _opt.type = '11x5';
            _opt.formula = function(a){
                return a[a.length - 1][a[0]].length;
            }
            break;
            case 'Any2_11X5':
            _maxBonus = '9.3333';
            _rule = '从01-11中任意选择2个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。 如：选择07 06，开奖号码为 * 07 * 06 *，即为中奖。';
            _opt.numNameList = ['NONE#任选二'];
            _opt.type = '11x5';
            _opt.minSelect = 2;
            _opt.formula = function(a){
                var b = a[a.length - 1][a[0]].length;
                return b >= 2 ? TEMPLATE.factorial(1 * b) / (TEMPLATE.factorial(1 * b - 2) * TEMPLATE.factorial(2)) : 0
            }
            break;
            case 'Any3_11X5':
            _maxBonus = '28.0000';
            _rule = '从01-11中任意选择3个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。 如：选择07 04 11，开奖号码为 * 04 11 07 *，即为中奖。';
            _opt.numNameList = ['NONE#任选三'];
            _opt.type = '11x5';
            _opt.minSelect = 3;
            _opt.formula = function(a){
                var b = a[a.length - 1][a[0]].length;
                return b >= 3 ? TEMPLATE.factorial(1 * b) / (TEMPLATE.factorial(1 * b - 3) * TEMPLATE.factorial(3)) : 0
            }
            break;
            case 'Any4_11X5':
            _maxBonus = '112.0000';
            _rule = '从01-11中任意选择4个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。 如：选择05 04 08 03，开奖号码为08 04 * 05 03，即为中奖。';
            _opt.numNameList = ['NONE#任选四'];
            _opt.type = '11x5';
            _opt.minSelect = 4;
            _opt.formula = function(a){
                var b = a[a.length - 1][a[0]].length;
                return b >= 4 ? TEMPLATE.factorial(1 * b) / (TEMPLATE.factorial(1 * b - 4) * TEMPLATE.factorial(4)) : 0
            }
            break;
            case 'Any5_11X5':
            _maxBonus = '784.0000';
            _rule = '从01-11中任意选择5个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。 如：选择05 04 11 03 08，开奖号码为08 04 11 05 03，即为中奖。';
            _opt.numNameList = ['NONE#任选五'];
            _opt.type = '11x5';
            _opt.minSelect = 5;
            _opt.formula = function(a){
                var b = a[a.length - 1][a[0]].length;
                return b >= 5 ? TEMPLATE.factorial(1 * b) / (TEMPLATE.factorial(1 * b - 5) * TEMPLATE.factorial(5)) : 0
            }
            break;
            case 'Any6_11X5':
            _maxBonus = '130.6667';
            _rule = '从01-11中任意选择6个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。 如：选择05 10 04 11 03 08，开奖号码为08 04 11 05 03，即为中奖。';
            _opt.numNameList = ['NONE#任选六'];
            _opt.type = '11x5';
            _opt.minSelect = 6;
            _opt.formula = function(a){
                var b = a[a.length - 1][a[0]].length;
                return b >= 6 ? TEMPLATE.factorial(1 * b) / (TEMPLATE.factorial(1 * b - 6) * TEMPLATE.factorial(6)) : 0
            }
            break;
            case 'Any7_11X5':
            _maxBonus = '37.3333';
            _rule = '从01-11中任意选择7个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。 如：选择05 04 10 11 03 08 09，开奖号码为08 04 11 05 03，即为中奖。';
            _opt.numNameList = ['NONE#任选七'];
            _opt.type = '11x5';
            _opt.minSelect = 7;
            _opt.formula = function(a){
                var b = a[a.length - 1][a[0]].length;
                return b >= 7 ? TEMPLATE.factorial(1 * b) / (TEMPLATE.factorial(1 * b - 7) * TEMPLATE.factorial(7)) : 0
            }
            break;
            case 'Any8_11X5':
            _maxBonus = '14.0000';
            _rule = '从01-11中任意选择8个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。 如：选择05 04 11 03 08 10 09 01，开奖号码为08 04 11 05 03，即为中奖。';
            _opt.numNameList = ['NONE#任选八'];
            _opt.type = '11x5';
            _opt.minSelect = 8;
            _opt.formula = function(a){
                var b = a[a.length - 1][a[0]].length;
                return b >= 8 ? TEMPLATE.factorial(1 * b) / (TEMPLATE.factorial(1 * b - 8) * TEMPLATE.factorial(8)) : 0
            }
            break;
            case 'Any2_11X5_Single':
            _maxBonus = '9.3333';
            _rule = '"从01-11中任意选择2个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。如：输入07 06，开奖号码为 * 07 * 06 *，即为中奖。"';
            _opt.haveTextarea = true;
            _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、逗号[,]或者分号[;]隔开\n支持格式如下:\n01 02 03,01 02 03\n01 02 03;01 02 03\n';
            _opt.numList = [];
            _opt.type = 'text';
            _opt.numNameList = [];
            break;
            case 'Any3_11X5_Single':
            _maxBonus = '28.0000';
            _rule = '"从01-11中任意选择3个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。如：输入07 04 11，开奖号码为 * 04 11 07 *，即为中奖。"';
            _opt.haveTextarea = true;
            _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、逗号[,]或者分号[;]隔开\n支持格式如下:\n01 02 03,01 02 03\n01 02 03;01 02 03\n';
            _opt.numList = [];
            _opt.type = 'text';
            _opt.numNameList = [];
            break;
            case 'Any4_11X5_Single':
            _maxBonus = '112.0000';
            _rule = '"从01-11中任意选择4个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。如：输入05 04 08 03，开奖号码为08 04 * 05 03，即为中奖。"';
            _opt.haveTextarea = true;
            _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、逗号[,]或者分号[;]隔开\n支持格式如下:\n01 02 03 04,01 02 03 04\n01 02 03 04;01 02 03 04\n';
            _opt.numList = [];
            _opt.type = 'text';
            _opt.numNameList = [];
            break;
            case 'Any5_11X5_Single':
            _maxBonus = '784.0000';
            _rule = '"从01-11中任意选择5个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。如：输入05 04 11 03 08，开奖号码为08 04 11 05 03，即为中奖。"';
            _opt.haveTextarea = true;
            _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、逗号[,]或者分号[;]隔开\n支持格式如下:\n01 02 03 04 05,01 02 03 04 05\n01 02 03 04 05;01 02 03 04 05\n';
            _opt.numList = [];
            _opt.type = 'text';
            _opt.numNameList = [];
            break;
            case 'Any6_11X5_Single':
            _maxBonus = '130.6667';
            _rule = '"从01-11中任意选择6个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。如：输入05 10 04 11 03 08，开奖号码为08 04 11 05 03，即为中奖。"';
            _opt.haveTextarea = true;
            _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、逗号[,]或者分号[;]隔开\n支持格式如下:\n01 02 03 04 05 06,01 02 03 04 05 06\n01 02 03 04 05 06;01 02 03 04 05 06\n';
            _opt.numList = [];
            _opt.type = 'text';
            _opt.numNameList = [];
            break;
            case 'Any7_11X5_Single':
            _maxBonus = '37.3333';
            _rule = '"从01-11中任意选择7个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。如：输入05 04 10 11 03 08 09，开奖号码为08 04 11 05 03，即为中奖。"';
            _opt.haveTextarea = true;
            _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、逗号[,]或者分号[;]隔开\n支持格式如下:\n01 02 03 04 05 06 07,01 02 03 04 05 06 07\n01 02 03 04 05 06 07;01 02 03 04 05 06 07\n';
            _opt.numList = [];
            _opt.type = 'text';
            _opt.numNameList = [];
            break;
            case 'Any8_11X5_Single':
            _maxBonus = '14.0000';
            _rule = '"从01-11中任意选择8个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。如：输入05 04 11 03 08 10 09 01，开奖号码为08 04 11 05 03，即为中奖。"';
            _opt.haveTextarea = true;
            _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、逗号[,]或者分号[;]隔开\n支持格式如下:\n01 02 03 04 05 06 07 08,01 02 03 04 05 06 07 08\n01 02 03 04 05 06 07 08;01 02 03 04 05 06 07 08\n';
            _opt.numList = [];
            _opt.type = 'text';
            _opt.numNameList = [];
            break;
        }

        var _str = '';
        _str += '<dl>';
        _str += '    <dt>复式：</dt>';
        _str += '    <dd id="J_Any1_11X5" data-info="908#Any1_11X5#2" class="J_subMenu active">任一直选</dd>';
        _str += '    <dd id="J_Any2_11X5" data-info="909#Any2_11X5#2" class="J_subMenu">任二直选</dd>';
        _str += '    <dd id="J_Any3_11X5" data-info="910#Any3_11X5#2" class="J_subMenu">任三直选</dd>';
        _str += '    <dd id="J_Any4_11X5" data-info="911#Any4_11X5#2" class="J_subMenu">任四直选</dd>';
        _str += '    <dd id="J_Any5_11X5" data-info="912#Any5_11X5#2" class="J_subMenu">任五直选</dd>';
        _str += '    <dd id="J_Any6_11X5" data-info="913#Any6_11X5#2" class="J_subMenu">任六直选</dd>';
        _str += '    <dd id="J_Any7_11X5" data-info="914#Any7_11X5#2" class="J_subMenu">任七直选</dd>';
        _str += '    <dd id="J_Any8_11X5" data-info="915#Any8_11X5#2" class="J_subMenu">任八直选</dd>';
        _str += '</dl>';
        _str += '<dl>';
        _str += '    <dt>单式：</dt>';
        _str += '    <dd id="J_Any2_11X5_Single" data-info="100#Any2_11X5_Single#2" class="J_subMenu">任二直选(单式)</dd>';
        _str += '    <dd id="J_Any3_11X5_Single" data-info="101#Any3_11X5_Single#2" class="J_subMenu">任三直选(单式)</dd>';
        _str += '    <dd id="J_Any4_11X5_Single" data-info="102#Any4_11X5_Single#2" class="J_subMenu">任四直选(单式)</dd>';
        _str += '    <dd id="J_Any5_11X5_Single" data-info="103#Any5_11X5_Single#2" class="J_subMenu">任五直选(单式)</dd>';
        _str += '    <dd id="J_Any6_11X5_Single" data-info="104#Any6_11X5_Single#2" class="J_subMenu">任六直选(单式)</dd>';
        _str += '    <dd id="J_Any7_11X5_Single" data-info="105#Any7_11X5_Single#2" class="J_subMenu">任七直选(单式)</dd>';
        _str += '    <dd id="J_Any8_11X5_Single" data-info="106#Any8_11X5_Single#2" class="J_subMenu">任八直选(单式)</dd>';
        _str += '</dl>';
        return {
            dom: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    OE_Counts_11X5: function(options) {
        // 定单双
        options = options || {};
        options.type = options.type || 'OECounts_11X5';

        var _rule = '';
        var _opt = {
            haveCheckbox: false,
            defaultCheck: 2,
            haveTextarea: false,
            placeholder: '',
            numList: [],
            numNameList: ['NONE'],
            quickFast: true,
            type: 'ball',
            formula: null,
            minSelect: 1,
            ajaxType: ''
        };
        var _maxBonus = '';
        switch (options.type) {
            case 'OECounts_11X5':
            _maxBonus = '784.0000';
            _rule = '从6种不同的单双组合中任意选择1个或多个组合投注，只要当期开奖号码的单双个数与所选单双组合一致，即为中奖。 如：选择0单5双，开奖号码02，04，06，08，10五个双数，即中一等奖。如：选择5单0双，开奖号码01，03，05，07，09五个单数，即中二等奖。如：选择1单4双，开奖号码01，02，04，06，08一个单数四个双数，即中三等奖。如：选择4单1双，开奖号码01，03，05，07，08四个单数一个双数，即中四等奖。如：选择2单3双，开奖号码01，03，04，06，08二个单数三个双数，即中五等奖。如：选择3单2双，开奖号码01，03，05，06，08三个单数二个双数，即中六等奖。';
            _opt.formula = function(a){
                return a[a.length - 1][a[0]].length
            }
            break;
        }

        var _str = '';
        _str += '<dl>';
        _str += '    <dt>定单双：</dt>';
        _str += '    <dd id="J_OECounts_11X5" data-info="916#OECounts_11X5#2" class="J_subMenu active">定单双</dd>';
        _str += '</dl>';
        return {
            dom: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    rd_Digit_11X5: function(options) {
        // 猜中位
        options = options || {};
        options.type = options.type || 'rdDigit_11X5';

        var _rule = '';
        var _opt = {
            haveCheckbox: false,
            defaultCheck: 2,
            haveTextarea: false,
            placeholder: '',
            numList: ['03', '04', '05', '06', '07', '08', '09'],
            numNameList: ['NONE#猜中位'],
            quickFast: true,
            type: 'czwBall',
            formula: null,
            minSelect: 1,
            ajaxType: ''
        };
        var _maxBonus = '';
        switch (options.type) {
            case 'rdDigit_11X5':
            _maxBonus = '28.0000';
            _rule = '从03-09中选择1个或多个号码投注，所选号码与当期开奖号码按照大小顺序排列后的第3个号码相同，即为中奖。 如：选择08，开奖号码为11，04，09，05，08，按开奖号码的数字大小排列为04，05，08，09，11，中间数08，即为中奖。中奖且中间数为03或09时，为一等奖；中奖且中间数为04或08时，为二等奖；中奖且中间数为05或07时，为三等奖；中奖且中间数为06时，为四等奖。';
            _opt.formula = function(a){
                return a[a.length - 1][a[0]].length
            }
            break;
        }

        var _str = '';
        _str += '<dl>';
        _str += '    <dt>猜中位：</dt>';
        _str += '    <dd id="J_rdDigit_11X5" data-info="917#rdDigit_11X5#2" class="J_subMenu active">猜中位</dd>';
        _str += '</dl>';
        return {
            dom: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    First_3_11X5: function(options) {
        // 前三
        options = options || {};
        options.type = options.type || 'First3Straight_11X5';

        var _rule = '';
        var _opt = {
            haveCheckbox: false,
            defaultCheck: 2,
            haveTextarea: false,
            placeholder: '',
            numList: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'],
            numNameList: ['FIRST', 'SECOND', 'THIRD'],
            quickFast: true,
            type: 'ball',
            formula: null,
            minSelect: 1,
            maxSelect: 11,
            ajaxType: ''
        };
        var _maxBonus = '';
        switch (options.type) {
            case 'First3Straight_11X5':
            _maxBonus = '1680.0000';
            _rule = '从01-11中选择3个不重复的号码组成一注，所选号码与当期开奖号码中的前三位号码相同，且顺序一致，即为中奖。 如：第一位选择01，第二位选择02，第三位选择03，开奖号码为01，02，03 * *，即为中奖。';
            _opt.numNameList = ['FIRST#第一位', 'SECOND#第二位', 'THIRD#第三位'];
            _opt.formula = function(a){
                var b = a[a.length - 1][a[0]],
                    c = a[a.length - 1][a[1]],
                    d = a[a.length - 1][a[2]];
                return TEMPLATE.first3StraightOf11X5(b, c, d)
            }
            break;
            case 'First3Straight_11X5_Single':
            _maxBonus = '1680.0000';
            _rule = '"手动输入3个号码组成一注，所输入的号码与开奖号码中的前3个号码相同，且顺序一致，即为中奖。如：输入01 02 03，开奖号码顺序为01，02，03 * *，即为中奖。"';
            _opt.haveTextarea = true;
            _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、逗号[,]或者分号[;]隔开\n支持格式如下:\n01 02 03,01 02 03\n01 02 03;01 02 03\n';
            _opt.numList = [];
            _opt.type = 'text';
            _opt.numNameList = [];
            break;
            case 'First3Com_11X5':
            _maxBonus = '280.0000';
            _rule = '从01-11中选择3个号码投注，所选号码与开奖号码中的前三个号码相同，顺序不限，即为中奖。 如：选择01 02 03，若开奖号码为01 02 03 * *，01 03 02 * *，02 01 03 * *，02 03 01 * *，03 01 02 * *，03 02 01 * *，即为中奖。';
            _opt.numNameList = ['NONE#组选'];
            _opt.minSelect = 3;
            _opt.formula = function(a){
                var b = a[a.length - 1][a[0]].length;
                return b >= 3 ? TEMPLATE.factorial(1 * b) / (TEMPLATE.factorial(1 * b - 3) * TEMPLATE.factorial(3)) : 0
            }
            break;
            case 'First3Com_11X5_Single':
            _maxBonus = '280.0000';
            _rule = '"手动输入3个号码组成一致，所输入的号码与开奖号码中的前3个号码相同，顺序不限，即为中奖。如：输入01 02 03，若开奖号码为01 02 03 * *，01 03 02 * *，02 01 03 * *，02 03 01 * *，03 01 02 * *，03 02 01 * *，即为中奖。"';
            _opt.haveTextarea = true;
            _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、逗号[,]或者分号[;]隔开\n支持格式如下:\n01 02 03,01 02 03\n01 02 03;01 02 03\n';
            _opt.numList = [];
            _opt.type = 'text';
            _opt.numNameList = [];
            break;
        }

        var _str = '';
        _str += '<dl>';
        _str += '    <dt>直选：</dt>';
        _str += '    <dd id="J_First3Straight_11X5" data-info="918#First3Straight_11X5#2" class="J_subMenu active">前三直选</dd>';
        _str += '    <dd id="J_First3Straight_11X5_Single" data-info="107#First3Straight_11X5_Single#2" class="J_subMenu">前三直选(单式)</dd>';
        _str += '</dl>';
        _str += '<dl>';
        _str += '    <dt>组选：</dt>';
        _str += '    <dd id="J_First3Com_11X5" data-info="919#First3Com_11X5#2" class="J_subMenu">前三组选</dd>';
        _str += '    <dd id="J_First3Com_11X5_Single" data-info="108#First3Com_11X5_Single#2" class="J_subMenu">前三组选(单式)</dd>';
        _str += '</dl>';
        return {
            dom: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    First_2_11X5: function(options) {
        // 前二
        options = options || {};
        options.type = options.type || 'First2Straight_11X5';

        var _rule = '';
        var _opt = {
            haveCheckbox: false,
            defaultCheck: 2,
            haveTextarea: false,
            placeholder: '',
            numList: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'],
            numNameList: ['FIRST', 'SECOND'],
            quickFast: true,
            type: 'ball',
            formula: null,
            minSelect: 1,
            ajaxType: ''
        };
        var _maxBonus = '';
        switch (options.type) {
            case 'First2Straight_11X5':
            _maxBonus = '186.6667';
            _rule = '从01-11中选择2个不重复的号码组成一注，所选号码与当期开奖号码中的前两个号码相同，且顺序一致，即为中奖。 如：第一位选择01，第二位选择02，开奖号码为01 02 * * *，即为中奖。';
            _opt.numNameList = ['FIRST#第一位', 'SECOND#第二位'];
            _opt.formula = function(a){
                var b = a[a.length - 1][a[0]],
                    c = a[a.length - 1][a[1]];
                return TEMPLATE.first2StraightOf11X5(b, c)
            }
            break;
            case 'First2Straight_11X5_Single':
            _maxBonus = '186.6667';
            _rule = '"手动输入2个号码组成一注，所输入的号码与开奖号码中的前2个号码相同，且顺序一致，即为中奖。如：输入01 02，开奖号码01 02 * * *，即为中奖。"';
            _opt.haveTextarea = true;
            _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、逗号[,]或者分号[;]隔开\n支持格式如下:\n01 02 03,01 02 03\n01 02 03;01 02 03\n';
            _opt.numList = [];
            _opt.type = 'text';
            _opt.numNameList = [];
            break;
            case 'First2Com_11X5':
            _maxBonus = '93.3333';
            _rule = '从01-11中选择2个号码投注，所选号码与开奖号码中的前两个号码相同，顺序不限，即为中奖。 如：选择01 02，开奖号码为02 01 * * * 或 01 02 * * *，即为中奖。';
            _opt.numNameList = ['NONE#组选'];
            _opt.minSelect = 2;
            _opt.formula = function(a){
                var b = a[a.length - 1][a[0]].length;
                return b >= 2 ? TEMPLATE.factorial(1 * b) / (TEMPLATE.factorial(1 * b - 2) * TEMPLATE.factorial(2)) : 0
            }
            break;
            case 'First2Com_11X5_Single':
            _maxBonus = '93.3333';
            _rule = '"手动输入2个号码组成一注，所输入的号码与开奖号码中的前2个号码相同，顺序不限，即为中奖。如：输入01 02，开奖号码为02 01 * * * 或 01 02 * * *，即为中奖。"';
            _opt.haveTextarea = true;
            _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、逗号[,]或者分号[;]隔开\n支持格式如下:\n01 02 03,01 02 03\n01 02 03;01 02 03\n';
            _opt.numList = [];
            _opt.type = 'text';
            _opt.numNameList = [];
            break;
        }

        var _str = '';
        _str += '<dl>';
        _str += '    <dt>直选：</dt>';
        _str += '    <dd id="J_First2Straight_11X5" data-info="920#First2Straight_11X5#2" class="J_subMenu active">前二直选</dd>';
        _str += '    <dd id="J_First2Straight_11X5_Single" data-info="109#First2Straight_11X5_Single#2" class="J_subMenu">前二直选(单式)</dd>';
        _str += '</dl>';
        _str += '<dl>';
        _str += '    <dt>组选：</dt>';
        _str += '    <dd id="J_First2Com_11X5" data-info="921#First2Com_11X5#2" class="J_subMenu">前二组选</dd>';
        _str += '    <dd id="J_First2Com_11X5_Single" data-info="110#First2Com_11X5_Single#2" class="J_subMenu">前二组选(单式)</dd>';
        _str += '</dl>';
        return {
            dom: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    Any_Place_11X5: function(options) {
        // 不定位
        options = options || {};
        options.type = options.type || 'First3AnyPlace_11X5';

        var _rule = '';
        var _opt = {
            haveCheckbox: false,
            defaultCheck: 2,
            haveTextarea: false,
            placeholder: '',
            numList: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'],
            numNameList: ['NONE#胆码'],
            quickFast: true,
            type: 'ball',
            formula: null,
            minSelect: 1,
            maxSelect: 11,
            ajaxType: ''
        };
        var _maxBonus = '';
        switch (options.type) {
            case 'First3AnyPlace_11X5':
            _maxBonus = '6.2221';
            _rule = '从01-11中选择1个或多个号码投注，只要开奖号码的前三个号码中包含所选号码，顺序不限，即为中奖。';
            _opt.formula = function(a){
                return a[a.length - 1][a[0]].length
            }
            break;
        }

        var _str = '';
        _str += '<dl>';
        _str += '    <dt>不定位：</dt>';
        _str += '    <dd id="J_First3AnyPlace_11X5" data-info="922#First3AnyPlace_11X5#2" class="J_subMenu active">前三不定位</dd>';
        _str += '</dl>';
        return {
            dom: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    Fixed_Place_11X5: function(options) {
        // 定位胆
        options = options || {};
        options.type = options.type || 'FixedPlace_11X5';

        var _rule = '';
        var _opt = {
            haveCheckbox: false,
            defaultCheck: 2,
            haveTextarea: false,
            placeholder: '',
            numList: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'],
            numNameList: ['FIRST', 'SECOND', 'THIRD'],
            quickFast: true,
            type: 'ball',
            formula: null,
            minSelect: 1,
            maxSelect: 11,
            ajaxType: ''
        };
        var _maxBonus = '';
        switch (options.type) {
            case 'FixedPlace_11X5':
            _maxBonus = '18.6667';
            _rule = '从第一位、第二位、第三位中选择1个或多个号码投注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：第一位选择01，开奖号码为01 * * * *，即为中奖。如：第二位选择05，开奖号码为* 05 * * *，即为中奖。如：第三位选择07，开奖号码为* * 07 * *，即为中奖。';
            _opt.numNameList = ['FIRST#第一位', 'SECOND#第二位', 'THIRD#第三位'];
            _opt.formula = function(a){
                return a[a.length - 1][a[0]].length + a[a.length - 1][a[1]].length + a[a.length - 1][a[2]].length
            }
            break;
        }

        var _str = '';
        _str += '<dl>';
        _str += '    <dt>定位胆：</dt>';
        _str += '    <dd id="J_FixedPlace_11X5" data-info="923#FixedPlace_11X5#2" class="J_subMenu active">定位胆</dd>';
        _str += '</dl>';
        return {
            dom: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    render11X5: {
        init: function(){
            this.renderHeader();
            this.renderMainMenu();
            this.renderSubMenu();
            this.renderRule();
        },
        renderHeader: function() {
            // 渲染11选5相关DOM结构
            var _str = '';
            _str += '<div class="below-num fl">';
            _str += '    <div class="fl below-phase">';
            _str += '        <p>开奖号码</p>';
            _str += '        <p>第<span class="text-l-color" id="J_dataNum"></span>期</p>';
            _str += '    </div>';
            _str += '    <div class="fl below-prize-num" id="J_drawResult">';
            _str += '        <em>0</em>';
            _str += '        <em>0</em>';
            _str += '        <em>0</em>';
            _str += '        <em>0</em>';
            _str += '        <em>0</em>';
            _str += '    </div>';
            _str += '</div>';
            _str += '<div class="below-history fl rel">';
            _str += '    <dl class="history-issue fl" id="J_lastThreeDrawResult1">';
            _str += '        <dt>开奖期号</dt>';
            _str += '    </dl>';
            _str += '    <dl class="history-trend fr" id="J_lastThreeDrawResult2">';
            _str += '        <dt class="cup" id="J_trendChart"><em class="icon fl"></em>走势图</dt>';
            _str += '    </dl>';
            _str += '    <ul class="below-history-box abs" id="J_historyList">';
            _str += '    </ul>';
            _str += '</div>';

            $('#J_bettingHeader').html(_str);
        },
        renderMainMenu: function() {
            var _str = '';
            _str += '<span class="J_withChild active" data-info="901#Any_11X5#0">任选</span>';
            _str += '<span class="J_withChild" data-info="902#OE_Counts_11X5#1">定单双</span>';
            _str += '<span class="J_withChild" data-info="903#rd_Digit_11X5#2">猜中位</span>';
            _str += '<span class="J_withChild" data-info="904#First_3_11X5#3">前三</span>';
            _str += '<span class="J_withChild" data-info="905#First_2_11X5#4">前二</span>';
            _str += '<span class="J_withChild" data-info="906#Any_Place_11X5#5">不定位</span>';
            _str += '<span class="J_withChild" data-info="907#Fixed_Place_11X5#6">定位胆</span>';
            $('#J_mainMenuList').html(_str);
        },
        renderSubMenu: function() {
            var _str = '';
            _str += '<dl>';
            _str += '    <dt>复式：</dt>';
            _str += '    <dd id="J_Any1_11X5" data-info="908#Any1_11X5#2" class="J_subMenu active">任一直选</dd>';
            _str += '    <dd id="J_Any2_11X5" data-info="909#Any2_11X5#2" class="J_subMenu">任二直选</dd>';
            _str += '    <dd id="J_Any3_11X5" data-info="910#Any3_11X5#2" class="J_subMenu">任三直选</dd>';
            _str += '    <dd id="J_Any4_11X5" data-info="911#Any4_11X5#2" class="J_subMenu">任四直选</dd>';
            _str += '    <dd id="J_Any5_11X5" data-info="912#Any5_11X5#2" class="J_subMenu">任五直选</dd>';
            _str += '    <dd id="J_Any6_11X5" data-info="913#Any6_11X5#2" class="J_subMenu">任六直选</dd>';
            _str += '    <dd id="J_Any7_11X5" data-info="914#Any7_11X5#2" class="J_subMenu">任七直选</dd>';
            _str += '    <dd id="J_Any8_11X5" data-info="915#Any8_11X5#2" class="J_subMenu">任八直选</dd>';
            _str += '</dl>';
            _str += '<dl>';
            _str += '    <dt>单式：</dt>';
            _str += '    <dd id="J_Any2_11X5_Single" data-info="100#Any2_11X5_Single#2" class="J_subMenu">任二直选(单式)</dd>';
            _str += '    <dd id="J_Any3_11X5_Single" data-info="101#Any3_11X5_Single#2" class="J_subMenu">任三直选(单式)</dd>';
            _str += '    <dd id="J_Any4_11X5_Single" data-info="102#Any4_11X5_Single#2" class="J_subMenu">任四直选(单式)</dd>';
            _str += '    <dd id="J_Any5_11X5_Single" data-info="103#Any5_11X5_Single#2" class="J_subMenu">任五直选(单式)</dd>';
            _str += '    <dd id="J_Any6_11X5_Single" data-info="104#Any6_11X5_Single#2" class="J_subMenu">任六直选(单式)</dd>';
            _str += '    <dd id="J_Any7_11X5_Single" data-info="105#Any7_11X5_Single#2" class="J_subMenu">任七直选(单式)</dd>';
            _str += '    <dd id="J_Any8_11X5_Single" data-info="106#Any8_11X5_Single#2" class="J_subMenu">任八直选(单式)</dd>';
            _str += '</dl>';

            $('#J_subMenuList').html(_str);
        },
        renderRule: function() {
            $('#J_maxBonus').html('3.7333');
            $('#J_bettingRule').html('从01-11中任意选择1个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。 如：选择02，开奖号码为***02*，即为中奖。');
        }
    },

        
// █╗  █╗█████╗
// █║ █╬╝╚══█╔╝
// █║█╬╝   █╬╝ 
// ██╬╝    ╚█╗ 
// █╔█╗     ╚█╗
// █║╚█╗ █╗  █║
// █║ ╚█╗╚███╬╝
// ╚╝  ╚╝ ╚══╝ 
    
    K3_SUM: function(options) {
        options = options || {};
        options.type = options.type || 'K3_SUM';

        var _rule = '';
        var _opt = {
            haveCheckbox: false,
            defaultCheck: 0,
            haveTextarea: false,
            placeholder: '',
            // numList: ['03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
            numList: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
            numNameList: ['SUM'],
            quickFast: false,
            type: 'sum',
            formula: null,
            minSelect: 1,
            maxSelect: 11,
            ajaxType: ''
        };
        var _maxBonus = '15.5200';
        switch (options.type) {
            case 'K3_SUM':
            _rule = '至少选择1个和值（3个号码之和）进行投注，所选和值与开奖的3个号码的和值相同即中奖';
            _opt.numNameList = ['SUM#和值'];
            _opt.formula = function(x, options){
                var _num = TEMPLATE.sumAndPoint(x, options, 'k3sum');
                return _num;
            };
            _opt.sumType = 'k3sum';
            break;
        }

        var _str = '';

        return {
            dom: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    K3_threeSame: function(options) {
        // 三同号
        options = options || {};
        options.type = options.type || 'K3_threeSame';

        var _rule = '';
        var _opt = {
            haveCheckbox: false,
            defaultCheck: 0,
            haveTextarea: false,
            placeholder: '',
            numList: [''],
            numNameList: [''],
            quickFast: false,
            type: 'dice',
            formula: null,
            minSelect: 1,
            maxSelect: 11,
            ajaxType: ''
        };
        var _maxBonus = '419.0400';
        switch (options.type) {
            case 'K3_threeSame':
            _rule = '对豹子号（111，222，333，444，555，666）进行单选或通选投注，选号与开奖号相同即中奖';
            _opt.formula = function(x, options){
                var _num = TEMPLATE.sumAndPoint(x, options, 'k3sum');
                return _num;
            };
            break;
        }

        var _arr = ['666','555','444','333','222','111'];
        var _str = '';

        _str += '<ul class="J_diceList k3-sth clearfix" data-row="DICE">';
        $.each(_arr, function(i, n){
            _str += '<li id="J_dice_'+ i +'" class="J_dice" data-v="'+ n +'"><span class="s'+ n[0] +'"></span><span class="s'+ n[1] +'"></span><span class="last s'+ n[2] +'"></span></li>';
        });
        _str += '</ul>';

        return {
            dice: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    K3_twoSame: function(options) {
        // 二同号
        options = options || {};
        options.type = options.type || 'K3_twoSame';

        var _rule = '';
        var _opt = {
            haveCheckbox: false,
            defaultCheck: 0,
            haveTextarea: false,
            placeholder: '',
            numList: [''],
            numNameList: [''],
            quickFast: false,
            type: 'dice',
            formula: null,
            minSelect: 1,
            maxSelect: 11,
            ajaxType: ''
        };
        var _maxBonus = '139.6800';
        switch (options.type) {
            case 'K3_twoSame':
            _rule = '选择1对相同号码和1个不同号码进行单选或者多选投注，选号与开奖号相同（顺序不限）即中奖';
            _opt.formula = function(x, options){
                var _num = TEMPLATE.sumAndPoint(x, options, 'k3sum');
                return _num;
            };
            break;
        }

        var _arr = ['112','122','133','144','155','166','113','223','233','244','255','266','114','224','334','344','355','366','115','225','335','445','455','466','116','226','336','446','556','566','11','22','33','44','55','66'];
        var _str = '';

        _str += '<ul class="J_diceList k3-eth clearfix" data-row="DICE">';
        $.each(_arr, function(i, n){
            if (n.length == 3) {
                _str += '<li id="J_dice_'+ i +'" class="J_dice" data-v="'+ n +'"><span class="s'+ n[0] +'"></span><span class="s'+ n[1] +'"></span><span class="last s'+ n[2] +'"></span></li>';
            } else {
                _str += '<li class="J_diceFast fast" data-v="'+ n +'"><span class="s'+ n[0] +'"></span><span class="s'+ n[1] +'"></span></li>';
            }
        });
        _str += '</ul>';

        return {
            dice: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    K3_threeDifferent: function(options) {
        // 三不同号
        options = options || {};
        options.type = options.type || 'K3_threeDifferent';

        var _rule = '';
        var _opt = {
            haveCheckbox: false,
            defaultCheck: 0,
            haveTextarea: false,
            placeholder: '',
            numList: [''],
            numNameList: [''],
            quickFast: false,
            type: 'dice',
            formula: null,
            minSelect: 1,
            maxSelect: 11,
            ajaxType: ''
        };
        var _maxBonus = '69.8400';
        switch (options.type) {
            case 'K3_threeDifferent':
            _rule = '对所有3不同号进行单选或多选，选号与开奖号相同（顺序不限）即中奖';
            _opt.formula = function(x, options){
                var _num = TEMPLATE.sumAndPoint(x, options, 'k3sum');
                return _num;
            };
            break;
        }

        var _arr = ['123','134','146','236','345','124','135','156','245','346','125','136','234','246','356','126','145','235','256','456'];
        var _str = '';

        _str += '<ul class="J_diceList k3-sbth clearfix" data-row="DICE">';
        $.each(_arr, function(i, n){
            _str += '<li id="J_dice_'+ i +'" class="J_dice" data-v="'+ n +'"><span class="s'+ n[0] +'"></span><span class="s'+ n[1] +'"></span><span class="last s'+ n[2] +'"></span></li>';
            
        });
        _str += '</ul>';

        return {
            dice: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    K3_twoDifferent: function(options) {
        // 二不同号
        options = options || {};
        options.type = options.type || 'K3_twoDifferent';

        var _rule = '';
        var _opt = {
            haveCheckbox: false,
            defaultCheck: 0,
            haveTextarea: false,
            placeholder: '',
            numList: [''],
            numNameList: [''],
            quickFast: false,
            type: 'dice',
            formula: null,
            minSelect: 1,
            maxSelect: 11,
            ajaxType: ''
        };
        var _maxBonus = '13.9680';
        switch (options.type) {
            case 'K3_twoDifferent':
            _rule = '对所有2不同号进行单选或多选，选号与开奖号中任意2个号码相同即中奖';
            _opt.formula = function(x, options){
                var _num = TEMPLATE.sumAndPoint(x, options, 'k3sum');
                return _num;
            };
            break;
        }

        var _arr = ['12','15','24','34','45','13','16','25','35','46','14','23','26','36','56'];
        var _str = '';

        _str += '<ul class="J_diceList k3-ebth clearfix" data-row="DICE">';
        $.each(_arr, function(i, n){
            _str += '<li id="J_dice_'+ i +'" class="J_dice" data-v="'+ n +'"><span class="s'+ n[0] +'"></span><span class="last s'+ n[1] +'"></span></li>';
            
        });
        _str += '</ul>';

        return {
            dice: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    K3_tripleNumber: function(options) {
        // 三连号
        options = options || {};
        options.type = options.type || 'K3_tripleNumber';

        var _rule = '';
        var _opt = {
            haveCheckbox: false,
            defaultCheck: 0,
            haveTextarea: false,
            placeholder: '',
            numList: [''],
            numNameList: [''],
            quickFast: false,
            type: 'dice',
            formula: null,
            minSelect: 1,
            maxSelect: 11,
            ajaxType: ''
        };
        var _maxBonus = '69.8400';
        switch (options.type) {
            case 'K3_tripleNumber':
            _rule = '对所有3个相连的号码（123，234，345，456)进行单选或多选投注，选号与开奖号相同（顺序不限）即中奖';
            _opt.formula = function(x, options){
                var _num = TEMPLATE.sumAndPoint(x, options, 'k3sum');
                return _num;
            };
            break;
        }

        var _arr = ['123','234','345','456'];
        var _str = '';

        _str += '<ul class="J_diceList k3-slh clearfix" data-row="DICE">';
        $.each(_arr, function(i, n){
            _str += '<li id="J_dice_'+ i +'" class="J_dice" data-v="'+ n +'"><span class="s'+ n[0] +'"></span><span class="last s'+ n[1] +'"></span><span class="last s'+ n[2] +'"></span></li>';
            
        });
        _str += '</ul>';

        return {
            dice: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    K3_singledOut: function(options) {
        // 单挑一骰
        options = options || {};
        options.type = options.type || 'K3_singledOut';

        var _rule = '';
        var _opt = {
            haveCheckbox: false,
            defaultCheck: 0,
            haveTextarea: false,
            placeholder: '',
            numList: [''],
            numNameList: [''],
            quickFast: false,
            type: 'dice',
            formula: null,
            minSelect: 1,
            maxSelect: 11,
            ajaxType: ''
        };
        var _maxBonus = '4.6050';
        switch (options.type) {
            case 'K3_singledOut':
            _rule = '选择1个或者多个骰号，如果开奖号码中包含该号（顺序不限）即中奖';
            _opt.formula = function(x, options){
                var _num = TEMPLATE.sumAndPoint(x, options, 'k3sum');
                return _num;
            };
            break;
        }

        var _arr = ['6','5','4','3','2','1'];
        var _str = '';

        _str += '<ul class="J_diceList k3-dyts clearfix" data-row="DICE">';
        $.each(_arr, function(i, n){
            _str += '<li id="J_dice_'+ i +'" class="J_dice" data-v="'+ n +'"><span class="s'+ n[0] +'"></span></li>';
            
        });
        _str += '</ul>';

        return {
            dice: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    renderK3: {
        init: function(){
            this.renderHeader();
            this.renderMainMenu();
            this.renderRule();
        },
        renderHeader: function() {
            // 渲染快三相关DOM结构
            var _str = '';
            _str += '<div class="below-num fl">';
            _str += '    <div class="fl below-phase">';
            _str += '        <p>开奖号码</p>';
            _str += '        <p>第<span class="text-l-color" id="J_dataNum"></span>期</p>';
            _str += '    </div>';
            _str += '    <div class="fl below-prize-num k3-prize" id="J_drawResult">';
            _str += '        <em class="s1"></em>';
            _str += '        <em class="s2"></em>';
            _str += '        <em class="s3"></em>';
            _str += '    </div>';
            _str += '</div>';
            _str += '<div class="below-history fl rel">';
            _str += '    <dl class="history-issue fl" id="J_lastThreeDrawResult1">';
            _str += '        <dt>开奖期号</dt>';
            _str += '    </dl>';
            _str += '    <dl class="history-trend fr" id="J_lastThreeDrawResult2">';
            _str += '        <dt class="cup" id="J_trendChart"><em class="icon fl"></em>走势图</dt>';
            _str += '    </dl>';
            _str += '    <ul class="below-history-box abs" id="J_historyList">';
            _str += '    </ul>';
            _str += '</div>';

            $('#J_bettingHeader').html(_str);
        },
        renderMainMenu: function() {
            var _str = '';
            _str += '<span class="J_withChild active" data-info="901#K3_SUM#0">和值</span>';
            _str += '<span class="J_withChild" data-info="902#K3_threeSame#1">三同号</span>';
            _str += '<span class="J_withChild" data-info="903#K3_twoSame#2">二同号</span>';
            _str += '<span class="J_withChild" data-info="904#K3_threeDifferent#3">三不同号</span>';
            _str += '<span class="J_withChild" data-info="905#K3_twoDifferent#4">二不同号</span>';
            _str += '<span class="J_withChild" data-info="906#K3_tripleNumber#5">三连号</span>';
            _str += '<span class="J_withChild" data-info="907#K3_singledOut#6">单挑一骰</span>';
            $('#J_mainMenuList').html(_str);
        },
        renderRule: function() {
            $('#J_maxBonus').html('15.5200');
            $('#J_bettingRule').html('至少选择1个和值（3个号码之和）进行投注，所选和值与开奖的3个号码的和值相同即中奖');
        }
    },
    


// ████╗ █╗  █╗  █╗   ███╗ 
// █╔══█╗█║ █╬╝ ██║  █╬══█╗
// █║  █║█║█╬╝  ╚█║  █║ ██║
// ████╬╝██╬╝    █║  █║█╬█║
// █╔══╝ █╔█╗    █║  ██╬╝█║
// █║    █║╚█╗   █║  █╔╝ █║
// █║    █║ ╚█╗ ███╗ ╚███╬╝
// ╚╝    ╚╝  ╚╝ ╚══╝  ╚══╝ 

    First_1_PK10: function(options) {
        // 猜前一
        options = options || {};
        options.type = options.type || 'First1_PK10';

        var _rule = '';
        var _opt = {
            haveCheckbox: false,
            defaultCheck: 2,
            haveTextarea: false,
            placeholder: '',
            numList: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
            numNameList: ['NONE#冠军'],
            quickFast: true,
            type: 'ball',
            formula: null,
            minSelect: 1,
            ajaxType: ''
        };
        var _maxBonus = '';
        switch (options.type) {
            case 'First1_PK10':
            _maxBonus = '17.0000';
            _rule = '从冠军投注的1个号码与开奖号码中的第1位数号码相同，视为中奖。如：投注方案：01 开奖号码：01*********，即中猜前一。';
            _opt.formula = function(a){
                return a[a.length - 1][a[0]].length
            }
            break;
        }

        var _str = '';
        _str += '<dl>';
        // _str += '    <dt>定位胆：</dt>';
        _str += '    <dd id="J_First1_PK10" data-info="1457#First1_PK10#2" class="J_subMenu active">猜前一</dd>';
        _str += '</dl>';
        return {
            dom: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    First_2_PK10: function(options) {
        // 猜前二
        options = options || {};
        options.type = options.type || 'First2_PK10';

        var _rule = '从冠军、亚军投注的两个号码与开奖号码中的前2个号码相同且顺序一致，视为中奖。如：投注方案：01 02开奖号码：01 02********，即中猜前二。';
        var _opt = {
            haveCheckbox: false,
            defaultCheck: 2,
            haveTextarea: false,
            placeholder: '',
            numList: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
            numNameList: ['NONE#冠军'],
            quickFast: true,
            type: 'ball',
            formula: null,
            minSelect: 1,
            ajaxType: ''
        };
        var _maxBonus = '153.0000';
        switch (options.type) {
            case 'First2_PK10':
            _opt.numNameList = ['FIRST#冠军', 'SECOND#亚军'];
            _opt.formula = function(a){
                var b = a[a.length - 1][a[0]],
                    c = a[a.length - 1][a[1]];
                return TEMPLATE.first2StraightOf11X5(b, c)
            }
            break;
            case 'First2_PK10_Single':
            _opt.haveTextarea = true;
            _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、逗号[,]或者分号[;]隔开\n支持格式如下:\n0102, 0102\n0102,0102\n0102;0102\n';
            _opt.numList = [];
            _opt.type = 'text';
            _opt.numNameList = [];
            break;
        }

        var _str = '';
        _str += '<dl>';
        // _str += '    <dt>定位胆：</dt>';
        _str += '    <dd id="J_First2_PK10" data-info="1458#First2_PK10#2" class="J_subMenu active">猜前二</dd>';
        _str += '    <dd id="J_First2_PK10_Single" data-info="1732#First2_PK10_Single#2" class="J_subMenu">猜前二（单式）</dd>';
        _str += '</dl>';
        return {
            dom: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    First_3_PK10: function(options) {
        // 猜前三
        options = options || {};
        options.type = options.type || 'First3_PK10';

        var _rule = '从冠军、亚军、季军投注的三个号码与开奖号码中的前3个号码相同且顺序一致，视为中奖。如：冠军、亚军、季军位买01 02 03；开奖号码：冠军、亚军、季军开01 02 03*******，即中猜前三。';
        var _opt = {
            haveCheckbox: false,
            defaultCheck: 2,
            haveTextarea: false,
            placeholder: '',
            numList: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
            numNameList: ['NONE#冠军'],
            quickFast: true,
            type: 'ball',
            formula: null,
            minSelect: 1,
            ajaxType: ''
        };
        var _maxBonus = '1224.0000';
        switch (options.type) {
            case 'First3_PK10':
            _opt.numNameList = ['FIRST#冠军', 'SECOND#亚军', 'THIRD#季军'];
            _opt.formula = function(a){
                var b = a[a.length - 1][a[0]],
                    c = a[a.length - 1][a[1]],
                    d = a[a.length - 1][a[2]];
                return TEMPLATE.first3StraightOf11X5(b, c, d)
            }
            break;
            case 'First3_PK10_Single':
            _opt.haveTextarea = true;
            _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、逗号[,]或者分号[;]隔开\n支持格式如下:\n010203 010203\n010203,010203\n010203;010203\n';
            _opt.numList = [];
            _opt.type = 'text';
            _opt.numNameList = [];
            break;
        }

        var _str = '';
        _str += '<dl>';
        // _str += '    <dt>定位胆：</dt>';
        _str += '    <dd id="J_First3_PK10" data-info="1459#First3_PK10#2" class="J_subMenu active">猜前三</dd>';
        _str += '    <dd id="J_First3_PK10_Single" data-info="1733#First3_PK10_Single#2" class="J_subMenu">猜前三（单式）</dd>';
        _str += '</dl>';
        return {
            dom: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    First_4_PK10: function(options) {
        // 猜前四
        options = options || {};
        options.type = options.type || 'First4_PK10';

        var _rule = '从冠军、亚军、季军、第四名中选择一个4位数号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。：投注01、02、03、04，开奖号码：01、02、03、04 ******，即中猜前四。';
        var _opt = {
            haveCheckbox: false,
            defaultCheck: 2,
            haveTextarea: false,
            placeholder: '',
            numList: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
            numNameList: ['NONE#冠军'],
            quickFast: true,
            type: 'ball',
            formula: null,
            minSelect: 1,
            ajaxType: ''
        };
        var _maxBonus = '8568.0000';
        switch (options.type) {
            case 'First4_PK10':
            _opt.numNameList = ['FIRST#冠军', 'SECOND#亚军', 'THIRD#季军', 'FOURTH#第四名'];
            _opt.formula = function(a){
                var b = a[a.length - 1][a[0]],
                    c = a[a.length - 1][a[1]],
                    d = a[a.length - 1][a[2]],
                    e = a[a.length - 1][a[3]];
                return TEMPLATE.first4StraightOf11X5(b, c, d, e)
            }
            break;
            case 'First4_PK10_Single':
            _opt.haveTextarea = true;
            _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、逗号[,]或者分号[;]隔开\n支持格式如下:\n01020304, 01020304\n01020304,01020304\n01020304;01020304\n';
            _opt.numList = [];
            _opt.type = 'text';
            _opt.numNameList = [];
            break;
        }

        var _str = '';
        _str += '<dl>';
        // _str += '    <dt>定位胆：</dt>';
        _str += '    <dd id="J_First3_PK10" data-info="1460#First4_PK10#2" class="J_subMenu active">猜前四</dd>';
        _str += '    <dd id="J_First3_PK10_Single" data-info="1734#First4_PK10_Single#2" class="J_subMenu">猜前四（单式）</dd>';
        _str += '</dl>';
        return {
            dom: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    First_5_PK10: function(options) {
        // 猜前五
        options = options || {};
        options.type = options.type || 'First5_PK10';

        var _rule = '从冠军、亚军、季军、第四名中选择一个4位数号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。：投注01、02、03、04，开奖号码：01、02、03、04 ******，即中猜前四。';
        var _opt = {
            haveCheckbox: false,
            defaultCheck: 2,
            haveTextarea: false,
            placeholder: '',
            numList: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
            numNameList: ['NONE#冠军'],
            quickFast: true,
            type: 'ball',
            formula: null,
            minSelect: 1,
            ajaxType: ''
        };
        var _maxBonus = '51408.0000';
        switch (options.type) {
            case 'First5_PK10':
            _opt.numNameList = ['FIRST#冠军', 'SECOND#亚军', 'THIRD#季军', 'FOURTH#第四名', 'FIFTH#第五名'];
            _opt.formula = function(a){
                var b = a[a.length - 1][a[0]],
                    c = a[a.length - 1][a[1]],
                    d = a[a.length - 1][a[2]],
                    e = a[a.length - 1][a[3]],
                    f = a[a.length - 1][a[4]];
                return TEMPLATE.first5StraightOf11X5(b, c, d, e, f)
            }
            break;
            case 'First5_PK10_Single':
            _opt.haveTextarea = true;
            _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、逗号[,]或者分号[;]隔开\n支持格式如下:\n0102030405 0102030405\n0102030405,0102030405\n0102030405;0102030405\n';
            _opt.numList = [];
            _opt.type = 'text';
            _opt.numNameList = [];
            break;
        }

        var _str = '';
        _str += '<dl>';
        // _str += '    <dt>定位胆：</dt>';
        _str += '    <dd id="J_First5_PK10" data-info="1461#First5_PK10#2" class="J_subMenu active">猜前五</dd>';
        _str += '    <dd id="J_First5_PK10_Single" data-info="1735#First5_PK10_Single#2" class="J_subMenu">猜前五（单式）</dd>';
        _str += '</dl>';
        return {
            dom: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    Fixed_Place_PK10: function(options) {
        // 定位胆
        options = options || {};
        options.type = options.type || 'First5Fixed_PK10';

        var _rule = '';
        var _opt = {
            haveCheckbox: false,
            defaultCheck: 2,
            haveTextarea: false,
            placeholder: '',
            numList: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
            numNameList: ['NONE#冠军'],
            quickFast: true,
            type: 'ball',
            formula: null,
            minSelect: 1,
            ajaxType: ''
        };
        var _maxBonus = '17.0000';
        switch (options.type) {
            case 'First5Fixed_PK10':
            _rule = '从冠军位开始选择最少一个,最多十个位置，任意1个位置或者多个位置上选择1个号码，所选号码与相同位置上的开奖号码一致，即为中奖。如：投注方案：01（冠军），开奖号码：01**********即中定位胆。';
            _opt.numNameList = ['FIRST#冠军', 'SECOND#亚军', 'THIRD#季军', 'FOURTH#第四名', 'FIFTH#第五名'];
            _opt.formula = function(a){
                return a[a.length - 1][a[0]].length + a[a.length - 1][a[1]].length + a[a.length - 1][a[2]].length + a[a.length - 1][a[3]].length + a[a.length - 1][a[4]].length
            }
            break;
            case 'Last5Fixed_PK10':
            _rule = '从第六位开始选择最少一个,最多十个位置，任意1个位置或者多个位置上选择1个号码，所选号码与相同位置上的开奖号码一致，即为中奖。如：投注方案：06（第六名），开奖号码：******06****即中定位胆。';
            _opt.numNameList = ['FIRST#第六名', 'SECOND#第七名', 'THIRD#第八名', 'FOURTH#第九名', 'FIFTH#第十名'];
            _opt.formula = function(a){
                return a[a.length - 1][a[0]].length + a[a.length - 1][a[1]].length + a[a.length - 1][a[2]].length + a[a.length - 1][a[3]].length + a[a.length - 1][a[4]].length
            }
            break;
        }

        var _str = '';
        _str += '<dl>';
        // _str += '    <dt>定位胆：</dt>';
        _str += '    <dd id="J_First5Fixed_PK10" data-info="1462#First5Fixed_PK10#2" class="J_subMenu active">前五定位胆</dd>';
        _str += '    <dd id="J_Last5Fixed_PK10" data-info="1463#Last5Fixed_PK10#2" class="J_subMenu">后五定位胆</dd>';
        _str += '</dl>';
        return {
            dom: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    Sum_PK10: function(options) {
        // 猜和值
        options = options || {};
        options.type = options.type || 'First2Sum_PK10';

        var _rule = '';
        var _opt = {
            haveCheckbox: false,
            defaultCheck: 2,
            haveTextarea: false,
            placeholder: '',
            numList: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
            numNameList: [],
            quickFast: false,
            type: 'sum',
            formula: null,
            minSelect: 1,
            ajaxType: ''
        };
        var _maxBonus = '76.5000';
        switch (options.type) {
            case 'First2Sum_PK10':
            _rule = '从3-19中任意选择至少一个号码组成一组，开奖号码前二位之和与所选的号码一致即为中奖，顺序不限。如：投注3，开奖号码：0102**********（顺序不限），即中冠亚和值。';
            _opt.numNameList = ['SUM#冠亚和'];
            _opt.formula = function(x, options){
                var _num = TEMPLATE.sumAndPoint(x, options, '2rpk');
                return _num;
            };
            _opt.sumType = '2rpk';
            break;
            case 'First3Sum_PK10':
            _rule = '从6-27中任意选择至少一个号码组成一组，开奖号码前三位之和与所选的号码一致即为中奖，顺序不限。如：投注8，开奖号码：01、02、05*******，即中冠亚季和值。';
            _opt.numNameList = ['SUM#冠亚季和'];
            _opt.formula = function(x, options){
                var _num = TEMPLATE.sumAndPoint(x, options, '3rpk');
                return _num;
            };
            _opt.sumType = '3rpk';
            _maxBonus = '204.0000'
            _opt.numList = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
            break;
            case 'FirstLastSum_PK10':
            _rule = '从3-19中任意选择至少一个号码组成一组，开奖号码冠军和第十名之和与所选的号码一致即为中奖，顺序不限。如：投注8，开奖号码：02*******06，即首尾和值。';
            _opt.numNameList = ['SUM#首尾和'];
            _opt.formula = function(x, options){
                var _num = TEMPLATE.sumAndPoint(x, options, '2rpk');
                return _num;
            };
            _opt.sumType = '2rpk';
            break;
        }

        var _str = '';
        _str += '<dl>';
        // _str += '    <dt>定位胆：</dt>';
        _str += '    <dd id="J_First2Sum_PK10" data-info="1464#First2Sum_PK10#2" class="J_subMenu active">冠亚和值</dd>';
        _str += '    <dd id="J_First3Sum_PK10" data-info="1465#First3Sum_PK10#2" class="J_subMenu">冠亚季和值</dd>';
        _str += '    <dd id="J_FirstLastSum_PK10" data-info="1466#FirstLastSum_PK10#2" class="J_subMenu">首尾和值</dd>';
        _str += '</dl>';
        return {
            dom: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    BSOE_PK10: function(options) {
        // 大小单双
        options = options || {};
        options.type = options.type || 'First5BSOE_PK10';

        var _rule = '';
        var _opt = {
            haveCheckbox: false,
            haveTextarea: false,
            placeholder: '',
            numList: [],
            numNameList: [],
            quickFast: true,
            type: 'taste',
            formula: null,
            minSelect: 1,
            ajaxType: ''
        };
        var _maxBonus = '3.4000';
        switch (options.type) {
            case 'First5BSOE_PK10':
                _rule = '从冠军、亚军、季军、第四名、第五名中的“大、小、单、双”中至少选一个组成一注。如：投注第一名单，开奖号码：03*********，即中第一名大小单双。';
                _opt.numList = ['大', '小', '单', '双'];
                _opt.numNameList = ['FIRST#冠军', 'SECOND#亚军', 'THIRD#季军', 'FOURTH#第四名', 'FIFTH#第五名'],
                _opt.quickFast = false;
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length + a[a.length - 1][a[1]].length + a[a.length - 1][a[2]].length + a[a.length - 1][a[3]].length + a[a.length - 1][a[4]].length
                }
                break;
            case 'Last5BSOE_PK10':
                _rule = '从第六、第七、第八、第九、第十名中的“大、小、单、双”中至少选一个组成一注。如：投注第十名双，开奖号码：*********08，即中第十名大小单双。';
                _opt.numList = ['大', '小', '单', '双'];
                _opt.numNameList = ['FIRST#第六名', 'SECOND#第七名', 'THIRD#第八名', 'FOURTH#第九名', 'FIFTH#第十名'],
                _opt.quickFast = false;
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length + a[a.length - 1][a[1]].length + a[a.length - 1][a[2]].length + a[a.length - 1][a[3]].length + a[a.length - 1][a[4]].length
                }
                break;
            case 'First2SumBSOE_PK10':
                _rule = '从冠亚和值“大、小、单、双”至少选择一个号码形态进行投注，所选的号码与对应开奖号码和值一致则中奖。如投注方案：小，开奖号码：0506*******（顺序不限）则中冠亚和值大小单双。（注：3至11为小，12至19为大）';
                _opt.maxBonus= '3.8250'
                _opt.numList = ['大', '小', '单', '双'];
                _opt.numNameList = ['NONE#冠亚和'];
                _opt.quickFast = false;
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length
                }
                break;
        }

        var _str = '';
        _str += '<dl>';
        _str += '    <dd id="J_First5BSOE_PK10" class="J_subMenu active" data-info="1467#First5BSOE_PK10#2">前五大小单双</dd>';
        _str += '    <dd id="J_Last5BSOE_PK10" class="J_subMenu" data-info="1468#Last5BSOE_PK10#2">后五大小单双</dd>';
        _str += '    <dd id="J_First2SumBSOE_PK10" class="J_subMenu" data-info="1469#First2SumBSOE_PK10#2">冠亚和大小单双</dd>';
        _str += '</dl>';
        return {
            dom: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    Dragon_Tiger_PK10: function(options) {
        // 龙虎斗
        options = options || {};
        options.type = options.type || 'First5BSOE_PK10';

        var _rule = '';
        var _opt = {
            haveCheckbox: false,
            haveTextarea: false,
            placeholder: '',
            numList: [],
            numNameList: ['NONE'],
            quickFast: true,
            type: 'dragonTiger',
            formula: null,
            minSelect: 1,
            ajaxType: '',
            formula: function(a){
                return a[a.length - 1][a[0]].length
            }
        };
        var _maxBonus = '3.4000';
        switch (options.type) {
            case 'Dragon_Tiger_1_VS_10':
            _rule = '龙虎是由两两名次进行号码PK，冠军、亚军、第三名、第四名、第五名为龙，第六名、第七名、第八名、第九名、第十名为虎，若冠军车号大于第十名，则为龙，反之则为虎..以此类推。如投注举例:投注第一名VS第十名，投注内容：[龙]，开奖比赛结果第一名为05，第十名为04，即为中奖。';
            _opt.numNameList = ['NONE#龙vs虎'];
            _opt.formula = function(a){
                return a[a.length - 1][a[0]].length
            }
            break;
            case 'Dragon_Tiger_2_VS_9':
            _rule = '龙虎是由两两名次进行号码PK，冠军、亚军、第三名、第四名、第五名为龙，第六名、第七名、第八名、第九名、第十名为虎，若亚军车号大于第九名，则为龙，反之则为虎..以此类推。如投注举例:投注第二名VS第九名，投注内容：[龙]，开奖比赛结果第二名为05，第九名为04，即为中奖。';
            _opt.numNameList = ['NONE#龙vs虎'];
            _opt.formula = function(a){
                return a[a.length - 1][a[0]].length
            }
            break;
            case 'Dragon_Tiger_3_VS_8':
            _rule = '龙虎是由两两名次进行号码PK，冠军、亚军、第三名、第四名、第五名为龙，第六名、第七名、第八名、第九名、第十名为虎，若第三名车号大于第八名，则为龙，反之则为虎..以此类推。如投注举例:投注第三名VS第八名，投注内容：[龙]，开奖比赛结果第三名为05，第八名为04，即为中奖。';
            _opt.numNameList = ['NONE#龙vs虎'];
            _opt.formula = function(a){
                return a[a.length - 1][a[0]].length
            }
            break;
            case 'Dragon_Tiger_4_VS_7':
            _rule = '龙虎是由两两名次进行号码PK，冠军、亚军、第三名、第四名、第五名为龙，第六名、第七名、第八名、第九名、第十名为虎，若第四名车号大于第七名，则为龙，反之则为虎..以此类推。如投注举例:投注第四名VS第七名，投注内容：[龙]，开奖比赛结果第四名为05，第七名为04，即为中奖。';
            _opt.numNameList = ['NONE#龙vs虎'];
            _opt.formula = function(a){
                return a[a.length - 1][a[0]].length
            }
            break;
            case 'Dragon_Tiger_5_VS_6':
            _rule = '龙虎是由两两名次进行号码PK，冠军、亚军、第三名、第四名、第五名为龙，第六名、第七名、第八名、第九名、第十名为虎，若第五名车号大于第六名，则为龙，反之则为虎..以此类推。如投注举例:投注第五名VS第六名，投注内容：[龙]，开奖比赛结果第五名为05，第六名为04，即为中奖。';
            _opt.numNameList = ['NONE#龙vs虎'];
            _opt.formula = function(a){
                return a[a.length - 1][a[0]].length
            }
            break;
        }

        var _str = '';
        _str += '<dl>';
        _str += '    <dd id="J_Dragon_Tiger_1_VS_10" class="J_subMenu active" data-info="1470#Dragon_Tiger_1_VS_10#2">第一名VS第十名</dd>';
        _str += '    <dd id="J_Dragon_Tiger_2_VS_9" class="J_subMenu" data-info="1471#Dragon_Tiger_2_VS_9#2">第二名VS第九名</dd>';
        _str += '    <dd id="J_Dragon_Tiger_3_VS_8" class="J_subMenu" data-info="1472#Dragon_Tiger_3_VS_8#2">第三名VS第八名</dd>';
        _str += '    <dd id="J_Dragon_Tiger_4_VS_7" class="J_subMenu" data-info="1473#Dragon_Tiger_4_VS_7#2">第四名VS第七名</dd>';
        _str += '    <dd id="J_Dragon_Tiger_5_VS_6" class="J_subMenu" data-info="1474#Dragon_Tiger_5_VS_6#2">第五名VS第六名</dd>';
        _str += '</dl>';
        return {
            dom: _str,
            rule: _rule,
            maxBonus: _maxBonus,
            opt: _opt
        };
    },
    renderPK10: {
        init: function(){
            this.renderHeader();
            this.renderMainMenu();
            this.renderSubMenu();
            this.renderRule();
        },
        renderHeader: function() {
            // 渲染PK10相关DOM结构
            var _str = '';
            _str += '<div class="pk10-head fl">';
            // _str += '<img src="../images/pk.png">';
            // _str += '<div>';
            _str += '<p class="pk10-phase">第<span class="text-l-color" id="J_dataNum"></span>期</p>';
            _str += '<div class="pk10-prize-num" id="J_drawResult">';
            _str += '   <em>01</em>'
            _str += '   <em>01</em>'
            _str += '   <em>01</em>'
            _str += '   <em>01</em>'
            _str += '   <em>01</em>'
            _str += '   <em>01</em>'
            _str += '   <em>01</em>'
            _str += '   <em>01</em>'
            _str += '   <em>01</em>'
            _str += '   <em>01</em>'
            // _str += '</div>';
            _str += '</div>';
            // _str += '    <div class="fl below-phase">';
            // _str += '        <p>开奖号码</p>';
            // _str += '        <p>第<span class="text-l-color" id="J_dataNum"></span>期</p>';
            // _str += '    </div>';
            // _str += '    <div class="fl below-prize-num" id="J_drawResult">';
            // _str += '        <em>0</em>';
            // _str += '        <em>0</em>';
            // _str += '        <em>0</em>';
            // _str += '        <em>0</em>';
            // _str += '        <em>0</em>';
            // _str += '    </div>';
            _str += '</div>';
            _str += '<div class="below-history fl rel">';
            _str += '    <dl class="history-issue fl" id="J_lastThreeDrawResult1">';
            _str += '        <dt>开奖期号</dt>';
            _str += '    </dl>';
            _str += '    <dl class="history-trend fr" id="J_lastThreeDrawResult2">';
            _str += '        <dt class="cup" id="J_trendChart"><em class="icon fl"></em>走势图</dt>';
            _str += '    </dl>';
            _str += '    <ul class="below-history-box abs" id="J_historyList">';
            _str += '    </ul>';
            _str += '</div>';

            $('#J_bettingHeader').html(_str);
        },
        renderMainMenu: function() {
            var _str = '';
            _str += '<span class="J_withChild active" data-info="1448#First_1_PK10#0">猜前一</span>';
            _str += '<span class="J_withChild" data-info="1449#First_2_PK10#1">猜前二</span>';
            _str += '<span class="J_withChild" data-info="1450#First_3_PK10#2">猜前三</span>';
            _str += '<span class="J_withChild" data-info="1451#First_4_PK10#3">猜前四</span>';
            _str += '<span class="J_withChild" data-info="1452#First_5_PK10#4">猜前五</span>';
            _str += '<span class="J_withChild" data-info="1453#Fixed_Place_PK10#5">定位胆</span>';
            _str += '<span class="J_withChild" data-info="1454#Sum_PK10#6">猜和值</span>';
            _str += '<span class="J_withChild" data-info="1455#BSOE_PK10#7">大小单双</span>';
            _str += '<span class="J_withChild" data-info="1456#Dragon_Tiger_PK10#8">龙虎斗</span>';
            $('#J_mainMenuList').html(_str);
        },
        renderSubMenu: function() {
            var _str = '';
            _str += '<dl>';
            // _str += '    <dt>复式：</dt>';
            _str += '    <dd id="J_First1_PK10" data-info="1457#First1_PK10#2" class="J_subMenu active">猜前一</dd>';
            _str += '</dl>';

            $('#J_subMenuList').html(_str);
        },
        renderRule: function() {
            $('#J_maxBonus').html('3.7333');
            $('#J_bettingRule').html('从01-11中任意选择1个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。 如：选择02，开奖号码为***02*，即为中奖。');
        }
    }
};