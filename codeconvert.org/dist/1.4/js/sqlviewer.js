var viewname, editorAce, editorResult, mode, editor, converted = "",
    old = "",
    json = "";

function performShowHideToHtml(e) {
    null == e && (e = "editor"), $("#" + e).hasClass("hide") ? ($("#" + e).removeClass("hide"), $("#result1").addClass("hide"), $("#showHideBtn").val("Show Output"), "csv-to-html-converter" !== $("#viewName").val().toLowerCase() && "tsv-to-html-converter" !== $("#viewName").val().toLowerCase() && editorAce.setValue($("#excelToHtmlData").text())) : ($("#result1").removeClass("hide"), $("#" + e).addClass("hide"), $("#showHideBtn").val("Show HTML"))
}

function setToEditor(e) {
    
    editorAce.setValue(e), "sql-to-csv-converter" == viewname ? sqlTOcsv() : "sql-to-html-converter" == viewname ? sqlTOhtml() : "sql-to-json-converter" == viewname ? sqlTOjson() : "sql-to-xml-converter" == viewname ? sqlTOxml() : "sql-to-yaml-converter" == viewname ? sqlTOyaml() : "sqlformat" == viewname && FormatSQL()
}

function sqlTOcsv() {
    var e = editorAce.getValue();
    try {
        if (null != e && 0 != e.trim().length) {
            if (-1 == e.toLowerCase().search("create")) return editorResult.setValue("Missing CREATE STATEMENT"), !1;
            if (-1 == e.toLowerCase().search("select")) return editorResult.setValue("Missing SELECT STATEMENT"), !1;
            var r = (new SQL.Database).exec(e),
                o = "";
            $.each(r, function (e, t) {
                1 != r.length && (o += "TABLE " + (e + 1) + "\n", o += "-------\n"), o += t.columns.join() + "\n", $.each(t.values, function (e, t) {
                    o += t.join() + "\n"
                }), 1 != r.length && (o += "-------\n")
            }), editorResult.setValue(o), setOutputMsg("SQL TO CSV")
        }
    } catch (e) {
        editorResult.setValue(e.message)
    }
}

function sqlTOhtml() {
    var e = editorAce.getValue();
    try {
        if (null != e && 0 != e.trim().length) {
            if (-1 == e.toLowerCase().search("create")) return editorResult.setValue("Missing CREATE STATEMENT"), !1;
            if (-1 == e.toLowerCase().search("select")) return editorResult.setValue("Missing SELECT STATEMENT"), !1;
            var o = (new SQL.Database).exec(e),
                a = "<center>";
            $.each(o, function (e, t) {
                1 != o.length && (a += "============= TABLE-" + (e + 1) + " ============= "), a += "<table border = '1' class='display'><thead><tr>";
                for (var r = 0; r < t.columns.length; r++) a += "<th>" + t.columns[r] + "</th>";
                a += "</tr></thead><tbody>", $.each(t.values, function (e, t) {
                    a += "<tr>", $.each(t, function (e, t) {
                        a += "<td>" + t + "</td>"
                    }), a += "</tr>"
                }), 1 != o.length && (a += "</tbody></table><br>")
            }), a += "</center>", editorResult.setValue(a);
            var t = "<!DOCTYPE html><html>\n";
            t += "<head><meta charset='UTF-8'><title>SQL To HTML using codeconvert.org</title><script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script></head>\n", t += "<body>\n", t += a, t += "\n</body>\n", t += "</html>", $("#templTableDiv").text(vkbeautify.xml(t)), editorResult.setValue(vkbeautify.xml(t)), htmlOutput(), setOutputMsg("SQL TO HTML")
        }
    } catch (e) {
        editorResult.setValue(e.message)
    }
}

function htmlOutput() {
    $("#result1").show();
    var e = editorResult.getValue();
    if (0 < e.trim().length) {
        var t = document.getElementById("result1").contentWindow.document;
        old != e && (old = e, t.open(), t.write(old), t.close()), $("html, body").animate({
            scrollTop: 0
        }, 10)
    }
}

function sqlTOjson() {
    var e = editorAce.getValue();
    try {
        if (null != e && 0 != e.trim().length) {
            if (-1 == e.toLowerCase().search("create")) return openErrorDialog("Missing CREATE STATEMENT"), !1;
            if (-1 == e.toLowerCase().search("select")) return openErrorDialog("Missing SELECT STATEMENT"), !1;
            var t = (new SQL.Database).exec(e),
                s = "[";
            $.each(t, function (e, a) {
                $.each(a.values, function (e, r) {
                    var o = "{";
                    $.each(r, function (e, t) {
                        o += '"' + a.columns[e] + '"  :"' + t + '"', r.length != e + 1 && (o += ",")
                    }), o += "}", a.values.length != e + 1 && (o += ","), s += o
                }), t.length != e + 1 && (s += ",")
            }), s += "]", editor.set($.parseJSON(s)), $("#templTableDiv").text(s), setOutputMsg("SQL TO JSON")
        }
    } catch (e) {
        editor.set(e.message)
    }
}

