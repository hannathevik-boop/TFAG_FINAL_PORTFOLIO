document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  insertSVGLogo();
  initScrollArrow();
  initContactForm();
  initNavBackground();
});

function initMenu() {
  const nav = document.querySelector(".nav-header");
  const openBtn = document.getElementById("openMenu");
  const closeBtns = document.querySelectorAll(".close-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");

  if (!nav || !openBtn || closeBtns.length === 0) {
    console.warn("Menyknapper ikke funnet i DOM.");
    return;
  }

  openBtn.setAttribute("aria-expanded", "false");

  openBtn.addEventListener("click", () => {
    nav.classList.add("show");
    openBtn.setAttribute("aria-expanded", "true");
  });

  closeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      nav.classList.remove("show");
      openBtn.setAttribute("aria-expanded", "false");
    });
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("show");
      openBtn.setAttribute("aria-expanded", "false");
    });
  });
}

function insertSVGLogo() {
  const svgMarkup = `<!-- Sett inn SVG-markup her, beholdt fra originalen -->`;

  const logoContainer = document.createElement("div");
  logoContainer.classList.add("logo-wrapper");
  logoContainer.innerHTML = svgMarkup;

  const navHeader = document.querySelector(".nav-header");
  if (navHeader) navHeader.insertBefore(logoContainer, navHeader.firstChild);

  const footerRight = document.querySelector(".footer-right");
  if (footerRight) {
    const footerLogo = document.createElement("div");
    footerLogo.classList.add("footer-logo");
    footerLogo.innerHTML = svgMarkup;
    footerRight.appendChild(footerLogo);
  }
}

function initScrollArrow() {
  const arrowBtn = document.createElement("button");
  arrowBtn.classList.add("scroll-arrow");
  arrowBtn.setAttribute("aria-label", "Naviger på siden");

  arrowBtn.innerHTML = `
    <svg class="arrow-icon" width="30" height="50" viewBox="0 0 30 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <line x1="18" y1="0" x2="18" y2="60" stroke="black" stroke-width="2" />
      <polyline points="6,60 18,78 30,60" fill="black" stroke="black" stroke-width="2" />
    </svg>
  `;

  document.body.appendChild(arrowBtn);

  const arrowIcon = arrowBtn.querySelector(".arrow-icon");

  arrowBtn.addEventListener("click", () => {
    const atBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 10;
    window.scrollTo({ top: atBottom ? 0 : window.scrollY + window.innerHeight, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    const atBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 10;
    if (arrowIcon) arrowIcon.classList.toggle("rotate-up", atBottom);
  });
}

// 📬 4. Formspree-integrasjon med feilhåndtering
function initContactForm() {
  const form = document.getElementById("contact-form");
  const thankYou = document.getElementById("thank-you");

  if (!form || !thankYou) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" }
    })
      .then(response => {
        if (response.ok) {
          form.remove();
          thankYou.hidden = false;
        } else {
          alert("Noe gikk galt. Prøv igjen senere.");
        }
      })
      .catch(error => {
        console.error("Formspree error:", error);
        alert("Teknisk feil – prøv igjen senere.");
      });
  });
}
function initNavBackground() {
  const nav = document.querySelector(".nav-header");
  const trigger = document.querySelector(".presentation-header");

  if (!nav || !trigger) return;

  const triggerBottom = trigger.offsetTop + trigger.offsetHeight;

  window.addEventListener("scroll", () => {
    if (window.scrollY > triggerBottom) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });
}

