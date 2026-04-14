const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll("nav ul a");
const revealItems = document.querySelectorAll(
  ".reveal-up, .reveal-left, .reveal-right"
);

// -------------------------
// Active nav highlighting
// -------------------------
const sectionObserverOptions = {
  root: null,
  rootMargin: "-45% 0px -45% 0px",
  threshold: 0
};

function highlightNav(id) {
  navLinks.forEach((link) => {
    link.parentElement.classList.remove("active");
    link.removeAttribute("aria-current");
  });

  const activeLink = document.querySelector(`nav ul a[href="#${id}"]`);
  if (activeLink) {
    activeLink.parentElement.classList.add("active");
    activeLink.setAttribute("aria-current", "page");
  }
}

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      highlightNav(entry.target.id);
    }
  });
}, sectionObserverOptions);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

// -------------------------
// Scroll reveal animations
// -------------------------
const revealObserverOptions = {
  root: null,
  threshold: 0.18,
  rootMargin: "0px 0px -40px 0px"
};

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target); // reveal once only
    }
  });
}, revealObserverOptions);

revealItems.forEach((item) => {
  revealObserver.observe(item);
});

// Make intro elements visible right away on page load
window.addEventListener("load", () => {
  const introRevealItems = document.querySelectorAll(
    "#intro .reveal-left, #intro .reveal-right, #intro .reveal-up"
  );

  introRevealItems.forEach((item) => {
    item.classList.add("in-view");
  });
});

// Footer year
const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}