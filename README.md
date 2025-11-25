# Frontend Mentor - Time tracking dashboard solution

This is a solution to the [Time tracking dashboard challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/time-tracking-dashboard-UIQ7167Jw). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Switch between viewing Daily, Weekly, and Monthly stats

### Screenshot

![Screenshot](./screenshot.png)

### Links

- Solution URL: [Add solution URL here](https://github.com/Yeounng/Frontend-Mentor-Junior/tree/time-tracking-dashboard)
- Live Site URL: [Add live site URL here](https://bright-cannoli-45186c.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- HTML data-attr을 활용해 JS에서 HTML 조작
- Json 데이터 형식을 HTML data-attr과 같게 문자 형식 조정(공백제거,camelCase 적용)

**Note: These are just examples. Delete this note and replace the list above with your own choices**

### What I learned

CSS grid 복습. 단순한 레이아웃이라 어렵지 않아서 금방 찾아서 했다.
fetch 함수로 json 데이터를 불러오는것과 promise 에 대해 알아봄.
forEach, for와 같은 반복문 활용, json데이터를 불러와 항목과 일치하면 그 값에 따라 하위 항목 데이터가 반영시키기. 대충 머리속에 로직은 짜여지는데 세세한 문법이나 메서드, 함수 등을 잘 다룰 줄 몰라 허덕였음.
JS 정규표현식으로 문자열 내 공백찾기
apple juice -> appleJuice와 같이 camelCase로 변환하는 과정에서 map(),slice(),split(),join()에 대해 알아봄.
Template literals(`$(expression)`) 사용해보기
NodeList와 HTMLCollection 의 차이.
함수에서 return을 사용했을때와 그렇지 않았을때의 차이. 함수 실행 결과값을 함수 밖에서도 활용하고싶다면 return이 반드시 필요하다.

if나 반복문 등을 짤때 굳이 필요없는데 복잡하게 생각하게 되는 경우가 많은듯. 필요없는 구조가 반복되기도 하고 그런다.

### Continued development

인터랙션과 메뉴버튼 클릭시 팝업창 등

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

- [javascript 정규표현식 공백 space 체크하기](https://youngram2.tistory.com/74)
- [Data 속성 사용하기](https://developer.mozilla.org/ko/docs/Web/HTML/How_to/Use_data_attributes)
- [Map 매서드 사용하기](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [forEach와 for in 차이](https://velog.io/@bining/javascript-for-in-for-of-forEach-%EC%B0%A8%EC%9D%B4%EC%A0%90)

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)

**Note: Delete this note and add/remove/edit lines above based on what links you'd like to share.**

## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.

**Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.**
