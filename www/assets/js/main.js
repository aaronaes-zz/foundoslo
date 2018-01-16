$(document).ready(function() {

  'use strict';

  // Fade between pages
  $(document).ready(function() {
    $('main').css('display', 'none');
    $('main').css('opacity', 0);

    setTimeout(function() {
      $('main')
        .css('display', 'block')
        .animate({
          opacity: 1
        }, 400);
    }, 400);

    $('.transition').click(function(event) {
      var addressValue = $(this).attr('href');
      $('main')
        .animate({
          opacity: 0
        }, 400, function() {
          redirectPage(addressValue);
        });
    });

    function redirectPage(addressValue) {
      document.location.href = addressValue;
    }
  });

  // Firefox fix
  $(window).unload(function() {
    $(window).unbind('unload');
  });

  // iOS Safari fix
  $(window).bind('pageshow', function(event) {
    if (event.originalEvent.persisted) {
      window.location.reload();
    }
  });

  // Key Setup
  $(document).keyup(function(e) {
    if (e.keyCode == 27) { // esc keycode
      $('body').removeClass('menu-open');
    }
  });

  // Kill hashtag
  $('a.nav, a.top, a.blank').click(function(e) {
    e.preventDefault();
    // Do your stuff
  });

  // About Drawer
  $('.open-about').click(function() {
    $('body').toggleClass('about-open');
  });

  // Work Drawer
  $('.open-menu').click(function() {
    $('body').toggleClass('menu-open');
  });
  $('.logo').click(function() {
    $('body').toggleClass('menu-open');
  });

  // $('main').on('click', function(e) {
  //   console.log(e);
  //   console.log (e.srcElement);
  //   console.log(e.target);
  //
  //   if ( e.target.className == 'open-menu') {
  //     $('body').addClass('menu-open');
  //   } else {
  //     $('body').removeClass('menu-open');
  //   }
  // });

  // // Nav Revealer
  // $(function() {
  //   $(window).scroll(function() {
  //     var scroll = $(window).scrollTop(); // how many pixels you've scrolled
  //     var os = $('body').offset().top + 0; // pixels to the top of slider
  //     var ht = $('.intro').height(); // height of div1 in pixels
  //     // if you've scrolled further than the top of div1 plus it's height
  //     if (scroll > os + ht) {
  //       $('header').addClass('show');
  //     } else {
  //       $('header').removeClass('show');
  //     }
  //   });
  // });

  // Magic Dots
  setInterval(function() {
    var par = $('.image-slider .slide0').parent();
    if ($(par).hasClass("active")) {
      $(".slider-dots .owl-dot").css('opacity', '0');
    } else {
      $(".slider-dots .owl-dot").css('opacity', '1');
    }
  }, 0);

  $(document).keydown(function(eventObject) {
    if (eventObject.which == 37) { //left arrow
      $('.image-slider .owl-prev').click(); //emulates click on prev button
    } else if (eventObject.which == 39) { //right arrow
      $('.image-slider .owl-next').click(); //emulates click on next button
    }
  });

  // Shuffle on mouseover
  $(document).ready(function() {
    $("img.toggle").mouseover(function() {
      $(this).toggleClass("transparent");
    });
  });


  // Fade out Intro on scroll
  $(window).scroll(function(){
      $(".fade-up").css("opacity", 1 - $(window).scrollTop() / ($('.fade-up').height() - 10));
  });

  // Active selector
  $(function() {
    // this will get the full URL at the address bar
    var url = window.location.href;

    // passes on every "a" tag
    $(".nav-menu ul.showMenu").each(function() {
      // checks if its the same on the address bar
      if (url == (this.href)) {
        $(this).closest("li").addClass("active");
      }
    });
  });

  // Fade in images on scroll paret 1

  $('.imageBlocks > div').slice(1).addClass('rvl');

  // Fade in images on scroll
  $(window).load(function() {
    window.sr = ScrollReveal();
    sr.reveal('.reveal', {
      scale: 1,
      duration: 800,
      delay: 800,
      distance: '50px',
      viewFactor: 0.1,
      easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
      opacity: 0,
      mobile: false,
      viewOffset: {
        top: 0,
        bottom: 0
      },
      reset: false
    });
  });

});
