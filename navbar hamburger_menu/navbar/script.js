const menuIcon = document.getElementById("menu-icon");
const navlinks = document.getElementById("nav-links");

menuIcon.addEventListener("click", () => {
  navlinks.classList.toggle("active");
});
