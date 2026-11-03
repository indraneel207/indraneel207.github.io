const themeButton = document.querySelector<HTMLButtonElement>(
  "[data-theme-toggle]"
);
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)");

function updateThemeLabel() {
  const dark = document.documentElement.dataset.theme === "dark";
  themeButton?.setAttribute(
    "aria-label",
    `Switch to ${dark ? "light" : "dark"} theme`
  );
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", dark ? "#141b1b" : "#f6f4ee");
}

if (themeButton) {
  themeButton.hidden = false;
  updateThemeLabel();
  themeButton.addEventListener("click", () => {
    const theme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {}
    updateThemeLabel();
  });
}

preferredTheme.addEventListener("change", event => {
  let explicitTheme = false;
  try {
    explicitTheme = ["light", "dark"].includes(
      localStorage.getItem("portfolio-theme") || ""
    );
  } catch {}
  if (!explicitTheme) {
    document.documentElement.dataset.theme = event.matches ? "dark" : "light";
    updateThemeLabel();
  }
});

const menuButton = document.querySelector<HTMLButtonElement>(".menu-toggle");
const mobileNav = document.querySelector<HTMLElement>(".mobile-nav");
function closeMenu() {
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "Open navigation");
  mobileNav?.classList.remove("is-open");
}
if (menuButton && mobileNav) {
  menuButton.hidden = false;
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation"
    );
    mobileNav.classList.toggle("is-open", open);
  });
  mobileNav
    .querySelectorAll("a")
    .forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => {
    if (
      event.key === "Escape" &&
      menuButton.getAttribute("aria-expanded") === "true"
    ) {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener("click", event => {
    if (
      event.target instanceof Node &&
      !document.querySelector(".site-header")?.contains(event.target)
    )
      closeMenu();
  });
  window.matchMedia("(min-width: 900px)").addEventListener("change", event => {
    if (event.matches) closeMenu();
  });
}

const copyButton =
  document.querySelector<HTMLButtonElement>("[data-copy-email]");
if (copyButton && navigator.clipboard) {
  copyButton.hidden = false;
  copyButton.addEventListener("click", async () => {
    const status = document.querySelector<HTMLElement>("[data-copy-status]");
    try {
      await navigator.clipboard.writeText(copyButton.dataset.copyEmail || "");
      if (status) status.textContent = "Email address copied.";
    } catch {
      if (status)
        status.textContent =
          "Copy unavailable. Use the email link or select the address.";
    }
  });
}

const navLinks = [
  ...document.querySelectorAll<HTMLAnchorElement>("[data-section-link]")
];
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          if (link.dataset.sectionLink === entry.target.id)
            link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    },
    {rootMargin: "-15% 0px -65% 0px"}
  );
  document
    .querySelectorAll("section[id]")
    .forEach(section => observer.observe(section));
}

document.addEventListener("click", event => {
  if (!(event.target instanceof Element)) return;
  const link = event.target.closest<HTMLAnchorElement>("a");
  if (!link) return;
  const analytics = (window as Window & {gtag?: (...args: unknown[]) => void})
    .gtag;
  if (link.dataset.project)
    analytics?.("event", "project_open", {project: link.dataset.project});
  else if (link.href.includes("drive.google.com"))
    analytics?.("event", "resume_click");
  else if (link.protocol === "mailto:")
    analytics?.("event", "contact_click", {method: "email"});
});
