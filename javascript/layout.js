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
});