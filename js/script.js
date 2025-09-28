// Check script loaded
console.log("script.js is loaded");

// =========================
// Navbar toggle
// =========================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// =========================
// About Page hover effects
// =========================
const aboutHeadings = document.querySelectorAll('.about-content h2');

aboutHeadings.forEach(h => {
  h.addEventListener('mouseenter', () => {
    h.style.color = '#ffca28';
    h.style.transform = 'scale(1.1)';
    h.style.transition = 'all 0.3s ease';
  });

  h.addEventListener('mouseleave', () => {
    h.style.color = '#f9a825';
    h.style.transform = 'scale(1)';
  });
});

// About button hover
const aboutButton = document.querySelector('.about-content .btn');
if (aboutButton) {
  aboutButton.addEventListener('mouseenter', () => {
    aboutButton.style.backgroundColor = '#333';
    aboutButton.style.color = '#fff';
    aboutButton.style.transform = 'scale(1.1)';
    aboutButton.style.transition = 'all 0.3s ease';
  });

  aboutButton.addEventListener('mouseleave', () => {
    aboutButton.style.backgroundColor = '#f9a825';
    aboutButton.style.color = '#333';
    aboutButton.style.transform = 'scale(1)';
  });
}

// =========================
// Food cards → modal popup
// =========================
const modal = document.getElementById("foodModal");
const modalTitle = document.getElementById("foodTitle");
const modalBenefits = document.getElementById("foodBenefits");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".food-card").forEach(card => {
  card.addEventListener("click", () => {
    const title = card.getAttribute("data-title");
    const benefits = card.getAttribute("data-benefits");

    modalTitle.textContent = title;
    modalBenefits.textContent = benefits;
    modal.style.display = "block";
  });
});

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// =========================
// Popular Foods Slider
// =========================
const slides = document.querySelector('.slides');
const slideCount = document.querySelectorAll('.slide').length;
let currentIndex = 0;

function showNextSlide() {
  currentIndex = (currentIndex + 1) % slideCount;
  const offset = -currentIndex * 100;
  slides.style.transform = `translateX(${offset}%)`;
}
setInterval(showNextSlide, 3000);

// =========================
// Scroll animations
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  animatedElements.forEach(el => observer.observe(el));
});

// =========================
// Contact form popup + submission
// =========================
const contactForm = document.getElementById("contactForm");
const statusDiv = document.getElementById("status");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Show popup immediately
    alert("Your message has been sent successfully!");

    // Collect form data
    const formData = {
      name: contactForm.name.value,
      email: contactForm.email.value,
      message: contactForm.message.value,
    };

    try {
      const res = await fetch("/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      statusDiv.textContent = data.msg;
      statusDiv.style.color = data.success ? "green" : "red";
    } catch (err) {
      console.error(err);
      statusDiv.textContent = "Something went wrong!";
      statusDiv.style.color = "red";
    }

    // Reset form
    contactForm.reset();
  });
}

// =========================
// Random wallpaper
// =========================
const wallpapers = [
  "images/wallpaper.jpg",
  "images/wallpaper2.jpg",
  "images/wallpaper3.jpg",
  "images/wallpaper4.jpg"
];
const randomWallpaper = wallpapers[Math.floor(Math.random() * wallpapers.length)];
document.body.style.backgroundImage = `url(${randomWallpaper})`;


// server.js
const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
const PORT = 5000;

// Replace with your Twilio Account SID & Auth Token
const accountSid = "YOUR_TWILIO_ACCOUNT_SID";
const authToken = "YOUR_TWILIO_AUTH_TOKEN";
const client = new twilio(accountSid, authToken);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve your frontend files (optional if you want everything in one project)
app.use(express.static("public"));

// Endpoint that handles form submissions
app.post("/send-message", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const sms = await client.messages.create({
      body: `📩 New Website Message\nFrom: ${name} (${email})\nMessage: ${message}`,
      from: "whatsapp:+14457775019", // Twilio number
      to: "whatsapp: +254742719135" // Your own phone
    });

    console.log("Message sent:", sms.sid);

    res.json({ success: true, msg: "Message sent successfully via Twilio!" });
  } catch (err) {
    console.error("Twilio error:", err);
    res.json({ success: false, msg: "Failed to send message." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);

});


const res = await fetch("/send-message", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});

