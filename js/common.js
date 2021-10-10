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

/* 헤더 */

// 검색창에서 글자 쓸 때 돋보기 동작하기
const s_write = document.getElementById("s_write")
const check = document.getElementById("check")
s_write.addEventListener("focus", function() {
    check.style.backgroundImage = "url(images/search.gif)";
})
s_write.addEventListener("focusout", function() {
    check.style.backgroundImage = "url(svg/search.svg)";
})

// 글자 크기의 화살표 버튼 누르면 body 의 font-size 가 0.05em 씩 늘거나 줄 것
const body = document.querySelector("body")
const fontBtn = document.querySelectorAll("#text_size a")
body.style.fontSize = "1em" // 한번 기본으로 넣어줘야 인식한다.
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

/* 메뉴 */

// 보조 메뉴 보이게
const topWrap = document.getElementById("topWrap")
const gnb = document.getElementById("gnb")
const oneDsnb = document.querySelectorAll(".one_depth_snb")
$("#gnb li").on("mouseenter", function() {
    topWrap.style.backgroundColor = "#fff";
    $(this).children("a").addClass("active")
    $(this).children(".one_depth_snb").stop().slideDown(200)
})
$("#gnb li").on("mouseleave", function() {
    $(this).children("a").removeClass("active")
    $(this).children(".one_depth_snb").stop().slideUp(200)
})
topWrap.addEventListener("mouseleave", function() {
    setTimeout(function() {
        topWrap.style.backgroundColor = "rgba(255, 255, 255, 0.9)"
    }, 200)
})
// 아래로 휠 - 숨기기 / 위로 휠 - 나타나기
window.addEventListener("wheel", function(e) {
    if (e.wheelDelta < 0) topWrap.className = "slideUp"
    else topWrap.removeAttribute("class");
})

/* 슬라이더 */

const mSlider = document.getElementById("main_slider")
const mSlide = document.querySelectorAll("#main_sliderWrap li")
let imgPath;
const mSlideWrap = document.getElementById("main_sliderWrap")
let timer;
const mSlideList = document.querySelectorAll("#main_sliderList li")
let mainNum = 0;

// 위치
window.addEventListener("resize", function() {
    mSlider.style.marginTop = topWrap.offsetHeight + "px"
})
// 이미지 넣기
for(let i=0; i<mSlide.length; i++) {
    imgPath = mSlide[i].children[0].getAttribute("data-imgPath")
    mSlide[i].style.backgroundImage = "url(" + imgPath + ".jpg)"
}
// 각 목록에 각 슬라이드의 제목 넣기
for(let i=0; i<mSlideList.length; i++) {
    mSlideList[i].children[0].innerText = $("#main_sliderWrap li:eq(" + i + ") a p em").text()
}
// 슬라이드 이동 (투명도)
$("#main_sliderWrap > li").eq(0).addClass("on")
function nextSlide() {
    // 목록에 현재 슬라이드 표시
    let className = $("#main_sliderWrap li:eq(1)").attr("class")
    let classNum = parseInt(className.substr(5, 1))-1
    $("#main_sliderList li").removeClass("on")
    mSlideList[classNum].className = "on"
    $("#main_sliderWrap > li:eq(1):not(:animated)").addClass("on").css("opacity", 0)
                .animate({opacity: 1}, function() {
                    $("#main_sliderWrap").append($("#main_sliderWrap > li:first"))
                    $("#main_sliderWrap > li:last").removeClass("on")
                })
}
// 시간마다 슬라이드 이동
timer = setInterval(nextSlide, 5000)
// 버튼 누르면 해당 슬라이드로 이동
mSlideList[0].className = "on"
$("#main_sliderList li").on("click", function(e) {
    e.preventDefault();
    clearInterval(timer)
    timer = setInterval(nextSlide, 5000)
    let btnIndex = $(this).index()
    let num;
    $("#main_sliderWrap > li").each(function() {
        let className = $(this).attr("class")
        let classNum = parseInt(className.substr(5, 1)) - 1
        if (classNum == btnIndex) {
            num = $(this).index()
            // 목록에 현재 슬라이드 표시
            $("#main_sliderList li").removeClass("on")
            mSlideList[classNum].className = "on"
        }
    })
    $("#main_sliderWrap > li").eq(num).addClass("on").css("opacity", 0)
                .animate({opacity: 1}, function() {
                    for(let i=0; i<num; i++) {
                        $("#main_sliderWrap").append($("#main_sliderWrap > li:first"))
                        $("#main_sliderWrap > li:last").removeClass("on")
                    }
                })
})

/* 추천해요 */
const rdd = document.querySelectorAll("#recommend dl dd")
const blur = document.querySelector("#blur")
// 이미지 넣기
for(let i=0; i<rdd.length; i++) {
    imgPath = rdd[i].children[0].getAttribute("data-imgPath")
    rdd[i].style.backgroundImage = "url(" + imgPath + ".jpg)"
}
// 내려가면 차례대로 올라오기
let rcState = 0;
function recommendUp() {
    $("#recommend h2").animate({top: 0, opacity: 1}, 500)
    $("#recommend dl dd").each(function() {
        let indexN = Math.floor($(this).index()/2) + 1
        $(this).delay(50*indexN)
            .animate({top: 0, opacity: 1}, 300)
    })
}
function recommendDown() {
    $("#recommend h2").animate({top: 100, opacity: 0}, 100)
    $("#recommend dl dd").each(function() {
        $(this).stop().animate({top: 100, opacity: 0}, 100)
    })
}
window.addEventListener("scroll", function() {
    let posY = window.scrollY
    let recommendY = $("#recommend").position().top - 400
    if (posY > recommendY && rcState == 0) {
        rcState = 1;
        recommendUp();
    }
    else if (posY < recommendY && rcState == 1) {
        rcState = 0;
        recommendDown();
    }
})
