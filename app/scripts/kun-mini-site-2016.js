'use strict';
var kunMini2016 = window.kunMini2016 || {}; //global namespace for YOUR kunMini2016, Please change kunMini2016 to your kunMini2016 name

var isMobile = {
    isAndroid: function() {
        return navigator.userAgent.match(/Android/i);
    },
    isBlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    isiOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    isOpera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    isWindows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
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
            this.initSliderTrungIphone();
            this.initPopupListLive();
            this.initShowHideTnc();
            this.initPopupImg();
            /*this.initModalNotice('Xong rồi nhaz');*/
        },

        initMenuMobile: function() {
            $('.btn-menu-mob').on('click', function() {
                if (!$('.main-nav').hasClass('show')) {
                    $('.main-nav').addClass('show').slideDown(500);
                } else {
                    $('.main-nav').removeClass('show').slideUp(500);
                }
            });
        },

        initPopupListLive: function() {
            $('.box-img img').on('click', function() {
                // alert('s')
                $.magnificPopup.open({
                    items: {
                        src: '#popup-live'
                    },
                    type: 'inline',
                    mainClass: 'popup-live'
                });
            });
        },

        initPopupYT: function() {
            $('.click-video').on('click', function() {
                var x = $(this).data('src');
                $.magnificPopup.open({
                    items: {
                        src: 'http://www.youtube.com/watch?v=' + x
                    },
                    type: 'iframe',
                    iframe: {
                        markup: '<div class="mfp-iframe-scaler" id="iframe-yt">' +
                            '<div class="mfp-close"></div>' +
                            '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
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
                });
            });
        },

        initPopupImg: function() {
            $('.image-link').each(function() {
                var _this = $(this);
                _this.off('click').on('click', function(e) {
                    e.preventDefault();
                    var contentInfo = $('<div class="wrap">' +
                        '<img src="" />' +
                        '<p>Người may mắn trúng giải <b>thứ 1</b></p>' +
                        '</div>');
                    var tempContent = null;

                    $('#popup-last-events').find('.mCSB_container').html('');

                    $(_this.attr('data-src-img').split(',')).each(function(idx, elm) {
                        tempContent = contentInfo.clone();
                        tempContent.appendTo($('#popup-last-events').find('.mCSB_container'));
                        tempContent.find('img').attr('src', elm);
                        tempContent.find('p').html(_this.attr('data-title-img').split(',')[idx]);
                    });

                    $('#popup-last-events').find('h3').removeClass().addClass('week-' + $(this).attr('data-week'));
                    $.magnificPopup.open({
                        items: {
                            src: '#popup-last-events'
                        },
                        type: 'inline',
                        mainClass: 'popup-last-events'
                    });
                });
            });
        },

        initModalNotice: function(mess) {
            $('#modal-notice').find('.box-mess').html(mess);

            $.magnificPopup.open({
                items: {
                    src: '#modal-notice'
                },
                type: 'inline',
                mainClass: 'modal-notice'
            });
        },

        initFormElements: function() {
            $('input, textarea').placeholder();

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

        initSliderTrungIphone: function() {
            $('#counter .wrap').countdown($('#counter').attr('data-counter-time'))
                .on('update.countdown', function(event) {
                    var format = '<span>%D</span><span>%H</span><span>%M</span>';
                    $(this).html(event.strftime(format));
                })
                .on('finish.countdown', function(event) {
                    $(this).html('This offer has expired!')
                        .parent().addClass('disabled');

                });

            var divContent = $('.box-result .wrap-content');

            divContent.find('.list-result').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1
            });

            var divVideo = $('.wrap-slide-video');

            divVideo.find('.slide-video').slick({
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }]
            });
        },

        initSliderCollectionVR: function() {
            var divContent = $('.wrap-collect-toy');

            divContent.find('.list-collection').slick({
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    }, {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        },

        initShowHideTnc: function() {
            var aTag = $('.btn-thele'),
                divContent = $('.block-tnc');
            aTag.off('click').on('click', function(e) {
                e.preventDefault();
                if (aTag.hasClass('active')) {
                    divContent.slideUp('normal', function() {

                    });
                    aTag.removeClass('active');
                } else {
                    divContent.slideDown('normal', function() {
                        $("html, body").animate({ scrollTop: aTag.offset().top });
                    });
                    aTag.addClass('active');
                }
            });
        }
    };
})(jQuery);

$(document).ready(function() {
    kunMini2016.Global.init();
});
