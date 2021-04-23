var editorAce, editorResult, viewname, converted = "";

function defaultAction() {
    $("#defaultaction").click()
}
$(document).ready(function () {
    "base64-to-json-converter" == (viewname = $("#viewName").val().trim()) ? (setViewTitle("Base64 TO JSON Converter", !0, !0), createEditor("text", "json")) : "json-to-base64-converter" == viewname ? (setViewTitle("JSON TO BASE64 Converter", !0, !0), createEditor("json", "text")) : "base64-to-xml-online-converter" == viewname ? (setViewTitle("BASE64 TO XML Converter", !0, !0), createEditor("text", "xml")) : "xml-to-base64-converter" == viewname ? (setViewTitle("XML TO BASE64 Converter", !0, !0), createEditor("xml", "text")) : "base64-to-yaml-converter" == viewname ? (setViewTitle("BASE64 TO YAML Converter", !0, !0), createEditor("text", "yaml")) : "yaml-to-base64-converter" == viewname ? (setViewTitle("YAML TO BASE64 Converter", !0, !0), createEditor("yaml", "text")) : "csv-to-base64-converter" == viewname ? (setViewTitle("CSV TO BASE64 Converter", !0, !0), createEditor("text", "text")) : "base64-to-csv-converter" == viewname ? (setViewTitle("BASE64 TO CSV Converter", !0, !0), createEditor("text", "text")) : "tsv-to-base64-converter" == viewname ? (setViewTitle("TSV TO BASE64 Converter", !0, !0), createEditor("text", "text")) : "base64-to-tsv-converter" == viewname ? (setViewTitle("BASE64 TO TSV Converter", !0, !0), createEditor("text", "text")) : "binary-to-base64-converter" == viewname ? (setViewTitle("BINARY TO BASE64 Converter", !0, !0), createEditor("text", "text")) : "base64-to-binary-converter" == viewname ? (setViewTitle("BASE64 TO BINARY Converter", !0, !0), createEditor("text", "text")) : "hex-to-base64-converter" == viewname ? (setViewTitle("Hexadecimal TO BASE64 Converter", !0, !0), createEditor("text", "text")) : "base64-to-hex-converter" == viewname ? (setViewTitle("BASE64 TO Hexadecimal Converter", !0, !0), createEditor("text", "text")) : "octal-to-base64-converter" == viewname ? (setViewTitle("Octal TO BASE64 Converter", !0, !0), createEditor("text", "text")) : "base64-to-octal-converter" == viewname ? (setViewTitle("BASE64 TO Octal Converter", !0, !0), createEditor("text", "text")) : "html-to-base64-converter" == viewname ? (setViewTitle("HTML TO BASE64 Converter", !0, !0), createEditor("text", "text")) : "base64-to-html-converter" == viewname ? (setViewTitle("BASE64 TO HTML Converter", !0, !0), createEditor("text", "text")) : "css-to-base64-converter" == viewname ? (setViewTitle("CSS TO BASE64 Converter", !0, !0), createEditor("text", "text")) : "base64-to-css-converter" == viewname ? (setViewTitle("BASE64 TO CSS Converter", !0, !0), createEditor("text", "text")) : "javascript-to-base64-converter" == viewname ? (setViewTitle("JAVASCRIPT TO BASE64 Converter", !0, !0), createEditor("text", "text")) : "base64-to-javascript-converter" == viewname && (setViewTitle("BASE64 TO JAVASCRIPT Converter", !0, !0), createEditor("text", "text"))
});
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (e) {
        var t, a, o, r, n, i, c, s = "",
            l = 0;
        for (e = Base64._utf8_encode(e) ; l < e.length;) r = (t = e.charCodeAt(l++)) >> 2, n = (3 & t) << 4 | (a = e.charCodeAt(l++)) >> 4, i = (15 & a) << 2 | (o = e.charCodeAt(l++)) >> 6, c = 63 & o, isNaN(a) ? i = c = 64 : isNaN(o) && (c = 64), s = s + this._keyStr.charAt(r) + this._keyStr.charAt(n) + this._keyStr.charAt(i) + this._keyStr.charAt(c);
        return s
    },
    decode: function (e) {
        var t, a, o, r, n, i, c = "",
            s = 0;
        for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "") ; s < e.length;) t = this._keyStr.indexOf(e.charAt(s++)) << 2 | (r = this._keyStr.indexOf(e.charAt(s++))) >> 4, a = (15 & r) << 4 | (n = this._keyStr.indexOf(e.charAt(s++))) >> 2, o = (3 & n) << 6 | (i = this._keyStr.indexOf(e.charAt(s++))), c += String.fromCharCode(t), 64 != n && (c += String.fromCharCode(a)), 64 != i && (c += String.fromCharCode(o));
        return c = Base64._utf8_decode(c)
    },
    _utf8_encode: function (e) {
        e = e.replace(/\r\n/g, "\n");
        for (var t = "", a = 0; a < e.length; a++) {
            var o = e.charCodeAt(a);
            o < 128 ? t += String.fromCharCode(o) : (127 < o && o < 2048 ? t += String.fromCharCode(o >> 6 | 192) : (t += String.fromCharCode(o >> 12 | 224), t += String.fromCharCode(o >> 6 & 63 | 128)), t += String.fromCharCode(63 & o | 128))
        }
        return t
    },
    _utf8_decode: function (e) {
        for (var t = "", a = 0, o = c1 = c2 = 0; a < e.length;) (o = e.charCodeAt(a)) < 128 ? (t += String.fromCharCode(o), a++) : 191 < o && o < 224 ? (c2 = e.charCodeAt(a + 1), t += String.fromCharCode((31 & o) << 6 | 63 & c2), a += 2) : (c2 = e.charCodeAt(a + 1), c3 = e.charCodeAt(a + 2), t += String.fromCharCode((15 & o) << 12 | (63 & c2) << 6 | 63 & c3), a += 3);
        return t
    }
};

