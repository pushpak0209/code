function openFileimageBGS(e, a) {

    var fileReader = new FileReader();
    fileReader.onload = function () {
        var datass = fileReader.result;
        "error" != datass && -1 == a.search("Filename") ? ($("#baseConvertImage").prop("src", datass), $("#baseConvertImage").removeClass("baseurlopa").addClass("baseurlopa1"), $("#baseConvertImageTag").val("<img src='" + datass + "'/>"), $("#baseConvertImageCSS").val("background-image: url(" + datass + ")"), $("#base64String").val(datass.split("base64,")[1]), $("#allcontents").css("display", "Block"), $("#allcontents").css("margin", " 53px 0px 0px")) : openErrorDialog("Error in Loading File."), hideProgress()
    };
    fileReader.readAsDataURL($('#' + e).prop('files')[0]);


    //new AjaxUpload($("#" + e), {
    //    action: globalurl + "convter/convertToBase64",
    //    name: "userfile",
    //    onSubmit: function (e, a) {
    //        var r = a[0];
    //        return "jpeg" == r || "png" == r || "jpg" == r || "gif" == r || "bmp" == r || "psd" == r ? (showProgress(), !0) : (openErrorDialog("Please Select Image File Only...!"), !1)
    //    },
    //    onComplete: function (e, a) {
    //        "error" != a && -1 == a.search("Filename") ? ($("#baseConvertImage").prop("src", a), $("#baseConvertImage").removeClass("baseurlopa").addClass("baseurlopa1"), $("#baseConvertImageTag").val("<img src='" + a + "'/>"), $("#baseConvertImageCSS").val("background-image: url(" + a + ")"), $("#base64String").val(a.split("base64,")[1]), $("#allcontents").css("display", "Block"), $("#allcontents").css("margin", " 53px 0px 0px")) : openErrorDialog("Error in Loading File."), hideProgress()
    //    }
    //})
}