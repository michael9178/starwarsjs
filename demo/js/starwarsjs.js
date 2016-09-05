$( document ).ready(function() {

    (function($){
        var count = 1;

        $.fn.starwarsjs = function(options){
            var settings = $.extend({
                target : this.selector,
                star_number : 1,
                range : '',
                count : 1,
                disable : 0,
            }, options );

            var starwarsjs = {
                target: settings.target,
                star : "rate_star",
                star_number: settings.star_number,
                range: settings.range,
                count: settings.count,
                disable: settings.disable,
                disable_class : "disable",
            };

            console.log(starwarsjs);

            append_stars(starwarsjs);
            traverse(starwarsjs);
            presentation(starwarsjs);
            return this;
        };
    }(jQuery));

});

function append_stars(starwarsjs){
    $(starwarsjs.target).each(function(){

        if(starwarsjs.star_number > 1 && starwarsjs.range == '' && starwarsjs.count == 1){


            for(var i = 1; i <= starwarsjs.star_number; i++){

                if(i > starwarsjs.disable && starwarsjs.star_number > starwarsjs.disable){
                    $(this).append("<span class='" + starwarsjs.star + ' '  + starwarsjs.disable_class + "' data-value='" + i + "'></span>"); // set data-value attributes
                }else{
                    $(this).append("<span class='" + starwarsjs.star +"' data-value='" + i + "'></span>");
                }

            }
        }else if(starwarsjs.star_number > 1 && starwarsjs.range == '' && starwarsjs.count > 1){

            var i = 1, step  = i;
            for(i; i <= starwarsjs.star_number; i++){

                if(i > starwarsjs.disable && starwarsjs.star_number > starwarsjs.disable){
                    $(this).append("<span class='" + starwarsjs.star + ' '  + starwarsjs.disable_class + "' data-value='" + step + "'></span>");  // set data-value attributes with incremented steps
                    step += starwarsjs.count;
                }else{
                    $(this).append("<span class='" + starwarsjs.star +"' data-value='" + step + "'></span>");  // set data-value attributes with incremented steps
                    step += starwarsjs.count;
                }
            }
        }

        if(starwarsjs.range && starwarsjs.range.length == 2 && starwarsjs.count == 1){

            for(var j = starwarsjs.range[0]; j <= starwarsjs.range[1]; j++){

                if(j > starwarsjs.disable && starwarsjs.range[1] > starwarsjs.disable){
                    $(this).append("<span class='" + starwarsjs.star + ' '  + starwarsjs.disable_class + "' data-value='" + j + "'></span>"); // set data-value attributes
                }else{
                    $(this).append("<span class='" + starwarsjs.star +"' data-value='" + j + "'></span>"); // set data-value attributes
                }
            }
        }else if(starwarsjs.range && starwarsjs.range.length == 2 && starwarsjs.count > 1){
            var j = starwarsjs.range[0], step  = j;
            for(j; j <= starwarsjs.range[1]; j++){

                if(j > starwarsjs.disable && starwarsjs.range[1] > starwarsjs.disable){
                    console.log('sdsdsd');
                    $(this).append("<span class='" + starwarsjs.star + ' '  + starwarsjs.disable_class + "' data-value='" + step + "'></span>");  // set data-value attributes with incremented steps
                    step += starwarsjs.count;
                }else{
                    $(this).append("<span class='" + starwarsjs.star +"' data-value='" + step + "'></span>");  // set data-value attributes with incremented steps
                    step += starwarsjs.count;
                }

            }
        }



    });
}

function traverse(starwarsjs){
    //$( ".rate_star" ).prop( "disabled", true );
    if(starwarsjs.star_number) {

        $(starwarsjs.target + ' .' + starwarsjs.star).each(function () {
            $(this).hover( // change star's color after mouse hover
                function () {
                    $(this).prevAll().andSelf().addClass('over');
                },
                function () {
                    $(this).prevAll().andSelf().removeClass('over');
                }
            );
            $(this).on('click', function () { // get rate after click
                var star_id = $(this).attr('data-value');
                $(this).siblings('input.get_star').val(star_id);
                $(this).addClass('checked');
                $(this).prevAll().addClass('checked');
                $(this).nextAll().removeClass('checked');
            });
        });
    }
}

function presentation(){
    $("#change_fonts").bind('keyup mouseup', function () {
        console.log($(this).val());
        $('.rate_star').css({ "fontSize": $(this).val() + "px"})
    });
    $("#change_color").on('change', function () {
        var color = $(this).val();
        $("<style type='text/css'> .rate_star{ color:" + color + ";} </style>").appendTo("head");
    });
    $("#change_hover_color").on('change', function () {
        var hover_color = $(this).val();
        $("<style type='text/css'> .rate_star.over{ color:" + hover_color + ";} </style>").appendTo("head");
    });
}