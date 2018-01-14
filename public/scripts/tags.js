$(document).ready(function(){

  if ($('#immigration').text() === "High") {
    $('#immigration').css('color', 'red');
  } else {
    $('#immigration').css('color', 'green');
  }

  if ($('#gdp').text() === "High") {
    $('#gdp').css('color', 'green');
  } else if ($('#undefinedgdp').text().includes("undefined") || $('#undefinedgdp').text().includes("NaN")) {
    $('#undefinedgdp').css('display', 'none');
    $('#undefinedgdpimg').css('display', 'none');
  } else {
    $('#gdp').css('color', 'red');
  }

  if ($('#apprehended').text() === "High") {
    $('#apprehended').css('color', 'red');
  } else {
    $('#apprehended').css('color', 'green');
  }

  if ($('#america').text().length > 0) {
    $('#america').css('display', 'block');
    $('.tag').css('display', 'none');
    $('.jumbotron img').css('display', 'none');
  } else {
    $('#america').css('display', 'none');
    $('.tag').css('display', 'block');
  }

});
