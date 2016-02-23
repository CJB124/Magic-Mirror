//Declare relevant variables to hold the data
var dateDiv; //Containing div
var time;
var day;

//Initialize arrays that translate numeric date values into days of the week and months
var dayArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//Begin script on page load
window.addEventListener("load", initializeTime);

//Initialize previously declared variables as DOM Elements
function initializeTime() {
  //Initialize containing div
  dateDiv = document.createElement("div");
  dateDiv.id = "date";

  //Initialize elements to be placed within the div
  time = document.createElement("span");
  time.id = "time";
  day = document.createElement("span");
  day.id = "day";

  //Append all child elements to containing div
  dateDiv.appendChild(time);
  dateDiv.appendChild(day);

  //Append containing div to body
  document.body.appendChild(dateDiv);

  //Run function to display and update info every second
  displayTime();
  setInterval(displayTime, 1000);
}

//Displays time, day of the week and month in their respective spans
function displayTime() {
  var date = new Date();
  time.innerHTML = date.toLocaleTimeString(navigator.language, {'hour':'2-digit', 'minute':'2-digit'});
  day.innerHTML = dayArr[date.getDay()] + ", " + monthArr[date.getMonth()] + " " + date.getDate();
}
