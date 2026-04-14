document.addEventListener("DOMContentLoaded", function () {
  const sidebarContainer = document.getElementById("sidebar-container");

  /* =========================
     Sidebar Load + Active Link
  ========================= */

  if (sidebarContainer) {
    fetch("/sidebar.html")
      .then((response) => response.text())
      .then((data) => {
        sidebarContainer.innerHTML = data;

        const currentPath = window.location.pathname.split("/").pop();
        const navLinks = sidebarContainer.querySelectorAll(".nav-links a");

        navLinks.forEach((link) => {
          const linkPath = link.getAttribute("href").split("/").pop();
          if (linkPath === currentPath) {
            link.classList.add("active");
          }
        });
      })
      .catch((error) => {
        console.error("Sidebar failed to load:", error);
      });
  }

  /* =========================
     Discipline Auto-Detection
  ========================= */

  const path = window.location.pathname;

  if (
    path.includes("load-current") ||
    path.includes("power-calculator") ||
    path.includes("voltage-drop") ||
    path.includes("cable-sizing")
  ) {
    document.body.classList.add("electrical");
  } 
  else if (
    path.includes("water") ||
    path.includes("tank") ||
    path.includes("calorifier")
  ) {
    document.body.classList.add("public-health");
  } 
  else if (path.includes("calculators")) {
    document.body.classList.add("mechanical");
  }
});