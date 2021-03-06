/* 마우스 커서 */

// 마우스 커서 모양 꾸미기
const cursor = document.getElementById("cursor")
window.addEventListener("mousemove", function(e) {
    let mouseX = e.pageX
    let mouseY = e.pageY
    cursor.style.top = mouseY + "px"
    cursor.style.left = mouseX + "px"
    $("a").on("mouseenter", function() {
        cursor.style.fontSize = "50px";
        cursor.style.opacity = "0.5";
    })
    $("a").on("mouseleave", function() {
        cursor.style.fontSize = "20px";
        cursor.style.opacity = "1";
    })
    // 마우스가 윈도우 너비에서 거의 끝에 가면 div를 없앤다.
    if (parseInt(cursor.style.left) > window.innerWidth - 80) {
        cursor.style.display = "none";
    }
    else {
        cursor.style.display = "block";
    }
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
    menuLine()
})
// 글자 크게
fontBtn[1].addEventListener("click", function(e) {
    e.preventDefault();
    if (body.style.fontSize == "1.7em") return false;
    body.style.fontSize = parseFloat(body.style.fontSize) + 0.05 +  "em";
    menuLine()
})

/* 메뉴 */

// 1 / 3번 메뉴 화면 크기가 작아지거나 글자가 커지면 줄바꿈하자
menuLine()
window.addEventListener("resize", menuLine)
function menuLine() {
    if (window.innerWidth < 900) {
        $("#menuBig .gnb .one_depth_snb > li").css({width: "16%"})
        $("#menuBig .gnb .one_depth_snb > li").css({clear: "none"})
        $("#menuBig .gnb .one_depth_snb:eq(0) > li").css({width: "20%"})
        $("#menuBig .gnb .one_depth_snb:eq(2) > li").css({width: "20%"})
        $("#menuBig .gnb .one_depth_snb:eq(0) > li:last").css({clear: "both"})
        $("#menuBig .gnb .one_depth_snb:eq(2) > li:last").css({clear: "both"})
    }
    else {
        if (window.innerWidth > 1500) {
            $("#menuBig .gnb .one_depth_snb > li").css({width: "16%"})
            $("#menuBig .gnb .one_depth_snb > li").css({clear: "none"})
        }
        else if (window.innerWidth > 1200 && parseFloat(body.style.fontSize) == 1.7) {
            $("#menuBig .gnb .one_depth_snb > li").css({width: "16%"})
            $("#menuBig .gnb .one_depth_snb > li").css({clear: "none"})
            $("#menuBig .gnb .one_depth_snb:eq(0) > li").css({width: "30%"})
            $("#menuBig .gnb .one_depth_snb:eq(2) > li").css({width: "30%"})
            $("#menuBig .gnb .one_depth_snb:eq(0) > li:eq(3)").css({clear: "both"})
            $("#menuBig .gnb .one_depth_snb:eq(2) > li:eq(3)").css({clear: "both"})
        }
        else if (parseFloat(body.style.fontSize) == 1.7) {
            $("#menuBig .gnb .one_depth_snb > li").css({width: "16%"})
            $("#menuBig .gnb .one_depth_snb > li").css({clear: "none"})
            $("#menuBig .gnb .one_depth_snb > li").css({width: "30%"})
            $("#menuBig .gnb .one_depth_snb > li:eq(3)").css({clear: "both"})
        }
        else if (parseFloat(body.style.fontSize) > 1.2) {
            $("#menuBig .gnb .one_depth_snb > li").css({width: "16%"})
            $("#menuBig .gnb .one_depth_snb > li").css({clear: "none"})
            $("#menuBig .gnb .one_depth_snb:eq(0) > li").css({width: "25%"})
            $("#menuBig .gnb .one_depth_snb:eq(2) > li").css({width: "25%"})
            $("#menuBig .gnb .one_depth_snb:eq(0) > li:eq(4)").css({clear: "both"})
            $("#menuBig .gnb .one_depth_snb:eq(2) > li:eq(4)").css({clear: "both"})
        }
        else {
            $("#menuBig .gnb .one_depth_snb > li").css({width: "16%"})
            $("#menuBig .gnb .one_depth_snb > li").css({clear: "none"})
        }
    }
}

