$.strPad = function(a, b, c) {
    var d = a.toString();
    for (c || (c = "0"); d.length < b;) d = c + d;
    return d
};