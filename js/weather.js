//Declare relevant variables to hold the data
var weatherDiv; //Containing div
var city;
var icon;
var temp;
var desc;

//Location and API key for openweathermap
var locale = "Nazareth,us";
var frontLocale = ""; //What's on the box
var APPID = "15fcf7ce49a50ab29c94526c463be37b"

//Begin script on page load
window.addEventListener("load", initializeWeather);

//Initialize previously declared variables as DOM Elements
function initializeWeather() {
  //Initialize ajax elements and weather API info
  var xmlhttp = new XMLHttpRequest();

  //Initialize containing div
  weatherDiv = document.createElement("div");
  weatherDiv.id = "weather";

  //Initialize elements to be placed within the div
  city = document.createElement("input");
  city.type = "text";
  city.id = "city";
  icon = document.createElement("img");
  icon.id = "icon";
  temp = document.createElement("span");
  temp.id = "temp";
  desc = document.createElement("span");
  desc.id = "desc";

  //Append all child elements to containing div
  weatherDiv.appendChild(city);
  weatherDiv.appendChild(icon);
  weatherDiv.appendChild(temp);
  weatherDiv.appendChild(desc);

  //Append containing div to body
  document.body.appendChild(weatherDiv);

  //Parses JSON data from XMLHttpRequest and sends it to printData upon update
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var jsonData = JSON.parse(xmlhttp.responseText);
      printData(jsonData);
    }
  }

  //Create event listeners for the city input
  //Timeout used to control if the input auto blurs
  var inputTimeout;
  var refreshTimeout = function() {
    if (inputTimeout) {
      clearTimeout(inputTimeout);
    }
    inputTimeout = setTimeout(function() { city.blur() }, 6000);
  }

  //Allow user to change weather location
  city.addEventListener("keydown", function(e) {
    refreshTimeout();
    if (e.keyCode == 13) {
      locale = city.value;
      city.blur();
      updateWeather(xmlhttp);
    }
  });

  //Refresh the timeout on the following events
  city.addEventListener("focusin", refreshTimeout);
  city.addEventListener("mousedown", refreshTimeout);
  city.addEventListener("mousemove", refreshTimeout);

  //If the user loses focus of the box, reset the value
  city.addEventListener("focusout", function() {
    clearTimeout(inputTimeout);
    city.value = frontLocale;
  });

  //Run function to update info every minute
  updateWeather(xmlhttp)
  setInterval(updateWeather, 60000, xmlhttp);
}

//Send request to openweathermap for JSON
function updateWeather(xmlhttp) {
  var url = getOpenWeatherMapURL(locale, APPID);
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

//Creates a openweathermap url out of a given location and key
function getOpenWeatherMapURL(locale, key) {
  return "http://api.openweathermap.org/data/2.5/weather?q=" + locale + "&APPID=" + APPID;
}

//Display data
function printData(jsonData) {
  city.value = frontLocale = jsonData.name;
  icon.src = "img/" + jsonData.weather[0].icon.substring(0, 2) + ".svg";
  temp.innerHTML = Math.floor((parseInt(jsonData.main.temp) - 273.15) * 1.8 + 32) + "&deg<br />";
  desc.innerHTML = jsonData.weather[0].description.toLowerCase();
}
