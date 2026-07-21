/* ============================================================
   WEBSITE WEDDING V2
   Author : ChatGPT x Long
   File   : script.js
============================================================ */


/* ============================================================
   KHAI BÁO CÁC PHẦN TỬ HTML
============================================================ */

const intro = document.querySelector("#intro");

const openButton = document.querySelector("#openInvitation");

const bgMusic = document.querySelector("#bgMusic");

const musicButton = document.querySelector("#musicToggle");

const musicIcon = musicButton.querySelector("i");



/* ============================================================
   BIẾN KIỂM TRA NHẠC ĐANG PHÁT HAY KHÔNG
============================================================ */

let isPlaying = false;



/* ============================================================
   HÀM PHÁT NHẠC
============================================================ */

function playMusic(){

    bgMusic.play();

    isPlaying = true;

    musicIcon.classList.remove("fa-volume-xmark");

    musicIcon.classList.add("fa-volume-high");

    musicButton.classList.add("playing");

}



/* ============================================================
   HÀM DỪNG NHẠC
============================================================ */

function stopMusic(){

    bgMusic.pause();

    isPlaying = false;

    musicIcon.classList.remove("fa-volume-high");

    musicIcon.classList.add("fa-volume-xmark");

    musicButton.classList.remove("playing");

}



/* ============================================================
   MỞ THIỆP
============================================================ */

openButton.addEventListener("click",()=>{

    intro.style.opacity="0";

    intro.style.visibility="hidden";

    playMusic();

});
/* ============================================================
   BẬT / TẮT NHẠC
============================================================ */

musicButton.addEventListener("click",()=>{

    if(isPlaying){

        stopMusic();

    }else{

        playMusic();

    }

});
/* ============================================================
   ĐẾM NGƯỢC ĐẾN NGÀY CƯỚI
============================================================ */

const weddingDate = new Date("December 12, 2026 11:00:00").getTime();



function updateCountdown(){

    const now = new Date().getTime();

    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000*60*60*24));

    const hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));

    const minutes = Math.floor((distance%(1000*60*60))/(1000*60));

    const seconds = Math.floor((distance%(1000*60))/1000);



    document.querySelector("#days").innerHTML = days;

    document.querySelector("#hours").innerHTML = hours;

    document.querySelector("#minutes").innerHTML = minutes;

    document.querySelector("#seconds").innerHTML = seconds;

}



updateCountdown();

setInterval(updateCountdown,1000);
/* ============================================================
   HIỆU ỨNG XUẤT HIỆN KHI CUỘN
============================================================ */

const fadeElements = document.querySelectorAll(

".count-card,.timeline-item,.event-card,.gallery-item,.gift-card,.rsvp,.footer"

);



function revealOnScroll(){

    fadeElements.forEach((element)=>{

        const top = element.getBoundingClientRect().top;

        const windowHeight = window.innerHeight;

        if(top < windowHeight - 120){

            element.classList.add("show");

        }

    });

}



window.addEventListener("scroll",revealOnScroll);

revealOnScroll();
/* ============================================================
   LIGHTBOX
============================================================ */

const galleryImages = document.querySelectorAll(".gallery-item img");

const lightbox = document.querySelector("#lightbox");

const lightboxImg = document.querySelector("#lightbox-img");

const closeLightbox = document.querySelector(".close-lightbox");



galleryImages.forEach((img)=>{

    img.addEventListener("click",()=>{

        lightbox.classList.add("active");

        lightboxImg.src = img.src;

    });

});



closeLightbox.addEventListener("click",()=>{

    lightbox.classList.remove("active");

});



lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.classList.remove("active");

    }

});
/* ============================================================
   SCROLL MƯỢT CHO CÁC LINK #
============================================================ */

document.querySelectorAll('a[href^="#"]').forEach((anchor)=>{

    anchor.addEventListener("click",(e)=>{

        e.preventDefault();

        const target=document.querySelector(anchor.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});



/* ============================================================
   WEBSITE ĐÃ KHỞI TẠO
============================================================ */

console.log("Wedding Website Ready ❤️");
