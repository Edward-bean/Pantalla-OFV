const sidebar = document.getElementById("sidebarMenu");

if (sidebar) {
  const clickable = sidebar.querySelectorAll("a.nav-item, summary.nav-item");

  clickable.forEach((item) => {
    item.addEventListener("click", () => {
      clickable.forEach((x) => x.classList.remove("active"));
      item.classList.add("active");
    });
  });

  const subitems = sidebar.querySelectorAll(".nav-subitem");
  subitems.forEach((sub) => {
    sub.addEventListener("click", () => {
      clickable.forEach((x) => x.classList.remove("active"));
      const parentSummary = sub.closest("details")?.querySelector("summary.nav-item");
      if (parentSummary) parentSummary.classList.add("active");
    });
  });
}

// ===== Sidebar (mobile hamburger) =====
const toggleBtn = document.getElementById("sidebarToggle");
const backdrop = document.getElementById("sidebarBackdrop");

function openSidebar() {
  document.body.classList.add("sidebar-open");
  if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "true");
}

function closeSidebar() {
  document.body.classList.remove("sidebar-open");
  if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "false");
}

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const isOpen = document.body.classList.contains("sidebar-open");
    isOpen ? closeSidebar() : openSidebar();
  });
}

if (backdrop) {
  backdrop.addEventListener("click", closeSidebar);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSidebar();
});

// Cierra el menú al navegar en móvil
if (sidebar) {
  const closeOnClick = sidebar.querySelectorAll("a, summary");
  closeOnClick.forEach((el) => {
    el.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 1024px)").matches) closeSidebar();
    });
  });
}


