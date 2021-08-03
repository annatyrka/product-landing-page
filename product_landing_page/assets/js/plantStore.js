//import { PlantsProducts } from "./productsPlants";

//variables


const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const potsProductsDOM = document.querySelector('.pots-products-center');
const plantsProductsDOM =  document.querySelector('.plants-products-center');
// cart 
let cart = [];

// buttons

let buttonsDOM = [];

//getting the pots

class Products{
async getProducts() {


    try {
 let result = await fetch('products.json');
 let data = await result.json();   //converting to a JavaScript object to access the data using Response.json()
 let products = data.items;
 products = products.map(item=>  {
     const {title,price, size}  = item.fields;
     const {id} = item.sys;
     const imageTop = item.fields.image.url1;
    const imageBottom = item.fields.image.url2;

     return {title,price,size,id,imageTop,imageBottom}

 });
  return products
} catch (error) {
    console.log(error);
}
}
}


//getting the plants  

class PlantsProducts {
async getPlantsProducts() {


    try {
 let result = await fetch('productsPlants.json');
 let data = await result.json();   //converting to a JavaScript object to access the data using Response.json()
 let plantsProducts = data.items;
 plantsProducts = plantsProducts.map(item=>  {
     const {title,price, size, description}  = item.fields;
     const {id} = item.sys;
     const imageTop = item.fields.image.url[0];
    const imageBottom = item.fields.image.url[1];

     return {title,price,size,description,id,imageTop,imageBottom}

 });
  return plantsProducts
} catch (error) {
    console.log(error);
}
}
}



// display products
class UI {

    //display pots
displayProducts(products) {
    let result  = '';
    products.forEach(product => {
        result +=`
                    <!-- single product-->
            <div class="pot">
            <div class="crossfade">

                <img
                src=${product.imageBottom}
                alt="pot"
                class="pot-img bottom"
              />
                <img          
                src=${product.imageTop}      
                alt="pot"
                class="pot-img top"
             />

            </div>
              <h3>${product.title}</h3>
              <p class="size">Size: ${product.size} cm </p>
              <p class="price">$${product.price}</p>
              <button class="bag-btn" data-id=${product.id}>
                <img src="./assets/images/icons8-bag-48.png" />add
              </button>
            </div>
            <!-- end of single product-->
        `;
    });

    potsProductsDOM.innerHTML = result;
}

// display plants

displayPlantsProducts(plantsProducts) {
    let result  = '';
    plantsProducts.forEach(product => {
        result +=`
                    <!-- single product-->
            <div class="plant">
             <div class="crossfade">
              <img
                src="${product.imageBottom}"
                alt="plant"
                class="plant-img bottom"
              />
              <img
                src="${product.imageTop}"
                alt="plant"
                class="plant-img top"
              />
            </div>
              <h3>${product.title}</h3>
              <p class="size">Size: ${product.size} cm </p>
              <p class="price">$${product.price}</p>
               <p class="description">${product.description}
              </p>
              <button class="bag-btn" data-id="${product.id}">
                <img src="./assets/images/icons8-bag-48.png" />add
              </button>
            </div>
  
            <!-- end of single product-->
        `;
    });

    plantsProductsDOM.innerHTML = result;
}

getBagButtons() {
    const buttons = [...document.querySelectorAll(".bag-btn")];
    console.log(buttons);

    buttonsDOM = buttons;
    buttons.forEach(button => {

        let id = button.dataset.id;
        
        let inCart = cart.find(item => (item.id === id))
        
                // checking if the item is in a cart
        if (inCart) {   
            button.innerText = "In Cart";
            button.disabled = true;
        } 
        
            button.addEventListener("click",(event) => {
                event.target.innerText = "In Cart";
                event.target.disabled = true;
                // get product from products based on the id
                
                let cartItem = {...Storage.getProduct(id), amount: 1}; // get the product and also add the amount

                // add product to the cart
                
                cart = [...cart, cartItem];

                // save the cart in the local storage

                Storage.saveCart(cart)

                // set cart values

                this.setCartValues(cart);

                // display cart item

                this.addCartItem(cartItem);
                //show the cart

                this.showCart();
            });
        

    });
}

    setCartValues(cart)  {
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item => {
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        })
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;
    }

    addCartItem(item) {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `<img
                  src=${item.imageTop}
                  alt="product"
                />
                <div>
                  <h4>${item.title}</h4>
                  <h5>$${item.price}</h5>
                  <span class="remove-item" data-id=${item.id}>remove</span>
                </div>
                <div>
                  <i class="fas fa-chevron-up" data-id=${item.id}></i>
                  <p class="item-amount">${item.amount}</p>
                  <i class="fas fa-chevron-down" data-id=${item.id}></i>
                </div>`;
                cartContent.appendChild(div);

            }
        showCart() {
            cartOverlay.style.visibility= "visible";
            cartDOM.style.transform = "translateX(0)";
        }
}

//local storage
class Storage {
    static saveProducts(products) {    //to be called on an object class, not on objects
        localStorage.setItem("products", JSON.stringify(products))
    }

     static savePlantsProducts(products) {    //to be called on an object class, not on objects    //added
        localStorage.setItem("plantsProducts", JSON.stringify(products))
    }


    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem('products'));
       let plants = JSON.parse(localStorage.getItem('plantsProducts'));
       let product = products.find(product => product.id === id);
       let plant = plants.find(product => product.id === id);
        console.log(product);
        if (!product) {
            return plant
        }
        return product
        
    }

    static getPlantProduct(id) {
        let products = JSON.parse(localStorage.getItem('plantsProducts'));
        return products.find(product => product.id === id)
    } 
    
    static saveCart()  {
        localStorage.setItem('cart', JSON.stringify(cart))  // adding cart to local storage
    }
}

/*   

  static getProduct(id) {
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id)
    }
*/


document.addEventListener("DOMContentLoaded",()=>{

const ui = new UI();
const products = new Products();
const plantsProducts = new PlantsProducts();   // added


//get all product
products.getProducts().then(products =>  {
    ui.displayProducts(products)   //  displaying the pots
Storage.saveProducts(products);     //uploading to local storage
}).then(plantsProducts.getPlantsProducts().then(plantsProducts =>  {
    ui.displayPlantsProducts(plantsProducts)
Storage.savePlantsProducts(plantsProducts); 
 })).then(() => {                     // to ensure the above happend before we can access the button
ui.getBagButtons()
})
})                              





/* 
//get all product
products.getProducts().then(products =>  {
    ui.displayProducts(products)   //  displaying the pots
Storage.saveProducts(products);     //uploading to local storage
}).then(plantsProducts.getPlantsProducts().then(plantsProducts =>  {
    ui.displayPlantsProducts(plantsProducts)
Storage.savePlantsProducts(plantsProducts); 
 })).then(() => {                     // to ensure the above happend before we can access the button
ui.getBagButtons()
})
})     

*/

/*
document.addEventListener("DOMContentLoaded",()=>{

const ui = new UI();
const products = new Products();


//get all product
products.getProducts().then(products =>  {
    ui.displayProducts(products).   //  displaying the  products
Storage.saveProducts(products);     //uploading to local storage
}).then(() => {                     // to ensure the above happend before we can access the button
ui.getBagButtons()
});                            
});


*/


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



// change plant image - replaced with css

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
    setTimeout(function () { obj.setAttribute("src", objImgSrc[objName][0]) }, 750);
    setTimeout(function () { objId.style.opacity = 1 }, 750);
}
