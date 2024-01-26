# Form Validation with Firebase

You can try the application at the following link: <a href="https://kiricode-form-validation.netlify.app/" target="_blank">Form Validation</a>

## Firebase Configuration

Before getting started, make sure to obtain the necessary configuration data from Firebase. You should have a Firebase account and a configured project. Then, replace the values of `API_KEY`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`, and `measurementId` in the `firebaseConfig` object with the corresponding values provided by Firebase.

```javascript
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
```

## Firestore Initialization

After setting up Firebase, we initialize Firestore and obtain a reference to the service. This allows us to interact with the Firebase database.

```javascript
const db = firebase.firestore();
```

## Form Validation

The next step is to validate the form fields when it is submitted. An event listener is added to the element with the ID "form" to capture the submission event.

```javascript
document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  // Form validation code
});
```

Within the submission event, we perform validation on each form field one by one.

### Name Field Validation

```javascript
let nameInput = document.getElementById("name");
let nameError = document.getElementById("nameError");

if (nameInput.value.trim() === "") {
  nameError.textContent = "Please enter your name";
  nameError.classList.add("error-message");
} else {
  nameError.textContent = "";
  nameError.classList.remove("error-message");
}
```

We check if the value of the name field is blank. If so, we display an error message and apply a CSS class to highlight the error. Otherwise, we remove any error message and corresponding CSS class.

### Email Field Validation

```javascript
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
```

We use a regular expression (`emailPattern`) to validate the basic format of an email address. If the value of the email field does not match the pattern, we display an error message and apply the corresponding CSS class.

### Password Field Validation

```javascript
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
```

We use another regular expression (`passwordPattern`) to validate the password. The password must have between 8 and 15 characters, at least one lowercase letter, one uppercase letter, one number, and one special character. If the password does not meet the pattern, we display an error message and apply the corresponding CSS class.

### Form Submission and Firebase Storage

```javascript
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
```

If there are no error messages in any of the fields, we proceed to submit the form. We use the `add()` function of Firestore to add a new document to the "users" collection in the Firebase database. The document contains the values entered in the form fields. If the submission is successful, we display an alert with a success message and reset the form. If an error occurs, we display an alert with the error message.
