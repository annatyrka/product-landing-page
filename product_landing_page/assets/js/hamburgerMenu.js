/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu  */

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector("#nav-bar");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}
