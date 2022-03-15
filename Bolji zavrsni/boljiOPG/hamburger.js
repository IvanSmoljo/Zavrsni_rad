const hamburgerButton = document.getElementsByClassName("hamburger-menu")[0];
const navbarLinks = document.getElementsByClassName("ul-nav")[0];

hamburgerButton.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
});
function xFunction(x) {
  x.classList.toggle("change");
}

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
    navbarLinks.classList.remove;
  } else {
    document.getElementById("navbar").style.top = "-1000px";
  }
  prevScrollpos = currentScrollPos;
};
