$('.carousel').carousel({
    interval: 3000,
    keyboard: true,
    wrap: true
});
$('#button1').on('click', function(){
    var target = $(this).data('target');
    var pos = $('#place1').offset().top;
    $('html, body').animate({'scrollTop': pos - 200}, 400);
});

$('#button2').on('click', function(){
    var target = $(this).data('target');
    var pos = $('#place2').offset().top;
    $('html, body').animate({'scrollTop': pos - 200}, 400);
});

$('#button3').on('click', function(){
    var target = $(this).data('target');
    var pos = $('#place3').offset().top;
    $('html, body').animate({'scrollTop': pos - 200}, 400);
});

$('#button4').on('click', function(){
    var target = $(this).data('target');
    var pos = $('#place4').offset().top;
    $('html, body').animate({'scrollTop': pos - 200}, 400);
});

