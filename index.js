const menuButton = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".overlay");
const menuOpen = document.querySelector(".gnb-list");
const menuDepth = document.querySelector(".depth-1");

menuButton.addEventListener("click", () => {
  menuButton.classList.toggle("active");
  overlay.classList.toggle("active");
  menuOpen.classList.toggle("active");
});

menuDepth.addEventListener("click", () => {
  menuDepth.classList.toggle("active");
});

window.addEventListener("resize", () => {
  let screensize = window.innerWidth;
  console.log(screensize);
  if (screensize >= 480) {
    menuButton.classList.remove("active");
    overlay.classList.remove("active");
    menuOpen.classList.remove("active");
    menuDepth.classList.remove("active");
  }
});
