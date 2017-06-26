function getEncryptedText(a) {
    if (null == a || 0 == a.length) return "";
    for (var b = a[0], c = 1; c < a.length; c++) b += "<a>" + a[c];
    return RSAEncrypt(b)
}

function RSAEncrypt(a) {
    var b = getPublicKey().split("##");
    setMaxDigits(130);
    var c = new RSAKeyPair("10001", "", b[0]),
        d = new RSAKeyPair("10001", "", b[1]),
        e = encryptedString(c, a);
    return e = encryptedString(d, e)
}

function getPublicKey() {
    return $.ajax({
        type: "GET",
        url: "secure/Md5Code",
        dataType: "text",
        async: !1,
        cache: !1
    }).responseText
}

function RSAKeyPair(a, b, c) {
    this.e = biFromHex(a), this.d = biFromHex(b), this.m = biFromHex(c), this.chunkSize = 2 * biHighIndex(this.m), this.radix = 16, this.barrett = new BarrettMu(this.m)
}

function twoDigit(a) {
    return (a < 10 ? "0" : "") + String(a)
}

function encryptedString(a, b) {
    for (var c = new Array, d = b.length, e = 0; e < d;) c[e] = b.charCodeAt(e), e++;
    for (; c.length % a.chunkSize != 0;) c[e++] = 0;
    var f, g, h, i = c.length,
        j = "";
    for (e = 0; e < i; e += a.chunkSize) {
        for (h = new BigInt, f = 0, g = e; g < e + a.chunkSize; ++f) h.digits[f] = c[g++], h.digits[f] += c[g++] << 8;
        var k = a.barrett.powMod(h, a.e);
        j += (16 == a.radix ? biToHex(k) : biToString(k, a.radix)) + " "
    }
    return j.substring(0, j.length - 1)
}

function setMaxDigits(a) {
    maxDigits = a, ZERO_ARRAY = new Array(maxDigits);
    for (var b = 0; b < ZERO_ARRAY.length; b++) ZERO_ARRAY[b] = 0;
    bigZero = new BigInt, bigOne = new BigInt, bigOne.digits[0] = 1
}

function BigInt(a) {
    this.digits = "boolean" == typeof a && 1 == a ? null : ZERO_ARRAY.slice(0), this.isNeg = !1
}

function biFromDecimal(a) {
    for (var b, c = "-" == a.charAt(0), d = c ? 1 : 0; d < a.length && "0" == a.charAt(d);) ++d;
    if (d == a.length) b = new BigInt;
    else {
        var e = a.length - d,
            f = e % dpl10;
        for (0 == f && (f = dpl10), b = biFromNumber(Number(a.substr(d, f))), d += f; d < a.length;) b = biAdd(biMultiply(b, lr10), biFromNumber(Number(a.substr(d, dpl10)))), d += dpl10;
        b.isNeg = c
    }
    return b
}

function biCopy(a) {
    var b = new BigInt(!0);
    return b.digits = a.digits.slice(0), b.isNeg = a.isNeg, b
}

function biFromNumber(a) {
    var b = new BigInt;
    b.isNeg = a < 0, a = Math.abs(a);
    for (var c = 0; a > 0;) b.digits[c++] = a & maxDigitVal, a = Math.floor(a / biRadix);
    return b
}

function reverseStr(a) {
    for (var b = "", c = a.length - 1; c > -1; --c) b += a.charAt(c);
    return b
}

function biToString(a, b) {
    var c = new BigInt;
    c.digits[0] = b;
    for (var d = biDivideModulo(a, c), e = hexatrigesimalToChar[d[1].digits[0]]; 1 == biCompare(d[0], bigZero);) d = biDivideModulo(d[0], c), digit = d[1].digits[0], e += hexatrigesimalToChar[d[1].digits[0]];
    return (a.isNeg ? "-" : "") + reverseStr(e)
}

function biToDecimal(a) {
    var b = new BigInt;
    b.digits[0] = 10;
    for (var c = biDivideModulo(a, b), d = String(c[1].digits[0]); 1 == biCompare(c[0], bigZero);) c = biDivideModulo(c[0], b), d += String(c[1].digits[0]);
    return (a.isNeg ? "-" : "") + reverseStr(d)
}