// 보조 메뉴 보이게
const topWrap = document.getElementById("topWrap")
// 큰 화면인 경우
function menuBig() {
    $("#menuBig .gnb > li").on("mouseenter", function(e) {
        e.preventDefault();
        topWrap.style.backgroundColor = "#fff";
        $(this).children("a").addClass("active")
        $(this).children("#menuBig .one_depth_snb").stop().slideDown(200)
    })
    $("#menuBig .gnb > li").on("mouseleave", function(e) {
        e.preventDefault();
        $(this).children("a").removeClass("active")
        $(this).children("#menuBig .one_depth_snb").stop().slideUp(200)
    })
    $("#topWrap").on("mouseleave", function() {
        setTimeout(function() {
            topWrap.style.backgroundColor = "rgba(255, 255, 255, 0.9)"
        }, 200)
    })
}
// 작은 화면의 경우
$("#toggleBtn").on("click", function(e) {
    e.preventDefault();
    if ($("#menuSmall").hasClass("active")) {
        $("#menuSmall").removeClass("active")
        $("#menuSmall a").removeClass("active")
        $("#menuSmall .gnb .one_depth_snb").hide()
        $("#menuSmall .gnb .two_depth_snb").hide()
    }
    else $("#menuSmall").addClass("active")
})
function menuSmall() {
    $("#menuSmall .gnb > li > a").on("click", function(e) {
        e.preventDefault();
        if ($(this).hasClass("active")) {
            $(this).removeClass("active")
            $(this).next().slideUp(200)
        }
        else {
            $("#menuSmall .gnb > li > a").not(this).removeClass("active")
            $(this).addClass("active")
            $("#menuSmall .gnb > li > a").not(this).next().slideUp(200)
            $(this).next().stop().slideDown(200)
        }
        $("#menuSmall .gnb .one_depth_snb > li > a").next().hide()
        $("#menuSmall .gnb .one_depth_snb > li > a").removeClass("active")
    })
    $("#menuSmall .gnb .one_depth_snb > li > a").on("click", function(e) {
        e.preventDefault();
        if ($(this).hasClass("active")) {
            $(this).removeClass("active")
            $(this).next().slideUp(200)
        }
        else {
            $("#menuSmall .gnb .one_depth_snb > li > a").removeClass("active")
            $(this).addClass("active")
            $("#menuSmall .gnb .one_depth_snb > li > a").not(this).next().slideUp(200)
            $(this).next().stop().slideDown(200)
        }
    })
    
}
menuView();
menuBig();
menuSmall();
$(window).resize(function() {
    menuView();
})
// 각 메뉴 show / hide
function menuView() {
    if (window.innerWidth > 800) {
        $("#toggleBtn").css({display: "none"})
        $("#menuBig").css({display: "block"})
        $("#menuSmall").removeClass("active")
        $("#menuSmall").css({display: "none"})
    }
    else {
        $("#toggleBtn").css({display: "block"})
        $("#menuBig").css({display: "none"})
        $("#menuSmall").css({display: "block"})
    }
}

// 아이디로 보내기
$(".gnb .one_depth_snb li a").on("click", function(e) {
    e.preventDefault();
    let target = $($(this).attr("href")).position().top - topWrap.offsetHeight
    console.log(target)
    $("html, body:not(:animated)").animate({scrollTop: target})
})

