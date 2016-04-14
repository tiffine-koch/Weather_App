'use strict';
$(document).ready(init);

var zipArray = [], zip, city, state;

function init() {
  loadFromStorage();
  updateList();
  $('#newEntry').on('click', getZip);
  $('#zipList').on('click', '.saved', getPastLocation);
  $('#zipList').on('dblclick', '.saved', deleteLocation);

  $.ajax({
      url:"http://api.wunderground.com/api/fa798b8605df3bb3/geolookup/q/autoip.json",
      type: "GET",
      success: function(data) {
        var $city =  $('<p>').text(data.location.city);
        var $state = $('<p>').text(data.location.state);
      	$('.city').append($city);
      	$('.state').append($state);
    	},
    });
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
  var location = state.concat(city);
  var realLocation = location.replace("," , "");

  zipArray.push(realLocation);
  saveToStorage();
  updateList();
  getForecast();
  clearHouse();
}

function saveToStorage() {
  localStorage.zipArray = JSON.stringify(zipArray);
}

function updateList() {
  var $zips = zipArray.map(function(zip, index) {
      var city = zip.slice(0, 2);
      var state =  zip.slice(2);
      var $li = $('<li>').text(city + ", " + state).addClass('saved');
      $('#zipList').append($li);
    })
}

function deleteLocation() {
  $(this).closest('li').remove();
}

function getPastLocation() {
  city = $(this).text();
  state = $(this).text();
  $('#city').append(city);
  $('#state').append(state);
  console.log('past', city);
  console.log('past', state);
  getForecast();
  clearHouse();
}

function getConditions() {
  $.ajax({
      url:"http://api.wunderground.com/api/fa798b8605df3bb3/conditions/q/CA/San_Francisco.json",
      type: "GET",
      success: function(data) {
        var $temp =  $('<p>').text(data.current_observation.temp_f);
      	$('#temp').append($temp);
    	},
    });
    }
  getConditions();

function getForecast() {
  zip = $('#newEntry').val();
  var city = $('#city').val();
  var state = $('#state').val();
  $.ajax({
    url: "http://api.wunderground.com/api/6ca27311016d494b/forecast/q/" + state + "/" + city + ".json",
    type: "GET",

    success: function(data) {
      console.log(city);
      console.log(state);
      var $city =  $('<p>').text(city);
      var $state = $('<p>').text(state);
      $('.pastCity').append($city);
      $('.pastState').append($state);


      var $highDay1 = $('<p>').text("Hi " +  data.forecast.simpleforecast.forecastday[0].high.fahrenheit);
      var $highDay2 = $('<p>').text("Hi " + data.forecast.simpleforecast.forecastday[1].high.fahrenheit);
      var $highDay3 = $('<p>').text("Hi " + data.forecast.simpleforecast.forecastday[2].high.fahrenheit);

      var $lowDay1 = $('<p>').text("Lo " + data.forecast.simpleforecast.forecastday[0].low.fahrenheit);
      var $lowDay2 = $('<p>').text("Lo " + data.forecast.simpleforecast.forecastday[1].low.fahrenheit);
      var $lowDay3 = $('<p>').text("Lo " + data.forecast.simpleforecast.forecastday[2].low.fahrenheit);

      var $conditionsDay1 = $('<p>').text("Today - " + data.forecast.simpleforecast.forecastday[0].conditions);
      var $conditionsDay2 = $('<p>').text("Tomorrow - " + data.forecast.simpleforecast.forecastday[1].conditions);
      var $conditionsDay3 = $('<p>').text("Day After Tomorrow - " + data.forecast.simpleforecast.forecastday[2].conditions);

    	$('.forecast1').append($highDay1);
    	$('.forecast1').append($lowDay1);
    	$('.forecast1').append($conditionsDay1);
    	$('.forecast2').append($highDay2);
    	$('.forecast2').append($lowDay2);
    	$('.forecast2').append($conditionsDay2);
    	$('.forecast3').append($highDay3);
    	$('.forecast3').append($lowDay3);
    	$('.forecast3').append($conditionsDay3);

      $('#city').val('');
      $('#state').val('');
  	}
  });
}

function clearHouse() {
  $('.forecast1').empty();
  $('.forecast2').empty();
  $('.forecast3').empty();
  $('.pastCity').empty();
  $('.pastState').empty();
}
