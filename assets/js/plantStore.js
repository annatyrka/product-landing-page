// variables
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const potsProductsDOM = document.querySelector('.pots-products-center');
const outPotsProductsDOM = document.querySelector('.out-pots-products-center');
const plantsProductsDOM =  document.querySelector('.plants-products-center');
const outPlantsProductsDOM = document.querySelector('.out-plants-products-center');

// cart 
let cart = [];

// buttons
let buttonsDOM = [];
//getting the pots


// getting pots
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


// getting plants  
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
    let resultOut ='';
    products.forEach(product => {

        if (product.id < 10) {
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
            <div class="item-details">
              <h4>${product.title}</h4>
              <p class="size">Size: ${product.size} cm </p>
              <p class="price">$${product.price}</p>
              </div>
              <button class="bag-btn" data-id=${product.id}>
                <img src="./assets/images/icons8-bag-48.png" />add
              </button>
            </div>
            <!-- end of single product-->
        `;
        } else {
             resultOut +=`
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
            <div class="item-details">
              <h4>${product.title}</h4>
              <p class="size">Size: ${product.size} cm </p>
              <p class="price">$${product.price}</p>
              </div>
              <button class="bag-btn" data-id=${product.id}>
                <img src="./assets/images/icons8-bag-48.png" />add
              </button>
            </div>
            <!-- end of single product-->
        `;
        }
    });

 potsProductsDOM.innerHTML = result;
  outPotsProductsDOM.innerHTML = resultOut;   
}

// display plants

displayPlantsProducts(plantsProducts) {
    let result  = '';
    let resultOut ='';
    plantsProducts.forEach(product => {

        // Indoor plants
        if (product.id < 4) {
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
            <div class="item-details">
              <h4>${product.title}</h4>
              <p class="size">Size: ${product.size} cm </p>
              <p class="price">$${product.price}</p>
              
              </div>
              <button class="bag-btn" data-id="${product.id}">
                <img src="./assets/images/icons8-bag-48.png" />add
              </button>
            </div>
  
            <!-- end of single product-->
        `;
        } 
        // Outdoor plants
        else {
                    resultOut +=`
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
            <div class="item-details">
              <h4>${product.title}</h4>
              <p class="size">Size: ${product.size} cm </p>
              <p class="price">$${product.price}</p>
              </div>
              <button class="bag-btn" data-id="${product.id}">
                <img src="./assets/images/icons8-bag-48.png" />add
              </button>
            </div>
  
            <!-- end of single product-->
        `;
        }
    });

        plantsProductsDOM.innerHTML = result;
        outPlantsProductsDOM.innerHTML = resultOut;
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
                event.currentTarget.innerText = "In Cart";
                event.currentTarget.disabled = true;
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
                this.bagIsEmpty();
                //this.showCart();
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

    bagIsEmpty() {
                console.log(cartContent.childElementCount)
            if (cartContent.childElementCount === 0 && document.querySelector('.bag-plant') === null) {
                clearCartBtn.innerHTML = 'continue shopping';
                clearCartBtn.addEventListener('click',this.hideCart);
                document.querySelector('#your-bag').innerText = "Your bag is empty";
                const div = document.createElement('div');
                div.classList.add('bag-plant');
                div.innerHTML =  '<img src="./assets/images/icons8-potted-plant-100.png" />'
                cartDOM.insertBefore(div,cartDOM.childNodes[4]);
            }
            else if (cartContent.childElementCount !== 0 && document.querySelector('.bag-plant') !== null) {
                clearCartBtn.innerHTML = '<i class="far fa-trash-alt"></i> remove all';
                document.querySelector('#your-bag').innerText = "Your bag";
                let plantIconDiv = document.querySelector('.bag-plant');
                plantIconDiv.remove();
            }
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
                  <span class="remove-item" data-id=${item.id}><i class="far fa-trash-alt"></i></span>
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

        setupAPP() {
            cart = Storage.getCart();
            this.setCartValues(cart);
            this.populateCart(cart);
            cartBtn.addEventListener('click', this.showCart);
            closeCartBtn.addEventListener('click', this.hideCart);
        }
        populateCart(cart) {
            cart.forEach(item =>this.addCartItem(item))
        }

        
        hideCart() {
            cartOverlay.style.visibility = "hidden";
            cartDOM.style.transform = "translateX(100%)";
        }
        cartLogic() {
            clearCartBtn.addEventListener('click', () => {
                this.clearCart()

            });


            //cart funcionality
            cartContent.addEventListener('click', event => {
                // removing item when clickin on 'remove'
                if (event.target.parentElement.classList.contains('remove-item')) {
                    let removeItem = event.target.parentElement;
                    let id = removeItem.dataset.id;
                    cartContent.removeChild(removeItem.parentElement.parentElement);
                   // cartContent.removeChild
                    this.removeItem(id);  //removes item form the cart
                } 
                
                // increasing items
                else if (event.target.classList.contains('fa-chevron-up')) {
                let addAmount = event.target;
                let id = addAmount.dataset.id;
                let tempItem = cart.find(item => item.id  === id);
                tempItem.amount += 1;
                //updating local storage
                Storage.saveCart(cart);
                this.setCartValues(cart);
                addAmount.nextElementSibling.innerText = tempItem.amount;
                }
                else if (event.target.classList.contains('fa-chevron-down')) {
                    let subtractAmount = event.target;
                    let id = subtractAmount.dataset.id
                    console.log(id);
                    let tempItem = cart.find(item => item.id === id);
                    tempItem.amount -= 1;
                    if(tempItem.amount > 0) {
                        //updating local storage
                        Storage.saveCart(cart);
                        this.setCartValues(cart);
                        subtractAmount.previousElementSibling.innerText = tempItem.amount;
                    } else {
                        cartContent.removeChild(subtractAmount.parentElement.parentElement);
                        this.removeItem(id);
                        
                    }
                                                                             
                }

                this.bagIsEmpty();
            })
        }
        clearCart() {
            let cartItems = cart.map(item => item.id);
            cartItems.forEach(id => this.removeItem(id));
            while(cartContent.children.length  > 0) {
                cartContent.removeChild(cartContent.children[0])
                this.bagIsEmpty();
            }

        }
        removeItem(id) {
            cart = cart.filter(item => item.id !== id)  //updates the cart
            this.setCartValues(cart);
            Storage.saveCart(cart);
            let button = this.getSingleButton(id);
            button.disabled  = false;
            button.innerHTML = `<img src="./assets/images/icons8-bag-48.png" />add`;
           // this.hideCart();
           this.bagIsEmpty();
        }
        getSingleButton(id) {
            return buttonsDOM.find(button => button.dataset.id === id);
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
    static getCart() {
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    }

}


document.addEventListener("DOMContentLoaded",()=>{

const products = new Products();
const plantsProducts = new PlantsProducts();
const ui = new UI();


//setup app
ui.setupAPP();

//get all product

plantsProducts.getPlantsProducts()
    .then(plantsProducts =>  {
    ui.displayPlantsProducts(plantsProducts)
    Storage.savePlantsProducts(plantsProducts);
    })
products.getProducts().
    then(products =>  {
    ui.displayProducts(products)   
    Storage.saveProducts(products); 
})
.then(() => {                    
ui.getBagButtons()}).then(() => { ui.cartLogic() }).then(() => {ui.bagIsEmpty()})
})
                 



// dismiss cookies banner

function dismiss() {
    const cookieBanner = document.getElementById("cookie-banner");

    cookieBanner.style.transform = "translateY(-90px)";
    document.getElementsByTagName("header")[0].style.transform = "translateY(0px)";
    setTimeout(function () { cookieBanner.remove() }, 2000);
}

// Assign an onclick event

document.querySelector('.close-cookies').onclick = dismiss;


//Show cookies banner

function loadCookies() {

    const cookieBanner = document.getElementById("cookie-banner");
    document.getElementsByTagName("header")[0].style.transform = "translateY(80px)";

}

// show / hide overlay

let overlay = document.getElementById("overlay");
const windowWidth = window.matchMedia("(min-width: 768px)");


function showOverlay(width) {
  if (width.matches) {
    overlay.style.zIndex = 0;
    overlay.style.opacity = 0.4;
  } else {
    overlay.style.zIndex = -2;
    overlay.style.opacity = 1;
  }
};

function hideOverlay() {
    overlay.style.zIndex = -2;
    overlay.style.opacity = 1;
};


