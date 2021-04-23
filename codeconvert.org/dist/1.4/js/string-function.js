function manageControlV() {
    var a = !1;
    $(document).keydown(function (e) {
        17 != e.keyCode && 91 != e.keyCode || (a = !0)
    }).keyup(function (e) {
        17 != e.keyCode && 91 != e.keyCode || (a = !1)
    }), $("#input").keyup(function (e) {
        a && 86 == e.keyCode && $("#temp").click()
    })
}

function setToEditor(e) {
    $("#numberConverterDiv").hasClass("hide") ? ($("#input").val(""), $("#input").val(e), $("#temp").click()) : ($("#input_from").val(e), $("#select_from").trigger("change"))
}

function convertFromBaseToBase(e, a, t) {
    var r = parseInt(e, a);
    if ("" != e.trim()) {
        var i = r.toString(t);
        return "NaN" == i.toString() && (i = "Invalid Input"), i
    }
}

function reverse() {
    var e = $("#input").val().split("").reverse().join("");
    $("#output").val(e.trim())
}

function urlEncode() {
    var e = $("#input").val();
    $("#output").val(encodeURIComponent(e))
}

function urlDecode() {
    var e = $("#input").val();
    $("#output").val(decodeURIComponent(e))
}

function htmlEncode() {
    var e = $("#input").val(),
        a = $("<div/>").text(e).html();
    $("#output").val(a)
}

function htmlDecode() {
    var e = $("#input").val(),
        a = $("<div/>").html(e).text();
    $("#output").val(a)
}

function strTohex() {
    for (var e = $("#input").val(), a = "", t = 0; t < e.length; t++) a += "" + e.charCodeAt(t).toString(16);
    $("#output").val(a)
}

function hexTostr() {
    for (var e = $("#input").val(), a = "", t = 0; t < e.length; t += 2) a += String.fromCharCode(parseInt(e.substr(t, 2), 16));
    $("#output").val(a)
}

function strTobinary() {
    var e, a, t = $("#input").val(),
        r = [],
        i = "";
    for (e = 0; e < t.length; e++) r.push(t[e].charCodeAt(0).toString(2));
    for (a = 0; a < r.length; a++) {
        i += padding_left(r[a], "0", 8) + " "
    }
    $("#output").val(i)
}

function padding_left(e, a, t) {
    if (!e || !a || e.length >= t) return e;
    for (var r = (t - e.length) / a.length, i = 0; i < r; i++) e = a + e;
    return e
}

function binaryTostr() {
    var e = $("#input").val(),
        a = "";
    if ((e = e.replace(/\s/g, "")).length % 8 != 0) a = "???:";
    else
        for (; 0 < e.length;) {
            var t = e.substring(0, 8);
            e = e.substring(8);
            var r = parseInt(t, 2);
            a += String.fromCharCode(r)
        }
    $("#output").val(a)
}

function decimalTobinary() {
    var e = convertFromBaseToBase($("#input").val(), 10, 2);
    $("#output").val(e)
}

function decimalTohexadeciaml() {
    var e = convertFromBaseToBase($("#input").val(), 10, 16);
    $("#output").val(e)
}

function decimalTooctal() {
    var e = convertFromBaseToBase($("#input").val(), 10, 8);
    $("#output").val(e)
}

function binaryTodecimal() {
    var e = convertFromBaseToBase($("#input").val(), 2, 10);
    $("#output").val(e)
}

function binaryTohexadeciaml() {
    var e = convertFromBaseToBase($("#input").val(), 2, 16);
    $("#output").val(e)
}

function binaryTooctal() {
    var e = convertFromBaseToBase($("#input").val(), 2, 8);
    $("#output").val(e)
}

function hexadeciamlTodecimal() {
    var e = convertFromBaseToBase($("#input").val(), 16, 10);
    $("#output").val(e)
}

function hexadeciamlTobinary() {
    var e = convertFromBaseToBase($("#input").val(), 16, 2);
    $("#output").val(e)
}

function hexadeciamlTooctal() {
    var e = convertFromBaseToBase($("#input").val(), 16, 8);
    $("#output").val(e)
}

function octalTodecimal() {
    var e = convertFromBaseToBase($("#input").val(), 8, 10);
    $("#output").val(e)
}

function octalTobinary() {
    var e = convertFromBaseToBase($("#input").val(), 8, 2);
    $("#output").val(e)
}

function octalTohexadeciaml() {
    var e = convertFromBaseToBase($("#input").val(), 8, 16);
    $("#output").val(e)
}

function buildString() {
    for (var e = $("#input").val().split("\n"), a = e.length - 1, t = "", r = 0; r < e.length; r++) t += r == a ? " '  " + e[r] + "  ' ; " : " '   " + e[r] + "  '  + \n";
    $("#output").val(t)
}

function getStringFunctionSample(e) {
    var a = "";
    "reverse-string" == e || "text-reverser" == e || "base64-encode" == e || "case-converter" == e || "text-to-rot13-converter" == e || "ntlm-hash-generator" == e ? a = "Hello codeconvert" : "html-encode-string" == e ? a = "<!DOCTYPE html><html><body><h1>My First Heading</h1><p>My first paragraph.</p></body></html>" : "html-decode-string" == e ? a = "&lt;!DOCTYPE html&gt;&lt;html&gt;&lt;body&gt;&lt;h1&gt;My First Heading&lt;/h1&gt;&lt;p&gt;My first paragraph.&lt;/p&gt;> &lt;/body&gt;&lt;/html&gt;" : "url-encode-string" == e ? a = "https://codeconvert.org/string-function" : "url-decode-string" == e ? a = "http%3A%2F%2Fcodeconvert.org%2Fstring-function" : "string-hex-converter" == e ? a = "hello computer" : "hex-string-converter" == e ? a = "68656c6c6f20636f6d7075746572" : "string-binary-converter" == e || "text-to-binary" == e ? a = "hello" : "binary-string-converter" == e || "binary-to-text" == e ? a = "01101000 01100101 01101100 01101100 01101111" : "decimal-binary-converter" == e || "decimal-hex-converter" == e || "decimal-octal-converter" == e || "number-to-word-converter" == e ? a = "123" : "binary-hex-converter" == e || "binary-decimal-converter" == e || "binary-octal-converter" == e ? a = "01101000 01100101 01101100 01101100 01101111" : "hex-octal-converter" == e || "hex-decimal-converter" == e || "hex-binary-converter" == e ? a = "4d0" : "octal-binary-converter" == e || "octal-decimal-converter" == e || "octal-hex-converter" == e ? a = "1422" : "string-builder" == e ? a = '   {"menu": {  \n     "id": "file",  \n     "value": "File",  \n     "popup": {  \n       "menuitem": [  \n         {"value": "New", "onclick": "CreateNewDoc()"},  \n         {"value": "Open", "onclick": "OpenDoc()"},  \n         {"value": "Close", "onclick": "CloseDoc()"}  \n       ]  \n     }  \n  }}  \n' : "base64-decode" == e ? a = "SGVsbG8gQ29kZWJlYXV0aWZ5" : "delimited-text-extractor" == e ? a = "id;name\n1;john\n2;doe\n3;johnson\n" : "remove-accents" == e ? a = "Il adressa des messages aux Canan�ens �tablis � l'est et � l'ouest, aux Amor�ens, aux Hittites, aux Ph�r�ziens, et aux Yebousiens �tablis dans la r�gion montagneuse,et aux H�viens �tablis au pied de l'Hermon dans la r�gion de Mitspa." : "remove-duplicate-lines" == e ? a = "my first line\nmy second line\nmy duplicate line\nmy duplicate line\nmy last line" : "remove-empty-lines" == e ? a = "my first line\nmy second line\n\nmy last line" : "remove-extra-spaces" == e ? a = "   this   is   the  example  with  extra   spaces" : "remove-line-breaks" == e || "remove-lines-containing" == e || "sort-text-lines" == e ? a = "my second line\nmy first line\nmy third line" : "text-minifier" == e || "calculate-string-length" == e ? a = "You have \t\tto either  \t\t\tperform the \t\treplace before you split the string or perform the replace onevery element of the array separately." : "rot13-to-text-converter" == e && (a = "Uryyb pbqrpbaireg"), $("#input").val(a)
}

