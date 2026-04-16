document.addEventListener("DOMContentLoaded", function () {
  const sidebarContainer = document.getElementById("sidebar-container");
  const footerContainer = document.getElementById("footer-container");
  const currentPath = window.location.pathname;

  let sidebarPath = "sidebar.html";
  let footerPath = "footer.html";

  if (currentPath.includes("/calculators/")) {
    const depthAfterCalculators = currentPath.split("/calculators/")[1].split("/").length - 1;
    const relativePrefix = "../".repeat(depthAfterCalculators + 1);

    sidebarPath = relativePrefix + "sidebar.html";
    footerPath = relativePrefix + "footer.html";
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

  if (footerContainer) {
    fetch(footerPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load footer: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        footerContainer.innerHTML = data;
      })
      .catch((error) => {
        console.error("Footer failed to load:", error);
      });
  }
}
// Calculator Search Filter
const searchInput = document.getElementById("calculator-search");

if (searchInput) {
  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();

    const navGroups = document.querySelectorAll(".nav-group");

    navGroups.forEach(group => {
      const links = group.querySelectorAll(".nav-links a");
      let hasVisibleLinks = false;

      links.forEach(link => {
        const text = link.textContent.toLowerCase();

        if (text.includes(query)) {
          link.style.display = "";
          hasVisibleLinks = true;
        } else {
          link.style.display = "none";
        }
      });

      // Hide entire group if no matches
      group.style.display = hasVisibleLinks ? "" : "none";
    });
  });
});