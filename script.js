/* ==========================================================
   WEDDING WEBSITE V4
   SCRIPT.JS
   Author : ChatGPT x Long
========================================================== */


/* ==========================================================
   KHAI BÁO PHẦN TỬ HTML
========================================================== */

const intro = document.querySelector("#intro");

const openButton = document.querySelector("#openInvitation");

const bgMusic = document.querySelector("#bgMusic");

const musicButton = document.querySelector("#musicToggle");

const musicIcon = musicButton.querySelector("i");

const backToTop = document.querySelector("#backToTop");



/* ==========================================================
   BIẾN TRẠNG THÁI
========================================================== */

let invitationOpened = false;

let isPlaying = false;
/* ==========================================================
   HÀM PHÁT NHẠC
========================================================== */

function playMusic(){

    bgMusic.play()
    .then(()=>{

        isPlaying=true;

        musicIcon.classList.remove("fa-volume-xmark");

        musicIcon.classList.add("fa-volume-high");

        musicButton.classList.add("playing");

    })
    .catch(()=>{

        console.log("Trình duyệt chặn autoplay.");

    });

}



/* ==========================================================
   HÀM DỪNG NHẠC
========================================================== */

function stopMusic(){

    bgMusic.pause();

    isPlaying=false;

    musicIcon.classList.remove("fa-volume-high");

    musicIcon.classList.add("fa-volume-xmark");

    musicButton.classList.remove("playing");

}
/* ==========================================================
   MỞ THIỆP
========================================================== */

function openInvitation(playAudio=true){

    if(invitationOpened) return;

    invitationOpened=true;



    intro.style.opacity="0";

    intro.style.visibility="hidden";



    setTimeout(()=>{

        intro.style.display="none";

    },1200);



    if(playAudio){

        playMusic();

    }

}
/* ==========================================================
   CLICK MỞ THIỆP
========================================================== */

openButton.addEventListener("click",()=>{

    openInvitation(true);

});



/* ==========================================================
   TỰ MỞ SAU 5 GIÂY
========================================================== */

setTimeout(()=>{

    if(!invitationOpened){

        openInvitation(false);

    }

},5000);
/* ==========================================================
   BẬT TẮT NHẠC
========================================================== */

musicButton.addEventListener("click",()=>{

    if(isPlaying){

        stopMusic();

    }

    else{

        playMusic();

    }

});
/* ==========================================================
   ĐẾM NGƯỢC
========================================================== */

const weddingDate=new Date(

"December 12, 2026 11:00:00"

).getTime();



function updateCountdown(){

    const now=new Date().getTime();

    const distance=weddingDate-now;



    const days=Math.floor(distance/(1000*60*60*24));

    const hours=Math.floor(

        distance%(1000*60*60*24)

        /(1000*60*60)

    );



    const minutes=Math.floor(

        distance%(1000*60*60)

        /(1000*60)

    );



    const seconds=Math.floor(

        distance%(1000*60)

        /1000

    );



    document.querySelector("#days").textContent=days;

    document.querySelector("#hours").textContent=hours;

    document.querySelector("#minutes").textContent=minutes;

    document.querySelector("#seconds").textContent=seconds;

}



updateCountdown();

setInterval(updateCountdown,1000);
/* ==========================================================
   REVEAL ANIMATION
   Hiệu ứng xuất hiện khi cuộn
========================================================== */

const revealItems = document.querySelectorAll(

`
.reveal-top,
.reveal-bottom,
.reveal-left,
.reveal-right,
.reveal-scale,
.reveal-title,
.reveal-up,
.reveal-width
`

);

const revealObserver = new IntersectionObserver(

(entries)=>{

    entries.forEach((entry)=>{

        if(entry.isIntersecting){

            entry.target.classList.add("active");

        }

    });

},

{

    threshold:.18

}

);

revealItems.forEach((item)=>{

    revealObserver.observe(item);

});
/* ==========================================================
   NÚT LÊN ĐẦU TRANG
========================================================== */

window.addEventListener("scroll",()=>{

    if(window.scrollY>600){

        backToTop.classList.add("show");

    }

    else{

        backToTop.classList.remove("show");

    }

});



backToTop.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});
/* ==========================================================
   CUỘN MƯỢT
========================================================== */

document.querySelectorAll(

'a[href^="#"]'

).forEach((anchor)=>{

    anchor.addEventListener("click",(e)=>{

        e.preventDefault();

        const target=document.querySelector(

            anchor.getAttribute("href")

        );

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});
/* ==========================================================
   GALLERY LIGHTBOX
========================================================== */

const galleryItems=document.querySelectorAll(

".gallery-item img"

);

const lightbox=document.querySelector(

"#lightbox"

);

const lightboxImg=document.querySelector(

"#lightbox-img"

);

const closeBtn=document.querySelector(

".close-lightbox"

);



galleryItems.forEach((img)=>{

    img.addEventListener("click",()=>{

        lightbox.classList.add("active");

        lightboxImg.src=img.src;

    });

});



closeBtn.addEventListener("click",()=>{

    lightbox.classList.remove("active");

});



lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.classList.remove("active");

    }

});
/* ==========================================================
   LAZY LOAD IMAGE
========================================================== */

