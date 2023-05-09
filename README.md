# WINDETECT Frontend

## Convention

### 1. Base URL

- 211.206.127.131

<br/>

### 2. 네이밍

- props 이름 : on + 이벤트종류 (ex. `onClick` )
- handler 이름 : handle + 이벤트대상 + 이벤트종류 (ex. `handleButtonClick` )
- function 이름 : 소문자+동사 로 시작하며 구체적으로 작성 ( ex. `changeD1Value`, `getAllContents`)
- 블록 안에서 쓰이는 임시변수 : `tmp_` 접두사 사용
  (ex. axios.then 체인 안에서의 임시변수는 `tmp_arr`, `tmp_heatmap` 이런식으로 작성)

<br/>

### 3.모듈 import

- 외부모듈과 내부모듈을 변수 참조 할때, 선언 사이에 공백 한줄을 두어 가독성 올리기

```javascript
import axios from "axios";
import antd from "antd";

import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
```

<br/>

### 4. CSS BEM(Block Element Modifier)

- 항상 영어 소문자만 사용. (카멜케이스 등은 사용하지 않음)
- 일반적인 한 요소는 하이픈(-) 으로 연결 (ex.`input-text, button-submit`)
- 형태-의미-순서-상태 순으로 사용 (ex. `button-submit-03-disable`)
- 언더스코어는 파일,폴더,이미지 등에만 사용 (ex. `image_logo_01.png`)
- 숫자를 사용할때는 확장성을 고려하여 01, 001 처럼 사용할것

<br/>

#### 4-1. Block

- Block의 클래스 명을 정의할때는 해당 Block의 목적을 기술해야한다.
  (ex. `button`,`header`,`modal` O / `red-text`, `main-radio` X )

#### 4-2. container, wrapper의 사용

- `container` 는 여러개의 요소를 감싸는 div
- `wrapper` 는 단일 요소의 레이아웃을 위한 div

```html
<ul class="items-container">
  <li class="item-wrapper">
    <div class="item">...</div>
  </li>
  <li class="item-wrapper">
    <div class="item">...</div>
  </li>
</ul>
```

<br/>

### 5. 차트별 공통옵션 관리 방안

- 각 차트(Bar, Donut, Table 등등) 이 가지는 공통옵션은 차트컴포넌트 내부에서 관리
- 페이지별로 `data` 만 props 전달

<br />

### 6. Commit Message Convention

커밋을 할때는 기능단위로 하기
**[FIX]** 버그, 오류 해결
**[ADD]** 라이브러리, 정적 파일 추가
**[FEAT]** 기능 구현
**[REMOVE]** 파일 삭제
**[REFACTOR]** 로직은 변경하지 않고 기존 코드 개선, 불필요한 코드 삭제, 가독성 개선 / 변수명 변경
**[CHORE]** 구조변경, 파일 이동
**[DESIGN]** 디자인 변경
**[COMMENT]** 필요한 주석 추가, 변경
**[DOCS]** README, Wiki 내용 추가 및 변경

<br/>
<br/>
<br/>
<br/>

<hr />
<small>업데이트 일시 : 2023년 04월 11일 </small><br />
<small>작성자 : seo@goldenplanet.co.kr </small><br />