function digitToHex(a) {
    var b = "";
    for (i = 0; i < 4; ++i) b += hexToChar[15 & a], a >>>= 4;
    return reverseStr(b)
}

function biToHex(a) {
    for (var b = "", c = (biHighIndex(a), biHighIndex(a)); c > -1; --c) b += digitToHex(a.digits[c]);
    return b
}

function charToHex(a) {
    return a >= 48 && a <= 57 ? a - 48 : a >= 65 && a <= 90 ? 10 + a - 65 : a >= 97 && a <= 122 ? 10 + a - 97 : 0
}

function hexToDigit(a) {
    for (var b = 0, c = Math.min(a.length, 4), d = 0; d < c; ++d) b <<= 4, b |= charToHex(a.charCodeAt(d));
    return b
}

function biFromHex(a) {
    for (var b = new BigInt, c = a.length, d = c, e = 0; d > 0; d -= 4, ++e) b.digits[e] = hexToDigit(a.substr(Math.max(d - 4, 0), Math.min(d, 4)));
    return b
}

function biFromString(a, b) {
    var c = "-" == a.charAt(0),
        d = c ? 1 : 0,
        e = new BigInt,
        f = new BigInt;
    f.digits[0] = 1;
    for (var g = a.length - 1; g >= d; g--) {
        e = biAdd(e, biMultiplyDigit(f, charToHex(a.charCodeAt(g)))), f = biMultiplyDigit(f, b)
    }
    return e.isNeg = c, e
}

function biDump(a) {
    return (a.isNeg ? "-" : "") + a.digits.join(" ")
}

function biAdd(a, b) {
    var c;
    if (a.isNeg != b.isNeg) b.isNeg = !b.isNeg, c = biSubtract(a, b), b.isNeg = !b.isNeg;
    else {
        c = new BigInt;
        for (var d, e = 0, f = 0; f < a.digits.length; ++f) d = a.digits[f] + b.digits[f] + e, c.digits[f] = d % biRadix, e = Number(d >= biRadix);
        c.isNeg = a.isNeg
    }
    return c
}

function biSubtract(a, b) {
    var c;
    if (a.isNeg != b.isNeg) b.isNeg = !b.isNeg, c = biAdd(a, b), b.isNeg = !b.isNeg;
    else {
        c = new BigInt;
        var d, e;
        e = 0;
        for (var f = 0; f < a.digits.length; ++f) d = a.digits[f] - b.digits[f] + e, c.digits[f] = d % biRadix, c.digits[f] < 0 && (c.digits[f] += biRadix), e = 0 - Number(d < 0);
        if (-1 == e) {
            e = 0;
            for (var f = 0; f < a.digits.length; ++f) d = 0 - c.digits[f] + e, c.digits[f] = d % biRadix, c.digits[f] < 0 && (c.digits[f] += biRadix), e = 0 - Number(d < 0);
            c.isNeg = !a.isNeg
        } else c.isNeg = a.isNeg
    }
    return c
}

function biHighIndex(a) {
    for (var b = a.digits.length - 1; b > 0 && 0 == a.digits[b];) --b;
    return b
}

function biNumBits(a) {
    var b, c = biHighIndex(a),
        d = a.digits[c],
        e = (c + 1) * bitsPerDigit;
    for (b = e; b > e - bitsPerDigit && 0 == (32768 & d); --b) d <<= 1;
    return b
}

function biMultiply(a, b) {
    for (var c, d, e, f = new BigInt, g = biHighIndex(a), h = biHighIndex(b), i = 0; i <= h; ++i) {
        for (c = 0, e = i, j = 0; j <= g; ++j, ++e) d = f.digits[e] + a.digits[j] * b.digits[i] + c, f.digits[e] = d & maxDigitVal, c = d >>> biRadixBits;
        f.digits[i + g + 1] = c
    }
    return f.isNeg = a.isNeg != b.isNeg, f
}

