import '../../scss/theme.scss';

import "../../../node_modules/bootstrap/js/src/tab";
import "../../../node_modules/bootstrap/js/dist/collapse";

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
})();