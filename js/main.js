---
    layout: null
---

    $(document).ready(function () {

        $('a.blog-button').click(function (e) {
            console.log("got here");

            $('html,body').animate({
                scrollTop: $(".blog-panel").offset().top
            },
                'slow');


        })
    })
