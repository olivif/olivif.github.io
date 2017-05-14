---
  layout: null
---
  $(document).ready(function () {
    $('a.blog-button').click(function (e) {

      $('html,body').animate({
        scrollTop: $(".blog-panel").offset().top
      },
        'slow');


    })
  })