function json2base64Convert() {
    var e = editorAce.getValue();
    editorResult.setValue(Base64.encode(e))
}

function xml2base64Convert() {
    var e = editorAce.getValue();
    editorResult.setValue(Base64.encode(e))
}

function yaml2base64Convert() {
    var e = editorAce.getValue();
    editorResult.setValue(Base64.encode(e))
}

function base64toJSONConvert() {
    var e = editorAce.getValue();
    editorResult.setValue(Base64.decode(e))
}

function base64toXMLConvert() {
    var e = editorAce.getValue();
    editorResult.setValue(Base64.decode(e))
}

function base64toYAMLConvert() {
    var e = editorAce.getValue();
    editorResult.setValue(Base64.decode(e))
}

function csv2base64Convert() {
    var e = editorAce.getValue();
    editorResult.setValue(Base64.encode(e))
}

function base64toCSVConvert() {
    var e = editorAce.getValue();
    editorResult.setValue(Base64.decode(e))
}

function tsv2base64Convert() {
    var e = editorAce.getValue();
    editorResult.setValue(Base64.encode(e))
}

function base64toTSVConvert() {
    var e = editorAce.getValue();
    editorResult.setValue(Base64.decode(e))
}

function binary2base64Convert() {
    var e = editorAce.getValue();
    editorResult.setValue(Base64.encode(e))
}

function base64toBinaryConvert() {
    var e = editorAce.getValue();
    editorResult.setValue(Base64.decode(e))
}

function hex2base64Convert() {
    var e = editorAce.getValue();
    editorResult.setValue(Base64.encode(e))
}

function base64tohexConvert() {
    var e = editorAce.getValue();
    editorResult.setValue(Base64.decode(e))
}

function octal2base64Convert() {
    var e = editorAce.getValue();
    editorResult.setValue(Base64.encode(e))
}

function base64toOctalConvert() {
    var e = editorAce.getValue();
    editorResult.setValue(Base64.decode(e))
}

function html2base64Convert() {
    var e = editorAce.getValue();
    editorResult.setValue(Base64.encode(e))
}

function base64toHtmlConvert() {
    var e = editorAce.getValue();
    editorResult.setValue(Base64.decode(e))
}

function css2base64Convert() {
    var e = editorAce.getValue();
    editorResult.setValue(Base64.encode(e))
}

function base64toCssConvert() {
    var e = editorAce.getValue();
    editorResult.setValue(Base64.decode(e))
}

function js2base64Convert() {
    var e = editorAce.getValue();
    editorResult.setValue(Base64.encode(e))
}

function base64toJsConvert() {
    var e = editorAce.getValue();
    editorResult.setValue(Base64.decode(e))
}

function validate(e) {
    return null == e || null == e || "" == e ? "" : e
}

function clearJSON() {
    editorAce.setValue(""), $("#hResult").hide()
}

function setToEditor(e) {
    "base64-to-yaml-converter" != viewname && "base64-to-binary-converter" != viewname && "base64-to-hex-converter" != viewname && "base64-to-csv-converter" != viewname && "base64-to-html-converter" != viewname && "base64-to-css-converter" != viewname && "json-to-base64-converter" != viewname && "xml-to-base64-converter" != viewname && "yaml-to-base64-converter" != viewname && "csv-to-base64-converter" != viewname && "tsv-to-base64-converter" != viewname && "binary-to-base64-converter" != viewname && "hex-to-base64-converter" != viewname && "octal-to-base64-converter" != viewname && "html-to-base64-converter" != viewname && "css-to-base64-converter" != viewname && "javascript-to-base64-converter" != viewname || editorAce.setValue(e)
}

