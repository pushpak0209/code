var globalurl = "/";

function manageMenuAndSession() {
    var o = getCookie("loggedinuser"),
        e = getCookie("loggedinuserid");
    "" != o && "" != e ? ($("#usernamelable").text(o.substring(0, 5) + ".."), $("#notloggedin").hide(), $("#loggedin").show(), updateUserSession(e)) : $("#loggedin").hide()
}

function getCookie(o) {
    for (var e = o + "=", n = document.cookie.split(";"), t = 0; t < n.length; t++) {
        for (var i = n[t];
            " " == i.charAt(0) ;) i = i.substring(1);
        if (0 == i.indexOf(e)) return (e = i.substring(e.length, i.length)).replace(/\+/g, " ")
    }
    return ""
}

function updateUserSession(o) {
    $.ajax({
        type: "post",
        url: "/service/updateSession",
        data: {
            id: o
        },
        success: function (o) { }
    })
}

function logout() {
    document.cookie = "loggedinuser=; expires=Thu, 01 Jan 1970 00:00:00 UTC", null != getProvider() && hello(getProvider()).logout().then(function () { }, function (o) { }), $.ajax({
        url: "/service/logout",
        success: function (o) {
            window.location.href = "/codeconvert_redirect"
        }
    })
}

function toggleOpenClass() {
    document.getElementById("myDropdown").classList.toggle("show")
}



function LoadHeader() {
    $.get("../../../Header.html", function (html_string) {
        $("#divheader").html(html_string);
    });
}

function LoadFooter() {
    $.get("../../../footer.html", function (html_string) {
        $("#divFooter").html(html_string);
    });
}



$(document).ready(function () {
    LoadHeader();
    LoadFooter();
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
}), window.onclick = function (o) {
    if (!o.target.matches(".dropbtn")) {
        var e, n = document.getElementsByClassName("dropdown-content");
        for (e = 0; e < n.length; e++) {
            var t = n[e];
            t.classList.contains("show") && t.classList.remove("show")
        }
    }
};