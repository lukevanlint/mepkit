const path = window.location.pathname;

if (path.includes("/calculators/electrical/")) {
  document.body.classList.add("electrical");
} else if (path.includes("/calculators/public-health/")) {
  document.body.classList.add("public-health");
} else if (path.includes("/calculators/mechanical/")) {
  document.body.classList.add("mechanical");
}