// 아래로 휠 - 숨기기 / 위로 휠 - 나타나기
window.addEventListener("wheel", function(e) {
    if (e.wheelDelta < 0) {
        topWrap.className = "slideUp"
        $("#toggleBtn").addClass("slideUp")
    }
    else {
        topWrap.removeAttribute("class");
        $("#toggleBtn").removeClass("slideUp")
    }
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
mSlider.style.marginTop = topWrap.offsetHeight + "px"
window.addEventListener("resize", function() {
    mSlider.style.marginTop = topWrap.offsetHeight + "px"
})
// 이미지 넣기
for(let i=0; i<mSlide.length; i++) {
    imgPath = mSlide[i].children[0].getAttribute("data-imgPath")
    mSlide[i].style.backgroundImage = "url(" + imgPath + ".jpg)"
    if (i == 1 || i == 3 || i == 4 || i == 5) {
        $("#main_sliderWrap li:eq(" + i + ") a p").css("color", "#9f9f9f")
        $("#main_sliderWrap li:eq(" + i + ") a p em").css("color", "#000")
    }
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
    if ($(this).hasClass("on")) return false;
    else {
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
    }
})

// 윈도우 리사이즈 시 슬라이드 포지션 변경
function slidePosition() {
    if (window.innerWidth < 800) {
        $("#main_sliderWrap li").each(function() {
            $(this).css({backgroundPositionX: -(2300 - window.innerWidth)})
        })
    }
    else if (window.innerWidth < 1500) {
        $("#main_sliderWrap li").each(function() {
            $(this).css({backgroundPositionX: -(2500 - window.innerWidth)})
        })
    }
    else {
        $("#main_sliderWrap li").each(function() {
            $(this).css({backgroundPositionX: "center"})
        })
    }
}
slidePosition()
window.addEventListener("resize", function() {
    slidePosition()
})

/* 추천해요 */
const rdd = document.querySelectorAll("#recommend dl dd")
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
    let recommendY = $("#recommend").position().top - 500
    if (posY > recommendY && rcState == 0) {
        rcState = 1;
        recommendUp();
    }
    else if (posY < recommendY && rcState == 1) {
        rcState = 0;
        recommendDown();
    }
})
// 블러처리
$("#recommend dl dd").hover(function() {
    $("#recommend dl dd").not($(this)).css({ filter: "blur(2px)"})
  }, function() {
    $("#recommend dl dd").css({ filter: "blur(0)"})
})
/* 새로 나왔어요 */

let newState = 0;

// 이미지 설명 넣기
// $(".pList").each(function() {
//     $(this).find("img").attr("alt", $(this).find(".p_name p:first").text())
// })

// 내려가면 올라오기
function newUp() {
    $("#new h2").animate({top: 0, opacity: 1}, 500)
    $("#newList").delay(100).animate({top: 0, opacity: 1}, 500)
    $("#new_move").delay(200).animate({top: 0, opacity: 1}, 500)
}
function newDown() {
    $("#new h2").animate({top: 100, opacity: 0}, 100)
    $("#newList").delay(100).animate({top: 100, opacity: 0}, 100)
    $("#new_move").delay(200).animate({top: 100, opacity: 0}, 100)
}
window.addEventListener("scroll", function() {
    let posY = window.scrollY
    let newY = $("#new").position().top - 500
    if (posY > newY && newState == 0) {
        newState = 1;
        newUp();
    }
    else if (posY < newY && newState == 1) {
        newState = 0;
        newDown();
    }
})

const newList = document.getElementById("newList")
const newListWrap = document.getElementById("newListWrap")
const newPosition = document.getElementById("new_position")
const newPoint = document.querySelector("#new_position a")
let newTimer;
let newListState = 0;
let newListWrapWidth, newListWidth, newListX, newListPos, newPositionWidth, newMovePos;
let newPointPos, newListLeft, newPointLeft;

