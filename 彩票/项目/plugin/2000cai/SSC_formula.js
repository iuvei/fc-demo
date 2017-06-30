// 时时彩投注数量计算公式
// FIFTH : 个位
// FOURTH : 十位
// THIRD : 百位
// SECOND : 千位
// FIRST : 万位
// 
// 
betBallUI: function(a) {
    switch (a) {
        case "Last1Straight":
            lott.direct(null, ["FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                return a[a.length - 1][a[0]].length
            });
            break;
        case "AnyShow1_SSC":
        case "AnyShow2_SSC":
        case "AnyShow3_SSC":
        case "AnyShow4_SSC":
            lott.NonDirect("特殊", ["FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                return a[a.length - 1][a[0]].length
            });
            break;
        case "FixedPlace":
            "ZY" == globalVar.currentLottMode ? lott.direct(null, ["SECOND", "THIRD", "FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                return a[a.length - 1][a[0]].length + a[a.length - 1][a[1]].length + a[a.length - 1][a[2]].length + a[a.length - 1][a[3]].length
            }) : lott.direct(null, ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                return a[a.length - 1][a[0]].length + a[a.length - 1][a[1]].length + a[a.length - 1][a[2]].length + a[a.length - 1][a[3]].length + a[a.length - 1][a[4]].length
            });
            break;
        case "Last2Straight":
            lott.direct(null, ["FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length
            });
            break;
        case "Last2Com":
            lott.NonDirect("组选", ["FIFTH"], 0, 9, 1, !0, 7, 2, "", function(a) {
                return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) / 2
            });
            break;
        case "Last2Split":
            lott.direct(null, ["FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length
            });
            break;
        case "Last2Point":
            lott.sumAndPointUI("包点", ["FIFTH"], 0, 18, 1, "2ndx");
            break;
        case "Last2Join":
            lott.direct(null, ["FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length + a[a.length - 1][a[1]].length
            });
            break;
        case "Last2Sum":
            lott.sumAndPointUI("和值", ["FIFTH"], 0, 18, 1, "2nd");
            break;
        case "Last3Straight":
            lott.direct(null, ["THIRD", "FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length
            });
            break;
        case "Last3Point":
            lott.sumAndPointUI("包点", ["FIFTH"], 0, 27, 1, "3rdx");
            break;
        case "Last3Com3":
            lott.NonDirect("组三", ["FIFTH"], 0, 9, 1, !0, 10, 2, "", function(a) {
                return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1)
            });
            break;
        case "Last3Com6":
            lott.NonDirect("组六", ["FIFTH"], 0, 9, 1, !0, 10, 3, "", function(a) {
                return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) * (a[a.length - 1][a[0]].length - 2) / 6
            });
            break;
        case "Last3Com":
            lott.allMixComboSelection();
            break;
        case "Last3Join":
            lott.direct(null, ["THIRD", "FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[2]].length
            });
            break;
        case "Last3StraightCom":
            lott.NonDirect("直组", ["FIFTH"], 0, 9, 1, !0, 10, 3, "", function(a) {
                return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) * (a[a.length - 1][a[0]].length - 2)
            });
            break;
        case "Last3Sum":
            lott.sumAndPointUI("和值", ["FIFTH"], 0, 27, 1, "3rd");
            break;
        case "First2Straight":
            lott.direct(null, ["FIRST", "SECOND"], 0, 9, 1, !0, 10, 1, "3", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length
            });
            break;
        case "First2Com":
            lott.NonDirect("组选", ["FIRST"], 0, 9, 1, !0, 7, 2, "", function(a) {
                return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) / 2
            });
            break;
        case "First2Split":
            lott.direct(null, ["FIRST", "SECOND"], 0, 9, 1, !0, 10, 1, "3", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length
            });
            break;
        case "First2Point":
            lott.sumAndPointUI("包点", ["FIRST"], 0, 18, 1, "2ndx");
            break;
        case "First2Join":
            lott.direct(null, ["FIRST", "SECOND"], 0, 9, 1, !0, 10, 1, "3", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length + a[a.length - 1][a[1]].length
            });
            break;
        case "First2Sum":
            lott.sumAndPointUI("和值", ["FIRST"], 0, 18, 1, "2nd");
            break;
        case "First3Straight":
            lott.direct(null, ["FIRST", "SECOND", "THIRD"], 0, 9, 1, !0, 10, 1, "2", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length
            });
            break;
        case "First3Point":
            lott.sumAndPointUI("包点", ["FIRST"], 0, 27, 1, "3rdx");
            break;
        case "First3Com3":
            lott.NonDirect("组三", ["FIRST"], 0, 9, 1, !0, 10, 2, "", function(a) {
                return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1)
            });
            break;
        case "First3Com6":
            lott.NonDirect("组六", ["FIRST"], 0, 9, 1, !0, 10, 3, "", function(a) {
                return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) * (a[a.length - 1][a[0]].length - 2) / 6
            });
            break;
        case "First3Com":
            lott.allMixComboSelection();
            break;
        case "First3Join":
            lott.direct(null, ["FIRST", "SECOND", "THIRD"], 0, 9, 1, !0, 10, 1, "2", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[2]].length
            });
            break;
        case "First3StraightCom":
            lott.NonDirect("直组", ["FIRST"], 0, 9, 1, !0, 10, 3, "", function(a) {
                return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) * (a[a.length - 1][a[0]].length - 2)
            });
            break;
        case "First3Sum":
            lott.sumAndPointUI("和值", ["FIRST"], 0, 27, 1, "3rd");
            break;
        case "All5Straight":
            lott.direct(null, ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length
            });
            break;
        case "All5All":
            lott.direct(null, ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], 0, 9, 1, !1, 1, 1, "", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length
            });
            break;
        case "All5Join":
            lott.direct(null, ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[4]].length
            });
            break;
        case "First2BSOE":
            lott.BSOEUI(["FIRST", "SECOND"], "5", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length
            });
            break;
        case "Last2BSOE":
            lott.BSOEUI(["FOURTH", "FIFTH"], "5", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length
            });
            break;
        case "First2ComAnyCode":
            lott.NonDirect("胆码", ["FIRST"], 0, 9, 1, !0, 10, 1, "", function(a) {
                return 10 * a[a.length - 1][a[0]].length
            });
            break;
        case "First2StraightAnyCode":
            lott.NonDirect("胆码", ["FIRST"], 0, 9, 1, !0, 10, 1, "", function(a) {
                return 1 * a[a.length - 1][a[0]].length
            });
            break;
        case "First3ComAnyCode1":
            lott.NonDirect("胆码", ["FIRST"], 0, 9, 1, !1, 1, 1, "", function(a) {
                return 55 * a[a.length - 1][a[0]].length
            });
            break;
        case "First3ComAnyCode2":
            lott.NonDirect(["一胆", "二胆"], ["FIRST", "SECOND"], 0, 9, 1, !1, 1, 1, "", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * 10
            });
            break;
        case "First3StraightAnyCode1":
            lott.NonDirect("胆码", ["FIRST"], 0, 9, 1, !1, 1, 1, "", function(a) {
                return 1 * a[a.length - 1][a[0]].length
            });
            break;
        case "First3StraightAnyCode2":
            lott.NonDirect(["一胆", "二胆"], ["FIRST", "SECOND"], 0, 9, 1, !1, 1, 1, "", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * 1
            });
            break;
        case "Last2ComAnyCode":
            lott.NonDirect("胆码", ["FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                return 10 * a[a.length - 1][a[0]].length
            });
            break;
        case "Last2StraightAnyCode":
            lott.NonDirect("胆码", ["FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                return 1 * a[a.length - 1][a[0]].length
            });
            break;
        case "Last3ComAnyCode1":
            lott.NonDirect("胆码", ["FIFTH"], 0, 9, 1, !1, 1, 1, "", function(a) {
                return 55 * a[a.length - 1][a[0]].length
            });
            break;
        case "Last3ComAnyCode2":
            lott.NonDirect(["一胆", "二胆"], ["FOURTH", "FIFTH"], 0, 9, 1, !1, 1, 1, "", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * 10
            });
            break;
        case "Last3StraightAnyCode1":
            lott.NonDirect("胆码", ["FIFTH"], 0, 9, 1, !1, 1, 1, "", function(a) {
                return 1 * a[a.length - 1][a[0]].length
            });
            break;
        case "Last3StraightAnyCode2":
            lott.NonDirect(["一胆", "二胆"], ["FOURTH", "FIFTH"], 0, 9, 1, !1, 1, 1, "", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * 1
            });
            break;
        case "Last4Straight":
            lott.direct(null, ["SECOND", "THIRD", "FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length
            });
            break;
        case "Last4Join":
            lott.direct(null, ["SECOND", "THIRD", "FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 1, "", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[3]].length
            });
            break;
        case "First4Straight":
            lott.direct(null, ["FIRST", "SECOND", "THIRD", "FOURTH"], 0, 9, 1, !0, 10, 1, "1", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length
            });
            break;
        case "First4Join":
            lott.direct(null, ["FIRST", "SECOND", "THIRD", "FOURTH"], 0, 9, 1, !0, 10, 1, "1", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[3]].length
            });
            break;
        case "Middle3Straight":
            lott.direct(null, ["SECOND", "THIRD", "FOURTH"], 0, 9, 1, !0, 10, 1, "1", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length
            });
            break;
        case "First3Point":
            lott.sumAndPointUI("包点", ["FOURTH"], 0, 27, 1, "3rdx");
            break;
        case "Middle3Com3":
            lott.NonDirect("组三", ["FOURTH"], 0, 9, 1, !0, 10, 2, "", function(a) {
                return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1)
            });
            break;
        case "Middle3Com6":
            lott.NonDirect("组六", ["FOURTH"], 0, 9, 1, !0, 10, 3, "", function(a) {
                return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) * (a[a.length - 1][a[0]].length - 2) / 6
            });
            break;
        case "Middle3Com":
            lott.allMixComboSelection();
            break;
        case "Middle3Join":
            lott.direct(null, ["SECOND", "THIRD", "FOURTH"], 0, 9, 1, !0, 10, 1, "1", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[2]].length
            });
            break;
        case "Middle3StraightCom":
            lott.NonDirect("直组", ["FOURTH"], 0, 9, 1, !0, 10, 3, "", function(a) {
                return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) * (a[a.length - 1][a[0]].length - 2)
            });
            break;
        case "Middle3Sum":
            lott.sumAndPointUI("和值", ["FOURTH"], 0, 27, 1, "3rd");
            break;
        case "Middle3ComAnyCode1":
            lott.NonDirect("胆码", ["FOURTH"], 0, 9, 1, !1, 1, 1, "", function(a) {
                return 55 * a[a.length - 1][a[0]].length
            });
            break;
        case "Middle3ComAnyCode2":
            lott.NonDirect(["一胆", "二胆"], ["THIRD", "FOURTH"], 0, 9, 1, !1, 1, 1, "", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * 10
            });
            break;
        case "Middle3StraightAnyCode1":
            lott.NonDirect("胆码", ["FOURTH"], 0, 9, 1, !1, 1, 1, "", function(a) {
                return 1 * a[a.length - 1][a[0]].length
            });
            break;
        case "Middle3StraightAnyCode2":
            lott.NonDirect(["一胆", "二胆"], ["THIRD", "FOURTH"], 0, 9, 1, !1, 1, 1, "", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * 1
            });
            break;
        case "Any1":
            lott.direct(null, ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 0, "", function(a) {
                return a[a.length - 1][a[0]].length + a[a.length - 1][a[1]].length + a[a.length - 1][a[2]].length + a[a.length - 1][a[3]].length + a[a.length - 1][a[4]].length
            });
            break;
        case "Any2":
            lott.direct(null, ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 0, "", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[2]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length
            });
            break;
        case "Any3":
            lott.direct(null, ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 0, "", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length
            });
            break;
        case "Any4":
            lott.direct(null, ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"], 0, 9, 1, !0, 10, 0, "", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[0]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length + a[a.length - 1][a[1]].length * a[a.length - 1][a[2]].length * a[a.length - 1][a[3]].length * a[a.length - 1][a[4]].length
            });
            break;
        case "AllCom120":
            lott.NonDirect("组选", ["FIRST"], 0, 9, 1, !0, 10, 5, "", function(a) {
                var b = a[a.length - 1][a[0]].length;
                return (b - 4) * (b - 3) * (b - 2) * (b - 1) * b / 120
            });
            break;
        case "AllCom60":
            lott.NonDirect(["二重号", "单号"], ["FIFTH", "FOURTH"], 0, 9, 1, !0, 10, {
                FIFTH: 1,
                FOURTH: 3
            }, "", function(a) {
                var b = a[a.length - 1][a[0]].length,
                    c = b > 0 ? a[a.length - 1][a[1]].length : 0;
                return c * (c - 2) * (c - 1) / 6 * b - lott.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]]) * ((c - 2) * (c - 1)) / 2
            });
            break;
        case "AllCom30":
            lott.NonDirect(["二重号", "单号"], ["FIFTH", "FOURTH"], 0, 9, 1, !0, 10, {
                FIFTH: 2,
                FOURTH: 1
            }, "", function(a) {
                var b = a[a.length - 1][a[0]].length;
                return a[a.length - 1][a[1]].length * ((b - 1) * b) / 2 - lott.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]]) * (b - 1)
            });
            break;
        case "AllCom20":
            lott.NonDirect(["三重号", "单号"], ["FIFTH", "FOURTH"], 0, 9, 1, !0, 10, {
                FIFTH: 1,
                FOURTH: 2
            }, "", function(a) {
                var b = a[a.length - 1][a[0]].length,
                    c = a[a.length - 1][a[1]].length;
                return b * ((c - 1) * c) / 2 - lott.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]]) * (c - 1)
            });
            break;
        case "AllCom10":
            lott.NonDirect(["三重号", "二重号"], ["FIFTH", "FOURTH"], 0, 9, 1, !0, 10, {
                FIFTH: 1,
                FOURTH: 1
            }, "", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length - lott.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]])
            });
            break;
        case "AllCom5":
            lott.NonDirect(["四重号", "单号"], ["FIFTH", "FOURTH"], 0, 9, 1, !0, 10, {
                FIFTH: 1,
                FOURTH: 1
            }, "", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length - lott.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]])
            });
            break;
        case "F4Com24":
        case "L4Com24":
            lott.NonDirect("组选", ["FIRST"], 0, 9, 1, !0, 10, 4, "", function(a) {
                var b = a[a.length - 1][a[0]].length;
                return (b - 3) * (b - 2) * (b - 1) * b / 24
            });
            break;
        case "F4Com12":
        case "L4Com12":
            lott.NonDirect(["二重号", "单号"], ["FIFTH", "FOURTH"], 0, 9, 1, !0, 10, {
                FIFTH: 1,
                FOURTH: 2
            }, "", function(a) {
                var b = a[a.length - 1][a[0]].length,
                    c = a[a.length - 1][a[1]].length;
                return b * (c - 1) * c / 2 - lott.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]]) * (c - 1)
            });
            break;
        case "F4Com6":
        case "L4Com6":
            lott.NonDirect("二重号", ["FIRST"], 0, 9, 1, !0, 10, 2, "", function(a) {
                var b = a[a.length - 1][a[0]].length;
                return (b - 1) * b / 2
            });
            break;
        case "F4Com4":
        case "L4Com4":
            lott.NonDirect(["三重号", "单号"], ["FIFTH", "FOURTH"], 0, 9, 1, !0, 10, {
                FIFTH: 1,
                FOURTH: 1
            }, "", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length - lott.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]])
            });
            break;
        case "Any4Com24_SSC":
            lott.NonDirect("组选", ["FIRST"], 0, 9, 1, !0, 10, 4, "", function(a) {
                var b = a[a.length - 1][a[0]].length;
                return (b - 3) * (b - 2) * (b - 1) * b / 24
            }, !0);
            break;
        case "Any4Com12_SSC":
            lott.NonDirect(["二重号", "单号"], ["FIFTH", "FOURTH"], 0, 9, 1, !0, 10, {
                FIFTH: 1,
                FOURTH: 2
            }, "", function(a) {
                var b = a[a.length - 1][a[0]].length,
                    c = a[a.length - 1][a[1]].length;
                return b * (c - 1) * c / 2 - lott.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]]) * (c - 1)
            }, !0);
            break;
        case "Any4Com6_SSC":
            lott.NonDirect("二重号", ["FIRST"], 0, 9, 1, !0, 10, 2, "", function(a) {
                var b = a[a.length - 1][a[0]].length;
                return (b - 1) * b / 2
            }, !0);
            break;
        case "Any4Com4_SSC":
            lott.NonDirect(["三重号", "单号"], ["FIFTH", "FOURTH"], 0, 9, 1, !0, 10, {
                FIFTH: 1,
                FOURTH: 1
            }, "", function(a) {
                return a[a.length - 1][a[0]].length * a[a.length - 1][a[1]].length - lott.sameComparer(a[a.length - 1][a[0]], a[a.length - 1][a[1]])
            }, !0);
            break;
        case "Any3Sum_SSC":
            lott.sumAndPointUI("和值", ["FIFTH"], 1, 26, 1, "3rdz");
            break;
        case "Any3Com3_SSC":
            lott.NonDirect("组三", ["FIFTH"], 0, 9, 1, !0, 10, 2, "", function(a) {
                return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1)
            }, !0);
            break;
        case "Any3Com6_SSC":
            lott.NonDirect("组六", ["FIFTH"], 0, 9, 1, !0, 10, 3, "", function(a) {
                return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) * (a[a.length - 1][a[0]].length - 2) / 6
            }, !0);
            break;
        case "Any3Com_SSC":
            lott.allMixComboSelection();
            break;
        case "Any2Sum_SSC":
            lott.sumAndPointUI("和值", ["FIFTH"], 1, 17, 1, "2rdz");
            break;
        case "Any2Com_SSC":
            lott.NonDirect("组选", ["FIRST"], 0, 9, 1, !0, 7, 2, "", function(a) {
                return a[a.length - 1][a[0]].length * (a[a.length - 1][a[0]].length - 1) / 2
            }, !0);
            break;
        case "Any2Com_SSC_Single":
        default:
            lott.allManualEntryEvents()
    }
}