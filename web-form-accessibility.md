# 웹 폼 접근성 완벽 가이드

## 목차

1. [네이티브 폼 컨트롤](#네이티브-폼-컨트롤)
2. [라벨 연결](#라벨-연결)
3. [관련 필드 그룹화](#관련-필드-그룹화)
4. [자동완성 속성](#자동완성-속성)
5. [입력 검증](#입력-검증)
6. [포괄적 입력 필드](#포괄적-입력-필드)

---

## 네이티브 폼 컨트롤

### 1. 텍스트 입력 필드

**기본 특징:**

- 모든 텍스트 컨트롤은 공통 특성 공유
- `readonly`: 값 수정 불가, 폼 데이터로 전송됨
- `disabled`: 값 수정 불가, 폼 데이터로 전송 안 함
- `placeholder`: 입력 필드의 목적을 설명하는 텍스트
- `size`: 입력 박스의 물리적 크기
- `maxlength`: 입력 가능한 최대 문자 수
- `spellcheck`: 맞춤법 검사 활성화

**단일 라인 텍스트 필드:**

```html
<input type="text" id="comment" name="comment" value="I'm a text field" />
```

**비밀번호 필드:**

```html
<input type="password" id="pwd" name="pwd" />
```

- 입력 문자가 점(●) 또는 별표(\*)로 표시됨
- UI 기능일 뿐, 보안을 위해 HTTPS를 사용해야 함

**숨겨진 입력:**

```html
<input type="hidden" id="timestamp" name="timestamp" value="1286705410" />
```

- 사용자에게 보이지 않음
- 라벨 불필요
- `name`과 `value` 속성 필수

### 2. 체크박스와 라디오 버튼

**공통 특징:**

- `checked` 속성으로 기본값 설정
- 선택될 때만 폼 데이터로 전송됨
- 미선택 상태면 아무것도 전송 안 함
- 체크되었으나 값이 없으면 "on"으로 전송

**체크박스:**

```html
<fieldset>
  <legend>좋아하는 채소를 모두 선택하세요</legend>
  <ul>
    <li>
      <label for="carrots">당근</label>
      <input type="checkbox" id="carrots" name="vegetable" value="carrots" checked />
    </li>
  </ul>
</fieldset>
```

- 관련 체크박스는 같은 `name` 사용
- `fieldset`과 `legend`로 그룹화

**라디오 버튼:**

```html
<fieldset>
  <legend>좋아하는 식사는?</legend>
  <ul>
    <li>
      <label for="soup">수프</label>
      <input type="radio" id="soup" name="meal" value="soup" checked />
    </li>
  </ul>
</fieldset>
```

- 같은 `name` 속성을 가진 버튼 중 하나만 선택 가능
- 하나를 선택하면 나머지는 자동으로 선택 해제됨

### 3. 버튼

**제출 버튼:**

```html
<button type="submit">폼 제출</button>
```

**리셋 버튼:**

```html
<button type="reset">폼 초기화</button>
```

**일반 버튼:**

```html
<button type="button">JavaScript 없이 작동 안 함</button>
```

### 4. 파일 선택기

```html
<input type="file" name="file" id="file" accept="image/*" multiple />
```

**특징:**

- `accept`: 허용할 파일 타입 지정
- `multiple`: 여러 파일 선택 가능
- 모바일에서 카메라/마이크 접근 가능:
  ```html
  <input type="file" accept="image/*;capture=camera" />
  <input type="file" accept="video/*;capture=camcorder" />
  <input type="file" accept="audio/*;capture=microphone" />
  ```

### 5. 공통 속성

| 속성명      | 기본값 | 설명                                 |
| ----------- | ------ | ------------------------------------ |
| `autofocus` | false  | 페이지 로드 시 자동으로 포커스       |
| `disabled`  | false  | 사용자가 상호작용할 수 없음          |
| `form`      | -      | 폼 ID로 폼과 연결 (폼 외부의 컨트롤) |
| `name`      | -      | 폼 데이터 제출 시 필드 이름          |
| `value`     | -      | 요소의 초기값                        |

---

## 라벨 연결

### 1. 명시적 연결 (권장)

```html
<label for="firstName">이름:</label>
<input name="firstName" id="firstName" type="text" autocomplete="given-name" />

<div class="field-container">
  <label for="user-email">이메일 주소 <span aria-hidden="true">(필수)</span></label>
  <input type="email" id="user-email" name="email" required autocomplete="email" aria-required="true" />
</div>
```

**장점:**

- 더 큰 클릭 영역 제공
- 보조 기술이 올바른 라벨을 참조 가능
- 음성 제어 프로그램 완벽 지원

**규칙:**

- `label`의 `for` 속성이 `input`의 `id`와 정확히 일치해야 함

### 2. 암묵적 연결

```html
<label>
  이름
  <input type="text" id="firstName" name="firstName" />
</label>
```

**제한:**

- 일부 음성 제어 프로그램 미지원
- 명시적 연결 권장

### 3. 라벨 텍스트 숨기기

**시각적으로는 숨기되 보조 기술에서는 사용 가능:**

```html
<div class="form-group">
  <label for="search">
    <span class="visuallyhidden">검색</span>
  </label>
  <input type="text" id="search" />
  <button>검색</button>
</div>
```

**CSS 숨김:**

```css
/* .visuallyhidden {
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
} */

clip 속성은 CSS Masking Module Level 1에서 deprecated(사용 중단)
현대 브라우저에서는 clip-path: inset(50%)를 사용하는 것이 표준

 .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%); /* 현대 브라우저 표준 */
  white-space: nowrap;
  border: 0;
}
```

### 4. ARIA 라벨 대안

**aria-label (비권장):**

```html
<input type="search" aria-label="검색" />
```

- 시각적 사용자에게 정보 제공 안 함

**aria-labelledby:**

```html
<h2 id="search-title">제품 검색</h2>
<input type="text" aria-labelledby="search-title" />
```

- 이미 화면에 존재하는 다른 요소의 텍스트를 참조, 시각적 사용자에게 보임, 특정 input의 이름표 역할을 한다는 '관계 정의'를 보조 기기에만 전달

**title 속성 (미권장):**

- 일부 보조 기술 미지원
- 툴팁으로만 표시됨

### 5. 버튼 라벨

**`<button>` 요소:**

```html
<button>제출하기</button>
```

- 내부에 마크업 포함 가능
- 언어 변경 등 고급 접근성 힌트 가능

**`<input>` 요소:**

```html
<input type="submit" value="제출하기" />
```

- `value` 속성으로 라벨 설정
- 일반 텍스트만 가능

### 6. 라벨 텍스트의 시각적 위치

**좌->우 언어:**

- 라디오 버튼/체크박스: 오른쪽
- 다른 필드: 왼쪽 또는 위

**모바일 최적화:**

- 라벨을 위에 배치하면 수평 스크롤 감소

---

## 관련 필드 그룹화

### 1. Fieldset과 Legend

```html
<fieldset>
  <legend>배송 주소</legend>
  <div>
    <label for="shipping-address">주소:</label>
    <input type="text" id="shipping-address" name="shipping-address" />
  </div>
</fieldset>

<fieldset>
  <legend>청구 주소</legend>
  <div>
    <label for="billing-address">주소:</label>
    <input type="text" id="billing-address" name="billing-address" />
  </div>
</fieldset>
```

**특징:**

- `fieldset`: 관련 폼 컨트롤 컨테이너
- `legend`: 그룹을 식별하는 제목
- 같은 레이블 텍스트를 가진 필드 구분 가능

### 2. WAI-ARIA 그룹화

```html
<div role="group" aria-labelledby="group-title">
  <h3 id="group-title">배송 주소</h3>
  <label for="street">거리:</label>
  <input type="text" id="street" />
</div>
```

**장점:**

- CSS 스타일링 유연성 증가
- 브라우저/스크린 리더 호환성 제약

**주의:**

- 그룹의 첫 번째 필드에 그룹 식별자 추가

### 3. Select 요소의 옵션 그룹

```html
<select name="course">
  <optgroup label="영어 과정">
    <option>초급 영어</option>
    <option>중급 영어</option>
  </optgroup>
  <optgroup label="수학 과정">
    <option>기초 수학</option>
    <option>고급 수학</option>
  </optgroup>
</select>
```

---

## 자동완성 속성

브라우저의 Autofill 엔진은 name 속성보다 autocomplete 속성을 최우선 순위로 해석
사용자 데이터가 DOM 입력되기 전, 브라우저 메모리 단계에서 적절한 데이터를 매핑하여 렌더링 생산성 향상

current-password: 현재 비밀번호 (로그인 시 사용)
new-password: 새 비밀번호 (회원가입/변경 시 사용 - 브라우저가 강력한 비밀번호 제안 가능)
one-time-code: SMS나 이메일로 받은 인증번호 자동 입력 지원

### 1. 기본 사용

```html
<input autocomplete="off" />
<input autocomplete="on" />
<input autocomplete="given-name" />
```

**목적:**

- 브라우저가 필드를 자동으로 채우도록 지시
- 사용자 입력 편의 제공
- 입력 목적 식별 (WCAG 2.1 AA 준수)

### 2. 토큰 리스트 구조

기본 구조: `[section-*] [shipping|billing] [recipient-type] [contact-type]`

**섹션 (옵션):**
  
```html
<input autocomplete="section-user1 billing postal-code" />
```

- 같은 `section-*` 값을 가진 필드들은 같은 그룹

**배송/청구:**

- `shipping`: 배송 정보
- `billing`: 청구 정보

**받는 사람 유형:**

- `home`: 자택
- `work`: 직장
- `mobile`: 모바일
- `fax`: 팩스

**연락처 정보:**

- `tel`: 전화번호
- `tel-country-code`: 국가 코드
- `tel-area-code`: 지역 코드
- `tel-local`: 국내 번호
- `email`: 이메일
- `impp`: 인스턴트 메시징

### 3. 개인 정보

```html
<input autocomplete="name" />
<input autocomplete="honorific-prefix" />
<input autocomplete="given-name" />
<input autocomplete="additional-name" />
<input autocomplete="family-name" />
<input autocomplete="honorific-suffix" />
<input autocomplete="nickname" />
<input autocomplete="username" />
```

### 4. 주소

```html
<input autocomplete="street-address" />
<input autocomplete="address-line1" />
<input autocomplete="address-line2" />
<input autocomplete="address-level1" />
<!-- 주/도 -->
<input autocomplete="address-level2" />
<!-- 시/군 -->
<input autocomplete="postal-code" />
<input autocomplete="country" />
<input autocomplete="country-name" />
```

### 5. 신용카드

```html
<input autocomplete="cc-name" />
<input autocomplete="cc-given-name" />
<input autocomplete="cc-family-name" />
<input autocomplete="cc-number" />
<input autocomplete="cc-exp" />
<!-- MM/YY 또는 MM/YYYY -->
<input autocomplete="cc-exp-month" />
<input autocomplete="cc-exp-year" />
<input autocomplete="cc-csc" />
<!-- 보안 코드 -->
<input autocomplete="cc-type" />
<!-- Visa, Master Card -->
```

### 6. 계정 정보

```html
<input autocomplete="new-password" />
<!-- 새 비밀번호 -->
<input autocomplete="current-password" />
<!-- 현재 비밀번호 -->
<input autocomplete="one-time-code" />
<!-- OTP -->
```

### 7. 기타 정보

```html
<input autocomplete="organization-title" />
<!-- 직책 -->
<input autocomplete="organization" />
<!-- 조직명 -->
<input autocomplete="bday" />
<!-- 생년월일 -->
<input autocomplete="bday-day" />
<input autocomplete="bday-month" />
<input autocomplete="bday-year" />
<input autocomplete="sex" />
<!-- 성별 -->
<input autocomplete="url" />
<!-- 웹사이트 -->
<input autocomplete="photo" />
<!-- 이미지 URL -->
<input autocomplete="language" />
<!-- 선호 언어 -->
<input autocomplete="transaction-currency" />
<input autocomplete="transaction-amount" />
```

### 8. 주의사항

**자동완성 활성화 요구사항:**

- `name` 및/또는 `id` 속성 필요
- `<form>` 요소의 자식 또는 `form` 속성으로 연결
- 폼에 제출 버튼 필요

**숨겨진 필드:**

- `type="hidden"`에서는 `on`/`off` 불가
- 공백으로 구분된 토큰 리스트만 가능

---

## 입력 검증

### 1. 필수 입력 검증

```html
<label for="name">이름</label> <input type="text" id="name" name="name" required />
```

**특징:**

- 브라우저가 기본 검증 제공
- 미지원 브라우저를 위해 라벨에 "(필수)" 표시 권장

### 2. HTML5 입력 타입

```html
<input type="email" />
<input type="url" />
<input type="number" />
<input type="range" />
<input type="date" />
<input type="time" />
```

**장점:**

- 특화된 키보드 (모바일)
- 자동 유효성 검사
- 데이트 피커 등 기본 UI 제공

### 3. 패턴 검증

```html
<!-- 독일 자동차 번호판 형식: 1-3글자 + 2-4글자 + 1-4숫자 -->
<input type="text" pattern="^[A-Z]{1,3}\s[A-Z]{2,4}\s[0-9]{1,4}$" title="올바른 형식: ABC 1234" />
```

### 4. 검증 유연성

**권장사항:**

- 다양한 입력 형식 허용
- 전화번호: 하이픈, 괄호, 공백 모두 수용
- 우편번호: 숫자 전용이 아닌 혼합 문자 허용
- 과도한 제약 피하기

### 5. 클라이언트 검증 장점

- 더 나은 사용자 경험
- 검증 오류 이해 용이
- 네트워크/서버 부하 감소

**제한:**

- HTML5 미지원 브라우저
- 클라이언트 검증 우회 가능
- **반드시 서버 검증도 필요**

### 6. 사용자 검증

**확인 요청:**

```html
<input type="checkbox" name="confirm" /> <label for="confirm">삭제가 완료되면 복원할 수 없습니다.</label>
```

**실행 취소 기능:**

- 휴지통에 보관 후 영구 삭제
- 일정 시간 내 실행 취소 (예: 이메일)
- 명확한 정책 설명

---

## 포괄적 입력 필드

### 1. 접근 가능한 이름 설정

**문제:**

```html
<form>
  <div class="form-group">
    <label>이름 <span class="required">*</span></label>
    <input type="text" />
  </div>
</form>
```

- 스크린 리더: "edit text blank" (라벨 없음)

**해결책 - 명시적 연결:**

```html
<div class="form-group">
  <label for="name">이름 <span class="required">*</span></label>
  <input type="text" id="name" name="name" />
</div>
```

- 스크린 리더: "name \*, edit text"

### 2. 입력 목적 식별

```html
<input type="text" id="name" name="name" autocomplete="name" />
```

**또는 세분화:**

```html
<input type="text" id="firstName" name="firstName" autocomplete="given-name" />
```

**WCAG 2.1 AA 준수:**

- 각 입력의 목적을 프로그래밍 방식으로 결정 가능해야 함
- 인지장애인 사용자 지원

### 3. 필수 필드 표시

**권장 방법 - 텍스트 추가:**

```html
<label for="name">
  이름
  <span class="required">required</span>
</label>
<input type="text" id="name" name="name" required />
```

**시각적 표시 유지 (숨겨진 텍스트):**

```html
<label for="name">
  이름
  <span class="required" aria-hidden="true">*</span>
  <span class="sr-only">required</span>
</label>
<input type="text" id="name" name="name" required />
```

**`aria-hidden` 사용:**

- 시각적 요소만 보조 기술에서 숨김
- 스크린 리더가 중복 정보 읽지 않음

### 4. 필드 설명

```html
<label for="password">비밀번호</label>
<input type="password" id="password" name="password" autocomplete="new-password" aria-describedby="pwd-hint" />
<p id="pwd-hint">비밀번호는 최소 8자 이상이어야 합니다.</p>
```

**특징:**

- `aria-describedby`로 설명 연결
- 다중 ID 지원: `aria-describedby="error desc"`
- 설명과 오류 메시지 함께 읽음

### 5. 오류 메시지 처리

```html
<label for="password">비밀번호</label>
<input type="password" id="password" name="password" aria-invalid="true" aria-describedby="error-msg pwd-hint" />
<p id="pwd-hint">비밀번호는 최소 8자 이상이어야 합니다.</p>
<p id="error-msg" class="error">입력을 확인하세요.</p>
```

**스크린 리더 출력:**

- "Password required, invalid data, secure edit text"
- 그 후 오류 메시지와 설명 읽음

### 6. 폼 검증 처리

```html
<form action="/contact" method="POST" novalidate>
  <!-- 폼 내용 -->
</form>
```

**`novalidate` 사용:**

- 브라우저 기본 검증 비활성화
- 자체 검증 로직 구현 시 필요
- 프로그램적으로 로드된 후에 추가 권장

### 7. 포괄성 체크리스트

✓ 모든 입력에 명시적 라벨 (`for` 속성 포함)
✓ 입력 목적 식별 (`autocomplete` 속성)
✓ 필수 필드 명확히 표시
✓ 설명/오류 메시지는 `aria-describedby`로 연결
✓ 오류 입력은 `aria-invalid="true"` 설정
✓ 다양한 입력 형식 수용
✓ 서버 검증은 필수
✓ 실행 취소 옵션 제공

---

## 현재 상황 & 통계

**WebAIM 2020 백만 웹사이트 분석:**

- 홈페이지당 평균 60.9개 검출 가능한 접근성 오류
- 2019년 대비 2.1% 증가
- 오류 없는 페이지: 1% 미만

**폼 관련 문제:**

- 34만 개 폼 입력 중 56%가 라벨 없음
- 최소 1개의 라벨 없는 입력을 가진 페이지: 평균 43개 오류
- 2019년: 30개 오류 (악화)

---

## 최종 권고사항

### 우선순위

1. **기본 구조 개선** (영향도 최대)

   - 모든 입력에 라벨 추가
   - 입력 목적 식별
   - 필수 필드 명시

2. **검증 개선**

   - 클라이언트 + 서버 검증
   - 명확한 오류 메시지
   - 실행 취소 옵션

3. **고급 기능**
   - 자동완성 정보
   - 필드 그룹화
   - 복잡한 폼 개선

### 구현 팁

- **시각 변경 불필요:** 대부분의 개선사항은 코드 구조 변경만으로 가능
- **점진적 개선:** 모든 폼을 한번에 개선할 필요 없음
- **팀 차원:** 접근성은 개인 노력으로는 지속 불가능 → 팀 문화 필요
- **정의 포함:** DoD(Definition of Done)에 접근성 테스트 추가
- **ARIA 과용 금지:** 기본 HTML이 우선, ARIA는 최후 수단

### 사용자와의 소통

- 보조 기술 사용자와 직접 소통
- 반복적 테스트와 개선
- 사용자 피드백 존중