function getJSONBase64Data() {
    editorAce.setValue("ewoJImVtcGxveWVlcyI6IHsKCQkiZW1wbG95ZWUiOiBbCgkJCXsKCQkJCSJpZCI6ICIxIiwKCQkJCSJmaXJzdE5hbWUiOiAiVG9tIiwKCQkJCSJsYXN0TmFtZSI6ICJDcnVpc2UiLAoJCQkJInBob3RvIjogImh0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy83MzU1MDk5NzU2NDkzNzgzMDUvQjgxSndMVDcuanBnIgoJCQl9LAoJCQl7CgkJCQkiaWQiOiAiMiIsCgkJCQkiZmlyc3ROYW1lIjogIk1hcmlhIiwKCQkJCSJsYXN0TmFtZSI6ICJTaGFyYXBvdmEiLAoJCQkJInBob3RvIjogImh0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy8zNDI0NTA5ODQ5L2JmYTFiOTEyMWFmYzM5ZDFkY2RiNTNjZmM0MjNiZjEyLmpwZWciCgkJCX0sCgkJCXsKCQkJCSJpZCI6ICIzIiwKCQkJCSJmaXJzdE5hbWUiOiAiSmFtZXMiLAoJCQkJImxhc3ROYW1lIjogIkJvbmQiLAoJCQkJInBob3RvIjogImh0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy82NjQ4ODY3MTg1NTkwNzYzNTIvTTAwY09McmguanBnIgoJCQl9CgkJXQoJfQp9"), base64toJSONConvert()
}

function getSampleData() {
    var e = $("#viewName").val().trim();
    "base64-to-json-converter" == e ? getJSONBase64Data() :
    "base64-to-xml-online-converter" == e ? getXMLBase64Data() :
    "json-to-base64-converter" == e ? getJsonSampleData() :
    "xml-to-base64-converter" == e ? getXMLSampleData() :
    "yaml-to-base64-converter" == e ? getYAMLSampleData() :
    "base64-to-yaml-converter" == e ? getYAMLBase64Data() :
    "csv-to-base64-converter" == e ? getCSVSampleData() :
    "base64-to-csv-converter" == e ? getCSVBase64Data() :
    "tsv-to-base64-converter" == e ? getTSVSampleData() :
    "base64-to-tsv-converter" == e ? getTSVBase64Data() :
    "binary-to-base64-converter" == e ? getBinarySampleData() :
    "base64-to-binary-converter" == e ? getBinaryBase64Data() :
    "hex-to-base64-converter" == e ? getHexSampleData() :
    "base64-to-hex-converter" == e ? getHexBase64Data() :
    "octal-to-base64-converter" == e ? getOctalSampleData() :
    "base64-to-octal-converter" == e ? getOctalBase64Data() :
    "html-to-base64-converter" == e ? getHtmlSampleData() :
    "base64-to-html-converter" == e ? getHtmlBase64Data() :
    "css-to-base64-converter" == e ? getCssSampleData() :
    "base64-to-css-converter" == e ? getCssBase64Data() :
    "javascript-to-base64-converter" == e ? getJSSampleData() :
    "base64-to-javascript-converter" == e && getJSBase64Data()
}

function getYAMLSampleData() {
    setToEditor("Director: \n  name: Spielberg\n  Movies:\n   - Movie: {title: E.T., year: 1975}\n   - Movie: {title: Jaws, year: 1982}")
}

