$(document).ready(function(){

  $(document).on("keypress", "form", function(event) {
    if ($('#searchbar-input').val().length == 0) return event.keyCode != 13;
  });

  $('#searchbar-input').on('input', function() {
    if ($(this).val().length == 0) {
      $(this).css("border-bottom-color", "#ADADAD");
      $('#searchbar-input-button').css("color", "#ADADAD");
      $('.searchbar-button').css("pointer-events", "none");
    } else {
      $(this).css("border-bottom-color", "#222");
      $('#searchbar-input-button').css("color", "#222");
      $('.searchbar-button').css("pointer-events", "auto");
    }
  });

});
