//Declare relevant variables to hold the message
var messageDiv; //Containing div
var message;

//Initialize arrays containing relevant messages based on time of day
var morningArr = ["Good morning!", "Rise and shine!", "Wakey wakey!", "Morning!"];
var noonArr = ["How's your day?", "Lookin' good!", "Having a good day?", "Hello there beautiful!"];
var nightArr = ["Getting sleepy?", "Time to relax.", "Kick back.", "Sleepy time."];

window.addEventListener("load", initializeMessage);

function initializeMessage() {
  //Initialize containing div
  messageDiv = document.createElement("div");
  messageDiv.id = "message";

  //Initialize elements within the div
  message = document.createElement("span");
  message.id = "text";

  //Append all child elements to containing div
  messageDiv.appendChild(message);

  //Append containing div to body
  document.body.appendChild(messageDiv);

  //Run function to update message every 10 minutes
  displayMessage();
  setInterval(displayMessage, 600000);
}

function displayMessage() {
  var date = new Date();
  if (date.getHours() >= 4 && date.getHours() < 12) { //Morning
    message.innerHTML = morningArr[Math.floor(Math.random() * morningArr.length)];
  } else if (date.getHours() >= 12 && date.getHours() < 20) { //Noon
    message.innerHTML = noonArr[Math.floor(Math.random() * noonArr.length)];
  } else { //Night
    message.innerHTML = nightArr[Math.floor(Math.random() * nightArr.length)];
  }
}
