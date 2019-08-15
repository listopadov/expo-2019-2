import '../../scss/theme.scss';

import "../../../node_modules/bootstrap/js/src/tab";
import "../../../node_modules/bootstrap/js/dist/collapse";

import "../../../node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min";

(() => {
  "use strict";

  var $linkAnchor = $(".link-anchor"),
    $htmlBody = $("html, body");

  if (!$linkAnchor.length) return false;

  $linkAnchor.on("click", scrollToBlock);

  function scrollToBlock(e) {
    e.preventDefault();

    var target = $(this.getAttribute('data-anchor-scroll'));

    if (target.length) {
      $htmlBody.stop().animate({
        scrollTop: target.offset().top
      }, 1000);
    }
  }

  var $accordionLink = $('.accordion-header .h4'),
    $accordionBody = $('.accordion-body'),
    $accordionItem = $('.accordion-item');

  if (!$accordionItem.length) return false;

  $accordionLink.on('click', toggleAccordion);

  function toggleAccordion(e) {
    e.preventDefault();

    if ($(e.target).parent().parent().is('.active')) {
      $(this).parent().parent().find('.accordion-body').slideUp(200);
      $(this).parent().parent().removeClass('active');
    } else {
      $accordionBody.slideUp(200);
      $accordionItem.removeClass('active');

      $(this).parent().parent().find('.accordion-body').slideDown(200);
      $(this).parent().parent().addClass('active')
    }
  }

  const langWrapper = document.getElementById('langWrapper');
  const langItem = langWrapper.querySelectorAll('.lang');

  langItem.forEach(item => {
    item.addEventListener((document.ontouchstart !== null) ? 'click' : 'touchstart', function () {
      const dataLang = this.getAttribute('data-lang');

      switch (dataLang) {
        case 'ru':
          localStorage.setItem('lang-site', 'ru');
          window.location = '/index.html';
          break;
        case 'en':
          localStorage.setItem('lang-site', 'en');
          window.location = '/index_en.html';
          break;
        default:
          localStorage.setItem('lang-site', 'ua');
          window.location = '/index_ua.html';
      }
    });
  })
})();