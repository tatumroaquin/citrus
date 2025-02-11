function toggleToc() {
  const tocElement = document.querySelector(".post-toc");
  tocElement.classList.toggle("show");

  const tocToggler = document.querySelector(".top-nav__toc-toggle");
  tocToggler.classList.toggle("active");
}

function setTheme(theme) {
  const themeToggler = document.querySelector("#theme-toggle");
  const themeCssElement = document.querySelector("link#syntax-theme");
  const { sunIcon, moonIcon } = themeToggler.dataset;

  // switch out syntax highlight theme
  if (themeCssElement) themeCssElement.href = `/syntax-theme-${theme}.css`;

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

// https://sparanoid.com/work/lightense-images/
function initImageZoom() {
  window.addEventListener("load", () =>
    Lightense(".post__article img", {
      background: "rgba(35, 38, 39, 0.6)",
    }),
  );
}

function populateCopyButtons() {
  const codeBlocks = document.querySelectorAll("pre");
  const clipboardIcons = document.querySelector(".clipboard-icons");

  // early return when copy assets does not exist
  if (!clipboardIcons) return;

  const { copyIcon, checkIcon } = clipboardIcons.dataset;

  // generate buttons for each codeblock
  for (const block of codeBlocks) {

    // skip code blocks with mermaid class
    if (block.classList.contains("mermaid")) continue;

    const button = document.createElement("button");
    button.className = "copy";
    button.ariaLabel = "copy";
    button.innerHTML = copyIcon;

    button.addEventListener(
      "click",
      async () => await copyAction(block, button, copyIcon, checkIcon),
    );

    const container = document.createElement("div");
    container.className = "codeblock";
    container.appendChild(block.cloneNode(true));
    container.appendChild(button);

    block.replaceWith(container);
  }
}

async function copyAction(block, button, copyIcon, checkIcon) {
  await navigator.clipboard.writeText(block.textContent);
  button.innerHTML = checkIcon;
  button.classList.add("copy--off");

  button.disabled = true;

  setTimeout(() => {
    button.innerHTML = copyIcon;
    button.classList.remove("copy--off");
    button.disabled = false;
  }, 1500);
}

function initFootnoteBacklink() {
  const footnotes = document.querySelectorAll('.footnote-definition');
  const { backlinkIcon } = document.querySelector('.backlink-icon').dataset;

  if (!footnotes) return;

  for (const footnote of footnotes) {
    // create backlink button
    const button = document.createElement('button');
    button.className = 'backlink';
    button.ariaLabel = 'backlink';
    button.innerHTML = backlinkIcon;

    // when backlink is clicked scrollback to the footnote-reference
    button.addEventListener('click', () => {
      const cssSelector = `.footnote-reference a[href="#${footnote.id}"`;
      const reference = document.querySelector(cssSelector);
      reference.scrollIntoView();
    });

    // append before the footnote marker and after the footnote content
    footnote.insertBefore(button, footnote.children[1]);
  }
}

initThemeToggle();
if (document.querySelector('.post')) {
	initImageZoom();
	populateCopyButtons();
	initFootnoteBacklink();
}