// 슬라이드 이동 -> newList 가 움직여야한다.
newTimer = setInterval(newSlideMove, 10)
function newSlideNext() {
    if (newListPos > 1) {
        $("#newList").css({left: 0})
        $("#new_position a").css({left: 0})
    }
    $("#newList").css({left: "-=" + 1}) // 슬라이드 리스트
    $("#new_position a").css({left: newListPos * newMovePos}) // 슬라이드 아래에 위치 표시 요소
}
function newSlidePrev() {
    if (newListPos < newListX-1) {
        $("#newList").css({left: newListX})
        $("#new_position a").css({left: newPositionWidth})
    }
    $("#newList").css({left: "+=" + 1})
    $("#new_position a").css({left: newListPos * newMovePos})
}
function newSlideMove() {
    newListWrapWidth = newListWrap.offsetWidth // 슬라이드를 감싸는 요소 길이
    newListWidth = newList.offsetWidth // 슬라이드 총 길이
    newListX = newListWrapWidth - newListWidth // 슬라이드가 움직여야하는 길이 (음수)
    newListPos = parseInt($("#newList").css("left")) // 슬라이드 현재 위치
    newPositionWidth = newPosition.offsetWidth - newPoint.offsetWidth // 아래 위치 나타내는 요소 길이
    // 비율 계산법 = 특정값 / 전체값 * 100
    newMovePos = newPositionWidth / newListX // 슬라이드 길이와의 비율
    // 끝에 도달 시 방향 전환
    if (newListPos >= 0) newListState = 1;
    else if (newListPos <= newListX) newListState = 0;
    if (newListState == 1 && newState == 1) newSlideNext();
    else if (newListState == 0 && newState == 1) newSlidePrev();
}
// 위치 표시 요소를 누르거나 슬라이드 리스트를 눌러서 움직일 수 있어야 한다.

let clickPosX1, clickPosX2;
let newListMove = 1; // 0:동작 불가 1: 동작 가능

// 이동해야하는 값 = 마우스 업 위치 - 마우스 다운 시 위치
// 근데 마우스를 클릭하는 동안 그만큼 움직여야한다 (동시에)
newListWrap.addEventListener("mouseenter", function(e) {
    e.preventDefault();
    clearInterval(newTimer)
})
newList.addEventListener("mousedown", function(e){
    e.preventDefault();
    newListWidth = parseInt($("#newList").width()) + parseInt($("#newList").css("padding-left"))*2
    newListWrapWidth = parseInt($("#newListWrap").width())
    newListX = newListWrapWidth - newListWidth
    newListPos = parseInt($("#newList").css("left"))
    clickX = e.pageX
    newPositionWidth = newPosition.offsetWidth - newPoint.offsetWidth
    newMovePos = newPositionWidth / newListX
    $(document).on("mousemove", function(e) {
        e.preventDefault();
        newListMove = 0
        $("#newList").css({left: newListPos + (e.pageX - clickX)})
        newListLeft = parseInt($("#newList").css("left"))
        $("#new_position a").css({left: newListLeft * newMovePos})
        if (newListLeft > 100) {
            $("#newList:not(:animated)").animate({left: 0})
            $("#new_position a").css({left: 0})
        }
        else if (newListLeft < newListX - 100) {
            $("#newList:not(:animated)").animate({left: newListX})
            $("#new_position a").css({left: newPositionWidth})
        }
    })
    $("#newList a").on("click", function() {
        // if (newListMove == 0) return false;
        return false
    })
})
$(document).on("mouseup", function(e) {
    setTimeout(function() {
        newListMove = 1
    }, 100)
    e.preventDefault();
    $(document).off("mousemove")
})
newListWrap.addEventListener("mouseleave", function() {
    newTimer = setInterval(newSlideMove, 10)
})
// 밑에 버튼으로 슬라이드 위치 조절
newPoint.addEventListener("click", function(e) {
    e.preventDefault();
})
newPoint.addEventListener("mouseenter", function() {
    clearInterval(newTimer)
})
newPoint.addEventListener("mouseleave", function() {
    newTimer = setInterval(newSlideMove, 10)
})
newPosition.addEventListener("mousedown", function(e) {
    e.preventDefault();
    newListWidth = parseInt($("#newList").width()) + parseInt($("#newList").css("padding-left"))*2
    newListWrapWidth = parseInt($("#newListWrap").width())
    newListX = newListWrapWidth - newListWidth
    newPointPos = parseInt($("#new_position a").css("left"))
    clickX = e.pageX
    newPositionWidth = newPosition.offsetWidth - newPoint.offsetWidth
    newMovePos = newListX / newPositionWidth
    $(document).on("mousemove", function(e) {
        $("#new_position a").css({left: newPointPos + (e.pageX - clickX)})
        newPointLeft = parseInt($("#new_position a").css("left"))
        $("#newList").css({left: newPointLeft * newMovePos})
        if (newPointLeft < 0) {
            $("#new_position a").css({left: 0})
            $("#newList").css({left: 0})
        }
        else if (newPointLeft > newPositionWidth) {
            $("#new_position a").css({left: newPositionWidth})
            $("#newList").css({left: newListX})
        }
    })
})
// 새로 나왔어요, 지역별 지점 섹션 이상에서는 위치에 오면 사이드 바 안보이게 한다.
window.addEventListener("scroll", function(e) {
    let posY = window.scrollY
    let newY = $("#new").position().top - 500
    let categoryY = $("#categoryBest").position().top - 500
    let branchY = $("#branch").position().top - 500
    if (window.innerWidth < 600) {
        $("#aside_product").stop().fadeIn(100)
        return false;
    }
    if ((posY > newY && posY < categoryY) || posY > branchY) {
        $("#aside_product").stop().fadeOut(100)
    }
    else {
        $("#aside_product").stop().fadeIn(100)
    }
})

