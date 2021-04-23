var editorAce, editorResult, viewname, mode, editor, isXmlData = !0,
    converted = "",
    arr = [],
    flag = !0,
    json = "";

function defaultAction() {
    $("#defaultaction").click()
}

function setToEditor(e) {
    
}

function paraphrasing() {
    loadUrlSEO(editorAce.getValue())
}

function getSampleData() {
    "paraphrasing-tool" == viewname && getParaphrasingToolData()
}

function getParaphrasingToolData() {
    editorAce.setValue("codeconvert is an online code beautifier which allows you to beautify your source code. Choose your Programming language, enter the source code and you are ready to go!"), defaultAction()
}

function loadUrlSEO(e) {
    $.ajax({
        type: "post",
        url: "readfile/UploadFile.aspx/articlerewriter",
        dataType: "json",
        type: "POST",
        data: '{"data":"' + e + '"}',
        contentType: "application/json; charset=utf-8",
        success: function (e) {
            try {
                editorResult.setValue(e.d)
            } catch (e) {
                openErrorDialog("Invalid " + view + " Data Or Invalid " + view + " URL.")
            }
        },
        error: function (e, a, t) {
            openErrorDialog("Failed to load data=" + a)
        }
    })
}
$(document).ready(function () {
    viewname = $("#viewName").val().trim(), setViewTitle("Paraphrasing Tool", !0, !0), createEditor("text", "text")
});