    $(document).ready(function () {
      function showRandomSlide() {
        var slides = $('.MV_main_slider_slide');
        var randomIndex = Math.floor(Math.random() * slides.length);
        slides.hide();
        $(slides[randomIndex]).show();
      }
      showRandomSlide();
      $('#slider_video1').hide();
      $('#MV_volium_button1').hide();
      $('.Mv_Apply_layer_leanie').show();
      $('#MV_reply_button1').hide();
      setTimeout(function () {
        $('.Mv_Apply_layer_leanie').fadeOut(600, function () {
          $('#slider_video1').fadeIn(600);
          $('#MV_volium_button1').fadeIn(600);
        });
      }, 5000);
      $('#slider_video1').on('ended', function () {
        $(this).hide();
        $('#MV_volium_button1').hide();
        $('.Mv_Apply_layer_leanie').show();
        $('#MV_reply_button1').show();
        $(this).get(0).currentTime = 0;
        $(this).get(0).muted = true;
        $('#MV_volium_button1').removeClass('ri-volume-up-line').addClass('ri-volume-mute-line');
      });
      $('#MV_reply_button1').click(function () {
        $(this).hide();
        $('.Mv_Apply_layer_leanie').hide();
        var video = $('#slider_video1');
        video.show().get(0).play();
        video.get(0).muted = true;
        $('#MV_volium_button1')
          .removeClass('ri-volume-up-line')
          .addClass('ri-volume-mute-line')
          .show();
      });
      $('#MV_volium_button1').click(function () {
        var video = $('#slider_video1')[0];
        if (video.muted) {
          video.muted = false;
          $(this).hide();
          $(this).removeClass('ri-volume-mute-line').addClass('ri-volume-up-line').show();
        } else {
          video.muted = true;
          $(this).hide();
          $(this).removeClass('ri-volume-up-line').addClass('ri-volume-mute-line').show();
        }
      });
    });



  $(document).ready(function () {
    // Initialize Swiper for main slider
    var mainSlider = new Swiper('#MV_smal_slider', {
      slidesPerView: 2, // Default for mobile
      spaceBetween: 30,
      loop: false,
      autoplay: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        992: {
          slidesPerView: 5,
          spaceBetween: 30
        }
      }
    });
  });


  $(document).ready(function () {
    $('.MV_splide__slide').hover(
      function () {
        $(this).find('.MV_small_slider_pop').css({
          'visibility': 'visible',
          'height': '168%',
          'width': '150%',
          'transition': 'all 0.3s ease',
          'opacity': '1',
          'z-index': '999',
          'position': 'absolute',
          'top': '0',
          'left': '0',
          'background': '#1a1d1f'
        });
      },
      function () {
        $(this).find('.MV_small_slider_pop').css({
          'visibility': 'hidden',
          'height': '0%',
          'width': '100%',
          'transition': 'all 0.3s ease',
          'opacity': '0',
          'z-index': '-1'
        });
      }
    );
  });
