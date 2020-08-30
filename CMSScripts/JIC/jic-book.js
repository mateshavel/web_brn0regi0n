// Change button text depending on collapsed state
$('.partial-collapse').on('shown.bs.collapse', function () {
    var btn = $(this).parent().find('.toolbox-readmore a');
    btn.text(btn.data('btntext-hide')).addClass('btn-hide');
}).on('hidden.bs.collapse', function () {
    var btn = $(this).parent().find('.toolbox-readmore a');
    btn.text(btn.data('btntext-show')).removeClass('btn-hide');
    var hash = btn[0].hash;
    scrollToAnchor(hash, 90);
}).on('show.bs.collapse', function () {
    var btn = $(this).parent().find('.toolbox-readmore a');
    var hash = btn[0].hash;
    scrollToAnchor(hash, 90);
});

// Prevent default click behaviour for Readmore buttons
$('.toolbox-readmore').not(".no-collapse").find('a').on('click', function (ev) {
   ev.preventDefault();
   //var hash = this.hash;
   //scrollToAnchor(hash, 90);
});

// Bootstrap3 responsive affix
var offset = $('.header').height() + $('.page-header').height();
$('.main-menu-affix').affix({
    offset: { top: offset }
});

// Bootstrap3 scrollspy
$('body').scrollspy({
    target: '.main-menu-affix',
    offset: 50
});

// Smoothscroll
$('.main-menu-affix .nav a').on('click', function(ev){
    ev.preventDefault();
    var hash = this.hash;
    scrollToAnchor(hash, 20);
});

// Close mobile when clicked on a menu item and scroll to anchor
$('.header-menu a.link-scroll').on('click', function (ev) {
    ev.preventDefault();
    var hash = this.hash;
    scrollToAnchor(hash, 20);
    if($( window ).width() < 992) {
        $('.mobile-icon').trigger('click');
    }
});

// set active class to show first submenu on pageload
/*
$(function(){
   $('.main-menu-affix .sidebar-nav > li:nth-child(2)').addClass('active');
});*/

/* Detect mobile devices */
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    $('.toolbox-readmore a').addClass('no-transition');
    $('.header-menu a').addClass('no-transition');
}

// Youtube video player
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    var url = $('#player').attr('data-video-url');
    player = new YT.Player('player', {
        height: '345',
        //width: '100%',
        videoId: url,
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'autohide': 1,
            'wmode': 'transparent',
            'rel': 0,
            'loop': 0,
            'fs': 0,
            'showinfo': 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    // Turn off sound
    // event.target.mute();
    // Play video
    // event.target.playVideo();
    $('.banner-image-block img').on('click', function (ev) {
       ev.preventDefault();
       $(this).fadeOut();
       // Play video
       event.target.playVideo();
    });
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        //setTimeout(stopVideo, 6000);
        done = true;
    }
    // Detect when video has ended
    if (event.data == YT.PlayerState.ENDED) {
        $('.banner-image-block img').fadeIn();
    }
}
function stopVideo() {
    player.stopVideo();
}

function scrollToAnchor(hash, offset) {
    $('html, body').animate({
        scrollTop: $(hash).offset().top - offset
    }, 500, function(){
        // when done, add hash to url
        // (default click behaviour)
        // window.location.hash = hash;
    });
}