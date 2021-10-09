// 마우스 커서 모양 꾸미기
const cursor = document.getElementById("cursor")
window.addEventListener("mousemove", function(e) {
    let mouseX = e.pageX
    let mouseY = e.pageY
    cursor.style.top = mouseY + "px"
    cursor.style.left = mouseX + "px"
    $("a").on("mouseenter", function() {
        cursor.style.fontSize = "3.5em";
        cursor.style.opacity = "0.5";
    })
    $("a").on("mouseleave", function() {
        cursor.style.fontSize = "1.3em";
        cursor.style.opacity = "1";
    })
})
// 검색창에서 글자 쓸 때 돋보기 동작하기
const search = document.getElementById("s_write")
const check = document.getElementById("check")
search.addEventListener("focus", function() {
    check.style.backgroundImage = "url(images/search.gif)";
})
search.addEventListener("focusout", function() {
    check.style.backgroundImage = "url(svg/search.svg)";
})
// 글자 크기의 화살표 버튼 누르면 body 의 font-size 가 0.05em 씩 늘거나 줄 것
const body = document.querySelector("body")
const fontBtn = document.querySelectorAll("#text_size a")
body.style.fontSize = "1em"
// 글자 작게
fontBtn[0].addEventListener("click", function(e) {
    e.preventDefault();
    if (body.style.fontSize == "0.7em") return false;
    body.style.fontSize = parseFloat(body.style.fontSize) - 0.05 +  "em";
})
// 글자 크게
fontBtn[1].addEventListener("click", function(e) {
    e.preventDefault();
    if (body.style.fontSize == "1.7em") return false;
    body.style.fontSize = parseFloat(body.style.fontSize) + 0.05 +  "em";
    console.log(body.style.fontSize)
})