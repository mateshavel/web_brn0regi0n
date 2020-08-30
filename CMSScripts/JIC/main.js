$width = $(window).width();
$initheight = $(document).height();

// Insert placeholder to Search webpart
$(".tbSearch").attr('placeholder', 'Search');
$(".tbNewsletter").attr('placeholder', 'Your E-mail');

function separator() {
    if ($('.separator').length) {
        var $content = $(window).width();
        var $separator = $('.container').width();
        var width = (($content - $separator) / 2) + $separator - 140;
        $('.separator').css('width', width);
    }
}

function banner() {
    if ($('.banner').length) {
        var $content = $(window).width();
        var $banner = $('.banner .container').width();
        var width = (($content - $banner) / 2) + $banner;
        $('.banner-content').css('width', width - (($content - $banner) / 2) - 60);
        if ($content < 975) width = 'auto';
        $('.banner .banner-image-block').css('width', width);
        if ($('.banner-image-homepage').length) {
            var homewidth = width + ((width / 100) * 4.3257);
            if (homewidth > 1596) {
                homewidth = width + ((1596 / 100) * 4.3257);
                $('.banner .banner-image-homepage').css('padding-left', width - 1596 );
            } else {
                $('.banner .banner-image-homepage').css('padding-left', '');
            }

            $('.banner .banner-image-homepage').css('width', homewidth);
            $('.banner-content-in h1').css('height', $('.banner-image-homepage img').height());
        }
    }
}

function threeblocks() {
    var height = 0;
    var block;
    setTimeout(function(){
        $('.js-item').each(function() {
            var actualheight = $(this).height();
            var actualblock = $(this).closest('.js-three-blocks').data('block');
            if (actualheight > height) height = actualheight;
            if ($width <= 974) {
                if (block != actualblock) {
                    height = actualheight;
                }
            }
            block = actualblock;
            $(this).closest('.items').css('height', height);
        });
    }, 500);
}

function newsshow() {
    if ($('.js-news-all.news-show').length) {
        $('.js-news-all').closest('.news-button').slideUp();
        var $height = $('.news .container').height();
        $('.js-news .news-in').css('height', $height);
        $('.js-news .news-in').addClass('news-shadow-hide');
    }
}

function searchshow() {
    if ($('.js-search-all.search-show').length) {
        $('.js-search-all').closest('.search-button').slideUp();
        var $height = $('.search-result .container').height();
        $('.js-search .search-in').css('height', $height);
        $('.js-search .search-in').addClass('search-shadow-hide');
    }
}

function imagecalculation(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}
function imageopacitycalculation(value) {
    var ioc = (value - 1200) / 500;
    if (ioc <= 0) ioc = 0;
    if (ioc >= 1) ioc = 1;
    return ioc;
}

/*function imageset() {
	$scrollPos = $(document).scrollTop();
  $carteHeight = $carteWrap.height();
  $carteWidth = $carteWrap.width();
  var
		val = $carteTop - ($scrollPos + $height),
		max = $carteHeight + $height,
		p = imagecalculation( val, 0, max, 0, 150 ),
    opacity = imageopacitycalculation($carteWidth),
		$image = null,
    random = 0;


	$images.each(function (i, image) {
    $image = $(image);
		//console.log("height="+$(document).height()+" block="+$carteHeight+" image="+(i+1)+" position"+(p * $image.data("speed")));
		var calculatetransform = p * $image.data("speed");
    $image.css("transform", "translateY(" + (calculatetransform) + "%)");
    var position = ((($width - 1170) / 2) - 350) / ($width / 100) - random;
    random = random + 4;
    if (random == 20) random = 0;
    if (position <= 0) position = 0;
    if ($image.data("position") == "left") {
      $image.css("left", position + "%");
    } else {
      $image.css("right", position + "%");
    }
    $image.css("opacity", opacity);
	});
}*/

function imageinit() {
    $carteWrap = $(".content");
    $carteHeight = $carteWrap.height();
    $carteTop = $carteWrap.position().top;
    $images = $(".image-content", $carteWrap);
    $height = $(window).height();

    this.$images.each(function (i, image) {
        $image = $(image);
        if ($carteHeight < 1300 && i > 2) {
            $image.css("display", "none");
        } else {
            $image.css("display", "");
        }
        $image.css("margin-top", (500 + (i * 200) + ((($carteHeight - 800) / 8) * i)) + "px");
    });
    imageset();
}

