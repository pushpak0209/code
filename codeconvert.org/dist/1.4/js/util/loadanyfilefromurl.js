function loadAnyFileFromUrl(l) {
    if (void 0 !== jQuery.ui) {
        $("#path").val("");
        var a = $("#sampleurl").val();
        a ? $("#loadUrlPathDiv a").click(function () {
            $("#path").val(a)
        }) : $("#sampleurlindialog").hide(), $("#loadUrlPathDiv").removeClass("hide"), $("#loadUrlPathDiv").dialog({
            modal: !0,
            title: "Enter Url",
            zIndex: 1e4,
            autoOpen: !0,
            width: "400",
            resizable: !1,
            buttons: {
                Load: function () {
                    var a = $("#path").val();
                    5 < a.length &&
                     $.ajax({
                         url: 'readfile/UploadFile.aspx/URLService',
                         dataType: "json",
                         data: '{"path":  "'+a+'"}',
                         type: 'POST',
                         contentType: "application/json; charset=utf-8",
                         success: function (data) {
                             $("#" + l).val(data.d), $("#" + l).focus()
                         },
                         error: function (result) {
                             openErrorDialog("Failed to load data=" + l)
                         }
                     }), $(this).dialog("destroy")
                },
                Cancel: function (a, l) {
                    $("#openError").html(""), $(this).dialog("destroy")
                }
            }
        })
    } else loadJqueryUI(loadAnyFileFromUrl, l)
}