function getXMLBase64Data() {
    editorAce.setValue("PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiID8+CjxlbXBsb3llZXM+Cgk8ZW1wbG95ZWU+CgkJPGlkPjE8L2lkPgoJCTxmaXJzdE5hbWU+VG9tPC9maXJzdE5hbWU+CgkJPGxhc3ROYW1lPkNydWlzZTwvbGFzdE5hbWU+CgkJPHBob3RvPmh0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy83MzU1MDk5NzU2NDkzNzgzMDUvQjgxSndMVDcuanBnPC9waG90bz4KCTwvZW1wbG95ZWU+Cgk8ZW1wbG95ZWU+CgkJPGlkPjI8L2lkPgoJCTxmaXJzdE5hbWU+TWFyaWE8L2ZpcnN0TmFtZT4KCQk8bGFzdE5hbWU+U2hhcmFwb3ZhPC9sYXN0TmFtZT4KCQk8cGhvdG8+aHR0cHM6Ly9wYnMudHdpbWcuY29tL3Byb2ZpbGVfaW1hZ2VzLzM0MjQ1MDk4NDkvYmZhMWI5MTIxYWZjMzlkMWRjZGI1M2NmYzQyM2JmMTIuanBlZzwvcGhvdG8+Cgk8L2VtcGxveWVlPgoJPGVtcGxveWVlPgoJCTxpZD4zPC9pZD4KCQk8Zmlyc3ROYW1lPkphbWVzPC9maXJzdE5hbWU+CgkJPGxhc3ROYW1lPkJvbmQ8L2xhc3ROYW1lPgoJCTxwaG90bz5odHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvNjY0ODg2NzE4NTU5MDc2MzUyL00wMGNPTHJoLmpwZzwvcGhvdG8+Cgk8L2VtcGxveWVlPgo8L2VtcGxveWVlcz4K"), base64toXMLConvert()
}

function getYAMLBase64Data() {
    editorAce.setValue("RGlyZWN0b3I6IAogIG5hbWU6IFNwaWVsYmVyZwogIE1vdmllczoKICAgIC0gTW92aWU6IHt0aXRsZTogRS5ULiwgeWVhcjogMTk3NX0KICAgIC0gTW92aWU6IHt0aXRsZTogSmF3cywgeWVhcjogMTk4Mn0="), base64toYAMLConvert()
}

function getCSVSampleData() {
    setToEditor("EmployeeId,EmployeeName \n1,ABC \n2,XYZ \n3,PQR")
}

function getCSVBase64Data() {
    editorAce.setValue("RW1wbG95ZWVJZCxFbXBsb3llZU5hbWUgCjEsQUJDIAoyLFhZWiAKMyxQUVI="), base64toCSVConvert()
}

function getTSVSampleData() {
    setToEditor("EmployeeId\tEmployeeName \n1\tABC \n2\tXYZ \n3\tPQR")
}

function getTSVBase64Data() {
    editorAce.setValue("RW1wbG95ZWVJZAlFbXBsb3llZU5hbWUgCjEJQUJDIAoyCVhZWiAKMwlQUVI="), base64toTSVConvert()
}

function getBinarySampleData() {
    setToEditor("0101 0100 0110 1000 0110 0101")
}

function getBinaryBase64Data() {
    editorAce.setValue("MDEwMSAwMTAwIDAxMTAgMTAwMCAwMTEwIDAxMDE="), base64toTSVConvert()
}

function getHexSampleData() {
    setToEditor("54 68 65 20 71 75 69 63 6b 20")
}

function getHexBase64Data() {
    editorAce.setValue("NTQgNjggNjUgMjAgNzEgNzUgNjkgNjMgNmIgMjA="), base64tohexConvert()
}

function getOctalSampleData() {
    setToEditor("124  150 145 40 161 165 151 143 153 40 142 162")
}

function getOctalBase64Data() {
    editorAce.setValue("MTI0ICAxNTAgMTQ1IDQwIDE2MSAxNjUgMTUxIDE0MyAxNTMgNDAgMTQyIDE2Mg=="), base64toOctalConvert()
}

function getHtmlSampleData() {
    setToEditor("<html> \n<head>\n\t<title>Test</title> \n<script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script></head> \n<body> \n\t<h1>Hello</h1> \n</body>\n</html>")
}

function getHtmlBase64Data() {
    editorAce.setValue("PGh0bWw+IAo8aGVhZD4KCTx0aXRsZT5UZXN0PC90aXRsZT4gCjwvaGVhZD4gCjxib2R5PiAKCTxoMT5IZWxsbzwvaDE+IAo8L2JvZHk+CjwvaHRtbD4="), base64toOctalConvert()
}

function getCssSampleData() {
    setToEditor(".square{border:1px dotted;border-radius:5px;}")
}

function getCssBase64Data() {
    editorAce.setValue("LnNxdWFyZXtib3JkZXI6MXB4IGRvdHRlZDtib3JkZXItcmFkaXVzOjVweDt9"), base64toOctalConvert()
}

function getJSSampleData() {
    setToEditor("<script type='text/javascript'>function hellojs(){var s=document.getElementById(show);}<\/script>")
}

function getJSBase64Data() {
    editorAce.setValue("PHNjcmlwdCB0eXBlPSd0ZXh0L2phdmFzY3JpcHQnPmZ1bmN0aW9uIGhlbGxvanMoKXt2YXIgcz1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChzaG93KTt9PC9zY3JpcHQ+"), base64toOctalConvert()
}