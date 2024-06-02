function toggleToc() {
  const tocElement = document.querySelector(".post-toc");
  tocElement.classList.toggle("show");

  const tocToggler = document.querySelector(".toc-toggler");
  tocToggler.classList.toggle("active");
}

function setTheme(theme) {
  const themeToggler = document.querySelector("#theme-toggle");
  const themeCssElement = document.querySelector("link#syntax-theme");
  const { sunIcon, moonIcon } = themeToggler.dataset;

  // switch out syntax highlight theme
  if (themeCssElement)
    themeCssElement.href = `/syntax-theme-${theme}.css`;

  if (theme == "dark") {
    document.body.classList.add("dark");
    sessionStorage.setItem("theme", "dark");
    themeToggler.innerHTML = sunIcon;
  } else {
    document.body.classList.remove("dark");
    sessionStorage.setItem("theme", "light");
    themeToggler.innerHTML = moonIcon;
  }
}

function toggleTheme() {
  const currentTheme = sessionStorage.getItem("theme");

  if (currentTheme == "light") {
    setTheme("dark");
  } else {
    setTheme("light");
  }
}

function initThemeToggle() {
  const themeToggler = document.querySelector("#theme-toggle");
  const preferDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = sessionStorage.getItem("theme");
  const { sunIcon, moonIcon } = themeToggler.dataset;

  themeToggler.addEventListener("click", () => toggleTheme());

  if (currentTheme) {
    setTheme(currentTheme);
    return;
  }

  if (preferDarkMode.matches) {
    setTheme("dark");
  } else {
    setTheme("light");
  }
}

initThemeToggle();
