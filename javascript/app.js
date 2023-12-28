// Database of user credentials
var database = [
  { username: "truongadmin", password: "NewPass123@@" },
  { username: "thaison", password: "3303" },

];

// Check if the entered credentials match with any in the database
function isUserValid(username, password) {
  for (var i = 0; i < database.length; i++) {
    if (database[i].username === username && database[i].password === password) {
      return true;
    }
  }
  return false;
}

// Login form submit event
var form = document.querySelector("form");
form.addEventListener("submit", function(e) {
  e.preventDefault();

  var username = form.elements.username.value;
  var password = form.elements.password.value;

  if (isUserValid(username, password)) {
    window.location.href = "stockiphoneview.html";
  } else {
    alert("Đăng nhập sai!");
  }
});
