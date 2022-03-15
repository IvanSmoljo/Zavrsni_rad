const hamburgerButton = document.getElementsByClassName("hamburger-menu")[0];
const navbarLinks = document.getElementsByClassName("ul-nav")[0];

hamburgerButton.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
});
function xFunction(x) {
  x.classList.toggle("change");
}
