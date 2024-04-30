<div>
  <h2 align="center">Index</h2>
  <p align="center">
    <a href="#프로젝트-구조">프로젝트 구조</a> /
    <a href="#how-to-start">How To Start</a> /
    <a href="#contributor">Contributor</a> /
    <a href="#how-to-contribute">How To Contribute</a> 
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
├── .html
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

## How To Start

> **Prerequiste:**
>
> 1. _installation of node_, the versions must be 16 or later for reliable execution
> 2. Two files below should be located in the certain location
>
> - **.env**: In the top level, same level with _.gitignore_ file
> - **secretKey.js**: Under the _config_ folder, same level with _config.js_ file <br>
>
> **You can get the files on our notion page!** https://www.notion.so/2c5644b064b14677bbedb58f07341afe?pvs=4

> **※WARNNING※**: If there is a database connection error when running this project, there may be problem with Wi-Fi. Change the Wi-Fi.

```bash
# Install dependencies required to run project
$ npm install

# Run the app
$ node app.js
```

## Contributor

|     | name       | main task         | github address                    | contact             |
| --- | ---------- | ----------------- | --------------------------------- | ------------------- |
|     | Gayeon Bae | Backend Developer | https://github.com/BaeGayeon      | ebgy918@gmail.com   |
|     | Minjae Kim | Backend Developer | https://github.com/Minjae-vincent | alswo9853@gmail.com |
|     |            |                   |                                   |                     |

## How to contribute

If you have a suggestion that would make this better, please fork the repo and create a pull request.

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request
