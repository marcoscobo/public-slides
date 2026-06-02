document.addEventListener("DOMContentLoaded", () => {
  console.log("Sitio cargado correctamente desde Apache");

  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll("nav a");

  links.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.style.color = "#2563eb";
    }
  });
});