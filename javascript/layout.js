var _swipe;
var _autoSlide = true;

$(document).ready(function(){
    $(".menuHeader").click(function(){
        if($(this).next().hasClass("menuContent")){
            if($(this).hasClass("closed")){
                $(this).removeClass("closed").addClass("open").children(".toggleIcon").html("-");
            }
            else if($(this).hasClass("open")){
                $(this).removeClass("open").addClass("closed").children(".toggleIcon").html("+");
            }
            $(this).next().stop(true,true).slideToggle();
        }
    });

    $(".collapse").click(function(){
        $(this).parent().addClass("closed").stop(true,true).slideUp().prev().children(".toggleIcon").html("+");
    });

    _swipe = new Swipe(document.getElementById('slider'), {
        startSlide: 0,
        speed: 400,
        callback: function(e, pos) {
            $(".pos").removeClass('on');
            $("#pos"+pos).addClass('on');
        }
    });

    startAutoSlide();

    $(".pos").click(function(){
        _swipe.slide($(this).index(),400);
        _autoSlide = false;
    });

    $("#slider").swipe(function(){
        _autoSlide = false;
    });
    
    $("#prevArrowMain").click(function(){
        _autoSlide = false;
        _swipe.prev();
    });
    $("#nextArrowMain").click(function(){
        _autoSlide = false;
        _swipe.next();
    });

});

var startAutoSlide = function(){
    setTimeout(function() {
        if (_autoSlide === true){
            _swipe.next();
            startAutoSlide();
        }
    }, 5000);
};