function allNumbersConvter(e, a, t, r) {
    var i = $("#" + e).val(),
        n = $("#" + a).val(),
        o = $("#" + t).val();
    if ($("#select_from_title").text($("#select_from option:selected").text()), $("#select_to_title").text($("#select_to option:selected").text()), "lefttoright" == (r = void 0 !== r ? r : "lefttoright")) {
        var l = convertFromBaseToBase(i, n, o);
        console.log(l), $("#output_to").val(l)
    } else {
        l = convertFromBaseToBase(i, n, o);
        $("#input_from").val(l)
    }
}

function NumberToWordsIndia(e) {
    var a = ["", "one ", "two ", "three ", "four ", "five ", "six ", "seven ", "eight ", "nine ", "ten ", "eleven ", "twelve ", "thirteen ", "fourteen ", "fifteen ", "sixteen ", "seventeen ", "eighteen ", "nineteen "],
        t = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    if (9 < (e = e.toString()).length) return "overflow";
    if (n = ("000000000" + e).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/), n) {
        var r = "";
        return r += 0 != n[1] ? (a[Number(n[1])] || t[n[1][0]] + " " + a[n[1][1]]) + "crore " : "", r += 0 != n[2] ? (a[Number(n[2])] || t[n[2][0]] + " " + a[n[2][1]]) + "lakh " : "", r += 0 != n[3] ? (a[Number(n[3])] || t[n[3][0]] + " " + a[n[3][1]]) + "thousand " : "", r += 0 != n[4] ? (a[Number(n[4])] || t[n[4][0]] + " " + a[n[4][1]]) + "hundred " : "", r += 0 != n[5] ? ("" != r ? "and " : "") + (a[Number(n[5])] || t[n[5][0]] + " " + a[n[5][1]]) + "only " : ""
    }
}

function NumberToWordsUSA(e) {
    if (0 === e) return "zero";
    var d = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"],
        h = ["", "", "twenty", "thirty", "fourty", "fifty", "sixty", "seventy", "eighty", "ninety"],
        b = ["", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion", "octillion", "nonillion"];

    function m(e) {
        return ("000" + e).substr(-3)
    }

    function p(e) {
        return e.substr(0, e.length - 3)
    }
    return function e(a, t, r, i) {
        return "000" == r && 0 === i.length ? a : e((n = a, s = r[0], c = r[1], u = r[2], o = ("0" == s ? "" : d[s] + " hundred ") + ("0" == u ? h[c] : h[c] && h[c] + "-" || "") + (d[c + u] || d[u]), l = b[t], o ? o + (l && " " + l || "") + " " + n : n), ++t, m(i), p(i));
        var n, o, l, s, c, u
    }("", 0, m(String(e)), p(String(e)))
}

function convertNumberToWords() {
    var e = $("#input").val(),
        a = $("#nwcountry").val(),
        t = e.split(".");
    2 < t.length ? $("#output").val("Invalid Number") : "i" == a ? 1 == t.length ? $("#output").val(NumberToWordsIndia(e).toUpperCase()) : $("#output").val(NumberToWordsIndia(t[0]).toUpperCase() + " POINT " + NumberToWordsIndia(t[1]).toUpperCase()) : (e = 1 == t.length ? NumberToWordsUSA(e) : NumberToWordsUSA(t[0]) + " POINT " + NumberToWordsUSA(t[1]), "u" == a ? $("#output").val(e.toUpperCase()) : "b" == a ? $("#output").val(convertUSAtoBritish(e).toUpperCase()) : "e" == a && $("#output").val(convertUSAtoEuro(e).toUpperCase()))
}

function convertUSAtoBritish(e) {
    return e = (e = (e = (e = (e = (e = (e = (e = e.replace(/billion/g, "thousand million (milliard)")).replace(/trillion/g, "billion")).replace(/quadrillion/g, "thousand billion (billiard)")).replace(/quintillion/g, "trillion")).replace(/sextillion/g, "thousand trillion (trilliard)")).replace(/septillion/g, "quadrillion")).replace(/octillion/g, "thousand quadrillion (quadrilliard)")).replace(/nonillion/g, "quintillion")
}

function convertUSAtoEuro(e) {
    return e = (e = (e = (e = (e = (e = (e = (e = e.replace(/billion/g, "thousand million")).replace(/trillion/g, "billion")).replace(/quadrillion/g, "thousand billion")).replace(/quintillion/g, "trillion")).replace(/sextillion/g, "thousand trillion")).replace(/septillion/g, "quadrillion")).replace(/octillion/g, "thousand quadrillion")).replace(/nonillion/g, "quintillion")
}
$(document).ready(function () {
    var e = $("#viewName").val();
    $("#" + e).addClass("currentselected"), $("#" + e).hasClass("stringview-string") ? $(".stringview-number").hide() : $(".stringview-string").hide(), $("#numberConverterDiv").addClass("hide"), "all-number-converter" == e ? ($("#numberConverterDiv").removeClass("hide"), $("#stringFunctionDiv").hide()) : "number-to-word-converter" == e && $(".btn.btn-large.span3").hide(), null != $("#radio").val() && $("#radio").buttonset(), $("input:radio[name=delimitedRadio]").click(function () {
        var e = $(this).attr("value");
        $("#delimitedTempBtn").val(e)
    }), manageControlV(), $(".editorCounterSection").addClass("hide"), $("#input").bind("input propertychange", function () {
        savetoLocalStorage(this.value)
    })
});
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (e) {
        var a, t, r, i, n, o, l, s = "",
            c = 0;
        for (e = Base64._utf8_encode(e) ; c < e.length;) i = (a = e.charCodeAt(c++)) >> 2, n = (3 & a) << 4 | (t = e.charCodeAt(c++)) >> 4, o = (15 & t) << 2 | (r = e.charCodeAt(c++)) >> 6, l = 63 & r, isNaN(t) ? o = l = 64 : isNaN(r) && (l = 64), s = s + this._keyStr.charAt(i) + this._keyStr.charAt(n) + this._keyStr.charAt(o) + this._keyStr.charAt(l);
        return s
    },
    decode: function (e) {
        var a, t, r, i, n, o, l = "",
            s = 0;
        for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "") ; s < e.length;) a = this._keyStr.indexOf(e.charAt(s++)) << 2 | (i = this._keyStr.indexOf(e.charAt(s++))) >> 4, t = (15 & i) << 4 | (n = this._keyStr.indexOf(e.charAt(s++))) >> 2, r = (3 & n) << 6 | (o = this._keyStr.indexOf(e.charAt(s++))), l += String.fromCharCode(a), 64 != n && (l += String.fromCharCode(t)), 64 != o && (l += String.fromCharCode(r));
        return l = Base64._utf8_decode(l)
    },
    _utf8_encode: function (e) {
        e = e.replace(/\r\n/g, "\n");
        for (var a = "", t = 0; t < e.length; t++) {
            var r = e.charCodeAt(t);
            r < 128 ? a += String.fromCharCode(r) : (127 < r && r < 2048 ? a += String.fromCharCode(r >> 6 | 192) : (a += String.fromCharCode(r >> 12 | 224), a += String.fromCharCode(r >> 6 & 63 | 128)), a += String.fromCharCode(63 & r | 128))
        }
        return a
    },
    _utf8_decode: function (e) {
        for (var a = "", t = 0, r = c1 = c2 = 0; t < e.length;) (r = e.charCodeAt(t)) < 128 ? (a += String.fromCharCode(r), t++) : 191 < r && r < 224 ? (c2 = e.charCodeAt(t + 1), a += String.fromCharCode((31 & r) << 6 | 63 & c2), t += 2) : (c2 = e.charCodeAt(t + 1), c3 = e.charCodeAt(t + 2), a += String.fromCharCode((15 & r) << 12 | (63 & c2) << 6 | 63 & c3), t += 3);
        return a
    }
};

function encodeBase64() {
    $("#output").val(Base64.encode($("#input").val()))
}

function cleartext() {
    $("#input").val(""), $("#output").val("")
}

function decodeBase64() {
    $("#output").val(Base64.decode($("#input").val()))
}

function convertCase(e) {
    var a = $("#input").val();
    0 != a.trim().length && ("title" == e ? $("#output").val(a.toProperCase()) : "upper" == e ? $("#output").val(a.toUpperCase()) : "lower" == e ? $("#output").val(a.toLowerCase()) : "sentence" == e && $("#output").val(sentenceCase(a)))
}

