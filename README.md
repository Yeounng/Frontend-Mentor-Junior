# Frontend Mentor - BMI Calculator Health Tool

해당 프로젝트 진행중 막히는 부분이나 궁금한 부분에 AI를 적극 활용하고 내용을 검토하였음.
프로젝트 단위로 채팅을 구성해 고민했던 부분이나 궁금해서 물어봤던 부분, 이해 되지 않았던 부분에 대한 이야기를 주고받았고 프로젝트 완성 후 전체 채팅 내용을 마크다운으로 요약, 정리한 내용입니다.

### Frontend Thinking Log

> 날짜: 2026-01-27  
> 작업 유형: 마크업 최적화 / 기능 구현 / 리팩터링

### Screenshot

![BMI Calculator](/bmi-screenshot.png)

### Links

- (Solution URL)[https://www.frontendmentor.io/solutions/bmi-calculator--ZXhFJPBD]
- (Live Site URL)[https://sensational-sundae-4a105f.netlify.app/]

## 1. 프로젝트 진행 과정에서 마주친 문제

**Problem 1: 시각적 디자인과 접근성(Accessibility) 사이의 충돌**
디자인상에는 `form`의 제목이나 `legend` 요소가 명시되어 있지 않았으나, 보조기기 사용자에게는 현재 입력창이 무엇을 위한 것인지(BMI 계산)와 입력 그룹의 성격(단위 선택)을 알려줄 명확한 맥락이 부족했다.

**Problem 2: "Limitations of BMI" 섹션의 복잡한 이형 배치**
그리드(Grid) 레이아웃을 염두에 두지 않고 모바일 레이아웃 위주로 마크업을 진행하다 보니, 데스크톱 버전의 복잡한 카드 배치 구조를 구현할 때 HTML 구조를 수정해야 하는 상황이 발생했다.

**Problem 3: 대체 텍스트(Alt Text)의 오용**
단순 장식용 아이콘이나 로고에 `decorative logo`, `health icon`과 같이 형태를 묘사하는 텍스트를 적는 것이 보조기기 사용자에게 오히려 노이즈가 될 수 있다는 점을 인지했다.

---

## 2. 내가 세운 가설 (왜 이렇게 하면 좋을까?)

**Problem 1 (Accessibility)**
시각적으로는 미니멀한 디자인을 유지하면서, `sr-only` 클래스를 활용해 접근성 트리(Accessibility Tree)에만 정보를 제공하면 디자인과 정보 전달력을 모두 잡을 수 있을 것이다.

**Problem 2 (Data Flow)**
개별 변수에 값을 담는 대신, DOM 요소 자체를 참조하는 **상태 객체**를 관리하면 유닛 전환 시에도 데이터의 연속성을 유지하며 연산을 처리할 수 있을 것이다.

---

## 3. 고민했던 선택지들

**Problem 1: 폼(Form) 제목 제공 방식**

1. `aria-label` 속성 사용: 마크업은 깔끔해지지만 일부 환경에서 호환성이 낮을 수 있음.
2. `sr-only` 클래스가 적용된 `h2` 태그: 가장 표준적이며 보조기기 내비게이션(헤딩 간 이동)에 유리함.

**Problem 2: 데이터 관리 방식**

1. 입력 시점마다 `querySelector`로 값을 찾기: 코드가 길어지고 브라우저 리소스를 낭비함.
2. `const userData` 객체에 엘리먼트 참조를 캐싱: 한 번의 선언으로 지속적인 데이터 접근이 가능함.

---

## 4. 최종 선택과 이유 ⭐️ 어떻게 해결했는가?

**1. 의미론적 마크업과 sr-only 기법 적용**

- **해결:** 디자인에 없는 `h2`("Calculator Inputs")와 `legend`("Select Measurement Unit System")를 `sr-only`로 추가했다.
- **이유:** 시각적 디자인을 해치지 않으면서 보조기기 사용자가 폼의 성격과 입력 그룹의 주제를 즉시 파악할 수 있도록 하기 위함이다.

**2. 객체 기반 데이터 참조(Reference) 관리**

- **해결:** `const userData = { mHeight: document.querySelector("#height-cm"), ... }` 형식을 도입했다.
- **이유:** 변수에 값을 복사하는 것이 아니라 '리모컨' 역할을 하는 엘리먼트 자체를 쥐고 있어, 유닛 전환 시에도 `userData.mHeight.value`를 통해 실시간 데이터 연동이 가능했기 때문이다.

**3. 목적 지향적 대체 텍스트(Alt) 전략**

- **해결:** 장식용 아이콘은 `alt=""`로 비우고, 기능적 로고는 서비스 명칭인 "BMI Calculator"로 기재했다.
- **이유:** 보조기기 사용자에게 불필요한 형태 설명을 배제하고 핵심 정보만 전달하기 위함이다.

---

## 6. 실제로 구현하면서 느낀 점

- **어려웠던 점:** 자바스크립트 객체의 참조(Reference) 개념을 실제 DOM 조작에 적용하는 과정이 생소했지만, 이를 통해 데이터 연속성 문제를 해결했을 때의 쾌감이 컸다.
- **깨달은 점:** 단순한 오타(ID 불일치)가 전체 렌더링 파이프라인을 멈출 수 있다는 것을 경험하며, 명확한 네이밍 규칙의 중요성을 다시 한번 느꼈다.

---

## 7. 다시 한다면 바꾸고 싶은 점 (회고)

- **상태 관리의 모듈화:** 현재는 하나의 스크립트 파일에 모든 로직이 담겨 있는데, 단위 변환 로직과 BMI 계산 엔진을 별도의 모듈로 분리해 보고 싶다.
- **그리드 최적화:** 처음부터 데스크톱의 이형 배치를 고려하여 `grid-template-areas`를 설계했다면 HTML 구조 수정을 최소화했을 것이다.

---

## 8. 이번 작업을 통해 배운점, 활용한 리소스

- **배운 점:** 사용자에게는 실제 속도보다 **논리적인 데이터 흐름**과 **명확한 피드백(aria-live)**이 더 중요할 수 있다는 것을 배웠다.
- **유용한 링크:**
  - [W3C - Web Accessibility Tutorials](https://www.w3.org/WAI/tutorials/forms/)
  - [MDN - JavaScript Object Basics](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/Basics)