/* 카테고리 베스트 */
let categoryState = 0;
$("#categoryBest section:first .cbListWrap").css({display: "block", opacity: 1})
$("#categoryBest section:first").addClass("active")
// 위로 떠오르기
function categoryUp() {
    $("#categoryBest h2").animate({top: 0, opacity: 1}, 500)
    $("#cbTapWrap").delay(100).animate({top: 0, opacity: 1}, 500)
}
function categoryDown() {
    $("#categoryBest h2").animate({top: 100, opacity: 0}, 100)
    $("#cbTapWrap").delay(100).animate({top: 100, opacity: 0}, 100)
}
window.addEventListener("scroll", function() {
    let posY = window.scrollY
    let categoryY = $("#categoryBest").position().top - 500
    if (posY > categoryY && categoryState == 0) {
        categoryState = 1;
        categoryUp();
    }
    else if (posY < categoryY && categoryState == 1) {
        categoryState = 0;
        categoryDown();
    }
})

// 탭 키 누를 때 그 화면으로 변경하기
$("#categoryBest section h3").on("click", function(e) {
    e.preventDefault();
    $("#categoryBest section .cbListWrap").hide()
    $(this).next().show()
    $("#categoryBest section").removeClass("active")
    $(this).parent().addClass("active")
})
$("#categoryBest a").on("click", function(e) {
    e.preventDefault();
})

// 상품 클릭 시 사이드 바인 최근 본 상품으로 이미지 들어가기
let rcProductNum = 0
$(".pList a").on("click", function() {
    if (newListMove == 1) {
        let recentProduct = document.createElement("li")
        let recentProductLink = document.createElement("a")
        recentProduct.appendChild(recentProductLink) // 새로운 링크
        recentProduct.style.backgroundImage = "url(" + $(this).find("img").attr("src") + ")"
        recentProduct.children[0].innerText = $(this).find(".p_name").children("p:first").text()
        recentProduct.children[0].className = "text_hidden"
        recentProduct.children[0].style.display = "block"
        $("#as_recent_product ul li.no_item").remove()
        if (rcProductNum == 5) {
            $("#as_recent_product ul li:last").remove()
        }
        $("#as_recent_product ul").prepend(recentProduct)
        if (rcProductNum < 5) rcProductNum++
    }
})

/* 지역별 지점 */

let branchState = 0;
let branchTimer, branchTimer2;

// 위치 잡기
let mapWrapHeight = parseInt($("#mapWrap").height()) * 0.55
$("#map").css({top: mapWrapHeight})
window.addEventListener("resize", function() {
    mapWrapHeight = parseInt($("#mapWrap").height()) * 0.55
    $("#map").css({top: mapWrapHeight})
})

