const componentFallbacks = {
  header: `
    <header class="site-header">
      <a class="brand" href="{{ROOT}}/index.html">UniMatch</a>
      <button class="nav-toggle" type="button" aria-label="Mở menu" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav class="site-nav" aria-label="Điều hướng chính">
        <a data-nav="home" href="{{ROOT}}/index.html">HOME</a>
        <a data-nav="schools" href="{{ROOT}}/pages/suggestions.html">Schools</a>
        <a data-nav="map" href="{{ROOT}}/pages/map.html">Map</a>
        <a data-nav="about" href="{{ROOT}}/index.html#about">About us</a>
      </nav>
      <a class="header-dot" href="{{DOT_HREF}}" aria-label="{{DOT_LABEL}}"></a>
    </header>
  `,
  footer: `
    <footer class="site-footer">
      <div>
        <strong>UniMatch</strong>
        <p>Smart university matching for Vietnamese students.</p>
      </div>
      <nav aria-label="Liên kết phụ">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Contact Support</a>
        <a href="#">University Partners</a>
      </nav>
    </footer>
  `
};

function renderTemplate(template, target) {
  return template
    .replaceAll("{{ROOT}}", target.dataset.root || ".")
    .replaceAll("{{DOT_HREF}}", target.dataset.dot || `${target.dataset.root || "."}/pages/suggestions.html`)
    .replaceAll("{{DOT_LABEL}}", target.dataset.dotLabel || "Xem gợi ý");
}

async function loadComponent(target) {
  const name = target.dataset.include;
  const root = target.dataset.root || ".";
  const url = `${root}/components/${name}.html`;
  let template = componentFallbacks[name] || "";

  try {
    const response = await fetch(url);
    if (response.ok) {
      template = await response.text();
    }
  } catch (error) {
    template = componentFallbacks[name] || "";
  }

  target.outerHTML = renderTemplate(template, target);
}

function setActiveNav(page) {
  document.querySelectorAll(".site-nav a").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.nav === page);
  });
}

function initNavigation() {
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }
}

async function initPageComponents() {
  const includes = Array.from(document.querySelectorAll("[data-include]"));
  const page = document.querySelector("[data-page]")?.dataset.page || "home";

  await Promise.all(includes.map(loadComponent));
  setActiveNav(page);
  initNavigation();
}

initPageComponents();
