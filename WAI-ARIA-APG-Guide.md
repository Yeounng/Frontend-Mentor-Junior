# WAI-ARIA APG (Accessible Practice Guide) 패턴 완전 가이드

## 📚 목차
1. [개요](#개요)
2. [패턴 분류](#패턴-분류)
3. [26개 패턴 상세 설명](#26개-패턴-상세-설명)
4. [학습 로드맵](#학습-로드맵)
5. [핵심 ARIA 속성 정리](#핵심-aria-속성-정리)

---

## 개요

WAI-ARIA APG (Accessible Practice Guide)는 웹 접근성을 위한 실제 구현 패턴을 제공합니다. 각 패턴은 다음 세 가지 핵심 요소로 구성됩니다:

1. **About This Pattern**: 언제 어떻게 사용하는가?
2. **Keyboard Interaction**: 키보드로 어떻게 조작하는가?
3. **WAI-ARIA Roles, States, and Properties**: ARIA를 어떻게 구현하는가?

---

## 패턴 분류

### 구조형 패턴 (Structure Patterns)
페이지의 의미 있는 구조를 정의하고, 스크린 리더 사용자가 페이지 레이아웃을 이해하도록 돕는 패턴입니다.

- **Landmarks** (랜드마크)
- **Breadcrumb** (빵 부스러기 네비게이션)
- **Feed** (무한 스크롤)
- **Table** (테이블)

### 위젯형 패턴 (Widget Patterns)
사용자 상호작용을 위한 폼 요소, 메뉴, 다이얼로그 등의 패턴입니다.

**입력/선택 위젯:**
- Accordion
- Button
- Checkbox
- Radio
- Slider
- Combobox
- Listbox

**뷰/네비게이션 위젯:**
- Tabs
- Treeview
- Treegrid
- Grid
- Carousel
- Disclosure

**피드백 위젯:**
- Alert
- Alert Dialog
- Dialog (Modal)
- Menu/Menubar
- Menu Button
- Tooltip

**기타:**
- Link
- Meter
- Toolbar
- Window Splitter

---

## 26개 패턴 상세 설명

### 1. Accordion (아코디언)

**목적**: 여러 섹션을 세로로 쌓고, 각 헤더를 클릭하여 해당 패널을 펼치거나 접는 UI. 스크롤을 줄이기 위해 사용됩니다.

**구성 요소**:
- **Accordion Header**: 섹션을 표시하는 컨트롤 버튼
- **Accordion Panel**: 헤더와 연결된 콘텐츠 영역

**키보드 인터랙션**:
- `Enter` / `Space`: 포커스된 헤더의 패널을 펼치거나 접음
- `Tab` / `Shift+Tab`: 모든 포커스 가능한 요소를 일반 탭 순서로 이동
- `Down Arrow` (선택): 다음 헤더로 포커스 이동
- `Up Arrow` (선택): 이전 헤더로 포커스 이동
- `Home` / `End` (선택): 첫/마지막 헤더로 이동

**ARIA 속성**:
```
<h3>
  <button aria-expanded="true" aria-controls="panel-1">Section 1</button>
</h3>
<div id="panel-1">Content here</div>
```
- `button` 역할로 헤더 버튼 구현
- `aria-expanded`: 패널 가시성 상태 (true/false)
- `aria-controls`: 컨트롤하는 패널의 ID

---

### 2. Alert (알림)

**목적**: 중요한 메시지를 사용자 작업을 방해하지 않고 표시합니다. 동적으로 렌더링된 알림은 스크린 리더에서 자동 공지됩니다.

**주의사항**:
- 포커스를 변경하지 않음
- 자동으로 사라지는 알림 금지 (WCAG 2.2.3)
- 너무 자주 나타나면 안 됨 (WCAG 2.2.4)

**키보드 인터랙션**: 없음 (비위젯)

**ARIA 속성**:
```
<div role="alert">오류가 발생했습니다.</div>
```
- `alert` 역할만 필요

---

### 3. Alert Dialog (경고 다이얼로그)

**목적**: 사용자의 작업을 중단시키고 중요한 메시지를 전달하거나 응답을 요청합니다. 예: 확인 프롬프트, 오류 메시지.

**특징**:
- Modal 다이얼로그의 특수한 경우
- 포커스를 다이얼로그 내로 강제 이동
- 사용자가 응답할 때까지 외부 콘텐츠와 상호작용 불가

**ARIA 속성**:
```
<div role="alertdialog" aria-labelledby="title" aria-describedby="message">
  <h2 id="title">삭제 확인</h2>
  <p id="message">정말 삭제하시겠습니까?</p>
</div>
```
- `alertdialog` 역할
- `aria-labelledby`: 다이얼로그 제목
- `aria-describedby`: 경고 메시지

---

### 4. Breadcrumb (빵 부스러기)

**목적**: 현재 페이지의 위치를 계층 구조로 표시하여 사용자가 웹사이트 내 자신의 위치를 파악하도록 돕습니다.

**구성**: 링크의 목록으로 부모 페이지 경로를 표시

**키보드 인터랙션**: 없음

**ARIA 속성**:
```
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/products">Products</a></li>
    <li><a aria-current="page">Widgets</a></li>
  </ol>
</nav>
```
- Navigation landmark 사용
- 마지막 항목(현재 페이지): `aria-current="page"`

---

### 5. Button (버튼)

**목적**: 사용자가 작업을 트리거할 수 있도록 합니다. 폼 제출, 다이얼로그 열기, 액션 수행 등.

**버튼의 세 가지 유형**:
1. **일반 버튼**: 액션 수행
2. **토글 버튼**: ON/OFF 상태 전환
3. **메뉴 버튼**: 메뉴 표시

**키보드 인터랙션**:
- `Space` / `Enter`: 버튼 활성화
- 포커스 이동 규칙:
  - 다이얼로그 열기 → 다이얼로그 내로 포커스 이동
  - 다이얼로그 닫기 → 버튼으로 포커스 반환
  - 단순 액션 → 버튼에 포커스 유지

**ARIA 속성**:
```
<!-- 일반 버튼 -->
<button>Save</button>

<!-- 토글 버튼 -->
<button aria-pressed="false">Mute</button>

<!-- 메뉴 버튼 -->
<button aria-haspopup="menu" aria-expanded="false">Menu</button>
```
- `button` 역할 (네이티브 `<button>` 요소 권장)
- `aria-pressed`: 토글 상태 (true/false)
- `aria-disabled`: 비활성 상태

---

### 6. Carousel (캐러셀/슬라이드쇼)

**목적**: 여러 슬라이드를 순차적으로 표시하고, 사용자가 이전/다음 슬라이드를 선택하거나 자동 회전을 제어할 수 있습니다.

**필수 기능**:
- 이전/다음 버튼
- (선택) 특정 슬라이드 선택 컨트롤 (탭 또는 버튼)
- 자동 회전 시 정지/시작 버튼

**자동 회전 시 요구사항**:
- 포커스 진입 시 자동 회전 중지
- 마우스 호버 시 자동 회전 중지
- 사용자가 명시적으로 요청할 때만 재개

**키보드 인터랙션**:
- `Tab`: 캐러셀의 인터랙티브 요소를 순회
- 회전 컨트롤은 첫 번째 탭 위치
- 탭 선택기 사용 시: Tabs 패턴의 키보드 인터랙션 적용

**ARIA 속성**:
```
<div role="region" aria-roledescription="carousel" aria-label="Featured Products">
  <button aria-label="Stop slide rotation">❚❚</button>
  <button aria-label="Previous slide">‹</button>
  
  <div role="group" aria-roledescription="slide" aria-label="1 of 5">
    <!-- Slide content -->
  </div>
  
  <button aria-label="Next slide">›</button>
</div>
```
- `aria-roledescription`: "carousel" (스크린 리더에 명확히 전달)
- 각 슬라이드: `aria-label="X of N"`

---

### 7. Checkbox (체크박스)

**목적**: 사용자가 두 개 이상의 옵션 중에서 하나 이상을 선택할 수 있게 합니다.

**세 가지 상태**:
1. **이중 상태**: 체크됨/체크 안 됨
2. **삼중 상태**: 체크됨/체크 안 됨/부분 체크됨
   - 예: 부모 체크박스가 자식 항목 그룹의 선택 상태를 나타낼 때

**키보드 인터랙션**:
- `Space`: 체크박스 상태 전환

**ARIA 속성**:
```
<!-- 이중 상태 -->
<div role="checkbox" aria-checked="false">
  <span>Subscribe to newsletter</span>
</div>

<!-- 삼중 상태 -->
<div role="checkbox" aria-checked="mixed">
  <span>Select all options</span>
</div>
```
- `checkbox` 역할
- `aria-checked`: false | true | mixed
- `aria-labelledby` 또는 내부 텍스트로 레이블 제공

---

### 8. Combobox (콤보박스)

**목적**: 사용자가 입력 필드에 값을 입력하고 팝업 목록에서 제안된 값을 선택할 수 있는 입력 위젯입니다.

**네 가지 자동완성 유형**:
1. **No autocomplete**: 입력과 무관하게 동일한 제안
2. **List autocomplete (manual selection)**: 입력에 맞는 제안 표시, 사용자 선택 필요
3. **List autocomplete (automatic selection)**: 첫 번째 제안 자동 선택
4. **List with inline autocomplete**: 자동 선택 + 인라인 완성 문자열 표시

**팝업 유형**: Listbox, Grid, Tree, Dialog

**키보드 인터랙션** (복잡함):
- `Down Arrow`: 팝업 표시 또는 다음 옵션으로 이동
- `Up Arrow`: 이전 옵션으로 이동
- `Enter`: 선택 확인
- `Escape`: 팝업 닫기
- `Alt+Down Arrow`: 팝업 표시 (선택)
- 텍스트 입력 지원

**ARIA 속성**:
```
<input role="combobox" 
       aria-expanded="false" 
       aria-controls="popup-list"
       aria-autocomplete="list" />
<ul id="popup-list" role="listbox">
  <li role="option">Option 1</li>
</ul>
```
- `combobox` 역할
- `aria-haspopup`: listbox | grid | tree | dialog
- `aria-expanded`: true | false
- `aria-controls`: 팝업 ID 참조
- `aria-autocomplete`: none | list | both

---

### 9. Disclosure (공개/숨김)

**목적**: 버튼을 클릭하여 추가 콘텐츠를 펼치거나 접을 수 있습니다. (아코디언과 달리 하나만 열 수 있다는 제한 없음)

**구성**:
- **Disclosure button**: 공개/숨김 상태 전환
- **Disclosure content**: 숨겨진 콘텐츠

**키보드 인터랙션**:
- `Enter` / `Space`: 콘텐츠 공개/숨김 전환

**ARIA 속성**:
```
<button aria-expanded="false" aria-controls="details">
  More details
</button>
<div id="details">숨겨진 콘텐츠</div>
```
- `button` 역할
- `aria-expanded`: true | false
- `aria-controls`: 콘텐츠 ID

---

### 10. Dialog (Modal) (모달 다이얼로그)

**목적**: 현재 작업을 중단하고 다이얼로그에 포커스를 강제합니다. 외부 콘텐츠는 inert 상태가 됩니다.

**특징**:
- 탭 순서가 다이얼로그 내에 포함됨
- `Tab`/`Shift+Tab`이 다이얼로그 밖으로 이동 불가
- 포커스는 일반적으로 첫 포커스 가능 요소로 이동

**포커스 배치 원칙**:
- 콘텐츠가 복잡하면 제목이나 첫 문단에 `tabindex="-1"` 설정
- 큰 콘텐츠의 경우 맨 위로 포커스 이동
- 되돌릴 수 없는 작업(삭제) 시 가장 안전한 옵션에 포커스

**키보드 인터랙션**:
- `Tab`: 다이얼로그 내 다음 포커스 가능 요소로 이동 (순환)
- `Shift+Tab`: 이전 포커스 가능 요소로 이동 (순환)
- `Escape`: 다이얼로그 닫기 및 포커스 반환

**ARIA 속성**:
```
<div role="dialog" aria-labelledby="title" aria-describedby="description">
  <h2 id="title">Dialog Title</h2>
  <p id="description">Description here</p>
</div>
```
- `dialog` 역할
- `aria-modal="true"` (ARIA 1.1+, 또는 legacy: `aria-hidden` on inert content)
- `aria-labelledby`: 제목 ID
- `aria-describedby`: 설명 ID (선택)

---

### 11. Feed (피드/무한 스크롤)

**목적**: 사용자가 스크롤할 때 자동으로 새 콘텐츠를 로드합니다. 구조형 패턴으로, 스크린 리더는 읽기 모드로 상호작용합니다.

**특징**:
- 동적 콘텐츠 로드에 대한 웹 페이지-보조 기술 간 계약 제공
- 웹 페이지: 포커스된 문서를 기반으로 스크롤 및 콘텐츠 로드
- 보조 기술: 독서 커서 이동으로 DOM 포커스 관리

**키보드 인터랙션** (권장):
- `Page Down`: 다음 문서로 포커스 이동
- `Page Up`: 이전 문서로 포커스 이동
- `Control+End`: 피드 후의 첫 포커스 가능 요소로 이동
- `Control+Home`: 피드 전의 첫 포커스 가능 요소로 이동

**ARIA 속성**:
```
<div role="feed" aria-label="Recent posts">
  <article aria-labelledby="title" aria-describedby="content" aria-posinset="1" aria-setsize="50">
    <h2 id="title">Post Title</h2>
    <div id="content">Post content</div>
  </article>
  <!-- More articles -->
</div>
```
- `feed` 역할
- 각 `article`: 
  - `aria-posinset`: 위치 (1부터 시작)
  - `aria-setsize`: 총 개수 (미확정 시 -1)
- `aria-busy="true"` (동적 업데이트 중)

---

### 12. Grid (그리드)

**목적**: 행과 열로 구성된 대화형 테이블 데이터 또는 레이아웃 컨테이너입니다.

**두 가지 사용 사례**:
1. **Data Grid**: 편집/상호작용 가능한 표 데이터 (스프레드시트 같음)
2. **Layout Grid**: 네비게이션 링크, 버튼 등의 위젯 그룹

**데이터 그리드 키보드**:
- Arrow keys: 셀 이동
- `Home`/`End`: 행의 첫/마지막 셀
- `Control+Home`/`Control+End`: 그리드의 첫/마지막 셀
- `Page Up`/`Page Down`: 여러 행 스크롤 (선택)

**레이아웃 그리드 키보드**:
- 화살표가 행 간에 래핑될 수 있음
- 단일 포커스 중지로 탭 순서 단축

**ARIA 속성**:
```
<div role="grid" aria-label="Data Table">
  <div role="row">
    <div role="columnheader">Name</div>
    <div role="columnheader">Age</div>
  </div>
  <div role="row">
    <div role="gridcell">John</div>
    <div role="gridcell">25</div>
  </div>
</div>
```
- `grid` / `row` / `gridcell` / `columnheader` / `rowheader`
- `aria-selected`: 선택 상태 (true/false)
- `aria-readonly`: 편집 불가 (true/false)
- `aria-colcount` / `aria-rowcount`: 총 개수
- `aria-colindex` / `aria-rowindex`: 위치

---

### 13. Landmarks (랜드마크)

**목적**: 페이지의 주요 섹션을 식별하여 보조 기술 사용자가 페이지 구조를 인식하고 효율적으로 네비게이션하도록 돕습니다.

**8가지 랜드마크 역할**:
1. `main` (또는 `role="main"`)
2. `navigation` (또는 `role="navigation"`)
3. `search` (또는 `role="search"`)
4. `contentinfo` (또는 `role="contentinfo"`)
5. `region` (명시적 레이블 필수)
6. `banner`
7. `complementary`
8. `form`

**HTML 네이티브 요소 (자동 랜드마크)**:
- `<main>` → main landmark
- `<nav>` → navigation landmark
- `<footer>` (document-level) → contentinfo landmark
- `<header>` (document-level) → banner landmark
- `<aside>` → complementary landmark

**권장사항**:
- 페이지당 7개 이하 랜드마크
- 모든 콘텐츠는 적절한 랜드마크 내 포함

**키보드 인터랙션**: 없음

**ARIA 속성**:
```
<header role="banner">Site header</header>
<nav aria-label="Main navigation">...</nav>
<main>...</main>
<aside aria-label="Sidebar">...</aside>
<footer role="contentinfo">...</footer>

<div role="region" aria-labelledby="region-title">
  <h2 id="region-title">Important Section</h2>
</div>
```

---

### 14. Link (링크)

**목적**: 사용자가 다른 리소스로 이동할 수 있는 대화형 참조입니다.

**중요 참고**: 네이티브 HTML `<a href>` 요소 사용 권장.

**키보드 인터랙션**:
- `Enter`: 링크 실행 및 대상으로 이동
- `Shift+F10`: 링크 컨텍스트 메뉴 열기 (선택)

**ARIA 속성**:
```
<span role="link" tabindex="0">Clickable text</span>
```
- `link` 역할 (네이티브 `<a>` 사용이 더 좋음)
- 스크린 리더는 "링크"를 공지함

---

### 15. Listbox (리스트박스)

**목적**: 사용자가 목록에서 하나 이상의 옵션을 선택합니다.

**두 가지 유형**:
1. **Single-select**: 한 번에 하나만 선택
2. **Multi-select**: 여러 항목 선택 가능

**포커스 동작**:
- Single-select: 포커스 진입 시, 선택된 항목이 있으면 그것에 포커스, 없으면 첫 항목
- Multi-select: 포커스 진입 시, 선택된 첫 항목에 포커스, 없으면 첫 항목

**키보드 인터랙션**:
- `Down Arrow`: 다음 옵션 (단일 선택 시 선택도 함께)
- `Up Arrow`: 이전 옵션
- `Home` / `End` (권장): 첫/마지막 옵션
- Type-ahead: 문자 입력으로 옵션 검색

**다중 선택 모드**:
- 모드 1 (권장): 수정자 키 불필요
  - `Space`: 포커스 항목 선택 상태 전환
  - `Shift+Down/Up Arrow`: 선택 확장
  - `Control+Shift+Home/End`: 범위 선택
  - `Control+A`: 모두 선택
- 모드 2: 수정자 키 사용
  - `Control+Down/Up Arrow`: 포커스만 이동
  - `Control+Space`: 선택 상태 전환

**ARIA 속성**:
```
<div role="listbox" aria-multiselectable="true" aria-label="Options">
  <div role="option" aria-selected="true">Option 1</div>
  <div role="option" aria-selected="false">Option 2</div>
</div>
```
- `listbox` / `option` 역할
- `aria-multiselectable`: true (다중) | false (단일, 기본값)
- `aria-selected`: true | false
- `aria-orientation`: horizontal | vertical (기본값)

---

### 16. Menu / Menubar (메뉴/메뉴바)

**목적**: 사용자가 선택할 수 있는 액션 또는 함수 목록을 제공합니다.

**구성**:
- **Menu**: 선택지 목록
- **Menubar**: 수평으로 배치된 지속적 메뉴 (데스크톱 앱 메뉴처럼)
- **Menuitem / Menuitemradio / Menuitemcheckbox**: 메뉴 항목

**키보드 인터랙션** (복잡):
- `Tab`: 메뉴 내부에서는 작동 안 함, 포커스를 메뉴 밖으로 이동
- `Enter` / `Space`: 항목 활성화 또는 서브메뉴 열기
- `Down Arrow`: 메뉴에서 다음 항목
- `Up Arrow`: 메뉴에서 이전 항목
- `Right Arrow`: 메뉴바에서 다음 항목, 서브메뉴 열기
- `Left Arrow`: 메뉴바에서 이전 항목, 서브메뉴 닫기
- `Home` / `End` (선택): 첫/마지막 항목
- 문자: 이름이 해당 문자로 시작하는 항목으로 포커스 이동
- `Escape`: 메뉴 닫기

**ARIA 속성**:
```
<div role="menubar" aria-label="Main menu">
  <button role="menuitem" aria-haspopup="menu" aria-expanded="false">
    File
  </button>
  <div role="menu">
    <button role="menuitem">New</button>
    <button role="menuitemradio" aria-checked="true">Show Grid</button>
    <button role="menuitemcheckbox" aria-checked="false">Show Rulers</button>
  </div>
</div>
```
- `menu` / `menubar` 역할
- `menuitem` / `menuitemradio` / `menuitemcheckbox`
- `aria-haspopup`: menu | true
- `aria-expanded`: true | false
- `aria-checked`: true | false (radio/checkbox)

---

### 17. Menu Button (메뉴 버튼)

**목적**: 클릭하면 메뉴를 표시하는 버튼입니다.

**구성**:
- 메뉴 열기 버튼
- 메뉴 팝업

**키보드 인터랙션**:
- `Enter` / `Space`: 메뉴 열기 및 첫 항목에 포커스
- `Down Arrow` / `Up Arrow` (선택): 메뉴 열기

메뉴가 열린 후는 Menu 패턴의 키보드 인터랙션 적용

**ARIA 속성**:
```
<button aria-haspopup="menu" aria-expanded="false" aria-controls="menu-popup">
  Actions
</button>
<div id="menu-popup" role="menu">...</div>
```
- 버튼의 `aria-haspopup`: menu | true
- `aria-expanded`: true | false
- `aria-controls`: 메뉴 ID (선택)

---

### 18. Meter (미터)

**목적**: 정의된 범위 내에서 변하는 숫자 값을 그래픽으로 표시합니다.

**용도**: 배터리 백분율, 연료 레벨 등

**주의**:
- Progress 대신 사용 금지 (로딩 표시기는 `progressbar` 역할 사용)
- 최대값이 의미 있는 범위에만 사용 (세계 인구 같은 열려있는 범위는 X)

**키보드 인터랙션**: 없음

**ARIA 속성**:
```
<div role="meter" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" aria-label="Battery">
</div>
```
- `meter` 역할
- `aria-valuenow`: 현재 값
- `aria-valuemin`: 최소값 (기본 0)
- `aria-valuemax`: 최대값 (기본 100)
- `aria-valuetext`: 값의 문자 표현 (선택, "60% (6시간) 남음" 같이)

---

### 19. Radio (라디오 버튼)

**목적**: 라디오 버튼 그룹에서 정확히 하나의 옵션만 선택할 수 있습니다.

**구성**:
- **Radiogroup**: 라디오 버튼 그룹
- **Radio**: 개별 라디오 버튼

**키보드 인터랙션** (일반 그룹, 툴바 아님):
- `Tab`: 라디오 그룹에 진입/진출 (하나의 탭 중지)
- `Space`: 포커스된 라디오 버튼 선택
- `Right Arrow` / `Down Arrow`: 다음 버튼 포커스 및 선택 (순환)
- `Left Arrow` / `Up Arrow`: 이전 버튼 포커스 및 선택 (순환)

**툴바 내 라디오 그룹** (다름):
- `Space` / `Enter`: 선택 (이전 선택 유지)
- Arrow keys: 포커스만 이동 (선택 유지)

**ARIA 속성**:
```
<div role="radiogroup" aria-labelledby="group-label">
  <div id="group-label">Choose one:</div>
  <div role="radio" aria-checked="true" tabindex="0">Option 1</div>
  <div role="radio" aria-checked="false" tabindex="-1">Option 2</div>
</div>
```
- `radiogroup` / `radio` 역할
- `aria-checked`: true | false
- 로빙 탭인덱스: 그룹 내 한 항목만 `tabindex="0"`

---

### 20. Slider (슬라이더)

**목적**: 사용자가 정의된 범위 내에서 값을 선택합니다.

**구성**: 슬라이더 축, 썸 (이동 가능한 부분)

**키보드 인터랙션**:
- `Right Arrow` / `Up Arrow`: 값 증가
- `Left Arrow` / `Down Arrow`: 값 감소
- `Home`: 최소값으로 설정
- `End`: 최대값으로 설정
- `Page Up` / `Page Down` (선택): 큰 단위로 증감

**주의**: 터치 기반 보조 기술 사용자에게 어려움 (아직 완전히 지원되지 않음)

**ARIA 속성**:
```
<div role="slider" 
     aria-valuenow="60" 
     aria-valuemin="0" 
     aria-valuemax="100"
     aria-valuetext="60°C"
     aria-label="Temperature">
</div>
```
- `slider` 역할
- `aria-valuenow`: 현재 값
- `aria-valuemin`: 최소값
- `aria-valuemax`: 최대값
- `aria-valuetext`: 값 설명 (선택, "Monday" 같이)
- `aria-orientation`: horizontal (기본) | vertical

---

### 21. Table (테이블)

**목적**: 정적인 표 데이터를 표시합니다. 대화형/편집 가능하면 Grid 패턴 사용.

**특징**:
- 셀이 포커스 불가능 (읽기 전용)
- 각 위젯은 탭 순서의 별도 중지점
- HTML `<table>` 요소 사용 권장

**키보드 인터랙션**: 없음

**ARIA 속성**:
```
<div role="table" aria-label="Employee Directory">
  <div role="row">
    <div role="columnheader">Name</div>
    <div role="columnheader">Role</div>
  </div>
  <div role="row">
    <div role="cell">John Smith</div>
    <div role="cell">Developer</div>
  </div>
</div>
```
- `table` / `row` / `cell` / `columnheader` / `rowheader`
- `aria-sort`: none | ascending | descending | other (정렬된 열)
- `aria-colcount` / `aria-rowcount`: 총 개수
- `aria-colindex` / `aria-rowindex`: 위치

---

### 22. Tabs (탭)

**목적**: 여러 탭 패널 중 하나씩 표시합니다. 각 탭 활성화 시 해당 패널이 표시됩니다.

**구성**:
- **Tablist**: 탭 컨테이너
- **Tab**: 탭 요소 (클릭 가능)
- **Tabpanel**: 탭과 연결된 콘텐츠

**활성화 모델**:
1. **자동 활성화** (권장): 포커스 이동 시 자동으로 탭 활성화 (선택이 포커스를 따름)
2. **수동 활성화**: Space/Enter 키로 명시적 활성화

**키보드 인터랙션**:
- `Tab`: Tablist 진입 시 활성 탭에 포커스, 또는 tabpanel 진입
- 수평 탭:
  - `Left Arrow`: 이전 탭 (순환)
  - `Right Arrow`: 다음 탭 (순환)
  - `Home` / `End` (선택): 첫/마지막 탭
- 수직 탭:
  - `Up Arrow`: 이전 탭
  - `Down Arrow`: 다음 탭
- `Space` / `Enter`: 수동 활성화 모드에서 탭 활성화
- `Delete` (선택): 탭 삭제 (닫기)
- `Shift+F10`: 탭의 팝업 메뉴 (선택)

**ARIA 속성**:
```
<div role="tablist" aria-label="Tabs">
  <button role="tab" aria-selected="true" aria-controls="panel-1">Tab 1</button>
  <button role="tab" aria-selected="false" aria-controls="panel-2">Tab 2</button>
</div>
<div id="panel-1" role="tabpanel" aria-labelledby="tab-1">Content 1</div>
<div id="panel-2" role="tabpanel" aria-labelledby="tab-2" hidden>Content 2</div>
```
- `tablist` / `tab` / `tabpanel`
- 활성 탭: `aria-selected="true"`
- 비활성 탭: `aria-selected="false"`
- `aria-controls`: 탭이 제어하는 패널 ID
- `aria-labelledby`: 패널이 연결된 탭 ID
- `aria-orientation`: horizontal (기본) | vertical

---

### 23. Toolbar (툴바)

**목적**: 버튼, 메뉴, 체크박스 등의 컨트롤 그룹을 하나의 논리적 컨테이너로 그룹화합니다.

**특징**:
- 포커스 관리로 탭 중지점 감소
- 화살표 키로 요소 네비게이션
- 3개 이상의 컨트롤일 때 사용

**키보드 인터랙션**:
- `Tab`: 툴바 진입/진출 (하나의 탭 중지)
- 수평 툴바:
  - `Left Arrow`: 이전 컨트롤
  - `Right Arrow`: 다음 컨트롤
  - `Home` / `End` (선택): 첫/마지막 컨트롤
- 수직 툴바:
  - `Up Arrow`: 이전 컨트롤
  - `Down Arrow`: 다음 컨트롤

**ARIA 속성**:
```
<div role="toolbar" aria-label="Text Formatting">
  <button>Bold</button>
  <button>Italic</button>
  <button aria-pressed="true">Underline</button>
</div>
```
- `toolbar` 역할
- 로빙 탭인덱스: 포커스 가능한 첫 요소 `tabindex="0"`, 나머지 `tabindex="-1"`
- `aria-orientation`: horizontal (기본) | vertical

---

### 24. Tooltip (툴팁)

**목적**: 요소가 포커스되거나 마우스 호버 시 관련 정보를 표시하는 팝업입니다.

**특징**:
- 포커스를 받지 않음 (트리거 요소에 포커스 유지)
- 포커스로 트리거 시: blur 이벤트로 닫음
- 호버로 트리거 시: 호버 계속 시 열려있음

**키보드 인터랙션**:
- `Escape`: 툴팁 닫기 (선택, focus는 유지)

**상태**:
- 포커스 진입: 표시
- 포커스 이탈: 닫음
- 마우스 호버: 표시
- 마우스 아웃: 닫음

**ARIA 속성**:
```
<button aria-describedby="tooltip-1">Help</button>
<div id="tooltip-1" role="tooltip">Click for more information</div>
```
- `tooltip` 역할
- 트리거: `aria-describedby` (또는 `aria-labelledby`)로 툴팁 ID 참조

---

### 25. Treeview (트리뷰)

**목적**: 계층 구조 목록을 표시합니다. 부모 노드를 확장/축소하여 자식 노드를 표시/숨깁니다.

**용어**:
- **Root node**: 최상위 노드
- **Child node**: 부모가 있는 노드
- **Parent node**: 자식 노드가 있는 노드
- **End node**: 자식이 없는 노드
- **Open node**: 확장된 부모 노드
- **Closed node**: 축소된 부모 노드

**포커스 동작**:
- Single-select: 포커스된 노드 선택 (선택이 포커스를 따름)
- Multi-select: 포커스와 선택이 독립적

**키보드 인터랙션**:
- `Right Arrow`:
  - 축소 노드에: 노드 확장
  - 확장 노드에: 첫 자식으로 포커스 이동
  - 리프 노드: 동작 없음
- `Left Arrow`:
  - 확장 노드에: 노드 축소
  - 축소/리프 자식에: 부모로 포커스 이동
  - 루트 리프: 동작 없음
- `Down Arrow`: 다음 포커스 가능 노드로 이동
- `Up Arrow`: 이전 포커스 가능 노드로 이동
- `Home`: 첫 노드로 이동
- `End`: 마지막 노드로 이동
- `Enter`: 노드 활성화 (부모 노드면 확장/축소, 리프면 선택)
- Type-ahead: 문자로 노드 검색
- `*` (선택): 현재 레벨의 모든 형제 노드 확장

**다중 선택** (두 가지 모드):
- 모드 1 (권장): 수정자 키 불필요
  - `Space`: 포커스 노드 선택 전환
  - `Shift+Down/Up Arrow`: 포커스 이동 및 선택 전환
  - `Shift+Space` (선택): 범위 선택
  - `Control+Shift+Home/End` (선택): 범위 선택
  - `Control+A` (선택): 모두 선택
- 모드 2: 수정자 키 사용
  - `Control+Down/Up Arrow`: 포커스만 이동
  - `Control+Space`: 선택 전환

**ARIA 속성**:
```
<div role="tree" aria-label="File System">
  <div role="treeitem" aria-expanded="true">
    <span>Folder 1</span>
    <div role="group">
      <div role="treeitem" aria-selected="true">File 1</div>
      <div role="treeitem" aria-selected="false">File 2</div>
    </div>
  </div>
  <div role="treeitem" aria-expanded="false">
    <span>Folder 2</span>
  </div>
</div>
```
- `tree` / `treeitem`
- `aria-expanded`: true | false (부모 노드만)
- `aria-selected` / `aria-checked`: true | false
- `aria-multiselectable`: true (다중) | false (단일, 기본값)
- `aria-level`: 노드 깊이 (선택, 동적 로드 시)
- `aria-posinset` / `aria-setsize`: 형제 내 위치/개수 (선택)
- `aria-orientation`: horizontal | vertical (기본값)

---

### 26. Treegrid (트리그리드)

**목적**: 계층 구조가 있는 편집 가능한 또는 대화형 표 데이터입니다.

**특징**:
- Grid와 Treeview의 혼합
- 행과 셀이 모두 포커스 가능
- 확장/축소 가능한 행

**포커스 모델**:
- 행 포커스 또는 셀 포커스 (구현에 따라)

**키보드 인터랙션** (복잡):
- `Right Arrow`:
  - 축소 행/셀: 확장
  - 확장 행/셀: 다음 셀로 이동
  - 리프 셀: 행의 다음 셀로 이동
- `Left Arrow`:
  - 확장 행/셀: 축소
  - 축소 행/셀: 동작 없음
  - 셀: 이전 셀로 이동
- `Down Arrow`: 다음 행/셀로 이동
- `Up Arrow`: 이전 행/셀로 이동
- `Home` / `End`: 행의 첫/마지막 셀로 이동
- `Control+Home` / `Control+End`: 그리드의 첫/마지막로 이동
- `Page Up` / `Page Down`: 스크롤
- `Enter`: 트리그리드 특정 액션
- `Tab`: 행 내 포커스 가능 요소를 순회

**선택** (데이터 그리드처럼):
- `Control+Space`: 열 선택
- `Shift+Space`: 행 선택

**ARIA 속성**:
```
<div role="treegrid">
  <div role="row" aria-expanded="true">
    <div role="rowheader">Parent Item</div>
    <div role="gridcell">Data 1</div>
  </div>
  <div role="row">
    <div role="gridcell">Child Item</div>
    <div role="gridcell">Data 2</div>
  </div>
</div>
```
- `treegrid` / `row` / `gridcell` / `rowheader` / `columnheader`
- `aria-expanded`: true | false (확장 가능한 행)
- `aria-selected`: true | false
- `aria-multiselectable`: true | false
- `aria-readonly`: true | false (편집 불가)

---

## 학습 로드맵

### 1단계: 기초 (1-2주)
**목표**: ARIA와 키보드 인터랙션의 기본 개념 이해

학습 순서:
1. **Button** - 가장 간단한 위젯
2. **Link** - 네이티브 요소 비교
3. **Landmarks** - 페이지 구조
4. **Breadcrumb** - 간단한 구조형 패턴
5. **Alert** / **Tooltip** - 단순 피드백

### 2단계: 입력 위젯 (2-3주)
**목표**: 사용자 입력을 받는 위젯들 학습

학습 순서:
1. **Checkbox** - 이중/삼중 상태
2. **Radio** - 라디오 그룹
3. **Slider** - 범위 입력
4. **Meter** - 값 표시

### 3단계: 복합 위젯 (3-4주)
**목표**: 포커스 관리와 포함된 네비게이션 이해

학습 순서:
1. **Disclosure** - 간단한 확장/축소
2. **Accordion** - 여러 섹션
3. **Tabs** - 탭 패턴
4. **Listbox** - 옵션 선택
5. **Menu** / **Menubar** - 메뉴 네비게이션

### 4단계: 고급 위젯 (4-5주)
**목표**: 대규모 데이터와 복잡한 상호작용

학습 순서:
1. **Grid** - 레이아웃 그리드로 시작
2. **Table** - 정적 데이터 표시
3. **Treeview** - 계층 네비게이션
4. **Treegrid** - 계층+표 데이터
5. **Combobox** - 복잡한 팝업 관리

### 5단계: 특수 패턴 (2-3주)
**목표**: 특정 UI 패턴 학습

학습 순서:
1. **Dialog** - 모달 포커스 관리
2. **Alert Dialog** - 위험한 액션
3. **Carousel** - 동적 회전
4. **Feed** - 무한 스크롤
5. **Menu Button** - 버튼+메뉴
6. **Toolbar** - 컨트롤 그룹
7. **Window Splitter** - 창 크기 조절

---

## 핵심 ARIA 속성 정리

### 1. 포커스 및 네비게이션

| 속성 | 값 | 사용처 | 설명 |
|-----|-----|-------|------|
| `tabindex` | -1, 0, >0 | 모든 요소 | -1: 포커스 불가 but JS 포커스 가능; 0: 탭 순서; >0: 불권장 |
| `aria-activedescendant` | ID | Composite widgets | DOM 포커스는 부모에, 논리 포커스는 자식에 (combobox, listbox 등) |

### 2. 상태 및 속성

| 속성 | 값 | 사용처 | 설명 |
|-----|-----|-------|------|
| `aria-checked` | true, false, mixed | Checkbox, radio, menuitemradio/checkbox | 체크 상태 |
| `aria-pressed` | true, false | Toggle button | 토글 상태 |
| `aria-selected` | true, false | Listbox option, tab, grid cell | 선택 상태 |
| `aria-expanded` | true, false | Button (disclosure, accordion), menu item | 확장/축소 상태 |
| `aria-hidden` | true, false | 모든 요소 | 보조 기술에서 숨김 |
| `aria-disabled` | true, false | 모든 요소 | 비활성화 상태 (HTML disabled 권장) |

### 3. 팝업 및 컨텐츠 관계

| 속성 | 값 | 사용처 | 설명 |
|-----|-----|-------|------|
| `aria-haspopup` | menu, listbox, tree, grid, dialog, true, false | Button, combobox | 팝업 표시 가능 |
| `aria-expanded` | true, false | 위와 동일 | 팝업이 표시되어 있는가? |
| `aria-controls` | ID list | Button, combobox | 제어하는 요소 |
| `aria-owns` | ID list | Container | DOM 위치와 무관하게 논리적 소유권 |

### 4. 레이블 및 설명

| 속성 | 값 | 사용처 | 설명 |
|-----|-----|-------|------|
| `aria-label` | String | 모든 요소 | 보이지 않는 직접 레이블 |
| `aria-labelledby` | ID list | 모든 요소 | 다른 요소로부터의 레이블 |
| `aria-describedby` | ID list | 모든 요소 | 추가 설명 (대화상자 등) |
| `aria-roledescription` | String | 모든 요소 | 역할의 사용자 정의 설명 ("carousel" 등) |

### 5. 값 관련

| 속성 | 값 | 사용처 | 설명 |
|-----|-----|-------|------|
| `aria-valuenow` | Number | Slider, meter, progressbar | 현재 값 |
| `aria-valuemin` | Number | Slider, meter, progressbar | 최소값 |
| `aria-valuemax` | Number | Slider, meter, progressbar | 최대값 |
| `aria-valuetext` | String | Slider, meter, progressbar | 값의 텍스트 표현 |

### 6. 다중성 및 범위

| 속성 | 값 | 사용처 | 설명 |
|-----|-----|-------|------|
| `aria-multiselectable` | true, false | Listbox, tree, grid | 다중 선택 가능? |
| `aria-orientation` | horizontal, vertical | Slider, menubar, toolbar, tabs, tree | 방향 |
| `aria-sort` | none, ascending, descending, other | Columnheader, rowheader | 정렬 상태 |

### 7. 나열 및 위치

| 속성 | 값 | 사용처 | 설명 |
|-----|-----|-------|------|
| `aria-posinset` | Integer | 모든 항목 | 집합 내 위치 (1부터 시작) |
| `aria-setsize` | Integer | 모든 항목 | 집합의 총 크기 (-1 = 미결정) |
| `aria-level` | Integer | Heading, treeitem | 계층 깊이 |

### 8. 라이브 영역 및 동적 콘텐츠

| 속성 | 값 | 사용처 | 설명 |
|-----|-----|-------|------|
| `aria-live` | off, polite, assertive | 동적 콘텐츠 | 콘텐츠 변경 공지 레벨 |
| `aria-busy` | true, false | 동적 업데이트 중인 요소 | 업데이트 진행 중? |
| `aria-atomic` | true, false | Live region | 전체 영역 또는 변경 부분만 공지? |
| `aria-relevant` | additions, removals, text, all | Live region | 어떤 변경을 공지할지 |

### 9. 기타

| 속성 | 값 | 사용처 | 설명 |
|-----|-----|-------|------|
| `aria-modal` | true, false | Dialog | 모달 다이얼로그? |
| `aria-readonly` | true, false | Grid, gridcell, treegrid | 읽기 전용? |
| `aria-required` | true, false | Combobox, listbox | 필수 입력? |
| `aria-current` | page, step, location, date, time, true | Link | 현재 페이지/위치 표시 |

---

## 실전 팁

### 1. 키보드 인터랙션 우선 설계
- ARIA는 의미만 전달, 동작은 JavaScript로 구현
- 키보드 컨트랙트를 먼저 정의하고 ARIA 따라오기

### 2. 로빙 탭인덱스 vs aria-activedescendant
- **로빙 탭인덱스**: 한 번에 하나의 요소만 `tabindex="0"`, 나머지 `-1` → JavaScript에서 포커스 이동
- **aria-activedescendant**: DOM 포커스는 컨테이너, 논리 포커스는 자식 → 더 간단할 수 있음

### 3. 포커스 관리는 필수
- 다이얼로그 열기 → 포커스를 다이얼로그로 이동
- 다이얼로그 닫기 → 포커스를 트리거 요소로 반환
- 항목 삭제 → 포커스를 다음/이전 항목 또는 부모로 이동

### 4. 테스트
- **Screen reader**: NVDA, JAWS, VoiceOver
- **Keyboard-only**: Tab, Shift+Tab, Enter, Space, Arrow keys만 사용
- **자동화 도구**: Axe, WAVE, Lighthouse

### 5. 문서화
- 숨겨진 키보드 인터랙션은 문서화 필수 (특히 Feed 같은 비표준 패턴)
- 예: "Page Down으로 다음 게시물로 이동, Page Up으로 이전으로 돌아갑니다"

---

## 참고 자료

- [W3C WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/)
- [MDN ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
- [WebAIM](https://webaim.org/)
- [Inclusive Components](https://inclusive-components.design/)

---

**작성일**: 2026년 1월 14일
**버전**: 1.0