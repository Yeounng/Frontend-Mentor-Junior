window.onload = function () {
  var screenWidth = window.screen.width;
  const imgChg = this.document.querySelector(".main-image");

  if (screenWidth <= 480) {
    imgChg.setAttribute(
      "src",
      "./assets/images/illustration-sign-up-mobile.svg"
    );
  } else
    imgChg.setAttribute(
      "src",
      "./assets/images/illustration-sign-up-desktop.svg"
    );

  window.addEventListener("resize", (e) => {
    var windowInnerWidth = window.innerWidth;

    if (windowInnerWidth <= 480) {
      imgChg.setAttribute(
        "src",
        "./assets/images/illustration-sign-up-mobile.svg"
      );
    } else
      imgChg.setAttribute(
        "src",
        "./assets/images/illustration-sign-up-desktop.svg"
      );
  });
};

const form = document.getElementById("sub-main-form");

const handleSubmit = (e) => {
  e.preventDefault(e);

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  console.log(data);
};

const subSuccess = document.querySelector(".sub-success");
const underLying = document.querySelector(".sub-main");
const dismiss = document.querySelector(".btn-dismiss");

const popup = (e) => {
  underLying.classList.toggle("active");
  subSuccess.classList.toggle("active");
};

const revert = (e) => {
  underLying.classList.toggle("active");
  subSuccess.classList.toggle("active");
};

form.addEventListener("submit", handleSubmit);
form.addEventListener("submit", popup);
dismiss.addEventListener("click", revert);
