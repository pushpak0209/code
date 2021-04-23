var globalurl = "/";

function fileDownloadCB(e, t) {
    "function" != typeof saveAs ? $.loadScript("https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js", function () {
        saveAs(e, t)
    }) : saveAs(e, t)
}

function loadJqueryUI(e, t) {

    var o = jQuery("<link>");
    o.attr({
        rel: "stylesheet",
        type: "text/css",
        href: "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css"
    }), $("head").append(o), $.loadScript("https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js", function () {
        e(t)
    })
}

function msieversion() {
    return !!(0 < window.navigator.userAgent.indexOf("MSIE ") || navigator.userAgent.match(/Trident.*rv\:11\./))
}

function showProgress() {
    $(".some_other_box").css({
        width: 0,
        display: "block"
    }), $(".some_other_box").animate({
        width: "90%",
        display: "block"
    }, 500)
}

function hideProgress() {
    $(".some_other_box").animate({
        width: "100%",
        display: "none"
    }, 500, function () {
        $(this).hide()
    })
}

function openFileBGS(o, i) {
    var fileReader = new FileReader();
    fileReader.onload = function () {
        var datass = fileReader.result;  // data <-- in this var you have the file data in Base64 format
        $.ajax({
            url: 'readfile/UploadFile.aspx/saveData',
            dataType: "json",
            data: '{"Data1":  ' + JSON.stringify(datass) + ',"FileType":"' + o + '","FileName":"' + $('#' + o).prop('files')[0].name + '" }',
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                t = $('#' + o).prop('files')[0].name;
                if ("excelToxml" == o) return excelTOXml(data.d), !1;
                if ("excelTojson" == o) return excelToJson(data.d), !1;
                if ("excelTohtml" == o || "wordTohtml" == o) return htmlOutput(data.d), !1;
                if ("F2" == o) return setFileName(2, t), setToEditor2(data.d), !1;
                "F1" == o && setFileName(1, t), setToEditor(data.d);
            },
            error: function (result) {
                alert(result.d);
            }
        });
    };
    fileReader.readAsDataURL($('#' + o).prop('files')[0]);


}
function openFile(o, i) {
    new AjaxUpload($("#" + o), {
        action: globalurl + "readfile/uploadFile",
        name: "userfile",
        onSubmit: function (e, t) {
            var o = t[0];
            if ("Excel" == i) {
                if (!o.trim().startsWith("xls")) return openErrorDialog("Selected file is not Excel File"), !1
            } else if ("Word" == i) {
                if (!o.trim().startsWith("doc")) return openErrorDialog("Selected file is not Word File"), !1
            } else {
                if ("any" != i && i != o && "txt" != o.trim()) return openErrorDialog("Selected file is not " + i + " and txt file"), !1;
                if ("any" == i && ("jpeg" == o || "png" == o || "jpg" == o || "gif" == o || "bmp" == o || "pdf" == o || "pptx" == o || "ppt" == o)) return openErrorDialog("Selected file is not supported"), !1
            }
            showProgress()
        },
        onComplete: function (e, t) {
            "error" != t ? readFile(t, o) : openErrorDialog("Error in Loading File."), hideProgress()
        }
    })
}

function readFile(t, o) {
    var e = "readfile/readFile";
    "excelTohtml" == o || "excelToxml" == o || "excelTojson" == o ? (e = "readfile/convertHTML", $("#fName").text(t)) : "wordTohtml" == o && (e = "readfile/WordToHTML", $("#fName").text(t)), $.ajax({
        type: "post",
        url: globalurl + e,
        data: {
            fileName: t,
            btnID: o
        },
        success: function (e) {
            if ("error" != e) {
                if ("excelToxml" == o) return excelTOXml(e), !1;
                if ("excelTojson" == o) return excelToJson(e), !1;
                if ("excelTohtml" == o || "wordTohtml" == o) return htmlOutput(e), !1;
                if ("F2" == o) return setFileName(2, t), setToEditor2(e), !1;
                "F1" == o && setFileName(1, t), setToEditor(e)
            } else openErrorDialog("Error in Loading File."), $("#fName").text("")
        },
        error: function (e, t, o) {
            openErrorDialog("Failed to load data=" + t), console.log(e), $("#fName").text("")
        }
    })
}

function getDataFromUrlId(e) {
    $.ajax({
        type: "post",
        url: globalurl + "service/getDataFromID",
        dataType: "text",
        data: {
            urlid: e
        },
        success: function (e) {
            setToEditor(e.trim()), $(".sharelinkurl").attr("st_url", window.location), $(".sharelinkurl").attr("st_title", $("#save_link_title").val())
        },
        error: function (e, t, o) {
            openErrorDialog("Failed to load data=" + t)
        }
    })
}

function clearEditorInput() {
    var e;
    if ($("#jsData").val(""), $("#cssData").val(""), $("#tData").val(""), void 0 !== editorAce && editorAce.setValue(""), void 0 !== editorResult ? editorResult.setValue("") : ($("#result1").html(""), $("#result").text("")), $("#result1").html(""), void 0 !== editor && void 0 !== editor.set && editor.set(), null != e) {
        var t = document.getElementById("result1").contentWindow.document;
        e = "", t.open(), t.write(""), t.close()
    }
    $("#outputMsg").html("Result")
}

function setOutputMsg(e) {
    $("#outputMsg").html("Result : " + e)
}

function openErrorDialog(e) {
    void 0 !== jQuery.ui ? $("<div></div>").appendTo("#openError").html("<div>" + e + "</h5></div>").dialog({
        modal: !0,
        title: "Message",
        zIndex: 1e4,
        autoOpen: !0,
        width: "400",
        resizable: !1,
        buttons: {
            Ok: function () {
                $(this).dialog("destroy")
            }
        }
    }) : loadJqueryUI(openErrorDialog, e)
}
$(document).ready(function () {
    $(".btn").addClass("span11"), $("textarea").on("change paste keyup", function () {
        updateCounter(this)
    }), $(".navtoggle").click(function () {
        $(".mainnav").toggle("slow"), $(".navtoggle").toggle("slow"), $(".navtoggleclose").toggle("slow"), $(".navbutton").toggle("slow")
    }), $(".navtoggleclose").click(function () {
        $(".mainnav").toggle("slow"), $(".navtoggle").toggle("slow"), $(".navbutton").toggle("slow"), $(".navtoggleclose").toggle("slow")
    }), (msieversion() || -1 < navigator.userAgent.toLowerCase().indexOf("firefox") || /Edge\/\d./i.test(navigator.userAgent)) && $(".cblogoimage").prepend('<img src="/img/codeconvert_logo.png" alt="Code Convert" />'), $(".close1").click(function () {
        $(".ui-dialog-content").dialog("destroy")
    }), $(".btn,.span11").on("click", function () {
        1 == fsr1 ? fullScreenRight() : 1 == fsr && fullScreenLeft()
    }), $("#more").click(function () {
        $("html, body").animate({
            scrollTop: $(".footer_container").offset().top
        }, 1e3)
    }), $("#back-top").hide(), $(function () {
        $(window).scroll(function () {
            100 < $(this).scrollTop() ? $("#back-top").fadeIn() : $("#back-top").fadeOut()
        }), $("#back-top a").click(function () {
            return $("body,html").animate({
                scrollTop: 0
            }, 800), !1
        })
    })
}), jQuery.loadScript = function (e, t) {
    $.ajaxSetup({
        cache: !0
    }), jQuery.ajax({
        url: e,
        dataType: "script",
        success: t,
        async: !0
    }), $.ajaxSetup({
        cache: !1
    })
}, $(document).ajaxSend(function (e, t, o) {
    "/service/check_url" != o.url && ("/service/wordcount" != o.url && "/service/saveKeywordHistory" != o.url ? showProgress() : $("#counterLoader").show())
}), $(document).ajaxComplete(function (e, t, o) {
    "/service/wordcount" != o.url ? (hideProgress(), $("#path").val("")) : $("#counterLoader").hide()
});
var fsr = 0;

function fullScreenLeft() {
    return $(".leftThum").hide(), $(".rightThum").hide(), fullScreenBoth(), $("html, body").animate({
        scrollTop: $("#mainLeftDiv").offset().top - 30
    }, 500), !1
}

function fullScreenBoth() {
    if (0 == fsr) fsr = 1, $("#fsimg").attr("title", "Small Screen"), $("#mainLeftDiv").addClass("mainDivLeft"), $("#editor").css({
        width: "100%"
    }), $("#buttonDiv").css({
        float: "right"
    }), void 0 !== editorResult && editorResult.getSession().setUseWrapMode(!1), $("#fs1img1").attr("title", "Small Screen"), $("#mainRightDiv").addClass("mainDivLeft"), $("#result").css({
        width: "100%"
    }), $("#mainRightDiv").css({
        float: "right"
    }), void 0 !== editorResult && editorResult.getSession().setUseWrapMode(!1), hideOtherArea(!0);
    else {
        if (fsr = 0, $("#fsimg").attr("title", "Full Screen"), $("#mainLeftDiv").removeClass("mainDivLeft"), $("#editor").css({
            width: "100%"
        }), $("#buttonDiv").css({
            float: "left"
        }), void 0 !== editorResult) {
            editorResult.getSession().setUseWrapMode(!0);
            var e = editorResult.getValue();
            editorResult.setValue(e)
        }
        $("#fs1img").attr("title", "Full Screen"), $("#mainRightDiv").removeClass("mainDivLeft"), $("#result").css({
            width: "100%"
        }), $("#mainRightDiv").css({
            float: "right"
        }), void 0 !== editorResult && editorResult.getSession().setUseWrapMode(!0), hideOtherArea(!1)
    }
    void 0 !== editorResult && editorResult.resize(), void 0 !== editorAce && editorAce.resize()
}

function hideOtherArea(e) {
    1 == e ? ($(".infoSection").hide(), $(".footerpart").hide(), $(".footerSection").hide(), $("#buttonDiv").hide(), $(".buttonSection").hide()) : ($(".infoSection").show(), $(".footerpart").show(), $(".footerSection").show(), $("#buttonDiv").show(), $(".buttonSection").show())
}
var fsr1 = 0;

function fullScreenRight() {
    return $(".leftThum").hide(), $(".rightThum").hide(), fullScreenBoth(), $("html, body").animate({
        scrollTop: $("#mainRightDiv").offset().top - 30
    }, 500), !1
}
var aefsr = 0;

function fullScreen() {
    0 == aefsr ? (aefsr = 1, $("#aefsimg").attr("title", "Small Screen"), $("#editorAll").removeClass("span10"), $("#editorAll").addClass("span12"), void 0 !== editorAce && editorResult.getSession().setUseWrapMode(!1), hideOtherArea(!0)) : (aefsr = 0, $("#aefsimg").attr("title", "Full Screen"), $("#editorAll").removeClass("span12"), $("#editorAll").addClass("span10"), void 0 !== editorAce && editorResult.getSession().setUseWrapMode(!0), hideOtherArea(!1)), void 0 !== editorResult && editorResult.resize(), void 0 !== editorAce && editorAce.resize()
}

function decodeSpecialCharacter(e) {
    return e.replace(/\&amp;/g, "&").replace(/\&gt;/g, ">").replace(/\&lt;/g, "<").replace(/\&quot;/g, '"')
}

function loadFromURL(t) {
    if (void 0 !== jQuery.ui) {
        $("#path").val("");
        var e = $("#sampleurl").val();
        e ? $("#loadUrlPathDiv a").click(function () {
            $("#path").val(e)
        }) : $("#sampleurlindialog").hide(), $("#loadUrlPathDiv").removeClass("hide"), $("#loadUrlPathDiv").dialog({
            modal: !0,
            title: "Enter Url",
            zIndex: 1e4,
            autoOpen: !0,
            width: "400",
            resizable: !1,
            buttons: {
                Load: function () {
                    var e = $("#path").val();
                    5 < e.trim().length && loadUrl(e, t), $(this).dialog("destroy"), $("#loadUrlPathDiv").addClass("hide")
                },
                Cancel: function (e, t) {
                    $("#openError").html(""), $(this).dialog("destroy"), $("#loadUrlPathDiv").addClass("hide")
                }
            }
        })
    } else loadJqueryUI(loadFromURL, t)
}

function loadUrl(t, o) {
    $.ajax({
        url: 'readfile/UploadFile.aspx/URLService',
        dataType: "json",
        data: '{"path":  "' + t + '"}',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            try {
                "RSS" == o && processRSS(data.d), setToEditor(data.d), updateTitleForURL("URL: " + t)
            } catch (e) {
                openErrorDialog("Invalid " + o + " Data Or Invalid " + o + " URL.")
            }
        },
        error: function (result) {
            openErrorDialog("Failed to load data=" + l)
        }
    })

    //$.ajax({
    //    type: "post",
    //    url: "//codeconvert.com/URLService",
    //    dataType: "text",
    //    data: {
    //        path: t
    //    },
    //    success: function (e) {
    //        try {
    //            "RSS" == o && processRSS(e), setToEditor(e), updateTitleForURL("URL: " + t)
    //        } catch (e) {
    //            openErrorDialog("Invalid " + o + " Data Or Invalid " + o + " URL.")
    //        }
    //    },
    //    error: function (e, t, o) {
    //        openErrorDialog("Failed to load data=" + t)
    //    }
    //})
}

