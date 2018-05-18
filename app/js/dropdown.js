$(document).ready(function(){
    $('.main-menu li').mouseover(function(){
        if ($('.main-menu li.active').length > 0) {
            $('.main-menu li.active').removeClass('active');
            $(this).addClass('active');
        } else {
            jQuery(this).addClass('active');
        }

    });
    $('.main-menu li').mouseout(function(){
        $('.main-menu li.active').removeClass('active');
        $('.main-menu .sub-menu').mouseover(function(){
            if ($('.main-menu .sub-menu').parent().length > 0) {
                $('.main-menu .sub-menu').parent().removeClass('active');
                $(this).addClass('active');
            } else {
                jQuery(this).addClass('active');
            }
        });

    });
});