function YoutubeIframe() {
    var height = (($('.videoBlock').innerWidth() / 100) * 56.25); // 56.25 = 16:9
    $('.video').css({ width: $('.videoBlock').innerWidth() + 'px', height: height + 'px', top: -((height - 300) / 2)});
}

separator();



$("document").ready(function(){
    banner();
    threeblocks();
    //imageinit();
    YoutubeIframe();

    //STICKY
    var sticky = new Sticky('[data-sticky]');

    // User logged-in menu
    $('.show-logged-in-menu').on('click', function (ev) {
        ev.preventDefault();
        $('#logged-in-menu').toggleClass('collapse');
    });

    // Hammer lib
    // See: http://hammerjs.github.io
    if($('#carousel').length !== 0) {
        $('#carousel').hammer({}).bind("swipe", function(){
            // listen to events...
        }).on("swiperight", function(ev) {
            moveToSelected('prev');

            if($( "#carousel div" ).first().hasClass( "selected" )){
                $("#prev").addClass("color-gray")
            } else {
                $("#next").removeClass("color-gray")
            }
        }).on("swipeleft", function(ev) {
            moveToSelected('next');

            if($( "#carousel div" ).last().hasClass( "selected" )){
                $("#next").addClass("color-gray")
            } else {
                $("#prev").removeClass("color-gray")
            }
        });
    }

    if ($('#carouselUSP').length !== 0) {
        console.log('ass')
        $('#carouselUSP').hammer({}).bind("swipe", function () {
            // listen to events...
        }).on("swiperight", function (ev) {
            moveToSelectedUSP('prev');

            if ($("#carouselUSP div").first().hasClass("selected")) {
                $("#prevUSP").addClass("color-gray")
            } else {
                $("#nextUSP").removeClass("color-gray")
            }
        }).on("swipeleft", function (ev) {
            moveToSelectedUSP('next');

            if ($("#carouselUSP div").last().hasClass("selected")) {
                $("#nextUSP").addClass("color-gray")
            } else {
                $("#prevUSP").removeClass("color-gray")
            }
        });
    }

    $('.js-three-blocks .js-item').hover(
        function () {
            var hoveritem = $(this).data('item');
            $(this).parent().find('.js-item').each(function() {
                var $this = $(this);
                var data = $this.data('item');
                if (hoveritem == data) {
                    $this.css('z-index', '50');
                } else {
                    $this.css('z-index', data*10);
                }
            });
        }, function () {
            $(this).parent().find('.js-item').each(function() {
                var $this = $(this);
                var data = $this.data('item');
                $this.css('z-index', data*10);
            });
        }
    );


    $('.js-three-blocks .js-item').hover(
        function () {
            var hoveritem = $(this).data('item');
            $(this).parent().find('.js-item').each(function() {
                var $this = $(this);
                var data = $this.data('item');
                if (hoveritem == data) {
                    $this.css('z-index', '50');
                } else {
                    $this.css('z-index', data*10);
                }
            });
        }, function () {
            $(this).parent().find('.js-item').each(function() {
                var $this = $(this);
                var data = $this.data('item');
                $this.css('z-index', data*10);
            });
        }
    );

    $('.js-news-all').click(function () {
        $('.js-news-all').addClass('news-show');
        newsshow();
    });

    $('.js-search-all').click(function () {
        $('.js-search-all').addClass('search-show');
        searchshow();
    });

    $('.modal-btn').click(function () {
        var data = $(this).data('item');
        var position = (($(window).height() - 200) / 2);
        if (position <= 0) position = 0;
        $('.' + data).css('padding-top', position + "px");
        $('.' + data).show();
        $('body').addClass('body-modal');
        return false;
    });

    $('.modal .close').click(function () {
        $(this).closest('.modal').hide();
        $('body').removeClass('body-modal');
    });

    // Menu mobile
    $('.mobile-icon').click(function () {
        $(this).toggleClass('mobile-open');
        $('.header-block').toggleClass('header-block-open');
        $('body').toggleClass('mobile-scroll-off');
    });
});

