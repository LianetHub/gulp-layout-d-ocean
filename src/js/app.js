"use strict";

import * as devFunctions from "./modules/functions.js";

$(function () {


    if (typeof Fancybox !== "undefined" && Fancybox !== null) {
        Fancybox.bind("[data-fancybox]", {
            dragToClose: false,
            closeButton: false,
        });
    }

    /* event handlers */
    $(document).on("click", function (e) {

        const target = $(e.target);

    });



    if ($('.promo__slider').length) {
        new Swiper('.promo__slider', {
            slidesPerView: 1,
            speed: 800,
            autoplay: {
                delay: 8000,
                stopOnLastSlide: false,
            },
            effect: "fade",
            fadeEffect: {
                crossFade: true
            },
            navigation: {
                prevEl: '.promo__controls-prev',
                nextEl: '.promo__controls-next'
            },
            pagination: {
                el: ".promo__pagination",
                type: "fraction",
                formatFractionCurrent: function (number) {
                    return number < 10 ? '0' + number : number;
                },
                formatFractionTotal: function (number) {
                    return number < 10 ? '0' + number : number;
                },
                renderFraction: function (currentClass, totalClass) {
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

    if ($('.promo__categories').length) {
        new Swiper('.promo__categories', {
            slidesPerView: 1,
            speed: 800,
            loop: true,
            autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
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

});