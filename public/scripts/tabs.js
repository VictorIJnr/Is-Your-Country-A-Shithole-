$(document).ready(function(){

  $('li').click(function() {

    if (!$(this).hasClass('active')) {
      $('li').removeClass("active");
      $(this).addClass("active");

      if ($(this).attr('id') === 'map-tab') {
        $('#search-block').hide();
        $('#map-block').show();
      } else {
        $('#map-block').hide();
        $('#search-block').show();
      }
    }

  });
});