const lazyImages=document.querySelectorAll(

"img[data-src]"

);

const imageObserver=new IntersectionObserver(

(entries)=>{

    entries.forEach((entry)=>{

        if(entry.isIntersecting){

            const img=entry.target;

            img.src=img.dataset.src;

            imageObserver.unobserve(img);

        }

    });

},

{

    rootMargin:"120px"

}

);



lazyImages.forEach((img)=>{

    imageObserver.observe(img);

});
/* ==========================================================
   PARALLAX HERO
========================================================== */

const hero=document.querySelector(".hero");



window.addEventListener("scroll",()=>{

    const y=window.scrollY;

    hero.style.backgroundPositionY=

    y*0.35+"px";

});
/* ==========================================================
   WEBSITE READY
========================================================== */

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

    console.log(

        "Wedding Website V4 Ready ❤️"

    );

});
/* ==========================================================
   IMAGE LOADED
========================================================== */

document.querySelectorAll(".gallery-item img")

.forEach((img)=>{

    img.onload=()=>{

        img.parentElement.classList.add(

            "loaded"

        );

    };

});
/* ==========================================================
   ESC ĐÓNG LIGHTBOX
========================================================== */

document.addEventListener(

"keydown",

(e)=>{

    if(e.key==="Escape"){

        lightbox.classList.remove(

            "active"

        );

    }

});
/* ==========================================================
   CLICK NGOÀI ẢNH
========================================================== */

lightbox.addEventListener(

"click",

(e)=>{

    if(e.target===lightbox){

        lightbox.classList.remove(

            "active"

        );

    }

});
/* ==========================================================
   PARALLAX LÁ OLIVE
========================================================== */

const leaves=document.querySelectorAll(

".leaf"

);

window.addEventListener(

"scroll",

()=>{

    const y=window.scrollY;

    leaves.forEach((leaf,index)=>{

        leaf.style.transform=

        `translateY(${y*(0.05+index*0.02)}px)`;

    });

});
/* ==========================================================
   TẠO CÁNH HOA
========================================================== */

const petals=document.querySelector(".petals");

function createPetal(){

    const petal=document.createElement("span");

    petal.className="petal";

    petal.style.left=Math.random()*100+"vw";

    petal.style.animationDuration=

    8+Math.random()*8+"s";

    petal.style.opacity=Math.random();

    petal.style.width=

    10+Math.random()*14+"px";

    petal.style.height=

    petal.style.width;

    petals.appendChild(petal);

    setTimeout(()=>{

        petal.remove();

    },16000);

}

setInterval(createPetal,700);
/* ==========================================================
   TYPE WRITER
========================================================== */

const heroTitle=document.querySelector(

".hero__text"

);

if(heroTitle){

const text=heroTitle.innerHTML;

heroTitle.innerHTML="";

let i=0;

function typing(){

    if(i<text.length){

        heroTitle.innerHTML+=text.charAt(i);

        i++;

        setTimeout(typing,25);

    }

}

setTimeout(typing,1800);

}
/* ==========================================================
   WEBSITE LOADER
========================================================== */

const loader=document.querySelector("#loader");

window.addEventListener("load",()=>{

    setTimeout(()=>{

        loader.classList.add("hide");

    },1200);

});
/* ==========================================================
   ACTIVE MENU
========================================================== */

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(".floating-nav a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const top=section.offsetTop-200;

        if(scrollY>=top){

            current=section.id;

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(

        link.getAttribute("href")

        ==="#"+current){

            link.classList.add("active");

        }

    });

});
/* ==========================================================
   SECTION SHOW
========================================================== */

const allSections=document.querySelectorAll("section");

const observer=new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},

{

    threshold:.2

}

);

allSections.forEach(section=>{

    observer.observe(section);

});
/* ==========================================================
   MOUSE LIGHT
========================================================== */

const mouseLight=document.querySelector(".mouse-light");

document.addEventListener("mousemove",(e)=>{

    mouseLight.style.left=e.clientX+"px";

    mouseLight.style.top=e.clientY+"px";

});
const cursor=document.querySelector(".cursor");

document.addEventListener("mousemove",(e)=>{

cursor.style.left=e.clientX+"px";

cursor.style.top=e.clientY+"px";

});
const progress=document.querySelector("#progressBar");

window.addEventListener("scroll",()=>{

const h=document.documentElement;

const percent=

h.scrollTop/

(h.scrollHeight-h.clientHeight)

*100;

progress.style.width=percent+"%";

});
