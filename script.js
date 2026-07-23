/* ============================================================
   WEBSITE WEDDING V3
   Author : ChatGPT x Long
   File   : script.js
   Phiên bản viết lại hoàn toàn
============================================================ */


/* ============================================================
   LẤY CÁC PHẦN TỬ HTML
============================================================ */

const intro = document.getElementById("intro");

const openButton = document.getElementById("openInvitation");

const bgMusic = document.getElementById("bgMusic");

const musicButton = document.getElementById("musicToggle");

const musicIcon = musicButton
    ? musicButton.querySelector("i")
    : null;



/* ============================================================
   BIẾN TRẠNG THÁI
============================================================ */

// Đã mở thiệp chưa
let invitationOpened = false;

// Nhạc đang phát?
let isPlaying = false;



/* ============================================================
   PHÁT NHẠC
============================================================ */

function playMusic(){

    if(!bgMusic) return;

    bgMusic.play().catch(()=>{

        console.log("Trình duyệt chặn Auto Play.");

    });

    isPlaying = true;

    if(musicIcon){

        musicIcon.classList.remove("fa-volume-xmark");

        musicIcon.classList.add("fa-volume-high");

    }

    if(musicButton){

        musicButton.classList.add("playing");

    }

}



/* ============================================================
   DỪNG NHẠC
============================================================ */

function stopMusic(){

    if(!bgMusic) return;

    bgMusic.pause();

    isPlaying = false;

    if(musicIcon){

        musicIcon.classList.remove("fa-volume-high");

        musicIcon.classList.add("fa-volume-xmark");

    }

    if(musicButton){

        musicButton.classList.remove("playing");

    }

}



/* ============================================================
   MỞ THIỆP
============================================================ */

function openInvitation(playAudio = true){

    if(invitationOpened) return;

    invitationOpened = true;

    if(intro){

        intro.style.transition = "opacity .8s ease";

        intro.style.opacity = "0";

        setTimeout(()=>{

            intro.style.display = "none";

        },800);

    }

    // Chỉ phát nhạc khi click
    if(playAudio){

        playMusic();

    }

}



/* ============================================================
   CLICK MỞ THIỆP
============================================================ */

if(openButton){

    openButton.addEventListener("click",()=>{

        openInvitation(true);

    });

}



/* ============================================================
   SAU 5 GIÂY TỰ MỞ THIỆP
============================================================ */

setTimeout(()=>{

    if(!invitationOpened){

        openInvitation(false);

    }

},5000);



/* ============================================================
   BẬT / TẮT NHẠC
============================================================ */

if(musicButton){

    musicButton.addEventListener("click",()=>{

        if(isPlaying){

            stopMusic();

        }else{

            playMusic();

        }

    });

} 
/* ============================================================
   ĐẾM NGƯỢC ĐẾN NGÀY CƯỚI
============================================================ */

// Thời gian lễ cưới
const weddingDate = new Date("December 12, 2026 11:00:00").getTime();



/* ============================================================
   CẬP NHẬT COUNTDOWN
============================================================ */

function updateCountdown(){

    const now = new Date().getTime();

    const distance = weddingDate - now;

    // Nếu ngày cưới đã đến
    if(distance <= 0){

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;

    }

    // Tính ngày
    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    // Tính giờ
    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    // Tính phút
    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    // Tính giây
    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );

    // Đổ dữ liệu lên giao diện
    const dayBox = document.getElementById("days");
    const hourBox = document.getElementById("hours");
    const minuteBox = document.getElementById("minutes");
    const secondBox = document.getElementById("seconds");

    if(dayBox) dayBox.textContent = String(days).padStart(2,"0");

    if(hourBox) hourBox.textContent = String(hours).padStart(2,"0");

    if(minuteBox) minuteBox.textContent = String(minutes).padStart(2,"0");

    if(secondBox) secondBox.textContent = String(seconds).padStart(2,"0");

}



// Chạy lần đầu
updateCountdown();

// Cập nhật mỗi giây
setInterval(updateCountdown,1000);



/* ============================================================
   HIỆU ỨNG FADE KHI CUỘN
============================================================ */

// Các phần cần xuất hiện khi cuộn
const revealElements = document.querySelectorAll(

`
.count-card,
.timeline-item,
.event-card,
.gallery-item,
.gift-card,
.rsvp,
.footer
`

);



function revealOnScroll(){

    const windowHeight = window.innerHeight;

    revealElements.forEach((element)=>{

        const top = element.getBoundingClientRect().top;

        if(top < windowHeight - 120){

            element.classList.add("show");

        }

    });

}



// Chạy khi cuộn
window.addEventListener("scroll",revealOnScroll);

// Chạy khi tải trang
revealOnScroll();
/* ============================================================
   GALLERY LIGHTBOX
============================================================ */

// Lấy các phần tử Gallery
const galleryImages = document.querySelectorAll(".gallery-item img");

const lightbox = document.getElementById("lightbox");

const lightboxImg = document.getElementById("lightbox-img");

const closeLightbox = document.querySelector(".close-lightbox");



/* ============================================================
   MỞ LIGHTBOX
============================================================ */

if(galleryImages.length > 0 && lightbox && lightboxImg){

    galleryImages.forEach((img)=>{

        img.addEventListener("click",()=>{

            lightbox.classList.add("active");

            lightboxImg.src = img.src;

            lightboxImg.alt = img.alt || "";

            // Khóa cuộn khi xem ảnh
            document.body.style.overflow = "hidden";

        });

    });

}



/* ============================================================
   ĐÓNG LIGHTBOX
============================================================ */

function closeGallery(){

    if(!lightbox) return;

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}



// Bấm nút X
if(closeLightbox){

    closeLightbox.addEventListener("click",closeGallery);

}



// Bấm nền đen
if(lightbox){

    lightbox.addEventListener("click",(e)=>{

        if(e.target===lightbox){

            closeGallery();

        }

    });

}



// Nhấn ESC
document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closeGallery();

    }

});



/* ============================================================
   SCROLL MƯỢT
============================================================ */

document.querySelectorAll('a[href^="#"]').forEach((anchor)=>{

    anchor.addEventListener("click",(e)=>{

        const href = anchor.getAttribute("href");

        if(href==="#" || href==="") return;

        const target = document.querySelector(href);

        if(target){

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        }

    });

});



/* ============================================================
   HIỆU ỨNG KHI LOAD XONG
============================================================ */

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});



/* ============================================================
   LOG
============================================================ */

console.log("%cWedding Website Ready ❤️",
"color:#C7A86B;font-size:16px;font-weight:bold;");
