const submit = document.querySelector(".submit");

let input = document.querySelectorAll("input, textarea");

input.forEach((elem) => {
  const targetError = elem.ariaDescribedByElements;
  input.addEventListener("change", () => {
    targetError[0].classList.remove("active");

    if (!elem.checkValidity()) {
      elem.ariaInvalid = "true";
      targetError[0].classList.add("active");
    }
  });
});


function invalidMSG() {
  let input = document.querySelectorAll("input, textarea"); //input과 textarea 모두 선택.

  input.forEach((elem) => {
    const targetError = elem.ariaDescribedByElements;
    targetError[0].classList.remove("active");
    if (elem.checkValidity()) {
      return;
    }
    // if (elem.type === "radio" || elem.type === "checkbox") {
    //   isInvalid = !elem.checkValidity();
    //   // const groupRadio = document.querySelectorAll(`input[name="${elem.name}"]:checked`);
    //   // isInvalid = groupRadio.legnth === 0;
    //   // // 같은 name으로 짝지어진 radio나 checkbox group에서 check된 리스트를 가져오는데 리스트 길이가 0이면 false값을 저장시킴
    // } else {
    //   isInvalid = !elem.value.trim(); // trim() 은 텍스트 좌우 공백을 제거해 공백으로 발생할 수 있는 문제를 사전 차단
    // }
    if (!elem.checkValidity()) {
      elem.ariaInvalid = "true";
      targetError[0].classList.add("active");
    } else {
      elem.ariaInvalid = "false";
      targetError[0].classList.remove("active");
    }
  });
}