function sentenceCase(e) {
    for (var a = e.split("."), t = "", r = 0; r < a.length; r++) t = t + "." + a[r].substr(0, 2).toUpperCase() + a[r].substr(2);
    return t.substr(1)
}

function delimitedTextExtract() {
    var e = $("#input").val();
    if (0 != e.trim().length) {
        var a = e.trim().split("\n"),
            r = $("#columnNo").val(),
            i = $("#delimited").val(),
            n = $("input[name=delimitedRadio]:checked").val(),
            o = "";
        if (!(0 != parseInt(r) && 0 < r.trim().length)) return openErrorDialog("Column number must be a positive number starting from 1"), !1;
        $.each(a, function (e, a) {
            var t = a.trim().split(i);
            return -1 == a.indexOf(i) ? (openErrorDialog("The specified text does not contain the delimiter"), !1) : r > t.length ? (openErrorDialog("Please specify valid column"), !1) : ("Extract" == n ? o += t[r - 1] : (t.splice(r - 1, 1), o += t.join(" ")), void (o += "\n"))
        }), $("#output").val(o)
    }
}
String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (e) {
        return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase()
    })
};
for (var defaultDiacriticsRemovalap = [{
    base: "A",
    letters: "AⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯ"
}, {
    base: "AA",
    letters: "Ꜳ"
}, {
    base: "AE",
    letters: "ÆǼǢ"
}, {
    base: "AO",
    letters: "Ꜵ"
}, {
    base: "AU",
    letters: "Ꜷ"
}, {
    base: "AV",
    letters: "ꜸꜺ"
}, {
    base: "AY",
    letters: "Ꜽ"
}, {
    base: "B",
    letters: "BⒷＢḂḄḆɃƂƁ"
}, {
    base: "C",
    letters: "CⒸＣĆĈĊČÇḈƇȻꜾ"
}, {
    base: "D",
    letters: "DⒹＤḊĎḌḐḒḎĐƋƊƉꝹ"
}, {
    base: "DZ",
    letters: "ǱǄ"
}, {
    base: "Dz",
    letters: "ǲǅ"
}, {
    base: "E",
    letters: "EⒺＥÈÉÊỀẾỄỂẼĒḔḖĔĖËẺĚȄȆẸỆȨḜĘḘḚƐƎ"
}, {
    base: "F",
    letters: "FⒻＦḞƑꝻ"
}, {
    base: "G",
    letters: "GⒼＧǴĜḠĞĠǦĢǤƓꞠꝽꝾ"
}, {
    base: "H",
    letters: "HⒽＨĤḢḦȞḤḨḪĦⱧⱵꞍ"
}, {
    base: "I",
    letters: "IⒾＩÌÍÎĨĪĬİÏḮỈǏȈȊỊĮḬƗ"
}, {
    base: "J",
    letters: "JⒿＪĴɈ"
}, {
    base: "K",
    letters: "KⓀＫḰǨḲĶḴƘⱩꝀꝂꝄꞢ"
}, {
    base: "L",
    letters: "LⓁＬĿĹĽḶḸĻḼḺŁȽⱢⱠꝈꝆꞀ"
}, {
    base: "LJ",
    letters: "Ǉ"
}, {
    base: "Lj",
    letters: "ǈ"
}, {
    base: "M",
    letters: "MⓂＭḾṀṂⱮƜ"
}, {
    base: "N",
    letters: "NⓃＮǸŃÑṄŇṆŅṊṈȠƝꞐꞤ"
}, {
    base: "NJ",
    letters: "Ǌ"
}, {
    base: "Nj",
    letters: "ǋ"
}, {
    base: "O",
    letters: "OⓄＯÒÓÔỒỐỖỔÕṌȬṎŌṐṒŎȮȰÖȪỎŐǑȌȎƠỜỚỠỞỢỌỘǪǬØǾƆƟꝊꝌ"
}, {
    base: "OI",
    letters: "Ƣ"
}, {
    base: "OO",
    letters: "Ꝏ"
}, {
    base: "OU",
    letters: "Ȣ"
}, {
    base: "OE",
    letters: "Œ"
}, {
    base: "oe",
    letters: "œ"
}, {
    base: "P",
    letters: "PⓅＰṔṖƤⱣꝐꝒꝔ"
}, {
    base: "Q",
    letters: "QⓆＱꝖꝘɊ"
}, {
    base: "R",
    letters: "RⓇＲŔṘŘȐȒṚṜŖṞɌⱤꝚꞦꞂ"
}, {
    base: "S",
    letters: "SⓈＳẞŚṤŜṠŠṦṢṨȘŞⱾꞨꞄ"
}, {
    base: "T",
    letters: "TⓉＴṪŤṬȚŢṰṮŦƬƮȾꞆ"
}, {
    base: "TZ",
    letters: "Ꜩ"
}, {
    base: "U",
    letters: "UⓊＵÙÚÛŨṸŪṺŬÜǛǗǕǙỦŮŰǓȔȖƯỪỨỮỬỰỤṲŲṶṴɄ"
}, {
    base: "V",
    letters: "VⓋＶṼṾƲꝞɅ"
}, {
    base: "VY",
    letters: "Ꝡ"
}, {
    base: "W",
    letters: "WⓌＷẀẂŴẆẄẈⱲ"
}, {
    base: "X",
    letters: "XⓍＸẊẌ"
}, {
    base: "Y",
    letters: "YⓎＹỲÝŶỸȲẎŸỶỴƳɎỾ"
}, {
    base: "Z",
    letters: "ZⓏＺŹẐŻŽẒẔƵȤⱿⱫꝢ"
}, {
    base: "a",
    letters: "aⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐ"
}, {
    base: "aa",
    letters: "ꜳ"
}, {
    base: "ae",
    letters: "æǽǣ"
}, {
    base: "ao",
    letters: "ꜵ"
}, {
    base: "au",
    letters: "ꜷ"
}, {
    base: "av",
    letters: "ꜹꜻ"
}, {
    base: "ay",
    letters: "ꜽ"
}, {
    base: "b",
    letters: "bⓑｂḃḅḇƀƃɓ"
}, {
    base: "c",
    letters: "cⓒｃćĉċčçḉƈȼꜿↄ"
}, {
    base: "d",
    letters: "dⓓｄḋďḍḑḓḏđƌɖɗꝺ"
}, {
    base: "dz",
    letters: "ǳǆ"
}, {
    base: "e",
    letters: "eⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇɛǝ"
}, {
    base: "f",
    letters: "fⓕｆḟƒꝼ"
}, {
    base: "g",
    letters: "gⓖｇǵĝḡğġǧģǥɠꞡᵹꝿ"
}, {
    base: "h",
    letters: "hⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥ"
}, {
    base: "hv",
    letters: "ƕ"
}, {
    base: "i",
    letters: "iⓘｉìíîĩīĭïḯỉǐȉȋịįḭɨı"
}, {
    base: "j",
    letters: "jⓙｊĵǰɉ"
}, {
    base: "k",
    letters: "kⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ"
}, {
    base: "l",
    letters: "lⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇ"
}, {
    base: "lj",
    letters: "ǉ"
}, {
    base: "m",
    letters: "mⓜｍḿṁṃɱɯ"
}, {
    base: "n",
    letters: "nⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥ"
}, {
    base: "nj",
    letters: "ǌ"
}, {
    base: "o",
    letters: "oⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿɔꝋꝍɵ"
}, {
    base: "oi",
    letters: "ƣ"
}, {
    base: "ou",
    letters: "ȣ"
}, {
    base: "oo",
    letters: "ꝏ"
}, {
    base: "p",
    letters: "pⓟｐṕṗƥᵽꝑꝓꝕ"
}, {
    base: "q",
    letters: "qⓠｑɋꝗꝙ"
}, {
    base: "r",
    letters: "rⓡｒŕṙřȑȓṛṝŗṟɍɽꝛꞧꞃ"
}, {
    base: "s",
    letters: "sⓢｓßśṥŝṡšṧṣṩșşȿꞩꞅẛ"
}, {
    base: "t",
    letters: "tⓣｔṫẗťṭțţṱṯŧƭʈⱦꞇ"
}, {
    base: "tz",
    letters: "ꜩ"
}, {
    base: "u",
    letters: "uⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ"
}, {
    base: "v",
    letters: "vⓥｖṽṿʋꝟʌ"
}, {
    base: "vy",
    letters: "ꝡ"
}, {
    base: "w",
    letters: "wⓦｗẁẃŵẇẅẘẉⱳ"
}, {
    base: "x",
    letters: "xⓧｘẋẍ"
}, {
    base: "y",
    letters: "yⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ"
}, {
    base: "z",
    letters: "zⓩｚźẑżžẓẕƶȥɀⱬꝣ"
}], diacriticsMap = {}, i = 0; i < defaultDiacriticsRemovalap.length; i++)
    for (var letters = defaultDiacriticsRemovalap[i].letters, j = 0; j < letters.length; j++) diacriticsMap[letters[j]] = defaultDiacriticsRemovalap[i].base;

