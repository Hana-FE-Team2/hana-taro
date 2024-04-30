<div>
  <h2 align="center">Index</h2>
  <p align="center">
    <a href="#repository-structure">프로젝트 구조</a> /
    <a href="#how-to-start">How To Start</a> /
    <a href="#contributor">Contributor</a> /
    <a href="#how-to-contribute">How To Contribute</a> 
  </p>
<div>

<hr>

## Repository Structure

```bash
.
├── css
│   ├── hanat-04.css
│   └── style.css
├── hanat-01.html
├── hanat-02.html
├── hanat-03.html
├── hanat-04.html
├── hanat-05.html
├── img
│   ├── cards
│   ├── component
│   │   ├── arrow.png
│   │   ├── cardBack.jpg
│   │   ├── cardFrame.png
│   │   ├── cardPlate.jpg
│   │   ├── descriptionFrame.png
│   │   ├── hanaCardBackFit.png
│   │   └── speechBubble.jpg
│   └── main
├── js
│   ├── app.js
│   ├── card.js
│   ├── cards.js
│   ├── hanat-01.js
│   ├── hanat-02.js
│   ├── hanat-03.js
│   ├── hanat-04.js
│   ├── hanat-05.js
│   └── modal.js
├── modal
│   ├── hanat-04-modal.html
│   ├── modal-multi.html
│   └── modal.html
├── pages
└── sample
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