function save(e, t) {
    var o = $("#save_link_title").val(),
        i = $("#save_link_description").val(),
        n = $("#save_link_tags").val().trim();
    if (o.toLowerCase().includes("href=") || i.toLowerCase().includes("href=") || n.toLowerCase().includes("href=")) alert("This data form doest not support URL input:");
    else if (o.toLowerCase().includes("crack") || i.toLowerCase().includes("crack") || n.toLowerCase().includes("crack")) alert("This data form doest not support this input, Please update the text and try again:");
    else {
        var r = $("#viewName").val().trim();
        "jsonvalidate" == r ? r = "jsonvalidator" : "xmlvalidate" == r && (r = "xmlvalidator"), $.ajax({
            url: "/service/save",
            dataType: "text",
            type: "post",
            data: {
                content: e,
                viewname: r,
                title: o,
                desc: i,
                tags: n
            },
            success: function (e) {
                var t = "https://" + location.host + "/" + r + "/" + e;
                t = t.replace(" ", ""), $("#subTitle").find("h4").remove(), $("#permalink").find("a").remove(), $("#subTitle").append("<h4 style='padding-left:10px'>" + o + "</h4>"), $("#permalink").append("<a href=" + t + " style='float:left;width:100%;'>" + t + "</a>"), $(".sharelinkurl").attr("st_url", t), $(".sharelinkurl").attr("st_title", o), $("#permalink").parent().show()
            },
            error: function (e, t, o) {
                openErrorDialog("Error in data saving")
            }
        })
    }
}

function update(e, t) {
    $.ajax({
        url: "/service/update",
        dataType: "text",
        type: "post",
        data: {
            id: $("#edit_link_id").val(),
            content: e,
            viewname: $("#viewName").val().trim(),
            title: $("#save_link_title").val(),
            desc: $("#save_link_description").val(),
            tags: $("#save_link_tags").val().trim(),
            urlid: $("#fContent").val()
        },
        success: function (e) {
            $("#subTitle").find("h4").remove(), $("#permalink").find("a").remove(), $("#subTitle").append("<h4 style='padding-left:10px'>" + $("#save_link_title").val() + "</h4>"), $("#permalink").append("<a href=" + location.href + ">" + location.href + "</a>"), $(".sharelinkurl").attr("st_url", location.href), $(".sharelinkurl").attr("st_title", $("#save_link_title").val()), $("#permalink").parent().show(), t && shareLink(location.href)
        },
        error: function (e, t, o) {
            openErrorDialog("Error in data updating")
        }
    })
}

function shareLink(e) {
    "google" == getProvider() ? window.location.href = "https://plus.google.com/share?url=" + e : window.location.href = "https://www.facebook.com/sharer/sharer.php?u=" + e
}

function openSavedialog(o) {
    if (void 0 !== jQuery.ui) {
        var t = $("#isLogin").val(),
            i = "";
        if ("cssvalidate" == $("#viewName").val().trim()) i = $("#cssData").val();
        else if ("jsvalidate" == $("#viewName").val().trim()) i = $("#jsData").val();
        else if ("wordcounter" == $("#viewName").val().trim()) i = $("#tData").val();
        else if ("alleditor" == $("#viewName").val().trim()) {
            if (null == editorAce.getValue() && 0 == editorAce.getValue().trim().length) return flag = !1;
            i = editorAce.getValue() + "|" + $("#editorLanguage").val()
        } else i = "undefined" != typeof JSONEditor ? editor.getText() : void 0 !== editorAce ? editorAce.getValue() : $("#input").val();
        null != i && "" != i && 0 < i.trim().length ? ($("#savedialog").removeClass("hide"), $("#savedialog").dialog({
            modal: !0,
            title: "Save Online / Download as File",
            zIndex: 1e4,
            autoOpen: !1,
            width: "30%",
            resizable: !1,
            buttons: {
                Download: function () {
                    downloadData(), $(this).dialog("destroy")
                },
                "Save Online": function () {
                    var e = $("#save_link_title").val();
                    null != e && 0 != e.trim().length ? ($("#savedialog").dialog("close"), $("#openError").html(""), "" == $("#edit_link_id").val() || "0" == $("#edit_link_id").val() ? (save(i, o), $(this).dialog("destroy")) : "1" == t ? ($("#savedialog").dialog("option", "disabled", !0), $("<div></div>").appendTo("#openError").html("<div>Do you want to save as new file..?</h5></div>").dialog({
                        modal: !0,
                        title: "Confirm",
                        zIndex: 1e4,
                        autoOpen: !0,
                        width: "30%",
                        resizable: !1,
                        buttons: {
                            Yes: function () {
                                $("#openError").html(""), save(i, o), $(this).dialog("destroy"), $("#savedialog").dialog("destroy")
                            },
                            No: function (e, t) {
                                $("#openError").html(""), update(i, o), $(this).dialog("destroy"), $("#savedialog").dialog("destroy"), $("#savedialog").removeClass("hide")
                            },
                            Close: function (e, t) {
                                $("#openError").html(""), $(this).dialog("destroy"), $("#savedialog").dialog("open")
                            }
                        }
                    })) : ($("#openError").html(""), save(i, o), $(this).dialog("destroy"))) : openErrorDialog("Please Enter Title")
                },
                Cancel: function (e, t) {
                    $("#openError").html(""), $(this).dialog("destroy"), $("#savedialog").addClass("hide")
                }
            }
        }), $("#savedialog").dialog("open")) : openErrorDialog("No Data in Input view")
    } else loadJqueryUI(openSavedialog, o)
}

function createEditor(e, t) {
    null != e && null != e && ((editorAce = ace.edit("editor")).getSession().setMode("ace/mode/" + e), editorAce.getSession().setUseWrapMode(!0), editorAce.on("change", function () {
        var e = editorAce.getValue(),
            t = e.trim().replace(/\s+/gi, " ").split(" ").length;
        $("#editor1TC").text(e.length), $("#editor1TW").text(t);
        var o = e.split(/\r\n|\r|\n/).length;
        $("#editor1TL").text(o);
        var i = countBytes(e);
        $("#editor1Size").text(formateByteCount(i)), "tableizer" == $("#viewName").val() && hideTableizer(), savetoLocalStorage(e)
    }), $(".editorCounterSection").show()), null != t && null != t && ((editorResult = ace.edit("result")).getSession().setMode("ace/mode/" + t), editorResult.getSession().setUseWrapMode(!0), editorResult.on("change", function () {
        var e = editorResult.getValue(),
            t = e.trim().replace(/\s+/gi, " ").split(" ").length;
        $("#editor2TC").text(e.length), $("#editor2TW").text(t);
        var o = e.split(/\r\n|\r|\n/).length;
        $("#editor2TL").text(o);
        var i = countBytes(e);
        $("#editor2Size").text(formateByteCount(i))
    }), $(".editorCounterSection").show())
}

function updateCounter(e) {
    var t = $(e).val(),
        o = t.trim().replace(/\s+/gi, " ").split(" ").length;
    $("#editor1TC").text(t.length), $("#editor1TW").text(o);
    var i = t.split(/\r\n|\r|\n/).length;
    $("#editor1TL").text(i);
    var n = countBytes(t);
    $("#editor1Size").text(formateByteCount(n)), $(".editorCounterSection").show()
}

function countBytes(e, t) {
    (t = t || {}).lineBreaks = t.lineBreaks || 1, t.ignoreWhitespace = t.ignoreWhitespace || !1;
    var o = e.length,
        i = o - e.replace(/[\u0100-\uFFFF]/g, "").length,
        n = o - e.replace(/(\r?\n|\r)/g, "").length;
    return t.ignoreWhitespace ? (e = e.replace(/(\r?\n|\r|\s+)/g, "")).length + i : o + i + Math.max(0, t.lineBreaks * (n - 1))
}

function formateByteCount(e) {
    for (var t = 0; 1024 < e;) e /= 1024, t++;
    return (e = Math.round(100 * e) / 100) + " " + (t = ["", "K", "M", "G", "T"][t]) + "B"
}

function setViewTitle(e, t, o) {
    null != t && 1 == t ? $("#moreMenu").show() : $("#moreMenu").hide(), null != o && 1 == o ? $("#savebtn").show() : $("#savebtn").hide()
}

function createFile(e, t) {
    var o = "";
    (null == t ? (void 0 !== editorResult && (o = editorResult.getValue()), 0 == o.trim().length && void 0 !== editor && (o = editor.getText()), 0 == o.trim().length && void 0 !== editorAce && (o = editorAce.getValue())) : (o = $("#" + t).text(), "html" == e && (o = vkbeautify.xml(o))), "converted" == e && (e = converted), 0 != o.trim().length) ? fileDownloadCB(new Blob(["" + o], {
        type: "text/plain;charset=utf-8"
    }), "codeconvert." + e) : openErrorDialog("Sorry Result is Empty")
}

function getJsonSampleData() {
    var e = '{"employees":{"employee":[{"id":"1","firstName":"Tom","lastName":"Cruise","photo":"https://pbs.twimg.com/profile_images/735509975649378305/B81JwLT7.jpg"},{"id":"2","firstName":"Maria","lastName":"Sharapova","photo":"https://pbs.twimg.com/profile_images/3424509849/bfa1b9121afc39d1dcdb53cfc423bf12.jpeg"},{"id":"3","firstName":"James","lastName":"Bond","photo":"https://pbs.twimg.com/profile_images/664886718559076352/M00cOLrh.jpg"}]}}';
    setToEditor(e = JSON.stringify($.parseJSON(e), null, 2)), defaultAction(), $(".sharelinkurl").attr("st_url", window.location), $(".sharelinkurl").attr("st_title", $("#save_link_title").val())
}

function getXMLSampleData(e) {
    var t = '<?xml version="1.0" encoding="UTF-8" ?>   <employees>         <employee>             <id>1</id>             <firstName>Leonardo</firstName>             <lastName>DiCaprio</lastName>             <photo>http://1.bp.blogspot.com/-zvS_6Q1IzR8/T5l6qvnRmcI/AAAAAAAABcc/HXO7HDEJKo0/s200/Leonardo+Dicaprio7.jpg</photo>         </employee>         <employee>             <id>2</id>             <firstName>Johnny</firstName>             <lastName>Depp</lastName>             <photo>http://4.bp.blogspot.com/_xR71w9-qx9E/SrAz--pu0MI/AAAAAAAAC38/2ZP28rVEFKc/s200/johnny-depp-pirates.jpg</photo>         </employee>         <employee>             <id>3</id>             <firstName>Hritik</firstName>             <lastName>Roshan</lastName>             <photo>http://thewallmachine.com/files/1411921557.jpg</photo>         </employee>    </employees>  ';
    if (null != e && e) return vkbeautify.xml(t);
    setToEditor(vkbeautify.xml(t)), $(".sharelinkurl").attr("st_url", window.location), $(".sharelinkurl").attr("st_title", $("#save_link_title").val())
}

function jsonTocsvbyjson(e, t, o) {
    var i;
    try {
        i = jsonToCsv(e, ",", !0, !1, !1)
    } catch (e) {
        return console.log(e), null != t && t ? openErrorDialog("Error in Convert :" + e) : editorResult.setValue("Error in Convert"), !1
    }
    if (null != t && t) return i;
    editorResult.setValue(i)
}

function csvToExcel(e, t, o, i) {
    arr = [], flag = !0;
    var n = t.toString().replace(/,/g, "\t"),
        r = "";
    if ($.each(e, function (e, t) {
            for (var o in t) r += t[o] + "\t";
            r += "\n"
    }), null != o && o) return console.log(n + "\n" + r), n + "\n" + r;
    editorResult.setValue(n + "\n" + r)
}

function jsonDataValidate(e) {
    try {
        $.parseJSON(e)
    } catch (e) {
        return console.log(e), !1
    }
    return !0
}

function updateProile() {
    var t = $("#profilename").val();
    if (null == t || 0 == t.trim().length) return openErrorDialog("Name is required. please enter name"), !1;
    $.ajax({
        url: "/service/updateProfile",
        dataType: "text",
        type: "post",
        data: {
            name: t
        },
        success: function (e) {
            $("#usernamelable").text(t.substring(0, 5) + ".."), document.cookie = "loggedinuser=" + t, openErrorDialog("Your Profile updated successfully")
        }
    })
}

function savetoLocalStorage(e) {
    localStorage && ($("#viewName").val().toLowerCase().startsWith("excel") || localStorage.setItem($("#viewName").val(), e))
}

