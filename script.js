const firebaseConfig = {
  apiKey: "AIzaSyDcUUnQnvxT_H8MpdMYAIFdVwTh_iWxY1I",
  authDomain: "form-data-244a1.firebaseapp.com",
  projectId: "form-data-244a1",
  storageBucket: "form-data-244a1.appspot.com",
  messagingSenderId: "136342035976",
  appId: "1:136342035976:web:284d21cb33b04d090e7bbd",
  measurementId: "G-KKPH5R63SE",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

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

  if (
    !nameError.textContent &&
    !emailError.textContent &&
    !passwordError.textContent
  ) {
    db.collection("users")
      .add({
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
      })
      .then((docRef) => {
        alert("Form submitted successfully", docRef.id);
        document.getElementById("form").reset();
      })
      .catch((error) => {
        alert(error);
      });
  }
});
