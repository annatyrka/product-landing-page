


// dismiss cookies banner

function dismiss() {
    const cookieBanner = document.getElementById("cookie-banner");

    cookieBanner.style.transform = "translateY(-90px)";
    document.getElementsByTagName("header")[0].style.top = "0";

    setTimeout(function () { cookieBanner.remove() }, 3000);
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
    overlay.style.opacity = 0.4;
}

function hideOverlay() {
    overlay.style.zIndex = -2;
    overlay.style.opacity = 1;
}


// change plant image

const objImgSrc = {
    monstera: ["./assets/images/SwissCheese-24cm-2_c1557c95-7882-4478-8103-cb4619b48d91_1_grande.jpg", "./assets/images/Monstera_detail_1_91cb8a6b-1b30-4010-af3f-3cc0caec6c4c_1024x1024@2x.jpg"],
    ficus: ["./assets/images/Rubber-plant-Robusta-27cm-Weave_grande.jpg", "./assets/images/Rubber-plant-Robusta-27cm-detail_1024x1024@2x.jpg"],
    snakePlant: ["./assets/images/snake-plant-zeylanica-black-beige-pot_grande.jpg", "./assets/images/sansevieria-zeylanica-close-up-2_1024x1024@2x.jpg"],
    ceramic: ["./assets/images/cermic_pot.jpg", "./assets/images/ceramic_pot2.jpg"],
    fractured: ["./assets/images/fractured_pot.jpg", "./assets/images/fractured_pot2.jpg"],
    clay: ["./assets/images/clay_pot.jpg", "./assets/images/clay_pot2.jpg"]
};

function mOver(obj) {
    const objName = obj.getAttribute('id');
    const objId = document.getElementById(objName);
    objId.style.opacity = 0;
    setTimeout(function () { obj.setAttribute("src", objImgSrc[objName][1]) }, 750);
    setTimeout(function () { objId.style.opacity = 1 }, 750);
}

function mOut(obj) {
    const objName = obj.getAttribute('id');
    const objId = document.getElementById(objName);
    objId.style.opacity = 0;
    setTimeout(function () { obj.setAttribute("src", objImgSrc[objName][0]) }, 400);
    setTimeout(function () { objId.style.opacity = 1 }, 400);
}
