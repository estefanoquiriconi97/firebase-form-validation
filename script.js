document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();

  //Name field validation
  let nameInput = document.getElementById("name");
  let nameError = document.getElementById("nameError");

  if (nameInput.value.trim() === "") {
    nameError.textContent = "Please enter your name";
    nameError.classList.add("error-message");
  } else {
    nameError.textContent = "";
    nameError.classList.remove("error-message");
  }

  //Email field validation
  let emailInput = document.getElementById("email");
  let emailError = document.getElementById("emailError");
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(emailInput.value)) {
    emailError.textContent = "Please enter a valid email";
    emailError.classList.add("error-message");
  } else {
    emailError.textContent = "";
    emailError.classList.remove("error-message");
  }

  //Password field validation
  let passwordInput = document.getElementById("password");
  let passwordError = document.getElementById("passwordError");
  let passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

  if (!passwordPattern.test(passwordInput.value)) {
    passwordError.textContent =
      "Password must have at least 8 characters, numbers, uppercase and lowercase letters, and special characters";
    passwordError.classList.add("error-message");
  } else {
    passwordError.textContent = "";
    passwordError.classList.remove("error-message");
  }

});