function setFromLocalStorage() {
    if (localStorage) {
        var e = localStorage.getItem($("#viewName").val());
        null != e && 0 != e.trim().length && "function" == typeof setToEditor && setToEditor(e)
    }
}

function toHTML(e, t, o) {
    var i = "";
    if (null == e ? (i = editorAce.getValue(), t = "csv") : i = e, 0 != i.trim().length) {
        var n = "",
            r = "<tr>",
            a = Papa.parse(i),
            s = a.data,
            l = s.slice(1, s.length);
        l.sort(function (e, t) {
            return t.length - e.length
        }), 0 == l.length && (l = a.data);
        for (var c = 0; c < l[0].length; c++) c < s[0].length ? r += "<th>" + s[0][c] + "</th>" : r += "<th>COLUMN" + (c + 1) + "</th>";
        r += "</tr>";
        for (var d = 1; d < s.length; d++) {
            n += "<tr>";
            for (c = 0; c < l[0].length; c++) c < s[d].length ? n += "<td>" + s[d][c] + "</td>" : n += "<td>&nbsp</td>";
            n += "</tr>"
        }
        var p = "<table border=1><thead>\n" + r + "</thead><tbody>\n" + n + "</tbody></table>";
        if (void 0 !== o && 1 == o) return p;
        htmlOutput(p, t)
    } else openErrorDialog("Sorry Input is Empty")
}

function loadNewView() {
    window.location.href = "/" + $("#viewName").val().trim()
}

function getSampleData() {
    var t = $("#viewName").val().trim();
    if ("jsonviewer" == t || "json-to-base64-converter" == t || "json-escape-unescape" == t || "jsontoxml" == t || "json-to-csv" == t || "online-json-editor" == t || "json-to-yaml" == t || "json-to-html-converter" == t || "json-to-tsv-converter" == t || "jsonminifier" == t || "json-to-java-converter" == t) getJsonSampleData();
    else if ("un-google-link" == t) setToEditor("https://www.google.co.in/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwjB7JO54LDJAhULV44KHQQYB1cQFggbMAA&url=http%3A%2F%2Fcodeconvert.org%2F&usg=AFQjCNG_DKhs4g3mbjzuEWxEa2aHGfqYgw&sig2=a54qV321O8wYGpJ2kbfCNg&bvm=bv.108194040,d.c2E");
    else if ("xmlviewer" == t || "xml-to-tsv-converter" == t || "online-xml-editor" == t || "xmltojson" == t || "xml-to-yaml" == t || "xml-to-csv-converter" == t || "xml-to-html-converter" == t || "xml-to-java-converter" == t) getXMLSampleData();
    else if ("text-to-html-converter" == t) setToEditor("The five-paragraph essay is a format of essay having five paragraphs: one introductory paragraph, three body paragraphs with support and development, and one concluding paragraph");
    else if ("sql-escape-unescape" == t) setToEditor("select * from table where value = 'in single quote '' is offensive'");
    else if ("word-to-html-converter" == t) setToEditor("<h1><span style='color: #ff0000;'><strong>Hello codeconvert</strong></span></h1>");
    else if ("json-diff" == t) loadJsonDiffSample();
    else if ("rssviewer" != t) $.ajax({
        url: "readfile/UploadFile.aspx/SampleData",
        dataType: "json",
        data: '{"viewname":  "' + t + '"}',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            e = data.d;
            e = e.trim(), "Xpath-Tester" == t ? $("#xmlString").val(e) : "base64-to-image-converter" == t ? ($("#base64string").val(e), setBase64ToImage()) : setToEditor(e)
        },
        error: function (result) {
            openErrorDialog("Failed to load data=" + t)
        }
    });
    else {
        $.ajax({
            url: 'readfile/UploadFile.aspx/URLService',
            dataType: "json",
            data: '{"path":  "http://rss.cnn.com/rss/edition_world.rss"}',
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                processRSS(data.d.trim());
                try {
                    editorAce.setValue(data.d), editorAce.getSession().setUseWrapMode(!0), FormatXML(), editorAce.clearSelection()
                } catch (e) {
                    openErrorDialog("invalid XML")
                }
            },
            error: function (result) {
                openErrorDialog("Failed to load data=" + l)
            }
        })

        //$.ajax({
        //    type: "post",
        //    url: "//codeconvert.com/URLService",
        //    dataType: "text",
        //    data: {
        //        path: "http://rss.cnn.com/rss/edition_world.rss"
        //    },
        //    success: function (e) {
        //        processRSS(e.trim());
        //        try {
        //            editorAce.setValue(e), editorAce.getSession().setUseWrapMode(!0), FormatXML(), editorAce.clearSelection()
        //        } catch (e) {
        //            openErrorDialog("invalid XML")
        //        }
        //    },
        //    error: function (e) {
        //        openErrorDialog("Failed to load data")
        //    }
        //})
    }
    $(".sharelinkurl").attr("st_url", window.location), $(".sharelinkurl").attr("st_title", $("#save_link_title").val())
}

function getCopyText() {
    var e = "";
    return e = editorResult.getValue(), $("#json").is(":visible") && (e = editor.getText()), e
}

function saveRecentlyUsed() {
    if (localStorage) {
        var e = localStorage.getItem("recentUSedStack");
        if (createRecentUsedLink(e = null == e || void 0 === e ? [] : JSON.parse(e)), checkRecentUsedNotUnique(e)) return !1;
        null != e && void 0 !== e && 10 <= e.length && e.shift();
        var t = {
            title: $("#subTitle").text(),
            view: $("#viewName").val()
        };
        e.push(t), localStorage.setItem("recentUSedStack", JSON.stringify(e))
    }
}

function checkRecentUsedNotUnique(e) {
    for (var t = 0; t < e.length; t++)
        if (e[t].view == $("#viewName").val()) return !0;
    return !1
}

function createRecentUsedLink(e) {
    var t = [];
    t.push("<h3>Recently Used Tools</h3>"), t.push("<ul>");
    for (var o = e.length - 1; 0 <= o; o--) {
        var i = e[o].title,
            n = e[o].view;
        null != i && 0 != i.trim().length || (i = n.toUpperCase()), t.push("<li><a href=/" + n + ">" + i + "</a></li>")
    }
    t.push("</ul>"), $("#relatedTools").append(t.join(""))
}

function setURLParameters() {
    $.urlParam = function (e) {
        var t = new RegExp("[?&]" + e + "=([^&#]*)").exec(window.location.href);
        return null == t ? null : decodeURI(t[1]) || 0
    }
}

function setDefaultData() {
    createFavouriteImg(), saveRecentlyUsed(), setURLParameters();
    var e = null;
    if (null == $.urlParam("url")) {
        var t = null;
        if (null == $.urlParam("input")) {
            if ($("#fContent").val()) var o = $("#fContent").val().trim();
            if ($("#inputvalue").val()) var i = $("#inputvalue").val().trim();
            if ($("#fTitle").val()) var n = $("#fTitle").val();
            if ($("#fValue").val()) var r = $("#fValue").val().trim();
            var a = $("#viewName").val().trim();
            null != i && 0 != i.trim().length ? setToEditor(i) : null != o && 0 != o.trim().length ? ("sampleData" == o ? getSampleData() : "screenfly" != a && "send-snap-message" != a && getDataFromUrlId(o), updateTitleForURL(n)) : null == r || 0 == r.length ? setFromLocalStorage() : FormatCSS_JS()
        } else null != (t = $.urlParam("input")) && 0 != t.length && (n = "Input Parameter", $("#subTitle").append("<h4 style='padding-left:10px'>" + n + "</h4>"), setToEditor(decodeURIComponent(t)))
    } else null != (e = $.urlParam("url")) && 0 != e.length && (n = "URL: " + e, $("#subTitle").append("<h4 style='padding-left:10px'>" + n + "</h4>"), loadUrl(e, a))
}

function updateTitleForURL(e) {
    $("#subTitle").find("h4").remove(), $("#subTitle").append("<h4 style='padding-left:10px'>" + e + "</h4>"), $("#plinkBtn").parent().append('<input type="button" value="New" class="btn btn-inverse span11" onclick="loadNewView()" style="width: 19% !important; padding: 6px;float:right;margin-right:2%">'), $("#plinkBtn").val("Fork"), $("#plinkBtn").parent().show()
}

function conditionalCode() {
    var e = $("#viewName").val().trim();
    void 0 !== editorAce && (editorAce.clearSelection(), editorAce.getSession().setUseWorker(!1)), void 0 !== editorResult && (editorResult.clearSelection(), editorResult.getSession().setUseWorker(!1)), $("#fs").text(""), $("#fs").html("<span id='fsimg' class='icon-enlarge2'></span>"), $("#fs").css({
        "margin-left": "5px"
    }), $("#fs1").text(""), $("#fs1").html("<span id='fs1img' class='icon-enlarge2'></span>"), $("#clearImg").html("<a href='#' id='sampleDataBtn' style='margin-right: 5px;' onclick='getSampleData()'>sample</a><b onclick='clearEditorInput()' style='color: red;'><span class='icon-bin'></span></b>"), $(".btn").addClass("span11"), $("#temp").removeClass("span11"), $("#clearImg").parent().append("<a href='#copy1' id='copy-dynamic1' style='float: right;  margin-right: 7px;' title='Copy'><span class='icon-copy'></span></a>"), $("#fs1").parent().append("<a href='#copy' id='copy-dynamic' style='float: right;  margin-right: 7px;' title='Copy'><span class='icon-copy'></span></a>"), $("#editor").css({
        "font-size": "small"
    }), $("#result").css({
        "font-size": "small"
    }), $("#result1").css({
        "font-size": "small"
    }), $(".stButton").css({
        display: "none!important"
    }), $("#me").val("Browse"), "alleditor" == e && ($("#plinkBtn").parent().append("<a href='#copy' id='copy-dynamic1' class='btn allEditorpermalinkButton btn-inverse'style='float: right;  margin-right: 2%;width:19%;position:relative;padding:6px;' title='copy to clipborad'>Copy</a>"), $("#savebtn").show()), "excel-to-html" != e && "lorem-ipsum" != e || ($("#sampleDataBtn").hide(), $("#savebtn").hide(), $("#permalinkDiv").hide()), "code" != e && "file-difference" != e && "encrypt-decrypt" != e && "credit-card-validate" != e && "image-to-base64-converter" != e && "date-time-calculater" != e && "credit-card-fake-number-generator" != e && "api-test" != e && ($("#copy-dynamic1").click(function () {
        copyToClipboard("word-to-html-converter" != e ? editorAce.getValue() : $("#wordInput").text())
    }), $("#copy-dynamic").click(function () {
        copyToClipboard(editorResult.getValue())
    }), $("#copy-dynamic2").click(function () {
        copyToClipboard($("#output").val())
    }))
}

function copyToClipboard(e) {
    var t = $("<textarea>");
    $("body").append(t), t.val(e).select(), document.execCommand("copy"), t.remove(), $("#copy-note-msg").html("Copied to Clipboard."), $("#copy-note-msg").removeClass("hide"), $("#copy-note-msg").fadeIn().delay(1e4).fadeOut()
}

function createFavouriteImg() {
    $("#favToolImg").remove();
    var e = $("#isFavTool").val(),
        t = $("<i>");
    t.attr("id", "favToolImg"), $(t).css("cursor", "pointer"), t.attr("aria-hidden", !0), "fav" == e ? (t.addClass("icon-star-full"), t.attr("title", "make it not favourite")) : (t.addClass("icon-star-empty"), t.attr("title", "make it favourite"), 0 == e.trim().length && $("#isFavTool").val("not-fav")), $(t).click(function () {
        $("#notloggedin").is(":visible") ? login() : saveMyfavourite()
    }), $("#subTitle").append(t)
}

function saveMyfavourite() {
    $.ajax({
        url: "/service/saveFavouriteTool",
        dataType: "text",
        type: "post",
        data: {
            view: $("#viewName").val(),
            title: $("#subTitle").text(),
            isFav: $("#isFavTool").val()
        },
        success: function (e) {
            var t = "This tool added to favourite.";
            $("#favToolImg").attr("src", "../img/icons/fav.png"), "fav" == $("#isFavTool").val() ? (t = "This tool remove from favourite.", $("#favToolImg").attr("src", "../img/icons/not-fav.png"), $("#isFavTool").val("not-fav")) : $("#isFavTool").val("fav"), $("#copy-note-msg").html(t), $("#copy-note-msg").removeClass("hide"), $("#copy-note-msg").fadeIn().delay(1e4).fadeOut()
        },
        error: function (e, t, o) {
            openErrorDialog("Failed to save favourite tool, Pls Try Again")
        }
    })
}

function isfavourite() {
    $.ajax({
        url: "/service/isFavouriteTool",
        dataType: "text",
        type: "post",
        data: {
            view: $("#viewName").val()
        },
        success: function (e) {
            $("#isFavTool").val(e), createFavouriteImg()
        },
        error: function (e, t, o) {
            console.log(e)
        }
    })
}
globalurl = "/";

