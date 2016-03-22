'use strict';
var kunMini2016 = window.kunMini2016 || {}; //global namespace for YOUR kunMini2016, Please change kunMini2016 to your kunMini2016 name

var isMobile = {
    isAndroid: function () {
        return navigator.userAgent.match(/Android/i);
    },
    isBlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    isiOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    isOpera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    isWindows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.isAndroid() || isMobile.isBlackBerry() || isMobile.isiOS() || isMobile.isOpera() || isMobile.isWindows());
    }
};

(function($) {
    kunMini2016.Global = {
        init: function() { //initialization code goes here
            $.support.cors = true;
            this.initFormElements();
            this.initSliderCollectionVR();
            this.initPopupYT();
            this.initMenuMobile();
        },

        initMenuMobile: function() {
            $('.btn-menu-mob').on('click',function(){
                if (!$('.main-nav').hasClass('show')) {
                    $('.main-nav').addClass('show').slideDown(500);
                }
                else{
                    $('.main-nav').removeClass('show').slideUp(500);
                }
            });

            $( window ).resize(function() {
                if($(window).width() > 676){
                    $('.main-nav').show();
                }
            });
        },
        initPopupYT: function() {
            $('.click-video').on('click', function(){
                var x = $(this).data('src');
                $.magnificPopup.open({
                  items: {
                         src: 'http://www.youtube.com/watch?v='+ x
                     },
                  type: 'iframe',
                  iframe: {
                            markup: '<div class="mfp-iframe-scaler">'+
                                    '<div class="mfp-close"></div>'+
                                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                                    '</div>',
                        patterns: {
                            youtube: {
                                  index: 'youtube.com/',
                                  id: 'v=',
                                  src: '//www.youtube.com/embed/%id%?autoplay=1'
                                }
                             },
                             srcAction: 'iframe_src',
                     }
                })
            })
        },
        initFormElements: function() {
            $('input, textarea').placeholder(); //enable placeholder support for all browsers

            //Radio Wrapper
            $(".radio-wrapper .input-radio").each(function() {
                if ($(this).is(":checked")) {
                    $('.input-radio[name="' + $(this).attr('name') + '"]').parents(".radio-selected").removeClass("radio-selected");
                    $(this).parents('.radio-wrapper').addClass("radio-selected");
                }
            });

            $(document).on('change', ".radio-wrapper .input-radio", function() {

                $('input[name="' + $(this).attr('name') + '"]').each(function() {
                    if ($(this).not(':checked')) {
                        $(this).parent().removeClass("radio-selected");
                    }
                });

                if ($(this).is(":checked")) {
                    $(this).parents('.radio-wrapper').addClass("radio-selected");
                }
            });

            //Checkbox Wrapper
            $('.checkbox-wrapper .input-checkbox').each(function() {
                if ($(this).is(':checked')) {
                    $(this).parents('.checkbox-wrapper').addClass('checked');
                }
            });

            $(document).on('click', '.checkbox-wrapper .input-checkbox', function() {

                if ($(this).is(':checked')) {
                    $(this).parents('.checkbox-wrapper').addClass('checked');
                } else if ($(this).not(':checked')) {
                    $(this).parents('.checkbox-wrapper').removeClass('checked');
                }
            });

            //Select Wrapper
            $('.select-wrapper').each(function() {
                if ($(this).find('span').length <= 0) {
                    $(this).prepend('<span>' + $(this).find('select option:selected').text() + '</span>');
                }
            });

            $(document).on('change', '.select-wrapper select', function() {
                $(this).prev('span').replaceWith('<span>' + $(this).find('option:selected').text() + '</span>');
            });
        },

        initSliderCollectionVR: function () {
            var divContent = $('.wrap-collect-toy');

                divContent.find('.list-collection').slick({
                    infinite: true,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    responsive: [
                        /*{
                          breakpoint: 1024,
                          settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true
                          }
                        },*/
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 1
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
        }
    };
})(jQuery);

$(document).ready(function($) {
    kunMini2016.Global.init();
});