const contactForm = document.querySelector("form");
const submitBTN = document.querySelector(".submit");

contactForm.addEventListener("focusout", (e) => {
  const successMSG = document.querySelector(".success-message");
  successMSG.classList.remove("active");
  const target = e.target;
  if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
    //HTML문서의 DOM 구조에서 가져온 요소는 대문자. div -> DIV가 된다. 소문자로 적으면 작동안함!!
    fieldValidate(target);
  }
});

function fieldValidate(elem) {
  const targetError = elem.ariaDescribedByElements;
  targetError[0].classList.remove("active");

  if (!targetError || targetError.length === 0) {
    return; //현재 ariaDescribedBy로 연결된 에러메세지는 하나이지만 해당 기능은 리스트를 반환함. 메세지가 여러개이고 조건에따라 특정 메세지를 출력한다면 에러가 없을때 함수 종료하는 로직 필요
  }

  let isInvalid = elem.checkValidity();

  if (!isInvalid) {
    elem.ariaInvalid = "true";
    targetError[0].classList.add("active");
  } else {
    elem.ariaInvalid = "false";
    targetError[0].classList.remove("active");
  }
}

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const fields = document.querySelectorAll("input, textarea");
  fields.forEach((elem) => {
    fieldValidate(elem);
  });

  let validform = contactForm.checkValidity();
  if (validform) {
    const successMSG = document.querySelector(".success-message");
    successMSG.classList.add("active");
    console.log("The form is valid! ready for sent");
    contactForm.reset();
  } else {
    submitBTN.classList.remove("shake");

    // void submitBTN.offsetWidth; --> offsetWidth, offsetHeight, getComputedStyle() 같은 프로퍼티는 계산된 값(Computed Value)을 반환
    // classA 제거 후 즉시 classA 추가 -> 각 단계 큐에 기록. 렌더링 파이프라인 가동x(style->layout->paint)
    // 강제 reflow -> 큐를 비우고 style,layout단계를 실행해서 widht를 계산. -> remove 상태가 실제 반영, add 명령 수행 -> 애니메이션 트리거
    // layout Thrashing(레이아웃 스래싱) ->리소스 낭비, 성능저하(복잡도상승시) -> 안티패턴

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        submitBTN.classList.add("shake");
      });
    }); // --> rAF안에서 다시 rAF를 호출해 브라우저가 변경된 스타일을 인지할 시간 줌

    submitBTN.classList.add("shake");
    console.log("check invalid fields..");
  }
});

submitBTN.addEventListener("animationend", () => {
  submitBTN.classList.remove("shake");
});
//TODO
//Submit버튼 클릭시 모든 필드 순회하며 input,textarea 검증
//검증 실패시 버튼 shake모션, 비활성애니메이션
//전송 성공시 메세지 출력 + 폼 내부 값 초기화.
