$(".content-header .button").click(function(){
    // $(".popup").toggleClass('d-none');
    $(".popup").css('visibility','visible');
    $("#focus").focus();
    $(this).attr("disable",'true');
});

$(".head-close").click(function(){
    $(".popup").css('visibility','hidden');
})

$(".button.cancel").click(function(){
    $(".popup").css('visibility','hidden');
})

$(".refresh").click(function(){
    location.reload();
})

$('.image').click(function(){
    $('#myFile').trigger('click');
})

$('#myFile').click(function(e){
    $('#myFile').change(function(e){
        var img = URL.createObjectURL(e.target.files[0]);
        $('.image').css("background-image", `url(${img})`);
    })
})

