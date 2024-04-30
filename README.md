<div>
  <h2 align="center">Index</h2>
  <p align="center">
    <a href="#프로젝트-구조">프로젝트 구조</a> /
    <a href="#프로젝트-구동">프로젝트 구동</a> 
  </p>
<div>

<hr>

## 프로젝트 구조

```bash
.
├── css # CSS 파일들이 위치한 폴더
│   ├── hanat-04.css
│   └── style.css
│# 페이지 별 html
├── index.html
├── hanat-02.html
├── hanat-03.html
├── hanat-04.html
├── hanat-05.html
├── img # 이미지
│   ├── cards # 타로 카드 이미지들이 위차한 폴더
│   ├── component # 페이지 전체에서 사용되는 이미지들이 위치한 폴더
│   └── main # 메인 페이지에서 사용되는 이미지들이 위치한 폴더
├── js # 자바스크립트 파일들이 위치한 폴더
│   ├── app.js # 페이지 전체에서 사용되는 자바스크립트 파일
│   ├── card.js # 타로 카드 관련 자바스크립트 파일
│   ├── cards.js # 타로 카드 데이터 파일
│   ├── hanat-01.js
│   ├── hanat-02.js
│   ├── hanat-03.js
│   ├── hanat-04.js
│   ├── hanat-05.js
│   └── modal.js
├── modal # 모달 관련 html 파일들이 위치한 폴더
│   ├── hanat-04-modal.html
│   ├── modal-multi.html
│   └── modal.html
└── sample # 샘플 코드들이 위치한 폴더
    ├── card-flip
    ├── card-pack
    │   └── scroll-animation
    │   └── style.css
    ├── modal_spa
    └── shuffle



```

## 프로젝트 구동

> **선행조건**
>
> 1. Visual Studio Code 설치
> 2. live server extension 설치

1. git clone

```bash
$ git clone https://github.com/Hana-FE-Team2/hana-tarot.git
```

2. Visual Studio Code으로 프로젝트 open

3. live server로 html 파일 실행