function removeAccents() {
    var e = $("#input").val();
    if (0 == e.trim().length) return !1;
    var a = e.replace(/[^\u0000-\u007E]/g, function (e) {
        return diacriticsMap[e] || e
    });
    $("#output").val(a)
}

function removeDuplicateLine() {
    var e = $("#input").val();
    if (0 != e.trim().length) {
        var a = e.split("\n"),
            t = [];
        $.each(a, function (e, a) {
            -1 === $.inArray(a, t) && t.push(a)
        }), $("#output").val(t.join("\n"))
    }
}

function removeEmptyLine() {
    var e = $("#input").val();
    if (0 != e.trim().length) {
        var a = e.split("\n"),
            t = [];
        $.each(a, function (e, a) {
            0 != a.trim().length && t.push(a)
        }), $("#output").val(t.join("\n"))
    }
}

function removeExtraSpace() {
    var e = $("#input").val();
    0 != e.trim().length && $("#output").val(e.replace(/\s+/g, " ").trim())
}

function removeLineBreaker() {
    var e = $("#input").val();
    0 != e.trim().length && $("#output").val(e.split("\n").join(""))
}

function removeLineContain() {
    var e = $("#input").val(),
        n = $("#contain").val();
    if (0 != e.trim().length) {
        var a = e.split("\n"),
            o = [];
        $.each(a, function (e, a) {
            if (0 != a.trim().length) {
                var t = a.trim().length,
                    r = 0;
                if ($("#isCaseSensitive").is(":checked")) {
                    var i = new RegExp("(" + n + ")", "gi");
                    r = a.trim().replace(i, "").length
                } else r = a.trim().replace(n, "").length;
                t == r && o.push(a)
            }
        }), $("#output").val(o.join("\n"))
    }
}

function sortLine() {
    var e = $("#input").val(),
        a = $("input[name=sortLineRadio]:checked").val(),
        t = !1;
    if ("Random" == a && (t = Math.floor(2 * Math.random() + 1)), 0 != e.trim().length) {
        var r = new Array;
        (r = e.split("\n")).sort(), "Alphabetically" == a || 1 == t ? $("#output").val(r.join("\n")) : "Reverse" != a && 2 != t || $("#output").val(r.reverse().join("\n"))
    }
}

function minifyText() {
    var e = $("#input").val();
    $("#output").val(""), 0 != e.trim().length && ($("#chbSpace").is(":checked") && (e = e.replace(/\s/g, "")), $("#chbTab").is(":checked") && (e = e.replace(/\t+/g, "")), $("#chbLine").is(":checked") && (e = e.split("\n").join("")), $("#output").val(e))
}

function textTorot13() {
    var e = $("#input").val();
    $("#output").val(""), 0 != e.trim().length && $("#output").val(e.rot13())
}

function rotTotext() {
    var e = $("#input").val();
    $("#output").val(""), 0 != e.trim().length && $("#output").val(e.rot13())
}

function calculateStringLength() {
    var e = $("#input").val();
    $("#output").html("Your string is <b>" + e.length + "</b> characters long.")
}

