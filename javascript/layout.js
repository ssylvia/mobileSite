var _swipe,
    _autoSlide = true,
    fromGallery = false;

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
        if(location.hash === "#ourStories"){
            _storySwipe.prev();
        }
        else{
            _autoSlide = false;
            _swipe.prev();
        }
    });
    $("#nextArrowMain").click(function(){
        if(location.hash === "#ourStories"){
            _storySwipe.next();
        }
        else{
            _autoSlide = false;
            _swipe.next();
        }
    });

    $(".imgCon").click(function(){
        fromGallery = $(this).index(".imgCon");
        console.log(fromGallery);
    });

    $(document).bind("pagechange",function(){
        if(location.hash === "#ourStories"){
            if (fromGallery === false){
                _storySwipe = new Swipe(document.getElementById('appSlider'), {
                    startSlide: 0,
                    speed: 400
                });
            }
            else{
                _storySwipe = new Swipe(document.getElementById('appSlider'), {
                    startSlide: fromGallery,
                    speed: 400
                });
                fromGallery = false;
            }
        }
        else{
            _swipe = new Swipe(document.getElementById('slider'), {
                startSlide: 0,
                speed: 400,
                callback: function(e, pos) {
                    $(".pos").removeClass('on');
                    $("#pos"+pos).addClass('on');
                }
            });
        }
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