// Practical 19 - Form validation using functions and events

// Shows an error message under a field
function showError(fieldId, message) {
  let field = document.getElementById(fieldId);
  document.getElementById(fieldId + "Error").textContent = message;
  if (field) {
    field.classList.add("invalid");
    field.classList.remove("valid");
  }
  return false;
}

// Clears the error message of a field
function showOk(fieldId) {
  let field = document.getElementById(fieldId);
  document.getElementById(fieldId + "Error").textContent = "";
  if (field) {
    field.classList.remove("invalid");
    field.classList.add("valid");
  }
  return true;
}

function validateName() {
  let name = document.getElementById("name").value.trim();
  if (name === "") return showError("name", "Name is required.");
  if (!/^[A-Za-z ]{3,}$/.test(name)) return showError("name", "Use at least 3 letters only.");
  return showOk("name");
}

function validateEmail() {
  let email = document.getElementById("email").value.trim();
  let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(email)) return showError("email", "Enter a valid email address.");
  return showOk("email");
}

function validatePassword() {
  let pass = document.getElementById("password").value;
  if (pass.length < 8) return showError("password", "Password must be at least 8 characters.");
  if (!/[0-9]/.test(pass)) return showError("password", "Password must contain a number.");
  return showOk("password");
}

function validateConfirm() {
  let pass = document.getElementById("password").value;
  let confirm = document.getElementById("confirm").value;
  if (confirm === "" || confirm !== pass) return showError("confirm", "Passwords do not match.");
  return showOk("confirm");
}

function validateGender() {
  let selected = document.querySelector("input[name='gender']:checked");
  if (!selected) return showError("gender", "Please select your gender.");
  return showOk("gender");
}

function validatePhone() {
  let phone = document.getElementById("phone").value.trim();
  if (!/^[6-9][0-9]{9}$/.test(phone)) return showError("phone", "Enter a valid 10-digit mobile number.");
  return showOk("phone");
}

function validateCourse() {
  if (document.getElementById("course").value === "") return showError("course", "Please choose a course.");
  return showOk("course");
}

function validateTerms() {
  if (!document.getElementById("terms").checked) return showError("terms", "You must accept the terms.");
  return showOk("terms");
}

// Live validation: check each field when the user leaves it
document.getElementById("name").addEventListener("blur", validateName);
document.getElementById("email").addEventListener("blur", validateEmail);
document.getElementById("password").addEventListener("keyup", validatePassword);
document.getElementById("confirm").addEventListener("keyup", validateConfirm);
document.getElementById("phone").addEventListener("blur", validatePhone);
document.getElementById("course").addEventListener("change", validateCourse);

// Final check on submit
document.getElementById("regForm").addEventListener("submit", function (event) {
  event.preventDefault();

  let checks = [validateName(), validateEmail(), validatePassword(), validateConfirm(),
                validateGender(), validatePhone(), validateCourse(), validateTerms()];

  if (checks.includes(false)) {
    document.getElementById("success").textContent = "";
    return;
  }

  let name = document.getElementById("name").value.trim();
  document.getElementById("success").textContent =
    "Thank you, " + name + "! Your registration is successful.";
  this.reset();
  document.querySelectorAll(".valid").forEach(function (el) { el.classList.remove("valid"); });
});