function sqlTOxml() {
    var e = editorAce.getValue();
    try {
        if (null != e && 0 != e.trim().length) {
            if (-1 == e.toLowerCase().search("create")) return editorResult.setValue("Missing CREATE STATEMENT"), !1;
            if (-1 == e.toLowerCase().search("select")) return editorResult.setValue("Missing SELECT STATEMENT"), !1;
            var t = (new SQL.Database).exec(e),
                s = "[";
            $.each(t, function (e, a) {
                $.each(a.values, function (e, r) {
                    var o = "{";
                    $.each(r, function (e, t) {
                        o += '"' + a.columns[e] + '"  :"' + t + '"', r.length != e + 1 && (o += ",")
                    }), o += "}", a.values.length != e + 1 && (o += ","), s += o
                }), t.length != e + 1 && (s += ",")
            }), s += "]";
            var r, o = (new XML.ObjTree).writeXML(JSON.parse(s));
            o = decodeSpecialCharacter(o);
            try {
                r = $.parseXML(o)
            } catch (e) {
                r = !1
            }
            0 == r && (o = o.substr(0, 39) + "<root>" + o.substr(39) + "</root>"), editorResult.setValue(vkbeautify.xml(o)), setOutputMsg("SQL TO XML")
        }
    } catch (e) {
        editorResult.setValue(e.message)
    }
}

function sqlTOyaml() {
    var e = editorAce.getValue();
    try {
        if (null != e && 0 != e.trim().length) {
            if (-1 == e.toLowerCase().search("create")) return editorResult.setValue("Missing CREATE STATEMENT"), !1;
            if (-1 == e.toLowerCase().search("select")) return editorResult.setValue("Missing SELECT STATEMENT"), !1;
            var t = (new SQL.Database).exec(e),
                s = "[";
            $.each(t, function (e, a) {
                $.each(a.values, function (e, r) {
                    var o = "{";
                    $.each(r, function (e, t) {
                        o += '"' + a.columns[e] + '"  :"' + t + '"', r.length != e + 1 && (o += ",")
                    }), o += "}", a.values.length != e + 1 && (o += ","), s += o
                }), t.length != e + 1 && (s += ",")
            }), s += "]";
            try {
                e = json2yaml(s.trim()), editorResult.setValue(e)
            } catch (e) {
                var r = "";
                r = r + "Error : " + e.message, r = (r += "\n") + "Line : " + e.parsedLine + "  " + e.snippet, editorResult.setValue(r)
            }
            setOutputMsg("SQL TO YAML")
        }
    } catch (e) {
        editorResult.setValue(e.message)
    }
}

function FormatSQL() {
    editorResult.getSession().setUseWrapMode(!0);
    var e = editorAce.getValue();
    0 < e.trim().length && ($.ajax({
        url: 'readfile/UploadFile.aspx/formateQL',
        dataType: "json",
        data: '{"Data1":  ' + JSON.stringify(e) + '}',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        success: function (e) {
            try {
                editorResult.setValue(e.d)
            } catch (e) {
                openErrorDialog("Error..!")
            }
        },
        error: function (e, t, r) {
            openErrorDialog("Failed to load data=" + t)
        }
    }), setOutputMsg("Beautify SQL"))
}

function MinifySQL() {
    editorResult.getSession().setUseWrapMode(!0);
    var e = editorAce.getValue();
    0 < e.trim().length && ($.ajax({
        url: 'readfile/UploadFile.aspx/minifyQL',
        dataType: "json",
        data: '{"Data1":  ' + JSON.stringify(e) + '}',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        success: function (e) {
            try {
                editorResult.setValue(e.d)
            } catch (e) {
                openErrorDialog("invalid SQL")
            }
        },
        error: function (e, t, r) {
            openErrorDialog("Failed Minifining=" + t)
        }
    }), setOutputMsg("Minify SQL"))
}

function removeCommentsSQL() {
    editorResult.getSession().setUseWrapMode(!0);
    var e = editorAce.getValue();
    0 < e.trim().length && ($.ajax({
        type: "post",
        url: globalurl + "Ql/removeCommentsQL",
        dataType: "text",
        data: {
            data: e
        },
        success: function (e) {
            try {
                editorResult.setValue(e)
            } catch (e) {
                openErrorDialog("invalid SQL")
            }
        },
        error: function (e, t, r) {
            openErrorDialog("Failed Minifining=" + t)
        }
    }), setOutputMsg("SQL without comments"))
}
$(document).ready(function () {
    if ("sql-to-csv-converter" == (viewname = $("#viewName").val().trim())) setViewTitle("SQL TO CSV Converter", !0, !0), createEditor("sql", "text");
    else if ("sql-to-html-converter" == viewname) setViewTitle("SQL TO HTML Converter", !0, !0), createEditor("sql", "html");
    else if ("sql-to-json-converter" == viewname) {
        (mode = document.getElementById("mode")).onchange = function () {
            editor.setMode(mode.value), showJSON(!0)
        };
        var e = document.getElementById("jsoneditor"),
            t = {
                mode: mode.value,
                error: function (e) {
                    openErrorDialog(e.toString())
                }
            };
        editor = new JSONEditor(e, t, json), setViewTitle("SQL TO JSON Converter", !0, !0), createEditor("sql")
    } else "sql-to-xml-converter" == viewname ? (setViewTitle("SQL TO XML Converter", !0, !0), createEditor("sql", "xml")) : "sql-to-yaml-converter" == viewname ? (setViewTitle("SQL TO YAML Converter", !0, !0), createEditor("xml", "yaml")) : "sqlformat" == viewname && (setViewTitle("SQL Formatter", !0, !0), createEditor("sql", "sql"))
});