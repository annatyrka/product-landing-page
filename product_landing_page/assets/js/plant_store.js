
// h1 animation


function myMove() {
    let id = null;
    const elem = document.getElementById("animate");
    let pos = 0;
    clearInterval(id);
    id = setInterval(frame, 500);
    function frame() {
        if (pos == 250) {
            clearInterval(id);
        } else {
            pos++;
            elem.style.top = pos + 'px';
            elem.style.left = pos + 'px';
        }
    }
}


let myVar = setInterval(setColor, 3000);

function setColor() {
    let x = document.getElementById("plants");
    x.style.backgroundColor = x.style.backgroundColor == "#fafafa" ? "#e6f0f1" : "#fafafa";
}

function stopColor() {
    clearInterval(myVar);
}

export { myMove };
export { setColor };

// chnage main img

let myVar2 = setInterval(changeImg, 2000);
let myImage = document.getElementById("header-img");

export function changeImg() {
    let mySrc = myImage.getAttribute('src');
    if (mySrc === './assets/images/Logo-Plants-In-Pots.jpeg') {
        myImage.setAttribute('src', './assets/images/header_img2-unsplash.jpg');
    } else if (mySrc === "./assets/images/header_img2-unsplash.jpg") {
        myImage.setAttribute('src', '.assets/images/header_img3-unsplash.jpg');
    } else {
        myImage.setAttributemy('src', './assets/images/Logo-Plants-In-Pots.jpeg');
    }
}