function generatePassword() {
    for (var e = $("#pgLength").val(), a = "abcdefghijklmnopqrstuvwxyz", t = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", r = "0123456789", i = "!@#$%^&*()_+~`|}{[]:;?><,./-=", n = "", o = n; n.length < e;) entity1 = Math.ceil(a.length * Math.random() * Math.random()), entity2 = Math.ceil(r.length * Math.random() * Math.random()), entity3 = Math.ceil(i.length * Math.random() * Math.random()), entity4 = Math.ceil(t.length * Math.random() * Math.random()), $("#chkl").is(":checked") && n.length < e && (n += a.charAt(entity1)), $("#chku").is(":checked") && n.length < e && (n += t.charAt(entity4)), $("#chkn").is(":checked") && n.length < e && (n += r.charAt(entity2)), $("#chksc").is(":checked") && n.length < e && (n += i.charAt(entity3)), o == n && (rand = Math.floor(4 * Math.random()) + 1, 1 == rand ? n += a.charAt(entity1) : 2 == rand ? n += t.charAt(entity4) : 3 == rand ? n += r.charAt(entity2) : 4 == rand && (n += i.charAt(entity3)), o = n);
    $("#output").html("Your Generated Password is  <b>" + n + "</b>")
}
String.prototype.rot13 = function () {
    return this.replace(/[a-zA-Z]/g, function (e) {
        return String.fromCharCode((e <= "Z" ? 90 : 122) >= (e = e.charCodeAt(0) + 13) ? e : e - 26)
    })
};
var wordList = ["abandon", "abandoned", "abattoir", "abducted", "abduction", "abilities", "ability", "abnormal", "abnormality", "abnormally", "abomination", "above", "aboveground", "abrasive", "absence", "absent", "absently", "absentness", "absolution", "absorb", "absorbable", "absorbing", "abstinence", "abstinent", "abstract", "abstractly", "absurd", "absurdities", "absurdity", "absurdly", "abuse", "abusive", "academic", "academy", "accepting", "accessories", "accident", "accidental", "accommodation", "accomplice", "accord", "accountable", "accuracy", "accursed", "ache", "acid", "acidic", "acoustic", "acrobat", "acrobatic", "action", "actor", "actress", "actuality", "acute", "adaptive", "addict", "addiction", "addictive", "address", "adequate", "adherence", "adhesive", "adjustable", "admiral", "admission", "adopter", "adoption", "adorable", "adornment", "adrenaline", "adsorbable", "adult", "advancement", "advantage", "adventure", "advertisement", "advisor", "advocate", "aerial", "aerobatic", "aerodynamic", "affair", "affliction", "affordable", "aficionado", "afraid", "after", "afterlife", "aftermath", "afternoon", "aftershock", "aftertaste", "afterwards", "afterworld", "again", "against", "age", "aged", "ageless", "agency", "agenda", "agent", "aggression", "aggressive", "agility", "agitator", "agonizing", "agony", "agreeable", "aim", "aimless", "air", "airport", "airship", "airspace", "airtight", "alarm", "alarming", "alcohol", "alcoholic", "alibi", "alien", "alienate", "align", "alignment", "allergenic", "alley", "alliance", "allied", "alligator", "allotment", "allow", "allowable", "almighty", "almond", "almost", "alphabet", "alphabetic", "alphabetical", "already", "also", "altercation", "alternate", "aluminium", "always", "amateur", "amazement", "amazing", "amazingly", "amber", "ambidextrous", "ambient", "ambiguous", "ambition", "ambitious", "ambivalent", "ambulance", "ambulatory", "ambush", "american", "americana", "ammonia", "ammunition", "amnesia", "amnesiac", "amoeba", "amoebic", "among", "amongst", "amoral", "amphibian", "amplitude", "amputate", "amputation", "amulet", "amuse", "amusement", "amusing", "analysis", "analyst", "analytical", "analyze", "anatomy", "ancestor", "anchovies", "androgynous", "angel", "anger", "angriest", "angry", "anguish", "animal", "animalistic", "animatronic", "ankh", "ankle", "annihilate", "annoying", "annual", "anonymous", "answer", "anteater", "antelope", "antelopes", "anticlimactic", "antidemocratic", "antique", "antiviral", "anxiety", "anxious", "any", "anybody", "anyone", "anyplace", "anything", "anytime", "anyways", "anywhere", "apartment", "ape", "apocalypse", "apocalyptic", "apology", "appalling", "apparatus", "apparent", "apparently", "apparition", "appeal", "appear", "appearance", "appetite", "applause", "apple", "application", "applied", "appointment", "approaching", "approximation", "apricot", "aquamarine", "aquarium", "aquatic", "arbitrary", "arcane", "arch", "archer", "architect", "archive", "area", "ark", "arm", "armchair", "armor", "arms", "army", "aroma", "arrival", "arrogant", "arrow", "arrows", "arson", "arsonist", "art", "artificial", "artist", "ash", "ashes", "assassin", "assassination", "assault", "assembly", "associate", "association", "astounding", "astronaut", "atmosphere", "atomic", "atonement", "atrocities", "atrocity", "attachment", "attack", "attacker", "attacking", "attempt", "attic", "attitude", "attribute", "auction", "audacity", "audience", "audio", "augmentation", "authentic", "authority", "automatic", "automatons", "autonomous", "autopilot", "autopsy", "auxiliary", "available", "avenging", "average", "aversion", "aviator", "avocado", "avoid", "awakening", "award", "awesome", "awesomeness", "awful", "awkward", "axe", "axiom", "axis", "babble", "babbling", "baboon", "baby", "babysitter", "bachelor", "back", "backbone", "background", "backward", "backyard", "bacon", "bacteria", "bad", "badge", "badger", "badlands", "badmouth", "baffling", "bag", "bags", "bait", "bake", "balance", "balcony", "bald", "ball", "ballerina", "ballet", "ballistic", "ballistics", "balloon", "ballroom", "baloney", "bamboo", "banana", "bananas", "bandsaw", "bang", "bank", "bankroll", "banquet", "baptism", "bar", "barbarian", "barbaric", "barbell", "barber", "barbershop", "barbwire", "bare", "bareknuckle", "barge", "bark", "barn", "barnacle", "barnburner", "barnyard", "baron", "barren", "barricade", "bars", "barter", "base", "baseline", "basement", "bases", "bash", "basic", "basin", "basket", "baster", "bastion", "bat", "batch", "battalion", "battery", "battle", "battleground", "bauble", "bawling", "bayonet", "bazooka", "beach", "beacon", "bead", "beads", "beak", "beam", "bean", "bear", "beard", "bearskin", "beast", "beastly", "beat", "beaten", "beautiful", "beauty", "beaver", "became", "because", "become", "becoming", "bed", "bedtime", "beefcake", "beehive", "beekeeper", "beeswax", "beggar", "begging", "begin", "beginner", "beginning", "behavior", "behead", "behind", "behold", "beholder", "being", "believable", "believe", "believer", "believing", "bell", "belly", "bellyache", "bellybutton", "bellyful", "belong", "belongings", "below", "belt", "bench", "bend", "beneath", "benefit", "benevolent", "bent", "berserk", "berserker", "best", "bestial", "bet", "betray", "betrayal", "better", "between", "bewitching", "beyond", "bible", "biblical", "big", "biggest", "bighead", "bigmouth", "bigwig", "bike", "bikini", "billion", "billionaire", "bin", "binding", "binge", "binocular", "biological", "biology", "bionic", "biplane", "bird", "birthday", "birthmark", "birthplace", "bit", "bite", "biter", "bitter", "bitterness", "bittersweet", "bizarre", "blabbermouth", "black", "blackheart", "blacklist", "blackmail", "blackness", "blackout", "blackwater", "bladder", "blade", "blame", "bland", "blank", "blankly", "blankness", "blast", "blasted", "blaster", "blasting", "blaze", "bleak", "bleakly", "bleakness", "bleed", "bleeder", "bleeding", "bleep", "blemish", "blend", "blended", "blender", "bless", "blessing", "blimp", "blind", "blindfold", "blinding", "blindly", "blindness", "blink", "blinking", "blinks", "blip", "bliss", "blissfully", "blister", "blizzard", "bloat", "blob", "block", "blockade", "blocker", "blockhead", "bloke", "blonde", "blood", "bloodlust", "bloodsport", "bloodstain", "bloodstream", "bloodsucker", "bloodthirsty", "bloody", "bloom", "blooper", "blossom", "blouse", "blow", "blowgun", "blowtorch", "blubber", "bludgeon", "blue", "blueberry", "blueprint", "bluff", "bluish", "blunder", "blunt", "bluntness", "blur", "blurb", "blurry", "blurt", "blush", "blushing", "bluster", "boa", "boar", "boarder", "boardinghouse", "boardroom", "boast", "bodies", "body", "bogeyman", "bold", "boldly", "bomb", "bombastic", "bomber", "bone", "bonus", "boom", "bootlegger", "booze", "border", "born", "bottle", "bottom", "bottomless", "boulevard", "bounce", "bouncy", "boundary", "boutique", "bovine", "bowyer", "box", "brain", "braincase", "brainwash", "brainwasher", "branch", "brand", "brass", "brave", "brawler", "breakable", "breakaway", "breakwater", "breath", "breathless", "bribery", "brick", "bridge", "brigade", "bright", "brightly", "brilliant", "brimstone", "bring", "bringer", "broken", "bronze", "brood", "brother", "brown", "brush", "brutal", "brutally", "brute", "brutish", "bubble", "bucket", "buffer", "buffet", "bug", "bughouse", "building", "bulging", "bull", "bulldog", "bulldozer", "bullet", "bulletin", "bullwhip", "bully", "bumble", "bump", "bumper", "bunny", "burden", "burglary", "burial", "buried", "burn", "burning", "burnt", "business", "butcher", "buzz", "bye", "cable", "cadaver", "cage", "calculation", "calendar", "calibration", "call", "calling", "camel", "candle", "candy", "candymaker", "cannibal", "cannibalism", "cannon", "canvas", "canyon", "capsule", "captain", "captive", "captivity", "capture", "captured", "caramel", "caravan", "carbon", "carcass", "carcinogenic", "cardinal", "caregiver", "careless", "caress", "cargo", "caribou", "carnal", "carnies", "carnival", "carnivore", "carnivorous", "carriage", "carrion", "carrot", "cartel", "carver", "case", "cashbox", "casino", "casket", "cast", "castle", "cat", "catch", "category", "caterpillar", "cathedral", "cattle", "cave", "cavity", "ceaseless", "celebration", "celebrity", "cell", "cellblock", "cellular", "cement", "centaur", "center", "central", "century", "ceramic", "ceremonial", "ceremony", "chain", "chair", "chalk", "challenge", "chamber", "chameleon", "champion", "channel", "chant", "chaos", "chaotic", "chapter", "chapterhouse", "charade", "chargeable", "charisma", "charismatic", "charm", "charming", "chart", "checkpoint", "cheerful", "chef", "chemical", "cherry", "chewable", "chicken", "chief", "chieftain", "child", "childish", "children", "chill", "chilly", "chisel", "choke", "choker", "choking", "cholera", "chop", "chops", "chromatic", "chromosome", "chronological", "chunk", "chunky", "church", "cinder", "cinnamon", "circle", "circling", "circuit", "circuitry", "circus", "citizen", "city", "civilization", "clairvoyant", "clam", "classic", "claw", "clay", "clean", "cleanup", "clear", "clever", "climax", "clinic", "clock", "closeup", "closing", "clot", "cloth", "cloud", "clover", "club", "clubfoot", "clubhouse", "cluster", "coal", "coast", "coastal", "coat", "cobra", "coconut", "cocoon", "coddle", "code", "coercion", "coffin", "cognitive", "coil", "coincidence", "coincidental", "cola", "cold", "collapsing", "collar", "collarbone", "collectable", "collection", "collide", "collider", "collision", "colonel", "colony", "color", "colors", "colt", "column", "coma", "comatose", "combat", "combatant", "combustible", "comet", "comfortable", "command", "commando", "commercial", "committee", "common", "communication", "communion", "compact", "companion", "company", "compartment", "compassionate", "compelling", "complete", "complicated", "composite", "compound", "compulsion", "compulsive", "computation", "computer", "comrade", "concave", "concept", "conceptual", "concert", "conclusion", "concrete", "concussion", "condemn", "condemned", "condition", "condo", "confidence", "confident", "confidential", "conflict", "confrontational", "confuse", "confused", "confusion", "connectedness", "connection", "connectivity", "conqueror", "conquest", "conscious", "conservative", "console", "conspiracy", "constant", "consultant", "consumer", "consumption", "contagious", "container", "contaminant", "contamination", "contempt", "content", "contest", "contestant", "continental", "continuous", "contortionist", "contractual", "contradiction", "contrast", "control", "controller", "controversial", "conversation", "conversion", "convertible", "convext", "convict", "convulsion", "copper", "cords", "corduroy", "corporation", "corpse", "correlation", "corrosion", "corrosive", "corruption", "cortex", "cosmetic", "cosmic", "cosmically", "cosmonaut", "costume", "costumed", "cotemporary", "cottage", "cotton", "couch", "cougar", "cough", "council", "country", "countryside", "couple", "courage", "courageous", "coward", "cows", "coyotes", "crab", "crabs", "crack", "crackdown", "crackpot", "cradle", "crafty", "cranberry", "crash", "crasher", "crater", "crawl", "crawler", "crawling", "crayon", "crazy", "creation", "creative", "creator", "creature", "credenza", "creep", "creeper", "creepy", "crew", "cricket", "crime", "criminal", "crimson", "crisis", "crisp", "crispy", "critical", "crocodile", "crook", "crooked", "crop", "crossfire", "crowd", "crown", "crucifier", "crucifix", "crucifixion", "crude", "cruel", "cruelty", "cruise", "crumply", "crunch", "crush", "crusher", "crushing", "crust", "crutch", "cry", "crypt", "cryptic", "crystal", "cube", "cuddle", "cuddly", "cultish", "cultural", "cunning", "curator", "curfew", "curiosities", "curious", "curse", "cursed", "curve", "curved", "cut", "cuteness", "cyanide", "cybernetic", "cyclical", "cyclops", "cynic", "cynical", "daddy", "daisies", "daisy", "damage", "damn", "damnation", "dancer", "dancing", "danger", "dangerous", "daredevil", "daring", "dark", "dart", "data", "daughter", "day", "daydream", "daydreamer", "daylight", "days", "daytime", "dazzling", "dead", "deadbeat", "deadly", "death", "deathly", "deathtrap", "debate", "debauchery", "debug", "decade", "decadence", "decadent", "decapitation", "decay", "deceit", "decent", "deception", "decipherer", "decode", "decoder", "decomposition", "decontamination", "deduction", "deep", "deepwater", "deer", "defect", "defection", "defector", "definitive", "deformer", "deformity", "degenerate", "degeneration", "degrader", "degrading", "delete", "deletion", "delicacy", "delicate", "delicatessen", "delicious", "delight", "deliverance", "democracy", "democratic", "demolishment", "demolition", "demon", "demonstration", "dense", "dent", "department", "dependent", "deplorable", "depression", "derelict", "describes", "description", "design", "desire", "desolate", "despair", "desperate", "despisable", "destiny", "destroy", "destruction", "destructive", "detachable", "details", "detainee", "determined", "detonator", "detox", "devastation", "develop", "devices", "devil", "devoid", "devour", "devout", "dexterity", "diabolatry", "diabolic", "diagonal", "dial", "diametric", "diamond", "diary", "dictator", "different", "difficult", "digital", "dignitary", "dilemma", "dimension", "dimensional", "diminished", "dinner", "dinosaur", "diplomacy", "diplomat", "diplomatic", "direct", "direction", "director", "dirt", "dirty", "disaster", "disbeliever", "disc", "discharge", "disciple", "discipline", "disclosure", "disconnect", "discontent", "discord", "discovery", "discussion", "disease", "disfigured", "disfigurement", "disgusting", "dishonest", "disintegration", "disk", "dislikable", "dismember", "dismemberment", "dismissal", "disobey", "disorientation", "dispatch", "disputed", "disrupt", "disrupter", "dissolve", "distancing", "distant", "distilery", "distinct", "distort", "distortion", "distribution", "district", "disturbance", "ditch", "diva", "diversion", "divine", "divinity", "division", "divorce", "dizzy", "doberman", "doctor", "document", "dog", "dogs", "dogtooth", "doll", "dolphin", "dolphins", "dome", "domesticated", "dominant", "domination", "domino", "donation", "donkey", "donut", "doom", "doomsday", "door", "dope", "dormant", "dosage", "dot", "double", "doubtless", "dove", "down", "downcast", "downfall", "downhill", "downriver", "downtown", "downward", "dozen", "dozens", "drag", "drain", "drama", "dramatic", "dread", "dream", "dreamer", "dreamland", "dreamless", "drench", "dress", "drift", "drifter", "drifting", "drill", "drimys", "drink", "drip", "drive", "driver", "drone", "drop", "droplet", "dropping", "droppings", "drops", "drown", "drowned", "drowsy", "drug", "drugstore", "drum", "drumbeat", "drunk", "drunken", "dry", "dual", "duck", "duel", "duke", "dumb", "dump", "duplicate", "dusk", "dust", "dynamic", "dynamite", "dynasty", "eagle", "ear", "early", "earthborn", "earthmen", "easier", "east", "eastern", "easy", "eat", "eating", "ebony", "echo", "edge", "edit", "eel", "eerie", "effective", "egg", "ego", "egocentric", "eigenvector", "eight", "elaborate", "elastic", "elbow", "electric", "electrode", "electron", "elegant", "element", "elephant", "elephants", "elevation", "elevator", "eliminate", "elimination", "elite", "elongation", "elsewhere", "embrace", "emerge", "emergency", "emotion", "emotional", "empathic", "emperor", "empire", "empirical", "empowerment", "empty", "encounter", "encrypt", "encryption", "end", "endless", "endorsement", "enemies", "enemy", "energy", "enforcer", "engine", "enjoy", "enlarge", "enlighten", "enormous", "enrage", "enter", "enterprise", "entertain", "entity", "entrance", "entropy", "envelope", "enzyme", "ephemeral", "episode", "equal", "equation", "equipment", "equivalent", "eraser", "erotic", "erotica", "error", "eruption", "escalator", "escape", "escapist", "esoteric", "essence", "essential", "establishment", "estate", "estimate", "eternal", "eternity", "ether", "ethical", "eunuch", "evacuate", "evacuation", "evaluate", "evectional", "even", "event", "eventual", "everlasting", "every", "everyday", "everyone", "evidence", "evil", "evoke", "evolution", "exact", "examiner", "excellent", "exception", "excess", "excessive", "exchange", "excitement", "exclusive", "excuse", "execute", "executioner", "executive", "exhibit", "exhibition", "exile", "existent", "existing", "exit", "exorcism", "expansion", "experiment", "expert", "explicit", "explosion", "export", "expose", "exposition", "expression", "expressive", "exquisite", "extensive", "external", "extortion", "extra", "extract", "extravagant", "extreme", "extremist", "eye", "eyes", "eyetooth", "fabric", "fabrication", "facade", "face", "faction", "factory", "factual", "fade", "fail", "faint", "fairytale", "faith", "faithless", "fake", "falcon", "fall", "falling", "fallout", "falls", "false", "family", "famous", "fanatic", "fanatical", "fancy", "fang", "fantastic", "farm", "fashion", "fashionable", "fast", "fat", "fatal", "fatality", "fate", "fathead", "father", "favor", "favorable", "fear", "fearless", "fearsome", "feast", "feather", "featherweight", "feature", "federal", "federation", "feed", "feel", "feeling", "feelings", "feet", "fellow", "felon", "felony", "felt", "femur", "fence", "ferment", "fermentation", "ferocious", "fertile", "fertility", "festival", "fetish", "feudal", "fever", "fiasco", "fibreglass", "fictional", "field", "fiend", "fiendish", "fierce", "fiery", "fight", "fighter", "fighting", "figurehead", "filament", "film", "filter", "filth", "filthy", "fin", "final", "finale", "financial", "finch", "find", "finger", "fingertip", "finish", "finishing", "finite", "fire", "firearm", "firecracker", "firm", "first", "firstborn", "fish", "fist", "fistfight", "five", "fix", "fizz", "flag", "flags", "flake", "flamboyant", "flamethrower", "flaming", "flammable", "flap", "flash", "flat", "flatness", "flatten", "flavor", "flavoring", "flaw", "flawless", "flesh", "flicker", "flight", "flimsy", "flinch", "flip", "flirt", "flirtation", "flood", "flophouse", "floppy", "floral", "flower", "flowers", "fluctuation", "fluent", "fluid", "flunk", "flush", "flutter", "flux", "fly", "flytrap", "foam", "focus", "fog", "foggy", "fold", "folding", "folk", "fool", "foot", "footwork", "forbidden", "force", "forearm", "foreign", "forest", "forger", "forgery", "forgiven", "forgotten", "fork", "forlornness", "form", "formal", "formula", "formulation", "fornicator", "fort", "fortress", "fortunate", "fortune", "fortuneteller", "forty", "fossil", "foul", "foundation", "founder", "fountain", "four", "fraction", "fracture", "fragile", "fragment", "frame", "frantic", "fraud", "fraudulent", "freak", "freakish", "freaky", "freckled", "free", "freedom", "freewill", "freeze", "freezing", "french", "frequency", "frequent", "fresh", "fried", "friend", "friendless", "fright", "frightening", "frigid", "fringe", "frisky", "frog", "frogs", "front", "frontier", "frost", "frozen", "frustration", "frying", "fuel", "fugitive", "fully", "fumbling", "functional", "fundamental", "funeral", "funnel", "furious", "furry", "fuse", "future", "futureless", "futuristic", "fuzz", "fuzzy", "gadget", "galactic", "gallery", "galloping", "gamble", "gambler", "game", "gang", "gangland", "gaping", "garage", "garden", "gargantuan", "gargoyle", "gasmask", "gate", "gateway", "gaunt", "gauntlet", "gazelle", "gear", "gems", "general", "generation", "genetic", "genuine", "geometric", "geometrical", "geometry", "germ", "gestural", "getaway", "ghetto", "ghost", "ghostly", "ghoul", "ghoulish", "giant", "gibberish", "gift", "gifted", "gigantic", "gimmick", "ginger", "giver", "giving", "glacial", "glacier", "gladness", "glamor", "glamorous", "gland", "glandular", "glass", "glider", "glimmer", "glitter", "glittery", "global", "gloomy", "glory", "glossy", "gloves", "glow", "glumly", "glutton", "gluttonous", "goat", "gobbling", "god", "godless", "godsent", "goggles", "going", "gold", "goldbricker", "goldfish", "gone", "good", "goodbye", "goofball", "goon", "gorgeous", "gorilla", "gossip", "governor", "grab", "grabbing", "graceful", "grade", "gradient", "graffiti", "grain", "grainy", "grand", "grandiose", "granite", "granularity", "grape", "graphic", "grappler", "grasp", "grasshopper", "grateful", "grave", "gravel", "graveyard", "gravitational", "gravy", "gray", "grease", "greasy", "great", "greatest", "greed", "greedy", "green", "grenade", "grey", "grid", "grieving", "grill", "grim", "grin", "grind", "grinder", "grinding", "grinning", "grip", "gripping", "grit", "gritty", "grizzly", "groan", "groaner", "groaning", "groove", "groovy", "gross", "grotesque", "ground", "grounds", "groundwave", "group", "growl", "grunting", "guaranteed", "guard", "guerilla", "guest", "guide", "guidebook", "guideline", "guild", "guillotine", "guilt", "guilty", "gulf", "gum", "gun", "gunk", "gunplay", "gunrunner", "guns", "gurgle", "gurgling", "guru", "gushing", "gutless", "guts", "gutsy", "gutter", "guzzling", "gymnast", "gymnastic", "habit", "habitual", "hack", "hacksaw", "hairless", "hairy", "half", "halfway", "halloween", "hallucination", "halting", "hammerhead", "hamster", "hand", "handlebars", "handler", "hands", "handsaw", "hangar", "hangman", "hangover", "happiness", "happy", "harbor", "hard", "harlot", "harm", "harmless", "harmonic", "harmony", "harness", "harplike", "harpoon", "harsh", "harvest", "hash", "hat", "hatch", "hatchet", "hate", "haunt", "haunting", "hawk", "haywire", "hazard", "hazy", "head", "headache", "headlock", "headphones", "headquarters", "headstrong", "heal", "healer", "healing", "healthy", "hear", "hearing", "hearse", "heart", "heartbeat", "heartbroken", "heartless", "hearts", "heartsick", "heat", "heater", "heating", "heatstroke", "heaven", "heavenly", "heaviest", "heaving", "heavy", "heavyhearted", "heavyset", "heavyweight", "hectic", "heelbone", "heist", "helicopter", "hell", "hellfire", "helmet", "help", "helpless", "hemlock", "herald", "herb", "herd", "heretic", "heretical", "heritage", "hermit", "hero", "heroes", "heroic", "hesitation", "hex", "hibernation", "hickory", "hidden", "hide", "hideaway", "hideous", "hideout", "high", "highway", "hill", "hills", "hinge", "hipbone", "hippo", "hirsute", "hiss", "historic", "history", "hit", "hitchhiker", "hive", "hoax", "hoaxer", "hobby", "hogtied", "hogwash", "hoist", "hold", "holding", "holdup", "holes", "holiday", "holiest", "hollow", "hollowness", "holy", "home", "homeland", "homeless", "homemade", "homesick", "hometown", "homewards", "homicidal", "homicide", "honest", "honesty", "honey", "honeybee", "honeydew", "honeymoon", "honeypot", "honor", "honorary", "hood", "hoodwink", "hoof", "hoofs", "hook", "hooligan", "hoop", "hoopla", "hooves", "hop", "hope", "hopeless", "hopper", "hopscotch", "horizon", "horizontal", "hormonal", "horn", "horoscope", "horrible", "horrific", "horror", "horrors", "horse", "horseback", "horseplay", "horsepower", "horseradish", "horses", "hose", "hospital", "host", "hostage", "hostility", "hot", "hotel", "hothead", "hotly", "hotter", "hottest", "hound", "hour", "house", "houseguest", "hover", "how", "however", "howling", "huffy", "hug", "huge", "human", "humanlike", "humanly", "humble", "humid", "humility", "humming", "hump", "hunchback", "hundred", "hunger", "hungry", "hunk", "hunt", "hunter", "hunting", "hurdle", "hush", "hustle", "hyaena", "hybrid", "hymn", "hype", "hypnotic", "ideal", "identical", "identity", "ignorant", "iguana", "illegal", "imaginary", "immunity", "implant", "imposter", "imprint", "improper", "impure", "indecent", "industrial", "industry", "infinite", "initial", "injury", "injustice", "ink", "inner", "innocent", "insane", "insanity", "insect", "insecure", "insurance", "internal", "intimate", "intoxicant", "intruder", "invader", "invention", "inverse", "invisible", "invitation", "iron", "islamism", "island", "ivory", "ivy", "jackknife", "jade", "jagged", "jar", "jerid", "jerk", "jewel", "jigsaw", "joypop", "joyride", "joystick", "judgment", "juice", "jump", "junior", "junk", "junkyard", "justice", "juvenile", "kangaroo", "key", "kick", "kidnapper", "kill", "killjoy", "kind", "king", "kingdom", "kissing", "kitten", "knot", "knowing", "knuckle", "knuckles", "lady", "ladybug", "land", "lands", "landscape", "lantern", "large", "largest", "laser", "lasso", "last", "lavender", "leaf", "leather", "left", "legend", "legendary", "legion", "lemon", "lethal", "level", "levitating", "liberal", "liberating", "liberation", "lick", "licker", "life", "light", "lightning", "lights", "lime", "limitless", "limousine", "linear", "link", "lion", "liqueur", "liquid", "liquor", "little", "live", "liver", "lizard", "lock", "lockbox", "locus", "locust", "logic", "logical", "lollipop", "loneliness", "lonely", "loner", "lonesome", "long", "loop", "loophole", "lord", "loser", "lottery", "love", "lovesick", "low", "loyal", "lubricant", "luck", "lucky", "lullaby", "luminous", "lump", "lurker", "lust", "lustre", "luxurious", "luxury", "machine", "mad", "magic", "magnet", "magnetic", "magnificent", "major", "marble", "marginal", "marsh", "martingale", "martini", "martyr", "mary", "mask", "massacre", "massive", "master", "maximum", "meat", "mechanical", "medicine", "medusa", "megacity", "melody", "melt", "memory", "menace", "mental", "messenger", "messiah", "metal", "metallic", "mightiest", "mighty", "military", "milky", "mind", "mindless", "minimal", "minipill", "mirror", "miserable", "misshapen", "missing", "mission", "mistaken", "mix", "mixer", "moan", "moaning", "mob", "mobster", "model", "modern", "mohawk", "moist", "molecular", "molten", "moment", "momentary", "monarchy", "money", "mongrel", "monkey", "monochrome", "mood", "moon", "moonbeam", "morbid", "more", "morsel", "mortal", "moth", "mother", "mountain", "mouth", "murder", "murderer", "murderous", "murky", "muscle", "muscleman", "muscular", "mushroom", "mustache", "mutagen", "mutant", "mutation", "mutilation", "muzzle", "mysterious", "mystery", "mystical", "mythical", "naive", "naked", "narcotic", "nasty", "national", "natural", "near", "nebula", "neck", "necrotic", "nectar", "needle", "negative", "neon", "nerve", "nervous", "neurotic", "new", "nice", "night", "nightfall", "nightmare", "nineteen", "nitro", "noble", "noir", "noise", "noisemaker", "nomad", "nomadic", "norm", "normal", "north", "northern", "nuclear", "nude", "number", "numbskull", "numeric", "nurse", "obey", "object", "observer", "obsession", "ocean", "octopus", "odd", "offender", "officer", "official", "old", "omnivore", "one", "open", "operatic", "opposition", "optimum", "optional", "orange", "orangutang", "orb", "orchard", "ordeal", "original", "ornamental", "orphan", "orphanage", "orthodox", "overt", "owl", "ox", "pagan", "pageant", "pain", "painkiller", "painless", "pale", "pandemic", "panic", "paper", "parachute", "parade", "paradise", "paradox", "parallel", "paralysed", "paralysis", "parasite", "parasitic", "parcel", "parrot", "passenger", "passion", "paste", "pastoral", "patient", "patrol", "pattern", "pavement", "peach", "pearl", "peepshow", "pelvic", "penguin", "peppermint", "perception", "percussive", "perfect", "perfection", "perfume", "perilous", "periodic", "perplexing", "personal", "pervert", "perverted", "pesky", "pessimist", "pest", "phantom", "pharaoh", "phase", "phenomena", "phenomenal", "philosophy", "phonetic", "phonograph", "photograph", "pick", "picnic", "pictorial", "piece", "pieces", "pig", "pigeon", "pigsticker", "pilgrim", "pill", "pillbox", "pilot", "pimp", "pin", "pinch", "pineapple", "pink", "pinwheel", "pipe", "pipes", "pistol", "pitch", "pity", "plaid", "planet", "planetary", "plant", "plantation", "plasma", "plastic", "play", "playground", "plaything", "playtime", "pleasant", "plush", "pneumatic", "pocket", "poet", "poetic", "poetry", "poison", "poisoner", "poisonous", "polar", "polite", "pony", "poor", "popular", "pork", "port", "portal", "portrait", "position", "positive", "possess", "possession", "potential", "pound", "pounding", "powder", "power", "powerful", "powerless", "practical", "pragmatic", "prank", "prayer", "predator", "predatory", "predict", "prediction", "prefab", "present", "preserve", "president", "pressure", "presumed", "pretend", "primate", "prime", "primitive", "prior", "private", "privilege", "privileged", "probe", "process", "production", "profile", "profound", "program", "project", "projection", "promise", "promised", "prong", "proof", "propaganda", "propellant", "propeller", "proper", "property", "prophesy", "prophet", "prophetic", "prophets", "proposal", "protect", "protection", "protest", "proud", "proven", "provider", "psycho", "public", "pull", "pulse", "punch", "puppet", "pure", "purple", "purpose", "push", "puzzle", "pyramids", "python", "quantum", "queen", "quick", "rabbit", "racket", "racoon", "rage", "raid", "rain", "rainfall", "ranch", "ransom", "rapid", "rare", "raspberry", "rassling", "raster", "rastle", "rastled", "rastling", "rat", "rattle", "raven", "raw", "ray", "really", "rear", "reason", "rebel", "recent", "reckless", "recluse", "record", "red", "refugee", "regional", "regret", "relearn", "release", "repeat", "reptile", "republic", "rerun", "research", "retreat", "revenge", "reversal", "reverse", "revolt", "rib", "rich", "riddle", "right", "rights", "ring", "riot", "ripe", "risky", "rival", "roast", "robber", "robbery", "robot", "robotic", "rodent", "room", "root", "rose", "rot", "rotten", "rough", "round", "royal", "royalty", "rubber", "ruby", "rude", "rum", "rust", "sabotage", "sacred", "sad", "sadistic", "sadness", "saint", "salt", "salty", "sand", "sanitary", "sauce", "savage", "sawdust", "scanner", "scar", "scenic", "scheme", "schemer", "scream", "screamer", "search", "section", "sector", "seducer", "seed", "selfish", "sentinel", "serenity", "series", "serpent", "serum", "servant", "settler", "setup", "seven", "several", "severe", "sewage", "sex", "sexiest", "sexless", "sexual", "shack", "shackle", "shadow", "shag", "shake", "shaman", "shameful", "shark", "sharp", "shine", "shipment", "shock", "shocking", "short", "shotgun", "show", "shrimp", "sick", "sideshow", "sideways", "signal", "silence", "silver", "simple", "sink", "siren", "sissy", "six", "skin", "skull", "sky", "skyline", "slap", "slave", "sleep", "slippery", "small", "smallpox", "smart", "smile", "smoke", "smooth", "smuggler", "smut", "snail", "snake", "social", "soft", "solid", "solitary", "some", "someone", "song", "sonic", "soon", "sorrow", "soul", "sound", "soup", "source", "south", "southern", "sparkle", "sparkler", "sparrow", "speed", "spell", "sphere", "spider", "spike", "spirit", "spirits", "sponge", "sprite", "sprites", "square", "stage", "stallion", "star", "starfish", "state", "station", "stealthy", "steel", "sticky", "stiff", "stone", "strange", "strong", "stun", "suave", "subsonic", "subway", "suckle", "sudden", "sugar", "sun", "sunrise", "super", "surgeon", "surgical", "surreal", "swamp", "swarm", "sweat", "sweet", "swindler", "switch", "swollen", "symbol", "symbolic", "system", "tactic", "tactical", "talk", "tank", "taste", "teargas", "teen", "teeth", "ten", "tense", "tenth", "terminus", "terrific", "terror", "thick", "thief", "thin", "thing", "things", "think", "threat", "thumb", "thunder", "tiger", "tight", "time", "timeless", "timid", "tin", "tiny", "tongue", "tooth", "top", "torch", "tornado", "torpedo", "total", "toy", "tragic", "trap", "trauma", "treason", "treasure", "tree", "treed", "tremor", "trial", "triangle", "true", "trust", "truth", "twelve", "twin", "twisted", "two", "tyrant", "ugly", "ultimate", "under", "undersea", "union", "unit", "unliving", "unsure", "uprising", "uptown", "urban", "useless", "vacant", "vampire", "vast", "vibrator", "victory", "village", "villain", "vinyl", "violence", "violent", "viper", "virgin", "virtual", "vision", "visitor", "vixen", "voice", "void", "volcanic", "volcano", "volume", "vulture", "wake", "wall", "war", "warm", "warmth", "warning", "warp", "warrior", "wartime", "wasp", "watch", "water", "waveform", "wax", "weak", "wealthy", "weapon", "wearable", "weasel", "web", "weed", "weird", "weirdo", "wept", "werewolf", "west", "western", "westwork", "wet", "whale", "whales", "whip", "whisper", "wife", "wig", "wild", "wilderness", "willow", "winter", "wire", "wisdom", "wise", "wish", "witch", "witness", "wizard", "wolf", "wolves", "wonder", "world", "worm", "wreck", "wreckage", "wrong", "young", "zebra", "zero", "zipper", "zombie", "zoo"];

function generateRandowmWords() {
    var e = $("#wordLength").val(),
        a = 1,
        t = "";
    $("#randomWordCopy").val("");
    for (var r = "<table class='display'><tr>"; a <= e;) r = r + "<td class = 'btn btn-large btn-info' style='margin-left=10px;'>" + (t = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase()) + "</td>", $("#randomWordCopy").val($("#randomWordCopy").val() + t + ","), a % 3 == 0 && (r += "</tr><tr>"), a++;
    r += "</tr><table>", $("#output").html(r), $("#randomWordCopyBtn").removeClass("hide")
}

function copyRandomWords() {
    copyToClipboard($("#randomWordCopy").val())
}

function generateNTLM() {
    var e = $("#input").val();
    if (0 != e.trim().length) {
        var a = e.split("").join("\0") + "\0";
        $("#output").html(md4(a).toUpperCase())
    }
}