$(window).scroll(function() {
    //imageset();
});

$(window).on('resize', function () {
    $width = $(window).width();
    $initheight = $(document).height();
    banner();
    threeblocks();
    separator();
    newsshow();
    searchshow();
    // imageset();
    YoutubeIframe();
});

//Carousel
function moveToSelected(element) {

    if (element == "next") {
        var selected = $(".selected").next();
    } else if (element == "prev") {
        var selected = $(".selected").prev();
    } else {
        var selected = element;
    }

    var next = $(selected).next();
    var prev = $(selected).prev();
    var prevSecond = $(prev).prev();
    var nextSecond = $(next).next();
    $(selected).removeClass().addClass("selected");
    $(prev).removeClass().addClass("prev");
    $(next).removeClass().addClass("next");
    $(nextSecond).removeClass().addClass("nextRightSecond");
    $(prevSecond).removeClass().addClass("prevLeftSecond");
    $(nextSecond).nextAll().removeClass().addClass('hideRight');
    $(prevSecond).prevAll().removeClass().addClass('hideLeft');
}

function moveToSelectedUSP(element) {

    if (element == "next") {
        var selected = $(".selected").next();
    } else if (element == "prev") {
        var selected = $(".selected").prev();
    } else {
        var selected = element;
    }

    var next = $(selected).next();
    var prev = $(selected).prev();
    var prevSecond = $(prev).prev();
    var nextSecond = $(next).next();
    $(selected).removeClass().addClass("selected");
    $(prev).removeClass().addClass("prev");
    $(next).removeClass().addClass("next");
    $(nextSecond).removeClass().addClass("nextRightSecond");
    $(prevSecond).removeClass().addClass("prevLeftSecond");
    $(nextSecond).nextAll().removeClass().addClass('hideRight');
    $(prevSecond).prevAll().removeClass().addClass('hideLeft');
}

// Keyboard events
/*$(document).keydown(function(e) {
 switch(e.which) {
 case 37: // left
 moveToSelected('prev');
 break;

 case 39: // right
 moveToSelected('next');
 break;

 default: return;
 }
 e.preventDefault();
 });*/

$('#carousel div').click(function() {
    moveToSelected($(this).attr('class'));

    if($( "#carousel div" ).first().hasClass( "selected" )){
        $("#prev").addClass("color-gray")
    } else {
        $("#prev").removeClass("color-gray")
    }
    if($( "#carousel div" ).last().hasClass( "selected" )){
        $("#next").addClass("color-gray")
    } else {
        $("#next").removeClass("color-gray")
    }
});

$('#prev').click(function() {
    moveToSelected('prev');

    if($( "#carousel div" ).first().hasClass( "selected" )){
        $("#prev").addClass("color-gray")
    } else {
        $("#next").removeClass("color-gray")
    }
});

$('#next').click(function() {
    moveToSelected('next');

    if($( "#carousel div" ).last().hasClass( "selected" )){
        $(this).addClass("color-gray")
    } else {
        $("#prev").removeClass("color-gray")
    }
});


$('#carouselUSP div').click(function () {
    moveToSelectedUSP($(this).attr('class'));

    if ($("#carouselUSP div").first().hasClass("selected")) {
        $("#prevUSP").addClass("color-gray")
    } else {
        $("#prevUSP").removeClass("color-gray")
    }
    if ($("#carouselUSP div").last().hasClass("selected")) {
        $("#nextUSP").addClass("color-gray")
    } else {
        $("#nextUSP").removeClass("color-gray")
    }
});

$('#prevUSP').click(function () {
    moveToSelectedUSP('prev');

    if ($("#carouselUSP div").first().hasClass("selected")) {
        $("#prevUSP").addClass("color-gray")
    } else {
        $("#nextUSP").removeClass("color-gray")
    }
});

$('#nextUSP').click(function () {
    moveToSelectedUSP('next');

    if ($("#carouselUSP div").last().hasClass("selected")) {
        $(this).addClass("color-gray")
    } else {
        $("#prevUSP").removeClass("color-gray")
    }
});