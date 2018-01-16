// Owl Images

$(document).ready(function() {

  var owl1 = $('.gallery1');
  owl1.owlCarousel({
    loop: true,
    nav: false,
    autoplay: false,
    dotsContainer: '.slider-dots',
    autoplayTimeout: 4000,
    smartSpeed: 400,
    items: 1
  });

  var owl2 = $('.gallery2');
  owl2.owlCarousel({
    loop: true,
    margin: 20,
    nav: false,
    dotsContainer: '.slider-dots',
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      1024: {
        items: 3
      },
      1681: {
        items: 5
      }
    }
  });

  var owl3 = $('.gallery3');
  owl3.owlCarousel({
    loop: true,
    autoplaySpeed: 500, // 1000 millisekunder blir 1 sekund
    autoplayTimeout: 1500, // 1000 millisekunder blir 1 sekund
    dots: false,
    mouseDrag: false,
    touchDrag: false,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    items: 1,
    responsive: {
      0: {
        autoplay: false
      },
      768: {
        autoplay: true
      }
    }
  });

  // Tap to show next
  $('.gallery3 .item').on('click', function (e) {
    owl3.trigger('next.owl.carousel');
  });

  // Stop autoplay
  $('.gallery3 .item').on('mouseover', function(e) {
    owl3.trigger('stop.owl.autoplay');
  });

  $('.gallery3 .item').on('mouseleave', function(e) {
    owl3.trigger('play.owl.autoplay');
  });

  var owl4 = $('.owl-carousel');
  owl4.owlCarousel({
    items: 1,
    loop: false,
    dots: false,
    URLhashListener: true,
    startPosition: 'URLHash',
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    mouseDrag: false,
    touchDrag: false,
    responsive: {
      0: {
        autoplay: true,
        autoplaySpeed: 3000, // 1000 millisekunder blir 1 sekund
        autoplayTimeout: 3000 // 1000 millisekunder blir 1 sekund
      },
      768: {
        autoplay: false
      }
    }
  });

  // Hover på link dimmer carousel
  $(".projectList__link, .projectList__link--last").hover(
    function () {
      $('.mellomting .inner').addClass("active");
    },
    function () {
      $('.mellomting .inner').removeClass("active");
    }
  );

  // Hover bytter til aktiv slide
  $(document).delay('500').on('mouseover', '.projectList__link', function() {
    n = $(this).index();
    // console.log(n)
    var owl = $('.mellomting .inner .owl-carousel');
    owl.trigger('to.owl.carousel', n);
  });

  // Lytt for endringer i owl carusell
  $(function() {
    $('.projectList__link:first-child').addClass('active');
  });

  owl4.on('changed.owl.carousel', function(event) {
    // Fjern active class på alle li elementer
    $('.projectList__link').removeClass('active');
    $('.projectList__link:first-child').removeClass('active');
    // Finn ut index (plassering) på gjeldende slider-element
    var currentItem = event.item.index;
    console.log(currentItem);
    // Sett på activ class på li element med samme index som karusell indexen
    $('.projectList__link').eq(currentItem).addClass('active');
  })

  // Go to the next item
  $('.gallery1 .item').click(function() {
    setTimeout(function() {
      owl1.trigger('next.owl.carousel');
    }, 300);
  });

  // Go to the next item
  $('.gallery2 .item').click(function() {
    setTimeout(function() {
      owl2.trigger('next.owl.carousel');
    }, 300);
  });

  // Go to the next item
  $('.gallery3 .item').click(function() {
    setTimeout(function() {
      owl2.trigger('next.owl.carousel');
    }, 300);
  });

  // Go to the next item
  $('.inner .item').click(function() {
    setTimeout(function() {
      owl4.trigger('next.owl.carousel');
    }, 500);
  });

  // $('.disable-owl-swipe').on('touchstart mousedown', function(e) {
  //     // Prevent carousel swipe
  //     e.stopPropagation();
  // });

});
