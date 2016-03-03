//
'use strict';
$(document).ready(init);

var zipArray = [];
var zip;
// var city;
// var state;

function init() {
  loadFromStorage();
  updateList();
  $('#newEntry').on('click', getZip);
  // $('#zip').on('click', getForecast);
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
  // $('#zip').on('click', get);
}

function loadFromStorage() {
  if(!localStorage.zipArray) {
    localStorage.zipArray = '[]';
  }
  zipArray = JSON.parse(localStorage.zipArray);
}

function getZip() {
  $('#zipList').empty();
  var city = $('#city').val();
  var state = $('#state').val();
  // var zip = $('#zip').val();
  zipArray.push(city, state);
  $('#city').empty();
  $('#state').empty();
  saveToStorage();
  updateList();
  getForecast();
  clearHouse();
  console.log(zip);
  console.log(zipArray);
}

function saveToStorage() {
  localStorage.zipArray = JSON.stringify(zipArray);
}

function updateList() {
  var $zips = zipArray.map(function(zip, index) {
    var $li = $('<li>').text(zip);
    $('#zipList').append($li);
    console.log("li", $li);
  })
  console.log("list", zipList);
  console.log("zips", $zips);
}


//function to remove a city
// add a check box
function removeEntries() {
  $('input:checked').closest('li').remove();
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

// function getZip() {
//   var zip = $('#newEntry').val();
//   $.ajax({
//     url:"http://api.wunderground.com/api/fa798b8605df3bb3/geolookup/q/" + zip + ".json",
//     type: "GET",
//     // contentType:"jsonp",
//     success: function(data) {
//       console.log(data);
//       var $zip =  $('<p>').text("Curtent zip " + data.location.zip);
//     	console.log($zip);
//     	$('#zipCode').append($zip);
//   	}
//   });
// }


function getForecast() {
  zip = $('#newEntry').val();
  var city = $('#city').val();
  var state = $('#state').val();
  console.log(zip);
  $.ajax({
    // url:"http://api.wunderground.com/api/fa798b8605df3bb3/forecast/q/94107.json",
    // url: "http://api.wunderground.com/api/fa798b8605df3bb3/forecast/q/" + zip + ".json",
    // http://api.wunderground.com/api/6ca27311016d494b/forecast/q/CA/San_Francisco.json
    url: "http://api.wunderground.com/api/6ca27311016d494b/forecast/q/" + state + "/" + city + ".json",
    type: "GET",
    // contentType:"jsonp",
    success: function(data) {
      var $city =  $('<p>').text(city);
      var $state = $('<p>').text(state);
      console.log($city);
      console.log($state);
      $('.pastCity').append($city);
      $('.pastState').append($state);
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

function clearHouse() {
  $('#city').empty();
  $('#state').empty();
  // $('.forecast1').empty();
  // $('.forecast2').empty();
  // $('.forecast3').empty();
  $('.pastCity').empty();
  $('.pastState').empty();
}