function biMultiplyDigit(a, b) {
    var c, d, e;
    result = new BigInt, c = biHighIndex(a), d = 0;
    for (var f = 0; f <= c; ++f) e = result.digits[f] + a.digits[f] * b + d, result.digits[f] = e & maxDigitVal, d = e >>> biRadixBits;
    return result.digits[1 + c] = d, result
}

function arrayCopy(a, b, c, d, e) {
    for (var f = Math.min(b + e, a.length), g = b, h = d; g < f; ++g, ++h) c[h] = a[g]
}

function biShiftLeft(a, b) {
    var c = Math.floor(b / bitsPerDigit),
        d = new BigInt;
    arrayCopy(a.digits, 0, d.digits, c, d.digits.length - c);
    for (var e = b % bitsPerDigit, f = bitsPerDigit - e, g = d.digits.length - 1, h = g - 1; g > 0; --g, --h) d.digits[g] = d.digits[g] << e & maxDigitVal | (d.digits[h] & highBitMasks[e]) >>> f;
    return d.digits[0] = d.digits[g] << e & maxDigitVal, d.isNeg = a.isNeg, d
}

function biShiftRight(a, b) {
    var c = Math.floor(b / bitsPerDigit),
        d = new BigInt;
    arrayCopy(a.digits, c, d.digits, 0, a.digits.length - c);
    for (var e = b % bitsPerDigit, f = bitsPerDigit - e, g = 0, h = g + 1; g < d.digits.length - 1; ++g, ++h) d.digits[g] = d.digits[g] >>> e | (d.digits[h] & lowBitMasks[e]) << f;
    return d.digits[d.digits.length - 1] >>>= e, d.isNeg = a.isNeg, d
}

function biMultiplyByRadixPower(a, b) {
    var c = new BigInt;
    return arrayCopy(a.digits, 0, c.digits, b, c.digits.length - b), c
}

function biDivideByRadixPower(a, b) {
    var c = new BigInt;
    return arrayCopy(a.digits, b, c.digits, 0, c.digits.length - b), c
}

function biModuloByRadixPower(a, b) {
    var c = new BigInt;
    return arrayCopy(a.digits, 0, c.digits, 0, b), c
}

function biCompare(a, b) {
    if (a.isNeg != b.isNeg) return 1 - 2 * Number(a.isNeg);
    for (var c = a.digits.length - 1; c >= 0; --c)
        if (a.digits[c] != b.digits[c]) return a.isNeg ? 1 - 2 * Number(a.digits[c] > b.digits[c]) : 1 - 2 * Number(a.digits[c] < b.digits[c]);
    return 0
}

function biDivideModulo(a, b) {
    var c, d, e = biNumBits(a),
        f = biNumBits(b),
        g = b.isNeg;
    if (e < f) return a.isNeg ? (c = biCopy(bigOne), c.isNeg = !b.isNeg, a.isNeg = !1, b.isNeg = !1, d = biSubtract(b, a), a.isNeg = !0, b.isNeg = g) : (c = new BigInt, d = biCopy(a)), new Array(c, d);
    c = new BigInt, d = a;
    for (var h = Math.ceil(f / bitsPerDigit) - 1, i = 0; b.digits[h] < biHalfRadix;) b = biShiftLeft(b, 1), ++i, ++f, h = Math.ceil(f / bitsPerDigit) - 1;
    d = biShiftLeft(d, i), e += i;
    for (var j = Math.ceil(e / bitsPerDigit) - 1, k = biMultiplyByRadixPower(b, j - h); - 1 != biCompare(d, k);) ++c.digits[j - h], d = biSubtract(d, k);
    for (var l = j; l > h; --l) {
        var m = l >= d.digits.length ? 0 : d.digits[l],
            n = l - 1 >= d.digits.length ? 0 : d.digits[l - 1],
            o = l - 2 >= d.digits.length ? 0 : d.digits[l - 2],
            p = h >= b.digits.length ? 0 : b.digits[h],
            q = h - 1 >= b.digits.length ? 0 : b.digits[h - 1];
        c.digits[l - h - 1] = m == p ? maxDigitVal : Math.floor((m * biRadix + n) / p);
        for (var r = c.digits[l - h - 1] * (p * biRadix + q), s = m * biRadixSquared + (n * biRadix + o); r > s;) --c.digits[l - h - 1], r = c.digits[l - h - 1] * (p * biRadix | q), s = m * biRadix * biRadix + (n * biRadix + o);
        k = biMultiplyByRadixPower(b, l - h - 1), d = biSubtract(d, biMultiplyDigit(k, c.digits[l - h - 1])), d.isNeg && (d = biAdd(d, k), --c.digits[l - h - 1])
    }
    return d = biShiftRight(d, i), c.isNeg = a.isNeg != g, a.isNeg && (c = g ? biAdd(c, bigOne) : biSubtract(c, bigOne), b = biShiftRight(b, i), d = biSubtract(b, d)), 0 == d.digits[0] && 0 == biHighIndex(d) && (d.isNeg = !1), new Array(c, d)
}

