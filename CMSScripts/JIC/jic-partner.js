$(window).on("load", function () {
    var e = $(window).width(), n = 1280, t = 1080;
    e > 640 ? (n = 1280, t = 1080) : (n = 2e3, t = 1480), $("#main-slider-1").sliderPro({
        width: 2560,
        height: n,
        fade: !0,
        arrows: !1,
        buttons: !1,
        waitForLayers: !0,
        autoplay: !0,
        autoplayDelay: 8e3,
        autoplayOnHover: "pause",
        autoScaleLayers: !1
    });
    var i = $("#main-slider-1").data("sliderPro");
    $(".main-slider-button-prev").on("click", function () {
        return i.previousSlide(), !1
    }), $(".main-slider-button-next").on("click", function () {
        return i.nextSlide(), !1
    }), $("#main-slider-2").sliderPro({
        width: 2560,
        height: t,
        fade: !0,
        arrows: !1,
        buttons: !1,
        waitForLayers: !0,
        autoplay: !1,
        autoplayDelay: 8e3,
        autoplayOnHover: "pause",
        autoScaleLayers: !1
    });

});