// 도달 시 아이콘이 떠오르고난 후 숫자 카운트
const count = document.querySelectorAll(".count")
let countNum = [] // 처음 값들 넣어놓기
let countState = 0; // 0:동작 가능 1: 동작 불가
let bn = [0, 0, 0, 0, 0, 0, 0, 0];
for (let i=0; i<count.length; i++) {
    countNum.push(count[i].innerText)
}
$("#map .count").text("0")
function branchUp() { // 요소들 떠오르기
    $("#mapWrap > p").delay(100).animate({marginTop: 0, opacity: 1}, 500)
    $("#map").delay(200).animate({marginTop: 0, opacity: 1}, 500, function() {
        $("#map .count").css({backgroundPositionY: "bottom"})
    })
}
function branchDown() { // 요소들 내려가기
    $("#mapWrap > p").animate({marginTop: 100, opacity: 0}, 100)
    $("#map").animate({marginTop: 100, opacity: 0}, 100)
    $("#map .count").css({
        backgroundPositionY: 60
    }, 100)
}
function branchCount(classNum) {
    count[classNum].innerText = ++bn[classNum];
    if (bn[classNum] >= countNum[classNum]) return false;
    branchTimer = setTimeout(function() {
        branchCount(classNum)
    }, 10)
}
window.addEventListener("scroll", function() {
    let posY = window.scrollY
    let branchY = $("#branch").position().top - 500
    let isPause = false;
    if (posY > branchY && branchState == 0) {
        branchState = 1
        branchUp()
        branchTimer2 = setTimeout(function() {
            for(let i=0; i<count.length; i++) {
                branchCount(i)
            }
        }, 1000)
    }
    else if (posY < branchY && branchState == 1) {
        console.log(bn)
        branchState = 0
        branchDown()
        clearTimeout(branchTimer)
        clearTimeout(branchTimer2)
        bn = [0, 0, 0, 0, 0, 0, 0, 0];
        for(let i=0; i<count.length; i++) {
            count[i].innerText = 0
        }
    }
})

/* 거래처 회사 */
let clientState = 0;
// 위로 떠오르기
function clientUp() {
    $("#client h2").animate({top: 0, opacity: 1}, 500)
    $("#clientList").delay(100).animate({top: 0, opacity: 1}, 500)
}
function clientDown() {
    $("#client h2").animate({top: 100, opacity: 0}, 100)
    $("#clientList").delay(100).animate({top: 100, opacity: 0}, 100)
}
window.addEventListener("scroll", function() {
    let posY = window.scrollY
    let clientY = $("#client").position().top - 500
    if (posY > clientY && clientState == 0) {
        clientState = 1;
        clientUp();
    }
    else if (posY < clientY && clientState == 1) {
        clientState = 0;
        clientDown();
    }
})

/* 장바구니, 최근 본 상품, top, bottom 버튼 위치 */
sideBarPos()
window.addEventListener("resize", function() {
    sideBarPos()
})
window.addEventListener("scroll", function() {
    sideBarPos()
})
function sideBarPos() {
    // 장바구니, 최근 본 상품
    if (window.innerWidth < 600) {
        if (window.scrollY > $("#footerWrap").position().top - 1000) {
            $("#aside_product").css({position: "absolute", top: $("#footerWrap").position().top - 141})
        }
        else {
            $("#aside_product").css({position: "fixed", top: "auto", bottom: 76})
        }
    }
    else if (window.scrollY >= 500) {
        $("#aside_product").css({position: "fixed", top: 150})
    }
    else {
        $("#aside_product").css({position: "absolute", top: 800})
    }

    // top, bottom 버튼
    if(window.scrollY > $("#footerWrap").position().top - 1000) {
        $("#top_bottom").css({position: "absolute", top: $("#footerWrap").position().top - 75, bottom: "auto"})
    }
    else {
        $("#top_bottom").css({position: "fixed", top: "auto", bottom: 10})
    }
}
$("#as_recent_product").on("click", function() {
    if (window.innerWidth < 600) {
        $("p", this).toggle()
        $("ul", this).toggle()
    }
})