function biDivide(a, b) {
    return biDivideModulo(a, b)[0]
}

function biModulo(a, b) {
    return biDivideModulo(a, b)[1]
}

function biMultiplyMod(a, b, c) {
    return biModulo(biMultiply(a, b), c)
}

function biPow(a, b) {
    for (var c = bigOne, d = a;;) {
        if (0 != (1 & b) && (c = biMultiply(c, d)), 0 == (b >>= 1)) break;
        d = biMultiply(d, d)
    }
    return c
}

function biPowMod(a, b, c) {
    for (var d = bigOne, e = a, f = b;;) {
        if (0 != (1 & f.digits[0]) && (d = biMultiplyMod(d, e, c)), f = biShiftRight(f, 1), 0 == f.digits[0] && 0 == biHighIndex(f)) break;
        e = biMultiplyMod(e, e, c)
    }
    return d
}

function BarrettMu(a) {
    this.modulus = biCopy(a), this.k = biHighIndex(this.modulus) + 1;
    var b = new BigInt;
    b.digits[2 * this.k] = 1, this.mu = biDivide(b, this.modulus), this.bkplus1 = new BigInt, this.bkplus1.digits[this.k + 1] = 1, this.modulo = BarrettMu_modulo, this.multiplyMod = BarrettMu_multiplyMod, this.powMod = BarrettMu_powMod
}

function BarrettMu_modulo(a) {
    var b = biDivideByRadixPower(a, this.k - 1),
        c = biMultiply(b, this.mu),
        d = biDivideByRadixPower(c, this.k + 1),
        e = biModuloByRadixPower(a, this.k + 1),
        f = biMultiply(d, this.modulus),
        g = biModuloByRadixPower(f, this.k + 1),
        h = biSubtract(e, g);
    h.isNeg && (h = biAdd(h, this.bkplus1));
    for (var i = biCompare(h, this.modulus) >= 0; i;) h = biSubtract(h, this.modulus), i = biCompare(h, this.modulus) >= 0;
    return h
}

function BarrettMu_multiplyMod(a, b) {
    var c = biMultiply(a, b);
    return this.modulo(c)
}

function BarrettMu_powMod(a, b) {
    var c = new BigInt;
    c.digits[0] = 1;
    for (var d = a, e = b;;) {
        if (0 != (1 & e.digits[0]) && (c = this.multiplyMod(c, d)), e = biShiftRight(e, 1), 0 == e.digits[0] && 0 == biHighIndex(e)) break;
        d = this.multiplyMod(d, d)
    }
    return c
}
var biRadixBase = 2,
    biRadixBits = 16,
    bitsPerDigit = biRadixBits,
    biRadix = 65536,
    biHalfRadix = biRadix >>> 1,
    biRadixSquared = biRadix * biRadix,
    maxDigitVal = biRadix - 1,
    maxInteger = 9999999999999998,
    maxDigits, ZERO_ARRAY, bigZero, bigOne;
setMaxDigits(20);
var dpl10 = 15,
    lr10 = biFromNumber(1e15),
    hexatrigesimalToChar = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"),
    hexToChar = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"),
    highBitMasks = new Array(0, 32768, 49152, 57344, 61440, 63488, 64512, 65024, 65280, 65408, 65472, 65504, 65520, 65528, 65532, 65534, 65535),
    lowBitMasks = new Array(0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535);