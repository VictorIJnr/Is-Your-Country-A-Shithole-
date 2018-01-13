$(document).ready(function(){

  $('li').click(function() {

    if (!$(this).hasClass('active')) {
      $('li').removeClass("active");
      $(this).addClass("active");

      if ($(this).attr('id') === 'map-tab') {
        $('#search-block').fadeOut(500);
        $('#map-block').fadeIn(500);
      } else {
        $('#map-block').fadeOut(500);
        $('#search-block').fadeIn(500);
      }
    }

  });
});
