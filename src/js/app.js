"use strict";

$(function () {


    if (typeof Fancybox !== "undefined" && Fancybox !== null) {
        Fancybox.bind("[data-fancybox]", {
            dragToClose: false,
            closeButton: false,
        });
    }

    /* =========== Event Handlers ============== */

    $(document).on("click", function (e) {
        const $target = $(e.target);

        // Close the modal catalog on button click or outside click
        if ($target.is(".catalog__close") || (!$target.closest(".catalog").length && $(".catalog").hasClass("catalog--open"))) {
            $(".catalog").removeClass("catalog--open");
            $("body").removeClass("catalog-lock");
        }

        // Open the modal catalog when a user clicks the button
        if ($target.is(".header__catalog")) {
            $(".catalog").addClass("catalog--open");
            $("body").addClass("catalog-lock");
        }

        // Clear search input and hide the search bar within the modal catalog
        if ($target.closest(".catalog__search-reset").length) {
            $(".catalog__search-input").val("").trigger("input");
            $(".catalog__searchbar").removeClass("active");
        }

        // Handle tabs inside the modal catalog
        if ($target.closest(".catalog__categories-btn").length) {
            const $button = $target.closest(".catalog__categories-btn");
            const index = $button.parent().index();

            $(".catalog__categories-btn").removeClass("active");
            $button.addClass("active");

            $(".catalog__block").removeClass("active");
            $(".catalog__block").eq(index).addClass("active");
        }
    });


    $(document).on("keydown", function (e) {
        if (e.key === "Escape" && $(".catalog").hasClass("catalog--open")) {
            $(".catalog").removeClass("catalog--open");
            $("body").removeClass("catalog-lock");
        }
    });

    // searchbar logic
    $(".catalog__search-input").on("input", function () {
        const query = $(this).val().toLowerCase();
        const $resetBtn = $(".catalog__search-reset");
        if (query.length > 0) {
            $resetBtn.addClass("active");
            $(".catalog__searchbar").addClass("active");
        } else {
            $resetBtn.removeClass("active");
            $(".catalog__searchbar").removeClass("active");
        }
    });


    /* =========== Event Handlers ============== */


    // floating Labels
    $('.form__field > .form__control').on('input blur focus change keyup mouseup', function () {
        if ($(this).val().length > 0) {
            $(this).addClass('_input');
        } else {
            $(this).removeClass('_input');
        }
    }).each(function () {
        if ($(this).val().length > 0) {
            $(this).addClass('_input');
        }
    });

    $('.form__field > .form__control').on('animationstart', function (e) {
        if (e.originalEvent.animationName === 'onAutoFillStart' || e.originalEvent.animationName === 'onAutoFillCancel') {
            $(this).addClass('_input');
        }
    });



    // sliders

    // Extend Class for Swiper.js add wrap progress

    class SwiperWithProgress {
        constructor(selector, options) {
            this.selector = selector;
            this.options = options;
            this.init();
        }

        init() {
            if ($(this.selector).length) {
                new Swiper(this.selector, {
                    ...this.options,
                    speed: 800,
                    autoplay: {
                        delay: 8000,
                        stopOnLastSlide: false,
                    },
                    pagination: {
                        el: this.options.paginationEl,
                        type: "fraction",
                        formatFractionCurrent: (number) => {
                            return number < 10 ? '0' + number : number;
                        },
                        formatFractionTotal: (number) => {
                            return number < 10 ? '0' + number : number;
                        },
                        renderFraction: (currentClass, totalClass) => {
                            return '<span class="' + currentClass + '"></span>' +
                                ' <span class="swiper-pagination-progress"></span> ' +
                                '<span class="' + totalClass + '"></span>';
                        }
                    },
                    on: {
                        init: (swiper) => {
                            const progressEl = swiper.pagination.el.querySelector('.swiper-pagination-progress');
                            let speed = swiper.params.speed;
                            let autoplaySpeed = swiper.params.autoplay.delay;
                            progressEl.style.setProperty('--counting-speed', ((speed + autoplaySpeed) / 1000) + 's');
                            progressEl.classList.add('counting');
                        },
                        slideChangeTransitionStart: (swiper) => {
                            const progressEl = swiper.pagination.el.querySelector('.swiper-pagination-progress');
                            progressEl.classList.remove('counting');
                            void progressEl.offsetWidth;
                            progressEl.classList.add('counting');
                        }
                    }
                });
            }
        }
    }

    if ($('.promo__slider').length) {
        new SwiperWithProgress('.promo__slider', {
            slidesPerView: 1,
            effect: "fade",
            fadeEffect: {
                crossFade: true
            },
            navigation: {
                prevEl: '.promo__controls-prev',
                nextEl: '.promo__controls-next'
            },
            paginationEl: '.promo__pagination'
        });
    }

    if ($('.promo__categories').length) {
        new Swiper('.promo__categories', {
            slidesPerView: 1,
            speed: 800,
            loop: true,
            autoplay: {
                delay: 2000,
                stopOnLastSlide: false,
            },
        })
    }

    if ($('.offers__slider').length) {
        new Swiper('.offers__slider', {
            slidesPerView: 1,
            watchOverflow: true,
            navigation: {
                nextEl: '.offers__next',
                prevEl: '.offers__prev'
            },
        })
    }

    if ($('.goods__slider').length) {
        new Swiper('.goods__slider', {
            slidesPerView: "auto",
            spaceBetween: 24,
            watchOverflow: true,
            navigation: {
                nextEl: '.goods__next',
                prevEl: '.goods__prev'
            },
            breakpoints: {
                1661.98: {
                    slidesPerView: 4,
                },
                1819.98: {
                    slidesPerView: 5,
                }
            }
        })
    }

    if ($('.catalog__block').length) {
        $('.catalog__block').each(function (index, element) {

            const $block = $(element);
            const slider = $block.find('.catalog__block-slider')[0];
            const nextBtn = $block.find('.catalog__block-next')[0];
            const prevBtn = $block.find('.catalog__block-prev')[0];

            new Swiper(slider, {
                slidesPerView: 4,
                spaceBetween: 16,
                watchOverflow: true,
                navigation: {
                    nextEl: nextBtn,
                    prevEl: prevBtn
                },
                breakpoints: {
                    1661.98: {
                        slidesPerView: 4,
                    },
                    1819.98: {
                        slidesPerView: 5,
                    }
                }
            })
        })


    }

    if ($('.reviews__slider').length) {
        new SwiperWithProgress('.reviews__slider', {
            slidesPerView: 4,
            spaceBetween: 24,
            watchOverflow: true,
            navigation: {
                nextEl: '.reviews__next',
                prevEl: '.reviews__prev'
            },
            paginationEl: '.reviews__pagination',
            breakpoints: {
                1661.98: {
                    slidesPerView: 3,
                },
                1819.98: {
                    slidesPerView: 4,
                }
            }
        })
        if ($('.review__images').length) {
            $('.review__images').each(function (index, element) {
                new Swiper(element, {
                    slidesPerView: "auto",
                    spaceBetween: 8,
                    watchOverflow: true,
                })
            })
        }
    }

    // amination

    // benefits image animation

    const benefitsSection = $('.benefits');
    if (benefitsSection.length) {

        const benefitsLists = $('.benefits__list');
        const benefitsPicture = $('.benefits__picture');

        // image rotation animation

        const maxRotation = 8;

        benefitsSection.on('mousemove', function (e) {
            const width = benefitsSection.width();
            const height = benefitsSection.height();
            const left = benefitsSection.offset().left;
            const top = benefitsSection.offset().top;

            const mouseX = e.pageX - left - width / 2;
            const mouseY = e.pageY - top - height / 2;

            const rotateY = (mouseX / (width / 2)) * maxRotation;
            const rotateX = (mouseY / (height / 2)) * -maxRotation;

            benefitsPicture.css('transform', `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg)
        `);
        });

        benefitsSection.on('mouseleave', function () {
            benefitsPicture.css('transform', `
            perspective(1000px)
            rotateX(0deg) 
            rotateY(0deg)
        `);
        });


        benefitsLists.each(function () {
            const startValue = $(this).attr('start');

            if (startValue) {
                $(this).css('--start-num', parseInt(startValue) - 1);
            }
        });

        benefitsSection.on('pointerenter', '.benefits__item', function (event) {

            if (event.pointerType === 'mouse') {
                const currentItem = $(this);
                const currentDescription = currentItem.find('.benefits__item-description');

                $('.benefits__item').removeClass('active');
                currentItem.addClass('active');

                $('.benefits__item-description').not(currentDescription).stop().slideUp(150);
                currentDescription.stop().slideDown(150);
            }
        });


        benefitsLists.on('pointerleave', '.benefits__item', function (event) {
            if (event.pointerType === 'mouse') {
                const currentDescription = $(this).find('.benefits__item-description');
                $(this).removeClass('active');
                currentDescription.stop().slideUp(150);
            }
        });


        benefitsSection.on('click', '.benefits__item', function (e) {
            e.preventDefault();

            const currentItem = $(this);
            const currentDescription = currentItem.find('.benefits__item-description');

            if (currentItem.hasClass('active')) {

                currentItem.removeClass('active');
                currentDescription.stop().slideUp(300);

            } else {
                $('.benefits__item').removeClass('active');
                currentItem.addClass('active');

                $('.benefits__item-description').not(currentDescription).stop().slideUp(300);
                currentDescription.stop().slideDown(300);
            }
        });

    }



    // Phone Russia Mask

    var phoneInputs = document.querySelectorAll('input[type="tel"]');

    var getInputNumbersValue = function (input) {
        // Return stripped input value — just numbers
        return input.value.replace(/\D/g, '');
    }

    var onPhonePaste = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input);
        var pasted = e.clipboardData || window.clipboardData;
        if (pasted) {
            var pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
                // formatting will be in onPhoneInput handler
                input.value = inputNumbersValue;
                return;
            }
        }
    }

    var onPhoneInput = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            selectionStart = input.selectionStart,
            formattedInputValue = "";

        if (!inputNumbersValue) {
            return input.value = "";
        }

        if (input.value.length != selectionStart) {
            // Editing in the middle of input, not last symbol
            if (e.data && /\D/g.test(e.data)) {
                // Attempt to input non-numeric symbol
                input.value = inputNumbersValue;
            }
            return;
        }

        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
            var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
            formattedInputValue = input.value = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
        }
        input.value = formattedInputValue;
    }
    var onPhoneKeyDown = function (e) {
        // Clear input after remove last symbol
        var inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode == 8 && inputValue.length == 1) {
            e.target.value = "";
        }
    }
    for (var phoneInput of phoneInputs) {
        phoneInput.addEventListener('keydown', onPhoneKeyDown);
        phoneInput.addEventListener('input', onPhoneInput, false);
        phoneInput.addEventListener('paste', onPhonePaste, false);
    }



    // Contacts Block Map
    if ($("#map").length) {
        ymaps.ready(function () {
            var coordinates = [55.83060906893058, 37.416250999999946];

            var myMap = new ymaps.Map('map', {
                center: coordinates,
                zoom: 16,
                controls: []
            });

            var placemark = new ymaps.Placemark(coordinates, {}, {
                iconLayout: 'default#image',
                iconImageHref: '/img/placemark.svg',
                iconImageSize: [73, 97],
                iconImageOffset: [-36, -97]
            });

            myMap.geoObjects.add(placemark);

            myMap.behaviors.disable('scrollZoom');
        });
    }


});