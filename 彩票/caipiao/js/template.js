/**
 * [SSC_TEMPLATE description]
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
 * hasNoAllFastBtn : 没有 全 选快捷按钮，默认是有的（值为：undefined/false）。取值为true时表示不需要
 * type : 选号类型 ball : 号码选号，text : 文本域
 * formula : 注数的计算方法
 */
var SSC_TEMPLATE = {
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
            type: 'ball',
            formula: null
        };

        var _maxBonus = '170000.0000';
        switch (options.type) {
            case 'All5Straight':
                _rule = '从万位、千位、百位、十位、个位中分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：万位选择1，千位选择2，百位选择3，十位选择4，个位选择5，开奖号码为12345，即为中奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length;
                }
                break;
            case 'All5Straight_Single':
                _rule = '"手动输入一个5位数号码组成一注，所选号码的万位、千位、百位、十位、个位与开奖号码相同，且顺序一致，即为中奖。如：选择12345，开奖号码为12345，即为中奖。"';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n12345 67890\n12345,67890\n12345;67890\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                _opt.formula = function(a){
                    return console.log('对应 allManualEntryEvents');
                }
                break;
            case 'All5All':
                _maxBonus = '34000.0000';
                _rule = '从万位、千位、百位、十位、个位中各选一个号码投注，若所选号码与开奖号码数字全部相同且顺序一致，即中一等奖；若所选号码与开奖号码的前三或后三号码相同且顺序一致，即中二等奖；若所选号码与开奖号码的前二或后二号码相同且顺序一致，即中三等奖。 如：选择54321，开奖号码为54321，即中一等奖，开奖号码为543**、**321，即中二等奖，开奖号码为54***、***21，即中三等奖。';
                _opt.quickFast = false;
                _opt.multipleChoice = false;
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length;
                }
                break;
            case 'All5All_Single':
                _maxBonus = '34000.0000';
                _rule = '"手动输入一个5位数号码组成一注，所选号码与开奖号码数字全部相同且顺序一致，即中一等奖；前三或后三号码相同且顺序一致，即中二等奖；前二或后二号码相同且顺序一致，即中三等奖。如：选择54321，开奖号码为54321，即中一等奖，开奖号码为543**、**321，即中二等奖，开奖号码为54***、***21，即中三等奖。"';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n12345 67890\n12345,67890\n12345;67890\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                _opt.formula = function(a){
                    return console.log('对应 allManualEntryEvents');
                }
                break;
            case 'All5Join':
                _rule = '从万位、千位、百位、十位、个位中分别选择1个或多个号码投注，所选号码与开奖号码数字全部相同且顺序一致，即中一等奖；所选号码千位、百位、十位、个位与开奖号码相同，即中二等奖；所选号码百位、十位、个位与开奖号码相同，即中三等奖；所选号码十位、个位与开奖号码相同，即中四等奖；所选号码个位与开奖号码相同，即中五等奖。 如：万位选择1，千位选择2，百位选择3，十位选择4，个位选择5，开奖号码为12345，即中一等奖，开奖号码为*2345，即中二等奖，开奖号码为**345，即中三等奖，开奖号码为***45即中四等奖，开奖号码为****5即中五等奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[4]].length;
                }
                break;
            case 'All5Join_Single':
                _rule = '"手动输入一个5位数号码组成一注，所选号码与开奖号码数字全部相同且顺序一致，即中一等奖；所选号码千位、百位、十位、个位与开奖号码相同，即中二等奖，依次类推。如：选择12345，开奖号码为12345即中一等奖，开奖号码为*2345即中二等奖，依次类推。"';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n12345 67890\n12345,67890\n12345;67890\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                _opt.formula = function(a){
                    return console.log('对应 allManualEntryEvents');
                }
                break;
            case 'AllCom120':
                _maxBonus = '1416.6666';
                _rule = '从0-9中任意选择5个号码组成一注，所选号码与开奖号码的万、千、百、十、个位相同，顺序不限，即为中奖。例：投注方案：10568开奖号码：10568（顺序不限）即为中奖。';
                _opt.numNameList = ['FIRST#组选'];
                _opt.formula = function(a){
                    var b = a[a.length - 1][a[0]].length;
                    return (b - 4) * (b - 3) * (b - 2) * (b - 1) * b / 120
                }
                break;
            case 'AllCom60':
                _maxBonus = '2833.3334';
                _rule = '选择1个二重号码和3个单号号码组成一注，所选的单号号码与开奖号码相同，且所选二重号码在开奖号码中出现了2次，即为中奖。例：投注方案：二重号8，单号016开奖号码：01688（顺序不限）即为中奖。';
                _opt.numNameList = ['FIFTH#二重号', 'FOURTH#单号'];
                _opt.formula = function(a){
                    var b = a[a.length - 1][a[0]].length,
                        c = b > 0 ? a[a.length - 1][a[1]].length : 0;
                    return c * (c - 2) * (c - 1) / 6 * b - SSC_TEMPLATE.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]]) * ((c - 2) * (c - 1)) / 2
                }
                break;
            case 'AllCom30':
                _maxBonus = '5666.6666';
                _rule = '选择2个二重号和1个单号号码组成一注，所选的单号号码与开奖号码相同，且所选的2个二重号吗分别在开奖号码中出现了2次，即为中奖。例：投注方案：二重号68，单号0开奖号码：06688（顺序不限）';
                _opt.numNameList = ['FIFTH#二重号', 'FOURTH#单号'];
                _opt.formula = function(a){
                    var b = a[a.length - 1][a[0]].length;
                    return a[a.length - 1][a[1]].length * ((b - 1) * b) / 2 - SSC_TEMPLATE.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]]) * (b - 1)
                }
                break;
            case 'AllCom20':
                _maxBonus = '8500.0000';
                _rule = '选择1个三重号码和2个单号号码组成一注，所选的单号号码与开奖号码相同，且所选三重号码在开奖号码中出现了3次，即为中奖。例：投注方案：三重号8，单号01开奖号码：01888（顺序不限）即为中奖。';
                _opt.numNameList = ['FIFTH#三重号', 'FOURTH#单号'];
                _opt.formula = function(a){
                    var b = a[a.length - 1][a[0]].length,
                            c = a[a.length - 1][a[1]].length;
                    return b * ((c - 1) * c) / 2 - SSC_TEMPLATE.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]]) * (c - 1)
                }
                break;
            case 'AllCom10':
                _rule = '选择1个三重号吗和1个二重号吗，所选三重号码在开奖号码中出现3次，并且所选二重号吗在开奖号码中出现了2次，即为中奖。例：投注方案：三重号8，二重号1开奖号码：11888（顺序不限）即为中奖。';
                _opt.numNameList = ['FIFTH#三重号', 'FOURTH#二重号'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length - SSC_TEMPLATE.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]])
                }
                break;
            case 'AllCom5':
                _maxBonus = '34000.0000';
                _rule = '选择1个四重号码和1个单号号码组成一注，所选的单号存在与开奖号码中，且所选四重号码在开奖号码中出现了4次，即为中奖。例：投注方案：四重号8，单号1开奖号码：18888（顺序不限）即为中奖。';
                _opt.numNameList = ['FIFTH#四重号', 'FOURTH#单号'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length - SSC_TEMPLATE.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]])
                }
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
            formula: null
        };
        var _maxBonus = '17000.0000';
        switch (options.type) {
            case 'First4Straight':
                _rule = '从万位、千位、百位、十位中分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：万位选择1，千位选择2，百位选择3，十位选择4，开 奖号码为"1234*"，即为中奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length
                }
                break;
            case 'First4Straight_Single':
                _rule = '"手动输入一个4位数号码组成一注，所选号码的万位、千位、百位、十位与开奖号码相同，且顺序一致，即为中奖。如：选择1234，开 奖号码为1234*，即为中奖。"';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n1234 5678\n1234,5678\n1234;5678\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                _opt.formula = function(a){
                    return console.log('对应 allManualEntryEvents');
                }
                break;
            case 'First4Join':
                _rule = '从万位、千位、百位、十位中分别选择1个或多个号码投注，若所选号码万位、千位、百位、十位与开奖号码相同，即中一等奖；若所选号码千位、百位、十位与开奖号码相同，即中二等奖；若所选号码百位、十位与开奖号码相同，即中三等奖；若所选号码十位与开奖号码相同，即中四等奖。 如：万位选择1，千位选择2，百位选择3，十位选择4，开奖号码为1234*，即中一等奖，开奖号码为*234*，即中二等奖，开奖号码为**34*，即中三等奖，开奖号码为***4*即中四等奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[3]].length
                }
                break;
            case 'First4Join_Single':
                _rule = '"手动输入一个4位数号码组成一注，所选号码万位、千位、百位、十位与开奖号码相同，即中一等奖；若所选号码千位、百位、十位与开奖号码相同，即中二等奖，依次类推。如：选择1234，开奖号码为1234*，即中一等奖，开奖号码为*234*，即中二等奖，开奖号码为**34*，即中三等奖，开奖号码为***4*即中四等奖。"';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n1234 5678\n1234,5678\n1234;5678\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                _opt.formula = function(a){
                    return console.log('对应 allManualEntryEvents');
                }
                break;
            case 'F4Com24':
                _maxBonus = '708.3334';
                _rule = '至少选择4个号码投注，竞猜开奖号码的前4位，号码一致顺序不限，即为中奖。例：投注方案：0568开奖号码：0568*（顺序不限）即为中奖。';
                _opt.numNameList = ['FIRST#组选'];
                _opt.formula = function(a){
                    var b = a[a.length - 1][a[0]].length;
                    return (b - 3) * (b - 2) * (b - 1) * b / 24
                }
                break;
            case 'F4Com12':
                _maxBonus = '1416.6666';
                _rule = '至少选择1个二重号码和2个单号号码，竞猜开奖号码的前四位，号码一致顺序不限，即为中奖。例：投注方案：二重号8，单号06开奖号码：8806*（顺序不限）';
                _opt.numNameList = ['FIFTH#二重号', 'FOURTH#单号'];
                _opt.formula = function(a){
                    var b = a[a.length - 1][a[0]].length,
                        c = a[a.length - 1][a[1]].length;
                    return b * (c - 1) * c / 2 - SSC_TEMPLATE.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]]) * (c - 1)
                }
                break;
            case 'F4Com6':
                _maxBonus = '2833.3334';
                _rule = '至少选择2个二重号码，竞猜开奖号码的前四位，号码一致顺序不限，即为中奖。例：投注方案：二重号28开奖号码：2288*（顺序不限）';
                _opt.numNameList = ['FIRST#二重号'];
                _opt.formula = function(a){
                    var b = a[a.length - 1][a[0]].length;
                    return (b - 1) * b / 2
                }
                break;
            case 'F4Com4':
                _maxBonus = '4250.0000';
                _rule = '至少选择1个三重号码和1个单号号码，竞猜开奖号码的前四位，号码一致顺序不限，即为中奖。例：投注方案：三重号8，单号2中奖号码：8882*（顺序不限）';
                _opt.numNameList = ['FIFTH#三重号', 'FOURTH#单号'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length - SSC_TEMPLATE.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]])
                }
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
            formula: null
        };
        var _maxBonus = '17000.0000';
        switch (options.type) {
            case 'Last4Straight':
                _rule = '从千位、百位、十位、个位中分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：千位选择1，百位选择2，十位选择3，个位选择4，开奖号码为"*1234"，即为中奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length
                }
                break;
            case 'Last4Straight_Single':
                _rule = '"手动输入一个4位数号码组成一注，所选号码的千位、百位、十位、个位与开奖号码相同，且顺序一致，即为中奖。如：选择1234，开奖号码为*1234""，即为中奖。"""';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n1234 5678\n1234,5678\n1234;5678\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                _opt.formula = function(a){
                    return console.log('对应 allManualEntryEvents');
                }
                break;
            case 'Last4Join':
                _rule = '从千位、百位、十位、个位中分别选择1个或多个号码投注，若所选号码千位、百位、十位、个位与开奖号码相同，即中一等奖；若所选号码百位、十位、个位与开奖号码相同，即中二等奖；若所选号码十位、个位与开奖号码相同，即中三等奖；若所选号码个位与开奖号码相同，即中四等奖。 如：千位选择1，百位选择2，十位选择3，个位选择4，开奖号码为*1234，即中一等奖，开奖号码为**234，即中二等奖，开奖号码为***34，即中三等奖，开奖号码为****4即中四等奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[3]].length
                }
                break;
            case 'Last4Join_Single':
                _rule = '"手动输入一个4位数号码组成一注，所选号码千位、百位、十位、个位与开奖号码相同，即中一等奖；若所选号码百位、十位、个位与开奖号码相同，即中二等奖，依次类推。如：选择1234，开奖号码为*1234，即中一等奖，开奖号码为**234，即中二等奖，开奖号码为***34，即中三等奖，开奖号码为****4即中四等奖。"';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n1234 5678\n1234,5678\n1234;5678\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                _opt.formula = function(a){
                    return console.log('对应 allManualEntryEvents');
                }
                break;
            case 'L4Com24':
                _maxBonus = '708.3334';
                _rule = '至少选择4个号码投注，竞猜开奖号码的后4位，号码一致顺序不限，即为中奖。例：投注方案：0568开奖号码：*0568（顺序不限）即为中奖。';
                _opt.numNameList = ['FIRST#组选'];
                _opt.formula = function(a){
                    var b = a[a.length - 1][a[0]].length;
                    return (b - 3) * (b - 2) * (b - 1) * b / 24
                }
                break;
            case 'L4Com12':
                _maxBonus = '1416.6666';
                _rule = '至少选择1个二重号码和2个单号号码，竞猜开奖号码的后四位，号码一致顺序不限，即为中奖。例：投注方案：二重号8，单号06开奖号码：*8806（顺序不限）';
                _opt.numNameList = ['FIFTH#二重号', 'FOURTH#单号'];
                _opt.formula = function(a){
                    var b = a[a.length - 1][a[0]].length,
                        c = a[a.length - 1][a[1]].length;
                    return b * (c - 1) * c / 2 - SSC_TEMPLATE.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]]) * (c - 1)
                }
                break;
            case 'L4Com6':
                _maxBonus = '2833.3334';
                _rule = '至少选择2个二重号码，竞猜开奖号码的后四位，号码一致顺序不限，即为中奖。例：投注方案：二重号28开奖号码：*2288（顺序不限）';
                _opt.numNameList = ['#FIRST二重号'];
                _opt.formula = function(a){
                    var b = a[a.length - 1][a[0]].length;
                    return (b - 1) * b / 2
                }
                break;
            case 'L4Com4':
                _maxBonus = '4250.0000';
                _rule = '至少选择1个三重号码和1个单号号码，竞猜开奖号码的后四位，号码一致顺序不限，即为中奖。例：投注方案：三重号8，单号2中奖号码：*8882（顺序不限）';
                _opt.numNameList = ['FIFTH#三重号', 'FOURTH#单号'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length - SSC_TEMPLATE.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]])
                }
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
            formula: null
        };
        var _maxBonus = '1700.0000';
        switch (options.type) {
            case 'First3Straight':
                _rule = '从万位、千位、百位中分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：万位选择1，千位选择2，百位选择3，开奖号码为是"123**"，即为中奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length
                }
                break;
            case 'First3Straight_Single':
                _rule = '"手动输入一个3位数号码组成一注，所选号码的万位、千位、百位与开奖号码相同，且顺序一致，即为中奖。如：选择123，开奖号码为123**，即为中奖。"';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n123 456\n123,456\n123;456\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                _opt.formula = function(a){
                    return console.log('对应 allManualEntryEvents');
                }
                break;
            case 'First3Join':
                _rule = '从万位、千位、百位中分别选择1个或多个号码投注，若所选号码万位、千位、百位与开奖号码相同，即中一等奖；若所选号码千位、百位与开奖号码相同，即中二等奖；若所选号码百位与开奖号码相同，即中三等奖。 如：万位选择3，千位选择4，百位选择5，开奖号码为345**，即中一等奖，开奖号码为*45**，即中二等奖，开奖号码为**5**，即中三等奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[2]].length
                }
                break;
            case 'First3Join_Single':
                _rule = '"手动输入一个3位数号码组成一注，所选号码万位、千位、百位与开奖号码相同，即中一等奖；若所选号码千位、百位与开奖号码相同，即中二等奖；若所选号码百位与开奖号码相同，即中三等奖。如：选择345，开奖号码为345**，即中一等奖，开奖号码为*45**，即中二等奖，开奖号码为**5**，即中三等奖。"';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n123 456\n123,456\n123;456\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                _opt.formula = function(a){
                    return console.log('对应 allManualEntryEvents');
                }
                break;
            case 'First3StraightCom':
                _rule = '从0-9中选择3个或以上号码投注，开奖号码为组六形态即中奖。 如：选择2、3、4；开奖号码为234**、243**、324**、342**、432**、423**，即中一注奖。';
                _opt.numNameList = ['FIRST#直组'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) * (a[a.length - 1][a[0]].length - 2)
                }
                break;
            case 'First3Sum':
                _rule = '从0-27中选择1个或多个号码投注，所选数值为开奖号码前三位的数字相加之和相同，即为中奖。 如：选择和值1；开奖号码为001**、010**、100**，即中前三和值。';
                _opt.numList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
                _opt.numNameList = ['FIRST#和值'];
                _opt.quickFast = false;
                _opt.formula = function(a, options){
                    console.log(options);
                    var _num = 0;
                    var _a = [a[0]];
                    console.log(_a);
                    var l = {};
                    l[_a] = "";
                    var b = [_a, l];
                    console.log(b);
                    var d = options.index,//所点击的号码的索引
                        e = options.text,
                        f = SSC_TEMPLATE.getSubNumList('3rd')[d + 1];
                    console.log(options.hasSelect);
                    if (!options.hasSelect) {
                        var g = "," + e + "#" + f;
                            // console.log(f);
                            // console.log(d);
                            // console.log(g); 

                        b[1][_a].indexOf(g) > -1 && (b[1][_a] = b[1][_a].replace(g, ""));
                        if (b[1][_a].length > 1){
                            for (var i = b[1][a].substring(1).split(","), j = 0; j < i.length; j++) {
                                var k = i[j].split("#");
                                h = 1 * h + 1 * k[1]
                            }
                        }
                    } else {
                        // var d = $("#lott_ranks_" + a + ">dl>dt").index(this),
                        //     e = $(this).text(),
                        //     f = c[d];
                        b[1][_a] = b[1][_a] + "," + e + "#" + f;
                        for (var h = 0, i = b[1][_a].substring(1).split(","), j = 0; j < i.length; j++) {
                            var k = i[j].split("#");
                            h = 1 * h + 1 * k[1]
                        }
                    }

                    console.log(_num);
                    return _num;
                    // return console.log('对应 sumAndPointUI');
                }
                break;
            case 'First3Com3':
                _maxBonus = '566.6668';
                _rule = '从0-9中选择2个或多个号码投注，所选号码与开奖号码的前三位相同，顺序不限，即为中奖。 如：选择1、2，开奖号码为122**、212**、221** 、 112**、121**、211**，即为中奖。';
                _opt.numNameList = ['FIRST#组三'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1)
                }
                break;
            case 'First3Com6':
                _maxBonus = '283.3334';
                _rule = '从0-9中选择3个或多个号码投注，所选号码与开奖号码的前三位相同，顺序不限，即为中奖。 如：选择1、2、3，开奖号码为123**、132**、231** 、 213**、312**、321**，即为中奖。';
                _opt.numNameList = ['FIRST#组六'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) * (a[a.length - 1][a[0]].length - 2) / 6
                }
                break;
            case 'First3Com':
                _maxBonus = '566.6668';
                _rule = '输入购买号码，3个数字为一注，所选号码与开奖号码的前三位相同，顺序不限，即为中奖。 如：手动输入123、455，开奖号码为321**即中组六奖，开奖号码为545**即中组三奖。';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n122 123 211\n123,241,212\n122;221\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                _opt.formula = function(a){
                    // TODO：
                    return console.log('对应 allMixComboSelection');
                }
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
            formula: null
        };
        var _maxBonus = '1700.0000';
        switch (options.type) {
            case 'Middle3Straight':
                _rule = '从千位、百位、十位中分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：千位选择1，百位选择2，十位选择3，开奖号码为是"*123*"，即为中奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length
                }
                break;
            case 'Middle3Straight_Single':
                _rule = '"手动输入一个3位数号码组成一注，所选号码的千位、百位、十位与开奖号码相同，且顺序一致，即为中奖。如：选择123，开奖号码为*123*，即为中奖。"';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n123 456\n123,456\n123;456\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                _opt.formula = function(a){
                    return console.log('对应 allManualEntryEvents');
                }
                break;
            case 'Middle3Join':
                _rule = '从千位、百位、十位中分别选择1个或多个号码投注，若所选号码千位、百位、十位与开奖号码相同，即中一等奖；若所选号码百位、十位与开奖号码相同，即中二等奖；若所选号码十位与开奖号码相同，即中三等奖。 如：千位选择2，百位选择3，十位选择4，开奖号码为*234*，即中一等奖，开奖号码为**34*，即中二等奖，开奖号码为***4*，即中三等奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[2]].length
                }
                break;
            case 'Middle3Join_Single':
                _rule = '"手动输入一个3位数号码组成一注，若所选号码千位、百位、十位与开奖号码相同，即中一等奖；若所选号码百位、十位与开奖号码相同，即中二等奖；若所选号码十位与开奖号码相同，即中三等奖。如：选择234，开奖号码为*234*，即中一等奖，开奖号码为**34*，即中二等奖，开奖号码为***4*，即中三等奖。"';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n123 456\n123,456\n123;456\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                _opt.formula = function(a){
                    return console.log('对应 allManualEntryEvents');
                }
                break;
            case 'Middle3StraightCom':
                _rule = '从0-9中选择3个或以上号码投注，开奖号码为组六形态即中奖。 如：选择2、3、4；开奖号码为*234*、*243*、*324*、*342*、*432*、*423*，即中一注奖。';
                _opt.numNameList = ['FOURTH#直组'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) * (a[a.length - 1][a[0]].length - 2)
                }
                break;
            case 'Middle3Sum':
                _rule = '从0-27中选择1个或多个号码投注，所选数值为开奖号码中三位的数字相加之和相同，即为中奖。 如：选择和值1；开奖号码为*001*、*010*、*100*，即中中三和值。';
                _opt.numList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
                _opt.numNameList = ['FOURTH#和值'];
                _opt.quickFast = false;
                _opt.formula = function(a){
                    // TODO：
                    return console.log('对应 sumAndPointUI');
                }
                break;
            case 'Middle3Com3':
                _maxBonus = '566.6668';
                _rule = '从0-9中选择2个或多个号码投注，所选号码与开奖号码的中三位相同，顺序不限，即为中奖。 如：选择1、2，开奖号码为*122*、*212*、*221* 、 *112*、*121*、*211*，即为中奖。';
                _opt.numNameList = ['FOURTH#组三'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1)
                }
                break;
            case 'Middle3Com6':
                _maxBonus = '283.3334';
                _rule = '从0-9中选择3个或多个号码投注，所选号码与开奖号码的中三位相同，顺序不限，即为中奖。 如：选择1、2、3，开奖号码为*123*、*132*、*231*、 *213*、*312*、*321*，即为中奖。';
                _opt.numNameList = ['FOURTH#组六'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) * (a[a.length - 1][a[0]].length - 2) / 6
                }
                break;
            case 'Middle3Com':
                _maxBonus = '566.6668';
                _rule = '输入购买号码，3个数字为一注，所选号码与开奖号码的中三位相同，顺序不限，即为中奖。 如：手动输入123、455，开奖号码为*321*即中组六奖， 开奖号码为*545*即中组三奖。';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n122 123 211\n123,241,212\n122;221\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                _opt.formula = function(a){
                    // TODO:
                    return console.log('对应 allMixComboSelection');
                }
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
            formula: null
        };
        var _maxBonus = '1700.0000';
        switch (options.type) {
            case 'Last3Straight':
                _rule = '从百位、十位、个位分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：百位选择1，十位选择2，个位选择3，开奖号码为是"**123"，即为中奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length
                }
                break;
            case 'Last3Straight_Single':
                _rule = '"手动输入一个3位数号码组成一注，所选号码的百位、十位、个位与开奖号码相同，且顺序一致，即为中奖。如：选择123，开奖号码为**123，即为中奖。"';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n123 456\n123,456\n123;456\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                _opt.formula = function(a){
                    return console.log('对应 allManualEntryEvents');
                }
                break;
            case 'Last3Join':
                _rule = '从百位、十位、个位选择1个或多个号码投注，若所选号码百位、十位、个位与开奖号码相同，即中一等奖；若所选号码十位、个位与开奖号码相同，即中二等奖；若所选号码个位与开奖号码相同，即中三等奖。 如：百位选择3，十位选择4，个位选择5，开奖号码为**345，即中一等奖，开奖号码为***45，即中二等奖，开奖号码为****5，即中三等奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[2]].length
                }
                break;
            case 'Last3Join_Single':
                _rule = '"手动输入一个3位数号码组成一注，所选号码百位、十位、个位与开奖号码相同，即中一等奖；若所选号码十位、个位与开奖号码相同，即中二等奖；若所选号码个位与开奖号码相同，即中三等奖。如：选择345，开奖号码为**345，即中一等奖，开奖号码为***45，即中二等奖，开奖号码为****5，即中三等奖。"';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n123 456\n123,456\n123;456\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                _opt.formula = function(a){
                    return console.log('对应 allManualEntryEvents');
                }
                break;
            case 'Last3StraightCom':
                _rule = '从0-9中选择3个或以上号码投注，开奖号码为组六形态即中奖。 如：选择2、3、4；开奖号码为**234、**243、**324、**342、**432、**423，即中一注奖。';
                _opt.numNameList = ['FIFTH#直组'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) * (a[a.length - 1][a[0]].length - 2)
                }
                break;
            case 'Last3Sum':
                _rule = '从0-27中选择1个或多个号码投注，所选数值为开奖号码后三位的数字相加之和相同，即为中奖。 如：选择和值1；开奖号码为**001、**010、**100，即中后三和值。';
                _opt.numList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
                _opt.numNameList = ['FIFTH#和值'];
                _opt.quickFast = false;
                _opt.formula = function(a){
                    // TODO:
                    return console.log('对应 sumAndPointUI');
                }
                break;
            case 'Last3Com3':
                _maxBonus = '566.6668';
                _rule = '从0-9中选择2个或多个号码投注，所选号码与开奖号码的后三位相同，顺序不限，即为中奖 如：选择1、2，开奖号码为**122、**212、**221 、 **112、**121、**211，即为中奖。';
                _opt.numNameList = ['FIFTH#组三'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1)
                }
                break;
            case 'Last3Com6':
                _maxBonus = '283.3334';
                _rule = '从0-9中选择3个或多个号码投注，所选号码与开奖号码的后三位相同，顺序不限，即为中奖。 如：选择1、2、3，开奖号码为**123，**132，**231，**213，**312，**321，即为中奖。';
                _opt.numNameList = ['FIFTH#组六'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) * (a[a.length - 1][a[0]].length - 2) / 6
                }
                break;
            case 'Last3Com':
                _maxBonus = '566.6668';
                _rule = '输入购买号码，3个数字为一注，所选号码与开奖号码的后三位相同，顺序不限，即为中奖。 如：手动输入123、455，开奖号码为**321即中组六奖，开奖号码为**545即中组三奖。';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n122 123 211\n123,241,212\n122;221\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                _opt.formula = function(a){
                    // TODO：
                    return console.log('对应 allMixComboSelection');
                }
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
            hasNoAllFastBtn: false,
            type: 'ball',
            formula: null
        };
        var _maxBonus = '170.0000';
        switch (options.type) {
            case 'First2Straight':
                _rule = '从万位、千位分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：万位选择3，千位选择4，开奖号码为34***，即为中奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length
                }
                break;
            case 'First2Straight_Single':
                _rule = '"手动输入一个2位数号码组成一注，所选号码的万位、千位与开奖号码相同，且顺序一致，即为中奖。如：选择34，开奖号码为34***，即为中奖。"';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n12 34\n12,34\n12;34\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                _opt.formula = function(a){
                    return console.log('对应 allManualEntryEvents');
                }
                break;
            case 'First2Join':
                _rule = '从万位和千位选择1个或多个号码投注，若所选号码万位、千位与开奖号码相同，即中一等奖；若所选号码千位与开奖号码相同，即中二等奖。 如：万位选择5，千位选择4，开奖号码为54***，即中一等奖，开奖号码为*4***，即中二等奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length + a[a.length - 1][a[1]].length
                }
                break;
            case 'First2Join_Single':
                _rule = '"手动输入一个2位数号码组成一注，所选号码万位、千位与开奖号码相同，即中一等奖；若所选号码千位与开奖号码相同，即中二等奖。如：选择54，开奖号码为54***，即中一等奖，开奖号码为*4***，即为中奖。"';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n12 34\n12,34\n12;34\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                _opt.formula = function(a){
                    return console.log('对应 allManualEntryEvents');
                }
                break;
            case 'First2Sum':
                _rule = '从0-18中选择1个或多个号码投注，所选数值为开奖号码前二位的数字相加之和相同，即为中奖。 如：选择1，开奖号码为10***或01***，即为中奖。';
                _opt.numList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
                _opt.numNameList = ['FIRST#和值'];
                _opt.quickFast = false;
                _opt.formula = function(a){
                    return console.log('对应 sumAndPointUI');
                }
                break;
            case 'First2Com':
                _maxBonus = '85.0000';
                _rule = '从0-9中选择2个或多个号码投注，所选号码与开奖号码的前二位相同，顺序不限，即为中奖。 如：选择7、8，开奖号码78***或87***即为中奖。';
                _opt.numNameList = ['FIRST#组选'];
                _opt.hasNoAllFastBtn = true;
                _opt.maxSelect = 7;
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) / 2
                }
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
            formula: null
        };
        var _maxBonus = '170.0000';
        switch (options.type) {
            case 'Last2Straight':
                _rule = '从十位、个位分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：十位选择3，个位选择4，开奖号码为"***34"，即为中奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length
                }
                break;
            case 'Last2Straight_Single':
                _rule = '"手动输入一个2位数号码组成一注，所选号码的十位、个位与开奖号码相同，且顺序一致，即为中奖。如：选择34，开奖号码为***34""，即为中奖。"""';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n12 34\n12,34\n12;34\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                _opt.formula = function(a){
                    return console.log('对应 allManualEntryEvents');
                }
                break;
            case 'Last2Join':
                _rule = '从十位、个位分别选择1个或多个号码投注，若所选号码十位、个位与开奖号码相同，即中一等奖；若所选号码个位与开奖号码相同，即中二等奖。 如：十位选择4，个位选择5，开奖号码为***45，即中一等奖，开奖号码为****5，即中二等奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length + a[a.length - 1][a[1]].length
                }
                break;
            case 'Last2Join_Single':
                _rule = '"手动输入一个2位数号码组成一注，所选号码十位、个位与开奖号码相同，即中一等奖；若所选号码个位与开奖号码相同，即中二等奖。如：选择45，开奖号码为***45，即中一等奖，开奖号码为****5，即中二等奖。"';
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n12 34\n12,34\n12;34\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                _opt.formula = function(a){
                    return console.log('对应 allManualEntryEvents');
                }
                break;
            case 'Last2Sum':
                _rule = '从0-18中选择1个或多个号码投注，所选数值为开奖号码后二位的数字相加之和相同，即为中奖。 如：选择1，开奖号码为***10或***01即为中奖。';
                _opt.numList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
                _opt.numNameList = ['FIFTH#和值'];
                _opt.quickFast = false;
                _opt.formula = function(a){
                    return console.log('对应 sumAndPointUI');
                }
                break;
            case 'Last2Com':
                _maxBonus = '85.0000';
                _rule = '从0-9中选择2个或多个号码投注，所选号码与开奖号码的后二位相同，顺序不限，即为中奖。 如：选择7、8，开奖号码***78或***87，即为中奖。';
                _opt.numNameList = ['FIFTH#组选'];
                _opt.hasNoAllFastBtn = true;
                _opt.maxSelect = 7;
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) / 2
                }
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
            formula: null
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
                }
                break;
            case 'Last1Straight':
                _rule = '从个位选择1个或多个号码投注，所选号码与开奖号码一致，即为中奖。 如：个位选择3，开奖号码为****3，即为中奖。';
                _opt.numNameList = ['FIFTH'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length
                }
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
            numNameList: ['FIFTH#胆码'],
            quickFast: false,
            multipleChoice: false,
            type: 'ball',
            formula: null
        };
        var _maxBonus = '1700.0000';
        switch (options.type) {
            case 'First3StraightAnyCode1':
                _maxBonus = '6.2730';
                _rule = '从0-9中选择1个号码投注，每注由1个号码组成，只要开奖号码的万位、千位、百位中包含所选号码，即为中奖。 如：选择2，开奖号码为**2**， *2***， 2****，即为中奖。';
                _opt.numNameList = ['FIRST#胆码'];
                _opt.formula = function(a){
                    return 1 * a[a.length - 1][a[0]].length
                }
                break;
            case 'First3StraightAnyCode2':
                _maxBonus = '31.4815';
                _rule = '从一码、二码中分别选择1个号码投注，每注由2个号码组成，只要开奖号码的万位、千位、百位中包含所选号码，即为中奖。 如：选择14，开奖号码为14***， 1*4**， 4*1**， *41**， 41***， *14**，即为中奖。';
                _opt.numNameList = ['FIRST#一胆', 'SECOND#二胆'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * 1
                }
                break;
            case 'Middle3StraightAnyCode1':
                _maxBonus = '6.2730';
                _rule = '从0-9中选择1个号码投注，每注由1个号码组成，只要开奖号码的千位、百位、十位中包含所选号码，即为中奖。 如：选择2，开奖号码为*2***， **2**， ***2*，即为中奖。';
                _opt.numNameList = ['FOURTH#胆码'];
                _opt.formula = function(a){
                    return 1 * a[a.length - 1][a[0]].length
                }
                break;
            case 'Middle3StraightAnyCode2':
                _maxBonus = '31.4815';
                _rule = '从一码、二码中分别选择1个号码投注，每注由2个号码组成，只要开奖号码的千位、百位、十位中包含所选号码，即为中奖。 如：选择14，开奖号码为**14*， *1*4*， *4*1*， **41*，*14** ，*41**，即为中奖。';
                _opt.numNameList = ['THIRD#一胆', 'FOURTH#二胆'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * 1
                }
                break;
            case 'Last3StraightAnyCode1':
                _maxBonus = '6.2730';
                _rule = '从0-9中选择1个号码投注，每注由1个号码组成，只要开奖号码的百位、十位、个位中包含所选号码，即为中奖。 如：选择2，开奖号码为**2**， ***2*， ****2，即为中奖。';
                _opt.numNameList = ['FIFTH#胆码'];
                _opt.formula = function(a){
                    return 1 * a[a.length - 1][a[0]].length
                }
                break;
            case 'Last3StraightAnyCode2':
                _maxBonus = '31.4815';
                _rule = '从一码、二码中分别选择1个号码投注，每注由2个号码组成，只要开奖号码的百位、十位、个位中包含所选号码，即为中奖。 如：选择14，开奖号码为***14， **1*4， **4*1， ***41，**14* ，**41*，即为中奖。';
                _opt.numNameList = ['FOURTH#一胆', 'FIFTH#二胆'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * 1
                }
                break;
            case 'First2StraightAnyCode':
                _maxBonus = '8.9474';
                _rule = '从0-9中选择1个或多个号码投注投注，只要开奖号码的万位、千位中包含所选号码，即为中奖。 如：选择2，开奖号码为2****， *2***，即为中奖。';
                _opt.quickFast = true;
                _opt.multipleChoice = true;
                _opt.numNameList = ['FIRST#胆码'];
                _opt.formula = function(a){
                    return 1 * a[a.length - 1][a[0]].length
                }
                break;
            case 'Last2StraightAnyCode':
                _maxBonus = '8.9474';
                _rule = '从0-9中选择1个或多个号码投注，只要开奖号码的十位、个位中包含所选号码，即为中奖。 如：选择2，开奖号码为***2*， ****2，即为中奖。';
                _opt.quickFast = true;
                _opt.multipleChoice = true;
                _opt.numNameList = ['FIFTH#胆码'];
                _opt.formula = function(a){
                    return 1 * a[a.length - 1][a[0]].length
                }
                break;
            case 'First3ComAnyCode1':
                _rule = '从0-9中选择1个或多个号码投注，只要开奖号码的万位、千位、百位中包含所选号码，即为中奖(含对子、豹子号)。 如：选择2，开奖号码为222**即中豹子形态；开奖号码为322**即中组三形态；开奖号码为321**即中组六形态。';
                _opt.numNameList = ['FIRST#胆码'];
                _opt.formula = function(a){
                    return 55 * a[a.length - 1][a[0]].length
                }
                break;
            case 'First3ComAnyCode2':
                _rule = '从一码、二码中分别选择1个或多个号码投注，只要开奖号码的万位、千位、百位中包含所选号码，即为中奖(含对子、豹子号)。 如：选择22，开奖号码为222**即中豹子形态；选择21，开奖号码为122**即中组三形态；开奖号码为321**即中组六形态。';
                _opt.numNameList = ['FIRST#一胆', 'SECOND#二胆'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * 10
                }
                break;
            case 'Middle3ComAnyCode1':
                _rule = '从0-9中选择1个或多个号码投注，只要开奖号码的千位、百位、十位中包含所选号码，即为中奖(含对子、豹子号)。 如：选择2，开奖号码为*222*即中豹子形态；开奖号码为*322*即中组三形态；开奖号码为*321*即中组六形态。';
                _opt.numNameList = ['FOURTH#胆码'];
                _opt.formula = function(a){
                    return 55 * a[a.length - 1][a[0]].length
                }
                break;
            case 'Middle3ComAnyCode2':
                _rule = '从一码、二码中分别选择1个或多个号码投注，只要开奖号码的千位、百位、十位中包含所选号码，即为中奖(含对子、豹子号)。 如：选择22，开奖号码为*222*即中豹子形态；选择21，开奖号码*122*即中组三形态，开奖号码*321*即中组六形态。';
                _opt.numNameList = ['THIRD#一胆', 'FOURTH#二胆'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * 10
                }
                break;
            case 'Last3ComAnyCode1':
                _rule = '从0-9中选择1个或多个号码投注，只要开奖号码的百位、十位、个位中包含所选号码，即为中奖(含对子、豹子号)。 如：选择2，开奖号码为**222即中豹子形态；开奖号码为**322即中组三形态；开奖号码为**321即中组六形态。';
                _opt.numNameList = ['FIFTH#胆码'];
                _opt.formula = function(a){
                    return 55 * a[a.length - 1][a[0]].length
                }
                break;
            case 'Last3ComAnyCode2':
                _rule = '从一码、二码中分别选择1个或多个号码投注，只要开奖号码的百位、十位、个位中包含所选号码，即为中奖(含对子、豹子号)。 如：选择22，开奖号码为**222即中豹子形态；选择21，开奖号码**122即中组三形态，开奖号码**321即中组六形态。';
                _opt.numNameList = ['FOURTH#一胆', 'FIFTH#二胆'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * 10
                }
                break;
            case 'First2ComAnyCode':
                _maxBonus = '170.0000';
                _rule = '从0-9中选择1个或多个号码投注投注，只要开奖号码的万位、千位中包含所选号码，即为中奖(含对子号)。 如：选择2，开奖号码为22***即中对子；开奖号码为21***即中非对子。';
                _opt.quickFast = true;
                _opt.multipleChoice = true;
                _opt.numNameList = ['FIRST#胆码'];
                _opt.formula = function(a){
                    return 10 * a[a.length - 1][a[0]].length
                }
                break;
            case 'Last2ComAnyCode':
                _maxBonus = '170.0000';
                _rule = '从0-9中选择1个或多个号码投注，只要开奖号码的十位、个位中包含所选号码，即为中奖(含对子号)。 如：选择2，开奖号码为***22即中对子；开奖号码为***21即中非对子。';
                _opt.quickFast = true;
                _opt.multipleChoice = true;
                _opt.numNameList = ['FIFTH#胆码'];
                _opt.formula = function(a){
                    return 10 * a[a.length - 1][a[0]].length
                }
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
            numNameList: ['FIFTH#特殊'],
            quickFast: true,
            type: 'ball',
            formula: null
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
                }
                break;
            case 'Last2BSOE':
                _rule = '从十位、个位中的“大、小、单、双”至少各选一个组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：十位选择大，个位选择单，开奖号码为***63，即为中奖。';
                _opt.numList = ['大', '小', '单', '双'];
                _opt.numNameList = ['FOURTH', 'FIFTH'];
                _opt.quickFast = false;
                _opt.multipleChoice = false;
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length
                }
                break;
            case 'AnyShow1_SSC':
                _maxBonus = '4.1512';
                _rule = '从0-9中选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中包含所选号码，即为中奖。如：投注方案：8；开奖号码：至少出现1个8，即中一帆风顺。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length
                }
                break;
            case 'AnyShow2_SSC':
                _maxBonus = '20.8692';
                _rule = '从0-9中选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中出现2次，即为中奖。如：投注方案：8；开奖号码：至少出现2个8，即中好事成双。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length
                }
                break;
            case 'AnyShow3_SSC':
                _maxBonus = '198.5981';
                _rule = '从0-9中选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中出现3次，即为中奖。如：投注方案：8；开奖号码：至少出现3个8，即中三星报喜。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length
                }
                break;
            case 'AnyShow4_SSC':
                _maxBonus = '3695.6521';
                _rule = '从0-9中选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中出现4次，即为中奖。如：投注方案：8；开奖号码：至少出现4个8，即中四季发财。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length
                }
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
            formula: null
        };
        var _maxBonus = '17.0000';
        switch (options.type) {
            case 'Any1':
                _maxBonus = '17.0000';
                _rule = '从万位、千位、百位、十位、个位中至少一位上选择1个号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：选择万位号码为1，开奖号码为1****，即为中奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length + a[a.length - 1][a[1]].length + a[a.length - 1][a[2]].length + a[a.length - 1][a[3]].length + a[a.length - 1][a[4]].length
                }
                break;
            case 'Any2':
                _maxBonus = '170.0000';
                _rule = '从万位、千位、百位、十位、个位中至少两位上各选1个号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：选择万位号码为1，千位号码为2，开奖号码为12***，即为中奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[2]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length
                }
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
                _opt.formula = function(a){
                    return console.log('对应 allManualEntryEvents');
                }
                break;
            case 'Any3':
                _maxBonus = '1700.0000';
                _rule = '从万位、千位、百位、十位、个位中至少三位上各选1个号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：选择万位号码为1，千位号码为2，百位号码为3，开奖号码为123**，即为中奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length
                }
                break;
            case 'Any3_Single':
                _maxBonus = '1700.0000';
                _rule = '"从万位、千位、百位、十位、个位中任意勾选三个位置，在这三个位上至少各选1个号码组成一注，所选三个位置上的开奖号码与所选号码完全相同，且顺序一致，即为中奖。如：勾选位置万位、千位、十位，输入号码152；开奖号码：15*2*，即为中奖。"';
                _opt.haveCheckbox = true;
                _opt.defaultCheck = 3;
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n123 456\n123,456\n123;456\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                _opt.formula = function(a){
                    return console.log('对应 allManualEntryEvents');
                }
                break;
            case 'Any4':
                _maxBonus = '17000.0000';
                _rule = '从万位、千位、百位、十位、个位中至少四位上各选1个号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：选择万位号码为1，千位号码为2，百位号码为3，十位号码为4，开奖号码为1234*，即为中奖。';
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length
                }
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
                _opt.formula = function(a){
                    return console.log('对应 allManualEntryEvents');
                }
                break;
            case 'Any2Com_SSC':
                _maxBonus = '85.0000';
                _rule = '从万位、千位、百位、十位、个位中任意勾选两个位置，然后从0-9中选择两个号码组成一注，所选2个位置的开奖号码与所选号码一致，顺序不限，即为中奖。中奖举例：勾选位置万位、个位，选择号码79； 开奖号码：9***7 或 7***9，均中任二组选。';
                _opt.haveCheckbox = true;
                _opt.numNameList = ['FIRST#组选'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) / 2
                }
                break;
            case 'Any2Com_SSC_Single':
                _maxBonus = '85.0000';
                _rule = '从万位、千位、百位、十位、个位中任意勾选两个位置，然后输入两个号码组成一注，所选2个位置的开奖号码与输入号码一致，顺序不限，即为中奖。中奖举例：勾选位置万位、个位，选择号码79； 开奖号码：9***7 或 7***9，均中任二组选单式。';
                _opt.haveCheckbox = true;
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n12 34\n12,34\n12;34\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                _opt.formula = function(a){
                    return console.log('对应 allManualEntryEvents');
                }
                break;
            case 'Any2Sum_SSC':
                _maxBonus = '85.0000';
                _rule = '从万位、千位、百位、十位、个位中任意勾选两个位置，然后选择一个和值，所选2个位置的开奖号码相加之和与所选和值一致，顺序不限，即为中奖。中奖举例：勾选位置千位、个位，选择和值6； 开奖号码：*4**2 或 *2**4，均中任二组选和值。';
                _opt.haveCheckbox = true;
                _opt.numList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
                _opt.numNameList = ['FIFTH#和值'];
                _opt.quickFast = false;
                _opt.formula = function(a){
                    return console.log('对应 sumAndPointUI');
                }
                break;
            case 'Any3Sum_SSC':
                _maxBonus = '566.6666';
                _rule = '"从万位、千位、百位、十位、个位中任意勾选三个位置，然后选择一个和值，所选3个位置的开奖号码相加之和与所选和值一致，顺序不限，即为中奖。中奖举例：勾选位置万位、千位、个位；选择和值8；开奖号码：13**4 顺序不限，即中任三组选和值。"';
                _opt.haveCheckbox = true;
                _opt.defaultCheck = 3;
                _opt.numList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
                _opt.numNameList = ['FIFTH#和值'];
                _opt.quickFast = false;
                _opt.formula = function(a){
                    return console.log('对应 sumAndPointUI');
                }
                break;
            case 'Any3Com3_SSC':
                _maxBonus = '566.6666';
                _rule = '从万位、千位、百位、十位、个位中任意勾选三个位置，然后从0-9中选择两个号码组成一注，所选3个位置的开奖号码与所选号码一致，顺序不限，即为中奖。中奖举例：勾选位置万位、千位、个位，选择号码18； 开奖号码：11**8 或 18**1，均中任三组三复式';
                _opt.haveCheckbox = true;
                _opt.defaultCheck = 3;
                _opt.numNameList = ['FIFTH#组三'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1)
                }
                break;
            case 'Any3Com6_SSC':
                _maxBonus = '283.3334';
                _rule = '从万位、千位、百位、十位、个位中任意勾选三个位置，然后从0-9中选择三个号码组成一注，所选3个位置的开奖号码与所选号码一致，顺序不限，即为中奖。中奖举例：勾选位置万位、百位、个位，选择号码159； 开奖号码：1*5*9 或 9*1*5，均中任三组六复式。';
                _opt.haveCheckbox = true;
                _opt.defaultCheck = 3;
                _opt.numNameList = ['FIFTH#组六'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) * (a[a.length - 1][a[0]].length - 2) / 6
                }
                break;
            case 'Any3Com_SSC':
                _maxBonus = '566.6666';
                _rule = '从万位、千位、百位、十位、个位中任意勾选三个位置，然后输入三个号码组成一注，所选3个位置的开奖号码与输入号码一致，顺序不限，即为中奖。中奖举例：勾选位置千位、百位、个位，分別投注(0,0,1),以及(1,2,3)，开奖号码：*00*1，顺序不限，均中任三混合组选。';
                _opt.haveCheckbox = true;
                _opt.haveTextarea = true;
                _opt.placeholder = '请导入TXT文件、复制或者输入到这里\n每注之间可以用回车、空格、逗号[,]或者分号[;]隔开\n支持格式如下:\n122 123 211\n123,241,212\n122;221\n';
                _opt.numList = [];
                _opt.type = 'text';
                _opt.numNameList = [];
                _opt.formula = function(a){
                    return console.log('对应 allMixComboSelection');
                }
                break;
            case 'Any4Com24_SSC':
                _maxBonus = '708.3334';
                _rule = '从万位、千位、百位、十位、个位中任意勾选四个位置，然后从0-9中选择四个号码组成一注，所选4个位置的开奖号码与所选号码一致，顺序不限，即为中奖。中奖举例：勾选位置万位、千位、十位、个位，选择号码1234； 开奖号码：12*34 或 13*24，均中任四组选24.';
                _opt.haveCheckbox = true;
                _opt.defaultCheck = 4;
                _opt.numNameList = ['FIRST#组选'];
                _opt.formula = function(a){
                    var b = a[a.length - 1][a[0]].length;
                    return (b - 3) * (b - 2) * (b - 1) * b / 24
                }
                break;
            case 'Any4Com12_SSC':
                _maxBonus = '1416.6666';
                _rule = '从万位、千位、百位、十位、个位中任意勾选四个位置，然后选择1个二重号码和2个单号号码组成一注，所选4个位置的开奖号码中包含与所选号码，且所选二重号码在所选4个位置的开奖号码中出现了2次，即为中奖。中奖举例：勾选位置万位、千位、十位、个位，选择二重号：8，单号：0、6； 开奖号码：88*06 或08*68 均中任四组选12.';
                _opt.haveCheckbox = true;
                _opt.defaultCheck = 4;
                _opt.numNameList = ['FIFTH#二重号', 'FOURTH#单号'];
                _opt.formula = function(a){
                    var b = a[a.length - 1][a[0]].length,
                    c = a[a.length - 1][a[1]].length;
                    return b * (c - 1) * c / 2 - SSC_TEMPLATE.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]]) * (c - 1)
                }
                break;
            case 'Any4Com6_SSC':
                _maxBonus = '2833.3334';
                _rule = '"从万位、千位、百位、十位、个位中任意勾选四个位置，然后从0-9中选择2个二重号组成一注，所选4个位置的开奖号码与所选号码一致，并且所选的2个二重号码在所选4个位置的开奖号码中分别出现了2次，顺序不限，即为中奖。中奖举例：勾选位置万位、千位、十位、个位，选择二重号：6、8； 开奖号码：66*88 或 68*68 均中任四组选6."';
                _opt.haveCheckbox = true;
                _opt.defaultCheck = 4;
                _opt.numNameList = ['FIRST#二重号'];
                _opt.formula = function(a){
                    var b = a[a.length - 1][a[0]].length;
                    return (b - 1) * b / 2
                }
                break;
            case 'Any4Com4_SSC':
                _maxBonus = '4250.0000';
                _rule = '"从万位、千位、百位、十位、个位中任意勾选四个位置，然后从0-9中选择1个三重号和1个单号组成一注，所选4个位置的开奖号码与所选号码一致，并且所选三重号码在所选4个位置的开奖号码中出现了3次，顺序不限，即为中奖。中奖举例：勾选位置万位、千位、十位、个位，选择三重号：8，单号：0； 开奖号码：88*80 或 80*88 均中任四组选4."';
                _opt.haveCheckbox = true;
                _opt.defaultCheck = 4;
                _opt.numNameList = ['FIFTH#三重号', 'FOURTH#单号'];
                _opt.formula = function(a){
                    return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length - SSC_TEMPLATE.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]])
                }
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
    }
};

var globalVar = {
    result: {},
    merchantCode: "",
    defaultAgent: "",
    getAddressResult: null,
    lottBetTimer: [],
    lottDrawNumberTimer: [],
    syncRate: 1,
    quotaObj: [],
    globeRebate: [],
    currentLottery: {},
    headers: {},
    hotGameCount: 8,
    activity: [],
    bankCardLengh: 0,
    BANK_CARD_MAX_LIMIT: 5,
    cid: "",
    messageRecipientList: [],
    messageSelectedRecipient: [],
    pvpGameWindows: null,
    fishingGameWindows: null,
    onlinePaymentWindows: null,
    channelPaymentWindows: null,
    walletList: {},
    deletedIds: [],
    loading: !0,
    xmlHttp: ""
};

var vendorId = {
    onlinePayment: null,
    onlinePayment_index: 0,
    wechat: null,
    wechat_qr_enable: null,
    wechat_index: 0,
    alipay: null,
    alipay_qr_enable: null,
    alipay_index: 0
};