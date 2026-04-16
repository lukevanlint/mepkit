document.addEventListener("DOMContentLoaded", function () {
  const sidebarContainer = document.getElementById("sidebar-container");
  const currentPath = window.location.pathname;

  let sidebarPath = "sidebar.html";

  if (currentPath.includes("/calculators/")) {
    const depthAfterCalculators = currentPath.split("/calculators/")[1].split("/").length - 1;
    sidebarPath = "../".repeat(depthAfterCalculators + 1) + "sidebar.html";
  }

  if (currentPath.includes("/calculators/electrical/")) {
    document.body.classList.add("electrical");
  } else if (currentPath.includes("/calculators/public-health/")) {
    document.body.classList.add("public-health");
  } else if (currentPath.includes("/calculators/mechanical/")) {
    document.body.classList.add("mechanical");
  }

  if (sidebarContainer) {
    fetch(sidebarPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load sidebar: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        sidebarContainer.innerHTML = data;

        const navLinks = sidebarContainer.querySelectorAll(".nav-links a");

        navLinks.forEach((link) => {
          const linkUrl = new URL(link.getAttribute("href"), window.location.origin);
          const linkPath = linkUrl.pathname;

          if (linkPath === currentPath) {
            link.classList.add("active");
          }
        });

        sidebarContainer.classList.add("sidebar-ready");
      })
      .catch((error) => {
        console.error("Sidebar failed to load:", error);
      });
  }
});