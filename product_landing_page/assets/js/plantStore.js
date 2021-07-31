


// dismiss cookies banner

function dismiss() {
    const cookieBanner = document.getElementById("cookie-banner");

    cookieBanner.style.transform = "translateY(-90px)";
    document.getElementsByTagName("header")[0].style.top = "0";

    //setTimeout(function () { cookieBanner.remove() }, 3000);
}

// Assign an onclick event

document.getElementById("cookie-button").onclick = dismiss;


//Show cookies banner

function loadCookies() {

    const cookieBanner = document.getElementById("cookie-banner");
    document.getElementsByTagName("header")[0].style.top = "90px";

}

// show / hide overlay

let overlay = document.getElementById("overlay");

function showOverlay() {
    overlay.style.zIndex = 0;
    overlay.style.opacity = 0.5;
}

function hideOverlay() {
    overlay.style.zIndex = -2;
    overlay.style.opacity = 1;
}



// toggle main img

let myVar2 = setInterval(changeImg, 1250);
let myImage = document.getElementById("main_img");

function changeImg() {
    let mySrc = myImage.getAttribute('src');
    switch (mySrc) {
        case "./assets/images/severin-candrian-unsplash.jpg":
            myImage.setAttribute('src', "./assets/images/header_img2-unsplash.jpg");
            break;
        case "./assets/images/header_img2-unsplash.jpg":
            myImage.setAttribute('src', "./assets/images/header_img3-unsplash.jpg");
            break;
        case "./assets/images/header_img3-unsplash.jpg":
            myImage.setAttribute('src', "./assets/images/header_img4-unsplash.jpg");
            break;
        case "./assets/images/header_img4-unsplash.jpg":
            myImage.setAttribute('src', "./assets/images/header_img6-unsplash.jpg");
            break;
        case "./assets/images/header_img6-unsplash.jpg":
            myImage.setAttribute('src', "./assets/images/header_img7-unsplash.jpg");
            break;
        default:
            myImage.setAttribute('src', "./assets/images/severin-candrian-unsplash.jpg");
    }
}