function manageMenuAndSession() {
    var e = getCookie("loggedinuser"),
        t = getCookie("loggedinuserid");
    "" != e && "" != t ? ($("#usernamelable").text(e.substring(0, 5) + ".."), $("#notloggedin").hide(), $("#loggedin").show(), updateUserSession(t)) : $("#loggedin").hide()
}

function getCookie(e) {
    for (var t = e + "=", o = document.cookie.split(";"), i = 0; i < o.length; i++) {
        for (var n = o[i];
            " " == n.charAt(0) ;) n = n.substring(1);
        if (0 == n.indexOf(t)) return (t = n.substring(t.length, n.length)).replace(/\+/g, " ")
    }
    return ""
}

function updateUserSession(e) {
    $.ajax({
        type: "post",
        url: "/service/updateSession",
        data: {
            id: e
        },
        success: function (e) { }
    })
}

function logout() {
    document.cookie = "loggedinuser=; expires=Thu, 01 Jan 1970 00:00:00 UTC", null != getProvider() && hello(getProvider()).logout().then(function () { }, function (e) { }), $.ajax({
        url: "/service/logout",
        success: function (e) {
            window.location.href = "/codeconvert_redirect"
        }
    })
}

function toggleOpenClass() {
    document.getElementById("myDropdown").classList.toggle("show")
}
$(document).ready(function () {
    $(".close1").click(function () {
        $(".ui-dialog-content").dialog("destroy")
    }), $("#more").click(function () {
        $("html, body").animate({
            scrollTop: $(".footer_container").offset().top
        }, 1e3)
    }), $("#back-top").hide(), $(function () {
        $(window).scroll(function () {
            100 < $(this).scrollTop() ? $("#back-top").fadeIn() : $("#back-top").fadeOut()
        }), $("#back-top a").click(function () {
            return $("body,html").animate({
                scrollTop: 0
            }, 800), !1
        })
    }), manageMenuAndSession()
}), window.onclick = function (e) {
    if (!e.target.matches(".dropbtn")) {
        var t, o = document.getElementsByClassName("dropdown-content");
        for (t = 0; t < o.length; t++) {
            var i = o[t];
            i.classList.contains("show") && i.classList.remove("show")
        }
    }
},
    function () {
        var c = document,
            i = window;

        function d(e, t, o) {
            if (i.addEventListener) e.addEventListener(t, o, !1);
            else if (i.attachEvent) {
                e.attachEvent("on" + t, function () {
                    o.call(e, i.event)
                })
            }
        }
        var o, r = (o = c.createElement("div"), function (e) {
            o.innerHTML = e;
            var t = o.childNodes[0];
            return o.removeChild(t), t
        });

        function n(e, t) {
            var o;
            o = t, e.className.match(new RegExp("(\\s|^)" + o + "(\\s|$)")) || (e.className += " " + t)
        }

        function p(e, t) {
            var o = new RegExp("(\\s|^)" + t + "(\\s|$)");
            e.className = e.className.replace(o, " ")
        }
        if (document.documentElement.getBoundingClientRect) var u = function (e) {
            var t = e.getBoundingClientRect(),
                o = e.ownerDocument,
                i = o.body,
                n = o.documentElement,
                r = n.clientTop || i.clientTop || 0,
                a = n.clientLeft || i.clientLeft || 0,
                s = 1;
            if (i.getBoundingClientRect) {
                var l = i.getBoundingClientRect();
                s = (l.right - l.left) / i.clientWidth
            }
            return 1 < s && (a = r = 0), {
                top: t.top / s + (window.pageYOffset || n && n.scrollTop / s || i.scrollTop / s) - r,
                left: t.left / s + (window.pageXOffset || n && n.scrollLeft / s || i.scrollLeft / s) - a
            }
        };
        else u = function (e) {
            if (i.jQuery) return jQuery(e).offset();
            for (var t = 0, o = 0; t += e.offsetTop || 0, o += e.offsetLeft || 0, e = e.offsetParent;);
            return {
                left: o,
                top: t
            }
        };
        var e, a = (e = 0, function () {
            return "ValumsAjaxUpload" + e++
        });

        function l(e) {
            return e.replace(/.*(\/|\\)/, "")
        }

        function f(e) {
            return /[.]/.exec(e) ? /[^.]+$/.exec(e.toLowerCase()) : ""
        }
        Ajax_upload = AjaxUpload = function (e, t) {
            var o;
            if (e.jquery ? e = e[0] : "string" == typeof e && /^#.*/.test(e) && (e = e.slice(1)), "string" == typeof (o = e) && (o = c.getElementById(o)), e = o, this._input = null, this._button = e, this._disabled = !1, this._submitting = !1, this._justClicked = !1, this._parentDialog = c.body, window.jQuery && jQuery.ui && jQuery.ui.dialog) {
                var i = jQuery(this._button).parents(".ui-dialog");
                i.length && (this._parentDialog = i[0])
            }
            for (var n in this._settings = {
                action: "upload.php",
                name: "userfile",
                data: {},
                autoSubmit: !0,
                responseType: !1,
                onChange: function (e, t) { },
                onSubmit: function (e, t) { },
                onComplete: function (e, t) { }
            }, t) this._settings[n] = t[n];
            this._createInput(), this._rerouteClicks()
        }, AjaxUpload.prototype = {
            setData: function (e) {
                this._settings.data = e
            },
            disable: function () {
                this._disabled = !0
            },
            enable: function () {
                this._disabled = !1
            },
            destroy: function () {
                this._input && (this._input.parentNode && this._input.parentNode.removeChild(this._input), this._input = null)
            },
            _createInput: function () {
                var t = this,
                    e = c.createElement("input");
                e.setAttribute("type", "file"), e.setAttribute("name", this._settings.name);
                var o = {
                    position: "absolute",
                    margin: "-5px 0 0 -175px",
                    padding: 0,
                    width: "220px",
                    height: "30px",
                    fontSize: "14px",
                    opacity: 0,
                    cursor: "pointer",
                    display: "none",
                    zIndex: 2147483583
                };
                for (var i in o) e.style[i] = o[i];
                "0" !== e.style.opacity && (e.style.filter = "alpha(opacity=0)"), this._parentDialog.appendChild(e), d(e, "change", function () {
                    var e = l(this.value);
                    0 != t._settings.onChange.call(t, e, f(e)) && t._settings.autoSubmit && t.submit()
                }), d(e, "click", function () {
                    t.justClicked = !0, setTimeout(function () {
                        t.justClicked = !1
                    }, 1e3)
                }), this._input = e
            },
            _rerouteClicks: function () {
                var r, a = this,
                    s = {
                        top: 0,
                        left: 0
                    },
                    l = !1;
                d(a._button, "mouseover", function (e) {
                    var t, o, i, n;
                    a._input && !l && (l = !0, t = a._button, n = u(t), o = n.left, i = n.top, r = {
                        left: o,
                        right: o + t.offsetWidth,
                        top: i,
                        bottom: i + t.offsetHeight
                    }, a._parentDialog != c.body && (s = u(a._parentDialog)))
                }), d(document, "mousemove", function (e) {
                    var t = a._input;
                    if (t && l) {
                        if (a._disabled) return p(a._button, "hover"), void (t.style.display = "none");
                        var o = function (e) {
                            if (!e.pageX && e.clientX) {
                                var t = 1,
                                    o = document.body;
                                if (o.getBoundingClientRect) {
                                    var i = o.getBoundingClientRect();
                                    t = (i.right - i.left) / o.clientWidth
                                }
                                return {
                                    x: e.clientX / t + c.body.scrollLeft + c.documentElement.scrollLeft,
                                    y: e.clientY / t + c.body.scrollTop + c.documentElement.scrollTop
                                }
                            }
                            return {
                                x: e.pageX,
                                y: e.pageY
                            }
                        }(e);
                        o.x >= r.left && o.x <= r.right && o.y >= r.top && o.y <= r.bottom ? (t.style.top = o.y - s.top + "px", t.style.left = o.x - s.left + "px", t.style.display = "block", n(a._button, "hover")) : (l = !1, a.justClicked || (t.style.display = "none"), p(a._button, "hover"))
                    }
                })
            },
            _createIframe: function () {
                var e = a(),
                    t = r('<iframe src="javascript:false;" name="' + e + '" />');
                return t.id = e, t.style.display = "none", c.body.appendChild(t), t
            },
            submit: function () {
                var i = this,
                    n = this._settings;
                if ("" !== this._input.value) {
                    var r = l(this._input.value);
                    if (0 != n.onSubmit.call(this, r, f(r))) {
                        var a = this._createIframe(),
                            e = this._createForm(a);
                        e.appendChild(this._input), e.submit(), c.body.removeChild(e), e = null, this._input = null, this._createInput();
                        var s = !1;
                        d(a, "load", function (e) {
                            if ("javascript:'%3Chtml%3E%3C/html%3E';" != a.src && "javascript:'<html></html>';" != a.src) {
                                var t = a.contentDocument ? a.contentDocument : frames[a.id].document;
                                if (!(t.readyState && "complete" != t.readyState || t.body && "false" == t.body.innerHTML)) {
                                    if (t.XMLDocument) o = t.XMLDocument;
                                    else if (t.body) o = t.body.innerHTML, n.responseType && "json" == n.responseType.toLowerCase() && (t.body.firstChild && "PRE" == t.body.firstChild.nodeName.toUpperCase() && (o = t.body.firstChild.firstChild.nodeValue), o = o ? window.eval("(" + o + ")") : {});
                                    else var o = t;
                                    n.onComplete.call(i, r, o), s = !0, a.src = "javascript:'<html></html>';"
                                }
                            } else s && setTimeout(function () {
                                c.body.removeChild(a)
                            }, 0)
                        })
                    } else c.body.removeChild(this._input), this._input = null, this._createInput()
                }
            },
            _createForm: function (e) {
                var t = this._settings,
                    o = r('<form method="post" enctype="multipart/form-data"></form>');
                for (var i in o.style.display = "none", o.action = t.action, o.target = e.name, c.body.appendChild(o), t.data) {
                    var n = c.createElement("input");
                    n.type = "hidden", n.name = i, n.value = t.data[i], o.appendChild(n)
                }
                return o
            }
        }
    }(),
    function () {
        function h(e) {
            var t = "    ";
            if (isNaN(parseInt(e))) t = e;
            else switch (e = parseInt(e)) {
                case 1:
                    t = " ";
                    break;
                case 2:
                    t = "  ";
                    break;
                case 3:
                    t = "   ";
                    break;
                case 4:
                    t = "    ";
                    break;
                case 5:
                    t = "     ";
                    break;
                case 6:
                    t = "      ";
                    break;
                case 7:
                    t = "       ";
                    break;
                case 8:
                    t = "        ";
                    break;
                case 9:
                    t = "         ";
                    break;
                case 10:
                    t = "          ";
                    break;
                case 11:
                    t = "           ";
                    break;
                case 12:
                    t = "            "
            }
            var o = ["\n"];
            for (ix = 0; ix < 100; ix++) o.push(o[ix] + t);
            return o
        }

        function e() {
            this.step = "\t", this.shift = h(this.step)
        }
        e.prototype.xml = function (e, t) {
            var o = e.replace(/>\s{0,}</g, "><").replace(/</g, "~::~<").replace(/\s*xmlns\:/g, "~::~xmlns:").replace(/\s*xmlns\=/g, "~::~xmlns=").split("~::~"),
                i = o.length,
                n = !1,
                r = 0,
                a = "",
                s = 0,
                l = t ? h(t) : this.shift;
            for (s = 0; s < i; s++) -1 < o[s].search(/<!/) ? (a += l[r] + o[s], n = !0, (-1 < o[s].search(/-->/) || -1 < o[s].search(/\]>/) || -1 < o[s].search(/!DOCTYPE/)) && (n = !1)) : -1 < o[s].search(/-->/) || -1 < o[s].search(/\]>/) ? (a += o[s], n = !1) : /^<\w/.exec(o[s - 1]) && /^<\/\w/.exec(o[s]) && /^<[\w:\-\.\,]+/.exec(o[s - 1]) == /^<\/[\w:\-\.\,]+/.exec(o[s])[0].replace("/", "") ? (a += o[s], n || r--) : -1 < o[s].search(/<\w/) && -1 == o[s].search(/<\//) && -1 == o[s].search(/\/>/) ? a = a += n ? o[s] : l[r++] + o[s] : -1 < o[s].search(/<\w/) && -1 < o[s].search(/<\//) ? a = a += n ? o[s] : l[r] + o[s] : -1 < o[s].search(/<\//) ? a = a += n ? o[s] : l[--r] + o[s] : -1 < o[s].search(/\/>/) ? a = a += n ? o[s] : l[r] + o[s] : -1 < o[s].search(/<\?/) ? a += l[r] + o[s] : -1 < o[s].search(/xmlns\:/) || -1 < o[s].search(/xmlns\=/) ? a += l[r] + o[s] : a += o[s];
            return "\n" == a[0] ? a.slice(1) : a
        }, e.prototype.json = function (e, t) {
            t = t || this.step;
            return "undefined" == typeof JSON ? e : "string" == typeof e ? JSON.stringify(JSON.parse(e), null, t) : "object" == typeof e ? JSON.stringify(e, null, t) : e
        }, e.prototype.css = function (e, t) {
            var o = e.replace(/\s{1,}/g, " ").replace(/\{/g, "{~::~").replace(/\}/g, "~::~}~::~").replace(/\;/g, ";~::~").replace(/\/\*/g, "~::~/*").replace(/\*\//g, "*/~::~").replace(/~::~\s{0,}~::~/g, "~::~").split("~::~"),
                i = o.length,
                n = 0,
                r = "",
                a = 0,
                s = t ? h(t) : this.shift;
            for (a = 0; a < i; a++) /\{/.exec(o[a]) ? r += s[n++] + o[a] : /\}/.exec(o[a]) ? r += s[--n] + o[a] : (/\*\\/.exec(o[a]), r += s[n] + o[a]);
            return r.replace(/^\n{1,}/, "")
        }, e.prototype.sql = function (e, t) {
            var o, i, n, r = e.replace(/\s{1,}/g, " ").replace(/\'/gi, "~::~'").split("~::~"),
                a = r.length,
                s = [],
                l = 0,
                c = this.step,
                d = 0,
                p = "",
                u = 0,
                f = t ? h(t) : this.shift;
            for (u = 0; u < a; u++) s = u % 2 ? s.concat(r[u]) : s.concat((o = r[u], i = c, o.replace(/\s{1,}/g, " ").replace(/ AND /gi, "~::~" + i + i + "AND ").replace(/ BETWEEN /gi, "~::~" + i + "BETWEEN ").replace(/ CASE /gi, "~::~" + i + "CASE ").replace(/ ELSE /gi, "~::~" + i + "ELSE ").replace(/ END /gi, "~::~" + i + "END ").replace(/ FROM /gi, "~::~FROM ").replace(/ GROUP\s{1,}BY/gi, "~::~GROUP BY ").replace(/ HAVING /gi, "~::~HAVING ").replace(/ IN /gi, " IN ").replace(/ JOIN /gi, "~::~JOIN ").replace(/ CROSS~::~{1,}JOIN /gi, "~::~CROSS JOIN ").replace(/ INNER~::~{1,}JOIN /gi, "~::~INNER JOIN ").replace(/ LEFT~::~{1,}JOIN /gi, "~::~LEFT JOIN ").replace(/ RIGHT~::~{1,}JOIN /gi, "~::~RIGHT JOIN ").replace(/ ON /gi, "~::~" + i + "ON ").replace(/ OR /gi, "~::~" + i + i + "OR ").replace(/ ORDER\s{1,}BY/gi, "~::~ORDER BY ").replace(/ OVER /gi, "~::~" + i + "OVER ").replace(/\(\s{0,}SELECT /gi, "~::~(SELECT ").replace(/\)\s{0,}SELECT /gi, ")~::~SELECT ").replace(/ THEN /gi, " THEN~::~" + i).replace(/ UNION /gi, "~::~UNION~::~").replace(/ USING /gi, "~::~USING ").replace(/ WHEN /gi, "~::~" + i + "WHEN ").replace(/ WHERE /gi, "~::~WHERE ").replace(/ WITH /gi, "~::~WITH ").replace(/ ALL /gi, " ALL ").replace(/ AS /gi, " AS ").replace(/ ASC /gi, " ASC ").replace(/ DESC /gi, " DESC ").replace(/ DISTINCT /gi, " DISTINCT ").replace(/ EXISTS /gi, " EXISTS ").replace(/ NOT /gi, " NOT ").replace(/ NULL /gi, " NULL ").replace(/ LIKE /gi, " LIKE ").replace(/\s{0,}SELECT /gi, "SELECT ").replace(/\s{0,}UPDATE /gi, "UPDATE ").replace(/ SET /gi, " SET ").replace(/~::~{1,}/g, "~::~").split("~::~")));
            for (a = s.length, u = 0; u < a; u++) {
                n = s[u], d = d - (n.replace(/\(/g, "").length - n.replace(/\)/g, "").length), /\s{0,}\s{0,}SELECT\s{0,}/.exec(s[u]) && (s[u] = s[u].replace(/\,/g, ",\n" + c + c)), /\s{0,}\s{0,}SET\s{0,}/.exec(s[u]) && (s[u] = s[u].replace(/\,/g, ",\n" + c + c)), /\s{0,}\(\s{0,}SELECT\s{0,}/.exec(s[u]) ? p += f[++l] + s[u] : /\'/.exec(s[u]) ? (d < 1 && l && l--, p += s[u]) : (p += f[l] + s[u], d < 1 && l && l--)
            }
            return p = p.replace(/^\n{1,}/, "").replace(/\n{1,}/g, "\n")
        }, e.prototype.xmlmin = function (e, t) {
            return (t ? e : e.replace(/\<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)\>/g, "").replace(/[ \r\n\t]{1,}xmlns/g, " xmlns")).replace(/>\s{0,}</g, "><")
        }, e.prototype.jsonmin = function (e) {
            return "undefined" == typeof JSON ? e : JSON.stringify(JSON.parse(e), null, 0)
        }, e.prototype.cssmin = function (e, t) {
            return (t ? e : e.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//g, "")).replace(/\s{1,}/g, " ").replace(/\{\s{1,}/g, "{").replace(/\}\s{1,}/g, "}").replace(/\;\s{1,}/g, ";").replace(/\/\*\s{1,}/g, "/*").replace(/\*\/\s{1,}/g, "*/")
        }, e.prototype.sqlmin = function (e) {
            return e.replace(/\s{1,}/g, " ").replace(/\s{1,}\(/, "(").replace(/\s{1,}\)/, ")")
        }, window.vkbeautify = new e
    }(),
    function (p) {
        function u(e) {
            var i = [];
            return e.parents("li").addBack().each(function () {
                var e = p(this).children(".LIText").children(".node").text(),
                    t = e,
                    o = p(this).prevAll().filter(function () {
                        return p(this).children(".LIText").children(".node").text() == e
                    }).length + 1;
                1 < o && (t += "[" + o + "]"), i.push(t)
            }), i.join("/")
        }
        XMLTree = function (l, i) {
            XMLTree.prototype.postBuild = function () {
                if (l.subTreeBranches && (!0 === l.subTreeBranches ? this.tree.addClass("subTreeRequestsOnAllNodes") : this.tree.find(l.subTreeBranches).addClass("subTreeNode")), this.tree.delegate(".plusMin", "click", function (e) {
                        e.stopPropagation();
                        var t = p(this).parent().children("ul"),
                            o = t.filter(":hidden").length || !t.length ? "closed" : "open",
                            i = u(p(this).parent()),
                            n = p(this).parent();
                        if ("closed" == o ? t.show() : t.hide(), l.plusMinCallback && l.plusMinCallback(n, i, e, o), l.subTreeBranches && (!0 === l.subTreeBranches || p(this).parent().is(".subTreeNode")) && l.subTreeRequest && "closed" == o && !n.data("subTreeDataFetched")) {
                            var r = l.subTreeRequest(n, i, e, o);
                            if (r && "string" == typeof r) {
                                var a = new XMLTree(p.extend(l, {
                    fpath: r,
                    container: n
                }), !0);
                                a && (n.data("subTreeDataFetched", !0), a.show())
                }
                }
                        if (p(this).html("closed" == o ? "-" : "+").removeClass("expanded collapsed").addClass("closed" == o ? "expanded" : "collapsed"), !l.noURLTracking) {
                            var s = [];
                            d.tree.find("ul:visible").filter(function () {
                                return !p(this).find("ul:visible").length
                }).each(function () {
                                var e = [];
                                p(this).parents("li").each(function () {
                                    e.unshift(p(this).index())
                }), s.push(e.join(","))
                })
                }
                }), l.clickCallback && this.tree.delegate(".LIText", "click", function (e) {
                        var t = p(this).closest("li");
                        l.clickCallback(t, u(t), e)
                }), l.hideAttrs && !l.subTree && this.tree.addClass("hideAttrs"), l.hideNodeNames && !l.subTree && this.tree.addClass("hideNodeNames"), l.renderCallback && l.renderCallback(this.tree, this), e = new RegExp("#tree" + this.instanceID + ":([0-9,-|]+);").exec(location.hash)) {
                    var e = e[1].split("|");
                    for (var t in e) {
                        var o = e[t].split(","),
                            i = [];
                        for (var n in o) i.push("li:eq(" + o[n] + ") > ul");
                        this.tree.find(i.join(" > ")).parents("ul").addBack().show().each(function () {
                            p(this).parent().children(".plusMin").html("-")
                        })
                    }
                } else this.tree.find(".currSel").parentsUntil(".xmltree").show()
            };
            var t = /^https?:\/\/\S+$/;
            if (XMLTree.prototype.isUrl = function (e) {
                    return ("string" == typeof e || e instanceof String) && t.test(e)
            }, XMLTree.prototype.onOver = function (e) {
                    this.isUrl(p(e).text()) && p(e).tooltipster({
                content: "<img style='width:200px !important;height:200px !important;' src=" + p(e).text() + ">",
                position: "right",
                contentAsHTML: !0
            })
            }, XMLTree.prototype.delve = function (e) {
                    var t = e[0].tagName.replace(new RegExp("_" + c + "$", "i"), "").toLowerCase();
                    (this.delve_nextAppendTo ? this.delve_nextAppendTo : this.tree).append(a = p("<li>").addClass(t).append(LITxtHolder = p("<span>").addClass("LIText")).append(ul = p("<ul>"))), a.append(p("<span>", {
                html: l.startExpanded ? "-" : "+"
            }).addClass("plusMin collapsed"));
                    var o = e[0].attributes;
                    if (l.attrsAsClasses)
                        for (var i = 0; i < o.length; i++) (!0 === l.attrsAsClasses || "string" == typeof l.attrsAsClasses && l.attrsAsClasses == o[i].name || l.attrsAsClasses instanceof Array && -1 != p.inArray(o[i].name, l.attrsAsClasses)) && a.addClass(o[i].name + "-" + o[i].value + " " + o[i].name);
                    if (l.attrsAsData)
                        for (i = 0; i < o.length; i++) (!0 === l.attrsAsData || "string" == typeof l.attrsAsData && l.attrsAsData == o[i].name || l.attrsAsData instanceof Array && -1 != p.inArray(o[i].name, l.attrsAsData)) && a.data(o[i].name, o[i].value);
                    if (l.attrs && "ignore" == l.attrs) o = !1;
            else if (o)
                        for (i = 0; i < o.length; i++) o[i].value && (ul.append(s = p("<li>").append(p("<span>", {
                text: o[i].value
            }).addClass("attrValue")).addClass("attr " + o[i].name).prepend(p("<span>", {
                text: "@" + o[i].name + ":"
            }))), l.attrs && "hidden" == l.attrs && s.hide());
                    var n = e.children();
                    !n.length && (!o.length || o.length && l.attrs && "hidden" == l.attrs) && a.addClass("noKids");
                    t = p("<span>", {
                text: t
            }).addClass("tree_node");
                    if (n.length) this.delve_nextAppendTo = ul, LITxtHolder.prepend(e.immediateText() + (l.noDots ? "" : "..")).prepend(t), n.each(function () {
                        d.delve(p(this))
            }), this.delve_nextAppendTo = this.delve_nextAppendTo.parent().parent();
            else {
                        var r = "<span onmouseover='XMLTree.prototype.onOver(this)'>" + e.text() + "</span>";
                        LITxtHolder.prepend(r).prepend(t)
            }
            }, XMLTree.prototype.actOnXML = function (e) {
                    var t = this;
                    if (this.xml = p("string" == typeof e ? function (e) {
                            window.DOMParser ? (parser = new DOMParser, xmlDoc = parser.parseFromString(e, "text/xml")) : (xmlDoc = new ActiveXObject("Microsoft.XMLDOM"), xmlDoc.async = !1, xmlDoc.loadXML(e));
                            return xmlDoc
            }(e) : e), i && (this.xml = this.xml.children(":first")), l.XMLCallback && (this.xml = l.XMLCallback(this.xml)), l.openAtPath) {
                        var o = this.xml.find(l.openAtPath);
                        1 == o.length && o.attr("currSel", "true")
            }
                    this.xml.children().each(function () {
                        t.delve(p(this))
            }), this.postBuild()
            }, this instanceof XMLTree) {
                var e;
                if (l.fpath || l.xml ? l.container && p(l.container).length || l.justReturn || (e = "No container selector passed or does not match element in DOM") : e = "neither XML nor path to XML file passed", !e) {
                    var a, s, o = p(l.container),
                        c = Math.floor(1e7 * Math.random()),
                        d = this;
                    return this.tree = i ? o.children("ul") : p("<ul>"), this.instanceID = XMLTree.instancesCounter, XMLTree.instancesCounter++, i || (this.tree.addClass("xmltree"), l.startExpanded && this.tree.addClass("startExpanded")), i && this.tree.addClass("forcePlusMin"), l.justReturn || this.tree.appendTo(o), l.fpath ? p.ajax({
                        url: l.fpath,
                        cache: null == l.cache || l.cache,
                        dataType: l.jsonp ? "jsonp" : "xml"
                    }).done(function (e) {
                        d.xml = e, d.actOnXML(e)
                    }).error(function () {
                        alert("XMLTree error - could not load XML from " + l.fpath)
                    }) : ("string" == typeof l.xml && (this.xml = l.xml.replace(/<(\/)?(\w+)([^>]*)>/g, function (e, t, o, i) {
                        return "<" + (t || "") + o + "_" + c + (i || "") + ">"
                    }).replace(/<\?xml[^>]+>\s*/, "")), this.actOnXML(l.xml)), this.tree
                }
                alert("XMLTree error - " + e)
            } else window.console && console.log && console.log("XMLTree was called but not instantiated")
        }, XMLTree.instancesCounter = 0, p.fn.immediateText = function () {
            return p(this).clone().children().remove().end().text()
        }
    }(jQuery),
    function (J, W, i) {
        function l(e, t) {
            this.bodyOverflowX, this.callbacks = {
                hide: [],
                show: []
            }, this.checkInterval = null, this.Content, this.$el = J(e), this.$elProxy, this.elProxyPosition, this.enabled = !0, this.options = J.extend({}, c, t), this.mouseIsOverProxy = !1, this.namespace = "tooltipster-" + Math.round(1e5 * Math.random()), this.Status = "hidden", this.timerHide = null, this.timerShow = null, this.$tooltip, this.options.iconTheme = this.options.iconTheme.replace(".", ""), this.options.theme = this.options.theme.replace(".", ""), this._init()
        }

        function n(o, i) {
            var n = !0;
            return J.each(o, function (e, t) {
                if (void 0 === i[e] || o[e] !== i[e]) return n = !1
            }), n
        }

        function r() {
            return !e && p
        }

        function d() {
            var e = (i.body || i.documentElement).style,
                t = "transition";
            if ("string" == typeof e[t]) return !0;
            v = ["Moz", "Webkit", "Khtml", "O", "ms"], t = t.charAt(0).toUpperCase() + t.substr(1);
            for (var o = 0; o < v.length; o++)
                if ("string" == typeof e[v[o] + t]) return !0;
            return !1
        }
        var c = {
            animation: "fade",
            arrow: !0,
            arrowColor: "",
            autoClose: !0,
            content: null,
            contentAsHTML: !1,
            contentCloning: !0,
            debug: !0,
            delay: 200,
            minWidth: 0,
            maxWidth: null,
            functionInit: function (e, t) { },
            functionBefore: function (e, t) {
                t()
            },
            functionReady: function (e, t) { },
            functionAfter: function (e) { },
            hideOnClick: !1,
            icon: "(?)",
            iconCloning: !0,
            iconDesktop: !1,
            iconTouch: !1,
            iconTheme: "tooltipster-icon",
            interactive: !1,
            interactiveTolerance: 350,
            multiple: !1,
            offsetX: 0,
            offsetY: 0,
            onlyOne: !1,
            position: "top",
            positionTracker: !1,
            positionTrackerCallback: function (e) {
                "hover" == this.option("trigger") && this.option("autoClose") && this.hide()
            },
            restoration: "current",
            speed: 350,
            timer: 0,
            theme: "tooltipster-default",
            touchDevices: !0,
            trigger: "hover",
            updateAnimation: !0
        };
        l.prototype = {
            _init: function () {
                var e = this;
                if (i.querySelector) {
                    var t = null;
                    void 0 === e.$el.data("tooltipster-initialTitle") && (void 0 === (t = e.$el.attr("title")) && (t = null), e.$el.data("tooltipster-initialTitle", t)), null !== e.options.content ? e._content_set(e.options.content) : e._content_set(t);
                    var o = e.options.functionInit.call(e.$el, e.$el, e.Content);
                    void 0 !== o && e._content_set(o), e.$el.removeAttr("title").addClass("tooltipstered"), !p && e.options.iconDesktop || p && e.options.iconTouch ? ("string" == typeof e.options.icon ? (e.$elProxy = J('<span class="' + e.options.iconTheme + '"></span>'), e.$elProxy.text(e.options.icon)) : e.options.iconCloning ? e.$elProxy = e.options.icon.clone(!0) : e.$elProxy = e.options.icon, e.$elProxy.insertAfter(e.$el)) : e.$elProxy = e.$el, "hover" == e.options.trigger ? (e.$elProxy.on("mouseenter." + e.namespace, function () {
                        r() && !e.options.touchDevices || (e.mouseIsOverProxy = !0, e._show())
                    }).on("mouseleave." + e.namespace, function () {
                        r() && !e.options.touchDevices || (e.mouseIsOverProxy = !1)
                    }), p && e.options.touchDevices && e.$elProxy.on("touchstart." + e.namespace, function () {
                        e._showNow()
                    })) : "click" == e.options.trigger && e.$elProxy.on("click." + e.namespace, function () {
                        r() && !e.options.touchDevices || e._show()
                    })
                }
            },
            _show: function () {
                var e = this;
                "shown" != e.Status && "appearing" != e.Status && (e.options.delay ? e.timerShow = setTimeout(function () {
                    ("click" == e.options.trigger || "hover" == e.options.trigger && e.mouseIsOverProxy) && e._showNow()
                }, e.options.delay) : e._showNow())
            },
            _showNow: function (l) {
                var c = this;
                c.options.functionBefore.call(c.$el, c.$el, function () {
                    if (c.enabled && null !== c.Content) {
                        l && c.callbacks.show.push(l), c.callbacks.hide = [], clearTimeout(c.timerShow), c.timerShow = null, clearTimeout(c.timerHide), c.timerHide = null, c.options.onlyOne && J(".tooltipstered").not(c.$el).each(function (e, t) {
                            var r = J(t),
                                o = r.data("tooltipster-ns");
                            J.each(o, function (e, t) {
                                var o = r.data(t),
                                    i = o.status(),
                                    n = o.option("autoClose");
                                "hidden" !== i && "disappearing" !== i && n && o.hide()
                            })
                        });
                        var e = function () {
                            c.Status = "shown", J.each(c.callbacks.show, function (e, t) {
                                t.call(c.$el)
                            }), c.callbacks.show = []
                        };
                        if ("hidden" !== c.Status) {
                            var t = 0;
                            "disappearing" === c.Status ? (c.Status = "appearing", d() ? (c.$tooltip.clearQueue().removeClass("tooltipster-dying").addClass("tooltipster-" + c.options.animation + "-show"), 0 < c.options.speed && c.$tooltip.delay(c.options.speed), c.$tooltip.queue(e)) : c.$tooltip.stop().fadeIn(e)) : "shown" === c.Status && e()
                        } else {
                            c.Status = "appearing";
                            t = c.options.speed;
                            c.bodyOverflowX = J("body").css("overflow-x"), J("body").css("overflow-x", "hidden");
                            var o = "tooltipster-" + c.options.animation,
                                i = "-webkit-transition-duration: " + c.options.speed + "ms; -webkit-animation-duration: " + c.options.speed + "ms; -moz-transition-duration: " + c.options.speed + "ms; -moz-animation-duration: " + c.options.speed + "ms; -o-transition-duration: " + c.options.speed + "ms; -o-animation-duration: " + c.options.speed + "ms; -ms-transition-duration: " + c.options.speed + "ms; -ms-animation-duration: " + c.options.speed + "ms; transition-duration: " + c.options.speed + "ms; animation-duration: " + c.options.speed + "ms;",
                                n = c.options.minWidth ? "min-width:" + Math.round(c.options.minWidth) + "px;" : "",
                                r = c.options.maxWidth ? "max-width:" + Math.round(c.options.maxWidth) + "px;" : "",
                                a = c.options.interactive ? "pointer-events: auto;" : "";
                            if (c.$tooltip = J('<div class="tooltipster-base ' + c.options.theme + '" style="' + n + " " + r + " " + a + " " + i + '"><div class="tooltipster-content"></div></div>'), d() && c.$tooltip.addClass(o), c._content_insert(), c.$tooltip.appendTo("body"), c.reposition(), c.options.functionReady.call(c.$el, c.$el, c.$tooltip), d() ? (c.$tooltip.addClass(o + "-show"), 0 < c.options.speed && c.$tooltip.delay(c.options.speed), c.$tooltip.queue(e)) : c.$tooltip.css("display", "none").fadeIn(c.options.speed, e), c._interval_set(), J(W).on("scroll." + c.namespace + " resize." + c.namespace, function () {
                                    c.reposition()
                            }), c.options.autoClose)
                                if (J("body").off("." + c.namespace), "hover" == c.options.trigger) {
                                    if (p && setTimeout(function () {
                                            J("body").on("touchstart." + c.namespace, function () {
                                                c.hide()
                                    })
                                    }, 0), c.options.interactive) {
                                        p && c.$tooltip.on("touchstart." + c.namespace, function (e) {
                                            e.stopPropagation()
                                        });
                                        var s = null;
                                        c.$elProxy.add(c.$tooltip).on("mouseleave." + c.namespace + "-autoClose", function () {
                                            clearTimeout(s), s = setTimeout(function () {
                                                c.hide()
                                            }, c.options.interactiveTolerance)
                                        }).on("mouseenter." + c.namespace + "-autoClose", function () {
                                            clearTimeout(s)
                                        })
                                    } else c.$elProxy.on("mouseleave." + c.namespace + "-autoClose", function () {
                                        c.hide()
                                    });
                                    c.options.hideOnClick && c.$elProxy.on("click." + c.namespace + "-autoClose", function () {
                                        c.hide()
                                    })
                                } else "click" == c.options.trigger && (setTimeout(function () {
                                    J("body").on("click." + c.namespace + " touchstart." + c.namespace, function () {
                                        c.hide()
                                    })
                                }, 0), c.options.interactive && c.$tooltip.on("click." + c.namespace + " touchstart." + c.namespace, function (e) {
                                    e.stopPropagation()
                                }))
                        }
                        0 < c.options.timer && (c.timerHide = setTimeout(function () {
                            c.timerHide = null, c.hide()
                        }, c.options.timer + t))
                    }
                })
            },
            _interval_set: function () {
                var o = this;
                o.checkInterval = setInterval(function () {
                    if (0 === J("body").find(o.$el).length || 0 === J("body").find(o.$elProxy).length || "hidden" == o.Status || 0 === J("body").find(o.$tooltip).length) "shown" != o.Status && "appearing" != o.Status || o.hide(), o._interval_cancel();
                    else if (o.options.positionTracker) {
                        var e = o._repositionInfo(o.$elProxy),
                            t = !1;
                        n(e.dimension, o.elProxyPosition.dimension) && ("fixed" === o.$elProxy.css("position") ? n(e.position, o.elProxyPosition.position) && (t = !0) : n(e.offset, o.elProxyPosition.offset) && (t = !0)), t || (o.reposition(), o.options.positionTrackerCallback.call(o, o.$el))
                    }
                }, 200)
            },
            _interval_cancel: function () {
                clearInterval(this.checkInterval), this.checkInterval = null
            },
            _content_set: function (e) {
                "object" == typeof e && null !== e && this.options.contentCloning && (e = e.clone(!0)), this.Content = e
            },
            _content_insert: function () {
                var e = this.$tooltip.find(".tooltipster-content");
                "string" != typeof this.Content || this.options.contentAsHTML ? e.empty().append(this.Content) : e.text(this.Content)
            },
            _update: function (e) {
                var t = this;
                t._content_set(e), null !== t.Content ? "hidden" !== t.Status && (t._content_insert(), t.reposition(), t.options.updateAnimation && (d() ? (t.$tooltip.css({
                    width: "",
                    "-webkit-transition": "all " + t.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                    "-moz-transition": "all " + t.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                    "-o-transition": "all " + t.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                    "-ms-transition": "all " + t.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                    transition: "all " + t.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms"
                }).addClass("tooltipster-content-changing"), setTimeout(function () {
                    "hidden" != t.Status && (t.$tooltip.removeClass("tooltipster-content-changing"), setTimeout(function () {
                        "hidden" !== t.Status && t.$tooltip.css({
                            "-webkit-transition": t.options.speed + "ms",
                            "-moz-transition": t.options.speed + "ms",
                            "-o-transition": t.options.speed + "ms",
                            "-ms-transition": t.options.speed + "ms",
                            transition: t.options.speed + "ms"
                        })
                    }, t.options.speed))
                }, t.options.speed)) : t.$tooltip.fadeTo(t.options.speed, .5, function () {
                    "hidden" != t.Status && t.$tooltip.fadeTo(t.options.speed, 1)
                }))) : t.hide()
            },
            _repositionInfo: function (e) {
                return {
                    dimension: {
                        height: e.outerHeight(!1),
                        width: e.outerWidth(!1)
                    },
                    offset: e.offset(),
                    position: {
                        left: parseInt(e.css("left")),
                        top: parseInt(e.css("top"))
                    }
                }
            },
            hide: function (e) {
                var o = this;
                e && o.callbacks.hide.push(e), o.callbacks.show = [], clearTimeout(o.timerShow), o.timerShow = null, clearTimeout(o.timerHide), o.timerHide = null;
                var t = function () {
                    J.each(o.callbacks.hide, function (e, t) {
                        t.call(o.$el)
                    }), o.callbacks.hide = []
                };
                if ("shown" == o.Status || "appearing" == o.Status) {
                    o.Status = "disappearing";
                    var i = function () {
                        o.Status = "hidden", "object" == typeof o.Content && null !== o.Content && o.Content.detach(), o.$tooltip.remove(), o.$tooltip = null, J(W).off("." + o.namespace), J("body").off("." + o.namespace).css("overflow-x", o.bodyOverflowX), J("body").off("." + o.namespace), o.$elProxy.off("." + o.namespace + "-autoClose"), o.options.functionAfter.call(o.$el, o.$el), t()
                    };
                    d() ? (o.$tooltip.clearQueue().removeClass("tooltipster-" + o.options.animation + "-show").addClass("tooltipster-dying"), 0 < o.options.speed && o.$tooltip.delay(o.options.speed), o.$tooltip.queue(i)) : o.$tooltip.stop().fadeOut(o.options.speed, i)
                } else "hidden" == o.Status && t();
                return o
            },
            show: function (e) {
                return this._showNow(e), this
            },
            update: function (e) {
                return this.content(e)
            },
            content: function (e) {
                return void 0 === e ? this.Content : (this._update(e), this)
            },
            reposition: function () {
                var e = this;
                if (0 !== J("body").find(e.$tooltip).length) {
                    e.$tooltip.css("width", ""), e.elProxyPosition = e._repositionInfo(e.$elProxy);
                    var t = null,
                        o = J(W).width(),
                        i = e.elProxyPosition,
                        n = e.$tooltip.outerWidth(!1),
                        r = (e.$tooltip.innerWidth(), e.$tooltip.outerHeight(!1));
                    if (e.$elProxy.is("area")) {
                        var a = e.$elProxy.attr("shape"),
                            s = e.$elProxy.parent().attr("name"),
                            l = J('img[usemap="#' + s + '"]'),
                            c = l.offset().left,
                            d = l.offset().top,
                            p = void 0 !== e.$elProxy.attr("coords") ? e.$elProxy.attr("coords").split(",") : void 0;
                        if ("circle" == a) {
                            var u = parseInt(p[0]),
                                f = parseInt(p[1]),
                                h = parseInt(p[2]);
                            i.dimension.height = 2 * h, i.dimension.width = 2 * h, i.offset.top = d + f - h, i.offset.left = c + u - h
                        } else if ("rect" == a) {
                            u = parseInt(p[0]), f = parseInt(p[1]);
                            var m = parseInt(p[2]),
                                v = parseInt(p[3]);
                            i.dimension.height = v - f, i.dimension.width = m - u, i.offset.top = d + f, i.offset.left = c + u
                        } else if ("poly" == a) {
                            for (var g = 0, $ = 0, y = 0, x = 0, w = "even", b = 0; b < p.length; b++) {
                                var T = parseInt(p[b]);
                                "even" == w ? (y < T && (y = T, 0 === b && (g = y)), T < g && (g = T), w = "odd") : (x < T && (x = T, 1 == b && ($ = x)), T < $ && ($ = T), w = "even")
                            }
                            i.dimension.height = x - $, i.dimension.width = y - g, i.offset.top = d + $, i.offset.left = c + g
                        } else i.dimension.height = l.outerHeight(!1), i.dimension.width = l.outerWidth(!1), i.offset.top = d, i.offset.left = c
                    }
                    var C = 0,
                        S = 0,
                        E = 0,
                        L = parseInt(e.options.offsetY),
                        k = parseInt(e.options.offsetX),
                        j = e.options.position;

                    function M() {
                        var e = J(W).scrollLeft();
                        C - e < 0 && (t = C - e, C = e), o < C + n - e && (t = C - (o + e - n), C = o + e - n)
                    }

                    function A(e, t) {
                        i.offset.top - J(W).scrollTop() - r - L - 12 < 0 && -1 < t.indexOf("top") && (j = e), i.offset.top + i.dimension.height + r + 12 + L > J(W).scrollTop() + J(W).height() && -1 < t.indexOf("bottom") && (j = e, E = i.offset.top - r - L - 12)
                    }
                    if ("top" == j) {
                        var D = i.offset.left + n - (i.offset.left + i.dimension.width);
                        C = i.offset.left + k - D / 2, E = i.offset.top - r - L - 12, M(), A("bottom", "top")
                    }
                    if ("top-left" == j && (C = i.offset.left + k, E = i.offset.top - r - L - 12, M(), A("bottom-left", "top-left")), "top-right" == j && (C = i.offset.left + i.dimension.width + k - n, E = i.offset.top - r - L - 12, M(), A("bottom-right", "top-right")), "bottom" == j) {
                        D = i.offset.left + n - (i.offset.left + i.dimension.width);
                        C = i.offset.left - D / 2 + k, E = i.offset.top + i.dimension.height + L + 12, M(), A("top", "bottom")
                    }
                    if ("bottom-left" == j && (C = i.offset.left + k, E = i.offset.top + i.dimension.height + L + 12, M(), A("top-left", "bottom-left")), "bottom-right" == j && (C = i.offset.left + i.dimension.width + k - n, E = i.offset.top + i.dimension.height + L + 12, M(), A("top-right", "bottom-right")), "left" == j) {
                        C = i.offset.left - k - n - 12, S = i.offset.left + k + i.dimension.width + 12;
                        var _ = i.offset.top + r - (i.offset.top + i.dimension.height);
                        if (E = i.offset.top - _ / 2 - L, C < 0 && o < S + n) {
                            var R = 2 * parseFloat(e.$tooltip.css("border-width")),
                                N = n + C - R;
                            e.$tooltip.css("width", N + "px"), r = e.$tooltip.outerHeight(!1), C = i.offset.left - k - N - 12 - R, _ = i.offset.top + r - (i.offset.top + i.dimension.height), E = i.offset.top - _ / 2 - L
                        } else C < 0 && (C = i.offset.left + k + i.dimension.width + 12, t = "left")
                    }
                    if ("right" == j) {
                        C = i.offset.left + k + i.dimension.width + 12, S = i.offset.left - k - n - 12;
                        _ = i.offset.top + r - (i.offset.top + i.dimension.height);
                        if (E = i.offset.top - _ / 2 - L, o < C + n && S < 0) {
                            R = 2 * parseFloat(e.$tooltip.css("border-width")), N = o - C - R;
                            e.$tooltip.css("width", N + "px"), r = e.$tooltip.outerHeight(!1), _ = i.offset.top + r - (i.offset.top + i.dimension.height), E = i.offset.top - _ / 2 - L
                        } else o < C + n && (C = i.offset.left - k - n - 12, t = "right")
                    }
                    if (e.options.arrow) {
                        var O = "tooltipster-arrow-" + j;
                        if (e.options.arrowColor.length < 1) var I = e.$tooltip.css("background-color");
                        else I = e.options.arrowColor;
                        if (t ? "left" == t ? (O = "tooltipster-arrow-right", t = "") : "right" == t ? (O = "tooltipster-arrow-left", t = "") : t = "left:" + Math.round(t) + "px;" : t = "", "top" == j || "top-left" == j || "top-right" == j) var X = parseFloat(e.$tooltip.css("border-bottom-width")),
                            V = e.$tooltip.css("border-bottom-color");
                        else if ("bottom" == j || "bottom-left" == j || "bottom-right" == j) X = parseFloat(e.$tooltip.css("border-top-width")), V = e.$tooltip.css("border-top-color");
                        else if ("left" == j) X = parseFloat(e.$tooltip.css("border-right-width")), V = e.$tooltip.css("border-right-color");
                        else if ("right" == j) X = parseFloat(e.$tooltip.css("border-left-width")), V = e.$tooltip.css("border-left-color");
                        else X = parseFloat(e.$tooltip.css("border-bottom-width")), V = e.$tooltip.css("border-bottom-color");
                        1 < X && X++;
                        var P = "";
                        if (0 !== X) {
                            var F = "",
                                U = "border-color: " + V + ";"; -1 !== O.indexOf("bottom") ? F = "margin-top: -" + Math.round(X) + "px;" : -1 !== O.indexOf("top") ? F = "margin-bottom: -" + Math.round(X) + "px;" : -1 !== O.indexOf("left") ? F = "margin-right: -" + Math.round(X) + "px;" : -1 !== O.indexOf("right") && (F = "margin-left: -" + Math.round(X) + "px;"), P = '<span class="tooltipster-arrow-border" style="' + F + " " + U + ';"></span>'
                        }
                        e.$tooltip.find(".tooltipster-arrow").remove();
                        var B = '<div class="' + O + ' tooltipster-arrow" style="' + t + '">' + P + '<span style="border-color:' + I + ';"></span></div>';
                        e.$tooltip.append(B)
                    }
                    e.$tooltip.css({
                        top: Math.round(E) + "px",
                        left: Math.round(C) + "px"
                    })
                }
                return e
            },
            enable: function () {
                return this.enabled = !0, this
            },
            disable: function () {
                return this.hide(), this.enabled = !1, this
            },
            destroy: function () {
                var o = this;
                o.hide(), o.$el[0] !== o.$elProxy[0] && o.$elProxy.remove(), o.$el.removeData(o.namespace).off("." + o.namespace);
                var e = o.$el.data("tooltipster-ns");
                if (1 === e.length) {
                    var t = null;
                    "previous" === o.options.restoration ? t = o.$el.data("tooltipster-initialTitle") : "current" === o.options.restoration && (t = "string" == typeof o.Content ? o.Content : J("<div></div>").append(o.Content).html()), t && o.$el.attr("title", t), o.$el.removeClass("tooltipstered").removeData("tooltipster-ns").removeData("tooltipster-initialTitle")
                } else e = J.grep(e, function (e, t) {
                    return e !== o.namespace
                }), o.$el.data("tooltipster-ns", e);
                return o
            },
            elementIcon: function () {
                return this.$el[0] !== this.$elProxy[0] ? this.$elProxy[0] : void 0
            },
            elementTooltip: function () {
                return this.$tooltip ? this.$tooltip[0] : void 0
            },
            option: function (e, t) {
                return void 0 === t ? this.options[e] : (this.options[e] = t, this)
            },
            status: function () {
                return this.Status
            }
        }, J.fn.tooltipster = function () {
            var i = arguments;
            if (0 === this.length) {
                if ("string" == typeof i[0]) {
                    var e = !0;
                    switch (i[0]) {
                        case "setDefaults":
                            J.extend(c, i[1]);
                            break;
                        default:
                            e = !1
                    }
                    return !!e || this
                }
                return this
            }
            if ("string" == typeof i[0]) {
                var n = "#*$~&";
                return this.each(function () {
                    var e = J(this).data("tooltipster-ns"),
                        t = e ? J(this).data(e[0]) : null;
                    if (!t) throw new Error("You called Tooltipster's \"" + i[0] + '" method on an uninitialized element');
                    if ("function" != typeof t[i[0]]) throw new Error('Unknown method .tooltipster("' + i[0] + '")');
                    var o = t[i[0]](i[1], i[2]);
                    if (o !== t) return n = o, !1
                }), "#*$~&" !== n ? n : this
            }
            var r = [],
                t = i[0] && void 0 !== i[0].multiple,
                a = t && i[0].multiple || !t && c.multiple,
                o = i[0] && void 0 !== i[0].debug,
                s = o && i[0].debug || !o && c.debug;
            return this.each(function () {
                var e = !1,
                    t = J(this).data("tooltipster-ns"),
                    o = null;
                t ? a ? e = !0 : s && console.log('Tooltipster: one or more tooltips are already attached to this element: ignoring. Use the "multiple" option to attach more tooltips.') : e = !0, e && (o = new l(this, i[0]), t || (t = []), t.push(o.namespace), J(this).data("tooltipster-ns", t), J(this).data(o.namespace, o)), r.push(o)
            }), a ? r : this
        };
        var p = !!("ontouchstart" in W),
            e = !1;
        J("body").one("mousemove", function () {
            e = !0
        })
    }(jQuery, window, document);
var editorAce, editorResult, viewname, mode, editor, isXmlData = !0,
    converted = "",
    arr = [],
    flag = !0,
    json = "";

function setToEditor(e) {
    isXmlData = !0, "xmlviewer" != viewname && "xmlvalidate" != viewname && "xml-to-excel-converter" != viewname && "online-xml-editor" != viewname && editorResult.getSession().setMode("ace/mode/json"), editorAce.setValue(e), "xmlviewer" == viewname ? xmlTreeView() : "xml-to-csv-converter" == viewname ? xmlTocsv() : "xml-to-yaml" == viewname ? XMLToYAML() : "xmltojson" == viewname ? xmlTojson() : "opmlviewer" == viewname ? xmlTreeView() : "xmlvalidate" == viewname ? validateXML() : "online-xml-editor" == viewname ? xmlTreeView() : "xml-to-java-converter" == viewname && convertXMLToJava()
}

function xmlTreeView() {
    isXmlData = !0;
    var e = editorAce.getValue();
    if (0 < e.trim().length) {
        var t = vkbeautify.xml(e);
        $("#result1").html(""), $("#result1").show(), $("#result").hide(), new XMLTree({
            xml: t.trim(),
            container: "#result1",
            startExpanded: !0
        }), setOutputMsg("XML Tree View")
    } else $("#result1").html("")
}

function FormatXML() {
    isXmlData = !0, editorResult.getSession().setMode("ace/mode/xml"), $("#result").show(), $("#result1").hide();
    var e = editorAce.getValue();
    if (0 < e.trim().length) {
        var t = vkbeautify.xml(e);
        editorResult.setValue(t), setOutputMsg("Beautify XML")
    }
}

function showJSON() {
    isXmlData = !1, editorResult.getSession().setMode("ace/mode/json"), $("#result").show(), $("#result1").hide();
    var e = editorAce.getValue();
    if (0 < e.trim().length) try {
        if ("undefined" == typeof X2JS) return void $.loadScript("https://cdnjs.cloudflare.com/ajax/libs/x2js/1.2.0/xml2json.min.js", function () {
            showJSON()
        });
        var t = new X2JS;
        editorResult.setValue(vkbeautify.json(JSON.stringify(t.xml_str2json(e)))), setOutputMsg("XML to JSON")
    } catch (e) {
        openErrorDialog("invalid XML" + e)
    }
}

function MinifyXML() {
    isXmlData = !0, editorResult.getSession().setMode("ace/mode/xml"), $("#result").show(), $("#result1").hide();
    var e = editorAce.getValue();
    if (editorResult.getSession().setUseWrapMode(!0), 0 < e.trim().length) {
        var t = vkbeautify.xmlmin(vkbeautify.xml(e));
        editorResult.setValue(t), setOutputMsg("Minify XML")
    }
}

function createXMLFile() {
    var e = editorAce.getValue();
    if (0 < e.trim().length) {
        var t = "";
        if (null != (t = $("#result1").is(":visible") ? vkbeautify.xml(e) : editorResult.getValue()) && "" != t && 0 < t.trim().length) {
            var o = new Blob(["" + t], {
                type: "text/plain;charset=utf-8"
            }),
                i = "codeconvert.xml";
            0 == isXmlData && (i = "codeconvert.json"), fileDownloadCB(o, i)
        } else openErrorDialog("Sorry Result is Empty")
    }
}

function getText(e, t, o) {
    $(t, e).each(function () {
        o.push($(this).text())
    })
}

function xmlTocsv() {
    var e = editorAce.getValue(),
        t = "";
    if (null != e && 0 != e.trim().length) {
        try {
            t = $.parseXML(e)
        } catch (e) {
            openErrorDialog("Invalid XML")
        }
        if ("undefined" == typeof X2JS) return void $.loadScript("https://cdnjs.cloudflare.com/ajax/libs/x2js/1.2.0/xml2json.min.js", function () {
            xmlTocsv()
        });
        e = (new X2JS).xml2json(t), setOutputMsg("XML TO CSV"), jsonTocsvbyjson(e)
    }
}

function xmlToarray() {
    $.ajax({
        type: "post",
        url: globalurl + "convter",
        dataType: "json",
        data: {
            type: "xml2array",
            data: editorAce.getValue()
        },
        success: function (e) {
            console.log(e), console.log(Papa.unparse(e))
        },
        error: function (e, t, o) {
            openErrorDialog("Failed to load data=" + t)
        }
    })
}

function XMLToYAML() {
    editorResult.getSession().setMode("ace/mode/yaml");
    var e = editorAce.getValue();
    if (0 < e.trim().length) try {
        if ("undefined" == typeof X2JS) return void $.loadScript("https://cdnjs.cloudflare.com/ajax/libs/x2js/1.2.0/xml2json.min.js", function () {
            XMLToYAML()
        });
        var t = new X2JS;
        data = t.xml_str2json(e.trim()), data = json2yaml(data), editorResult.setValue(data), setOutputMsg("XML TO YAML")
    } catch (e) {
        var o = "";
        o = o + "Error : " + e.message, o = (o += "\n") + "Line : " + e.parsedLine + "  " + e.snippet, editorResult.setValue(o), setOutputMsg("Invalid XML")
    }
}

function xmlTojson() {
    var e = editorAce.getValue();
    if (0 < e.trim().length) {
        $("#json").show(), $("#xml").hide();
        try {
            if ("undefined" == typeof X2JS) return void $.loadScript("https://cdnjs.cloudflare.com/ajax/libs/x2js/1.2.0/xml2json.min.js", function () {
                xmlTojson()
            });
            var t = new X2JS,
                o = vkbeautify.json(t.xml_str2json(e));
            isJsonData = !0, editorResult.getSession().setMode("ace/mode/json"), $("#json").hide(), $("#xml").show(), editorResult.getSession().setUseWrapMode(!1), editorResult.setValue(o), setOutputMsg("XML to JSON"), $(".jsoneditor").removeAttr("height")
        } catch (e) {
            console.log(e), 0 != "".length && openErrorDialog("invalid XML")
        }
    }
}

function validateXML() {
    if (" " != validate(editorAce.getValue().trim()) && 0 < editorAce.getValue().trim().length) {
        var e = editorAce.getValue();
        if (null != e && "" != e && 0 < e.trim().length)
            if (window.ActiveXObject)
                if ((i = new ActiveXObject("Microsoft.XMLDOM")).async = !1, i.loadXML(document.all(e).value), 0 != i.parseError.errorCode) {
                    var t = "Error Code: " + i.parseError.errorCode + "\n";
                    t = (t = t + "Error Reason: " + i.parseError.reason) + "Error Line: " + i.parseError.line, $("#hResult").show(), $("#editor").css({
                        border: "1px solid #FBC2C4"
                    }), $("#hResult").removeClass(), $("#hResult").addClass("error"), $("#hResult").text(t)
                } else {
                    if ($("#hResult").show(), $("#hResult").removeClass(), $("#hResult").addClass("success"), $("#editor").css({
                        border: "1px solid #C6D880"
                    }), $("#hResult").text("Valid XML"), 0 < (n = editorAce.getValue()).trim().length) {
                        var o = vkbeautify.xml(n);
                        editorAce.setValue(o), editorAce.clearSelection()
                    }
                }
            else if (document.implementation.createDocument) {
                try {
                    var i = (new DOMParser).parseFromString(e, "application/xml")
                } catch (e) {
                    $("#hResult").show(), $("#editor").css({
                        border: "1px solid #FBC2C4"
                    }), $("#hResult").removeClass(), $("#hResult").addClass("error"), $("#hResult").text(e.message)
                }
                var n;
                if (0 < i.getElementsByTagName("parsererror").length) checkErrorXML(i.getElementsByTagName("parsererror")[0]), $("#hResult").show(), $("#editor").css({
                    border: "1px solid #FBC2C4"
                }), $("#hResult").removeClass(), $("#hResult").addClass("error"), $("#hResult").text(xt);
                else if ($("#hResult").show(), $("#hResult").removeClass(), $("#hResult").addClass("success"), $("#editor").css({
                        border: "1px solid #C6D880"
                }), $("#hResult").text("Valid XML"), 0 < (n = editorAce.getValue()).trim().length) {
                    o = vkbeautify.xml(n);
                    editorAce.setValue(o), editorAce.clearSelection()
                }
            } else alert("Your browser cannot handle XML validation")
    } else $("#editor").css({
        border: "1px solid #BCBDBA"
    }), $("#hResult").hide()
}
$(document).ready(function () {
    if ("xmlviewer" == (viewname = $("#viewName").val().trim())) setViewTitle("XML Viewer", !0, !0), createEditor("xml", "xml");
    else if ("xml-to-csv-converter" == viewname) setViewTitle("XML TO CSV Converter", !0, !0), createEditor("xml", "text");
    else if ("xml-to-yaml" == viewname) setViewTitle("XML TO YAML Converter", !0, !0), createEditor("xml", "yaml");
    else if ("xmltojson" == viewname) {
        mode = document.getElementById("mode");
        document.getElementById("jsoneditor");
        setViewTitle("XML TO JSON Converter", !0, !0), createEditor("xml", "json")
    } else "xmlvalidate" == viewname ? (setViewTitle("XML Validator", !0, !0), createEditor("xml")) : "online-xml-editor" == viewname ? (setViewTitle("Online XML EDITOR", !0, !0), createEditor("xml"), editorAce.setOptions({
        enableBasicAutocompletion: !0,
        enableSnippets: !0,
        enableLiveAutocompletion: !1
    })) : "xml-to-excel-converter" == viewname ? (createEditor("xml"), setViewTitle("Online XML TO EXCEL Converter", !0, !0)) : "xml-to-java-converter" == viewname ? (setViewTitle("XML TO JAVA Converter", !0, !0), createEditor("xml", "java")) : "opmlviewer" == viewname && (setViewTitle("OPML Viewer", !0, !0), createEditor("xml", "xml"))
});
var xt = "",
    h3OK = 1;

function checkErrorXML(e) {
    xt = "", h3OK = 1, checkXML(e)
}

function checkXML(e) {
    var t, o, i = e.nodeName;
    if ("h3" == i) {
        if (0 == h3OK) return;
        h3OK = 0
    }
    for ("#text" == i && (xt = xt + e.nodeValue + "\n"), t = e.childNodes.length, o = 0; o < t; o++) checkXML(e.childNodes[o])
}

function validate(e) {
    return null == e || null == e || "" == e ? "" : e
}

function clearXML() {
    editorAce.setValue(""), $("#hResult").hide()
}

function convertXMLToJava() {
    try {
        var e = editorAce.getValue();
        if (0 == e.trim().length) return !1;
        if ("undefined" == typeof X2JS) return void $.loadScript("https://cdnjs.cloudflare.com/ajax/libs/x2js/1.2.0/xml2json.min.js", function () {
            convertXMLToJava()
        });
        var t = new X2JS,
            o = vkbeautify.json(t.xml_str2json(e));
        console.log(o), createJavaObject(o)
    } catch (e) {
        editorResult.setValue("codeconvert Convert to Java Error : \n" + e)
    }
}

function downloadXMLFile() {
    if (0 < editorAce.getValue().trim().length) {
        var e = new Blob(["" + editorAce.getValue()], {
            type: "text/plain;charset=utf-8"
        });
        "validate" != converted ? fileDownloadCB(e, "codeconvert.xml") : openErrorDialog("Yaml is not converted to JSON / XML ")
    } else openErrorDialog("Sorry Result is Empty")
}

function convertToCSV(o) {
    if (0 < editorAce.getValue().trim().length) {
        var e = "";
        if ("xml" == o) e = editorAce.getValue();
        else if ("json" == o) {
            var t = editorAce.getValue();
            e = (new XML.ObjTree).writeXML(JSON.parse(t))
        }
        $.ajax({
            url: 'readfile/UploadFile.aspx/convter',
            dataType: "json",
            data: '{"Data1":  ' + JSON.stringify(e) + ',"FileType":"' + "xml2csv" + '"}',
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                var t = new Blob(["" + data.d], {
                    type: "text/plain;charset=utf-8"
                });
                "xml" == o ? fileDownloadCB(t, "xml2csv.csv") : "json" == o && fileDownloadCB(t, "json2csv.csv")
            },
            error: function (e) {
                openErrorDialog("Failed to Convert into CSV")
            }
        });
        //$.ajax({
        //    type: "post",
        //    url: globalurl + "convter",
        //    data: {
        //        type: "xml2csv",
        //        data: e
        //    },
        //    success: function (e) {
        //        var t = new Blob(["" + e], {
        //            type: "text/plain;charset=utf-8"
        //        });
        //        "xml" == o ? fileDownloadCB(t, "xml2csv.csv") : "json" == o && fileDownloadCB(t, "json2csv.csv")
        //    },
        //    error: function (e) {
        //        openErrorDialog("Failed to Convert into CSV")
        //    }
        //})
    }
}