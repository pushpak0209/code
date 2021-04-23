$(document).ready(function () {
    $(".editorCounterSection").addClass("hide");
    var e = $("#viewName").val();
    $("#" + e).addClass("currentselected"), $("#iptoolbtn").click(function () {
        return 0 == $("#domain").val().trim().length ? (openErrorDialog("Please provide domain"), !1) : "open-port-checker" == e && 0 == $("#port").val().trim().length ? (openErrorDialog("Please provide port"), !1) : ($("#iptoolbtn").attr("disabled", "disabled"), $("#hResult").addClass("hide"), void $.ajax({
            url: "readfile/UploadFile.aspx/IPInfo",
            dataType: "json",
            type: "POST",
            data: '{"S":"' + $("#serviceName").val() + '","domain":  "' + $("#domain").val() + '","type":"' + $("#lookupType").val() + '","port":"' + $("#port").val() + '" }',
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                e = jQuery.parseJSON(data.d);
                if (data.d != "null") {
                    $("#output").html(""),
                        function (e) {
                            console.log(e);
                            var o = [],
                                t = function (e) {
                                    for (var o = [], t = [], a = 0; a < e.length; a++) {
                                        var r = e[a];
                                        for (var l in r) -1 == $.inArray(l, o) && (t.push({
                                            sTitle: l.toUpperCase(),
                                            sType: "string",
                                            sClass: "center"
                                        }), o.push(l))
                                    }
                                    return t
                                }(e);
                            console.log(t);
                            for (var a = 0; a < e.length; a++) {
                                for (var r = [], l = 0; l < t.length; l++) {
                                    var s = e[a][t[l].sTitle.toLowerCase()];
                                    null == s && (s = ""), r.push(s)
                                }
                                o.push(r)
                            }
                            console.log(o),
                                function (e, o) {
                                    null != e && 0 != e.length || e.push({
                                        sTitle: "Message",
                                        sType: "string"
                                    });
                                    $("#hResult").removeClass("hide"), $("#ipToolsResult").dataTable({
                                        bRetrieve: !1,
                                        bDestroy: !0,
                                        bPaginate: !1,
                                        bJQueryUI: !1,
                                        aaData: o,
                                        oLanguage: {
                                            sEmptyTable: "No Data Found,Please try later"
                                        },
                                        aoColumns: e
                                    }), $.fn.dataTableExt.sErrMode = "mute", $("#ipToolsResult_filter").addClass("hide"), $("#ipToolsResult_info").addClass("hide")
                                }(t, o)
                        }(e)
                    , $("#iptoolbtn").removeAttr("disabled")
                }
            },
            error: function (e, o, t) {
                openErrorDialog("something went wrong.. please try again"), $("#iptoolbtn").removeAttr("disabled")
            }
        }))
    }), $("#domain").keypress(function (e) {
        13 == e.which && ("open-port-checker" == $("#viewName").val() ? $("#port").focus() : $("#iptoolbtn").click())
    }), $("#port").keypress(function (e) {
        13 == e.which && $("#iptoolbtn").click()
    }), $("body").removeAttr("id")
});