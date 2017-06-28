var SSC_TEMPLATE = {
    All_5: function() {
        /* 五星 */
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
        return {
            dom: _str
        };
    },
    First_4: function() {
        /* 前四 */
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
            dom: _str
        };
    },
    Last_4: function() {
        /* 后四 */
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
            dom: _str
        };
    },
    First_3: function() {
        /* 前三 */
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
            dom: _str
        };
    },
    Middle_3: function() {
        /* 中三 */
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
            dom: _str
        };
    },
    Last_3: function() {
        /* 后三 */
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
            dom: _str
        };
    },
    First_2: function() {
        /* 前二 */
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
            dom: _str
        };
    },
    Last_2: function() {
        /* 后二 */
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
            dom: _str
        };
    },
    Last_1: function() {
        /* 一星 */
        var _str = '';
        _str += '<dl>';
        _str += '    <dt>定位胆：</dt>';
        _str += '    <dd id="J_FixedPlace" class="J_subMenu active" data-info="14#FixedPlace#2">一星定位胆</dd>';
        _str += '    <dd id="J_Last1Straight" class="J_subMenu" data-info="13#Last1Straight#2">一星直选</dd>';
        _str += '</dl>';
        return {
            dom: _str
        };
    },
    Any_Place: function() {
        /* 不定位 */
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
            dom: _str
        };
    },
    Fun: function() {
        /* 趣味 */
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
            dom: _str
        };
    },
    Any: function() {
        /* 任选 */
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
            dom: _str
        };
    }
};