// Practical 20 - Shared JavaScript for all pages

// 1. Highlight the current page in the navbar
let currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".navbar .nav-link").forEach(function (link) {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

// 2. Show the current year in the footer
let yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// 3. Animated counters on the home page
function animateCounter(el) {
  let target = parseInt(el.getAttribute("data-target"));
  let count = 0;
  let step = Math.ceil(target / 60);
  let timer = setInterval(function () {
    count += step;
    if (count >= target) {
      count = target;
      clearInterval(timer);
    }
    el.textContent = count + "+";
  }, 25);
}
document.querySelectorAll(".stat[data-target]").forEach(animateCounter);

// 4. Program filter on the programs page
function filterPrograms(category, button) {
  let cards = document.querySelectorAll(".program");
  for (let i = 0; i < cards.length; i++) {
    let match = category === "all" || cards[i].dataset.category === category;
    cards[i].style.display = match ? "block" : "none";
  }
  document.querySelectorAll(".filter-btn").forEach(function (b) {
    b.classList.remove("active");
  });
  button.classList.add("active");
}

// 5. Contact form validation on the contact page
let contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let name = document.getElementById("cName").value.trim();
    let phone = document.getElementById("cPhone").value.trim();
    let msg = document.getElementById("cMsg").value.trim();
    let output = document.getElementById("formMsg");

    if (name.length < 3) {
      output.className = "text-danger";
      output.textContent = "Please enter your full name.";
    } else if (!/^[6-9][0-9]{9}$/.test(phone)) {
      output.className = "text-danger";
      output.textContent = "Please enter a valid 10-digit mobile number.";
    } else if (msg === "") {
      output.className = "text-danger";
      output.textContent = "Please tell us what you need.";
    } else {
      output.className = "text-success";
      output.textContent = "Thank you, " + name + "! We will reply on WhatsApp soon.";
      contactForm.reset();
    }
  });
}
