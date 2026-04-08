document.addEventListener("DOMContentLoaded", function () {
  const sidebarContainer = document.getElementById("sidebar-container");

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
});