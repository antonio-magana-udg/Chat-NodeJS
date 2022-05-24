// Make connection
var socket = io();
// Query DOM
var message = document.getElementById("message"),
  handle = document.getElementById("handle"),
  btn = document.getElementById("send"),
  output = document.getElementById("output"),
  feedback = document.getElementById("feedback");

// Emit events
btn.addEventListener("click", function () {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value,
  });
  message.value = "";
});

// Execute a function when the user presses a key on the keyboard
message.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    btn.click();
  }
});

message.addEventListener("keypress", function () {
  socket.emit("typing", handle.value);
});

// Listen for events
socket.on("chat", function (data) {
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});

socket.on("typing", function (data) {
  feedback.innerHTML = "<p><em>" + data + " esta escribiendo...</em></p>";
});
