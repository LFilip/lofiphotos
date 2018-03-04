var apiCall = 'http://api.openweathermap.org/data/2.5/weather?zip=35758,us&APPID=0462752314659c00665475a6e315e125';

$.getJSON(apiCall, weatherCallback);

var city;
var temperture;
var description;

function weatherCallback(weatherData) {
  city = weatherData.name;
  description = weatherData.weather[0].description;
  icon = weatherData.weather[0].icon;
  temperture = weatherData.main.temp;

  var weatherDiv = document.getElementById("weather");

  weatherDiv.innerHTML= "<li class='li-header'>Weather</li> <li>" + city + " 35758</li> <li>" + jsUcfirst(description) + "</li> <li> " + kelvinToF(temperture) +" F</li><li><img src='http://openweathermap.org/img/w/" + icon + ".png' alt='weather Data'></li>" ;
}


function jsUcfirst(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function kelvinToF(kelvin)
{
  var temp = kelvin * 9/5 - 459.67;
  var trimmedString = temp.toString().substring(0, 5);
  return  trimmedString;
}
