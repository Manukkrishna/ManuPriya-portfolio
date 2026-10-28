// Manu Priya portfolio interactions
const menuToggle = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#nav-menu");
const themeToggle = document.querySelector("#theme-toggle");

// Mobile menu
menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

// Theme switcher (remembers choice in this browser)
const savedTheme = localStorage.getItem("manu-portfolio-theme");
if (savedTheme === "light") document.body.classList.add("light-theme");
updateThemeButton();

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  const theme = document.body.classList.contains("light-theme") ? "light" : "dark";
  localStorage.setItem("manu-portfolio-theme", theme);
  updateThemeButton();
});

function updateThemeButton() {
  const isLight = document.body.classList.contains("light-theme");
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
  themeToggle.title = isLight ? "Switch to dark theme" : "Switch to light theme";
  themeToggle.innerHTML = isLight
    ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.5 8.5 0 1 0 20.5 15.5Z"></path></svg>'
    : '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"></path></svg>';
}

// Filter skills
const filterButtons = document.querySelectorAll(".filter-btn");
const skillTiles = document.querySelectorAll(".skill-tile");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    const filter = button.dataset.filter;

    skillTiles.forEach((tile) => {
      const show = filter === "all" || tile.dataset.category === filter;
      tile.hidden = !show;
      if (show) {
        tile.classList.remove("is-visible");
        requestAnimationFrame(() => tile.classList.add("is-visible"));
      }
    });
  });
});

// Reveal elements as they enter the viewport
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

// Contact form: prepares a message in the visitor's email application.
// Replace the placeholder address below with your real email.
const portfolioEmail = "your.email@example.com";
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (portfolioEmail === "your.email@example.com") {
    formStatus.textContent = "Before using this form, replace portfolioEmail in script.js with your email address.";
    return;
  }

  const name = document.querySelector("#contact-name").value.trim();
  const sender = document.querySelector("#contact-email").value.trim();
  const message = document.querySelector("#contact-message").value.trim();

  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${sender}\n\nMessage:\n${message}`);
  formStatus.textContent = "Opening your email application...";
  window.location.href = `mailto:${portfolioEmail}?subject=${subject}&body=${body}`;
});
