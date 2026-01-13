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