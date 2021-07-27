
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


// toggle main img

let myVar2 = setInterval(changeImg, 1500);
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

