(function ($, root, undefined) {
	
	$(function () {
		
		'use strict';
			
		// Fade between pages
			
			$(document).ready(function() {
			
				$('body').css('display', 'none');
				$('body').css('opacity', 0);
				$('.nav-back, .nav-menu').css('opacity', 0);	
			
				setTimeout(function() {
					$('body')
						.css('display', 'block')
						.animate({ top: 0, opacity: 1 }, 300);
				}, 0);
			
			    setTimeout(function(){
					$('.nav-back, .nav-menu').animate({ opacity: 1 }, 300);
			    }, 300);
			
			    $('.transition').click(function(event){
			        event.preventDefault();
			        var addressValue = $(this).attr('href');
					$('.nav-back, .nav-menu').css('top', 0);	

			        $('body')
			        	.animate({ opacity: 0 }, 300, function(){ 
				        redirectPage(addressValue);
				        }); 
			    });
			         
			    function redirectPage(addressValue) {
			        document.location.href = addressValue;
			    }
			});

			// Firefox fix
			$(window).unload(function () { $(window).unbind('unload'); });
			// iOS Safari fix
			$(window).bind('pageshow', function(event) {
				if (event.originalEvent.persisted) {
					window.location.reload() 
				}
			});			
			
		// Key Setup

		    $(document).keyup(function(e) { 
		        if (e.keyCode == 27) { // esc keycode
		            $('body').toggleClass('menu-open');
		        }
		    });
		
		// Kill hashtag
	
			$('a.nav, a.top, a.blank').click(function(e) {
			    e.preventDefault();
			    // Do your stuff
			});

	    // Project Drawer

			$('.open-menu').click(function() {
				$('body').toggleClass('menu-open');
			    });
			});

			$(document).ready(function() {
				$('main').on('click', function(e) {
					console.log(e);
					console.log (e.srcElement);
					console.log(e.target);

					if ( e.target.className == 'open-menu') {
					  $('body').addClass('menu-open');
					} else {
					  $('body').removeClass('menu-open');
					}				
				});
			});
			
		// Logo Revealer

			$(function(){
			    $(window).scroll(function() {
			        var scroll = $(window).scrollTop(); // how many pixels you've scrolled
			        var os = $('body').offset().top + 0; // pixels to the top of slider
			        var ht = $('main').height(); // height of div1 in pixels
			        // if you've scrolled further than the top of div1 plus it's height
			        if(scroll > os + ht){
			            $('.nav-down').addClass('bg');
			            $('.logo').addClass('show');
					} else {
			            $('.nav-down').removeClass('bg');
			            $('.logo').removeClass('show');
			        }
			    });
			});
		
		// // SVG Color Changer

		// 	$(function(){
		// 	    $(window).scroll(function() {
		// 	        var scroll = $(window).scrollTop(); // how many pixels you've scrolled
		// 	        var os = $('.image-slider').offset().top - 20; // pixels to the top of slider
		// 	        var ht = $('.image-slider').height(); // height of div1 in pixels
		// 	        // if you've scrolled further than the top of div1 plus it's height
		// 	        if(scroll > os + ht){
		// 	            $('.showMenu').addClass('boom');
		// 			} else {
		// 	            $('.showMenu').removeClass('boom');
		// 	        }
		// 	    });
		// 	});

		// Magic Dots
		
			setInterval( function() {
				var par = $('.image-slider .slide0').parent();
				if ($(par).hasClass("active")) {
					$(".slider-dots .owl-dot").css('opacity', '0');
				}
				else {
					$(".slider-dots .owl-dot").css('opacity', '1');
				}
			}, 0);


		// Owl Images

			$(document).ready(function(){

				$('.owl-carousel').owlCarousel({
				    loop:true,
				    nav:false,
				    autoplay:false,
					mouseDrag: false,
					pullDrag: false,
					touchDrag: false,
					navText: false,
					dotsContainer: '.slider-dots',
				    animateIn: 'fadeIn',
				    animateOut: 'fadeOut',
					// autoplayTimeout:6000,
			        smartSpeed: 500,
				    items: 1			
				})
	
				// Custom Navigation Events
				var owl = $('.owl-carousel');
				owl.owlCarousel();
	
				// Go to the next item
				$('.item').click(function() {
					
					setTimeout(function() {
					    owl.trigger('next.owl.carousel');
					}, 300);
	
				})
	
				$(".disable-owl-swipe").on("touchstart mousedown", function(e) {
				    // Prevent carousel swipe
				    e.stopPropagation();
				})
				
			});

			$(document).keydown( function(eventObject) {
				if(eventObject.which==37) {//left arrow
					$('.image-slider .owl-prev').click();//emulates click on prev button 
					} else if(eventObject.which==39) {//right arrow
					$('.image-slider .owl-next').click();//emulates click on next button
				}
			} );

		// Smooth scroll

			$(document).ready(function(){
				$('a[href^="#"]').on('click',function (e) {
				    e.preventDefault();
			
				    var target = this.hash;
				    var $target = $(target);
			
				    setTimeout(function(){
					    $('html, body').stop().animate({
					        'scrollTop': $target.offset().top
					        }, 700, 'easeInOutCubic', function () {
								return false;
						        window.location.hash = target;
					    });
				    }, 350);
				});
			});

		// Shuffle on mouseover

			$(document).ready(function() {

			  $(".box img.fade").mouseover(function() {
				  $(this).toggleClass("transparent");
				});

			});			

		// Fade out Intro on scroll

			$(window).scroll(function () {
			    var scrollTop = $(window).scrollTop();
			    var height = $(window).height();
			    $('.intro').css({
			        'opacity': ((height - scrollTop) / height)
			    });
			});

		// Active selector

			$(function(){
			    // this will get the full URL at the address bar
			    var url = window.location.href; 

			    // passes on every "a" tag 
			    $(".nav-menu ul.showMenu").each(function() {
			            // checks if its the same on the address bar
			        if(url == (this.href)) { 
			            $(this).closest("li").addClass("active");
			        }
			    });
			});

		// Fade in images on scroll
		
			$(window).load(function() {
				window.sr = ScrollReveal();
				sr.reveal('.reveal', { 
					scale: 1,
					duration: 1000,
					delay: 100,
					distance: '50px',
					enter: 'right',
					viewFactor: 0.1,
					opacity: 0,
					mobile: false,
					viewOffset: { top: -200, bottom: -100 },
					easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
					reset: true,
					useDelay: 'once'
					});
			})

			
})(jQuery, this);

	