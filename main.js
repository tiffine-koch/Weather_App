
'use strict';
$(document).ready(init);

function init() {
  $('#newEntry').on('click', getZip);
  $.ajax({
      url:"http://api.wunderground.com/api/fa798b8605df3bb3/geolookup/q/autoip.json",
      type: "GET",
      // contentType:"jsonp",
      success: function(data) {
        console.log(data);
        var $city =  $('<p>').text(data.location.city);
        var $state = $('<p>').text(data.location.state);
      	console.log($city);
      	console.log($state);
      	$('.city').append($city);
      	$('.state').append($state);
    	},
    });
  getForecast();
  // ('#zip').on('click', zipClicked);
}
function getConditions() {
  $.ajax({
       url:"http://api.wunderground.com/api/fa798b8605df3bb3/conditions/q/CA/San_Francisco.json",
      type: "GET",
      // contentType:"jsonp",
      success: function(data) {
        var $temp =  $('<p>').text(data.current_observation.temp_f);
      	$('#temp').append($temp);
    	},
    });
    }
  getConditions();

function getZip() {
  var zip = $('#zip').val();
  // zip = data.location.zip;
  console.log(zip);
}


// function getZip() {
//   var zip = $('#newEntry').val();
//   $.ajax({
//     url:"http://api.wunderground.com/api/fa798b8605df3bb3/geolookup/q/" + zip ".json",
//     type: "GET",
//     // contentType:"jsonp",
//     success: function(data) {
//       console.log(data);
//       var $zip =  $('<p>').text("Currtent zip " + data.location.zip);
//     	console.log($zip);
//     	$('#zipCode').append($zip);
//   	}
//   });
// }


function getForecast() {
  $.ajax({
    url:"http://api.wunderground.com/api/fa798b8605df3bb3/forecast/q/94107.json",
    type: "GET",
    // contentType:"jsonp",
    success: function(data) {
      console.log(data);
      var $highDay1 = $('<p>').text("Hi " +  data.forecast.simpleforecast.forecastday[0].high.fahrenheit);
      var $highDay2 = $('<p>').text("Hi " + data.forecast.simpleforecast.forecastday[1].high.fahrenheit);
      var $highDay3 = $('<p>').text("Hi " + data.forecast.simpleforecast.forecastday[2].high.fahrenheit);

      var $lowDay1 = $('<p>').text("Lo " + data.forecast.simpleforecast.forecastday[0].low.fahrenheit);
      var $lowDay2 = $('<p>').text("Lo " + data.forecast.simpleforecast.forecastday[1].low.fahrenheit);
      var $lowDay3 = $('<p>').text("Lo " + data.forecast.simpleforecast.forecastday[2].low.fahrenheit);

      var $conditionsDay1 = $('<p>').text("Today - " + data.forecast.simpleforecast.forecastday[0].conditions);
      var $conditionsDay2 = $('<p>').text("Tomorrow - " + data.forecast.simpleforecast.forecastday[1].conditions);
      var $conditionsDay3 = $('<p>').text("Day After Tomorrow - " + data.forecast.simpleforecast.forecastday[2].conditions);

    	console.log($conditionsDay1);

    	$('.forecast1').append($highDay1);
    	$('.forecast1').append($lowDay1);
    	$('.forecast1').append($conditionsDay1);
    	$('.forecast2').append($highDay2);
    	$('.forecast2').append($lowDay2);
    	$('.forecast2').append($conditionsDay2);
    	$('.forecast3').append($highDay3);
    	$('.forecast3').append($lowDay3);
    	$('.forecast3').append($conditionsDay3);
  	}
  });
}
