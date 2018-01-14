$(document).ready(function(){

  if ($('#immigration').text() === "High") {
    $('#immigration').css('color', 'red');
  } else {
    $('#immigration').css('color', 'green');
  }

  if ($('#gdp').text() === "High") {
    $('#gdp').css('color', 'green');
  } else {
    $('#gdp').css('color', 'red');
  }

  if ($('#apprehended').text() === "High") {
    $('#apprehended').css('color', 'red');
  } else {
    $('#apprehended').css('color', 'green');
  }

});
